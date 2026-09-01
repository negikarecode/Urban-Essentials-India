import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Order, OrderStatus } from "@/types";
import { checkRateLimit, rateLimitResponse } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

// In-memory runtime storage for active deployment fallback
let serverOrdersStore: Order[] = [];

export async function GET(req: NextRequest) {
  const rateLimit = checkRateLimit(req, {
    limit: 120,
    windowMs: 60 * 1000,
    prefix: "admin-orders-get",
  });

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit);
  }

  try {
    const supabase = createAdminClient();
    const { data: dbOrders, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false });

    if (error || !dbOrders || dbOrders.length === 0) {
      return NextResponse.json({ orders: serverOrdersStore });
    }

    const formatted: Order[] = dbOrders.map((o: any) => ({
      id: o.id,
      order_number: o.order_number,
      user_id: o.user_id,
      guest_email: o.guest_email,
      guest_phone: o.guest_phone,
      shipping_address: o.shipping_address,
      billing_address: o.billing_address,
      subtotal: Number(o.subtotal),
      discount_amount: Number(o.discount_amount || 0),
      shipping_fee: Number(o.shipping_fee || 0),
      tax_amount: Number(o.tax_amount || 0),
      total_amount: Number(o.total_amount),
      coupon_code: o.coupon_code,
      order_status: o.order_status as OrderStatus,
      payment_status: o.payment_status,
      payment_method: o.payment_method || "razorpay",
      razorpay_order_id: o.razorpay_order_id,
      razorpay_payment_id: o.razorpay_payment_id,
      items: (o.order_items || []).map((item: any) => ({
        id: item.id,
        order_id: item.order_id,
        product_id: item.product_id,
        variant_id: item.variant_id,
        product_name: item.product_name,
        variant_name: item.variant_name,
        sku: item.sku,
        unit_price: Number(item.unit_price),
        quantity: Number(item.quantity),
        total_price: Number(item.total_price),
        product_image: item.product_image,
      })),
      created_at: o.created_at,
      updated_at: o.updated_at,
    }));

    return NextResponse.json({ orders: formatted });
  } catch (err: any) {
    return NextResponse.json({ orders: serverOrdersStore, error: err.message });
  }
}

export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(req, {
    limit: 60,
    windowMs: 60 * 1000,
    prefix: "admin-orders-post",
  });

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit);
  }

  try {
    const order: Order = await req.json();
    if (!order.order_number) {
      return NextResponse.json({ error: "Order number is required" }, { status: 400 });
    }

    serverOrdersStore = [order, ...serverOrdersStore.filter((o) => o.order_number !== order.order_number)];

    const supabase = createAdminClient();
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(order.id);
    const dbOrderId = isUuid ? order.id : crypto.randomUUID();

    const { error: ordErr } = await supabase.from("orders").upsert({
      id: dbOrderId,
      order_number: order.order_number,
      user_id: order.user_id && isUuid ? order.user_id : null,
      guest_email: order.guest_email || order.shipping_address?.email,
      guest_phone: order.guest_phone || order.shipping_address?.phone,
      shipping_address: order.shipping_address,
      billing_address: order.billing_address || order.shipping_address,
      subtotal: order.subtotal,
      discount_amount: order.discount_amount || 0,
      shipping_fee: order.shipping_fee || 0,
      tax_amount: order.tax_amount || 0,
      total_amount: order.total_amount,
      coupon_code: order.coupon_code || null,
      order_status: order.order_status || "confirmed",
      payment_status: order.payment_status || "paid",
      payment_method: order.payment_method || "razorpay",
      razorpay_order_id: order.razorpay_order_id || null,
      razorpay_payment_id: order.razorpay_payment_id || null,
      created_at: order.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (ordErr) {
      console.warn("DB notice upserting order:", ordErr.message);
    }

    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const rateLimit = checkRateLimit(req, {
    limit: 60,
    windowMs: 60 * 1000,
    prefix: "admin-orders-put",
  });

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit);
  }

  try {
    const { id, order_status } = await req.json();
    if (!id || !order_status) {
      return NextResponse.json({ error: "Order ID and status required" }, { status: 400 });
    }

    serverOrdersStore = serverOrdersStore.map((o) =>
      o.id === id || o.order_number === id ? { ...o, order_status, updated_at: new Date().toISOString() } : o
    );

    const supabase = createAdminClient();
    await supabase.from("orders").update({
      order_status,
      updated_at: new Date().toISOString(),
    }).or(`id.eq.${id},order_number.eq.${id}`);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const rateLimit = checkRateLimit(req, {
    limit: 60,
    windowMs: 60 * 1000,
    prefix: "admin-orders-delete",
  });

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit);
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Order ID required" }, { status: 400 });
    }

    serverOrdersStore = serverOrdersStore.filter((o) => o.id !== id && o.order_number !== id);

    const supabase = createAdminClient();
    await supabase.from("orders").delete().or(`id.eq.${id},order_number.eq.${id}`);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

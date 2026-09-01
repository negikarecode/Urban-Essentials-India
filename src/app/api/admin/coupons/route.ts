import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Coupon } from "@/types";
import { checkRateLimit, rateLimitResponse } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

let serverCouponsStore: Coupon[] = [];

export async function GET(req: NextRequest) {
  const rateLimit = checkRateLimit(req, {
    limit: 120,
    windowMs: 60 * 1000,
    prefix: "admin-coupons-get",
  });

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit);
  }

  try {
    const supabase = createAdminClient();
    const { data: dbCoupons, error } = await supabase
      .from("coupons")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !dbCoupons || dbCoupons.length === 0) {
      return NextResponse.json({ coupons: serverCouponsStore });
    }

    const formatted: Coupon[] = dbCoupons.map((c: any) => ({
      id: c.id,
      code: c.code,
      description: c.description,
      discount_type: c.discount_type,
      discount_value: Number(c.discount_value),
      min_order_value: Number(c.min_order_value || 0),
      max_discount: c.max_discount ? Number(c.max_discount) : undefined,
      usage_limit: c.usage_limit ? Number(c.usage_limit) : undefined,
      used_count: Number(c.usage_count || 0),
      start_date: c.valid_from,
      expiry_date: c.valid_until,
      is_active: Boolean(c.is_active),
    }));

    return NextResponse.json({ coupons: formatted });
  } catch (err: any) {
    return NextResponse.json({ coupons: serverCouponsStore, error: err.message });
  }
}

export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(req, {
    limit: 60,
    windowMs: 60 * 1000,
    prefix: "admin-coupons-post",
  });

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit);
  }

  try {
    const coupon: Coupon = await req.json();
    if (!coupon.code) {
      return NextResponse.json({ error: "Coupon code required" }, { status: 400 });
    }

    const cleanCode = coupon.code.trim().toUpperCase();
    serverCouponsStore = [
      { ...coupon, code: cleanCode },
      ...serverCouponsStore.filter((c) => c.code.toUpperCase() !== cleanCode),
    ];

    const supabase = createAdminClient();
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(coupon.id);
    const dbCouponId = isUuid ? coupon.id : crypto.randomUUID();

    await supabase.from("coupons").upsert({
      id: dbCouponId,
      code: cleanCode,
      description: coupon.description || `${coupon.discount_value}${coupon.discount_type === 'percentage' ? '%' : '₹'} off`,
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_value,
      min_order_value: coupon.min_order_value || 0,
      max_discount: coupon.max_discount || null,
      usage_limit: coupon.usage_limit || null,
      usage_count: coupon.used_count || 0,
      valid_from: coupon.start_date || new Date().toISOString(),
      valid_until: coupon.expiry_date || null,
      is_active: coupon.is_active ?? true,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, coupon: { ...coupon, code: cleanCode } });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const rateLimit = checkRateLimit(req, {
    limit: 60,
    windowMs: 60 * 1000,
    prefix: "admin-coupons-put",
  });

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit);
  }

  try {
    const coupon: Coupon = await req.json();
    if (!coupon.code) {
      return NextResponse.json({ error: "Coupon code required" }, { status: 400 });
    }

    const cleanCode = coupon.code.trim().toUpperCase();
    serverCouponsStore = serverCouponsStore.map((c) =>
      c.id === coupon.id || c.code.toUpperCase() === cleanCode ? { ...c, ...coupon, code: cleanCode } : c
    );

    const supabase = createAdminClient();
    await supabase.from("coupons").update({
      description: coupon.description,
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_value,
      min_order_value: coupon.min_order_value,
      max_discount: coupon.max_discount || null,
      usage_limit: coupon.usage_limit || null,
      is_active: coupon.is_active,
    }).or(`id.eq.${coupon.id},code.eq.${cleanCode}`);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const rateLimit = checkRateLimit(req, {
    limit: 60,
    windowMs: 60 * 1000,
    prefix: "admin-coupons-delete",
  });

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit);
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Coupon ID required" }, { status: 400 });
    }

    const cleanId = id.toUpperCase();
    serverCouponsStore = serverCouponsStore.filter(
      (c) => c.id !== id && c.code.toUpperCase() !== cleanId
    );

    const supabase = createAdminClient();
    await supabase.from("coupons").delete().or(`id.eq.${id},code.eq.${cleanId}`);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

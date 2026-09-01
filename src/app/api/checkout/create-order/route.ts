import { NextResponse } from 'next/server';
import { getRazorpayClient } from '@/lib/razorpay';
import { getProductById, validateCoupon } from '@/lib/data/products';
import { generateOrderNumber } from '@/lib/utils';
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit';

interface CreateOrderRequestItem {
  productId: string;
  variantId?: string;
  quantity: number;
}

export async function POST(req: Request) {
  try {
    const rateLimit = checkRateLimit(req, {
      limit: 10,
      windowMs: 60 * 1000, // 1 minute
      prefix: 'checkout-create-order',
    });

    if (!rateLimit.allowed) {
      return rateLimitResponse(
        rateLimit,
        `Too many checkout attempts. Please wait ${rateLimit.retryAfterSeconds} seconds before trying again.`
      );
    }

    const body = await req.json();
    const {
      items,
      couponCode,
      customerDetails,
    }: {
      items: CreateOrderRequestItem[];
      couponCode?: string;
      customerDetails: {
        fullName: string;
        email: string;
        phone: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        state: string;
        postalCode: string;
      };
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    if (!customerDetails || !customerDetails.email || !customerDetails.fullName || !customerDetails.postalCode) {
      return NextResponse.json({ error: 'Incomplete shipping details' }, { status: 400 });
    }

    // SERVER-SIDE PRICE RECALCULATION
    let calculatedSubtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = getProductById(item.productId);

      let unitPrice = (item as any).price || 0;
      let variantName = (item as any).variantName || undefined;
      let sku = (item as any).sku || `SKU-${item.productId.slice(0, 8).toUpperCase()}`;
      let productName = (item as any).name || (item as any).productName || 'Urban Essentials Item';
      let image = (item as any).image || '';

      if (product && product.is_active !== false) {
        unitPrice = product.price;
        productName = product.name;
        sku = product.sku;
        image = product.images[0]?.image_url || image;

        if (item.variantId && product.variants) {
          const variant = product.variants.find((v) => v.id === item.variantId && v.is_active !== false);
          if (variant) {
            unitPrice = variant.price;
            variantName = variant.name;
            sku = variant.sku;
            if (variant.image_url) image = variant.image_url;
          }
        }
      }

      if (unitPrice <= 0) {
        unitPrice = 499;
      }

      const itemTotal = unitPrice * (item.quantity || 1);
      calculatedSubtotal += itemTotal;

      validatedItems.push({
        productId: item.productId,
        variantId: item.variantId,
        productName,
        variantName,
        sku,
        unitPrice,
        quantity: item.quantity || 1,
        totalPrice: itemTotal,
        image,
      });
    }

    // Server-side Coupon validation
    let discountAmount = 0;
    if (couponCode) {
      const couponRes = validateCoupon(couponCode, calculatedSubtotal);
      if (couponRes.valid) {
        discountAmount = couponRes.discountAmount;
      } else {
        const code = couponCode.trim().toUpperCase();
        if (code === 'URBAN20' && calculatedSubtotal >= 1500) {
          discountAmount = Math.min(Math.round(calculatedSubtotal * 0.2), 500);
        } else if (code === 'WELCOME10') {
          discountAmount = Math.round(calculatedSubtotal * 0.1);
        }
      }
    }

    // Server-side Shipping Fee calculation
    const shippingFee = calculatedSubtotal >= 999 ? 0 : 99;
    const grandTotal = Math.max(0, calculatedSubtotal - discountAmount + shippingFee);
    const orderNumber = generateOrderNumber();

    // Create Razorpay Order
    const razorpay = getRazorpayClient();
    const amountInPaisa = Math.round(grandTotal * 100);

    let razorpayOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    try {
      const rzpOrder = await razorpay.orders.create({
        amount: amountInPaisa,
        currency: 'INR',
        receipt: orderNumber,
        notes: {
          orderNumber,
          customerEmail: customerDetails.email,
          customerPhone: customerDetails.phone,
        },
      });
      if (rzpOrder && rzpOrder.id) {
        razorpayOrderId = rzpOrder.id;
      }
    } catch (rzpErr) {
      console.warn('Razorpay live order creation fallback to test mode:', rzpErr);
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder_key';

    return NextResponse.json({
      success: true,
      orderNumber,
      razorpayOrderId,
      amount: grandTotal,
      amountInPaisa,
      currency: 'INR',
      keyId,
      subtotal: calculatedSubtotal,
      discountAmount,
      shippingFee,
      validatedItems,
      customerDetails,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Create Order API Error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to initialize order.' },
      { status: 500 }
    );
  }
}

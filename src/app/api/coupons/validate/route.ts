import { NextResponse } from 'next/server';
import { validateCoupon, COUPONS_DATA } from '@/lib/data/products';
import { createAdminClient } from '@/lib/supabase/admin';
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit';

export async function POST(req: Request) {
  try {
    const rateLimit = checkRateLimit(req, {
      limit: 10,
      windowMs: 60 * 1000, // 1 minute
      prefix: 'coupon-validate',
    });

    if (!rateLimit.allowed) {
      return rateLimitResponse(
        rateLimit,
        `Too many coupon attempts. Please wait ${rateLimit.retryAfterSeconds} seconds before trying again.`
      );
    }

    const body = await req.json();
    const { code, subtotal, userId } = body;

    if (!code || typeof subtotal !== 'number') {
      return NextResponse.json(
        { valid: false, error: 'Invalid coupon validation payload' },
        { status: 400 }
      );
    }

    const cleanCode = code.trim().toUpperCase();

    // 1. Try static / local validation first
    const localResult = validateCoupon(cleanCode, subtotal, userId);
    if (localResult.valid) {
      return NextResponse.json({
        valid: true,
        coupon: localResult.coupon,
        discountAmount: localResult.discountAmount,
        message: `Coupon "${localResult.coupon?.code}" applied! You save ₹${localResult.discountAmount}.`,
      });
    }

    // 2. Try DB check for custom admin-created coupon
    try {
      const supabase = createAdminClient();
      const { data: dbCoupon } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', cleanCode)
        .maybeSingle();

      if (dbCoupon && dbCoupon.is_active) {
        const minOrder = Number(dbCoupon.min_order_value || 0);
        if (subtotal < minOrder) {
          const diff = minOrder - subtotal;
          return NextResponse.json({
            valid: false,
            error: `Add ₹${diff} more to your cart to use "${cleanCode}" (Min order ₹${minOrder}).`,
            discountAmount: 0,
          });
        }

        let discountAmount = 0;
        const discountVal = Number(dbCoupon.discount_value);
        if (dbCoupon.discount_type === 'percentage') {
          discountAmount = (subtotal * discountVal) / 100;
          if (dbCoupon.max_discount && discountAmount > Number(dbCoupon.max_discount)) {
            discountAmount = Number(dbCoupon.max_discount);
          }
        } else {
          discountAmount = discountVal;
        }

        const finalDiscount = Math.min(Math.round(discountAmount), subtotal);
        return NextResponse.json({
          valid: true,
          coupon: {
            id: dbCoupon.id,
            code: dbCoupon.code,
            description: dbCoupon.description,
            discount_type: dbCoupon.discount_type,
            discount_value: discountVal,
            min_order_value: minOrder,
            max_discount: dbCoupon.max_discount ? Number(dbCoupon.max_discount) : undefined,
            is_active: true,
          },
          discountAmount: finalDiscount,
          message: `Coupon "${dbCoupon.code}" applied! You save ₹${finalDiscount}.`,
        });
      }
    } catch {
      // ignore
    }

    return NextResponse.json({
      valid: false,
      error: localResult.error || `Coupon code "${cleanCode}" is invalid or expired.`,
      discountAmount: 0,
    });
  } catch (error: any) {
    return NextResponse.json(
      { valid: false, error: error.message || 'Coupon validation failed' },
      { status: 500 }
    );
  }
}


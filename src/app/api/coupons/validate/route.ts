import { NextResponse } from 'next/server';
import { validateCoupon } from '@/lib/data/products';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, subtotal, userId } = body;

    if (!code || typeof subtotal !== 'number') {
      return NextResponse.json(
        { valid: false, error: 'Invalid coupon validation payload' },
        { status: 400 }
      );
    }

    const result = validateCoupon(code, subtotal, userId);

    if (!result.valid) {
      return NextResponse.json(
        {
          valid: false,
          error: result.error || 'Invalid coupon code',
          discountAmount: 0,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      valid: true,
      coupon: result.coupon,
      discountAmount: result.discountAmount,
      message: `Coupon "${result.coupon?.code}" applied! You save ₹${result.discountAmount}.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { valid: false, error: error.message || 'Coupon validation failed' },
      { status: 500 }
    );
  }
}

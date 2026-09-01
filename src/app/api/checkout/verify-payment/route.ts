import { NextResponse } from 'next/server';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { saveOrder } from '@/lib/data/orders';
import { Order } from '@/types';
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit';

export async function POST(req: Request) {
  try {
    const rateLimit = checkRateLimit(req, {
      limit: 15,
      windowMs: 60 * 1000, // 1 minute
      prefix: 'checkout-verify-payment',
    });

    if (!rateLimit.allowed) {
      return rateLimitResponse(
        rateLimit,
        `Too many payment verification attempts. Please wait ${rateLimit.retryAfterSeconds} seconds.`
      );
    }

    const body = await req.json();
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      orderData,
    } = body;

    if (!razorpayOrderId || !razorpayPaymentId) {
      return NextResponse.json(
        { error: 'Missing payment identifiers for verification' },
        { status: 400 }
      );
    }

    // Cryptographic signature check
    let isSignatureValid = false;
    if (razorpaySignature) {
      isSignatureValid = verifyRazorpaySignature({
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      });
    }

    // In test/demo environment with placeholder secrets, allow verified signature or fallback
    const isTestPlaceholder = (process.env.RAZORPAY_KEY_SECRET || '').includes('placeholder');
    if (!isSignatureValid && !isTestPlaceholder) {
      return NextResponse.json(
        { error: 'Payment signature verification failed. Possible tampering detected.' },
        { status: 400 }
      );
    }

    const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const finalOrder: Order = {
      id: orderId,
      order_number: orderData.orderNumber,
      user_id: orderData.userId,
      guest_email: orderData.customerDetails.email,
      guest_phone: orderData.customerDetails.phone,
      shipping_address: {
        full_name: orderData.customerDetails.fullName,
        email: orderData.customerDetails.email,
        phone: orderData.customerDetails.phone,
        address_line1: orderData.customerDetails.addressLine1,
        address_line2: orderData.customerDetails.addressLine2,
        city: orderData.customerDetails.city,
        state: orderData.customerDetails.state,
        postal_code: orderData.customerDetails.postalCode,
        country: 'India',
      },
      subtotal: orderData.subtotal,
      discount_amount: orderData.discountAmount,
      shipping_fee: orderData.shippingFee,
      tax_amount: 0,
      total_amount: orderData.amount,
      coupon_code: orderData.couponCode,
      order_status: 'confirmed',
      payment_status: 'paid',
      payment_method: 'razorpay',
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      items: orderData.validatedItems.map((item: any) => ({
        id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        order_id: orderId,
        product_id: item.productId,
        variant_id: item.variantId,
        product_name: item.productName,
        variant_name: item.variantName,
        sku: item.sku,
        unit_price: item.unitPrice,
        quantity: item.quantity,
        total_price: item.totalPrice,
        product_image: item.image,
      })),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    saveOrder(finalOrder);

    return NextResponse.json({
      success: true,
      message: 'Payment verified and order finalized successfully.',
      order: finalOrder,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Payment Verification API Error:', err);
    return NextResponse.json(
      { error: err.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}

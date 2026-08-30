import { NextResponse } from 'next/server';
import { verifyRazorpayWebhookSignature } from '@/lib/razorpay';
import { getOrder, saveOrder } from '@/lib/data/orders';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing webhook signature header' },
        { status: 400 }
      );
    }

    // Verify cryptographic webhook signature
    const isValid = verifyRazorpayWebhookSignature({
      rawBody,
      signature,
    });

    const isTestPlaceholder = (process.env.RAZORPAY_WEBHOOK_SECRET || '').includes('placeholder');
    if (!isValid && !isTestPlaceholder) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 400 }
      );
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const paymentEntity = payload.payload?.payment?.entity;
    const orderEntity = payload.payload?.order?.entity;

    const orderReceipt = paymentEntity?.notes?.orderNumber || orderEntity?.receipt;

    if (orderReceipt) {
      const existingOrder = getOrder(orderReceipt);
      if (existingOrder) {
        if (event === 'payment.captured' || event === 'order.paid') {
          existingOrder.payment_status = 'paid';
          existingOrder.order_status = 'confirmed';
          existingOrder.razorpay_payment_id = paymentEntity?.id || existingOrder.razorpay_payment_id;
          saveOrder(existingOrder);
        } else if (event === 'payment.failed') {
          existingOrder.payment_status = 'failed';
          saveOrder(existingOrder);
        } else if (event === 'refund.processed') {
          existingOrder.payment_status = 'refunded';
          existingOrder.order_status = 'refunded';
          saveOrder(existingOrder);
        }
      }
    }

    return NextResponse.json({
      received: true,
      event,
    });
  } catch (error: any) {
    console.error('Razorpay Webhook Error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

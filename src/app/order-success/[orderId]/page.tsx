import { OrderSuccessClient } from './OrderSuccessClient';
import { getOrder } from '@/lib/data/orders';
import { Order } from '@/types';

interface Props {
  params: { orderId: string };
}

export const metadata = {
  title: 'Order Confirmed | KURA Essentials',
  description: 'Your order has been successfully placed.',
};

export default function OrderSuccessPage({ params }: Props) {
  const orderNumber = params.orderId;
  const existingOrder = getOrder(orderNumber);

  const orderToRender: Order = existingOrder || {
    id: `ord_${orderNumber}`,
    order_number: orderNumber || 'KUR-2026-8891',
    shipping_address: {
      full_name: 'Aryan Sharma',
      email: 'aryan@example.com',
      phone: '9876543210',
      address_line1: 'Flat 402, Green Meadows Apartment',
      city: 'Bengaluru',
      state: 'Karnataka',
      postal_code: '560001',
      country: 'India',
    },
    subtotal: 2498,
    discount_amount: 499,
    shipping_fee: 0,
    tax_amount: 0,
    total_amount: 1999,
    coupon_code: 'KURA20',
    order_status: 'confirmed',
    payment_status: 'paid',
    payment_method: 'razorpay',
    razorpay_order_id: `order_sample_${orderNumber}`,
    razorpay_payment_id: `pay_sample_${Date.now()}`,
    items: [
      {
        id: 'item-1',
        order_id: orderNumber,
        product_id: 'p1',
        product_name: 'KURA Bento Pro Modular Lunch Box',
        variant_name: 'Forest Green (1200ml)',
        sku: 'KUR-LB-001-GRN',
        unit_price: 1499,
        quantity: 1,
        total_price: 1499,
        product_image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'item-2',
        order_id: orderNumber,
        product_id: 'p2',
        product_name: 'HydroShield Double-Wall Insulated Flask',
        variant_name: 'Sage Green / 750ml',
        sku: 'KUR-WB-002-SGE-750',
        unit_price: 999,
        quantity: 1,
        total_price: 999,
        product_image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return <OrderSuccessClient order={orderToRender} />;
}

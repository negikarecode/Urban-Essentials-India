import { Order } from '@/types';

/**
 * Formats full plain-text order notification message for WhatsApp and SMS.
 */
export function formatOrderSummaryMessage(order: Order): string {
  const addr = order.shipping_address;
  const itemsText = order.items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.product_name}${item.variant_name ? ` (${item.variant_name})` : ''}\n` +
        `   SKU: ${item.sku}\n` +
        `   Qty: ${item.quantity} x ₹${item.unit_price} = ₹${item.total_price}`
    )
    .join('\n\n');

  const formattedDate = new Date(order.created_at || Date.now()).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return `📦 NEW ORDER RECEIVED!
Order Number: ${order.order_number}
Date: ${formattedDate}

👤 CUSTOMER DETAILS:
Name: ${addr?.full_name || 'Customer'}
Phone: +91 ${order.guest_phone || addr?.phone || 'N/A'}
Email: ${order.guest_email || addr?.email || 'N/A'}

📍 SHIPPING ADDRESS:
${addr?.address_line1 || ''}${addr?.address_line2 ? `, ${addr.address_line2}` : ''}
${addr?.city || ''}, ${addr?.state || ''} - ${addr?.postal_code || ''}, ${addr?.country || 'India'}

🛍️ ORDER ITEMS:
${itemsText}

💰 PAYMENT SUMMARY:
Subtotal: ₹${order.subtotal}
Discount: ${order.discount_amount ? `-₹${order.discount_amount}` : '₹0'}
Shipping: ${order.shipping_fee ? `₹${order.shipping_fee}` : 'FREE (₹0)'}
----------------------------------------
TOTAL PAID: ₹${order.total_amount}
Payment Status: ${(order.payment_status || 'PAID').toUpperCase()} (${order.payment_method || 'Razorpay'})
Payment ID: ${order.razorpay_payment_id || 'N/A'}
Order ID: ${order.id}`;
}

/**
 * Generates a direct WhatsApp click-to-chat API URL pre-filled with full order summary text.
 */
export function getWhatsAppOrderUrl(order: Order, targetPhone?: string): string {
  const rawPhone = (
    targetPhone ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    process.env.ADMIN_NOTIFICATION_PHONE ||
    ''
  ).replace(/\D/g, '');

  const message = formatOrderSummaryMessage(order);
  const encodedText = encodeURIComponent(message);

  if (rawPhone) {
    const fullPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
    return `https://wa.me/${fullPhone}?text=${encodedText}`;
  }

  return `https://api.whatsapp.com/send?text=${encodedText}`;
}

/**
 * Dispatches an automated WhatsApp order notification via official or third-party APIs.
 */
export async function sendWhatsAppNotification(order: Order, targetPhone?: string) {
  const rawPhone = (
    targetPhone ||
    process.env.ADMIN_NOTIFICATION_PHONE ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    ''
  ).replace(/\D/g, '');

  const fullPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
  const messageText = formatOrderSummaryMessage(order);

  // 1. Meta WhatsApp Cloud API (Official API)
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (token && phoneId && fullPhone) {
    try {
      const res = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: fullPhone,
          type: 'text',
          text: { body: messageText },
        }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`[WHATSAPP DISPATCH] Meta Cloud API notification sent to +${fullPhone}`);
        return { success: true, provider: 'meta', data };
      }
    } catch (err: any) {
      console.error('[WHATSAPP DISPATCH] Meta Cloud API network error:', err);
    }
  }

  // 2. UltraMsg API
  const instanceId = process.env.WHATSAPP_INSTANCE_ID;
  const ultraToken = process.env.ULTRAMSG_TOKEN;
  if (instanceId && ultraToken && fullPhone) {
    try {
      const res = await fetch(`https://api.ultramsg.com/${instanceId}/messages/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          token: ultraToken,
          to: fullPhone,
          body: messageText,
        }),
      });
      const data = await res.json();
      console.log(`[WHATSAPP DISPATCH] UltraMsg notification sent to +${fullPhone}`);
      return { success: true, provider: 'ultramsg', data };
    } catch (err: any) {
      console.error('[WHATSAPP DISPATCH] UltraMsg error:', err);
    }
  }

  // 3. Custom Webhook fallback
  const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhone, text: messageText, order }),
      });
      console.log(`[WHATSAPP DISPATCH] Webhook sent to +${fullPhone}`);
      return { success: true, provider: 'webhook' };
    } catch (err: any) {
      console.error('[WHATSAPP DISPATCH] Webhook error:', err);
    }
  }

  const waUrl = getWhatsAppOrderUrl(order, fullPhone);
  console.log(`[WHATSAPP NOTIFICATION READY] Direct link: ${waUrl}`);
  return { success: true, link: waUrl };
}

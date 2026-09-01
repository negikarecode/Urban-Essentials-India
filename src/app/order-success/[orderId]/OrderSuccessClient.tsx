'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  Check,
  Package,
  Truck,
  ArrowRight,
  Printer,
  Calendar,
  MapPin,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Order } from '@/types';
import { getStoredOrders } from '@/lib/orderStore';

interface OrderSuccessClientProps {
  order: Order;
}

export function OrderSuccessClient({ order: initialOrder }: OrderSuccessClientProps) {
  const [order, setOrder] = useState<Order>(initialOrder);

  useEffect(() => {
    // Lookup latest saved order from client store
    const stored = getStoredOrders();
    const found = stored.find(
      (o) =>
        o.order_number === initialOrder.order_number ||
        o.id === initialOrder.id ||
        o.order_number === initialOrder.id
    );
    if (found) {
      setOrder(found);
    }
  }, [initialOrder]);

  useEffect(() => {
    // Trigger celebratory confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#153E2B', '#7A9A84', '#D97706', '#EAF1EC'],
      });
    } catch {
      // ignore
    }
  }, []);


  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Top Success Banner */}
      <div className="text-center space-y-4 mb-10">
        <div className="w-18 h-18 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle className="w-10 h-10" />
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          Payment Confirmed via Razorpay
        </span>
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-brand-forest-950 dark:text-white">
          Thank you! Your order is confirmed.
        </h1>
        <p className="text-sm text-brand-charcoal-600 dark:text-zinc-400 max-w-md mx-auto">
          We have sent your confirmation invoice to{' '}
          <strong className="text-brand-forest-900 dark:text-emerald-400">{order.shipping_address.email}</strong>.
        </p>
      </div>

      {/* Order Status Stepper */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-brand-cream-300 dark:border-zinc-800 shadow-xs mb-8">
        <div className="flex items-center justify-between pb-4 border-b border-brand-cream-200 dark:border-zinc-800 mb-6">
          <div>
            <span className="text-xs text-brand-charcoal-500 dark:text-zinc-400 font-medium">Order Reference:</span>
            <div className="font-mono font-extrabold text-base text-brand-forest-950 dark:text-white">
              #{order.order_number}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-brand-cream-300 dark:border-zinc-700 text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
          </div>
        </div>

        {/* 4-Step Timeline */}
        <div className="grid grid-cols-4 gap-2 text-center relative">
          <div className="space-y-1.5">
            <div className="w-8 h-8 rounded-full bg-brand-forest-800 dark:bg-emerald-600 text-white flex items-center justify-center mx-auto text-xs font-bold ring-4 ring-brand-forest-100 dark:ring-emerald-950">
              <Check className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-brand-forest-950 dark:text-white">Confirmed</div>
            <div className="text-[10px] text-brand-charcoal-500 dark:text-zinc-400">Paid</div>
          </div>

          <div className="space-y-1.5">
            <div className="w-8 h-8 rounded-full bg-brand-sage-500 text-white flex items-center justify-center mx-auto text-xs font-bold">
              2
            </div>
            <div className="text-xs font-bold text-brand-charcoal-800 dark:text-zinc-200">Processing</div>
            <div className="text-[10px] text-brand-charcoal-500 dark:text-zinc-400">In Warehouse</div>
          </div>

          <div className="space-y-1.5">
            <div className="w-8 h-8 rounded-full bg-brand-cream-300 dark:bg-zinc-700 text-brand-charcoal-600 dark:text-zinc-300 flex items-center justify-center mx-auto text-xs font-bold">
              3
            </div>
            <div className="text-xs font-semibold text-brand-charcoal-600 dark:text-zinc-400">Dispatched</div>
            <div className="text-[10px] text-brand-charcoal-400 dark:text-zinc-500">On the way</div>
          </div>

          <div className="space-y-1.5">
            <div className="w-8 h-8 rounded-full bg-brand-cream-300 dark:bg-zinc-700 text-brand-charcoal-600 dark:text-zinc-300 flex items-center justify-center mx-auto text-xs font-bold">
              4
            </div>
            <div className="text-xs font-semibold text-brand-charcoal-600 dark:text-zinc-400">Delivered</div>
            <div className="text-[10px] text-brand-charcoal-400 dark:text-zinc-500">Doorstep</div>
          </div>
        </div>
      </div>

      {/* Itemized Order Details & Address */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
        {/* Purchased Items */}
        <div className="md:col-span-7 bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-brand-cream-300 dark:border-zinc-800 shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-base text-brand-forest-950 dark:text-white pb-3 border-b border-brand-cream-200 dark:border-zinc-800 flex items-center gap-2">
            <Package className="w-4 h-4 text-brand-forest-700 dark:text-emerald-400" />
            <span>Items Ordered ({order.items.length})</span>
          </h3>

          <div className="divide-y divide-brand-cream-200 dark:divide-zinc-800">
            {order.items.map((item) => (
              <div key={item.id} className="py-3 flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-brand-cream-100 dark:bg-zinc-800 border border-brand-cream-300 dark:border-zinc-700 shrink-0">
                  <Image
                    src={item.product_image || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=100&q=80'}
                    alt={item.product_name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-brand-charcoal-900 dark:text-zinc-100 truncate">
                    {item.product_name}
                  </p>
                  {item.variant_name && (
                    <p className="text-[11px] text-brand-charcoal-500 dark:text-zinc-400">
                      {item.variant_name}
                    </p>
                  )}
                  <p className="text-[11px] text-brand-charcoal-400 dark:text-zinc-500">
                    Qty: {item.quantity} × {formatCurrency(item.unit_price)}
                  </p>
                </div>
                <div className="text-right text-xs font-bold text-brand-forest-950 dark:text-white">
                  {formatCurrency(item.total_price)}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="pt-3 border-t border-brand-cream-300 dark:border-zinc-800 space-y-2 text-xs text-brand-charcoal-600 dark:text-zinc-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-brand-charcoal-900 dark:text-zinc-100">{formatCurrency(order.subtotal)}</span>
            </div>
            {order.discount_amount > 0 && (
              <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                <span>Coupon Discount ({order.coupon_code})</span>
                <span>-{formatCurrency(order.discount_amount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{order.shipping_fee === 0 ? 'FREE' : formatCurrency(order.shipping_fee)}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-brand-forest-950 dark:text-white pt-2 border-t border-brand-cream-300 dark:border-zinc-800">
              <span>Total Paid</span>
              <span>{formatCurrency(order.total_amount)}</span>
            </div>
          </div>
        </div>

        {/* Shipping & Payment Meta */}
        <div className="md:col-span-5 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-brand-cream-300 dark:border-zinc-800 shadow-xs space-y-2">
            <h3 className="font-serif font-bold text-sm text-brand-forest-950 dark:text-white pb-2 border-b border-brand-cream-200 dark:border-zinc-800 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-forest-700 dark:text-emerald-400" />
              <span>Delivery Address</span>
            </h3>
            <p className="text-xs font-bold text-brand-charcoal-900 dark:text-zinc-100">
              {order.shipping_address.full_name}
            </p>
            <p className="text-xs text-brand-charcoal-600 dark:text-zinc-400 leading-relaxed">
              {order.shipping_address.address_line1}
              {order.shipping_address.address_line2 && `, ${order.shipping_address.address_line2}`}
              <br />
              {order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.postal_code}
            </p>
            <p className="text-xs text-brand-charcoal-600 dark:text-zinc-400 pt-1">
              Phone: <strong>+91 {order.shipping_address.phone}</strong>
            </p>
          </div>

          {/* Payment Info */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-brand-cream-300 dark:border-zinc-800 shadow-xs space-y-2">
            <h3 className="font-serif font-bold text-sm text-brand-forest-950 dark:text-white pb-2 border-b border-brand-cream-200 dark:border-zinc-800 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-brand-forest-700 dark:text-emerald-400" />
              <span>Payment Details</span>
            </h3>
            <div className="flex justify-between text-xs">
              <span className="text-brand-charcoal-500 dark:text-zinc-400">Gateway</span>
              <span className="font-bold text-brand-charcoal-800 dark:text-zinc-200 capitalize">{order.payment_method}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-brand-charcoal-500 dark:text-zinc-400">Status</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase">Paid</span>
            </div>
            {order.razorpay_payment_id && (
              <div className="flex justify-between text-xs">
                <span className="text-brand-charcoal-500 dark:text-zinc-400">Payment ID</span>
                <span className="font-mono text-brand-charcoal-800 dark:text-zinc-200 text-[11px]">
                  {order.razorpay_payment_id}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          href="/products"
          className="w-full sm:w-auto px-8 py-3.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/account"
          className="w-full sm:w-auto px-6 py-3.5 bg-white dark:bg-zinc-900 border border-brand-cream-400 dark:border-zinc-700 hover:bg-brand-cream-100 dark:hover:bg-zinc-800 text-brand-forest-900 dark:text-zinc-100 font-bold text-xs sm:text-sm rounded-xl shadow-xs flex items-center justify-center"
        >
          View in My Account
        </Link>
      </div>
    </div>
  );
}

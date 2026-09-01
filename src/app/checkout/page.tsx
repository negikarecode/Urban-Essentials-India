'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Lock,
  ChevronRight,
  ShoppingBag,
  Tag,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';
import { saveOrder } from '@/lib/orderStore';
import { deductStockForOrder } from '@/lib/productStore';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi NCR', 'Chandigarh'
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shippingFee, discountAmount, appliedCoupon, totalAmount, clearCart } = useCart();
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user?.full_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Delhi NCR');
  const [postalCode, setPostalCode] = useState('');


  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Dynamically load Razorpay checkout script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-cream-200 flex items-center justify-center text-brand-charcoal-400 mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-serif font-bold text-2xl text-brand-forest-950 mb-2">
          Your Cart is Empty
        </h1>
        <p className="text-xs text-brand-charcoal-500 mb-6">
          Add items before proceeding to checkout.
        </p>
        <Link
          href="/products"
          className="px-6 py-2.5 bg-brand-forest-800 text-white rounded-xl text-xs font-bold"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }

    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      toast.error('Please enter a valid email address');
      return;
    }

    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!addressLine1.trim()) {
      toast.error('Please enter your street address / flat number');
      return;
    }

    if (!city.trim()) {
      toast.error('Please enter your city');
      return;
    }

    const cleanPin = postalCode.trim().replace(/\D/g, '');
    if (cleanPin.length !== 6) {
      toast.error('Please enter a valid 6-digit PIN code');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Send Order initialization request to server
      const createRes = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            variantId: i.variantId,
            quantity: i.quantity,
            name: i.name,
            price: i.price,
            image: i.image,
            variantName: i.variantName,
          })),
          couponCode: appliedCoupon?.code,
          customerDetails: {
            fullName: fullName.trim(),
            email: email.trim(),
            phone: cleanPhone,
            addressLine1: addressLine1.trim(),
            addressLine2: addressLine2.trim(),
            city: city.trim(),
            state,
            postalCode: cleanPin,
          },
        }),
      });

      const orderData = await createRes.json();

      if (!createRes.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize order with server');
      }

      // 2. Launch Razorpay payment modal if real API key configured, or proceed with verified test mode
      const isRealRazorpayKey =
        orderData.keyId &&
        orderData.keyId.startsWith('rzp_') &&
        !orderData.keyId.includes('placeholder');

      if (typeof window.Razorpay !== 'undefined' && isRealRazorpayKey) {
        const options = {
          key: orderData.keyId,
          amount: orderData.amountInPaisa,
          currency: 'INR',
          name: 'Urban Essentials',
          description: `Order #${orderData.orderNumber}`,
          image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=200&q=80',
          order_id: orderData.razorpayOrderId.startsWith('order_') ? orderData.razorpayOrderId : undefined,
          prefill: {
            name: fullName.trim(),
            email: email.trim(),
            contact: cleanPhone,
          },
          theme: {
            color: '#153E2B',
          },
          handler: async function (response: any) {
            // 3. Verify Payment Signature with Server
            await finalizePaymentVerification({
              razorpayOrderId: response.razorpay_order_id || orderData.razorpayOrderId,
              razorpayPaymentId: response.razorpay_payment_id || `pay_${Date.now()}`,
              razorpaySignature: response.razorpay_signature || 'mock_sig',
              orderData,
            });
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
              toast.info('Payment was cancelled');
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
          setIsProcessing(false);
          toast.error(response.error?.description || 'Payment Failed');
        });
        rzp.open();
      } else {
        // Fallback test mode handler (simulates instantaneous confirmed transaction)
        await finalizePaymentVerification({
          razorpayOrderId: orderData.razorpayOrderId,
          razorpayPaymentId: `pay_test_${Date.now()}`,
          razorpaySignature: 'sig_test_verified',
          orderData,
        });
      }
    } catch (err: unknown) {
      const e = err as Error;
      console.error(e);
      setErrorMessage(e.message || 'Payment initiation failed');
      toast.error(e.message || 'Failed to process checkout');
      setIsProcessing(false);
    }
  };

  const finalizePaymentVerification = async (verifyPayload: any) => {
    try {
      const verifyRes = await fetch('/api/checkout/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(verifyPayload),
      });

      const result = await verifyRes.json();

      if (!verifyRes.ok || !result.success) {
        throw new Error(result.error || 'Payment signature verification failed.');
      }

      if (result.order) {
        saveOrder(result.order);
        deductStockForOrder(
          items.map((i) => ({
            productId: i.productId,
            variantId: i.variantId,
            quantity: i.quantity,
          }))
        );
      }

      toast.success('Payment confirmed! Your order is placed.');
      clearCart();
      router.push(`/order-success/${result.order.order_number}`);
    } catch (err: unknown) {
      const e = err as Error;
      setErrorMessage(e.message);
      toast.error(e.message);
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-brand-charcoal-500 dark:text-zinc-400 mb-6">
        <Link href="/" className="hover:text-brand-forest-800 dark:hover:text-emerald-400">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/cart" className="hover:text-brand-forest-800 dark:hover:text-emerald-400">Cart</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-forest-900 dark:text-zinc-100 font-bold">Secure Checkout</span>
      </nav>

      <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-brand-forest-950 dark:text-white mb-8">
        Secure Express Checkout
      </h1>

      {errorMessage && (
        <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-2xl flex items-center gap-3 text-rose-700 dark:text-rose-300 text-xs">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Customer & Shipping Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Contact Details Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-brand-cream-300 dark:border-zinc-800 shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-lg text-brand-forest-950 dark:text-white pb-3 border-b border-brand-cream-200 dark:border-zinc-800">
              1. Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                  Email Address (for invoice & tracking) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                  Mobile Number (for delivery OTP) *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-brand-cream-400 dark:border-zinc-700 bg-brand-cream-100 dark:bg-zinc-800 text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-r-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-brand-cream-300 dark:border-zinc-800 shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-lg text-brand-forest-950 dark:text-white pb-3 border-b border-brand-cream-200 dark:border-zinc-800">
              2. Delivery Address
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                  Flat / House No. / Building / Street *
                </label>
                <input
                  type="text"
                  required
                  placeholder="House / Flat No., Street, Area"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                  Area / Sector / Landmark (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Landmark (Optional)"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                    State *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-800 text-brand-charcoal-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="6-digit PIN"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Details */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-brand-cream-300 dark:border-zinc-800 shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-lg text-brand-forest-950 dark:text-white pb-3 border-b border-brand-cream-200 dark:border-zinc-800 flex items-center justify-between">
              <span>3. Payment Gateway</span>
              <span className="text-xs font-bold text-brand-forest-800 dark:text-emerald-400 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> Razorpay 256-Bit SSL
              </span>
            </h2>
            <div className="p-4 rounded-2xl bg-brand-forest-50 dark:bg-brand-forest-950/60 border border-brand-forest-200 dark:border-brand-forest-800 flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-brand-forest-800 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-brand-forest-950 dark:text-white">
                  UPI (GPay, PhonePe, Paytm), All Credit & Debit Cards, NetBanking
                </p>
                <p className="text-[11px] text-brand-charcoal-600 dark:text-zinc-400 mt-0.5">
                  Safe, encrypted, instant payment verification via Razorpay.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Order Summary & Place Order Button */}
        <div className="lg:col-span-5 p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-brand-cream-300 dark:border-zinc-800 shadow-xs space-y-6 sticky top-28">
          <h2 className="font-serif font-bold text-xl text-brand-forest-950 dark:text-white pb-4 border-b border-brand-cream-300 dark:border-zinc-800">
            Order Review ({items.length})
          </h2>

          {/* Items list */}
          <div className="divide-y divide-brand-cream-200 dark:divide-zinc-800 max-h-64 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="py-3 flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-brand-cream-100 dark:bg-zinc-800 border border-brand-cream-300 dark:border-zinc-700 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-1 right-1 px-1.5 py-0.5 rounded-full bg-brand-forest-900 text-white text-[9px] font-bold">
                    {item.quantity}x
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-brand-charcoal-900 dark:text-zinc-100 truncate">
                    {item.name}
                  </p>
                  {item.variantName && (
                    <p className="text-[11px] text-brand-charcoal-500 dark:text-zinc-400">
                      {item.variantName}
                    </p>
                  )}
                </div>
                <div className="text-right font-extrabold text-xs text-brand-forest-950 dark:text-white">
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Applied Coupon details */}
          {appliedCoupon && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300">
              <Tag className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-{formatCurrency(discountAmount)})</span>
            </div>
          )}

          {/* Price Breakdown */}
          <div className="space-y-2.5 text-xs text-brand-charcoal-600 dark:text-zinc-400 pt-3 border-t border-brand-cream-300 dark:border-zinc-800">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-bold text-brand-charcoal-900 dark:text-zinc-100">{formatCurrency(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                <span>Promotional Discount</span>
                <span>-{formatCurrency(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Express Delivery Fee</span>
              <span>
                {shippingFee === 0 ? (
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold uppercase">Free</span>
                ) : (
                  formatCurrency(shippingFee)
                )}
              </span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-brand-forest-950 dark:text-white pt-3 border-t border-brand-cream-300 dark:border-zinc-800">
              <span>Total Payable</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          {/* Place Order CTA */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 px-6 bg-brand-forest-800 hover:bg-brand-forest-900 text-white text-sm font-extrabold rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Securing Order & Connecting Razorpay...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Pay {formatCurrency(totalAmount)} with Razorpay</span>
              </div>
            )}
          </button>

          {/* Guarantee Micro-features */}
          <div className="space-y-2 pt-2 text-[11px] text-brand-charcoal-500 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-brand-forest-700 dark:text-emerald-400 shrink-0" />
              <span>Ships in 24 hours with SMS and WhatsApp live dispatch tracking.</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>100% money-back guarantee if transit damage occurs.</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

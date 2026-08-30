'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    shippingFee,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    discountAmount,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    totalAmount,
    itemCount,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCouponCode(couponInput.trim());
    if (res.success) {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-brand-cream-300 flex items-center justify-between bg-brand-cream-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-forest-800" />
              <h2 className="font-serif font-bold text-lg text-brand-forest-900">
                Your Cart ({itemCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              aria-label="Close cart"
              className="p-2 rounded-full hover:bg-brand-cream-200 text-brand-charcoal-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-brand-cream-100 p-3 sm:px-5 border-b border-brand-cream-300">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-forest-900 mb-1.5">
              <Truck className="w-4 h-4 text-brand-forest-700 shrink-0" />
              {amountNeededForFreeShipping > 0 ? (
                <span>
                  Add <strong className="text-brand-forest-800">{formatCurrency(amountNeededForFreeShipping)}</strong> more to get <strong>FREE Express Shipping</strong>!
                </span>
              ) : (
                <span className="text-emerald-700 flex items-center gap-1">
                  🎉 You unlocked <strong>FREE Express Shipping</strong>!
                </span>
              )}
            </div>
            <div className="w-full bg-brand-cream-300 rounded-full h-2 overflow-hidden">
              <div
                className="bg-brand-forest-700 h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-brand-cream-200 flex items-center justify-center text-brand-charcoal-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-semibold text-lg text-brand-charcoal-900 mb-1">
                  Your cart is empty
                </h3>
                <p className="text-sm text-brand-charcoal-500 max-w-xs mb-6">
                  Discover our durable lunch boxes, vacuum flasks, backpacks and desk essentials.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 pb-4 border-b border-brand-cream-200 last:border-0"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 bg-brand-cream-100 rounded-lg overflow-hidden shrink-0 border border-brand-cream-300">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-semibold text-brand-charcoal-900 line-clamp-1">
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={closeCart}
                            className="hover:text-brand-forest-700"
                          >
                            {item.name}
                          </Link>
                        </h4>
                        {item.variantName && (
                          <p className="text-xs text-brand-charcoal-500 mt-0.5">
                            {item.variantName}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-brand-charcoal-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-brand-cream-400 rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-brand-charcoal-600 hover:bg-brand-cream-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-brand-charcoal-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="p-1 text-brand-charcoal-600 hover:bg-brand-cream-200 transition-colors disabled:opacity-30"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-sm font-bold text-brand-forest-900">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                        {item.compare_at_price && item.compare_at_price > item.price && (
                          <div className="text-[11px] text-brand-charcoal-400 line-through">
                            {formatCurrency(item.compare_at_price * item.quantity)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-brand-cream-300 bg-brand-cream-50/50 space-y-3.5">
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-{formatCurrency(discountAmount)})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-700 hover:text-emerald-900 text-xs font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Discount code (e.g. KURA20)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-1 focus:ring-brand-forest-600 uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-brand-forest-800 text-white rounded-lg text-xs font-semibold hover:bg-brand-forest-900 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-brand-charcoal-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-charcoal-900">{formatCurrency(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-semibold uppercase">Free</span>
                    ) : (
                      formatCurrency(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-brand-forest-950 pt-2 border-t border-brand-cream-300">
                  <span>Total Amount</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-3 px-4 bg-brand-forest-800 hover:bg-brand-forest-900 text-white text-sm font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Trust micro-text */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-brand-charcoal-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Secure Razorpay Checkout with 256-bit Encryption</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

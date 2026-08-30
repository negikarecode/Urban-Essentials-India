'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  RotateCcw,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';

export function CartDrawer() {
  const {
    items,
    savedItems,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    saveForLater,
    moveToCart,
    removeSavedItem,
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
  const [showSavedItems, setShowSavedItems] = useState(false);

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
            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Remove all items"
                >
                  Clear
                </button>
              )}
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="p-1.5 rounded-full hover:bg-brand-cream-200 text-brand-charcoal-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-brand-cream-100 p-3 sm:px-5 border-b border-brand-cream-300">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-forest-900 mb-1.5">
              <Truck className="w-4 h-4 text-brand-forest-700 shrink-0" />
              {amountNeededForFreeShipping > 0 ? (
                <span>
                  Add <strong className="text-brand-forest-800">{formatCurrency(amountNeededForFreeShipping)}</strong> more to unlock <strong>FREE Express Shipping</strong>!
                </span>
              ) : (
                <span className="text-emerald-700 flex items-center gap-1">
                  You unlocked <strong>FREE Express Shipping</strong>!
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
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-brand-cream-200 flex items-center justify-center text-brand-charcoal-400 border border-brand-cream-300">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-lg text-brand-charcoal-900">
                  Your cart is empty
                </h3>
                <p className="text-xs text-brand-charcoal-500 max-w-xs leading-relaxed">
                  Explore our bento boxes, vacuum flasks, backpacks, and everyday desk gear.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-2 px-6 py-2.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
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
                  <div className="relative w-20 h-20 bg-brand-cream-100 rounded-xl overflow-hidden shrink-0 border border-brand-cream-300">
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
                        <h4 className="text-xs sm:text-sm font-bold text-brand-charcoal-900 line-clamp-1">
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={closeCart}
                            className="hover:text-brand-forest-700 transition-colors"
                          >
                            {item.name}
                          </Link>
                        </h4>
                        {item.variantName && (
                          <p className="text-[11px] text-brand-charcoal-500 mt-0.5">
                            {item.variantName}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-brand-charcoal-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-brand-cream-400 rounded-lg bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-brand-charcoal-600 hover:bg-brand-cream-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-brand-charcoal-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="p-1 text-brand-charcoal-600 hover:bg-brand-cream-200 transition-colors disabled:opacity-30"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Save for later button */}
                      <button
                        onClick={() => saveForLater(item.id)}
                        className="text-[10px] font-semibold text-brand-charcoal-500 hover:text-brand-forest-800 flex items-center gap-1"
                      >
                        <Bookmark className="w-3 h-3" />
                        <span>Save for later</span>
                      </button>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-bold text-brand-forest-950">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                        {item.compare_at_price && item.compare_at_price > item.price && (
                          <div className="text-[10px] text-brand-charcoal-400 line-through">
                            {formatCurrency(item.compare_at_price * item.quantity)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Saved for Later Section */}
            {savedItems.length > 0 && (
              <div className="pt-4 border-t border-brand-cream-300">
                <button
                  onClick={() => setShowSavedItems(!showSavedItems)}
                  className="w-full flex items-center justify-between text-xs font-bold text-brand-forest-900 py-1"
                >
                  <span className="flex items-center gap-1.5">
                    <BookmarkCheck className="w-3.5 h-3.5 text-brand-forest-700" />
                    <span>Saved for Later ({savedItems.length})</span>
                  </span>
                  <span className="text-[10px] text-brand-charcoal-500">
                    {showSavedItems ? 'Hide' : 'Show'}
                  </span>
                </button>

                {showSavedItems && (
                  <div className="space-y-3 pt-3">
                    {savedItems.map((si) => (
                      <div
                        key={si.id}
                        className="flex items-center justify-between gap-3 p-2.5 bg-brand-cream-100/60 rounded-xl border border-brand-cream-300 text-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden shrink-0">
                            <Image
                              src={si.image}
                              alt={si.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div className="truncate">
                            <p className="font-bold text-brand-charcoal-900 truncate">
                              {si.name}
                            </p>
                            <p className="text-[11px] font-semibold text-brand-forest-800">
                              {formatCurrency(si.price)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => moveToCart(si.id)}
                            className="px-2.5 py-1 bg-brand-forest-800 text-white rounded-lg text-[11px] font-bold hover:bg-brand-forest-900"
                          >
                            Move to Cart
                          </button>
                          <button
                            onClick={() => removeSavedItem(si.id)}
                            className="p-1 text-brand-charcoal-400 hover:text-rose-600"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-brand-cream-300 bg-brand-cream-50/50 space-y-3.5">
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-{formatCurrency(discountAmount)})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-700 hover:text-emerald-900 text-xs font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Discount code (e.g. URBAN20)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-brand-cream-300 focus:outline-none focus:ring-1 focus:ring-brand-forest-700 uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-forest-800 text-white rounded-xl text-xs font-bold hover:bg-brand-forest-900 transition-colors"
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
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase">Free</span>
                    ) : (
                      formatCurrency(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-brand-forest-950 pt-2 border-t border-brand-cream-300">
                  <span>Total Amount</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-3 px-4 bg-brand-forest-800 hover:bg-brand-forest-900 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block text-center text-[11px] font-bold text-brand-forest-800 hover:text-brand-forest-950 underline"
                >
                  View Full Cart Page
                </Link>
              </div>

              {/* Trust micro-text */}
              <div className="flex items-center justify-center gap-2 text-[10px] text-brand-charcoal-500 pt-1">
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

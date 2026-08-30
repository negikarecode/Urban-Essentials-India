'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  ShieldCheck,
  Tag,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  RotateCcw,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import { COUPONS_DATA } from '@/lib/data/products';
import { Skeleton } from '@/components/ui/Skeleton';

export default function CartPage() {
  const {
    items,
    savedItems,
    isLoading,
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
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCouponCode(couponInput.trim());
    if (res.success) setCouponInput('');
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <Skeleton className="h-10 w-64 rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-3xl" />
            <Skeleton className="h-40 w-full rounded-3xl" />
          </div>
          <div className="lg:col-span-4">
            <Skeleton className="h-96 w-full rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0 && savedItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-brand-cream-200 flex items-center justify-center text-brand-charcoal-400 mx-auto border border-brand-cream-300">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-brand-forest-950">
          Your Shopping Cart is Empty
        </h1>
        <p className="text-xs sm:text-sm text-brand-charcoal-600 max-w-md mx-auto leading-relaxed">
          Looks like you haven&apos;t added any essentials yet. Discover our curated collections for school, college, and office.
        </p>
        <div className="pt-2">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-brand-charcoal-500 mb-6">
        <Link href="/" className="hover:text-brand-forest-800">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-forest-900">Shopping Cart</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-brand-forest-950">
          Your Cart ({items.length} item{items.length !== 1 ? 's' : ''})
        </h1>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Cart Items & Saved For Later */}
        <div className="lg:col-span-8 space-y-6">
          {/* Free Shipping Progress */}
          {items.length > 0 && (
            <div className="bg-brand-cream-100 p-4 rounded-2xl border border-brand-cream-300">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-forest-900 mb-2">
                <Truck className="w-4 h-4 text-brand-forest-700 shrink-0" />
                {amountNeededForFreeShipping > 0 ? (
                  <span>
                    Add <strong className="text-brand-forest-800">{formatCurrency(amountNeededForFreeShipping)}</strong> more to unlock <strong>FREE Express Shipping</strong>!
                  </span>
                ) : (
                  <span className="text-emerald-700">
                    You unlocked <strong>FREE Express Shipping across India</strong>!
                  </span>
                )}
              </div>
              <div className="w-full bg-brand-cream-300 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-brand-forest-700 h-full rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Active Items Table / List */}
          {items.length > 0 ? (
            <div className="bg-white rounded-3xl border border-brand-cream-300 divide-y divide-brand-cream-200 overflow-hidden shadow-xs">
              {items.map((item) => (
                <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center">
                  {/* Thumbnail */}
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-brand-cream-100 border border-brand-cream-300 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-bold text-sm sm:text-base text-brand-charcoal-900 hover:text-brand-forest-800">
                      <Link href={`/products/${item.slug}`}>
                        {item.name}
                      </Link>
                    </h3>
                    {item.variantName && (
                      <p className="text-xs text-brand-charcoal-500 mt-0.5">
                        {item.variantName}
                      </p>
                    )}
                    <div className="text-xs font-bold text-brand-forest-900 mt-1">
                      {formatCurrency(item.price)} each
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        onClick={() => saveForLater(item.id)}
                        className="text-[11px] font-semibold text-brand-charcoal-500 hover:text-brand-forest-800 flex items-center gap-1"
                      >
                        <Bookmark className="w-3 h-3" />
                        <span>Save for Later</span>
                      </button>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-brand-cream-200">
                    {/* Stepper */}
                    <div className="flex items-center border border-brand-cream-400 rounded-xl bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-brand-charcoal-600 hover:bg-brand-cream-200 rounded-l-xl transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center text-xs font-bold text-brand-charcoal-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.maxStock}
                        className="p-2 text-brand-charcoal-600 hover:bg-brand-cream-200 rounded-r-xl transition-colors disabled:opacity-30"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Total */}
                    <div className="text-right min-w-[80px]">
                      <div className="font-extrabold text-base text-brand-forest-950">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-brand-charcoal-400 hover:text-rose-600 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-brand-cream-300 p-8 text-center">
              <p className="text-sm font-semibold text-brand-charcoal-700">
                Your active cart has no items. Check your saved items below.
              </p>
            </div>
          )}

          {/* Saved For Later Section */}
          {savedItems.length > 0 && (
            <div className="bg-white rounded-3xl border border-brand-cream-300 p-6 space-y-4 shadow-xs">
              <h3 className="font-serif font-bold text-lg text-brand-forest-950 flex items-center gap-2">
                <BookmarkCheck className="w-5 h-5 text-brand-forest-700" />
                <span>Saved for Later ({savedItems.length})</span>
              </h3>

              <div className="divide-y divide-brand-cream-200">
                {savedItems.map((si) => (
                  <div key={si.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-brand-cream-100 shrink-0 border border-brand-cream-300">
                        <Image
                          src={si.image}
                          alt={si.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="truncate">
                        <h4 className="font-bold text-sm text-brand-charcoal-900 truncate">
                          {si.name}
                        </h4>
                        <p className="text-xs font-bold text-brand-forest-900 mt-0.5">
                          {formatCurrency(si.price)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => moveToCart(si.id)}
                        className="px-4 py-2 bg-brand-forest-800 text-white rounded-xl text-xs font-bold hover:bg-brand-forest-900 transition-colors"
                      >
                        Move to Cart
                      </button>
                      <button
                        onClick={() => removeSavedItem(si.id)}
                        className="p-1.5 text-brand-charcoal-400 hover:text-rose-600"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available Promo Coupons Click to Apply */}
          <div className="bg-brand-cream-100/70 p-5 rounded-3xl border border-brand-cream-300">
            <h4 className="font-serif font-bold text-sm text-brand-forest-950 mb-3 flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-brand-forest-700" />
              <span>Available Promotional Coupons</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {COUPONS_DATA.map((c) => (
                <div
                  key={c.id}
                  className="p-3 bg-white rounded-xl border border-brand-cream-300 flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <span className="font-mono font-extrabold text-xs text-brand-forest-900 bg-brand-forest-50 px-2 py-0.5 rounded border border-brand-forest-200">
                      {c.code}
                    </span>
                    <p className="text-[11px] text-brand-charcoal-600 mt-1.5 line-clamp-2">
                      {c.description}
                    </p>
                  </div>
                  <button
                    onClick={() => applyCouponCode(c.code)}
                    className="mt-2 text-[11px] font-bold text-brand-forest-800 hover:text-brand-forest-950 text-left"
                  >
                    Apply Coupon &rarr;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Order Summary */}
        {items.length > 0 && (
          <div className="lg:col-span-4 p-6 bg-white rounded-3xl border border-brand-cream-300 shadow-xs space-y-6 sticky top-28">
            <h2 className="font-serif font-bold text-xl text-brand-forest-950 pb-4 border-b border-brand-cream-300">
              Order Summary
            </h2>

            {/* Coupon Input */}
            <div>
              <label className="block text-xs font-bold text-brand-charcoal-700 uppercase tracking-wider mb-2">
                Apply Coupon Code
              </label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span><strong>{appliedCoupon.code}</strong> (-{formatCurrency(discountAmount)})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-700 hover:text-emerald-900 font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. KURA20"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-brand-cream-400 focus:outline-none focus:ring-1 focus:ring-brand-forest-800 uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-forest-800 text-white rounded-xl text-xs font-bold hover:bg-brand-forest-900"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 text-xs text-brand-charcoal-600 pt-2 border-t border-brand-cream-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-brand-charcoal-900">{formatCurrency(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Coupon Discount</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase">Free</span>
                  ) : (
                    formatCurrency(shippingFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-brand-forest-950 pt-3 border-t border-brand-cream-300">
                <span>Grand Total</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <Link
              href="/checkout"
              className="w-full py-4 px-6 bg-brand-forest-800 hover:bg-brand-forest-900 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 group transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Security badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-brand-charcoal-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>256-Bit SSL Encrypted Razorpay Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

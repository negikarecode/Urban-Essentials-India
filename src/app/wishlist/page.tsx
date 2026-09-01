'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2, ArrowRight, ChevronRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';

export default function WishlistPage() {
  const { wishlistProducts, toggleWishlist } = useWishlist();
  const { addItem } = useCart();

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-500 mx-auto mb-4">
          <Heart className="w-8 h-8" />
        </div>
        <h1 className="font-serif font-bold text-2xl text-brand-forest-950 dark:text-white mb-2">
          Your Wishlist is Empty
        </h1>
        <p className="text-xs text-brand-charcoal-500 dark:text-zinc-400 max-w-sm mx-auto mb-6">
          Save your favorite bottles, backpacks, and lunchboxes to review anytime.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-brand-charcoal-500 dark:text-zinc-400 mb-6">
        <Link href="/" className="hover:text-brand-forest-800 dark:hover:text-emerald-400">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-forest-900 dark:text-zinc-100">Wishlist</span>
      </nav>

      <h1 className="font-serif font-extrabold text-3xl text-brand-forest-950 dark:text-white mb-8">
        My Saved Wishlist ({wishlistProducts.length})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-zinc-900 rounded-2xl border border-brand-cream-300 dark:border-zinc-800 overflow-hidden shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[4/5] w-full bg-brand-cream-100 dark:bg-zinc-800">
                <Image
                  src={product.images[0]?.image_url || '/placeholder.png'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-zinc-800/90 text-rose-500 hover:bg-white dark:hover:bg-zinc-700 shadow-xs"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4">
                <span className="text-[10px] font-bold text-brand-forest-800 dark:text-emerald-400 uppercase tracking-wider">
                  {product.category_name}
                </span>
                <h3 className="font-serif font-bold text-sm text-brand-charcoal-900 dark:text-zinc-100 line-clamp-1 mt-0.5 hover:text-brand-forest-800 dark:hover:text-emerald-400">
                  <Link href={`/products/${product.slug}`}>
                    {product.name}
                  </Link>
                </h3>
                <div className="text-xs font-extrabold text-brand-forest-950 dark:text-white mt-1">
                  {formatCurrency(product.price)}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={() => addItem(product, undefined, 1)}
                className="w-full py-2.5 px-3 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

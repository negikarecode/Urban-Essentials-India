'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import { useLiveProducts } from '@/lib/productStore';
import { ProductCard } from '@/components/product/ProductCard';

export function TrendingProducts() {
  const { products: allProducts } = useLiveProducts();
  const products = [...allProducts]
    .filter((p) => p.is_active)
    .sort((a, b) => {
      const aTrend = (a.is_featured ? 2 : 0) + (a.is_new_arrival ? 1 : 0);
      const bTrend = (b.is_featured ? 2 : 0) + (b.is_new_arrival ? 1 : 0);
      if (bTrend !== aTrend) return bTrend - aTrend;
      if ((b.rating || 0) !== (a.rating || 0)) return (b.rating || 0) - (a.rating || 0);
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    })
    .slice(0, 4);


  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-zinc-950 border-b border-brand-cream-300 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-brand-forest-950 dark:text-white">
              Trending Products
            </h2>
            <p className="text-xs sm:text-sm text-brand-charcoal-600 dark:text-zinc-400 mt-1">
              Top-rated daily carry picks receiving rave reviews across India.
            </p>
          </div>

          <Link
            href="/products?sort=rating"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-forest-800 dark:text-emerald-400 hover:text-brand-forest-950 dark:hover:text-white group"
          >
            <span>View All Trending</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid - Instant 0ms render */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}

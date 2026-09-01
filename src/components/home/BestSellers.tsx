'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Trophy } from 'lucide-react';
import { useLiveProducts } from '@/lib/productStore';
import { ProductCard } from '@/components/product/ProductCard';

export function BestSellers() {
  const { products: allProducts } = useLiveProducts();
  const products = [...allProducts]
    .filter((p) => p.is_active)
    .sort((a, b) => {
      if (a.is_bestseller && !b.is_bestseller) return -1;
      if (!a.is_bestseller && b.is_bestseller) return 1;
      if ((b.rating || 0) !== (a.rating || 0)) return (b.rating || 0) - (a.rating || 0);
      if ((b.review_count || 0) !== (a.review_count || 0)) return (b.review_count || 0) - (a.review_count || 0);
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    })
    .slice(0, 4);


  if (products.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-full overflow-hidden py-16 sm:py-20 bg-brand-cream-50 dark:bg-zinc-950 border-b border-brand-cream-300 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-forest-800 dark:text-emerald-400 uppercase tracking-wider mb-2">
              <Trophy className="w-4 h-4 text-brand-forest-700 dark:text-emerald-400" />
              <span>Most Popular</span>
            </div>
            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-brand-forest-950 dark:text-white">
              Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-brand-charcoal-600 dark:text-zinc-400 mt-1">
              Proven everyday essentials trusted by tens of thousands of users.
            </p>
          </div>

          <Link
            href="/products?sort=bestseller"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-forest-800 dark:text-emerald-400 hover:text-brand-forest-950 dark:hover:text-white group"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid - Zero latency instant render */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}

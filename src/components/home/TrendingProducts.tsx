'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import { getProducts } from '@/lib/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types';

export function TrendingProducts() {
  const [products] = useState<Product[]>(() =>
    getProducts()
      .filter((p) => p.is_bestseller || p.rating >= 4.85)
      .slice(0, 4)
  );

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-brand-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-brand-forest-950">
              Trending Products
            </h2>
            <p className="text-xs sm:text-sm text-brand-charcoal-600 mt-1">
              Top-rated daily carry picks receiving rave reviews across India.
            </p>
          </div>

          <Link
            href="/products?sort=rating"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-forest-800 hover:text-brand-forest-950 group"
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

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Trophy } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { getBestsellers } from '@/lib/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { Product } from '@/types';

export function BestSellers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBestsellers() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .eq('is_bestseller', true)
          .limit(4);

        if (!error && data && data.length > 0) {
          setProducts(data as Product[]);
        } else {
          setProducts(getBestsellers().slice(0, 4));
        }
      } catch {
        setProducts(getBestsellers().slice(0, 4));
      } finally {
        setIsLoading(false);
      }
    }

    fetchBestsellers();
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-brand-cream-50 border-b border-brand-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-forest-800 uppercase tracking-wider mb-2">
              <Trophy className="w-4 h-4 text-brand-forest-700" />
              <span>Most Popular</span>
            </div>
            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-brand-forest-950">
              Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-brand-charcoal-600 mt-1">
              Proven everyday essentials trusted by tens of thousands of users.
            </p>
          </div>

          <Link
            href="/products?sort=bestseller"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-forest-800 hover:text-brand-forest-950 group"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading Skeletons or Product Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-2xl" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

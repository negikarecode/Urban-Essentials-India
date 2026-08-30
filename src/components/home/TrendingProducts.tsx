'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { getProducts } from '@/lib/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { Product } from '@/types';

export function TrendingProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('rating', { ascending: false })
          .limit(4);

        if (!error && data && data.length > 0) {
          setProducts(data as Product[]);
        } else {
          // Fallback to local verified dataset
          const localItems = getProducts().filter((p) => p.is_bestseller || p.rating >= 4.85).slice(0, 4);
          setProducts(localItems);
        }
      } catch {
        const localItems = getProducts().filter((p) => p.is_bestseller || p.rating >= 4.85).slice(0, 4);
        setProducts(localItems);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrending();
  }, []);

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

        {/* Loading Skeletons or Product Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[4/5] w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
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

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, GraduationCap } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { getProductsByAudience } from '@/lib/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { Product } from '@/types';

export function FeaturedCollection() {
  const [products, setProducts] = useState<Product[]>(() => getProductsByAudience('college').slice(0, 4));

  useEffect(() => {
    async function fetchCampus() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .in('target_audience', ['college', 'all'])
          .limit(4);

        if (!error && data && data.length > 0) {
          setProducts(data as Product[]);
        }
      } catch {
        // Fallback already rendered instantly
      }
    }

    fetchCampus();
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-zinc-950 border-b border-brand-cream-300 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner + Grid Card Container */}
        <div className="rounded-3xl bg-brand-cream-100/80 dark:bg-zinc-900 border border-brand-cream-300 dark:border-zinc-800 p-6 sm:p-10 lg:p-12 space-y-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-forest-100 dark:bg-emerald-950/60 text-brand-forest-900 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-brand-forest-700 dark:text-emerald-400" />
                <span>Featured Collection</span>
              </div>
              <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-brand-forest-950 dark:text-white">
                Campus Essentials
              </h2>
              <p className="text-xs sm:text-sm text-brand-charcoal-600 dark:text-zinc-400 max-w-xl">
                Rugged 16&quot; backpacks, double-wall stainless hydration flasks, and fountain pen friendly notebooks designed to endure active student schedules.
              </p>
            </div>

            <Link href="/audience/college">
              <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Campus Collection
              </Button>
            </Link>
          </div>

          {/* Products Grid - Instant Zero-Latency Render */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

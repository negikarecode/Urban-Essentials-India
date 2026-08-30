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
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        } else {
          setProducts(getProductsByAudience('college').slice(0, 4));
        }
      } catch {
        setProducts(getProductsByAudience('college').slice(0, 4));
      } finally {
        setIsLoading(false);
      }
    }

    fetchCampus();
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-brand-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner + Grid Card Container */}
        <div className="rounded-3xl bg-brand-cream-100/80 border border-brand-cream-300 p-6 sm:p-10 lg:p-12 space-y-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-forest-100 text-brand-forest-900 text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-brand-forest-700" />
                <span>Featured Collection</span>
              </div>
              <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-brand-forest-950">
                Campus Essentials
              </h2>
              <p className="text-xs sm:text-sm text-brand-charcoal-600 max-w-xl">
                Rugged 16&quot; backpacks, double-wall stainless hydration flasks, and fountain pen friendly notebooks designed to endure active student schedules.
              </p>
            </div>

            <Link href="/audience/college">
              <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Campus Collection
              </Button>
            </Link>
          </div>

          {/* Products Grid */}
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

      </div>
    </section>
  );
}

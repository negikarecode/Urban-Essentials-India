'use client';

import React from 'react';
import Link from 'next/link';
import { Product, TargetAudience } from '@/types';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useLiveProducts } from '@/lib/productStore';

interface AudienceClientProps {
  targetKey: string;
  pill: string;
  initialProducts: Product[];
}

export function AudienceClient({ targetKey, pill, initialProducts }: AudienceClientProps) {
  const { products: allProducts } = useLiveProducts(initialProducts);

  const products = (allProducts && allProducts.length > 0 ? allProducts : initialProducts).filter(
    (p) => (p.target_audience === targetKey || p.target_audience === 'all') && p.is_active
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-brand-cream-300 dark:border-zinc-800 gap-3">
        <h2 className="font-serif font-bold text-xl text-brand-forest-950 dark:text-white">
          Recommended Products ({products.length})
        </h2>
        <div className="flex gap-2 flex-wrap">
          {['school', 'college', 'office'].filter((k) => k !== targetKey).map((other) => (
            <Link
              key={other}
              href={`/audience/${other}`}
              className="px-3 py-1.5 rounded-lg border border-brand-cream-300 dark:border-zinc-700 text-xs font-semibold text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-100 dark:hover:bg-zinc-800 capitalize"
            >
              View {other} &rarr;
            </Link>
          ))}
        </div>
      </div>

      <ProductGrid
        products={products}
        emptyMessage={`No products listed under ${pill}.`}
      />
    </div>
  );
}

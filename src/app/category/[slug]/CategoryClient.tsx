'use client';

import React from 'react';
import Link from 'next/link';
import { Product, Category } from '@/types';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useLiveProducts } from '@/lib/productStore';

interface CategoryClientProps {
  category: Category;
  initialProducts: Product[];
}

export function CategoryClient({ category, initialProducts }: CategoryClientProps) {
  const { products: allProducts } = useLiveProducts(initialProducts);

  const products = (allProducts && allProducts.length > 0 ? allProducts : initialProducts).filter(
    (p) => (p.category_slug === category.slug || p.category_id === category.id) && p.is_active
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-brand-cream-300 dark:border-zinc-800">
        <h2 className="font-serif font-bold text-xl text-brand-forest-950 dark:text-white">
          Products ({products.length})
        </h2>
        <Link
          href="/products"
          className="text-xs font-bold text-brand-forest-800 dark:text-emerald-400 hover:text-brand-forest-950 dark:hover:text-white"
        >
          Explore all categories &rarr;
        </Link>
      </div>

      <ProductGrid
        products={products}
        emptyMessage={`No active products currently listed in ${category.name}.`}
      />
    </div>
  );
}

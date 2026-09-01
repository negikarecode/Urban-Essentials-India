'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '@/lib/data/products';
import { useLiveProducts } from '@/lib/productStore';
import { ProductCard } from '@/components/product/ProductCard';
import { Category, Product } from '@/types';

export function CategoryProductSections() {
  const { products: allProducts } = useLiveProducts();

  // Filter only active categories
  const activeCategories = CATEGORIES.filter((c) => c.is_active);

  // Group and rank best products for each category
  const categorySectionsData = activeCategories.map((category) => {
    const categoryProducts = allProducts.filter(
      (p) =>
        p.is_active &&
        (p.category_slug === category.slug ||
          p.category_id === category.id ||
          (p.tags && p.tags.includes(category.slug)))
    );

    // Automatic Ranking Formula for "Best Product Cards":
    // 1. Bestseller flag (true first)
    // 2. Featured flag (true first)
    // 3. Highest Rating (5.0, 4.9, 4.8...)
    // 4. Highest Review Count
    // 5. Newest created
    const bestProducts = [...categoryProducts]
      .sort((a, b) => {
        if (a.is_bestseller && !b.is_bestseller) return -1;
        if (!a.is_bestseller && b.is_bestseller) return 1;

        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;

        if ((b.rating || 0) !== (a.rating || 0)) {
          return (b.rating || 0) - (a.rating || 0);
        }

        if ((b.review_count || 0) !== (a.review_count || 0)) {
          return (b.review_count || 0) - (a.review_count || 0);
        }

        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      })
      .slice(0, 4);

    return {
      category,
      products: bestProducts,
      totalCount: categoryProducts.length,
    };
  });

  // Filter only sections that have products
  const populatedSections = categorySectionsData.filter((sec) => sec.products.length > 0);

  // If no products in any category, return null (clean graceful state)
  if (populatedSections.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {populatedSections.map(({ category, products, totalCount }, index) => {
        // Alternate section backgrounds for visual elegance
        const isEven = index % 2 === 0;

        return (
          <section
            key={category.id || category.slug}
            className={`w-full max-w-full overflow-hidden py-16 sm:py-20 border-b border-brand-cream-300 dark:border-zinc-800 ${
              isEven ? 'bg-white dark:bg-zinc-950' : 'bg-brand-cream-50 dark:bg-zinc-900/50'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section Editorial Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-forest-800 dark:text-emerald-400 uppercase tracking-[0.2em]">
                    <Sparkles className="w-3.5 h-3.5 text-brand-forest-700 dark:text-emerald-400" />
                    <span>Best in {category.name}</span>
                  </div>
                  <h2 className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-brand-forest-950 dark:text-white uppercase tracking-tight">
                    {category.name}
                  </h2>
                  {category.description && (
                    <p className="text-xs sm:text-sm text-brand-charcoal-600 dark:text-zinc-400 max-w-2xl">
                      {category.description}
                    </p>
                  )}
                </div>

                <Link
                  href={`/category/${category.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-forest-800 dark:text-emerald-400 hover:text-brand-forest-950 dark:hover:text-white group shrink-0"
                >
                  <span>View All {category.name} ({totalCount})</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Automatic Top Products Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

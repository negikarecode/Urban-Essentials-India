import { Suspense } from 'react';
import { getProducts } from '@/lib/data/products';
import { ProductCatalogClient } from './ProductCatalogClient';

export const metadata = {
  title: 'All Products | Urban Essentials',
  description:
    'Shop all stainless steel water bottles, everyday backpacks, and leak-proof lunchboxes.',
};

export default function ProductsPage() {
  const products = getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="mb-8 space-y-2 text-left">
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-forest-800 dark:text-emerald-400 block">
          Complete Collection
        </span>
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-brand-forest-950 dark:text-white uppercase tracking-tight">
          All Products
        </h1>
        <p className="text-xs sm:text-sm text-brand-charcoal-600 dark:text-zinc-400 max-w-xl">
          Browse our precision-built everyday bottles, backpacks, and lunchboxes.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-brand-forest-800 dark:border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs font-semibold text-brand-charcoal-600 dark:text-zinc-400">Loading catalog...</p>
          </div>
        }
      >
        <ProductCatalogClient initialProducts={products} />
      </Suspense>
    </div>
  );
}

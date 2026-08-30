import { Suspense } from 'react';
import { getProducts } from '@/lib/data/products';
import { ProductCatalogClient } from './ProductCatalogClient';

export const metadata = {
  title: 'All Products | KURA Essentials',
  description:
    'Shop all bento lunch boxes, insulated water bottles, backpacks, school bags, journals, and desk accessories.',
};

export default function ProductsPage() {
  const products = getProducts();

  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="w-12 h-12 border-4 border-brand-forest-800 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-semibold text-brand-charcoal-600">Loading catalog...</p>
        </div>
      }
    >
      <ProductCatalogClient initialProducts={products} />
    </Suspense>
  );
}

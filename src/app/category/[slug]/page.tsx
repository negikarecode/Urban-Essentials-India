import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories, getCategoryBySlug, getProductsByCategory } from '@/lib/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = getCategoryBySlug(params.slug);
  if (!category) return { title: 'Category Not Found | Urban Essentials' };

  return {
    title: `${category.name} | Urban Essentials`,
    description: category.description,
    openGraph: {
      title: `${category.name} | Urban Essentials`,
      description: category.description,
      images: [{ url: category.image_url }],
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-brand-charcoal-500 mb-6">
        <Link href="/" className="hover:text-brand-forest-800">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/products" className="hover:text-brand-forest-800">Categories</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-forest-900">{category.name}</span>
      </nav>

      {/* Category Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-brand-forest-900 text-white mb-10 p-8 sm:p-12 shadow-lg">
        <div className="absolute inset-0 opacity-25">
          <Image
            src={category.image_url}
            alt={category.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-forest-950 via-brand-forest-900/90 to-transparent" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-amber-400">
            Category Showcase
          </span>
          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            {category.name}
          </h1>
          <p className="text-sm sm:text-base text-brand-cream-200/90 leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-brand-cream-300">
          <h2 className="font-serif font-bold text-xl text-brand-forest-950">
            Products ({products.length})
          </h2>
          <Link
            href="/products"
            className="text-xs font-bold text-brand-forest-800 hover:text-brand-forest-950"
          >
            Explore all categories &rarr;
          </Link>
        </div>

        <ProductGrid
          products={products}
          emptyMessage={`No active products currently listed in ${category.name}.`}
        />
      </div>
    </div>
  );
}

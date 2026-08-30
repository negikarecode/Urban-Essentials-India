import { notFound } from 'next/navigation';
import { getProducts, getProductBySlug, getProductReviews, getProductsByCategory } from '@/lib/data/products';
import { ProductDetailClient } from './ProductDetailClient';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  const products = getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found | KURA Essentials' };

  return {
    title: `${product.name} | KURA Essentials`,
    description: product.short_description || product.description,
    openGraph: {
      title: `${product.name} | KURA Essentials`,
      description: product.short_description || product.description,
      images: product.images.map((img) => ({ url: img.image_url })),
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const reviews = getProductReviews(product.id);
  const relatedProducts = getProductsByCategory(product.category_slug || '').filter(
    (p) => p.id !== product.id
  );

  // Schema.org JSON-LD structured data for rich search results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map((img) => img.image_url),
    description: product.description,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      availability: product.stock_quantity > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: Math.max(1, product.review_count),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient
        product={product}
        reviews={reviews}
        relatedProducts={relatedProducts}
      />
    </>
  );
}

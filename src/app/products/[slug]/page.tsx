import { notFound } from 'next/navigation';
import { getProducts, getProductBySlug, getProductReviews, getProductsByCategory } from '@/lib/data/products';
import { ProductDetailClient } from './ProductDetailClient';
import { createAdminClient } from '@/lib/supabase/admin';
import { Product } from '@/types';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export const dynamicParams = true;

export function generateStaticParams() {
  const products = getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

async function resolveProduct(slug: string): Promise<Product | undefined> {
  const local = getProductBySlug(slug);
  if (local) return local;

  try {
    const supabase = createAdminClient();
    const dbPromise = supabase
      .from('products')
      .select('*, product_images(*), product_variants(*), inventory(stock_quantity)')
      .eq('slug', slug)
      .maybeSingle();

    const timeoutPromise = new Promise<{ data: null }>((resolve) => setTimeout(() => resolve({ data: null }), 300));
    const result = await Promise.race([dbPromise, timeoutPromise]);
    const p = (result as any)?.data;

    if (p) {
      const stock = p.inventory && p.inventory.length > 0 ? p.inventory[0].stock_quantity : 25;
      const images = p.product_images && p.product_images.length > 0
        ? p.product_images.map((img: any) => ({
            id: img.id,
            image_url: img.image_url,
            alt_text: img.alt_text || p.name,
            sort_order: img.sort_order || 1,
            is_primary: img.is_primary || false,
          }))
        : [{ id: `img-${p.id}`, image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80', is_primary: true }];

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        short_description: p.short_description,
        sku: p.sku,
        price: Number(p.price),
        compare_at_price: p.compare_at_price ? Number(p.compare_at_price) : undefined,
        discount: p.discount ? Number(p.discount) : undefined,
        category_id: p.category_id || 'insulated-bottles',
        category_name: p.category_name || 'Bottles & Flasks',
        category_slug: p.category_slug || 'insulated-bottles',
        target_audience: p.target_audience || 'all',
        brand: p.brand || 'Urban Essentials',
        tags: p.tags || [],
        stock_quantity: stock,
        rating: Number(p.rating || 5.0),
        review_count: Number(p.review_count || 0),
        is_featured: Boolean(p.is_featured),
        is_new_arrival: Boolean(p.is_new_arrival),
        is_bestseller: Boolean(p.is_bestseller),
        is_active: Boolean(p.is_active),
        features: p.features || [],
        specifications: p.specifications || {},
        images,
        variants: p.product_variants && p.product_variants.length > 0
          ? p.product_variants.map((v: any) => ({
              id: v.id,
              product_id: v.product_id,
              name: v.name,
              sku: v.sku,
              price: Number(v.price),
              compare_at_price: v.compare_at_price ? Number(v.compare_at_price) : undefined,
              attributes: v.attributes || {},
              color_code: v.color_code || v.attributes?.color_code,
              image_url: v.image_url || v.attributes?.image_url,
              stock: v.stock || v.attributes?.stock || 20,
              is_active: v.is_active ?? true,
            }))
          : undefined,
        created_at: p.created_at,
        updated_at: p.updated_at,
      };
    }
  } catch {
    // fallback
  }

  return undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await resolveProduct(params.slug);
  if (!product) return { title: 'Product Not Found | Urban Essentials' };

  return {
    title: `${product.name} | Urban Essentials`,
    description: product.short_description || product.description,
    openGraph: {
      title: `${product.name} | Urban Essentials`,
      description: product.short_description || product.description,
      images: product.images.map((img) => ({ url: img.image_url })),
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await resolveProduct(params.slug);
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
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      availability: product.stock_quantity > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    ...(product.review_count > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.review_count,
          },
        }
      : {}),
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

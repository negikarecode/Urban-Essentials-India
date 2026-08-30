'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RefreshCw,
  Award,
  ChevronRight,
  Plus,
  Minus,
  Check,
} from 'lucide-react';
import { Product, ProductVariant, Review } from '@/types';
import { formatCurrency, calculateDiscountPercentage } from '@/lib/utils';
import { ImageGallery } from '@/components/product/ImageGallery';
import { ReviewSection } from '@/components/product/ReviewSection';
import { ProductCard } from '@/components/product/ProductCard';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductDetailClientProps {
  product: Product;
  reviews: Review[];
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  reviews,
  relatedProducts,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'features' | 'specs' | 'care'>('features');

  const inWishlist = isInWishlist(product.id);
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentComparePrice = selectedVariant
    ? selectedVariant.compare_at_price
    : product.compare_at_price;
  const discountPercent = calculateDiscountPercentage(currentPrice, currentComparePrice);
  const currentStock = selectedVariant ? selectedVariant.stock : product.stock_quantity;

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariant, quantity);
    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-brand-charcoal-500 mb-8 overflow-x-auto no-scrollbar">
        <Link href="/" className="hover:text-brand-forest-800 shrink-0">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link href="/products" className="hover:text-brand-forest-800 shrink-0">Products</Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        {product.category_slug && (
          <>
            <Link
              href={`/category/${product.category_slug}`}
              className="hover:text-brand-forest-800 shrink-0"
            >
              {product.category_name}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          </>
        )}
        <span className="text-brand-forest-900 font-bold truncate">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Col: Image Gallery */}
        <div className="lg:col-span-7">
          <ImageGallery images={product.images} productName={product.name} />
        </div>

        {/* Right Col: Product Information & Purchase Panel */}
        <div className="lg:col-span-5 space-y-6">
          {/* Top Badges & Audience */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-brand-forest-100 text-brand-forest-900 border border-brand-forest-200">
              {product.target_audience === 'all'
                ? 'All Segments'
                : `For ${product.target_audience}`}
            </span>
            {product.is_bestseller && (
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
                🔥 Bestseller
              </span>
            )}
            {product.is_new_arrival && (
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-brand-sage-100 text-brand-sage-800 border border-brand-sage-200">
                ✨ New Release
              </span>
            )}
            <span className="text-xs text-brand-charcoal-400 font-mono ml-auto">
              SKU: {selectedVariant ? selectedVariant.sku : product.sku}
            </span>
          </div>

          {/* Product Title */}
          <div>
            <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-brand-forest-950 leading-snug">
              {product.name}
            </h1>
            {product.short_description && (
              <p className="text-sm text-brand-charcoal-600 mt-1">
                {product.short_description}
              </p>
            )}
          </div>

          {/* Ratings & Reviews Link */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center text-amber-500">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${
                    product.rating >= s ? 'fill-amber-500' : 'text-brand-cream-400'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-brand-charcoal-900">{product.rating}</span>
            <a
              href="#reviews-section"
              className="text-brand-forest-800 hover:underline font-medium"
            >
              ({product.review_count} verified reviews)
            </a>
          </div>

          {/* Price & Discount Bar */}
          <div className="p-4 rounded-2xl bg-brand-cream-100/70 border border-brand-cream-300 flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-serif font-extrabold text-3xl text-brand-forest-950">
                {formatCurrency(currentPrice)}
              </span>
              {currentComparePrice && currentComparePrice > currentPrice && (
                <span className="text-base text-brand-charcoal-400 line-through">
                  {formatCurrency(currentComparePrice)}
                </span>
              )}
            </div>
            {discountPercent > 0 && (
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-brand-amber-500 text-brand-forest-950 shadow-xs">
                Save {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Variant Selector (if available) */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-brand-charcoal-700 uppercase tracking-wider">
                Select Option / Color:{' '}
                <strong className="text-brand-forest-900">{selectedVariant?.name}</strong>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`p-2.5 rounded-xl text-left border text-xs transition-all flex flex-col justify-between ${
                      selectedVariant?.id === v.id
                        ? 'border-brand-forest-800 bg-brand-forest-50/70 text-brand-forest-950 font-bold ring-1 ring-brand-forest-800'
                        : 'border-brand-cream-300 bg-white text-brand-charcoal-700 hover:border-brand-charcoal-400'
                    }`}
                  >
                    <span className="truncate">{v.name}</span>
                    <span className="text-[11px] text-brand-forest-800 font-extrabold mt-1">
                      {formatCurrency(v.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock Status */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            {currentStock > 10 ? (
              <span className="text-emerald-700 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                In Stock & Ready to Ship (Same-Day Dispatch)
              </span>
            ) : currentStock > 0 ? (
              <span className="text-amber-700 flex items-center gap-1.5">
                ⚠️ Low Stock: Only {currentStock} left in warehouse!
              </span>
            ) : (
              <span className="text-rose-600 font-bold">Out of Stock</span>
            )}
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-brand-cream-400 rounded-xl bg-white p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-brand-charcoal-600 hover:bg-brand-cream-200 rounded-lg transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-bold text-brand-charcoal-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  disabled={quantity >= currentStock}
                  className="p-2 text-brand-charcoal-600 hover:bg-brand-cream-200 rounded-lg transition-colors disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={currentStock <= 0}
                className="flex-1 py-3.5 px-6 rounded-xl bg-brand-forest-800 hover:bg-brand-forest-900 text-white text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              {/* Wishlist Toggle */}
              <button
                onClick={() => toggleWishlist(product)}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`p-3.5 rounded-xl border transition-all ${
                  inWishlist
                    ? 'border-rose-300 bg-rose-50 text-rose-500'
                    : 'border-brand-cream-400 bg-white text-brand-charcoal-700 hover:border-brand-charcoal-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Buy Now Instant Checkout */}
            <button
              onClick={handleBuyNow}
              disabled={currentStock <= 0}
              className="w-full py-3.5 px-6 rounded-xl bg-brand-amber-500 hover:bg-brand-amber-600 text-brand-forest-950 text-sm font-extrabold shadow-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <Zap className="w-4 h-4 fill-brand-forest-950" />
              <span>Instant Buy Now</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-6 border-t border-brand-cream-300 grid grid-cols-2 gap-3 text-xs text-brand-charcoal-700">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-forest-700 shrink-0" />
              <span>Free Shipping over ₹999</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-forest-700 shrink-0" />
              <span>1-Year Comprehensive Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-forest-700 shrink-0" />
              <span>100% Food-Grade Stainless Steel</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-brand-forest-700 shrink-0" />
              <span>7-Day Hassle-Free Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Features / Specs / Care */}
      <div className="mt-16 pt-8 border-t border-brand-cream-300">
        <div className="flex border-b border-brand-cream-300 gap-8">
          <button
            onClick={() => setActiveTab('features')}
            className={`pb-3 text-sm font-bold transition-all border-b-2 ${
              activeTab === 'features'
                ? 'border-brand-forest-800 text-brand-forest-900'
                : 'border-transparent text-brand-charcoal-500 hover:text-brand-charcoal-800'
            }`}
          >
            Product Features & Details
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-sm font-bold transition-all border-b-2 ${
              activeTab === 'specs'
                ? 'border-brand-forest-800 text-brand-forest-900'
                : 'border-transparent text-brand-charcoal-500 hover:text-brand-charcoal-800'
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`pb-3 text-sm font-bold transition-all border-b-2 ${
              activeTab === 'care'
                ? 'border-brand-forest-800 text-brand-forest-900'
                : 'border-transparent text-brand-charcoal-500 hover:text-brand-charcoal-800'
            }`}
          >
            Care & Maintenance
          </button>
        </div>

        <div className="py-6">
          {activeTab === 'features' && (
            <div className="space-y-4 max-w-3xl">
              <p className="text-sm text-brand-charcoal-700 leading-relaxed">
                {product.description}
              </p>
              {product.features && product.features.length > 0 && (
                <ul className="space-y-2 pt-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-brand-charcoal-800">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <table className="w-full text-xs sm:text-sm text-left divide-y divide-brand-cream-300">
                <tbody className="divide-y divide-brand-cream-200">
                  {product.specifications ? (
                    Object.entries(product.specifications).map(([key, val]) => (
                      <tr key={key}>
                        <td className="py-2.5 font-bold text-brand-charcoal-700 w-1/3">{key}</td>
                        <td className="py-2.5 text-brand-charcoal-800">{val}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-2.5 font-bold text-brand-charcoal-700">Brand</td>
                      <td className="py-2.5 text-brand-charcoal-800">{product.brand}</td>
                    </tr>
                  )}
                  <tr>
                    <td className="py-2.5 font-bold text-brand-charcoal-700">Target Audience</td>
                    <td className="py-2.5 text-brand-charcoal-800 capitalize">{product.target_audience}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="space-y-3 text-xs sm:text-sm text-brand-charcoal-700 max-w-2xl leading-relaxed">
              <p>• Hand wash stainless steel compartments with warm soapy water and a soft sponge.</p>
              <p>• Avoid harsh steel wool or abrasive powders that may scratch the brushed finish.</p>
              <p>• Silicone seals can be easily removed for deep hygiene cleaning.</p>
              <p>• Allow all parts to air dry completely before assembling for storage.</p>
            </div>
          )}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div id="reviews-section" className="mt-8">
        <ReviewSection
          productId={product.id}
          productName={product.name}
          initialReviews={reviews}
        />
      </div>

      {/* Related Products Carousel / Grid */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-12 border-t border-brand-cream-300">
          <h3 className="font-serif font-bold text-2xl text-brand-forest-950 mb-8">
            You Might Also Like
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

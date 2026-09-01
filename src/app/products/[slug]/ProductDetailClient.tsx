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
import {
  formatCurrency,
  getColorHexFromName,
  isLightColor,
} from '@/lib/utils';
import { ImageGallery } from '@/components/product/ImageGallery';
import { ReviewSection } from '@/components/product/ReviewSection';
import { ProductCard } from '@/components/product/ProductCard';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useLiveProducts } from '@/lib/productStore';

interface ProductDetailClientProps {
  product: Product;
  reviews: Review[];
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product: initialProduct,
  reviews,
  relatedProducts,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { products: liveProducts } = useLiveProducts();

  const product =
    liveProducts.find((p) => p.id === initialProduct.id || p.slug === initialProduct.slug) ||
    initialProduct;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'features' | 'specs' | 'care'>('features');

  // Keep selected variant in sync if product variants change
  React.useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      setSelectedVariant((prev) => {
        if (!prev) return product.variants![0];
        const match = product.variants!.find((v) => v.id === prev.id);
        return match || product.variants![0];
      });
    }
  }, [product.variants]);

  const inWishlist = isInWishlist(product.id);
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
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
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-brand-charcoal-500 dark:text-zinc-400 mb-8 overflow-x-auto pb-1 no-scrollbar">
        <Link href="/" className="hover:text-brand-forest-800 dark:hover:text-emerald-400 shrink-0">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link href="/products" className="hover:text-brand-forest-800 dark:hover:text-emerald-400 shrink-0">
          Catalog
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        {product.category_name && (
          <>
            <Link
              href={`/category/${product.category_slug}`}
              className="hover:text-brand-forest-800 dark:hover:text-emerald-400 shrink-0"
            >
              {product.category_name}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          </>
        )}
        <span className="text-brand-forest-900 dark:text-zinc-100 font-bold truncate">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Col: Image Gallery */}
        <div className="lg:col-span-7">
          <ImageGallery
            images={product.images}
            productName={product.name}
            activeVariantImage={selectedVariant?.image_url}
            selectedColor={selectedVariant?.attributes?.color || selectedVariant?.name}
          />
        </div>

        {/* Right Col: Product Information & Purchase Panel */}
        <div className="lg:col-span-5 space-y-6">
          {/* Top Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-brand-forest-100 dark:bg-brand-forest-900/60 text-brand-forest-900 dark:text-emerald-300 border border-brand-forest-200 dark:border-brand-forest-800">
              {product.category_name || 'Essential'}
            </span>
            {product.is_bestseller && (
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                Bestseller
              </span>
            )}
            {product.is_new_arrival && (
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-brand-sage-100 dark:bg-zinc-800 text-brand-sage-800 dark:text-zinc-300 border border-brand-sage-200 dark:border-zinc-700">
                New Release
              </span>
            )}
            <span className="text-xs text-brand-charcoal-400 dark:text-zinc-500 font-mono ml-auto">
              SKU: {selectedVariant ? selectedVariant.sku : product.sku}
            </span>
          </div>

          {/* Product Title */}
          <div>
            <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-brand-forest-950 dark:text-white leading-snug">
              {product.name}
            </h1>
            {product.short_description && (
              <p className="text-sm text-brand-charcoal-600 dark:text-zinc-400 mt-1">
                {product.short_description}
              </p>
            )}
          </div>

          {/* Ratings & Reviews Link */}
          <div className="flex items-center gap-2 text-xs">
            {reviews.length > 0 ? (
              <>
                <div className="flex items-center text-amber-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        product.rating >= s ? 'fill-amber-500' : 'text-brand-cream-400 dark:text-zinc-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-brand-charcoal-900 dark:text-zinc-100">{product.rating}</span>
                <a
                  href="#reviews-section"
                  className="text-brand-forest-800 dark:text-emerald-400 hover:underline font-medium"
                >
                  ({reviews.length} verified review{reviews.length !== 1 ? 's' : ''})
                </a>
              </>
            ) : (
              <a
                href="#reviews-section"
                className="text-brand-charcoal-500 dark:text-zinc-400 hover:text-brand-forest-800 dark:hover:text-emerald-400 text-xs font-medium flex items-center gap-1"
              >
                <Star className="w-3.5 h-3.5 text-brand-cream-400 dark:text-zinc-600" />
                <span>No customer reviews yet — Be the first to review!</span>
              </a>
            )}
          </div>

          {/* Price Bar */}
          <div className="p-4 rounded-2xl bg-brand-cream-100/70 dark:bg-zinc-900 border border-brand-cream-300 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-serif font-extrabold text-3xl text-brand-forest-950 dark:text-white">
                {formatCurrency(currentPrice)}
              </span>
            </div>
          </div>

          {/* Variant / Color Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>Color:</span>
                  <span className="text-brand-forest-950 dark:text-white font-extrabold normal-case text-sm">
                    {selectedVariant?.attributes?.color || selectedVariant?.name}
                  </span>
                </label>
                <span className="text-[11px] text-brand-charcoal-400 dark:text-zinc-500 font-medium">
                  {product.variants.length} available {product.variants.length === 1 ? 'color' : 'colors'}
                </span>
              </div>

              {/* Color Swatch Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                {product.variants.map((v) => {
                  const colorHex =
                    v.color_code ||
                    v.attributes?.color_code ||
                    getColorHexFromName(v.name);
                  const isLight = isLightColor(colorHex);
                  const isSelected = selectedVariant?.id === v.id;
                  const isOut = v.stock === 0;

                  return (
                    <button
                      key={v.id}
                      type="button"
                      disabled={isOut}
                      onClick={() => setSelectedVariant(v)}
                      aria-label={`Select color ${v.name}`}
                      className={`group relative inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs transition-all border ${
                        isSelected
                          ? 'border-brand-forest-950 dark:border-emerald-400 bg-brand-forest-50/90 dark:bg-zinc-800 text-brand-forest-950 dark:text-white font-bold ring-2 ring-brand-forest-900/25 dark:ring-emerald-400/30 shadow-sm scale-102'
                          : isOut
                          ? 'border-brand-cream-300 dark:border-zinc-800 bg-brand-cream-50/50 dark:bg-zinc-900/50 text-brand-charcoal-400 dark:text-zinc-600 opacity-50 cursor-not-allowed'
                          : 'border-brand-cream-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-brand-charcoal-800 dark:text-zinc-200 hover:border-brand-charcoal-400 dark:hover:border-zinc-500 hover:bg-brand-cream-50/70 dark:hover:bg-zinc-800 shadow-2xs'
                      }`}
                    >
                      <span
                        className={`relative w-5 h-5 rounded-full shrink-0 shadow-inner flex items-center justify-center transition-transform group-hover:scale-110 ${
                          isLight ? 'border border-neutral-300 dark:border-neutral-500' : 'border border-black/10 dark:border-white/20'
                        }`}
                        style={{ backgroundColor: colorHex }}
                      >
                        {isSelected && (
                          <Check
                            className={`w-3 h-3 ${
                              isLight ? 'text-brand-charcoal-900 dark:text-zinc-900' : 'text-white'
                            }`}
                          />
                        )}
                      </span>
                      <span className="truncate max-w-[130px]">{v.name}</span>
                      {v.price !== product.price && (
                        <span className="text-[10px] text-brand-forest-800 dark:text-emerald-400 font-extrabold px-1.5 py-0.5 rounded-md bg-brand-cream-200 dark:bg-zinc-800">
                          {formatCurrency(v.price)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stock Status */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            {currentStock > 10 ? (
              <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                In Stock & Ready to Ship (Same-Day Dispatch)
              </span>
            ) : currentStock > 0 ? (
              <span className="text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                Low Stock: Only {currentStock} left in warehouse!
              </span>
            ) : (
              <span className="text-rose-600 dark:text-rose-400 font-bold">Out of Stock</span>
            )}
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-brand-cream-400 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-brand-charcoal-600 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-bold text-brand-charcoal-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  disabled={quantity >= currentStock}
                  className="p-2 text-brand-charcoal-600 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 rounded-lg transition-colors disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={currentStock <= 0}
                className="flex-1 py-3 px-6 bg-brand-forest-800 hover:bg-brand-forest-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`p-3 rounded-xl border transition-all ${
                  inWishlist
                    ? 'border-rose-300 bg-rose-50 dark:bg-rose-950/40 text-rose-600'
                    : 'border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-100 dark:hover:bg-zinc-800'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={currentStock <= 0}
              className="w-full py-3.5 px-6 bg-brand-forest-950 dark:bg-white text-white dark:text-zinc-950 font-bold uppercase tracking-wider text-xs rounded-xl hover:bg-black dark:hover:bg-zinc-200 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buy It Now • Express Checkout
            </button>
          </div>

          {/* Value Props Grid */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-brand-cream-300 dark:border-zinc-800 text-center">
            <div className="p-3 rounded-xl bg-brand-cream-100/50 dark:bg-zinc-900/60 border border-brand-cream-200 dark:border-zinc-800 space-y-1">
              <Truck className="w-5 h-5 mx-auto text-brand-forest-700 dark:text-emerald-400" />
              <p className="text-[11px] font-bold text-brand-charcoal-900 dark:text-zinc-200">Free Express Delivery</p>
              <p className="text-[10px] text-brand-charcoal-500 dark:text-zinc-400">On orders above ₹999</p>
            </div>
            <div className="p-3 rounded-xl bg-brand-cream-100/50 dark:bg-zinc-900/60 border border-brand-cream-200 dark:border-zinc-800 space-y-1">
              <ShieldCheck className="w-5 h-5 mx-auto text-brand-forest-700 dark:text-emerald-400" />
              <p className="text-[11px] font-bold text-brand-charcoal-900 dark:text-zinc-200">1-Year Warranty</p>
              <p className="text-[10px] text-brand-charcoal-500 dark:text-zinc-400">100% Genuine product</p>
            </div>
            <div className="p-3 rounded-xl bg-brand-cream-100/50 dark:bg-zinc-900/60 border border-brand-cream-200 dark:border-zinc-800 space-y-1">
              <RefreshCw className="w-5 h-5 mx-auto text-brand-forest-700 dark:text-emerald-400" />
              <p className="text-[11px] font-bold text-brand-charcoal-900 dark:text-zinc-200">7-Day Hassle Free</p>
              <p className="text-[10px] text-brand-charcoal-500 dark:text-zinc-400">Easy replacement policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-16 pt-8 border-t border-brand-cream-300 dark:border-zinc-800">
        <div className="flex items-center gap-8 border-b border-brand-cream-300 dark:border-zinc-800">
          <button
            onClick={() => setActiveTab('features')}
            className={`pb-3 text-sm font-bold transition-all border-b-2 ${
              activeTab === 'features'
                ? 'border-brand-forest-800 dark:border-emerald-400 text-brand-forest-900 dark:text-emerald-400'
                : 'border-transparent text-brand-charcoal-500 dark:text-zinc-400 hover:text-brand-charcoal-800 dark:hover:text-zinc-200'
            }`}
          >
            Features & Overview
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-sm font-bold transition-all border-b-2 ${
              activeTab === 'specs'
                ? 'border-brand-forest-800 dark:border-emerald-400 text-brand-forest-900 dark:text-emerald-400'
                : 'border-transparent text-brand-charcoal-500 dark:text-zinc-400 hover:text-brand-charcoal-800 dark:hover:text-zinc-200'
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`pb-3 text-sm font-bold transition-all border-b-2 ${
              activeTab === 'care'
                ? 'border-brand-forest-800 dark:border-emerald-400 text-brand-forest-900 dark:text-emerald-400'
                : 'border-transparent text-brand-charcoal-500 dark:text-zinc-400 hover:text-brand-charcoal-800 dark:hover:text-zinc-200'
            }`}
          >
            Care & Maintenance
          </button>
        </div>

        <div className="py-6">
          {activeTab === 'features' && (
            <div className="space-y-4 max-w-3xl">
              <p className="text-sm text-brand-charcoal-700 dark:text-zinc-300 leading-relaxed">
                {product.description}
              </p>
              {product.features && product.features.length > 0 && (
                <ul className="space-y-2 pt-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-brand-charcoal-800 dark:text-zinc-200">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <table className="w-full text-xs sm:text-sm text-left divide-y divide-brand-cream-300 dark:divide-zinc-800">
                <tbody className="divide-y divide-brand-cream-200 dark:divide-zinc-800">
                  {product.specifications &&
                    Object.entries(product.specifications).map(([key, val]) => (
                      <tr key={key}>
                        <td className="py-2.5 font-bold text-brand-charcoal-700 dark:text-zinc-400 w-1/3">{key}</td>
                        <td className="py-2.5 text-brand-charcoal-800 dark:text-zinc-200">{val}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="py-2.5 font-bold text-brand-charcoal-700 dark:text-zinc-400">Category</td>
                      <td className="py-2.5 text-brand-charcoal-800 dark:text-zinc-200">{product.category_name}</td>
                    </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="space-y-3 text-xs sm:text-sm text-brand-charcoal-700 dark:text-zinc-300 max-w-2xl leading-relaxed">
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
        <div className="mt-16 pt-12 border-t border-brand-cream-300 dark:border-zinc-800">
          <h3 className="font-serif font-bold text-2xl text-brand-forest-950 dark:text-white mb-8">
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

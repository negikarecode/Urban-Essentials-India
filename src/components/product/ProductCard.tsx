'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types';
import { formatCurrency, calculateDiscountPercentage } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);

  const inWishlist = isInWishlist(product.id);
  const discountPercent = calculateDiscountPercentage(product.price, product.compare_at_price);

  const primaryImage =
    product.images[0]?.image_url ||
    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80';
  const secondaryImage = product.images[1]?.image_url || primaryImage;

  const currentVariant =
    product.variants && product.variants.length > 0
      ? product.variants[selectedVariantIdx]
      : undefined;
  const currentPrice = currentVariant ? currentVariant.price : product.price;
  const currentComparePrice = currentVariant
    ? currentVariant.compare_at_price
    : product.compare_at_price;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, currentVariant, 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl border border-brand-cream-300 hover:border-brand-forest-700/40 hover:shadow-md transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-brand-cream-100/70">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-103"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.is_bestseller && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-forest-800 text-white shadow-2xs">
              Bestseller
            </span>
          )}
          {product.is_new_arrival && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-sage-700 text-white shadow-2xs">
              New
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-amber-500 text-brand-forest-950 shadow-2xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-sm transition-all shadow-2xs z-10 ${
            inWishlist
              ? 'bg-rose-50 text-rose-500'
              : 'bg-white/90 text-brand-charcoal-700 hover:bg-white hover:text-rose-500'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Audience Pill */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/90 backdrop-blur-xs text-brand-charcoal-700 uppercase tracking-wider border border-brand-cream-300">
            {product.target_audience === 'all' ? 'All Segments' : product.target_audience}
          </span>
        </div>

        {/* Desktop Quick Add on Hover */}
        <div className="absolute inset-x-2.5 bottom-2.5 hidden sm:flex z-20 opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-3 bg-brand-forest-900 hover:bg-brand-forest-950 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs mb-1.5">
            <div className="flex items-center text-brand-amber-500">
              <Star className="w-3.5 h-3.5 fill-brand-amber-500 text-brand-amber-500" />
            </div>
            <span className="font-bold text-brand-charcoal-900 text-xs">{product.rating}</span>
            <span className="text-brand-charcoal-400 text-[11px]">({product.review_count})</span>
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-sm text-brand-charcoal-900 line-clamp-1 hover:text-brand-forest-800 transition-colors">
            <Link href={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Short Subtitle */}
          <p className="text-xs text-brand-charcoal-500 line-clamp-1 mt-0.5">
            {product.short_description || product.category_name}
          </p>

          {/* Variant Swatches (if available) */}
          {product.variants && product.variants.length > 1 && (
            <div className="flex items-center gap-1 mt-2 overflow-x-auto py-0.5 no-scrollbar">
              {product.variants.slice(0, 4).map((variant, idx) => (
                <button
                  key={variant.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedVariantIdx(idx);
                  }}
                  className={`text-[10px] px-2 py-0.5 rounded-md border transition-all shrink-0 ${
                    selectedVariantIdx === idx
                      ? 'border-brand-forest-800 bg-brand-forest-50 text-brand-forest-900 font-bold'
                      : 'border-brand-cream-300 text-brand-charcoal-600 hover:border-brand-charcoal-400 bg-white'
                  }`}
                >
                  {variant.attributes.color || variant.attributes.size || variant.name.split('/')[0]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price & Mobile Add Button */}
        <div className="pt-3 mt-3 border-t border-brand-cream-200 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-extrabold text-sm sm:text-base text-brand-forest-950">
              {formatCurrency(currentPrice)}
            </span>
            {currentComparePrice && currentComparePrice > currentPrice && (
              <span className="text-xs text-brand-charcoal-400 line-through">
                {formatCurrency(currentComparePrice)}
              </span>
            )}
          </div>

          {/* Mobile Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className="sm:hidden p-2 rounded-xl bg-brand-forest-800 text-white hover:bg-brand-forest-900 shadow-2xs"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, ShoppingBag } from 'lucide-react';
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
      className="group relative flex flex-col bg-white border border-brand-cream-300 hover:border-brand-forest-900 transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* High-End Editorial Portrait Image Frame */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-cream-100/40">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Minimal Corner Tag */}
        {product.is_bestseller && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2 py-0.5 text-[9px] font-bold tracking-[0.2em] uppercase bg-brand-forest-950 text-white">
              Bestseller
            </span>
          </div>
        )}
        {!product.is_bestseller && product.is_new_arrival && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2 py-0.5 text-[9px] font-bold tracking-[0.2em] uppercase bg-brand-forest-800 text-white">
              New
            </span>
          </div>
        )}
        {!product.is_bestseller && !product.is_new_arrival && discountPercent > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2 py-0.5 text-[9px] font-bold tracking-[0.15em] uppercase bg-brand-amber-500 text-brand-forest-950">
              {discountPercent}% OFF
            </span>
          </div>
        )}

        {/* Wishlist Icon */}
        <button
          onClick={handleWishlistClick}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 p-2 transition-all z-10 ${
            inWishlist
              ? 'text-rose-600 bg-white/90 shadow-xs'
              : 'text-brand-charcoal-500 bg-white/70 hover:bg-white hover:text-rose-600 backdrop-blur-xs'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Luxury Quick Add Bar - Slides up smoothly from bottom edge */}
        <div className="absolute inset-x-0 bottom-0 hidden sm:block z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            onClick={handleQuickAdd}
            className="w-full py-3 bg-brand-forest-950 hover:bg-black text-white text-[11px] font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Editorial Information Box */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
        <div className="space-y-1">
          {/* Category Line */}
          <div className="text-[10px] uppercase tracking-[0.2em] text-brand-charcoal-400 font-semibold">
            <span>{product.category_name || 'Essential'}</span>
          </div>

          {/* Product Headline */}
          <h3 className="font-serif font-bold text-sm sm:text-base text-brand-charcoal-900 line-clamp-1 hover:text-brand-forest-800 transition-colors pt-0.5">
            <Link href={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Clean Rating */}
          <div className="flex items-center gap-1 text-[11px] text-brand-charcoal-500 pt-0.5">
            <div className="flex items-center text-brand-amber-500">
              <Star className="w-3 h-3 fill-brand-amber-500 text-brand-amber-500" />
            </div>
            <span className="font-bold text-brand-charcoal-800">{product.rating}</span>
            <span className="text-brand-charcoal-400">({product.review_count})</span>
          </div>

          {/* Minimalist Variant Swatches */}
          {product.variants && product.variants.length > 1 && (
            <div className="flex items-center gap-1.5 pt-1 overflow-x-auto no-scrollbar">
              {product.variants.slice(0, 4).map((variant, idx) => (
                <button
                  key={variant.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedVariantIdx(idx);
                  }}
                  className={`text-[9px] uppercase tracking-wider px-2 py-0.5 border transition-all shrink-0 ${
                    selectedVariantIdx === idx
                      ? 'border-brand-forest-950 bg-brand-forest-950 text-white font-bold'
                      : 'border-brand-cream-300 text-brand-charcoal-600 hover:border-brand-charcoal-500 bg-white'
                  }`}
                >
                  {variant.attributes.color || variant.attributes.size || variant.name.split('/')[0]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Mobile Quick Action */}
        <div className="pt-2.5 border-t border-brand-cream-200 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-sm sm:text-base text-brand-forest-950 tracking-tight">
              {formatCurrency(currentPrice)}
            </span>
            {currentComparePrice && currentComparePrice > currentPrice && (
              <span className="text-xs text-brand-charcoal-400 line-through">
                {formatCurrency(currentComparePrice)}
              </span>
            )}
          </div>

          {/* Mobile Action */}
          <button
            onClick={handleQuickAdd}
            className="sm:hidden px-3 py-1.5 bg-brand-forest-950 text-white text-[10px] font-bold uppercase tracking-wider hover:bg-black"
            aria-label="Add to bag"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

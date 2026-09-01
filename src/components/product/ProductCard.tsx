'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { formatCurrency, getColorHexFromName, isLightColor } from '@/lib/utils';
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

  const currentVariant =
    product.variants && product.variants.length > 0
      ? product.variants[selectedVariantIdx]
      : undefined;

  const primaryImage =
    currentVariant?.image_url ||
    product.images[0]?.image_url ||
    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80';
  const secondaryImage =
    (currentVariant?.image_url ? currentVariant.image_url : product.images[1]?.image_url) ||
    primaryImage;

  const currentPrice = currentVariant ? currentVariant.price : product.price;

  const currentColorName =
    currentVariant?.attributes?.color ||
    currentVariant?.name.split('/')[0].split('(')[0].trim() ||
    'Standard';

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
      className="group relative flex flex-col bg-white dark:bg-zinc-900 border border-brand-cream-300 dark:border-zinc-800 hover:border-brand-forest-900 dark:hover:border-zinc-600 transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* High-End Editorial Portrait Image Frame */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-cream-100/40 dark:bg-zinc-800/40">
        <Link href={`/products/${product.slug}`} prefetch={true} className="block w-full h-full relative">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            unoptimized={true}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {secondaryImage !== primaryImage && (
            <Image
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              fill
              unoptimized={true}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out group-hover:scale-105"
            />
          )}
        </Link>

        {/* Minimal Corner Tag */}
        {product.is_bestseller && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="px-2 py-0.5 text-[9px] font-bold tracking-[0.2em] uppercase bg-brand-forest-950 dark:bg-emerald-900 text-white">
              Bestseller
            </span>
          </div>
        )}
        {!product.is_bestseller && product.is_new_arrival && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="px-2 py-0.5 text-[9px] font-bold tracking-[0.2em] uppercase bg-brand-forest-800 dark:bg-emerald-800 text-white">
              New
            </span>
          </div>
        )}

        {/* Wishlist Icon */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 p-2 transition-all z-10 ${
            inWishlist
              ? 'text-rose-600 bg-white/90 dark:bg-zinc-900/90 shadow-xs'
              : 'text-brand-charcoal-500 dark:text-zinc-400 bg-white/70 dark:bg-zinc-800/70 hover:bg-white dark:hover:bg-zinc-700 hover:text-rose-600 backdrop-blur-xs'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Luxury Quick Add Bar - Slides up smoothly from bottom edge */}
        <div className="absolute inset-x-0 bottom-0 hidden sm:block z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full py-3 bg-brand-forest-950 dark:bg-zinc-950 hover:bg-black dark:hover:bg-zinc-800 text-white text-[11px] font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-colors border-t dark:border-zinc-800"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Editorial Information Box */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-white dark:bg-zinc-900">
        <div className="space-y-1">
          {/* Category Line */}
          <div className="text-[10px] uppercase tracking-[0.2em] text-brand-charcoal-400 dark:text-zinc-500 font-semibold">
            <span>{product.category_name || 'Essential'}</span>
          </div>

          {/* Product Headline */}
          <h3 className="font-serif font-bold text-sm sm:text-base text-brand-charcoal-900 dark:text-zinc-100 line-clamp-1 hover:text-brand-forest-800 dark:hover:text-emerald-400 transition-colors pt-0.5">
            <Link href={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Rating or Guarantee Tag */}
          <div className="flex items-center justify-between gap-1 pt-0.5 min-h-[18px]">
            {product.review_count > 0 ? (
              <div className="flex items-center gap-1 text-[11px] text-brand-charcoal-500 dark:text-zinc-400">
                <div className="flex items-center text-brand-amber-500">
                  <Star className="w-3 h-3 fill-brand-amber-500 text-brand-amber-500" />
                </div>
                <span className="font-bold text-brand-charcoal-800 dark:text-zinc-200">{product.rating}</span>
                <span className="text-brand-charcoal-400 dark:text-zinc-500">({product.review_count})</span>
              </div>
            ) : (
              <span className="text-[10px] text-brand-charcoal-400 dark:text-zinc-500 font-medium tracking-wide">
                Authentic Guarantee
              </span>
            )}
            {product.stock_quantity > 0 && product.stock_quantity <= 15 && (
              <span className="text-[9px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.2 rounded-full border border-amber-200/60 dark:border-amber-800/60">
                Only {product.stock_quantity} left
              </span>
            )}
          </div>

          {/* Color Palette Section - High-End E-Commerce Swatch Bar */}
          {product.variants && product.variants.length > 1 ? (
            <div className="pt-1.5 pb-0.5 space-y-1.5">
              {/* Active Color Name Label + Available Colors Count */}
              <div className="flex items-center justify-between text-[11px] leading-tight">
                <span className="text-brand-charcoal-600 dark:text-zinc-300 font-medium truncate max-w-[150px]">
                  Color:{' '}
                  <strong className="text-brand-forest-950 dark:text-white font-extrabold text-[11px]">
                    {currentColorName}
                  </strong>
                </span>
                <span className="text-[10px] text-brand-charcoal-400 dark:text-zinc-500 font-semibold tracking-tight shrink-0">
                  {product.variants.length} colors
                </span>
              </div>

              {/* Real Colored Swatch Dots */}
              <div className="flex items-center gap-1.5 flex-wrap py-0.5">
                {product.variants.slice(0, 6).map((variant, idx) => {
                  const hex =
                    variant.color_code ||
                    variant.attributes?.color_code ||
                    getColorHexFromName(variant.name);
                  const isLight = isLightColor(hex);
                  const isSelected = selectedVariantIdx === idx;

                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedVariantIdx(idx);
                      }}
                      onMouseEnter={() => setSelectedVariantIdx(idx)}
                      aria-label={`Select color ${variant.name}`}
                      title={variant.name}
                      className={`group/swatch relative p-0.5 rounded-full transition-all duration-150 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'ring-2 ring-brand-forest-950 dark:ring-white ring-offset-1 dark:ring-offset-zinc-900 scale-110 shadow-xs'
                          : 'hover:scale-115 hover:ring-1 hover:ring-brand-charcoal-400 dark:hover:ring-zinc-400 opacity-85 hover:opacity-100'
                      }`}
                    >
                      <span
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full block shadow-inner ${
                          isLight ? 'border border-neutral-300 dark:border-neutral-500' : 'border border-black/15 dark:border-white/20'
                        }`}
                        style={{ backgroundColor: hex }}
                      />
                    </button>
                  );
                })}
                {product.variants.length > 6 && (
                  <span className="text-[10px] font-extrabold text-brand-charcoal-400 dark:text-zinc-500 pl-0.5">
                    +{product.variants.length - 6}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="pt-1.5 min-h-[38px] flex items-center">
              <span className="text-[10px] text-brand-charcoal-400 dark:text-zinc-500 font-medium">
                Standard Edition
              </span>
            </div>
          )}
        </div>

        {/* Pricing & Mobile Quick Action */}
        <div className="pt-2.5 border-t border-brand-cream-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-sm sm:text-base text-brand-forest-950 dark:text-white tracking-tight">
              {formatCurrency(currentPrice)}
            </span>
          </div>

          {/* Mobile Action */}
          <button
            onClick={handleQuickAdd}
            className="sm:hidden px-3 py-1.5 bg-brand-forest-950 dark:bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-wider hover:bg-black dark:hover:bg-zinc-700"
            aria-label="Add to bag"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

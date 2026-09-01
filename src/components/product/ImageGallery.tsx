'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types';

interface ImageGalleryProps {
  images: ProductImage[];
  productName: string;
  activeVariantImage?: string;
  selectedColor?: string;
}

export function ImageGallery({
  images,
  productName,
  activeVariantImage,
  selectedColor,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  // When selected color or variant image changes, reset to the first image of that color
  React.useEffect(() => {
    setSelectedIndex(0);
    setShowAllPhotos(false);
  }, [activeVariantImage, selectedColor]);

  // Compute the effective images to display
  const effectiveImages: ProductImage[] = React.useMemo(() => {
    if (showAllPhotos || (!activeVariantImage && !selectedColor)) {
      return images.length > 0 ? images : [
        {
          id: 'placeholder',
          image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
          sort_order: 1,
          is_primary: true,
        },
      ];
    }

    // Filter images that match the selected color
    const matchingColorImages = selectedColor
      ? images.filter(
          (img) =>
            img.color &&
            img.color.toLowerCase().trim() === selectedColor.toLowerCase().trim()
        )
      : [];

    if (matchingColorImages.length > 0) {
      // If variant has specific image not in matching list, put it first
      if (activeVariantImage && !matchingColorImages.some((img) => img.image_url === activeVariantImage)) {
        return [
          {
            id: 'var-img',
            image_url: activeVariantImage,
            alt_text: `${productName} - ${selectedColor}`,
            sort_order: 1,
            is_primary: true,
            color: selectedColor,
          },
          ...matchingColorImages,
        ];
      }
      return matchingColorImages;
    }

    // If variant has dedicated image_url, show ONLY that color's image
    if (activeVariantImage) {
      return [
        {
          id: 'var-img',
          image_url: activeVariantImage,
          alt_text: `${productName} - ${selectedColor || 'Variant'}`,
          sort_order: 1,
          is_primary: true,
          color: selectedColor,
        },
      ];
    }

    return images.length > 0 ? images : [
      {
        id: 'placeholder',
        image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
        sort_order: 1,
        is_primary: true,
      },
    ];
  }, [images, activeVariantImage, selectedColor, showAllPhotos, productName]);

  const activeImage =
    effectiveImages[selectedIndex] || effectiveImages[0] || {
      image_url: activeVariantImage || images[0]?.image_url || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      alt_text: productName,
    };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col-reverse md:flex-row gap-4">
        {/* Thumbnail Bar */}
        {effectiveImages.length > 1 && (
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 py-1 md:py-0 no-scrollbar">
            {effectiveImages.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-brand-cream-100 dark:bg-zinc-800 border-2 transition-all shrink-0 ${
                  selectedIndex === idx
                    ? 'border-brand-forest-800 dark:border-emerald-400 ring-2 ring-brand-forest-800/20 dark:ring-emerald-400/30'
                    : 'border-brand-cream-300 dark:border-zinc-700 hover:border-brand-charcoal-400 dark:hover:border-zinc-500 opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={img.image_url}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  unoptimized={true}
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Main Large Image Box */}
        <div
          className="relative flex-1 aspect-square rounded-2xl overflow-hidden bg-brand-cream-100 dark:bg-zinc-800 border border-brand-cream-300 dark:border-zinc-800 cursor-crosshair group"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <Image
            src={activeImage.image_url}
            alt={activeImage.alt_text || productName}
            fill
            priority
            unoptimized={true}
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover transition-transform duration-200 ${
              isZoomed ? 'scale-150 origin-center' : 'scale-100'
            }`}
            style={
              isZoomed
                ? {
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                  }
                : undefined
            }
          />
          <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            Hover to Zoom
          </div>
        </div>
      </div>

      {/* Color Photo Notice */}
      {selectedColor && images.length > effectiveImages.length && (
        <div className="text-[11px] text-brand-charcoal-500 dark:text-zinc-400 flex items-center justify-between px-1 pt-1">
          <span>
            Displaying photo for <strong className="text-brand-forest-950 dark:text-white">{selectedColor}</strong>
          </span>
          <button
            type="button"
            onClick={() => setShowAllPhotos(!showAllPhotos)}
            className="text-brand-forest-800 dark:text-emerald-400 hover:text-brand-forest-950 dark:hover:text-white font-bold hover:underline"
          >
            {showAllPhotos ? `Show only ${selectedColor}` : `View all ${images.length} photos`}
          </button>
        </div>
      )}
    </div>
  );
}

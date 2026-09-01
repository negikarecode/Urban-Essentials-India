'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Plus,
  Trash2,
  UploadCloud,
  Check,
  Palette,
  Eye,
  SlidersHorizontal,
  Link as LinkIcon,
  Layers,
  Sparkles,
  ChevronDown,
  X,
} from 'lucide-react';
import { ProductImage, ProductVariant } from '@/types';
import {
  getColorHexFromName,
  isLightColor,
  POPULAR_COLOR_PRESETS,
  formatCurrency,
  slugify,
} from '@/lib/utils';
import { uploadProductImage, validateImageFile } from '@/lib/storage';
import { toast } from 'sonner';

interface ProductVariantManagerProps {
  variants: ProductVariant[];
  onChange: (variants: ProductVariant[]) => void;
  basePrice: number;
  baseSku: string;
  productImages: ProductImage[];
  productId?: string;
}

export function ProductVariantManager({
  variants,
  onChange,
  basePrice,
  baseSku,
  productImages,
  productId = 'product',
}: ProductVariantManagerProps) {
  const [activePreviewVariantId, setActivePreviewVariantId] = useState<string | null>(null);
  const [uploadingVariantId, setUploadingVariantId] = useState<string | null>(null);
  const [galleryPickerVariantId, setGalleryPickerVariantId] = useState<string | null>(null);
  const [urlInputVariantId, setUrlInputVariantId] = useState<string | null>(null);
  const [customUrl, setCustomUrl] = useState('');
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // Helper to generate next SKU for variant
  const makeVariantSku = (colorName: string) => {
    const code = colorName
      .trim()
      .split(/\s+/)
      .map((w) => w[0]?.toUpperCase() || '')
      .join('')
      .slice(0, 4) || 'VAR';
    const prefix = baseSku ? baseSku.trim().toUpperCase() : 'URB-PROD';
    return `${prefix}-${code}`;
  };

  const handleAddVariant = (preset?: { name: string; hex: string }) => {
    const colorName = preset ? preset.name : `Color ${variants.length + 1}`;
    const colorHex = preset ? preset.hex : getColorHexFromName(colorName);
    const newSku = makeVariantSku(colorName);

    // Pick first product image as default if available
    const defaultImage = productImages.length > 0 ? productImages[0].image_url : undefined;

    const newVariant: ProductVariant = {
      id: `var-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      product_id: productId,
      name: colorName,
      sku: newSku,
      price: Number(basePrice) || 999,
      attributes: {
        color: colorName,
        color_code: colorHex,
      },
      color_code: colorHex,
      image_url: defaultImage,
      stock: 30,
      is_active: true,
    };

    const updated = [...variants, newVariant];
    onChange(updated);
    setActivePreviewVariantId(newVariant.id);
    toast.success(`Added variant "${colorName}"`);
  };

  const handleUpdateVariant = (id: string, updates: Partial<ProductVariant>) => {
    const updated = variants.map((v) => {
      if (v.id !== id) return v;
      const updatedVariant: ProductVariant = {
        ...v,
        ...updates,
        attributes: {
          ...v.attributes,
          ...(updates.attributes || {}),
        },
      };

      // Keep color_code and attributes.color_code in sync
      if (updates.color_code) {
        updatedVariant.color_code = updates.color_code;
        updatedVariant.attributes.color_code = updates.color_code;
      }
      if (updates.name) {
        updatedVariant.name = updates.name;
        updatedVariant.attributes.color = updates.name;
      }

      return updatedVariant;
    });
    onChange(updated);
  };

  const handleDeleteVariant = (id: string) => {
    const target = variants.find((v) => v.id === id);
    const updated = variants.filter((v) => v.id !== id);
    onChange(updated);
    if (activePreviewVariantId === id) {
      setActivePreviewVariantId(updated[0]?.id || null);
    }
    toast.info(`Removed variant "${target?.name || 'Item'}"`);
  };

  const handleFileUploadForVariant = async (variantId: string, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const validation = validateImageFile(file);

    if (!validation.isValid) {
      toast.error(validation.error || 'Invalid file format');
      return;
    }

    setUploadingVariantId(variantId);
    try {
      const res = await uploadProductImage(productId || 'product-variant', file);
      if (res.success && res.url) {
        handleUpdateVariant(variantId, { image_url: res.url });
        toast.success(`Color image uploaded for variant!`);
      } else {
        toast.error(res.error || 'Upload failed');
      }
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploadingVariantId(null);
      if (fileInputRefs.current[variantId]) {
        fileInputRefs.current[variantId]!.value = '';
      }
    }
  };

  const handleApplyUrl = (variantId: string) => {
    if (!customUrl.trim()) return;
    handleUpdateVariant(variantId, { image_url: customUrl.trim() });
    setCustomUrl('');
    setUrlInputVariantId(null);
    toast.success('Color image URL applied!');
  };

  const selectedPreviewVariant =
    variants.find((v) => v.id === activePreviewVariantId) || variants[0];

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brand-cream-300 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-brand-forest-800 dark:text-emerald-400" />
            <h4 className="font-bold text-sm text-brand-forest-950 dark:text-white">
              Color Variants & Real Swatches
            </h4>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-forest-100 dark:bg-zinc-800 text-brand-forest-900 dark:text-zinc-200 border border-brand-forest-200 dark:border-zinc-700">
              {variants.length} {variants.length === 1 ? 'Color' : 'Colors'}
            </span>
          </div>
          <p className="text-[11px] text-brand-charcoal-500 dark:text-zinc-400 mt-0.5">
            Add colors with exact hex swatches and attach dedicated photos. Customers will see real color buttons (like Amazon/Flipkart) and the image of that color will show when chosen.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleAddVariant()}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Color Variant</span>
        </button>
      </div>

      {/* Quick Color Presets Bar */}
      <div className="bg-brand-cream-100/60 dark:bg-zinc-800/80 p-3.5 rounded-2xl border border-brand-cream-300 dark:border-zinc-700 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-amber-600 dark:text-amber-400" />
            <span>1-Click Popular Color Presets:</span>
          </span>
          <span className="text-[10px] text-brand-charcoal-400 dark:text-zinc-500">Click to quickly add</span>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {POPULAR_COLOR_PRESETS.slice(0, 10).map((preset) => {
            const isLight = isLightColor(preset.hex);
            const exists = variants.some(
              (v) =>
                v.name.toLowerCase() === preset.name.toLowerCase() ||
                (v.color_code && v.color_code.toLowerCase() === preset.hex.toLowerCase())
            );

            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleAddVariant(preset)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-medium border transition-all ${
                  exists
                    ? 'border-brand-forest-800/40 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-brand-charcoal-500 dark:text-zinc-500 opacity-60'
                    : 'border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-brand-forest-800 dark:hover:border-emerald-500 hover:bg-brand-forest-50 dark:hover:bg-zinc-800 text-brand-charcoal-800 dark:text-zinc-200 hover:scale-102 shadow-2xs'
                }`}
                title={`Add ${preset.name} (${preset.hex})`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full shrink-0 ${
                    isLight ? 'border border-neutral-300' : ''
                  }`}
                  style={{ backgroundColor: preset.hex }}
                />
                <span>{preset.name}</span>
                <Plus className="w-3 h-3 text-brand-charcoal-400 dark:text-zinc-500" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {variants.length === 0 ? (
        <div className="text-center py-8 px-4 border-2 border-dashed border-brand-cream-400 dark:border-zinc-700 rounded-2xl bg-brand-cream-50/50 dark:bg-zinc-800/30">
          <Palette className="w-8 h-8 text-brand-charcoal-400 dark:text-zinc-500 mx-auto mb-2" />
          <h5 className="text-xs font-bold text-brand-charcoal-800 dark:text-zinc-200">No color variants added yet</h5>
          <p className="text-[11px] text-brand-charcoal-500 dark:text-zinc-400 max-w-sm mx-auto mt-1 mb-3">
            If this product comes in multiple colors (e.g. Green, Black, White), add them here so customers can switch between colors with live swatches and dedicated photos.
          </p>
          <button
            type="button"
            onClick={() => handleAddVariant()}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-forest-800 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-brand-forest-900"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add First Color Variant</span>
          </button>
        </div>
      ) : (
        /* Variants List */
        <div className="space-y-4">
          {variants.map((variant, index) => {
            const colorCode =
              variant.color_code ||
              variant.attributes?.color_code ||
              getColorHexFromName(variant.name);
            const isLight = isLightColor(colorCode);

            return (
              <div
                key={variant.id}
                className="p-4 bg-white dark:bg-zinc-800/90 rounded-2xl border border-brand-cream-300 dark:border-zinc-700 shadow-2xs space-y-4 hover:border-brand-forest-700/40 dark:hover:border-emerald-500/40 transition-colors"
              >
                {/* Variant Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-brand-cream-200 dark:border-zinc-700">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-bold text-brand-charcoal-400 dark:text-zinc-500 w-5">
                      #{index + 1}
                    </span>

                    {/* Color Swatch / Native Picker */}
                    <div className="relative flex items-center gap-2">
                      <label
                        className={`relative w-8 h-8 rounded-xl shadow-xs cursor-pointer flex items-center justify-center border-2 transition-transform hover:scale-105 ${
                          isLight ? 'border-neutral-300' : 'border-black/10'
                        }`}
                        style={{ backgroundColor: colorCode }}
                        title="Click to change color swatch with color picker"
                      >
                        <input
                          type="color"
                          value={colorCode}
                          onChange={(e) =>
                            handleUpdateVariant(variant.id, { color_code: e.target.value })
                          }
                          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                        />
                      </label>
                      <input
                        type="text"
                        value={colorCode}
                        onChange={(e) =>
                          handleUpdateVariant(variant.id, { color_code: e.target.value })
                        }
                        placeholder="#000000"
                        className="w-20 px-2 py-1 font-mono text-[11px] font-bold uppercase rounded-lg border border-brand-cream-400 dark:border-zinc-700 bg-brand-cream-50 dark:bg-zinc-900 text-brand-charcoal-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                        title="Hex color code"
                      />
                    </div>

                    {/* Color Name Input */}
                    <div className="flex-1 min-w-[140px]">
                      <input
                        type="text"
                        required
                        value={variant.name}
                        onChange={(e) => {
                          const newName = e.target.value;
                          const updates: Partial<ProductVariant> = { name: newName };
                          if (!variant.color_code) {
                            updates.color_code = getColorHexFromName(newName);
                          }
                          handleUpdateVariant(variant.id, updates);
                        }}
                        placeholder="Color Name (e.g. Forest Green)"
                        className="w-full px-3 py-1.5 text-xs font-bold text-brand-forest-950 dark:text-white rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-charcoal-700 dark:text-zinc-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={variant.is_active}
                        onChange={(e) =>
                          handleUpdateVariant(variant.id, { is_active: e.target.checked })
                        }
                        className="rounded text-brand-forest-800 w-3.5 h-3.5"
                      />
                      <span>Active</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => handleDeleteVariant(variant.id)}
                      className="p-1.5 text-brand-charcoal-400 dark:text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40"
                      title="Delete color variant"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Variant Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  {/* Left Column: Image for this Color */}
                  <div className="md:col-span-5 space-y-2">
                    <label className="block text-[10px] font-bold text-brand-charcoal-600 dark:text-zinc-400 uppercase tracking-wider">
                      Product Image for {variant.name || 'this Color'}
                    </label>

                    <div className="flex items-center gap-3">
                      {/* Image Thumbnail Preview */}
                      <div className="relative w-18 h-18 rounded-xl overflow-hidden bg-brand-cream-100 dark:bg-zinc-900 border border-brand-cream-300 dark:border-zinc-700 shrink-0">
                        {variant.image_url ? (
                          <Image
                            src={variant.image_url}
                            alt={variant.name}
                            fill
                            unoptimized={
                              variant.image_url.startsWith('data:') ||
                              variant.image_url.startsWith('blob:')
                            }
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-brand-charcoal-400 dark:text-zinc-500 p-2 text-center">
                            <Layers className="w-4 h-4 mb-1 text-brand-charcoal-300 dark:text-zinc-600" />
                            <span className="text-[9px] leading-tight">No image set</span>
                          </div>
                        )}
                      </div>

                      {/* Image Source Controls */}
                      <div className="flex-1 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {/* File Upload Button */}
                          <input
                            ref={(el) => {
                              fileInputRefs.current[variant.id] = el;
                            }}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/avif"
                            onChange={(e) => handleFileUploadForVariant(variant.id, e.target.files)}
                            className="hidden"
                          />
                          <button
                            type="button"
                            disabled={uploadingVariantId === variant.id}
                            onClick={() => fileInputRefs.current[variant.id]?.click()}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-cream-100 dark:bg-zinc-700 hover:bg-brand-cream-200 dark:hover:bg-zinc-600 text-brand-charcoal-800 dark:text-zinc-200 rounded-lg text-[11px] font-semibold border border-brand-cream-300 dark:border-zinc-600"
                          >
                            <UploadCloud className="w-3 h-3 text-brand-forest-800 dark:text-emerald-400" />
                            <span>
                              {uploadingVariantId === variant.id ? 'Uploading...' : 'Upload'}
                            </span>
                          </button>

                          {/* Pick from Gallery Button */}
                          {productImages.length > 0 && (
                            <button
                              type="button"
                              onClick={() =>
                                setGalleryPickerVariantId(
                                  galleryPickerVariantId === variant.id ? null : variant.id
                                )
                              }
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-cream-100 dark:bg-zinc-700 hover:bg-brand-cream-200 dark:hover:bg-zinc-600 text-brand-charcoal-800 dark:text-zinc-200 rounded-lg text-[11px] font-semibold border border-brand-cream-300 dark:border-zinc-600"
                            >
                              <Layers className="w-3 h-3 text-brand-forest-800 dark:text-emerald-400" />
                              <span>Pick from Gallery</span>
                            </button>
                          )}

                          {/* Add URL Button */}
                          <button
                            type="button"
                            onClick={() => {
                              setUrlInputVariantId(
                                urlInputVariantId === variant.id ? null : variant.id
                              );
                              setCustomUrl(variant.image_url || '');
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-brand-forest-800 dark:text-emerald-400 hover:text-brand-forest-950 dark:hover:text-emerald-300 text-[11px] font-semibold"
                          >
                            <LinkIcon className="w-3 h-3" />
                            <span>URL</span>
                          </button>
                        </div>

                        {variant.image_url && (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                              <Check className="w-3 h-3" /> Photo linked
                            </span>
                            <button
                              type="button"
                              onClick={() => handleUpdateVariant(variant.id, { image_url: undefined })}
                              className="text-[10px] text-rose-600 dark:text-rose-400 hover:underline"
                            >
                              Clear
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Popover / Expandable: Gallery Picker */}
                    {galleryPickerVariantId === variant.id && (
                      <div className="p-3 bg-brand-cream-100 dark:bg-zinc-800 rounded-xl border border-brand-cream-300 dark:border-zinc-700 space-y-2 mt-2">
                        <div className="flex items-center justify-between text-[11px] font-bold text-brand-charcoal-800 dark:text-zinc-200">
                          <span>Choose from product gallery:</span>
                          <button
                            type="button"
                            onClick={() => setGalleryPickerVariantId(null)}
                            className="text-brand-charcoal-400 dark:text-zinc-400 hover:text-brand-charcoal-700 dark:hover:text-zinc-200"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                          {productImages.map((img, i) => (
                            <button
                              key={img.id || i}
                              type="button"
                              onClick={() => {
                                handleUpdateVariant(variant.id, { image_url: img.image_url });
                                setGalleryPickerVariantId(null);
                                toast.success(`Attached gallery image to ${variant.name}`);
                              }}
                              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-transform hover:scale-105 ${
                                variant.image_url === img.image_url
                                  ? 'border-brand-forest-800 dark:border-emerald-500 ring-2 ring-brand-forest-800/30 dark:ring-emerald-500/30'
                                  : 'border-brand-cream-300 dark:border-zinc-700 hover:border-brand-charcoal-400'
                              }`}
                            >
                              <Image
                                src={img.image_url}
                                alt={`Gallery ${i + 1}`}
                                fill
                                unoptimized={
                                  img.image_url.startsWith('data:') ||
                                  img.image_url.startsWith('blob:')
                                }
                                className="object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* URL Input */}
                    {urlInputVariantId === variant.id && (
                      <div className="flex gap-1.5 mt-2">
                        <input
                          type="url"
                          value={customUrl}
                          onChange={(e) => setCustomUrl(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-brand-charcoal-900 dark:text-zinc-100"
                        />
                        <button
                          type="button"
                          onClick={() => handleApplyUrl(variant.id)}
                          className="px-3 py-1 bg-brand-forest-800 text-white rounded-lg text-xs font-bold"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right Column: SKU, Pricing, Stock */}
                  <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-bold text-brand-charcoal-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                        SKU
                      </label>
                      <input
                        type="text"
                        required
                        value={variant.sku}
                        onChange={(e) =>
                          handleUpdateVariant(variant.id, { sku: e.target.value.toUpperCase() })
                        }
                        className="w-full px-2.5 py-1.5 text-xs font-mono uppercase rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-brand-charcoal-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-brand-charcoal-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={variant.price}
                        onChange={(e) =>
                          handleUpdateVariant(variant.id, { price: Number(e.target.value) })
                        }
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-brand-charcoal-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-brand-charcoal-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                        Stock Units
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={variant.stock}
                        onChange={(e) =>
                          handleUpdateVariant(variant.id, { stock: Number(e.target.value) })
                        }
                        className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-brand-charcoal-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Interactive Storefront Customer Preview */}
      {variants.length > 0 && selectedPreviewVariant && (
        <div className="p-4 bg-brand-cream-50 dark:bg-zinc-800/60 rounded-2xl border border-brand-cream-300 dark:border-zinc-700 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-brand-cream-200 dark:border-zinc-700">
            <span className="text-[11px] font-bold text-brand-forest-950 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-brand-forest-800 dark:text-emerald-400" />
              <span>Live Customer Storefront Preview</span>
            </span>
            <span className="text-[10px] text-brand-charcoal-400 dark:text-zinc-400">
              Click buttons to test color image switching
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-brand-cream-200 dark:border-zinc-800">
            {/* Switched Image Preview */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-brand-cream-100 dark:bg-zinc-800 border border-brand-cream-300 dark:border-zinc-700 shrink-0 shadow-xs">
              {selectedPreviewVariant.image_url ? (
                <Image
                  src={selectedPreviewVariant.image_url}
                  alt={selectedPreviewVariant.name}
                  fill
                  unoptimized={
                    selectedPreviewVariant.image_url.startsWith('data:') ||
                    selectedPreviewVariant.image_url.startsWith('blob:')
                  }
                  className="object-cover transition-all duration-300"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-brand-charcoal-400 dark:text-zinc-500 p-2 text-center text-xs">
                  <span>No image assigned to this color</span>
                </div>
              )}
            </div>

            {/* Swatches and Color Button Row */}
            <div className="space-y-2.5 flex-1">
              <div>
                <span className="text-xs text-brand-charcoal-600 dark:text-zinc-400">Color: </span>
                <strong className="text-xs text-brand-forest-950 dark:text-white font-bold">
                  {selectedPreviewVariant.name}
                </strong>
                <span className="text-[11px] text-brand-charcoal-400 dark:text-zinc-500 ml-2 font-mono">
                  ({selectedPreviewVariant.sku})
                </span>
              </div>

              {/* Color Buttons Row - Amazon/Flipkart style */}
              <div className="flex flex-wrap items-center gap-2">
                {variants.map((v) => {
                  const hex =
                    v.color_code || v.attributes?.color_code || getColorHexFromName(v.name);
                  const isLight = isLightColor(hex);
                  const isSelected = selectedPreviewVariant.id === v.id;

                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setActivePreviewVariantId(v.id)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs transition-all border ${
                        isSelected
                          ? 'border-brand-forest-950 dark:border-emerald-500 bg-brand-forest-50 dark:bg-zinc-800 text-brand-forest-950 dark:text-white font-bold ring-2 ring-brand-forest-900/20 dark:ring-emerald-500/20 shadow-xs'
                          : 'border-brand-cream-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-700 dark:text-zinc-300 hover:border-brand-charcoal-400 dark:hover:border-zinc-500'
                      }`}
                    >
                      {/* Exact Colored Dot */}
                      <span
                        className={`w-4 h-4 rounded-full shrink-0 shadow-inner ${
                          isLight ? 'border border-neutral-300 dark:border-neutral-600' : ''
                        }`}
                        style={{ backgroundColor: hex }}
                      />
                      <span>{v.name}</span>
                      {isSelected && <Check className="w-3 h-3 text-brand-forest-800 dark:text-emerald-400" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3 pt-1 text-xs">
                <span className="font-extrabold text-brand-forest-950 dark:text-white">
                  {formatCurrency(selectedPreviewVariant.price)}
                </span>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  {selectedPreviewVariant.stock} in stock
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

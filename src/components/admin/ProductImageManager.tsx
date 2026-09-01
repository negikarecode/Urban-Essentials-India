'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  UploadCloud,
  Trash2,
  Star,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Plus,
  Link as LinkIcon,
  Check,
  AlertCircle,
} from 'lucide-react';
import { ProductImage } from '@/types';
import { uploadProductImage, validateImageFile } from '@/lib/storage';
import { toast } from 'sonner';

interface ProductImageManagerProps {
  productId: string;
  images: ProductImage[];
  onChange: (updatedImages: ProductImage[]) => void;
}

export function ProductImageManager({
  productId,
  images,
  onChange,
}: ProductImageManagerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);

    const newImagesList = [...images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const validation = validateImageFile(file);

      if (!validation.isValid) {
        toast.error(validation.error || 'Invalid file');
        continue;
      }

      const res = await uploadProductImage(productId || 'new-product', file);
      if (res.success && res.url) {
        const newImg: ProductImage = {
          id: `img_${Date.now()}_${i}`,
          image_url: res.url,
          alt_text: file.name.split('.')[0],
          sort_order: newImagesList.length + 1,
          is_primary: newImagesList.length === 0,
        };
        newImagesList.push(newImg);
        toast.success(`Uploaded "${file.name}"`);
      } else {
        toast.error(res.error || `Failed to upload "${file.name}"`);
      }
    }

    onChange(newImagesList);
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddByUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    const newImg: ProductImage = {
      id: `img_${Date.now()}`,
      image_url: urlInput.trim(),
      alt_text: 'Product Image',
      sort_order: images.length + 1,
      is_primary: images.length === 0,
    };

    onChange([...images, newImg]);
    setUrlInput('');
    setShowUrlInput(false);
    toast.success('Image URL added');
  };

  const handleSetPrimary = (index: number) => {
    const updated = images.map((img, i) => ({
      ...img,
      is_primary: i === index,
    }));
    onChange(updated);
    toast.info('Primary product image updated');
  };

  const handleDeleteImage = (index: number) => {
    const remaining = images.filter((_, i) => i !== index);
    // If we deleted the primary image, make the first remaining image primary
    if (images[index].is_primary && remaining.length > 0) {
      remaining[0].is_primary = true;
    }
    // Re-index sort order
    const reordered = remaining.map((img, i) => ({
      ...img,
      sort_order: i + 1,
    }));
    onChange(reordered);
    toast.info('Image removed');
  };

  const handleMove = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // Update sort order properties
    const reordered = updated.map((img, i) => ({
      ...img,
      sort_order: i + 1,
    }));

    onChange(reordered);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase tracking-wider">
          Product Gallery ({images.length})
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] font-semibold text-brand-forest-800 dark:text-emerald-400 hover:text-brand-forest-950 dark:hover:text-emerald-300 flex items-center gap-1"
          >
            <LinkIcon className="w-3 h-3" />
            <span>Add by URL</span>
          </button>
        </div>
      </div>

      {showUrlInput && (
        <form onSubmit={handleAddByUrl} className="flex gap-2 p-3 bg-brand-cream-100 dark:bg-zinc-800 rounded-2xl border border-brand-cream-300 dark:border-zinc-700">
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-brand-charcoal-900 dark:text-zinc-100"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-brand-forest-800 text-white rounded-xl text-xs font-bold hover:bg-brand-forest-900"
          >
            Add
          </button>
        </form>
      )}

      {/* Upload Dropzone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
          isUploading
            ? 'border-brand-forest-600 bg-brand-forest-50 dark:bg-zinc-800'
            : 'border-brand-cream-400 dark:border-zinc-700 hover:border-brand-forest-700 dark:hover:border-emerald-500 hover:bg-brand-cream-50 dark:hover:bg-zinc-800/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-brand-cream-200 dark:bg-zinc-800 flex items-center justify-center text-brand-forest-800 dark:text-emerald-400">
            {isUploading ? (
              <div className="w-5 h-5 border-2 border-brand-forest-800 dark:border-emerald-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <UploadCloud className="w-5 h-5" />
            )}
          </div>
          <div>
            <p className="text-xs font-bold text-brand-charcoal-900 dark:text-zinc-100">
              {isUploading ? 'Uploading images to Supabase...' : 'Click or Drag & Drop images to upload'}
            </p>
            <p className="text-[10px] text-brand-charcoal-500 dark:text-zinc-400 mt-0.5">
              Supports JPG, PNG, WebP, AVIF up to 5MB
            </p>
          </div>
        </div>
      </div>

      {/* Image Gallery List & Reordering */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {images.map((img, index) => (
            <div
              key={img.id || index}
              className={`relative rounded-2xl overflow-hidden border bg-white dark:bg-zinc-800/90 p-1.5 space-y-2 group shadow-xs ${
                img.is_primary
                  ? 'border-brand-forest-700 dark:border-emerald-500 ring-2 ring-brand-forest-700/20 dark:ring-emerald-500/20'
                  : 'border-brand-cream-300 dark:border-zinc-700'
              }`}
            >
              {/* Thumbnail Container */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-brand-cream-100 dark:bg-zinc-900 border border-brand-cream-200 dark:border-zinc-700">
                <Image
                  src={img.image_url}
                  alt={img.alt_text || `Product image ${index + 1}`}
                  fill
                  unoptimized={img.image_url.startsWith('data:') || img.image_url.startsWith('blob:')}
                  sizes="150px"
                  className="object-cover"
                />

                {img.is_primary && (
                  <span className="absolute top-1.5 left-1.5 bg-brand-forest-900 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-brand-amber-400 text-brand-amber-400" />
                    <span>Primary</span>
                  </span>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between gap-1 pt-0.5 px-0.5">
                {/* Reorder Buttons */}
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'left')}
                    className="p-1 rounded text-brand-charcoal-500 dark:text-zinc-400 hover:bg-brand-cream-200 dark:hover:bg-zinc-700 disabled:opacity-20"
                    title="Move Left"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === images.length - 1}
                    onClick={() => handleMove(index, 'right')}
                    className="p-1 rounded text-brand-charcoal-500 dark:text-zinc-400 hover:bg-brand-cream-200 dark:hover:bg-zinc-700 disabled:opacity-20"
                    title="Move Right"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary & Delete */}
                <div className="flex items-center gap-1">
                  {!img.is_primary && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimary(index)}
                      className="p-1 text-[10px] font-semibold text-brand-charcoal-600 dark:text-zinc-300 hover:text-brand-forest-800 dark:hover:text-emerald-400 rounded hover:bg-brand-cream-200 dark:hover:bg-zinc-700"
                      title="Set as Primary"
                    >
                      <Star className="w-3.5 h-3.5 text-brand-charcoal-400 dark:text-zinc-500 hover:text-brand-amber-500" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(index)}
                    className="p-1 text-brand-charcoal-400 dark:text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 rounded hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    title="Delete Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

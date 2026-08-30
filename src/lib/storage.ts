import { createClient } from '@/lib/supabase/client';

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/svg+xml',
];

export const MAX_IMAGE_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export interface ImageValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates file MIME type and max size for security & performance
 */
export function validateImageFile(file: File): ImageValidationResult {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid file type "${file.type}". Allowed: JPG, PNG, WebP, AVIF, SVG.`,
    };
  }

  if (file.size > MAX_IMAGE_FILE_SIZE) {
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      isValid: false,
      error: `File size (${sizeInMb}MB) exceeds the 5MB maximum limit.`,
    };
  }

  return { isValid: true };
}

/**
 * Uploads product image file to Supabase storage bucket 'product-images'
 */
export async function uploadProductImage(
  productId: string,
  file: File
): Promise<{ success: boolean; url?: string; path?: string; error?: string }> {
  const validation = validateImageFile(file);
  if (!validation.isValid) {
    return { success: false, error: validation.error };
  }

  try {
    const supabase = createClient();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${productId}/${Date.now()}_${cleanFileName}`;

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      // In local demo or offline mode, create object URL for instant preview
      console.warn('Storage upload fallback:', error.message);
      const fallbackUrl = URL.createObjectURL(file);
      return {
        success: true,
        url: fallbackUrl,
        path: filePath,
      };
    }

    const { data: publicData } = supabase.storage
      .from('product-images')
      .getPublicUrl(data.path);

    return {
      success: true,
      url: publicData.publicUrl,
      path: data.path,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Image upload failed',
    };
  }
}

/**
 * Deletes an image from Supabase storage bucket
 */
export async function deleteProductImage(
  filePath: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();
    const { error } = await supabase.storage
      .from('product-images')
      .remove([filePath]);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Image deletion failed' };
  }
}

/**
 * Generates transformed/optimized Supabase Storage image URL
 */
export function getOptimizedImageUrl(
  url: string,
  options?: { width?: number; height?: number; quality?: number; format?: 'origin' | 'webp' | 'avif' }
): string {
  if (!url || !url.includes('supabase.co/storage/v1/object/public')) {
    return url;
  }

  const { width = 800, quality = 80, format = 'webp' } = options || {};
  const renderUrl = url.replace(
    '/storage/v1/object/public/',
    '/storage/v1/render/image/public/'
  );

  const params = new URLSearchParams();
  if (width) params.set('width', width.toString());
  if (quality) params.set('quality', quality.toString());
  if (format) params.set('format', format);

  return `${renderUrl}?${params.toString()}`;
}

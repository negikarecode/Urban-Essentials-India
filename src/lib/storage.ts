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

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads product image file to local storage & Supabase
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
    const formData = new FormData();
    formData.append('file', file);
    formData.append('productId', productId || 'general');

    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      if (data.url) {
        return {
          success: true,
          url: data.url,
          path: data.filename || data.url,
        };
      }
    }

    // Client-side base64 Data URL fallback (never expires, persists across browser refreshes)
    const base64Url = await fileToBase64(file);
    return {
      success: true,
      url: base64Url,
      path: file.name,
    };
  } catch (err: any) {
    try {
      const base64Url = await fileToBase64(file);
      return {
        success: true,
        url: base64Url,
        path: file.name,
      };
    } catch {
      return {
        success: false,
        error: err.message || 'Image upload failed',
      };
    }
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

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Review } from '@/types';
import { REVIEWS_DATA, PRODUCTS } from '@/lib/data/products';

export const REVIEWS_STORAGE_KEY = 'urban_reviews_store_v3';
export const REVIEWS_UPDATED_EVENT = 'urban_reviews_updated';

export interface EnrichedReview extends Review {
  product_name: string;
}

export function generateSeedReviews(): EnrichedReview[] {
  return [];
}

export function getStoredReviews(): EnrichedReview[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    // Purge old demo storage keys from client browser
    localStorage.removeItem('urban_reviews_store_v2');
    localStorage.removeItem('urban_reviews_store_v1');
    localStorage.removeItem('urban_reviews_store');

    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    const parsed: EnrichedReview[] = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
}



function notifyReviewsChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(REVIEWS_UPDATED_EVENT));
  }
}

export function saveReview(review: Review, productName?: string): EnrichedReview[] {
  const current = getStoredReviews();
  const prodMap = new Map(PRODUCTS.map((p) => [p.id, p.name]));
  const finalProdName = productName || prodMap.get(review.product_id) || 'Urban Essentials Product';

  const enriched: EnrichedReview = {
    ...review,
    id: review.id || `rev_${Date.now()}`,
    product_name: finalProdName,
    created_at: review.created_at || new Date().toISOString(),
  };

  const existsIndex = current.findIndex((r) => r.id === enriched.id);
  let updated: EnrichedReview[];
  if (existsIndex >= 0) {
    updated = [...current];
    updated[existsIndex] = enriched;
  } else {
    updated = [enriched, ...current];
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
    notifyReviewsChange();

    fetch('/api/admin/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enriched),
    }).catch((err) => console.warn('Background review sync notice:', err));
  }

  return updated;
}

export function updateReviewStatus(reviewId: string, status: 'approved' | 'rejected'): EnrichedReview[] {
  const current = getStoredReviews();
  const updated = current.map((r) => (r.id === reviewId ? { ...r, status } : r));

  if (typeof window !== 'undefined') {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
    notifyReviewsChange();

    fetch('/api/admin/reviews', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: reviewId, status }),
    }).catch((err) => console.warn('Background review status sync notice:', err));
  }

  return updated;
}

export function deleteReview(reviewId: string): EnrichedReview[] {
  const current = getStoredReviews();
  const updated = current.filter((r) => r.id !== reviewId);

  if (typeof window !== 'undefined') {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
    notifyReviewsChange();

    fetch(`/api/admin/reviews?id=${encodeURIComponent(reviewId)}`, {
      method: 'DELETE',
    }).catch((err) => console.warn('Background review delete notice:', err));
  }

  return updated;
}

export function getProductApprovedReviews(productId: string): EnrichedReview[] {
  const all = getStoredReviews();
  return all.filter((r) => r.product_id === productId && r.status === 'approved');
}

export function useLiveReviews() {
  const [reviews, setReviews] = useState<EnrichedReview[]>(() => generateSeedReviews());


  const reload = useCallback(() => {
    setReviews(getStoredReviews());
  }, []);

  useEffect(() => {
    setReviews(getStoredReviews());

    const handleUpdate = () => {
      setReviews(getStoredReviews());
    };

    window.addEventListener(REVIEWS_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    fetch('/api/admin/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews && Array.isArray(data.reviews) && data.reviews.length > 0) {
          const local = getStoredReviews();
          const localMap = new Map(local.map((r) => [r.id, r]));
          let changed = false;
          data.reviews.forEach((serverRev: EnrichedReview) => {
            if (!localMap.has(serverRev.id)) {
              local.push(serverRev);
              changed = true;
            }
          });
          if (changed) {
            localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(local));
            setReviews([...local]);
          }
        }
      })
      .catch(() => {});

    return () => {
      window.removeEventListener(REVIEWS_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    reviews,
    reload,
    saveReview,
    updateReviewStatus,
    deleteReview,
  };
}

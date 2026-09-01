'use client';

import { useState, useEffect, useCallback } from 'react';
import { Coupon, DiscountType } from '@/types';
import { COUPONS_DATA } from '@/lib/data/products';

export const COUPONS_STORAGE_KEY = 'urban_coupons_store_v3';
export const COUPONS_UPDATED_EVENT = 'urban_coupons_updated';

export const SEED_COUPONS: Coupon[] = [...COUPONS_DATA];

export function getStoredCoupons(): Coupon[] {
  if (typeof window === 'undefined') {
    return SEED_COUPONS;
  }

  try {
    // Purge old demo storage keys from client browser
    localStorage.removeItem('urban_coupons_store_v2');
    localStorage.removeItem('urban_coupons_store_v1');
    localStorage.removeItem('urban_coupons_store');

    const raw = localStorage.getItem(COUPONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(SEED_COUPONS));
      return SEED_COUPONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return SEED_COUPONS;
  } catch {
    return SEED_COUPONS;
  }
}


function notifyCouponsChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(COUPONS_UPDATED_EVENT));
  }
}

export function saveCoupon(coupon: Coupon): Coupon[] {
  const current = getStoredCoupons();
  const cleanCode = coupon.code.trim().toUpperCase();
  const processed: Coupon = {
    ...coupon,
    id: coupon.id || `c-${Date.now()}`,
    code: cleanCode,
    description: coupon.description.trim() || `${coupon.discount_value}${coupon.discount_type === 'percentage' ? '%' : '₹'} off on orders above ₹${coupon.min_order_value}`,
    discount_type: coupon.discount_type,
    discount_value: Number(coupon.discount_value),
    min_order_value: Number(coupon.min_order_value || 0),
    max_discount: coupon.discount_type === 'percentage' ? (coupon.max_discount ? Number(coupon.max_discount) : undefined) : Number(coupon.discount_value),
    usage_limit: coupon.usage_limit ? Number(coupon.usage_limit) : undefined,
    used_count: Number(coupon.used_count || 0),
    is_active: coupon.is_active ?? true,
  };

  const existsIndex = current.findIndex((c) => c.id === processed.id || c.code.toUpperCase() === cleanCode);
  let updated: Coupon[];
  if (existsIndex >= 0) {
    updated = [...current];
    updated[existsIndex] = processed;
  } else {
    updated = [processed, ...current];
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(updated));
    notifyCouponsChange();

    fetch('/api/admin/coupons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(processed),
    }).catch((err) => console.warn('Background coupon sync notice:', err));
  }

  return updated;
}

export function updateCoupon(coupon: Coupon): Coupon[] {
  return saveCoupon(coupon);
}

export function toggleCouponStatus(couponId: string): Coupon[] {
  const current = getStoredCoupons();
  const updated = current.map((c) => (c.id === couponId ? { ...c, is_active: !c.is_active } : c));

  if (typeof window !== 'undefined') {
    localStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(updated));
    notifyCouponsChange();

    const target = updated.find((c) => c.id === couponId);
    if (target) {
      fetch('/api/admin/coupons', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(target),
      }).catch((err) => console.warn('Background coupon status sync notice:', err));
    }
  }

  return updated;
}

export function deleteCoupon(couponId: string): Coupon[] {
  const current = getStoredCoupons();
  const updated = current.filter((c) => c.id !== couponId && c.code !== couponId);

  if (typeof window !== 'undefined') {
    localStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(updated));
    notifyCouponsChange();

    fetch(`/api/admin/coupons?id=${encodeURIComponent(couponId)}`, {
      method: 'DELETE',
    }).catch((err) => console.warn('Background coupon delete notice:', err));
  }

  return updated;
}

export function validateLiveCoupon(
  code: string,
  subtotal: number
): { valid: boolean; coupon?: Coupon; error?: string; discountAmount: number } {
  if (!code || !code.trim()) {
    return { valid: false, error: 'Please enter a coupon code', discountAmount: 0 };
  }

  const cleanCode = code.trim().toUpperCase();
  const coupons = getStoredCoupons();
  const coupon = coupons.find((c) => c.code.toUpperCase() === cleanCode);

  if (!coupon) {
    return { valid: false, error: `Coupon code "${cleanCode}" does not exist.`, discountAmount: 0 };
  }

  if (!coupon.is_active) {
    return { valid: false, error: `Coupon code "${cleanCode}" is currently inactive.`, discountAmount: 0 };
  }

  const now = new Date();
  if (coupon.start_date && new Date(coupon.start_date) > now) {
    return { valid: false, error: `Coupon "${cleanCode}" is not active yet.`, discountAmount: 0 };
  }

  if (coupon.expiry_date && new Date(coupon.expiry_date) < now) {
    return { valid: false, error: `Coupon "${cleanCode}" has expired.`, discountAmount: 0 };
  }

  if (coupon.usage_limit && coupon.used_count && coupon.used_count >= coupon.usage_limit) {
    return { valid: false, error: `Coupon "${cleanCode}" has reached its maximum usage limit.`, discountAmount: 0 };
  }

  if (subtotal < coupon.min_order_value) {
    const diff = coupon.min_order_value - subtotal;
    return {
      valid: false,
      error: `Add ₹${diff} more to your cart to use "${coupon.code}" (Min. order ₹${coupon.min_order_value}).`,
      discountAmount: 0,
    };
  }

  let discountAmount = 0;
  if (coupon.discount_type === 'percentage') {
    discountAmount = (subtotal * coupon.discount_value) / 100;
    if (coupon.max_discount && discountAmount > coupon.max_discount) {
      discountAmount = coupon.max_discount;
    }
  } else {
    discountAmount = coupon.discount_value;
  }

  return {
    valid: true,
    coupon,
    discountAmount: Math.min(Math.round(discountAmount), subtotal),
  };
}

export function useLiveCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>(() => SEED_COUPONS);


  const reload = useCallback(() => {
    setCoupons(getStoredCoupons());
  }, []);

  useEffect(() => {
    setCoupons(getStoredCoupons());

    const handleUpdate = () => {
      setCoupons(getStoredCoupons());
    };

    window.addEventListener(COUPONS_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    fetch('/api/admin/coupons')
      .then((res) => res.json())
      .then((data) => {
        if (data.coupons && Array.isArray(data.coupons) && data.coupons.length > 0) {
          const local = getStoredCoupons();
          const localMap = new Map(local.map((c) => [c.code.toUpperCase(), c]));
          let changed = false;
          data.coupons.forEach((serverCoupon: Coupon) => {
            if (!localMap.has(serverCoupon.code.toUpperCase())) {
              local.push(serverCoupon);
              changed = true;
            }
          });
          if (changed) {
            localStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(local));
            setCoupons([...local]);
          }
        }
      })
      .catch(() => {});

    return () => {
      window.removeEventListener(COUPONS_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    coupons,
    reload,
    saveCoupon,
    updateCoupon,
    toggleCouponStatus,
    deleteCoupon,
    validateLiveCoupon,
  };
}

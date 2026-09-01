'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types';
import { PRODUCTS, CATEGORIES } from '@/lib/data/products';
import { slugify } from '@/lib/utils';

export const PRODUCTS_STORAGE_KEY = 'urban_custom_catalog_v10';
export const CATALOG_UPDATED_EVENT = 'urban_catalog_updated';

/**
 * Returns all products, merging default catalog with any admin-created or edited products in localStorage
 */
export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    // Purge old demo storage keys from client browser
    localStorage.removeItem('urban_custom_catalog_v9');
    localStorage.removeItem('urban_custom_catalog_v8');
    localStorage.removeItem('urban_custom_catalog_v7');
    localStorage.removeItem('urban_custom_catalog_v6');
    localStorage.removeItem('urban_custom_catalog_v5');
    localStorage.removeItem('urban_custom_catalog_v4');
    localStorage.removeItem('urban_custom_catalog_v3');
    localStorage.removeItem('urban_custom_catalog_v2');
    localStorage.removeItem('urban_custom_catalog_v1');
    localStorage.removeItem('urban_custom_catalog');
    localStorage.removeItem('urban_catalog_store_v2');
    localStorage.removeItem('urban_catalog_store');

    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    const parsed: Product[] = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
}


/**
 * Dispatches sync event across all UI components and browser tabs
 */
function notifyCatalogChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CATALOG_UPDATED_EVENT));
  }
}

/**
 * Adds a new product to persistent storage and triggers background DB sync
 */
export function saveProduct(product: Product): Product[] {
  const current = getStoredProducts();
  const existsIndex = current.findIndex(
    (p) => p.id === product.id || (p.sku && product.sku && p.sku.toUpperCase() === product.sku.toUpperCase())
  );

  const matchedCat = CATEGORIES.find(
    (c) => c.slug === product.category_slug || c.id === product.category_id
  ) || CATEGORIES[0];

  const processedProduct: Product = {
    ...product,
    id: product.id || crypto.randomUUID(),
    name: product.name.trim(),
    slug: product.slug ? slugify(product.slug) : slugify(product.name.trim()),
    sku: product.sku.trim().toUpperCase(),
    price: Number(product.price),
    compare_at_price: product.compare_at_price ? Number(product.compare_at_price) : undefined,
    discount:
      product.compare_at_price && product.compare_at_price > product.price
        ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
        : product.discount || 0,
    category_id: product.category_id || matchedCat.id,
    category_name: product.category_name || matchedCat.name,
    category_slug: product.category_slug || matchedCat.slug,
    stock_quantity: Math.max(0, Number(product.stock_quantity ?? 50)),
    low_stock_threshold: Math.max(0, Number(product.low_stock_threshold ?? 10)),
    rating: Number(product.rating ?? 5.0),
    review_count: Number(product.review_count ?? 0),
    is_featured: product.is_featured ?? true,
    is_new_arrival: product.is_new_arrival ?? true,
    is_bestseller: product.is_bestseller ?? false,
    is_active: product.is_active ?? true,
    features: product.features || [],
    specifications: product.specifications || {},
    images: product.images && product.images.length > 0 ? product.images : [
      {
        id: `img-${Date.now()}`,
        image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
        alt_text: product.name,
        sort_order: 1,
        is_primary: true,
      },
    ],
    variants: product.variants,
    created_at: product.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  let updated: Product[];
  if (existsIndex >= 0) {
    updated = [...current];
    updated[existsIndex] = processedProduct;
  } else {
    updated = [processedProduct, ...current];
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
    notifyCatalogChange();

    // Background server persist
    fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(processedProduct),
    }).catch((err) => console.warn('Background product sync notice:', err));
  }

  return updated;
}

/**
 * Updates an existing product in storage and syncs with DB
 */
export function updateProduct(product: Product): Product[] {
  const current = getStoredProducts();
  const matchedCat = CATEGORIES.find(
    (c) => c.slug === product.category_slug || c.id === product.category_id
  ) || CATEGORIES[0];

  const processedProduct: Product = {
    ...product,
    name: product.name.trim(),
    slug: product.slug ? slugify(product.slug) : slugify(product.name.trim()),
    sku: product.sku.trim().toUpperCase(),
    price: Number(product.price),
    compare_at_price: product.compare_at_price ? Number(product.compare_at_price) : undefined,
    discount:
      product.compare_at_price && product.compare_at_price > product.price
        ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
        : product.discount || 0,
    category_id: product.category_id || matchedCat.id,
    category_name: product.category_name || matchedCat.name,
    category_slug: product.category_slug || matchedCat.slug,
    stock_quantity: Math.max(0, Number(product.stock_quantity ?? 0)),
    low_stock_threshold: Math.max(0, Number(product.low_stock_threshold ?? 10)),
    variants: product.variants,
    updated_at: new Date().toISOString(),
  };

  const updated = current.map((p) => (p.id === product.id ? processedProduct : p));

  if (typeof window !== 'undefined') {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
    notifyCatalogChange();

    // Background server persist
    fetch('/api/admin/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(processedProduct),
    }).catch((err) => console.warn('Background product update notice:', err));
  }

  return updated;
}

/**
 * Deletes a product from persistent storage and DB
 */
export function deleteProduct(productId: string): Product[] {
  const current = getStoredProducts();
  const updated = current.filter((p) => p.id !== productId);

  if (typeof window !== 'undefined') {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
    notifyCatalogChange();

    // Background server deletion
    fetch(`/api/admin/products?id=${encodeURIComponent(productId)}`, {
      method: 'DELETE',
    }).catch((err) => console.warn('Background product delete notice:', err));
  }

  return updated;
}

/**
 * Clears ALL products from persistent storage and DB
 */
export function clearAllProducts(): Product[] {
  if (typeof window !== 'undefined') {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify([]));
    notifyCatalogChange();

    // Background server wipe
    fetch('/api/admin/products?all=true', {
      method: 'DELETE',
    }).catch((err) => console.warn('Background wipe notice:', err));
  }

  return [];
}

/**
 * Adjusts inventory quantity for a product
 */
export function updateProductStock(productId: string, stock: number): Product[] {
  const current = getStoredProducts();
  const clamped = Math.max(0, Number(stock));
  const updated = current.map((p) => (p.id === productId ? { ...p, stock_quantity: clamped, updated_at: new Date().toISOString() } : p));

  if (typeof window !== 'undefined') {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
    notifyCatalogChange();

    // Background stock update
    fetch('/api/admin/products/stock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: productId, stock: clamped }),
    }).catch((err) => console.warn('Background stock sync notice:', err));
  }

  return updated;
}

/**
 * Adjusts low stock threshold for a product
 */
export function updateProductThreshold(productId: string, threshold: number): Product[] {
  const current = getStoredProducts();
  const clamped = Math.max(0, Number(threshold));
  const updated = current.map((p) => (p.id === productId ? { ...p, low_stock_threshold: clamped, updated_at: new Date().toISOString() } : p));

  if (typeof window !== 'undefined') {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
    notifyCatalogChange();

    fetch('/api/admin/products/stock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: productId, low_stock_threshold: clamped }),
    }).catch((err) => console.warn('Background threshold sync notice:', err));
  }

  return updated;
}

/**
 * Toggle is_active status of a product
 */
export function toggleProductActive(productId: string): Product[] {
  const current = getStoredProducts();
  const updated = current.map((p) => (p.id === productId ? { ...p, is_active: !p.is_active, updated_at: new Date().toISOString() } : p));

  if (typeof window !== 'undefined') {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
    notifyCatalogChange();

    const target = updated.find((p) => p.id === productId);
    if (target) {
      fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(target),
      }).catch((err) => console.warn('Background product status sync notice:', err));
    }
  }

  return updated;
}

/**
 * Clones / Duplicates an existing product
 */
export function duplicateProduct(productId: string): Product | undefined {
  const current = getStoredProducts();
  const original = current.find((p) => p.id === productId);
  if (!original) return undefined;

  const newId = crypto.randomUUID();
  const newName = `${original.name} (Copy)`;
  const newSku = `${original.sku}-COPY-${Math.floor(100 + Math.random() * 900)}`;

  const duplicated: Product = {
    ...original,
    id: newId,
    name: newName,
    slug: `${original.slug}-copy-${Date.now().toString().slice(-4)}`,
    sku: newSku,
    is_active: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  saveProduct(duplicated);
  return duplicated;
}

/**
 * Deducts stock after successful order placement
 */
export function deductStockForOrder(items: { productId: string; variantId?: string; quantity: number }[]) {
  if (typeof window === 'undefined' || !items || items.length === 0) return;
  const current = getStoredProducts();

  const updated = current.map((p) => {
    const matchedItems = items.filter((i) => i.productId === p.id);
    if (matchedItems.length > 0) {
      let totalDeduction = 0;
      let updatedVariants = p.variants ? [...p.variants] : undefined;

      matchedItems.forEach((item) => {
        totalDeduction += item.quantity;
        if (item.variantId && updatedVariants) {
          updatedVariants = updatedVariants.map((v) =>
            v.id === item.variantId ? { ...v, stock: Math.max(0, (v.stock || 0) - item.quantity) } : v
          );
        }
      });

      return {
        ...p,
        stock_quantity: Math.max(0, p.stock_quantity - totalDeduction),
        variants: updatedVariants,
        updated_at: new Date().toISOString(),
      };
    }
    return p;
  });

  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
  notifyCatalogChange();
}

/**
 * React hook to subscribe to live catalog state across the entire site
 */
export function useLiveProducts(fallback?: Product[]) {
  const [products, setProducts] = useState<Product[]>(() => fallback || PRODUCTS);


  const reload = useCallback(() => {
    setProducts(getStoredProducts());
  }, []);

  useEffect(() => {
    // Initial load from local storage
    setProducts(getStoredProducts());

    // Listen to local catalog change events
    const handleUpdate = () => {
      setProducts(getStoredProducts());
    };

    window.addEventListener(CATALOG_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    // Background fetch to sync any newly added server products
    fetch('/api/admin/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.products && Array.isArray(data.products) && data.products.length > 0) {
          const local = getStoredProducts();
          const localMap = new Map(local.map((p) => [p.id, p]));

          let changed = false;
          data.products.forEach((serverProd: Product) => {
            if (!localMap.has(serverProd.id)) {
              local.push(serverProd);
              changed = true;
            }
          });

          if (changed) {
            localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(local));
            setProducts([...local]);
          }
        }
      })
      .catch(() => {
        // Fallback already active
      });

    return () => {
      window.removeEventListener(CATALOG_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    products,
    reload,
    saveProduct,
    updateProduct,
    deleteProduct,
    clearAllProducts,
    updateProductStock,
    updateProductThreshold,
    toggleProductActive,
    duplicateProduct,
  };
}

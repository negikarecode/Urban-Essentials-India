'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { CartItem, Coupon, Product, ProductVariant } from '@/types';
import { validateCoupon, getProductById } from '@/lib/data/products';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface CartContextType {
  items: CartItem[];
  savedItems: CartItem[];
  isLoading: boolean;
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  saveForLater: (cartItemId: string) => void;
  moveToCart: (savedItemId: string) => void;
  removeSavedItem: (savedItemId: string) => void;
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  discountAmount: number;
  appliedCoupon: Coupon | null;
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  totalAmount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const GUEST_CART_KEY = 'urban_guest_cart_v2';
const SAVED_ITEMS_KEY = 'urban_saved_for_later_v2';
const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 99;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Helper to merge local and remote cart items resolving duplicates
  const mergeCarts = (local: CartItem[], remote: CartItem[]): CartItem[] => {
    const itemMap = new Map<string, CartItem>();

    // Add remote items first
    remote.forEach((item) => {
      itemMap.set(item.id, { ...item });
    });

    // Merge local items
    local.forEach((localItem) => {
      if (itemMap.has(localItem.id)) {
        const existing = itemMap.get(localItem.id)!;
        const combinedQty = Math.min(existing.quantity + localItem.quantity, existing.maxStock);
        itemMap.set(localItem.id, { ...existing, quantity: combinedQty });
      } else {
        itemMap.set(localItem.id, { ...localItem });
      }
    });

    return Array.from(itemMap.values());
  };

  // Initial Load & Auth Sync
  useEffect(() => {
    let isSubscribed = true;

    async function loadCart() {
      setIsLoading(true);
      try {
        // 1. Read Guest Local Cart & Saved Items
        let localCart: CartItem[] = [];
        let localSaved: CartItem[] = [];
        try {
          const stored = localStorage.getItem(GUEST_CART_KEY);
          if (stored) localCart = JSON.parse(stored);
          const savedStored = localStorage.getItem(SAVED_ITEMS_KEY);
          if (savedStored) localSaved = JSON.parse(savedStored);
        } catch {
          // ignore parsing error
        }

        if (isSubscribed) {
          setSavedItems(localSaved);
        }

        // 2. If user is authenticated, query Supabase
        if (user) {
          try {
            const supabase = createClient();
            const { data: cartData } = await supabase
              .from('carts')
              .select('id, cart_items(*)')
              .eq('user_id', user.id)
              .maybeSingle();

            if (cartData && cartData.cart_items) {
              const remoteCart: CartItem[] = cartData.cart_items.map((ci: any) => {
                const prod = getProductById(ci.product_id);
                return {
                  id: ci.variant_id ? `${ci.product_id}-${ci.variant_id}` : ci.product_id,
                  productId: ci.product_id,
                  variantId: ci.variant_id,
                  name: prod?.name || 'Product',
                  slug: prod?.slug || '',
                  price: prod?.price || 0,
                  image: prod?.images[0]?.image_url || '/placeholder.png',
                  quantity: ci.quantity,
                  maxStock: prod?.stock_quantity || 10,
                };
              });

              // Merge guest items with user cart
              const merged = mergeCarts(localCart, remoteCart);
              if (isSubscribed) setItems(merged);

              // Clear guest cart once merged
              localStorage.removeItem(GUEST_CART_KEY);
            } else {
              if (isSubscribed) setItems(localCart);
            }
          } catch {
            if (isSubscribed) setItems(localCart);
          }
        } else {
          if (isSubscribed) setItems(localCart);
        }
      } finally {
        if (isSubscribed) {
          setIsLoaded(true);
          setIsLoading(false);
        }
      }
    }

    loadCart();

    return () => {
      isSubscribed = false;
    };
  }, [user]);

  // Persist Local Cart & Saved Items
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
      localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(savedItems));
    } catch {
      // ignore
    }
  }, [items, savedItems, isLoaded]);

  // Add Item to Cart
  const addItem = useCallback(
    (product: Product, variant?: ProductVariant, quantity: number = 1) => {
      if (!product.is_active) {
        toast.error('This product is currently inactive or out of stock');
        return;
      }

      setItems((prevItems) => {
        const cartItemId = variant ? `${product.id}-${variant.id}` : product.id;
        const existingIndex = prevItems.findIndex((item) => item.id === cartItemId);
        const price = variant?.price ?? product.price;
        const comparePrice = variant?.compare_at_price ?? product.compare_at_price;
        const image = product.images[0]?.image_url || '/placeholder.png';
        const maxStock = variant ? variant.stock : product.stock_quantity;

        if (maxStock <= 0) {
          toast.error('Item is out of stock');
          return prevItems;
        }

        if (existingIndex > -1) {
          const updated = [...prevItems];
          const newQty = Math.min(updated[existingIndex].quantity + quantity, maxStock);
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: newQty,
          };
          toast.success(`Updated ${product.name} quantity to ${newQty}`);
          return updated;
        } else {
          const newItem: CartItem = {
            id: cartItemId,
            productId: product.id,
            variantId: variant?.id,
            name: product.name,
            variantName: variant?.name,
            slug: product.slug,
            price,
            compare_at_price: comparePrice,
            image,
            quantity: Math.min(Math.max(1, quantity), maxStock),
            maxStock,
          };
          toast.success(`Added ${product.name} to cart`);
          return [...prevItems, newItem];
        }
      });

      setIsCartOpen(true);
    },
    []
  );

  // Remove Item
  const removeItem = useCallback((cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
    toast.info('Item removed from cart');
  }, []);

  // Update Quantity
  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const clampedQty = Math.min(Math.max(1, quantity), item.maxStock);
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  }, [removeItem]);

  // Clear Cart
  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
    try {
      localStorage.removeItem(GUEST_CART_KEY);
    } catch {
      // ignore
    }
    toast.info('Cart cleared');
  }, []);

  // Save For Later
  const saveForLater = useCallback((cartItemId: string) => {
    setItems((prev) => {
      const itemToSave = prev.find((i) => i.id === cartItemId);
      if (itemToSave) {
        setSavedItems((savedPrev) => {
          if (savedPrev.some((si) => si.id === cartItemId)) return savedPrev;
          return [...savedPrev, itemToSave];
        });
        toast.info(`Moved "${itemToSave.name}" to Saved for Later`);
      }
      return prev.filter((i) => i.id !== cartItemId);
    });
  }, []);

  // Move back to Cart from Saved For Later
  const moveToCart = useCallback((savedItemId: string) => {
    setSavedItems((savedPrev) => {
      const itemToMove = savedPrev.find((si) => si.id === savedItemId);
      if (itemToMove) {
        setItems((cartPrev) => {
          if (cartPrev.some((ci) => ci.id === savedItemId)) return cartPrev;
          return [...cartPrev, itemToMove];
        });
        toast.success(`Moved "${itemToMove.name}" back to cart`);
      }
      return savedPrev.filter((si) => si.id !== savedItemId);
    });
  }, []);

  // Remove Saved Item
  const removeSavedItem = useCallback((savedItemId: string) => {
    setSavedItems((prev) => prev.filter((si) => si.id !== savedItemId));
    toast.info('Item removed from saved list');
  }, []);

  // Totals calculations
  const itemCount = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  const shippingFee = useMemo(() => {
    if (items.length === 0) return 0;
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  }, [items.length, subtotal]);

  const amountNeededForFreeShipping = useMemo(() => {
    return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  }, [subtotal]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    const res = validateCoupon(appliedCoupon.code, subtotal);
    return res.valid ? res.discountAmount : 0;
  }, [appliedCoupon, subtotal]);

  const totalAmount = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + shippingFee);
  }, [subtotal, discountAmount, shippingFee]);

  const applyCouponCode = useCallback(
    (code: string) => {
      const res = validateCoupon(code, subtotal);
      if (res.valid && res.coupon) {
        setAppliedCoupon(res.coupon);
        toast.success(`Coupon "${code.toUpperCase()}" applied! Saved ₹${res.discountAmount}`);
        return { success: true, message: `Coupon applied: Saved ₹${res.discountAmount}` };
      } else {
        toast.error(res.error || 'Invalid coupon code');
        return { success: false, message: res.error || 'Invalid coupon code' };
      }
    },
    [subtotal]
  );

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    toast.info('Coupon removed');
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        savedItems,
        isLoading,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        saveForLater,
        moveToCart,
        removeSavedItem,
        itemCount,
        subtotal,
        shippingFee,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        discountAmount,
        appliedCoupon,
        applyCouponCode,
        removeCoupon,
        totalAmount,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen((prev) => !prev),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

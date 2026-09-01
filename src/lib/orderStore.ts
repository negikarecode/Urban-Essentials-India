'use client';

import { useState, useEffect, useCallback } from 'react';
import { Order, OrderStatus } from '@/types';
import { deductStockForOrder } from '@/lib/productStore';

export const ORDERS_STORAGE_KEY = 'urban_orders_store_v3';
export const ORDERS_UPDATED_EVENT = 'urban_orders_updated';

export const SEED_ORDERS: Order[] = [];

export function getStoredOrders(): Order[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    // Purge old demo storage keys from client browser
    localStorage.removeItem('urban_orders_store_v2');
    localStorage.removeItem('urban_orders_store_v1');
    localStorage.removeItem('urban_orders_store');

    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
}



function notifyOrdersChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(ORDERS_UPDATED_EVENT));
  }
}

export function saveOrder(order: Order): Order[] {
  const current = getStoredOrders();
  const exists = current.some((o) => o.id === order.id || o.order_number === order.order_number);
  let updated: Order[];
  if (exists) {
    updated = current.map((o) => (o.id === order.id || o.order_number === order.order_number ? order : o));
  } else {
    updated = [order, ...current];
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    notifyOrdersChange();

    // Auto deduct product stock
    if (order.items && order.items.length > 0) {
      deductStockForOrder(
        order.items.map((i) => ({
          productId: i.product_id,
          variantId: i.variant_id,
          quantity: i.quantity,
        }))
      );
    }

    // Sync to backend
    fetch('/api/admin/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    }).catch((err) => console.warn('Background order sync notice:', err));
  }

  return updated;
}

export function updateOrderStatus(orderId: string, status: OrderStatus): Order[] {
  const current = getStoredOrders();
  const updated = current.map((o) => (o.id === orderId || o.order_number === orderId ? { ...o, order_status: status, updated_at: new Date().toISOString() } : o));

  if (typeof window !== 'undefined') {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    notifyOrdersChange();

    fetch('/api/admin/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: orderId, order_status: status }),
    }).catch((err) => console.warn('Background order status update notice:', err));
  }

  return updated;
}

export function deleteOrder(orderId: string): Order[] {
  const current = getStoredOrders();
  const updated = current.filter((o) => o.id !== orderId && o.order_number !== orderId);

  if (typeof window !== 'undefined') {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    notifyOrdersChange();

    fetch(`/api/admin/orders?id=${encodeURIComponent(orderId)}`, {
      method: 'DELETE',
    }).catch((err) => console.warn('Background order delete notice:', err));
  }

  return updated;
}

export function useLiveOrders() {
  const [orders, setOrders] = useState<Order[]>(() => SEED_ORDERS);


  const reload = useCallback(() => {
    setOrders(getStoredOrders());
  }, []);

  useEffect(() => {
    setOrders(getStoredOrders());

    const handleUpdate = () => {
      setOrders(getStoredOrders());
    };

    window.addEventListener(ORDERS_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    fetch('/api/admin/orders')
      .then((res) => res.json())
      .then((data) => {
        if (data.orders && Array.isArray(data.orders) && data.orders.length > 0) {
          const local = getStoredOrders();
          const localMap = new Map(local.map((o) => [o.order_number, o]));
          let changed = false;
          data.orders.forEach((serverOrder: Order) => {
            if (!localMap.has(serverOrder.order_number)) {
              local.push(serverOrder);
              changed = true;
            }
          });
          if (changed) {
            localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(local));
            setOrders([...local]);
          }
        }
      })
      .catch(() => {});

    return () => {
      window.removeEventListener(ORDERS_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    orders,
    reload,
    saveOrder,
    updateOrderStatus,
    deleteOrder,
  };
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { getStoredOrders, ORDERS_UPDATED_EVENT } from '@/lib/orderStore';

export const CUSTOMERS_STORAGE_KEY = 'urban_customers_store_v3';
export const CUSTOMERS_UPDATED_EVENT = 'urban_customers_updated';

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  ordersCount: number;
  totalSpent: number;
  status: 'active' | 'vip' | 'inactive';
  address?: string;
  city?: string;
  notes?: string;
}

export type CustomerSummary = CustomerProfile;

export const SEED_CUSTOMERS: CustomerProfile[] = [];

export function getStoredCustomers(): CustomerProfile[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    // Purge old demo storage keys from client browser
    localStorage.removeItem('urban_customers_store_v2');
    localStorage.removeItem('urban_customers_store_v1');
    localStorage.removeItem('urban_customers_store');

    const raw = localStorage.getItem(CUSTOMERS_STORAGE_KEY);
    let baseList: CustomerProfile[] = [];
    if (raw) {
      const parsed: CustomerProfile[] = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        baseList = parsed;
      }
    }

    // Merge live data from placed orders
    const orders = getStoredOrders();
    const customerMap = new Map<string, CustomerProfile>();

    // Load any existing base/manually saved profiles
    baseList.forEach((c) => {
      if (c && c.email) {
        customerMap.set(c.email.toLowerCase().trim(), { ...c });
      }
    });

    // Group orders by email to calculate accurate totals
    const ordersByEmail = new Map<string, typeof orders>();
    orders.forEach((ord) => {
      const email = (ord.guest_email || ord.shipping_address?.email || '').toLowerCase().trim();
      if (!email) return;
      if (!ordersByEmail.has(email)) {
        ordersByEmail.set(email, []);
      }
      ordersByEmail.get(email)!.push(ord);
    });

    ordersByEmail.forEach((custOrders, email) => {
      const totalSpent = custOrders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);
      const ordersCount = custOrders.length;
      const latestOrder = custOrders[0];
      const oldestOrder = custOrders[custOrders.length - 1];

      const name = latestOrder.shipping_address?.full_name || email.split('@')[0];
      const phone = latestOrder.guest_phone || latestOrder.shipping_address?.phone || '+91 98765 00000';
      const city = latestOrder.shipping_address?.city || '';
      const addrLine = latestOrder.shipping_address
        ? `${latestOrder.shipping_address.address_line1 || ''}${latestOrder.shipping_address.address_line2 ? ', ' + latestOrder.shipping_address.address_line2 : ''}, ${latestOrder.shipping_address.city || ''}, ${latestOrder.shipping_address.state || ''} - ${latestOrder.shipping_address.postal_code || ''}`
        : undefined;

      const existing = customerMap.get(email);
      if (existing) {
        customerMap.set(email, {
          ...existing,
          name: existing.name || name,
          phone: existing.phone || phone,
          city: existing.city || city,
          address: existing.address || addrLine,
          ordersCount: Math.max(existing.ordersCount || 0, ordersCount),
          totalSpent: Math.max(existing.totalSpent || 0, totalSpent),
          status: (existing.totalSpent || 0) >= 3000 || totalSpent >= 3000 || existing.status === 'vip' ? 'vip' : 'active',
        });
      } else {
        customerMap.set(email, {
          id: `cust_${email.replace(/[^a-zA-Z0-9]/g, '_')}`,
          name,
          email,
          phone,
          city,
          address: addrLine,
          joinedDate: new Date(oldestOrder.created_at || Date.now()).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          ordersCount,
          totalSpent,
          status: totalSpent >= 3000 ? 'vip' : 'active',
        });
      }
    });

    return Array.from(customerMap.values());
  } catch {
    return [];
  }
}


function notifyCustomersChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CUSTOMERS_UPDATED_EVENT));
  }
}

export function saveCustomer(customer: CustomerProfile): CustomerProfile[] {
  const current = getStoredCustomers();
  const existsIndex = current.findIndex((c) => c.id === customer.id || c.email.toLowerCase() === customer.email.toLowerCase());
  let updated: CustomerProfile[];
  if (existsIndex >= 0) {
    updated = [...current];
    updated[existsIndex] = customer;
  } else {
    updated = [customer, ...current];
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(updated));
    notifyCustomersChange();
  }

  return updated;
}

export function deleteCustomer(customerId: string): CustomerProfile[] {
  const current = getStoredCustomers();
  const updated = current.filter((c) => c.id !== customerId);

  if (typeof window !== 'undefined') {
    localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(updated));
    notifyCustomersChange();
  }

  return updated;
}

export function useLiveCustomers() {
  const [customers, setCustomers] = useState<CustomerProfile[]>(() => SEED_CUSTOMERS);


  const reload = useCallback(() => {
    setCustomers(getStoredCustomers());
  }, []);

  useEffect(() => {
    setCustomers(getStoredCustomers());

    const handleUpdate = () => {
      setCustomers(getStoredCustomers());
    };

    window.addEventListener(CUSTOMERS_UPDATED_EVENT, handleUpdate);
    window.addEventListener(ORDERS_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(CUSTOMERS_UPDATED_EVENT, handleUpdate);
      window.removeEventListener(ORDERS_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    customers,
    reload,
    saveCustomer,
    deleteCustomer,
  };
}

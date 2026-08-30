'use client';

import React, { useState } from 'react';
import { ShoppingBag, Search, Eye, CheckCircle2, Truck, Clock, XCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { OrderStatus } from '@/types';
import { toast } from 'sonner';

interface AdminOrderRow {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  items_summary: string;
  total_amount: number;
  payment_status: string;
  order_status: OrderStatus;
  created_at: string;
}

const INITIAL_ORDERS: AdminOrderRow[] = [
  {
    id: 'ord-101',
    order_number: 'KUR-2026-9042',
    customer_name: 'Ananya Sharma',
    customer_email: 'ananya@gmail.com',
    items_summary: '1x Urban Essentials Bento Pro (Forest Green)',
    total_amount: 1499,
    payment_status: 'paid',
    order_status: 'delivered',
    created_at: '2026-08-30 14:40',
  },
  {
    id: 'ord-102',
    order_number: 'KUR-2026-8819',
    customer_name: 'Vikram Mehta',
    customer_email: 'vikram.m@gmail.com',
    items_summary: '1x Back-to-Campus Starter Bundle',
    total_amount: 3299,
    payment_status: 'paid',
    order_status: 'processing',
    created_at: '2026-08-30 11:15',
  },
  {
    id: 'ord-103',
    order_number: 'KUR-2026-8750',
    customer_name: 'Priya Narang',
    customer_email: 'priya@techcorp.in',
    items_summary: '1x Desk Mat + 1x HydroShield Flask',
    total_amount: 2198,
    payment_status: 'paid',
    order_status: 'shipped',
    created_at: '2026-08-29 17:20',
  },
  {
    id: 'ord-104',
    order_number: 'KUR-2026-8612',
    customer_name: 'Karan Joshi',
    customer_email: 'karan@edu.in',
    items_summary: '1x AeroCampus Backpack',
    total_amount: 2499,
    payment_status: 'paid',
    order_status: 'delivered',
    created_at: '2026-08-28 09:30',
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrderRow[]>(INITIAL_ORDERS);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          toast.success(`Order #${o.order_number} status updated to ${newStatus}`);
          return { ...o, order_status: newStatus };
        }
        return o;
      })
    );
  };

  const filtered = orders.filter((o) => {
    if (filterStatus !== 'all' && o.order_status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.order_number.toLowerCase().includes(q) ||
        o.customer_name.toLowerCase().includes(q) ||
        o.customer_email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-brand-forest-950">
          Order Management & Fulfillment
        </h1>
        <p className="text-xs text-brand-charcoal-500 mt-1">
          Review customer orders, update tracking statuses, and process deliveries.
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-brand-cream-300 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                filterStatus === st
                  ? 'bg-brand-forest-800 text-white'
                  : 'bg-brand-cream-100 text-brand-charcoal-700 hover:bg-brand-cream-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs flex-1">
          <input
            type="text"
            placeholder="Search order # or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-brand-cream-400 bg-brand-cream-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
          />
          <Search className="w-4 h-4 text-brand-charcoal-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-brand-cream-300 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-brand-cream-100/70 border-b border-brand-cream-300 text-brand-charcoal-600 uppercase tracking-wider">
                <th className="py-3 px-4 font-bold">Order #</th>
                <th className="py-3 px-4 font-bold">Customer Details</th>
                <th className="py-3 px-4 font-bold">Items Summary</th>
                <th className="py-3 px-4 font-bold">Total Paid</th>
                <th className="py-3 px-4 font-bold">Date & Time</th>
                <th className="py-3 px-4 font-bold text-right">Update Order Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-cream-200">
              {filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-brand-cream-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-brand-forest-950">
                    #{ord.order_number}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-brand-charcoal-900">{ord.customer_name}</div>
                    <div className="text-[11px] text-brand-charcoal-400">{ord.customer_email}</div>
                  </td>

                  <td className="py-3.5 px-4 text-brand-charcoal-700 max-w-xs truncate">
                    {ord.items_summary}
                  </td>

                  <td className="py-3.5 px-4 font-extrabold text-brand-forest-950">
                    {formatCurrency(ord.total_amount)}
                  </td>

                  <td className="py-3.5 px-4 text-brand-charcoal-500">
                    {ord.created_at}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={ord.order_status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase focus:outline-none border cursor-pointer ${
                        ord.order_status === 'delivered'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : ord.order_status === 'shipped'
                          ? 'bg-blue-50 text-blue-800 border-blue-300'
                          : ord.order_status === 'cancelled'
                          ? 'bg-rose-50 text-rose-800 border-rose-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="packed">Packed</option>
                      <option value="shipped">Shipped</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

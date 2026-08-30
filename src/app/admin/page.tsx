'use client';

import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  AlertTriangle,
  ArrowRight,
  Plus,
  CheckCircle,
  Clock,
  Truck,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { PRODUCTS } from '@/lib/data/products';

export default function AdminDashboardPage() {
  const totalProducts = PRODUCTS.length;
  const lowStockCount = PRODUCTS.filter((p) => p.stock_quantity <= (p.low_stock_threshold || 10)).length;

  const STATS = [
    {
      title: 'Gross Sales Revenue',
      value: '₹2,48,650',
      change: '+18.4% vs last month',
      icon: TrendingUp,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      title: 'Total Orders',
      value: '142 Orders',
      change: '12 orders pending dispatch',
      icon: ShoppingBag,
      color: 'text-brand-forest-800 bg-brand-forest-50 border-brand-forest-200',
    },
    {
      title: 'Active Products',
      value: `${totalProducts} Items`,
      change: '10 Categories listed',
      icon: Package,
      color: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      title: 'Low Stock Alerts',
      value: `${lowStockCount} Items`,
      change: 'Requires replenishment',
      icon: AlertTriangle,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
    },
  ];

  const RECENT_ORDERS = [
    {
      id: 'ord-101',
      order_number: 'KUR-2026-9042',
      customer: 'Ananya Sharma',
      email: 'ananya@gmail.com',
      date: 'Today, 2:40 PM',
      total: 1499,
      status: 'delivered',
      items: '1x Urban Essentials Bento Pro (Forest Green)',
    },
    {
      id: 'ord-102',
      order_number: 'KUR-2026-8819',
      customer: 'Vikram Mehta',
      email: 'vikram.m@gmail.com',
      date: 'Today, 11:15 AM',
      total: 3299,
      status: 'processing',
      items: '1x Back-to-Campus Starter Bundle',
    },
    {
      id: 'ord-103',
      order_number: 'KUR-2026-8750',
      customer: 'Priya Narang',
      email: 'priya@techcorp.in',
      date: 'Yesterday',
      total: 2198,
      status: 'shipped',
      items: '1x Desk Mat + 1x HydroShield Flask',
    },
    {
      id: 'ord-104',
      order_number: 'KUR-2026-8612',
      customer: 'Karan Joshi',
      email: 'karan@edu.in',
      date: 'Aug 28',
      total: 2499,
      status: 'delivered',
      items: '1x AeroCampus Backpack',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-brand-forest-950">
            Admin Overview & Analytics
          </h1>
          <p className="text-xs text-brand-charcoal-500 mt-1">
            Real-time ecommerce performance, inventory alerts, and order fulfillment status.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-3xl p-5 border border-brand-cream-300 shadow-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-brand-charcoal-500 uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className={`p-2 rounded-xl border ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="font-serif font-extrabold text-2xl text-brand-forest-950">
                  {stat.value}
                </div>
                <div className="text-[11px] font-medium text-brand-charcoal-500 mt-1">
                  {stat.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-3xl p-6 border border-brand-cream-300 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-brand-cream-200">
          <h2 className="font-serif font-bold text-lg text-brand-forest-950">
            Recent Customer Orders
          </h2>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-brand-forest-800 hover:text-brand-forest-950 flex items-center gap-1"
          >
            <span>Manage All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-brand-cream-200 text-brand-charcoal-400 uppercase tracking-wider">
                <th className="pb-3 font-bold">Order #</th>
                <th className="pb-3 font-bold">Customer</th>
                <th className="pb-3 font-bold">Items</th>
                <th className="pb-3 font-bold">Total</th>
                <th className="pb-3 font-bold">Date</th>
                <th className="pb-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-cream-200">
              {RECENT_ORDERS.map((ord) => (
                <tr key={ord.id} className="hover:bg-brand-cream-50 transition-colors">
                  <td className="py-3.5 font-mono font-bold text-brand-forest-950">
                    #{ord.order_number}
                  </td>
                  <td className="py-3.5">
                    <div className="font-bold text-brand-charcoal-900">{ord.customer}</div>
                    <div className="text-[11px] text-brand-charcoal-400">{ord.email}</div>
                  </td>
                  <td className="py-3.5 text-brand-charcoal-700 max-w-xs truncate">
                    {ord.items}
                  </td>
                  <td className="py-3.5 font-extrabold text-brand-forest-950">
                    {formatCurrency(ord.total)}
                  </td>
                  <td className="py-3.5 text-brand-charcoal-500">{ord.date}</td>
                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        ord.status === 'delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.status === 'shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {ord.status === 'delivered' && <CheckCircle className="w-3 h-3" />}
                      {ord.status === 'shipped' && <Truck className="w-3 h-3" />}
                      {ord.status === 'processing' && <Clock className="w-3 h-3" />}
                      <span>{ord.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inventory & Low Stock Quick Alert */}
      <div className="bg-white rounded-3xl p-6 border border-brand-cream-300 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-brand-cream-200">
          <h2 className="font-serif font-bold text-lg text-brand-forest-950 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>Low Stock Alert Summary</span>
          </h2>
          <Link
            href="/admin/inventory"
            className="text-xs font-bold text-brand-forest-800 hover:text-brand-forest-950"
          >
            Manage Inventory &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PRODUCTS.filter((p) => p.stock_quantity <= (p.low_stock_threshold || 10)).map((prod) => (
            <div
              key={prod.id}
              className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-between"
            >
              <div>
                <h4 className="font-bold text-xs text-brand-charcoal-900">{prod.name}</h4>
                <p className="text-[11px] text-brand-charcoal-500 mt-0.5">
                  SKU: {prod.sku} • Threshold: {prod.low_stock_threshold}
                </p>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-sm text-amber-800">
                  {prod.stock_quantity} left
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

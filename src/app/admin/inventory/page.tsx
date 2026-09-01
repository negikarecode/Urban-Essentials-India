'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Boxes,
  AlertTriangle,
  CheckCircle,
  Plus,
  Minus,
  Search,
  Check,
  RotateCcw,
  DollarSign,
  TrendingDown,
  Sparkles,
  Filter,
} from 'lucide-react';
import { CATEGORIES } from '@/lib/data/products';
import { Product } from '@/types';
import { useLiveProducts } from '@/lib/productStore';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminInventoryPage() {
  const { products, updateProductStock: saveStock, updateProductThreshold } = useLiveProducts();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockStatusFilter, setStockStatusFilter] = useState('all'); // 'all' | 'in_stock' | 'low_stock' | 'out_of_stock'

  // Local editing states for direct input
  const [editingStockMap, setEditingStockMap] = useState<Record<string, number>>({});
  const [editingThresholdMap, setEditingThresholdMap] = useState<Record<string, number>>({});

  const handleStockUpdate = (productId: string, newStock: number, name?: string) => {
    const clamped = Math.max(0, newStock);
    saveStock(productId, clamped);
    toast.success(`Stock for "${name || 'Product'}" updated to ${clamped} units`);
  };

  const handleThresholdUpdate = (productId: string, newThreshold: number, name?: string) => {
    const clamped = Math.max(0, newThreshold);
    updateProductThreshold(productId, clamped);
    toast.success(`Low stock threshold for "${name || 'Product'}" set to ${clamped}`);
  };

  // Metrics
  const totalSKUs = products.length;
  const totalUnits = products.reduce((acc, p) => acc + p.stock_quantity, 0);
  const lowStockSKUs = products.filter((p) => p.stock_quantity > 0 && p.stock_quantity <= (p.low_stock_threshold || 10)).length;
  const outOfStockSKUs = products.filter((p) => p.stock_quantity === 0).length;
  const totalValuation = products.reduce((acc, p) => acc + p.stock_quantity * p.price, 0);

  const filtered = products.filter((p) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category_name?.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    if (selectedCategory !== 'all' && p.category_slug !== selectedCategory && p.category_id !== selectedCategory) {
      return false;
    }

    if (stockStatusFilter === 'out_of_stock' && p.stock_quantity > 0) return false;
    if (stockStatusFilter === 'low_stock' && (p.stock_quantity <= 0 || p.stock_quantity > (p.low_stock_threshold || 10))) return false;
    if (stockStatusFilter === 'in_stock' && p.stock_quantity <= (p.low_stock_threshold || 10)) return false;

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-brand-forest-950 dark:text-white">
          Warehouse & Inventory Management
        </h1>
        <p className="text-xs text-brand-charcoal-500 dark:text-zinc-400 mt-1">
          Monitor warehouse stock, adjust quantities with quick steps or direct typing, and customize low-stock reorder thresholds.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-brand-cream-300 dark:border-zinc-800 shadow-xs">
          <span className="text-[10px] font-bold text-brand-charcoal-500 dark:text-zinc-400 uppercase tracking-wider block">
            Total SKUs
          </span>
          <div className="font-serif font-extrabold text-xl sm:text-2xl text-brand-forest-950 dark:text-white mt-1">
            {totalSKUs}
          </div>
          <span className="text-[10px] text-brand-charcoal-400 dark:text-zinc-500 mt-0.5 block">Catalog Items</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-brand-cream-300 dark:border-zinc-800 shadow-xs">
          <span className="text-[10px] font-bold text-brand-charcoal-500 dark:text-zinc-400 uppercase tracking-wider block">
            Units in Stock
          </span>
          <div className="font-serif font-extrabold text-xl sm:text-2xl text-brand-forest-950 dark:text-white mt-1">
            {totalUnits.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5 block">Physical Inventory</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-brand-cream-300 dark:border-zinc-800 shadow-xs">
          <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
            Low Stock Alerts
          </span>
          <div className="font-serif font-extrabold text-xl sm:text-2xl text-amber-800 dark:text-amber-300 mt-1">
            {lowStockSKUs}
          </div>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5 block">Needs Restocking</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-brand-cream-300 dark:border-zinc-800 shadow-xs">
          <span className="text-[10px] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">
            Out of Stock
          </span>
          <div className="font-serif font-extrabold text-xl sm:text-2xl text-rose-800 dark:text-rose-300 mt-1">
            {outOfStockSKUs}
          </div>
          <span className="text-[10px] text-rose-600 dark:text-rose-400 mt-0.5 block">Zero Inventory</span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-brand-forest-900 dark:bg-zinc-900 text-white p-4 rounded-3xl border dark:border-zinc-800 shadow-xs">
          <span className="text-[10px] font-bold text-brand-amber-400 uppercase tracking-wider block">
            Inventory Value
          </span>
          <div className="font-serif font-extrabold text-xl text-white mt-1">
            {formatCurrency(totalValuation)}
          </div>
          <span className="text-[10px] text-brand-cream-300 dark:text-zinc-400 mt-0.5 block">At Selling Price</span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-brand-cream-300 dark:border-zinc-800 shadow-xs">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by SKU or item name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-brand-cream-50 dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 placeholder-brand-charcoal-400 dark:placeholder-zinc-500 focus:bg-white dark:focus:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
          />
          <Search className="w-4 h-4 text-brand-charcoal-400 dark:text-zinc-500 absolute left-3 top-2.5" />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-brand-cream-400 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-800 text-brand-charcoal-700 dark:text-zinc-200 font-semibold focus:outline-none"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Stock Status Filter */}
          <select
            value={stockStatusFilter}
            onChange={(e) => setStockStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-brand-cream-400 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-800 text-brand-charcoal-700 dark:text-zinc-200 font-semibold focus:outline-none"
          >
            <option value="all">All Stock Status</option>
            <option value="in_stock">Healthy Stock</option>
            <option value="low_stock">Low Stock (≤ Threshold)</option>
            <option value="out_of_stock">Out of Stock (0)</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-brand-cream-300 dark:border-zinc-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-brand-cream-100/70 dark:bg-zinc-800/80 border-b border-brand-cream-300 dark:border-zinc-800 text-brand-charcoal-600 dark:text-zinc-300 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-bold">Product</th>
                <th className="py-3 px-4 font-bold">SKU</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Unit Price</th>
                <th className="py-3 px-4 font-bold">Low Alert Threshold</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Adjust Stock Quantity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-cream-200 dark:divide-zinc-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-brand-charcoal-400 dark:text-zinc-500">
                    No products found matching inventory criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((prod) => {
                  const threshold = prod.low_stock_threshold || 10;
                  const isOut = prod.stock_quantity === 0;
                  const isLow = !isOut && prod.stock_quantity <= threshold;

                  const localStockVal = editingStockMap[prod.id] !== undefined ? editingStockMap[prod.id] : prod.stock_quantity;
                  const localThresholdVal = editingThresholdMap[prod.id] !== undefined ? editingThresholdMap[prod.id] : threshold;

                  return (
                    <tr key={prod.id} className="hover:bg-brand-cream-50 dark:hover:bg-zinc-800/50 transition-colors">
                      {/* Product Name & Image */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-brand-cream-100 dark:bg-zinc-800 border border-brand-cream-300 dark:border-zinc-700 shrink-0">
                            <Image
                              src={prod.images[0]?.image_url || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80'}
                              alt={prod.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-bold text-brand-charcoal-900 dark:text-zinc-100 line-clamp-1 max-w-xs" title={prod.name}>
                            {prod.name}
                          </span>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="py-3.5 px-4 font-mono font-bold text-brand-forest-950 dark:text-white">
                        {prod.sku}
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-brand-charcoal-600 dark:text-zinc-400">
                        {prod.category_name}
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 font-bold text-brand-forest-950 dark:text-white">
                        {formatCurrency(prod.price)}
                      </td>

                      {/* Threshold Editor */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="0"
                            value={localThresholdVal}
                            onChange={(e) =>
                              setEditingThresholdMap({
                                ...editingThresholdMap,
                                [prod.id]: Number(e.target.value),
                              })
                            }
                            onBlur={() => {
                              if (editingThresholdMap[prod.id] !== undefined) {
                                handleThresholdUpdate(prod.id, editingThresholdMap[prod.id], prod.name);
                              }
                            }}
                            className="w-14 px-2 py-1 text-center font-bold text-xs rounded-lg border border-brand-cream-400 dark:border-zinc-700 bg-brand-cream-50 dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none"
                          />
                          <span className="text-[10px] text-brand-charcoal-400 dark:text-zinc-500">units</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {isOut ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                            Out of Stock
                          </span>
                        ) : isLow ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            <AlertTriangle className="w-3 h-3" />
                            Low Stock ({prod.stock_quantity})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle className="w-3 h-3" />
                            Healthy ({prod.stock_quantity})
                          </span>
                        )}
                      </td>

                      {/* Quick & Direct Adjustment */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          {/* Step Buttons */}
                          <div className="inline-flex items-center border border-brand-cream-400 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 shadow-xs">
                            <button
                              onClick={() => handleStockUpdate(prod.id, prod.stock_quantity - 10, prod.name)}
                              className="px-2 py-1 text-xs font-bold text-brand-charcoal-600 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-700 rounded-l-xl"
                              title="-10 units"
                            >
                              -10
                            </button>
                            <button
                              onClick={() => handleStockUpdate(prod.id, prod.stock_quantity - 1, prod.name)}
                              className="px-2 py-1 text-xs font-bold text-brand-charcoal-600 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-700"
                              title="-1 unit"
                            >
                              -1
                            </button>

                            {/* Direct Number Input */}
                            <input
                              type="number"
                              min="0"
                              value={localStockVal}
                              onChange={(e) =>
                                setEditingStockMap({
                                  ...editingStockMap,
                                  [prod.id]: Number(e.target.value),
                                })
                              }
                              onBlur={() => {
                                if (editingStockMap[prod.id] !== undefined) {
                                  handleStockUpdate(prod.id, editingStockMap[prod.id], prod.name);
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  if (editingStockMap[prod.id] !== undefined) {
                                    handleStockUpdate(prod.id, editingStockMap[prod.id], prod.name);
                                  }
                                }
                              }}
                              className="w-14 text-center font-extrabold text-xs text-brand-forest-950 dark:text-white bg-brand-cream-50 dark:bg-zinc-900 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none"
                            />

                            <button
                              onClick={() => handleStockUpdate(prod.id, prod.stock_quantity + 1, prod.name)}
                              className="px-2 py-1 text-xs font-bold text-brand-charcoal-600 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-700"
                              title="+1 unit"
                            >
                              +1
                            </button>
                            <button
                              onClick={() => handleStockUpdate(prod.id, prod.stock_quantity + 10, prod.name)}
                              className="px-2 py-1 text-xs font-bold text-brand-charcoal-600 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-700"
                              title="+10 units"
                            >
                              +10
                            </button>
                            <button
                              onClick={() => handleStockUpdate(prod.id, prod.stock_quantity + 50, prod.name)}
                              className="px-2.5 py-1 text-xs font-bold text-brand-forest-900 dark:text-emerald-300 bg-brand-cream-100 dark:bg-zinc-700 hover:bg-brand-cream-200 dark:hover:bg-zinc-600 rounded-r-xl"
                              title="+50 units"
                            >
                              +50
                            </button>
                          </div>

                          {/* Quick Out of Stock Shortcut */}
                          {prod.stock_quantity > 0 && (
                            <button
                              onClick={() => handleStockUpdate(prod.id, 0, prod.name)}
                              className="px-2 py-1 text-[10px] font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-950/70 border border-rose-200 dark:border-rose-800 rounded-lg transition-colors"
                              title="Set to 0 (Out of stock)"
                            >
                              Zero
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


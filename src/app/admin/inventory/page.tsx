'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Boxes, AlertTriangle, CheckCircle, Plus, Minus, Search } from 'lucide-react';
import { PRODUCTS } from '@/lib/data/products';
import { Product } from '@/types';
import { toast } from 'sonner';

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [search, setSearch] = useState('');

  const handleStockUpdate = (productId: string, newStock: number) => {
    const clamped = Math.max(0, newStock);
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return { ...p, stock_quantity: clamped };
        }
        return p;
      })
    );
    toast.success('Stock quantity updated');
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-brand-forest-950">
          Warehouse & Inventory Management
        </h1>
        <p className="text-xs text-brand-charcoal-500 mt-1">
          Monitor stock levels, set low-stock reorder thresholds, and adjust inventory quantities in real time.
        </p>
      </div>

      {/* Search toolbar */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-brand-cream-300 shadow-xs">
        <div className="relative max-w-sm flex-1">
          <input
            type="text"
            placeholder="Search by SKU or item name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-brand-cream-400 bg-brand-cream-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
          />
          <Search className="w-4 h-4 text-brand-charcoal-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl border border-brand-cream-300 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-brand-cream-100/70 border-b border-brand-cream-300 text-brand-charcoal-600 uppercase tracking-wider">
                <th className="py-3 px-4 font-bold">Product Name</th>
                <th className="py-3 px-4 font-bold">SKU</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Current Stock</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Quick Stock Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-cream-200">
              {filtered.map((prod) => {
                const isLow = prod.stock_quantity <= (prod.low_stock_threshold || 10);
                return (
                  <tr key={prod.id} className="hover:bg-brand-cream-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-brand-cream-100 border border-brand-cream-300 shrink-0">
                          <Image
                            src={prod.images[0]?.image_url || '/placeholder.png'}
                            alt={prod.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-bold text-brand-charcoal-900 line-clamp-1">
                          {prod.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-brand-forest-950">
                      {prod.sku}
                    </td>

                    <td className="py-3.5 px-4 text-brand-charcoal-600">
                      {prod.category_name}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-extrabold text-sm text-brand-forest-950">
                        {prod.stock_quantity} units
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {isLow ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-900">
                          <AlertTriangle className="w-3 h-3" />
                          Low Stock ({prod.stock_quantity})
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-900">
                          <CheckCircle className="w-3 h-3" />
                          Healthy Stock
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center border border-brand-cream-400 rounded-xl bg-white">
                        <button
                          onClick={() => handleStockUpdate(prod.id, prod.stock_quantity - 10)}
                          className="px-2.5 py-1 text-xs font-bold text-brand-charcoal-600 hover:bg-brand-cream-200 rounded-l-xl"
                          title="-10 units"
                        >
                          -10
                        </button>
                        <button
                          onClick={() => handleStockUpdate(prod.id, prod.stock_quantity - 1)}
                          className="px-2 py-1 text-xs font-bold text-brand-charcoal-600 hover:bg-brand-cream-200"
                          title="-1 unit"
                        >
                          -1
                        </button>
                        <span className="w-12 text-center font-extrabold text-xs text-brand-forest-950">
                          {prod.stock_quantity}
                        </span>
                        <button
                          onClick={() => handleStockUpdate(prod.id, prod.stock_quantity + 1)}
                          className="px-2 py-1 text-xs font-bold text-brand-charcoal-600 hover:bg-brand-cream-200"
                          title="+1 unit"
                        >
                          +1
                        </button>
                        <button
                          onClick={() => handleStockUpdate(prod.id, prod.stock_quantity + 10)}
                          className="px-2.5 py-1 text-xs font-bold text-brand-charcoal-600 hover:bg-brand-cream-200 rounded-r-xl"
                          title="+10 units"
                        >
                          +10
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

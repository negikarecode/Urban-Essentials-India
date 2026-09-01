'use client';

import React, { useState } from 'react';
import {
  Tag,
  Plus,
  Trash2,
  X,
  Check,
  Percent,
  Search,
  Edit2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
} from 'lucide-react';
import { Coupon, DiscountType } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useLiveCoupons } from '@/lib/couponStore';
import { toast } from 'sonner';

export default function AdminCouponsPage() {
  const {
    coupons,
    saveCoupon: saveToStore,
    updateCoupon: updateInStore,
    toggleCouponStatus,
    deleteCoupon: deleteFromStore,
  } = useLiveCoupons();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'disabled'>('all');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  // New Coupon Form State
  const [newCode, setNewCode] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newType, setNewType] = useState<DiscountType>('percentage');
  const [newValue, setNewValue] = useState(15);
  const [newMinOrder, setNewMinOrder] = useState(999);
  const [newMaxDiscount, setNewMaxDiscount] = useState(500);

  const handleOpenAddModal = () => {
    setNewCode('');
    setNewDesc('');
    setNewType('percentage');
    setNewValue(10);
    setNewMinOrder(0);
    setNewMaxDiscount(0);
    setIsAddModalOpen(true);
  };


  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = newCode.trim().toUpperCase();
    if (!cleanCode) {
      toast.error('Coupon code is required');
      return;
    }

    if (coupons.some((c) => c.code === cleanCode)) {
      toast.error(`A coupon with code "${cleanCode}" already exists.`);
      return;
    }

    const created: Coupon = {
      id: crypto.randomUUID(),
      code: cleanCode,
      description: newDesc.trim() || (newType === 'percentage' ? `${newValue}% OFF on orders above ₹${newMinOrder}` : `Flat ₹${newValue} OFF`),
      discount_type: newType,
      discount_value: Number(newValue),
      min_order_value: Number(newMinOrder),
      max_discount: newType === 'percentage' ? Number(newMaxDiscount) : undefined,
      is_active: true,
    };

    saveToStore(created);
    toast.success(`Coupon "${created.code}" created and activated!`);
    setIsAddModalOpen(false);
  };

  const handleUpdateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCoupon) return;

    updateInStore({
      ...editingCoupon,
      code: editingCoupon.code.trim().toUpperCase(),
      discount_value: Number(editingCoupon.discount_value),
      min_order_value: Number(editingCoupon.min_order_value),
      max_discount: editingCoupon.max_discount ? Number(editingCoupon.max_discount) : undefined,
    });
    toast.success(`Coupon "${editingCoupon.code}" updated successfully!`);
    setEditingCoupon(null);
  };

  const handleToggle = (id: string, code: string) => {
    toggleCouponStatus(id);
  };

  const handleDelete = (id: string, code: string) => {
    if (confirm(`Are you sure you want to delete coupon "${code}"?`)) {
      deleteFromStore(id);
      toast.info(`Deleted coupon "${code}"`);
    }
  };

  const filtered = coupons.filter((c) => {
    if (filterStatus === 'active' && !c.is_active) return false;
    if (filterStatus === 'disabled' && c.is_active) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return c.code.toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-brand-forest-950 dark:text-white">
            Promotional Coupons & Offers
          </h1>
          <p className="text-xs text-brand-charcoal-500 dark:text-zinc-400 mt-1">
            Configure percent or fixed rupee discount coupon codes with minimum purchase limits and maximum discount caps.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-xl text-xs font-bold shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Coupon</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-brand-cream-300 dark:border-zinc-800 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            {(['all', 'active', 'disabled'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-colors ${
                  filterStatus === st
                    ? 'bg-brand-forest-800 text-white shadow-xs'
                    : 'bg-brand-cream-100 dark:bg-zinc-800 text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search coupon code or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-brand-cream-50 dark:bg-zinc-800 text-brand-charcoal-800 dark:text-zinc-100 placeholder-brand-charcoal-400 dark:placeholder-zinc-500 focus:bg-white dark:focus:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
            />
            <Search className="w-4 h-4 text-brand-charcoal-400 dark:text-zinc-500 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-brand-charcoal-500 dark:text-zinc-400 pt-1 border-t border-brand-cream-200 dark:border-zinc-800">
          <span>
            Showing <strong>{filtered.length}</strong> of <strong>{coupons.length}</strong> promotional coupons
          </span>
          {(filterStatus !== 'all' || search) && (
            <button
              onClick={() => {
                setFilterStatus('all');
                setSearch('');
              }}
              className="text-xs font-bold text-brand-forest-800 dark:text-emerald-400 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-brand-cream-300 dark:border-zinc-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-brand-cream-100/70 dark:bg-zinc-800/80 border-b border-brand-cream-300 dark:border-zinc-800 text-brand-charcoal-600 dark:text-zinc-300 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-bold">Coupon Code</th>
                <th className="py-3 px-4 font-bold">Discount Rate</th>
                <th className="py-3 px-4 font-bold">Min. Cart Value</th>
                <th className="py-3 px-4 font-bold">Max Savings Cap</th>
                <th className="py-3 px-4 font-bold">Description</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-cream-200 dark:divide-zinc-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-brand-charcoal-400 dark:text-zinc-500">
                    No promotional coupons match your search criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-brand-cream-50 dark:hover:bg-zinc-800/50 transition-colors">
                    {/* Code */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-extrabold text-xs text-brand-forest-950 dark:text-white bg-brand-forest-50 dark:bg-zinc-800 px-2.5 py-1 rounded-lg border border-brand-forest-200 dark:border-zinc-700 inline-flex items-center gap-1.5">
                        <Tag className="w-3 h-3 text-brand-forest-700 dark:text-emerald-400" />
                        <span>{coupon.code}</span>
                      </span>
                    </td>

                    {/* Discount Value */}
                    <td className="py-3.5 px-4 font-extrabold text-brand-forest-950 dark:text-white">
                      {coupon.discount_type === 'percentage'
                        ? `${coupon.discount_value}% OFF`
                        : `Flat ${formatCurrency(coupon.discount_value)}`}
                    </td>

                    {/* Min Order */}
                    <td className="py-3.5 px-4 text-brand-charcoal-700 dark:text-zinc-300 font-semibold">
                      {coupon.min_order_value > 0 ? formatCurrency(coupon.min_order_value) : 'No Minimum'}
                    </td>

                    {/* Max Cap */}
                    <td className="py-3.5 px-4 text-brand-charcoal-600 dark:text-zinc-400">
                      {coupon.max_discount ? `Up to ${formatCurrency(coupon.max_discount)}` : 'No Cap'}
                    </td>

                    {/* Description */}
                    <td className="py-3.5 px-4 text-brand-charcoal-600 dark:text-zinc-400 max-w-xs truncate" title={coupon.description}>
                      {coupon.description}
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggle(coupon.id, coupon.code)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase transition-colors ${
                          coupon.is_active
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200'
                            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300'
                        }`}
                      >
                        {coupon.is_active ? 'Active' : 'Disabled'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingCoupon(coupon)}
                          className="p-1.5 text-brand-charcoal-600 dark:text-zinc-400 hover:text-brand-forest-900 dark:hover:text-white rounded-lg hover:bg-brand-cream-200 dark:hover:bg-zinc-800 transition-colors"
                          title="Edit coupon"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(coupon.id, coupon.code)}
                          className="p-1.5 text-brand-charcoal-400 dark:text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Delete coupon"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Coupon Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl border dark:border-zinc-800 z-10 max-h-[90vh] overflow-y-auto animate-slide-up space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-cream-300 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-bold text-brand-forest-800 dark:text-emerald-400 uppercase tracking-wider">
                  Promotion Engine
                </span>
                <h3 className="font-serif font-bold text-xl text-brand-forest-950 dark:text-white">
                  Create Promotional Coupon
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-brand-cream-200 dark:hover:bg-zinc-800 text-brand-charcoal-500 dark:text-zinc-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. WELCOME20"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Discount Type *
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as DiscountType)}
                    className="w-full px-3 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Rupee (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Discount Value {newType === 'percentage' ? '(%)' : '(₹)'} *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newValue}
                    onChange={(e) => setNewValue(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Minimum Cart Total (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newMinOrder}
                    onChange={(e) => setNewMinOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Max Discount Cap (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 500 (optional)"
                    value={newMaxDiscount}
                    onChange={(e) => setNewMaxDiscount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                  Promotional Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Get 20% off on all campus collections"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-brand-cream-300 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-brand-cream-300 dark:border-zinc-700 text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-forest-800 hover:bg-brand-forest-900 text-white text-xs font-bold shadow-md transition-colors"
                >
                  Create & Activate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Coupon Modal */}
      {editingCoupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setEditingCoupon(null)} />
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl border dark:border-zinc-800 z-10 max-h-[90vh] overflow-y-auto animate-slide-up space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-cream-300 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-bold text-brand-forest-800 dark:text-emerald-400 uppercase tracking-wider">
                  Edit Offer
                </span>
                <h3 className="font-serif font-bold text-xl text-brand-forest-950 dark:text-white">
                  {editingCoupon.code}
                </h3>
              </div>
              <button
                onClick={() => setEditingCoupon(null)}
                className="p-1.5 rounded-full hover:bg-brand-cream-200 dark:hover:bg-zinc-800 text-brand-charcoal-500 dark:text-zinc-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateCoupon} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  required
                  value={editingCoupon.code}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, code: e.target.value.toUpperCase() })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Discount Type *
                  </label>
                  <select
                    value={editingCoupon.discount_type}
                    onChange={(e) => setEditingCoupon({ ...editingCoupon, discount_type: e.target.value as DiscountType })}
                    className="w-full px-3 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Rupee (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Discount Value {editingCoupon.discount_type === 'percentage' ? '(%)' : '(₹)'} *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={editingCoupon.discount_value}
                    onChange={(e) => setEditingCoupon({ ...editingCoupon, discount_value: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Minimum Cart Total (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingCoupon.min_order_value}
                    onChange={(e) => setEditingCoupon({ ...editingCoupon, min_order_value: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Max Discount Cap (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingCoupon.max_discount || ''}
                    onChange={(e) => setEditingCoupon({ ...editingCoupon, max_discount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={editingCoupon.description || ''}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-brand-cream-300 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingCoupon(null)}
                  className="px-5 py-2.5 rounded-xl border border-brand-cream-300 dark:border-zinc-700 text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-forest-800 hover:bg-brand-forest-900 text-white text-xs font-bold shadow-md transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


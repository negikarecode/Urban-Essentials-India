'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2, X, Check, Percent } from 'lucide-react';
import { COUPONS_DATA } from '@/lib/data/products';
import { Coupon, DiscountType } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(COUPONS_DATA);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newCode, setNewCode] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newType, setNewType] = useState<DiscountType>('percentage');
  const [newValue, setNewValue] = useState(15);
  const [newMinOrder, setNewMinOrder] = useState(1000);
  const [newMaxDiscount, setNewMaxDiscount] = useState(500);

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) {
      toast.error('Coupon code is required');
      return;
    }

    const created: Coupon = {
      id: `c-${Date.now()}`,
      code: newCode.trim().toUpperCase(),
      description: newDesc.trim() || `${newValue}% discount on orders above ₹${newMinOrder}`,
      discount_type: newType,
      discount_value: Number(newValue),
      min_order_value: Number(newMinOrder),
      max_discount: newType === 'percentage' ? Number(newMaxDiscount) : undefined,
      is_active: true,
    };

    setCoupons([created, ...coupons]);
    toast.success(`Coupon ${created.code} created!`);
    setIsAddModalOpen(false);
    setNewCode('');
    setNewDesc('');
  };

  const handleToggleCoupon = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const next = !c.is_active;
          toast.info(`${c.code} is now ${next ? 'Active' : 'Disabled'}`);
          return { ...c, is_active: next };
        }
        return c;
      })
    );
  };

  const handleDelete = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    toast.info('Coupon deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-brand-forest-950">
            Promotional Coupons & Discounts
          </h1>
          <p className="text-xs text-brand-charcoal-500 mt-1">
            Create percentage or flat discount coupon codes with minimum order limits and caps.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-xl text-xs font-bold shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Coupon</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-3xl border border-brand-cream-300 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-brand-cream-100/70 border-b border-brand-cream-300 text-brand-charcoal-600 uppercase tracking-wider">
                <th className="py-3 px-4 font-bold">Coupon Code</th>
                <th className="py-3 px-4 font-bold">Discount Value</th>
                <th className="py-3 px-4 font-bold">Min. Order Value</th>
                <th className="py-3 px-4 font-bold">Description</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-cream-200">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-brand-cream-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-extrabold text-xs text-brand-forest-950 bg-brand-forest-50 px-2.5 py-1 rounded-lg border border-brand-forest-200">
                      {coupon.code}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-brand-charcoal-900">
                    {coupon.discount_type === 'percentage'
                      ? `${coupon.discount_value}% OFF`
                      : `Flat ${formatCurrency(coupon.discount_value)}`}
                    {coupon.max_discount && (
                      <span className="text-[11px] text-brand-charcoal-500 block font-normal">
                        (Max ₹{coupon.max_discount})
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-brand-charcoal-700 font-semibold">
                    {formatCurrency(coupon.min_order_value)}
                  </td>

                  <td className="py-3.5 px-4 text-brand-charcoal-600 max-w-xs">
                    {coupon.description}
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleCoupon(coupon.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                        coupon.is_active
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-zinc-200 text-zinc-600'
                      }`}
                    >
                      {coupon.is_active ? 'Active' : 'Disabled'}
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDelete(coupon.id)}
                      className="p-1.5 text-brand-charcoal-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                      title="Delete coupon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Coupon Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsAddModalOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-slide-up">
            <div className="flex items-center justify-between pb-4 border-b border-brand-cream-300 mb-4">
              <h3 className="font-serif font-bold text-xl text-brand-forest-950">
                Create Discount Coupon
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-brand-cream-200 text-brand-charcoal-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                  Coupon Code (e.g. FLASH30) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FESTIVE15"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                    Discount Type
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as DiscountType)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Flat Amount (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                    Discount Value *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newValue}
                    onChange={(e) => setNewValue(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                    Min. Order Value (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newMinOrder}
                    onChange={(e) => setNewMinOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                  />
                </div>

                {newType === 'percentage' && (
                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                      Max Cap (₹)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newMaxDiscount}
                      onChange={(e) => setNewMaxDiscount(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. 15% off for first-time shoppers"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-brand-cream-300">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-brand-cream-300 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-forest-800 text-white rounded-xl text-xs font-bold hover:bg-brand-forest-900"
                >
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

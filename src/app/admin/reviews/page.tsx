'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { Review } from '@/types';
import { toast } from 'sonner';

const INITIAL_MODERATION_REVIEWS: (Review & { product_name: string })[] = [
  {
    id: 'r-mod-1',
    product_id: 'p1',
    product_name: 'KURA Bento Pro Modular Lunch Box',
    author_name: 'Ananya Sharma',
    rating: 5,
    title: 'Best lunch box ever bought!',
    comment: 'No leakage whatsoever, even with dal and curries. The stainless steel keeps food fresh and free of plastic smells. Looks very aesthetic too!',
    status: 'approved',
    verified_purchase: true,
    created_at: '2026-08-28T09:30:00Z',
  },
  {
    id: 'r-mod-2',
    product_id: 'p2',
    product_name: 'HydroShield Double-Wall Insulated Flask',
    author_name: 'Vikram Mehta',
    rating: 5,
    title: 'Cold water throughout my college day',
    comment: 'Filled with ice cubes at 7 AM, and at 5 PM the water was still freezing cold! The green powder coat finish is super grippy.',
    status: 'approved',
    verified_purchase: true,
    created_at: '2026-08-29T11:20:00Z',
  },
  {
    id: 'r-mod-3',
    product_id: 'p3',
    product_name: 'AeroCampus Everyday Ergonomic Backpack',
    author_name: 'Rohan Gupta',
    rating: 4,
    title: 'Solid build quality',
    comment: 'Very spacious and good padding for my 15-inch laptop. Would love more color variants in the future.',
    status: 'pending',
    verified_purchase: true,
    created_at: '2026-08-30T10:15:00Z',
  },
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(INITIAL_MODERATION_REVIEWS);

  const handleUpdateStatus = (id: string, status: 'approved' | 'rejected') => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          toast.success(`Review ${status}`);
          return { ...r, status };
        }
        return r;
      })
    );
  };

  const handleDelete = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    toast.info('Review deleted');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-brand-forest-950">
          Customer Reviews Moderation
        </h1>
        <p className="text-xs text-brand-charcoal-500 mt-1">
          Approve or reject customer-submitted reviews before they are displayed publicly on product pages.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-brand-cream-300 shadow-xs overflow-hidden">
        <div className="divide-y divide-brand-cream-200">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-6 space-y-3 hover:bg-brand-cream-50/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-brand-forest-800 uppercase tracking-wider">
                    {rev.product_name}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            rev.rating >= s ? 'fill-amber-500' : 'text-brand-cream-400'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-xs text-brand-charcoal-900">
                      {rev.author_name}
                    </span>
                    {rev.verified_purchase && (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      rev.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : rev.status === 'rejected'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {rev.status}
                  </span>
                </div>
              </div>

              {rev.title && (
                <h4 className="font-semibold text-xs text-brand-charcoal-900">
                  {rev.title}
                </h4>
              )}

              <p className="text-xs text-brand-charcoal-700 leading-relaxed">
                {rev.comment}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-brand-charcoal-400">
                  Submitted on {new Date(rev.created_at).toLocaleDateString('en-IN')}
                </span>

                <div className="flex items-center gap-2">
                  {rev.status !== 'approved' && (
                    <button
                      onClick={() => handleUpdateStatus(rev.id, 'approved')}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  )}
                  {rev.status !== 'rejected' && (
                    <button
                      onClick={() => handleUpdateStatus(rev.id, 'rejected')}
                      className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(rev.id)}
                    className="p-1.5 text-brand-charcoal-400 hover:text-rose-600"
                    title="Delete review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

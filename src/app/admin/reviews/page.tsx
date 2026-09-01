'use client';

import React, { useState } from 'react';
import {
  Star,
  CheckCircle,
  XCircle,
  Trash2,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageSquare,
  X,
} from 'lucide-react';
import { Review } from '@/types';
import { useLiveReviews } from '@/lib/reviewStore';
import { useLiveProducts } from '@/lib/productStore';
import { toast } from 'sonner';

export default function AdminReviewsPage() {
  const { reviews, updateReviewStatus, saveReview, deleteReview } = useLiveReviews();
  const { products } = useLiveProducts();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [starFilter, setStarFilter] = useState<number | 'all'>('all');
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Review Form State
  const [newProductId, setNewProductId] = useState(products[0]?.id || '');
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleUpdateStatus = (id: string, status: 'approved' | 'rejected', author: string) => {
    updateReviewStatus(id, status);
    toast.success(`Review by "${author}" marked as ${status}!`);
  };

  const handleDelete = (id: string, author: string) => {
    if (confirm(`Are you sure you want to delete review by "${author}"?`)) {
      deleteReview(id);
      toast.info(`Deleted review by "${author}"`);
    }
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) {
      toast.error('Author name and review content are required');
      return;
    }

    const prod = products.find((p) => p.id === newProductId) || products[0];
    const newRev: Review = {
      id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      product_id: prod ? prod.id : 'unknown',
      author_name: newAuthor.trim(),
      rating: Number(newRating),
      title: newTitle.trim() || undefined,
      comment: newComment.trim(),
      status: 'approved',
      verified_purchase: true,
      created_at: new Date().toISOString(),
    };

    saveReview(newRev, prod ? prod.name : 'Urban Essentials Product');
    toast.success(`Verified review for "${prod?.name}" published!`);
    setIsAddModalOpen(false);
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
  };

  const filtered = reviews.filter((r) => {
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    if (starFilter !== 'all' && r.rating !== starFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchAuthor = r.author_name.toLowerCase().includes(q);
      const matchProd = (r.product_name || '').toLowerCase().includes(q);
      const matchComment = r.comment.toLowerCase().includes(q);
      const matchTitle = (r.title || '').toLowerCase().includes(q);
      if (!matchAuthor && !matchProd && !matchComment && !matchTitle) return false;
    }
    return true;
  });

  const pendingCount = reviews.filter((r) => r.status === 'pending').length;
  const approvedCount = reviews.filter((r) => r.status === 'approved').length;
  const avgRating =
    reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : '5.0';

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-brand-forest-950 dark:text-white">
            Customer Reviews & Testimonials
          </h1>
          <p className="text-xs text-brand-charcoal-500 dark:text-zinc-400 mt-1">
            Moderate incoming customer ratings, approve verified buyer feedback, or post editorial testimonials.
          </p>
        </div>

        <button
          onClick={() => {
            if (products.length > 0 && !newProductId) {
              setNewProductId(products[0].id);
            }
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-xl text-xs font-bold shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Verified Review</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-brand-cream-300 dark:border-zinc-800 shadow-xs">
          <span className="text-[10px] font-bold text-brand-charcoal-500 dark:text-zinc-400 uppercase tracking-wider block">
            Total Reviews
          </span>
          <div className="font-serif font-extrabold text-2xl text-brand-forest-950 dark:text-white mt-1">
            {reviews.length}
          </div>
          <span className="text-[10px] text-brand-charcoal-400 dark:text-zinc-500 mt-0.5 block">Store-wide feedback</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-brand-cream-300 dark:border-zinc-800 shadow-xs">
          <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
            Pending Moderation
          </span>
          <div className="font-serif font-extrabold text-2xl text-amber-800 dark:text-amber-300 mt-1">
            {pendingCount}
          </div>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5 block">Awaiting approval</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-brand-cream-300 dark:border-zinc-800 shadow-xs">
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
            Approved & Live
          </span>
          <div className="font-serif font-extrabold text-2xl text-emerald-800 dark:text-emerald-300 mt-1">
            {approvedCount}
          </div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 block">Public on PDP</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-brand-cream-300 dark:border-zinc-800 shadow-xs">
          <span className="text-[10px] font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider block">
            Average Rating
          </span>
          <div className="font-serif font-extrabold text-2xl text-purple-900 dark:text-purple-300 mt-1 flex items-center gap-1">
            <span>{avgRating}</span>
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
          <span className="text-[10px] text-brand-charcoal-400 dark:text-zinc-500 mt-0.5 block">5.0 Star Scale</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-brand-cream-300 dark:border-zinc-800 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            {['all', 'pending', 'approved', 'rejected'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-colors shrink-0 ${
                  filterStatus === st
                    ? 'bg-brand-forest-800 text-white shadow-xs'
                    : 'bg-brand-cream-100 dark:bg-zinc-800 text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-700'
                }`}
              >
                {st}
              </button>
            ))}

            <div className="h-4 w-px bg-brand-cream-300 dark:border-zinc-700 mx-1 hidden sm:block" />

            {/* Star Filter */}
            <select
              value={starFilter}
              onChange={(e) => setStarFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="px-3 py-1.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 text-xs bg-white dark:bg-zinc-800 text-brand-charcoal-700 dark:text-zinc-200 font-semibold focus:outline-none"
            >
              <option value="all">All Star Ratings</option>
              <option value={5}>⭐⭐⭐⭐⭐ (5 Star)</option>
              <option value={4}>⭐⭐⭐⭐ (4 Star)</option>
              <option value={3}>⭐⭐⭐ (3 Star)</option>
              <option value={2}>⭐⭐ (2 Star)</option>
              <option value={1}>⭐ (1 Star)</option>
            </select>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search author, product, content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-brand-cream-50 dark:bg-zinc-800 text-brand-charcoal-800 dark:text-zinc-100 placeholder-brand-charcoal-400 dark:placeholder-zinc-500 focus:bg-white dark:focus:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
            />
            <Search className="w-4 h-4 text-brand-charcoal-400 dark:text-zinc-500 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-brand-charcoal-500 dark:text-zinc-400 pt-1 border-t border-brand-cream-200 dark:border-zinc-800">
          <span>
            Showing <strong>{filtered.length}</strong> of <strong>{reviews.length}</strong> reviews
          </span>
          {(filterStatus !== 'all' || starFilter !== 'all' || search) && (
            <button
              onClick={() => {
                setFilterStatus('all');
                setStarFilter('all');
                setSearch('');
              }}
              className="text-xs font-bold text-brand-forest-800 dark:text-emerald-400 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Reviews Cards List */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-brand-cream-300 dark:border-zinc-800 shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-brand-charcoal-400 dark:text-zinc-500">
            No customer reviews found matching your filter criteria.
          </div>
        ) : (
          <div className="divide-y divide-brand-cream-200 dark:divide-zinc-800">
            {filtered.map((rev) => (
              <div key={rev.id} className="p-6 space-y-3 hover:bg-brand-cream-50/50 dark:hover:bg-zinc-800/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold text-brand-forest-800 dark:text-emerald-400 uppercase tracking-wider">
                      {rev.product_name || 'Product'}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              rev.rating >= s ? 'fill-amber-500' : 'text-brand-cream-400 dark:text-zinc-700'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-xs text-brand-charcoal-900 dark:text-zinc-100">
                        {rev.author_name}
                      </span>
                      {rev.verified_purchase && (
                        <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        rev.status === 'approved'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : rev.status === 'rejected'
                          ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                          : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                      }`}
                    >
                      {rev.status}
                    </span>
                  </div>
                </div>

                {rev.title && (
                  <h4 className="font-bold text-xs text-brand-forest-950 dark:text-white">
                    {rev.title}
                  </h4>
                )}

                <p className="text-xs text-brand-charcoal-700 dark:text-zinc-300 leading-relaxed">
                  {rev.comment}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-brand-cream-200 dark:border-zinc-800">
                  <span className="text-[11px] text-brand-charcoal-400 dark:text-zinc-500">
                    Submitted on {new Date(rev.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>

                  <div className="flex items-center gap-2">
                    {rev.status !== 'approved' && (
                      <button
                        onClick={() => handleUpdateStatus(rev.id, 'approved', rev.author_name)}
                        className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors shadow-xs"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Approve & Publish</span>
                      </button>
                    )}
                    {rev.status !== 'rejected' && (
                      <button
                        onClick={() => handleUpdateStatus(rev.id, 'rejected', rev.author_name)}
                        className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors shadow-xs"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(rev.id, rev.author_name)}
                      className="p-1.5 text-brand-charcoal-400 dark:text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Verified Review Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl border dark:border-zinc-800 z-10 max-h-[90vh] overflow-y-auto animate-slide-up space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-cream-300 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-bold text-brand-forest-800 dark:text-emerald-400 uppercase tracking-wider">
                  Verified Feedback Entry
                </span>
                <h3 className="font-serif font-bold text-xl text-brand-forest-950 dark:text-white">
                  Add Product Review
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-brand-cream-200 dark:hover:bg-zinc-800 text-brand-charcoal-500 dark:text-zinc-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                  Product *
                </label>
                <select
                  value={newProductId}
                  onChange={(e) => setNewProductId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sku})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Reviewer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter customer name"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Star Rating *
                  </label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  >
                    <option value={5}>5 Stars (Exceptional)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Average)</option>
                    <option value={2}>2 Stars (Poor)</option>
                    <option value={1}>1 Star (Terrible)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                  Headline / Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Best bento lunchbox for office!"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                  Review Content *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed customer experience, durability feedback, temperature retention notes..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
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
                  Publish Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


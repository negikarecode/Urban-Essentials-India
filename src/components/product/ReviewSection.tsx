'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Star,
  CheckCircle,
  MessageSquarePlus,
  X,
  Filter,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { Review } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { saveReview, getProductApprovedReviews, REVIEWS_UPDATED_EVENT } from '@/lib/reviewStore';

interface ReviewSectionProps {
  productId: string;
  productName: string;
  initialReviews: Review[];
}

export function ReviewSection({
  productId,
  productName,
  initialReviews,
}: ReviewSectionProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>(() => initialReviews);
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const stored = getProductApprovedReviews(productId);
    if (stored && stored.length > 0) {
      setReviews(stored);
    }

    const handleUpdate = () => {
      const updated = getProductApprovedReviews(productId);
      if (updated && updated.length > 0) {
        setReviews(updated);
      }
    };

    window.addEventListener(REVIEWS_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(REVIEWS_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [productId]);

  // Form state
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState(user?.full_name || '');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  // Rating metrics & Distribution calculation
  const totalReviews = reviews.length;
  const avgRating = useMemo(() => {
    if (totalReviews === 0) return '0.0';
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / totalReviews).toFixed(1);
  }, [reviews, totalReviews]);

  const ratingDistribution = useMemo(() => {
    const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      if (dist[r.rating] !== undefined) {
        dist[r.rating]++;
      }
    });
    return dist;
  }, [reviews]);

  // Filtered reviews by rating
  const displayedReviews = useMemo(() => {
    if (selectedStarFilter === null) return reviews;
    return reviews.filter((r) => r.rating === selectedStarFilter);
  }, [reviews, selectedStarFilter]);


  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!authorName.trim() || !comment.trim()) {
      toast.error('Please enter your name and review details');
      return;
    }

    // Duplicate review guard
    const hasAlreadyReviewed = reviews.some(
      (r) =>
        r.author_name.toLowerCase() === authorName.trim().toLowerCase() &&
        r.product_id === productId
    );

    if (hasAlreadyReviewed) {
      toast.error('You have already submitted a review for this product.');
      return;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      product_id: productId,
      author_name: authorName.trim(),
      rating,
      title: title.trim() || undefined,
      comment: comment.trim(),
      status: 'approved',
      verified_purchase: true,
      created_at: new Date().toISOString(),
    };

    saveReview(newReview, productName);
    setReviews([newReview, ...reviews]);
    toast.success('Thank you! Your verified review has been published.');
    setIsModalOpen(false);
    setTitle('');
    setComment('');
    setRating(5);
  };


  return (
    <div className="pt-12 border-t border-brand-cream-300 dark:border-zinc-800 space-y-8">
      {/* Top Header & Metrics */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-brand-cream-200 dark:border-zinc-800">
        {/* Left: Rating Summary */}
        <div className="space-y-3">
          <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-brand-forest-950 dark:text-white">
            Customer Reviews & Ratings
          </h3>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-extrabold text-brand-forest-950 dark:text-white font-serif">
              {avgRating}
            </div>
            <div>
              <div className="flex items-center text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      Number(avgRating) >= star
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-brand-cream-400 dark:text-zinc-700'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-brand-charcoal-500 dark:text-zinc-400 mt-1">
                {totalReviews > 0 ? (
                  <>Based on <strong className="text-brand-charcoal-900 dark:text-zinc-100">{totalReviews}</strong> verified customer review{totalReviews !== 1 ? 's' : ''}</>
                ) : (
                  <span>No customer reviews yet</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Rating Distribution Bars */}
        <div className="w-full lg:max-w-xs space-y-1.5 bg-brand-cream-50 dark:bg-zinc-900 p-4 rounded-2xl border border-brand-cream-300 dark:border-zinc-800">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = ratingDistribution[stars] || 0;
            const percent = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
            const isSelected = selectedStarFilter === stars;

            return (
              <button
                key={stars}
                type="button"
                onClick={() =>
                  setSelectedStarFilter(isSelected ? null : stars)
                }
                className={`w-full flex items-center gap-2 text-xs py-0.5 rounded-lg px-1.5 transition-colors ${
                  isSelected
                    ? 'bg-brand-forest-100 dark:bg-brand-forest-950 font-bold text-brand-forest-900 dark:text-emerald-400'
                    : 'hover:bg-brand-cream-200/60 dark:hover:bg-zinc-800 text-brand-charcoal-700 dark:text-zinc-300'
                }`}
              >
                <span className="w-6 text-left flex items-center gap-0.5">
                  <span>{stars}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </span>

                <div className="flex-1 bg-brand-cream-300 dark:bg-zinc-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-brand-forest-800 dark:bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <span className="w-10 text-right text-[11px] text-brand-charcoal-500 dark:text-zinc-400">
                  {percent}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Write Review CTA */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-xl text-xs font-bold shadow-md transition-all"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
          {selectedStarFilter !== null && (
            <button
              onClick={() => setSelectedStarFilter(null)}
              className="inline-flex items-center justify-center gap-1.5 text-xs text-rose-600 hover:text-rose-500 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Filter ({selectedStarFilter} {selectedStarFilter === 1 ? 'Star' : 'Stars'})</span>
            </button>
          )}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {displayedReviews.length === 0 ? (
          <div className="py-12 text-center text-brand-charcoal-500 dark:text-zinc-400 bg-brand-cream-50 dark:bg-zinc-900 rounded-3xl p-8 border border-brand-cream-300 dark:border-zinc-800">
            {selectedStarFilter !== null
              ? `No ${selectedStarFilter}-star reviews found.`
              : `No reviews yet. Be the first to review ${productName}!`}
          </div>
        ) : (
          <div className="divide-y divide-brand-cream-200 dark:divide-zinc-800">
            {displayedReviews.map((rev) => (
              <div key={rev.id} className="py-6 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            rev.rating >= star
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-brand-cream-400 dark:text-zinc-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-sm text-brand-charcoal-900 dark:text-zinc-100">
                      {rev.author_name}
                    </span>
                    {rev.verified_purchase && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle className="w-3 h-3 text-emerald-700 dark:text-emerald-400" />
                        <span>Verified Buyer</span>
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-brand-charcoal-400 dark:text-zinc-500">
                    {new Date(rev.created_at).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {rev.title && (
                  <h4 className="font-bold text-sm text-brand-charcoal-900 dark:text-zinc-100 pt-1">
                    {rev.title}
                  </h4>
                )}
                <p className="text-xs sm:text-sm text-brand-charcoal-700 dark:text-zinc-300 leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Write Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl border dark:border-zinc-800 z-10 animate-slide-up">
            <div className="flex items-center justify-between pb-4 border-b border-brand-cream-300 dark:border-zinc-800">
              <div>
                <h4 className="font-serif font-bold text-xl text-brand-forest-950 dark:text-white">
                  Write a Verified Review
                </h4>
                <p className="text-xs text-brand-charcoal-500 dark:text-zinc-400 mt-0.5">
                  Reviewing: <strong>{productName}</strong>
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-brand-cream-200 dark:hover:bg-zinc-800 text-brand-charcoal-500 dark:text-zinc-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 mt-5">
              {/* Star Selector */}
              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                  Rating *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 cursor-pointer transition-colors ${
                          (hoverRating || rating) >= star
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-brand-cream-400 dark:text-zinc-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                  Review Headline
                </label>
                <input
                  type="text"
                  placeholder="e.g. 100% leak proof and keeps food warm all day"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                  Detailed Experience *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share how this product fits into your daily school, college, or office routine..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-brand-cream-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-forest-800 hover:bg-brand-forest-900 text-white text-xs font-bold shadow-md transition-colors"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

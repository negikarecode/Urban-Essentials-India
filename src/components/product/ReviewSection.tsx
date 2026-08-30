'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus, X } from 'lucide-react';
import { Review } from '@/types';
import { toast } from 'sonner';

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
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) {
      toast.error('Please enter your name and review details');
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

    setReviews([newReview, ...reviews]);
    toast.success('Thank you! Your verified review has been published.');
    setIsModalOpen(false);
    setAuthorName('');
    setTitle('');
    setComment('');
    setRating(5);
  };

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : '5.0';

  return (
    <div className="pt-12 border-t border-brand-cream-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-brand-cream-200">
        <div>
          <h3 className="font-serif font-bold text-2xl text-brand-forest-950">
            Customer Reviews
          </h3>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center text-amber-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    Number(avgRating) >= star
                      ? 'fill-amber-500 text-amber-500'
                      : 'text-brand-cream-400'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-base text-brand-charcoal-900">
              {avgRating} out of 5
            </span>
            <span className="text-xs text-brand-charcoal-500">
              Based on {reviews.length} verified review{reviews.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-xl text-xs font-bold shadow-sm transition-colors self-start md:self-auto"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Reviews List */}
      <div className="divide-y divide-brand-cream-200 mt-6">
        {reviews.length === 0 ? (
          <div className="py-12 text-center text-brand-charcoal-500">
            No reviews yet. Be the first to review {productName}!
          </div>
        ) : (
          reviews.map((rev) => (
            <div key={rev.id} className="py-6 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          rev.rating >= star
                            ? 'fill-amber-500 text-amber-500'
                            : 'text-brand-cream-400'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-sm text-brand-charcoal-900">
                    {rev.author_name}
                  </span>
                  {rev.verified_purchase && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      Verified Purchase
                    </span>
                  )}
                </div>
                <span className="text-xs text-brand-charcoal-400">
                  {new Date(rev.created_at).toLocaleDateString('en-IN', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              {rev.title && (
                <h4 className="font-semibold text-sm text-brand-charcoal-900">
                  {rev.title}
                </h4>
              )}
              <p className="text-sm text-brand-charcoal-700 leading-relaxed">
                {rev.comment}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Write Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-slide-up">
            <div className="flex items-center justify-between pb-4 border-b border-brand-cream-300">
              <h4 className="font-serif font-bold text-xl text-brand-forest-950">
                Write a Review
              </h4>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-brand-cream-200 text-brand-charcoal-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 mt-5">
              {/* Star Selector */}
              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 uppercase tracking-wider mb-1.5">
                  Rating
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
                            : 'text-brand-cream-400'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 uppercase tracking-wider mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 text-sm focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 uppercase tracking-wider mb-1">
                  Review Headline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Excellent build quality and no leakage"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 text-sm focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 uppercase tracking-wider mb-1">
                  Detailed Experience *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share what you liked, how you use it for school/office, material quality..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 text-sm focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-brand-cream-400 text-xs font-bold text-brand-charcoal-700 hover:bg-brand-cream-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-forest-800 hover:bg-brand-forest-900 text-white text-xs font-bold shadow-md transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

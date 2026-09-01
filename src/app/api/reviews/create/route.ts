import { NextResponse } from 'next/server';
import { Review } from '@/types';
import { getProductById } from '@/lib/data/products';
import { createAdminClient } from '@/lib/supabase/admin';
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit';

export async function POST(req: Request) {
  try {
    const rateLimit = checkRateLimit(req, {
      limit: 5,
      windowMs: 10 * 60 * 1000, // 10 minutes
      prefix: 'reviews-create',
    });

    if (!rateLimit.allowed) {
      return rateLimitResponse(
        rateLimit,
        `Too many review submissions. Please wait ${rateLimit.retryAfterSeconds} seconds before submitting another review.`
      );
    }

    const body = await req.json();
    const { productId, authorName, rating, title, comment, userId } = body;

    if (!productId || !authorName || !rating || !comment) {
      return NextResponse.json(
        { error: 'Missing required review fields' },
        { status: 400 }
      );
    }

    const product = getProductById(productId);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const numericRating = Number(rating);
    if (numericRating < 1 || numericRating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5 stars' },
        { status: 400 }
      );
    }

    const newReviewId = `rev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newReview: Review = {
      id: newReviewId,
      product_id: productId,
      author_name: authorName.trim(),
      rating: numericRating,
      title: title ? title.trim() : undefined,
      comment: comment.trim(),
      status: 'approved',
      verified_purchase: true,
      created_at: new Date().toISOString(),
    };

    try {
      const supabase = createAdminClient();
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(productId);
      if (isUuid) {
        await supabase.from('reviews').insert({
          id: crypto.randomUUID(),
          product_id: productId,
          author_name: newReview.author_name,
          rating: newReview.rating,
          title: newReview.title || null,
          comment: newReview.comment,
          status: 'approved',
          verified_purchase: true,
        });
      }
    } catch {
      // ignore
    }

    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully',
      review: newReview,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to submit review' },
      { status: 500 }
    );
  }
}


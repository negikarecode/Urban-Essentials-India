import { NextResponse } from 'next/server';
import { Review } from '@/types';
import { getProductById } from '@/lib/data/products';

export async function POST(req: Request) {
  try {
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

    const newReview: Review = {
      id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      product_id: productId,
      author_name: authorName.trim(),
      rating: numericRating,
      title: title ? title.trim() : undefined,
      comment: comment.trim(),
      status: 'approved',
      verified_purchase: true,
      created_at: new Date().toISOString(),
    };

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

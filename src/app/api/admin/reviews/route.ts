import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Review } from "@/types";
import { checkRateLimit, rateLimitResponse } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

let serverReviewsStore: (Review & { product_name?: string })[] = [];

export async function GET(req: NextRequest) {
  const rateLimit = checkRateLimit(req, {
    limit: 120,
    windowMs: 60 * 1000,
    prefix: "admin-reviews-get",
  });

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit);
  }

  try {
    const supabase = createAdminClient();
    const { data: dbReviews, error } = await supabase
      .from("reviews")
      .select("*, products(name)")
      .order("created_at", { ascending: false });

    if (error || !dbReviews || dbReviews.length === 0) {
      return NextResponse.json({ reviews: serverReviewsStore });
    }

    const formatted = dbReviews.map((r: any) => ({
      id: r.id,
      product_id: r.product_id,
      product_name: r.products?.name || "Urban Essentials Product",
      author_name: r.author_name,
      rating: Number(r.rating),
      title: r.title,
      comment: r.comment,
      status: r.status,
      verified_purchase: Boolean(r.verified_purchase),
      created_at: r.created_at,
    }));

    return NextResponse.json({ reviews: formatted });
  } catch (err: any) {
    return NextResponse.json({ reviews: serverReviewsStore, error: err.message });
  }
}

export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(req, {
    limit: 60,
    windowMs: 60 * 1000,
    prefix: "admin-reviews-post",
  });

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit);
  }

  try {
    const review = await req.json();
    if (!review.product_id || !review.author_name || !review.comment) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    serverReviewsStore = [review, ...serverReviewsStore.filter((r) => r.id !== review.id)];

    const supabase = createAdminClient();
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(review.id);
    const dbReviewId = isUuid ? review.id : crypto.randomUUID();

    await supabase.from("reviews").upsert({
      id: dbReviewId,
      product_id: review.product_id,
      author_name: review.author_name,
      rating: review.rating || 5,
      title: review.title || null,
      comment: review.comment,
      status: review.status || "approved",
      verified_purchase: review.verified_purchase ?? true,
      created_at: review.created_at || new Date().toISOString(),
    });

    return NextResponse.json({ success: true, review: { ...review, id: dbReviewId } });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const rateLimit = checkRateLimit(req, {
    limit: 60,
    windowMs: 60 * 1000,
    prefix: "admin-reviews-put",
  });

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit);
  }

  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Review ID and status required" }, { status: 400 });
    }

    serverReviewsStore = serverReviewsStore.map((r) =>
      r.id === id ? { ...r, status } : r
    );

    const supabase = createAdminClient();
    await supabase.from("reviews").update({ status }).eq("id", id);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const rateLimit = checkRateLimit(req, {
    limit: 60,
    windowMs: 60 * 1000,
    prefix: "admin-reviews-delete",
  });

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit);
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Review ID required" }, { status: 400 });
    }

    serverReviewsStore = serverReviewsStore.filter((r) => r.id !== id);

    const supabase = createAdminClient();
    await supabase.from("reviews").delete().eq("id", id);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { searchProducts } from '@/lib/search';
import { checkRateLimit, rateLimitResponse, withRateLimitHeaders } from '@/lib/rateLimit';

export async function GET(req: Request) {
  const rateLimit = checkRateLimit(req, {
    limit: 60,
    windowMs: 60 * 1000, // 1 minute
    prefix: 'search',
  });

  if (!rateLimit.allowed) {
    return rateLimitResponse(
      rateLimit,
      `Search query limit exceeded. Please wait ${rateLimit.retryAfterSeconds} seconds.`
    );
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : 6;

  if (!query.trim()) {
    return NextResponse.json({
      query: '',
      count: 0,
      results: [],
    });
  }

  const results = searchProducts(query, limit);

  return NextResponse.json(
    {
      query,
      count: results.length,
      results,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    }
  );
}

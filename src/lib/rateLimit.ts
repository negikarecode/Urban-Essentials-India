import { NextResponse, NextRequest } from 'next/server';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// Global in-memory storage across API route invocations
const globalForRateLimit = globalThis as unknown as {
  rateLimitStore: Map<string, RateLimitRecord>;
  lastCleanup: number;
};

if (!globalForRateLimit.rateLimitStore) {
  globalForRateLimit.rateLimitStore = new Map<string, RateLimitRecord>();
  globalForRateLimit.lastCleanup = Date.now();
}

const store = globalForRateLimit.rateLimitStore;

/**
 * Periodically removes expired entries from memory to prevent memory leaks.
 */
function cleanupStore() {
  const now = Date.now();
  // Run cleanup at most once every 60 seconds
  if (now - globalForRateLimit.lastCleanup > 60000) {
    globalForRateLimit.lastCleanup = now;
    for (const [key, record] of store.entries()) {
      if (now > record.resetTime) {
        store.delete(key);
      }
    }
  }
}

/**
 * Extracts client IP address from request headers.
 */
export function getClientIp(req: Request | NextRequest): string {
  const headers = req.headers;
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    const ips = forwardedFor.split(',');
    return ips[0].trim();
  }

  const realIp = headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  const cfConnectingIp = headers.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp.trim();

  return '127.0.0.1';
}

export interface RateLimitOptions {
  limit: number; // Max allowed requests in window
  windowMs: number; // Window duration in milliseconds
  prefix?: string; // Namespace prefix for endpoint
  keyIdentifier?: string; // Optional custom identifier (e.g. user email)
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
  retryAfterSeconds: number;
}

/**
 * Checks and updates rate limit counter for a request.
 */
export function checkRateLimit(
  req: Request | NextRequest,
  options: RateLimitOptions
): RateLimitResult {
  cleanupStore();

  const ip = getClientIp(req);
  const namespace = options.prefix || 'default';
  const customId = options.keyIdentifier ? `:${options.keyIdentifier.toLowerCase()}` : '';
  const key = `${namespace}:${ip}${customId}`;

  const now = Date.now();
  const existing = store.get(key);

  if (!existing || now > existing.resetTime) {
    // New window
    const newRecord: RateLimitRecord = {
      count: 1,
      resetTime: now + options.windowMs,
    };
    store.set(key, newRecord);

    return {
      allowed: true,
      limit: options.limit,
      remaining: Math.max(0, options.limit - 1),
      resetTime: newRecord.resetTime,
      retryAfterSeconds: Math.ceil(options.windowMs / 1000),
    };
  }

  // Existing window
  if (existing.count >= options.limit) {
    const retryAfter = Math.max(1, Math.ceil((existing.resetTime - now) / 1000));
    return {
      allowed: false,
      limit: options.limit,
      remaining: 0,
      resetTime: existing.resetTime,
      retryAfterSeconds: retryAfter,
    };
  }

  existing.count += 1;
  store.set(key, existing);

  return {
    allowed: true,
    limit: options.limit,
    remaining: Math.max(0, options.limit - existing.count),
    resetTime: existing.resetTime,
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetTime - now) / 1000)),
  };
}

/**
 * Generates standard 429 Too Many Requests response with RFC compliant rate limit headers.
 */
export function rateLimitResponse(
  result: RateLimitResult,
  customMessage?: string
): NextResponse {
  const message =
    customMessage ||
    `Too many requests. Please slow down and try again in ${result.retryAfterSeconds} seconds.`;

  return NextResponse.json(
    {
      error: message,
      rateLimited: true,
      retryAfter: result.retryAfterSeconds,
    },
    {
      status: 429,
      headers: {
        'Retry-After': result.retryAfterSeconds.toString(),
        'X-RateLimit-Limit': result.limit.toString(),
        'X-RateLimit-Remaining': result.remaining.toString(),
        'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
      },
    }
  );
}

/**
 * Helper to attach rate limit headers to a successful NextResponse.
 */
export function withRateLimitHeaders(
  response: NextResponse,
  result: RateLimitResult
): NextResponse {
  response.headers.set('X-RateLimit-Limit', result.limit.toString());
  response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
  response.headers.set('X-RateLimit-Reset', Math.ceil(result.resetTime / 1000).toString());
  return response;
}

import { PRODUCTS } from '@/lib/data/products';
import { Product } from '@/types';

export interface SearchResultItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price?: number;
  image: string;
  category_name?: string;
  category_slug?: string;
  target_audience: string;
  sku: string;
  score: number;
  matchReasons: string[];
}

// Common typo corrections dictionary for everyday carry ecommerce
const TYPO_MAP: Record<string, string> = {
  botle: 'bottle',
  botel: 'bottle',
  flsk: 'flask',
  bentoo: 'bento',
  bentoox: 'bento',
  lnch: 'lunch',
  luch: 'lunch',
  backpak: 'backpack',
  bagpack: 'backpack',
  notebok: 'notebook',
  notbook: 'notebook',
  statonery: 'stationery',
  statonary: 'stationery',
  pencel: 'pencil',
  pn: 'pen',
  ofice: 'office',
  colege: 'college',
  scool: 'school',
};

/**
 * Normalizes query string and resolves common typos
 */
export function normalizeQuery(query: string): string {
  const words = query.trim().toLowerCase().split(/\s+/);
  const corrected = words.map((w) => TYPO_MAP[w] || w);
  return corrected.join(' ');
}

/**
 * High-performance scoring engine matching products across name, tags, audience, category, and sku
 */
export function searchProducts(rawQuery: string, limit: number = 8): SearchResultItem[] {
  if (!rawQuery || rawQuery.trim().length === 0) {
    return [];
  }

  const normalized = normalizeQuery(rawQuery);
  const queryTokens = normalized.split(/\s+/).filter((t) => t.length > 0);

  const scoredResults: SearchResultItem[] = [];

  for (const product of PRODUCTS) {
    if (!product.is_active) continue;

    let score = 0;
    const matchReasons: string[] = [];

    const nameLower = product.name.toLowerCase();
    const descLower = product.description.toLowerCase();
    const skuLower = product.sku.toLowerCase();
    const catLower = (product.category_name || '').toLowerCase();
    const audLower = product.target_audience.toLowerCase();
    const tagsLower = product.tags.map((t) => t.toLowerCase());

    // 1. Exact full query phrase match
    if (nameLower.includes(normalized)) {
      score += 40;
      matchReasons.push('Name match');
    }
    if (catLower.includes(normalized)) {
      score += 25;
      matchReasons.push('Category match');
    }

    // 2. Token based matching
    let allTokensMatched = true;

    for (const token of queryTokens) {
      let tokenMatched = false;

      if (nameLower.includes(token)) {
        score += 15;
        tokenMatched = true;
      }
      if (tagsLower.some((t) => t.includes(token))) {
        score += 12;
        tokenMatched = true;
      }
      if (catLower.includes(token)) {
        score += 10;
        tokenMatched = true;
      }
      if (audLower.includes(token)) {
        score += 8;
        tokenMatched = true;
      }
      if (skuLower.includes(token)) {
        score += 8;
        tokenMatched = true;
      }
      if (descLower.includes(token)) {
        score += 4;
        tokenMatched = true;
      }

      if (!tokenMatched) {
        allTokensMatched = false;
      }
    }

    // Boost products matching all search words (e.g. "office bottle", "school bag")
    if (allTokensMatched && queryTokens.length > 1) {
      score += 30;
      matchReasons.push('Matched all search terms');
    }

    // Best-sellers & high ratings slight merchandising bias
    if (product.is_bestseller) {
      score += 3;
    }
    if (product.rating >= 4.9) {
      score += 2;
    }

    if (score > 0) {
      scoredResults.push({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        compare_at_price: product.compare_at_price,
        image: product.images[0]?.image_url || '/placeholder.png',
        category_name: product.category_name,
        category_slug: product.category_slug,
        target_audience: product.target_audience,
        sku: product.sku,
        score,
        matchReasons: Array.from(new Set(matchReasons)),
      });
    }
  }

  // Sort descending by calculated relevance score
  return scoredResults.sort((a, b) => b.score - a.score).slice(0, limit);
}

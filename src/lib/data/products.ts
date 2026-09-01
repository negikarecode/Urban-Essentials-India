import { Category, Product, Coupon, TargetAudience } from '@/types';

export const CATEGORIES: Category[] = [
  {
    id: 'c1',
    name: 'Backpacks',
    slug: 'backpacks',
    description: 'Ergonomic, weather-resistant everyday backpacks engineered for campus, commutes, and travel.',
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'c2',
    name: 'Lunch Boxes',
    slug: 'lunch-boxes',
    description: 'Insulated, leak-proof bento and stainless steel lunch boxes designed for school & work.',
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    sort_order: 2,
    is_active: true,
  },
  {
    id: 'c3',
    name: 'Water Bottles',
    slug: 'water-bottles',
    description: 'Vacuum insulated stainless steel and BPA-free hydration bottles that keep drinks cold for 24 hours.',
    image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    sort_order: 3,
    is_active: true,
  },
];

export const PRODUCTS: Product[] = [];

export const REVIEWS_DATA: Record<string, import('@/types').Review[]> = {};

export const COUPONS_DATA: Coupon[] = [
  {
    id: 'c-welcome10',
    code: 'WELCOME10',
    description: '10% off on your first order (Min order ₹499)',
    discount_type: 'percentage',
    discount_value: 10,
    min_order_value: 499,
    max_discount: 300,
    start_date: '2026-01-01T00:00:00Z',
    expiry_date: '2026-12-31T23:59:59Z',
    usage_limit: 10000,
    used_count: 0,
    per_user_limit: 1,
    is_active: true,
  },
  {
    id: 'c-campus15',
    code: 'CAMPUS15',
    description: '15% off for college & campus essentials (Min order ₹999)',
    discount_type: 'percentage',
    discount_value: 15,
    min_order_value: 999,
    max_discount: 500,
    start_date: '2026-01-01T00:00:00Z',
    expiry_date: '2026-12-31T23:59:59Z',
    usage_limit: 5000,
    used_count: 0,
    per_user_limit: 2,
    is_active: true,
  },
  {
    id: 'c-school20',
    code: 'SCHOOL20',
    description: '20% off for school lunch & bags bundle (Min order ₹1,499)',
    discount_type: 'percentage',
    discount_value: 20,
    min_order_value: 1499,
    max_discount: 600,
    start_date: '2026-01-01T00:00:00Z',
    expiry_date: '2026-12-31T23:59:59Z',
    usage_limit: 3000,
    used_count: 0,
    per_user_limit: 2,
    is_active: true,
  },
  {
    id: 'c-office10',
    code: 'OFFICE10',
    description: '10% off for work & office accessories (Min order ₹799)',
    discount_type: 'percentage',
    discount_value: 10,
    min_order_value: 799,
    max_discount: 400,
    start_date: '2026-01-01T00:00:00Z',
    expiry_date: '2026-12-31T23:59:59Z',
    usage_limit: 5000,
    used_count: 0,
    per_user_limit: 2,
    is_active: true,
  },
  {
    id: 'c-kura20',
    code: 'URBAN20',
    description: 'Flat 20% off on orders above ₹1,500 (Max savings ₹600)',
    discount_type: 'percentage',
    discount_value: 20,
    min_order_value: 1500,
    max_discount: 600,
    start_date: '2026-01-01T00:00:00Z',
    expiry_date: '2026-12-31T23:59:59Z',
    usage_limit: 2000,
    used_count: 0,
    per_user_limit: 1,
    is_active: true,
  },
  {
    id: 'c-flat250',
    code: 'FLAT250',
    description: 'Flat ₹250 instant discount on orders above ₹1,299',
    discount_type: 'fixed',
    discount_value: 250,
    min_order_value: 1299,
    max_discount: 250,
    start_date: '2026-01-01T00:00:00Z',
    expiry_date: '2026-12-31T23:59:59Z',
    usage_limit: 1000,
    used_count: 0,
    per_user_limit: 1,
    is_active: true,
  },
];


function getCatalogSource(): Product[] {
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('urban_custom_catalog_v10');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
  }
  return PRODUCTS;
}


// Helper Query Functions
export function getCategories(): Category[] {
  return CATEGORIES.filter((c) => c.is_active);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug && c.is_active);
}

export function getProducts(): Product[] {
  return getCatalogSource().filter((p) => p.is_active);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getCatalogSource().find((p) => p.slug === slug && p.is_active);
}

export function getProductById(id: string): Product | undefined {
  return getCatalogSource().find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return getCatalogSource().filter((p) => p.is_featured && p.is_active);
}

export function getBestsellers(): Product[] {
  return getCatalogSource().filter((p) => p.is_bestseller && p.is_active);
}

export function getNewArrivals(): Product[] {
  return getCatalogSource().filter((p) => p.is_new_arrival && p.is_active);
}

export function getProductsByAudience(audience: TargetAudience): Product[] {
  const all = getProducts();
  if (audience === 'all') return all;
  return all.filter(
    (p) => (p.target_audience === audience || p.target_audience === 'all') && p.is_active
  );
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getCatalogSource().filter((p) => p.category_slug === categorySlug && p.is_active);
}

export function getProductReviews(productId: string): import('@/types').Review[] {
  return REVIEWS_DATA[productId] || [];
}

export function validateCoupon(
  code: string,
  subtotal: number,
  userId?: string
): { valid: boolean; coupon?: Coupon; error?: string; discountAmount: number } {
  if (!code || !code.trim()) {
    return { valid: false, error: 'Please enter a coupon code', discountAmount: 0 };
  }

  const cleanCode = code.trim().toUpperCase();
  const coupon = COUPONS_DATA.find((c) => c.code.toUpperCase() === cleanCode);

  if (!coupon) {
    return { valid: false, error: `Coupon code "${cleanCode}" does not exist.`, discountAmount: 0 };
  }

  if (!coupon.is_active) {
    return { valid: false, error: `Coupon code "${cleanCode}" is no longer active.`, discountAmount: 0 };
  }

  const now = new Date();

  // Start date verification
  if (coupon.start_date && new Date(coupon.start_date) > now) {
    return { valid: false, error: `Coupon code "${cleanCode}" has not started yet.`, discountAmount: 0 };
  }

  // Expiry date verification
  if (coupon.expiry_date && new Date(coupon.expiry_date) < now) {
    return { valid: false, error: `Coupon code "${cleanCode}" has expired.`, discountAmount: 0 };
  }

  // Usage limit verification
  if (coupon.usage_limit && coupon.used_count && coupon.used_count >= coupon.usage_limit) {
    return { valid: false, error: `Coupon code "${cleanCode}" usage limit has been reached.`, discountAmount: 0 };
  }

  // Minimum Order Value verification
  if (subtotal < coupon.min_order_value) {
    const diff = coupon.min_order_value - subtotal;
    return {
      valid: false,
      error: `Add ₹${diff} more to your cart to use "${coupon.code}" (Min order ₹${coupon.min_order_value}).`,
      discountAmount: 0,
    };
  }

  let discountAmount = 0;
  if (coupon.discount_type === 'percentage') {
    discountAmount = (subtotal * coupon.discount_value) / 100;
    if (coupon.max_discount && discountAmount > coupon.max_discount) {
      discountAmount = coupon.max_discount;
    }
  } else {
    discountAmount = coupon.discount_value;
  }

  return {
    valid: true,
    coupon,
    discountAmount: Math.min(Math.round(discountAmount), subtotal),
  };
}

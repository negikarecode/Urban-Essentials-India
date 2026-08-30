export type TargetAudience = 'school' | 'college' | 'office' | 'all';

export type OrderStatus =
  | 'pending'
  | 'payment_pending'
  | 'paid'
  | 'confirmed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type DiscountType = 'percentage' | 'fixed';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  sku: string;
  price: number;
  compare_at_price?: number;
  attributes: {
    color?: string;
    size?: string;
    capacity?: string;
    material?: string;
    [key: string]: string | undefined;
  };
  stock: number;
  is_active: boolean;
}

export interface ProductImage {
  id: string;
  image_url: string;
  alt_text?: string;
  sort_order: number;
  is_primary: boolean;
}

export interface Review {
  id: string;
  product_id: string;
  author_name: string;
  rating: number;
  title?: string;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  verified_purchase: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description?: string;
  sku: string;
  price: number;
  compare_at_price?: number;
  discount?: number;
  category_id: string;
  category_name?: string;
  category_slug?: string;
  target_audience: TargetAudience;
  brand: string;
  tags: string[];
  images: ProductImage[];
  variants?: ProductVariant[];
  stock_quantity: number;
  low_stock_threshold?: number;
  rating: number;
  review_count: number;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_bestseller: boolean;
  is_active: boolean;
  features?: string[];
  specifications?: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  variantName?: string;
  slug: string;
  price: number;
  compare_at_price?: number;
  image: string;
  quantity: number;
  maxStock: number;
}

export interface Address {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default?: boolean;
  address_type?: 'home' | 'work' | 'other';
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discount_type: DiscountType;
  discount_value: number;
  min_order_value: number;
  max_discount?: number;
  is_active: boolean;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id?: string;
  product_name: string;
  variant_name?: string;
  sku: string;
  unit_price: number;
  quantity: number;
  total_price: number;
  product_image: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string;
  guest_email?: string;
  guest_phone?: string;
  shipping_address: Address;
  billing_address?: Address;
  subtotal: number;
  discount_amount: number;
  shipping_fee: number;
  tax_amount: number;
  total_amount: number;
  coupon_code?: string;
  order_status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'customer' | 'admin';
  phone?: string;
}

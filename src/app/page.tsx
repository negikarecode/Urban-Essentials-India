import React from 'react';
import { HeroBanner } from '@/components/home/HeroBanner';
import { TrustSection } from '@/components/home/TrustSection';
import { ShopByCategory } from '@/components/home/ShopByCategory';
import { PromotionalSection } from '@/components/home/PromotionalSection';
import { TrendingProducts } from '@/components/home/TrendingProducts';
import { BestSellers } from '@/components/home/BestSellers';
import { CategoryProductSections } from '@/components/home/CategoryProductSections';
import { Newsletter } from '@/components/home/Newsletter';

export const metadata = {
  title: 'Urban Essentials | Premium Bottles, Bags & Lunchboxes',
  description:
    'Thoughtfully engineered stainless steel water bottles, everyday backpacks, and leak-proof lunchboxes built for pristine daily routines.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Lookbook Section */}
      <HeroBanner />

      {/* 2. Trust Pillars (Free Shipping, 1-Year Warranty, 7-Day Returns, Secure Checkout) - Placed Above Categories */}
      <TrustSection />

      {/* 3. Core 3 Categories (Bottles, Bags, Lunchboxes) */}
      <ShopByCategory />

      {/* 4. Global Best Sellers (Automatically ranked) */}
      <BestSellers />

      {/* 5. Automated Category-Specific Showcase Sections (Automatically picks best product cards for Backpacks, Lunch Boxes, Water Bottles, etc.) */}
      <CategoryProductSections />

      {/* 6. Promotional Capsule Offer */}
      <PromotionalSection />

      {/* 7. Trending Customer Favorites */}
      <TrendingProducts />

      {/* 8. Newsletter Section */}
      <Newsletter />
    </div>
  );
}

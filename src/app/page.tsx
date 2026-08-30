import React from 'react';
import { HeroBanner } from '@/components/home/HeroBanner';
import { ShopByCategory } from '@/components/home/ShopByCategory';
import { PromotionalSection } from '@/components/home/PromotionalSection';
import { TrendingProducts } from '@/components/home/TrendingProducts';
import { BestSellers } from '@/components/home/BestSellers';
import { TrustSection } from '@/components/home/TrustSection';
import { Newsletter } from '@/components/home/Newsletter';

export const metadata = {
  title: 'Urban Essentials | Premium Bottles, Bags & Lunchboxes',
  description:
    'Thoughtfully engineered stainless steel water bottles, everyday backpacks, and leak-proof lunchboxes built for pristine daily routines.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroBanner />

      {/* 2. Core Categories (Bottles, Bags, Lunchboxes) */}
      <ShopByCategory />

      {/* 3. Best Sellers */}
      <BestSellers />

      {/* 4. Promotional Banner */}
      <PromotionalSection />

      {/* 5. Trending Products */}
      <TrendingProducts />

      {/* 6. Trust Section */}
      <TrustSection />

      {/* 7. Newsletter Section */}
      <Newsletter />
    </div>
  );
}

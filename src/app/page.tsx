import React from 'react';
import { HeroBanner } from '@/components/home/HeroBanner';
import { ShopByNeed } from '@/components/home/ShopByNeed';
import { ShopByCategory } from '@/components/home/ShopByCategory';
import { PromotionalSection } from '@/components/home/PromotionalSection';
import { TrendingProducts } from '@/components/home/TrendingProducts';
import { BestSellers } from '@/components/home/BestSellers';
import { FeaturedCollection } from '@/components/home/FeaturedCollection';
import { TrustSection } from '@/components/home/TrustSection';
import { Newsletter } from '@/components/home/Newsletter';

export const metadata = {
  title: 'Urban Essentials | Everyday Carry for School, College & Office',
  description:
    'Thoughtfully engineered leak-proof bento boxes, vacuum insulated water bottles, ergonomic backpacks, and minimalist stationery for modern daily routines.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroBanner />

      {/* 2. Shop by Need (Audience Curation: School, College, Office) */}
      <ShopByNeed />

      {/* 3. Shop by Category (7 Visual Category Cards) */}
      <ShopByCategory />

      {/* 4. Promotional Banner (Back to Routine: Save up to 30%) */}
      <PromotionalSection />

      {/* 5. Trending Products (Dynamic with Skeleton Loaders) */}
      <TrendingProducts />

      {/* 6. Best Sellers (Dynamic with Skeleton Loaders) */}
      <BestSellers />

      {/* 7. Featured Collection (Campus Essentials) */}
      <FeaturedCollection />

      {/* 8. Trust Section (Secure Payments, Easy Returns, Quality, Fast Shipping) */}
      <TrustSection />

      {/* 9. Newsletter Section (10% Off Signup) */}
      <Newsletter />
    </div>
  );
}

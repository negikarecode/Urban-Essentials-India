import { HeroBanner } from '@/components/home/HeroBanner';
import { CategorySlider } from '@/components/home/CategorySlider';
import { AudienceCuratedSection } from '@/components/home/AudienceCuratedSection';
import { TrendingProducts } from '@/components/home/TrendingProducts';
import { PromoBanner } from '@/components/home/PromoBanner';
import { Testimonials } from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <CategorySlider />
      <AudienceCuratedSection />
      <TrendingProducts />
      <PromoBanner />
      <Testimonials />
    </div>
  );
}

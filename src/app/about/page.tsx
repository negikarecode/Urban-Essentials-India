import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Leaf, Award, Heart, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Our Story & Materials | KURA Essentials',
  description:
    'Discover our philosophy of everyday carry engineered for longevity, food safety, and ergonomic wellness.',
};

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 mb-16">
        <span className="text-xs font-bold text-brand-forest-700 uppercase tracking-widest">
          The KURA Philosophy
        </span>
        <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-brand-forest-950 tracking-tight leading-tight">
          Thoughtful objects for your daily rhythm.
        </h1>
        <p className="text-base sm:text-lg text-brand-charcoal-600 leading-relaxed max-w-2xl mx-auto">
          We build tools that quietly support your day: leakproof stainless steel bento boxes that keep lunch fresh, vacuum flasks that stay cold in summer heat, and bags that protect growing spines.
        </p>
      </div>

      {/* Split Story Image & Text */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-xl border border-brand-cream-300">
            <Image
              src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80"
              alt="Engineering lunch boxes"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-brand-forest-950">
              Why We Started
            </h2>
            <p className="text-sm sm:text-base text-brand-charcoal-700 leading-relaxed">
              Every day, millions of kids head to school, students navigate sprawling college campuses, and professionals commute to work carrying poorly constructed containers that leak, leach microplastics, or strain their backs.
            </p>
            <p className="text-sm sm:text-base text-brand-charcoal-700 leading-relaxed">
              We founded <strong>KURA</strong> with a simple mission: create durable, 100% food-safe everyday essentials that marry precision Japanese minimalist design with uncompromising material standards.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-brand-cream-100 border border-brand-cream-300">
                <div className="font-serif font-bold text-2xl text-brand-forest-900">100%</div>
                <div className="text-xs text-brand-charcoal-600 mt-1">SUS304 Food-Grade Stainless Steel</div>
              </div>
              <div className="p-4 rounded-2xl bg-brand-cream-100 border border-brand-cream-300">
                <div className="font-serif font-bold text-2xl text-brand-forest-900">0%</div>
                <div className="text-xs text-brand-charcoal-600 mt-1">BPA, Phthalates & Toxic Coatings</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Material Pillars */}
      <div className="bg-brand-forest-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-serif font-bold text-3xl text-white">
              Material Standards Without Compromise
            </h3>
            <p className="text-xs sm:text-sm text-brand-cream-200 mt-2">
              Every detail is engineered for health, ergonomics, and longevity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-forest-950 p-6 rounded-3xl border border-brand-forest-800 space-y-3">
              <ShieldCheck className="w-8 h-8 text-brand-amber-400" />
              <h4 className="font-serif font-bold text-lg text-white">SUS304 Steel & Copper Cores</h4>
              <p className="text-xs text-brand-cream-300 leading-relaxed">
                We never use cheap zinc or aluminum liners. Our vacuum flasks and bento trays utilize heavy gauge electro-polished steel that resists corrosion, stains, and odors.
              </p>
            </div>

            <div className="bg-brand-forest-950 p-6 rounded-3xl border border-brand-forest-800 space-y-3">
              <Award className="w-8 h-8 text-brand-amber-400" />
              <h4 className="font-serif font-bold text-lg text-white">Orthopedic Ergonomics</h4>
              <p className="text-xs text-brand-cream-300 leading-relaxed">
                Our bags and backpacks undergo strict orthopedic testing to prevent spinal curve misalignment among young students and daily transit workers.
              </p>
            </div>

            <div className="bg-brand-forest-950 p-6 rounded-3xl border border-brand-forest-800 space-y-3">
              <Leaf className="w-8 h-8 text-brand-amber-400" />
              <h4 className="font-serif font-bold text-lg text-white">Circular & Plastic-Neutral</h4>
              <p className="text-xs text-brand-cream-300 leading-relaxed">
                By investing in a reusable KURA bottle or lunch box, you eliminate up to 300 single-use plastic bottles and takeout containers per year.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto px-4 text-center py-16 space-y-4">
        <h3 className="font-serif font-bold text-2xl sm:text-3xl text-brand-forest-950">
          Ready to elevate your daily routine?
        </h3>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-colors"
        >
          <span>Explore All Collections</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

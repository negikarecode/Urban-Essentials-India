'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TargetAudience } from '@/types';
import { getProductsByAudience } from '@/lib/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { ArrowRight } from 'lucide-react';

const SEGMENTS: { id: TargetAudience; label: string; tag: string; description: string }[] = [
  {
    id: 'school',
    label: 'School Kids',
    tag: 'Ages 6 - 14',
    description: 'Orthopedic posture-safe school bags, food-grade hot soup jars, non-toxic leakproof bento boxes, and standing pen cases.',
  },
  {
    id: 'college',
    label: 'College & Campus',
    tag: 'Everyday Transit',
    description: 'Water-resistant laptop backpacks, 24-hour ice-cold vacuum flasks, fountain-pen friendly dot journals, and travel accessories.',
  },
  {
    id: 'office',
    label: 'Office & Work',
    tag: 'Executive & EDC',
    description: 'Vegan leather desk mats, solid brass EDC pens, military-grade laptop protection sleeves, and sleek meal organizers.',
  },
];

export function AudienceCuratedSection() {
  const [activeSegment, setActiveSegment] = useState<TargetAudience>('school');

  const products = getProductsByAudience(activeSegment).slice(0, 4);
  const currentSegmentData = SEGMENTS.find((s) => s.id === activeSegment) || SEGMENTS[0];

  return (
    <section className="py-16 bg-brand-cream-100/60 border-y border-brand-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-brand-forest-700 uppercase tracking-widest">
            Tailored Essentials
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-brand-forest-950 mt-1">
            Built for Your Daily Routine
          </h2>
          <p className="text-sm text-brand-charcoal-600 mt-2">
            Switch between shopping segments to explore curated gear designed specifically for school kids, university students, and working professionals.
          </p>
        </div>

        {/* Segment Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-brand-cream-300 shadow-sm gap-2">
            {SEGMENTS.map((seg) => (
              <button
                key={seg.id}
                onClick={() => setActiveSegment(seg.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeSegment === seg.id
                    ? 'bg-brand-forest-800 text-white shadow-md'
                    : 'text-brand-charcoal-700 hover:text-brand-forest-800 hover:bg-brand-cream-100'
                }`}
              >
                <span>{seg.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Segment Description */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <p className="text-xs sm:text-sm text-brand-charcoal-600 font-medium">
            {currentSegmentData.description}
          </p>
        </div>

        {/* Segment Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View Segment Landing Page CTA */}
        <div className="mt-10 text-center">
          <Link
            href={`/audience/${activeSegment}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-brand-cream-400 text-brand-forest-900 text-xs font-bold shadow-xs hover:bg-brand-forest-50 hover:border-brand-forest-400 transition-all group"
          >
            <span>Explore all {currentSegmentData.label} Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

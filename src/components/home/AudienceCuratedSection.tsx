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
    label: 'School Essentials',
    tag: 'Ages 6 - 14',
    description: 'Lightweight ergonomic backpacks, stainless food jars, and non-toxic lunchboxes.',
  },
  {
    id: 'college',
    label: 'Campus & Transit',
    tag: 'Everyday Carry',
    description: 'Water-resistant laptop bags, 24-hour ice-cold vacuum flasks, and archival notebooks.',
  },
  {
    id: 'office',
    label: 'Executive & Office',
    tag: 'Professional Gear',
    description: 'Vegan leather desk pads, solid brass writing tools, and shockproof laptop sleeves.',
  },
];

export function AudienceCuratedSection() {
  const [activeSegment, setActiveSegment] = useState<TargetAudience>('school');

  const products = getProductsByAudience(activeSegment).slice(0, 4);
  const currentSegmentData = SEGMENTS.find((s) => s.id === activeSegment) || SEGMENTS[0];

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-zinc-950 border-y border-brand-cream-300 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-forest-800 dark:text-emerald-400 block">
              Curated by Routine
            </span>
            <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-brand-forest-950 dark:text-white uppercase tracking-tight">
              Engineered For Every Day
            </h2>
          </div>

          {/* Minimal High-Fashion Tabs */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar border-b border-brand-cream-300 dark:border-zinc-800 pb-1">
            {SEGMENTS.map((seg) => (
              <button
                key={seg.id}
                onClick={() => setActiveSegment(seg.id)}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border-b-2 -mb-[2px] whitespace-nowrap ${
                  activeSegment === seg.id
                    ? 'border-brand-forest-950 dark:border-emerald-400 text-brand-forest-950 dark:text-white font-extrabold'
                    : 'border-transparent text-brand-charcoal-400 dark:text-zinc-500 hover:text-brand-charcoal-800 dark:hover:text-zinc-300'
                }`}
              >
                {seg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Segment Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View Segment Landing Page CTA */}
        <div className="mt-12 text-center">
          <Link
            href={`/audience/${activeSegment}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-forest-950 dark:bg-emerald-600 hover:bg-black dark:hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-[0.18em] transition-all group"
          >
            <span>View All {currentSegmentData.label}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

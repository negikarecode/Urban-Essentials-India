'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/data/products';

export function CategorySlider() {
  return (
    <section className="py-16 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-brand-forest-700 dark:text-emerald-400 uppercase tracking-widest">
              Curated Collections
            </span>
            <h2 className="font-serif font-bold text-3xl text-brand-forest-950 dark:text-white mt-1">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-forest-800 dark:text-emerald-400 hover:text-brand-forest-950 dark:hover:text-white group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center text-center p-3 rounded-2xl bg-brand-cream-50 dark:bg-zinc-900 hover:bg-brand-forest-50/50 dark:hover:bg-zinc-800 border border-brand-cream-300 dark:border-zinc-800 hover:border-brand-forest-300 dark:hover:border-zinc-700 transition-all duration-300"
            >
              {/* Category Image Box */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-brand-cream-200 dark:bg-zinc-800 mb-3">
                <Image
                  src={cat.image_url}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />
              </div>

              {/* Title & Arrow */}
              <h3 className="font-serif font-bold text-sm text-brand-charcoal-900 dark:text-zinc-100 group-hover:text-brand-forest-800 dark:group-hover:text-emerald-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] text-brand-charcoal-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

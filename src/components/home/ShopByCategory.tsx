import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const CATEGORY_CARDS = [
  {
    name: 'Bottles & Flasks',
    slug: 'water-bottles',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    subtitle: '24-Hour Vacuum Cold Hydration',
    itemCount: '6 Models',
  },
  {
    name: 'Bags & Backpacks',
    slug: 'backpacks',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    subtitle: 'Ergonomic, Weatherproof & Laptop Ready',
    itemCount: '7 Models',
  },
  {
    name: 'Lunchboxes & Food Jars',
    slug: 'lunch-boxes',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    subtitle: '100% Food-Grade SUS304 Steel',
    itemCount: '5 Models',
  },
];

export function ShopByCategory() {
  return (
    <section className="py-16 sm:py-24 bg-brand-cream-50 border-b border-brand-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-forest-800 block">
              Core Collections
            </span>
            <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-brand-forest-950 uppercase tracking-tight">
              Shop by Category
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-brand-forest-950 hover:text-brand-forest-700 underline group"
          >
            <span>Shop All Products</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Prominent High-Fashion Category Lookbooks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORY_CARDS.map((cat, idx) => (
            <Link
              key={idx}
              href={`/category/${cat.slug}`}
              className="group relative flex flex-col bg-white border border-brand-cream-300 hover:border-brand-forest-900 transition-all duration-300 overflow-hidden"
            >
              {/* Editorial 4:5 Photo Frame */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-cream-100">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                
                {/* Floating Bottom Metadata */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-cream-300 block">
                    {cat.itemCount}
                  </span>
                  <h3 className="font-serif font-bold text-2xl text-white uppercase tracking-tight">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Minimal Caption */}
              <div className="p-5 flex items-center justify-between bg-white border-t border-brand-cream-200">
                <p className="text-xs text-brand-charcoal-600 font-medium">
                  {cat.subtitle}
                </p>
                <ArrowRight className="w-4 h-4 text-brand-forest-950 group-hover:translate-x-1.5 transition-transform shrink-0 ml-2" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

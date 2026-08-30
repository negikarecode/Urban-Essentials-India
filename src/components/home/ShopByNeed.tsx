import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const AUDIENCES = [
  {
    key: 'school',
    title: 'School Juniors',
    tagline: 'Safe, Ergonomic & Non-Toxic',
    description: 'Orthopedic posture-aligning bags, drop-proof stainless bento sets, and standing pen cases.',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    link: '/audience/school',
  },
  {
    key: 'college',
    title: 'Campus & Transit',
    tagline: 'Durable, Laptop Ready & All-Day',
    description: '16-inch laptop backpacks, 24-hour vacuum thermal flasks, and fountain-pen friendly dot journals.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    link: '/audience/college',
  },
  {
    key: 'office',
    title: 'Work & Executive',
    tagline: 'Minimalist, Sophisticated & Solid',
    description: 'Executive vegan leather desk mats, solid machined brass pens, and shockproof laptop carry sleeves.',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    link: '/audience/office',
  },
];

export function ShopByNeed() {
  return (
    <section id="shop-by-need" className="py-16 sm:py-24 bg-white border-b border-brand-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-forest-800 block">
              Curated by Purpose
            </span>
            <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-brand-forest-950 uppercase tracking-tight">
              Shop by Segment
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-brand-forest-950 hover:text-brand-forest-700 underline group"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Luxury Portrait Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {AUDIENCES.map((item) => (
            <Link
              key={item.key}
              href={item.link}
              className="group flex flex-col bg-white border border-brand-cream-300 hover:border-brand-forest-900 transition-all duration-300"
            >
              {/* Editorial 3:4 Image Frame */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-cream-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                
                {/* Floating Bottom Headline on Image */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-cream-300 block">
                    {item.tagline}
                  </span>
                  <h3 className="font-serif font-bold text-2xl text-white uppercase tracking-tight">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Editorial Caption Box */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-white">
                <p className="text-xs text-brand-charcoal-600 leading-relaxed font-normal">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-brand-cream-200 flex items-center justify-between text-xs font-bold uppercase tracking-[0.15em] text-brand-forest-950 group-hover:text-brand-forest-800">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

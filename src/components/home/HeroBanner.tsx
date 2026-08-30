import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-brand-cream-50 border-b border-brand-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Minimal High-Fashion Copy & Actions */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left z-10">
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-forest-800 block">
                The Routine Collection 2026
              </span>
              <h1 className="font-serif font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-forest-950 leading-[1.08] tracking-tight uppercase">
                Everyday Essentials.<br />
                <span className="font-normal italic text-brand-forest-800 lowercase font-serif">
                  made for every day.
                </span>
              </h1>
            </div>

            <p className="text-sm sm:text-base text-brand-charcoal-700 leading-relaxed max-w-xl font-normal">
              Precision-engineered bottles, durable backpacks, and stainless steel lunchboxes designed for seamless daily hydration, storage, and meals.
            </p>

            {/* High-End Brand Buttons (Sharp, Bold, High Contrast) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/products"
                className="px-8 py-4 bg-brand-forest-950 hover:bg-black text-white text-xs font-bold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 group text-center"
              >
                <span>Shop All Essentials</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/category/backpacks"
                className="px-8 py-4 bg-transparent hover:bg-brand-cream-200 text-brand-forest-950 border border-brand-forest-950 text-xs font-bold uppercase tracking-[0.18em] transition-all text-center"
              >
                Explore Bags
              </Link>
            </div>

            {/* Minimalist Editorial Trust Line */}
            <div className="pt-6 border-t border-brand-cream-300 grid grid-cols-3 gap-4 text-[11px] text-brand-charcoal-600 uppercase tracking-wider font-semibold">
              <div>
                <span className="text-brand-forest-950 font-bold block">SUS304 Steel</span>
                <span>Food Grade</span>
              </div>
              <div>
                <span className="text-brand-forest-950 font-bold block">100% Leak-Proof</span>
                <span>Insulated Tech</span>
              </div>
              <div>
                <span className="text-brand-forest-950 font-bold block">Free Delivery</span>
                <span>Across India</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Lookbook Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-cream-200 shadow-xl border border-brand-cream-300">
              <Image
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80"
                alt="Urban Essentials Everyday Carry Essentials"
                fill
                priority
                className="object-cover hover:scale-103 transition-transform duration-1000 ease-out"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
              
              {/* Subtle High-Fashion Watermark Caption */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xs p-4 border border-brand-cream-300/80 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-forest-900">
                    Featured Edition
                  </p>
                  <p className="font-serif font-bold text-sm text-brand-charcoal-900">
                    The Bento Pro Modular Set
                  </p>
                </div>
                <Link
                  href="/products/kura-bento-pro-modular-lunch-box"
                  className="text-[10px] uppercase tracking-wider font-bold text-brand-forest-950 underline hover:text-brand-forest-700"
                >
                  Discover
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

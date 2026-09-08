import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function HeroBanner() {
  return (
    <section className="relative w-full max-w-full overflow-hidden bg-brand-cream-50 dark:bg-zinc-950 border-b border-brand-cream-300 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Minimal High-Fashion Copy & Actions */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-8 text-left z-10">
            <div className="space-y-2 sm:space-y-3">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-brand-forest-800 dark:text-emerald-400 block">
                The Routine Collection 2026
              </span>
              <h1 className="font-serif font-extrabold text-3xl sm:text-5xl lg:text-6xl text-brand-forest-950 dark:text-white leading-[1.1] tracking-tight uppercase">
                Everyday Essentials.<br />
                <span className="font-normal italic text-brand-forest-800 dark:text-emerald-400 lowercase font-serif">
                  made for every day.
                </span>
              </h1>
            </div>

            <p className="text-xs sm:text-base text-brand-charcoal-700 dark:text-zinc-300 leading-relaxed max-w-xl font-normal">
              Precision-engineered bottles, durable backpacks, and stainless steel lunchboxes designed for seamless daily hydration, storage, and meals.
            </p>

            {/* High-End Brand Buttons - Full Width on Mobile */}
            <div className="pt-1 sm:pt-2">
              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex px-8 py-3.5 sm:py-4 bg-brand-forest-950 dark:bg-white hover:bg-black dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-bold uppercase tracking-[0.18em] transition-all items-center justify-center gap-2 group text-center shadow-sm"
              >
                <span>Shop All Essentials</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Minimalist Editorial Trust Line */}
            <div className="pt-5 sm:pt-6 border-t border-brand-cream-300 dark:border-zinc-800 grid grid-cols-3 gap-2 sm:gap-4 text-[10px] sm:text-[11px] text-brand-charcoal-600 dark:text-zinc-400 uppercase tracking-wider font-semibold">
              <div className="text-center sm:text-left">
                <span className="text-brand-forest-950 dark:text-white font-bold block">SUS304 Steel</span>
                <span className="text-[9px] sm:text-[10px]">Food Grade</span>
              </div>
              <div className="text-center sm:text-left border-x sm:border-x-0 border-brand-cream-300 dark:border-zinc-800 px-1">
                <span className="text-brand-forest-950 dark:text-white font-bold block">100% Leak-Proof</span>
                <span className="text-[9px] sm:text-[10px]">Insulated Tech</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="text-brand-forest-950 dark:text-white font-bold block">Free Delivery</span>
                <span className="text-[9px] sm:text-[10px]">Across India</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Lookbook Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[4/5] w-full overflow-hidden bg-brand-cream-200 dark:bg-zinc-800 shadow-xl border border-brand-cream-300 dark:border-zinc-800 rounded-2xl sm:rounded-none">
              <Image
                src="/products/koool-backpack-hero.jpg"
                alt="Urban Essentials Everyday Carry Essentials"
                fill
                priority
                className="object-cover hover:scale-103 transition-transform duration-1000 ease-out"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
              
              {/* Subtle High-Fashion Watermark Caption */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xs p-3 sm:p-4 border border-brand-cream-300/80 dark:border-zinc-700 flex items-center justify-between rounded-xl sm:rounded-none">
                <div>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-brand-forest-900 dark:text-emerald-400">
                    Featured Edition
                  </p>
                  <p className="font-serif font-bold text-xs sm:text-sm text-brand-charcoal-900 dark:text-zinc-100">
                    Everyday Carry Series
                  </p>
                </div>
                <Link
                  href="/products"
                  className="text-[10px] uppercase tracking-wider font-bold text-brand-forest-950 dark:text-white underline hover:text-brand-forest-700 dark:hover:text-emerald-400 shrink-0"
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

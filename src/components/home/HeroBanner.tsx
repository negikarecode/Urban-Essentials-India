'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Star } from 'lucide-react';

export function HeroBanner() {
  return (
    <section className="relative bg-brand-cream-100 overflow-hidden pt-8 pb-16 lg:py-20 border-b border-brand-cream-300">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-forest-100/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-brand-sage-100/60 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Col */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-forest-800 text-white text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-amber-400 animate-pulse" />
              <span>Back-to-Campus 2026 Collection Live</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-forest-950 tracking-tight leading-[1.1]">
              Everyday carry, <br className="hidden sm:inline" />
              <span className="text-brand-forest-700 italic font-serif">thoughtfully engineered</span> for daily life.
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-brand-charcoal-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Leak-proof stainless steel bento boxes, 24-hr insulated flasks, orthopedic campus backpacks, and minimalist desk stationery for <strong>School</strong>, <strong>College</strong> & <strong>Work</strong>.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/products"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-brand-forest-800 hover:bg-brand-forest-900 text-white text-sm font-bold shadow-lg shadow-brand-forest-950/15 flex items-center justify-center gap-2 group transition-all"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/category/gift-sets"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-brand-cream-200 text-brand-forest-900 border border-brand-cream-400 text-sm font-bold shadow-xs transition-all flex items-center justify-center"
              >
                View Gift Sets 🎁
              </Link>
            </div>

            {/* Audience Quick Filter Jump Pills */}
            <div className="pt-4 border-t border-brand-cream-300 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5">
              <span className="text-xs font-bold text-brand-charcoal-500 uppercase tracking-wider">
                Shop By Segment:
              </span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/audience/school"
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-brand-forest-50 border border-brand-cream-300 text-xs font-bold text-brand-forest-900 shadow-xs transition-colors"
                >
                  🎒 School Kids
                </Link>
                <Link
                  href="/audience/college"
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-brand-forest-50 border border-brand-cream-300 text-xs font-bold text-brand-forest-900 shadow-xs transition-colors"
                >
                  💻 College Students
                </Link>
                <Link
                  href="/audience/office"
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-brand-forest-50 border border-brand-cream-300 text-xs font-bold text-brand-forest-900 shadow-xs transition-colors"
                >
                  💼 Office Pros
                </Link>
              </div>
            </div>

            {/* Micro Social Proof */}
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-2 text-xs text-brand-charcoal-600">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <span className="font-bold text-brand-charcoal-900">4.9/5</span>
                <span>(12,000+ Happy Customers)</span>
              </div>
            </div>
          </div>

          {/* Right Showcase Image Grid */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Bento / Bottle Lifestyle Hero Card */}
              <div className="relative aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85"
                  alt="KURA Bento Pro Modular Lunch Box"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-forest-700">
                      Signature Series
                    </span>
                    <h4 className="font-serif font-bold text-sm text-brand-charcoal-900">
                      Bento Pro Modular Stainless Steel Box
                    </h4>
                    <p className="text-xs font-extrabold text-brand-forest-900 mt-0.5">
                      ₹1,499 <span className="text-brand-charcoal-400 line-through font-normal text-[11px]">₹2,199</span>
                    </p>
                  </div>
                  <Link
                    href="/products/kura-bento-pro-modular-lunch-box"
                    className="p-2.5 rounded-xl bg-brand-forest-800 hover:bg-brand-forest-900 text-white shadow-sm"
                    aria-label="View Bento Pro"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Floating Top Mini Badge */}
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 p-3 rounded-2xl bg-white shadow-xl border border-brand-cream-300 flex items-center gap-3 animate-fade-in">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-brand-charcoal-900">100% Food Grade</div>
                  <div className="text-[10px] text-brand-charcoal-500">SUS304 Stainless Steel</div>
                </div>
              </div>

              {/* Floating Bottom Right Badge */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 p-3 rounded-2xl bg-brand-forest-900 text-white shadow-xl border border-brand-forest-700 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-amber-500 text-brand-forest-950 flex items-center justify-center font-bold">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold">Free Express Delivery</div>
                  <div className="text-[10px] text-brand-cream-300">Across India over ₹999</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

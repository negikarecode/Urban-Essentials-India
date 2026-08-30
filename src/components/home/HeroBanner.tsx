import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-brand-cream-100 border-b border-brand-cream-300">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#153E2B_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left z-10">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-forest-100 border border-brand-forest-200 text-brand-forest-900 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand-forest-700" />
              <span>Engineered For Modern Routines</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-forest-950 leading-[1.1] tracking-tight">
              Everyday Essentials.{' '}
              <span className="block italic font-normal text-brand-forest-700">
                Made for Every Day.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base md:text-lg text-brand-charcoal-700 leading-relaxed max-w-2xl">
              Thoughtfully engineered bento lunch boxes, vacuum insulated water bottles, ergonomic spine-protecting backpacks, and minimalist stationery built for <strong>school kids</strong>, <strong>college students</strong>, and <strong>office professionals</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link href="/products">
                <Button
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto shadow-lg hover:shadow-xl group"
                  rightIcon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                >
                  Shop Now
                </Button>
              </Link>
              <Link href="#shop-by-need">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Explore Collections
                </Button>
              </Link>
            </div>

            {/* Micro Trust Points */}
            <div className="pt-4 border-t border-brand-cream-300 grid grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-charcoal-800">
                <CheckCircle2 className="w-4 h-4 text-brand-forest-700 shrink-0" />
                <span>100% Food Grade 304 Steel</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-brand-charcoal-800">
                <CheckCircle2 className="w-4 h-4 text-brand-forest-700 shrink-0" />
                <span>BPA-Free & Non-Toxic</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-brand-charcoal-800">
                <CheckCircle2 className="w-4 h-4 text-brand-forest-700 shrink-0" />
                <span>1-Year Quality Warranty</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Lifestyle Product Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Lifestyle Hero Image */}
              <div className="relative h-[420px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80"
                  alt="KURA Everyday Bento and Carry Essentials"
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
                
                {/* Subtle Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-forest-950/70 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-1.5 text-brand-amber-400 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-brand-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-white ml-1">4.9/5 (1,200+ Reviews)</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-white">
                    The Bento Pro Modular Set
                  </h3>
                  <p className="text-xs text-brand-cream-200">
                    SUS304 Stainless Steel • 100% Leak-Proof • Free Shipping
                  </p>
                </div>
              </div>

              {/* Floating Accent Card 1: Insulated Flask */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-sm p-3.5 rounded-2xl shadow-xl border border-brand-cream-300 hidden sm:flex items-center gap-3 animate-fade-in">
                <div className="w-10 h-10 rounded-xl bg-brand-forest-50 flex items-center justify-center text-brand-forest-800">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-brand-forest-950">24H Cold / 12H Hot</p>
                  <p className="text-[10px] text-brand-charcoal-500 font-semibold">Copper-Core Insulation</p>
                </div>
              </div>

              {/* Floating Accent Card 2: Price Highlight */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-brand-forest-900 text-white p-3.5 rounded-2xl shadow-xl border border-brand-forest-800 flex items-center gap-3 animate-fade-in">
                <div className="text-left">
                  <span className="text-[10px] uppercase tracking-wider text-brand-amber-400 font-bold block">Starting From</span>
                  <span className="font-mono font-extrabold text-base sm:text-lg">₹499 INR</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

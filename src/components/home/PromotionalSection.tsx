import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

export function PromotionalSection() {
  return (
    <section className="py-16 sm:py-24 bg-brand-forest-950 text-white relative overflow-hidden border-y border-brand-forest-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Editorial Campaign Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-amber-400 block">
                Seasonal Capsule • Save Up to 30%
              </span>
              <h2 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-[1.1]">
                Back to Routine.<br />
                <span className="font-normal italic text-brand-cream-200 lowercase font-serif">
                  the 4-piece signature bundle.
                </span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-brand-cream-200 leading-relaxed max-w-xl font-normal">
              Gear up for campus or the boardroom with our iconic essentials: SUS304 insulated meal box, double-wall vacuum flask, 100GSM dot journal, and telescopic carry pouch.
            </p>

            {/* Luxury Coupon Code Bar */}
            <div className="p-4 bg-black/40 border border-white/15 inline-flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="text-xs text-brand-cream-100 uppercase tracking-wider font-semibold">
                Use Promotional Code: <span className="font-mono font-bold text-white bg-brand-forest-800 px-2 py-0.5 ml-1">URBAN20</span>
              </div>
              <span className="text-[11px] text-brand-cream-300 sm:border-l sm:border-white/20 sm:pl-3 uppercase tracking-wider">
                Extra 20% OFF above ₹1,500
              </span>
            </div>

            {/* High-End CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/products/the-ultimate-back-to-campus-starter-bundle"
                className="px-8 py-4 bg-white hover:bg-brand-cream-100 text-brand-forest-950 text-xs font-bold uppercase tracking-[0.18em] transition-all text-center"
              >
                Shop Bundle (₹3,299)
              </Link>
              <Link
                href="/products"
                className="px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/40 text-xs font-bold uppercase tracking-[0.18em] transition-all text-center"
              >
                View All Essentials
              </Link>
            </div>
          </div>

          {/* Luxury Editorial Lookbook Image */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-forest-900 border border-white/20 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
                alt="Back to Routine Starter Capsule"
                fill
                className="object-cover hover:scale-103 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
              <div className="absolute top-4 right-4 bg-white text-brand-forest-950 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 shadow-md">
                Save 34%
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

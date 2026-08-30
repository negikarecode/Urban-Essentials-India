'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Gift, Percent } from 'lucide-react';

export function PromoBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-brand-forest-900 text-white shadow-2xl">
          {/* Background image & gradient overlay */}
          <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1600&q=80"
              alt="Gift Sets Bundle"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-r from-brand-forest-950 via-brand-forest-900/90 to-transparent z-0" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-amber-500 text-brand-forest-950 text-xs font-extrabold uppercase tracking-wide">
                <Gift className="w-3.5 h-3.5" />
                <span>Curated Bundles & Gift Boxes</span>
              </div>

              <h3 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                Back-to-Campus 4-Piece Starter Bundle.
              </h3>

              <p className="text-sm sm:text-base text-brand-cream-200/90 max-w-xl leading-relaxed">
                Save 34% when you get our Bento Pro lunch box, HydroShield flask, 100GSM dot-grid journal, and pop-up pencil cup in one signature gift box.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <Link
                  href="/products/the-ultimate-back-to-campus-starter-bundle"
                  className="px-8 py-3.5 rounded-xl bg-white hover:bg-brand-cream-100 text-brand-forest-950 text-xs sm:text-sm font-extrabold shadow-lg flex items-center gap-2 group transition-all"
                >
                  <span>Shop The Bundle (₹3,299)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="text-xs text-brand-amber-300 font-semibold flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5" /> Use code <strong>KURA20</strong> for additional 20% off!
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:flex justify-end">
              <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
                  alt="Bundle preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

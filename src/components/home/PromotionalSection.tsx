import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, Tag, Check, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function PromotionalSection() {
  return (
    <section className="py-12 sm:py-16 bg-brand-forest-900 text-white relative overflow-hidden border-y border-brand-forest-800">
      {/* Abstract Background Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-forest-800/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-brand-forest-800/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text & Offer Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-amber-500/20 border border-brand-amber-400/40 text-brand-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand-amber-400" />
              <span>Back to Routine Seasonal Special</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                Save up to 30% on everyday essentials.
              </h2>
              <p className="text-sm sm:text-base text-brand-cream-200 leading-relaxed max-w-xl">
                Gear up for the semester or back-to-office grind with our bestselling 4-piece starter bundle. Bento box, 24-hr flask, dot journal, and telescopic pen pouch included.
              </p>
            </div>

            {/* Coupon Code Callout */}
            <div className="inline-flex flex-col sm:flex-row sm:items-center gap-3 p-3.5 rounded-2xl bg-brand-forest-950/80 border border-brand-forest-700">
              <div className="flex items-center gap-2 text-xs text-brand-cream-100">
                <Tag className="w-4 h-4 text-brand-amber-400" />
                <span>Use Coupon Code:</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-brand-amber-500 text-brand-forest-950 font-mono font-extrabold text-xs">
                  KURA20
                </span>
              </div>
              <span className="text-[11px] text-brand-cream-300 sm:border-l sm:border-brand-forest-700 sm:pl-3">
                Extra 20% OFF on orders above ₹1,500
              </span>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/products/the-ultimate-back-to-campus-starter-bundle">
                <Button
                  size="lg"
                  variant="accent"
                  className="shadow-lg hover:shadow-xl"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Shop the Starter Bundle (₹3,299)
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white"
                >
                  Explore All Offers
                </Button>
              </Link>
            </div>
          </div>

          {/* Bundle Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md p-5 sm:p-6 border border-white/20 shadow-2xl space-y-4">
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
                  alt="Back to Routine Starter Kit"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
                <div className="absolute top-3 right-3 bg-brand-amber-500 text-brand-forest-950 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                  Save 34% Off MRP
                </div>
              </div>

              <div className="space-y-2 text-left">
                <h3 className="font-serif font-bold text-lg text-white">
                  The Ultimate Back-to-Campus 4-Piece Box
                </h3>
                <ul className="grid grid-cols-2 gap-2 text-xs text-brand-cream-200">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-amber-400" />
                    <span>Bento Pro Lunch Box</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-amber-400" />
                    <span>HydroShield 750ml Flask</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-amber-400" />
                    <span>100GSM Dot Journal</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-amber-400" />
                    <span>Pop-Up Pen Case</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Ananya Sharma',
    role: 'Parent of 8-year-old',
    location: 'Mumbai',
    quote: 'The SpineSafe school bag and Bento lunch box changed our morning routine! Not a single leak in the bag, and my daughter loves the compartments.',
    rating: 5,
    tag: 'School Bag & Bento Box',
  },
  {
    name: 'Rohan Verma',
    role: 'Product Designer',
    location: 'Bengaluru',
    quote: 'The vegan leather desk pad and solid brass pen make my workstation look like an architectural studio. Exceptional finish and weight.',
    rating: 5,
    tag: 'Desk Mat & Brass Pen',
  },
  {
    name: 'Pooja Iyer',
    role: 'Medical Student',
    location: 'Delhi',
    quote: 'The 24-hr HydroShield flask is an absolute lifesaver during 12-hour hospital shifts. Ice stays frozen even through long summer duties.',
    rating: 5,
    tag: 'Insulated Flask',
  },
];

export function Testimonials() {
  return (
    <section className="py-16 bg-brand-cream-100/50 dark:bg-zinc-950 border-t border-brand-cream-300 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-forest-700 dark:text-emerald-400 uppercase tracking-widest">
            Loved By Thousands
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-brand-forest-950 dark:text-white mt-1">
            Real Stories From Daily Users
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-brand-cream-300 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-brand-forest-200 dark:text-zinc-700" />
                </div>

                <p className="text-sm text-brand-charcoal-700 dark:text-zinc-300 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-brand-cream-200 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-brand-charcoal-900 dark:text-zinc-100 flex items-center gap-1.5">
                      <span>{t.name}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    </h4>
                    <p className="text-xs text-brand-charcoal-500 dark:text-zinc-400">
                      {t.role} • {t.location}
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold text-brand-forest-800 dark:text-emerald-300 bg-brand-forest-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                    {t.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

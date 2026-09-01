import React from 'react';
import { Truck, Award, RefreshCw, ShieldCheck } from 'lucide-react';

const TRUST_PILLARS = [
  {
    icon: <Truck className="w-5 h-5 text-brand-amber-400" />,
    title: 'Free Express Shipping',
    description: 'Complimentary delivery across India on all orders above ₹999',
  },
  {
    icon: <Award className="w-5 h-5 text-brand-amber-400" />,
    title: '1-Year Brand Warranty',
    description: 'Comprehensive warranty on SUS304 steel & durability',
  },
  {
    icon: <RefreshCw className="w-5 h-5 text-brand-amber-400" />,
    title: '7-Day Easy Returns',
    description: 'Hassle-free doorstep pickup & instant replacements guaranteed',
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-brand-amber-400" />,
    title: '100% Secure Checkout',
    description: 'Encrypted Razorpay payments via UPI, Cards & NetBanking',
  },
];

export function TrustSection() {
  return (
    <section className="w-full max-w-full overflow-hidden bg-brand-forest-950 dark:bg-zinc-950 text-white border-y border-brand-forest-900 dark:border-zinc-800 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {TRUST_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-4 ${
                idx > 0 ? 'sm:border-l sm:border-brand-forest-800/80 sm:pl-6 lg:pl-8' : ''
              } ${idx === 2 ? 'sm:border-l-0 lg:border-l' : ''}`}
            >
              <div className="w-11 h-11 rounded-xl bg-brand-forest-900 border border-brand-forest-700/80 flex items-center justify-center shrink-0 shadow-inner">
                {pillar.icon}
              </div>
              <div className="space-y-1 text-left flex-1 min-w-0">
                <h3 className="font-serif font-bold text-sm text-white uppercase tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs text-brand-cream-200/80 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

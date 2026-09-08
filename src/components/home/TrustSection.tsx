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
    <section className="w-full max-w-full overflow-hidden bg-brand-forest-950 dark:bg-zinc-950 text-white border-y border-brand-forest-900 dark:border-zinc-800 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8">
          {TRUST_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className={`flex flex-col sm:flex-row items-start gap-2.5 sm:gap-4 p-2.5 sm:p-0 rounded-xl sm:rounded-none bg-brand-forest-900/40 sm:bg-transparent ${
                idx > 0 ? 'lg:border-l lg:border-brand-forest-800/80 lg:pl-8' : ''
              }`}
            >
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-brand-forest-900 border border-brand-forest-700/80 flex items-center justify-center shrink-0 shadow-inner">
                {pillar.icon}
              </div>
              <div className="space-y-0.5 sm:space-y-1 text-left flex-1 min-w-0">
                <h3 className="font-serif font-bold text-xs sm:text-sm text-white uppercase tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-brand-cream-200/80 leading-snug sm:leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
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

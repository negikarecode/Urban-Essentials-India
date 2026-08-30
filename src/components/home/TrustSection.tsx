import React from 'react';
import { Truck, Award, RefreshCw, ShieldCheck } from 'lucide-react';

const TRUST_PILLARS = [
  {
    icon: <Truck className="w-5 h-5 text-brand-forest-900" />,
    title: 'Free Express Shipping',
    description: 'Complimentary expedited delivery across India on orders above ₹999',
  },
  {
    icon: <Award className="w-5 h-5 text-brand-forest-900" />,
    title: '1-Year Brand Warranty',
    description: 'Comprehensive warranty on SUS304 steel & construction durability',
  },
  {
    icon: <RefreshCw className="w-5 h-5 text-brand-forest-900" />,
    title: '7-Day Easy Returns',
    description: 'Hassle-free doorstep pickup & instant replacements guaranteed',
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-brand-forest-900" />,
    title: '100% Secure Checkout',
    description: 'Bank-grade encrypted payments via Razorpay UPI, Cards & NetBanking',
  },
];

export function TrustSection() {
  return (
    <section className="bg-white border-b border-brand-cream-300 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-brand-cream-300">
          {TRUST_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-4 ${idx !== 0 ? 'pt-6 sm:pt-0 sm:pl-6 lg:pl-8' : ''}`}
            >
              <div className="w-11 h-11 rounded-xl bg-brand-cream-100 flex items-center justify-center shrink-0 border border-brand-cream-300 text-brand-forest-900 shadow-2xs">
                {pillar.icon}
              </div>
              <div className="space-y-1 text-left">
                <h3 className="font-serif font-bold text-sm text-brand-forest-950 uppercase tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs text-brand-charcoal-600 leading-relaxed font-normal">
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

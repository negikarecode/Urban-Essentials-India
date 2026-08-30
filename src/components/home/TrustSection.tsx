import React from 'react';
import { ShieldCheck, RefreshCw, Award, Truck, Lock } from 'lucide-react';

const TRUST_PILLARS = [
  {
    icon: <Lock className="w-6 h-6 text-brand-forest-800" />,
    title: 'Secure Payments',
    description: '100% Encrypted & Safe checkout via Razorpay with UPI, Credit/Debit Cards, NetBanking, and Wallets.',
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-brand-forest-800" />,
    title: 'Easy 7-Day Returns',
    description: 'Zero hassle returns and replacements if your item is damaged or not 100% up to your standards.',
  },
  {
    icon: <Award className="w-6 h-6 text-brand-forest-800" />,
    title: 'Quality Products',
    description: '304 Food-Grade Certified Stainless Steel, BPA-Free polymers, and a comprehensive 1-Year Brand Warranty.',
  },
  {
    icon: <Truck className="w-6 h-6 text-brand-forest-800" />,
    title: 'Fast Free Shipping',
    description: 'Complimentary expedited door-to-door delivery across all pin codes in India on orders over ₹999.',
  },
];

export function TrustSection() {
  return (
    <section className="py-16 sm:py-20 bg-brand-cream-100/60 border-b border-brand-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-forest-700">
            The Urban Essentials Standard
          </span>
          <h2 className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-brand-forest-950 mt-1">
            Built for Durability. Backed by Trust.
          </h2>
          <p className="text-xs sm:text-sm text-brand-charcoal-600 mt-2">
            Every product is tested under real-world conditions to withstand drops, daily transit, and heavy use.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-cream-300 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center space-y-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-cream-100 flex items-center justify-center border border-brand-cream-300 shadow-xs">
                {pillar.icon}
              </div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-brand-forest-950">
                {pillar.title}
              </h3>
              <p className="text-xs text-brand-charcoal-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

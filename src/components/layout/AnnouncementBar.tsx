'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Truck, RefreshCw, ShieldCheck, Tag, ChevronRight } from 'lucide-react';

const ANNOUNCEMENTS = [
  {
    icon: <Truck className="w-3.5 h-3.5 text-brand-amber-400" />,
    text: 'Free Express Shipping across India on orders above ₹999',
    link: '/products',
  },
  {
    icon: <Tag className="w-3.5 h-3.5 text-brand-amber-400" />,
    text: 'Back to Routine: Use code URBAN20 for 20% OFF on orders over ₹1,500',
    link: '/products',
  },
  {
    icon: <RefreshCw className="w-3.5 h-3.5 text-brand-amber-400" />,
    text: '7-Day Hassle-Free Returns & 1-Year Quality Warranty',
    link: '/about',
  },
  {
    icon: <ShieldCheck className="w-3.5 h-3.5 text-brand-amber-400" />,
    text: '100% Encrypted & Secure Razorpay Payments (UPI, Cards, NetBanking)',
    link: '/products',
  },
];

export function AnnouncementBar() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = ANNOUNCEMENTS[currentIdx];

  return (
    <div className="w-full max-w-full overflow-hidden bg-brand-forest-950 text-brand-cream-100 text-[11px] sm:text-xs font-semibold py-2 px-3 sm:px-4 transition-colors duration-300 border-b border-brand-forest-900/50 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center overflow-hidden">
        <Link
          href={current.link}
          className="inline-flex items-center gap-1.5 sm:gap-2 hover:text-brand-amber-300 transition-colors group max-w-full min-w-0"
        >
          <span className="shrink-0">{current.icon}</span>
          <span className="tracking-wide truncate text-[11px] sm:text-xs">{current.text}</span>
          <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform opacity-70 shrink-0" />
        </Link>
      </div>
    </div>
  );
}

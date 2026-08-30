'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ChevronRight } from 'lucide-react';

const MESSAGES = [
  {
    text: '🎉 BACK TO CAMPUS SALE: Extra 20% OFF above ₹1500 with code KURA20',
    link: '/products',
  },
  {
    text: '✨ FREE EXPRESS SHIPPING across India on all orders over ₹999',
    link: '/products',
  },
  {
    text: '🌿 100% BPA-Free & Food Grade Certified Stainless Steel',
    link: '/about',
  },
];

export function AnnouncementBar() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const msg = MESSAGES[currentIdx];

  return (
    <div className="bg-brand-forest-900 text-brand-cream-100 text-xs font-medium py-2 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
        <Link
          href={msg.link}
          className="inline-flex items-center gap-2 hover:text-brand-cream-300 transition-colors group"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-amber-400 animate-pulse" />
          <span>{msg.text}</span>
          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    toast.success('Thank you for subscribing! Your 10% discount code is WELCOME10');
    setEmail('');
  };

  return (
    <footer className="bg-brand-forest-950 text-brand-cream-200 pt-16 pb-12 border-t border-brand-forest-900">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand & Newsletter Column (2 cols wide) */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-forest-700 flex items-center justify-center text-white font-serif font-bold text-lg">
                U
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-white">
                Urban Essentials
              </span>
            </div>
            <p className="text-xs sm:text-sm text-brand-cream-300/80 leading-relaxed max-w-sm">
              Thoughtfully engineered stainless steel water bottles, everyday backpacks, and leak-proof lunchboxes built for pristine daily routines.
            </p>
            <div className="pt-2">
              <p className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Join Urban Club & Get 10% Off
              </p>
              <form onSubmit={handleSubscribe} className="flex max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 text-xs bg-brand-forest-900 border border-brand-forest-700 rounded-l-xl text-white placeholder:text-brand-cream-300/50 focus:outline-none focus:border-brand-sage-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-brand-sage-500 hover:bg-brand-sage-600 text-white rounded-r-xl text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Shop Essentials (1 col) */}
          <div className="space-y-3 text-left">
            <h5 className="text-xs font-bold uppercase tracking-widest text-brand-amber-400">
              Shop Essentials
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-cream-300/80">
              <li>
                <Link href="/category/backpacks" className="hover:text-white transition-colors">
                  Backpacks
                </Link>
              </li>
              <li>
                <Link href="/category/lunch-boxes" className="hover:text-white transition-colors">
                  Lunch Boxes
                </Link>
              </li>
              <li>
                <Link href="/category/water-bottles" className="hover:text-white transition-colors">
                  Water Bottles
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  All Products (Shop All)
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care (1 col) */}
          <div className="space-y-3 text-left">
            <h5 className="text-xs font-bold uppercase tracking-widest text-brand-amber-400">
              Customer Support
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-cream-300/80">
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Track Orders
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us & FAQs
                </Link>
              </li>
              <li>
                <a href="mailto:urbanessentsialindia@gmail.com" className="hover:text-white transition-colors block">
                  urbanessentsialindia@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:8310082568" className="hover:text-white transition-colors block text-brand-amber-400">
                  +91 83100 82568
                </a>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Materials & Standards
                </Link>
              </li>
            </ul>
          </div>

          {/* Urban Promise (1 col) */}
          <div className="space-y-3 text-left">
            <h5 className="text-xs font-bold uppercase tracking-widest text-brand-amber-400">
              Urban Promise
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-cream-300/80">
              <li>SUS304 Food-Grade Steel</li>
              <li>100% BPA Free & Non-Toxic</li>
              <li>Free Shipping Over ₹999</li>
              <li>1-Year Quality Warranty</li>
              <li>7-Day Easy Returns</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-brand-forest-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-cream-300/60">
        <p>© {new Date().getFullYear()} Urban Essentials Inc. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/about" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/about" className="hover:text-white transition-colors">Shipping Policy</Link>
        </div>
      </div>
    </footer>
  );
}

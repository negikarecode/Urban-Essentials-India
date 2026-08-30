'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, ShieldCheck, Truck, RefreshCw, Award, Heart } from 'lucide-react';
import { CATEGORIES } from '@/lib/data/products';
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
      {/* Top Trust Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-brand-forest-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-forest-800 flex items-center justify-center text-brand-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Free Express Shipping</h4>
              <p className="text-xs text-brand-cream-300/70 mt-0.5">On all orders over ₹999 across India</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-forest-800 flex items-center justify-center text-brand-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">100% Food-Grade Safe</h4>
              <p className="text-xs text-brand-cream-300/70 mt-0.5">SUS304 Stainless Steel & BPA-Free</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-forest-800 flex items-center justify-center text-brand-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">1-Year Warranty</h4>
              <p className="text-xs text-brand-cream-300/70 mt-0.5">Comprehensive replacement guarantee</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-forest-800 flex items-center justify-center text-brand-amber-400 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">7-Day Easy Returns</h4>
              <p className="text-xs text-brand-cream-300/70 mt-0.5">Hassle-free doorstep pickup</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-forest-700 flex items-center justify-center text-white font-serif font-bold text-lg">
                U
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-white">
                Urban Essentials
              </span>
            </div>
            <p className="text-sm text-brand-cream-300/80 leading-relaxed max-w-sm">
              Thoughtfully engineered everyday carry, leak-proof bento boxes, vacuum insulated bottles, orthopedic bags, and minimalist desk stationery for School, College, and Office.
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

          {/* Shop Categories */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-widest text-brand-amber-400">
              Shop Essentials
            </h5>
            <ul className="space-y-2 text-sm text-brand-cream-300/80">
              <li>
                <Link href="/category/water-bottles" className="hover:text-white transition-colors">
                  Bottles & Flasks
                </Link>
              </li>
              <li>
                <Link href="/category/backpacks" className="hover:text-white transition-colors">
                  Bags & Backpacks
                </Link>
              </li>
              <li>
                <Link href="/category/lunch-boxes" className="hover:text-white transition-colors">
                  Lunchboxes & Meal Jars
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  All Products (Shop All)
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Admin */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-widest text-brand-amber-400">
              Customer Support
            </h5>
            <ul className="space-y-2 text-sm text-brand-cream-300/80">
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
                <Link href="/wishlist" className="hover:text-white transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Materials & Standards
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand-amber-300 text-brand-cream-300 transition-colors font-medium">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Guarantees & Info */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-widest text-brand-amber-400">
              Urban Promise
            </h5>
            <ul className="space-y-2 text-sm text-brand-cream-300/80">
              <li>SUS304 Food-Grade Steel</li>
              <li>100% BPA Free & Non-Toxic</li>
              <li>Free Shipping Over ₹999</li>
              <li>1-Year Quality Warranty</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-brand-forest-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-cream-300/60">
        <p>© {new Date().getFullYear()} Urban Essentials Inc. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/about" className="hover:text-white">Privacy Policy</Link>
          <Link href="/about" className="hover:text-white">Terms of Service</Link>
          <Link href="/about" className="hover:text-white">Shipping Policy</Link>
        </div>
      </div>
    </footer>
  );
}

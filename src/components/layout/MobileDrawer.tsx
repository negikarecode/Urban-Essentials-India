'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  X,
  ChevronRight,
  User,
  Heart,
  ShoppingBag,
  BookOpen,
  ShieldCheck,
  Sparkles,
  Search,
} from 'lucide-react';
import { CATEGORIES } from '@/lib/data/products';
import { useAuth } from '@/context/AuthContext';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const router = useRouter();
  const { user, signOut, demoLoginAsCustomer } = useAuth();
  const [mobileSearch, setMobileSearch] = useState('');

  if (!isOpen) return null;

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearch.trim()) {
      router.push(`/products?q=${encodeURIComponent(mobileSearch.trim())}`);
      setMobileSearch('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-xs bg-brand-cream-50 h-full flex flex-col z-10 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-brand-cream-300 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-forest-800 flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">
              U
            </div>
            <span className="font-serif font-bold text-xl tracking-tight text-brand-forest-900">
              Urban Essentials
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-full hover:bg-brand-cream-200 text-brand-charcoal-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="p-4 bg-white border-b border-brand-cream-300">
          <form onSubmit={handleMobileSearch} className="relative flex items-center">
            <input
              type="text"
              placeholder="Search bottles, bento, bags..."
              value={mobileSearch}
              onChange={(e) => setMobileSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-brand-cream-400 bg-brand-cream-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
            />
            <Search className="w-4 h-4 text-brand-charcoal-400 absolute left-3 pointer-events-none" />
          </form>
        </div>

        {/* Audience Segment Tabs */}
        <div className="p-4 bg-brand-cream-200/60 border-b border-brand-cream-300">
          <p className="text-xs font-semibold text-brand-charcoal-500 uppercase tracking-wider mb-2">
            Shop By Segment
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            <Link
              href="/audience/school"
              onClick={onClose}
              className="px-3 py-2 bg-white rounded-lg text-center text-xs font-semibold text-brand-forest-800 shadow-sm border border-brand-cream-300 hover:bg-brand-forest-50"
            >
              School
            </Link>
            <Link
              href="/audience/college"
              onClick={onClose}
              className="px-3 py-2 bg-white rounded-lg text-center text-xs font-semibold text-brand-forest-800 shadow-sm border border-brand-cream-300 hover:bg-brand-forest-50"
            >
              College
            </Link>
            <Link
              href="/audience/office"
              onClick={onClose}
              className="px-3 py-2 bg-white rounded-lg text-center text-xs font-semibold text-brand-forest-800 shadow-sm border border-brand-cream-300 hover:bg-brand-forest-50"
            >
              Office
            </Link>
          </div>
        </div>

        {/* Categories List */}
        <div className="p-4 flex-1">
          <p className="text-xs font-semibold text-brand-charcoal-500 uppercase tracking-wider mb-3">
            Explore Categories
          </p>
          <div className="space-y-1">
            <Link
              href="/category/water-bottles"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-brand-charcoal-900 hover:bg-brand-cream-200 transition-colors"
            >
              <span>Bottles</span>
              <ChevronRight className="w-4 h-4 text-brand-charcoal-400" />
            </Link>
            <Link
              href="/category/backpacks"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-brand-charcoal-900 hover:bg-brand-cream-200 transition-colors"
            >
              <span>Bags</span>
              <ChevronRight className="w-4 h-4 text-brand-charcoal-400" />
            </Link>
            <Link
              href="/category/lunch-boxes"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-brand-charcoal-900 hover:bg-brand-cream-200 transition-colors"
            >
              <span>Lunchboxes</span>
              <ChevronRight className="w-4 h-4 text-brand-charcoal-400" />
            </Link>
            <Link
              href="/products"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-brand-forest-900 bg-brand-cream-100 hover:bg-brand-cream-200 transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-brand-forest-700" />
                Shop All
              </span>
              <ChevronRight className="w-4 h-4 text-brand-charcoal-400" />
            </Link>
          </div>

          <hr className="my-4 border-brand-cream-300" />

          {/* Customer links */}
          <div className="space-y-1">
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-brand-charcoal-700 hover:bg-brand-cream-200"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              Wishlist
            </Link>
            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-brand-charcoal-700 hover:bg-brand-cream-200"
            >
              <User className="w-4 h-4 text-brand-forest-700" />
              My Account & Orders
            </Link>
            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-brand-charcoal-700 hover:bg-brand-cream-200"
            >
              <BookOpen className="w-4 h-4 text-brand-forest-700" />
              About Brand & Materials
            </Link>
            <Link
              href="/admin"
              onClick={onClose}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-brand-forest-800 bg-brand-forest-50 hover:bg-brand-forest-100"
            >
              <ShieldCheck className="w-4 h-4 text-brand-forest-700" />
              Admin Portal
            </Link>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-brand-cream-300 bg-white space-y-2">
          {user ? (
            <div className="space-y-2">
              <div className="text-xs text-brand-charcoal-600 truncate">
                Signed in as <strong className="text-brand-forest-900">{user.email}</strong>
              </div>
              <button
                onClick={() => {
                  signOut();
                  onClose();
                }}
                className="w-full text-xs font-semibold py-2 text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => {
                  demoLoginAsCustomer();
                  onClose();
                }}
                className="w-full text-xs font-medium py-2 px-3 bg-brand-forest-800 text-white rounded-lg hover:bg-brand-forest-900 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Sign In (Demo Customer)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

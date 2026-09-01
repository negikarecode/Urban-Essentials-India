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
import { SearchBarDropdown } from '@/components/search/SearchBarDropdown';
import { ThemeToggle } from './ThemeToggle';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const router = useRouter();
  const { user, signOut, isAdmin } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xs bg-white dark:bg-zinc-900 border-r border-brand-cream-300 dark:border-zinc-800 h-full shadow-2xl flex flex-col z-10 animate-slide-right overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-brand-cream-300 dark:border-zinc-800 flex items-center justify-between bg-brand-cream-50 dark:bg-zinc-950">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <span className="font-serif text-lg font-black tracking-tight text-brand-forest-950 dark:text-white">
              URBAN
            </span>
            <span className="text-[10px] tracking-[0.2em] font-semibold text-brand-forest-600 dark:text-brand-sage-400 uppercase">
              Essentials
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-brand-cream-200 dark:hover:bg-zinc-800 text-brand-charcoal-700 dark:text-zinc-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Search Bar with Dropdown */}
        <div className="p-3 bg-white dark:bg-zinc-900 border-b border-brand-cream-300 dark:border-zinc-800">
          <SearchBarDropdown
            placeholder="Search bottles, bento, bags..."
            onNavigate={onClose}
          />
        </div>

        {/* Categories List */}
        <div className="p-4 flex-1">
          <p className="text-xs font-semibold text-brand-charcoal-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
            Explore Categories
          </p>
          <div className="space-y-1">
            <Link
              href="/category/backpacks"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-brand-charcoal-900 dark:text-zinc-100 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <span>Backpacks</span>
              <ChevronRight className="w-4 h-4 text-brand-charcoal-400" />
            </Link>
            <Link
              href="/category/lunch-boxes"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-brand-charcoal-900 dark:text-zinc-100 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <span>Lunch Boxes</span>
              <ChevronRight className="w-4 h-4 text-brand-charcoal-400" />
            </Link>
            <Link
              href="/category/water-bottles"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-brand-charcoal-900 dark:text-zinc-100 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <span>Water Bottles</span>
              <ChevronRight className="w-4 h-4 text-brand-charcoal-400" />
            </Link>
            <Link
              href="/products"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-brand-forest-900 dark:text-emerald-300 bg-brand-cream-100 dark:bg-zinc-800 hover:bg-brand-cream-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-brand-forest-700 dark:text-emerald-400" />
                Shop All
              </span>
              <ChevronRight className="w-4 h-4 text-brand-charcoal-400" />
            </Link>
          </div>

          <hr className="my-4 border-brand-cream-300 dark:border-zinc-800" />

          {/* Customer links & Theme Switcher */}
          <div className="space-y-1">
            {/* Theme Toggle Button in Mobile Drawer */}
            <div className="px-3 py-1 flex items-center justify-between rounded-lg hover:bg-brand-cream-200 dark:hover:bg-zinc-800 text-brand-charcoal-700 dark:text-zinc-300">
              <span className="text-sm font-medium">Appearance</span>
              <ThemeToggle />
            </div>

            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-800"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              Wishlist
            </Link>
            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-800"
            >
              <User className="w-4 h-4 text-brand-forest-700 dark:text-emerald-400" />
              My Account & Orders
            </Link>
            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-800"
            >
              <BookOpen className="w-4 h-4 text-brand-forest-700 dark:text-emerald-400" />
              About Brand & Materials
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-brand-forest-800 dark:text-emerald-300 bg-brand-forest-50 dark:bg-brand-forest-950/80 hover:bg-brand-forest-100 dark:hover:bg-brand-forest-900"
              >
                <ShieldCheck className="w-4 h-4 text-brand-forest-700 dark:text-emerald-400" />
                Admin Portal
              </Link>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-brand-cream-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
          {user ? (
            <div className="space-y-2">
              <div className="text-xs text-brand-charcoal-600 dark:text-zinc-400 truncate">
                Signed in as <strong className="text-brand-forest-900 dark:text-zinc-100">{user.email}</strong>
              </div>
              <button
                onClick={() => {
                  signOut();
                  onClose();
                }}
                className="w-full text-xs font-semibold py-2 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/60"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/login"
                onClick={onClose}
                className="w-full text-xs font-bold py-2.5 px-3 bg-brand-forest-800 text-white rounded-xl hover:bg-brand-forest-900 flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Sign In to Account</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

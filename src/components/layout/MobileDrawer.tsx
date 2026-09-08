'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  X,
  Search,
  ChevronDown,
  ChevronRight,
  ShoppingBag,
  Heart,
  User,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Flame,
  Package,
  Briefcase,
  GraduationCap,
  Baby,
  Truck,
  RotateCcw,
  ArrowRight,
  Layers,
  Award,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { ThemeToggle } from './ThemeToggle';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const router = useRouter();
  const { user, signOut, isAdmin } = useAuth();
  const { wishlistCount } = useWishlist();
  const { itemCount } = useCart();

  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Accordion open states
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    backpacks: false,
    'lunch-boxes': false,
    'water-bottles': false,
  });
  const [isAudienceOpen, setIsAudienceOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);

  // Client hydration mount check
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background body scroll when mobile menu is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalWidth = document.body.style.width;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = originalWidth;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const toggleCategory = (catKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenCategories((prev) => ({
      ...prev,
      [catKey]: !prev[catKey],
    }));
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      router.push(`/products?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push('/products');
    }
    onClose();
  };

  const drawerContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-[100] lg:hidden flex flex-col justify-start"
    >
      {/* Backdrop overlay (visible on wider screen viewports) */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Full-Screen Drawer Panel */}
      <div className="relative w-full h-full sm:max-w-md sm:mr-auto bg-brand-cream-50 dark:bg-zinc-950 text-brand-charcoal-900 dark:text-zinc-100 shadow-2xl flex flex-col z-10 animate-slide-right overflow-hidden border-r border-brand-cream-300 dark:border-zinc-800">
        
        {/* Top Header Bar */}
        <div className="pt-[calc(env(safe-area-inset-top,0px)+0.75rem)] pb-3 px-4 sm:px-6 bg-white dark:bg-zinc-900 border-b border-brand-cream-300 dark:border-zinc-800 flex items-center justify-between shadow-xs shrink-0">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-forest-800 flex items-center justify-center text-white font-serif font-bold text-base shadow-sm group-hover:bg-brand-forest-900 transition-colors">
              U
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-extrabold text-base tracking-tight text-brand-forest-900 dark:text-white leading-none">
                URBAN
              </span>
              <span className="text-[8px] tracking-[0.2em] font-bold text-brand-forest-600 dark:text-brand-sage-400 uppercase mt-0.5">
                Essentials
              </span>
            </div>
          </Link>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-1 rounded-full text-brand-charcoal-600 dark:text-zinc-300 hover:text-brand-forest-900 dark:hover:text-white hover:bg-brand-cream-200 dark:hover:bg-zinc-800 transition-colors focus:outline-hidden"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Menu Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-4 space-y-5">
          
          {/* 1. In-Menu Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center w-full rounded-xl bg-white dark:bg-zinc-900 border border-brand-cream-400 dark:border-zinc-800 shadow-xs focus-within:border-brand-forest-700 dark:focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-brand-forest-800/15 transition-all"
          >
            <div className="pl-3.5 pr-2 text-brand-charcoal-400 dark:text-zinc-500 shrink-0">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bottles, bento, backpacks..."
              className="w-full py-2.5 pr-2 bg-transparent text-sm text-brand-forest-950 dark:text-zinc-100 placeholder-brand-charcoal-400 dark:placeholder-zinc-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 mr-1 text-brand-charcoal-400 hover:text-brand-charcoal-700 dark:text-zinc-400"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="submit"
              className="mr-1.5 p-1.5 rounded-lg bg-brand-forest-800 hover:bg-brand-forest-900 text-white transition-colors shrink-0"
              aria-label="Submit search"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Search Tag Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
            <span className="text-[11px] font-semibold text-brand-charcoal-500 dark:text-zinc-400 shrink-0">
              Popular:
            </span>
            {['SUS304 Bento', 'Water Bottles', 'Backpacks', 'Hot Flasks'].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => {
                  router.push(`/products?q=${encodeURIComponent(term)}`);
                  onClose();
                }}
                className="px-2.5 py-1 rounded-full bg-white dark:bg-zinc-900 border border-brand-cream-300 dark:border-zinc-800 text-[11px] font-medium text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-forest-50 dark:hover:bg-zinc-800 hover:text-brand-forest-800 whitespace-nowrap transition-colors"
              >
                {term}
              </button>
            ))}
          </div>

          {/* 2. Main Navigation: Categories with Expandable Dropdown Accordions */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <p className="text-[11px] font-bold text-brand-charcoal-400 dark:text-zinc-400 uppercase tracking-wider">
                Categories
              </p>
              <Link
                href="/products"
                onClick={onClose}
                className="text-[11px] font-semibold text-brand-forest-700 dark:text-emerald-400 hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-brand-cream-300 dark:border-zinc-800 overflow-hidden divide-y divide-brand-cream-200 dark:divide-zinc-800/80 shadow-xs">
              
              {/* Category 1: Backpacks */}
              <div className="transition-colors">
                <div className="flex items-center justify-between hover:bg-brand-cream-100 dark:hover:bg-zinc-850 transition-colors">
                  <Link
                    href="/category/backpacks"
                    onClick={onClose}
                    className="flex items-center gap-3 px-3.5 py-3 flex-1 text-sm font-semibold text-brand-charcoal-900 dark:text-zinc-100"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span>Backpacks</span>
                      <span className="text-[10px] text-brand-charcoal-500 dark:text-zinc-400 font-normal">
                        Campus, Daily & Ergonomic
                      </span>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => toggleCategory('backpacks', e)}
                    className="p-3 text-brand-charcoal-400 hover:text-brand-forest-800 dark:hover:text-emerald-400 transition-colors"
                    aria-label="Toggle Backpacks dropdown"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openCategories.backpacks ? 'rotate-180 text-brand-forest-800 dark:text-emerald-400' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Subcategory Dropdown List */}
                {openCategories.backpacks && (
                  <div className="px-4 py-2 bg-brand-cream-50/60 dark:bg-zinc-950/50 space-y-1 text-xs border-t border-brand-cream-200 dark:border-zinc-800 animate-slide-down">
                    <Link
                      href="/products?category=backpacks&audience=kids"
                      onClick={onClose}
                      className="flex items-center justify-between py-2 px-2.5 rounded-lg text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 hover:text-brand-forest-900 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Baby className="w-3.5 h-3.5 text-brand-forest-600 dark:text-emerald-400" />
                        School & Kids Backpacks
                      </span>
                      <ChevronRight className="w-3 h-3 text-brand-charcoal-400" />
                    </Link>
                    <Link
                      href="/products?category=backpacks&audience=college"
                      onClick={onClose}
                      className="flex items-center justify-between py-2 px-2.5 rounded-lg text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 hover:text-brand-forest-900 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-brand-forest-600 dark:text-emerald-400" />
                        College & Tech Campus Packs
                      </span>
                      <ChevronRight className="w-3 h-3 text-brand-charcoal-400" />
                    </Link>
                    <Link
                      href="/products?category=backpacks&audience=office"
                      onClick={onClose}
                      className="flex items-center justify-between py-2 px-2.5 rounded-lg text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 hover:text-brand-forest-900 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-brand-forest-600 dark:text-emerald-400" />
                        Office & Commute Backpacks
                      </span>
                      <ChevronRight className="w-3 h-3 text-brand-charcoal-400" />
                    </Link>
                    <Link
                      href="/category/backpacks"
                      onClick={onClose}
                      className="flex items-center justify-between py-2 px-2.5 font-semibold text-brand-forest-800 dark:text-emerald-400 hover:underline"
                    >
                      <span>Explore All Backpacks</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Category 2: Lunch Boxes */}
              <div className="transition-colors">
                <div className="flex items-center justify-between hover:bg-brand-cream-100 dark:hover:bg-zinc-850 transition-colors">
                  <Link
                    href="/category/lunch-boxes"
                    onClick={onClose}
                    className="flex items-center gap-3 px-3.5 py-3 flex-1 text-sm font-semibold text-brand-charcoal-900 dark:text-zinc-100"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span>Lunch Boxes</span>
                      <span className="text-[10px] text-brand-charcoal-500 dark:text-zinc-400 font-normal">
                        SUS304 Stainless Steel & Bento
                      </span>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => toggleCategory('lunch-boxes', e)}
                    className="p-3 text-brand-charcoal-400 hover:text-brand-forest-800 dark:hover:text-emerald-400 transition-colors"
                    aria-label="Toggle Lunch Boxes dropdown"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openCategories['lunch-boxes'] ? 'rotate-180 text-brand-forest-800 dark:text-emerald-400' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Subcategory Dropdown List */}
                {openCategories['lunch-boxes'] && (
                  <div className="px-4 py-2 bg-brand-cream-50/60 dark:bg-zinc-950/50 space-y-1 text-xs border-t border-brand-cream-200 dark:border-zinc-800 animate-slide-down">
                    <Link
                      href="/products?category=lunch-boxes"
                      onClick={onClose}
                      className="flex items-center justify-between py-2 px-2.5 rounded-lg text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 hover:text-brand-forest-900 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        SUS304 Double-Tier Tiffins
                      </span>
                      <ChevronRight className="w-3 h-3 text-brand-charcoal-400" />
                    </Link>
                    <Link
                      href="/products?category=lunch-boxes&audience=kids"
                      onClick={onClose}
                      className="flex items-center justify-between py-2 px-2.5 rounded-lg text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 hover:text-brand-forest-900 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Baby className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        Kids School Bento Boxes
                      </span>
                      <ChevronRight className="w-3 h-3 text-brand-charcoal-400" />
                    </Link>
                    <Link
                      href="/products?category=lunch-boxes&audience=office"
                      onClick={onClose}
                      className="flex items-center justify-between py-2 px-2.5 rounded-lg text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 hover:text-brand-forest-900 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        Office Insulated Meal Containers
                      </span>
                      <ChevronRight className="w-3 h-3 text-brand-charcoal-400" />
                    </Link>
                    <Link
                      href="/category/lunch-boxes"
                      onClick={onClose}
                      className="flex items-center justify-between py-2 px-2.5 font-semibold text-brand-forest-800 dark:text-emerald-400 hover:underline"
                    >
                      <span>Explore All Lunch Boxes</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Category 3: Water Bottles */}
              <div className="transition-colors">
                <div className="flex items-center justify-between hover:bg-brand-cream-100 dark:hover:bg-zinc-850 transition-colors">
                  <Link
                    href="/category/water-bottles"
                    onClick={onClose}
                    className="flex items-center gap-3 px-3.5 py-3 flex-1 text-sm font-semibold text-brand-charcoal-900 dark:text-zinc-100"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 flex items-center justify-center shrink-0">
                      <RotateCcw className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span>Water Bottles & Flasks</span>
                      <span className="text-[10px] text-brand-charcoal-500 dark:text-zinc-400 font-normal">
                        Thermal Flasks & Food Jars
                      </span>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => toggleCategory('water-bottles', e)}
                    className="p-3 text-brand-charcoal-400 hover:text-brand-forest-800 dark:hover:text-emerald-400 transition-colors"
                    aria-label="Toggle Water Bottles dropdown"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openCategories['water-bottles'] ? 'rotate-180 text-brand-forest-800 dark:text-emerald-400' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Subcategory Dropdown List */}
                {openCategories['water-bottles'] && (
                  <div className="px-4 py-2 bg-brand-cream-50/60 dark:bg-zinc-950/50 space-y-1 text-xs border-t border-brand-cream-200 dark:border-zinc-800 animate-slide-down">
                    <Link
                      href="/products?category=water-bottles"
                      onClick={onClose}
                      className="flex items-center justify-between py-2 px-2.5 rounded-lg text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 hover:text-brand-forest-900 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                        Vacuum Insulated Hot/Cold Flasks
                      </span>
                      <ChevronRight className="w-3 h-3 text-brand-charcoal-400" />
                    </Link>
                    <Link
                      href="/products?category=water-bottles"
                      onClick={onClose}
                      className="flex items-center justify-between py-2 px-2.5 rounded-lg text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 hover:text-brand-forest-900 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Package className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                        Thermal Soup Mugs & Food Jars
                      </span>
                      <ChevronRight className="w-3 h-3 text-brand-charcoal-400" />
                    </Link>
                    <Link
                      href="/category/water-bottles"
                      onClick={onClose}
                      className="flex items-center justify-between py-2 px-2.5 font-semibold text-brand-forest-800 dark:text-emerald-400 hover:underline"
                    >
                      <span>Explore All Bottles & Flasks</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Shop All Link */}
              <Link
                href="/products"
                onClick={onClose}
                className="flex items-center justify-between px-3.5 py-3 bg-brand-forest-50/60 dark:bg-zinc-850 hover:bg-brand-forest-100/80 dark:hover:bg-zinc-800 text-brand-forest-900 dark:text-emerald-400 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-forest-800 text-white flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold">Shop All Products</span>
                    <span className="text-[10px] text-brand-forest-700 dark:text-emerald-500 font-normal">
                      Browse full catalog (50+ products)
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 3. Dropdown Accordion: Curated Collections */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-brand-cream-300 dark:border-zinc-800 text-xs font-bold text-brand-charcoal-800 dark:text-zinc-200 hover:bg-brand-cream-100 dark:hover:bg-zinc-855 transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-2.5">
                <Flame className="w-4 h-4 text-brand-amber-500" />
                <span>Featured Collections</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-brand-charcoal-400 transition-transform duration-200 ${
                  isCollectionsOpen ? 'rotate-180 text-brand-forest-800 dark:text-emerald-400' : ''
                }`}
              />
            </button>

            {isCollectionsOpen && (
              <div className="px-2 py-1.5 bg-white dark:bg-zinc-900 rounded-xl border border-brand-cream-300 dark:border-zinc-800 space-y-1 text-xs animate-slide-down">
                <Link
                  href="/products?sort=bestseller"
                  onClick={onClose}
                  className="flex items-center justify-between p-2 rounded-lg text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-100 dark:hover:bg-zinc-800 hover:text-brand-forest-900 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">🔥</span>
                    Best Sellers Collection
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold">
                    Hot
                  </span>
                </Link>
                <Link
                  href="/products?sort=newest"
                  onClick={onClose}
                  className="flex items-center justify-between p-2 rounded-lg text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-100 dark:hover:bg-zinc-800 hover:text-brand-forest-900 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    New Arrivals
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold">
                    Fresh
                  </span>
                </Link>
                <Link
                  href="/products"
                  onClick={onClose}
                  className="flex items-center justify-between p-2 rounded-lg text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-100 dark:hover:bg-zinc-800 hover:text-brand-forest-900 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">🏷️</span>
                    Special Offers & Bundles
                  </span>
                  <ChevronRight className="w-3 h-3 text-brand-charcoal-400" />
                </Link>
              </div>
            )}
          </div>

          {/* 4. Dropdown Accordion: Shop By Audience */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => setIsAudienceOpen(!isAudienceOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-brand-cream-300 dark:border-zinc-800 text-xs font-bold text-brand-charcoal-800 dark:text-zinc-200 hover:bg-brand-cream-100 dark:hover:bg-zinc-855 transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-brand-forest-700 dark:text-emerald-400" />
                <span>Shop By Audience</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-brand-charcoal-400 transition-transform duration-200 ${
                  isAudienceOpen ? 'rotate-180 text-brand-forest-800 dark:text-emerald-400' : ''
                }`}
              />
            </button>

            {isAudienceOpen && (
              <div className="px-2 py-1.5 bg-white dark:bg-zinc-900 rounded-xl border border-brand-cream-300 dark:border-zinc-800 space-y-1 text-xs animate-slide-down">
                <Link
                  href="/products?audience=kids"
                  onClick={onClose}
                  className="flex items-center justify-between p-2 rounded-lg text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-100 dark:hover:bg-zinc-800 hover:text-brand-forest-900 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Baby className="w-3.5 h-3.5 text-rose-500" />
                    School & Kids Essentials
                  </span>
                  <ChevronRight className="w-3 h-3 text-brand-charcoal-400" />
                </Link>
                <Link
                  href="/products?audience=college"
                  onClick={onClose}
                  className="flex items-center justify-between p-2 rounded-lg text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-100 dark:hover:bg-zinc-800 hover:text-brand-forest-900 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-sky-500" />
                    College & Campus Gear
                  </span>
                  <ChevronRight className="w-3 h-3 text-brand-charcoal-400" />
                </Link>
                <Link
                  href="/products?audience=office"
                  onClick={onClose}
                  className="flex items-center justify-between p-2 rounded-lg text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-100 dark:hover:bg-zinc-800 hover:text-brand-forest-900 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                    Office & Work Commute
                  </span>
                  <ChevronRight className="w-3 h-3 text-brand-charcoal-400" />
                </Link>
              </div>
            )}
          </div>

          {/* 5. Customer Quick Links */}
          <div className="pt-2">
            <p className="text-[11px] font-bold text-brand-charcoal-400 dark:text-zinc-400 uppercase tracking-wider mb-2 px-1">
              Account & Perks
            </p>
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-brand-cream-300 dark:border-zinc-800 divide-y divide-brand-cream-200 dark:divide-zinc-800 shadow-xs">
              <Link
                href="/wishlist"
                onClick={onClose}
                className="flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-brand-charcoal-800 dark:text-zinc-200 hover:bg-brand-cream-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>My Wishlist</span>
                </div>
                {wishlistCount > 0 && (
                  <span className="px-2 py-0.5 bg-rose-500 text-white rounded-full text-[10px] font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/account"
                onClick={onClose}
                className="flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-brand-charcoal-800 dark:text-zinc-200 hover:bg-brand-cream-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-brand-forest-700 dark:text-emerald-400" />
                  <span>My Orders & Tracking</span>
                </div>
                <ChevronRight className="w-3 h-3 text-brand-charcoal-400" />
              </Link>

              <Link
                href="/about"
                onClick={onClose}
                className="flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-brand-charcoal-800 dark:text-zinc-200 hover:bg-brand-cream-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-brand-forest-700 dark:text-emerald-400" />
                  <span>About Urban Essentials & SUS304</span>
                </div>
                <ChevronRight className="w-3 h-3 text-brand-charcoal-400" />
              </Link>

              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={onClose}
                  className="flex items-center justify-between px-3.5 py-2.5 text-xs font-bold text-brand-forest-900 dark:text-emerald-300 bg-brand-forest-50/80 dark:bg-zinc-850 hover:bg-brand-forest-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-brand-forest-700 dark:text-emerald-400" />
                    <span>Admin Portal</span>
                  </div>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 bg-brand-forest-800 text-white rounded-md">
                    Admin
                  </span>
                </Link>
              )}
            </div>
          </div>

          {/* 6. Appearance & Theme Switcher */}
          <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-brand-cream-300 dark:border-zinc-800 shadow-2xs">
            <span className="text-xs font-semibold text-brand-charcoal-700 dark:text-zinc-300">
              Appearance (Theme)
            </span>
            <ThemeToggle />
          </div>

          {/* 7. Trust Guarantees */}
          <div className="p-3 bg-brand-cream-100 dark:bg-zinc-900/60 rounded-xl border border-brand-cream-300 dark:border-zinc-800 space-y-2 text-[11px] text-brand-charcoal-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-brand-forest-700 dark:text-emerald-400 shrink-0" />
              <span>Free Express Delivery on orders above ₹999</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-forest-700 dark:text-emerald-400 shrink-0" />
              <span>Certified SUS304 Food-Grade Stainless Steel</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-3.5 h-3.5 text-brand-forest-700 dark:text-emerald-400 shrink-0" />
              <span>7-Day Hassle-Free Exchange & Return</span>
            </div>
          </div>
        </div>

        {/* Fixed Footer: Account / Sign In Actions */}
        <div className="p-4 pb-[calc(env(safe-area-inset-bottom,0px)+1rem)] border-t border-brand-cream-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0">
          {user ? (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full bg-brand-forest-800 text-white font-serif font-bold text-sm flex items-center justify-center shrink-0">
                  {user.full_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-brand-charcoal-900 dark:text-zinc-100 truncate">
                    {user.full_name || 'My Account'}
                  </p>
                  <p className="text-[11px] text-brand-charcoal-500 dark:text-zinc-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  signOut();
                  onClose();
                }}
                className="px-3 py-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 rounded-xl transition-colors shrink-0"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={onClose}
                className="py-2.5 px-3 bg-brand-forest-800 hover:bg-brand-forest-900 text-white text-xs font-bold text-center rounded-xl transition-colors shadow-xs"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={onClose}
                className="py-2.5 px-3 bg-brand-cream-100 dark:bg-zinc-800 hover:bg-brand-cream-200 dark:hover:bg-zinc-700 text-brand-forest-950 dark:text-white text-xs font-bold text-center rounded-xl transition-colors border border-brand-cream-300 dark:border-zinc-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Menu,
  Search,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
  X,
  ArrowRight,
  ShieldCheck,
  Package,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { MobileDrawer } from './MobileDrawer';
import { AnnouncementBar } from './AnnouncementBar';
import { SearchAutocompleteModal } from '@/components/search/SearchAutocompleteModal';
import { CATEGORIES, PRODUCTS } from '@/lib/data/products';
import { formatCurrency } from '@/lib/utils';

export function Header() {
  const router = useRouter();
  const { itemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, signOut, demoLoginAsCustomer, demoLoginAsAdmin, isAdmin } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K to open Search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside listener for dropdowns
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setIsAccountMenuOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-cream-300 transition-all">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-4">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg text-brand-charcoal-700 hover:bg-brand-cream-200 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-brand-forest-800 flex items-center justify-center text-white font-serif font-bold text-xl shadow-md group-hover:bg-brand-forest-900 transition-colors">
              K
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-extrabold text-2xl tracking-tight text-brand-forest-900 leading-none">
                KURA
              </span>
              <span className="text-[10px] tracking-[0.2em] font-semibold text-brand-forest-600 uppercase mt-0.5">
                Essentials
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            <Link
              href="/"
              className="px-2.5 py-2 text-xs xl:text-sm font-semibold text-brand-charcoal-800 hover:text-brand-forest-800 hover:bg-brand-cream-100 rounded-lg transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="px-2.5 py-2 text-xs xl:text-sm font-semibold text-brand-charcoal-800 hover:text-brand-forest-800 hover:bg-brand-cream-100 rounded-lg transition-colors"
            >
              Shop
            </Link>

            {/* Target Audience Quick Links */}
            <Link
              href="/audience/school"
              className="px-2.5 py-1 text-xs font-semibold text-brand-forest-900 hover:bg-brand-cream-200 rounded-lg transition-all"
            >
              School
            </Link>
            <Link
              href="/audience/college"
              className="px-2.5 py-1 text-xs font-semibold text-brand-forest-900 hover:bg-brand-cream-200 rounded-lg transition-all"
            >
              College
            </Link>
            <Link
              href="/audience/office"
              className="px-2.5 py-1 text-xs font-semibold text-brand-forest-900 hover:bg-brand-cream-200 rounded-lg transition-all"
            >
              Office
            </Link>

            <Link
              href="/products?sort=bestseller"
              className="px-2.5 py-2 text-xs xl:text-sm font-semibold text-brand-charcoal-800 hover:text-brand-forest-800 hover:bg-brand-cream-100 rounded-lg transition-colors"
            >
              Best Sellers
            </Link>
            <Link
              href="/products?sort=newest"
              className="px-2.5 py-2 text-xs xl:text-sm font-semibold text-brand-charcoal-800 hover:text-brand-forest-800 hover:bg-brand-cream-100 rounded-lg transition-colors"
            >
              New Arrivals
            </Link>

            {/* Categories Dropdown */}
            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-1 px-2.5 py-2 text-xs xl:text-sm font-semibold text-brand-charcoal-800 hover:text-brand-forest-800 hover:bg-brand-cream-100 rounded-lg transition-colors"
              >
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-brand-cream-300 p-2 z-50 animate-slide-down">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={() => setIsCategoryMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-brand-charcoal-700 hover:bg-brand-cream-100 hover:text-brand-forest-900 rounded-xl transition-colors"
                    >
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Search Trigger Button & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Search Trigger */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 text-xs rounded-full border border-brand-cream-400 bg-brand-cream-50 hover:bg-white text-brand-charcoal-500 hover:border-brand-forest-600 transition-all shadow-2xs group"
            >
              <Search className="w-3.5 h-3.5 text-brand-charcoal-400 group-hover:text-brand-forest-800 transition-colors" />
              <span className="w-36 md:w-48 text-left truncate">Search essentials...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold text-brand-charcoal-400 bg-white border border-brand-cream-300 rounded shadow-xs">
                Ctrl+K
              </kbd>
            </button>

            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="sm:hidden p-2 rounded-full text-brand-charcoal-700 hover:bg-brand-cream-200"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-full text-brand-charcoal-700 hover:bg-brand-cream-200 transition-colors"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-2 rounded-full text-brand-charcoal-700 hover:bg-brand-cream-200 transition-colors"
              aria-label="Open shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-brand-forest-800 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-scale-in">
                  {itemCount}
                </span>
              )}
            </button>

            {/* User Account Menu */}
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="flex items-center gap-1.5 p-1.5 pl-2 rounded-full text-brand-charcoal-700 hover:bg-brand-cream-200 border border-brand-cream-300 transition-colors"
                aria-label="Account options"
              >
                <div className="w-6 h-6 rounded-full bg-brand-forest-800 text-white text-xs font-serif font-bold flex items-center justify-center">
                  {user ? user.full_name?.charAt(0).toUpperCase() || 'U' : <User className="w-3.5 h-3.5" />}
                </div>
                <ChevronDown className="w-3 h-3 text-brand-charcoal-400" />
              </button>

              {/* Account Dropdown */}
              {isAccountMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-brand-cream-300 p-3 z-50 animate-slide-down">
                  {user ? (
                    <div className="space-y-2">
                      <div className="pb-2 border-b border-brand-cream-200">
                        <p className="text-xs font-bold text-brand-charcoal-900 truncate">
                          {user.full_name}
                        </p>
                        <p className="text-[11px] text-brand-charcoal-500 truncate">
                          {user.email}
                        </p>
                        {isAdmin && (
                          <span className="mt-1 inline-block px-2 py-0.5 bg-brand-forest-800 text-white text-[9px] font-bold uppercase rounded-full">
                            Admin
                          </span>
                        )}
                      </div>
                      <Link
                        href="/account"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-brand-charcoal-700 hover:bg-brand-cream-100 rounded-xl"
                      >
                        <Package className="w-4 h-4 text-brand-forest-700" />
                        <span>My Account & Orders</span>
                      </Link>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-brand-forest-900 bg-brand-forest-50 hover:bg-brand-forest-100 rounded-xl"
                        >
                          <ShieldCheck className="w-4 h-4 text-brand-forest-700" />
                          <span>Admin Portal</span>
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          signOut();
                          setIsAccountMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      <div className="pb-2 border-b border-brand-cream-200 text-center">
                        <h4 className="font-serif font-bold text-xs text-brand-forest-950">
                          Welcome to KURA
                        </h4>
                        <p className="text-[11px] text-brand-charcoal-500">
                          Sign in for orders, wishlist & fast checkout
                        </p>
                      </div>
                      <Link
                        href="/login"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="block w-full py-2 bg-brand-forest-800 hover:bg-brand-forest-900 text-white text-xs font-bold text-center rounded-xl transition-colors shadow-xs"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="block w-full py-2 bg-brand-cream-100 hover:bg-brand-cream-200 text-brand-forest-950 text-xs font-bold text-center rounded-xl transition-colors border border-brand-cream-300"
                      >
                        Create Account
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Search Autocomplete Modal */}
      <SearchAutocompleteModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </header>
  );
}

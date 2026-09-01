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
  ShieldCheck,
  Package,
  X,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { MobileDrawer } from './MobileDrawer';
import { AnnouncementBar } from './AnnouncementBar';
import { SearchAutocompleteModal } from '@/components/search/SearchAutocompleteModal';
import { SearchBarDropdown } from '@/components/search/SearchBarDropdown';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const router = useRouter();
  const { itemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, signOut, isAdmin } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);

  // Client mounted hydration guard
  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Click outside listener for account dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-brand-cream-300 dark:border-zinc-800 transition-colors">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-4">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-brand-forest-800 flex items-center justify-center text-white font-serif font-bold text-xl shadow-md group-hover:bg-brand-forest-900 transition-colors">
              U
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-extrabold text-2xl tracking-tight text-brand-forest-900 dark:text-white leading-none">
                URBAN
              </span>
              <span className="text-[10px] tracking-[0.2em] font-semibold text-brand-forest-600 dark:text-brand-sage-400 uppercase mt-0.5">
                Essentials
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links: ONLY Bottles, Bags, Lunchboxes, and Shop All */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
            <Link
              href="/category/backpacks"
              className="px-3 py-2 text-sm font-semibold text-brand-charcoal-800 dark:text-zinc-200 hover:text-brand-forest-800 dark:hover:text-white hover:bg-brand-cream-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
            >
              Backpacks
            </Link>
            <Link
              href="/category/lunch-boxes"
              className="px-3 py-2 text-sm font-semibold text-brand-charcoal-800 dark:text-zinc-200 hover:text-brand-forest-800 dark:hover:text-white hover:bg-brand-cream-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
            >
              Lunch Boxes
            </Link>
            <Link
              href="/category/water-bottles"
              className="px-3 py-2 text-sm font-semibold text-brand-charcoal-800 dark:text-zinc-200 hover:text-brand-forest-800 dark:hover:text-white hover:bg-brand-cream-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
            >
              Water Bottles
            </Link>
            <Link
              href="/products"
              className="px-3 py-2 text-sm font-semibold text-brand-charcoal-800 dark:text-zinc-200 hover:text-brand-forest-800 dark:hover:text-white hover:bg-brand-cream-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
            >
              Shop All
            </Link>
          </nav>

          {/* Desktop Search Bar with Live Related Products Dropdown */}
          <div className="hidden sm:block">
            <SearchBarDropdown
              className="w-48 md:w-64 lg:w-80 xl:w-96"
              placeholder="Search bottles, bento, bags..."
            />
          </div>

          {/* Action Buttons: Mobile Search Toggle, Theme Toggle, Wishlist, Cart, Account */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="sm:hidden p-2 rounded-full text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Search catalog"
            >
              {isMobileSearchOpen ? (
                <X className="w-5 h-5 text-brand-forest-900 dark:text-white" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>

            {/* Dark Theme Mode Toggle */}
            <ThemeToggle />

            {/* Wishlist Button */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-full text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 transition-colors"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {mounted && wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-2 rounded-full text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Open shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && itemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-brand-forest-800 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-scale-in">
                  {itemCount}
                </span>
              )}
            </button>

            {/* User Account Menu */}
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="flex items-center gap-1.5 p-1.5 pl-2 rounded-full text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 border border-brand-cream-300 dark:border-zinc-700 transition-colors"
                aria-label="Account options"
              >
                <div className="w-6 h-6 rounded-full bg-brand-forest-800 text-white text-xs font-serif font-bold flex items-center justify-center">
                  {mounted && user ? user.full_name?.charAt(0).toUpperCase() || 'U' : <User className="w-3.5 h-3.5" />}
                </div>
                <ChevronDown className="w-3 h-3 text-brand-charcoal-400 dark:text-zinc-400" />
              </button>

              {/* Account Dropdown */}
              {isAccountMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-brand-cream-300 dark:border-zinc-800 p-3 z-50 animate-slide-down">
                  {mounted && user ? (
                    <div className="space-y-2">
                      <div className="pb-2 border-b border-brand-cream-200 dark:border-zinc-800">
                        <p className="text-xs font-bold text-brand-charcoal-900 dark:text-zinc-100 truncate">
                          {user.full_name}
                        </p>
                        <p className="text-[11px] text-brand-charcoal-500 dark:text-zinc-400 truncate">
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
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-brand-charcoal-700 dark:text-zinc-200 hover:bg-brand-cream-100 dark:hover:bg-zinc-800 rounded-xl"
                      >
                        <Package className="w-4 h-4 text-brand-forest-700 dark:text-brand-sage-400" />
                        <span>My Account & Orders</span>
                      </Link>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-brand-forest-900 dark:text-emerald-300 bg-brand-forest-50 dark:bg-brand-forest-950/80 hover:bg-brand-forest-100 dark:hover:bg-brand-forest-900 rounded-xl"
                        >
                          <ShieldCheck className="w-4 h-4 text-brand-forest-700 dark:text-emerald-400" />
                          <span>Admin Portal</span>
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          signOut();
                          setIsAccountMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      <div className="pb-2 border-b border-brand-cream-200 dark:border-zinc-800 text-center">
                        <h4 className="font-serif font-bold text-xs text-brand-forest-950 dark:text-white">
                          Welcome to Urban Essentials
                        </h4>
                        <p className="text-[11px] text-brand-charcoal-500 dark:text-zinc-400">
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
                        className="block w-full py-2 bg-brand-cream-100 dark:bg-zinc-800 hover:bg-brand-cream-200 dark:hover:bg-zinc-700 text-brand-forest-950 dark:text-white text-xs font-bold text-center rounded-xl transition-colors border border-brand-cream-300 dark:border-zinc-700"
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

      {/* Mobile Search Bar Expansion */}
      {isMobileSearchOpen && (
        <div className="sm:hidden px-4 py-3 bg-brand-cream-50/95 dark:bg-zinc-900/95 border-t border-brand-cream-200 dark:border-zinc-800 shadow-sm animate-slide-down">
          <SearchBarDropdown
            autoFocus
            onNavigate={() => setIsMobileSearchOpen(false)}
            placeholder="Search bottles, bento, bags..."
          />
        </div>
      )}

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

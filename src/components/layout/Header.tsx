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
import { CATEGORIES, PRODUCTS } from '@/lib/data/products';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/types';

export function Header() {
  const router = useRouter();
  const { itemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, signOut, demoLoginAsCustomer, demoLoginAsAdmin, isAdmin } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  // Live search filtering
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const filtered = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.category_name?.toLowerCase().includes(q)
      ).slice(0, 5);
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Click outside listener for dropdowns
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

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
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/products"
              className="px-3 py-2 text-sm font-medium text-brand-charcoal-800 hover:text-brand-forest-800 hover:bg-brand-cream-100 rounded-lg transition-colors"
            >
              All Products
            </Link>

            {/* Target Audience Quick Pills */}
            <div className="flex items-center bg-brand-cream-100/80 p-1 rounded-xl border border-brand-cream-300 mx-1">
              <Link
                href="/audience/school"
                className="px-2.5 py-1 text-xs font-semibold text-brand-forest-900 hover:bg-white rounded-lg transition-all"
              >
                🎒 School
              </Link>
              <Link
                href="/audience/college"
                className="px-2.5 py-1 text-xs font-semibold text-brand-forest-900 hover:bg-white rounded-lg transition-all"
              >
                💻 College
              </Link>
              <Link
                href="/audience/office"
                className="px-2.5 py-1 text-xs font-semibold text-brand-forest-900 hover:bg-white rounded-lg transition-all"
              >
                💼 Office
              </Link>
            </div>

            {/* Categories Dropdown */}
            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => setIsCategoryMenuOpen((prev) => !prev)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-brand-charcoal-800 hover:text-brand-forest-800 hover:bg-brand-cream-100 rounded-lg transition-colors"
              >
                <span>Categories</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isCategoryMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-brand-cream-300 p-2 z-50 animate-slide-down">
                  <div className="grid grid-cols-1 gap-1">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        onClick={() => setIsCategoryMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-brand-charcoal-800 hover:bg-brand-cream-100 hover:text-brand-forest-800 transition-colors"
                      >
                        <span>{cat.name}</span>
                        <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-brand-charcoal-400" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="px-3 py-2 text-sm font-medium text-brand-charcoal-800 hover:text-brand-forest-800 hover:bg-brand-cream-100 rounded-lg transition-colors"
            >
              Our Story
            </Link>
          </nav>

          {/* Search Bar & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Search Container */}
            <div className="relative" ref={searchRef}>
              <form
                onSubmit={handleSearchSubmit}
                className="relative hidden sm:flex items-center"
              >
                <input
                  type="text"
                  placeholder="Search lunch boxes, flasks, bags..."
                  value={searchQuery}
                  onFocus={() => setIsSearchOpen(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  className="w-48 md:w-64 lg:w-72 pl-9 pr-8 py-2 text-xs rounded-full border border-brand-cream-400 bg-brand-cream-50 focus:bg-white focus:w-80 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-brand-forest-700 placeholder:text-brand-charcoal-400"
                />
                <Search className="w-4 h-4 text-brand-charcoal-400 absolute left-3 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults([]);
                    }}
                    className="absolute right-3 p-0.5 text-brand-charcoal-400 hover:text-brand-charcoal-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              {/* Live Search Autocomplete Results */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-brand-cream-300 p-3 z-50 animate-slide-down">
                  <div className="text-[11px] font-bold text-brand-charcoal-400 uppercase tracking-wider px-2 pb-2">
                    Quick Results
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        href={`/products/${item.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-brand-cream-100 transition-colors group"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-brand-cream-200 shrink-0 border border-brand-cream-300">
                          <Image
                            src={item.images[0]?.image_url || '/placeholder.png'}
                            alt={item.name}
                            fill
                            sizes="48px"
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-brand-charcoal-900 group-hover:text-brand-forest-800 line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-brand-charcoal-500 capitalize">
                            {item.category_name} • {item.target_audience}
                          </p>
                          <p className="text-xs font-bold text-brand-forest-900 mt-0.5">
                            {formatCurrency(item.price)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full mt-2 pt-2 border-t border-brand-cream-200 text-center text-xs font-semibold text-brand-forest-800 hover:text-brand-forest-950 flex items-center justify-center gap-1"
                  >
                    <span>View all matching results</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Search Button */}
            <Link
              href="/products"
              className="sm:hidden p-2 rounded-full text-brand-charcoal-700 hover:bg-brand-cream-200"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Wishlist Button */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-full text-brand-charcoal-700 hover:bg-brand-cream-200 transition-colors"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-fade-in">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* User Account Dropdown */}
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setIsAccountMenuOpen((prev) => !prev)}
                className="p-2 rounded-full text-brand-charcoal-700 hover:bg-brand-cream-200 transition-colors"
                aria-label="User account"
              >
                <User className="w-5 h-5" />
              </button>

              {isAccountMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-brand-cream-300 p-2 z-50 animate-slide-down">
                  {user ? (
                    <div className="p-3 border-b border-brand-cream-200 mb-1">
                      <p className="text-xs text-brand-charcoal-500">Signed in as</p>
                      <p className="text-sm font-bold text-brand-charcoal-900 truncate">
                        {user.full_name || user.email}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-brand-forest-50 text-brand-forest-800">
                        {user.role}
                      </span>
                    </div>
                  ) : (
                    <div className="p-3 border-b border-brand-cream-200 mb-1">
                      <p className="text-sm font-bold text-brand-charcoal-900">
                        Welcome to KURA
                      </p>
                      <p className="text-xs text-brand-charcoal-500">
                        Sign in for order tracking & rewards
                      </p>
                    </div>
                  )}

                  <div className="space-y-1">
                    <Link
                      href="/account"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-brand-charcoal-700 hover:bg-brand-cream-100"
                    >
                      <Package className="w-4 h-4 text-brand-forest-700" />
                      Orders & Addresses
                    </Link>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-brand-forest-800 bg-brand-forest-50 hover:bg-brand-forest-100"
                      >
                        <ShieldCheck className="w-4 h-4 text-brand-forest-700" />
                        Admin Dashboard
                      </Link>
                    )}

                    {!user ? (
                      <div className="pt-2 border-t border-brand-cream-200 space-y-1">
                        <button
                          onClick={() => {
                            demoLoginAsCustomer();
                            setIsAccountMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-white bg-brand-forest-800 hover:bg-brand-forest-900 transition-colors"
                        >
                          Sign in as Demo Customer
                        </button>
                        <button
                          onClick={() => {
                            demoLoginAsAdmin();
                            setIsAccountMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-brand-forest-900 bg-brand-cream-200 hover:bg-brand-cream-300 transition-colors"
                        >
                          Sign in as Demo Admin
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          signOut();
                          setIsAccountMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Cart Trigger Button */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-brand-forest-800 text-white hover:bg-brand-forest-900 transition-colors shadow-sm relative group"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="text-xs font-bold hidden md:inline">Cart</span>
              <span className="w-5 h-5 rounded-full bg-brand-amber-500 text-brand-forest-950 text-xs font-extrabold flex items-center justify-center">
                {itemCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}

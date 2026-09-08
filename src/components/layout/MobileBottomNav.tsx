'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  LayoutGrid,
  Heart,
  ShoppingBag,
  User,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAdmin } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Do not show bottom nav on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const isHome = pathname === '/';
  const isCatalog = pathname.startsWith('/products') || pathname.startsWith('/category');
  const isWishlist = pathname.startsWith('/wishlist');
  const isAccount = pathname.startsWith('/account') || pathname.startsWith('/login') || pathname.startsWith('/register');

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg border-t border-brand-cream-300 dark:border-zinc-800 transition-colors duration-200 select-none pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_16px_rgba(0,0,0,0.4)]"
    >
      <div className="grid grid-cols-5 h-14 max-w-lg mx-auto items-center px-1">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            isHome
              ? 'text-brand-forest-900 dark:text-emerald-400 font-bold'
              : 'text-brand-charcoal-500 dark:text-zinc-400 hover:text-brand-forest-800 dark:hover:text-zinc-200'
          }`}
        >
          <div className="relative">
            <Home className={`w-5 h-5 transition-transform ${isHome ? 'scale-110' : ''}`} />
            {isHome && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-forest-800 dark:bg-emerald-400 rounded-full" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Home</span>
        </Link>

        {/* 2. Categories / Explore */}
        <Link
          href="/products"
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            isCatalog
              ? 'text-brand-forest-900 dark:text-emerald-400 font-bold'
              : 'text-brand-charcoal-500 dark:text-zinc-400 hover:text-brand-forest-800 dark:hover:text-zinc-200'
          }`}
        >
          <div className="relative">
            <LayoutGrid className={`w-5 h-5 transition-transform ${isCatalog ? 'scale-110' : ''}`} />
            {isCatalog && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-forest-800 dark:bg-emerald-400 rounded-full" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Explore</span>
        </Link>

        {/* 3. Wishlist */}
        <Link
          href="/wishlist"
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all relative ${
            isWishlist
              ? 'text-brand-forest-900 dark:text-emerald-400 font-bold'
              : 'text-brand-charcoal-500 dark:text-zinc-400 hover:text-brand-forest-800 dark:hover:text-zinc-200'
          }`}
        >
          <div className="relative">
            <Heart className={`w-5 h-5 transition-transform ${isWishlist ? 'scale-110 fill-rose-500 text-rose-500' : ''}`} />
            {mounted && wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-rose-500 text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs">
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </span>
            )}
            {isWishlist && !mounted && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-forest-800 dark:bg-emerald-400 rounded-full" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Wishlist</span>
        </Link>

        {/* 4. Cart */}
        <button
          type="button"
          onClick={openCart}
          aria-label="Open Shopping Bag"
          className="flex flex-col items-center justify-center py-1 rounded-xl text-brand-charcoal-500 dark:text-zinc-400 hover:text-brand-forest-800 dark:hover:text-zinc-200 transition-all relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 transition-transform hover:scale-110 active:scale-95" />
            {mounted && itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-brand-forest-800 dark:bg-emerald-500 text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Bag</span>
        </button>

        {/* 5. Account / Admin */}
        <Link
          href={mounted && user ? '/account' : '/login'}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            isAccount
              ? 'text-brand-forest-900 dark:text-emerald-400 font-bold'
              : 'text-brand-charcoal-500 dark:text-zinc-400 hover:text-brand-forest-800 dark:hover:text-zinc-200'
          }`}
        >
          <div className="relative">
            {mounted && isAdmin ? (
              <ShieldCheck className={`w-5 h-5 text-emerald-600 dark:text-emerald-400 transition-transform ${isAccount ? 'scale-110' : ''}`} />
            ) : mounted && user ? (
              <div className="w-5 h-5 rounded-full bg-brand-forest-800 text-white text-[10px] font-bold flex items-center justify-center uppercase">
                {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
              </div>
            ) : (
              <User className={`w-5 h-5 transition-transform ${isAccount ? 'scale-110' : ''}`} />
            )}
            {isAccount && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-forest-800 dark:bg-emerald-400 rounded-full" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1 truncate max-w-[50px]">
            {mounted && user ? 'Account' : 'Sign In'}
          </span>
        </Link>
      </div>
    </nav>
  );
}

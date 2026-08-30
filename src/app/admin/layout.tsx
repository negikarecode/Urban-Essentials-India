'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingBag,
  Tag,
  Star,
  Layers,
  ArrowLeft,
  ShieldCheck,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isAdmin, demoLoginAsAdmin, signOut } = useAuth();

  const NAV_ITEMS = [
    { href: '/admin', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/inventory', label: 'Inventory', icon: Boxes },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { href: '/admin/coupons', label: 'Coupons', icon: Tag },
    { href: '/admin/reviews', label: 'Reviews', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-brand-cream-100 flex flex-col">
      {/* Admin Top Header */}
      <header className="bg-brand-forest-950 text-white border-b border-brand-forest-900 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs text-brand-cream-300 hover:text-white transition-colors mr-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </Link>
            <div className="h-4 w-px bg-brand-forest-800" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-brand-forest-800 flex items-center justify-center font-serif font-bold text-sm">
                K
              </div>
              <span className="font-serif font-bold text-base tracking-tight">
                KURA Admin Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-brand-cream-300 hidden sm:inline">
                  Admin: <strong className="text-white">{user?.email}</strong>
                </span>
                <button
                  onClick={signOut}
                  className="px-3 py-1.5 rounded-lg bg-brand-forest-900 hover:bg-rose-950 text-rose-300 hover:text-rose-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit Admin</span>
                </button>
              </div>
            ) : (
              <button
                onClick={demoLoginAsAdmin}
                className="px-3.5 py-1.5 rounded-xl bg-brand-amber-500 hover:bg-brand-amber-600 text-brand-forest-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enable Admin Privileges</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="bg-white rounded-3xl p-4 border border-brand-cream-300 shadow-xs space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-brand-forest-800 text-white shadow-sm'
                      : 'text-brand-charcoal-700 hover:bg-brand-cream-100 hover:text-brand-forest-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="p-4 bg-brand-forest-900 text-white rounded-3xl space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-brand-amber-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Security & RLS Active</span>
            </div>
            <p className="text-brand-cream-300 text-[11px] leading-relaxed">
              Price recalculations, stock deductions, and HMAC signatures are strictly enforced server-side.
            </p>
          </div>
        </aside>

        {/* Main Content View */}
        <main className="lg:col-span-9">{children}</main>
      </div>
    </div>
  );
}

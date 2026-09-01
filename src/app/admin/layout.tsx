'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingBag,
  Users,
  Tag,
  Star,
  ArrowLeft,
  ShieldCheck,
  LogOut,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  Menu,
  X,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLiveProducts } from '@/lib/productStore';
import { useLiveOrders } from '@/lib/orderStore';
import { useLiveReviews } from '@/lib/reviewStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isAdmin, isLoading, requestAdminOtp, verifyAdminOtp, signOut } = useAuth();
  const { products } = useLiveProducts();
  const { orders } = useLiveOrders();
  const { reviews } = useLiveReviews();

  // Login Gate State (Step 1: credentials, Step 2: OTP 2FA)
  const [loginStep, setLoginStep] = useState<'credentials' | 'otp'>('credentials');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [emailDelivered, setEmailDelivered] = useState<boolean | null>(null);

  // Dynamic badge counts
  const lowStockCount = products.filter((p) => p.stock_quantity <= (p.low_stock_threshold || 10)).length;
  const pendingOrdersCount = orders.filter((o) => o.order_status === 'pending' || o.order_status === 'processing').length;
  const pendingReviewsCount = reviews.filter((r) => r.status === 'pending').length;

  const NAV_ITEMS = [
    { href: '/admin', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Package, badge: products.length },
    {
      href: '/admin/inventory',
      label: 'Inventory',
      icon: Boxes,
      badge: lowStockCount > 0 ? `${lowStockCount} Low` : undefined,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      href: '/admin/orders',
      label: 'Orders',
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} New` : `${orders.length}`,
      badgeColor: pendingOrdersCount > 0 ? 'bg-rose-100 text-rose-900 border-rose-300 font-extrabold' : undefined,
    },
    { href: '/admin/customers', label: 'Customers', icon: Users },
    { href: '/admin/coupons', label: 'Coupons', icon: Tag },
    {
      href: '/admin/reviews',
      label: 'Reviews',
      icon: Star,
      badge: pendingReviewsCount > 0 ? `${pendingReviewsCount} Pending` : undefined,
      badgeColor: 'bg-amber-100 text-amber-900',
    },
  ];

  // Step 1: Submit Credentials & Request OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!adminEmail || !adminPassword) {
      setAuthError('Please provide both administrator email and password.');
      return;
    }

    setIsSubmitting(true);
    const result = await requestAdminOtp(adminEmail, adminPassword);
    setIsSubmitting(false);

    if (result.success) {
      setLoginStep('otp');
      setEmailDelivered(!!result.emailDelivered);

      if (result.emailDelivered) {
        toast.success(`OTP verification code sent to ${adminEmail}`);
      } else {
        toast.warning(result.error || 'OTP generated. Please check your inbox.');
      }
    } else {
      setAuthError(result.error || 'Invalid administrator credentials.');
    }
  };

  // Step 2: Submit OTP & Verify
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!otpCode || otpCode.trim().length !== 6) {
      setAuthError('Please enter the 6-digit OTP code sent to your email.');
      return;
    }

    setIsSubmitting(true);
    const result = await verifyAdminOtp(adminEmail, otpCode.trim());
    setIsSubmitting(false);

    if (!result.success) {
      setAuthError(result.error || 'Invalid or expired OTP code. Please check your email and try again.');
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setAuthError('');
    setIsSubmitting(true);
    const result = await requestAdminOtp(adminEmail, adminPassword);
    setIsSubmitting(false);

    if (result.success) {
      setEmailDelivered(!!result.emailDelivered);
      toast.success(`A fresh OTP has been sent to ${adminEmail}`);
    } else {
      setAuthError(result.error || 'Failed to resend OTP.');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-cream-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-brand-forest-800 animate-spin" />
          <p className="text-xs font-semibold text-brand-charcoal-600">Verifying administrator authorization...</p>
        </div>
      </div>
    );
  }

  // Not authenticated as Admin: Show Protected 2-Step OTP Login Gate
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-brand-forest-950 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-3xl p-8 sm:p-10 shadow-2xl border border-brand-forest-800 dark:border-zinc-800 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-brand-forest-800 dark:bg-emerald-900 rounded-2xl mx-auto flex items-center justify-center text-brand-amber-400 shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="font-serif font-extrabold text-2xl text-brand-forest-950 dark:text-white">
              Admin Portal
            </h1>
            <p className="text-xs text-brand-charcoal-500 dark:text-zinc-400">
              {loginStep === 'credentials'
                ? 'Authorized admin credentials and 2FA OTP verification required.'
                : `Enter the 6-digit verification OTP sent to ${adminEmail}`}
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {loginStep === 'credentials' ? (
            /* Step 1: Admin Credentials Form */
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                  Admin Email
                </label>
                <Input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  leftIcon={<Mail className="w-4 h-4 text-brand-charcoal-400" />}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                  Admin Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    leftIcon={<Lock className="w-4 h-4 text-brand-charcoal-400" />}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal-400 hover:text-brand-charcoal-700 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                variant="primary"
                isLoading={isSubmitting}
                className="w-full shadow-md font-bold text-xs"
              >
                Send Verification OTP
              </Button>
            </form>
          ) : (
            /* Step 2: 6-Digit OTP Verification Form */
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              {emailDelivered === true && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                  <span>OTP email dispatched to your inbox. Check spam if not received.</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1 text-center">
                  6-Digit OTP Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoFocus
                  required
                  placeholder="••••••"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full text-center tracking-[0.4em] font-mono text-2xl font-bold py-3.5 px-4 rounded-xl border-2 border-brand-forest-700 dark:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-brand-forest-800 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                variant="primary"
                isLoading={isSubmitting}
                className="w-full shadow-md font-bold text-xs"
              >
                Verify & Enter Admin Portal
              </Button>

              <div className="flex items-center justify-between text-xs pt-2">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isSubmitting}
                  className="text-brand-forest-800 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Resend OTP</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLoginStep('credentials');
                    setOtpCode('');
                    setAuthError('');
                  }}
                  className="text-brand-charcoal-500 hover:text-brand-charcoal-800 dark:text-zinc-400 hover:underline"
                >
                  Change Credentials
                </button>
              </div>
            </form>
          )}

          <div className="text-center pt-2 border-t border-brand-cream-300 dark:border-zinc-800">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-forest-800 dark:text-emerald-400 hover:text-brand-forest-950 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Store</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard Layout
  return (
    <div className="min-h-screen bg-brand-cream-100 dark:bg-zinc-950 flex flex-col">
      {/* Admin Top Header */}
      <header className="bg-brand-forest-950 dark:bg-zinc-900 text-white border-b border-brand-forest-900 dark:border-zinc-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs text-brand-cream-300 hover:text-white transition-colors mr-2"
              title="Open customer storefront in a new view"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Storefront</span>
            </Link>
            <div className="h-4 w-px bg-brand-forest-800 dark:bg-zinc-800" />
            <Link href="/admin" className="flex items-center gap-2 font-serif font-bold text-lg text-white">
              <span className="w-7 h-7 rounded-lg bg-brand-forest-800 text-brand-amber-400 flex items-center justify-center text-xs font-serif font-extrabold border border-brand-forest-700">
                U
              </span>
              <span>Urban Essentials <span className="text-xs font-sans font-normal text-brand-cream-300 px-1.5 py-0.5 rounded-full bg-brand-forest-900 border border-brand-forest-800">Admin</span></span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-brand-cream-300">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[11px]">{user?.email || 'Admin'}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="text-xs text-white border-white/20 hover:bg-white/10"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" />
              <span>Logout</span>
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-brand-cream-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Sub-Navigation */}
      <div className="bg-white dark:bg-zinc-900 border-b border-brand-cream-300 dark:border-zinc-800 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 scrollbar-none">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-brand-forest-800 text-white shadow-xs'
                      : 'text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 hover:text-brand-forest-950 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-amber-300' : 'text-brand-charcoal-500 dark:text-zinc-400'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold border ${
                        item.badgeColor || (isActive ? 'bg-brand-forest-900 text-white border-brand-forest-700' : 'bg-brand-cream-200 text-brand-charcoal-800 border-brand-cream-300')
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

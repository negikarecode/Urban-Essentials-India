'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, ArrowRight, Sparkles, ShieldCheck, Eye, EyeOff, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/account';

  const { signInWithEmail, demoLoginAsCustomer, demoLoginAsAdmin, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!email || !password) {
      setFormError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    const result = await signInWithEmail(email, password);
    setIsSubmitting(false);

    if (result.success) {
      router.push(redirectTo);
    } else if (result.error) {
      setFormError(result.error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-brand-cream-300 shadow-xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-brand-forest-800 flex items-center justify-center text-white font-serif font-bold text-xl shadow-md">
              U
            </div>
            <span className="font-serif font-extrabold text-2xl tracking-tight text-brand-forest-950">
              Urban Essentials
            </span>
          </Link>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-brand-forest-950 pt-2">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-brand-charcoal-500">
            Sign in to access your orders, saved addresses, and wishlist.
          </p>
        </div>

        {/* Demo Fast Login Pills */}
        <div className="bg-brand-cream-100 p-3.5 rounded-2xl border border-brand-cream-300 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-forest-900 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-amber-500" />
            <span>1-Click Demo Login</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                demoLoginAsCustomer();
                router.push(redirectTo);
              }}
              className="px-3 py-2 bg-white rounded-xl text-xs font-bold text-brand-forest-800 border border-brand-cream-300 hover:bg-brand-forest-50 transition-colors text-center shadow-xs"
            >
              Demo Customer
            </button>
            <button
              type="button"
              onClick={() => {
                demoLoginAsAdmin();
                router.push('/admin');
              }}
              className="px-3 py-2 bg-brand-forest-800 rounded-xl text-xs font-bold text-white hover:bg-brand-forest-900 transition-colors text-center shadow-xs"
            >
              Demo Admin
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl animate-fade-in">
              {formError}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
              Email Address
            </label>
            <Input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4 text-brand-charcoal-400" />}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-brand-charcoal-700 uppercase">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-brand-forest-700 hover:text-brand-forest-900"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            isLoading={isSubmitting || isLoading}
            className="w-full shadow-md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Sign In
          </Button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-brand-cream-300">
          <p className="text-xs text-brand-charcoal-600">
            Don&apos;t have an account yet?{' '}
            <Link
              href={`/register?redirectTo=${encodeURIComponent(redirectTo)}`}
              className="font-bold text-brand-forest-800 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Trust badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-brand-charcoal-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Protected with Supabase 256-bit Encryption</span>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}

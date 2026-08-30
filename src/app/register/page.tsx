'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Eye, EyeOff, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/account';

  const { signUpWithEmail, isLoading } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName || !email || !password) {
      setFormError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    const result = await signUpWithEmail(email, password, fullName);
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
              K
            </div>
            <span className="font-serif font-extrabold text-2xl tracking-tight text-brand-forest-950">
              KURA
            </span>
          </Link>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-brand-forest-950 pt-2">
            Create Your Account
          </h1>
          <p className="text-xs sm:text-sm text-brand-charcoal-500">
            Join KURA to track orders, save multiple addresses, and enjoy faster checkout.
          </p>
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
              Full Name *
            </label>
            <Input
              type="text"
              required
              placeholder="e.g. Aryan Sharma"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              leftIcon={<User className="w-4 h-4 text-brand-charcoal-400" />}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
              Email Address *
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
            <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
              Password (Min 6 Characters) *
            </label>
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

          <div>
            <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
              Confirm Password *
            </label>
            <Input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4 text-brand-charcoal-400" />}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            variant="primary"
            isLoading={isSubmitting || isLoading}
            className="w-full shadow-md mt-2"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Create Account
          </Button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-brand-cream-300">
          <p className="text-xs text-brand-charcoal-600">
            Already have an account?{' '}
            <Link
              href={`/login?redirectTo=${encodeURIComponent(redirectTo)}`}
              className="font-bold text-brand-forest-800 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Trust badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-brand-charcoal-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>By signing up you agree to our Terms & Privacy Policy</span>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}

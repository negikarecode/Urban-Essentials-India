'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ForgotPasswordPage() {
  const { resetPassword, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!email) {
      setFormError('Please enter your email address.');
      return;
    }

    setIsSubmitting(true);
    const result = await resetPassword(email);
    setIsSubmitting(false);

    if (result.success) {
      setIsSent(true);
    } else if (result.error) {
      setFormError(result.error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 p-8 sm:p-10 rounded-3xl border border-brand-cream-300 dark:border-zinc-800 shadow-xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-brand-forest-800 text-white font-serif font-bold text-xl shadow-md">
              U
            </div>
            <span className="font-serif font-extrabold text-2xl tracking-tight text-brand-forest-950 dark:text-white">
              Urban Essentials
            </span>
          </Link>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-brand-forest-950 dark:text-white pt-2">
            Reset Your Password
          </h1>
          <p className="text-xs sm:text-sm text-brand-charcoal-500 dark:text-zinc-400">
            Enter your registered email address and we&apos;ll send you instructions to reset your password.
          </p>
        </div>

        {isSent ? (
          <div className="p-6 bg-brand-forest-50 dark:bg-zinc-900 border border-brand-forest-200 dark:border-zinc-800 rounded-2xl text-center space-y-3 animate-fade-in">
            <CheckCircle2 className="w-10 h-10 text-brand-forest-800 dark:text-emerald-400 mx-auto" />
            <h3 className="font-serif font-bold text-base text-brand-forest-950 dark:text-white">
              Check Your Inbox
            </h3>
            <p className="text-xs text-brand-charcoal-700 dark:text-zinc-300 leading-relaxed">
              We&apos;ve sent a password reset link to <strong className="text-brand-forest-950 dark:text-white">{email}</strong>. Please check your spam or junk folder if it doesn&apos;t arrive within 2 minutes.
            </p>
            <div className="pt-2">
              <Link href="/login">
                <Button variant="primary" size="sm">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-semibold rounded-xl animate-fade-in">
                {formError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                Email Address
              </label>
              <Input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4 text-brand-charcoal-400 dark:text-zinc-500" />}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              variant="primary"
              isLoading={isSubmitting || isLoading}
              className="w-full shadow-md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Send Reset Link
            </Button>
          </form>
        )}

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-brand-cream-300 dark:border-zinc-800">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-forest-800 dark:text-emerald-400 hover:text-brand-forest-950 dark:hover:text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>

        {/* Trust badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-brand-charcoal-400 dark:text-zinc-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Encrypted Password Recovery Protocol</span>
        </div>
      </div>
    </div>
  );
}

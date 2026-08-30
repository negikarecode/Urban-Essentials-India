'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success('Thank you for subscribing! Your 10% coupon code is WELCOME10.');
    }, 600);
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-brand-cream-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-forest-100 text-brand-forest-900 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-brand-forest-700" />
          <span>Join the KURA Inner Circle</span>
        </div>

        <div className="space-y-2">
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-brand-forest-950">
            Enjoy 10% Off Your First Order
          </h2>
          <p className="text-xs sm:text-sm text-brand-charcoal-600 max-w-lg mx-auto leading-relaxed">
            Subscribe for early access to limited edition color drops, back-to-campus sales, and daily organization guides.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-6 bg-brand-forest-50 border border-brand-forest-200 rounded-3xl max-w-md mx-auto space-y-2 animate-scale-in">
            <CheckCircle2 className="w-8 h-8 text-brand-forest-800 mx-auto" />
            <h4 className="font-serif font-bold text-base text-brand-forest-950">
              You&apos;re on the list!
            </h4>
            <p className="text-xs text-brand-charcoal-700">
              Use code <strong className="font-mono text-brand-forest-900">WELCOME10</strong> at checkout for 10% off.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <div className="relative w-full">
              <Mail className="w-4 h-4 text-brand-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-xl border border-brand-cream-400 bg-brand-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-forest-700 placeholder:text-brand-charcoal-400 text-brand-charcoal-900"
              />
            </div>
            <Button
              type="submit"
              size="md"
              variant="primary"
              isLoading={isLoading}
              className="w-full sm:w-auto shrink-0"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Subscribe
            </Button>
          </form>
        )}

        <p className="text-[11px] text-brand-charcoal-400">
          No spam, ever. Unsubscribe anytime with a single click.
        </p>

      </div>
    </section>
  );
}

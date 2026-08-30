import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <Container className="py-24 text-center max-w-lg mx-auto space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-brand-cream-200 text-brand-forest-800 flex items-center justify-center mx-auto border border-brand-cream-300 shadow-sm">
        <Compass className="w-10 h-10 animate-spin-slow" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-brand-forest-700 uppercase tracking-widest">
          404 Error
        </span>
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-brand-forest-950">
          Page Not Found
        </h1>
        <p className="text-sm text-brand-charcoal-600 leading-relaxed">
          The page or product category you were looking for doesn&apos;t exist or may have moved.
        </p>
      </div>

      <div className="flex justify-center gap-3 pt-2">
        <Link href="/">
          <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Return to Homepage
          </Button>
        </Link>
        <Link href="/products">
          <Button variant="outline">Browse Catalog</Button>
        </Link>
      </div>
    </Container>
  );
}

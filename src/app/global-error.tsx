'use client';

import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-brand-cream-50 dark:bg-zinc-950 text-brand-charcoal-900 dark:text-zinc-100 min-h-screen flex items-center justify-center p-4 transition-colors">
        <div className="text-center max-w-md space-y-4 bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-brand-cream-300 dark:border-zinc-800 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-brand-forest-950 dark:text-white">
            Critical Application Error
          </h2>
          <p className="text-xs text-brand-charcoal-600 dark:text-zinc-400">
            A critical error interrupted the page render. Click below to recover.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 mx-auto transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reload Application</span>
          </button>
        </div>
      </body>
    </html>
  );
}

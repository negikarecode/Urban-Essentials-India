import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export function LoadingSpinner({
  size = 'md',
  text,
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center space-y-3',
        className
      )}
    >
      <Loader2
        className={cn(
          'animate-spin text-brand-forest-800 dark:text-emerald-400',
          sizeClasses[size]
        )}
      />
      {text && (
        <p className="text-xs font-semibold text-brand-charcoal-600 dark:text-zinc-400">
          {text}
        </p>
      )}
    </div>
  );
}

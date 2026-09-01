import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'forest'
    | 'sage'
    | 'amber'
    | 'success'
    | 'warning'
    | 'destructive'
    | 'outline';
  size?: 'sm' | 'md';
}

export function Badge({
  className,
  variant = 'default',
  size = 'sm',
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-brand-cream-200 dark:bg-zinc-800 text-brand-charcoal-800 dark:text-zinc-200 border-brand-cream-300 dark:border-zinc-700',
    forest: 'bg-brand-forest-800 text-white border-transparent shadow-xs',
    sage: 'bg-brand-sage-100 dark:bg-zinc-800 text-brand-sage-900 dark:text-emerald-300 border-brand-sage-200 dark:border-zinc-700',
    amber: 'bg-brand-amber-500 text-brand-forest-950 border-brand-amber-600 font-extrabold shadow-xs',
    success: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    warning: 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    destructive: 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    outline: 'bg-transparent text-brand-charcoal-700 dark:text-zinc-300 border-brand-cream-400 dark:border-zinc-700',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px] rounded-md font-bold tracking-wide',
    md: 'px-2.5 py-1 text-xs rounded-lg font-bold tracking-wide',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center uppercase border transition-colors select-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

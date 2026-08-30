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
    default: 'bg-brand-cream-200 text-brand-charcoal-800 border-brand-cream-300',
    forest: 'bg-brand-forest-800 text-white border-transparent shadow-xs',
    sage: 'bg-brand-sage-100 text-brand-sage-900 border-brand-sage-200',
    amber: 'bg-brand-amber-500 text-brand-forest-950 border-brand-amber-600 font-extrabold shadow-xs',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-900 border-amber-200',
    destructive: 'bg-rose-50 text-rose-800 border-rose-200',
    outline: 'bg-transparent text-brand-charcoal-700 border-brand-cream-400',
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

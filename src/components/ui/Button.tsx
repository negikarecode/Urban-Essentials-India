'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary:
        'bg-brand-forest-800 hover:bg-brand-forest-900 text-white shadow-sm focus-visible:ring-brand-forest-700 active:bg-brand-forest-950',
      secondary:
        'bg-brand-cream-200 dark:bg-zinc-800 text-brand-forest-950 dark:text-zinc-100 hover:bg-brand-cream-300 dark:hover:bg-zinc-700 border border-brand-cream-300 dark:border-zinc-700 focus-visible:ring-brand-cream-400',
      outline:
        'bg-white dark:bg-zinc-900 text-brand-forest-900 dark:text-zinc-100 border border-brand-cream-400 dark:border-zinc-700 hover:bg-brand-cream-100 dark:hover:bg-zinc-800 hover:border-brand-forest-700 dark:hover:border-emerald-500 focus-visible:ring-brand-forest-700',
      ghost:
        'text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 hover:text-brand-forest-900 dark:hover:text-white focus-visible:ring-brand-forest-700',
      destructive:
        'bg-rose-600 text-white hover:bg-rose-700 shadow-sm focus-visible:ring-rose-500',
      accent:
        'bg-brand-amber-500 text-brand-forest-950 hover:bg-brand-amber-600 font-extrabold shadow-sm focus-visible:ring-brand-amber-400',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
      md: 'px-4 py-2.5 text-xs sm:text-sm rounded-xl gap-2',
      lg: 'px-6 py-3.5 text-sm sm:text-base rounded-2xl gap-2.5 font-bold',
      icon: 'p-2 rounded-xl text-xs flex items-center justify-center',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
            <span>{children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

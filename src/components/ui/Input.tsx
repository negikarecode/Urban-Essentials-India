import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase tracking-wider"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-brand-charcoal-400 dark:text-zinc-500 pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              'w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border bg-brand-cream-50 dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 placeholder:text-brand-charcoal-400 dark:placeholder:text-zinc-500 transition-all duration-200 focus:bg-white dark:focus:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-brand-forest-700 dark:focus:ring-emerald-500 disabled:opacity-50 disabled:bg-brand-cream-200 dark:disabled:bg-zinc-900',
              leftIcon ? 'pl-10' : '',
              rightIcon ? 'pr-10' : '',
              error
                ? 'border-rose-500 focus:ring-rose-500'
                : 'border-brand-cream-400 dark:border-zinc-700 hover:border-brand-charcoal-400 dark:hover:border-zinc-500',
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3.5 text-brand-charcoal-400 dark:text-zinc-500 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 animate-fade-in">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="text-[11px] text-brand-charcoal-500 dark:text-zinc-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

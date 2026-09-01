'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-full bg-brand-cream-200/50 dark:bg-zinc-800 animate-pulse ${className}`}
      />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center justify-center p-2 rounded-full text-brand-charcoal-700 dark:text-zinc-300 hover:text-brand-forest-950 dark:hover:text-white hover:bg-brand-cream-200/70 dark:hover:bg-zinc-800 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest-800 ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={`w-5 h-5 text-amber-500 transition-all duration-300 transform ${
            isDark
              ? 'scale-0 rotate-90 opacity-0 absolute'
              : 'scale-100 rotate-0 opacity-100'
          }`}
        />
        <Moon
          className={`w-5 h-5 text-sky-400 transition-all duration-300 transform ${
            isDark
              ? 'scale-100 rotate-0 opacity-100'
              : 'scale-0 -rotate-90 opacity-0 absolute'
          }`}
        />
      </div>

      {showLabel && (
        <span className="ml-2 text-xs font-semibold select-none">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </button>
  );
}

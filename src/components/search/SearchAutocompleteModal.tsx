'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Package,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { SearchResultItem, searchProducts } from '@/lib/search';
import { formatCurrency } from '@/lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  'Water Bottle',
  'Backpack',
  'Lunch Box',
  'Insulated Flask',
  'Laptop Bag',
  'Food Jar',
];

export function SearchAutocompleteModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
      setSelectedIndex(-1);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Debounced search query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const handler = setTimeout(() => {
      const matched = searchProducts(query, 6);
      setResults(matched);
      setIsLoading(false);
      setSelectedIndex(-1);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Keyboard navigation listener (ArrowUp, ArrowDown, Enter, Escape)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && results[selectedIndex]) {
        e.preventDefault();
        router.push(`/products/${results[selectedIndex].slug}`);
        onClose();
      } else if (query.trim()) {
        e.preventDefault();
        router.push(`/products?q=${encodeURIComponent(query.trim())}`);
        onClose();
      }
    }
  };

  const handleSelectPopular = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-start justify-center p-4 sm:p-6 md:p-12">
        <div
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-brand-cream-300 overflow-hidden z-10 animate-slide-up"
          onKeyDown={handleKeyDown}
        >
          {/* Search Input Bar */}
          <div className="p-4 sm:p-5 border-b border-brand-cream-300 flex items-center gap-3 bg-brand-cream-50/70">
            <Search className="w-5 h-5 text-brand-forest-800 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search lunch boxes, bottles, bags, notebooks, desk gear..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-sm sm:text-base text-brand-charcoal-900 placeholder-brand-charcoal-400 bg-transparent focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-brand-charcoal-400 hover:bg-brand-cream-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-xs font-bold text-brand-charcoal-500 hover:text-brand-forest-900 px-2 py-1 bg-white rounded-lg border border-brand-cream-300 shadow-xs"
            >
              ESC
            </button>
          </div>

          {/* Body Section */}
          <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto space-y-5">
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center justify-center py-8 text-brand-forest-800 gap-2 text-xs font-semibold">
                <div className="w-4 h-4 border-2 border-brand-forest-800 border-t-transparent rounded-full animate-spin" />
                <span>Searching catalog...</span>
              </div>
            )}

            {/* When Query is empty: Show Popular & Quick Searches */}
            {!query.trim() && !isLoading && (
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-charcoal-500 uppercase tracking-wider">
                  <TrendingUp className="w-3.5 h-3.5 text-brand-forest-700" />
                  <span>Popular Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSelectPopular(term)}
                      className="px-3.5 py-1.5 rounded-xl bg-brand-cream-100 hover:bg-brand-cream-200 text-brand-forest-950 text-xs font-semibold border border-brand-cream-300 transition-colors flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-brand-amber-500" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-3 border-t border-brand-cream-200">
                  <span className="text-[11px] font-bold text-brand-charcoal-400 uppercase tracking-wider block mb-2">
                    Browse Categories
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <Link
                      href="/category/lunch-boxes"
                      onClick={onClose}
                      className="p-2.5 rounded-xl bg-white border border-brand-cream-300 hover:border-brand-forest-600 text-xs font-bold text-brand-charcoal-800 hover:text-brand-forest-900 transition-all flex items-center justify-between group"
                    >
                      <span>Lunch Boxes</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-brand-charcoal-400 group-hover:text-brand-forest-800" />
                    </Link>
                    <Link
                      href="/category/water-bottles"
                      onClick={onClose}
                      className="p-2.5 rounded-xl bg-white border border-brand-cream-300 hover:border-brand-forest-600 text-xs font-bold text-brand-charcoal-800 hover:text-brand-forest-900 transition-all flex items-center justify-between group"
                    >
                      <span>Water Bottles</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-brand-charcoal-400 group-hover:text-brand-forest-800" />
                    </Link>
                    <Link
                      href="/category/backpacks"
                      onClick={onClose}
                      className="p-2.5 rounded-xl bg-white border border-brand-cream-300 hover:border-brand-forest-600 text-xs font-bold text-brand-charcoal-800 hover:text-brand-forest-900 transition-all flex items-center justify-between group"
                    >
                      <span>Backpacks</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-brand-charcoal-400 group-hover:text-brand-forest-800" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Results List */}
            {query.trim() && !isLoading && results.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-brand-charcoal-500 font-semibold px-1">
                  <span>Matching Products ({results.length})</span>
                  <span className="text-[11px]">Use &uarr; &darr; to navigate</span>
                </div>

                <div className="divide-y divide-brand-cream-200">
                  {results.map((item, index) => (
                    <Link
                      key={item.id}
                      href={`/products/${item.slug}`}
                      onClick={onClose}
                      className={`flex items-center gap-3.5 p-3 rounded-2xl transition-all ${
                        selectedIndex === index
                          ? 'bg-brand-cream-200/80 shadow-xs'
                          : 'hover:bg-brand-cream-100'
                      }`}
                    >
                      {/* Image */}
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-brand-cream-100 border border-brand-cream-300 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="60px"
                          className="object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs sm:text-sm text-brand-charcoal-900 truncate">
                            {item.name}
                          </h4>
                          {item.category_name && (
                            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-brand-cream-200 text-brand-forest-800 shrink-0">
                              {item.category_name}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-extrabold text-brand-forest-950">
                            {formatCurrency(item.price)}
                          </span>
                          {item.compare_at_price && item.compare_at_price > item.price && (
                            <span className="text-[10px] text-brand-charcoal-400 line-through">
                              {formatCurrency(item.compare_at_price)}
                            </span>
                          )}
                          <span className="text-[10px] text-brand-charcoal-400 font-mono">
                            SKU: {item.sku}
                          </span>
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-brand-charcoal-400 shrink-0" />
                    </Link>
                  ))}
                </div>

                <div className="pt-3 text-center border-t border-brand-cream-200">
                  <Link
                    href={`/products?q=${encodeURIComponent(query.trim())}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-forest-800 hover:text-brand-forest-950"
                  >
                    <span>View all results for &quot;{query}&quot;</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* Empty State */}
            {query.trim() && !isLoading && results.length === 0 && (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-cream-200 flex items-center justify-center text-brand-charcoal-400 mx-auto">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-base text-brand-charcoal-900">
                  No products found for &quot;{query}&quot;
                </h3>
                <p className="text-xs text-brand-charcoal-500 max-w-sm mx-auto leading-relaxed">
                  Try searching for general keywords like <strong className="text-brand-charcoal-700">bottle</strong>, <strong className="text-brand-charcoal-700">lunch box</strong>, <strong className="text-brand-charcoal-700">backpack</strong>, or <strong className="text-brand-charcoal-700">notebook</strong>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setQuery('')}
                    className="px-4 py-2 bg-brand-forest-800 text-white rounded-xl text-xs font-bold hover:bg-brand-forest-900"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

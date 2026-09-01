'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  TrendingUp,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Package,
  Layers,
  Star,
} from 'lucide-react';
import { searchProducts, SearchResultItem } from '@/lib/search';
import { CATEGORIES } from '@/lib/data/products';
import { formatCurrency } from '@/lib/utils';

interface SearchBarDropdownProps {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  autoFocus?: boolean;
  onNavigate?: () => void;
  showCategoryPicker?: boolean;
}

const POPULAR_SEARCHES = [
  'Insulated Flask',
  'Bento Lunch Box',
  'Campus Backpack',
  'Water Bottle',
  'Desk Mat',
  'Orthopedic School Bag',
  'Dot-Grid Journal',
];

const RECENT_SEARCHES_KEY = 'urban_recent_searches_v1';

/**
 * Highlights matches of query string within product name
 */
function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <span>{text}</span>;

  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-brand-amber-100 text-brand-forest-950 font-black rounded-xs px-0.5"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

export function SearchBarDropdown({
  placeholder = 'Search bottles, bento lunchboxes, bags, notebooks...',
  className = '',
  inputClassName = '',
  autoFocus = false,
  onNavigate,
}: SearchBarDropdownProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Load recent searches on client mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setRecentSearches(parsed.slice(0, 5));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Save query to recent searches
  const saveRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    try {
      const updated = [trimmed, ...recentSearches.filter((t) => t.toLowerCase() !== trimmed.toLowerCase())].slice(0, 6);
      setRecentSearches(updated);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const clearRecentSearches = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch {
      // ignore
    }
  };

  const removeSingleRecentSearch = (e: React.MouseEvent, termToRemove: string) => {
    e.stopPropagation();
    const updated = recentSearches.filter((t) => t !== termToRemove);
    setRecentSearches(updated);
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search results calculation
  const searchResults: SearchResultItem[] = useMemo(() => {
    if (!query.trim()) return [];
    return searchProducts(query, 6);
  }, [query]);

  // Matching categories calculation
  const matchingCategories = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return CATEGORIES.filter((c) => c.name.toLowerCase().includes(q) || c.slug.includes(q)).slice(0, 2);
  }, [query]);

  const totalInteractiveItems = searchResults.length + (matchingCategories.length > 0 ? 1 : 0);

  // Submit search query to /products?q=...
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      saveRecentSearch(trimmed);
      setIsOpen(false);
      router.push(`/products?q=${encodeURIComponent(trimmed)}`);
      onNavigate?.();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < totalInteractiveItems - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalInteractiveItems - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
        const item = searchResults[selectedIndex];
        saveRecentSearch(item.name);
        setIsOpen(false);
        router.push(`/products/${item.slug}`);
        onNavigate?.();
      } else {
        handleSearchSubmit();
      }
    }
  };

  const handleSelectTerm = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
    setIsOpen(false);
    router.push(`/products?q=${encodeURIComponent(term)}`);
    onNavigate?.();
  };

  return (
    <>
      {/* Dimmed backdrop overlay when dropdown is open on desktop/mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/25 backdrop-blur-[2px] z-30 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div ref={containerRef} className={`relative z-40 ${className}`}>
        {/* Search Bar Input Container */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchSubmit();
          }}
          className={`relative flex items-center w-full rounded-full transition-all duration-200 bg-white dark:bg-zinc-900 border ${
            isOpen
              ? 'border-brand-forest-800 dark:border-emerald-500 ring-2 ring-brand-forest-800/20 dark:ring-emerald-500/20 shadow-lg'
              : 'border-brand-cream-400 dark:border-zinc-700 hover:border-brand-forest-600 dark:hover:border-zinc-500 shadow-2xs'
          } ${inputClassName}`}
        >
          {/* Search Icon */}
          <div className="pl-3.5 sm:pl-4 pr-2 text-brand-charcoal-400 dark:text-zinc-400 group-focus-within:text-brand-forest-800 dark:group-focus-within:text-emerald-400 transition-colors shrink-0">
            <Search className="w-4 h-4" />
          </div>

          {/* Actual Text Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            autoFocus={autoFocus}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full py-2 sm:py-2.5 pr-2 bg-transparent text-xs sm:text-sm text-brand-forest-950 dark:text-zinc-100 placeholder-brand-charcoal-400 dark:placeholder-zinc-500 focus:outline-none truncate"
            autoComplete="off"
            spellCheck="false"
          />

          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedIndex(-1);
                inputRef.current?.focus();
              }}
              className="p-1 mr-1 rounded-full text-brand-charcoal-400 dark:text-zinc-400 hover:text-brand-charcoal-700 dark:hover:text-zinc-200 hover:bg-brand-cream-200 dark:hover:bg-zinc-800 transition-colors shrink-0"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Search Action Button */}
          <button
            type="submit"
            className="mr-1.5 px-3 py-1.5 rounded-full bg-brand-forest-900 dark:bg-brand-forest-700 hover:bg-brand-forest-950 dark:hover:bg-brand-forest-600 text-white text-xs font-semibold flex items-center gap-1 transition-all shadow-xs shrink-0"
            aria-label="Search"
          >
            <span className="hidden sm:inline">Search</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </form>

        {/* Live Search Results Dropdown */}
        {isOpen && (
          <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-full sm:w-[480px] md:w-[540px] lg:w-[580px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-brand-cream-300 dark:border-zinc-800 overflow-hidden z-50 animate-slide-up origin-top">
            {/* 1. Empty query state: Recent & Popular Searches */}
            {!query.trim() && (
              <div className="p-4 sm:p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                {/* Recent Searches (if any) */}
                {recentSearches.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-brand-charcoal-500 dark:text-zinc-400 uppercase tracking-wider px-1">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand-forest-700 dark:text-emerald-400" />
                        Recent Searches
                      </span>
                      <button
                        type="button"
                        onClick={clearRecentSearches}
                        className="text-[10px] text-brand-charcoal-400 dark:text-zinc-400 hover:text-brand-forest-900 dark:hover:text-emerald-400 font-semibold hover:underline"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="divide-y divide-brand-cream-100 dark:divide-zinc-800">
                      {recentSearches.map((term) => (
                        <div
                          key={term}
                          onClick={() => handleSelectTerm(term)}
                          className="flex items-center justify-between py-2 px-2.5 rounded-xl hover:bg-brand-cream-50 dark:hover:bg-zinc-800/70 cursor-pointer text-xs font-medium text-brand-charcoal-800 dark:text-zinc-200 transition-colors group"
                        >
                          <span className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-brand-charcoal-400 dark:text-zinc-400 group-hover:text-brand-forest-800 dark:group-hover:text-emerald-400" />
                            <span>{term}</span>
                          </span>
                          <button
                            type="button"
                            onClick={(e) => removeSingleRecentSearch(e, term)}
                            className="p-1 text-brand-charcoal-300 dark:text-zinc-400 hover:text-brand-charcoal-700 dark:hover:text-zinc-200 rounded"
                            title="Remove"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular / Trending Searches */}
                <div className="space-y-2.5 pt-2 border-t border-brand-cream-200 dark:border-zinc-800">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-charcoal-500 dark:text-zinc-400 uppercase tracking-wider px-1">
                    <TrendingUp className="w-3.5 h-3.5 text-brand-forest-700 dark:text-emerald-400" />
                    <span>Trending Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {POPULAR_SEARCHES.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => handleSelectTerm(term)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-cream-100 dark:bg-zinc-800 hover:bg-brand-cream-200 dark:hover:bg-zinc-700 text-brand-forest-950 dark:text-zinc-100 text-xs font-semibold border border-brand-cream-300 dark:border-zinc-700 hover:border-brand-forest-600 dark:hover:border-emerald-500 transition-all group"
                      >
                        <Sparkles className="w-3 h-3 text-brand-amber-500 group-hover:rotate-12 transition-transform" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Categories Bar */}
                <div className="pt-3 border-t border-brand-cream-200 dark:border-zinc-800">
                  <span className="text-[10px] font-bold text-brand-charcoal-400 dark:text-zinc-500 uppercase tracking-wider block mb-2 px-1">
                    Popular Categories
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        onClick={() => {
                          setIsOpen(false);
                          onNavigate?.();
                        }}
                        className="p-2 rounded-xl bg-brand-cream-50/60 dark:bg-zinc-800/60 hover:bg-brand-forest-50 dark:hover:bg-zinc-800 border border-brand-cream-200 dark:border-zinc-700 hover:border-brand-forest-300 dark:hover:border-emerald-500 text-xs font-bold text-brand-charcoal-800 dark:text-zinc-200 hover:text-brand-forest-900 dark:hover:text-emerald-400 transition-all flex items-center justify-between group"
                      >
                        <span className="truncate">{cat.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-brand-charcoal-400 dark:text-zinc-400 group-hover:translate-x-0.5 group-hover:text-brand-forest-800 dark:group-hover:text-emerald-400 transition-all shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. Active Query Results State */}
            {query.trim() && (
              <div className="max-h-[75vh] overflow-y-auto">
                {/* Category Match Banner */}
                {matchingCategories.length > 0 && (
                  <div className="p-3 bg-brand-forest-50/80 dark:bg-brand-forest-950/70 border-b border-brand-cream-200 dark:border-zinc-800 flex flex-col gap-1.5">
                    {matchingCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        onClick={() => {
                          setIsOpen(false);
                          onNavigate?.();
                        }}
                        className="flex items-center justify-between text-xs text-brand-forest-900 dark:text-emerald-300 hover:text-brand-forest-950 dark:hover:text-white font-medium px-2 py-1 rounded-lg hover:bg-brand-forest-100/70 dark:hover:bg-brand-forest-900/60 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5 text-brand-forest-700 dark:text-emerald-400" />
                          <span>
                            Explore category:{' '}
                            <strong className="font-extrabold text-brand-forest-950 dark:text-white">{cat.name}</strong>
                          </span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-brand-forest-700 dark:text-emerald-400" />
                      </Link>
                    ))}
                  </div>
                )}

                {/* Products Result List */}
                {searchResults.length > 0 ? (
                  <div className="p-2 sm:p-3 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-brand-charcoal-500 dark:text-zinc-400 uppercase tracking-wider px-2 py-1">
                      <span>Products Related to &ldquo;{query}&rdquo; ({searchResults.length})</span>
                      <span className="hidden sm:inline-block text-[10px] text-brand-charcoal-400 dark:text-zinc-500 font-normal">
                        Press Enter to choose
                      </span>
                    </div>

                    <div className="divide-y divide-brand-cream-100 dark:divide-zinc-800">
                      {searchResults.map((item, idx) => {
                        const isSelected = selectedIndex === idx;
                        return (
                          <Link
                            key={item.id}
                            href={`/products/${item.slug}`}
                            onClick={() => {
                              saveRecentSearch(item.name);
                              setIsOpen(false);
                              onNavigate?.();
                            }}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={`flex items-center gap-3.5 p-2.5 rounded-xl transition-all ${
                              isSelected
                                ? 'bg-brand-forest-50/90 dark:bg-zinc-800/90 text-brand-forest-950 dark:text-white shadow-2xs ring-1 ring-brand-forest-900/20 dark:ring-emerald-500/30'
                                : 'hover:bg-brand-cream-50/80 dark:hover:bg-zinc-800/50 text-brand-charcoal-800 dark:text-zinc-200'
                            }`}
                          >
                            {/* Product Thumbnail */}
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-brand-cream-100 dark:bg-zinc-800 border border-brand-cream-300 dark:border-zinc-700 shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <h4 className="font-bold text-xs sm:text-sm text-brand-forest-950 dark:text-zinc-100 truncate">
                                  <HighlightMatch text={item.name} query={query} />
                                </h4>
                                {item.category_name && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-brand-cream-200 dark:bg-zinc-800 text-brand-forest-800 dark:text-emerald-400 shrink-0">
                                    {item.category_name}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-2 mt-0.5 text-xs">
                                <span className="font-extrabold text-brand-forest-900 dark:text-emerald-400">
                                  {formatCurrency(item.price)}
                                </span>
                                {item.variants_count && item.variants_count > 1 ? (
                                  <span className="hidden sm:inline-block text-[10px] text-brand-charcoal-500 dark:text-zinc-400 font-medium ml-auto">
                                    {item.variants_count} colors
                                  </span>
                                ) : null}
                              </div>
                            </div>

                            {/* Selection arrow */}
                            <div className="text-brand-charcoal-300 dark:text-zinc-500 group-hover:text-brand-forest-800 dark:group-hover:text-emerald-400 shrink-0 pr-1">
                              <ChevronRight
                                className={`w-4 h-4 transition-transform ${
                                  isSelected ? 'translate-x-0.5 text-brand-forest-900 dark:text-emerald-400' : ''
                                }`}
                              />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* No Products Found State */
                  <div className="p-8 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-brand-cream-200 dark:bg-zinc-800 flex items-center justify-center mx-auto text-brand-charcoal-500 dark:text-zinc-400">
                      <Package className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-brand-charcoal-900 dark:text-zinc-100">
                        No products found for &ldquo;{query}&rdquo;
                      </h4>
                      <p className="text-xs text-brand-charcoal-500 dark:text-zinc-400 max-w-xs mx-auto">
                        Check for typos, or search by generic terms like &ldquo;bottle&rdquo;, &ldquo;backpack&rdquo;, or &ldquo;lunch box&rdquo;.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        router.push('/products');
                        onNavigate?.();
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-forest-800 dark:text-emerald-400 hover:text-brand-forest-950 dark:hover:text-white underline"
                    >
                      <span>Browse all products catalog</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Footer Action: View All Results */}
                {searchResults.length > 0 && (
                  <div className="p-3 bg-brand-cream-50 dark:bg-zinc-950 border-t border-brand-cream-200 dark:border-zinc-800">
                    <button
                      type="button"
                      onClick={() => handleSearchSubmit()}
                      className="w-full py-2 px-3 rounded-xl bg-brand-forest-900 hover:bg-brand-forest-950 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
                    >
                      <span>See all results for &ldquo;{query}&rdquo;</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

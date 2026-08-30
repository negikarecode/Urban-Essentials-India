'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Filter, SlidersHorizontal, X, Search, RotateCcw, ChevronDown } from 'lucide-react';
import { Product, TargetAudience } from '@/types';
import { CATEGORIES } from '@/lib/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';

interface ProductCatalogClientProps {
  initialProducts: Product[];
}

export function ProductCatalogClient({ initialProducts }: ProductCatalogClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search Param Initializers
  const queryParam = searchParams.get('q') || '';
  const audienceParam = searchParams.get('audience') as TargetAudience | null;
  const categoryParam = searchParams.get('category') || '';
  const filterFlagParam = searchParams.get('filter') || ''; // 'bestseller' | 'new'

  // Local Filter States
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedAudience, setSelectedAudience] = useState<string>(audienceParam || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [priceMax, setPriceMax] = useState<number>(5000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyBestsellers, setOnlyBestsellers] = useState<boolean>(filterFlagParam === 'bestseller');
  const [onlyNewArrivals, setOnlyNewArrivals] = useState<boolean>(filterFlagParam === 'new');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter Computation
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchTag = product.tags.some((t) => t.toLowerCase().includes(q));
        const matchCat = product.category_name?.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchTag && !matchCat) return false;
      }

      // Audience filter
      if (selectedAudience !== 'all') {
        if (product.target_audience !== selectedAudience && product.target_audience !== 'all') {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all') {
        if (product.category_slug !== selectedCategory && product.category_id !== selectedCategory) {
          return false;
        }
      }

      // Price filter
      if (product.price > priceMax) return false;

      // In stock
      if (onlyInStock && product.stock_quantity <= 0) return false;

      // Bestseller flag
      if (onlyBestsellers && !product.is_bestseller) return false;

      // New arrival flag
      if (onlyNewArrivals && !product.is_new_arrival) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
    });
  }, [
    initialProducts,
    searchQuery,
    selectedAudience,
    selectedCategory,
    priceMax,
    onlyInStock,
    onlyBestsellers,
    onlyNewArrivals,
    sortBy,
  ]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedAudience !== 'all') count++;
    if (selectedCategory !== 'all') count++;
    if (priceMax < 5000) count++;
    if (onlyInStock) count++;
    if (onlyBestsellers) count++;
    if (onlyNewArrivals) count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [selectedAudience, selectedCategory, priceMax, onlyInStock, onlyBestsellers, onlyNewArrivals, searchQuery]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedAudience('all');
    setSelectedCategory('all');
    setPriceMax(5000);
    setOnlyInStock(false);
    setOnlyBestsellers(false);
    setOnlyNewArrivals(false);
    setSortBy('featured');
    router.push('/products');
  };

  const FilterSidebarContent = (
    <div className="space-y-6">
      {/* Reset & Header */}
      <div className="flex items-center justify-between pb-4 border-b border-brand-cream-300">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-forest-800" />
          <h3 className="font-serif font-bold text-base text-brand-forest-950">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-forest-800 text-white">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Target Audience Segment */}
      <div>
        <label className="block text-xs font-bold text-brand-charcoal-700 uppercase tracking-wider mb-2.5">
          Audience Segment
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'all', label: 'All Segments' },
            { id: 'school', label: '🎒 School' },
            { id: 'college', label: '💻 College' },
            { id: 'office', label: '💼 Office' },
          ].map((aud) => (
            <button
              key={aud.id}
              onClick={() => setSelectedAudience(aud.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left ${
                selectedAudience === aud.id
                  ? 'border-brand-forest-800 bg-brand-forest-50 text-brand-forest-900 font-bold shadow-xs'
                  : 'border-brand-cream-300 text-brand-charcoal-700 hover:bg-brand-cream-100'
              }`}
            >
              {aud.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-xs font-bold text-brand-charcoal-700 uppercase tracking-wider mb-2">
          Category
        </label>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-brand-forest-800 text-white font-bold'
                : 'text-brand-charcoal-700 hover:bg-brand-cream-200'
            }`}
          >
            All Categories ({initialProducts.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = initialProducts.filter(
              (p) => p.category_slug === cat.slug || p.category_id === cat.id
            ).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat.slug
                    ? 'bg-brand-forest-800 text-white font-bold'
                    : 'text-brand-charcoal-700 hover:bg-brand-cream-200'
                }`}
              >
                <span>{cat.name}</span>
                <span className="opacity-70 text-[11px]">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold text-brand-charcoal-700 uppercase tracking-wider mb-2">
          <span>Max Price</span>
          <span className="text-brand-forest-800 font-extrabold">₹{priceMax}</span>
        </div>
        <input
          type="range"
          min="400"
          max="5000"
          step="100"
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-brand-forest-800 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-brand-charcoal-400 mt-1 font-medium">
          <span>₹400</span>
          <span>₹2,500</span>
          <span>₹5,000</span>
        </div>
      </div>

      {/* Quick Toggles */}
      <div className="space-y-2.5 pt-2 border-t border-brand-cream-300">
        <label className="flex items-center gap-2.5 text-xs font-medium text-brand-charcoal-800 cursor-pointer">
          <input
            type="checkbox"
            checked={onlyBestsellers}
            onChange={(e) => setOnlyBestsellers(e.target.checked)}
            className="w-4 h-4 rounded text-brand-forest-800 focus:ring-brand-forest-800"
          />
          <span>Bestsellers Only</span>
        </label>
        <label className="flex items-center gap-2.5 text-xs font-medium text-brand-charcoal-800 cursor-pointer">
          <input
            type="checkbox"
            checked={onlyNewArrivals}
            onChange={(e) => setOnlyNewArrivals(e.target.checked)}
            className="w-4 h-4 rounded text-brand-forest-800 focus:ring-brand-forest-800"
          />
          <span>New Arrivals Only</span>
        </label>
        <label className="flex items-center gap-2.5 text-xs font-medium text-brand-charcoal-800 cursor-pointer">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="w-4 h-4 rounded text-brand-forest-800 focus:ring-brand-forest-800"
          />
          <span>In Stock Only</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-brand-forest-950">
          All Products & Essentials
        </h1>
        <p className="text-sm text-brand-charcoal-600 mt-1">
          Explore durable, leak-proof lunch boxes, insulated water bottles, orthopedic backpacks, and desk stationery.
        </p>
      </div>

      {/* Top Filter & Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-brand-cream-300 shadow-xs mb-8">
        {/* Mobile Filter Trigger */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-brand-forest-800 text-white text-xs font-bold shadow-xs"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filter Products ({activeFilterCount})</span>
        </button>

        {/* Search within catalog */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search within results..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-brand-cream-400 bg-brand-cream-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
          />
          <Search className="w-4 h-4 text-brand-charcoal-400 absolute left-3 top-2.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-brand-charcoal-400 hover:text-brand-charcoal-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Results count & Sort Dropdown */}
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <span className="text-xs text-brand-charcoal-500 font-medium">
            Showing <strong className="text-brand-charcoal-900">{filteredProducts.length}</strong> items
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs text-brand-charcoal-500 font-medium hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-brand-cream-400 bg-white text-brand-charcoal-800 focus:outline-none focus:ring-1 focus:ring-brand-forest-800 cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout (Sidebar + Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 p-6 rounded-3xl bg-white border border-brand-cream-300 shadow-xs sticky top-28">
          {FilterSidebarContent}
        </aside>

        {/* Product Catalog Grid */}
        <main className="lg:col-span-3">
          <ProductGrid
            products={filteredProducts}
            emptyMessage="No products match your active filter criteria. Try resetting filters."
          />
        </main>
      </div>

      {/* Mobile Filter Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white h-full flex flex-col z-10 shadow-2xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-brand-cream-300 mb-6">
              <h3 className="font-serif font-bold text-lg text-brand-forest-950">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 rounded-full hover:bg-brand-cream-200 text-brand-charcoal-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1">{FilterSidebarContent}</div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full mt-6 py-3 bg-brand-forest-800 text-white rounded-xl font-bold text-xs shadow-md"
            >
              Apply Filters ({filteredProducts.length} items)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

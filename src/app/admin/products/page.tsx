'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  Package,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Copy,
  SlidersHorizontal,
  Star,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Tag,
  ArrowUpDown,
} from 'lucide-react';
import { CATEGORIES } from '@/lib/data/products';
import { Product, ProductImage, ProductVariant, TargetAudience } from '@/types';
import { formatCurrency, slugify, getColorHexFromName } from '@/lib/utils';
import { ProductImageManager } from '@/components/admin/ProductImageManager';
import { ProductVariantManager } from '@/components/admin/ProductVariantManager';
import { useLiveProducts } from '@/lib/productStore';
import { toast } from 'sonner';

export default function AdminProductsPage() {
  const {
    products: productList,
    saveProduct: saveToStore,
    updateProduct: updateInStore,
    deleteProduct: deleteFromStore,
    clearAllProducts,
    toggleProductActive,
    duplicateProduct,
  } = useLiveProducts();

  const [search, setSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedStockFilter, setSelectedStockFilter] = useState('all');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New Product Form State
  const [newName, setNewName] = useState('');
  const [newSku, setNewSku] = useState('');
  const [newPrice, setNewPrice] = useState(0);
  const [newCategory, setNewCategory] = useState(CATEGORIES[0]?.slug || 'backpacks');
  const [newStock, setNewStock] = useState(0);
  const [newThreshold, setNewThreshold] = useState(5);
  const [newShortDescription, setNewShortDescription] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newFeatures, setNewFeatures] = useState<string[]>([]);
  const [newFeatureInput, setNewFeatureInput] = useState('');
  const [newIsFeatured, setNewIsFeatured] = useState(false);
  const [newIsNewArrival, setNewIsNewArrival] = useState(false);
  const [newIsBestseller, setNewIsBestseller] = useState(false);
  const [newIsActive, setNewIsActive] = useState(true);
  const [newImages, setNewImages] = useState<ProductImage[]>([]);
  const [newVariants, setNewVariants] = useState<ProductVariant[]>([]);


  // Edit Product Feature Form state
  const [editFeatureInput, setEditFeatureInput] = useState('');

  const filtered = productList.filter((p) => {
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const matchText =
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category_name?.toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q));
      if (!matchText) return false;
    }

    if (selectedCategoryFilter !== 'all' && p.category_slug !== selectedCategoryFilter && p.category_id !== selectedCategoryFilter) {
      return false;
    }

    if (selectedStockFilter === 'out_of_stock' && p.stock_quantity > 0) return false;
    if (selectedStockFilter === 'low_stock' && (p.stock_quantity <= 0 || p.stock_quantity > (p.low_stock_threshold || 10))) return false;
    if (selectedStockFilter === 'in_stock' && p.stock_quantity <= (p.low_stock_threshold || 10)) return false;

    return true;
  });

  const handleOpenAddModal = () => {
    setNewName('');
    setNewSku(`URB-${Math.floor(100 + Math.random() * 900)}`);
    setNewPrice(999);
    setNewCategory(CATEGORIES[0]?.slug || 'backpacks');
    setNewStock(50);
    setNewThreshold(10);
    setNewShortDescription('');
    setNewDescription('');
    setNewFeatures([]);
    setNewIsFeatured(true);
    setNewIsNewArrival(true);
    setNewIsBestseller(false);
    setNewIsActive(true);
    setNewImages([]);
    setNewVariants([]);
    setIsAddModalOpen(true);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newSku.trim()) {
      toast.error('Product title and SKU are required');
      return;
    }

    if (Number(newPrice) <= 0) {
      toast.error('Selling price must be greater than 0');
      return;
    }

    const matchedCat = CATEGORIES.find((c) => c.slug === newCategory) || CATEGORIES[0];
    const totalVariantStock = newVariants.reduce((acc, v) => acc + (Number(v.stock) || 0), 0);
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name: newName.trim(),
      slug: slugify(newName.trim()) || `product-${Date.now()}`,
      description: newDescription.trim() || `${newName} engineered for everyday modern utility.`,
      short_description: newShortDescription.trim() || `${newName} - premium build quality and durable finish.`,
      sku: newSku.trim().toUpperCase(),
      price: Number(newPrice),
      category_id: matchedCat.id,
      category_name: matchedCat.name,
      category_slug: matchedCat.slug,
      target_audience: 'all',
      brand: 'Urban Essentials',
      tags: [matchedCat.slug],
      images: newImages.length > 0 ? newImages : [
        {
          id: `img-${Date.now()}`,
          image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
          alt_text: newName,
          sort_order: 1,
          is_primary: true,
        },
      ],
      variants: newVariants.length > 0 ? newVariants : undefined,
      stock_quantity: newVariants.length > 0 ? totalVariantStock : Math.max(0, Number(newStock || 0)),
      low_stock_threshold: Math.max(0, Number(newThreshold || 10)),
      rating: 5.0,
      review_count: 0,
      is_featured: newIsFeatured,
      is_new_arrival: newIsNewArrival,
      is_bestseller: newIsBestseller,
      is_active: newIsActive,
      features: newFeatures,
      specifications: {
        Material: 'Grade 304 Stainless Steel / BPA-Free Polypropylene',
        Origin: 'Designed in India',
        Warranty: '1 Year Manufacturer Warranty',
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    saveToStore(newProduct);
    toast.success(`Product "${newProduct.name}" created and added to catalog!`);
    setIsAddModalOpen(false);
  };


  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateInStore({ ...editingProduct, updated_at: new Date().toISOString() });
    toast.success(`Updated "${editingProduct.name}" successfully!`);
    setEditingProduct(null);
  };

  const handleDuplicate = (id: string, name: string) => {
    const copy = duplicateProduct(id);
    if (copy) {
      toast.success(`Duplicated "${name}" into "${copy.name}"!`);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from the store?`)) {
      deleteFromStore(id);
      toast.info(`Deleted "${name}"`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-brand-forest-950 dark:text-white">
            Product Management
          </h1>
          <p className="text-xs sm:text-sm text-brand-charcoal-500 dark:text-zinc-400 mt-0.5">
            Create, edit, duplicate, set pricing, adjust inventory, and manage product media galleries.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {productList.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete ALL products from backend, frontend, admin, and database?')) {
                  clearAllProducts();
                  toast.success('All products deleted successfully');
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/60 rounded-xl text-xs font-bold transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All Products</span>
            </button>
          )}
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-xl text-xs font-bold shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-brand-cream-300 dark:border-zinc-800 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="flex items-center gap-3 w-full md:w-80 px-3 py-2 rounded-xl bg-brand-cream-50 dark:bg-zinc-800 border border-brand-cream-300 dark:border-zinc-700">
            <Search className="w-4 h-4 text-brand-charcoal-400 dark:text-zinc-500 shrink-0" />
            <input
              type="text"
              placeholder="Search by title, SKU, or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs text-brand-charcoal-800 dark:text-zinc-100 placeholder-brand-charcoal-400 dark:placeholder-zinc-500 bg-transparent focus:outline-none"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-brand-charcoal-400 dark:text-zinc-500 hover:text-brand-charcoal-700 dark:hover:text-zinc-300">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Category Dropdown */}
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-brand-cream-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-brand-charcoal-700 dark:text-zinc-200 font-semibold focus:outline-none"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Stock Filter */}
            <select
              value={selectedStockFilter}
              onChange={(e) => setSelectedStockFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-brand-cream-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-brand-charcoal-700 dark:text-zinc-200 font-semibold focus:outline-none"
            >
              <option value="all">All Stock Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock (≤10)</option>
              <option value="out_of_stock">Out of Stock (0)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-brand-charcoal-500 dark:text-zinc-400 pt-1 border-t border-brand-cream-200 dark:border-zinc-800">
          <span>
            Showing <strong>{filtered.length}</strong> of <strong>{productList.length}</strong> catalog products
          </span>
          {(search || selectedCategoryFilter !== 'all' || selectedStockFilter !== 'all') && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategoryFilter('all');
                setSelectedStockFilter('all');
              }}
              className="text-xs font-bold text-brand-forest-800 dark:text-emerald-400 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-brand-cream-300 dark:border-zinc-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-brand-cream-100/70 dark:bg-zinc-800/80 border-b border-brand-cream-300 dark:border-zinc-800 text-brand-charcoal-600 dark:text-zinc-300 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-bold">Product</th>
                <th className="py-3 px-4 font-bold">SKU</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Price</th>
                <th className="py-3 px-4 font-bold">Stock</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-cream-200 dark:divide-zinc-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-brand-charcoal-400 dark:text-zinc-500">
                    No products found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => {
                  const isLow = product.stock_quantity <= (product.low_stock_threshold || 10);
                  const isOut = product.stock_quantity === 0;

                  return (
                    <tr key={product.id} className="hover:bg-brand-cream-50 dark:hover:bg-zinc-800/50 transition-colors">
                      {/* Thumbnail & Title */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-brand-cream-100 dark:bg-zinc-800 border border-brand-cream-300 dark:border-zinc-700 shrink-0">
                            <Image
                              src={product.images[0]?.image_url || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80'}
                              alt={product.name}
                              fill
                              unoptimized={Boolean(product.images[0]?.image_url?.startsWith('data:') || product.images[0]?.image_url?.startsWith('blob:'))}
                              className="object-cover"
                            />

                          </div>
                          <div>
                            <div className="font-bold text-brand-charcoal-900 dark:text-zinc-100 line-clamp-1 max-w-xs" title={product.name}>
                              {product.name}
                            </div>
                            <div className="text-[11px] text-brand-charcoal-400 dark:text-zinc-500 flex items-center gap-2 mt-0.5 flex-wrap">
                              <span>{product.images.length} Media</span>
                              {product.variants && product.variants.length > 0 && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-forest-900 dark:text-zinc-200 bg-brand-forest-50 dark:bg-zinc-800 px-2 py-0.5 rounded-full border border-brand-forest-200 dark:border-zinc-700">
                                  <span className="flex items-center -space-x-1">
                                    {product.variants.slice(0, 4).map((v) => (
                                      <span
                                        key={v.id}
                                        className="w-2.5 h-2.5 rounded-full border border-white dark:border-zinc-900 shrink-0"
                                        style={{
                                          backgroundColor:
                                            v.color_code ||
                                            v.attributes?.color_code ||
                                            getColorHexFromName(v.name),
                                        }}
                                        title={v.name}
                                      />
                                    ))}
                                  </span>
                                  <span>{product.variants.length} Colors</span>
                                </span>
                              )}
                              {product.is_featured && (
                                <span className="inline-flex items-center gap-0.5 text-amber-700 dark:text-amber-400 font-bold text-[9px] uppercase">
                                  <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> Featured
                                </span>
                              )}
                              {product.is_bestseller && (
                                <span className="inline-flex items-center gap-0.5 text-rose-700 dark:text-rose-400 font-bold text-[9px] uppercase">
                                  <Flame className="w-2.5 h-2.5 text-rose-500" /> Bestseller
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono font-bold text-brand-forest-950 dark:text-white">
                        {product.sku}
                      </td>

                      <td className="py-3 px-4 text-brand-charcoal-700 dark:text-zinc-300">
                        {product.category_name}
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-extrabold text-brand-forest-950 dark:text-white">
                          {formatCurrency(product.price)}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 font-extrabold text-xs ${
                            isOut
                              ? 'text-rose-700 dark:text-rose-400'
                              : isLow
                              ? 'text-amber-700 dark:text-amber-400'
                              : 'text-emerald-800 dark:text-emerald-400'
                          }`}
                        >
                          {isOut ? 'Out of Stock' : `${product.stock_quantity} units`}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleProductActive(product.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                            product.is_active
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200'
                              : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300'
                          }`}
                        >
                          {product.is_active ? 'Active' : 'Hidden'}
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleDuplicate(product.id, product.name)}
                            className="p-1.5 text-brand-charcoal-500 dark:text-zinc-400 hover:text-brand-forest-900 dark:hover:text-white rounded-lg hover:bg-brand-cream-200 dark:hover:bg-zinc-800"
                            title="Duplicate product"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingProduct(product);
                              setEditFeatureInput('');
                            }}
                            className="p-1.5 text-brand-charcoal-600 dark:text-zinc-400 hover:text-brand-forest-900 dark:hover:text-white rounded-lg hover:bg-brand-cream-200 dark:hover:bg-zinc-800"
                            title="Edit product & gallery"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            className="p-1.5 text-brand-charcoal-400 dark:text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40"
                            title="Delete product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl border dark:border-zinc-800 z-10 max-h-[90vh] overflow-y-auto animate-slide-up space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-cream-300 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-bold text-brand-forest-800 dark:text-emerald-400 uppercase tracking-wider">
                  Product Catalog
                </span>
                <h3 className="font-serif font-bold text-xl text-brand-forest-950 dark:text-white">
                  Add New Product
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-brand-cream-200 dark:hover:bg-zinc-800 text-brand-charcoal-500 dark:text-zinc-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-5">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. UltraShield Modular Bento Box"
                    value={newName}
                    onChange={(e) => {
                      setNewName(e.target.value);
                      if (!newSku || newSku.startsWith('URB-')) {
                        setNewSku(`URB-${slugify(e.target.value).slice(0, 6).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    SKU Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. URB-BENTO-01"
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Categorization */}
              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                  Category *
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pricing & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="999"
                    value={newPrice || ''}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="50"
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Low Stock Alert
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newThreshold}
                    onChange={(e) => setNewThreshold(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Gallery Manager */}
              <div className="p-4 bg-brand-cream-50 dark:bg-zinc-800/60 rounded-2xl border border-brand-cream-300 dark:border-zinc-700 space-y-2">
                <ProductImageManager
                  productId="new-product"
                  images={newImages}
                  onChange={(imgs) => setNewImages(imgs)}
                />
              </div>

              {/* Color Variants Manager */}
              <div className="p-4 bg-brand-cream-50 dark:bg-zinc-800/60 rounded-2xl border border-brand-cream-300 dark:border-zinc-700">
                <ProductVariantManager
                  variants={newVariants}
                  onChange={(vars) => setNewVariants(vars)}
                  basePrice={newPrice}
                  baseSku={newSku}
                  productImages={newImages}
                  productId="new-product"
                />
              </div>

              {/* Descriptions */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Short Description / Subtitle
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ultra-durable double-wall insulated lunchbox."
                    value={newShortDescription}
                    onChange={(e) => setNewShortDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Full Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Detailed product features, materials, and usage overview..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Bullet Features */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase">
                  Bullet Features / Highlights
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a key feature (e.g. 24h Cold Retention)..."
                    value={newFeatureInput}
                    onChange={(e) => setNewFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newFeatureInput.trim()) {
                          setNewFeatures([...newFeatures, newFeatureInput.trim()]);
                          setNewFeatureInput('');
                        }
                      }
                    }}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newFeatureInput.trim()) {
                        setNewFeatures([...newFeatures, newFeatureInput.trim()]);
                        setNewFeatureInput('');
                      }
                    }}
                    className="px-4 py-2 bg-brand-forest-800 text-white rounded-xl text-xs font-bold"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {newFeatures.map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-cream-100 dark:bg-zinc-800 text-brand-forest-950 dark:text-zinc-100 text-xs rounded-xl border border-brand-cream-300 dark:border-zinc-700"
                    >
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() => setNewFeatures(newFeatures.filter((_, i) => i !== idx))}
                        className="text-brand-charcoal-400 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Badges & Checkboxes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-brand-cream-50 dark:bg-zinc-800/60 rounded-2xl border border-brand-cream-300 dark:border-zinc-700">
                <label className="flex items-center gap-2 text-xs font-bold text-brand-charcoal-800 dark:text-zinc-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newIsActive}
                    onChange={(e) => setNewIsActive(e.target.checked)}
                    className="rounded text-brand-forest-800 w-4 h-4"
                  />
                  <span>Active on Store</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-brand-charcoal-800 dark:text-zinc-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newIsFeatured}
                    onChange={(e) => setNewIsFeatured(e.target.checked)}
                    className="rounded text-brand-forest-800 w-4 h-4"
                  />
                  <span>Featured Product</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-brand-charcoal-800 dark:text-zinc-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newIsNewArrival}
                    onChange={(e) => setNewIsNewArrival(e.target.checked)}
                    className="rounded text-brand-forest-800 w-4 h-4"
                  />
                  <span>New Arrival</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-brand-charcoal-800 dark:text-zinc-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newIsBestseller}
                    onChange={(e) => setNewIsBestseller(e.target.checked)}
                    className="rounded text-brand-forest-800 w-4 h-4"
                  />
                  <span>Bestseller</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-brand-cream-300 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-brand-cream-300 dark:border-zinc-700 text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-forest-800 hover:bg-brand-forest-900 text-white text-xs font-bold shadow-md transition-colors"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setEditingProduct(null)} />
          <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl border dark:border-zinc-800 z-10 max-h-[90vh] overflow-y-auto animate-slide-up space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-cream-300 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-bold text-brand-forest-800 dark:text-emerald-400 uppercase tracking-wider">
                  Edit Catalog Item
                </span>
                <h3 className="font-serif font-bold text-xl text-brand-forest-950 dark:text-white">
                  {editingProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1.5 rounded-full hover:bg-brand-cream-200 dark:hover:bg-zinc-800 text-brand-charcoal-500 dark:text-zinc-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProduct} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    SKU Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.sku}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Categorization */}
              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                  Category *
                </label>
                <select
                  value={editingProduct.category_slug}
                  onChange={(e) => {
                    const cat = CATEGORIES.find((c) => c.slug === e.target.value);
                    setEditingProduct({
                      ...editingProduct,
                      category_slug: e.target.value,
                      category_name: cat?.name || editingProduct.category_name,
                      category_id: cat?.id || editingProduct.category_id,
                    });
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={editingProduct.stock_quantity}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock_quantity: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Low Stock Threshold
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingProduct.low_stock_threshold || 10}
                    onChange={(e) => setEditingProduct({ ...editingProduct, low_stock_threshold: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Gallery */}
              <div className="p-4 bg-brand-cream-50 dark:bg-zinc-800/60 rounded-2xl border border-brand-cream-300 dark:border-zinc-700">
                <ProductImageManager
                  productId={editingProduct.id}
                  images={editingProduct.images}
                  onChange={(imgs) => setEditingProduct({ ...editingProduct, images: imgs })}
                />
              </div>

              {/* Color Variants Manager */}
              <div className="p-4 bg-brand-cream-50 dark:bg-zinc-800/60 rounded-2xl border border-brand-cream-300 dark:border-zinc-700">
                <ProductVariantManager
                  variants={editingProduct.variants || []}
                  onChange={(vars) => setEditingProduct({ ...editingProduct, variants: vars })}
                  basePrice={editingProduct.price}
                  baseSku={editingProduct.sku}
                  productImages={editingProduct.images || []}
                  productId={editingProduct.id}
                />
              </div>

              {/* Descriptions */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Short Description / Summary
                  </label>
                  <input
                    type="text"
                    value={editingProduct.short_description || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, short_description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase mb-1">
                    Full Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800 dark:focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Features Editor */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 uppercase">
                  Bullet Features
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add bullet highlight..."
                    value={editFeatureInput}
                    onChange={(e) => setEditFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (editFeatureInput.trim()) {
                          const currentFeats = editingProduct.features || [];
                          setEditingProduct({ ...editingProduct, features: [...currentFeats, editFeatureInput.trim()] });
                          setEditFeatureInput('');
                        }
                      }
                    }}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-brand-cream-400 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-charcoal-900 dark:text-zinc-100 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (editFeatureInput.trim()) {
                        const currentFeats = editingProduct.features || [];
                        setEditingProduct({ ...editingProduct, features: [...currentFeats, editFeatureInput.trim()] });
                        setEditFeatureInput('');
                      }
                    }}
                    className="px-4 py-2 bg-brand-forest-800 text-white rounded-xl text-xs font-bold"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {(editingProduct.features || []).map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-cream-100 dark:bg-zinc-800 text-brand-forest-950 dark:text-zinc-100 text-xs rounded-xl border border-brand-cream-300 dark:border-zinc-700"
                    >
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const currentFeats = editingProduct.features || [];
                          setEditingProduct({ ...editingProduct, features: currentFeats.filter((_, i) => i !== idx) });
                        }}
                        className="text-brand-charcoal-400 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-brand-cream-50 dark:bg-zinc-800/60 rounded-2xl border border-brand-cream-300 dark:border-zinc-700">
                <label className="flex items-center gap-2 text-xs font-bold text-brand-charcoal-800 dark:text-zinc-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.is_active}
                    onChange={(e) => setEditingProduct({ ...editingProduct, is_active: e.target.checked })}
                    className="rounded text-brand-forest-800 w-4 h-4"
                  />
                  <span>Active on Store</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-brand-charcoal-800 dark:text-zinc-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.is_featured}
                    onChange={(e) => setEditingProduct({ ...editingProduct, is_featured: e.target.checked })}
                    className="rounded text-brand-forest-800 w-4 h-4"
                  />
                  <span>Featured Product</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-brand-charcoal-800 dark:text-zinc-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.is_new_arrival}
                    onChange={(e) => setEditingProduct({ ...editingProduct, is_new_arrival: e.target.checked })}
                    className="rounded text-brand-forest-800 w-4 h-4"
                  />
                  <span>New Arrival</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-brand-charcoal-800 dark:text-zinc-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.is_bestseller}
                    onChange={(e) => setEditingProduct({ ...editingProduct, is_bestseller: e.target.checked })}
                    className="rounded text-brand-forest-800 w-4 h-4"
                  />
                  <span>Bestseller</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-brand-cream-300 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 rounded-xl border border-brand-cream-300 dark:border-zinc-700 text-xs font-bold text-brand-charcoal-700 dark:text-zinc-300 hover:bg-brand-cream-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-forest-800 hover:bg-brand-forest-900 text-white text-xs font-bold shadow-md transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


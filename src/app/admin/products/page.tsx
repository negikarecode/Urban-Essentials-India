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
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/lib/data/products';
import { Product, TargetAudience } from '@/types';
import { formatCurrency, slugify } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminProductsPage() {
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Product Form State
  const [newName, setNewName] = useState('');
  const [newSku, setNewSku] = useState('');
  const [newPrice, setNewPrice] = useState(999);
  const [newComparePrice, setNewComparePrice] = useState(1499);
  const [newCategory, setNewCategory] = useState(CATEGORIES[0].slug);
  const [newAudience, setNewAudience] = useState<TargetAudience>('all');
  const [newStock, setNewStock] = useState(50);
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState(
    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
  );

  const filtered = productList.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category_name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newSku.trim()) {
      toast.error('Name and SKU are required');
      return;
    }

    const matchedCat = CATEGORIES.find((c) => c.slug === newCategory) || CATEGORIES[0];
    const newProduct: Product = {
      id: `p-${Date.now()}`,
      name: newName.trim(),
      slug: slugify(newName.trim()),
      description: newDescription.trim() || `${newName} engineered for everyday utility.`,
      short_description: `${newName} - premium build quality.`,
      sku: newSku.trim().toUpperCase(),
      price: Number(newPrice),
      compare_at_price: Number(newComparePrice),
      category_id: matchedCat.id,
      category_name: matchedCat.name,
      category_slug: matchedCat.slug,
      target_audience: newAudience,
      brand: 'KURA',
      tags: [matchedCat.slug, newAudience],
      images: [
        {
          id: `img-${Date.now()}`,
          image_url: newImageUrl,
          alt_text: newName,
          sort_order: 1,
          is_primary: true,
        },
      ],
      stock_quantity: Number(newStock),
      low_stock_threshold: 10,
      rating: 5.0,
      review_count: 0,
      is_featured: true,
      is_new_arrival: true,
      is_bestseller: false,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setProductList([newProduct, ...productList]);
    toast.success(`Product "${newProduct.name}" created successfully`);
    setIsAddModalOpen(false);
    setNewName('');
    setNewSku('');
    setNewDescription('');
  };

  const handleToggleActive = (id: string) => {
    setProductList((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updatedState = !p.is_active;
          toast.info(`${p.name} is now ${updatedState ? 'Active' : 'Hidden'}`);
          return { ...p, is_active: updatedState };
        }
        return p;
      })
    );
  };

  const handleDelete = (id: string, name: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
    toast.info(`Deleted ${name}`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-brand-forest-950">
            Product Catalog Management
          </h1>
          <p className="text-xs text-brand-charcoal-500 mt-1">
            Manage inventory, update prices, upload product photography, and add new SKUs.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-brand-forest-800 hover:bg-brand-forest-900 text-white rounded-xl text-xs font-bold shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-brand-cream-300 shadow-xs">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search by SKU, product name, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-brand-cream-400 bg-brand-cream-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
          />
          <Search className="w-4 h-4 text-brand-charcoal-400 absolute left-3 top-2.5" />
        </div>
        <span className="text-xs text-brand-charcoal-500">
          Showing <strong>{filtered.length}</strong> items
        </span>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-brand-cream-300 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-brand-cream-100/70 border-b border-brand-cream-300 text-brand-charcoal-600 uppercase tracking-wider">
                <th className="py-3 px-4 font-bold">Product</th>
                <th className="py-3 px-4 font-bold">SKU</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Audience</th>
                <th className="py-3 px-4 font-bold">Price</th>
                <th className="py-3 px-4 font-bold">Stock</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-cream-200">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-brand-cream-50 transition-colors">
                  {/* Thumbnail & Title */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-brand-cream-100 border border-brand-cream-300 shrink-0">
                        <Image
                          src={product.images[0]?.image_url || '/placeholder.png'}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-brand-charcoal-900 line-clamp-1 max-w-xs">
                          {product.name}
                        </div>
                        <div className="text-[11px] text-brand-charcoal-400">
                          {product.variants ? `${product.variants.length} Variants` : 'Single Item'}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono font-bold text-brand-forest-950">
                    {product.sku}
                  </td>

                  <td className="py-3 px-4 text-brand-charcoal-700">
                    {product.category_name}
                  </td>

                  <td className="py-3 px-4">
                    <span className="capitalize px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-cream-200 text-brand-charcoal-800">
                      {product.target_audience}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-extrabold text-brand-forest-950">
                    {formatCurrency(product.price)}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`font-bold ${
                        product.stock_quantity <= 10 ? 'text-amber-700' : 'text-brand-charcoal-800'
                      }`}
                    >
                      {product.stock_quantity} units
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleToggleActive(product.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                        product.is_active
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300'
                      }`}
                    >
                      {product.is_active ? 'Active' : 'Hidden'}
                    </button>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-1.5 text-brand-charcoal-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsAddModalOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between pb-4 border-b border-brand-cream-300">
              <h3 className="font-serif font-bold text-xl text-brand-forest-950">
                Add New Product to Catalog
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-brand-cream-200 text-brand-charcoal-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. UltraShield Bento Box"
                    value={newName}
                    onChange={(e) => {
                      setNewName(e.target.value);
                      if (!newSku) {
                        setNewSku(`KUR-${slugify(e.target.value).slice(0, 6).toUpperCase()}`);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                    SKU Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. KUR-BB-099"
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-brand-cream-400 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                    Target Segment *
                  </label>
                  <select
                    value={newAudience}
                    onChange={(e) => setNewAudience(e.target.value as TargetAudience)}
                    className="w-full px-3 py-2.5 rounded-xl border border-brand-cream-400 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                  >
                    <option value="all">All Audiences</option>
                    <option value="school">School (Kids)</option>
                    <option value="college">College (Students)</option>
                    <option value="office">Office (Professionals)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-brand-cream-400 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                    Compare-At Price (₹)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newComparePrice}
                    onChange={(e) => setNewComparePrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                  Product Image URL (or Supabase CDN link)
                </label>
                <input
                  type="url"
                  required
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal-700 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Detailed product overview..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-cream-400 text-xs focus:outline-none focus:ring-1 focus:ring-brand-forest-800"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-brand-cream-300">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-brand-cream-300 text-xs font-bold text-brand-charcoal-700"
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
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

const CATEGORY_CARDS = [
  {
    name: 'Lunch Boxes',
    slug: 'lunch-boxes',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    subtitle: '304 Steel & Insulated',
  },
  {
    name: 'Bottles & Flasks',
    slug: 'water-bottles',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    subtitle: '24-Hour Vacuum Cold',
  },
  {
    name: 'Bags & Backpacks',
    slug: 'backpacks',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    subtitle: 'Ergonomic & Laptop Ready',
  },
  {
    name: 'Stationery',
    slug: 'stationery',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80',
    subtitle: 'Solid Brass & Japanese Gel',
  },
  {
    name: 'Notebooks & Journals',
    slug: 'stationery',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80',
    subtitle: '100 GSM Fountain-Pen Safe',
  },
  {
    name: 'Desk Essentials',
    slug: 'desk-accessories',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80',
    subtitle: 'Vegan Leather & Walnut',
  },
  {
    name: 'Accessories & Sleeves',
    slug: 'laptop-bags',
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80',
    subtitle: 'CornerArmor Shockproof',
  },
];

export function ShopByCategory() {
  return (
    <section className="py-16 sm:py-20 bg-brand-cream-100/50 border-b border-brand-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-forest-700 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Products</span>
            </div>
            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-brand-forest-950">
              Shop by Category
            </h2>
            <p className="text-xs sm:text-sm text-brand-charcoal-600 mt-1">
              Select a category to browse our precision-built everyday carry lineup.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-forest-800 hover:text-brand-forest-950 group"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 7-Card Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {CATEGORY_CARDS.map((cat, idx) => (
            <Link
              key={idx}
              href={`/category/${cat.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-brand-cream-300 hover:border-brand-forest-600 hover:shadow-lg transition-all duration-300 p-2.5 text-center"
            >
              {/* Image Thumbnail */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-brand-cream-100 mb-3">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 15vw"
                />
              </div>

              {/* Text */}
              <h3 className="font-serif font-bold text-xs sm:text-sm text-brand-forest-950 group-hover:text-brand-forest-700 transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <p className="text-[10px] text-brand-charcoal-500 font-medium mt-0.5 line-clamp-1">
                {cat.subtitle}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

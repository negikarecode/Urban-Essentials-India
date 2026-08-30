import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, GraduationCap, Backpack, Briefcase } from 'lucide-react';

const AUDIENCES = [
  {
    key: 'school',
    title: 'School Kids & Juniors',
    badge: 'Safe & Spill-Proof',
    icon: <Backpack className="w-5 h-5 text-emerald-700" />,
    description: 'Orthopedic posture-aligning bags, drop-proof bento boxes, soup food jars, and telescopic pencil cups built for daily school life.',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    itemCount: '8 Essentials',
    link: '/audience/school',
    tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  {
    key: 'college',
    title: 'College Students & Campus',
    badge: 'Durable & All-Day',
    icon: <GraduationCap className="w-5 h-5 text-sky-700" />,
    description: '16-inch laptop backpacks, 24-hour vacuum thermal hydro flasks, 100 GSM lay-flat dot journals, and all-day carry essentials.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    itemCount: '10 Essentials',
    link: '/audience/college',
    tagColor: 'bg-sky-100 text-sky-800 border-sky-200',
  },
  {
    key: 'office',
    title: 'Work & Office Professionals',
    badge: 'Minimal & Sophisticated',
    icon: <Briefcase className="w-5 h-5 text-amber-700" />,
    description: 'Executive vegan leather desk pads, solid machined brass pens, shockproof laptop sleeves, and modular meal systems.',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    itemCount: '9 Essentials',
    link: '/audience/office',
    tagColor: 'bg-amber-100 text-amber-800 border-amber-200',
  },
];

export function ShopByNeed() {
  return (
    <section id="shop-by-need" className="py-16 sm:py-20 bg-white border-b border-brand-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-forest-700 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Everyday Needs</span>
            </div>
            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-brand-forest-950">
              Shop by Need
            </h2>
            <p className="text-xs sm:text-sm text-brand-charcoal-600 mt-1 max-w-xl">
              Engineered specifically for the demands of the classroom, lecture hall, and boardroom.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-forest-800 hover:text-brand-forest-950 group"
          >
            <span>View Complete Collection</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {AUDIENCES.map((item) => (
            <Link
              key={item.key}
              href={item.link}
              className="group relative rounded-3xl overflow-hidden bg-brand-cream-100 border border-brand-cream-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-forest-950/70 via-brand-forest-950/20 to-transparent" />
                
                {/* Top Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-xs ${item.tagColor}`}>
                    {item.badge}
                  </span>
                </div>

                {/* Bottom Title on Image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 rounded-lg bg-white/90 backdrop-blur-xs">
                      {item.icon}
                    </div>
                    <span className="text-[11px] font-bold text-brand-cream-200">
                      {item.itemCount}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white group-hover:text-brand-amber-300 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Card Footer Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
                <p className="text-xs text-brand-charcoal-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-brand-cream-200 text-xs font-bold text-brand-forest-800 group-hover:text-brand-forest-950">
                  <span>Explore {item.key === 'school' ? 'School Gear' : item.key === 'college' ? 'Campus Gear' : 'Office Essentials'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-forest-700" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

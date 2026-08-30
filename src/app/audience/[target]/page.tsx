import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductsByAudience } from '@/lib/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { TargetAudience } from '@/types';
import { ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: { target: string };
}

const AUDIENCE_META: Record<
  string,
  {
    title: string;
    headline: string;
    description: string;
    pill: string;
    benefits: string[];
    bgGradient: string;
  }
> = {
  school: {
    title: 'School Essentials | KURA',
    headline: 'Orthopedic, Non-Toxic & Built for School Kids',
    description:
      'Spine-protecting lightweight school bags, leak-proof stainless steel bento lunch boxes, and standing pen cases engineered for kindergarten to high school.',
    pill: '🎒 School Kids (Ages 6-14)',
    benefits: [
      '100% Food-Grade SUS304 Stainless Steel (No plastic chemical leaching)',
      'Orthopedic Spine-Support Ergonomic Bag Design',
      'Leak-Proof Compartments for Indian Meals & Curries',
      'Stain-Resistant & Easy Wipe Clean Materials',
    ],
    bgGradient: 'from-emerald-900 via-brand-forest-900 to-teal-950',
  },
  college: {
    title: 'College & University Carry | KURA',
    headline: 'Engineered for Campus Life & Everyday Commutes',
    description:
      'Weather-resistant 16" laptop backpacks, 24-hour icy hydration flasks, 100GSM dot-grid journals, and streamlined tech organizers.',
    pill: '💻 College & Campus Life',
    benefits: [
      'Dedicated Shockproof 16" Laptop & Tablet Sleeves',
      'Double-Wall Vacuum Insulation Keeps Cold 24 Hours',
      'Bleed-Proof 100GSM Paper for Fountain & Gel Pens',
      'AquaGuard Waterproof YKK Zippers',
    ],
    bgGradient: 'from-slate-900 via-brand-forest-950 to-emerald-950',
  },
  office: {
    title: 'Executive Office & Work Essentials | KURA',
    headline: 'Sophisticated Workspace & Everyday Carry for Professionals',
    description:
      'Dual-sided vegan leather desk pads, solid machined brass pens, minimalist bento meal prep boxes, and ballistic nylon laptop sleeves.',
    pill: '💼 Office & Working Professionals',
    benefits: [
      'Waterproof & Scratch-Resistant Desk Surface Protection',
      'Solid C3604 Aircraft-Grade Brass Writing Instruments',
      'Odor-Free Vacuum Sealed Meal Storage',
      'Minimalist Forest & Charcoal Aesthetic for Clean Desks',
    ],
    bgGradient: 'from-stone-900 via-brand-forest-900 to-neutral-900',
  },
};

export function generateStaticParams() {
  return [{ target: 'school' }, { target: 'college' }, { target: 'office' }];
}

export function generateMetadata({ params }: Props): Metadata {
  const meta = AUDIENCE_META[params.target.toLowerCase()];
  if (!meta) return { title: 'Segment Not Found | KURA Essentials' };

  return {
    title: meta.title,
    description: meta.description,
  };
}

export default function AudiencePage({ params }: Props) {
  const targetKey = params.target.toLowerCase();
  const meta = AUDIENCE_META[targetKey];
  if (!meta) notFound();

  const products = getProductsByAudience(targetKey as TargetAudience);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-brand-charcoal-500 mb-6">
        <Link href="/" className="hover:text-brand-forest-800">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/products" className="hover:text-brand-forest-800">Segments</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-forest-900 capitalize">{targetKey}</span>
      </nav>

      {/* Hero Banner for this Audience */}
      <div
        className={`relative rounded-3xl overflow-hidden bg-linear-to-r ${meta.bgGradient} text-white mb-12 p-8 sm:p-12 shadow-xl`}
      >
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-amber-400" />
            <span>{meta.pill}</span>
          </div>

          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            {meta.headline}
          </h1>

          <p className="text-sm sm:text-base text-brand-cream-200/90 leading-relaxed max-w-2xl">
            {meta.description}
          </p>

          {/* Key Audience Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4">
            {meta.benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-brand-cream-100 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-brand-cream-300">
          <h2 className="font-serif font-bold text-xl text-brand-forest-950">
            Recommended Products ({products.length})
          </h2>
          <div className="flex gap-2">
            {['school', 'college', 'office'].filter((k) => k !== targetKey).map((other) => (
              <Link
                key={other}
                href={`/audience/${other}`}
                className="px-3 py-1.5 rounded-lg border border-brand-cream-300 text-xs font-semibold text-brand-charcoal-700 hover:bg-brand-cream-100 capitalize"
              >
                View {other} &rarr;
              </Link>
            ))}
          </div>
        </div>

        <ProductGrid
          products={products}
          emptyMessage={`No products listed under ${meta.pill}.`}
        />
      </div>
    </div>
  );
}

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateDiscountPercentage(price: number, compareAtPrice?: number): number {
  if (!compareAtPrice || compareAtPrice <= price) return 0;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

export function generateOrderNumber(): string {
  const prefix = 'KUR';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${timestamp}-${random}`;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-'); // Replace multiple - with single -
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export const POPULAR_COLOR_PRESETS = [
  { name: 'Midnight Black', hex: '#1A1A1A' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Forest Green', hex: '#1B4332' },
  { name: 'Navy Blue', hex: '#1E3A8A' },
  { name: 'Crimson Red', hex: '#DC2626' },
  { name: 'Charcoal Grey', hex: '#374151' },
  { name: 'Rose Gold', hex: '#B76E79' },
  { name: 'Sage Green', hex: '#84A98C' },
  { name: 'Oatmeal Beige', hex: '#E8DFD8' },
  { name: 'Olive Green', hex: '#556B2F' },
  { name: 'Royal Blue', hex: '#2563EB' },
  { name: 'Sunset Orange', hex: '#EA580C' },
  { name: 'Sunshine Yellow', hex: '#F59E0B' },
  { name: 'Pastel Pink', hex: '#F472B6' },
  { name: 'Desert Sand', hex: '#D2B48C' },
  { name: 'Lavender Purple', hex: '#8B5CF6' },
  { name: 'Mint Green', hex: '#6EE7B7' },
  { name: 'Silver Slate', hex: '#94A3B8' },
];

/**
 * Returns a suitable hex code from a color name string if not explicitly set
 */
export function getColorHexFromName(name?: string): string {
  if (!name) return '#1B4332';
  const clean = name.toLowerCase().trim();

  // Exact or partial match in popular presets
  const match = POPULAR_COLOR_PRESETS.find(
    (p) => clean.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(clean)
  );
  if (match) return match.hex;

  // Fallbacks by common keywords
  if (clean.includes('black') || clean.includes('noir') || clean.includes('ebony') || clean.includes('dark')) return '#1A1A1A';
  if (clean.includes('white') || clean.includes('alabaster') || clean.includes('ivory') || clean.includes('snow')) return '#FFFFFF';
  if (clean.includes('cream') || clean.includes('oatmeal') || clean.includes('beige') || clean.includes('sand') || clean.includes('tan')) return '#E8DFD8';
  if (clean.includes('forest') || clean.includes('emerald') || clean.includes('pine')) return '#1B4332';
  if (clean.includes('sage') || clean.includes('mint')) return '#84A98C';
  if (clean.includes('olive') || clean.includes('moss') || clean.includes('army')) return '#556B2F';
  if (clean.includes('green')) return '#16A34A';
  if (clean.includes('navy')) return '#1E3A8A';
  if (clean.includes('cobalt') || clean.includes('royal')) return '#2563EB';
  if (clean.includes('blue') || clean.includes('sky') || clean.includes('cyan')) return '#3B82F6';
  if (clean.includes('red') || clean.includes('crimson') || clean.includes('ruby') || clean.includes('maroon')) return '#DC2626';
  if (clean.includes('rose') || clean.includes('blush') || clean.includes('coral')) return '#B76E79';
  if (clean.includes('pink')) return '#EC4899';
  if (clean.includes('orange') || clean.includes('amber') || clean.includes('terracotta') || clean.includes('rust')) return '#EA580C';
  if (clean.includes('yellow') || clean.includes('gold') || clean.includes('mustard')) return '#F59E0B';
  if (clean.includes('purple') || clean.includes('violet') || clean.includes('lavender')) return '#8B5CF6';
  if (clean.includes('grey') || clean.includes('gray') || clean.includes('slate') || clean.includes('charcoal') || clean.includes('graphite')) return '#4B5563';
  if (clean.includes('silver') || clean.includes('steel') || clean.includes('chrome')) return '#94A3B8';
  if (clean.includes('brown') || clean.includes('coffee') || clean.includes('bronze')) return '#78350F';

  return '#374151';
}

/**
 * Checks whether a hex color is light (high luminance), useful for contrast checkmarks/borders
 */
export function isLightColor(hex?: string): boolean {
  if (!hex) return false;
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map((char) => char + char).join('');
  }
  if (c.length !== 6) return false;

  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) return false;

  // HSP (Highly Sensitive Poo) color brightness formula
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
  return hsp > 185;
}


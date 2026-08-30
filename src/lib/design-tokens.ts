/**
 * Global Design Tokens for Urban Essentials Ecommerce Platform
 * Single source of truth for colors, typography, spacing, elevations, and radii.
 */

export const DESIGN_TOKENS = {
  colors: {
    brand: {
      forest: {
        50: '#F0F5F2',
        100: '#DCE7E1',
        200: '#BAD0C3',
        300: '#92B4A1',
        400: '#64937B',
        500: '#3D7156',
        600: '#28553F',
        700: '#1D4532',
        800: '#153E2B', // Main Forest Brand Color
        900: '#0E2B1E',
        950: '#071810',
      },
      sage: {
        50: '#F5F8F6',
        100: '#E9EFEA',
        200: '#D4DFD6',
        300: '#B8CBBC',
        400: '#97B39C',
        500: '#7A9A84', // Secondary Sage Color
        600: '#5E7D67',
        700: '#4A6251',
        800: '#3D4F42',
        900: '#344238',
      },
      cream: {
        50: '#FFFFFF',
        100: '#FAF8F5', // Default Body Background
        200: '#F4EFE6', // Card Surface
        300: '#EDE4D4', // Border Neutral
        400: '#E2D4BF',
        500: '#D4C0A6',
      },
      charcoal: {
        50: '#FAFAFA',
        100: '#F4F4F5',
        200: '#E4E4E7',
        300: '#D4D4D8',
        400: '#A1A1AA',
        500: '#71717A',
        600: '#52525B',
        700: '#3F3F46',
        800: '#27272A',
        900: '#18181B', // Primary Text
        950: '#09090B',
      },
      amber: {
        50: '#FFFBEB',
        100: '#FEF3C7',
        200: '#FDE68A',
        300: '#FCD34D',
        400: '#FBBF24',
        500: '#F59E0B',
        600: '#D97706', // Promo & Badge Accent
        700: '#B45309',
        800: '#92400E',
        900: '#78350F',
      },
    },
    semantic: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },
  },
  typography: {
    fontFamilies: {
      sans: "var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
      serif: "var(--font-serif, 'Playfair Display', Georgia, serif)",
      mono: "'SF Mono', Monaco, Consolas, monospace",
    },
    fontSizes: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
    },
  },
  layout: {
    maxContainerWidth: '80rem', // 1280px (max-w-7xl)
    headerHeight: '5rem',       // 80px (h-20)
    announcementHeight: '2rem', // 32px (h-8)
    borderRadius: {
      sm: '0.375rem', // 6px
      md: '0.5rem',   // 8px
      lg: '0.75rem',  // 12px
      xl: '1rem',     // 16px
      '2xl': '1.5rem',// 24px
      '3xl': '2rem',  // 32px
      full: '9999px',
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

export type DesignTokens = typeof DESIGN_TOKENS;

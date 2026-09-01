import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          forest: {
            DEFAULT: '#153E2B',
            50: '#F0F5F2',
            100: '#DCE7E1',
            200: '#BAD0C3',
            300: '#92B4A1',
            400: '#64937B',
            500: '#3D7156',
            600: '#28553F',
            700: '#1D4532',
            800: '#153E2B', // Main Forest Brand
            900: '#0E2B1E',
            950: '#071810',
          },
          sage: {
            DEFAULT: '#7A9A84',
            50: '#F5F8F6',
            100: '#E9EFEA',
            200: '#D4DFD6',
            300: '#B8CBBC',
            400: '#97B39C',
            500: '#7A9A84',
            600: '#5E7D67',
            700: '#4A6251',
            800: '#3D4F42',
            900: '#344238',
          },
          cream: {
            DEFAULT: '#FAF8F5',
            50: '#FFFFFF',
            100: '#FAF8F5',
            200: '#F4EFE6',
            300: '#EDE4D4',
            400: '#E2D4BF',
            500: '#D4C0A6',
          },
          charcoal: {
            DEFAULT: '#18181B',
            50: '#FAFAFA',
            100: '#F4F4F5',
            200: '#E4E4E7',
            300: '#D4D4D8',
            400: '#A1A1AA',
            500: '#71717A',
            600: '#52525B',
            700: '#3F3F46',
            800: '#27272A',
            900: '#18181B',
            950: '#09090B',
          },
          amber: {
            DEFAULT: '#D97706',
            50: '#FFFBEB',
            100: '#FEF3C7',
            200: '#FDE68A',
            300: '#FCD34D',
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
            800: '#92400E',
            900: '#78350F',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['var(--font-display)', 'Manrope', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['var(--font-display)', 'Manrope', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

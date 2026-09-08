import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Urban Essentials | Premium Bottles, Bags & Lunchboxes',
  description:
    'Thoughtfully engineered stainless steel water bottles, everyday backpacks, and leak-proof lunchboxes.',
  keywords: [
    'lunch box',
    'water bottle',
    'insulated flask',
    'backpack',
    'bags',
    'meal jars',
    'everyday carry',
  ],
  authors: [{ name: 'Urban Essentials' }],
  openGraph: {
    title: 'Urban Essentials | Premium Bottles, Bags & Lunchboxes',
    description:
      'Engineered everyday essentials: 100% Food-Grade 304 Steel, BPA Free, 1-Year Guarantee.',
    url: 'https://urbanessentialsindia.com',
    siteName: 'Urban Essentials',
    images: [
      {
        url: '/products/koool-backpack-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Urban Essentials',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF8F5' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('urban_theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden font-sans bg-brand-cream-50 text-brand-charcoal-900 dark:bg-zinc-950 dark:text-zinc-100 antialiased selection:bg-brand-forest-800 selection:text-white"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AuthProvider>
            <WishlistProvider>
              <CartProvider>
                <Header />
                <main className="flex-1 w-full max-w-full overflow-x-hidden pb-16 lg:pb-0">{children}</main>
                <Footer />
                <CartDrawer />
                <MobileBottomNav />
                <Toaster
                  position="top-right"
                  toastOptions={{
                    style: {
                      background: '#153E2B',
                      color: '#FAF8F5',
                      border: '1px solid #28553F',
                    },
                  }}
                />
              </CartProvider>
            </WishlistProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

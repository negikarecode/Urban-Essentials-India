import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
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
    url: 'https://urbanessentials.com',
    siteName: 'Urban Essentials',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
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
      <body
        className="flex flex-col min-h-screen font-sans bg-brand-cream-50 text-brand-charcoal-900 antialiased selection:bg-brand-forest-800 selection:text-white"
        suppressHydrationWarning
      >
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
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
      </body>
    </html>
  );
}

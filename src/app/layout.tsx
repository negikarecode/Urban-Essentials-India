import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'KURA Essentials | Premium Bento Boxes, Bottles, Bags & Everyday Carry',
  description:
    'Thoughtfully engineered everyday carry, leak-proof bento lunch boxes, vacuum insulated water bottles, campus backpacks, and minimalist desk stationery for School, College & Work.',
  keywords: [
    'lunch box',
    'bento box',
    'water bottle',
    'insulated flask',
    'backpack',
    'school bag',
    'stationery',
    'desk accessories',
    'everyday carry',
    'school gear',
    'college essentials',
    'office accessories',
  ],
  authors: [{ name: 'KURA Essentials' }],
  openGraph: {
    title: 'KURA Essentials | Premium Bento Boxes, Bottles, Bags & Everyday Carry',
    description:
      'Engineered everyday essentials for School, College & Work. 100% Food-Grade, BPA Free, 1-Year Guarantee.',
    url: 'https://kuraessentials.com',
    siteName: 'KURA Essentials',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'KURA Essentials',
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
    <html lang="en" className="scroll-smooth">
      <body className="flex flex-col min-h-screen">
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

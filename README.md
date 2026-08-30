# Urban Essentials — Premium Everyday Carry Ecommerce Platform

A production-ready, Shopify-inspired modern ecommerce platform engineered with Next.js App Router, TypeScript, Tailwind CSS, Supabase (PostgreSQL, Auth, Storage, RLS), and Razorpay payments.

Built for:
- 🎒 **School Kids** (Orthopedic spine-safe bags, food-grade stainless steel bento boxes, soup jars, standing pen cases)
- 💻 **College Students** (Water-resistant 16" laptop backpacks, 24-hr vacuum flasks, 100GSM journals, tech folios)
- 💼 **Office Professionals** (Vegan leather desk pads, solid brass EDC pens, military-grade laptop sleeves, modular lunch boxes)

---

## 🌟 Key Features

### 🛒 Customer Storefront
- **Visual Design:** Sophisticated Forest Green, Cream linen, and Charcoal palette with subtle animations.
- **Announcement Bar:** Rotating promotional bar with coupon highlights and free shipping trackers.
- **Responsive Header:** Live search autocomplete, audience quick-segment switcher, wishlist counter badge, and slide-over Cart drawer.
- **Shop by Audience:** Dedicated curated landing pages for School (`/audience/school`), College (`/audience/college`), and Office (`/audience/office`).
- **Product Listing Page (PLP):** Multi-facet filtering (Category, Audience, Price Range Slider, In-Stock, Bestsellers, New Arrivals), debounced search, and sorting.
- **Product Details Page (PDP):** Interactive multi-image gallery with zoom preview, variant selector (Colors, Capacities, Sizes), real-time stock status badge, tabbed technical specifications, verified customer reviews list, and review submission modal.
- **Persistent Cart & State:** LocalStorage persistence for guest shoppers + automated synchronization with Supabase when logged in.
- **Free Shipping Calculator:** Dynamic progress bar showing amount remaining to unlock free delivery across India.
- **Wishlist:** Quick toggle from product cards or detail pages with dedicated `/wishlist` page.

### 💳 Zero-Trust Checkout & Razorpay Payments
- **Zero-Trust Pricing:** Never trusts client-side totals. Order subtotals, coupon validations, inventory levels, and shipping fees are strictly recalculated server-side.
- **Razorpay Integration:** Live / Test mode Razorpay order generation and cryptographic **HMAC SHA256** signature verification (`/api/checkout/verify-payment`).
- **Order Confirmation:** Itemized invoice summary, print invoice utility, 4-step dispatch timeline tracking, and confetti celebration.

### 🔐 Protected Admin Dashboard (`/admin`)
- **Overview & Analytics:** Real-time Gross Revenue, Order counts, Active catalog items, and Low Stock Alerts.
- **Product Catalog Management (`/admin/products`):** Full CRUD modal to create new products, SKUs, upload images, update pricing, and toggle active/inactive status.
- **Inventory Replenishment (`/admin/inventory`):** Live inline quantity adjustments (-10, -1, +1, +10) and low-stock threshold monitoring.
- **Orders Fulfillment (`/admin/orders`):** Order status switcher (`pending`, `confirmed`, `processing`, `packed`, `shipped`, `delivered`, `cancelled`).
- **Promotional Coupons (`/admin/coupons`):** Create percentage or flat amount discount coupons with minimum order values and max discount caps.
- **Review Moderation (`/admin/reviews`):** Moderate, approve, or reject customer reviews before publishing.

### 🔍 SEO & Accessibility
- Dynamic XML Sitemap (`/sitemap.xml`) and dynamic `robots.txt`.
- Schema.org JSON-LD Structured Data for products, ratings, and availability.
- Semantic HTML5, ARIA labels, responsive mobile drawer, and keyboard accessible navigation.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Notifications:** Sonner Toast
- **Database & Auth:** Supabase (PostgreSQL + RLS + Storage)
- **Payment Gateway:** Razorpay SDK + Cryptographic HMAC verification
- **Animation & FX:** Canvas Confetti

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone <your-repo-url>
cd "Mama Website"
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Populate the variables:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase Credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Razorpay Credentials (from Razorpay Dashboard > Settings > API Keys)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_key

# Admin Secret Token
ADMIN_SECRET_TOKEN=urban_admin_secure_token_change_in_prod
```

### 3. Database Schema Setup
Execute the SQL migration and seed files in your Supabase SQL Editor:
1. `supabase/migrations/001_initial_schema.sql` (Creates all tables, enums, triggers, and Row Level Security policies)
2. `supabase/seed.sql` (Loads categories, sample coupons, and products)

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the store.
Access the admin portal at [http://localhost:3000/admin](http://localhost:3000/admin).

---

## 🧪 Testing Credentials & Demo Profiles
The application includes pre-configured demo sign-in shortcuts in the header and account menus:
- **Demo Customer:** `alex.student@gmail.com`
- **Demo Admin:** `admin@urbanessentials.com` (Grants full access to `/admin`)
- **Active Promotional Coupons:** `WELCOME10` (10% off), `URBAN20` (20% off above ₹1500), `FLAT250` (Flat ₹250 off above ₹2000)

-- ============================================================================
-- Urban Essentials ESSENTIALS — COMPREHENSIVE SEED DATA
-- Migration: seed.sql
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. CATEGORIES (10 Categories)
-- ----------------------------------------------------------------------------
INSERT INTO public.categories (id, name, slug, description, image_url, sort_order, is_active) VALUES
('c1000000-0000-0000-0000-000000000001', 'Lunch Boxes', 'lunch-boxes', 'Insulated, leak-proof bento and stainless steel lunch boxes designed for school & work.', 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80', 1, TRUE),
('c1000000-0000-0000-0000-000000000002', 'Water Bottles', 'water-bottles', 'Vacuum insulated stainless steel and BPA-free hydration bottles that keep drinks cold for 24 hours.', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80', 2, TRUE),
('c1000000-0000-0000-0000-000000000003', 'Backpacks', 'backpacks', 'Ergonomic, water-resistant everyday backpacks engineered for campus, commutes, and travel.', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80', 3, TRUE),
('c1000000-0000-0000-0000-000000000004', 'School Bags', 'school-bags', 'Lightweight, orthopedic spine-support school bags with vibrant aesthetics and durable fabric.', 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80', 4, TRUE),
('c1000000-0000-0000-0000-000000000005', 'Stationery', 'stationery', 'Premium 100GSM journals, fountain pens, sticky notes, and archival quality writing tools.', 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80', 5, TRUE),
('c1000000-0000-0000-0000-000000000006', 'Pencil Cases', 'pencil-cases', 'Multi-compartment canvas and vegan leather organizers for pens, styluses, and desk essentials.', 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&w=800&q=80', 6, TRUE),
('c1000000-0000-0000-0000-000000000007', 'Desk Accessories', 'desk-accessories', 'Minimalist felt desk mats, walnut organizers, cable managers, and phone stands for pristine workspaces.', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80', 7, TRUE),
('c1000000-0000-0000-0000-000000000008', 'Laptop Bags', 'laptop-bags', 'Sleek shockproof laptop sleeves and messenger bags with water-repellent ballistic nylon.', 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80', 8, TRUE),
('c1000000-0000-0000-0000-000000000009', 'Office Essentials', 'office-essentials', 'Curated desk pads, premium brass pens, meeting folios, and ergonomic work accessories.', 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=800&q=80', 9, TRUE),
('c1000000-0000-0000-0000-000000000010', 'Gift Sets', 'gift-sets', 'Thoughtfully boxed desk sets, back-to-school kits, and executive onboarding bundles.', 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80', 10, TRUE)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    slug = EXCLUDED.slug,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url,
    sort_order = EXCLUDED.sort_order;

-- ----------------------------------------------------------------------------
-- 2. COUPONS
-- ----------------------------------------------------------------------------
INSERT INTO public.coupons (id, code, description, discount_type, discount_value, min_order_value, max_discount, is_active) VALUES
('d1000000-0000-0000-0000-000000000001', 'WELCOME10', '10% off on your first order', 'percentage', 10.00, 500.00, 300.00, TRUE),
('d1000000-0000-0000-0000-000000000002', 'URBAN20', 'Flat 20% off on orders above ₹1500', 'percentage', 20.00, 1500.00, 600.00, TRUE),
('d1000000-0000-0000-0000-000000000003', 'FLAT250', 'Flat ₹250 instant discount on orders above ₹2000', 'fixed', 250.00, 2000.00, 250.00, TRUE)
ON CONFLICT (code) DO UPDATE SET
    discount_type = EXCLUDED.discount_type,
    discount_value = EXCLUDED.discount_value,
    min_order_value = EXCLUDED.min_order_value,
    max_discount = EXCLUDED.max_discount;


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



-- ============================================================================
-- Amazon Product Import Seed
-- ============================================================================

DELETE FROM public.inventory;
DELETE FROM public.product_variants;
DELETE FROM public.product_images;
DELETE FROM public.product_categories;
DELETE FROM public.products;

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000001', '2 Layer Stainless Steel Lunch Box with 2-Compartment Tray Locking Lid & Spoon', '2-layer-stainless-steel-lunch-box-locking-lid-spoon', 'Say hello to a smarter way of carrying your meals with this stylish 2-layer stainless steel lunch box. Crafted from premium 304 food-grade stainless steel with a non-toxic PP exterior, it keeps your meals hot, fresh, and perfectly organized. Features independent leakproof compartments, steam release valve, fold-away handles, and included spoon.', '2-layer SUS304 stainless steel tiffin with 2-compartment tray, locking lid, and spoon.', 'Hello Tuesday 1',
    950, 1499, 36,
    'office', 'Urban Essentials', ARRAY['lunch-box', 'tiffin', 'stainless-steel', '2-layer', 'office', 'school', 'bestseller'],
    4.8, 42, TRUE,
    TRUE, TRUE,
    TRUE, ARRAY['Food-grade SUS304 stainless steel inner containers for health and safety', 'Airtight silicone seal and secure side lock clips prevent any spill or leak', 'Built-in steam release valve on the lid allows easy pressure equalisation', 'Includes ergonomic foldable spoon neatly docked in the lid compartment', 'Double-wall insulation keeps food hot and hands comfortable'], '{"Material": "SUS304 Stainless Steel & Food-Grade PP", "Capacity": "1100 ml Dual Tier", "Parent ASIN": "B0HKKHQYKP", "Item Dimensions": "20cm x 14cm x 12cm", "Included Accessories": "Foldable Stainless Steel Spoon"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0001-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', '/products/hello-tuesday-blue-yellow.png', '2 Layer Stainless Steel Lunch Box Mint Green', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0001-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', '/products/hello-tuesday-sus304-liner.png', 'SUS304 Stainless Steel Interior Liner', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0001-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', '/products/hello-tuesday-tier-separation.png', 'Tier separation detail', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0001-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', '/products/hello-tuesday-steam-vent.jpg', 'Steam vent and lid locks', 4, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0001-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', '/products/hello-tuesday-unstacked-bowls.jpg', 'Unstacked bowls view', 5, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0001-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Mint Green', '09-O3EY-9YB4', 950, 950, '{"color": "Mint Green", "color_code": "#6EE7B7", "asin": "B0HKKMRZH7"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0001-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Mint Green (Deluxe Edition)', 'TL-WUWT-O5EV', 950, 1499, '{"color": "Mint Green (Deluxe)", "color_code": "#34D399", "asin": "B0HJ6BZ18S"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0001-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Sky Blue & Yellow', 'S1-ZQ5I-7VXH', 950, 950, '{"color": "Sky Blue & Yellow", "color_code": "#38BDF8", "asin": "B0HJ64H555"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000001', 45, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000002', 'Kids School Backpack with Astronaut & Cartoon Designs, 12L', 'kids-school-backpack-astronaut-cartoon-12l', 'Make back-to-school exciting for your little one with this adorable kids backpack, perfectly sized for children aged 3 to 7 years. Measuring 32 cm in height and 26 cm in width, with a generous 12-litre capacity, it offers ample room for a lunch box, water bottle, stationery, and small books. Features 3 separate compartments, water-repellent fabric, and ergonomic padded straps.', 'Ergonomic 12L water-repellent kids backpack with 3 compartments for ages 3 to 7.', 'D6-HXA5-ZCGW',
    799, 1999, 60,
    'school', 'Urban Essentials', ARRAY['backpack', 'kids-school-bag', 'astronaut', 'dinosaur', 'kuromi', 'school', 'bestseller'],
    4.9, 58, TRUE,
    TRUE, TRUE,
    TRUE, ARRAY['12 Litre generous capacity tailored for kindergarten and primary school kids', '3 separate organised zip compartments and dual stretch mesh water bottle side pockets', 'High-density water-repellent soft outer fabric is easy to clean and extra durable', 'Ergonomic breathable mesh padded shoulder straps and back panel for comfort', 'Weighs only 400g to reduce shoulder strain for young children'], '{"Dimensions": "32 cm Height x 26 cm Width x 14 cm Depth", "Capacity": "12 Litres", "Recommended Age": "3 to 7 Years", "Weight": "400 g", "Parent ASIN": "B0HJX4WP9R"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000003');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0002-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', '/products/astronaut-space-backpack-hero.jpg', 'Astronaut Kids School Backpack', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0002-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', '/products/astronaut-space-backpack-angle.jpg', 'Side view', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0002-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002', '/products/astronaut-space-backpack-front.jpg', 'Front view', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0002-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000002', '/products/astronaut-space-backpack-open.jpg', 'Spacious main compartment', 4, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0002-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000002', '/products/astronaut-space-backpack-specs.jpg', 'Backpack specifications', 5, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0002-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'Astronaut Space Explorer', '1I-32TA-QXQI', 799, 1999, '{"color": "Astronaut Space", "color_code": "#1E3A8A", "asin": "B0HJQN1LRG"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0002-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'Space Rocket (Astronaut)', 'AS1', 899, 899, '{"color": "Space Rocket", "color_code": "#2563EB", "asin": "B0HJX84LT1"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0002-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002', 'Color Block Pastel', 'CL1', 899, 899, '{"color": "Color Block", "color_code": "#EC4899", "asin": "B0HJXK54TP"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0002-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000002', 'Cute Animals Pastel', 'CT1', 899, 899, '{"color": "Cute Animals", "color_code": "#F472B6", "asin": "B0HJX9MLMQ"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0002-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000002', 'Kuromi Lavender', 'DD1', 899, 899, '{"color": "Kuromi Lavender", "color_code": "#A855F7", "asin": "B0HKMN74N2"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0002-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000002', 'Dinosaur Roar', 'DN1', 899, 899, '{"color": "Dinosaur Roar", "color_code": "#10B981", "asin": "B0HJX9J75Q"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000002', 50, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000003', 'Mermaid Theme Kids Backpack and Lunch Bag Series with 3D Molded Shell', 'mermaid-theme-kids-backpack-3d-molded-shell', 'Make every school day a magical underwater adventure with this Premium Retro Mermaid Kids Backpack! Featuring an adorable 3D moulded mermaid graphic with shiny sequin accents, lightweight EVA hard shell front, and spacious interior pockets. Made from durable, water-resistant polyester.', 'Magical 3D molded mermaid EVA backpack with sequin details and ergonomic padded straps.', 'AS11',
    690, 1999, 65,
    'school', 'Urban Essentials', ARRAY['mermaid', 'backpack', '3d-shell', 'sequins', 'kids', 'school'],
    4.8, 35, TRUE,
    TRUE, FALSE,
    TRUE, ARRAY['3D molded hard-shell EVA front panel with shimmering mermaid sequin details', 'Generous main compartment holds A4 books, notebooks, lunch box, and pouch', 'Ergonomic S-shaped shoulder straps prevent slipping and distribute load evenly', 'Waterproof high-density polyester fabric protects books from rain', 'Heavy-duty dual smooth zippers with custom pull tags'], '{"Dimensions": "36cm Height x 28cm Width x 15cm Depth", "Material": "3D EVA Shell & High-Grade Polyester", "Parent ASIN": "B0HK89F8P9", "Age Group": "4 to 9 Years"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000003');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0003-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', '/products/retro-mermaid-sequin-backpack-hero.jpg', 'Mermaid 3D Kids Backpack', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0003-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000003', '/products/retro-mermaid-sequin-backpack-front.jpg', 'Front sequin detail', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0003-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', '/products/retro-mermaid-sequin-backpack-side.jpg', 'Side view', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0003-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000003', '/products/retro-mermaid-sequin-backpack-lifestyle.jpg', 'Lifestyle view', 4, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0003-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000003', '/products/retro-mermaid-sequin-backpack-specs.jpg', 'Size and specs', 5, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0003-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', 'Purple & Pink Mermaid', 'AS12', 690, 1999, '{"color": "Purple & Pink", "color_code": "#C084FC", "asin": "B0HK8FWF6L"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0003-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000003', 'Pink & Blue Mermaid', 'AS13', 690, 1999, '{"color": "Pink & Blue", "color_code": "#F472B6", "asin": "B0HK8CRYMN"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0003-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', 'Ocean Blue Mermaid', 'AS33', 690, 1999, '{"color": "Ocean Blue", "color_code": "#38BDF8", "asin": "B0HK8CX2NW"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000003', 30, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000004', '2 Layer Stainless Steel Lunch Box with Carry Handle & Leak Resistant Seal', '2-layer-stainless-steel-lunch-box-carry-handle', 'Stay organised and well-fed throughout your busy day with this 2-Layer Stainless Steel Lunch Box, specially designed for office goers, school kids, and travelers. High quality SUS304 food-grade inner core, outer insulated plastic shell, and heavy-duty locking side clips with a comfortable top carrying handle.', '2-layer SUS304 stainless steel tiffin container with ergonomic top carry handle.', 'LK-Y0J2-W83Y',
    899, 1999, 55,
    'office', 'Urban Essentials', ARRAY['lunch-box', 'tiffin', '2-layer', 'handle', 'office', 'stainless-steel'],
    4.7, 29, FALSE,
    TRUE, FALSE,
    TRUE, ARRAY['Dual stackable stainless steel compartments keep dishes completely separated', 'Sturdy integrated fold-flat carrying handle makes transport easy', 'Airtight silicone seal rim prevents leaks and locks in aroma and heat', 'High temperature resistant food-grade plastic outer shell remains cool to touch', 'Wide mouth design makes packing food and hand-washing effortless'], '{"Material": "SUS304 Stainless Steel & PP Exterior", "Capacity": "1600 ml", "Parent ASIN": "B0HK3VGVS9", "Thermal Retention": "3-4 Hours"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000001');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0004-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000004', '/products/tedemei-dual-layer-1600ml-hero.jpg', '2 Layer Stainless Steel Tiffin with Handle', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0004-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000004', '/products/tedemei-dual-layer-1600ml-side.jpg', 'Side view handle', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0004-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000004', '/products/tedemei-dual-layer-1600ml-details.jpg', 'Container detail', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0004-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000004', '/products/tedemei-dual-layer-1600ml-exploded.jpg', 'Exploded view', 4, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0004-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000004', 'Ocean Blue', 'BL1', 899, 1999, '{"color": "Ocean Blue", "color_code": "#2563EB", "asin": "B0HK3W5WLW"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0004-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000004', 'Blush Pink', 'PK1', 899, 1999, '{"color": "Blush Pink", "color_code": "#EC4899", "asin": "B0HK42G2H5"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000004', 40, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000005', 'Dinosaur Theme Kids Backpack and Lunch Bag Series with 3D Design', 'dinosaur-theme-kids-backpack-3d-design', 'Make every school day a roaring adventure with this Premium Retro Dinosaur Kids Backpack! Featuring a vibrant 3D moulded T-Rex graphic, lightweight EVA hard shell front, soft-padded back panel, and multi-compartment interior for school gear.', 'Vibrant 3D dinosaur EVA hard-shell school backpack for kids.', 'XK-AUTX-5P07',
    699, 1999, 65,
    'school', 'Urban Essentials', ARRAY['dinosaur', 'backpack', '3d-shell', 'kids-bag', 'school'],
    4.9, 48, TRUE,
    TRUE, TRUE,
    TRUE, ARRAY['3D T-Rex dinosaur molded hard shell front face with vivid color detail', 'Ultra-lightweight high-density water-resistant composite body', 'Soft breathable honeycomb mesh back panel for all-day ventilation', 'Spacious dual main zip compartments with stretch bottle mesh pockets', 'Reflective safety strip accents for evening walk visibility'], '{"Dimensions": "34cm Height x 26cm Width x 14cm Depth", "Weight": "420 g", "Parent ASIN": "B0HK89RJX5", "Age Group": "3 to 8 Years"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000003');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0005-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000005', '/products/dino-roar-toddler-backpack-hero.jpg', 'Dinosaur 3D Kids Backpack', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0005-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000005', '/products/dino-roar-toddler-backpack-angle.jpg', 'Angle view', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0005-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000005', '/products/dino-roar-toddler-backpack-lifestyle.jpg', 'Lifestyle view', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0005-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000005', '/products/dino-roar-toddler-backpack-park.jpg', 'Park view', 4, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0005-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000005', 'Green Dino', 'CC1', 699, 1999, '{"color": "Green Dino", "color_code": "#10B981", "asin": "B0HK89D6NG"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0005-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000005', 'Navy Dino', 'CC2', 699, 1999, '{"color": "Navy Dino", "color_code": "#1E3A8A", "asin": "B0HK83PFYY"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0005-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000005', 'Black Dino', 'CC3', 699, 1999, '{"color": "Black Dino", "color_code": "#1F2937", "asin": "B0HK8B8FHH"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000005', 35, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000006', 'Lunch Box Stainless Steel Insulated Food Jar with Folding Spoon 450ML', 'lunch-box-stainless-steel-insulated-food-jar-450ml', 'Keep your meals warm and fresh on the go with this adorable insulated food jar, perfect for soups, porridge, and other hot or cold foods. Crafted with a food-grade 304 stainless steel inner tank, this 450ml thermos container effectively maintains food temperature for up to 3-4 hours. Double-layer construction protects hands from heat, while built-in ventilation valve ensures easy opening.', '450ml double-layer SUS304 stainless steel food jar with collapsible spoon.', 'Y1-G42M-7TA5',
    799, 799, 0,
    'all', 'Urban Essentials', ARRAY['food-jar', 'thermos', 'soup-flask', 'insulated', 'water-bottles'],
    4.8, 31, TRUE,
    TRUE, FALSE,
    TRUE, ARRAY['SUS304 food-grade stainless steel interior container keeps soups fresh and hygienic', 'Maintains thermal heat for up to 3-4 hours without external power', 'Built-in pressure release button on top lid allows easy opening without vacuum seal sticking', 'Includes neatly hidden foldable spoon stored inside the top lid chamber', 'Soft flexible silicone carry strap for easy holding on commute'], '{"Capacity": "450 ml", "Dimensions": "17 cm Height x 10 cm Diameter", "Material": "SUS304 Stainless Steel & Food-Grade PP", "Parent ASIN": "B0HKFSH9QS"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000002');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0006-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000006', '/products/tedemei-food-jar-hero.png', 'Insulated Stainless Steel Food Jar 450ML', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0006-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000006', '/products/tedemei-food-jar-box-green.jpg', 'Food jar in box', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0006-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000006', '/products/tedemei-food-jar-exploded.png', 'Exploded diagram', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0006-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000006', '/products/tedemei-food-jar-lid-spoon.jpg', 'Lid with folding spoon', 4, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0006-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000006', 'Pastel Green', 'FT2', 799, 799, '{"color": "Pastel Green", "color_code": "#6EE7B7", "asin": "B0HKG19V36"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0006-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000006', 'Pastel Pink', 'FT3', 799, 799, '{"color": "Pastel Pink", "color_code": "#F472B6", "asin": "B0HKMTGTLG"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000006', 40, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000007', 'Lunch Box Stainless Steel Bento 3 Compartment, 700 ml', 'lunch-box-stainless-steel-bento-3-compartment-700ml', 'This premium stainless steel bento lunch box is thoughtfully designed for healthy, balanced meals on the go — perfect for kids at school as well as adults at the office. Crafted from high-quality 304 stainless steel and food-grade PP material, it is BPA-free, non-toxic, and leakproof. Features 700 ml capacity plus 100 ml dip container and chopsticks.', '700ml 3-compartment SUS304 stainless steel bento lunch box with leakproof silicone seals.', 'KW-MKVB-DBPX',
    850, 1999, 57,
    'all', 'Urban Essentials', ARRAY['bento', 'lunch-box', '3-compartment', 'stainless-steel', 'office', 'school', 'bestseller'],
    4.9, 52, TRUE,
    TRUE, TRUE,
    TRUE, ARRAY['Food-grade 304 stainless steel inner tray is stain-free, durable, and rust-proof', '3 separate food sections keep main course, sides, and snacks fresh without mixing', '100% leakproof silicone rim seal and 4 side latch locks prevent bag spills', 'Includes stainless steel spoon, chopsticks, and removable dip container', 'Dishwasher safe inner tray and easy removable top lid'], '{"Dimensions": "23cm Length x 17cm Width x 7cm Height", "Capacity": "700 ml Main + 100 ml Dip", "Weight": "310 g", "Parent ASIN": "B0HKMV4FSX"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000001');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0007-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000007', '/products/probento-7091-hero.png', 'Bento 3 Compartment 700ml', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0007-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000007', '/products/probento-7091-colorways.png', 'Color variants', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0007-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000007', '/products/probento-7091-dimensions.png', 'Dimensions diagram', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0007-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000007', '/products/probento-7091-sus304.png', 'SUS304 material view', 4, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0007-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000007', 'Navy Blue', 'LLL1', 850, 1999, '{"color": "Navy Blue", "color_code": "#1E3A8A", "asin": "B0HKFWNF23"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0007-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000007', 'Mint Green', 'LLL2', 850, 1999, '{"color": "Mint Green", "color_code": "#10B981", "asin": "B0HKFZZ5XJ"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0007-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000007', 'Blush Pink', 'LLL3', 850, 1999, '{"color": "Blush Pink", "color_code": "#EC4899", "asin": "B0HKFWHM66"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0007-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000007', 'Lemon Yellow', 'LLL4', 850, 1999, '{"color": "Lemon Yellow", "color_code": "#EAB308", "asin": "B0HKMVC87V"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000007', 45, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000008', 'Retro Telephone Theme Kids Backpack and Lunch Bag Series 3D EVA Shell', 'retro-telephone-theme-kids-backpack-3d-eva-shell', 'Give your little one a backpack that truly stands out with this charming Premium Retro Telephone Kids Backpack! Featuring a nostalgic rotary phone design with interactive dial pad element, 3D EVA hard-shell body, soft padded back panel, and water-repellent finish.', 'Unique 3D rotary telephone hard-shell EVA toddler backpack.', '47-4CQK-DIQA',
    799, 1999, 60,
    'school', 'Urban Essentials', ARRAY['retro-telephone', 'backpack', '3d-shell', 'kids', 'toddler'],
    4.8, 27, FALSE,
    TRUE, FALSE,
    TRUE, ARRAY['Interactive rotary phone dial motif on durable 3D molded EVA front shell', 'Water-repellent oxford fabric back and side panels keep contents dry', 'Breathable padded mesh back panel reduces sweating during outdoor play', 'Internal slip pockets and elastic retention loops for bottle and pencil box', 'Easy-glide oversized double zippers tailored for small hands'], '{"Dimensions": "28cm Height x 25cm Width x 12cm Depth", "Weight": "380 g", "Parent ASIN": "B0HK83TR2Y", "Material": "3D EVA & Water-Resistant Polyester"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000003');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0008-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000008', '/products/retro-telephone-backpack-hero.jpg', 'Retro Telephone Kids Backpack', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0008-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000008', '/products/retro-telephone-backpack-blue.jpg', 'Blue variant', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0008-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000008', '/products/retro-telephone-backpack-purple.jpg', 'Purple variant', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0008-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000008', '/products/retro-telephone-backpack-detail.jpg', 'Dial pad detail', 4, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0008-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000008', '/products/retro-telephone-backpack-specs.jpg', 'Specs diagram', 5, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0008-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000008', 'Pastel Pink', 'QT-PEXL-NLPW', 799, 1999, '{"color": "Pastel Pink", "color_code": "#F472B6", "asin": "B0HK84C2B1"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0008-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000008', 'Sky Blue', 'QT-PEXL-NLPX', 799, 1999, '{"color": "Sky Blue", "color_code": "#38BDF8", "asin": "B0HK83GR1B"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0008-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000008', 'Lavender Purple', 'QT-PEXL-NLPY', 799, 1999, '{"color": "Lavender Purple", "color_code": "#C084FC", "asin": "B0HK891SGY"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000008', 30, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000009', 'Smie Stainless Steel 4 Compartment Bento Lunch Box 950ml', 'smie-stainless-steel-4-compartment-bento-lunch-box-950ml', 'Keep your meals fresh, organised, and ready to go with this Stainless Steel 4 Compartment Bento Lunch Box 950ml. Crafted from premium SUS304 food-grade stainless steel interior tray, it features 4 distinct food sections to separate main dishes, rotis, salads, and snacks cleanly.', '950ml 4-compartment SUS304 stainless steel bento lunch box with leakproof lid.', 'ON-O66E-3EGG',
    799, 1999, 60,
    'all', 'Urban Essentials', ARRAY['bento', 'lunch-box', '4-compartment', 'stainless-steel', 'office', 'school'],
    4.8, 38, TRUE,
    TRUE, FALSE,
    TRUE, ARRAY['4 generous compartments prevent sauce mixing and preserve distinct flavors', 'High-grade SUS304 stainless steel inner container is non-reactive and odor-free', 'Thick silicone lid seal strip and 4 snap-lock side latches guarantee leak resistance', 'Outer thermal plastic tray allows hot water pouring underneath to reheat food', 'Includes dedicated cutlery holder compartment on top lid'], '{"Capacity": "950 ml", "Dimensions": "24cm x 18cm x 6.5cm", "Material": "SUS304 Stainless Steel & PP Outer Container", "Parent ASIN": "B0HKFWLJDY"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000009', 'c1000000-0000-0000-0000-000000000001');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0009-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000009', '/products/bento-5-compartment-hero.png', 'Smie 4 Compartment Bento Box 950ml', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0009-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000009', '/products/bento-5-compartment-colors.jpg', 'Colors available', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0009-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000009', '/products/bento-5-compartment-leakproof-seal.png', 'Leakproof seal', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0009-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000009', '/products/bento-5-compartment-water-heating.png', 'Warm water heating method', 4, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0009-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000009', 'Pastel Pink', 'SS1', 799, 1999, '{"color": "Pastel Pink", "color_code": "#F472B6", "asin": "B0HKFK556S"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0009-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000009', 'Sky Blue', 'SS2', 799, 1999, '{"color": "Sky Blue", "color_code": "#38BDF8", "asin": "B0HKFVH4V1"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0009-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000009', 'Sunny Yellow', 'SS3', 799, 1999, '{"color": "Sunny Yellow", "color_code": "#FBBF24", "asin": "B0HKFRRZG6"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000009', 40, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000010', 'KOOOL Backpack for Kids School & Travel Yellow Silicone with Charms', 'koool-backpack-kids-school-travel-yellow-silicone-charms', 'Introducing the KOOOL Animal Backpack — a delightfully quirky and functional bag designed especially for little adventurers. Made with a waterproof silicone outer shell featuring customizable DIY shoe-charm style pop pins, ergonomic shoulder straps, and gift box packaging.', 'Waterproof yellow silicone EVA kids DIY backpack with customizable charms.', 'Yellow 1',
    2499, 5000, 50,
    'school', 'Urban Essentials', ARRAY['koool', 'backpack', 'silicone', 'diy-charms', 'yellow', 'premium', 'bestseller'],
    5.0, 64, TRUE,
    TRUE, TRUE,
    TRUE, ARRAY['100% waterproof food-grade silicone EVA outer hull resists stain and dirt', 'Includes set of collectible 3D silicone pop-pin charms for personalized DIY creation', 'Ultra-durable scratch-proof build stands up to active playtime usage', 'Soft breathable shoulder straps with chest safety clip', 'Delivered in premium gift box packaging — ideal birthday present'], '{"Dimensions": "30cm Height x 24cm Width x 12cm Depth", "ASIN": "B0HKFZY583", "Weight": "520 g", "Material": "EVA & Food-Grade Silicone"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000003');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0010-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000010', '/products/koool-backpack-hero.jpg', 'KOOOL Yellow Silicone Backpack Hero', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0010-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000010', '/products/koool-backpack-side.jpg', 'Side view', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0010-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000010', '/products/koool-backpack-straps.jpg', 'Shoulder straps and back', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0010-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000010', '/products/koool-backpack-gift-box.jpg', 'Gift box presentation', 4, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0010-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000010', '/products/koool-backpack-spacious-spec.jpg', 'Spacious interior spec', 5, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0010-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000010', 'Sunshine Yellow Silicone', 'Yellow 1', 2499, 5000, '{"color": "Sunshine Yellow", "color_code": "#FACC15", "asin": "B0HKFZY583"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000010', 25, 3);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000011', 'Fruit Style Water Sipper For School & Office Going with Straw, 800ml', 'fruit-style-water-sipper-school-office-straw-800ml', 'Meet your perfect everyday mug — the Kunmao Stainless Steel Tumbler with Straw! With a generous 800ml capacity, this stylish gingham & fruit-patterned water bottle keeps your water, iced coffee, or tea refreshingly cold for up to 12 hours or warm for 6 hours.', '800ml SUS304 insulated stainless steel fruit tumbler with straw and handle.', 'HT111',
    840, 1500, 44,
    'all', 'Urban Essentials', ARRAY['water-bottle', 'sipper', 'tumbler', 'straw-bottle', 'fruit-design', '800ml'],
    4.7, 22, FALSE,
    TRUE, FALSE,
    TRUE, ARRAY['Double-wall vacuum insulated SUS304 stainless steel keeps drinks cold for 12 hrs', '800ml large capacity reduces frequent refill trips throughout work or school', 'Dual drink opening: sip through silicone straw or flip-top wide mouth spout', 'Built-in sturdy carry handle for easy portability', 'Sweat-proof powder-coated exterior with charming fruit graphic design'], '{"Capacity": "800 ml", "Dimensions": "22 cm Height x 9 cm Base Diameter", "Material": "SUS304 Stainless Steel & Food-Grade Silicone", "ASIN": "B0HKN4JKNG"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000011', 'c1000000-0000-0000-0000-000000000002');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0011-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000011', '/products/kunmao-gingham-fruit-tumbler-hero.jpg', 'Fruit Water Sipper Tumbler 800ml', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0011-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000011', '/products/kunmao-gingham-fruit-tumbler-yellow.jpg', 'Yellow fruit motif', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0011-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000011', '/products/kunmao-gingham-fruit-tumbler-pink.jpg', 'Pink motif', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0011-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000011', '/products/kunmao-gingham-fruit-tumbler-blue.jpg', 'Blue motif', 4, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0011-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000011', '/products/kunmao-gingham-fruit-tumbler-spout.jpg', 'Dual spout lid detail', 5, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0011-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000011', 'Lemon Yellow Gingham', 'HT111', 840, 1500, '{"color": "Lemon Yellow", "color_code": "#FDE047", "asin": "B0HKN4JKNG"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000011', 30, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000012', 'Kids School Backpack with 3D Superhero Designs (Spider-Man & Batman Combo)', 'kids-school-backpack-3d-superhero-designs-combo', 'Make school days more exciting with these vibrant kids'' school backpacks, available in three thrilling series — Spider-Man, Batman, and Football. Designed with 3D embossed superhero graphics, ergonomic padded shoulder straps, dual water bottle mesh pockets, and heavy-duty water-resistant oxford fabric.', 'Premium 3D superhero hard-shell kids school backpack combo series.', 'Kids-Backpack',
    1999, 4000, 50,
    'school', 'Urban Essentials', ARRAY['spiderman', 'batman', 'superhero', 'backpack', '3d-backpack', 'school-bag', 'bestseller'],
    4.9, 71, TRUE,
    TRUE, TRUE,
    TRUE, ARRAY['3D high-relief molded superhero face shell front panel', 'Waterproof high-grade 600D oxford cloth protects school notebooks from rain', 'Multi-compartment layout with laptop/tablet sleeve and pencil organizer', 'Padded S-shape shoulder straps with breathable mesh spine backing', 'Heavy duty rubberized zip heads with smooth metal tracks'], '{"Dimensions": "40cm Height x 30cm Width x 16cm Depth", "Parent ASIN": "B0HL87JXT8", "Weight": "650 g", "Recommended Grade": "Primary School (Class 1 to 6)"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000012', 'c1000000-0000-0000-0000-000000000003');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0012-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000012', '/products/spiderman-3in1-combo-hero.jpg', 'Spider-Man 3D School Backpack', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0012-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000012', '/products/spiderman-3in1-combo-angle.jpg', 'Spider-Man angle view', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0012-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000012', '/products/spiderman-3in1-combo-infographic.jpg', 'Backpack features infographic', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0012-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000012', '/products/batman-3in1-combo-hero.jpg', 'Batman Dark Knight Backpack', 4, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0012-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000012', '/products/batman-3in1-combo-action.jpg', 'Batman action shot', 5, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0012-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000012', 'Spider-Man Hero Blue & Red', 'Kids 1', 1999, 4000, '{"color": "Spider-Man Red/Blue", "color_code": "#EF4444", "asin": "B0HL8941V6"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0012-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000012', 'Batman Dark Knight Black', 'Kids 2', 1999, 4000, '{"color": "Batman Black", "color_code": "#18181B", "asin": "B0HL8D3Y1D"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0012-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000012', 'Football Champions Gold & Black', 'Kids 3', 1999, 4000, '{"color": "Football Gold/Black", "color_code": "#EAB308", "asin": "B0HL826R4Q"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000012', 40, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000013', 'Water Sipper for Kids & Adults with Handle 750ml', 'water-sipper-kids-adults-handle-750ml', 'Make hydration fun and exciting for your little one with this adorable Cute Straw Tumbler with Handle! Standing 26cm tall with a 750ml capacity, it features a leakproof locking cap, silicone straw, flip handle, and double-wall vacuum insulation.', '750ml cute straw tumbler with carry handle and leakproof locking cap.', 'TT111',
    850, 1500, 43,
    'all', 'Urban Essentials', ARRAY['water-sipper', 'tumbler', 'straw-bottle', '750ml', 'handle'],
    4.8, 26, TRUE,
    TRUE, FALSE,
    TRUE, ARRAY['750ml generous volume keeps children hydrated throughout school hours', 'Food-grade soft silicone straw protects young teeth and gums', 'One-touch pop-up lid button with safety latch prevents accidental opening in bags', 'Wide ergonomic top loop handle for easy carrying by kids and parents', 'Dishwasher safe top lid components with easy disassembly'], '{"Capacity": "750 ml", "Height": "26 cm", "Parent ASIN": "B0HKN697LR", "Material": "SUS304 Inner Core & Food-Grade PP"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000013', 'c1000000-0000-0000-0000-000000000002');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0013-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000013', '/products/ice-cream-1000ml-tumbler-hero.jpg', 'Water Sipper 750ml with Handle', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0013-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000013', '/products/ice-cream-1000ml-tumbler-pink.jpg', 'Pink tumbler', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0013-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000013', '/products/ice-cream-1000ml-tumbler-green.jpg', 'Green tumbler', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0013-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000013', '/products/ice-cream-1000ml-tumbler-lid-straw.jpg', 'Straw lid detail', 4, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0013-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000013', 'Pastel Pink', 'PP2', 850, 1500, '{"color": "Pastel Pink", "color_code": "#F472B6", "asin": "B0HKN2HLHQ"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0013-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000013', 'Ocean Blue', 'PPP1', 950, 1500, '{"color": "Ocean Blue", "color_code": "#38BDF8", "asin": "B0HKMXSJFH"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000013', 30, 5);


-- ============================================================================
-- Amazon Product Import Seed
-- ============================================================================

DELETE FROM public.inventory;
DELETE FROM public.product_variants;
DELETE FROM public.product_images;
DELETE FROM public.product_categories;
DELETE FROM public.products;

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000001', '2 Layer Stainless Steel Lunch Box with 2-Compartment Tray Locking Lid & Spoon', '2-layer-stainless-steel-lunch-box-locking-lid-spoon', 'Say hello to a smarter way of carrying your meals with this stylish 2-layer stainless steel lunch box. Crafted from premium 304 food-grade stainless steel with a non-toxic PP exterior, it keeps your meals hot, fresh, and perfectly organized. Features independent leakproof compartments, steam release valve, fold-away handles, and included spoon.', '2-layer SUS304 stainless steel tiffin with 2-compartment tray, locking lid, and spoon.', 'Hello Tuesday 1',
    950, 1499, 36,
    'office', 'Urban Essentials', ARRAY['lunch-box', 'tiffin', 'stainless-steel', '2-layer', 'office', 'school', 'bestseller'],
    4.8, 42, TRUE,
    TRUE, TRUE,
    TRUE, ARRAY['Food-grade SUS304 stainless steel inner containers for health and safety', 'Airtight silicone seal and secure side lock clips prevent any spill or leak', 'Built-in steam release valve on the lid allows easy pressure equalisation', 'Includes ergonomic foldable spoon neatly docked in the lid compartment', 'Double-wall insulation keeps food hot and hands comfortable'], '{"Material": "SUS304 Stainless Steel & Food-Grade PP", "Capacity": "1100 ml Dual Tier", "Parent ASIN": "B0HKKHQYKP", "Item Dimensions": "20cm x 14cm x 12cm", "Included Accessories": "Foldable Stainless Steel Spoon"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0001-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'https://m.media-amazon.com/images/I/41-rdTgiHVL.jpg', '2 Layer Stainless Steel Lunch Box with 2-Compartment Tray Locking Lid & Spoon', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0001-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'https://m.media-amazon.com/images/I/61TDgKst5cL.jpg', '2 Layer Stainless Steel Lunch Box with 2-Compartment Tray Locking Lid & Spoon', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0001-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'https://m.media-amazon.com/images/I/617x15ggO-L.jpg', '2 Layer Stainless Steel Lunch Box with 2-Compartment Tray Locking Lid & Spoon', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0001-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'https://m.media-amazon.com/images/I/61YnrbJKfGL.jpg', '2 Layer Stainless Steel Lunch Box with 2-Compartment Tray Locking Lid & Spoon', 4, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0001-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'https://m.media-amazon.com/images/I/617LAlB+JuL.jpg', '2 Layer Stainless Steel Lunch Box with 2-Compartment Tray Locking Lid & Spoon', 5, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0001-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000001', 'https://m.media-amazon.com/images/I/61gnzbtMc4L.jpg', '2 Layer Stainless Steel Lunch Box with 2-Compartment Tray Locking Lid & Spoon', 6, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0001-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000001', 'https://m.media-amazon.com/images/I/41FHnQdlkIL.jpg', '2 Layer Stainless Steel Lunch Box with 2-Compartment Tray Locking Lid & Spoon', 7, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0001-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000001', 'https://m.media-amazon.com/images/I/611yuINmv1L.jpg', '2 Layer Stainless Steel Lunch Box with 2-Compartment Tray Locking Lid & Spoon', 8, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0001-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000001', 'https://m.media-amazon.com/images/I/61MmkIX5TqL.jpg', '2 Layer Stainless Steel Lunch Box with 2-Compartment Tray Locking Lid & Spoon', 9, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0001-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Mint Green', '09-O3EY-9YB4', 950, 950, '{"color": "Mint Green", "color_code": "#6EE7B7", "asin": "B0HKKMRZH7", "image_url": "https://m.media-amazon.com/images/I/41-rdTgiHVL.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0001-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Mint Green (Deluxe Edition)', 'TL-WUWT-O5EV', 950, 1499, '{"color": "Mint Green (Deluxe)", "color_code": "#34D399", "asin": "B0HJ6BZ18S", "image_url": "https://m.media-amazon.com/images/I/41-rdTgiHVL.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0001-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Sky Blue & Yellow', 'S1-ZQ5I-7VXH', 950, 950, '{"color": "Sky Blue & Yellow", "color_code": "#38BDF8", "asin": "B0HJ64H555", "image_url": "https://m.media-amazon.com/images/I/41FHnQdlkIL.jpg"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000001', 45, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000002', 'Kids School Backpack with Astronaut & Cartoon Designs, 12L', 'kids-school-backpack-astronaut-cartoon-12l', 'Make back-to-school exciting for your little one with this adorable kids backpack, perfectly sized for children aged 3 to 7 years. Measuring 32 cm in height and 26 cm in width, with a generous 12-litre capacity, it offers ample room for a lunch box, water bottle, stationery, and small books. Features 3 separate compartments, water-repellent fabric, and ergonomic padded straps.', 'Ergonomic 12L water-repellent kids backpack with 3 compartments for ages 3 to 7.', 'D6-HXA5-ZCGW',
    799, 1999, 60,
    'school', 'Urban Essentials', ARRAY['backpack', 'kids-school-bag', 'astronaut', 'dinosaur', 'kuromi', 'school', 'bestseller'],
    4.9, 58, TRUE,
    TRUE, TRUE,
    TRUE, ARRAY['12 Litre generous capacity tailored for kindergarten and primary school kids', '3 separate organised zip compartments and dual stretch mesh water bottle side pockets', 'High-density water-repellent soft outer fabric is easy to clean and extra durable', 'Ergonomic breathable mesh padded shoulder straps and back panel for comfort', 'Weighs only 400g to reduce shoulder strain for young children'], '{"Dimensions": "32 cm Height x 26 cm Width x 14 cm Depth", "Capacity": "12 Litres", "Recommended Age": "3 to 7 Years", "Weight": "400 g", "Parent ASIN": "B0HJX4WP9R"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000003');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0002-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'https://m.media-amazon.com/images/I/41wUK-3wXmL.jpg', 'Kids School Backpack with Astronaut & Cartoon Designs, 12L', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0002-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'https://m.media-amazon.com/images/I/61MYLzVz8+L.jpg', 'Kids School Backpack with Astronaut & Cartoon Designs, 12L', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0002-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002', 'https://m.media-amazon.com/images/I/61jARGWQFYL.jpg', 'Kids School Backpack with Astronaut & Cartoon Designs, 12L', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0002-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000002', 'https://m.media-amazon.com/images/I/6197aYDhS4L.jpg', 'Kids School Backpack with Astronaut & Cartoon Designs, 12L', 4, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0002-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000002', 'https://m.media-amazon.com/images/I/61UHnafNBiL.jpg', 'Kids School Backpack with Astronaut & Cartoon Designs, 12L', 5, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0002-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000002', 'https://m.media-amazon.com/images/I/61Ic0piKXbL.jpg', 'Kids School Backpack with Astronaut & Cartoon Designs, 12L', 6, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0002-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000002', 'https://m.media-amazon.com/images/I/61rzxE2JVgL.jpg', 'Kids School Backpack with Astronaut & Cartoon Designs, 12L', 7, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0002-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000002', 'https://m.media-amazon.com/images/I/519XthGWnHL.jpg', 'Kids School Backpack with Astronaut & Cartoon Designs, 12L', 8, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0002-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000002', 'https://m.media-amazon.com/images/I/613f9WMQK5L.jpg', 'Kids School Backpack with Astronaut & Cartoon Designs, 12L', 9, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0002-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000002', 'https://m.media-amazon.com/images/I/51YnmrE-kWL.jpg', 'Kids School Backpack with Astronaut & Cartoon Designs, 12L', 10, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0002-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'Astronaut Space Explorer', '1I-32TA-QXQI', 799, 1999, '{"color": "Astronaut Space", "color_code": "#1E3A8A", "asin": "B0HJQN1LRG", "image_url": "https://m.media-amazon.com/images/I/41wUK-3wXmL.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0002-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'Space Rocket (Astronaut)', 'AS1', 899, 899, '{"color": "Space Rocket", "color_code": "#2563EB", "asin": "B0HJX84LT1", "image_url": "https://m.media-amazon.com/images/I/41wUK-3wXmL.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0002-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002', 'Color Block Pastel', 'CL1', 899, 899, '{"color": "Color Block", "color_code": "#EC4899", "asin": "B0HJXK54TP", "image_url": "https://m.media-amazon.com/images/I/519XthGWnHL.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0002-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000002', 'Cute Animals Pastel', 'CT1', 899, 899, '{"color": "Cute Animals", "color_code": "#F472B6", "asin": "B0HJX9MLMQ", "image_url": "https://m.media-amazon.com/images/I/41oTqZKs2GL.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0002-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000002', 'Kuromi Lavender', 'DD1', 899, 899, '{"color": "Kuromi Lavender", "color_code": "#A855F7", "asin": "B0HKMN74N2", "image_url": "https://m.media-amazon.com/images/I/41rKLdyMf9L.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0002-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000002', 'Dinosaur Roar', 'DN1', 899, 899, '{"color": "Dinosaur Roar", "color_code": "#10B981", "asin": "B0HJX9J75Q", "image_url": "https://m.media-amazon.com/images/I/51Ja3FosgoL.jpg"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000002', 50, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000003', 'Mermaid Theme Kids Backpack and Lunch Bag Series with 3D Molded Shell', 'mermaid-theme-kids-backpack-3d-molded-shell', 'Make every school day a magical underwater adventure with this Premium Retro Mermaid Kids Backpack! Featuring an adorable 3D moulded mermaid graphic with shiny sequin accents, lightweight EVA hard shell front, and spacious interior pockets. Made from durable, water-resistant polyester.', 'Magical 3D molded mermaid EVA backpack with sequin details and ergonomic padded straps.', 'AS11',
    690, 1999, 65,
    'school', 'Urban Essentials', ARRAY['mermaid', 'backpack', '3d-shell', 'sequins', 'kids', 'school'],
    4.8, 35, TRUE,
    TRUE, FALSE,
    TRUE, ARRAY['3D molded hard-shell EVA front panel with shimmering mermaid sequin details', 'Generous main compartment holds A4 books, notebooks, lunch box, and pouch', 'Ergonomic S-shaped shoulder straps prevent slipping and distribute load evenly', 'Waterproof high-density polyester fabric protects books from rain', 'Heavy-duty dual smooth zippers with custom pull tags'], '{"Dimensions": "36cm Height x 28cm Width x 15cm Depth", "Material": "3D EVA Shell & High-Grade Polyester", "Parent ASIN": "B0HK89F8P9", "Age Group": "4 to 9 Years"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000003');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0003-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', 'https://m.media-amazon.com/images/I/51OGhMbXE1L.jpg', 'Mermaid Theme Kids Backpack and Lunch Bag Series with 3D Molded Shell', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0003-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000003', 'https://m.media-amazon.com/images/I/61mPBiOhQmL.jpg', 'Mermaid Theme Kids Backpack and Lunch Bag Series with 3D Molded Shell', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0003-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', 'https://m.media-amazon.com/images/I/61zfHsKPOQL.jpg', 'Mermaid Theme Kids Backpack and Lunch Bag Series with 3D Molded Shell', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0003-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000003', 'https://m.media-amazon.com/images/I/71aLfHpkd6L.jpg', 'Mermaid Theme Kids Backpack and Lunch Bag Series with 3D Molded Shell', 4, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0003-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000003', 'https://m.media-amazon.com/images/I/71YiE3+7-cL.jpg', 'Mermaid Theme Kids Backpack and Lunch Bag Series with 3D Molded Shell', 5, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0003-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000003', 'https://m.media-amazon.com/images/I/71Od30jFIuL.jpg', 'Mermaid Theme Kids Backpack and Lunch Bag Series with 3D Molded Shell', 6, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0003-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000003', 'https://m.media-amazon.com/images/I/5163euttd2L.jpg', 'Mermaid Theme Kids Backpack and Lunch Bag Series with 3D Molded Shell', 7, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0003-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000003', 'https://m.media-amazon.com/images/I/61Gp5yl3ISL.jpg', 'Mermaid Theme Kids Backpack and Lunch Bag Series with 3D Molded Shell', 8, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0003-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000003', 'https://m.media-amazon.com/images/I/71GUbaxrnOL.jpg', 'Mermaid Theme Kids Backpack and Lunch Bag Series with 3D Molded Shell', 9, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0003-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000003', 'https://m.media-amazon.com/images/I/71n1X8bg3kL.jpg', 'Mermaid Theme Kids Backpack and Lunch Bag Series with 3D Molded Shell', 10, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0003-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', 'Purple & Pink Mermaid', 'AS12', 690, 1999, '{"color": "Purple & Pink", "color_code": "#C084FC", "asin": "B0HK8FWF6L", "image_url": "https://m.media-amazon.com/images/I/51OGhMbXE1L.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0003-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000003', 'Pink & Blue Mermaid', 'AS13', 690, 1999, '{"color": "Pink & Blue", "color_code": "#F472B6", "asin": "B0HK8CRYMN", "image_url": "https://m.media-amazon.com/images/I/5163euttd2L.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0003-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', 'Ocean Blue Mermaid', 'AS33', 690, 1999, '{"color": "Ocean Blue", "color_code": "#38BDF8", "asin": "B0HK8CX2NW", "image_url": "https://m.media-amazon.com/images/I/51Hjfmy-EML.jpg"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000003', 30, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000004', '2 Layer Stainless Steel Lunch Box with Carry Handle & Leak Resistant Seal', '2-layer-stainless-steel-lunch-box-carry-handle', 'Stay organised and well-fed throughout your busy day with this 2-Layer Stainless Steel Lunch Box, specially designed for office goers, school kids, and travelers. High quality SUS304 food-grade inner core, outer insulated plastic shell, and heavy-duty locking side clips with a comfortable top carrying handle.', '2-layer SUS304 stainless steel tiffin container with ergonomic top carry handle.', 'LK-Y0J2-W83Y',
    899, 1999, 55,
    'office', 'Urban Essentials', ARRAY['lunch-box', 'tiffin', '2-layer', 'handle', 'office', 'stainless-steel'],
    4.7, 29, FALSE,
    TRUE, FALSE,
    TRUE, ARRAY['Dual stackable stainless steel compartments keep dishes completely separated', 'Sturdy integrated fold-flat carrying handle makes transport easy', 'Airtight silicone seal rim prevents leaks and locks in aroma and heat', 'High temperature resistant food-grade plastic outer shell remains cool to touch', 'Wide mouth design makes packing food and hand-washing effortless'], '{"Material": "SUS304 Stainless Steel & PP Exterior", "Capacity": "1600 ml", "Parent ASIN": "B0HK3VGVS9", "Thermal Retention": "3-4 Hours"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000001');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0004-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000004', 'https://m.media-amazon.com/images/I/41Sb5UA1EuL.jpg', '2 Layer Stainless Steel Lunch Box with Carry Handle & Leak Resistant Seal', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0004-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000004', 'https://m.media-amazon.com/images/I/419iVvcXjDL.jpg', '2 Layer Stainless Steel Lunch Box with Carry Handle & Leak Resistant Seal', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0004-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000004', 'https://m.media-amazon.com/images/I/51V8yyMbtUL.jpg', '2 Layer Stainless Steel Lunch Box with Carry Handle & Leak Resistant Seal', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0004-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000004', 'https://m.media-amazon.com/images/I/510R46AHd1L.jpg', '2 Layer Stainless Steel Lunch Box with Carry Handle & Leak Resistant Seal', 4, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0004-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000004', 'https://m.media-amazon.com/images/I/514K8Z0lI9L.jpg', '2 Layer Stainless Steel Lunch Box with Carry Handle & Leak Resistant Seal', 5, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0004-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000004', 'https://m.media-amazon.com/images/I/51vuxBwEz5L.jpg', '2 Layer Stainless Steel Lunch Box with Carry Handle & Leak Resistant Seal', 6, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0004-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000004', 'https://m.media-amazon.com/images/I/41B8pMTXksL.jpg', '2 Layer Stainless Steel Lunch Box with Carry Handle & Leak Resistant Seal', 7, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0004-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000004', 'https://m.media-amazon.com/images/I/31LxUJUcfHL.jpg', '2 Layer Stainless Steel Lunch Box with Carry Handle & Leak Resistant Seal', 8, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0004-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000004', 'https://m.media-amazon.com/images/I/41Rxr72onjL.jpg', '2 Layer Stainless Steel Lunch Box with Carry Handle & Leak Resistant Seal', 9, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0004-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000004', 'https://m.media-amazon.com/images/I/31NntSs9nTL.jpg', '2 Layer Stainless Steel Lunch Box with Carry Handle & Leak Resistant Seal', 10, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0004-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000004', 'Ocean Blue', 'BL1', 899, 1999, '{"color": "Ocean Blue", "color_code": "#2563EB", "asin": "B0HK3W5WLW", "image_url": "https://m.media-amazon.com/images/I/41Sb5UA1EuL.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0004-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000004', 'Blush Pink', 'PK1', 899, 1999, '{"color": "Blush Pink", "color_code": "#EC4899", "asin": "B0HK42G2H5", "image_url": "https://m.media-amazon.com/images/I/31NntSs9nTL.jpg"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000004', 40, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000005', 'Dinosaur Theme Kids Backpack and Lunch Bag Series with 3D Design', 'dinosaur-theme-kids-backpack-3d-design', 'Make every school day a roaring adventure with this Premium Retro Dinosaur Kids Backpack! Featuring a vibrant 3D moulded T-Rex graphic, lightweight EVA hard shell front, soft-padded back panel, and multi-compartment interior for school gear.', 'Vibrant 3D dinosaur EVA hard-shell school backpack for kids.', 'XK-AUTX-5P07',
    699, 1999, 65,
    'school', 'Urban Essentials', ARRAY['dinosaur', 'backpack', '3d-shell', 'kids-bag', 'school'],
    4.9, 48, TRUE,
    TRUE, TRUE,
    TRUE, ARRAY['3D T-Rex dinosaur molded hard shell front face with vivid color detail', 'Ultra-lightweight high-density water-resistant composite body', 'Soft breathable honeycomb mesh back panel for all-day ventilation', 'Spacious dual main zip compartments with stretch bottle mesh pockets', 'Reflective safety strip accents for evening walk visibility'], '{"Dimensions": "34cm Height x 26cm Width x 14cm Depth", "Weight": "420 g", "Parent ASIN": "B0HK89RJX5", "Age Group": "3 to 8 Years"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000003');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0005-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000005', 'https://m.media-amazon.com/images/I/51lUbC7gWmL.jpg', 'Dinosaur Theme Kids Backpack and Lunch Bag Series with 3D Design', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0005-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000005', 'https://m.media-amazon.com/images/I/61ablbvnKPL.jpg', 'Dinosaur Theme Kids Backpack and Lunch Bag Series with 3D Design', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0005-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000005', 'https://m.media-amazon.com/images/I/61UI4bzrEIL.jpg', 'Dinosaur Theme Kids Backpack and Lunch Bag Series with 3D Design', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0005-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000005', 'https://m.media-amazon.com/images/I/71aLfHpkd6L.jpg', 'Dinosaur Theme Kids Backpack and Lunch Bag Series with 3D Design', 4, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0005-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000005', 'https://m.media-amazon.com/images/I/71wdYyDp8bL.jpg', 'Dinosaur Theme Kids Backpack and Lunch Bag Series with 3D Design', 5, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0005-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000005', 'https://m.media-amazon.com/images/I/61sqbzAfxKL.jpg', 'Dinosaur Theme Kids Backpack and Lunch Bag Series with 3D Design', 6, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0005-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000005', 'https://m.media-amazon.com/images/I/51WgTSWHbSL.jpg', 'Dinosaur Theme Kids Backpack and Lunch Bag Series with 3D Design', 7, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0005-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000005', 'https://m.media-amazon.com/images/I/61DvRRtkZNL.jpg', 'Dinosaur Theme Kids Backpack and Lunch Bag Series with 3D Design', 8, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0005-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000005', 'https://m.media-amazon.com/images/I/612lDeW1JiL.jpg', 'Dinosaur Theme Kids Backpack and Lunch Bag Series with 3D Design', 9, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0005-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000005', 'https://m.media-amazon.com/images/I/51mG3LLmhwL.jpg', 'Dinosaur Theme Kids Backpack and Lunch Bag Series with 3D Design', 10, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0005-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000005', 'Green Dino', 'CC1', 699, 1999, '{"color": "Green Dino", "color_code": "#10B981", "asin": "B0HK89D6NG", "image_url": "https://m.media-amazon.com/images/I/51lUbC7gWmL.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0005-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000005', 'Navy Dino', 'CC2', 699, 1999, '{"color": "Navy Dino", "color_code": "#1E3A8A", "asin": "B0HK83PFYY", "image_url": "https://m.media-amazon.com/images/I/51WgTSWHbSL.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0005-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000005', 'Black Dino', 'CC3', 699, 1999, '{"color": "Black Dino", "color_code": "#1F2937", "asin": "B0HK8B8FHH", "image_url": "https://m.media-amazon.com/images/I/51mG3LLmhwL.jpg"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000005', 35, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000006', 'Lunch Box Stainless Steel Insulated Food Jar with Folding Spoon 450ML', 'lunch-box-stainless-steel-insulated-food-jar-450ml', 'Keep your meals warm and fresh on the go with this adorable insulated food jar, perfect for soups, porridge, and other hot or cold foods. Crafted with a food-grade 304 stainless steel inner tank, this 450ml thermos container effectively maintains food temperature for up to 3-4 hours. Double-layer construction protects hands from heat, while built-in ventilation valve ensures easy opening.', '450ml double-layer SUS304 stainless steel food jar with collapsible spoon.', 'Y1-G42M-7TA5',
    799, 799, 0,
    'all', 'Urban Essentials', ARRAY['food-jar', 'thermos', 'soup-flask', 'insulated', 'water-bottles'],
    4.8, 31, TRUE,
    TRUE, FALSE,
    TRUE, ARRAY['SUS304 food-grade stainless steel interior container keeps soups fresh and hygienic', 'Maintains thermal heat for up to 3-4 hours without external power', 'Built-in pressure release button on top lid allows easy opening without vacuum seal sticking', 'Includes neatly hidden foldable spoon stored inside the top lid chamber', 'Soft flexible silicone carry strap for easy holding on commute'], '{"Capacity": "450 ml", "Dimensions": "17 cm Height x 10 cm Diameter", "Material": "SUS304 Stainless Steel & Food-Grade PP", "Parent ASIN": "B0HKFSH9QS"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000002');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0006-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000006', 'https://m.media-amazon.com/images/I/31hvjnHkfjL.jpg', 'Lunch Box Stainless Steel Insulated Food Jar with Folding Spoon 450ML', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0006-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000006', 'https://m.media-amazon.com/images/I/31LZzG0wViL.jpg', 'Lunch Box Stainless Steel Insulated Food Jar with Folding Spoon 450ML', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0006-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000006', 'https://m.media-amazon.com/images/I/51pKWN8dciL.jpg', 'Lunch Box Stainless Steel Insulated Food Jar with Folding Spoon 450ML', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0006-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000006', 'https://m.media-amazon.com/images/I/51ECSV7KxiL.jpg', 'Lunch Box Stainless Steel Insulated Food Jar with Folding Spoon 450ML', 4, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0006-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000006', 'https://m.media-amazon.com/images/I/41wWdSR+fhL.jpg', 'Lunch Box Stainless Steel Insulated Food Jar with Folding Spoon 450ML', 5, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0006-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000006', 'https://m.media-amazon.com/images/I/51xAzvPWxTL.jpg', 'Lunch Box Stainless Steel Insulated Food Jar with Folding Spoon 450ML', 6, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0006-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000006', 'https://m.media-amazon.com/images/I/41iDmApKgAL.jpg', 'Lunch Box Stainless Steel Insulated Food Jar with Folding Spoon 450ML', 7, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0006-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000006', 'https://m.media-amazon.com/images/I/31ux1Vj4PEL.jpg', 'Lunch Box Stainless Steel Insulated Food Jar with Folding Spoon 450ML', 8, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0006-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000006', 'https://m.media-amazon.com/images/I/31e178H+lQL.jpg', 'Lunch Box Stainless Steel Insulated Food Jar with Folding Spoon 450ML', 9, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0006-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000006', 'https://m.media-amazon.com/images/I/51rCNrzZHHL.jpg', 'Lunch Box Stainless Steel Insulated Food Jar with Folding Spoon 450ML', 10, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0006-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000006', 'Pastel Green', 'FT2', 799, 799, '{"color": "Pastel Green", "color_code": "#6EE7B7", "asin": "B0HKG19V36", "image_url": "https://m.media-amazon.com/images/I/31hvjnHkfjL.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0006-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000006', 'Pastel Pink', 'FT3', 799, 799, '{"color": "Pastel Pink", "color_code": "#F472B6", "asin": "B0HKMTGTLG", "image_url": "https://m.media-amazon.com/images/I/31ux1Vj4PEL.jpg"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000006', 40, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000007', 'Lunch Box Stainless Steel Bento 3 Compartment, 700 ml', 'lunch-box-stainless-steel-bento-3-compartment-700ml', 'This premium stainless steel bento lunch box is thoughtfully designed for healthy, balanced meals on the go — perfect for kids at school as well as adults at the office. Crafted from high-quality 304 stainless steel and food-grade PP material, it is BPA-free, non-toxic, and leakproof. Features 700 ml capacity plus 100 ml dip container and chopsticks.', '700ml 3-compartment SUS304 stainless steel bento lunch box with leakproof silicone seals.', 'KW-MKVB-DBPX',
    850, 1999, 57,
    'all', 'Urban Essentials', ARRAY['bento', 'lunch-box', '3-compartment', 'stainless-steel', 'office', 'school', 'bestseller'],
    4.9, 52, TRUE,
    TRUE, TRUE,
    TRUE, ARRAY['Food-grade 304 stainless steel inner tray is stain-free, durable, and rust-proof', '3 separate food sections keep main course, sides, and snacks fresh without mixing', '100% leakproof silicone rim seal and 4 side latch locks prevent bag spills', 'Includes stainless steel spoon, chopsticks, and removable dip container', 'Dishwasher safe inner tray and easy removable top lid'], '{"Dimensions": "23cm Length x 17cm Width x 7cm Height", "Capacity": "700 ml Main + 100 ml Dip", "Weight": "310 g", "Parent ASIN": "B0HKMV4FSX"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000001');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0007-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000007', 'https://m.media-amazon.com/images/I/51tuJW+o4uL.jpg', 'Lunch Box Stainless Steel Bento 3 Compartment, 700 ml', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0007-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000007', 'https://m.media-amazon.com/images/I/41a357gY7QL.jpg', 'Lunch Box Stainless Steel Bento 3 Compartment, 700 ml', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0007-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000007', 'https://m.media-amazon.com/images/I/71ssMnWT32L.jpg', 'Lunch Box Stainless Steel Bento 3 Compartment, 700 ml', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0007-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000007', 'https://m.media-amazon.com/images/I/51-UqI+M-3L.jpg', 'Lunch Box Stainless Steel Bento 3 Compartment, 700 ml', 4, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0007-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000007', 'https://m.media-amazon.com/images/I/51eSlaQcUgL.jpg', 'Lunch Box Stainless Steel Bento 3 Compartment, 700 ml', 5, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0007-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000007', 'https://m.media-amazon.com/images/I/61VR8Fq1a4L.jpg', 'Lunch Box Stainless Steel Bento 3 Compartment, 700 ml', 6, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0007-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000007', 'https://m.media-amazon.com/images/I/61D27v6WlhL.jpg', 'Lunch Box Stainless Steel Bento 3 Compartment, 700 ml', 7, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0007-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000007', 'https://m.media-amazon.com/images/I/51L8EKqYG4L.jpg', 'Lunch Box Stainless Steel Bento 3 Compartment, 700 ml', 8, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0007-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000007', 'https://m.media-amazon.com/images/I/51q5kosdOeL.jpg', 'Lunch Box Stainless Steel Bento 3 Compartment, 700 ml', 9, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0007-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000007', 'https://m.media-amazon.com/images/I/51zSHyyR1IL.jpg', 'Lunch Box Stainless Steel Bento 3 Compartment, 700 ml', 10, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0007-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000007', 'Navy Blue', 'LLL1', 850, 1999, '{"color": "Navy Blue", "color_code": "#1E3A8A", "asin": "B0HKFWNF23", "image_url": "https://m.media-amazon.com/images/I/51tuJW+o4uL.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0007-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000007', 'Mint Green', 'LLL2', 850, 1999, '{"color": "Mint Green", "color_code": "#10B981", "asin": "B0HKFZZ5XJ", "image_url": "https://m.media-amazon.com/images/I/51zSHyyR1IL.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0007-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000007', 'Blush Pink', 'LLL3', 850, 1999, '{"color": "Blush Pink", "color_code": "#EC4899", "asin": "B0HKFWHM66", "image_url": "https://m.media-amazon.com/images/I/51OU9RDcnBL.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0007-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000007', 'Lemon Yellow', 'LLL4', 850, 1999, '{"color": "Lemon Yellow", "color_code": "#EAB308", "asin": "B0HKMVC87V", "image_url": "https://m.media-amazon.com/images/I/51tuJW+o4uL.jpg"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000007', 45, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000008', 'Retro Telephone Theme Kids Backpack and Lunch Bag Series 3D EVA Shell', 'retro-telephone-theme-kids-backpack-3d-eva-shell', 'Give your little one a backpack that truly stands out with this charming Premium Retro Telephone Kids Backpack! Featuring a nostalgic rotary phone design with interactive dial pad element, 3D EVA hard-shell body, soft padded back panel, and water-repellent finish.', 'Unique 3D rotary telephone hard-shell EVA toddler backpack.', '47-4CQK-DIQA',
    799, 1999, 60,
    'school', 'Urban Essentials', ARRAY['retro-telephone', 'backpack', '3d-shell', 'kids', 'toddler'],
    4.8, 27, FALSE,
    TRUE, FALSE,
    TRUE, ARRAY['Interactive rotary phone dial motif on durable 3D molded EVA front shell', 'Water-repellent oxford fabric back and side panels keep contents dry', 'Breathable padded mesh back panel reduces sweating during outdoor play', 'Internal slip pockets and elastic retention loops for bottle and pencil box', 'Easy-glide oversized double zippers tailored for small hands'], '{"Dimensions": "28cm Height x 25cm Width x 12cm Depth", "Weight": "380 g", "Parent ASIN": "B0HK83TR2Y", "Material": "3D EVA & Water-Resistant Polyester"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000003');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0008-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000008', 'https://m.media-amazon.com/images/I/51ORmBZ6tgL.jpg', 'Retro Telephone Theme Kids Backpack and Lunch Bag Series 3D EVA Shell', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0008-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000008', 'https://m.media-amazon.com/images/I/613CPX5fgFL.jpg', 'Retro Telephone Theme Kids Backpack and Lunch Bag Series 3D EVA Shell', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0008-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000008', 'https://m.media-amazon.com/images/I/61C16VPVnuL.jpg', 'Retro Telephone Theme Kids Backpack and Lunch Bag Series 3D EVA Shell', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0008-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000008', 'https://m.media-amazon.com/images/I/71KQ5RS-4TL.jpg', 'Retro Telephone Theme Kids Backpack and Lunch Bag Series 3D EVA Shell', 4, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0008-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000008', 'https://m.media-amazon.com/images/I/61sHr9OkZML.jpg', 'Retro Telephone Theme Kids Backpack and Lunch Bag Series 3D EVA Shell', 5, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0008-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000008', 'https://m.media-amazon.com/images/I/51AfA41A0NL.jpg', 'Retro Telephone Theme Kids Backpack and Lunch Bag Series 3D EVA Shell', 6, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0008-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000008', 'https://m.media-amazon.com/images/I/61wupsUprxL.jpg', 'Retro Telephone Theme Kids Backpack and Lunch Bag Series 3D EVA Shell', 7, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0008-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000008', 'https://m.media-amazon.com/images/I/61QbR+R640L.jpg', 'Retro Telephone Theme Kids Backpack and Lunch Bag Series 3D EVA Shell', 8, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0008-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000008', 'https://m.media-amazon.com/images/I/61fXp7EnczL.jpg', 'Retro Telephone Theme Kids Backpack and Lunch Bag Series 3D EVA Shell', 9, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0008-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000008', 'https://m.media-amazon.com/images/I/71EB3tZinBL.jpg', 'Retro Telephone Theme Kids Backpack and Lunch Bag Series 3D EVA Shell', 10, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0008-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000008', 'Pastel Pink', 'QT-PEXL-NLPW', 799, 1999, '{"color": "Pastel Pink", "color_code": "#F472B6", "asin": "B0HK84C2B1", "image_url": "https://m.media-amazon.com/images/I/51ORmBZ6tgL.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0008-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000008', 'Sky Blue', 'QT-PEXL-NLPX', 799, 1999, '{"color": "Sky Blue", "color_code": "#38BDF8", "asin": "B0HK83GR1B", "image_url": "https://m.media-amazon.com/images/I/51AfA41A0NL.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0008-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000008', 'Lavender Purple', 'QT-PEXL-NLPY', 799, 1999, '{"color": "Lavender Purple", "color_code": "#C084FC", "asin": "B0HK891SGY", "image_url": "https://m.media-amazon.com/images/I/51hTaQEcEXL.jpg"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000008', 30, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000009', 'Smie Stainless Steel 4 Compartment Bento Lunch Box 950ml', 'smie-stainless-steel-4-compartment-bento-lunch-box-950ml', 'Keep your meals fresh, organised, and ready to go with this Stainless Steel 4 Compartment Bento Lunch Box 950ml. Crafted from premium SUS304 food-grade stainless steel interior tray, it features 4 distinct food sections to separate main dishes, rotis, salads, and snacks cleanly.', '950ml 4-compartment SUS304 stainless steel bento lunch box with leakproof lid.', 'ON-O66E-3EGG',
    799, 1999, 60,
    'all', 'Urban Essentials', ARRAY['bento', 'lunch-box', '4-compartment', 'stainless-steel', 'office', 'school'],
    4.8, 38, TRUE,
    TRUE, FALSE,
    TRUE, ARRAY['4 generous compartments prevent sauce mixing and preserve distinct flavors', 'High-grade SUS304 stainless steel inner container is non-reactive and odor-free', 'Thick silicone lid seal strip and 4 snap-lock side latches guarantee leak resistance', 'Outer thermal plastic tray allows hot water pouring underneath to reheat food', 'Includes dedicated cutlery holder compartment on top lid'], '{"Capacity": "950 ml", "Dimensions": "24cm x 18cm x 6.5cm", "Material": "SUS304 Stainless Steel & PP Outer Container", "Parent ASIN": "B0HKFWLJDY"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000009', 'c1000000-0000-0000-0000-000000000001');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0009-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000009', 'https://m.media-amazon.com/images/I/61ANkMkET7L.jpg', 'Smie Stainless Steel 4 Compartment Bento Lunch Box 950ml', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0009-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000009', 'https://m.media-amazon.com/images/I/61b5YP7QOkL.jpg', 'Smie Stainless Steel 4 Compartment Bento Lunch Box 950ml', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0009-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000009', 'https://m.media-amazon.com/images/I/51a4Bod8tlL.jpg', 'Smie Stainless Steel 4 Compartment Bento Lunch Box 950ml', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0009-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000009', 'https://m.media-amazon.com/images/I/51nKDPictbL.jpg', 'Smie Stainless Steel 4 Compartment Bento Lunch Box 950ml', 4, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0009-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000009', 'https://m.media-amazon.com/images/I/71MbzDt2djL.jpg', 'Smie Stainless Steel 4 Compartment Bento Lunch Box 950ml', 5, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0009-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000009', 'https://m.media-amazon.com/images/I/51BJOeo5GlL.jpg', 'Smie Stainless Steel 4 Compartment Bento Lunch Box 950ml', 6, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0009-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000009', 'https://m.media-amazon.com/images/I/51rVatupnjL.jpg', 'Smie Stainless Steel 4 Compartment Bento Lunch Box 950ml', 7, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0009-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000009', 'https://m.media-amazon.com/images/I/51Hl8BeiTzL.jpg', 'Smie Stainless Steel 4 Compartment Bento Lunch Box 950ml', 8, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0009-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000009', 'https://m.media-amazon.com/images/I/51ploaeT6SL.jpg', 'Smie Stainless Steel 4 Compartment Bento Lunch Box 950ml', 9, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0009-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000009', 'https://m.media-amazon.com/images/I/617GBitLcJL.jpg', 'Smie Stainless Steel 4 Compartment Bento Lunch Box 950ml', 10, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0009-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000009', 'Pastel Pink', 'SS1', 799, 1999, '{"color": "Pastel Pink", "color_code": "#F472B6", "asin": "B0HKFK556S", "image_url": "https://m.media-amazon.com/images/I/61ANkMkET7L.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0009-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000009', 'Sky Blue', 'SS2', 799, 1999, '{"color": "Sky Blue", "color_code": "#38BDF8", "asin": "B0HKFVH4V1", "image_url": "https://m.media-amazon.com/images/I/51ploaeT6SL.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0009-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000009', 'Sunny Yellow', 'SS3', 799, 1999, '{"color": "Sunny Yellow", "color_code": "#FBBF24", "asin": "B0HKFRRZG6", "image_url": "https://m.media-amazon.com/images/I/51RI38vtpfL.jpg"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000009', 40, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000010', 'KOOOL Backpack for Kids School & Travel Yellow Silicone with Charms', 'koool-backpack-kids-school-travel-yellow-silicone-charms', 'Introducing the KOOOL Animal Backpack — a delightfully quirky and functional bag designed especially for little adventurers. Made with a waterproof silicone outer shell featuring customizable DIY shoe-charm style pop pins, ergonomic shoulder straps, and gift box packaging.', 'Waterproof yellow silicone EVA kids DIY backpack with customizable charms.', 'Yellow 1',
    2499, 5000, 50,
    'school', 'Urban Essentials', ARRAY['koool', 'backpack', 'silicone', 'diy-charms', 'yellow', 'premium', 'bestseller'],
    5.0, 64, TRUE,
    TRUE, TRUE,
    TRUE, ARRAY['100% waterproof food-grade silicone EVA outer hull resists stain and dirt', 'Includes set of collectible 3D silicone pop-pin charms for personalized DIY creation', 'Ultra-durable scratch-proof build stands up to active playtime usage', 'Soft breathable shoulder straps with chest safety clip', 'Delivered in premium gift box packaging — ideal birthday present'], '{"Dimensions": "30cm Height x 24cm Width x 12cm Depth", "ASIN": "B0HKFZY583", "Weight": "520 g", "Material": "EVA & Food-Grade Silicone"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000003');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0010-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000010', 'https://m.media-amazon.com/images/I/51knkJb9JsL.jpg', 'KOOOL Backpack for Kids School & Travel Yellow Silicone with Charms', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0010-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000010', 'https://m.media-amazon.com/images/I/719yLUrc7gL.jpg', 'KOOOL Backpack for Kids School & Travel Yellow Silicone with Charms', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0010-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000010', 'https://m.media-amazon.com/images/I/718mUwrItnL.jpg', 'KOOOL Backpack for Kids School & Travel Yellow Silicone with Charms', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0010-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000010', 'https://m.media-amazon.com/images/I/71HrJHIt3kL.jpg', 'KOOOL Backpack for Kids School & Travel Yellow Silicone with Charms', 4, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0010-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000010', 'https://m.media-amazon.com/images/I/71OBKiC-+XL.jpg', 'KOOOL Backpack for Kids School & Travel Yellow Silicone with Charms', 5, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0010-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000010', 'https://m.media-amazon.com/images/I/61kXXAEzwoL.jpg', 'KOOOL Backpack for Kids School & Travel Yellow Silicone with Charms', 6, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0010-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000010', 'https://m.media-amazon.com/images/I/71sfjYFjjIL.jpg', 'KOOOL Backpack for Kids School & Travel Yellow Silicone with Charms', 7, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0010-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000010', 'Sunshine Yellow Silicone', 'Yellow 1', 2499, 5000, '{"color": "Sunshine Yellow", "color_code": "#FACC15", "asin": "B0HKFZY583", "image_url": "https://m.media-amazon.com/images/I/51knkJb9JsL.jpg"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000010', 25, 3);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000011', 'Fruit Style Water Sipper For School & Office Going with Straw, 800ml', 'fruit-style-water-sipper-school-office-straw-800ml', 'Meet your perfect everyday mug — the Kunmao Stainless Steel Tumbler with Straw! With a generous 800ml capacity, this stylish gingham & fruit-patterned water bottle keeps your water, iced coffee, or tea refreshingly cold for up to 12 hours or warm for 6 hours.', '800ml SUS304 insulated stainless steel fruit tumbler with straw and handle.', 'HT111',
    840, 1500, 44,
    'all', 'Urban Essentials', ARRAY['water-bottle', 'sipper', 'tumbler', 'straw-bottle', 'fruit-design', '800ml'],
    4.7, 22, FALSE,
    TRUE, FALSE,
    TRUE, ARRAY['Double-wall vacuum insulated SUS304 stainless steel keeps drinks cold for 12 hrs', '800ml large capacity reduces frequent refill trips throughout work or school', 'Dual drink opening: sip through silicone straw or flip-top wide mouth spout', 'Built-in sturdy carry handle for easy portability', 'Sweat-proof powder-coated exterior with charming fruit graphic design'], '{"Capacity": "800 ml", "Dimensions": "22 cm Height x 9 cm Base Diameter", "Material": "SUS304 Stainless Steel & Food-Grade Silicone", "ASIN": "B0HKN4JKNG"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000011', 'c1000000-0000-0000-0000-000000000002');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0011-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000011', 'https://m.media-amazon.com/images/I/41brRzrRJFL.jpg', 'Fruit Style Water Sipper For School & Office Going with Straw, 800ml', 1, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0011-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000011', 'Lemon Yellow Gingham', 'HT111', 840, 1500, '{"color": "Lemon Yellow", "color_code": "#FDE047", "asin": "B0HKN4JKNG", "image_url": "https://m.media-amazon.com/images/I/41brRzrRJFL.jpg"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000011', 30, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000012', 'Kids School Backpack with 3D Superhero Designs (Spider-Man & Batman Combo)', 'kids-school-backpack-3d-superhero-designs-combo', 'Make school days more exciting with these vibrant kids'' school backpacks, available in three thrilling series — Spider-Man, Batman, and Football. Designed with 3D embossed superhero graphics, ergonomic padded shoulder straps, dual water bottle mesh pockets, and heavy-duty water-resistant oxford fabric.', 'Premium 3D superhero hard-shell kids school backpack combo series.', 'Kids-Backpack',
    1999, 4000, 50,
    'school', 'Urban Essentials', ARRAY['spiderman', 'batman', 'superhero', 'backpack', '3d-backpack', 'school-bag', 'bestseller'],
    4.9, 71, TRUE,
    TRUE, TRUE,
    TRUE, ARRAY['3D high-relief molded superhero face shell front panel', 'Waterproof high-grade 600D oxford cloth protects school notebooks from rain', 'Multi-compartment layout with laptop/tablet sleeve and pencil organizer', 'Padded S-shape shoulder straps with breathable mesh spine backing', 'Heavy duty rubberized zip heads with smooth metal tracks'], '{"Dimensions": "40cm Height x 30cm Width x 16cm Depth", "Parent ASIN": "B0HL87JXT8", "Weight": "650 g", "Recommended Grade": "Primary School (Class 1 to 6)"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000012', 'c1000000-0000-0000-0000-000000000003');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0012-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000012', 'https://m.media-amazon.com/images/I/71crsn4z5ML.jpg', 'Kids School Backpack with 3D Superhero Designs (Spider-Man & Batman Combo)', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0012-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000012', 'https://m.media-amazon.com/images/I/714O8oR6kiL.jpg', 'Kids School Backpack with 3D Superhero Designs (Spider-Man & Batman Combo)', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0012-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000012', 'https://m.media-amazon.com/images/I/71uyf3waq1L.jpg', 'Kids School Backpack with 3D Superhero Designs (Spider-Man & Batman Combo)', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0012-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000012', 'https://m.media-amazon.com/images/I/611qrWQabuL.jpg', 'Kids School Backpack with 3D Superhero Designs (Spider-Man & Batman Combo)', 4, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0012-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000012', 'https://m.media-amazon.com/images/I/61Q-1mwpTxL.jpg', 'Kids School Backpack with 3D Superhero Designs (Spider-Man & Batman Combo)', 5, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0012-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000012', 'https://m.media-amazon.com/images/I/71D5D4Jg6LL.jpg', 'Kids School Backpack with 3D Superhero Designs (Spider-Man & Batman Combo)', 6, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0012-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000012', 'https://m.media-amazon.com/images/I/619HTdQy-HL.jpg', 'Kids School Backpack with 3D Superhero Designs (Spider-Man & Batman Combo)', 7, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0012-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000012', 'https://m.media-amazon.com/images/I/71M2gtWdY0L.jpg', 'Kids School Backpack with 3D Superhero Designs (Spider-Man & Batman Combo)', 8, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0012-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000012', 'https://m.media-amazon.com/images/I/71JpNUf8NzL.jpg', 'Kids School Backpack with 3D Superhero Designs (Spider-Man & Batman Combo)', 9, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0012-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000012', 'https://m.media-amazon.com/images/I/61hYu9KT5CL.jpg', 'Kids School Backpack with 3D Superhero Designs (Spider-Man & Batman Combo)', 10, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0012-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000012', 'Spider-Man Hero Blue & Red', 'Kids 1', 1999, 4000, '{"color": "Spider-Man Red/Blue", "color_code": "#EF4444", "asin": "B0HL8941V6", "image_url": "https://m.media-amazon.com/images/I/71crsn4z5ML.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0012-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000012', 'Batman Dark Knight Black', 'Kids 2', 1999, 4000, '{"color": "Batman Black", "color_code": "#18181B", "asin": "B0HL8D3Y1D", "image_url": "https://m.media-amazon.com/images/I/619HTdQy-HL.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0012-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000012', 'Football Champions Gold & Black', 'Kids 3', 1999, 4000, '{"color": "Football Gold/Black", "color_code": "#EAB308", "asin": "B0HL826R4Q", "image_url": "https://m.media-amazon.com/images/I/71OqKPqHLhL.jpg"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000012', 40, 5);

INSERT INTO public.products (
    id, name, slug, description, short_description, sku, price, compare_at_price, discount,
    target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller,
    is_active, features, specifications
) VALUES (
    'a0000000-0000-0000-0000-000000000013', 'Water Sipper for Kids & Adults with Handle 750ml', 'water-sipper-kids-adults-handle-750ml', 'Make hydration fun and exciting for your little one with this adorable Cute Straw Tumbler with Handle! Standing 26cm tall with a 750ml capacity, it features a leakproof locking cap, silicone straw, flip handle, and double-wall vacuum insulation.', '750ml cute straw tumbler with carry handle and leakproof locking cap.', 'TT111',
    850, 1500, 43,
    'all', 'Urban Essentials', ARRAY['water-sipper', 'tumbler', 'straw-bottle', '750ml', 'handle'],
    4.8, 26, TRUE,
    TRUE, FALSE,
    TRUE, ARRAY['750ml generous volume keeps children hydrated throughout school hours', 'Food-grade soft silicone straw protects young teeth and gums', 'One-touch pop-up lid button with safety latch prevents accidental opening in bags', 'Wide ergonomic top loop handle for easy carrying by kids and parents', 'Dishwasher safe top lid components with easy disassembly'], '{"Capacity": "750 ml", "Height": "26 cm", "Parent ASIN": "B0HKN697LR", "Material": "SUS304 Inner Core & Food-Grade PP"}'::jsonb
);
INSERT INTO public.product_categories (product_id, category_id) VALUES ('a0000000-0000-0000-0000-000000000013', 'c1000000-0000-0000-0000-000000000002');
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0013-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000013', 'https://m.media-amazon.com/images/I/41W95NRY1NL.jpg', 'Water Sipper for Kids & Adults with Handle 750ml', 1, TRUE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0013-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000013', 'https://m.media-amazon.com/images/I/618XKfoez1L.jpg', 'Water Sipper for Kids & Adults with Handle 750ml', 2, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0013-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000013', 'https://m.media-amazon.com/images/I/61EGLJUxS4L.jpg', 'Water Sipper for Kids & Adults with Handle 750ml', 3, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0013-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000013', 'https://m.media-amazon.com/images/I/41T2EHNfQhL.jpg', 'Water Sipper for Kids & Adults with Handle 750ml', 4, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0013-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000013', 'https://m.media-amazon.com/images/I/61BVtXHkc+L.jpg', 'Water Sipper for Kids & Adults with Handle 750ml', 5, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0013-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000013', 'https://m.media-amazon.com/images/I/61GXz2LJEaL.jpg', 'Water Sipper for Kids & Adults with Handle 750ml', 6, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0013-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000013', 'https://m.media-amazon.com/images/I/71WnYLEZX9L.jpg', 'Water Sipper for Kids & Adults with Handle 750ml', 7, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0013-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000013', 'https://m.media-amazon.com/images/I/41m9CAleV1L.jpg', 'Water Sipper for Kids & Adults with Handle 750ml', 8, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0013-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000013', 'https://m.media-amazon.com/images/I/51aMtACuj2L.jpg', 'Water Sipper for Kids & Adults with Handle 750ml', 9, FALSE);
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES ('b0000000-0013-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000013', 'https://m.media-amazon.com/images/I/61ohUEOIUzL.jpg', 'Water Sipper for Kids & Adults with Handle 750ml', 10, FALSE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0013-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000013', 'Pastel Pink', 'PP2', 850, 1500, '{"color": "Pastel Pink", "color_code": "#F472B6", "asin": "B0HKN2HLHQ", "image_url": "https://m.media-amazon.com/images/I/41W95NRY1NL.jpg"}'::jsonb, TRUE);
INSERT INTO public.product_variants (id, product_id, name, sku, price, compare_at_price, attributes, is_active) VALUES ('v0000000-0013-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000013', 'Ocean Blue', 'PPP1', 950, 1500, '{"color": "Ocean Blue", "color_code": "#38BDF8", "asin": "B0HKMXSJFH", "image_url": "https://m.media-amazon.com/images/I/41m9CAleV1L.jpg"}'::jsonb, TRUE);
INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold) VALUES ('a0000000-0000-0000-0000-000000000013', 30, 5);

-- ============================================================================
-- KURA ESSENTIALS — COMPREHENSIVE SEED DATA
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
-- 2. PRODUCTS (22 Realistic Products)
-- ----------------------------------------------------------------------------
INSERT INTO public.products (id, name, slug, description, short_description, sku, price, compare_at_price, discount, target_audience, brand, tags, rating, review_count, is_featured, is_new_arrival, is_bestseller, is_active, features, specifications) VALUES

-- 1. Bento Pro
('e1000000-0000-0000-0000-000000000001', 'KURA Bento Pro Modular Lunch Box', 'kura-bento-pro-modular-lunch-box', 'The Bento Pro is engineered with 304 food-grade stainless steel compartments, silicone airtight seals, and an insulated thermal outer casing. Keeps meals fresh and warm for 6 hours.', '3-Tier airtight insulated stainless steel bento lunch box with cutlery set.', 'KUR-LB-001', 1499.00, 2199.00, 32.00, 'all', 'KURA', ARRAY['bento', 'lunch box', 'stainless steel', 'leak-proof', 'bestseller'], 4.90, 142, TRUE, FALSE, TRUE, TRUE, ARRAY['304 Food-grade stainless steel', '100% Leak-proof silicone seals', 'Steam release valve for microwave reheating', 'BPA-free compartments'], '{"Capacity": "1200ml", "Weight": "540g", "Material": "SUS304 Stainless Steel + PP5 Shell"}'::jsonb),

-- 2. HydroShield Flask
('e1000000-0000-0000-0000-000000000002', 'HydroShield Double-Wall Insulated Flask', 'hydroshield-double-wall-insulated-flask', 'Dual-wall copper-plated vacuum insulation keeps water ice-cold for 24 hours or piping hot for 12 hours. Sweat-free powder coat exterior.', '750ml Vacuum insulated copper-core stainless steel bottle with powder-coat finish.', 'KUR-WB-002', 999.00, 1499.00, 33.00, 'all', 'KURA', ARRAY['water bottle', 'insulated', 'flask', 'bpa-free', 'bestseller'], 4.85, 98, TRUE, FALSE, TRUE, TRUE, ARRAY['24 Hours Cold / 12 Hours Hot Retention', '18/8 Pro-Grade Stainless Steel', 'Zero Condensation Grip', 'Wide mouth design'], '{"Volume": "750ml", "Insulation": "Double Wall Vacuum + Copper Core", "Weight": "360g"}'::jsonb),

-- 3. AeroCampus Backpack
('e1000000-0000-0000-0000-000000000003', 'AeroCampus Everyday Ergonomic Backpack', 'aerocampus-everyday-ergonomic-backpack', 'Designed for high schoolers, college students, and active commuters. Features dedicated 16" padded laptop protection, airflow back padding with lumbar support.', '28L Water-resistant campus backpack with 16" laptop sleeve and lumbar support.', 'KUR-BP-003', 2499.00, 3799.00, 34.00, 'college', 'KURA', ARRAY['backpack', 'laptop bag', 'campus', 'ergonomic', 'college', 'bestseller'], 4.90, 76, TRUE, FALSE, TRUE, TRUE, ARRAY['Dual suspended 16" laptop & iPad sleeves', 'Ergonomic EVA-molded spine channel', 'YKK AquaGuard weather zippers', 'Concealed rear anti-theft pocket'], '{"Capacity": "28 Liters", "Laptop Size": "Up to 16 inch", "Weight": "820g"}'::jsonb),

-- 4. SpineSafe School Bag
('e1000000-0000-0000-0000-000000000004', 'SpineSafe Kids Orthopedic School Bag', 'spinesafe-kids-orthopedic-school-bag', 'Features an internal lightweight alloy spine support frame that distributes weight evenly across hips, reflective 360-degree night safety strips.', 'Ergonomic spine-protecting school bag with reflective safety trim.', 'KUR-SB-004', 1899.00, 2799.00, 32.00, 'school', 'KURA', ARRAY['school bag', 'kids', 'orthopedic', 'spine care', 'school', 'new'], 4.95, 54, FALSE, TRUE, FALSE, TRUE, ARRAY['Certified orthopedic posture-aligning back panel', 'Padded S-curve shoulder straps', 'Wide-open 180° book compartment', 'Includes waterproof rain cover'], '{"Capacity": "22 Liters", "Recommended Age": "7-13 Years", "Weight": "650g"}'::jsonb),

-- 5. Executive Desk Mat
('e1000000-0000-0000-0000-000000000005', 'Executive Vegan Leather Desk Mat & Organizer', 'executive-vegan-leather-desk-mat-organizer', 'Elevate your office setup with our dual-sided vegan leather and wool felt desk pad. Waterproof, scratch-resistant surface with magnetic cable channel.', 'Dual-sided 90x45cm waterproof desk pad with magnetic cable guide.', 'KUR-DA-005', 1199.00, 1899.00, 36.00, 'office', 'KURA', ARRAY['desk mat', 'desk pad', 'leather', 'office', 'minimalist', 'bestseller'], 4.80, 83, TRUE, FALSE, TRUE, TRUE, ARRAY['Dual-sided textured PU leather + natural felt', 'Waterproof, oil-proof wipe-clean surface', 'Smooth optical mouse tracking', 'Includes roll-up strap & magnetic clip'], '{"Size": "90 x 45 cm", "Thickness": "2.2 mm", "Material": "PU Vegan Leather + Felt"}'::jsonb),

-- 6. Hardbound Journal
('e1000000-0000-0000-0000-000000000006', 'Minimalist 100GSM Hardbound Dot-Grid Journal', 'minimalist-100gsm-hardbound-dot-grid-journal', 'Ultra-smooth 100 GSM bleed-resistant ivory paper suitable for fountain pens, 180° lay-flat thread binding, dual ribbon markers.', 'A5 Lay-flat dot grid notebook with 100 GSM fountain pen safe ivory pages.', 'KUR-ST-006', 649.00, 999.00, 35.00, 'all', 'KURA', ARRAY['journal', 'notebook', 'stationery', 'dot grid', 'college', 'office', 'bestseller'], 4.92, 112, FALSE, FALSE, TRUE, TRUE, ARRAY['100 GSM Acid-Free Ivory Paper', 'Zero Ghosting with fountain & gel pens', '5mm subtle dot grid with page numbers', 'Keepsake folder pocket'], '{"Page Count": "192 pages", "Size": "A5 (14.8 x 21 cm)", "Binding": "Thread Sewn"}'::jsonb),

-- 7. Pop-Up Pencil Case
('e1000000-0000-0000-0000-000000000007', 'Standing Pop-Up Pencil Case & Desk Cup', 'standing-pop-up-pencil-case-desk-cup', 'Telescopic sliding mechanism transforms canvas pencil pouch into upright desktop pen cup in one motion. Holds up to 35 pens.', '2-in-1 Canvas telescoping pencil pouch that converts into a desk organizer cup.', 'KUR-PC-007', 499.00, 799.00, 37.00, 'school', 'KURA', ARRAY['pencil case', 'pen pouch', 'stationery', 'school', 'college', 'new'], 4.75, 67, FALSE, TRUE, FALSE, TRUE, ARRAY['Telescopic pull-down mechanism', 'Holds up to 35 writing instruments', 'Sturdy heavy-duty brass zipper', 'Internal 3 slot organizing dividers'], '{"Extended Height": "18.5 cm", "Folded Height": "10.5 cm", "Material": "16oz Canvas"}'::jsonb),

-- 8. Shockproof Laptop Sleeve
('e1000000-0000-0000-0000-000000000008', 'ArmorShield 360° Shockproof Laptop Sleeve', 'armorshield-360-shockproof-laptop-sleeve', 'Engineered with patented CornerArmor protective technology and 360° thick plush cushioning. Protects against drops, bumps, and splashes.', 'Military-grade protective laptop sleeve with accessory compartment for charger & mouse.', 'KUR-LS-008', 1299.00, 1999.00, 35.00, 'office', 'KURA', ARRAY['laptop sleeve', 'macbook case', 'shockproof', 'office', 'college'], 4.88, 51, FALSE, FALSE, FALSE, TRUE, ARRAY['CornerArmor cushions in all 4 corners', 'Ultra-thick 3D bubble fleece inner lining', 'Front zip pocket for cables & mouse', 'Water-repellent eco-fabric shell'], '{"Compatibility": "13-14 inch or 15-16 inch", "Protection": "1.5m drop tested", "Weight": "280g"}'::jsonb),

-- 9. Insulated Food Jar
('e1000000-0000-0000-0000-000000000009', 'ThermoPot Double-Wall Insulated Food Jar', 'thermopot-double-wall-insulated-food-jar', 'Vacuum insulation keeps soups, noodles, or curries piping hot for 9 hours. Features folding stainless steel spoon nested in the lid.', '600ml vacuum insulated stainless steel hot food flask with folding spoon.', 'KUR-FJ-009', 1249.00, 1799.00, 30.00, 'school', 'KURA', ARRAY['soup jar', 'food flask', 'lunch box', 'school', 'office'], 4.82, 43, FALSE, TRUE, FALSE, TRUE, ARRAY['9 Hours Hot / 14 Hours Cold Retention', 'Integrated folding stainless steel spoon', 'Wide 8.5 cm mouth for effortless eating', 'Non-slip silicone base'], '{"Volume": "600ml", "Material": "SUS304 Stainless Steel", "Dimensions": "16.5 x 9.8 cm"}'::jsonb),

-- 10. Tritan Infuser Bottle
('e1000000-0000-0000-0000-000000000010', 'AeroSlim Tritan Infuser Water Bottle', 'aeroslim-tritan-infuser-water-bottle', 'Crystal-clear shatterproof Eastman Tritan bottle with removable fruit and tea infuser core, one-touch flip safety locking lid.', '1000ml Shatterproof BPA-free Tritan bottle with fruit infuser and hourly markers.', 'KUR-WB-010', 699.00, 1099.00, 36.00, 'college', 'KURA', ARRAY['tritan', 'water bottle', 'infuser', 'gym', 'college', 'office', 'new'], 4.78, 62, FALSE, TRUE, FALSE, TRUE, ARRAY['100% BPA, BPS & Phthalate-free USA Tritan', 'Removable fruit infuser rod', 'One-click safety flip lock', 'Hourly hydration tracker printed on side'], '{"Capacity": "1000ml", "Temperature": "-10°C to 95°C", "Weight": "190g"}'::jsonb),

-- 11. Solid Brass Pen Set
('e1000000-0000-0000-0000-000000000011', 'Precision Solid Brass Hexagon Pen Set', 'precision-solid-brass-hexagon-pen-set', 'Machined from solid aircraft-grade brass that develops a rich natural patina over time. German Schmidt 0.5mm nib for effortless writing.', 'Machined solid brass EDC pen set with German Schmidt nib and leather sleeve.', 'KUR-ST-011', 1699.00, 2499.00, 32.00, 'office', 'KURA', ARRAY['brass pen', 'stationery', 'luxury', 'office', 'gift set', 'bestseller'], 4.96, 38, TRUE, FALSE, FALSE, TRUE, ARRAY['Precision machined C3604 brass barrel', 'Anti-roll ergonomic hexagonal body', 'German Schmidt 0.5mm Fine Nib & Converter', 'Includes veg-tanned leather slipcase'], '{"Weight": "42g", "Length": "138 mm", "Material": "Solid C3604 Brass"}'::jsonb),

-- 12. Starter Bundle
('e1000000-0000-0000-0000-000000000012', 'The Ultimate Back-to-Campus Starter Bundle', 'the-ultimate-back-to-campus-starter-bundle', 'Curated all-in-one gift set: 1x Bento Pro Lunch Box, 1x HydroShield 750ml Flask, 1x Lay-Flat Dot Journal, and 1x Standing Canvas Pen Case.', 'Curated 4-piece essential kit: Bento box + Insulated flask + Journal + Pen pouch.', 'KUR-GS-012', 3299.00, 4999.00, 34.00, 'all', 'KURA', ARRAY['gift set', 'bundle', 'campus', 'school', 'college', 'featured', 'bestseller'], 4.98, 45, TRUE, FALSE, TRUE, TRUE, ARRAY['Packaged in an embossed rigid gift box', 'Save 34% compared to individual items', 'Custom handwritten gift card option', 'Full 1-Year Comprehensive Warranty'], '{"Box Dimensions": "34 x 26 x 12 cm", "Total Weight": "1.75 kg"}'::jsonb),

-- 13. Bento Mini Kids
('e1000000-0000-0000-0000-000000000013', 'KURA Bento Mini Kids Leak-Proof Bento Box', 'kura-bento-mini-kids-bento-box', 'Designed specifically for younger students. Easy-latch snap clips, 4-compartment silicone sealed portion tray, and drop-proof rubberized bumpers.', '4-Compartment kid-friendly leak-proof bento box with rubber drop bumpers.', 'KUR-LB-013', 1199.00, 1699.00, 29.00, 'school', 'KURA', ARRAY['kids bento', 'lunch box', 'school', 'drop-proof'], 4.88, 34, FALSE, TRUE, FALSE, TRUE, ARRAY['4 Portion-perfect compartments for balanced meals', 'Kid-friendly easy-open latches', 'Drop-proof rubberized outer corners', '100% BPA and Phthalate free'], '{"Capacity": "850ml", "Weight": "420g", "Recommended Age": "4-10 Years"}'::jsonb),

-- 14. Campus Hydro Tumbler 1200ml
('e1000000-0000-0000-0000-000000000014', 'UltraWide 1200ml All-Day Hydro Tumbler with Handle', 'ultrawide-1200ml-all-day-hydro-tumbler', 'Massive 1.2-liter capacity insulated tumbler with comfort-grip handle, 3-position rotating lid, and reusable stainless steel straw. Fits in vehicle cup holders.', '1200ml Double-wall vacuum tumbler with ergonomic handle and reusable straw.', 'KUR-WB-014', 1399.00, 1999.00, 30.00, 'college', 'KURA', ARRAY['tumbler', 'water bottle', 'hydration', 'college', 'gym', 'new'], 4.84, 29, FALSE, TRUE, FALSE, TRUE, ARRAY['Massive 1.2 Liter all-day hydration capacity', 'Double-wall vacuum insulation keeps cold for 30 hours', 'Ergonomic comfort-grip handle', 'Slim base fits in standard car cup holders'], '{"Capacity": "1200ml (40oz)", "Weight": "510g", "Material": "18/8 Stainless Steel"}'::jsonb),

-- 15. OrthoFlex Junior Backpack
('e1000000-0000-0000-0000-000000000015', 'OrthoFlex Junior Primary School Backpack', 'orthoflex-junior-primary-school-backpack', 'Engineered with weight-redistributing spine ridge cushioning, magnetic sternum clip, and water-repellent heavy canvas.', 'Lightweight 18L primary school bag with spine-contouring back panel.', 'KUR-SB-015', 1599.00, 2299.00, 30.00, 'school', 'KURA', ARRAY['school bag', 'junior', 'kids', 'ergonomic'], 4.90, 27, FALSE, FALSE, FALSE, TRUE, ARRAY['Orthopedic spine-contouring rear padding', 'Magnetic quick-snap chest strap', 'Reflective 360-degree night safety strips', 'Dual stretch water bottle side pockets'], '{"Capacity": "18 Liters", "Weight": "550g", "Dimensions": "38 x 26 x 14 cm"}'::jsonb),

-- 16. Ballistic Messenger Bag
('e1000000-0000-0000-0000-000000000016', 'Commuter Ballistic Nylon Slim Laptop Messenger Bag', 'commuter-ballistic-nylon-slim-messenger-bag', '1680D Ballistic Cordura messenger with padded 15.6" laptop compartment, luggage trolley pass-through strap, and magnetic Fidlock front buckles.', '15.6" Shockproof ballistic nylon messenger bag with trolley pass-through.', 'KUR-LB-016', 2299.00, 3499.00, 34.00, 'office', 'KURA', ARRAY['messenger bag', 'laptop bag', 'office', 'commute', 'bestseller'], 4.87, 39, FALSE, FALSE, TRUE, TRUE, ARRAY['1680D Ballistic Cordura construction', 'Dedicated 15.6" shockproof laptop pouch', 'Luggage handle trolley sleeve for travel', 'Fidlock magnetic snap buckles'], '{"Dimensions": "40 x 30 x 10 cm", "Weight": "720g", "Material": "1680D Cordura"}'::jsonb),

-- 17. Walnut Desktop Stand
('e1000000-0000-0000-0000-000000000017', 'Solid Walnut Wood & Anodized Aluminum Desktop Stand', 'solid-walnut-anodized-aluminum-desktop-stand', 'Handcrafted solid North American walnut wood with bead-blasted anodized aerospace aluminum base. Perfect for phone, iPad, and tablet charging.', 'Handcrafted walnut and aluminum dual-device desktop charging stand.', 'KUR-DA-017', 999.00, 1499.00, 33.00, 'office', 'KURA', ARRAY['desk stand', 'walnut wood', 'phone stand', 'office', 'minimalist'], 4.91, 31, FALSE, FALSE, FALSE, TRUE, ARRAY['Genuine solid walnut wood top with natural grain', 'Heavy weighted anodized aluminum non-tip base', 'Integrated cable routing channels', 'Anti-scratch silicone device cushioning'], '{"Dimensions": "12 x 9 x 7 cm", "Weight": "240g", "Material": "Walnut + 6063 Aluminum"}'::jsonb),

-- 18. Gel Pen 10-Color Studio Pack
('e1000000-0000-0000-0000-000000000018', 'Archival Grade Gel Pen 0.5mm 10-Color Studio Pack', 'archival-grade-gel-pen-10-color-studio-pack', 'Quick-drying Japanese water-based pigment ink that will not smudge or bleed. Ergonomic rubber grip for fatigue-free note taking.', 'Set of 10 Japanese quick-dry archival 0.5mm gel pens in aesthetic palette.', 'KUR-ST-018', 549.00, 849.00, 35.00, 'all', 'KURA', ARRAY['gel pens', 'stationery', 'pens', 'school', 'college'], 4.86, 52, FALSE, FALSE, FALSE, TRUE, ARRAY['Quick-drying smudge-free Japanese pigment ink', 'Ultra-fine 0.5mm precision tungsten carbide ball', 'Matte soft-touch ergonomic grip barrel', 'Curated palette of 10 modern earthy tones'], '{"Nib Size": "0.5mm", "Ink Type": "Archival Pigment Gel", "Count": "10 Pens"}'::jsonb),

-- 19. Thermal Lunch Bag
('e1000000-0000-0000-0000-000000000019', 'Dual-Layer Thermal Insulated Lunch Bag', 'dual-layer-thermal-insulated-lunch-bag', 'Triple-layer thermal aluminum foil insulation keeps food hot or cold for hours. Expandable top tier for fruits and snacks, water-resistant oxford fabric exterior.', 'Insulated waterproof thermal lunch bag with adjustable shoulder strap.', 'KUR-LB-019', 849.00, 1299.00, 35.00, 'all', 'KURA', ARRAY['lunch bag', 'thermal bag', 'insulated', 'school', 'office'], 4.79, 41, FALSE, FALSE, FALSE, TRUE, ARRAY['Triple-layer thermal foam and foil lining', 'Dual separate dry and cold meal tiers', 'Water-resistant 600D Oxford fabric', 'Includes detachable padded shoulder strap'], '{"Dimensions": "25 x 18 x 22 cm", "Capacity": "8 Liters", "Weight": "290g"}'::jsonb),

-- 20. Executive Tech Folio
('e1000000-0000-0000-0000-000000000020', 'Executive Tech Folio & Cable Management Organizer', 'executive-tech-folio-cable-organizer', 'Keep cables, power banks, SSDs, AirPods, flash drives, and styluses perfectly ordered during flights and coffee shop work sessions.', 'Zip-around waterproof organizer folio for chargers, cables, and tech gear.', 'KUR-DA-020', 899.00, 1399.00, 36.00, 'office', 'KURA', ARRAY['tech pouch', 'cable organizer', 'folio', 'travel', 'office'], 4.93, 37, FALSE, TRUE, FALSE, TRUE, ARRAY['Elastic retention loops for cables & pens', 'Mesh zippered pockets for power banks & SSDs', 'Padded shockproof outer shell', 'Water-resistant ballistic nylon exterior'], '{"Dimensions": "24 x 17 x 5 cm", "Weight": "210g"}'::jsonb),

-- 21. ThermoChug Sports Bottle
('e1000000-0000-0000-0000-000000000021', 'ThermoChug Sports Hydro Flask with Straw Cap 900ml', 'thermochug-sports-hydro-flask-900ml', 'Designed for rapid hydration during sports, workouts, and college transit. Features flip-up silicone sports straw and wide comfort carry handle.', '900ml Vacuum insulated sports flask with flip straw and silicone boot.', 'KUR-WB-021', 1149.00, 1699.00, 32.00, 'college', 'KURA', ARRAY['water bottle', 'sports flask', 'gym', 'college'], 4.81, 26, FALSE, FALSE, FALSE, TRUE, ARRAY['Flip-up high-flow silicone straw spout', 'Includes protective non-slip silicone base boot', 'Double-wall copper vacuum insulation', '100% Leak-proof locking lid'], '{"Capacity": "900ml", "Weight": "410g", "Material": "SUS304 Steel"}'::jsonb),

-- 22. Brass Ruler & Letter Opener Set
('e1000000-0000-0000-0000-000000000022', 'Desk Elegance Brushed Solid Brass Ruler & Letter Opener', 'desk-elegance-brushed-solid-brass-ruler-set', 'Heavy gauge solid brass 15cm ruler with laser-etched metric and imperial measurements paired with a precision-balanced geometric letter opener.', 'Solid brushed brass desk set with laser-etched 15cm ruler and opener in gift box.', 'KUR-DA-022', 799.00, 1199.00, 33.00, 'office', 'KURA', ARRAY['brass ruler', 'stationery', 'desk accessories', 'office', 'gift set'], 4.94, 22, FALSE, FALSE, FALSE, TRUE, ARRAY['Solid heavy C3604 brass with brushed satin finish', 'Laser-engraved permanent measurement markings', 'Develops distinctive vintage heirloom patina', 'Comes in recyclable kraft gift box'], '{"Ruler Length": "15 cm (6 inch)", "Total Set Weight": "165g"}'::jsonb)

ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    slug = EXCLUDED.slug,
    description = EXCLUDED.description,
    short_description = EXCLUDED.short_description,
    price = EXCLUDED.price,
    compare_at_price = EXCLUDED.compare_at_price,
    discount = EXCLUDED.discount,
    target_audience = EXCLUDED.target_audience,
    features = EXCLUDED.features,
    specifications = EXCLUDED.specifications;

-- ----------------------------------------------------------------------------
-- 3. PRODUCT CATEGORIES LINKING
-- ----------------------------------------------------------------------------
INSERT INTO public.product_categories (product_id, category_id) VALUES
('e1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001'), -- Bento Pro -> Lunch Boxes
('e1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000002'), -- HydroShield -> Water Bottles
('e1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000003'), -- AeroCampus -> Backpacks
('e1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000004'), -- SpineSafe -> School Bags
('e1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000007'), -- Desk Mat -> Desk Accessories
('e1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000009'), -- Desk Mat -> Office Essentials
('e1000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000005'), -- Journal -> Stationery
('e1000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000006'), -- Pencil Case -> Pencil Cases
('e1000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000008'), -- Laptop Sleeve -> Laptop Bags
('e1000000-0000-0000-0000-000000000009', 'c1000000-0000-0000-0000-000000000001'), -- Food Jar -> Lunch Boxes
('e1000000-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000002'), -- Tritan -> Water Bottles
('e1000000-0000-0000-0000-000000000011', 'c1000000-0000-0000-0000-000000000005'), -- Brass Pen -> Stationery
('e1000000-0000-0000-0000-000000000011', 'c1000000-0000-0000-0000-000000000009'), -- Brass Pen -> Office Essentials
('e1000000-0000-0000-0000-000000000012', 'c1000000-0000-0000-0000-000000000010'), -- Starter Bundle -> Gift Sets
('e1000000-0000-0000-0000-000000000013', 'c1000000-0000-0000-0000-000000000001'), -- Bento Mini -> Lunch Boxes
('e1000000-0000-0000-0000-000000000014', 'c1000000-0000-0000-0000-000000000002'), -- Tumbler -> Water Bottles
('e1000000-0000-0000-0000-000000000015', 'c1000000-0000-0000-0000-000000000004'), -- Junior Bag -> School Bags
('e1000000-0000-0000-0000-000000000016', 'c1000000-0000-0000-0000-000000000008'), -- Messenger -> Laptop Bags
('e1000000-0000-0000-0000-000000000017', 'c1000000-0000-0000-0000-000000000007'), -- Walnut Stand -> Desk Accessories
('e1000000-0000-0000-0000-000000000018', 'c1000000-0000-0000-0000-000000000005'), -- Gel Pens -> Stationery
('e1000000-0000-0000-0000-000000000019', 'c1000000-0000-0000-0000-000000000001'), -- Thermal Bag -> Lunch Boxes
('e1000000-0000-0000-0000-000000000020', 'c1000000-0000-0000-0000-000000000007'), -- Tech Folio -> Desk Accessories
('e1000000-0000-0000-0000-000000000021', 'c1000000-0000-0000-0000-000000000002'), -- Sports Bottle -> Water Bottles
('e1000000-0000-0000-0000-000000000022', 'c1000000-0000-0000-0000-000000000007')  -- Ruler Set -> Desk Accessories
ON CONFLICT (product_id, category_id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 4. PRODUCT IMAGES
-- ----------------------------------------------------------------------------
INSERT INTO public.product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES
('f1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80', 'Bento Pro Primary View', 1, TRUE),
('f1000000-0000-0000-0000-000000000002', 'e1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=1000&q=80', 'Bento Pro Open Tray', 2, FALSE),
('f1000000-0000-0000-0000-000000000003', 'e1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80', 'HydroShield Flask', 1, TRUE),
('f1000000-0000-0000-0000-000000000004', 'e1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&w=1000&q=80', 'HydroShield Lifestyle', 2, FALSE),
('f1000000-0000-0000-0000-000000000005', 'e1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80', 'AeroCampus Backpack', 1, TRUE),
('f1000000-0000-0000-0000-000000000006', 'e1000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80', 'SpineSafe School Bag', 1, TRUE),
('f1000000-0000-0000-0000-000000000007', 'e1000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80', 'Executive Desk Mat', 1, TRUE),
('f1000000-0000-0000-0000-000000000008', 'e1000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1000&q=80', 'Dot Grid Journal', 1, TRUE),
('f1000000-0000-0000-0000-000000000009', 'e1000000-0000-0000-0000-000000000007', 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&w=1000&q=80', 'Pop-Up Pencil Case', 1, TRUE),
('f1000000-0000-0000-0000-000000000010', 'e1000000-0000-0000-0000-000000000008', 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80', 'Laptop Sleeve', 1, TRUE),
('f1000000-0000-0000-0000-000000000011', 'e1000000-0000-0000-0000-000000000012', 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=80', 'Starter Bundle Box', 1, TRUE)
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 5. PRODUCT INVENTORY
-- ----------------------------------------------------------------------------
INSERT INTO public.inventory (id, product_id, stock_quantity, low_stock_threshold) VALUES
('b1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000001', 75, 10),
('b1000000-0000-0000-0000-000000000002', 'e1000000-0000-0000-0000-000000000002', 150, 15),
('b1000000-0000-0000-0000-000000000003', 'e1000000-0000-0000-0000-000000000003', 47, 8),
('b1000000-0000-0000-0000-000000000004', 'e1000000-0000-0000-0000-000000000004', 69, 10),
('b1000000-0000-0000-0000-000000000005', 'e1000000-0000-0000-0000-000000000005', 100, 15),
('b1000000-0000-0000-0000-000000000006', 'e1000000-0000-0000-0000-000000000006', 190, 20),
('b1000000-0000-0000-0000-000000000007', 'e1000000-0000-0000-0000-000000000007', 140, 15),
('b1000000-0000-0000-0000-000000000008', 'e1000000-0000-0000-0000-000000000008', 75, 10),
('b1000000-0000-0000-0000-000000000009', 'e1000000-0000-0000-0000-000000000009', 65, 8),
('b1000000-0000-0000-0000-000000000010', 'e1000000-0000-0000-0000-000000000010', 100, 12),
('b1000000-0000-0000-0000-000000000011', 'e1000000-0000-0000-0000-000000000011', 40, 6),
('b1000000-0000-0000-0000-000000000012', 'e1000000-0000-0000-0000-000000000012', 27, 5),
('b1000000-0000-0000-0000-000000000013', 'e1000000-0000-0000-0000-000000000013', 45, 8),
('b1000000-0000-0000-0000-000000000014', 'e1000000-0000-0000-0000-000000000014', 60, 10),
('b1000000-0000-0000-0000-000000000015', 'e1000000-0000-0000-0000-000000000015', 35, 6),
('b1000000-0000-0000-0000-000000000016', 'e1000000-0000-0000-0000-000000000016', 50, 8),
('b1000000-0000-0000-0000-000000000017', 'e1000000-0000-0000-0000-000000000017', 40, 5),
('b1000000-0000-0000-0000-000000000018', 'e1000000-0000-0000-0000-000000000018', 120, 15),
('b1000000-0000-0000-0000-000000000019', 'e1000000-0000-0000-0000-000000000019', 85, 10),
('b1000000-0000-0000-0000-000000000020', 'e1000000-0000-0000-0000-000000000020', 60, 8),
('b1000000-0000-0000-0000-000000000021', 'e1000000-0000-0000-0000-000000000021', 90, 12),
('b1000000-0000-0000-0000-000000000022', 'e1000000-0000-0000-0000-000000000022', 30, 5)
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 6. COUPONS
-- ----------------------------------------------------------------------------
INSERT INTO public.coupons (id, code, description, discount_type, discount_value, min_order_value, max_discount, is_active) VALUES
('d1000000-0000-0000-0000-000000000001', 'WELCOME10', '10% off on your first order', 'percentage', 10.00, 500.00, 300.00, TRUE),
('d1000000-0000-0000-0000-000000000002', 'KURA20', 'Flat 20% off on orders above ₹1500', 'percentage', 20.00, 1500.00, 600.00, TRUE),
('d1000000-0000-0000-0000-000000000003', 'FLAT250', 'Flat ₹250 instant discount on orders above ₹2000', 'fixed', 250.00, 2000.00, 250.00, TRUE)
ON CONFLICT (code) DO UPDATE SET
    discount_type = EXCLUDED.discount_type,
    discount_value = EXCLUDED.discount_value,
    min_order_value = EXCLUDED.min_order_value,
    max_discount = EXCLUDED.max_discount;

-- ----------------------------------------------------------------------------
-- 7. REVIEWS
-- ----------------------------------------------------------------------------
INSERT INTO public.reviews (id, product_id, author_name, rating, title, comment, status, verified_purchase) VALUES
('a1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000001', 'Ananya Sharma', 5, 'Best lunch box ever bought!', 'No leakage whatsoever, even with dal and curries. The stainless steel keeps food fresh and free of plastic smells. Looks very aesthetic too!', 'approved', TRUE),
('a1000000-0000-0000-0000-000000000002', 'e1000000-0000-0000-0000-000000000001', 'Rohan Verma', 5, 'Ideal for office lunches', 'The three compartments let me pack rice, curry, and cut fruits separately. Very easy to clean.', 'approved', TRUE),
('a1000000-0000-0000-0000-000000000003', 'e1000000-0000-0000-0000-000000000002', 'Vikram Mehta', 5, 'Cold water throughout my college day', 'Filled with ice cubes at 7 AM, and at 5 PM the water was still freezing cold! The green powder coat finish is super grippy.', 'approved', TRUE),
('a1000000-0000-0000-0000-000000000004', 'e1000000-0000-0000-0000-000000000003', 'Pooja Iyer', 5, 'Saved my back on daily campus walks', 'The padding on the lumbar area is magical. Fits my 15-inch laptop, water bottle, journal, and lunchbox with space to spare.', 'approved', TRUE)
ON CONFLICT (id) DO NOTHING;

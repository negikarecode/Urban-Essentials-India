import { Category, Product, Coupon, TargetAudience, Review } from '@/types';

export const CATEGORIES: Category[] = [
  {
    id: 'c1',
    name: 'Backpacks',
    slug: 'backpacks',
    description: 'Ergonomic, weather-resistant everyday backpacks engineered for campus, commutes, and school.',
    image_url: '/products/koool-backpack-hero.jpg',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'c2',
    name: 'Lunch Boxes',
    slug: 'lunch-boxes',
    description: 'Insulated, leak-proof bento and SUS304 stainless steel lunch boxes designed for school & work.',
    image_url: '/products/bento-5-compartment-tabletop.png',
    sort_order: 2,
    is_active: true,
  },
  {
    id: 'c3',
    name: 'Water Bottles & Flasks',
    slug: 'water-bottles',
    description: 'Vacuum insulated stainless steel food jars, soup mugs, and hydration flasks that keep meals hot for hours.',
    image_url: '/products/tedemei-soup-mug-hero.png',
    sort_order: 3,
    is_active: true,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Hello Tuesday 2-Tier Stackable Stainless Steel Tiffin Box',
    slug: 'hello-tuesday-2-tier-stainless-steel-tiffin-box',
    description: 'Elevate your midday dining experience with the Hello Tuesday 2-Tier Stackable Stainless Steel Tiffin Box. Precision-crafted with dual independent SUS304 food-grade stainless steel bowls, this modern lunch container keeps meals fresh, hot, and distinct without letting gravies or aroma transfer. Featuring a pastel silicone airtight seal, a built-in steam release valve for effortless opening, and an ergonomic fold-down carrying handle, it is the quintessential daily companion for modern professionals, college students, and health-conscious eaters.',
    short_description: 'Dual-tier modular 304 stainless steel tiffin with foldable handle and steam release valve.',
    sku: 'UE-HT-TF2-01',
    price: 799,
    compare_at_price: 1299,
    discount: 38,
    category_id: 'c2',
    category_name: 'Lunch Boxes',
    category_slug: 'lunch-boxes',
    target_audience: 'office',
    brand: 'Urban Essentials',
    tags: ['lunch-box', 'tiffin', 'stainless-steel', 'stackable', 'office', 'bestseller', 'leakproof'],
    stock_quantity: 45,
    low_stock_threshold: 8,
    rating: 4.9,
    review_count: 64,
    is_featured: true,
    is_new_arrival: true,
    is_bestseller: true,
    is_active: true,
    features: [
      'Double-tier modular stackable construction prevents flavor mixing between dishes',
      'Premium SUS304 food-grade stainless steel inner bowls with heat-insulating outer shell',
      'Integrated ergonomic fold-flat carry handle for easy commute in bags or hand',
      'Silicone pressure relief steam-vent plug allows easy opening with hot meals',
      'Includes detachable nesting bowls and cutlery-ready lid compartment',
      'BPA-free, non-toxic, and corrosion-resistant mirror polish interior'
    ],
    specifications: {
      'Capacity': '1400 ml (Two Tiers)',
      'Dimensions': '20 cm Height x 13.3 cm Diameter',
      'Material': 'SUS304 Food-Grade Stainless Steel & BPA-Free Polypropylene',
      'Weight': '520 g',
      'Thermal Retention': '4 - 6 Hours (Double Layer Insulated)',
      'Leak Resistance': 'Airtight Silicone Gasket Ring on Each Tier',
      'Cleaning': 'Dishwasher safe inner bowls; hand wash recommended for lids'
    },
    images: [
      { id: 'p1-img-1', image_url: '/products/hello-tuesday-hero.png', alt_text: 'Hello Tuesday 2-Tier Lunch Box in Sky Blue & Butter Yellow', sort_order: 1, is_primary: true },
      { id: 'p1-img-2', image_url: '/products/hello-tuesday-double-layer-showcase.jpg', alt_text: 'Double layer lunch box prevents flavors from mixing', sort_order: 2, is_primary: false },
      { id: 'p1-img-3', image_url: '/products/hello-tuesday-lifestyle-meal.jpg', alt_text: 'Lunch spread with hot dishes in detachable bowls', sort_order: 3, is_primary: false },
      { id: 'p1-img-4', image_url: '/products/hello-tuesday-unstacked-bowls.jpg', alt_text: 'Detachable SUS304 tiers with spoon in lid', sort_order: 4, is_primary: false },
      { id: 'p1-img-5', image_url: '/products/hello-tuesday-handle-upright.jpg', alt_text: 'Carrying handle upright with sky blue lid', sort_order: 5, is_primary: false },
      { id: 'p1-img-6', image_url: '/products/hello-tuesday-steam-vent.jpg', alt_text: 'Silicone steam pressure release valve closeup', sort_order: 6, is_primary: false },
      { id: 'p1-img-7', image_url: '/products/hello-tuesday-sus304-liner.png', alt_text: 'SUS304 food-grade stainless steel interior stamp', sort_order: 7, is_primary: false },
      { id: 'p1-img-8', image_url: '/products/hello-tuesday-dimensions.png', alt_text: 'Dimensions diagram 20cm height by 13.3cm diameter', sort_order: 8, is_primary: false },
      { id: 'p1-img-9', image_url: '/products/hello-tuesday-tier-separation.png', alt_text: 'Hand lifting top tier showing modular design', sort_order: 9, is_primary: false },
      { id: 'p1-img-10', image_url: '/products/hello-tuesday-stacked-blue.png', alt_text: 'Stacked double tier blue and yellow lunch box', sort_order: 10, is_primary: false },
      { id: 'p1-img-11', image_url: '/products/hello-tuesday-top-view.png', alt_text: 'Top perspective angle view', sort_order: 11, is_primary: false },
      { id: 'p1-img-12', image_url: '/products/hello-tuesday-color-lineup.png', alt_text: 'Pastel color collection options', sort_order: 12, is_primary: false },
      { id: 'p1-img-13', image_url: '/products/hello-tuesday-lavender-yellow.png', alt_text: 'Lavender Purple and Sunny Yellow colorway', sort_order: 13, is_primary: false },
      { id: 'p1-img-14', image_url: '/products/hello-tuesday-blue-yellow.png', alt_text: 'Sky Blue and Lemon Yellow colorway', sort_order: 14, is_primary: false }
    ],
    variants: [
      {
        id: 'p1-v1',
        product_id: 'prod-01',
        name: 'Sky Blue & Sunlight Yellow',
        sku: 'UE-HT-TF2-SBY',
        price: 799,
        compare_at_price: 1299,
        attributes: { color: 'Sky Blue & Sunlight Yellow', color_code: '#38BDF8', capacity: '1400ml' },
        color_code: '#38BDF8',
        image_url: '/products/hello-tuesday-hero.png',
        stock: 20,
        is_active: true
      },
      {
        id: 'p1-v2',
        product_id: 'prod-01',
        name: 'Lavender Purple & Custard Yellow',
        sku: 'UE-HT-TF2-LPY',
        price: 799,
        compare_at_price: 1299,
        attributes: { color: 'Lavender Purple & Custard Yellow', color_code: '#A855F7', capacity: '1400ml' },
        color_code: '#A855F7',
        image_url: '/products/hello-tuesday-lavender-yellow.png',
        stock: 15,
        is_active: true
      },
      {
        id: 'p1-v3',
        product_id: 'prod-01',
        name: 'Mint Teal & Lavender',
        sku: 'UE-HT-TF2-MTL',
        price: 799,
        compare_at_price: 1299,
        attributes: { color: 'Mint Teal & Lavender', color_code: '#2DD4BF', capacity: '1400ml' },
        color_code: '#2DD4BF',
        image_url: '/products/hello-tuesday-color-lineup.png',
        stock: 10,
        is_active: true
      }
    ],
    created_at: '2026-02-15T10:00:00Z',
    updated_at: '2026-03-01T12:00:00Z'
  },
  {
    id: 'prod-02',
    name: 'Urban Bento 5-Compartment Leakproof Stainless Steel Lunch Box',
    slug: 'urban-bento-5-compartment-stainless-steel-lunch-box',
    description: 'Engineered for complete, portion-balanced meals on the go, the Urban Bento features 5 thoughtfully partitioned stainless steel compartments plus an integrated circular dip cup. The removable SUS304 food-grade tray rests inside a heavy-duty polypropylene outer base that allows hot water warming without a microwave. With 4 reinforced side-locking buckles and heavy-duty silicone perimeter seals, liquids stay exactly where they belong. Includes durable stainless steel chopsticks and a spoon that clip securely into place.',
    short_description: '5-section 304 stainless steel bento box with sauce dish, hot-water warming base, and cutlery.',
    sku: 'UE-UB-5C-02',
    price: 849,
    compare_at_price: 1399,
    discount: 39,
    category_id: 'c2',
    category_name: 'Lunch Boxes',
    category_slug: 'lunch-boxes',
    target_audience: 'all',
    brand: 'Urban Essentials',
    tags: ['bento', 'lunch-box', '5-compartment', 'stainless-steel', 'leakproof', 'school', 'office'],
    stock_quantity: 38,
    low_stock_threshold: 6,
    rating: 4.8,
    review_count: 48,
    is_featured: true,
    is_new_arrival: false,
    is_bestseller: true,
    is_active: true,
    features: [
      '5 discrete meal compartments plus centered sauce well for complete balanced meal planning',
      'Removable SUS304 food-grade stainless steel tray resists stains, odors, and rust',
      'Microwave-free food warming: pour hot water into outer shell to gently reheat food',
      '4 heavy-duty snap latches with high-density leakproof silicone gasket',
      'Comes complete with stainless steel chopsticks and soup spoon set'
    ],
    specifications: {
      'Capacity': '1200 ml',
      'Dimensions': '28 cm x 20 cm x 7 cm',
      'Material': 'SUS304 Stainless Steel & BPA-Free Polypropylene',
      'Weight': '650 g',
      'Heating Method': 'Hot Water Injection Chamber in Base',
      'Included Accessories': 'Stainless Steel Spoon, Stainless Steel Chopsticks',
      'Leak Resistance': '100% Leakproof Sealed Gasket'
    },
    images: [
      { id: 'p2-img-1', image_url: '/products/bento-5-compartment-hero.png', alt_text: 'Urban Bento 5-Compartment Lunch Box with Sauce Dish', sort_order: 1, is_primary: true },
      { id: 'p2-img-2', image_url: '/products/bento-5-compartment-colors.jpg', alt_text: 'Available in Navy Blue, Coral Pink, and Sunlight Yellow with Cutlery', sort_order: 2, is_primary: false },
      { id: 'p2-img-3', image_url: '/products/bento-5-compartment-water-heating.png', alt_text: 'Hot water warming demonstration in bottom reservoir', sort_order: 3, is_primary: false },
      { id: 'p2-img-4', image_url: '/products/bento-5-compartment-leakproof-seal.png', alt_text: 'Four-sided snap locking buckles and silicone seal', sort_order: 4, is_primary: false },
      { id: 'p2-img-5', image_url: '/products/bento-5-compartment-tabletop.png', alt_text: 'Tabletop view showing chopsticks and spoon placed with full meal', sort_order: 5, is_primary: false }
    ],
    variants: [
      {
        id: 'p2-v1',
        product_id: 'prod-02',
        name: 'Midnight Navy Blue',
        sku: 'UE-UB-5C-NVY',
        price: 849,
        compare_at_price: 1399,
        attributes: { color: 'Midnight Navy Blue', color_code: '#1E3A8A' },
        color_code: '#1E3A8A',
        image_url: '/products/bento-5-compartment-hero.png',
        stock: 15,
        is_active: true
      },
      {
        id: 'p2-v2',
        product_id: 'prod-02',
        name: 'Pastel Blush Pink',
        sku: 'UE-UB-5C-PNK',
        price: 849,
        compare_at_price: 1399,
        attributes: { color: 'Pastel Blush Pink', color_code: '#F472B6' },
        color_code: '#F472B6',
        image_url: '/products/bento-5-compartment-colors.jpg',
        stock: 12,
        is_active: true
      },
      {
        id: 'p2-v3',
        product_id: 'prod-02',
        name: 'Sunbeam Yellow',
        sku: 'UE-UB-5C-YLW',
        price: 849,
        compare_at_price: 1399,
        attributes: { color: 'Sunbeam Yellow', color_code: '#FBBF24' },
        color_code: '#FBBF24',
        image_url: '/products/bento-5-compartment-colors.jpg',
        stock: 11,
        is_active: true
      }
    ],
    created_at: '2026-02-18T11:00:00Z',
    updated_at: '2026-03-02T14:30:00Z'
  },
  {
    id: 'prod-03',
    name: 'TEDEMEI Capsule Portable Stainless Steel Travel Cutlery Set',
    slug: 'tedemei-capsule-portable-travel-cutlery-set',
    description: 'Ditch single-use plastic forever with the TEDEMEI Capsule Portable Stainless Steel Travel Cutlery Set. Ingeniously packed into a pill-shaped matte travel capsule, this 3-piece dining set includes a full-sized mirror-polished spoon, fork, and non-slip chopsticks with screw-on handles. Built from food-grade SUS304 stainless steel that will never rust, bend, or retain lingering food odors. Effortlessly slides into any handbag, backpack compartment, or desk drawer for clean, hygienic meals anywhere you roam.',
    short_description: 'Pocket-sized capsule travel case with SUS304 spoon, fork, and chopsticks.',
    sku: 'UE-TD-CUT-03',
    price: 549,
    compare_at_price: 899,
    discount: 39,
    category_id: 'c2',
    category_name: 'Lunch Boxes',
    category_slug: 'lunch-boxes',
    target_audience: 'all',
    brand: 'Urban Essentials',
    tags: ['cutlery', 'travel-utensils', 'spoon-fork-set', 'stainless-steel', 'hygiene', 'office', 'college'],
    stock_quantity: 60,
    low_stock_threshold: 10,
    rating: 4.9,
    review_count: 53,
    is_featured: false,
    is_new_arrival: true,
    is_bestseller: false,
    is_active: true,
    features: [
      'Pocket capsule container protects utensils from dust, dirt, and handbag lint',
      'Precision threaded screw-assembly handles provide full-length rigid dining utensils',
      'Food-safe SUS304 stainless steel heads with high-gloss mirror finish',
      'Complete 3-piece setup: Soup spoon, salad/noodle fork, and textured grip chopsticks',
      'Lightweight, compact, and ideal for office lunch breaks, college canteens, and travel'
    ],
    specifications: {
      'Contents': '1x Spoon, 1x Fork, 1x Pair Chopsticks, 1x Travel Capsule Case',
      'Capsule Dimensions': '12 cm x 5.5 cm x 2.8 cm',
      'Assembled Length': '19 cm (Full Dining Length)',
      'Material': 'SUS304 Stainless Steel & Food Grade Polycarbonate',
      'Weight': '135 g (Ultra Portable)',
      'Dishwasher Safe': 'Yes (All Stainless Steel Components)'
    },
    images: [
      { id: 'p3-img-1', image_url: '/products/tedemei-cutlery-hero.png', alt_text: 'TEDEMEI Capsule Portable Stainless Steel Cutlery Set', sort_order: 1, is_primary: true },
      { id: 'p3-img-2', image_url: '/products/tedemei-cutlery-spread.jpg', alt_text: 'Full dining spoon, fork, and chopsticks with travel capsule cases', sort_order: 2, is_primary: false },
      { id: 'p3-img-3', image_url: '/products/tedemei-cutlery-colors.jpg', alt_text: 'Pastel Pink, Mint Green, and Navy Blue capsule colors', sort_order: 3, is_primary: false },
      { id: 'p3-img-4', image_url: '/products/tedemei-cutlery-assembly.png', alt_text: 'Screw-on threaded handle assembly demonstration', sort_order: 4, is_primary: false }
    ],
    variants: [
      {
        id: 'p3-v1',
        product_id: 'prod-03',
        name: 'Nordic Mint Green',
        sku: 'UE-TD-CUT-GRN',
        price: 549,
        compare_at_price: 899,
        attributes: { color: 'Nordic Mint Green', color_code: '#34D399' },
        color_code: '#34D399',
        image_url: '/products/tedemei-cutlery-spread.jpg',
        stock: 25,
        is_active: true
      },
      {
        id: 'p3-v2',
        product_id: 'prod-03',
        name: 'Coral Salmon Pink',
        sku: 'UE-TD-CUT-PNK',
        price: 549,
        compare_at_price: 899,
        attributes: { color: 'Coral Salmon Pink', color_code: '#FB7185' },
        color_code: '#FB7185',
        image_url: '/products/tedemei-cutlery-hero.png',
        stock: 20,
        is_active: true
      },
      {
        id: 'p3-v3',
        product_id: 'prod-03',
        name: 'Deep Oceanic Blue',
        sku: 'UE-TD-CUT-BLU',
        price: 549,
        compare_at_price: 899,
        attributes: { color: 'Deep Oceanic Blue', color_code: '#2563EB' },
        color_code: '#2563EB',
        image_url: '/products/tedemei-cutlery-colors.jpg',
        stock: 15,
        is_active: true
      }
    ],
    created_at: '2026-02-20T09:00:00Z',
    updated_at: '2026-03-03T10:00:00Z'
  },
  {
    id: 'prod-04',
    name: 'ProBento 7091 4-Compartment Stainless Steel Lunch Box with Soup Bowl',
    slug: 'probento-7091-4-compartment-stainless-steel-lunch-box-soup-bowl',
    description: 'The ProBento 7091 is the ultimate all-in-one lunch kit designed for thorough meals. Built with 4 generously proportioned SUS304 food-grade stainless steel sections plus a dedicated circular screw-top soup container that locks in hot broths and dals without a drop spilled. An integrated hot water injection trough in the base lets you reheat your meal anywhere in minutes simply by adding hot water. Comes with matching stainless steel cutlery nestled into a hidden lid bay.',
    short_description: '4-compartment SUS304 lunch box with dedicated leakproof soup container and cutlery.',
    sku: 'UE-PB-7091-04',
    price: 799,
    compare_at_price: 1249,
    discount: 36,
    category_id: 'c2',
    category_name: 'Lunch Boxes',
    category_slug: 'lunch-boxes',
    target_audience: 'school',
    brand: 'Urban Essentials',
    tags: ['bento', 'lunch-box', 'soup-bowl', 'stainless-steel', 'school', 'office', 'water-warming'],
    stock_quantity: 40,
    low_stock_threshold: 8,
    rating: 4.8,
    review_count: 42,
    is_featured: true,
    is_new_arrival: false,
    is_bestseller: false,
    is_active: true,
    features: [
      '4 meal compartments plus an independent screw-sealed leakproof soup bowl',
      'Laser-engraved genuine SUS304 stainless steel food tray prevents chemical migration',
      'Dual-function outer chassis: Acts as heat shield and hot water warming vessel',
      'Secure 4-point snap locks and silicone perimeter seal eliminate bag spills',
      'Concealed lid storage compartment with stainless steel spoon and chopsticks included'
    ],
    specifications: {
      'Dimensions': '25.4 cm Length x 18.2 cm Width x 6.5 cm Height',
      'Capacity': '1100 ml Bento + 200 ml Soup Container',
      'Material': 'Laser-Etched SUS304 Stainless Steel + BPA-Free PP',
      'Weight': '680 g',
      'Included Components': '4-Grid Tray, Outer Bowl, Screw-Top Soup Cup, Spoon, Chopsticks',
      'Thermal Function': 'Water injection heating chamber in underbody'
    },
    images: [
      { id: 'p4-img-1', image_url: '/products/probento-7091-hero.png', alt_text: 'ProBento 7091 4-Compartment Lunch Box with Soup Bowl', sort_order: 1, is_primary: true },
      { id: 'p4-img-2', image_url: '/products/probento-7091-dimensions.png', alt_text: 'Dimensions schematic 25.4cm x 18.2cm x 6.5cm', sort_order: 2, is_primary: false },
      { id: 'p4-img-3', image_url: '/products/probento-7091-water-warming.png', alt_text: 'Hot water injection reservoir for warming food on the go', sort_order: 3, is_primary: false },
      { id: 'p4-img-4', image_url: '/products/probento-7091-sus304.png', alt_text: 'Food grade laser engraved SUS304 stainless steel tray', sort_order: 4, is_primary: false },
      { id: 'p4-img-5', image_url: '/products/probento-7091-colorways.png', alt_text: 'Four pastel color choices: Pink, Green, Navy, and Yellow', sort_order: 5, is_primary: false }
    ],
    variants: [
      {
        id: 'p4-v1',
        product_id: 'prod-04',
        name: 'Sakura Blush Pink',
        sku: 'UE-PB-7091-PNK',
        price: 799,
        compare_at_price: 1249,
        attributes: { color: 'Sakura Blush Pink', color_code: '#F9A8D4' },
        color_code: '#F9A8D4',
        image_url: '/products/probento-7091-hero.png',
        stock: 12,
        is_active: true
      },
      {
        id: 'p4-v2',
        product_id: 'prod-04',
        name: 'Avocado Matcha Green',
        sku: 'UE-PB-7091-GRN',
        price: 799,
        compare_at_price: 1249,
        attributes: { color: 'Avocado Matcha Green', color_code: '#86EFAC' },
        color_code: '#86EFAC',
        image_url: '/products/probento-7091-colorways.png',
        stock: 10,
        is_active: true
      },
      {
        id: 'p4-v3',
        product_id: 'prod-04',
        name: 'Executive Navy Blue',
        sku: 'UE-PB-7091-NVY',
        price: 799,
        compare_at_price: 1249,
        attributes: { color: 'Executive Navy Blue', color_code: '#1E40AF' },
        color_code: '#1E40AF',
        image_url: '/products/probento-7091-colorways.png',
        stock: 10,
        is_active: true
      },
      {
        id: 'p4-v4',
        product_id: 'prod-04',
        name: 'Lemon Custard Yellow',
        sku: 'UE-PB-7091-YLW',
        price: 799,
        compare_at_price: 1249,
        attributes: { color: 'Lemon Custard Yellow', color_code: '#FDE047' },
        color_code: '#FDE047',
        image_url: '/products/probento-7091-colorways.png',
        stock: 8,
        is_active: true
      }
    ],
    created_at: '2026-02-22T08:30:00Z',
    updated_at: '2026-03-03T11:20:00Z'
  },
  {
    id: 'prod-05',
    name: 'TEDEMEI 2-Tier Insulated Food Jar & Soup Thermos with Folding Spoon',
    slug: 'tedemei-2-tier-insulated-food-jar-soup-thermos',
    description: 'Keep your warm comfort food piping hot throughout busy workdays with the TEDEMEI 2-Tier Insulated Food Jar. Featuring a smart two-story architecture, the upper chamber holds your rice, noodles, or crisp garnishes while the lower high-capacity vacuum bowl holds steaming soups, stews, or curries. The lid houses an ingenious stainless steel folding spoon underneath an airtight hygienic cap, paired with a soft-touch silicone carrying loop for easy transport.',
    short_description: 'Dual-tier thermal insulated food jar with folding spoon and silicone carry loop.',
    sku: 'UE-TD-FJ2-05',
    price: 699,
    compare_at_price: 1099,
    discount: 36,
    category_id: 'c3',
    category_name: 'Water Bottles & Flasks',
    category_slug: 'water-bottles',
    target_audience: 'office',
    brand: 'Urban Essentials',
    tags: ['food-jar', 'thermos', 'soup-flask', 'insulated', 'water-bottles', 'lunch-box', 'bestseller'],
    stock_quantity: 32,
    low_stock_threshold: 5,
    rating: 4.9,
    review_count: 39,
    is_featured: true,
    is_new_arrival: true,
    is_bestseller: false,
    is_active: true,
    features: [
      '2-tier split structure keeps soup and dry solids completely separated until eating',
      'Foldable SUS304 stainless steel spoon fits seamlessly into the dustproof lid recess',
      'Multi-layer thermal vacuum retention keeps contents steaming hot for up to 6 hours',
      'Comfortable flexible silicone finger-loop handle engineered for easy everyday carry',
      'Deep screw-thread seals on both chambers prevent leaks even when tossed in bags'
    ],
    specifications: {
      'Total Capacity': '710 ml (Upper Bowl 200ml + Lower Base 510ml)',
      'Dimensions': '18.5 cm Height x 10.5 cm Diameter',
      'Thermal Performance': 'Hot for 6 Hours / Cold for 10 Hours',
      'Material': 'SUS304 Stainless Steel Inner Core + BPA-Free PP Shell',
      'Included Utensil': 'Collapsible SUS304 Folding Spoon',
      'Weight': '460 g'
    },
    images: [
      { id: 'p5-img-1', image_url: '/products/tedemei-food-jar-hero.png', alt_text: 'TEDEMEI 2-Tier Insulated Food Jar with Folding Spoon', sort_order: 1, is_primary: true },
      { id: 'p5-img-2', image_url: '/products/tedemei-food-jar-exploded.png', alt_text: 'Exploded structural diagram showing thermal insulation layers', sort_order: 2, is_primary: false },
      { id: 'p5-img-3', image_url: '/products/tedemei-food-jar-box-green.jpg', alt_text: 'Nordic Mint Green food jar in retail box', sort_order: 3, is_primary: false },
      { id: 'p5-img-4', image_url: '/products/tedemei-food-jar-lid-spoon.jpg', alt_text: 'Top silicone carrying loop and folding spoon lid compartment', sort_order: 4, is_primary: false },
      { id: 'p5-img-5', image_url: '/products/tedemei-food-jar-profile.jpg', alt_text: 'Side profile showing double-tier stackable body', sort_order: 5, is_primary: false },
      { id: 'p5-img-6', image_url: '/products/tedemei-food-jar-package-box.jpg', alt_text: 'Gift box presentation packaging', sort_order: 6, is_primary: false }
    ],
    variants: [
      {
        id: 'p5-v1',
        product_id: 'prod-05',
        name: 'Sage Mint Green',
        sku: 'UE-TD-FJ2-GRN',
        price: 699,
        compare_at_price: 1099,
        attributes: { color: 'Sage Mint Green', color_code: '#6EE7B7', capacity: '710ml' },
        color_code: '#6EE7B7',
        image_url: '/products/tedemei-food-jar-box-green.jpg',
        stock: 14,
        is_active: true
      },
      {
        id: 'p5-v2',
        product_id: 'prod-05',
        name: 'Warm Butter Yellow',
        sku: 'UE-TD-FJ2-YLW',
        price: 699,
        compare_at_price: 1099,
        attributes: { color: 'Warm Butter Yellow', color_code: '#FCD34D', capacity: '710ml' },
        color_code: '#FCD34D',
        image_url: '/products/tedemei-food-jar-hero.png',
        stock: 10,
        is_active: true
      },
      {
        id: 'p5-v3',
        product_id: 'prod-05',
        name: 'Soft Rose Pink',
        sku: 'UE-TD-FJ2-PNK',
        price: 699,
        compare_at_price: 1099,
        attributes: { color: 'Soft Rose Pink', color_code: '#F472B6', capacity: '710ml' },
        color_code: '#F472B6',
        image_url: '/products/tedemei-food-jar-hero.png',
        stock: 8,
        is_active: true
      }
    ],
    created_at: '2026-02-23T14:00:00Z',
    updated_at: '2026-03-04T09:40:00Z'
  },
  {
    id: 'prod-06',
    name: 'TEDEMEI Compact 3-Compartment Stainless Steel Lunch Box',
    slug: 'tedemei-compact-3-compartment-stainless-steel-lunch-box',
    description: 'Sleek, lightweight, and engineered for everyday convenience, the TEDEMEI Compact 3-Compartment Bento Lunch Box delivers ideal portion control without the bulk. Crafted with high-grade SUS304 stainless steel interior partitions, it prevents flavor cross-contamination. The smart lid features a top utensil docking recess that holds the included ergonomic fork plus a separate mini dip receptacle, freeing up every cubic centimeter inside for nutritious food.',
    short_description: 'Space-saving 3-section stainless steel bento with lid utensil slot and dip tray.',
    sku: 'UE-TD-3C-06',
    price: 649,
    compare_at_price: 999,
    discount: 35,
    category_id: 'c2',
    category_name: 'Lunch Boxes',
    category_slug: 'lunch-boxes',
    target_audience: 'school',
    brand: 'Urban Essentials',
    tags: ['bento', 'lunch-box', '3-compartment', 'school-kids', 'stainless-steel', 'compact'],
    stock_quantity: 42,
    low_stock_threshold: 8,
    rating: 4.7,
    review_count: 36,
    is_featured: false,
    is_new_arrival: false,
    is_bestseller: false,
    is_active: true,
    features: [
      '3 perfectly proportioned compartments tailored for school lunches and snack control',
      'Food-grade SUS304 stainless steel interior resists scratches and preserves authentic food taste',
      'External lid recess houses dining fork and dedicated dipping sauce compartment',
      'Double-sided latch clips engineered for secure snapping and easy opening by children',
      'Removable silicone gasket allows thorough cleaning to keep molds at bay'
    ],
    specifications: {
      'Capacity': '850 ml',
      'Dimensions': '21.5 cm Length x 15.5 cm Width x 6 cm Height',
      'Material': 'SUS304 Stainless Steel & BPA-Free Polypropylene',
      'Weight': '420 g',
      'Included Utensils': 'Reusable Dining Fork & Lid Sauce Tray',
      'Care': 'Dishwasher safe metal tray; hand wash outer box'
    },
    images: [
      { id: 'p6-img-1', image_url: '/products/tedemei-3c-hero.png', alt_text: 'TEDEMEI Compact 3-Compartment Bento Lunch Box', sort_order: 1, is_primary: true },
      { id: 'p6-img-2', image_url: '/products/tedemei-3c-seal.png', alt_text: 'Airtight silicone sealing gasket and secure snap latches', sort_order: 2, is_primary: false },
      { id: 'p6-img-3', image_url: '/products/tedemei-3c-specs.png', alt_text: 'Dimensions and pastel color variant specifications', sort_order: 3, is_primary: false }
    ],
    variants: [
      {
        id: 'p6-v1',
        product_id: 'prod-06',
        name: 'Pastel Baby Pink',
        sku: 'UE-TD-3C-PNK',
        price: 649,
        compare_at_price: 999,
        attributes: { color: 'Pastel Baby Pink', color_code: '#F9A8D4' },
        color_code: '#F9A8D4',
        image_url: '/products/tedemei-3c-hero.png',
        stock: 18,
        is_active: true
      },
      {
        id: 'p6-v2',
        product_id: 'prod-06',
        name: 'Clear Sky Blue',
        sku: 'UE-TD-3C-BLU',
        price: 649,
        compare_at_price: 999,
        attributes: { color: 'Clear Sky Blue', color_code: '#60A5FA' },
        color_code: '#60A5FA',
        image_url: '/products/tedemei-3c-specs.png',
        stock: 14,
        is_active: true
      },
      {
        id: 'p6-v3',
        product_id: 'prod-06',
        name: 'Matcha Olive Green',
        sku: 'UE-TD-3C-GRN',
        price: 649,
        compare_at_price: 999,
        attributes: { color: 'Matcha Olive Green', color_code: '#84CC16' },
        color_code: '#84CC16',
        image_url: '/products/tedemei-3c-specs.png',
        stock: 10,
        is_active: true
      }
    ],
    created_at: '2026-02-24T12:00:00Z',
    updated_at: '2026-03-04T15:00:00Z'
  },
  {
    id: 'prod-07',
    name: 'TEDEMEI 450ml Thermal Vacuum Insulated Soup Mug with Spoon',
    slug: 'tedemei-450ml-thermal-vacuum-insulated-soup-mug-spoon',
    description: 'Start your morning with piping hot soup, oatmeal, or herbal tea on the commute with the TEDEMEI 450ml Thermal Vacuum Insulated Soup Mug. Engineered with a mirror-electropolished SUS304 stainless steel interior chamber, this portable soup jar retains heat up to 6 hours while remaining completely cool to touch outside. Features an ingenious collapsible spoon housed directly inside the leakproof lid, plus a durable silicone carry loop for one-finger transit.',
    short_description: 'Vacuum insulated 450ml soup flask with built-in folding spoon and silicone loop handle.',
    sku: 'UE-TD-SM450-07',
    price: 599,
    compare_at_price: 949,
    discount: 37,
    category_id: 'c3',
    category_name: 'Water Bottles & Flasks',
    category_slug: 'water-bottles',
    target_audience: 'all',
    brand: 'Urban Essentials',
    tags: ['soup-mug', 'vacuum-flask', 'insulated', 'water-bottles', 'thermal', 'food-jar'],
    stock_quantity: 50,
    low_stock_threshold: 10,
    rating: 4.8,
    review_count: 51,
    is_featured: false,
    is_new_arrival: true,
    is_bestseller: true,
    is_active: true,
    features: [
      'Double-wall thermal vacuum insulation locks temperature: 6 hrs hot, 10 hrs cold',
      'Mirror-polished SUS304 food-grade stainless steel interior leaves zero metallic taste',
      'Concealed lid storage compartment includes stainless steel folding spoon',
      'Wide 8.5 cm mouth makes filling, eating, and hand-washing effortless',
      'Tear-resistant flexible silicone loop handle for easy carrying on commutes'
    ],
    specifications: {
      'Capacity': '450 ml',
      'Dimensions': '12.5 cm Height x 9 cm Base Diameter',
      'Mouth Diameter': '8.5 cm Wide Mouth',
      'Material': 'SUS304 Stainless Steel & Food Grade PP Shell',
      'Weight': '290 g',
      'Thermal Performance': 'Up to 6 Hours Hot / 10 Hours Cold',
      'Included Utensil': 'Folding Stainless Steel Soup Spoon'
    },
    images: [
      { id: 'p7-img-1', image_url: '/products/tedemei-soup-mug-hero.png', alt_text: 'TEDEMEI 450ml Thermal Vacuum Insulated Soup Mug', sort_order: 1, is_primary: true },
      { id: 'p7-img-2', image_url: '/products/tedemei-soup-mug-spoon.png', alt_text: 'Lid with built-in folding stainless steel spoon compartment', sort_order: 2, is_primary: false },
      { id: 'p7-img-3', image_url: '/products/tedemei-soup-mug-interior.png', alt_text: 'Mirror polished SUS304 stainless steel interior chamber', sort_order: 3, is_primary: false },
      { id: 'p7-img-4', image_url: '/products/tedemei-soup-mug-dimensions.png', alt_text: 'Dimensions 12.5cm x 9cm with 450ml volume diagram', sort_order: 4, is_primary: false },
      { id: 'p7-img-5', image_url: '/products/tedemei-soup-mug-thermal.png', alt_text: 'Multi-layer thermal insulation heat retention structure', sort_order: 5, is_primary: false },
      { id: 'p7-img-6', image_url: '/products/tedemei-soup-mug-colors.png', alt_text: 'Pastel Blue, Mint Green, and Soft Pink color variants', sort_order: 6, is_primary: false }
    ],
    variants: [
      {
        id: 'p7-v1',
        product_id: 'prod-07',
        name: 'Cornflower Blue',
        sku: 'UE-TD-SM450-BLU',
        price: 599,
        compare_at_price: 949,
        attributes: { color: 'Cornflower Blue', color_code: '#3B82F6', capacity: '450ml' },
        color_code: '#3B82F6',
        image_url: '/products/tedemei-soup-mug-hero.png',
        stock: 22,
        is_active: true
      },
      {
        id: 'p7-v2',
        product_id: 'prod-07',
        name: 'Cool Mint Green',
        sku: 'UE-TD-SM450-GRN',
        price: 599,
        compare_at_price: 949,
        attributes: { color: 'Cool Mint Green', color_code: '#10B981', capacity: '450ml' },
        color_code: '#10B981',
        image_url: '/products/tedemei-soup-mug-colors.png',
        stock: 16,
        is_active: true
      },
      {
        id: 'p7-v3',
        product_id: 'prod-07',
        name: 'Blush Cotton Pink',
        sku: 'UE-TD-SM450-PNK',
        price: 599,
        compare_at_price: 949,
        attributes: { color: 'Blush Cotton Pink', color_code: '#F472B6', capacity: '450ml' },
        color_code: '#F472B6',
        image_url: '/products/tedemei-soup-mug-colors.png',
        stock: 12,
        is_active: true
      }
    ],
    created_at: '2026-02-25T15:00:00Z',
    updated_at: '2026-03-05T08:10:00Z'
  },
  {
    id: 'prod-08',
    name: 'Delicious Life 900ml 3-Tier Multi-Layer Stackable Lunch Jar',
    slug: 'delicious-life-900ml-3-tier-stackable-lunch-jar',
    description: 'Say goodbye to boring single-dish lunches. The Delicious Life 900ml 3-Tier Multi-Layer Stackable Lunch Jar organizes a multi-course gourmet meal into one sleek vertical column. Featuring 3 independent SUS304 stainless steel bowls (250ml + 250ml + 400ml), each vessel connects with an airtight spiral thread and food-grade silicone gasket. With an arched sturdy carry handle and multi-layer thermal wall construction, it keeps rice, curries, and salads separate and at optimal freshness all day long.',
    short_description: '3-tier 900ml stainless steel stackable lunch jar with arched carry handle.',
    sku: 'UE-DL-LJ3-08',
    price: 899,
    compare_at_price: 1499,
    discount: 40,
    category_id: 'c2',
    category_name: 'Lunch Boxes',
    category_slug: 'lunch-boxes',
    target_audience: 'office',
    brand: 'Urban Essentials',
    tags: ['lunch-jar', '3-tier', 'stackable', 'stainless-steel', 'office', 'travel', 'hot-food'],
    stock_quantity: 35,
    low_stock_threshold: 6,
    rating: 4.9,
    review_count: 58,
    is_featured: true,
    is_new_arrival: false,
    is_bestseller: true,
    is_active: true,
    features: [
      '3-tier modular capacity (250ml + 250ml + 400ml) totals 900ml of organized dining',
      'Independent spiral twist-lock threading on every tier guarantees zero gravy leakage',
      'SUS304 food-grade stainless steel bowls keep tastes unadulterated and hygienic',
      'Ergonomic heavy-duty arched top handle engineered for comfortable everyday carrying',
      'Multi-layer thermal isolation barrier retains heat across hours of commute and work'
    ],
    specifications: {
      'Capacity': '900 ml (250 ml + 250 ml + 400 ml)',
      'Dimensions': '24 cm Height x 11.5 cm Diameter',
      'Material': 'SUS304 Stainless Steel Interior + Thermal Insulated PP Exterior',
      'Tiers': '3 Modular Interlocking Bowls',
      'Weight': '620 g',
      'Leak Resistance': 'Individual Threaded Silicone Gasket on Each Tier',
      'Thermal Performance': '4 - 6 Hours Heat Retention'
    },
    images: [
      { id: 'p8-img-1', image_url: '/products/delicious-life-jar-hero.png', alt_text: 'Delicious Life 900ml 3-Tier Multi-Layer Stackable Lunch Jar', sort_order: 1, is_primary: true },
      { id: 'p8-img-2', image_url: '/products/delicious-life-jar-tiers.png', alt_text: '3 Disassembled stainless steel bowls: 250ml + 250ml + 400ml', sort_order: 2, is_primary: false },
      { id: 'p8-img-3', image_url: '/products/delicious-life-jar-temperature.png', alt_text: 'Multi-hour thermal heat retention temperature curve', sort_order: 3, is_primary: false },
      { id: 'p8-img-4', image_url: '/products/delicious-life-jar-dimensions.png', alt_text: 'Dimensions 24cm x 11.5cm and arched handle structure', sort_order: 4, is_primary: false },
      { id: 'p8-img-5', image_url: '/products/delicious-life-jar-thread-seal.png', alt_text: 'Spiral twist lock thread with airtight silicone ring', sort_order: 5, is_primary: false },
      { id: 'p8-img-6', image_url: '/products/delicious-life-jar-colors.png', alt_text: 'Cream White, Sage Green, and Coral Pink variants', sort_order: 6, is_primary: false },
      { id: 'p8-img-7', image_url: '/products/delicious-life-jar-picnic.png', alt_text: 'Outdoor lifestyle picnic and office dining spread', sort_order: 7, is_primary: false }
    ],
    variants: [
      {
        id: 'p8-v1',
        product_id: 'prod-08',
        name: 'Creamy Pearl White',
        sku: 'UE-DL-LJ3-WHT',
        price: 899,
        compare_at_price: 1499,
        attributes: { color: 'Creamy Pearl White', color_code: '#F5F5F4', capacity: '900ml' },
        color_code: '#F5F5F4',
        image_url: '/products/delicious-life-jar-hero.png',
        stock: 15,
        is_active: true
      },
      {
        id: 'p8-v2',
        product_id: 'prod-08',
        name: 'Botanical Sage Green',
        sku: 'UE-DL-LJ3-GRN',
        price: 899,
        compare_at_price: 1499,
        attributes: { color: 'Botanical Sage Green', color_code: '#84CC16', capacity: '900ml' },
        color_code: '#84CC16',
        image_url: '/products/delicious-life-jar-colors.png',
        stock: 12,
        is_active: true
      },
      {
        id: 'p8-v3',
        product_id: 'prod-08',
        name: 'Coral Peach Pink',
        sku: 'UE-DL-LJ3-PNK',
        price: 899,
        compare_at_price: 1499,
        attributes: { color: 'Coral Peach Pink', color_code: '#FB7185', capacity: '900ml' },
        color_code: '#FB7185',
        image_url: '/products/delicious-life-jar-colors.png',
        stock: 8,
        is_active: true
      }
    ],
    created_at: '2026-02-26T16:00:00Z',
    updated_at: '2026-03-05T13:00:00Z'
  },
  {
    id: 'prod-09',
    name: 'KOOOL Animal Kids DIY EVA Hard-Shell Backpack with 3D Charms',
    slug: 'koool-animal-kids-diy-eva-hard-shell-backpack-charms',
    description: 'Spark endless creativity and delight on the way to school with the KOOOL Animal Kids DIY EVA Hard-Shell Backpack. Designed with an ultra-durable, waterproof 3D molded EVA front shell, this backpack protects books, pencil cases, and water bottles from bumps, drops, and rain. The customizable exterior panel lets kids snap in their favorite interchangeable 3D silicone animal charms (including bear, bunny, bee, watermelon, and pizza slices!). Finished with breathable honeycomb padded mesh shoulder straps and a sternum clip to safeguard developing spines.',
    short_description: 'Waterproof 3D molded EVA hardshell kids backpack with customizable animal charms.',
    sku: 'UE-KL-BP-09',
    price: 749,
    compare_at_price: 1299,
    discount: 42,
    category_id: 'c1',
    category_name: 'Backpacks',
    category_slug: 'backpacks',
    target_audience: 'school',
    brand: 'Urban Essentials',
    tags: ['backpack', 'kids-bag', 'eva-hardshell', 'diy-charms', 'school', 'waterproof', 'ergonomic'],
    stock_quantity: 48,
    low_stock_threshold: 8,
    rating: 5.0,
    review_count: 67,
    is_featured: true,
    is_new_arrival: true,
    is_bestseller: true,
    is_active: true,
    features: [
      'Shockproof waterproof molded EVA hardshell protects school essentials from impacts and rain',
      'Interactive DIY facade allows children to snap on and arrange 3D cartoon silicone charms',
      'Ergonomic honeycomb breathable back panel and padded S-curve shoulder straps',
      'Includes safety chest buckle clip to keep shoulder straps balanced and secure',
      'Sturdy smooth dual zippers with soft child-friendly rubber pull grips',
      'Packaged in a premium collector presentation window gift box'
    ],
    specifications: {
      'Dimensions': '32 cm Height x 26 cm Width x 13 cm Depth',
      'Weight': '380 g (Ultra Lightweight for Children)',
      'Material': 'High-Density Molded EVA + Honeycomb Breathable Polyester Mesh',
      'Recommended Age': '3 to 9 Years Old (Preschool & Primary)',
      'Water Resistance': 'Water-Repellent EVA Shell',
      'Included Accessories': 'Set of 5 Removable 3D Silicone Charms + Collector Gift Box'
    },
    images: [
      { id: 'p9-img-1', image_url: '/products/koool-backpack-hero.jpg', alt_text: 'KOOOL Animal Kids DIY EVA Hard-Shell Backpack with Charms', sort_order: 1, is_primary: true },
      { id: 'p9-img-2', image_url: '/products/koool-backpack-angle.jpg', alt_text: 'Curved hard-shell front and smooth zippers angle view', sort_order: 2, is_primary: false },
      { id: 'p9-img-3', image_url: '/products/koool-backpack-features-spec.jpg', alt_text: 'Water-Resistant Silicone Shell and Ergonomic Padded Straps Specifications', sort_order: 3, is_primary: false },
      { id: 'p9-img-4', image_url: '/products/koool-backpack-spacious-spec.jpg', alt_text: 'Spacious Interior Compartment for Books, Stationery, and Toys', sort_order: 4, is_primary: false },
      { id: 'p9-img-5', image_url: '/products/koool-backpack-giftbox-hd.jpg', alt_text: 'KOOOL Animal Backpack Presentation Window Gift Box', sort_order: 5, is_primary: false },
      { id: 'p9-img-6', image_url: '/products/koool-backpack-straps.jpg', alt_text: 'Breathable honeycomb padded mesh shoulder straps and chest buckle', sort_order: 6, is_primary: false },
      { id: 'p9-img-7', image_url: '/products/koool-backpack-side.jpg', alt_text: 'Side profile showing depth and structure', sort_order: 7, is_primary: false },
      { id: 'p9-img-8', image_url: '/products/koool-backpack-gift-box.jpg', alt_text: 'KOOOL Animal Backpack gift box packaging with DIY 3D animal charms', sort_order: 8, is_primary: false }
    ],
    variants: [
      {
        id: 'p9-v1',
        product_id: 'prod-09',
        name: 'Sunshine Bumblebee Yellow',
        sku: 'UE-KL-BP-YLW',
        price: 749,
        compare_at_price: 1299,
        attributes: { color: 'Sunshine Bumblebee Yellow', color_code: '#FBBF24' },
        color_code: '#FBBF24',
        image_url: '/products/koool-backpack-hero.jpg',
        stock: 20,
        is_active: true
      },
      {
        id: 'p9-v2',
        product_id: 'prod-09',
        name: 'Sky Explorer Blue',
        sku: 'UE-KL-BP-BLU',
        price: 749,
        compare_at_price: 1299,
        attributes: { color: 'Sky Explorer Blue', color_code: '#38BDF8' },
        color_code: '#38BDF8',
        image_url: '/products/koool-backpack-hero.jpg',
        stock: 15,
        is_active: true
      },
      {
        id: 'p9-v3',
        product_id: 'prod-09',
        name: 'Candy Bunny Pink',
        sku: 'UE-KL-BP-PNK',
        price: 749,
        compare_at_price: 1299,
        attributes: { color: 'Candy Bunny Pink', color_code: '#F472B6' },
        color_code: '#F472B6',
        image_url: '/products/koool-backpack-gift-box.jpg',
        stock: 13,
        is_active: true
      }
    ],
    created_at: '2026-02-27T10:00:00Z',
    updated_at: '2026-03-05T14:30:00Z'
  }
,
  {
    id: 'prod-10',
    name: 'Premium Batman 3-in-1 Kids School Backpack Combo',
    slug: 'batman-3-in-1-school-backpack-combo',
    description: 'Unleash your child\'s inner superhero with the Premium Batman 3-in-1 School Bag Combo. This high-octane back-to-school kit features an 18-inch 4-compartment backpack, an insulated Batman lunch pouch, and a 3D embossed hard-shell stationery pencil case. Engineered with an armored front shell showcasing the Caped Crusader and Batmobile, it withstands daily playground adventures while keeping heavy textbooks, tablets, and pencil cases neatly separated. Features ergonomic breathable honeycomb spine padding, cushioned S-curve shoulder straps, dual side drink holders, and custom yellow Bat-Signal rubber zipper pulls.',
    short_description: 'Armored 18-inch 4-compartment Batman school backpack with insulated lunch bag and stationery case.',
    sku: 'UE-BM-3IN1-10',
    price: 1299,
    compare_at_price: 2199,
    discount: 41,
    category_id: 'c1',
    category_name: 'Backpacks',
    category_slug: 'backpacks',
    target_audience: 'school',
    brand: 'Urban Essentials',
    tags: ['backpack', 'batman', 'superhero', '3-in-1-combo', 'school-bag', 'pencil-case', 'lunch-pouch', 'kids', 'bestseller'],
    stock_quantity: 42,
    low_stock_threshold: 8,
    rating: 4.9,
    review_count: 38,
    is_featured: true,
    is_new_arrival: true,
    is_bestseller: true,
    is_active: true,
    features: [
      'Complete 3-in-1 school kit: 18-inch backpack, insulated lunch pouch, and durable pencil case',
      'High-definition 3D embossed Batman armor and Batmobile comic graphics that hold shape',
      '4 spacious compartments: 2 large main binder/book cavities and 2 front organization pockets',
      'Breathable honeycomb cushioned back panel with ergonomic spine support and padded straps',
      'Dual deep side bottle pockets with reinforced mesh and custom Bat-Signal zipper pulls',
      'Heavy-duty 900D water-repellent oxford fabric resists tears, scuffs, and monsoon downpours'
    ],
    specifications: {
      'Backpack Dimensions': '18 Inch Height x 13 Inch Width x 7.5 Inch Depth (45.7 cm x 33 cm x 19 cm)',
      'Capacity': '28 Liters (Large multi-compartment)',
      'Included Pieces': '1x 4-Compartment Backpack, 1x Insulated Lunch Pouch, 1x Hard-Shell Pencil Case',
      'Material': '900D Heavy-Duty Oxford Polyester + 3D Molded EVA Armor',
      'Recommended Age': '5 to 14 Years Old (Primary & Middle School)',
      'Closure': 'Dual Smooth Metal Zippers with Bat-Signal Pull Tabs',
      'Water Resistance': 'Water-Repellent Hydrophobic Surface'
    },
    images: [
      { id: 'p10-img-1', image_url: '/products/batman-3in1-combo-hero.jpg', alt_text: 'Premium Batman 3-in-1 School Bag Combo with Water Bottle', sort_order: 1, is_primary: true },
      { id: 'p10-img-2', image_url: '/products/batman-3in1-combo-infographic.jpg', alt_text: 'Batman 3-in-1 Specifications and Features 18 Inch Height', sort_order: 2, is_primary: false },
      { id: 'p10-img-3', image_url: '/products/batman-3in1-combo-angle.jpg', alt_text: 'Side angle showing Batman 3D embossed shield and water bottle holder', sort_order: 3, is_primary: false },
      { id: 'p10-img-4', image_url: '/products/batman-3in1-combo-close-up.jpg', alt_text: 'Close-up of 3D Batman emblem and comic grid compartments', sort_order: 4, is_primary: false },
      { id: 'p10-img-5', image_url: '/products/batman-3in1-combo-action.jpg', alt_text: 'Front perspective showcasing 4 compartments and Bat-Signal pulls', sort_order: 5, is_primary: false },
      { id: 'p10-img-6', image_url: '/products/batman-3in1-combo-lifestyle.jpg', alt_text: 'Outdoor park bench lifestyle view', sort_order: 6, is_primary: false }
    ],
    variants: [
      {
        id: 'p10-v1',
        product_id: 'prod-10',
        name: 'Dark Knight Shadow Black',
        sku: 'UE-BM-3IN1-BLK',
        price: 1299,
        compare_at_price: 2199,
        attributes: { color: 'Dark Knight Shadow Black', color_code: '#18181B' },
        color_code: '#18181B',
        image_url: '/products/batman-3in1-combo-hero.jpg',
        stock: 42,
        is_active: true
      }
    ],
    created_at: '2026-03-08T10:00:00Z',
    updated_at: '2026-03-08T10:00:00Z'
  },
  {
    id: 'prod-11',
    name: 'Premium Spider-Man 3-in-1 Kids School Backpack Combo',
    slug: 'spiderman-3-in-1-school-backpack-combo',
    description: 'Swing into the new school year with the ultimate superhero gear: the Premium Spider-Man 3-in-1 School Bag Combo. This high-capacity school set comes fully equipped with an 18-inch 4-compartment backpack, an insulated Spider-Man lunch pouch, and a protective hard-shell pencil box. Built with a high-impact 3D molded Spider-Man web-slinger armor plate, this bag resists scuffs and protects books, workbooks, and electronics. Features breathable honeycomb back mesh padding, ergonomic padded straps, deep dual side bottle holders, and easy-glide metallic zippers with custom web pullers.',
    short_description: '18-inch 4-compartment Spider-Man school backpack with matching insulated lunch bag and pencil case.',
    sku: 'UE-SM-3IN1-11',
    price: 1299,
    compare_at_price: 2199,
    discount: 41,
    category_id: 'c1',
    category_name: 'Backpacks',
    category_slug: 'backpacks',
    target_audience: 'school',
    brand: 'Urban Essentials',
    tags: ['backpack', 'spiderman', 'superhero', '3-in-1-combo', 'school-bag', 'pencil-case', 'lunch-pouch', 'kids', 'bestseller'],
    stock_quantity: 45,
    low_stock_threshold: 8,
    rating: 5.0,
    review_count: 44,
    is_featured: true,
    is_new_arrival: true,
    is_bestseller: true,
    is_active: true,
    features: [
      'All-inclusive 3-piece combo: 18-inch backpack, insulated lunch pouch, and 3D pencil case',
      'Bold 3D embossed Spider-Man action armor plate that thrills young Marvel fans',
      '4 separate organized compartments: 2 large textbook sections + 2 front gadget pockets',
      'Ergonomic spine protection with air-mesh breathable cushioning and adjustable straps',
      'Dual deep side mesh pockets for bottles with safety reflective accent piping',
      'Tough 900D waterproof oxford fabric designed to endure rough daily school bus rides'
    ],
    specifications: {
      'Backpack Dimensions': '18 Inch Height x 13 Inch Width x 7.5 Inch Depth (45.7 cm x 33 cm x 19 cm)',
      'Capacity': '28 Liters (Fits large binders, notebooks, and lunch pouch)',
      'Set Includes': '1x 4-Compartment Backpack, 1x Matching Lunch Pouch, 1x 3D Molded Pencil Box',
      'Material': 'Tough 900D Waterproof Oxford Fabric + Molded EVA Shield',
      'Recommended Age': '5 to 14 Years Old (Primary & Middle School)',
      'Water Resistance': 'Splash-Proof & Rain-Resistant Poly Shell'
    },
    images: [
      { id: 'p11-img-1', image_url: '/products/spiderman-3in1-combo-hero.jpg', alt_text: 'Premium Spider-Man 3-in-1 School Bag Combo', sort_order: 1, is_primary: true },
      { id: 'p11-img-2', image_url: '/products/spiderman-3in1-combo-infographic.jpg', alt_text: 'Spider-Man 3-in-1 Specifications and Features 18 Inch Height', sort_order: 2, is_primary: false },
      { id: 'p11-img-3', image_url: '/products/spiderman-3in1-combo-park.jpg', alt_text: 'Spider-Man backpack placed outdoors on park bench', sort_order: 3, is_primary: false },
      { id: 'p11-img-4', image_url: '/products/spiderman-3in1-combo-angle.jpg', alt_text: 'Side profile showing depth and web-slinger armor plate', sort_order: 4, is_primary: false },
      { id: 'p11-img-5', image_url: '/products/spiderman-3in1-combo-details.jpg', alt_text: 'Close up of 3D Spider-Man mask and front organizer pocket', sort_order: 5, is_primary: false },
      { id: 'p11-img-6', image_url: '/products/spiderman-3in1-combo-lifestyle.jpg', alt_text: 'Spider-Man school bag ready for school commute', sort_order: 6, is_primary: false }
    ],
    variants: [
      {
        id: 'p11-v1',
        product_id: 'prod-11',
        name: 'Web-Slinger Hero Blue & Red',
        sku: 'UE-SM-3IN1-BLU',
        price: 1299,
        compare_at_price: 2199,
        attributes: { color: 'Web-Slinger Hero Blue & Red', color_code: '#DC2626' },
        color_code: '#DC2626',
        image_url: '/products/spiderman-3in1-combo-hero.jpg',
        stock: 45,
        is_active: true
      }
    ],
    created_at: '2026-03-08T11:00:00Z',
    updated_at: '2026-03-08T11:00:00Z'
  },
  {
    id: 'prod-12',
    name: 'Football Series 3D Cleat & Grid Embossed Kids School Backpack',
    slug: 'football-series-3d-cleat-embossed-school-backpack',
    description: 'Designed for young sports champions and soccer lovers, the Football Series Backpack features an eye-catching 3D embossed golden football cleat and textured hexagonal soccer ball grid facade. Built tough with high-strength 800D ballistic polyester fabric, this 4-compartment backpack organizes hefty school books, notebooks, lunch boxes, and gear. Features dual side stretch bottle pockets, thick ergonomic foam shoulder straps, breathable mesh back panel, and custom soccer ball zipper pullers.',
    short_description: '4-compartment kids school backpack with 3D soccer cleat & ball embossed armor facade.',
    sku: 'UE-FB-SC4-12',
    price: 1099,
    compare_at_price: 1799,
    discount: 39,
    category_id: 'c1',
    category_name: 'Backpacks',
    category_slug: 'backpacks',
    target_audience: 'school',
    brand: 'Urban Essentials',
    tags: ['backpack', 'football', 'soccer', 'sports', 'kids-bag', 'school', 'multi-compartment'],
    stock_quantity: 35,
    low_stock_threshold: 6,
    rating: 4.8,
    review_count: 29,
    is_featured: true,
    is_new_arrival: true,
    is_bestseller: false,
    is_active: true,
    features: [
      'Tactile 3D molded golden soccer cleat and hexagonal soccer grid front panel',
      '4 separate zippered compartments for optimal distribution of heavy school textbooks',
      'Ultra-resistant ballistic fabric with reinforced bottom panel to prevent scuffs',
      'Dual deep side bottle pockets with high-stretch elastic for secure bottle retention',
      'Heavy-duty custom soccer ball metal zipper pullers and smooth glide chains',
      'Thick padded mesh shoulder straps and top handle for painless daily carrying'
    ],
    specifications: {
      'Dimensions': '44 cm Height x 32 cm Width x 18 cm Depth',
      'Capacity': '25 Liters',
      'Material': 'Ultra-Resistant 800D Fabric + 3D Molded Front EVA Shield',
      'Weight': '580 g',
      'Compartments': '4 Zipped Chambers + 2 Side Elastic Bottle Pockets',
      'Zipper Type': 'Heavy Duty Chains with Soccer Ball Embossed Metal Pulls'
    },
    images: [
      { id: 'p12-img-1', image_url: '/products/football-cleat-backpack-hero.jpg', alt_text: 'Football Series 3D Cleat & Grid School Backpack', sort_order: 1, is_primary: true },
      { id: 'p12-img-2', image_url: '/products/football-cleat-backpack-specs.jpg', alt_text: 'Specifications Football Series 4 Compartments Ultra-Resistant Fabric', sort_order: 2, is_primary: false },
      { id: 'p12-img-3', image_url: '/products/football-cleat-backpack-angle.jpg', alt_text: 'Hexagonal honeycomb 3D cleat texture side perspective', sort_order: 3, is_primary: false },
      { id: 'p12-img-4', image_url: '/products/football-cleat-backpack-front.jpg', alt_text: 'Front view showcasing golden soccer cleat and soccer balls', sort_order: 4, is_primary: false },
      { id: 'p12-img-5', image_url: '/products/football-cleat-backpack-back.jpg', alt_text: 'Ergonomic breathable padded back panel and shoulder straps', sort_order: 5, is_primary: false },
      { id: 'p12-img-6', image_url: '/products/football-cleat-backpack-lifestyle.jpg', alt_text: 'Soccer themed school backpack on park bench in sunlight', sort_order: 6, is_primary: false }
    ],
    variants: [
      {
        id: 'p12-v1',
        product_id: 'prod-12',
        name: 'Championship Gold & Jet Black',
        sku: 'UE-FB-SC4-GLD',
        price: 1099,
        compare_at_price: 1799,
        attributes: { color: 'Championship Gold & Jet Black', color_code: '#D97706' },
        color_code: '#D97706',
        image_url: '/products/football-cleat-backpack-hero.jpg',
        stock: 35,
        is_active: true
      }
    ],
    created_at: '2026-03-08T12:00:00Z',
    updated_at: '2026-03-08T12:00:00Z'
  },
  {
    id: 'prod-13',
    name: 'Astronaut 3D Space Explorer Kids School Backpack',
    slug: 'astronaut-3d-space-explorer-kids-backpack',
    description: 'Launch your little one\'s curiosity into orbit with the Astronaut 3D Space Explorer Kids School Backpack. Crafted for young adventurers aged 3 to 7, this ultra-lightweight 12L bag features an eye-catching 3D silicone astronaut rocket badge that dangles on the front, paired with an interstellar flap pocket adorned with planets, stars, and rockets. Built with plush padded top grab handle, breathable ergonomic shoulder straps, side elastic bottle holders, and splash-proof fabric that stands up to preschool spills.',
    short_description: 'Preschool & kindergarten 12L space explorer backpack with 3D astronaut rocket badge.',
    sku: 'UE-AST-BP-13',
    price: 799,
    compare_at_price: 1399,
    discount: 43,
    category_id: 'c1',
    category_name: 'Backpacks',
    category_slug: 'backpacks',
    target_audience: 'school',
    brand: 'JBSJ',
    tags: ['backpack', 'astronaut', 'space', 'kids-bag', 'preschool', 'kindergarten', 'ergonomic'],
    stock_quantity: 42,
    low_stock_threshold: 8,
    rating: 4.9,
    review_count: 36,
    is_featured: true,
    is_new_arrival: true,
    is_bestseller: false,
    is_active: true,
    features: [
      'Vibrant 3D embossed astronaut rocket emblem and colorful cosmic space landscape pocket',
      'Engineered for young learners aged 3 to 7 with lightweight ergonomic spine support',
      'Spacious 12-liter main compartment accommodates preschool books, coloring kits, and tiffin',
      'Chubby padded arched top grab handle designed for easy carrying by tiny hands or parents',
      'Water-repellent durable outer fabric with smooth safety-tested dual zipper pullers',
      'Elastic side stretch mesh pockets for sippers, water bottles, and small umbrellas'
    ],
    specifications: {
      'Dimensions': '32 cm Height x 26 cm Width x 12 cm Depth',
      'Capacity': '12 Liters',
      'Weight': '390 g (Featherlight for young kids)',
      'Recommended Age': 'Ages 3 to 7 Years Old (Preschool & Kindergarten)',
      'Material': 'Water-Repellent Poly-Nylon + Molded 3D Astronaut Badge',
      'Straps': 'Breathable Honeycomb Mesh Padded Shoulder Straps'
    },
    images: [
      { id: 'p13-img-1', image_url: '/products/astronaut-space-backpack-hero.jpg', alt_text: 'Astronaut 3D Space Explorer Kids School Backpack', sort_order: 1, is_primary: true },
      { id: 'p13-img-2', image_url: '/products/astronaut-space-backpack-specs.jpg', alt_text: 'Ideal Back-to-School Pack for Ages 3-7 Dimensions 32cm x 26cm 12L Capacity', sort_order: 2, is_primary: false },
      { id: 'p13-img-3', image_url: '/products/astronaut-space-backpack-front.jpg', alt_text: 'Front view showing astronaut rocket emblem and space flap pocket', sort_order: 3, is_primary: false },
      { id: 'p13-img-4', image_url: '/products/astronaut-space-backpack-angle.jpg', alt_text: 'Side angle view showing bottle pocket and padded arched handle', sort_order: 4, is_primary: false },
      { id: 'p13-img-5', image_url: '/products/astronaut-space-backpack-side.jpg', alt_text: 'Side profile showing depth and lightweight construction', sort_order: 5, is_primary: false },
      { id: 'p13-img-6', image_url: '/products/astronaut-space-backpack-open.jpg', alt_text: 'Open compartment view with stationery and books', sort_order: 6, is_primary: false },
      { id: 'p13-img-7', image_url: '/products/astronaut-space-backpack-lifestyle.jpg', alt_text: 'Kids bedroom desk lifestyle setting with books and toys', sort_order: 7, is_primary: false }
    ],
    variants: [
      {
        id: 'p13-v1',
        product_id: 'prod-13',
        name: 'Cosmic Deep Navy & Sky Blue',
        sku: 'UE-AST-BP-NVY',
        price: 799,
        compare_at_price: 1399,
        attributes: { color: 'Cosmic Deep Navy & Sky Blue', color_code: '#1E3A8A' },
        color_code: '#1E3A8A',
        image_url: '/products/astronaut-space-backpack-hero.jpg',
        stock: 42,
        is_active: true
      }
    ],
    created_at: '2026-03-08T13:00:00Z',
    updated_at: '2026-03-08T13:00:00Z'
  },
  {
    id: 'prod-14',
    name: 'Kuromi 3D Character Kids Pastel School Backpack',
    slug: 'kuromi-3d-character-kids-pastel-school-backpack',
    description: 'Add a sprinkle of sweet mischievous charm to school days with the Kuromi 3D Character Kids Pastel Backpack. Designed in dreamy lilac purple and blush pink, this 12L preschool and primary backpack features a dimensional Kuromi silicone head, a hanging golden star charm, and a rainbow arc curved front flap pocket. With thick cushioned arched top carry handle, breathable back straps, and waterproof easy-wipe fabric, it keeps young learners comfortable and delighted throughout the day.',
    short_description: 'Lilac purple 12L kids backpack featuring 3D Kuromi silicone crest and rainbow arc pocket.',
    sku: 'UE-KR-BP-14',
    price: 799,
    compare_at_price: 1399,
    discount: 43,
    category_id: 'c1',
    category_name: 'Backpacks',
    category_slug: 'backpacks',
    target_audience: 'school',
    brand: 'Urban Essentials',
    tags: ['backpack', 'kuromi', 'pastel', 'sanrio-style', 'kids-bag', 'lilac', 'preschool'],
    stock_quantity: 38,
    low_stock_threshold: 8,
    rating: 5.0,
    review_count: 51,
    is_featured: true,
    is_new_arrival: true,
    is_bestseller: true,
    is_active: true,
    features: [
      'Charming 3D Kuromi character silicone badge with golden star dangle charm',
      'Rainbow arc pastel front pocket with magnetic snap and easy-access storage',
      'Lightweight 12L capacity tailored for nursery, kindergarten, and lower primary school',
      'Ultra-plush padded ergonomic carry handle and ventilated back straps',
      'Water-resistant pastel fabric that wipes clean instantly from spills or chalk dust',
      'Side pouches for drink bottles and snacks'
    ],
    specifications: {
      'Dimensions': '32 cm Height x 26 cm Width x 12 cm Depth',
      'Capacity': '12 Liters',
      'Weight': '390 g',
      'Recommended Age': '3 to 7 Years Old',
      'Material': 'High-Grade Waterproof Polyester + Silicone Character Crest',
      'Color Scheme': 'Pastel Lilac Purple, Soft Pink, and Rainbow Arc Accent'
    },
    images: [
      { id: 'p14-img-1', image_url: '/products/kuromi-pastel-backpack-hero.jpg', alt_text: 'Kuromi 3D Character Kids Pastel School Backpack in Lilac', sort_order: 1, is_primary: true },
      { id: 'p14-img-2', image_url: '/products/kuromi-pastel-backpack-specs.jpg', alt_text: 'Ideal Back-to-School Pack for Ages 3-7 Kuromi Dimensions 32cm x 26cm', sort_order: 2, is_primary: false },
      { id: 'p14-img-3', image_url: '/products/kuromi-pastel-backpack-front.jpg', alt_text: 'Front perspective with 3D Kuromi face and star charm', sort_order: 3, is_primary: false },
      { id: 'p14-img-4', image_url: '/products/kuromi-pastel-backpack-angle.jpg', alt_text: 'Side angle showing soft arched handle and rainbow flap pocket', sort_order: 4, is_primary: false },
      { id: 'p14-img-5', image_url: '/products/kuromi-pastel-backpack-side.jpg', alt_text: 'Side view showing water bottle mesh holder', sort_order: 5, is_primary: false },
      { id: 'p14-img-6', image_url: '/products/kuromi-pastel-backpack-open.jpg', alt_text: 'Interior capacity view holding notebooks and pencil box', sort_order: 6, is_primary: false },
      { id: 'p14-img-7', image_url: '/products/kuromi-pastel-backpack-lifestyle.jpg', alt_text: 'Lifestyle shot on study desk with pastel books', sort_order: 7, is_primary: false }
    ],
    variants: [
      {
        id: 'p14-v1',
        product_id: 'prod-14',
        name: 'Pastel Lilac & Blossom Pink',
        sku: 'UE-KR-BP-LIL',
        price: 799,
        compare_at_price: 1399,
        attributes: { color: 'Pastel Lilac & Blossom Pink', color_code: '#C084FC' },
        color_code: '#C084FC',
        image_url: '/products/kuromi-pastel-backpack-hero.jpg',
        stock: 38,
        is_active: true
      }
    ],
    created_at: '2026-03-08T14:00:00Z',
    updated_at: '2026-03-08T14:00:00Z'
  },
  {
    id: 'prod-15',
    name: 'Retro Rotary Telephone 3D Hard-Shell Toddler Backpack',
    slug: 'retro-rotary-telephone-3d-hardshell-toddler-backpack',
    description: 'Dial up instant fun with the Retro Rotary Telephone 3D Hard-Shell Toddler Backpack! Modeled like a vintage rotary desk telephone complete with a tactile telephone handset and interactive dial wheel featuring a red heart center, this whimsical bag is a guaranteed conversation starter at preschool and daycare. The shock-absorbing molded EVA shell protects crayons, snacks, and small books from accidental drops. Features soft padded adjustable straps, child-friendly rubber pull zippers, and waterproof wipe-clean surface.',
    short_description: 'Vintage telephone rotary dial 3D molded hardshell toddler backpack with heart dial.',
    sku: 'UE-RT-BP-15',
    price: 699,
    compare_at_price: 1199,
    discount: 42,
    category_id: 'c1',
    category_name: 'Backpacks',
    category_slug: 'backpacks',
    target_audience: 'school',
    brand: 'Urban Essentials',
    tags: ['backpack', 'telephone', 'vintage', 'rotary-phone', 'toddler-bag', 'preschool', 'hardshell'],
    stock_quantity: 44,
    low_stock_threshold: 8,
    rating: 4.9,
    review_count: 32,
    is_featured: false,
    is_new_arrival: true,
    is_bestseller: false,
    is_active: true,
    features: [
      'Iconic retro rotary telephone molded 3D facade with tactile rotating dial and red heart center',
      'Impact-absorbing EVA hardshell protects lunch, coloring books, and toys from crush damage',
      'Full wide-mouth clamshell zipper opening makes packing and unpacking effortless for kids',
      'Super comfortable padded adjustable shoulder straps with reinforced stitching',
      'Waterproof wipe-clean exterior easily handles playground mud and drink spills'
    ],
    specifications: {
      'Dimensions': '28 cm Height x 24 cm Width x 11 cm Depth',
      'Capacity': '8 Liters (Toddler / Preschool)',
      'Material': 'Shockproof Molded EVA + BPA-Free ABS Phone Facade + Cotton Webbing',
      'Weight': '320 g',
      'Recommended Age': '2 to 6 Years Old (Playgroup & Nursery)',
      'Closure': 'Durable Smooth Dual Metal Zipper with Brand Pullers'
    },
    images: [
      { id: 'p15-img-1', image_url: '/products/retro-telephone-backpack-hero.jpg', alt_text: 'Retro Rotary Telephone 3D Toddler Backpack on Park Bench', sort_order: 1, is_primary: true },
      { id: 'p15-img-2', image_url: '/products/retro-telephone-backpack-specs.jpg', alt_text: 'Specifications Telephone Series 1 Compartment Backpack Soft Padded Straps', sort_order: 2, is_primary: false },
      { id: 'p15-img-3', image_url: '/products/retro-telephone-backpack-blue.jpg', alt_text: 'Sky Blue and Baby Pink telephone bag variant', sort_order: 3, is_primary: false },
      { id: 'p15-img-4', image_url: '/products/retro-telephone-backpack-purple.jpg', alt_text: 'Pastel Lavender and Candy Pink telephone bag variant', sort_order: 4, is_primary: false },
      { id: 'p15-img-5', image_url: '/products/retro-telephone-backpack-detail.jpg', alt_text: 'Close up view of telephone receiver and rotary dial with heart', sort_order: 5, is_primary: false },
      { id: 'p15-img-6', image_url: '/products/retro-telephone-backpack-lifestyle.jpg', alt_text: 'Cute toddler backpack lifestyle in park playground', sort_order: 6, is_primary: false }
    ],
    variants: [
      {
        id: 'p15-v1',
        product_id: 'prod-15',
        name: 'Pastel Lavender & Candy Pink',
        sku: 'UE-RT-BP-LAV',
        price: 699,
        compare_at_price: 1199,
        attributes: { color: 'Pastel Lavender & Candy Pink', color_code: '#DDD6FE' },
        color_code: '#DDD6FE',
        image_url: '/products/retro-telephone-backpack-purple.jpg',
        stock: 22,
        is_active: true
      },
      {
        id: 'p15-v2',
        product_id: 'prod-15',
        name: 'Sky Blue & Bubblegum Pink',
        sku: 'UE-RT-BP-SBL',
        price: 699,
        compare_at_price: 1199,
        attributes: { color: 'Sky Blue & Bubblegum Pink', color_code: '#7DD3FC' },
        color_code: '#7DD3FC',
        image_url: '/products/retro-telephone-backpack-blue.jpg',
        stock: 22,
        is_active: true
      }
    ],
    created_at: '2026-03-08T15:00:00Z',
    updated_at: '2026-03-08T15:00:00Z'
  },
  {
    id: 'prod-16',
    name: 'Keep Happy 3-Compartment Ergonomic Kids Backpack with Matching Coin Pouch',
    slug: 'keep-happy-ergonomic-kids-backpack-coin-pouch',
    description: 'The smart choice for organized school mornings: the "Keep Happy" 3-Compartment Ergonomic Kids Backpack solves backpack clutter once and for all. Featuring 3 independent zippered chambers, children can keep their lunch box, homework diary, and pencil case in dedicated compartments without a messy scramble. Includes an adorable matching 3D character clip-on coin pouch (Bunny or Dino) on the front webbing. Weighing just 400g with high-density water-repellent fabric, thick cushioned carry handle, and breathable shoulder straps, it is the ideal daily companion for ages 3 to 7.',
    short_description: '3-compartment organized 12L kids backpack with matching 3D animal coin pouch.',
    sku: 'UE-KH-BP-16',
    price: 749,
    compare_at_price: 1299,
    discount: 42,
    category_id: 'c1',
    category_name: 'Backpacks',
    category_slug: 'backpacks',
    target_audience: 'school',
    brand: 'Urban Essentials',
    tags: ['backpack', 'keep-happy', 'organized', '3-compartment', 'coin-pouch', 'kids-bag', 'preschool', 'bestseller'],
    stock_quantity: 55,
    low_stock_threshold: 10,
    rating: 4.9,
    review_count: 47,
    is_featured: true,
    is_new_arrival: true,
    is_bestseller: true,
    is_active: true,
    features: [
      '3 structured compartments organize books, tiffin, and stationery instead of one messy pocket',
      'Includes detachable 3D character clip-on coin pouch (Cute Bunny or Playful Dinosaur)',
      'Featherlight 400g design with 12L capacity tailored for children aged 3 to 7',
      'Water-repellent high-density fabric shields school supplies during rainy morning commutes',
      'Extra-thick padded arched top carry handle with breathable padded back straps',
      'Dual side stretch mesh pockets for water bottles and umbrellas'
    ],
    specifications: {
      'Dimensions': '32 cm Height x 26 cm Width x 13 cm Depth',
      'Weight': '400 g (Ultra-lightweight)',
      'Capacity': '12 Liters',
      'Compartments': '3 Organized Zippered Sections + 2 Side Bottle Pockets',
      'Material': 'High-Density Water-Repellent Fabric + Soft Silicone Coin Pouch',
      'Recommended Age': 'Ages 3 to 7 Years Old',
      'Included Accessories': 'Detachable 3D Animal Coin Pouch with Clip'
    },
    images: [
      { id: 'p16-img-1', image_url: '/products/keep-happy-backpack-hero.jpg', alt_text: 'Keep Happy Ergonomic Kids Backpack in Sky Blue & Pink', sort_order: 1, is_primary: true },
      { id: 'p16-img-2', image_url: '/products/keep-happy-backpack-features.jpg', alt_text: 'The Smart Choice for School 3 compartments vs 1 messy pocket 12L capacity 400g', sort_order: 2, is_primary: false },
      { id: 'p16-img-3', image_url: '/products/keep-happy-backpack-specs-bunny.jpg', alt_text: 'Ideal Back-to-School Pack for Ages 3-7 Lavender Pink Dimensions 32cm x 26cm', sort_order: 3, is_primary: false },
      { id: 'p16-img-4', image_url: '/products/keep-happy-backpack-specs-dino.jpg', alt_text: 'Adorable Dinosaur Design with Coin Pouch Navy Blue Specifications', sort_order: 4, is_primary: false },
      { id: 'p16-img-5', image_url: '/products/keep-happy-backpack-pink-blue.jpg', alt_text: 'Pastel Sky Blue and Coral Pink with Bunny Pouch', sort_order: 5, is_primary: false },
      { id: 'p16-img-6', image_url: '/products/keep-happy-backpack-purple-pink.jpg', alt_text: 'Pastel Lilac and Blush Pink with Bunny Pouch', sort_order: 6, is_primary: false },
      { id: 'p16-img-7', image_url: '/products/keep-happy-backpack-navy-dino.jpg', alt_text: 'Midnight Navy and Tangerine Green with Dinosaur Pouch', sort_order: 7, is_primary: false },
      { id: 'p16-img-8', image_url: '/products/keep-happy-backpack-lifestyle.jpg', alt_text: 'Little girl walking to school wearing Keep Happy backpack', sort_order: 8, is_primary: false }
    ],
    variants: [
      {
        id: 'p16-v1',
        product_id: 'prod-16',
        name: 'Pastel Sky Blue & Pink (Bunny Pouch)',
        sku: 'UE-KH-BP-SBL',
        price: 749,
        compare_at_price: 1299,
        attributes: { color: 'Pastel Sky Blue & Pink', color_code: '#38BDF8' },
        color_code: '#38BDF8',
        image_url: '/products/keep-happy-backpack-pink-blue.jpg',
        stock: 20,
        is_active: true
      },
      {
        id: 'p16-v2',
        product_id: 'prod-16',
        name: 'Pastel Lilac & Soft Pink (Bunny Pouch)',
        sku: 'UE-KH-BP-LIL',
        price: 749,
        compare_at_price: 1299,
        attributes: { color: 'Pastel Lilac & Soft Pink', color_code: '#C084FC' },
        color_code: '#C084FC',
        image_url: '/products/keep-happy-backpack-purple-pink.jpg',
        stock: 20,
        is_active: true
      },
      {
        id: 'p16-v3',
        product_id: 'prod-16',
        name: 'Midnight Navy & Tangerine (Dino Pouch)',
        sku: 'UE-KH-BP-NVY',
        price: 749,
        compare_at_price: 1299,
        attributes: { color: 'Midnight Navy & Tangerine', color_code: '#1E3A8A' },
        color_code: '#1E3A8A',
        image_url: '/products/keep-happy-backpack-navy-dino.jpg',
        stock: 15,
        is_active: true
      }
    ],
    created_at: '2026-03-08T16:00:00Z',
    updated_at: '2026-03-08T16:00:00Z'
  },
  {
    id: 'prod-17',
    name: '3D "ROAR!" Dinosaur Molded Toddler Hard-Shell Backpack',
    slug: '3d-roar-dinosaur-molded-toddler-backpack',
    description: 'Roar into exciting preschool adventures with the 3D "ROAR!" Dinosaur Molded Toddler Hard-Shell Backpack. Featuring a charming green T-Rex face smiling cheerfully over a wooden "ROAR!" banner, this bag is accented with soft plush 3D dorsal spikes running along the top curve. The protective molded EVA hard front absorbs drops, bumps, and accidental stomps, while keeping snacks, coloring books, and toy cars safe. Features soft padded adjustable shoulder straps and durable smooth metal zippers.',
    short_description: 'Molded 3D green dinosaur toddler backpack with soft plush spikes and durable shell.',
    sku: 'UE-DN-BP-17',
    price: 649,
    compare_at_price: 1099,
    discount: 41,
    category_id: 'c1',
    category_name: 'Backpacks',
    category_slug: 'backpacks',
    target_audience: 'school',
    brand: 'Urban Essentials',
    tags: ['backpack', 'dinosaur', 'dino-roar', 'toddler-bag', 'preschool', 'nursery', 'hardshell'],
    stock_quantity: 36,
    low_stock_threshold: 6,
    rating: 4.8,
    review_count: 27,
    is_featured: false,
    is_new_arrival: true,
    is_bestseller: false,
    is_active: true,
    features: [
      'Adorable 3D embossed "ROAR!" Green T-Rex Dinosaur face with soft plush back spikes',
      'High-strength impact-resistant molded shell keeps packed items safe from drops and tumbles',
      'Spacious single compartment with wide-angle opening for easy toy and snack access',
      'Soft padded adjustable shoulder straps designed for developing toddler shoulders',
      'Smooth-glide premium zipper with kid-friendly pull tab'
    ],
    specifications: {
      'Dimensions': '29 cm Height x 25 cm Width x 11 cm Depth',
      'Weight': '290 g',
      'Capacity': '7.5 Liters',
      'Material': 'Impact-Resistant EVA Molded Shell + Breathable Mesh Webbing',
      'Recommended Age': '2 to 6 Years Old (Playgroup & Nursery)',
      'Spikes Material': 'Soft Plush Fabric Trim'
    },
    images: [
      { id: 'p17-img-1', image_url: '/products/dino-roar-toddler-backpack-hero.jpg', alt_text: '3D ROAR Dinosaur Molded Toddler Hard-Shell Backpack', sort_order: 1, is_primary: true },
      { id: 'p17-img-2', image_url: '/products/dino-roar-toddler-backpack-specs.jpg', alt_text: 'Specifications Dino Series Playful Design Premium Chain Zipper Soft Padded Straps', sort_order: 2, is_primary: false },
      { id: 'p17-img-3', image_url: '/products/dino-roar-toddler-backpack-bench.jpg', alt_text: 'Dino backpack on park bench in bright sunlight', sort_order: 3, is_primary: false },
      { id: 'p17-img-4', image_url: '/products/dino-roar-toddler-backpack-angle.jpg', alt_text: 'Perspective angle showing molded dinosaur face and plush spikes', sort_order: 4, is_primary: false },
      { id: 'p17-img-5', image_url: '/products/dino-roar-toddler-backpack-side.jpg', alt_text: 'Side profile showing depth and soft dorsal spikes', sort_order: 5, is_primary: false },
      { id: 'p17-img-6', image_url: '/products/dino-roar-toddler-backpack-lifestyle.jpg', alt_text: 'Preschool backpack outdoor park lifestyle shot', sort_order: 6, is_primary: false }
    ],
    variants: [
      {
        id: 'p17-v1',
        product_id: 'prod-17',
        name: 'Forest Dino Green & Earth Brown',
        sku: 'UE-DN-BP-GRN',
        price: 649,
        compare_at_price: 1099,
        attributes: { color: 'Forest Dino Green & Earth Brown', color_code: '#22C55E' },
        color_code: '#22C55E',
        image_url: '/products/dino-roar-toddler-backpack-hero.jpg',
        stock: 36,
        is_active: true
      }
    ],
    created_at: '2026-03-08T17:00:00Z',
    updated_at: '2026-03-08T17:00:00Z'
  },
  {
    id: 'prod-18',
    name: 'Premium Retro Mermaid 3D Sequin Kids Backpack',
    slug: 'premium-retro-mermaid-3d-sequin-kids-backpack',
    description: 'Dive under the sea into a world of fairytale wonder with the Premium Retro Mermaid 3D Sequin Kids Backpack. Designed with a molded 3D princess mermaid face sporting violet hair and a golden tiara, the backpack is crowned by a sparkling interactive reversible sequin mermaid tail fin that shimmer in the sun. Lightweight, ergonomic, and built with breathable honeycomb mesh back padding, it offers 8.5L of easy-pack space for kindergarten supplies, swimwear, or weekend sleepovers.',
    short_description: 'Magical 3D mermaid kids backpack with shimmering reversible sequin tail fin.',
    sku: 'UE-MM-BP-18',
    price: 699,
    compare_at_price: 1199,
    discount: 42,
    category_id: 'c1',
    category_name: 'Backpacks',
    category_slug: 'backpacks',
    target_audience: 'school',
    brand: 'Urban Essentials',
    tags: ['backpack', 'mermaid', 'sequin', 'fairytale', 'kids-bag', 'preschool', 'shimmer'],
    stock_quantity: 34,
    low_stock_threshold: 6,
    rating: 4.9,
    review_count: 33,
    is_featured: false,
    is_new_arrival: true,
    is_bestseller: false,
    is_active: true,
    features: [
      'Magical 3D molded mermaid princess front shell with shiny crown and starfish details',
      'Interactive reversible sequin tail fin that sparkles in sunlight',
      '12 x 11 inch compact ergonomic profile ideal for preschool, kindergarten, and playdates',
      'Ventilated honeycomb mesh back padding prevents sweaty backs during active outdoor play',
      'Cushioned adjustable straps with reinforced safety webbing'
    ],
    specifications: {
      'Dimensions': '12 Inch Height x 11 Inch Width x 4.5 Inch Depth (30.5 cm x 28 cm x 11.5 cm)',
      'Weight': '310 g',
      'Capacity': '8.5 Liters',
      'Material': 'Waterproof Molded EVA Shell + Sequin Fabric Tail + Breathable Mesh',
      'Recommended Age': '3 to 7 Years Old',
      'Special Detail': 'Sparkling Reversible Mermaid Sequin Fin'
    },
    images: [
      { id: 'p18-img-1', image_url: '/products/retro-mermaid-sequin-backpack-hero.jpg', alt_text: 'Premium Retro Mermaid 3D Sequin Kids Backpack', sort_order: 1, is_primary: true },
      { id: 'p18-img-2', image_url: '/products/retro-mermaid-sequin-backpack-specs.jpg', alt_text: 'Premium Retro Mermaid Specifications 12 Inch x 11 Inch Dimensions', sort_order: 2, is_primary: false },
      { id: 'p18-img-3', image_url: '/products/retro-mermaid-sequin-backpack-bench.jpg', alt_text: 'Mermaid backpack outdoors on park bench', sort_order: 3, is_primary: false },
      { id: 'p18-img-4', image_url: '/products/retro-mermaid-sequin-backpack-front.jpg', alt_text: 'Front view showing 3D mermaid face and tiara', sort_order: 4, is_primary: false },
      { id: 'p18-img-5', image_url: '/products/retro-mermaid-sequin-backpack-side.jpg', alt_text: 'Side angle showing glittering sequin mermaid tail', sort_order: 5, is_primary: false },
      { id: 'p18-img-6', image_url: '/products/retro-mermaid-sequin-backpack-lifestyle.jpg', alt_text: 'Fairytale mermaid school bag lifestyle view', sort_order: 6, is_primary: false }
    ],
    variants: [
      {
        id: 'p18-v1',
        product_id: 'prod-18',
        name: 'Ocean Lilac Purple & Coral',
        sku: 'UE-MM-BP-PUR',
        price: 699,
        compare_at_price: 1199,
        attributes: { color: 'Ocean Lilac Purple & Coral', color_code: '#A855F7' },
        color_code: '#A855F7',
        image_url: '/products/retro-mermaid-sequin-backpack-hero.jpg',
        stock: 34,
        is_active: true
      }
    ],
    created_at: '2026-03-08T18:00:00Z',
    updated_at: '2026-03-08T18:00:00Z'
  },
  {
    id: 'prod-19',
    name: 'Kunmao Gingham 650ml Cold Brew & Hot Drink Thermal Tumbler with Tea Infuser',
    slug: 'kunmao-gingham-cold-brew-thermal-tumbler-infuser',
    description: 'Sip in style with the Kunmao Gingham 650ml Cold Brew & Hot Drink Thermal Tumbler. Combining Korean aesthetic pastel gingham check sleeves with cutting-edge double-wall thermal insulation, this versatile tumbler keeps cold brew coffee frosty or green tea steaming hot for up to 8 hours. Features an innovative dual drinking mode lid: drink directly from the wide sip spout or use the integrated silicone straw covered by a cute protective fruit charm dust cap. Includes a detachable tea/fruit infuser basket and a non-slip silicone base pad.',
    short_description: 'Pastel gingham insulated tumbler with dual-drinking straw lid, tea infuser, and fruit charm.',
    sku: 'UE-KM-TT-19',
    price: 699,
    compare_at_price: 1199,
    discount: 42,
    category_id: 'c3',
    category_name: 'Water Bottles & Flasks',
    category_slug: 'water-bottles',
    target_audience: 'all',
    brand: 'Kunmao',
    tags: ['tumbler', 'water-bottle', 'cold-brew', 'tea-infuser', 'gingham', 'insulated', 'bestseller'],
    stock_quantity: 48,
    low_stock_threshold: 8,
    rating: 4.9,
    review_count: 41,
    is_featured: true,
    is_new_arrival: true,
    is_bestseller: true,
    is_active: true,
    features: [
      'Retro-chic pastel gingham checkered insulated sleeve with integrated ergonomic side handle',
      'Dual drinking mode lid: Effortlessly switch between built-in reusable straw and direct wide mouth sip',
      'Detachable food-grade tea and fruit infuser strainer for cold brews, detox waters, and loose leaf tea',
      'Hi-tech 360° leakproof sealing gasket guarantees zero spills even when turned upside down in bags',
      'Silicone non-slip cushioned base pad prevents tabletop scuffs and accidental tip-overs',
      'Protective fruit charm silicone dust stopper keeps straw tip sanitized and clean'
    ],
    specifications: {
      'Capacity': '650 ml',
      'Dimensions': '19.5 cm Height x 9.5 cm Diameter',
      'Material': 'SUS304 Food-Grade Stainless Steel Interior + BPA-Free Food Grade Polypropylene',
      'Thermal Retention': '6 - 8 Hours Cold / 4 - 6 Hours Hot',
      'Included Components': 'Tumbler, Gingham Sleeve, Silicone Straw, Fruit Dust Cap, Tea Filter Strainer',
      'Leak Resistance': '100% Leakproof Vacuum Ring Seal'
    },
    images: [
      { id: 'p19-img-1', image_url: '/products/kunmao-gingham-fruit-tumbler-hero.jpg', alt_text: 'Kunmao Gingham Insulated Cold Brew & Hot Tumbler in Car Lifestyle', sort_order: 1, is_primary: true },
      { id: 'p19-img-2', image_url: '/products/kunmao-gingham-fruit-tumbler-features.jpg', alt_text: 'Details Perfectly Handled Straw Seal Cover Tea Strainer and Silicone Bottom Pad', sort_order: 2, is_primary: false },
      { id: 'p19-img-3', image_url: '/products/kunmao-gingham-fruit-tumbler-seal.jpg', alt_text: 'Hi-tech Sealing No Leakage When Inverted and Long-lasting Temperature Locking', sort_order: 3, is_primary: false },
      { id: 'p19-img-4', image_url: '/products/kunmao-gingham-fruit-tumbler-hotcold.jpg', alt_text: 'Cold Brew and Hot Drink on-the-go cup with tea strainer infusion', sort_order: 4, is_primary: false },
      { id: 'p19-img-5', image_url: '/products/kunmao-gingham-fruit-tumbler-yellow.jpg', alt_text: 'Lemon Yellow and Green Gingham Check tumbler with apple charm', sort_order: 5, is_primary: false },
      { id: 'p19-img-6', image_url: '/products/kunmao-gingham-fruit-tumbler-pink.jpg', alt_text: 'Strawberry Pink and Red Gingham Check tumbler variant', sort_order: 6, is_primary: false },
      { id: 'p19-img-7', image_url: '/products/kunmao-gingham-fruit-tumbler-blue.jpg', alt_text: 'Sky Cerulean Blue Gingham Check tumbler variant', sort_order: 7, is_primary: false },
      { id: 'p19-img-8', image_url: '/products/kunmao-gingham-fruit-tumbler-details.jpg', alt_text: 'Ergonomic carry handle and non-slip silicone base pad', sort_order: 8, is_primary: false }
    ],
    variants: [
      {
        id: 'p19-v1',
        product_id: 'prod-19',
        name: 'Lemon Custard & Sage Gingham',
        sku: 'UE-KM-TT-YLW',
        price: 699,
        compare_at_price: 1199,
        attributes: { color: 'Lemon Custard & Sage Gingham', color_code: '#FACC15' },
        color_code: '#FACC15',
        image_url: '/products/kunmao-gingham-fruit-tumbler-yellow.jpg',
        stock: 18,
        is_active: true
      },
      {
        id: 'p19-v2',
        product_id: 'prod-19',
        name: 'Candy Blossom Pink Gingham',
        sku: 'UE-KM-TT-PNK',
        price: 699,
        compare_at_price: 1199,
        attributes: { color: 'Candy Blossom Pink Gingham', color_code: '#F472B6' },
        color_code: '#F472B6',
        image_url: '/products/kunmao-gingham-fruit-tumbler-pink.jpg',
        stock: 15,
        is_active: true
      },
      {
        id: 'p19-v3',
        product_id: 'prod-19',
        name: 'Sky Cerulean Blue Gingham',
        sku: 'UE-KM-TT-BLU',
        price: 699,
        compare_at_price: 1199,
        attributes: { color: 'Sky Cerulean Blue Gingham', color_code: '#38BDF8' },
        color_code: '#38BDF8',
        image_url: '/products/kunmao-gingham-fruit-tumbler-blue.jpg',
        stock: 15,
        is_active: true
      }
    ],
    created_at: '2026-03-08T19:00:00Z',
    updated_at: '2026-03-08T19:00:00Z'
  },
  {
    id: 'prod-20',
    name: 'Ice Cream 1000ml SUS316 Insulated Travel Tumbler Mug with Straw',
    slug: 'ice-cream-1000ml-sus316-insulated-travel-tumbler-mug',
    description: 'Meet your ultimate hydration sidekick: the Ice Cream 1000ml (33.8oz) Insulated Travel Tumbler Mug. Engineered with a premium food-grade SUS316 stainless steel inner base, this heavy-duty thermal mug guarantees pure flavor and total resistance to acidity and oxidation. Vacuum insulation keeps iced water and cold drinks chilly or hot beverages steaming for 6 to 8 hours. Boasts an ergonomic comfort-grip handle, a dust-capped flexible silicone straw, and a tapered silhouette that fits securely into vehicle cup holders.',
    short_description: '1000ml / 33.8oz large capacity SUS316 insulated thermal tumbler mug with straw and handle.',
    sku: 'UE-IC-1000-20',
    price: 899,
    compare_at_price: 1599,
    discount: 44,
    category_id: 'c3',
    category_name: 'Water Bottles & Flasks',
    category_slug: 'water-bottles',
    target_audience: 'all',
    brand: 'Urban Essentials',
    tags: ['tumbler', 'water-bottle', '1000ml', 'sus316', 'straw-mug', 'gym-flask', 'office-mug', 'bestseller'],
    stock_quantity: 50,
    low_stock_threshold: 8,
    rating: 5.0,
    review_count: 54,
    is_featured: true,
    is_new_arrival: true,
    is_bestseller: true,
    is_active: true,
    features: [
      'Extra-large 1000ml (33.8oz) capacity keeps you hydrated through long lectures, office shifts, or gym sessions',
      'Premium medical-grade SUS316 stainless steel inner bottom resists corrosion and ensures pure taste',
      'Advanced double-wall vacuum insulation keeps iced drinks frosty cold or hot coffee steaming for 6 to 8 hours',
      'Ergonomic sturdy contoured side carry handle fits comfortably in all hand sizes',
      'Food-grade flexible silicone straw with attached dust cap prevents lint and dust ingress',
      'Tapered base silhouette fits standard automotive cup holders and gym equipment'
    ],
    specifications: {
      'Capacity': '1000 ml / 33.8 oz',
      'Dimensions': '23 cm Height x 15.4 cm Width (with Handle) x 9.5 cm Base Diameter',
      'Material': 'SUS316 Inner Base + SUS304 Vacuum Core + BPA-Free PP Outer Body',
      'Weight': '460 g',
      'Thermal Performance': '6 - 8 Hours Hot & Cold Retention',
      'Included Accessories': 'Airtight Straw Lid, Silicone Straw, Protective Spout Cap, Side Grip Handle',
      'Car Cup Holder Compatible': 'Yes (Tapered Underbody)'
    },
    images: [
      { id: 'p20-img-1', image_url: '/products/ice-cream-1000ml-tumbler-hero.jpg', alt_text: 'Ice Cream 1000ml Insulated Travel Tumbler in Hot Pink', sort_order: 1, is_primary: true },
      { id: 'p20-img-2', image_url: '/products/ice-cream-1000ml-tumbler-specs.jpg', alt_text: 'Specifications 1000ml 33.8oz Dimensions 23cm x 15.4cm', sort_order: 2, is_primary: false },
      { id: 'p20-img-3', image_url: '/products/ice-cream-1000ml-tumbler-steel.jpg', alt_text: 'SUS316 Stainless Steel Inner Bottom Food-Grade Material', sort_order: 3, is_primary: false },
      { id: 'p20-img-4', image_url: '/products/ice-cream-1000ml-tumbler-lifestyle.jpg', alt_text: 'Keeps Hot and Cold for 6 to 8 Hours School Gym and Office Spread', sort_order: 4, is_primary: false },
      { id: 'p20-img-5', image_url: '/products/ice-cream-1000ml-tumbler-green.jpg', alt_text: 'Matcha Sage Green 1000ml tumbler mug variant', sort_order: 5, is_primary: false },
      { id: 'p20-img-6', image_url: '/products/ice-cream-1000ml-tumbler-cream.jpg', alt_text: 'Vanilla Biscuit Cream 1000ml tumbler mug variant', sort_order: 6, is_primary: false },
      { id: 'p20-img-7', image_url: '/products/ice-cream-1000ml-tumbler-pink.jpg', alt_text: 'Bubblegum Pink 1000ml tumbler with black handle', sort_order: 7, is_primary: false },
      { id: 'p20-img-8', image_url: '/products/ice-cream-1000ml-tumbler-lid-straw.jpg', alt_text: 'Silicone straw with cap and wide mouth lid', sort_order: 8, is_primary: false }
    ],
    variants: [
      {
        id: 'p20-v1',
        product_id: 'prod-20',
        name: 'Bubblegum Hot Pink & Charcoal',
        sku: 'UE-IC-1000-PNK',
        price: 899,
        compare_at_price: 1599,
        attributes: { color: 'Bubblegum Hot Pink & Charcoal', color_code: '#EC4899' },
        color_code: '#EC4899',
        image_url: '/products/ice-cream-1000ml-tumbler-hero.jpg',
        stock: 20,
        is_active: true
      },
      {
        id: 'p20-v2',
        product_id: 'prod-20',
        name: 'Matcha Sage Green & Cream',
        sku: 'UE-IC-1000-GRN',
        price: 899,
        compare_at_price: 1599,
        attributes: { color: 'Matcha Sage Green & Cream', color_code: '#86EFAC' },
        color_code: '#86EFAC',
        image_url: '/products/ice-cream-1000ml-tumbler-green.jpg',
        stock: 15,
        is_active: true
      },
      {
        id: 'p20-v3',
        product_id: 'prod-20',
        name: 'Vanilla Biscuit Cream & Oat',
        sku: 'UE-IC-1000-CRM',
        price: 899,
        compare_at_price: 1599,
        attributes: { color: 'Vanilla Biscuit Cream & Oat', color_code: '#F5F5F4' },
        color_code: '#F5F5F4',
        image_url: '/products/ice-cream-1000ml-tumbler-cream.jpg',
        stock: 15,
        is_active: true
      }
    ],
    created_at: '2026-03-08T20:00:00Z',
    updated_at: '2026-03-08T20:00:00Z'
  },
  {
    id: 'prod-21',
    name: 'TEDEMEI 1.6L Dual-Layer Stackable Stainless Steel Tiffin Lunch Box',
    slug: 'tedemei-1-6l-dual-layer-stackable-tiffin-lunch-box',
    description: 'Elevate your daily lunchtime with the TEDEMEI 1.6L Dual-Layer Stackable Stainless Steel Tiffin Lunch Box. Engineered with two generously sized SUS304 food-grade stainless steel bowls, this modern tiffin keeps gravies, rice, chapatis, and sides separated in completely leakproof modular compartments. Equipped with robust side snap latches, airtight silicone sealing gaskets, and an arched fold-flat top carry handle, it offers the perfect balance of generous capacity and compact portability for office workers, college students, and school children.',
    short_description: 'Dual-tier 1600ml SUS304 stainless steel leakproof stackable lunch box with folding handle.',
    sku: 'UE-TD-DL2-21',
    price: 849,
    compare_at_price: 1399,
    discount: 39,
    category_id: 'c2',
    category_name: 'Lunch Boxes',
    category_slug: 'lunch-boxes',
    target_audience: 'all',
    brand: 'TEDEMEI',
    tags: ['lunch-box', 'tiffin', 'tedemei', 'dual-layer', 'stackable', 'stainless-steel', 'leakproof', 'bestseller'],
    stock_quantity: 42,
    low_stock_threshold: 8,
    rating: 4.8,
    review_count: 35,
    is_featured: true,
    is_new_arrival: true,
    is_bestseller: false,
    is_active: true,
    features: [
      'Generous 1.6-liter dual-tier capacity allows complete meal packing with rotis, rice, dals, and curries',
      'High-grade food-safe SUS304 stainless steel interior liners keep food flavors unadulterated and fresh',
      'Dual independent side-locking snap clips with silicone sealing rings prevent messy gravy spills',
      'Modular interlocking design: Use as a single 1-tier box or dual 2-tier set depending on meal size',
      'Integrated fold-down top carrying handle collapses flush into lid for space-saving bag storage',
      'BPA-free insulating thermal outer jacket prevents hands from scalding when holding hot food'
    ],
    specifications: {
      'Capacity': '1.6 Liters (1600 ml Across 2 Tiers)',
      'Dimensions': '17 cm Height x 14.3 cm Diameter (143 mm x 170 mm)',
      'Material': 'SUS304 Food-Grade Stainless Steel + Thermal Polypropylene Housing',
      'Weight': '580 g',
      'Thermal Insulation': 'Double Wall Insulated (Keeps warm 3 - 5 Hours)',
      'Locking Mechanism': 'Heavy-Duty Dual Side Clasp Latches with Silicone Airtight Ring',
      'Handle Type': 'Arched Fold-Flat Carry Handle'
    },
    images: [
      { id: 'p21-img-1', image_url: '/products/tedemei-dual-layer-1600ml-hero.jpg', alt_text: 'TEDEMEI 1.6L Dual Layer Stackable Tiffin Lunch Box in 3 Colors', sort_order: 1, is_primary: true },
      { id: 'p21-img-2', image_url: '/products/tedemei-dual-layer-1600ml-blue-specs.jpg', alt_text: 'Blue Medium Dual Layer 1.6L Dimensions 143x170mm', sort_order: 2, is_primary: false },
      { id: 'p21-img-3', image_url: '/products/tedemei-dual-layer-1600ml-green-specs.jpg', alt_text: 'Green Medium Dual Layer 1.6L Tiffin Lunch Box', sort_order: 3, is_primary: false },
      { id: 'p21-img-4', image_url: '/products/tedemei-dual-layer-1600ml-pink-specs.jpg', alt_text: 'Pink Medium Dual Layer 1.6L Tiffin Lunch Box', sort_order: 4, is_primary: false },
      { id: 'p21-img-5', image_url: '/products/tedemei-dual-layer-1600ml-exploded.jpg', alt_text: 'Disassembled view showing 2 stainless steel containers and sealed lid', sort_order: 5, is_primary: false },
      { id: 'p21-img-6', image_url: '/products/tedemei-dual-layer-1600ml-details.jpg', alt_text: 'Side locking clips and airtight silicone seal', sort_order: 6, is_primary: false }
    ],
    variants: [
      {
        id: 'p21-v1',
        product_id: 'prod-21',
        name: 'Ocean Deep Blue',
        sku: 'UE-TD-DL2-BLU',
        price: 849,
        compare_at_price: 1399,
        attributes: { color: 'Ocean Deep Blue', color_code: '#0284C7' },
        color_code: '#0284C7',
        image_url: '/products/tedemei-dual-layer-1600ml-blue-specs.jpg',
        stock: 15,
        is_active: true
      },
      {
        id: 'p21-v2',
        product_id: 'prod-21',
        name: 'Botanical Sage Green',
        sku: 'UE-TD-DL2-GRN',
        price: 849,
        compare_at_price: 1399,
        attributes: { color: 'Botanical Sage Green', color_code: '#10B981' },
        color_code: '#10B981',
        image_url: '/products/tedemei-dual-layer-1600ml-green-specs.jpg',
        stock: 15,
        is_active: true
      },
      {
        id: 'p21-v3',
        product_id: 'prod-21',
        name: 'Pastel Coral Blossom Pink',
        sku: 'UE-TD-DL2-PNK',
        price: 849,
        compare_at_price: 1399,
        attributes: { color: 'Pastel Coral Blossom Pink', color_code: '#F43F5E' },
        color_code: '#F43F5E',
        image_url: '/products/tedemei-dual-layer-1600ml-pink-specs.jpg',
        stock: 12,
        is_active: true
      }
    ],
    created_at: '2026-03-08T21:00:00Z',
    updated_at: '2026-03-08T21:00:00Z'
  }
];

export const REVIEWS_DATA: Record<string, Review[]> = {
  'prod-01': [
    {
      id: 'rev-01-1',
      product_id: 'prod-01',
      author_name: 'Priya Sharma',
      rating: 5,
      title: 'Best lunch box I have ever bought!',
      comment: 'The quality of the 304 stainless steel is outstanding. My dal and sabzi stayed completely warm from 8 AM till 1 PM lunch break. Absolutely zero leakage in my work backpack.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-01T14:20:00Z'
    },
    {
      id: 'rev-01-2',
      product_id: 'prod-01',
      author_name: 'Ankit Verma',
      rating: 5,
      title: 'Looks premium and keeps food separated',
      comment: 'I love that both tiers are completely separate. The handle is strong and the silicone steam vent makes it super easy to open even with hot steaming food.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-03T18:15:00Z'
    }
  ],
  'prod-02': [
    {
      id: 'rev-02-1',
      product_id: 'prod-02',
      author_name: 'Sneha Patel',
      rating: 5,
      title: 'Perfect bento for wholesome lunches',
      comment: 'The 5 compartments allow me to pack salad, chapati, veggies, dry fruits, and chutney in the center dip bowl. The hot water warming tray is pure genius!',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-02T12:00:00Z'
    },
    {
      id: 'rev-02-2',
      product_id: 'prod-02',
      author_name: 'Rahul Joshi',
      rating: 5,
      title: 'Sturdy buckles and heavy steel',
      comment: 'Top-notch build. Does not feel cheap at all. The latches click tightly and my son carries it to school without any mess.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-04T16:40:00Z'
    }
  ],
  'prod-03': [
    {
      id: 'rev-03-1',
      product_id: 'prod-03',
      author_name: 'Rohan Mehta',
      rating: 5,
      title: 'No more flimsy plastic canteen spoons',
      comment: 'Fits right inside my laptop bag. Screws together securely and feels solid in hand. Having chopsticks and fork in one tiny capsule is super convenient.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-03T09:30:00Z'
    }
  ],
  'prod-04': [
    {
      id: 'rev-04-1',
      product_id: 'prod-04',
      author_name: 'Kavita Iyer',
      rating: 5,
      title: 'The separate soup cup is a lifesaver!',
      comment: 'Packing rasam and sambar was always risky until this box. The screw-on soup bowl has zero leaks, and the 4 grids hold a complete South Indian thali.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-04T13:10:00Z'
    }
  ],
  'prod-05': [
    {
      id: 'rev-05-1',
      product_id: 'prod-05',
      author_name: 'Dr. Vikram Rao',
      rating: 5,
      title: 'Excellent heat retention for long hospital shifts',
      comment: 'Keeps broth hot for hours. The folding spoon tucked right under the lid means I never forget cutlery. Highly recommended for busy doctors and commuters.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-05T11:00:00Z'
    }
  ],
  'prod-06': [
    {
      id: 'rev-06-1',
      product_id: 'prod-06',
      author_name: 'Deepika Nair',
      rating: 5,
      title: 'Ideal size for school bags',
      comment: 'Not overly bulky, yet holds full lunch for my 8-year-old daughter. The top fork holder is very thoughtful. High quality steel inside.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-04T17:25:00Z'
    }
  ],
  'prod-07': [
    {
      id: 'rev-07-1',
      product_id: 'prod-07',
      author_name: 'Manish Gupta',
      rating: 5,
      title: 'My daily oatmeal & soup mug',
      comment: 'Mirror finish inside cleans with a simple rinse. Keeps oats hot throughout the commute. The silicone loop makes it so easy to carry with keys and phone.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-05T08:45:00Z'
    }
  ],
  'prod-08': [
    {
      id: 'rev-08-1',
      product_id: 'prod-08',
      author_name: 'Siddharth Sen',
      rating: 5,
      title: 'Like a mini tiffin carrier from the future',
      comment: 'I take rice in bottom, chicken curry in middle, and steamed veggies in top tier. Everything stays warm, smells delicious, and never leaks. 10/10 design.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-05T15:20:00Z'
    }
  ],
  'prod-09': [
    {
      id: 'rev-09-1',
      product_id: 'prod-09',
      author_name: 'Megha Reddy',
      rating: 5,
      title: 'My kid loves customizing the charms!',
      comment: 'The EVA hardshell is so light and easy to wipe clean after rainy school days. The charms stay locked in and the padded back panel is gentle on his shoulders.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-06T10:15:00Z'
    }
  ]
,
  'prod-10': [
    {
      id: 'rev-10-1',
      product_id: 'prod-10',
      author_name: 'Rajesh Kulkarni',
      rating: 5,
      title: 'Amazing 3-in-1 set! My son was thrilled',
      comment: 'The quality of the bag, lunch pouch, and hard-shell pencil box blew us away. The 3D Batman face is thick and rigid. Very spacious 4 compartments.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-10T11:20:00Z'
    },
    {
      id: 'rev-10-2',
      product_id: 'prod-10',
      author_name: 'Pooja Agarwal',
      rating: 5,
      title: 'Worth every single rupee',
      comment: 'Getting a full matching combo of backpack, lunch bag, and pencil case at this price is unmatched. Padded straps take weight off his shoulders.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-11T16:45:00Z'
    }
  ],
  'prod-11': [
    {
      id: 'rev-11-1',
      product_id: 'prod-11',
      author_name: 'Amitabh Sen',
      rating: 5,
      title: 'Best Spider-Man bag we have found',
      comment: 'The 3D embossed web-slinger armor on the front is superb quality. The matching insulated lunch pouch easily fits inside the main compartment or carries by hand.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-10T14:10:00Z'
    }
  ],
  'prod-12': [
    {
      id: 'rev-12-1',
      product_id: 'prod-12',
      author_name: 'Varun Nair',
      rating: 5,
      title: 'Every football crazy kid\'s dream bag',
      comment: 'The golden soccer cleat and hexagonal ball texture look premium. 4 compartments hold all school textbooks and football training kit without tearing.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-11T09:30:00Z'
    }
  ],
  'prod-13': [
    {
      id: 'rev-13-1',
      product_id: 'prod-13',
      author_name: 'Shweta Deshmukh',
      rating: 5,
      title: 'Adorable astronaut bag for nursery',
      comment: 'The 3D silicone astronaut rocket and space pocket are adorable! Soft carry handle and featherlight weight make it easy for my 4-year-old.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-11T12:00:00Z'
    }
  ],
  'prod-14': [
    {
      id: 'rev-14-1',
      product_id: 'prod-14',
      author_name: 'Kavita Chawla',
      rating: 5,
      title: 'So cute! High quality Kuromi backpack',
      comment: 'The pastel lilac color and rainbow arc pocket look even better in real life. The 3D Kuromi head and star charm are sturdy and beautifully made.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-11T15:20:00Z'
    }
  ],
  'prod-15': [
    {
      id: 'rev-15-1',
      product_id: 'prod-15',
      author_name: 'Meenakshi Sundaram',
      rating: 5,
      title: 'The rotary phone dial is so nostalgic and fun',
      comment: 'My toddler plays with the heart rotary dial constantly! The EVA hard shell protects everything inside and wipes clean easily.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-12T10:15:00Z'
    }
  ],
  'prod-16': [
    {
      id: 'rev-16-1',
      product_id: 'prod-16',
      author_name: 'Gaurav Bhatia',
      rating: 5,
      title: '3 compartments keep everything organized',
      comment: 'No more lost pencils or squished lunch boxes! Having 3 separate chambers makes a huge difference. Plus the clip-on bunny pouch is adorable.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-12T13:40:00Z'
    }
  ],
  'prod-17': [
    {
      id: 'rev-17-1',
      product_id: 'prod-17',
      author_name: 'Tanvi Khanna',
      rating: 5,
      title: 'My son loves his ROAR dinosaur bag!',
      comment: 'The plush spikes along the top and the bright green dinosaur face make this so special. Very sturdy hard shell front for toddler play.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-12T17:10:00Z'
    }
  ],
  'prod-18': [
    {
      id: 'rev-18-1',
      product_id: 'prod-18',
      author_name: 'Ananya Roy',
      rating: 5,
      title: 'Sparkling sequin tail is magical',
      comment: 'The reversible mermaid sequins keep my daughter captivated on our drives. Very lightweight, well padded, and perfectly proportioned for preschool.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-13T11:05:00Z'
    }
  ],
  'prod-19': [
    {
      id: 'rev-19-1',
      product_id: 'prod-19',
      author_name: 'Divya Nambiar',
      rating: 5,
      title: 'Aesthetic tumbler and completely leakproof',
      comment: 'The gingham pattern sleeve is gorgeous and gives great grip. The tea infuser makes iced detox green tea super easy, and not a single drop leaks in my tote bag!',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-13T14:30:00Z'
    }
  ],
  'prod-20': [
    {
      id: 'rev-20-1',
      product_id: 'prod-20',
      author_name: 'Karan Malhotra',
      rating: 5,
      title: 'Huge 1000ml capacity and 316 steel interior',
      comment: 'Having 316 stainless steel at the bottom ensures zero metallic aftertaste. Ice cubes stay frozen all day at my desk, and it fits right into my car cup holder.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-14T09:45:00Z'
    }
  ],
  'prod-21': [
    {
      id: 'rev-21-1',
      product_id: 'prod-21',
      author_name: 'Sunita Pillai',
      rating: 5,
      title: 'Ideal 2-tier tiffin for hearty meals',
      comment: '1.6L is plenty of capacity for office lunch. Stainless steel interior doesn\'t stain from turmeric curry, and the side locks seal tightly with zero gravy spills.',
      status: 'approved',
      verified_purchase: true,
      created_at: '2026-03-14T15:20:00Z'
    }
  ]
};

export const COUPONS_DATA: Coupon[] = [
  {
    id: 'c-welcome10',
    code: 'WELCOME10',
    description: '10% off on your first order (Min order ₹499)',
    discount_type: 'percentage',
    discount_value: 10,
    min_order_value: 499,
    max_discount: 300,
    start_date: '2026-01-01T00:00:00Z',
    expiry_date: '2026-12-31T23:59:59Z',
    usage_limit: 10000,
    used_count: 0,
    per_user_limit: 1,
    is_active: true,
  },
  {
    id: 'c-campus15',
    code: 'CAMPUS15',
    description: '15% off for college & campus essentials (Min order ₹999)',
    discount_type: 'percentage',
    discount_value: 15,
    min_order_value: 999,
    max_discount: 500,
    start_date: '2026-01-01T00:00:00Z',
    expiry_date: '2026-12-31T23:59:59Z',
    usage_limit: 5000,
    used_count: 0,
    per_user_limit: 2,
    is_active: true,
  },
  {
    id: 'c-school20',
    code: 'SCHOOL20',
    description: '20% off for school lunch & bags bundle (Min order ₹1,499)',
    discount_type: 'percentage',
    discount_value: 20,
    min_order_value: 1499,
    max_discount: 600,
    start_date: '2026-01-01T00:00:00Z',
    expiry_date: '2026-12-31T23:59:59Z',
    usage_limit: 3000,
    used_count: 0,
    per_user_limit: 2,
    is_active: true,
  },
  {
    id: 'c-office10',
    code: 'OFFICE10',
    description: '10% off for work & office accessories (Min order ₹799)',
    discount_type: 'percentage',
    discount_value: 10,
    min_order_value: 799,
    max_discount: 400,
    start_date: '2026-01-01T00:00:00Z',
    expiry_date: '2026-12-31T23:59:59Z',
    usage_limit: 5000,
    used_count: 0,
    per_user_limit: 2,
    is_active: true,
  },
  {
    id: 'c-kura20',
    code: 'URBAN20',
    description: 'Flat 20% off on orders above ₹1,500 (Max savings ₹600)',
    discount_type: 'percentage',
    discount_value: 20,
    min_order_value: 1500,
    max_discount: 600,
    start_date: '2026-01-01T00:00:00Z',
    expiry_date: '2026-12-31T23:59:59Z',
    usage_limit: 2000,
    used_count: 0,
    per_user_limit: 1,
    is_active: true,
  },
  {
    id: 'c-flat250',
    code: 'FLAT250',
    description: 'Flat ₹250 instant discount on orders above ₹1,299',
    discount_type: 'fixed',
    discount_value: 250,
    min_order_value: 1299,
    max_discount: 250,
    start_date: '2026-01-01T00:00:00Z',
    expiry_date: '2026-12-31T23:59:59Z',
    usage_limit: 1000,
    used_count: 0,
    per_user_limit: 1,
    is_active: true,
  },
];

function getCatalogSource(): Product[] {
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('urban_custom_catalog_v12');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
  }
  return PRODUCTS;
}

// Helper Query Functions
export function getCategories(): Category[] {
  return CATEGORIES.filter((c) => c.is_active);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug && c.is_active);
}

export function getProducts(): Product[] {
  return getCatalogSource().filter((p) => p.is_active);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getCatalogSource().find((p) => p.slug === slug && p.is_active);
}

export function getProductById(id: string): Product | undefined {
  return getCatalogSource().find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return getCatalogSource().filter((p) => p.is_featured && p.is_active);
}

export function getBestsellers(): Product[] {
  return getCatalogSource().filter((p) => p.is_bestseller && p.is_active);
}

export function getNewArrivals(): Product[] {
  return getCatalogSource().filter((p) => p.is_new_arrival && p.is_active);
}

export function getProductsByAudience(audience: TargetAudience): Product[] {
  const all = getProducts();
  if (audience === 'all') return all;
  return all.filter(
    (p) => (p.target_audience === audience || p.target_audience === 'all') && p.is_active
  );
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getCatalogSource().filter((p) => p.category_slug === categorySlug && p.is_active);
}

export function getProductReviews(productId: string): Review[] {
  return REVIEWS_DATA[productId] || [];
}

export function validateCoupon(
  code: string,
  subtotal: number,
  userId?: string
): { valid: boolean; coupon?: Coupon; error?: string; discountAmount: number } {
  const coupon = COUPONS_DATA.find((c) => c.code.toUpperCase() === code.toUpperCase().trim());
  if (!coupon) {
    return { valid: false, error: 'Invalid coupon code', discountAmount: 0 };
  }
  if (!coupon.is_active) {
    return { valid: false, error: 'This coupon has expired or is inactive', discountAmount: 0 };
  }
  const now = new Date();
  if (coupon.start_date && new Date(coupon.start_date) > now) {
    return { valid: false, error: 'Coupon is not yet active', discountAmount: 0 };
  }
  if (coupon.expiry_date && new Date(coupon.expiry_date) < now) {
    return { valid: false, error: 'Coupon has expired', discountAmount: 0 };
  }
  if (coupon.min_order_value && subtotal < coupon.min_order_value) {
    return {
      valid: false,
      error: `Minimum order value of ₹${coupon.min_order_value} required for this coupon`,
      discountAmount: 0,
    };
  }
  if (coupon.usage_limit && coupon.used_count && coupon.used_count >= coupon.usage_limit) {
    return { valid: false, error: 'Coupon usage limit exceeded', discountAmount: 0 };
  }
  let discountAmount = 0;
  if (coupon.discount_type === 'percentage') {
    discountAmount = Math.round((subtotal * coupon.discount_value) / 100);
    if (coupon.max_discount && discountAmount > coupon.max_discount) {
      discountAmount = coupon.max_discount;
    }
  } else {
    discountAmount = coupon.discount_value;
  }
  discountAmount = Math.min(discountAmount, subtotal);
  return { valid: true, coupon, discountAmount };
}

export function calculateCartTotals(
  items: Array<{ price: number; quantity: number }>,
  coupon?: Coupon
): {
  subtotal: number;
  discountAmount: number;
  shipping: number;
  tax: number;
  total: number;
} {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discountAmount = 0;
  if (coupon) {
    const res = validateCoupon(coupon.code, subtotal);
    if (res.valid) {
      discountAmount = res.discountAmount;
    }
  }
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const shipping = discountedSubtotal >= 799 || subtotal === 0 ? 0 : 79;
  const tax = Math.round(discountedSubtotal * 0.18);
  const total = discountedSubtotal + shipping + tax;
  return { subtotal, discountAmount, shipping, tax, total };
}

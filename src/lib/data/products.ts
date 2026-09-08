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
      { id: 'p9-img-3', image_url: '/products/koool-backpack-top.jpg', alt_text: 'Comfortable top carry handle and zipper pullers', sort_order: 3, is_primary: false },
      { id: 'p9-img-4', image_url: '/products/koool-backpack-straps.jpg', alt_text: 'Breathable honeycomb padded mesh shoulder straps and chest buckle', sort_order: 4, is_primary: false },
      { id: 'p9-img-5', image_url: '/products/koool-backpack-side.jpg', alt_text: 'Side profile showing depth and structure', sort_order: 5, is_primary: false },
      { id: 'p9-img-6', image_url: '/products/koool-backpack-gift-box.jpg', alt_text: 'KOOOL Animal Backpack gift box packaging with DIY 3D animal charms', sort_order: 6, is_primary: false }
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
      const raw = localStorage.getItem('urban_custom_catalog_v11');
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

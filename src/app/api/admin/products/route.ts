import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Product } from "@/types";
import { PRODUCTS, CATEGORIES } from "@/lib/data/products";
import { checkRateLimit, rateLimitResponse } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

let serverProductsStore: Product[] = [];

export async function GET(req: NextRequest) {
  const rateLimit = checkRateLimit(req, {
    limit: 120,
    windowMs: 60 * 1000,
    prefix: "admin-products-get",
  });

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit);
  }

  try {
    const supabase = createAdminClient();
    const { data: dbProducts, error } = await supabase
      .from("products")
      .select(`
        *,
        product_images(*),
        product_variants(*),
        inventory(stock_quantity)
      `)
      .order("created_at", { ascending: false });

    if (error || !dbProducts || dbProducts.length === 0) {
      return NextResponse.json({ products: serverProductsStore });
    }


    const formatted: Product[] = dbProducts.map((p: any) => {
      const stock = p.inventory && p.inventory.length > 0 ? p.inventory[0].stock_quantity : 25;
      const images = p.product_images && p.product_images.length > 0
        ? p.product_images.map((img: any) => ({
            id: img.id,
            image_url: img.image_url,
            alt_text: img.alt_text || p.name,
            sort_order: img.sort_order || 1,
            is_primary: img.is_primary || false,
          }))
        : [{ id: "img-" + p.id, image_url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80", sort_order: 1, is_primary: true }];

      const matchedCat = CATEGORIES.find((c) => p.tags && p.tags.includes(c.slug)) || CATEGORIES[0];

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        short_description: p.short_description,
        sku: p.sku,
        price: Number(p.price),
        compare_at_price: p.compare_at_price ? Number(p.compare_at_price) : undefined,
        discount: p.discount ? Number(p.discount) : undefined,
        category_id: p.category_id || matchedCat.id,
        category_name: p.category_name || matchedCat.name,
        category_slug: p.category_slug || matchedCat.slug,
        target_audience: p.target_audience || "all",
        brand: p.brand || "Urban Essentials",
        tags: p.tags || [],
        stock_quantity: stock,
        rating: Number(p.rating || 5.0),
        review_count: Number(p.review_count || 0),
        is_featured: Boolean(p.is_featured),
        is_new_arrival: Boolean(p.is_new_arrival),
        is_bestseller: Boolean(p.is_bestseller),
        is_active: Boolean(p.is_active),
        features: p.features || [],
        specifications: p.specifications || {},
        images,
        variants: p.product_variants && p.product_variants.length > 0
          ? p.product_variants.map((v: any) => ({
              id: v.id,
              product_id: v.product_id,
              name: v.name,
              sku: v.sku,
              price: Number(v.price),
              compare_at_price: v.compare_at_price ? Number(v.compare_at_price) : undefined,
              attributes: v.attributes || {},
              color_code: v.color_code || v.attributes?.color_code,
              image_url: v.image_url || v.attributes?.image_url,
              stock: v.stock || v.attributes?.stock || 20,
              is_active: v.is_active ?? true,
            }))
          : undefined,
        created_at: p.created_at,
        updated_at: p.updated_at,
      };
    });

    return NextResponse.json({ products: formatted });
  } catch (err: any) {
    return NextResponse.json({ products: serverProductsStore, error: err.message });
  }
}

export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(req, {
    limit: 60,
    windowMs: 60 * 1000,
    prefix: "admin-products-post",
  });

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit);
  }

  try {
    const product: Product = await req.json();

    if (!product.name || !product.sku) {
      return NextResponse.json({ error: "Product name and SKU are required" }, { status: 400 });
    }

    const supabase = createAdminClient();

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(product.id);
    const dbId = isUuid ? product.id : crypto.randomUUID();

    const { error: prodError } = await supabase.from("products").upsert({
      id: dbId,
      name: product.name,
      slug: product.slug,
      description: product.description || (product.name + " crafted for everyday utility."),
      short_description: product.short_description || (product.name + " - premium build quality."),
      sku: product.sku.toUpperCase(),
      price: product.price,
      compare_at_price: product.compare_at_price || null,
      discount: product.compare_at_price && product.compare_at_price > product.price
        ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
        : 0,
      target_audience: product.target_audience || "all",
      brand: product.brand || "Urban Essentials",
      tags: product.tags || [],
      rating: product.rating || 5.0,
      review_count: product.review_count || 0,
      is_featured: product.is_featured ?? true,
      is_new_arrival: product.is_new_arrival ?? true,
      is_bestseller: product.is_bestseller ?? false,
      is_active: product.is_active ?? true,
      features: product.features || [],
      specifications: product.specifications || {},
      created_at: product.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    serverProductsStore = [{ ...product, id: dbId }, ...serverProductsStore.filter(p => p.id !== dbId && p.sku !== product.sku)];

    if (prodError) {
      console.warn("DB notice (operating in local fallback):", prodError.message);
      return NextResponse.json({ success: true, product: { ...product, id: dbId } });
    }

    if (product.images && product.images.length > 0) {
      const imageRows = product.images.map((img, idx) => ({
        product_id: dbId,
        image_url: img.image_url,
        alt_text: img.alt_text || product.name,
        sort_order: img.sort_order || idx + 1,
        is_primary: idx === 0,
      }));
      await supabase.from("product_images").upsert(imageRows);
    }

    if (product.variants && product.variants.length > 0) {
      const variantRows = product.variants.map((v) => ({
        id: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v.id) ? v.id : crypto.randomUUID(),
        product_id: dbId,
        name: v.name,
        sku: v.sku,
        price: v.price,
        compare_at_price: v.compare_at_price || null,
        attributes: {
          ...v.attributes,
          color: v.name,
          color_code: v.color_code || v.attributes?.color_code,
          image_url: v.image_url,
          stock: v.stock,
        },
        is_active: v.is_active ?? true,
      }));
      await supabase.from("product_variants").upsert(variantRows);
    }

    await supabase.from("inventory").upsert({
      product_id: dbId,
      stock_quantity: product.stock_quantity ?? 50,
    });

    return NextResponse.json({ success: true, product: { ...product, id: dbId } });
  } catch (err: any) {
    console.error("Server error creating product:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
  try {
    const product: Product = await req.json();
    if (!product.id) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    const supabase = createAdminClient();

    serverProductsStore = serverProductsStore.map((p) => (p.id === product.id ? { ...p, ...product } : p));

    await supabase.from("products").update({
      name: product.name,
      slug: product.slug,
      description: product.description,
      short_description: product.short_description,
      sku: product.sku.toUpperCase(),
      price: product.price,
      compare_at_price: product.compare_at_price || null,
      target_audience: product.target_audience || "all",
      brand: product.brand || "Urban Essentials",
      tags: product.tags || [],
      is_featured: product.is_featured,
      is_new_arrival: product.is_new_arrival,
      is_bestseller: product.is_bestseller,
      is_active: product.is_active,
      updated_at: new Date().toISOString(),
    }).eq("id", product.id);

    if (product.variants && product.variants.length > 0) {
      const variantRows = product.variants.map((v) => ({
        id: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v.id) ? v.id : crypto.randomUUID(),
        product_id: product.id,
        name: v.name,
        sku: v.sku,
        price: v.price,
        compare_at_price: v.compare_at_price || null,
        attributes: {
          ...v.attributes,
          color: v.name,
          color_code: v.color_code || v.attributes?.color_code,
          image_url: v.image_url,
          stock: v.stock,
        },
        is_active: v.is_active ?? true,
      }));
      await supabase.from("product_variants").upsert(variantRows);
    }

    if (product.stock_quantity !== undefined) {
      await supabase.from("inventory").upsert({
        product_id: product.id,
        stock_quantity: product.stock_quantity,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const rateLimit = checkRateLimit(req, {
    limit: 60,
    windowMs: 60 * 1000,
    prefix: "admin-products-delete",
  });

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit);
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const all = searchParams.get("all");

    if (all === "true") {
      serverProductsStore = [];
      try {
        const supabase = createAdminClient();
        await supabase.from("inventory").delete().not("id", "is", null);
        await supabase.from("product_images").delete().not("id", "is", null);
        await supabase.from("product_variants").delete().not("id", "is", null);
        await supabase.from("product_categories").delete().not("product_id", "is", null);
        await supabase.from("reviews").delete().not("id", "is", null);
        await supabase.from("products").delete().not("id", "is", null);
      } catch (e: any) {
        console.warn("DB wipe notice:", e.message);
      }
      return NextResponse.json({ success: true, message: "All products deleted" });
    }

    if (!id) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    serverProductsStore = serverProductsStore.filter((p) => p.id !== id);

    try {
      const supabase = createAdminClient();
      await supabase.from("products").delete().eq("id", id);
    } catch (e: any) {
      console.warn("DB delete notice:", e.message);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

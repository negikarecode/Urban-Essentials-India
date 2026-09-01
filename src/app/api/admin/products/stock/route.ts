import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(req, {
    limit: 60,
    windowMs: 60 * 1000,
    prefix: 'admin-stock-post',
  });

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit);
  }

  try {
    const { id, stock, low_stock_threshold } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }

    const supabase = createAdminClient();
    const updateData: any = { product_id: id };
    if (stock !== undefined) {
      updateData.stock_quantity = Math.max(0, Number(stock));
    }
    if (low_stock_threshold !== undefined) {
      updateData.low_stock_threshold = Math.max(0, Number(low_stock_threshold));
    }

    await supabase.from('inventory').upsert(updateData);

    return NextResponse.json({ success: true, id, stock, low_stock_threshold });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

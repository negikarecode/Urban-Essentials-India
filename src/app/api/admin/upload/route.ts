import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkRateLimit, rateLimitResponse } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const rateLimit = checkRateLimit(req, {
      limit: 20,
      windowMs: 5 * 60 * 1000, // 5 minutes
      prefix: "admin-upload",
    });

    if (!rateLimit.allowed) {
      return rateLimitResponse(
        rateLimit,
        `Upload limit exceeded. Please wait ${rateLimit.retryAfterSeconds} seconds before uploading more files.`
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const productId = (formData.get("productId") as string) || "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFileName = `${Date.now()}_${cleanName}`;

    // 1. Save directly to public/uploads directory
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    const localFilePath = path.join(uploadsDir, uniqueFileName);

    try {
      await writeFile(localFilePath, buffer);
      const localPublicUrl = `/uploads/${uniqueFileName}`;

      // 2. Also attempt non-blocking sync with Supabase storage if available
      try {
        const supabase = createAdminClient();
        await supabase.storage
          .from("product-images")
          .upload(`${productId}/${uniqueFileName}`, buffer, {
            contentType: file.type,
            upsert: true,
          });
      } catch {
        // Local public storage remains valid primary source
      }

      return NextResponse.json({
        success: true,
        url: localPublicUrl,
        filename: uniqueFileName,
      });
    } catch (fsErr: any) {
      console.error("Local disk upload notice:", fsErr);

      // Convert to base64 data URL fallback
      const base64 = buffer.toString("base64");
      const dataUrl = `data:${file.type || "image/jpeg"};base64,${base64}`;

      return NextResponse.json({
        success: true,
        url: dataUrl,
        filename: uniqueFileName,
      });
    }
  } catch (err: any) {
    console.error("Upload API error:", err);
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { verifyAdminOtpCode } from "@/lib/adminAuth";
import { checkRateLimit, rateLimitResponse } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const rateLimit = checkRateLimit(req, {
      limit: 5,
      windowMs: 5 * 60 * 1000, // 5 minutes
      prefix: "admin-verify-otp",
    });

    if (!rateLimit.allowed) {
      return rateLimitResponse(
        rateLimit,
        `Too many verification attempts. Please wait ${rateLimit.retryAfterSeconds} seconds before trying again.`
      );
    }

    const { email, otp } = await req.json();

    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanOtp = (otp || "").trim();

    if (!cleanOtp || cleanOtp.length !== 6) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid 6-digit OTP code." },
        { status: 400 }
      );
    }

    const verification = verifyAdminOtpCode(cleanEmail, cleanOtp);

    if (!verification.valid) {
      return NextResponse.json(
        {
          success: false,
          error: verification.error || "Invalid or expired OTP code.",
        },
        { status: 400 }
      );
    }

    const adminUser = {
      id: "admin_primary",
      email: cleanEmail || "admin@urbanessentials.in",
      full_name: "Urban Essentials Admin",
      role: "admin",
      authenticated_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Admin authentication successful.",
      user: adminUser,
      sessionToken: `urban_admin_auth_${Date.now()}`,
    });
  } catch (err: any) {
    console.error("Error verifying admin OTP:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to verify OTP." },
      { status: 500 }
    );
  }
}

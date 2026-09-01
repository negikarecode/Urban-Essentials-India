import { NextRequest, NextResponse } from "next/server";
import { generateAdminOtp, ALLOWED_ADMIN_EMAILS } from "@/lib/adminAuth";
import { sendAdminOtpEmail } from "@/lib/email";
import { checkRateLimit, rateLimitResponse } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const rateLimit = checkRateLimit(req, {
      limit: 5,
      windowMs: 10 * 60 * 1000, // 10 minutes
      prefix: "admin-send-otp",
    });

    if (!rateLimit.allowed) {
      return rateLimitResponse(
        rateLimit,
        `Too many OTP requests. Please wait ${rateLimit.retryAfterSeconds} seconds before requesting a new code.`
      );
    }

    const { email, password } = await req.json();

    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanPassword = (password || "").trim();

    const expectedPassword = process.env.ADMIN_PASSWORD || "Manwar@1993";
    if (!ALLOWED_ADMIN_EMAILS.includes(cleanEmail) || cleanPassword !== expectedPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid admin email or password." },
        { status: 401 }
      );
    }

    const PRIMARY_EMAIL = "urbanessentsialindia@gmail.com";
    const targetEmail = cleanEmail || PRIMARY_EMAIL;

    // Generate 6-digit secure numeric OTP stored in admin auth store
    const generatedOtp = generateAdminOtp(targetEmail);

    console.log("==================================================");
    console.log(`[ADMIN 2FA OTP] Target Email: ${targetEmail}`);
    console.log(`[ADMIN 2FA OTP] One-Time Code: >>> ${generatedOtp} <<<`);
    console.log(`[ADMIN 2FA OTP] Valid for 5 minutes.`);
    console.log("==================================================");

    // Send email to administrator via SMTP (Nodemailer) or Resend
    const emailResult = await sendAdminOtpEmail(targetEmail, generatedOtp);

    if (!emailResult.success) {
      console.warn(`[ADMIN 2FA OTP] Email dispatch status: ${emailResult.error}`);
    }

    return NextResponse.json({
      success: true,
      message: `OTP verification code has been sent to ${targetEmail}`,
      expiresMinutes: 5,
      emailDelivered: emailResult.success,
      emailProvider: emailResult.provider,
      emailError: emailResult.error,
    });
  } catch (err: any) {
    console.error("Error generating admin OTP:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to generate OTP." },
      { status: 500 }
    );
  }
}

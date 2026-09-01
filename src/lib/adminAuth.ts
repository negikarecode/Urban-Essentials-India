export interface AdminOtpSession {
  otp: string;
  email: string;
  expiresAt: number;
  attempts: number;
}

// Global in-memory storage for 2FA OTP state across Next.js API route invocations
const globalForAdminAuth = globalThis as unknown as {
  activeAdminOtp: AdminOtpSession | null;
};

export const ALLOWED_ADMIN_EMAILS = [
  "urbanessentsialindia@gmail.com",
  "urbanessentialsindia@gmail.com",
  "urbanessentials@gmail.com",
];

export function getActiveAdminOtp(): AdminOtpSession | null {
  return globalForAdminAuth.activeAdminOtp || null;
}

export function setActiveAdminOtp(session: AdminOtpSession | null): void {
  globalForAdminAuth.activeAdminOtp = session;
}

export function generateAdminOtp(email: string): string {
  const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  setActiveAdminOtp({
    otp: generatedOtp,
    email: email.trim().toLowerCase(),
    expiresAt,
    attempts: 0,
  });

  return generatedOtp;
}

export function verifyAdminOtpCode(email: string, inputOtp: string): {
  valid: boolean;
  error?: string;
} {
  const cleanEmail = email.trim().toLowerCase();
  const cleanOtp = inputOtp.trim();

  if (!ALLOWED_ADMIN_EMAILS.includes(cleanEmail)) {
    return { valid: false, error: "Unauthorized admin email address." };
  }

  const session = getActiveAdminOtp();
  if (!session) {
    return { valid: false, error: "No active OTP found or it has expired. Please request a new code." };
  }

  if (Date.now() > session.expiresAt) {
    setActiveAdminOtp(null);
    return { valid: false, error: "OTP verification code has expired. Please request a new code." };
  }

  if (session.attempts >= 5) {
    setActiveAdminOtp(null);
    return { valid: false, error: "Too many incorrect attempts. Please request a new code." };
  }

  if (session.otp !== cleanOtp) {
    session.attempts += 1;
    setActiveAdminOtp(session);
    const remaining = 5 - session.attempts;
    return {
      valid: false,
      error: `Incorrect OTP code. (${remaining} attempt${remaining === 1 ? "" : "s"} remaining)`,
    };
  }

  // OTP verified successfully - clear session
  setActiveAdminOtp(null);
  return { valid: true };
}

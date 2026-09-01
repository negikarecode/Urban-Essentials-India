import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  provider?: 'smtp' | 'resend' | 'none';
}

/**
 * Creates a configured Nodemailer transporter using available environment variables.
 */
function getTransporter() {
  const host = process.env.SMTP_HOST || (process.env.GMAIL_USER || process.env.SMTP_USER?.includes('@gmail.com') ? 'smtp.gmail.com' : undefined);
  const user = (process.env.SMTP_USER || process.env.GMAIL_USER || process.env.EMAIL_USER || '').trim();
  const rawPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASSWORD || '';
  // Gmail App Passwords often have spaces (e.g. "abcd efgh ijkl mnop") - strip them
  const pass = rawPass.replace(/\s+/g, '').trim();
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  if (!user || !pass) {
    return null;
  }

  const isGmail = host === 'smtp.gmail.com' || user.toLowerCase().endsWith('@gmail.com');

  if (isGmail) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass,
      },
    });
  }

  return nodemailer.createTransport({
    host: host || 'smtp.gmail.com',
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === 'production',
    },
  });
}

/**
 * Dispatches an email using SMTP (Nodemailer) or Resend API.
 */
export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  const defaultFrom =
    process.env.EMAIL_FROM ||
    process.env.SMTP_FROM ||
    `"Urban Essentials Security" <${process.env.SMTP_USER || process.env.GMAIL_USER || 'security@urbanessentials.in'}>`;

  const fromAddress = options.from || defaultFrom;
  const toAddresses = Array.isArray(options.to) ? options.to : [options.to];

  // 1. Try Nodemailer / SMTP
  const transporter = getTransporter();
  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: fromAddress,
        to: toAddresses.join(', '),
        subject: options.subject,
        html: options.html,
        text: options.text || options.html.replace(/<[^>]*>?/gm, ''),
      });

      console.log(`[EMAIL DISPATCH] Sent email via SMTP to ${toAddresses.join(', ')} (Message ID: ${info.messageId})`);
      return {
        success: true,
        messageId: info.messageId,
        provider: 'smtp',
      };
    } catch (smtpErr: any) {
      console.error('[EMAIL DISPATCH] SMTP delivery error:', smtpErr);
      if (!process.env.RESEND_API_KEY) {
        return {
          success: false,
          provider: 'smtp',
          error: smtpErr.message || 'SMTP delivery failed. Check your Gmail App Password.',
        };
      }
      // Fall through to try Resend if available
    }
  }

  // 2. Try Resend API if RESEND_API_KEY is configured
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'Urban Essentials Security <security@urbanessentialsindia.com>',
          to: toAddresses,
          subject: options.subject,
          html: options.html,
          text: options.text,
        }),
      });

      const data = await res.json();
      if (res.ok && data.id) {
        console.log(`[EMAIL DISPATCH] Sent email via Resend to ${toAddresses.join(', ')} (ID: ${data.id})`);
        return {
          success: true,
          messageId: data.id,
          provider: 'resend',
        };
      } else {
        console.error('[EMAIL DISPATCH] Resend API error:', data);
      }
    } catch (resendErr: any) {
      console.error('[EMAIL DISPATCH] Resend network error:', resendErr);
    }
  }

  // Log fallback warning
  console.warn(
    `[EMAIL DISPATCH] No SMTP or Resend credentials configured. To receive live emails at ${toAddresses.join(', ')}, please add SMTP_USER & SMTP_PASS (or GMAIL_USER & GMAIL_APP_PASSWORD / RESEND_API_KEY) to .env.local`
  );

  return {
    success: false,
    provider: 'none',
    error: 'Email service credentials not configured. Please set SMTP_USER and SMTP_PASS in .env.local',
  };
}

/**
 * Sends a high-security Admin 2FA Verification OTP email.
 */
export async function sendAdminOtpEmail(toEmail: string, otpCode: string): Promise<EmailResult> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Urban Essentials Admin OTP</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f6f8; padding: 40px 10px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="520" border="0" cellspacing="0" cellpadding="0" style="max-width: 520px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
                
                <!-- Header with Brand Color -->
                <tr>
                  <td style="background-color: #064e3b; padding: 28px 32px; text-align: center;">
                    <div style="display: inline-block; width: 44px; height: 44px; line-height: 44px; background-color: #042f24; color: #fbbf24; font-size: 22px; font-weight: bold; border-radius: 10px; margin-bottom: 8px; border: 1px solid #065f46;">
                      U
                    </div>
                    <h1 style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 6px 0 0 0; letter-spacing: -0.5px;">
                      Urban Essentials
                    </h1>
                    <p style="color: #a7f3d0; font-size: 12px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                      Security Verification Gate
                    </p>
                  </td>
                </tr>

                <!-- Content Body -->
                <tr>
                  <td style="padding: 32px 32px 24px 32px;">
                    <h2 style="color: #111827; font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">
                      Administrator 2FA Passcode
                    </h2>
                    <p style="color: #4b5563; font-size: 14px; line-height: 1.5; margin: 0 0 24px 0;">
                      A sign-in request to the <strong>Urban Essentials Admin Portal</strong> was initiated. Use the one-time passcode below to verify your session:
                    </p>

                    <!-- Passcode Card -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f0fdf4; border: 2px dashed #16a34a; border-radius: 12px; margin: 0 0 24px 0;">
                      <tr>
                        <td align="center" style="padding: 20px;">
                          <div style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #15803d; text-indent: 8px;">
                            ${otpCode}
                          </div>
                          <div style="color: #166534; font-size: 11px; font-weight: 600; text-transform: uppercase; margin-top: 6px; letter-spacing: 0.5px;">
                            Valid for 5 minutes
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Security Details -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f9fafb; border-radius: 8px; border: 1px solid #f3f4f6; margin: 0 0 24px 0;">
                      <tr>
                        <td style="padding: 14px 16px;">
                          <p style="color: #6b7280; font-size: 12px; margin: 0; line-height: 1.5;">
                            • <strong>Recipient:</strong> ${toEmail}<br>
                            • <strong>Target Access:</strong> Urban Essentials Management Console<br>
                            • <strong>Security Rule:</strong> Never share this code with anyone.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <p style="color: #9ca3af; font-size: 12px; line-height: 1.5; margin: 0;">
                      If you did not request this login, please change your administrative password immediately to secure your store.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9fafb; padding: 18px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="color: #9ca3af; font-size: 11px; margin: 0;">
                      © ${new Date().getFullYear()} Urban Essentials India. C-825, Gaur Sidhartam, Sidhart Vihar, Ghaziabad, 201009.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return sendEmail({
    to: toEmail,
    subject: `🔐 Your Urban Essentials Admin Verification Code: ${otpCode}`,
    html,
    text: `Your Urban Essentials Admin Verification Code is: ${otpCode}\n\nThis code will expire in 5 minutes.\nIf you did not request this code, please ignore this email.`,
  });
}

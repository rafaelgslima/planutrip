import { createHmac, timingSafeEqual } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

interface SendEmailResponse {
  success: boolean;
}

function verifySupabaseWebhookSignature(
  body: string,
  signature: string | undefined,
  secret: string | undefined,
): boolean {
  if (!signature || !secret) {
    return false;
  }

  try {
    const computedSignature = createHmac("sha256", secret)
      .update(body)
      .digest("base64");

    return timingSafeEqual(Buffer.from(signature), Buffer.from(computedSignature));
  } catch {
    return false;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SendEmailResponse>,
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ success: false });
    return;
  }

  try {
    // Verify Supabase webhook signature
    const signature = req.headers["x-supabase-signature"] as string | undefined;
    const secret = process.env.SUPABASE_HOOK_SECRET;
    const bodyString = JSON.stringify(req.body);

    if (!verifySupabaseWebhookSignature(bodyString, signature, secret)) {
      res.status(401).json({ success: false });
      return;
    }

    const body = req.body as any;
    const { user, email_data } = body;

    if (!user || !email_data) {
      res.status(400).json({ success: false });
      return;
    }

    const toEmail = user.email;
    const emailActionType = email_data.email_action_type;
    const appBaseUrl = process.env.APP_BASE_URL ?? "http://localhost:3000";

    // Determine redirect URL based on email action type
    let redirectUrl = email_data.redirect_to || appBaseUrl;
    if (emailActionType === "recovery") {
      // Password reset - redirect to /reset-password
      redirectUrl = `${appBaseUrl.replace(/\/$/, "")}/reset-password`;
    } else if (emailActionType === "signup" || emailActionType === "email_change") {
      // Signup/email change - redirect to /login
      redirectUrl = `${appBaseUrl.replace(/\/$/, "")}/login`;
    }

    // Build custom recovery link using the actual token from email_data
    const token = email_data.token || email_data.token_hash;
    const recoveryUrl = `${appBaseUrl}/api/auth/recover?token=${encodeURIComponent(token as string)}&type=${emailActionType}&next=${encodeURIComponent(redirectUrl)}&email=${encodeURIComponent(toEmail)}`;

    // Generate HTML email
    let html = getEmailHtml(emailActionType, recoveryUrl);
    const subject = getEmailSubject(emailActionType);

    // Send email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      res.status(500).json({ success: false });
      return;
    }

    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: "Planutrip <contact@planutrip.com>",
      to: toEmail,
      subject,
      html,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
}

function getEmailSubject(actionType: string): string {
  switch (actionType) {
    case "recovery":
      return "Reset Your Password";
    case "signup":
    case "invite":
      return "Confirm Your Email";
    case "email_change":
      return "Confirm Your New Email";
    default:
      return "Action Required";
  }
}

function getEmailHtml(
  actionType: string,
  recoveryUrl: string,
): string {
  const privacyPolicyUrl = `${process.env.APP_BASE_URL ?? "http://localhost:3000"}/privacy-policy`;

  if (actionType === "recovery") {
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0"
             style="background:#fff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.1);overflow:hidden;">
        <tr>
          <td style="background:#E8A23A;padding:24px 32px;">
            <span style="color:#0E0B09;font-size:22px;font-weight:700;letter-spacing:-.5px;">Planutrip</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <h1 style="margin:0 0 12px;font-size:20px;color:#111827;">Reset your password</h1>
            <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;">
              We received a request to reset your Planutrip password.
              Click the button below to create a new password.
            </p>
            <a href="${recoveryUrl}"
               style="display:inline-block;padding:12px 28px;background:#E8A23A;color:#0E0B09;
                      font-size:15px;font-weight:600;text-decoration:none;border-radius:6px;">
              Reset password
            </a>
            <p style="margin:24px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">
              This link expires in 24 hours. If you didn't request a password reset, you can safely ignore this email.
            </p>
            <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb;">
            <p style="margin:0 0 16px;font-size:12px;color:#9ca3af;">
              For your security, we never share passwords via email.
              <br><a href="${privacyPolicyUrl}" style="color:#E8A23A;text-decoration:underline;">View our Privacy Policy</a>
            </p>
            <p style="margin:0;font-size:12px;color:#9ca3af;">
              If the button doesn't work, copy and paste this URL into your browser:<br>
              <a href="${recoveryUrl}" style="color:#E8A23A;word-break:break-all;">${recoveryUrl}</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
  }

  // Default signup/invite confirmation email
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0"
             style="background:#fff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.1);overflow:hidden;">
        <tr>
          <td style="background:#E8A23A;padding:24px 32px;">
            <span style="color:#0E0B09;font-size:22px;font-weight:700;letter-spacing:-.5px;">Planutrip</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <h1 style="margin:0 0 12px;font-size:20px;color:#111827;">Confirm your email</h1>
            <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;">
              Click the button below to confirm your email address.
            </p>
            <a href="${recoveryUrl}"
               style="display:inline-block;padding:12px 28px;background:#E8A23A;color:#0E0B09;
                      font-size:15px;font-weight:600;text-decoration:none;border-radius:6px;">
              Confirm email
            </a>
            <p style="margin:24px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">
              This link expires in 24 hours. If you didn't request this, you can safely ignore this email.
            </p>
            <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">
              If the button doesn't work, copy and paste this URL into your browser:<br>
              <a href="${recoveryUrl}" style="color:#E8A23A;word-break:break-all;">${recoveryUrl}</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

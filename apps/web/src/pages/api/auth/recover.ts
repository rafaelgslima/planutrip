import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

interface RecoverResponse {
  success: boolean;
  message?: string;
}

function isValidRedirectUrl(url: string | undefined, appBaseUrl: string): boolean {
  if (!url) return false;

  try {
    const parsedUrl = new URL(url);
    const appUrl = new URL(appBaseUrl);
    return parsedUrl.origin === appUrl.origin;
  } catch {
    return false;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecoverResponse>,
): Promise<void> {
  if (req.method !== "GET") {
    res.status(405).json({ success: false });
    return;
  }

  try {
    const { token, type, next } = req.query;

    if (!token || !type) {
      res.status(400).json({ success: false, message: "Missing token or type" });
      return;
    }

    // Verify the token server-side using Supabase admin client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data, error } = await supabaseAdmin.auth.verifyOtp({
      email: req.query.email as string,
      token: token as string,
      type: type as any,
    });

    const appBase = process.env.APP_BASE_URL || "http://localhost:3000";
    const validRedirectUrl = isValidRedirectUrl(next as string, appBase) ? (next as string) : appBase;

    if (error || !data.session) {
      const errorUrl = `${validRedirectUrl}#error=invalid_token&error_description=Recovery link is invalid or expired`;
      res.setHeader("Location", errorUrl);
      res.status(302).end();
      return;
    }

    // Token is valid, create session and redirect to reset-password with the session
    const resetUrl = `${validRedirectUrl}#access_token=${encodeURIComponent(data.session.access_token)}&refresh_token=${encodeURIComponent(data.session.refresh_token)}&expires_in=${data.session.expires_in}&token_type=bearer&type=recovery`;

    res.setHeader("Location", resetUrl);
    res.status(302).end();
    return;
  } catch (error) {
    const appBase = process.env.APP_BASE_URL || "http://localhost:3000";
    const validRedirectUrl = isValidRedirectUrl(req.query.next as string, appBase) ? (req.query.next as string) : appBase;
    const errorUrl = `${validRedirectUrl}#error=server_error&error_description=An error occurred during recovery`;
    res.setHeader("Location", errorUrl);
    res.status(302).end();
  }
}

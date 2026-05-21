import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  ValidationError,
  methodNotAllowed,
  sendError,
} from "@/lib/api-server/errors";
import { getSupabaseAdminClient } from "@/lib/api-server/supabase";
import { logAuditEvent } from "@/lib/api-server/audit";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method !== "POST") {
    methodNotAllowed(res);
    return;
  }

  try {
    const { email, password, name } = req.body as {
      email?: string;
      password?: string;
      name?: string;
    };

    if (!email || !password || !name) {
      throw new ValidationError("email, password and name are required.");
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } },
    );

    const appBaseUrl = process.env.APP_BASE_URL ?? "http://localhost:3000";
    const emailRedirectTo = `${appBaseUrl.replace(/\/$/, "")}/login`;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo,
        data: { name },
      },
    });

    console.log("[signup] signUp response:", { error, data });

    if (error) {
      console.error("[signup] Supabase auth error:", {
        message: error.message,
        status: error.status,
      });
      throw new ValidationError(error.message);
    }

    if (!data.user) {
      console.error("[signup] No user returned from signUp. Email may already exist.", {
        email,
        data,
      });
      throw new ValidationError(
        "Email already registered or account creation failed. Please try with a different email.",
      );
    }

    const serviceSupabase = getSupabaseAdminClient();

    try {
      const { error: updateError } = await serviceSupabase
        .from("profile")
        .update({
          terms_accepted_at: new Date().toISOString(),
          privacy_policy_version: "1.0",
        })
        .eq("id", data.user.id);

      if (updateError) {
        console.error("[signup] Failed to update profile with consent:", {
          message: updateError.message,
          details: updateError.details,
        });
      }
    } catch (err) {
      console.error("[signup] Exception while updating profile consent:", err);
    }

    try {
      await logAuditEvent(data.user.id, "account.created");
    } catch (err) {
      console.error("[signup] Exception while logging audit event:", err);
    }

    res.status(201).json({ userId: data.user.id });
  } catch (error) {
    sendError(res, error);
  }
}

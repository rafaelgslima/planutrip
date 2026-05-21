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

    const serviceSupabase = getSupabaseAdminClient();
    let userId: string;

    if (!data.user) {
      // Email confirmation is likely required. Try to find the user by email.
      console.log("[signup] No user in response. Querying for user by email...", { email });

      try {
        const { data: foundUser } = await serviceSupabase.auth.admin.listUsers();
        const user = foundUser?.users.find((u) => u.email === email);

        if (user) {
          userId = user.id;
          console.log("[signup] User found by email after signup:", { userId, email });
        } else {
          throw new ValidationError(
            "Account creation failed. Please try again or contact support.",
          );
        }
      } catch (err) {
        console.error("[signup] Failed to find user after signup:", err);
        throw new ValidationError(
          "Account creation failed. Please try again or contact support.",
        );
      }
    } else {
      userId = data.user.id;
    }

    try {
      const { error: updateError } = await serviceSupabase
        .from("profile")
        .update({
          terms_accepted_at: new Date().toISOString(),
          privacy_policy_version: "1.0",
        })
        .eq("id", userId);

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
      await logAuditEvent(userId, "account.created");
    } catch (err) {
      console.error("[signup] Exception while logging audit event:", err);
    }

    // Return success regardless of confirmation status
    res.status(201).json({
      userId,
      message: "Account created! Please check your email to confirm your account.",
    });
  } catch (error) {
    sendError(res, error);
  }
}

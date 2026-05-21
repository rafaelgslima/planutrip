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

    if (error) {
      throw new ValidationError(error.message);
    }

    const serviceSupabase = getSupabaseAdminClient();
    let userId: string;

    if (!data.user) {
      // No user returned from signup - this is an edge case (email already exists or other error)
      // Attempt to get more information by searching through users (unavoidable for this edge case)
      try {
        const { data: foundUser } = await serviceSupabase.auth.admin.listUsers();
        const user = foundUser?.users.find((u) => u.email === email);

        if (user) {
          // User exists. Check if they were just created (email confirmation) or created earlier (duplicate signup)
          const createdAt = new Date(user.created_at || 0).getTime();
          const now = Date.now();
          const secondsSinceCreation = (now - createdAt) / 1000;

          if (secondsSinceCreation < 10) {
            // User was created within the last 10 seconds - this is email confirmation required
            userId = user.id;
          } else if (user.email_confirmed_at) {
            // Email is confirmed - they already have a full account
            throw new ValidationError("This email is already registered. Please log in or use a different email.");
          } else {
            // Email not confirmed and created > 10 seconds ago - duplicate signup attempt
            throw new ValidationError("This email was already used to create an account. Please check your email for the confirmation link.");
          }
        } else {
          // User doesn't exist - signup failed for unknown reason
          throw new ValidationError(
            "Account creation failed. Please try again or contact support.",
          );
        }
      } catch (err) {
        if (err instanceof ValidationError) {
          throw err;
        }
        throw new ValidationError(
          "Account creation failed. Please try again or contact support.",
        );
      }
    } else {
      userId = data.user.id;
    }

    try {
      await serviceSupabase
        .from("profile")
        .update({
          terms_accepted_at: new Date().toISOString(),
          privacy_policy_version: "1.0",
        })
        .eq("id", userId);
    } catch {
      // Silently fail - consent update is not critical
    }

    try {
      await logAuditEvent(userId, "account.created");
    } catch {
      // Silently fail - audit logging is not critical
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

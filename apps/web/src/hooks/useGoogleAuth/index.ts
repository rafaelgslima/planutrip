import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";

export function useGoogleAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const nextRaw = router.query.next;
      const nextUrl =
        typeof nextRaw === "string" && nextRaw.trim() ? nextRaw.trim() : "/home";

      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextUrl)}`,
        },
      });

      if (signInError) {
        setError(signInError.message || "Failed to sign in with Google");
        setIsLoading(false);
        return;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleGoogleSignIn,
  };
}

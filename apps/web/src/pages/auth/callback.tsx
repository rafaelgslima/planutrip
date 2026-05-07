import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabase";
import { LoadingSpinner } from "@/components/Loading/LoadingSpinner";

export default function AuthCallback() {
  const router = useRouter();
  const { t } = useTranslation('auth');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Supabase automatically handles the OAuth callback
        // The session is set when this page loads
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          setError(t('oauthCallback.oauthError'));
          setTimeout(() => {
            router.push("/login");
          }, 2000);
          return;
        }

        if (!session) {
          setError(t('oauthCallback.sessionNotFound'));
          setTimeout(() => {
            router.push("/login");
          }, 2000);
          return;
        }

        // Session is established, redirect to the next URL or home
        const nextRaw = router.query.next;
        const nextUrl =
          typeof nextRaw === "string" && nextRaw.trim() ? nextRaw.trim() : "/home";

        router.push(nextUrl);
      } catch (err) {
        setError(t('oauthCallback.oauthError'));
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    };

    handleCallback();
  }, [router, t]);

  if (error) {
    return (
      <div className="min-h-screen bg-tf-bg flex items-center justify-center p-6">
        <div className="max-w-sm bg-tf-card border border-tf-border rounded-lg p-6 text-center">
          <p className="text-red-300 mb-4">{error}</p>
          <p className="text-tf-muted text-sm">{t('oauthCallback.redirectingToLogin')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tf-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-tf-muted">{t('oauthCallback.completingSignIn')}</p>
      </div>
    </div>
  );
}

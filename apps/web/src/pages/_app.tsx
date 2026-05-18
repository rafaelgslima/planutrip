import type { AppProps } from "next/app";
import Script from "next/script";
import { Cormorant_Garamond, Outfit, Poppins } from "next/font/google";
import { Suspense, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import "@/app/globals.css";
import "klaro/dist/klaro.css";
import { ClientOnly } from "@/components/ClientOnly";
import { useKlaroConsent } from "@/hooks/useKlaroConsent";
import i18n from "@/lib/i18n";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  useKlaroConsent();

  useEffect(() => {
    const initializeLanguage = async () => {
      const storedLanguage = localStorage.getItem('preferredLanguage');

      if (!storedLanguage) {
        try {
          let countryCode = '';
          try {
            const geoResponse = await fetch('https://ipapi.co/json/');
            if (geoResponse.ok) {
              const geoData = (await geoResponse.json()) as any;
              countryCode = (geoData.country_code || '').toUpperCase();
            }
          } catch {
            // Client-side geolocation failed, try server-side
          }

          if (!countryCode) {
            const response = await fetch('/api/detect-language');
            const data = (await response.json()) as { language: string; detected: boolean; countryCode?: string };
            countryCode = data.countryCode || '';
          }

          const COUNTRY_TO_LANGUAGE: Record<string, 'en' | 'pt'> = {
            BR: 'pt',
            PT: 'pt',
          };
          const language = COUNTRY_TO_LANGUAGE[countryCode] || 'en';
          const detected = countryCode in COUNTRY_TO_LANGUAGE;

          await i18n.changeLanguage(language);

          if (detected) {
            localStorage.setItem('preferredLanguage', language);
          }
        } catch {
          // Fallback: let i18n's auto-detection handle it
        }
      }
    };

    void initializeLanguage();
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-65BJGT3E6P"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-65BJGT3E6P');
          `,
        }}
      />
      <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div className={`${cormorant.variable} ${outfit.variable} ${poppins.variable} font-outfit min-h-screen bg-tf-bg`} />}>
        <div className={`${cormorant.variable} ${outfit.variable} ${poppins.variable} font-outfit`}>
          <ClientOnly>
            <Component {...pageProps} />
          </ClientOnly>
        </div>
      </Suspense>
      </I18nextProvider>
    </>
  );
}

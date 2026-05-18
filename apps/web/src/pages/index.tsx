import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { MdCalendarToday, MdPeople, MdEdit } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabase";
import { HeaderPreLogin } from "@/components/Header/HeaderPreLogin";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";

/* ── Icons ────────────────────────────────────────────────────────────── */
function CalendarIcon() {
  return <MdCalendarToday size={22} />;
}

function UsersIcon() {
  return <MdPeople size={22} />;
}

function EditIcon() {
  return <MdEdit size={22} />;
}

/* ── Feature card ─────────────────────────────────────────────────────── */
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  featured?: boolean;
}

function FeatureCard({ icon, title, description, featured }: FeatureCardProps) {
  return (
    <div
      className={`${featured ? "bg-tf-bg-3 border-tf-border-amber" : "bg-tf-bg-2 border-tf-border"} border rounded-[16px] p-7 transition-colors duration-200`}
    >
      <div
        className={`inline-flex items-center justify-center w-[44px] h-[44px] rounded-xl mb-5 border ${featured ? "bg-tf-amber-soft text-tf-amber border-tf-border-amber" : "bg-[rgba(255,255,255,0.05)] text-tf-muted border-tf-border"}`}
      >
        {icon}
      </div>
      <h3 className="text-[16px] font-semibold text-tf-text mb-[10px] font-outfit tracking-[-0.01em]">
        {title}
      </h3>
      <p
        className="text-sm font-outfit text-tf-muted leading-[1.65]"
      >
        {description}
      </p>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────── */
export default function Home() {
  const router = useRouter();
  const { t } = useTranslation('home');
  const [isChecking, setIsChecking] = useState(true);
  useScrollAnimation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        void router.replace("/home");
      } else {
        setIsChecking(false);
      }
    });
  }, [router]);

  if (isChecking) {
    return <div className="min-h-screen bg-tf-bg" />;
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Planutrip",
    "url": "https://planutrip.com",
    "logo": "https://planutrip.com/logo.png",
    "description": "Free collaborative trip planner. Plan trips together, share itineraries, and collaborate with friends.",
    "sameAs": [
      "https://twitter.com/planutrip",
      "https://instagram.com/planutrip"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "support@planutrip.com"
    }
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Planutrip - Collaborative Trip Planner",
    "applicationCategory": "TravelApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "2450"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "Collaborative itinerary planning",
      "Real-time synchronization",
      "Email-based sharing",
      "Destination guides",
      "Daily activity management"
    ]
  };

  return (
    <>
      <Head>
        <title>Planutrip | Free Collaborative Trip Planner & Itinerary Maker</title>
        <meta name="description" content="Plan trips with friends for free. Create shared itineraries, sync in real-time, and collaborate on group travel plans. No signup required to explore." />
        <meta name="keywords" content="trip planner, travel planner, collaborative planning, itinerary maker, group trip planner, free trip planner" />
        <meta property="og:title" content="Planutrip - Plan Trips Together" />
        <meta property="og:description" content="Free collaborative trip planning. Invite friends, build itineraries together, no credit card required." />
        <meta property="og:image" content="https://planutrip.com/og-image.png" />
        <meta property="og:url" content="https://planutrip.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0E0B09" />
        <link rel="canonical" href="https://planutrip.com" />
        <link rel="alternate" hrefLang="pt-BR" href="https://planutrip.com/pt-br/" />

        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(softwareAppSchema)}
        </script>
      </Head>
      <div className="min-h-screen overflow-x-hidden bg-tf-bg text-tf-text">
      {/* Film grain */}
      <div className="grain" aria-hidden="true" />

      {/* Ambient glow — top center */}
      <div
        aria-hidden="true"
        className="fixed pointer-events-none z-0"
        style={{
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(900px, 100vw)",
          height: "500px",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(232,162,58,0.07) 0%, transparent 60%)",
        }}
      />

      <HeaderPreLogin />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <main className="relative z-[1] pt-[10px]">
        <section suppressHydrationWarning>
          <div className="max-w-[1200px] mx-auto hero-grid">
            {/* Left: copy */}
            <div>
              {/* Eyebrow pill */}
              <div className="animate-slide-up inline-flex items-center gap-2 py-1.5 px-[14px] rounded-full border border-tf-border-amber bg-tf-amber-soft text-xs font-semibold text-tf-amber font-outfit tracking-[0.04em] uppercase mb-7">
                <span aria-hidden="true">✦</span>
                {t('hero.eyebrow')}
              </div>

              {/* Headline */}
              <h1
                className="animate-slide-up font-outfit font-normal leading-[1.04] tracking-[-0.025em] text-tf-text mb-6"
                style={{
                  fontSize: "clamp(52px, 6.5vw, 86px)",
                  animationDelay: "0.08s",
                }}
              >
                {t('hero.headline1')}
                <br />
                {t('hero.headline2')}
                <br />
                <em className="text-tf-amber italic">{t('hero.headline3')}</em>
              </h1>

              {/* Subtext */}
              <p
                className="animate-slide-up text-[17px] text-tf-muted max-w-[440px] mb-10 font-outfit leading-[1.7]"
                style={{ animationDelay: "0.18s" }}
              >
                {t('hero.subtext')}
              </p>

              {/* CTA row */}
              <div
                className="animate-slide-up flex items-center gap-[14px] flex-wrap"
                style={{ animationDelay: "0.28s" }}
              >
                <Link
                  href="/signup"
                  className="py-[13px] px-[28px] text-[15px] font-semibold text-[#0E0B09] bg-tf-amber no-underline rounded-[10px] font-outfit tracking-[-0.01em] shadow-[0_4px_24px_rgba(232,162,58,0.3)] inline-block"
                >
                  {t('hero.startForFree')}
                </Link>
                <Link
                  href="/features"
                  className="py-[13px] px-6 text-[15px] font-medium text-tf-muted no-underline rounded-[10px] border border-tf-border font-outfit inline-block"
                >
                  {t('hero.seeHowItWorks')}
                </Link>
              </div>
            </div>

            {/* Right: Plan image */}
            <div className="hidden md:block animate-float relative rounded-[24px] overflow-hidden border border-tf-border shadow-[0_24px_64px_rgba(0,0,0,0.55)]">
              <Image
                src="/travel-plan-desktop.png"
                alt="Planutrip travel plan interface"
                width={1200}
                height={675}
                className="w-full h-auto block"
                priority
              />
            </div>
            <div className="md:hidden animate-float relative rounded-[20px] overflow-hidden border border-tf-border shadow-[0_24px_64px_rgba(0,0,0,0.55)]">
              <Image
                src="/travel-plan-mobile.png"
                alt="Planutrip travel plan interface on mobile"
                width={360}
                height={640}
                className="w-full h-auto block"
                priority
              />
            </div>
          </div>
        </section>

        {/* ── Simplicity Promise ────────────────────────────────────────── */}
        <section suppressHydrationWarning
          className="py-[80px] border-t border-tf-border"
          data-scroll-section
        >
          <div className="max-w-[640px] mx-auto px-6 text-center">
            {/* Eyebrow */}
            <div
              className="text-[11px] font-bold tracking-[0.14em] uppercase text-tf-amber font-outfit mb-4"
              data-scroll-animate
            >
              {t('simplicity.eyebrow')}
            </div>

            {/* Headline */}
            <h2
              className="font-outfit font-normal leading-[1.08] tracking-[-0.025em] text-tf-text mb-5"
              style={{ fontSize: "clamp(36px, 4vw, 52px)" }}
              data-scroll-animate
            >
              {t('simplicity.headline1')}
              <br />
              <em className="text-tf-amber">{t('simplicity.headline2')}</em>
            </h2>

            {/* Body text */}
            <p
              className="text-[16px] text-tf-muted mb-8 font-outfit leading-[1.7]"
              data-scroll-animate
            >
              {t('simplicity.description')}
            </p>

            {/* Bullet points */}
            <div
              className="space-y-4 inline-block text-left"
              data-scroll-animate
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    background: "rgba(232,162,58,0.15)",
                    color: "#E8A23A",
                  }}
                >
                  <span className="text-xs font-bold">✓</span>
                </div>
                <p className="text-[14px] text-tf-muted font-outfit leading-relaxed">
                  <strong className="text-tf-text">{t('simplicity.privacyFirst')}</strong> {t('simplicity.privacyDescription')}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    background: "rgba(232,162,58,0.15)",
                    color: "#E8A23A",
                  }}
                >
                  <span className="text-xs font-bold">✓</span>
                </div>
                <p className="text-[14px] text-tf-muted font-outfit leading-relaxed">
                  <strong className="text-tf-text">{t('simplicity.alwaysFree')}</strong> {t('simplicity.alwaysFreeDescription')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ──────────────────────────────────────────────────── */}
        <section suppressHydrationWarning
          id="features"
          className="border-t border-tf-border py-[80px]"
          data-scroll-section
        >
          <div className="max-w-[1200px] mx-auto px-6">
            {/* Section label */}
            <div className="text-center mb-[56px]" data-scroll-animate>
              <div
                className="text-[11px] font-bold tracking-[0.14em] uppercase text-tf-amber font-outfit mb-4"
                data-scroll-animate
              >
                {t('features.eyebrow')}
              </div>
              <h2
                className="font-outfit font-normal leading-[1.1] tracking-[-0.025em] text-tf-text"
                style={{ fontSize: "clamp(36px, 4vw, 54px)" }}
                data-scroll-animate
              >
                {t('features.headline1')}
                <br />
                <em className="text-tf-amber">{t('features.headline2')}</em>
              </h2>
            </div>

            {/* Cards */}
            <div className="features-grid">
              <div data-scroll-animate>
                <FeatureCard
                  icon={<CalendarIcon />}
                  title={t('features.dayByDay')}
                  description={t('features.dayByDayDesc')}
                />
              </div>
              <div data-scroll-animate>
                <FeatureCard
                  icon={<UsersIcon />}
                  title={t('features.inviteCrew')}
                  description={t('features.inviteCrewDesc')}
                  featured
                />
              </div>
              <div data-scroll-animate>
                <FeatureCard
                  icon={<EditIcon />}
                  title={t('features.editTogether')}
                  description={t('features.editTogetherDesc')}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section suppressHydrationWarning
          className="py-[80px] border-t border-tf-border"
          data-scroll-section
        >
          <div className="max-w-[640px] mx-auto px-6 text-center">
            {/* Decorative line */}
            <div
              className="w-px  mx-auto"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, var(--tf-border-amber))",
              }}
              data-scroll-animate
            />
            <h2
              className="font-outfit font-normal leading-[1.05] tracking-[-0.025em] text-tf-text mb-[18px]"
              style={{ fontSize: "clamp(40px, 5vw, 66px)" }}
              data-scroll-animate
            >
              {t('cta.headline1')}
              <br />
              <em className="text-tf-amber">{t('cta.headline2')}</em>
            </h2>
            <p
              className="text-[16px] text-tf-muted mb-9 font-outfit leading-[1.65]"
              data-scroll-animate
            >
              {t('cta.description')}
            </p>
            <Link
              href="/signup"
              className="py-[15px] px-10 text-[15px] font-semibold text-[#0E0B09] bg-tf-amber no-underline rounded-[10px] font-outfit tracking-[-0.01em] shadow-[0_4px_32px_rgba(232,162,58,0.28)] inline-block"
              data-scroll-animate
            >
              {t('cta.createFirstTrip')}
            </Link>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer suppressHydrationWarning className="border-t border-tf-border py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <h3 className="text-xs font-semibold text-tf-text mb-3">{t('nav.features')}</h3>
              <Link href="/features" className="text-sm text-tf-muted hover:text-tf-text no-underline">
                {t('nav.features')}
              </Link>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-tf-text mb-3">Company</h3>
              <div className="space-y-2">
                <div>
                  <Link href="/about" className="text-sm text-tf-muted hover:text-tf-text no-underline">
                    About
                  </Link>
                </div>
                <div>
                  <Link href="/contact" className="text-sm text-tf-muted hover:text-tf-text no-underline">
                    {t('nav.contact')}
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-tf-text mb-3">Legal</h3>
              <div className="space-y-2">
                <div>
                  <Link href="/privacy-policy" className="text-sm text-tf-muted hover:text-tf-text no-underline">
                    Privacy
                  </Link>
                </div>
                <div>
                  <Link href="/terms-of-service" className="text-sm text-tf-muted hover:text-tf-text no-underline">
                    Terms
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-tf-text mb-3">Get Started</h3>
              <Link href="/signup" className="text-sm text-tf-amber hover:opacity-80 no-underline font-semibold">
                {t('nav.signUpFree')}
              </Link>
            </div>
          </div>
          <div className="border-t border-tf-border pt-6 text-center">
            <p className="text-[13px] text-tf-muted font-outfit">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}

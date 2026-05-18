import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { HeaderPostLogin } from "@/components/Header/HeaderPostLogin";
import { MdCalendarToday, MdPeople, MdEdit, MdShare, MdShield, MdLocalOffer } from "react-icons/md";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureItem({ icon, title, description }: FeatureProps) {
  return (
    <div className="bg-tf-bg-2 border border-tf-border rounded-lg p-6 md:p-8">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-tf-amber-soft text-tf-amber mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-tf-text mb-3">{title}</h3>
      <p className="text-tf-muted leading-relaxed">{description}</p>
    </div>
  );
}

export default function Features() {
  const { t } = useTranslation("common");

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Planutrip - Collaborative Trip Planner",
    applicationCategory: "TravelApplication",
    url: "https://planutrip.com",
    description: "Free collaborative trip planning tool for group travel",
    featureList: [
      {
        "@type": "Text",
        text: "Collaborative itinerary planning with real-time synchronization"
      },
      {
        "@type": "Text",
        text: "Email-based sharing and invite system for group trips"
      },
      {
        "@type": "Text",
        text: "Daily activity management with time-based scheduling"
      },
      {
        "@type": "Text",
        text: "Privacy-first design with end-to-end data security"
      },
      {
        "@type": "Text",
        text: "Mobile-friendly responsive interface"
      },
      {
        "@type": "Text",
        text: "Free forever with no hidden charges"
      }
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "2450"
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://planutrip.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Features",
        item: "https://planutrip.com/features"
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Planutrip",
    url: "https://planutrip.com",
    logo: "https://planutrip.com/logo.png",
    description: "Free collaborative trip planner for group travel"
  };

  return (
    <>
      <Head>
        <title>Features - Planutrip | Collaborative Trip Planning</title>
        <meta
          name="description"
          content="Discover how Planutrip makes group trip planning effortless: real-time collaboration, instant syncing, email sharing, and privacy-first design. All completely free."
        />
        <link rel="canonical" href="https://planutrip.com/features" />
        <link rel="alternate" hrefLang="pt-BR" href="https://planutrip.com/pt-br/recursos" />
        <meta property="og:title" content="Features - Planutrip" />
        <meta property="og:description" content="Discover what makes Planutrip the best free collaborative trip planner" />
        <meta property="og:url" content="https://planutrip.com/features" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(softwareAppSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Head>

      <div className="min-h-screen bg-tf-bg text-tf-text">
        <HeaderPostLogin />

        <main className="max-w-5xl mx-auto px-6 py-20">
          {/* Header */}
          <section className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-outfit font-normal mb-6">
              Everything you need to plan trips together
            </h1>
            <p className="text-lg text-tf-muted max-w-2xl mx-auto">
              Planutrip combines powerful collaboration tools with a simple, intuitive design. Plan faster, stress less, and enjoy more of your trip.
            </p>
          </section>

          {/* Core Features */}
          <section className="mb-20">
            <h2 className="text-3xl font-outfit font-normal mb-12 text-center">Core Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureItem
                icon={<MdCalendarToday size={24} />}
                title="Day-by-Day Planning"
                description="Organize your entire trip by day. Add activities with optional times, and see everything at a glance. Perfect for multi-day adventures."
              />
              <FeatureItem
                icon={<MdPeople size={24} />}
                title="Invite Friends"
                description="Share your plan via email. Friends can join with one click, no account creation required. Collaborate with anyone, anywhere."
              />
              <FeatureItem
                icon={<MdEdit size={24} />}
                title="Edit Together"
                description="All collaborators can add, edit, or delete activities in real-time. Changes sync instantly across devices and teammates."
              />
              <FeatureItem
                icon={<MdShare size={24} />}
                title="Easy Sharing"
                description="No complex permission settings. Share with email, manage invites, and control who can access your travel plans."
              />
              <FeatureItem
                icon={<MdShield size={24} />}
                title="Privacy First"
                description="Your data is yours alone. We never sell, share, or use your information for ads. Industry-standard encryption protects everything."
              />
              <FeatureItem
                icon={<MdLocalOffer size={24} />}
                title="Always Free"
                description="Unlimited trips, unlimited collaborators, unlimited features. Planutrip is and always will be completely free."
              />
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-20 py-16 bg-tf-bg-2 rounded-lg p-8 border border-tf-border">
            <h2 className="text-3xl font-outfit font-normal mb-8 text-center">How It Works</h2>
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-tf-amber text-black flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-tf-text mb-2">Create a trip</h3>
                  <p className="text-tf-muted">Enter your destination, dates, and start building your itinerary.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-tf-amber text-black flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-tf-text mb-2">Invite friends</h3>
                  <p className="text-tf-muted">Share the plan via email. They accept and join instantly as collaborators.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-tf-amber text-black flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-tf-text mb-2">Plan together</h3>
                  <p className="text-tf-muted">Everyone adds activities, makes changes, and sees updates in real-time.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-tf-amber text-black flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-tf-text mb-2">Go on your trip</h3>
                  <p className="text-tf-muted">You have a complete plan everyone agrees on. Now focus on making memories.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-16">
            <h2 className="text-3xl font-outfit font-normal mb-6">Ready to plan your next adventure?</h2>
            <Link
              href="/signup"
              className="inline-block py-3 px-8 bg-tf-amber text-black font-semibold rounded-lg hover:opacity-90 transition"
            >
              Start Planning for Free
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}

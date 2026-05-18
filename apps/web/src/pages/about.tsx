import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { HeaderPostLogin } from "@/components/Header/HeaderPostLogin";

export default function About() {
  const { t } = useTranslation("common");

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
        name: "About",
        item: "https://planutrip.com/about"
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Planutrip",
    "description": "Free collaborative trip planner",
    "founder": {
      "@type": "Person",
      "name": "Rafael Godinho",
      "description": "Travel enthusiast and founder of Planutrip"
    },
    "foundingDate": "2026-01-01"
  };

  return (
    <>
      <Head>
        <title>About Planutrip | Free Collaborative Trip Planning</title>
        <meta name="description" content="Meet the creator of Planutrip. Learn how Rafael Godinho built a completely free collaborative trip planner to eliminate group travel chaos." />
        <link rel="canonical" href="https://planutrip.com/about" />
        <link rel="alternate" hrefLang="pt-BR" href="https://planutrip.com/pt-br/sobre" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Head>

      <div className="min-h-screen bg-tf-bg text-tf-text">
        <HeaderPostLogin />

        <main className="max-w-4xl mx-auto px-6 py-20">
          <section className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-outfit font-normal mb-6">
              About Planutrip
            </h1>
            <p className="text-lg text-tf-muted max-w-2xl mx-auto">
              How a travel enthusiast built a free tool to eliminate trip-planning chaos.
            </p>
          </section>

          <section className="mb-16 py-12 border-b border-tf-border">
            <h2 className="text-3xl font-outfit font-normal mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-tf-muted leading-relaxed">
              <p>
                Planutrip was born from frustration. As someone who loves traveling with friends, coordinating group trips through spreadsheets and group chats was always chaotic.
              </p>
              <p>
                People would send messages at different times, versions would get out of sync, and nobody knew who was responsible for what. We realized we needed a tool specifically built for trip planning.
              </p>
            </div>
          </section>

          <section className="mb-16 py-12 border-b border-tf-border">
            <h2 className="text-3xl font-outfit font-normal mb-8">
              Meet the Founder
            </h2>
            <div className="bg-tf-bg-2 border border-tf-border rounded-lg p-8 md:p-12">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">Rafael Godinho</h3>
                <p className="text-tf-amber font-semibold">Founder & Creator</p>
              </div>
              <p className="text-tf-muted leading-relaxed mb-4">
                Rafael is a full-stack developer and travel enthusiast who has visited over 30 countries. He builds tools that solve real problems and make a difference.
              </p>
            </div>
          </section>

          <section className="mb-16 py-12 border-b border-tf-border">
            <h2 className="text-3xl font-outfit font-normal mb-8">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-tf-amber">
                  Free Forever
                </h3>
                <p className="text-tf-muted">
                  Trip planning should never cost money. Always free, no exceptions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-tf-amber">
                  Privacy First
                </h3>
                <p className="text-tf-muted">
                  Your data is yours alone. We never sell, share, or use it for ads.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-tf-amber">
                  Simple Design
                </h3>
                <p className="text-tf-muted">
                  The best tool is one that works intuitively and gets out of your way.
                </p>
              </div>
            </div>
          </section>

          <section className="py-12">
            <h2 className="text-3xl font-outfit font-normal mb-6">
              Our Vision
            </h2>
            <p className="text-tf-muted leading-relaxed mb-6">
              We believe every trip should be celebrated, not stressful. Our vision is to become the most trusted tool for planning trips together.
            </p>
          </section>

          <section className="mt-20 py-16 border-t border-tf-border text-center">
            <h2 className="text-3xl font-outfit font-normal mb-6">
              Ready to plan your next adventure?
            </h2>
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

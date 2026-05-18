import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { HeaderPreLogin } from '@/components/Header/HeaderPreLogin';
import { HeaderPostLogin } from '@/components/Header/HeaderPostLogin';
import { ContactForm } from '@/components/Form/ContactForm';
import { supabase } from '@/lib/supabase';

export default function ContactPage() {
  const { t } = useTranslation('auth');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setIsLoggedIn(!!session?.access_token);
      }
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const Header = isLoggedIn ? HeaderPostLogin : HeaderPreLogin;

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
        name: "Contact",
        item: "https://planutrip.com/contact"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I invite friends to my trip plan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Click Share on your trip plan and enter your friend's email address. They'll receive an invite they can accept to join as a collaborator."
        }
      },
      {
        "@type": "Question",
        name: "Is Planutrip really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Planutrip is completely free forever. No credit card required, no hidden charges, no premium tiers. All features are free for everyone."
        }
      },
      {
        "@type": "Question",
        name: "Can multiple people edit the same trip plan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all collaborators can add, edit, and delete activities. Changes sync in real-time across all devices."
        }
      },
      {
        "@type": "Question",
        name: "Is my trip data private and secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We use industry-standard encryption and never sell or share your data. Your privacy is our priority."
        }
      },
      {
        "@type": "Question",
        name: "Do collaborators need to create an account?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Invited collaborators can accept the invite and join without signing up. If they want to create their own trips, they can create an account anytime."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Contact Us - Planutrip | Support & Feedback</title>
        <meta
          name="description"
          content="Have a question about Planutrip? Contact our support team directly. Share feedback, report bugs, suggest features—we respond within 24 hours."
        />
        <link rel="canonical" href="https://planutrip.com/contact" />
        <link rel="alternate" hrefLang="pt-BR" href="https://planutrip.com/pt-br/contato" />
        <meta property="og:title" content="Contact Us - Planutrip" />
        <meta property="og:description" content="Get in touch with Planutrip support team" />
        <meta property="og:url" content="https://planutrip.com/contact" />
        <meta name="twitter:card" content="summary" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Head>

      <Header />

      <main className="min-h-[calc(100vh-62px)] bg-tf-bg flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[500px]">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <h1 className="font-outfit text-[30px] font-light tracking-tight text-tf-text mb-3">
              {t('contact.title')}
            </h1>
            <p className="font-outfit text-sm md:text-base text-tf-muted leading-relaxed">
              {t('contact.description')}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-tf-card border border-tf-border rounded-lg p-6 md:p-8 shadow-lg">
            <ContactForm />
          </div>

          {/* Footer Hint */}
          <p className="text-center text-xs text-tf-muted mt-6">
            {t('contact.responseTime')}
          </p>
        </div>
      </main>
    </>
  );
}

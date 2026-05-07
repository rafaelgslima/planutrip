import { useTranslation } from "react-i18next";
import { HeaderPreLogin } from "@/components/Header/HeaderPreLogin";
import { useRouter } from "next/router";

export default function PrivacyPolicyPage() {
  const { t } = useTranslation('legal');
  const router = useRouter();
  const isLoggedIn = router.query.loggedIn === "true";

  return (
    <div className="min-h-screen bg-tf-bg">
      {!isLoggedIn && <HeaderPreLogin />}
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <h1 suppressHydrationWarning className="text-[30px] font-outfit font-bold text-tf-text mb-2">
          {t('privacyPolicy.title')}
        </h1>

        <div suppressHydrationWarning className="prose prose-invert max-w-none space-y-8 text-[15px] leading-relaxed text-tf-text">
          <section>
            <h2 className="text-2xl font-outfit font-bold text-tf-text mb-4">
              {t('privacyPolicy.sections.information.title')}
            </h2>
            <p>
              {t('privacyPolicy.sections.information.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-outfit font-bold text-tf-text mb-4">
              {t('privacyPolicy.sections.usage.title')}
            </h2>
            <p>
              {t('privacyPolicy.sections.usage.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-outfit font-bold text-tf-text mb-4">
              {t('privacyPolicy.sections.security.title')}
            </h2>
            <p>
              {t('privacyPolicy.sections.security.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-outfit font-bold text-tf-text mb-4">
              {t('privacyPolicy.sections.rights.title')}
            </h2>
            <p>
              {t('privacyPolicy.sections.rights.description')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-outfit font-bold text-tf-text mb-4">
              {t('privacyPolicy.sections.contact.title')}
            </h2>
            <p>
              {t('privacyPolicy.sections.contact.description')}
            </p>
          </section>

          <section className="bg-tf-card border border-tf-border rounded-lg p-6">
            <p className="text-sm italic">
              {t('privacyPolicy.acceptanceRequired')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

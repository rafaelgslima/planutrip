import Link from "next/link";
import { useTranslation } from "react-i18next";
import { HeaderPreLogin } from "@/components/Header/HeaderPreLogin";
import { useRouter } from "next/router";

export default function TermsOfServicePage() {
  const { t } = useTranslation('legal');
  const router = useRouter();
  const isLoggedIn = router.query.loggedIn === "true";

  return (
    <div className="min-h-screen bg-tf-bg">
      {!isLoggedIn && <HeaderPreLogin />}
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <h1 suppressHydrationWarning className="text-[30px] font-outfit font-bold text-tf-text mb-2">
          {t('termsOfService.title')}
        </h1>

        <div suppressHydrationWarning className="prose prose-invert max-w-none space-y-8 text-[15px] leading-relaxed text-tf-text">
          <section>
            <h2 className="text-2xl font-outfit font-bold text-tf-text mb-4">
              {t('termsOfService.section1.title')}
            </h2>
            <p>{t('termsOfService.section1.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-outfit font-bold text-tf-text mb-4">
              {t('termsOfService.section2.title')}
            </h2>
            <p>{t('termsOfService.section2.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-outfit font-bold text-tf-text mb-4">
              {t('termsOfService.section3.title')}
            </h2>
            <p>{t('termsOfService.section3.content')}</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              {(t('termsOfService.section3.restrictions', { returnObjects: true }) as string[]).map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-outfit font-bold text-tf-text mb-4">
              {t('termsOfService.section4.title')}
            </h2>
            <p>{t('termsOfService.section4.content')}</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              {(t('termsOfService.section4.points', { returnObjects: true }) as string[]).map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-outfit font-bold text-tf-text mb-4">
              {t('termsOfService.section5.title')}
            </h2>
            <p>{t('termsOfService.section5.content')}</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              {(t('termsOfService.section5.prohibited', { returnObjects: true }) as string[]).map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-outfit font-bold text-tf-text mb-4">
              {t('termsOfService.section6.title')}
            </h2>
            <p>{t('termsOfService.section6.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-outfit font-bold text-tf-text mb-4">
              {t('termsOfService.section7.title')}
            </h2>
            <p>{t('termsOfService.section7.content')}</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              {(t('termsOfService.section7.dataPoints', { returnObjects: true }) as string[]).map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-outfit font-bold text-tf-text mb-4">
              {t('termsOfService.section8.title')}
            </h2>
            <p>{t('termsOfService.section8.content')}</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              {(t('termsOfService.section8.liabilities', { returnObjects: true }) as string[]).map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-outfit font-bold text-tf-text mb-4">
              {t('termsOfService.section9.title')}
            </h2>
            <p>{t('termsOfService.section9.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-outfit font-bold text-tf-text mb-4">
              {t('termsOfService.section10.title')}
            </h2>
            <p>{t('termsOfService.section10.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-outfit font-bold text-tf-text mb-4">
              {t('termsOfService.section11.title')}
            </h2>
            <p>{t('termsOfService.section11.intro')}</p>
            <p className="mt-4">{t('termsOfService.section11.acceptanceLine')}</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              {(t('termsOfService.section11.compliancePoints', { returnObjects: true }) as string[]).map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="mt-4">
              {t('termsOfService.section11.privacyNote')}{" "}
              <Link
                href="/privacy-policy"
                className="text-tf-amber font-medium no-underline hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-outfit font-bold text-tf-text mb-4">
              {t('termsOfService.section12.title')}
            </h2>
            <p>{t('termsOfService.section12.content')}</p>
          </section>
        </div>
      </div>
    </div>
  );
}

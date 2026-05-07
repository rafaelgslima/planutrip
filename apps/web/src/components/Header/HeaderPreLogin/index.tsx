import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/Logo";
import { LanguageSelector } from "@/components/LanguageSelector";

export function HeaderPreLogin() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((previous) => !previous);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="border-b border-tf-border backdrop-blur-[16px] bg-[rgba(14,11,9,0.8)] sticky top-0 z-40">
        <nav className="max-w-[1200px] mx-auto px-6 h-[62px] flex items-center justify-between">
          <Logo />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1.5">
            <div
              className={`py-2 px-4 rounded-lg transition-all duration-150 ${router.pathname === "/contact" ? "bg-white/10" : "hover:bg-white/10"}`}
            >
              <Link
                href="/contact"
                className="text-sm font-medium text-tf-text no-underline font-outfit"
              >
                {t('nav.contact')}
              </Link>
            </div>
            <div
              className={`py-2 px-4 rounded-lg transition-all duration-150 ${router.pathname === "/login" ? "bg-white/10" : "hover:bg-white/10"}`}
            >
              <Link
                href="/login"
                className="text-sm font-medium text-tf-text no-underline font-outfit"
              >
                {t('nav.logIn')}
              </Link>
            </div>
            <Link
              href="/signup"
              className="py-[9px] px-5 text-sm font-semibold text-[#0E0B09] bg-tf-amber no-underline rounded-[9px] font-outfit tracking-[-0.01em]"
            >
              {t('nav.signUpFree')}
            </Link>
            <LanguageSelector className="ml-2" />
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 rounded-lg text-tf-muted bg-transparent border-none cursor-pointer"
              aria-label={t('nav.openMenu')}
              aria-expanded={isMobileMenuOpen}
              onClick={handleMobileMenuToggle}
            >
              <MdMenu size={20} />
            </button>
          </div>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          className="md:hidden flex flex-col fixed inset-0 z-50 bg-tf-bg overflow-y-auto"
        >
          {/* Mobile header */}
          <div className="h-[62px] flex items-center justify-between border-b border-tf-border px-6">
            <Logo />
            <button
              type="button"
              aria-label={t('nav.closeMenu')}
              onClick={handleMobileMenuClose}
              className="p-2 rounded-lg text-tf-muted bg-transparent border-none cursor-pointer"
            >
              <MdClose size={20} />
            </button>
          </div>

          <div className="flex flex-col h-full px-6 py-8">
            {/* Secondary navigation - subtle and minimal */}
            <Link
              href="/contact"
              onClick={handleMobileMenuClose}
              className="text-sm text-tf-muted hover:text-tf-text transition-colors no-underline font-outfit"
            >
              {t('nav.contact')}
            </Link>

            {/* Spacer - pushes auth buttons to bottom */}
            <div className="flex-1" />

            {/* Language selector */}
            <div className="mb-6 pb-6 border-b border-tf-border">
              <LanguageSelector className="w-full" />
            </div>

            {/* Primary auth actions - prominent and full-width */}
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={handleMobileMenuClose}
                className="py-3 px-4 rounded-lg border border-white/30 text-center text-base font-semibold text-tf-text no-underline font-outfit transition-all duration-150 hover:bg-white/10 hover:border-white/50"
              >
                {t('nav.logIn')}
              </Link>
              <Link
                href="/signup"
                onClick={handleMobileMenuClose}
                className="py-3 px-5 text-base font-semibold text-[#0E0B09] bg-tf-amber no-underline rounded-lg font-outfit tracking-[-0.01em] text-center block w-full transition-all duration-150 hover:bg-[#d4a574]"
              >
                {t('nav.signUpFree')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

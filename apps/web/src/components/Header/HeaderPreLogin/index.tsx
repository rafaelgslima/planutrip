import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { Logo } from "@/components/Logo";

export function HeaderPreLogin() {
  const router = useRouter();
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
                Contact
              </Link>
            </div>
            <div
              className={`py-2 px-4 rounded-lg transition-all duration-150 ${router.pathname === "/login" ? "bg-white/10" : "hover:bg-white/10"}`}
            >
              <Link
                href="/login"
                className="text-sm font-medium text-tf-text no-underline font-outfit"
              >
                Log in
              </Link>
            </div>
            <Link
              href="/signup"
              className="py-[9px] px-5 text-sm font-semibold text-[#0E0B09] bg-tf-amber no-underline rounded-[9px] font-outfit tracking-[-0.01em]"
            >
              Sign up free
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-tf-muted bg-transparent border-none cursor-pointer"
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
            onClick={handleMobileMenuToggle}
          >
            <MdMenu size={20} />
          </button>
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
              aria-label="Close menu"
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
              Contact
            </Link>

            {/* Spacer - pushes auth buttons to bottom */}
            <div className="flex-1" />

            {/* Primary auth actions - prominent and full-width */}
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={handleMobileMenuClose}
                className="py-3 px-4 rounded-lg border border-white/30 text-center text-base font-semibold text-tf-text no-underline font-outfit transition-all duration-150 hover:bg-white/10 hover:border-white/50"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={handleMobileMenuClose}
                className="py-3 px-5 text-base font-semibold text-[#0E0B09] bg-tf-amber no-underline rounded-lg font-outfit tracking-[-0.01em] text-center block w-full transition-all duration-150 hover:bg-[#d4a574]"
              >
                Sign up free
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

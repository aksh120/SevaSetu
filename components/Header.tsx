"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { BridgeMark } from "@/components/BridgeMark";
import { useCopy, useLang } from "@/components/LanguageProvider";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/components/AuthProvider";

export default function Header() {
  const t = useCopy();
  const { lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const links = [
    {
      href: "/roadmap",
      label: t.nav.roadmap,
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
          <line x1="9" y1="3" x2="9" y2="18" />
          <line x1="15" y1="6" x2="15" y2="21" />
        </svg>
      ),
    },
    {
      href: "/dashboard",
      label: t.nav.dashboard,
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      ),
    },
    {
      href: "/notice-translator",
      label: t.nav.noticesFull,
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Indian Tricolor Stripe */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[2147483647] flex h-[7px] print:hidden shadow-[0_1px_0_rgba(0,0,0,0.25)]"
        aria-label="Indian tricolor"
        role="img"
      >
        <div className="h-full flex-1 bg-[#138808]" />
        <div className="h-full flex-1" style={{ backgroundColor: "#ffffff" }} />
        <div className="h-full flex-1 bg-[#FF9933]" />
      </div>

      <header className="relative z-40 bg-bridge pt-[7px] text-white print:hidden w-full max-w-[100vw] overflow-hidden">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3 px-3 sm:px-6 min-w-0">
          {/* Brand Logo */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-1.5 sm:gap-2 text-base font-bold tracking-tight hover:text-white/90 sm:text-lg"
            >
              <BridgeMark className="h-4 w-7 shrink-0 text-marigold sm:h-4.5 sm:w-8" />
              <span>SevaSetu</span>
            </Link>
            <span className="truncate border-l border-white/25 pl-2 sm:pl-3 font-mono text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-wider text-white/75 min-w-0">
              {t.headerTagline}
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main" className="hidden md:flex items-center gap-5 lg:gap-6">
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`border-b-2 py-1 text-sm font-medium transition-colors hover:text-white ${
                    active
                      ? "border-marigold text-white font-semibold"
                      : "border-transparent text-white/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Desktop About Build Pill */}
            <Link
              href="/about"
              className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 hover:border-marigold/60 hover:bg-white/20 hover:text-white transition-all shadow-sm"
            >
              <span>{lang === "hi" ? "प्रोजेक्ट विवरण" : "About Build"}</span>
            </Link>
          </nav>

          {/* Desktop Header Controls (Language, Theme, and Auth) */}
          <div className="hidden md:flex shrink-0 items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />

            {/* Auth State Button */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs shadow-inner">
                <span className="flex h-2 w-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.9)] ring-1 ring-white/40" aria-hidden="true" />
                <span className="font-medium text-white/90 truncate max-w-[110px]">
                  {user?.id || "Trustee"}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  title={t.login.signOut}
                  className="ml-1 text-[11px] font-semibold text-marigold hover:underline"
                >
                  {t.login.signOut}
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 rounded-md border border-marigold bg-marigold/20 px-3 py-1 text-xs font-bold text-white hover:bg-marigold hover:text-ink transition-all shadow-sm"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>{lang === "hi" ? "साइन इन" : "Sign In"}</span>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="flex h-9 w-9 items-center justify-center rounded border border-white/30 text-white hover:bg-white/10 active:bg-white/20 transition-colors"
            >
              {mobileMenuOpen ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-white/15 bg-bridge-dark px-4 py-4 md:hidden shadow-2xl animate-in slide-in-from-top-2 duration-150">
            {/* User Session Banner in Mobile Menu */}
            {isAuthenticated ? (
              <div className="mb-3 flex items-center justify-between rounded-lg border border-white/20 bg-white/10 p-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.9)] ring-1 ring-white/40" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-bold text-white">{t.login.loggedInAs}</p>
                    <p className="font-mono text-[11px] text-white/70">{user?.id}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="rounded border border-white/25 px-2.5 py-1 font-mono text-xs font-semibold text-marigold hover:bg-white/10"
                >
                  {t.login.signOut}
                </button>
              </div>
            ) : (
              <div className="mb-3">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-marigold/60 bg-marigold/20 px-3 py-2 text-xs font-bold text-white hover:bg-marigold hover:text-ink transition-all"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>{lang === "hi" ? "सरकारी SSO में साइन इन करें" : "Sign In to Government SSO Portal"}</span>
                </Link>
              </div>
            )}

            {/* Primary Navigation Links */}
            <nav aria-label="Mobile Navigation" className="space-y-1.5">
              {links.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex min-h-12 items-center justify-between rounded-lg px-4 py-3 text-base font-semibold transition-colors ${
                      active
                        ? "bg-white/15 text-white"
                        : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-white/70">{link.icon}</span>
                      <span>{link.label}</span>
                    </div>
                    {active && (
                      <span className="font-mono text-xs font-bold text-marigold uppercase tracking-wider">
                        Active
                      </span>
                    )}
                  </Link>
                );
              })}

              {/* "About This Build" Feature Card */}
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="group relative mt-2 block overflow-hidden rounded-xl border border-marigold/40 bg-gradient-to-br from-white/15 via-white/10 to-transparent p-3.5 shadow-md transition-all hover:border-marigold hover:bg-white/20 active:scale-[0.99]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold tracking-tight text-white group-hover:text-marigold transition-colors">
                    {lang === "hi" ? "इस प्रोजेक्ट के बारे में" : "About This Build"}
                  </span>
                  <span className="rounded-full border border-marigold/40 bg-marigold/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-marigold">
                    {lang === "hi" ? "पारदर्शिता" : "Real vs Mocked"}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-snug text-white/75">
                  {lang === "hi"
                    ? "क्या असली है, क्या सिम्युलेटेड है, और आर्किटेक्चर कैसे काम करता है →"
                    : "Plain breakdown of what’s real, what’s simulated, & scale architecture →"}
                </p>
              </Link>
            </nav>

            {/* Mobile Controls: Language Switcher & Dark Mode Toggle */}
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/15 pt-4">
              {/* Language Selector */}
              <div className="flex items-center justify-between rounded-lg border border-white/20 bg-white/5 p-2">
                <span className="font-mono text-xs text-white/70">Language</span>
                <div className="flex rounded overflow-hidden border border-white/30">
                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    className={`px-2.5 py-1 text-xs font-bold ${
                      lang === "en" ? "bg-white text-bridge" : "text-white hover:bg-white/10"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("hi")}
                    className={`px-2.5 py-1 text-xs font-bold ${
                      lang === "hi" ? "bg-white text-bridge" : "text-white hover:bg-white/10"
                    }`}
                  >
                    हिं
                  </button>
                </div>
              </div>

              {/* Theme Selector with Clean Vector SVG Icons */}
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center justify-between rounded-lg border border-white/20 bg-white/5 p-2 text-xs font-medium text-white hover:bg-white/10"
              >
                <span className="font-mono text-white/70">Theme</span>
                <span className="flex items-center gap-1.5 font-semibold">
                  {theme === "dark" ? (
                    <>
                      <svg className="h-3.5 w-3.5 text-marigold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                      <span>Dark</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-3.5 w-3.5 text-marigold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                      </svg>
                      <span>Light</span>
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Primary Action Button */}
            <div className="mt-4 pt-2">
              <Link
                href="/intake"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-12 w-full items-center justify-center rounded-md bg-marigold px-4 py-3 text-base font-bold text-ink shadow-sm hover:bg-[#d69828] active:translate-y-[1px]"
              >
                {t.landing.cta} →
              </Link>
            </div>
          </div>
        )}

        <div className="h-[3px] w-full bg-bridge-dark" aria-hidden="true" />
      </header>
    </>
  );
}
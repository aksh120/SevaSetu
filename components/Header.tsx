"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { BridgeMark } from "@/components/BridgeMark";
import { useCopy } from "@/components/LanguageProvider";

export default function Header() {
  const t = useCopy();
  const pathname = usePathname();

  const links = [
    { href: "/roadmap", label: t.nav.roadmap, short: t.nav.roadmap },
    { href: "/dashboard", label: t.nav.dashboard, short: t.nav.dashboard },
    {
      href: "/notice-translator",
      label: t.nav.noticesFull,
      short: t.nav.notices,
    },
  ];

  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[2147483647] flex h-[7px] print:hidden shadow-[0_1px_0_rgba(0,0,0,0.25)]"
        aria-label="Indian tricolor"
        role="img"
      >
        <div className="h-full flex-1 bg-[#FF9933]" />
        <div className="h-full flex-1 bg-white" />
        <div className="h-full flex-1 bg-[#138808]" />
      </div>
      <header className="bg-bridge pt-[7px] text-white print:hidden">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-end gap-1 px-2 sm:justify-between sm:gap-3 sm:px-6">
          <div className="hidden min-w-0 items-center gap-2.5 sm:flex sm:gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 whitespace-nowrap text-base font-bold tracking-tight hover:text-white/90 sm:gap-2.5 sm:text-lg"
          >
            <BridgeMark className="h-4 w-8 shrink-0 text-marigold" />
            SevaSetu
          </Link>
          <span className="hidden truncate border-l border-white/25 pl-3 font-mono text-[11px] uppercase tracking-wider text-white/70 md:inline">
            {t.headerTagline}
          </span>
        </div>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-4">
            <nav aria-label="Main" className="flex items-center gap-2 sm:gap-5">
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
              className={`whitespace-nowrap border-b-2 pb-0.5 text-xs font-medium hover:text-white sm:text-sm ${
                    active
                      ? "border-marigold text-white"
                      : "border-transparent text-white/80"
                  }`}
                >
                  {link.short ? (
                    <>
                      <span className="hidden sm:inline">{link.label}</span>
                      <span className="sm:hidden">{link.short}</span>
                    </>
                  ) : (
                    link.label
                  )}
                </Link>
              );
            })}
          </nav>
          <LanguageToggle />
          <ThemeToggle />
        </div>
        </div>
        <div className="h-[3px] w-full bg-bridge-dark" aria-hidden="true" />
      </header>
    </>
  );
}
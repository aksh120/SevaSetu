"use client";

import Link from "next/link";
import { useCopy } from "@/components/LanguageProvider";
import { BridgeMark } from "@/components/BridgeMark";
import { REGISTRATIONS } from "@/lib/content";

export default function Footer() {
  const t = useCopy();

  const productLinks = [
    { href: "/roadmap", label: t.nav.roadmap },
    { href: "/dashboard", label: t.nav.dashboard },
    { href: "/notice-translator", label: t.nav.noticesFull },
  ];

  return (
    <footer className="bg-bridge-dark text-white print:hidden">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-base font-bold tracking-tight text-white"
            >
              <BridgeMark className="h-3.5 w-7 text-marigold" />
              SevaSetu
            </Link>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-white/70">
              {t.footer.disclosure}
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-white/50">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
              {t.footer.productTitle}
            </h3>
            <ul className="mt-3 space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/85 underline decoration-white/30 underline-offset-4 hover:decoration-marigold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/85 underline decoration-white/30 underline-offset-4 hover:decoration-marigold"
                >
                  {t.footer.aboutLink}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
              {t.footer.chainTitle}
            </h3>
            <ol aria-label="Registration chain" className="mt-3 space-y-1.5">
              {Object.values(REGISTRATIONS).map((r, i) => (
                <li key={r.id} className="flex items-baseline gap-2 text-sm text-white/75">
                  <span className="font-mono text-[10px] text-marigold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {r.name}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </footer>
  );
}

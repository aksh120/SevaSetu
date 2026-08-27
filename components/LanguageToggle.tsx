"use client";

import { useLang } from "@/components/LanguageProvider";
import type { Lang } from "@/lib/i18n";

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "hi", label: "हिं" },
];

export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Language / भाषा"
      className="flex shrink-0 items-center overflow-hidden rounded border border-white/30 print:hidden"
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setLang(opt.value)}
          aria-pressed={lang === opt.value}
          className={`min-h-8 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide ${
            lang === opt.value
              ? "bg-surface text-bridge"
              : "text-white/80 hover:bg-white/10 hover:text-white"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

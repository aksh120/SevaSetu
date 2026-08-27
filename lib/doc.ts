import type { Lang } from "./i18n";

export function refFor(orgName: string): string {
  let h = 0;
  for (const ch of orgName) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return `SS-2026-${String(h % 10000).padStart(4, "0")}`;
}

export function todayLabel(lang: Lang): string {
  return new Date().toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

"use client";

import { useState } from "react";
import MockedBadge from "@/components/MockedBadge";
import { useCopy } from "@/components/LanguageProvider";

interface TranslationResult {
  means: string;
  do_next: string;
  deadline: string;
}

const EXAMPLE_NOTICE = `OFFICE OF THE REGISTRAR (ILLUSTRATIVE EXAMPLE)
Ref: ILL/2026/00000

Sub: Reminder  -  pending annual activity report for FY 2025-26

The registry notes that the annual report of activities for your organisation for FY 2025-26 has not been received, notwithstanding that the prescribed period for submission has elapsed.

You are therefore directed to submit the said report, in the prescribed format, through the online portal within 30 (thirty) days of the date of this letter.

Be pleased to note that continued non-submission may adversely affect the standing of your organisation and its eligibility for renewals and consequential registrations.`;

type ErrorKind = "empty_text" | "not_configured" | "generic" | null;

export default function NoticeTranslatorPage() {
  const t = useCopy();
  const [noticeText, setNoticeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [errorKind, setErrorKind] = useState<ErrorKind>(null);

  const onTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeText.trim()) {
      setErrorKind("empty_text");
      setResult(null);
      return;
    }
    setLoading(true);
    setErrorKind(null);
    setResult(null);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: noticeText }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorKind(data?.error === "not_configured" ? "not_configured" : "generic");
        return;
      }
      setResult({ means: data.means, do_next: data.do_next, deadline: data.deadline });
    } catch {
      setErrorKind("generic");
    } finally {
      setLoading(false);
    }
  };

  const sections: { label: string; value?: string }[] = [
    { label: t.translator.means, value: result?.means },
    { label: t.translator.doNext, value: result?.do_next },
    { label: t.translator.deadline, value: result?.deadline },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {t.translator.headline}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-ink/80">{t.translator.subhead}</p>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[7fr_5fr]">
        <div className="min-w-0">
          <form
            onSubmit={onTranslate}
            className="rounded-lg border border-mist border-t-2 border-t-bridge bg-white p-5 sm:p-6"
          >
            <label htmlFor="notice-text" className="block text-base font-semibold text-ink">
              {t.translator.noticeLabel}
            </label>
            <textarea
              id="notice-text"
              value={noticeText}
              onChange={(e) => setNoticeText(e.target.value)}
              placeholder={t.translator.placeholder}
              rows={12}
              maxLength={8000}
              className="mt-2 w-full rounded-md border border-mist bg-white p-3.5 text-base leading-relaxed text-ink placeholder:text-ink/40"
            />
            {errorKind === "empty_text" && (
              <p role="alert" className="mt-2 text-sm font-medium text-status-error">
                {t.translator.emptyError}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setNoticeText(EXAMPLE_NOTICE);
                  setErrorKind(null);
                }}
                className="inline-flex min-h-10 items-center rounded-md border border-mist bg-white px-4 py-2 text-sm font-medium text-bridge hover:border-bridge"
              >
                {t.translator.loadExample}
                <span className="ml-1.5 font-mono text-[10px] uppercase tracking-wider text-ink/50">
                  {t.translator.illustrativeTag}
                </span>
              </button>
              <button
                type="button"
                title="Mocked in this prototype — no file is read."
                className="inline-flex min-h-10 items-center gap-1.5 rounded-md border border-mist bg-white px-4 py-2 text-sm font-medium text-ink/70"
              >
                {t.translator.uploadInstead}
                <MockedBadge />
              </button>
              <button
                type="submit"
                disabled={loading}
                className="ml-auto inline-flex min-h-11 items-center rounded-md bg-bridge px-6 py-2.5 text-base font-semibold text-white shadow-[0_2px_0_0_#0d3237] enabled:hover:bg-bridge-light enabled:active:translate-y-[1px] enabled:active:shadow-none disabled:cursor-wait disabled:bg-mist disabled:text-ink/50 disabled:shadow-none"
              >
                {loading ? t.translator.translating : t.translator.translate}
              </button>
            </div>

            {errorKind === "not_configured" && (
              <p
                role="status"
                className="mt-5 rounded-sm border border-status-warning/40 border-t-2 border-t-marigold bg-status-warning-bg p-4 text-sm leading-relaxed text-status-warning"
              >
                {t.translator.notConfigured}
              </p>
            )}
            {errorKind === "generic" && (
              <p
                role="alert"
                className="mt-5 rounded-sm border border-status-error/30 border-t-2 border-t-status-error bg-status-error-bg p-4 text-sm leading-relaxed text-status-error"
              >
                {t.translator.genericError}
              </p>
            )}
          </form>
        </div>

        <div className="space-y-4">
          <section
            aria-live="polite"
            aria-busy={loading}
            className="overflow-hidden rounded-lg border border-mist bg-white"
          >
            <div className="border-b border-mist bg-paper px-5 py-3">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-bridge">
                {t.translator.side.outputTitle}
              </p>
            </div>

            {result ? (
              <dl className="divide-y divide-mist">
                {sections.map((s) => (
                  <div key={s.label} className="px-5 py-4">
                    <dt className="text-sm font-semibold uppercase tracking-wide text-ink/60">
                      {s.label}
                    </dt>
                    <dd className="mt-1.5 text-base leading-relaxed text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
            ) : loading ? (
              <div className="space-y-5 p-5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="animate-pulse space-y-2">
                    <div className="h-3 w-28 rounded bg-mist" />
                    <div className="h-3.5 w-full rounded bg-mist/70" />
                    <div className="h-3.5 w-4/5 rounded bg-mist/70" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-5">
                <p className="text-base font-semibold text-ink">{t.translator.side.idleTitle}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                  {t.translator.side.idleBody}
                </p>
                <div className="mt-4 space-y-2.5 border-t border-mist pt-4">
                  {sections.map((s) => (
                    <p key={s.label} className="flex items-center gap-2 text-sm text-ink/50">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-mist" aria-hidden="true" />
                      {s.label}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="rounded-lg border border-mist bg-white p-5">
            <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45">
              {t.translator.side.howTitle}
            </h2>
            <ol className="mt-3 space-y-3.5">
              {t.translator.side.how.map((step, i) => (
                <li key={step.title} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-bridge font-mono text-xs font-semibold text-bridge"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{step.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink/70">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 border-t border-mist pt-3 text-xs leading-relaxed text-ink/55">
              {t.translator.side.privacyNote}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

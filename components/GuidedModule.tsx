"use client";

import Link from "next/link";
import { useState } from "react";
import StatusBadge from "@/components/StatusBadge";
import MockedBadge from "@/components/MockedBadge";
import { useProfile } from "@/components/ProfileProvider";
import { useCopy, useLang } from "@/components/LanguageProvider";
import { getRegistration } from "@/lib/content";
import { allUploaded, uploadsFor } from "@/lib/progress";
import { fmt } from "@/lib/i18n";
import type { RegistrationContent } from "@/lib/content";

export default function GuidedModule({ content }: { content: RegistrationContent }) {
  const { profile, setUpload, submitStep } = useProfile();
  const t = useCopy();
  const { lang } = useLang();
  const [justSubmitted, setJustSubmitted] = useState(false);

  const localized = getRegistration(content.id, lang) ?? content;

  const step = profile?.roadmap.steps.find((s) => s.id === content.id);
  const status = step?.status ?? "not-started";
  const order = step?.order;
  const flags = uploadsFor(profile?.uploads ?? {}, content.id, content.checklist.length);
  const readyToSubmit = allUploaded(flags);
  const alreadySubmitted = status === "submitted" || status === "approved";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!readyToSubmit || alreadySubmitted) return;
    submitStep(content.id);
    setJustSubmitted(true);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="max-w-reading">
        <Link
          href="/roadmap"
          className="text-sm font-medium text-bridge underline underline-offset-2 hover:text-bridge-light"
        >
          {t.module.back}
        </Link>

        {order !== undefined && (
          <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-widest text-marigold">
            {fmt(t.module.stepKicker, { n: String(order).padStart(2, "0") })}
          </p>
        )}
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {localized.name}
          </h1>
          <StatusBadge status={status} />
        </div>

        <section className="mt-8 border-t border-mist pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">
            {t.module.whatItIs}
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink">{localized.whatItIs}</p>
        </section>

        <section className="mt-6 border-t border-mist pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">
            {t.module.whyYouNeedIt}
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink">{localized.whyYouNeedIt}</p>
        </section>

        {!alreadySubmitted && !justSubmitted ? (
          <form onSubmit={onSubmit}>
            <section className="mt-6 border-t border-mist pt-6">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">
                  {t.module.whatYoullNeed}
                </h2>
                <MockedBadge label={t.badges.mockedUpload} />
              </div>
              <p className="mt-1 text-sm text-ink/60">{t.module.uploadsNote}</p>
              <ul className="mt-3 space-y-2.5">
                {localized.checklist.map((item, i) => (
                  <li
                    key={item}
                    className={`rounded-md border p-3.5 transition-colors ${
                      flags[i]
                        ? "border-status-success/50 bg-status-success-bg/40"
                        : "border-mist bg-white hover:border-ink/25"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <label className="flex min-h-6 cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          checked={flags[i]}
                          onChange={(e) => setUpload(content.id, i, e.target.checked)}
                          className="mt-0.5 h-4.5 w-4.5 shrink-0"
                        />
                        <span
                          className={`text-base leading-snug ${
                            flags[i] ? "text-ink/60 line-through decoration-ink/30" : "text-ink"
                          }`}
                        >
                          {item}
                        </span>
                      </label>
                      {flags[i] ? (
                        <span className="inline-flex shrink-0 items-center gap-1 font-mono text-xs font-medium uppercase tracking-wide text-status-success">
                          <span aria-hidden="true">✓</span> {t.module.uploaded}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setUpload(content.id, i, true)}
                          className="shrink-0 rounded-md border border-bridge bg-white px-3 py-1.5 text-sm font-semibold text-bridge hover:bg-bridge hover:text-white"
                        >
                          {t.module.upload}
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-6 border-t border-mist pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">
                {t.module.timeline}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-ink">{localized.timeline}</p>
              <p className="mt-1.5 font-mono text-xs uppercase tracking-wider text-ink/50">
                {t.module.timelineCaption}
              </p>
            </section>

            <div className="mt-8 rounded-lg border border-mist border-t-2 border-t-bridge bg-white p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span title={t.module.submitHint}>
                  <button
                    type="submit"
                    disabled={!readyToSubmit}
                    className="inline-flex min-h-11 items-center rounded-md bg-bridge px-5 py-2.5 text-base font-semibold text-white shadow-[0_2px_0_0_#0d3237] enabled:hover:bg-bridge-light enabled:active:translate-y-[1px] enabled:active:shadow-none disabled:cursor-not-allowed disabled:bg-mist disabled:text-ink/50 disabled:shadow-none"
                  >
                    {t.module.submit}
                  </button>
                </span>
                <MockedBadge label={t.badges.noOffice} />
              </div>
              {!readyToSubmit && (
                <p className="mt-2 text-sm text-ink/60">{t.module.submitHint}</p>
              )}
            </div>
          </form>
        ) : (
          <section
            aria-live="polite"
            className="mt-8 rounded-lg border border-mist border-t-4 border-t-status-success bg-white p-5"
          >
            <h2 className="text-xl font-bold tracking-tight text-ink">{t.module.submitted}</h2>
            <p className="mt-2 text-base leading-relaxed text-ink/80">{localized.afterSubmit}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="inline-flex min-h-10 items-center rounded-md bg-bridge px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_0_0_#0d3237] hover:bg-bridge-light active:translate-y-[1px] active:shadow-none"
              >
                {t.module.goToDashboard}
              </Link>
              <Link
                href="/roadmap"
                className="inline-flex min-h-10 items-center rounded-md border border-bridge bg-white px-4 py-2 text-sm font-semibold text-bridge hover:bg-bridge hover:text-white"
              >
                {t.module.backToRoadmap}
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

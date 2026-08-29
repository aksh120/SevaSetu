"use client";

import Link from "next/link";
import { useState } from "react";
import StatusBadge from "@/components/StatusBadge";
import MockedBadge from "@/components/MockedBadge";
import MockDigiLockerModal from "@/components/MockDigiLockerModal";
import { useProfile } from "@/components/ProfileProvider";
import { useRequireAuth } from "@/components/AuthProvider";
import { useCopy, useLang } from "@/components/LanguageProvider";
import { getRegistration } from "@/lib/content";
import { allUploaded, uploadsFor } from "@/lib/progress";
import { fmt } from "@/lib/i18n";
import type { RegistrationContent } from "@/lib/content";

export default function GuidedModule({ content }: { content: RegistrationContent }) {
  const { isAuthenticated, isReady } = useRequireAuth();
  const { profile, setUpload, setAllUploads, submitStep } = useProfile();
  const t = useCopy();
  const { lang } = useLang();
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [isDigiLockerOpen, setIsDigiLockerOpen] = useState(false);
  const [digiLockerSuccess, setDigiLockerSuccess] = useState(false);

  const localized = getRegistration(content.id, lang) ?? content;

  const step = profile?.roadmap.steps.find((s) => s.id === content.id);
  const status = step?.status ?? "not-started";
  const order = step?.order;
  const flags = uploadsFor(profile?.uploads ?? {}, content.id, content.checklist.length);
  const readyToSubmit = allUploaded(flags);
  const alreadySubmitted = status === "submitted" || status === "approved";

  const currentStepIndex = profile?.roadmap.steps.findIndex((s) => s.id === content.id) ?? -1;
  const nextRoadmapStep =
    currentStepIndex >= 0 && profile?.roadmap.steps && currentStepIndex + 1 < profile.roadmap.steps.length
      ? profile.roadmap.steps[currentStepIndex + 1]
      : null;
  const nextLocalized = nextRoadmapStep ? getRegistration(nextRoadmapStep.id, lang) : null;

  const handleDigiLockerImport = () => {
    setAllUploads(content.id, content.checklist.length, true);
    setDigiLockerSuccess(true);
    setTimeout(() => setDigiLockerSuccess(false), 5000);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!readyToSubmit || alreadySubmitted) return;
    submitStep(content.id);
    setJustSubmitted(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!isReady || !isAuthenticated) {
    return (
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center p-20 font-mono text-sm text-ink/60">
        Redirecting to SSO login…
      </div>
    );
  }

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
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">
                    {t.module.whatYoullNeed}
                  </h2>
                  <MockedBadge label={t.badges.mockedUpload} />
                </div>
                <button
                  type="button"
                  onClick={() => setIsDigiLockerOpen(true)}
                  className="inline-flex items-center gap-2 rounded-md border border-bridge/40 bg-bridge/10 px-3 py-1.5 text-xs font-semibold text-bridge hover:border-bridge hover:bg-bridge hover:text-white transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path
                      d="M7.5 10V6.5C7.5 4.01 9.51 2 12 2C14.49 2 16.5 4.01 16.5 6.5V10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <rect
                      x="4"
                      y="10"
                      width="16"
                      height="11.5"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <circle cx="12" cy="15" r="1.2" fill="currentColor" />
                  </svg>
                  {t.module.digilockerBtn}
                </button>
              </div>

              {digiLockerSuccess && (
                <div className="mt-3 flex items-center gap-2 rounded-md border border-status-success/50 bg-status-success-bg/60 p-3 text-xs font-medium text-status-success animate-in fade-in">
                  <span aria-hidden="true">✓</span>
                  <span>
                    {fmt(t.digilocker.importedSuccess, { count: content.checklist.length })}
                  </span>
                </div>
              )}

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
            className="mt-8 rounded-lg border border-mist border-t-4 border-t-status-success bg-white p-5 sm:p-6 shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-status-success-bg text-sm font-bold text-status-success">
                ✓
              </span>
              <h2 className="text-xl font-bold tracking-tight text-ink">{t.module.submitted}</h2>
            </div>
            <p className="mt-2 text-base leading-relaxed text-ink/80">{localized.afterSubmit}</p>

            {nextRoadmapStep && nextLocalized ? (
              <div className="mt-6 rounded-lg border border-mist bg-paper/70 p-4 sm:p-5">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-marigold-deep">
                  → {t.module.nextStepLabel}
                </p>
                <h3 className="mt-1 text-base font-bold text-ink sm:text-lg">
                  {nextRoadmapStep.order}. {nextLocalized.name}
                </h3>
                <p className="mt-1 text-sm text-ink/75 leading-relaxed">
                  {nextLocalized.whyLine || nextLocalized.whyYouNeedIt}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/module/${nextRoadmapStep.id}`}
                    className="inline-flex min-h-10 items-center justify-center rounded-md bg-bridge px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_0_0_#0d3237] hover:bg-bridge-light active:translate-y-[1px] active:shadow-none transition-all"
                  >
                    {fmt(t.module.goToNextStep, { name: nextLocalized.name })}
                  </Link>
                  <Link
                    href="/dashboard"
                    className="inline-flex min-h-10 items-center justify-center rounded-md border border-bridge bg-white px-4 py-2 text-sm font-semibold text-bridge hover:bg-bridge hover:text-white transition-colors"
                  >
                    {t.module.goToDashboard}
                  </Link>
                  <Link
                    href="/roadmap"
                    className="inline-flex min-h-10 items-center justify-center rounded-md border border-mist bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-paper transition-colors"
                  >
                    {t.module.backToRoadmap}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-lg border border-mist bg-paper/70 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-sm font-bold text-status-success">
                  <svg className="h-5 w-5 fill-current text-marigold" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span>{t.module.allStepsDone}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/dashboard"
                    className="inline-flex min-h-10 items-center justify-center rounded-md bg-bridge px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_0_0_#0d3237] hover:bg-bridge-light active:translate-y-[1px] active:shadow-none transition-all"
                  >
                    {t.module.goToDashboard}
                  </Link>
                  <Link
                    href="/roadmap"
                    className="inline-flex min-h-10 items-center justify-center rounded-md border border-bridge bg-white px-4 py-2 text-sm font-semibold text-bridge hover:bg-bridge hover:text-white transition-colors"
                  >
                    {t.module.backToRoadmap}
                  </Link>
                </div>
              </div>
            )}
          </section>
        )}
      </div>

      <MockDigiLockerModal
        isOpen={isDigiLockerOpen}
        onClose={() => setIsDigiLockerOpen(false)}
        onImportAll={handleDigiLockerImport}
        moduleName={localized.name}
      />
    </div>
  );
}

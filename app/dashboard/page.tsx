"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import BridgeProgress from "@/components/BridgeProgress";
import StatusBadge from "@/components/StatusBadge";
import MockedBadge from "@/components/MockedBadge";
import ProBonoCANetwork from "@/components/ProBonoCANetwork";
import { useProfile } from "@/components/ProfileProvider";
import { useRequireAuth } from "@/components/AuthProvider";
import { useCopy, useLang } from "@/components/LanguageProvider";
import { stepDisplay } from "@/lib/content";
import { refFor, todayLabel } from "@/lib/doc";
import { fmt } from "@/lib/i18n";
import { progressOf } from "@/lib/progress";

export default function DashboardPage() {
  const { isAuthenticated, isReady } = useRequireAuth();
  const { profile, resetProfile } = useProfile();
  const router = useRouter();
  const t = useCopy();
  const { lang } = useLang();

  if (!isReady || !isAuthenticated) {
    return (
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center p-20 font-mono text-sm text-ink/60">
        Redirecting to SSO login…
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-reading rounded-sm border border-mist bg-white p-6 sm:p-8">
          <h1 className="text-xl font-bold tracking-tight text-ink">
            {t.dashboard.emptyTitle}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink/80">
            {t.dashboard.emptyBody}
          </p>
          <Link
            href="/intake"
            className="mt-5 inline-flex min-h-11 items-center rounded-md bg-bridge px-5 py-2.5 text-base font-semibold text-white shadow-[0_2px_0_0_#0d3237] hover:bg-bridge-light active:translate-y-[1px] active:shadow-none"
          >
            {t.dashboard.startCta}
          </Link>
        </div>
      </div>
    );
  }

  const { answers, roadmap } = profile;
  const { total, complete, nextIndex, nextStep } = progressOf(roadmap);
  const pct = total === 0 ? 0 : Math.round((complete / total) * 100);
  const allApproved = roadmap.steps.every((s) => s.status === "approved");
  const nextDisplay = nextStep ? stepDisplay(nextStep.id, lang) : null;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="overflow-hidden rounded-lg border border-mist border-t-2 border-t-bridge bg-white">
        <div className="flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-ink break-words sm:text-4xl">
                {fmt(t.dashboard.title, { org: answers.orgName })}
              </h1>
              <MockedBadge label={t.badges.simulatedStatuses} />
              {profile.caReview && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-status-success/40 bg-status-success-bg px-2.5 py-0.5 font-mono text-xs font-bold text-status-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                  <span>{profile.caReview.ref} • CA Review In Progress</span>
                </span>
              )}
            </div>
            <p className="mt-2 text-base text-ink/75">{t.dashboard.reviewNote}</p>
          </div>
          <div className="grid shrink-0 grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4 sm:gap-x-8 lg:grid-cols-2 lg:border-l lg:border-mist lg:pl-8 xl:grid-cols-4">
            {(
              [
                [t.doc.preparedFor, answers.orgName, false],
                [t.doc.refLabel, refFor(answers.orgName), false],
                [t.doc.generatedLabel, todayLabel(lang), true],
                [t.doc.stepsLabel, `${roadmap.steps.length}`, false],
              ] as [string, string, boolean][]
            ).map(([label, value, hydrate]) => (
              <div key={label}>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/45">
                  {label}
                </p>
                <p className="mt-0.5 truncate text-sm font-medium text-ink" suppressHydrationWarning={hydrate}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-[1.1fr_1.1fr_1fr]">
        <div className="rounded-lg border border-mist border-t-2 border-t-bridge bg-white p-5">
          <h2 className="text-base font-semibold text-ink">{t.dashboard.progressHeading}</h2>
          <p className="mt-3 flex items-baseline gap-1.5">
            <span className="font-mono text-5xl font-semibold leading-none text-ink">
              {complete}
            </span>
            <span className="font-mono text-2xl leading-none text-ink/35">/{total}</span>
          </p>
          <p className="mt-1.5 text-sm text-ink/60">{t.dashboard.progressLabel}</p>
          <div
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={fmt(t.dashboard.progressAria, { done: complete, total })}
            className="mt-4 h-3 w-full overflow-hidden rounded-sm bg-mist"
          >
            <div
              className="h-full rounded-full bg-bridge transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-3 border-t border-mist pt-3 text-xs leading-snug text-ink/60">
            {t.dashboard.reviewNote}
          </p>
        </div>

        <div className="rounded-lg border border-mist bg-white p-5">
          <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45">
            {t.roadmap.side.legendTitle}
          </h2>
          <div className="mt-3 rounded-md bg-[#fbfcfa] px-1 py-3">
            <BridgeProgress total={total} completed={complete} current={nextIndex} compact />
          </div>
          <ul className="mt-4 space-y-2 border-t border-mist pt-3 text-sm">
            <li className="flex items-center gap-2.5">
              <span className="inline-block h-3 w-3 rounded-sm bg-bridge" aria-hidden="true" />
              {t.roadmap.side.legendComplete}
            </li>
            <li className="flex items-center gap-2.5">
              <span className="inline-block h-3 w-3 rounded-sm bg-marigold" aria-hidden="true" />
              {t.roadmap.side.legendCurrent}
            </li>
            <li className="flex items-center gap-2.5">
              <span className="inline-block h-3 w-3 rounded-sm border border-ink/30 bg-white" aria-hidden="true" />
              {t.roadmap.side.legendUpNext}
            </li>
          </ul>
        </div>

        {nextStep && nextDisplay ? (
          <Link
            href={`/module/${nextStep.id}`}
            className="group flex flex-col justify-between rounded-lg border border-mist border-l-4 border-l-marigold bg-white p-5 hover:border-marigold"
          >
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-marigold-deep">
                {t.dashboard.nextUp}
              </p>
              <h2 className="mt-1.5 text-lg font-semibold leading-snug tracking-tight text-ink group-hover:text-bridge-light">
                {nextDisplay.name}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{nextDisplay.why}</p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-bridge group-hover:text-bridge-light">
              {nextStep.status === "not-started" ? t.roadmap.startStep : t.roadmap.continueCta}
              <span
                aria-hidden="true"
                className="transition-transform duration-150 group-hover:translate-x-0.5"
              >
                →
              </span>
            </span>
          </Link>
        ) : (
          <div className="rounded-lg border border-mist border-t-2 border-t-status-success bg-white p-5">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-status-success">
              {allApproved ? t.dashboard.allApprovedTitle : t.dashboard.allSubmittedTitle}
            </p>
            <p className="mt-2 text-base leading-relaxed text-ink/80">
              {allApproved
                ? fmt(t.dashboard.allApprovedBody, { org: answers.orgName })
                : fmt(t.dashboard.allSubmittedBody, { org: answers.orgName })}
            </p>
          </div>
        )}
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight text-ink">{t.dashboard.allSteps}</h2>
        <ol aria-label="Dashboard steps" className="mt-3 divide-y divide-mist overflow-hidden rounded-lg border border-mist bg-white">
          {roadmap.steps.map((step) => {
            const display = stepDisplay(step.id, lang);
            return (
              <li key={step.id}>
                <Link
                  href={`/module/${step.id}`}
                  className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-paper sm:px-5"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="font-mono text-sm font-semibold text-ink/40">
                      {String(step.order).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-base font-medium text-ink">
                        {display.name}
                      </span>
                      <span className="block truncate text-xs text-ink/55">{display.why}</span>
                    </span>
                  </span>
                  <StatusBadge status={step.status} />
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Verified Pro-Bono CA Network Interactive Card */}
      <ProBonoCANetwork variant="card" className="mt-8" />

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <section className="rounded-lg border border-mist border-t-2 border-t-bridge bg-white p-5">
          <h2 className="text-base font-semibold text-ink">{t.dashboard.translatorCardTitle}</h2>
          <p className="mt-1.5 text-base leading-relaxed text-ink/80">
            {t.dashboard.translatorCardBody}
          </p>
          <Link
            href="/notice-translator"
            className="mt-4 inline-flex min-h-10 items-center gap-1.5 rounded-sm border border-bridge px-4 py-2 text-sm font-semibold text-bridge hover:bg-bridge hover:text-white"
          >
            {t.dashboard.openTranslator}
          </Link>
        </section>

        <section className="rounded-lg border border-mist bg-white p-5">
          <h2 className="text-base font-semibold text-ink">{t.about.title}</h2>
          <p className="mt-1.5 text-base leading-relaxed text-ink/80">{t.about.intro}</p>
          <Link
            href="/about"
            className="mt-4 inline-flex min-h-10 items-center rounded-sm border border-bridge px-4 py-2 text-sm font-semibold text-bridge hover:bg-bridge hover:text-white"
          >
            {t.footer.aboutLink}
          </Link>
        </section>
      </div>

      <div className="mt-8 border-t border-mist pt-4">
        <button
          type="button"
          onClick={() => {
            resetProfile();
            router.push("/");
          }}
          className="min-h-9 text-sm font-medium text-ink/50 underline underline-offset-2 hover:text-ink"
        >
          {t.dashboard.startOver}
        </button>
      </div>
    </div>
  );
}

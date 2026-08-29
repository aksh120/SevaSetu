"use client";

import Link from "next/link";
import BridgeProgress from "@/components/BridgeProgress";
import StatusBadge from "@/components/StatusBadge";
import MockedBadge from "@/components/MockedBadge";
import ProBonoCANetwork from "@/components/ProBonoCANetwork";
import { useProfile } from "@/components/ProfileProvider";
import { useRequireAuth } from "@/components/AuthProvider";
import { useCopy, useLang } from "@/components/LanguageProvider";
import { REGISTRATIONS, stepDisplay } from "@/lib/content";
import { refFor, todayLabel } from "@/lib/doc";
import { fmt } from "@/lib/i18n";
import { isStepComplete, progressOf } from "@/lib/progress";

function StepMarker({
  order,
  state,
}: {
  order: number;
  state: "complete" | "current" | "todo";
}) {
  return (
    <span
      aria-hidden="true"
      className={`relative flex h-11 w-11 shrink-0 items-center justify-center border-2 font-mono text-xs font-semibold transition-all duration-300 ${
        state === "complete"
          ? "border-bridge bg-bridge text-white shadow-[0_0_0_5px_rgba(20,70,77,0.09)]"
          : state === "current"
            ? "border-marigold bg-marigold text-white shadow-[0_0_0_6px_rgba(193,134,31,0.15)]"
            : "border-mist bg-paper text-ink/50"
      }`}
      style={{ clipPath: "polygon(50% 0%, 100% 24%, 100% 76%, 50% 100%, 0% 76%, 0% 24%)" }}
    >
      {state === "complete" ? "✓" : String(order).padStart(2, "0")}
    </span>
  );
}

export default function RoadmapPage() {
  const { isAuthenticated, isReady } = useRequireAuth();
  const { profile } = useProfile();
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
        <div className="max-w-reading rounded-lg border border-mist border-t-2 border-t-bridge bg-white p-6 sm:p-8">
          <h1 className="text-xl font-bold tracking-tight text-ink">{t.roadmap.emptyTitle}</h1>
          <p className="mt-3 text-base leading-relaxed text-ink/80">{t.roadmap.emptyBody}</p>
          <Link
            href="/intake"
            className="mt-5 inline-flex min-h-11 items-center rounded-md bg-bridge px-5 py-2.5 text-base font-semibold text-white shadow-[0_2px_0_0_#0d3237] hover:bg-bridge-light active:translate-y-[1px] active:shadow-none"
          >
            {t.landing.cta}
          </Link>
        </div>
      </div>
    );
  }

  const { answers, roadmap } = profile;
  const { complete, nextIndex, nextStep } = progressOf(roadmap);
  const fcraCallout = roadmap.callouts.find((c) => c.stepId === "fcra");
  const nextDisplay = nextStep ? stepDisplay(nextStep.id, lang) : null;

  const metaCell = (label: string, value: React.ReactNode, hydrate = false) => (
    <div>
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/45">
        {label}
      </p>
      <p className="mt-0.5 truncate text-sm font-medium text-ink" suppressHydrationWarning={hydrate}>
        {value}
      </p>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="hidden print:block">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ink">
          {t.roadmap.printKicker}
        </p>
        <p className="mt-1 text-sm text-ink/80">
          {fmt(t.roadmap.printPrepared, { org: answers.orgName })} · {t.roadmap.printDisclaimer}
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-mist border-t-2 border-t-bridge bg-white">
        <div className="flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-ink break-words sm:text-4xl">
                {t.roadmap.title}
              </h1>
              <MockedBadge label={t.badges.simulatedStatuses} />
            </div>
            <p className="mt-2 text-base leading-relaxed text-ink/75">
              {fmt(t.roadmap.subhead, { org: answers.orgName })}
            </p>
          </div>
          <div className="grid shrink-0 grid-cols-2 gap-x-4 gap-y-3 border-mist sm:grid-cols-4 sm:gap-x-8 lg:grid-cols-2 lg:border-l lg:pl-8 xl:grid-cols-4">
            {metaCell(t.doc.preparedFor, answers.orgName)}
            {metaCell(t.doc.refLabel, refFor(answers.orgName))}
            {metaCell(t.doc.generatedLabel, todayLabel(lang), true)}
            {metaCell(t.doc.stepsLabel, `${roadmap.steps.length}`)}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <div className="overflow-hidden rounded-lg border border-mist bg-white shadow-[0_12px_32px_rgba(22,33,31,0.06)]">
            <div className="bg-[#fbfcfa] px-2 py-4 sm:px-8 sm:py-7">
              <BridgeProgress total={roadmap.steps.length} completed={complete} current={nextIndex} />
            </div>
            <div className="grid grid-cols-3 border-t border-mist text-center text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-xs">
              <div className="border-r border-mist px-2 py-3 text-bridge"><span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-bridge" />{t.roadmap.side.legendComplete}</div>
              <div className="border-r border-mist px-2 py-3 text-marigold-deep"><span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-marigold" />{t.roadmap.side.legendCurrent}</div>
              <div className="px-2 py-3 text-ink/45"><span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-mist" />{t.roadmap.side.legendUpNext}</div>
            </div>
          </div>

          <ol aria-label="Roadmap steps" className="mt-8">
            {roadmap.steps.map((step, idx) => {
              const display = stepDisplay(step.id, lang);
              const done = isStepComplete(step);
              const markerState = done
                ? "complete"
                : step.id === roadmap.steps[nextIndex]?.id
                  ? "current"
                  : "todo";
              return (
                <li key={step.id} className="relative flex gap-4 pb-6 last:pb-0 sm:gap-5">
                  {idx < roadmap.steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-5 top-11 h-[calc(100%-2.75rem)] w-0.5 bg-mist"
                    />
                  )}
                  <div className="relative z-10 flex flex-col items-center">
                    <StepMarker order={step.order} state={markerState} />
                  </div>
                  <article className={`relative flex-1 border p-5 transition-all duration-300 sm:p-6 ${
                    markerState === "current"
                      ? "border-marigold bg-[#fffdf7] shadow-[0_10px_24px_rgba(193,134,31,0.10)]"
                      : done
                        ? "border-bridge/20 bg-white"
                        : "border-mist bg-white hover:border-ink/25"
                  }`}>
                    {markerState === "current" && (
                      <span className="absolute -top-px left-5 -translate-y-1/2 bg-marigold px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                        {t.dashboard.nextUp}
                      </span>
                    )}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h2 className="text-lg font-semibold tracking-tight text-ink">
                          {display.name}
                        </h2>
                        <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink/70">
                          {display.why}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3 sm:pt-0.5">
                        <StatusBadge status={step.status} />
                        {!done && (
                          <Link
                            href={`/module/${step.id}`}
                            className="inline-flex min-h-10 items-center rounded-md border border-bridge bg-white px-3.5 py-2 text-sm font-semibold text-bridge shadow-[0_2px_0_0_#dce3e0] hover:bg-bridge hover:text-white active:translate-y-[1px] active:shadow-none print:hidden"
                          >
                            {step.status === "not-started" ? t.roadmap.startStep : t.roadmap.continueCta}
                          </Link>
                        )}
                      </div>
                    </div>

                    {fcraCallout && step.id === "fcra" && (
                      <div
                        role="note"
                        className="mt-4 rounded-md border border-status-warning/40 bg-status-warning-bg p-4 print:border-0 print:bg-transparent"
                      >
                        <p className="flex items-start gap-2 text-sm leading-relaxed text-status-warning print:text-ink">
                          <span aria-hidden="true" className="mt-0.5 shrink-0 font-mono">ⓘ</span>
                          <span>{t.roadmap.calloutMessage}</span>
                        </p>
                        <p className="mt-2 pl-6 text-sm leading-relaxed text-status-warning/90 print:text-ink/70">
                          {t.roadmap.calloutHint}
                        </p>
                      </div>
                    )}
                  </article>
                </li>
              );
            })}
          </ol>

          {/* Verified Pro-Bono CA Network Interactive Card */}
          <ProBonoCANetwork variant="card" className="mt-8" />
        </div>

        <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
          <div className="rounded-lg border border-mist bg-white p-5">
            <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45">
              {t.roadmap.side.legendTitle}
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm">
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
            <div className="mt-4 flex gap-2 border-t border-mist pt-4 print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex min-h-9 flex-1 items-center justify-center rounded-md border border-mist bg-white px-3 py-1.5 text-sm font-medium text-ink/70 hover:border-bridge hover:text-bridge"
              >
                {t.roadmap.printButton}
              </button>
              <Link
                href="/intake"
                className="inline-flex min-h-9 flex-1 items-center justify-center rounded-md border border-mist bg-white px-3 py-1.5 text-sm font-medium text-ink/70 hover:border-bridge hover:text-bridge"
              >
                {t.roadmap.changeLink}
              </Link>
            </div>
          </div>

          {nextStep && nextDisplay && (
            <Link
              href={`/module/${nextStep.id}`}
              className="group block rounded-lg border border-mist border-l-4 border-l-marigold bg-white p-5 hover:border-marigold"
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-marigold-deep">
                {t.dashboard.nextUp}
              </p>
              <h3 className="mt-1.5 text-base font-semibold leading-snug text-ink group-hover:text-bridge-light">
                {nextDisplay.name}
              </h3>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-bridge group-hover:text-bridge-light">
                {nextStep.status === "not-started" ? t.roadmap.startStep : t.roadmap.continueCta}
                <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          )}

          <div className="rounded-lg border border-mist bg-white p-5">
            <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45">
              {t.roadmap.side.chainTitle}
            </h3>
            <ol aria-label="Full chain sidebar" className="mt-3 space-y-1.5">
              {Object.values(REGISTRATIONS).map((r, i) => {
                const inRoute = roadmap.steps.some((s) => s.id === r.id);
                return (
                  <li
                    key={r.id}
                    className={`flex items-baseline gap-2 text-sm ${inRoute ? "font-medium text-ink" : "text-ink/35 line-through decoration-ink/20"}`}
                  >
                    <span className={`font-mono text-[10px] ${inRoute ? "text-marigold" : "text-ink/30"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {r.name}
                  </li>
                );
              })}
            </ol>
            <p className="mt-3 border-t border-mist pt-3 text-xs leading-relaxed text-ink/55">
              {t.roadmap.side.chainNote}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

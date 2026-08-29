"use client";

import Link from "next/link";
import MockedBadge from "@/components/MockedBadge";
import ProBonoCANetwork from "@/components/ProBonoCANetwork";
import { useCopy } from "@/components/LanguageProvider";

export default function AboutPage() {
  const t = useCopy();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 space-y-10">
      {/* Hero / Build Overview Header */}
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-4xl">
          {t.about.title}
        </h1>
        <p className="mt-3 text-base sm:text-lg leading-relaxed text-ink/80">
          {t.about.intro}
        </p>
      </div>

      {/* Target Audience & Problem Statement */}
      <section className="rounded-xl border border-mist bg-white p-6 sm:p-8 shadow-xs">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-ink">
          {t.about.whoHeading}
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink/80">
          {t.about.whoBody}
        </p>
      </section>

      {/* Comprehensive Feature Matrix */}
      {t.about.features && (
        <section className="rounded-xl border border-mist bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-mist pb-4">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-ink">
              {t.about.featuresHeading}
            </h2>
            <span className="font-mono text-xs font-semibold text-ink/50">
              7 Integrated Subsystems
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.about.features.map((feat, idx) => (
              <div
                key={feat.title}
                className="flex flex-col justify-between rounded-lg border border-mist bg-paper/30 p-4 transition-all hover:border-bridge/40 hover:bg-paper/60"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-bridge">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full border border-bridge/25 bg-bridge/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-bridge">
                      {feat.tag}
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm sm:text-base font-bold text-ink">
                    {feat.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-ink/70">
                    {feat.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Radical Honesty: Real vs Mocked Matrix */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-mist bg-white p-6 shadow-xs">
          <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink border-b border-mist pb-3">
            <span aria-hidden="true" className="text-status-success font-bold text-xl">✓</span>
            <span>{t.about.realHeading}</span>
          </h2>
          <ul className="mt-4 space-y-4">
            {t.about.real.map((item) => (
              <li key={item.title} className="rounded-lg border border-status-success/20 bg-status-success-bg/30 p-3.5">
                <h3 className="text-sm font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-ink/75">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-mist bg-white p-6 shadow-xs">
          <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink border-b border-mist pb-3">
            <MockedBadge label={t.badges.mocked} />
            <span>{t.about.mockedHeading}</span>
          </h2>
          <ul className="mt-4 space-y-4">
            {t.about.mocked.map((item) => (
              <li key={item.title} className="rounded-lg border border-mist bg-paper/40 p-3.5">
                <h3 className="text-sm font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-ink/70">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Future Scaling & National Rollout Roadmap */}
      <section className="rounded-xl border border-mist bg-white p-6 sm:p-8 shadow-xs">
        <div className="border-b border-mist pb-4">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-ink">
            {t.about.scalingHeading}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-ink/65">
            Architectural steps to expand SevaSetu into a national-scale public utility.
          </p>
        </div>

        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.about.scaling.map((step, i) => (
            <li key={step.title} className="flex flex-col justify-between rounded-lg border border-mist bg-paper/20 p-4">
              <div>
                <span className="font-mono text-sm font-bold text-marigold-deep">
                  Pillar {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-sm sm:text-base font-bold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-ink/70">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Interactive Demo for Verified Pro-Bono CA Network */}
      <div>
        <div className="mb-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink/50">
            Interactive Subsystem Demonstration
          </span>
        </div>
        <ProBonoCANetwork variant="card" />
      </div>

      {/* Standing Disclaimer & Navigation */}
      <section className="rounded-xl border border-mist border-t-4 border-t-bridge bg-white p-6 sm:p-8 shadow-xs">
        <h2 className="text-base sm:text-lg font-bold text-ink">{t.about.disclaimerHeading}</h2>
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink/75">{t.about.disclaimerBody}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-md bg-bridge px-5 py-2.5 text-sm font-semibold text-white shadow-[0_2px_0_0_#0d3237] hover:bg-bridge-light active:translate-y-[1px] active:shadow-none transition-all"
          >
            {t.about.back}
          </Link>
          <Link
            href="/roadmap"
            className="inline-flex min-h-11 items-center rounded-md border border-bridge px-5 py-2.5 text-sm font-semibold text-bridge hover:bg-bridge hover:text-white transition-all"
          >
            View Personalized Roadmap →
          </Link>
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import DemoSeed from "@/components/DemoSeed";
import BridgeProgress from "@/components/BridgeProgress";
import { useCopy } from "@/components/LanguageProvider";
import { REGISTRATIONS } from "@/lib/content";

const STEPS = [0, 1, 2];

export default function LandingPage() {
  const t = useCopy();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="max-w-4xl">
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl">
          {t.landing.headline}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80 sm:text-xl">
          {t.landing.subhead}
        </p>
        <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Link
            href="/intake"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-bridge px-6 py-3 text-base font-semibold text-white shadow-[0_2px_0_0_#0d3237] hover:bg-bridge-light active:translate-y-[1px] active:shadow-none sm:w-auto"
          >
            {t.landing.cta}
          </Link>
          <DemoSeed />
        </div>
        <p className="mt-3 text-sm text-ink/60">{t.landing.smallPrint}</p>
      </div>

      <div className="mt-14 grid gap-8 border-t border-mist pt-10 sm:grid-cols-[1fr_1.6fr] sm:gap-10">
        <figure className="order-2 rounded-lg border border-mist bg-white p-5 sm:order-1 sm:p-6">
          <BridgeProgress total={7} completed={4} current={4} />
          <figcaption className="mt-4 border-t border-mist pt-3 text-sm leading-relaxed text-ink/60">
            {t.landing.bridgeCaption}
          </figcaption>
        </figure>

        <div className="order-1 sm:order-2">
          <div className="grid gap-8 sm:grid-cols-1">
            {STEPS.map((i) => (
              <div key={i} className="flex gap-4 border-b border-mist pb-6 last:border-0 last:pb-0 sm:gap-5">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-bridge bg-white font-mono text-base font-semibold text-bridge"
                >
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h2 className="text-lg font-semibold leading-snug tracking-tight text-ink">
                    {t.landing.steps[i].title}
                  </h2>
                  <p className="mt-1 max-w-md text-sm leading-relaxed text-ink/70">
                    {t.landing.steps[i].body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-mist bg-mist sm:grid-cols-4">
        {t.landing.stats.map((stat) => (
          <div key={stat.l} className="bg-white p-5 text-center sm:p-6">
            <p className="font-mono text-4xl font-semibold leading-none text-bridge">{stat.n}</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-ink/60">{stat.l}</p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight text-ink">{t.landing.bandTitle}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {t.landing.band.map((item) => (
            <section key={item.title} className="rounded-lg border border-mist border-t-2 border-t-bridge bg-white p-5">
              <h3 className="text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{item.body}</p>
            </section>
          ))}
        </div>
      </div>

      <p className="mt-12 border-t border-mist pt-8 font-mono text-xs uppercase tracking-wider text-ink/50">
        {Object.values(REGISTRATIONS)
          .map((r) => r.name.replace(" Registration", "").replace(" (for the organisation)", ""))
          .join(" · ")}
      </p>
    </div>
  );
}

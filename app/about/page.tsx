"use client";

import Link from "next/link";
import MockedBadge from "@/components/MockedBadge";
import { useCopy } from "@/components/LanguageProvider";

export default function AboutPage() {
  const t = useCopy();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {t.about.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink/80">{t.about.intro}</p>
      </div>

      <section className="mt-10 max-w-2xl">
        <h2 className="text-lg font-semibold tracking-tight text-ink">{t.about.whoHeading}</h2>
        <p className="mt-2 text-base leading-relaxed text-ink/80">{t.about.whoBody}</p>
      </section>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <section className="rounded-lg border border-mist bg-white p-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-ink">
            <span aria-hidden="true" className="text-status-success">✓</span>{" "}
            {t.about.realHeading}
          </h2>
          <ul className="mt-4 space-y-4">
            {t.about.real.map((item) => (
              <li key={item.title}>
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-mist bg-white p-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-ink">
            <MockedBadge label={t.badges.mocked} /> {t.about.mockedHeading}
          </h2>
          <ul className="mt-4 space-y-4">
            {t.about.mocked.map((item) => (
              <li key={item.title}>
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-8 rounded-lg border border-mist bg-white p-5">
        <h2 className="text-lg font-semibold tracking-tight text-ink">
          {t.about.scalingHeading}
        </h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-2">
          {t.about.scaling.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span className="font-mono text-sm font-semibold text-marigold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8 max-w-2xl rounded-lg border border-mist border-t-2 border-t-bridge bg-white p-5">
        <h2 className="text-base font-semibold text-ink">{t.about.disclaimerHeading}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-ink/80">{t.about.disclaimerBody}</p>
        <Link
          href="/"
          className="mt-4 inline-flex min-h-10 items-center rounded-md border border-bridge px-4 py-2 text-sm font-semibold text-bridge hover:bg-bridge hover:text-white"
        >
          {t.about.back}
        </Link>
      </section>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useProfile } from "@/components/ProfileProvider";
import { useAuth, useRequireAuth } from "@/components/AuthProvider";
import { useCopy, useLang } from "@/components/LanguageProvider";
import type {
  FundingSource,
  IntakeAnswers,
  OrgAge,
  StructureStatus,
} from "@/lib/types";

const STRUCTURE_OPTIONS: { value: StructureStatus; key: "structureNone" | "structureTrust" | "structureSociety" | "structureSection8" }[] = [
  { value: "none", key: "structureNone" },
  { value: "trust", key: "structureTrust" },
  { value: "society", key: "structureSociety" },
  { value: "section8", key: "structureSection8" },
];

const FUNDING_OPTIONS: { value: FundingSource; key: "fundingIndividual" | "fundingCsr" | "fundingForeign" | "fundingUnsure" }[] = [
  { value: "individual", key: "fundingIndividual" },
  { value: "csr", key: "fundingCsr" },
  { value: "foreign", key: "fundingForeign" },
  { value: "unsure", key: "fundingUnsure" },
];

const AGE_OPTIONS: { value: OrgAge; key: "ageStarting" | "ageUnder3" | "ageOver3" }[] = [
  { value: "starting", key: "ageStarting" },
  { value: "under3", key: "ageUnder3" },
  { value: "over3", key: "ageOver3" },
];

const PERSONAS: {
  name: string;
  tag: string;
  tagHi: string;
  desc: string;
  descHi: string;
  answers: IntakeAnswers;
}[] = [
    {
      name: "Afora Foundation",
      tag: "FCRA + Honesty Advisory",
      tagHi: "FCRA + ईमानदारी सलाह",
      desc: "Trust • Foreign Funding • Starting out",
      descHi: "ट्रस्ट • विदेशी फंडिंग • नई संस्था",
      answers: {
        orgName: "Afora Foundation",
        structureStatus: "trust",
        funding: ["individual", "foreign"],
        orgAge: "starting",
      },
    },
    {
      name: "Sahyog Collective",
      tag: "CSR-1 Branch",
      tagHi: "CSR-1 शाखा",
      desc: "Society • CSR Grants • < 3 years",
      descHi: "सोसायटी • CSR ग्रांट्स • 3 वर्ष से कम",
      answers: {
        orgName: "Sahyog Collective",
        structureStatus: "society",
        funding: ["individual", "csr"],
        orgAge: "under3",
      },
    },
    {
      name: "Aarohan Foundation",
      tag: "Core 5 Registrations",
      tagHi: "मूल 5 पंजीकरण",
      desc: "Section-8 • Domestic funds • 3+ years",
      descHi: "धारा-8 कंपनी • घरेलू दान • 3+ वर्ष",
      answers: {
        orgName: "Aarohan Foundation",
        structureStatus: "section8",
        funding: ["individual"],
        orgAge: "over3",
      },
    },
  ];

export default function IntakePage() {
  const { isAuthenticated, isReady } = useRequireAuth();
  const router = useRouter();
  const { profile, saveProfile } = useProfile();
  const t = useCopy();
  const { lang } = useLang();

  const [orgName, setOrgName] = useState(profile?.answers.orgName ?? "");
  const [structureStatus, setStructureStatus] = useState<StructureStatus>(
    profile?.answers.structureStatus ?? "none"
  );
  const [funding, setFunding] = useState<FundingSource[]>(
    profile?.answers.funding ?? []
  );
  const [orgAge, setOrgAge] = useState<OrgAge>(profile?.answers.orgAge ?? "starting");
  const [nameError, setNameError] = useState<string | null>(null);
  const [fundingError, setFundingError] = useState<string | null>(null);

  const toggleFunding = (value: FundingSource) => {
    setFunding((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value);
      if (value === "unsure") return ["unsure"];
      return [...prev.filter((v) => v !== "unsure"), value];
    });
  };

  const loadPersona = (answers: IntakeAnswers) => {
    setOrgName(answers.orgName);
    setStructureStatus(answers.structureStatus);
    setFunding(answers.funding);
    setOrgAge(answers.orgAge);
    setNameError(null);
    setFundingError(null);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    if (!orgName.trim()) {
      setNameError(t.intake.nameError);
      valid = false;
    } else {
      setNameError(null);
    }
    if (funding.length === 0) {
      setFundingError(t.intake.fundingError);
      valid = false;
    } else {
      setFundingError(null);
    }
    if (!valid) return;
    saveProfile({
      orgName: orgName.trim(),
      structureStatus,
      funding,
      orgAge,
    });
    router.push("/roadmap");
  };

  const fieldsetClass =
    "rounded-sm border border-mist bg-white p-4 sm:p-5 transition-colors hover:border-ink/30 has-[:checked]:border-bridge has-[:checked]:ring-1 has-[:checked]:ring-bridge has-[:checked]:bg-[#fbfcfb]";

  if (!isReady || !isAuthenticated) {
    return (
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center p-20 font-mono text-sm text-ink/60">
        Redirecting to SSO login…
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-[1fr_330px] lg:items-start xl:gap-12">
        {/* Main Intake Form */}
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {t.intake.title}
          </h1>

          {/* Compact persona buttons for mobile / tablet screens */}
          <div className="mt-4 rounded-lg border border-mist bg-paper/60 p-3.5 lg:hidden">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink/70">
              {t.intake.personaHeading}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {PERSONAS.map((persona) => {
                const isActive = orgName === persona.answers.orgName;
                return (
                  <button
                    key={persona.name}
                    type="button"
                    onClick={() => loadPersona(persona.answers)}
                    className={`inline-flex min-h-9 items-center rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${isActive
                      ? "border-bridge bg-bridge text-white shadow-sm"
                      : "border-mist bg-white text-bridge hover:border-bridge hover:bg-paper"
                      }`}
                  >
                    {persona.name}
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={onSubmit} noValidate className="mt-8 space-y-8">
            <div>
              <label
                htmlFor="org-name"
                className="block text-base font-semibold text-ink"
              >
                {t.intake.nameLabel}
              </label>
              <input
                id="org-name"
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder={t.intake.namePlaceholder}
                autoComplete="organization"
                className="mt-2 min-h-11 w-full rounded-md border border-mist bg-white px-3.5 text-base text-ink placeholder:text-ink/40"
              />
              {nameError && (
                <p role="alert" className="mt-2 text-sm font-medium text-status-error">
                  {nameError}
                </p>
              )}
            </div>

            <fieldset>
              <legend className="text-base font-semibold text-ink">
                {t.intake.structureLabel}
              </legend>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {STRUCTURE_OPTIONS.map((opt) => (
                  <label key={opt.value} className={`${fieldsetClass} cursor-pointer`}>
                    <span className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="structure"
                        value={opt.value}
                        checked={structureStatus === opt.value}
                        onChange={() => setStructureStatus(opt.value)}
                        className="mt-1 h-4.5 w-4.5 shrink-0"
                      />
                      <span className="text-base leading-snug">{t.intake[opt.key]}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-base font-semibold text-ink">
                {t.intake.fundingLabel}{" "}
                <span className="font-normal text-ink/60">{t.intake.fundingHint}</span>
              </legend>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {FUNDING_OPTIONS.map((opt) => (
                  <label key={opt.value} className={`${fieldsetClass} cursor-pointer`}>
                    <span className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={funding.includes(opt.value)}
                        onChange={() => toggleFunding(opt.value)}
                        className="mt-1 h-4.5 w-4.5 shrink-0"
                      />
                      <span className="text-base leading-snug">{t.intake[opt.key]}</span>
                    </span>
                  </label>
                ))}
              </div>
              {fundingError && (
                <p role="alert" className="mt-2 text-sm font-medium text-status-error">
                  {fundingError}
                </p>
              )}
            </fieldset>

            <fieldset>
              <legend className="text-base font-semibold text-ink">
                {t.intake.ageLabel}
              </legend>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                {AGE_OPTIONS.map((opt) => (
                  <label key={opt.value} className={`${fieldsetClass} cursor-pointer`}>
                    <span className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="age"
                        value={opt.value}
                        checked={orgAge === opt.value}
                        onChange={() => setOrgAge(opt.value)}
                        className="mt-1 h-4.5 w-4.5 shrink-0"
                      />
                      <span className="text-base leading-snug">{t.intake[opt.key]}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              type="submit"
              className="inline-flex min-h-11 items-center rounded-sm bg-bridge px-5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-bridge-light"
            >
              {t.intake.cta}
            </button>
          </form>
        </div>

        {/* Sticky Desktop Persona Sidebar */}
        <aside className="sticky top-20 hidden space-y-4 lg:block">
          <div className="rounded-xl border border-mist bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-ink">
                {t.intake.personaHeading}
              </h2>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-ink/70">
              {lang === "hi"
                ? "अलग-अलग रोडमैप शाखाओं को तुरंत जांचने के लिए किसी भी उदाहरण प्रोफाइल पर क्लिक करें:"
                : "Click any sample persona to auto-fill the questionnaire and test branching roadmap logic:"}
            </p>

            <div className="mt-4 space-y-2.5">
              {PERSONAS.map((persona) => {
                const isActive = orgName === persona.answers.orgName;
                return (
                  <button
                    key={persona.name}
                    type="button"
                    onClick={() => loadPersona(persona.answers)}
                    className={`w-full rounded-lg border p-3 text-left transition-all ${isActive
                      ? "border-bridge bg-bridge/10 ring-1 ring-bridge shadow-sm"
                      : "border-mist bg-paper/40 hover:border-bridge/60 hover:bg-white"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-ink">
                        {persona.name}
                      </span>
                      {isActive && (
                        <span className="font-mono text-[10px] font-bold text-bridge uppercase tracking-wider">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-ink/60">
                      {lang === "hi" ? persona.descHi : persona.desc}
                    </p>
                    <div className="mt-2 inline-flex items-center rounded bg-paper px-2 py-0.5 font-mono text-[10px] font-medium text-marigold-deep border border-mist">
                      {lang === "hi" ? persona.tagHi : persona.tag}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

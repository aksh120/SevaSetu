"use client";

import { useRouter } from "next/navigation";
import { useProfile } from "@/components/ProfileProvider";
import { useAuth } from "@/components/AuthProvider";
import { useCopy } from "@/components/LanguageProvider";
import type { IntakeAnswers } from "@/lib/types";

const DEMO_ANSWERS: IntakeAnswers = {
  orgName: "Afora Foundation",
  structureStatus: "trust",
  funding: ["individual", "foreign"],
  orgAge: "starting",
};

export default function DemoSeed() {
  const router = useRouter();
  const { seedDemo } = useProfile();
  const { login } = useAuth();
  const t = useCopy();

  const start = () => {
    const now = Date.now();
    login({
      id: "98765-43210",
      name: "Demo Trustee",
      role: "Managing Trustee / President",
    });
    seedDemo(DEMO_ANSWERS, {
      structure: now - 60_000,
      pan: now - 60_000,
      "12a": now - 60_000,
      "80g": now - 60_000,
      darpan: now - 12_000,
    });
    router.push("/dashboard");
  };

  return (
    <button
      type="button"
      onClick={start}
      className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-mist bg-surface px-5 py-3 text-sm font-medium text-ink/70 shadow-[0_2px_0_0_#dce3e0] hover:border-bridge hover:text-bridge active:translate-y-[1px] active:shadow-none sm:w-auto"
    >
      {t.landing.demoButton}
      <span className="ml-1.5 font-mono text-[10px] uppercase tracking-wider text-ink/50">
        {t.badges.simulated}
      </span>
    </button>
  );
}

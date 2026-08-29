"use client";

import { useState, useEffect } from "react";
import { useCopy } from "@/components/LanguageProvider";
import MockedBadge from "@/components/MockedBadge";
import { fmt } from "@/lib/i18n";

interface MockDigiLockerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportAll: () => void;
  moduleName: string;
}

export default function MockDigiLockerModal({
  isOpen,
  onClose,
  onImportAll,
  moduleName,
}: MockDigiLockerModalProps) {
  const t = useCopy();
  const [step, setStep] = useState<"auth" | "docs">("auth");
  const [idInput, setIdInput] = useState("98765-43210");
  const [pinInput, setPinInput] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState<Record<string, boolean>>({
    deed: true,
    pan: true,
    aadhaar: true,
    utility: true,
    audit: true,
  });

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset state and pre-fill demo credentials when opening
  useEffect(() => {
    if (isOpen) {
      setStep("auth");
      setIdInput("98765-43210");
      setPinInput("123456");
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFillDemo = () => {
    setIdInput("98765-43210");
    setPinInput("123456");
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("docs");
    }, 450);
  };

  const toggleDoc = (id: string) => {
    setSelectedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAll = () => {
    const allChecked = Object.values(selectedDocs).every(Boolean);
    const updated: Record<string, boolean> = {};
    t.digilocker.docs.forEach((d) => {
      updated[d.id] = !allChecked;
    });
    setSelectedDocs(updated);
  };

  const selectedCount = Object.values(selectedDocs).filter(Boolean).length;

  const handleImport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onImportAll();
      onClose();
    }, 400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="digilocker-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl overflow-hidden rounded-xl border border-mist bg-white shadow-2xl my-auto">
        {/* Indian Tricolor Accent Strip */}
        <div className="flex h-1.5 w-full" aria-hidden="true">
          <div className="h-full flex-1 bg-[#138808]" />
          <div className="h-full flex-1" style={{ backgroundColor: "#ffffff" }} />
          <div className="h-full flex-1 bg-[#FF9933]" />
        </div>

        {/* Modal Header */}
        <div className="border-b border-mist bg-paper/60 px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              {/* DigiLocker Icon representation */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7 text-bridge shrink-0"
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
                  rx="2.5"
                  fill="currentColor"
                  fillOpacity="0.18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="14.8" r="1.3" fill="currentColor" />
                <path
                  d="M12 16.1V18.2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <div>
                <div className="flex items-center gap-2">
                  <h2 id="digilocker-title" className="text-base font-bold text-ink sm:text-lg">
                    {t.digilocker.modalTitle}
                  </h2>
                  <MockedBadge label={t.digilocker.modalTag} />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-ink/60">
                  Digital India • National e-Governance Division
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.digilocker.close}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-mist text-ink/60 hover:bg-mist/50 hover:text-ink"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Main Body with Dedicated Side Panel */}
        <div className="grid md:grid-cols-[1fr_290px] items-stretch">
          {/* Main Action Area */}
          <div className="p-5 sm:p-6">
            {/* Step 1: Authentication */}
            {step === "auth" && (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-ink">{t.digilocker.step1Title}</h3>
                  <p className="mt-0.5 text-xs text-ink/70">{t.digilocker.step1Sub}</p>
                </div>

                <div className="space-y-3.5 pt-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink/70">
                      {t.digilocker.idLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={idInput}
                      onChange={(e) => setIdInput(e.target.value)}
                      placeholder="e.g. 98765-43210 or 9123-4567-8901"
                      className="mt-1.5 w-full rounded-md border border-mist bg-paper/40 px-3.5 py-2 font-mono text-sm text-ink outline-none focus:border-bridge focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink/70">
                      {t.digilocker.pinLabel}
                    </label>
                    <input
                      type="password"
                      maxLength={6}
                      required
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      placeholder="••••••"
                      className="mt-1.5 w-full rounded-md border border-mist bg-paper/40 px-3.5 py-2 font-mono text-sm text-ink outline-none focus:border-bridge focus:bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2.5 border-t border-mist pt-4 mt-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md border border-mist px-4 py-2 text-sm font-medium text-ink hover:bg-mist/40"
                  >
                    {t.digilocker.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !idInput || !pinInput}
                    className="inline-flex min-h-10 items-center justify-center rounded-md bg-bridge px-5 py-2 text-sm font-semibold text-white shadow-[0_2px_0_0_#0d3237] hover:bg-bridge-light disabled:cursor-not-allowed disabled:bg-mist disabled:text-ink/40 transition-all"
                  >
                    {loading ? t.digilocker.signingIn : t.digilocker.signInBtn}
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Document Selection & Verification */}
            {step === "docs" && (
              <div className="space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-ink">{t.digilocker.step2Title}</h3>
                    <p className="mt-0.5 text-xs text-ink/70">
                      {fmt(t.digilocker.step2Sub, { module: moduleName })}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={toggleAll}
                    className="font-mono text-xs text-bridge underline underline-offset-2 hover:text-bridge-light"
                  >
                    {t.digilocker.selectAll}
                  </button>
                </div>

                <div className="max-h-60 space-y-2 overflow-y-auto pr-1">
                  {t.digilocker.docs.map((doc) => {
                    const isChecked = !!selectedDocs[doc.id];
                    return (
                      <label
                        key={doc.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                          isChecked
                            ? "border-bridge/60 bg-bridge/5"
                            : "border-mist bg-paper/30 hover:border-ink/20"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleDoc(doc.id)}
                          className="mt-1 h-4 w-4 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <span className="text-sm font-semibold text-ink">{doc.name}</span>
                            <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-status-success">
                              ✓ {t.digilocker.verifiedSeal}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-ink/60">
                            {doc.issuer} • <span className="font-mono">{doc.date}</span>
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between border-t border-mist pt-4">
                  <button
                    type="button"
                    onClick={() => setStep("auth")}
                    className="font-mono text-xs text-ink/70 underline underline-offset-2 hover:text-ink"
                  >
                    ← Back
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md border border-mist px-3.5 py-2 text-sm font-medium text-ink hover:bg-mist/40"
                    >
                      {t.digilocker.cancel}
                    </button>
                    <button
                      type="button"
                      onClick={handleImport}
                      disabled={loading || selectedCount === 0}
                      className="inline-flex min-h-10 items-center justify-center rounded-md bg-bridge px-5 py-2 text-sm font-semibold text-white shadow-[0_2px_0_0_#0d3237] hover:bg-bridge-light disabled:cursor-not-allowed disabled:bg-mist disabled:text-ink/40 transition-all"
                    >
                      {loading
                        ? t.digilocker.importing
                        : fmt(t.digilocker.importBtn, { count: selectedCount })}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Dedicated Side Dialog / Helper Panel */}
          <aside className="border-t md:border-t-0 md:border-l border-mist bg-paper/60 p-5 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <div className="rounded-lg border border-marigold/50 bg-marigold/10 p-3.5 shadow-sm">
                <p className="text-xs font-bold text-marigold-deep flex items-center gap-1.5">
                  <svg className="h-4 w-4 shrink-0 text-marigold-deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <span>{t.digilocker.demoNoticeHeading}</span>
                </p>
                <p className="mt-1 text-xs leading-relaxed text-ink/80">
                  {t.digilocker.demoNoticeBody}
                </p>
                <p className="mt-2 text-xs font-bold leading-relaxed text-ink border-t border-marigold/25 pt-2">
                  {t.digilocker.demoNoticeBold}
                </p>
              </div>
            </div>

            {/* 1-Click Demo Fill Action */}
            <div className="rounded-lg border border-mist bg-white p-3.5 shadow-sm space-y-2.5">
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink/70 flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5 text-marigold-deep fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  <span>Demo Credentials</span>
                </p>
                <p className="font-mono text-xs text-marigold-deep mt-0.5">
                  ID: 98765-43210 • PIN: 123456
                </p>
              </div>

              <button
                type="button"
                onClick={handleFillDemo}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-md bg-marigold px-4 py-2.5 text-xs font-bold text-ink shadow-[0_2px_0_0_#96690f] hover:bg-[#d69828] active:translate-y-[1px] active:shadow-none transition-all"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>{t.digilocker.demoFillBtn}</span>
              </button>

              <p className="text-[11px] text-ink/60 text-center leading-snug">
                {t.digilocker.demoFillSub}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

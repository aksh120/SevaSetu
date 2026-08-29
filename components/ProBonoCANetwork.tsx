"use client";

import { useState, useEffect } from "react";
import { useProfile } from "@/components/ProfileProvider";
import { useCopy, useLang } from "@/components/LanguageProvider";
import { fmt } from "@/lib/i18n";
import { stepDisplay } from "@/lib/content";

interface ProBonoCANetworkProps {
  variant?: "card" | "button" | "banner";
  className?: string;
}

export default function ProBonoCANetwork({
  variant = "card",
  className = "",
}: ProBonoCANetworkProps) {
  const t = useCopy();
  const { lang } = useLang();
  const { profile, submitCaReview, cancelCaReview } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFirm, setSelectedFirm] = useState<"firm1" | "firm2" | "firm3">("firm1");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close modal on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const orgName = profile?.answers.orgName || "Grassroots Trust";
  const steps = profile?.roadmap.steps || [];
  const activeFilings = steps.map((s) => stepDisplay(s.id, lang).name).join(", ");
  const caReview = profile?.caReview;

  const firms = [
    {
      id: "firm1" as const,
      name: t.proBonoCA.firm1Name,
      spec: t.proBonoCA.firm1Spec,
      badge: "12A / 80G Lead",
    },
    {
      id: "firm2" as const,
      name: t.proBonoCA.firm2Name,
      spec: t.proBonoCA.firm2Spec,
      badge: "Section 8 & Trust",
    },
    {
      id: "firm3" as const,
      name: t.proBonoCA.firm3Name,
      spec: t.proBonoCA.firm3Spec,
      badge: "Gov Empanelled",
    },
  ];

  const selectedFirmObj = firms.find((f) => f.id === selectedFirm) || firms[0];

  const handleShare = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const newRef = `CA-REV-${randomNum}`;
      submitCaReview({
        ref: newRef,
        firmId: selectedFirm,
        firmName: selectedFirmObj.name,
        submittedAt: Date.now(),
        status: "under-review",
        digest: "sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
      });
      setIsSubmitting(false);
    }, 650);
  };

  const handleWithdraw = () => {
    if (window.confirm(lang === "hi" ? "क्या आप वाकई प्रो-बोनो CA समीक्षा अनुरोध वापस लेना चाहते हैं?" : "Are you sure you want to withdraw this Pro-Bono CA review request?")) {
      cancelCaReview();
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* 1. Visual Card Variant */}
      {variant === "card" && (
        <>
          {/* Active Submitted Review Card */}
          {caReview ? (
            <div className={`overflow-hidden rounded-xl border border-status-success/40 bg-gradient-to-br from-status-success-bg/60 via-white to-white shadow-sm transition-all ${className}`}>
              {/* Header Status Bar */}
              <div className="border-b border-status-success/30 bg-status-success-bg/80 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-status-success shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-status-success">
                      {t.proBonoCA.submittedHeading}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 font-mono text-[10px] font-bold text-status-success border border-status-success/30 shadow-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                      <span>{t.proBonoCA.submittedBadge}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-bridge bg-white px-2.5 py-1 rounded border border-mist">
                  <span className="text-ink/50 text-[10px] uppercase font-normal">{t.proBonoCA.refLabel}:</span>
                  <span>{caReview.ref}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-ink/55 block">
                      {t.proBonoCA.assignedFirmLabel}
                    </span>
                    <p className="font-bold text-sm text-ink mt-0.5">
                      {caReview.firmName}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase text-ink/55 block">
                      {t.proBonoCA.turnaroundLabel}
                    </span>
                    <p className="font-bold text-sm text-status-success mt-0.5 flex items-center gap-1.5">
                      <svg className="h-3.5 w-3.5 text-status-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{t.proBonoCA.turnaroundValue}</span>
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-mist bg-paper/40 p-3 text-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] uppercase text-ink/55 block">
                      {t.proBonoCA.packageFilings}
                    </span>
                    <p className="text-xs text-ink/80 font-medium truncate mt-0.5">
                      {activeFilings || "Trust Deed, PAN, 12A/80G, Darpan"}
                    </p>
                  </div>
                  <div className="shrink-0 font-mono text-[11px] text-bridge font-semibold">
                    sha256:7f83b165...
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-mist pt-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-md bg-bridge px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-bridge-light active:translate-y-[1px] transition-all"
                  >
                    <svg className="h-3.5 w-3.5 text-marigold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>{t.proBonoCA.viewDetailsBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWithdraw}
                    className="text-xs text-ink/50 hover:text-status-error hover:underline transition-colors font-medium"
                  >
                    {t.proBonoCA.cancelReviewBtn}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Unsubmitted Entry Card */
            <div className={`overflow-hidden rounded-xl border border-mist bg-white shadow-sm transition-all hover:border-bridge/40 ${className}`}>
              <div className="border-b border-mist bg-paper/60 px-5 py-3.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-marigold-deep shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink/75">
                    {t.proBonoCA.cardBadge}
                  </span>
                </div>
                <span className="rounded-full border border-marigold/40 bg-marigold/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-marigold-deep">
                  ICAI Partner
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-base font-bold text-ink sm:text-lg">
                  {t.proBonoCA.cardTitle}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/75 sm:text-sm">
                  {t.proBonoCA.cardDesc}
                </p>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-bridge px-4 py-2 text-xs font-semibold text-white shadow-[0_2px_0_0_#0d3237] hover:bg-bridge-light active:translate-y-[1px] active:shadow-none transition-all sm:text-sm"
                  >
                    <svg className="h-4 w-4 text-marigold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>{t.proBonoCA.cardCta} →</span>
                  </button>

                  <span className="font-mono text-[11px] text-ink/50">
                    {t.proBonoCA.cardSub}
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* 2. Button Variant */}
      {variant === "button" && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`inline-flex items-center gap-2 rounded-md border border-bridge bg-surface px-3 py-2 text-xs font-semibold text-bridge hover:bg-bridge hover:text-white transition-colors shadow-sm ${className}`}
        >
          <svg className="h-3.5 w-3.5 text-marigold-deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
          <span>{caReview ? `${t.proBonoCA.submittedBadge} (${caReview.ref})` : t.proBonoCA.cardCta}</span>
        </button>
      )}

      {/* 3. Interactive Modal Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pro-bono-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
        >
          {/* Deep Backdrop Scrim */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <div className="relative z-10 mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-mist bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="border-b border-mist bg-paper/80 px-5 py-4 sm:px-6 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <svg className="h-7 w-7 text-marigold-deep shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 id="pro-bono-title" className="text-base font-bold text-ink sm:text-lg">
                      {t.proBonoCA.modalTitle}
                    </h2>
                    <span className="rounded-full border border-status-success/30 bg-status-success-bg px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-status-success">
                      Verified
                    </span>
                  </div>
                  <p className="font-mono text-xs text-ink/65">{t.proBonoCA.modalSub}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close dialog"
                className="rounded p-1 text-ink/50 hover:bg-paper hover:text-ink transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="max-h-[75vh] overflow-y-auto p-5 sm:p-6 space-y-5">
              {!caReview ? (
                <>
                  {/* Select Empanelled Firm */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink/80 mb-2">
                      {t.proBonoCA.selectCaLabel}
                    </label>
                    <div className="space-y-2">
                      {firms.map((firm) => (
                        <label
                          key={firm.id}
                          className={`flex items-start gap-3 rounded-lg border p-3.5 cursor-pointer transition-all ${
                            selectedFirm === firm.id
                              ? "border-bridge bg-paper/60 ring-1 ring-bridge"
                              : "border-mist bg-surface hover:border-ink/30"
                          }`}
                        >
                          <input
                            type="radio"
                            name="ca-firm"
                            checked={selectedFirm === firm.id}
                            onChange={() => setSelectedFirm(firm.id)}
                            className="mt-1 h-4 w-4 border-mist text-bridge focus:ring-bridge"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-sm text-ink">{firm.name}</span>
                              <span className="font-mono text-[10px] font-bold text-bridge uppercase tracking-wider">
                                {firm.badge}
                              </span>
                            </div>
                            <p className="font-mono text-xs text-ink/65 mt-0.5">{firm.spec}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Encrypted Package Details */}
                  <div className="rounded-xl border border-mist bg-paper/40 p-4 space-y-3">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink/75 flex items-center gap-1.5">
                      <svg className="h-3.5 w-3.5 text-bridge" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>{t.proBonoCA.packageSummaryHeading}</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="rounded-md border border-mist bg-white p-2.5">
                        <span className="text-ink/60 font-mono block text-[10px] uppercase">
                          {t.proBonoCA.packageEntity}
                        </span>
                        <span className="font-bold text-ink truncate block mt-0.5">
                          {orgName}
                        </span>
                      </div>

                      <div className="rounded-md border border-mist bg-white p-2.5">
                        <span className="text-ink/60 font-mono block text-[10px] uppercase">
                          {t.proBonoCA.packageStatus}
                        </span>
                        <span className="font-bold text-status-success flex items-center gap-1 mt-0.5">
                          <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
                          <span>{t.proBonoCA.readyToReview} ({steps.length} Steps)</span>
                        </span>
                      </div>
                    </div>

                    <div className="rounded-md border border-mist bg-white p-2.5 text-xs">
                      <span className="text-ink/60 font-mono block text-[10px] uppercase">
                        {t.proBonoCA.packageFilings}
                      </span>
                      <span className="text-ink font-medium leading-relaxed mt-0.5 block">
                        {activeFilings || "Trust Deed, PAN Card, 12A & 80G Application, NGO Darpan"}
                      </span>
                    </div>

                    <div className="rounded-md border border-mist bg-white p-2.5 font-mono text-[11px] text-ink/65 break-all">
                      <span className="text-ink/50 text-[10px] uppercase block">
                        {t.proBonoCA.packageEncryptedHash}
                      </span>
                      <span className="text-bridge font-bold">
                        sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
                      </span>
                    </div>
                  </div>

                  {/* Security Guarantee Notice */}
                  <div className="rounded-lg border border-status-info/30 bg-status-info-bg p-3 text-xs text-status-info flex items-start gap-2.5">
                    <svg className="h-4 w-4 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    <p className="leading-relaxed">
                      {t.proBonoCA.securityGuarantee}
                    </p>
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleShare}
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-bridge px-6 py-3 text-base font-semibold text-white shadow-[0_2px_0_0_#0d3237] hover:bg-bridge-light active:translate-y-[1px] active:shadow-none transition-all disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          <span>{t.proBonoCA.sharing}</span>
                        </>
                      ) : (
                        <>
                          <svg className="h-4 w-4 text-marigold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                          </svg>
                          <span>{t.proBonoCA.shareBtn} →</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                /* Live Submitted Package Details View */
                <div className="py-2 space-y-5 animate-in zoom-in-95 duration-200">
                  <div className="text-center space-y-2">
                    <svg className="mx-auto h-12 w-12 text-status-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>

                    <h3 className="text-lg font-bold text-ink">
                      {t.proBonoCA.successTitle}
                    </h3>
                    <p className="font-mono text-xs font-bold text-bridge bg-paper inline-block px-3 py-1 rounded border border-mist">
                      {fmt(t.proBonoCA.successRef, { ref: caReview.ref })}
                    </p>
                  </div>

                  <div className="rounded-xl border border-mist bg-paper/50 p-4 space-y-3 text-xs">
                    <div className="flex justify-between border-b border-mist pb-2">
                      <span className="text-ink/60 font-mono">{t.proBonoCA.assignedFirmLabel}:</span>
                      <span className="font-bold text-ink">{caReview.firmName}</span>
                    </div>
                    <div className="flex justify-between border-b border-mist pb-2">
                      <span className="text-ink/60 font-mono">{t.proBonoCA.turnaroundLabel}:</span>
                      <span className="font-bold text-status-success">{t.proBonoCA.turnaroundValue}</span>
                    </div>
                    <div className="flex justify-between border-b border-mist pb-2">
                      <span className="text-ink/60 font-mono">{t.proBonoCA.packageEntity}:</span>
                      <span className="font-bold text-ink">{orgName}</span>
                    </div>
                    <div>
                      <span className="text-ink/60 font-mono block mb-1">{t.proBonoCA.packageFilings}:</span>
                      <span className="text-ink/85">{activeFilings}</span>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-ink/75 text-center max-w-lg mx-auto">
                    {fmt(t.proBonoCA.successBody, { firm: caReview.firmName })}
                  </p>

                  <div className="pt-2 flex justify-between items-center border-t border-mist">
                    <button
                      type="button"
                      onClick={handleWithdraw}
                      className="text-xs text-status-error hover:underline"
                    >
                      {t.proBonoCA.cancelReviewBtn}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="min-h-10 rounded-md bg-bridge px-5 py-2 text-xs font-semibold text-white hover:bg-bridge-light transition-all"
                    >
                      {t.proBonoCA.closeBtn}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

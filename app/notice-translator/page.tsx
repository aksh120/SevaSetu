"use client";

import { useState, useRef } from "react";
import MockedBadge from "@/components/MockedBadge";
import { useCopy, useLang } from "@/components/LanguageProvider";

interface TranslationResult {
  means: string;
  do_next: string;
  deadline: string;
}

const EXAMPLE_NOTICE = `OFFICE OF THE REGISTRAR (ILLUSTRATIVE EXAMPLE)
Ref: ILL/2026/00000

Sub: Reminder  -  pending annual activity report for FY 2025-26

The registry notes that the annual report of activities for your organisation for FY 2025-26 has not been received, notwithstanding that the prescribed period for submission has elapsed.

You are therefore directed to submit the said report, in the prescribed format, through the online portal within 30 (thirty) days of the date of this letter.

Be pleased to note that continued non-submission may adversely affect the standing of your organisation and its eligibility for renewals and consequential registrations.`;

const MOCK_SCANNED_NOTICE = `MINISTRY OF CORPORATE AFFAIRS (MCA)
OFFICE OF THE REGISTRAR OF COMPANIES (ROC), NCT OF DELHI & HARYANA
4th Floor, IFCI Tower, 61 Nehru Place, New Delhi - 110019

Notice Ref No: ROC/DEL/SEC8/SHOW-CAUSE/2026/48912
Date: 12th February, 2026

To,
The Board of Directors,
Aarohan Foundation (CIN: U85300DL2024NPL399120)

SUBJECT: SHOW CAUSE NOTICE UNDER SECTION 12(8) & SECTION 137 OF THE COMPANIES ACT, 2013 REGARDING NON-FILING OF FINANCIAL STATEMENTS (FORM AOC-4) FOR FY 2024-25.

Sir / Madam,

1. Whereas, upon examination of the MCA21 portal records, it is observed that your organisation (Section-8 non-profit company) has failed to file the mandatory Financial Statements in Form AOC-4 along with Director's Report for the Financial Year ending 31st March, 2025 within the statutory period of 30 days from the date of the Annual General Meeting.

2. You are hereby called upon to show cause within 15 (fifteen) days from the date of receipt of this notice as to why penal action under Section 137(3) of the Companies Act, 2013 and adjudication proceedings under Section 454 should not be initiated against the company and every officer who is in default.

3. Failure to respond or rectify the default through the MCA portal within the stipulated timeline shall lead to compounding penalties and initiation of strike-off proceedings without further reference.

By Order of the Registrar of Companies,
(Authorized Signatory)
Registrar of Companies, Delhi`;

type ErrorKind = "empty_text" | "not_configured" | "generic" | null;

export default function NoticeTranslatorPage() {
  const t = useCopy();
  const { lang } = useLang();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [noticeText, setNoticeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedNoticeInfo, setUploadedNoticeInfo] = useState<{
    filename: string;
    size: string;
  } | null>(null);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [errorKind, setErrorKind] = useState<ErrorKind>(null);

  const performMockUpload = (filename: string, textOverride?: string) => {
    setUploading(true);
    setErrorKind(null);
    setResult(null);

    setTimeout(() => {
      setNoticeText(textOverride || MOCK_SCANNED_NOTICE);
      setUploadedNoticeInfo({
        filename,
        size: "1.4 MB",
      });
      setUploading(false);
    }, 700);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = (event.target?.result as string) || "";
        performMockUpload(file.name, text.trim() || MOCK_SCANNED_NOTICE);
      };
      reader.readAsText(file);
    } else {
      performMockUpload(file.name);
    }
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    } else {
      performMockUpload("Notice_ROC_MCA_2026.pdf");
    }
  };

  const onTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeText.trim()) {
      setErrorKind("empty_text");
      setResult(null);
      return;
    }
    setLoading(true);
    setErrorKind(null);
    setResult(null);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: noticeText }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorKind(data?.error === "not_configured" ? "not_configured" : "generic");
        return;
      }
      setResult({ means: data.means, do_next: data.do_next, deadline: data.deadline });
    } catch {
      setErrorKind("generic");
    } finally {
      setLoading(false);
    }
  };

  const sections: { label: string; value?: string }[] = [
    { label: t.translator.means, value: result?.means },
    { label: t.translator.doNext, value: result?.do_next },
    { label: t.translator.deadline, value: result?.deadline },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      {/* Hidden File Input for Real File Upload Selection */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.txt"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />

      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {t.translator.headline}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-ink/80">{t.translator.subhead}</p>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[7fr_5fr]">
        <div className="min-w-0">
          <form
            onSubmit={onTranslate}
            className="rounded-lg border border-mist border-t-2 border-t-bridge bg-white p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label htmlFor="notice-text" className="block text-base font-semibold text-ink">
                {t.translator.noticeLabel}
              </label>

              {uploadedNoticeInfo && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-status-success-bg px-2.5 py-0.5 font-mono text-xs font-semibold text-status-success border border-status-success/30 animate-in fade-in">
                  <span>✓</span>
                  <span>{uploadedNoticeInfo.filename} (OCR Extracted)</span>
                </span>
              )}
            </div>

            {/* OCR Extracting Progress Banner */}
            {uploading && (
              <div className="mt-2.5 flex items-center gap-2.5 rounded-md border border-marigold/50 bg-marigold/10 px-3.5 py-2.5 text-xs text-marigold-deep animate-pulse">
                <svg className="h-4 w-4 animate-spin text-marigold-deep" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span className="font-semibold">
                  {lang === "hi"
                    ? "दस्तावेज़ स्कैन और OCR द्वारा टेक्स्ट निकाला जा रहा है…"
                    : "Scanning document & extracting text via OCR engine…"}
                </span>
              </div>
            )}

            <textarea
              id="notice-text"
              value={noticeText}
              onChange={(e) => setNoticeText(e.target.value)}
              placeholder={t.translator.placeholder}
              rows={12}
              maxLength={8000}
              disabled={uploading}
              className="mt-2 w-full rounded-md border border-mist bg-white p-3.5 text-base leading-relaxed text-ink placeholder:text-ink/40 disabled:bg-paper/50"
            />
            {errorKind === "empty_text" && (
              <p role="alert" className="mt-2 text-sm font-medium text-status-error">
                {t.translator.emptyError}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setNoticeText(EXAMPLE_NOTICE);
                  setUploadedNoticeInfo(null);
                  setErrorKind(null);
                }}
                className="inline-flex min-h-10 items-center rounded-md border border-mist bg-white px-4 py-2 text-sm font-medium text-bridge hover:border-bridge transition-colors"
              >
                {t.translator.loadExample}
                <span className="ml-1.5 font-mono text-[10px] uppercase tracking-wider text-ink/50">
                  {t.translator.illustrativeTag}
                </span>
              </button>

              <button
                type="button"
                onClick={handleUploadButtonClick}
                disabled={uploading}
                title="Select a notice document (PDF/Image) to extract text via simulated OCR"
                className="inline-flex min-h-10 items-center gap-1.5 rounded-md border border-mist bg-white px-4 py-2 text-sm font-medium text-ink hover:border-bridge hover:bg-paper active:translate-y-[1px] transition-all disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <svg className="h-3.5 w-3.5 animate-spin text-bridge" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Extracting…</span>
                  </>
                ) : (
                  <>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-bridge"
                      aria-hidden="true"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span>{t.translator.uploadInstead}</span>
                    <MockedBadge />
                  </>
                )}
              </button>

              <button
                type="submit"
                disabled={loading || uploading}
                className="ml-auto inline-flex min-h-11 items-center rounded-md bg-bridge px-6 py-2.5 text-base font-semibold text-white shadow-[0_2px_0_0_#0d3237] enabled:hover:bg-bridge-light enabled:active:translate-y-[1px] enabled:active:shadow-none disabled:cursor-wait disabled:bg-mist disabled:text-ink/50 disabled:shadow-none transition-all"
              >
                {loading ? t.translator.translating : t.translator.translate}
              </button>
            </div>

            {errorKind === "not_configured" && (
              <p
                role="status"
                className="mt-5 rounded-sm border border-status-warning/40 border-t-2 border-t-marigold bg-status-warning-bg p-4 text-sm leading-relaxed text-status-warning"
              >
                {t.translator.notConfigured}
              </p>
            )}
            {errorKind === "generic" && (
              <p
                role="alert"
                className="mt-5 rounded-sm border border-status-error/30 border-t-2 border-t-status-error bg-status-error-bg p-4 text-sm leading-relaxed text-status-error"
              >
                {t.translator.genericError}
              </p>
            )}
          </form>
        </div>

        <div className="space-y-4">
          <section
            aria-live="polite"
            aria-busy={loading}
            className="overflow-hidden rounded-lg border border-mist bg-white"
          >
            <div className="border-b border-mist bg-paper px-5 py-3">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-bridge">
                {t.translator.side.outputTitle}
              </p>
            </div>

            {result ? (
              <dl className="divide-y divide-mist">
                {sections.map((s) => (
                  <div key={s.label} className="px-5 py-4">
                    <dt className="text-sm font-semibold uppercase tracking-wide text-ink/60">
                      {s.label}
                    </dt>
                    <dd className="mt-1.5 text-base leading-relaxed text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
            ) : loading ? (
              <div className="space-y-5 p-5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="animate-pulse space-y-2">
                    <div className="h-3 w-28 rounded bg-mist" />
                    <div className="h-3.5 w-full rounded bg-mist/70" />
                    <div className="h-3.5 w-4/5 rounded bg-mist/70" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-5">
                <p className="text-base font-semibold text-ink">{t.translator.side.idleTitle}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                  {t.translator.side.idleBody}
                </p>
                <div className="mt-4 space-y-2.5 border-t border-mist pt-4">
                  {sections.map((s) => (
                    <p key={s.label} className="flex items-center gap-2 text-sm text-ink/50">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-mist" aria-hidden="true" />
                      {s.label}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="rounded-lg border border-mist bg-white p-5">
            <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45">
              {t.translator.side.howTitle}
            </h2>
            <ol className="mt-3 space-y-3.5">
              {t.translator.side.how.map((step, i) => (
                <li key={step.title} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-bridge font-mono text-xs font-semibold text-bridge"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{step.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink/70">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 border-t border-mist pt-3 text-s leading-relaxed text-ink/80">
              {t.translator.side.privacyNote}
            </p>
          </section>
          
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { useCopy, useLang } from "@/components/LanguageProvider";
import { BridgeMark } from "@/components/BridgeMark";

function LoginForm() {
  const t = useCopy();
  const { lang } = useLang();
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/roadmap";

  const [authTab, setAuthTab] = useState<"otp" | "password" | "digilocker">("otp");

  // Tab 1: OTP State
  const [mobileOrAadhaar, setMobileOrAadhaar] = useState("98765-43210");
  const [otpInput, setOtpInput] = useState("123456");
  const [otpSent, setOtpSent] = useState(true);

  // Tab 2: PAN / DIN State
  const [panOrDin, setPanOrDin] = useState("AAACT1234F");
  const [userId, setUserId] = useState("TRUSTEE_ADMIN_01");
  const [password, setPassword] = useState("SecurePass@2026");
  const [showPassword, setShowPassword] = useState(false);

  // Tab 3: DigiLocker SSO State
  const [digiLockerId, setDigiLockerId] = useState("98765-43210");
  const [digiLockerPin, setDigiLockerPin] = useState("123456");
  const [consentChecked, setConsentChecked] = useState(true);

  // Shared Captcha State
  const [captchaCode, setCaptchaCode] = useState("8K2P9");
  const [captchaInput, setCaptchaInput] = useState("8K2P9");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectTarget);
    }
  }, [isAuthenticated, redirectTarget, router]);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput(code);
  };

  const handleFillDemo = () => {
    if (authTab === "otp") {
      setMobileOrAadhaar("98765-43210");
      setOtpInput("123456");
      setOtpSent(true);
    } else if (authTab === "password") {
      setPanOrDin("AAACT1234F");
      setUserId("TRUSTEE_ADMIN_01");
      setPassword("SecurePass@2026");
    } else {
      setDigiLockerId("98765-43210");
      setDigiLockerPin("123456");
      setConsentChecked(true);
    }
    setCaptchaInput(captchaCode);
    setError(null);
  };

  const handleInstantSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      let identifier = "98765-43210";
      if (authTab === "password") identifier = panOrDin || "AAACT1234F";
      else if (authTab === "digilocker") identifier = digiLockerId || "98765-43210";

      login({
        id: identifier,
        name: "Demo Trustee",
        role: "Managing Trustee / President",
      });
      router.push(redirectTarget);
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let identifier = "";

    if (authTab === "otp") {
      if (!mobileOrAadhaar.trim()) {
        setError(lang === "hi" ? "कृपया मोबाइल या आधार नंबर दर्ज करें।" : "Please enter your Mobile or Aadhaar number.");
        return;
      }
      identifier = mobileOrAadhaar.trim();
    } else if (authTab === "password") {
      if (!panOrDin.trim()) {
        setError(lang === "hi" ? "कृपया संस्था पैन या DIN दर्ज करें।" : "Please enter your Entity PAN or DIN.");
        return;
      }
      identifier = panOrDin.trim();
    } else {
      if (!consentChecked) {
        setError(lang === "hi" ? "कृपया डिजीलॉकर सहमति चेकबॉक्स पर टिक करें।" : "Please accept the DigiLocker consent.");
        return;
      }
      identifier = digiLockerId.trim() || "98765-43210";
    }

    setLoading(true);
    setError(null);

    // Any input is accepted in simulation mode
    setTimeout(() => {
      login({
        id: identifier,
        name: "Authorized Trustee",
        role: "Authorized Signatory",
      });
      router.push(redirectTarget);
    }, 450);
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-3 py-6 sm:px-6 sm:py-12">
      {/* Government SSO Header Banner */}
      <div className="overflow-hidden rounded-xl border border-mist bg-white shadow-sm">
        {/* Indian Tricolor Accent Strip */}
        <div className="flex h-1.5 w-full" aria-hidden="true">
          <div className="h-full flex-1 bg-[#138808]" />
          <div className="h-full flex-1" style={{ backgroundColor: "#ffffff" }} />
          <div className="h-full flex-1 bg-[#FF9933]" />
        </div>

        {/* Official Header Identification */}
        <div className="border-b border-mist bg-paper/60 px-4 py-3.5 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <BridgeMark className="h-5 w-8 sm:h-6 sm:w-10 text-bridge shrink-0" />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-ink text-sm sm:text-base truncate">
                    {t.login.portalBadge}
                  </h2>
                  <span className="rounded-full border border-status-info/40 bg-status-info-bg px-2 py-0.5 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-status-info shrink-0">
                    Gov SSO
                  </span>
                </div>
                <p className="font-mono text-[11px] sm:text-xs text-ink/65 truncate">
                  {t.login.govSub}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Authentication & Side Dialog Layout */}
        <div className="grid gap-0 md:grid-cols-[1.55fr_1.05fr]">
          {/* Left / Main Authentication Form */}
          <div className="p-4 sm:p-7 lg:p-8">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-ink sm:text-2xl lg:text-3xl">
                {t.login.title}
              </h1>
              <p className="mt-1 text-xs sm:text-sm leading-relaxed text-ink/75">
                {t.login.subhead}
              </p>
            </div>

            {/* Segmented Responsive Authentication Tabs */}
            <div className="mt-5 grid grid-cols-3 gap-1 rounded-lg bg-paper/80 p-1 border border-mist">
              <button
                type="button"
                onClick={() => {
                  setAuthTab("otp");
                  setError(null);
                }}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 rounded-md px-1.5 py-2 text-center text-[11px] sm:text-xs font-semibold transition-all min-h-10 sm:min-h-9 ${
                  authTab === "otp"
                    ? "bg-white text-bridge shadow-xs font-bold ring-1 ring-mist"
                    : "text-ink/65 hover:text-ink hover:bg-white/50"
                }`}
              >
                <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
                <span className="truncate">{lang === "hi" ? "मोबाइल/आधार" : "Mobile / OTP"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthTab("password");
                  setError(null);
                }}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 rounded-md px-1.5 py-2 text-center text-[11px] sm:text-xs font-semibold transition-all min-h-10 sm:min-h-9 ${
                  authTab === "password"
                    ? "bg-white text-bridge shadow-xs font-bold ring-1 ring-mist"
                    : "text-ink/65 hover:text-ink hover:bg-white/50"
                }`}
              >
                <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="truncate">{lang === "hi" ? "पैन / पासवर्ड" : "PAN / Password"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthTab("digilocker");
                  setError(null);
                }}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 rounded-md px-1.5 py-2 text-center text-[11px] sm:text-xs font-semibold transition-all min-h-10 sm:min-h-9 ${
                  authTab === "digilocker"
                    ? "bg-white text-bridge shadow-xs font-bold ring-1 ring-mist"
                    : "text-ink/65 hover:text-ink hover:bg-white/50"
                }`}
              >
                <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="truncate">{lang === "hi" ? "डिजीलॉकर" : "DigiLocker SSO"}</span>
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-md border border-status-error/40 bg-status-error-bg p-3 text-xs text-status-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
              {/* TAB 1: Mobile / Aadhaar OTP Mode */}
              {authTab === "otp" && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div>
                    <label
                      htmlFor="auth-aadhaar"
                      className="block text-xs font-semibold uppercase tracking-wider text-ink/80"
                    >
                      {t.login.aadhaarLabel}
                    </label>
                    <div className="relative mt-1.5 flex items-center">
                      <input
                        id="auth-aadhaar"
                        type="text"
                        value={mobileOrAadhaar}
                        onChange={(e) => setMobileOrAadhaar(e.target.value)}
                        placeholder={t.login.aadhaarPlaceholder}
                        className="w-full rounded-md border border-mist bg-surface pl-3.5 pr-24 py-2.5 font-mono text-base sm:text-sm text-ink shadow-sm placeholder:text-ink/40 focus:border-bridge focus:outline-none focus:ring-1 focus:ring-bridge"
                      />
                      <button
                        type="button"
                        onClick={() => setOtpSent(true)}
                        className="absolute right-1.5 top-1.5 bottom-1.5 rounded border border-mist bg-paper px-2.5 text-[11px] font-semibold text-bridge hover:border-bridge hover:bg-surface transition-colors"
                      >
                        {t.login.getOtpBtn}
                      </button>
                    </div>
                  </div>

                  {otpSent && (
                    <div className="rounded-md border border-status-success/30 bg-status-success-bg p-3 text-xs text-status-success flex items-start gap-2.5">
                      <svg className="h-4 w-4 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="font-semibold">{t.login.otpSentTitle}</span>
                        <span className="font-mono text-[11px] text-status-success/90 break-words">
                          ({t.login.otpSentHint})
                        </span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="auth-otp"
                      className="block text-xs font-semibold uppercase tracking-wider text-ink/80"
                    >
                      {t.login.otpLabel}
                    </label>
                    <input
                      id="auth-otp"
                      type="text"
                      maxLength={6}
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      placeholder={t.login.otpPlaceholder}
                      className="mt-1.5 w-full rounded-md border border-mist bg-surface px-3.5 py-2.5 font-mono text-base sm:text-sm tracking-[0.2em] text-ink shadow-sm placeholder:text-ink/40 focus:border-bridge focus:outline-none focus:ring-1 focus:ring-bridge"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: PAN / DIN & Password Mode */}
              {authTab === "password" && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div>
                    <label
                      htmlFor="auth-pan"
                      className="block text-xs font-semibold uppercase tracking-wider text-ink/80"
                    >
                      {t.login.panLabel}
                    </label>
                    <input
                      id="auth-pan"
                      type="text"
                      value={panOrDin}
                      onChange={(e) => setPanOrDin(e.target.value)}
                      placeholder={t.login.panPlaceholder}
                      className="mt-1.5 w-full rounded-md border border-mist bg-surface px-3.5 py-2.5 font-mono text-base sm:text-sm text-ink shadow-sm uppercase placeholder:text-ink/40 focus:border-bridge focus:outline-none focus:ring-1 focus:ring-bridge"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="auth-userid"
                      className="block text-xs font-semibold uppercase tracking-wider text-ink/80"
                    >
                      {t.login.userIdLabel}
                    </label>
                    <input
                      id="auth-userid"
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder={t.login.userIdPlaceholder}
                      className="mt-1.5 w-full rounded-md border border-mist bg-surface px-3.5 py-2.5 font-mono text-base sm:text-sm text-ink shadow-sm placeholder:text-ink/40 focus:border-bridge focus:outline-none focus:ring-1 focus:ring-bridge"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="auth-password"
                        className="block text-xs font-semibold uppercase tracking-wider text-ink/80"
                      >
                        {t.login.passwordLabel}
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="text-xs text-bridge hover:underline font-mono"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    <input
                      id="auth-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.login.passwordPlaceholder}
                      className="mt-1.5 w-full rounded-md border border-mist bg-surface px-3.5 py-2.5 font-mono text-base sm:text-sm text-ink shadow-sm placeholder:text-ink/40 focus:border-bridge focus:outline-none focus:ring-1 focus:ring-bridge"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: DigiLocker Institutional SSO Mode */}
              {authTab === "digilocker" && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="rounded-lg border border-mist bg-paper/60 p-3.5">
                    <div className="flex items-center gap-2.5">
                      <svg className="h-6 w-6 text-bridge shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <div>
                        <h3 className="text-sm font-bold text-ink">
                          {t.login.digilockerHeading}
                        </h3>
                        <p className="text-xs text-ink/70">
                          {t.login.digilockerDesc}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="auth-digi-id"
                      className="block text-xs font-semibold uppercase tracking-wider text-ink/80"
                    >
                      {t.login.digilockerIdLabel}
                    </label>
                    <input
                      id="auth-digi-id"
                      type="text"
                      value={digiLockerId}
                      onChange={(e) => setDigiLockerId(e.target.value)}
                      placeholder={t.login.digilockerIdPlaceholder}
                      className="mt-1.5 w-full rounded-md border border-mist bg-surface px-3.5 py-2.5 font-mono text-base sm:text-sm text-ink shadow-sm placeholder:text-ink/40 focus:border-bridge focus:outline-none focus:ring-1 focus:ring-bridge"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="auth-digi-pin"
                      className="block text-xs font-semibold uppercase tracking-wider text-ink/80"
                    >
                      {t.login.digilockerPinLabel}
                    </label>
                    <input
                      id="auth-digi-pin"
                      type="password"
                      maxLength={6}
                      value={digiLockerPin}
                      onChange={(e) => setDigiLockerPin(e.target.value)}
                      placeholder={t.login.digilockerPinPlaceholder}
                      className="mt-1.5 w-full rounded-md border border-mist bg-surface px-3.5 py-2.5 font-mono text-base sm:text-sm tracking-[0.2em] text-ink shadow-sm placeholder:text-ink/40 focus:border-bridge focus:outline-none focus:ring-1 focus:ring-bridge"
                    />
                  </div>

                  <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-mist text-bridge focus:ring-bridge"
                    />
                    <span className="text-xs leading-relaxed text-ink/75">
                      {t.login.digilockerConsent}
                    </span>
                  </label>
                </div>
              )}

              {/* Shared Captcha Box (for Tab 1 and Tab 2) */}
              {authTab !== "digilocker" && (
                <div className="pt-1">
                  <label
                    htmlFor="auth-captcha"
                    className="block text-xs font-semibold uppercase tracking-wider text-ink/80"
                  >
                    {t.login.captchaLabel}
                  </label>
                  <div className="mt-1.5 flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 shrink-0">
                      <div
                        className="flex h-10 select-none items-center justify-center rounded-md border border-mist bg-paper/80 px-3.5 font-mono text-base sm:text-lg font-extrabold tracking-[0.2em] text-bridge line-through decoration-marigold decoration-2"
                        aria-label={`Captcha code: ${captchaCode}`}
                      >
                        {captchaCode}
                      </div>
                      <button
                        type="button"
                        onClick={generateCaptcha}
                        title={t.login.captchaRefresh}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-mist bg-surface text-ink/70 hover:border-bridge hover:text-bridge transition-colors"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M23 4v6h-6M1 20v-6h6" />
                          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                        </svg>
                      </button>
                    </div>
                    <input
                      id="auth-captcha"
                      type="text"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder={t.login.captchaPlaceholder}
                      className="flex-1 min-w-[120px] rounded-md border border-mist bg-surface px-3.5 py-2.5 font-mono text-base sm:text-sm text-ink shadow-sm placeholder:text-ink/40 focus:border-bridge focus:outline-none focus:ring-1 focus:ring-bridge uppercase"
                    />
                  </div>
                </div>
              )}

              {/* Dynamic Submit Button Based on Active Tab */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-bridge px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-[0_2px_0_0_#0d3237] hover:bg-bridge-light active:translate-y-[1px] active:shadow-none transition-all disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>{t.login.signingIn}</span>
                    </>
                  ) : (
                    <span>
                      {authTab === "otp"
                        ? `${t.login.verifyOtpBtn} →`
                        : authTab === "password"
                        ? `${t.login.signInPasswordBtn} →`
                        : `${t.login.digilockerSsoBtn} →`}
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right / Dedicated Side Dialog (DigiLocker Style) */}
          <aside className="border-t md:border-t-0 md:border-l border-mist bg-paper/60 p-4 sm:p-7 lg:p-8 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              {/* Disclaimer Alert Box */}
              <div className="rounded-xl border border-marigold/50 bg-marigold/10 p-3.5 sm:p-4 shadow-sm">
                <p className="text-xs font-bold text-marigold-deep flex items-center gap-1.5">
                  <svg className="h-4 w-4 shrink-0 text-marigold-deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <span>{t.login.demoNoticeHeading}</span>
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink/80">
                  {t.login.demoNoticeBody}
                </p>
                <p className="mt-2 text-xs font-bold leading-relaxed text-ink border-t border-marigold/25 pt-2">
                  {t.login.demoNoticeBold}
                </p>
              </div>

              {/* Demo Credentials Card */}
              <div className="rounded-xl border border-mist bg-white p-3.5 sm:p-4 shadow-sm space-y-3">
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-ink/75 flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 text-marigold-deep fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    <span>{t.login.demoCardHeading}</span>
                  </p>
                  <p className="font-mono text-xs text-marigold-deep mt-1 break-words">
                    {authTab === "otp"
                      ? "Aadhaar / Mobile: 98765-43210 • OTP: 123456"
                      : authTab === "password"
                      ? "PAN: AAACT1234F • ID: TRUSTEE_ADMIN_01"
                      : "DigiLocker ID: 98765-43210 • PIN: 123456"}
                  </p>
                  <p className="font-mono text-[11px] text-ink/60 mt-0.5">
                    Role: Managing Trustee / President
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={handleFillDemo}
                    className="w-full inline-flex min-h-10 items-center justify-center gap-1.5 rounded-md border border-marigold bg-marigold/15 px-3 py-2 text-xs font-bold text-ink hover:bg-marigold/25 active:translate-y-[1px] transition-all"
                  >
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    <span>{t.login.demoCardFill}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleInstantSignIn}
                    className="w-full inline-flex min-h-10 items-center justify-center gap-1.5 rounded-md bg-marigold px-3 py-2 text-xs font-bold text-ink shadow-[0_2px_0_0_#96690f] hover:bg-[#d69828] active:translate-y-[1px] active:shadow-none transition-all"
                  >
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    <span>{t.login.instantDemoBtn}</span>
                  </button>
                </div>

                <p className="text-[11px] text-ink/60 text-center leading-snug">
                  {t.login.demoCardFillSub}
                </p>
              </div>
            </div>

            <div className="border-t border-mist pt-3 sm:pt-4">
              <Link
                href="/"
                className="text-xs text-bridge underline decoration-bridge/40 hover:decoration-bridge font-medium"
              >
                ← Back to SevaSetu Home
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center font-mono text-sm text-ink/60">Loading SSO portal…</div>}>
      <LoginForm />
    </Suspense>
  );
}

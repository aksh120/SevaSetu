# SevaSetu  -  Task Checklist

Gates: each phase ends with a pause + summary checkpoint before starting the next.

## Phase 0  -  Skeleton & live URL
- [x] Init Next.js (App Router) + TypeScript + Tailwind project
- [x] Add color/font tokens (plan.md §5) to tailwind config + next/font/google (Plex Sans/Mono)
- [x] Verify WCAG AA contrast on all token text pairings; adjust shades if needed
- [x] Shared layout shell: header w/ wordmark, footer w/ mandatory disclosure line
- [x] Deploy placeholder to Vercel; confirm public URL opens with zero login
- **Done when:** live Vercel URL exists and reflects SevaSetu design tokens. ✅ Live: https://sevasetu.vercel.app

## Phase 1  -  Intake & roadmap engine
- [x] Intake screen  -  all 4 fields exactly per wireframe copy (org name, structure status,
      funding multi-select, org age)
- [x] Roadmap engine  -  branching logic exactly per content file: 5 fixed steps +
      CSR-1 (+CSR funding) + FCRA (+foreign funding)
- [x] FCRA dependency rule: Darpan ID required + track-record honesty callout card
      ("start paperwork now, approval not realistic yet" for new orgs)
- [x] Roadmap screen: step cards (order, name, one-line why, status badge, Start/Continue CTA),
      empty state copy per wireframe
- [x] Bridge SVG signature element: outline/solid/marigold states, reusable full-width + compact
- [x] Seed 2–3 mock NGO personas covering different branches
- [ ] Confirm OpenAI API key + Vercel env var setup for Phase 3 ← needs your API key added as `OPENAI_API_KEY` in Vercel project settings
- **Done when:** different intake answers visibly produce different, correctly-ordered roadmaps. ✅ Verified via `npm run verify:roadmap` (5/5 cases)

## Phase 2  -  Guided modules & Dashboard
- [x] ONE data-driven Guided Module component consuming all 7 content-file entries
      (What it is / Why you need it / What you'll need checklist)
- [x] Mocked document checklist: checkbox + Upload marks item uploaded (no real storage)
- [x] Submit for review: disabled until checklist complete (tooltip per wireframe);
      submit → Submitted status → confirmation copy from "what happens after you submit" line
- [x] Dashboard: progress summary ([X] of [Y] + progress bar), highlighted "Next up",
      full status list, compact bridge, Notice Translator cross-link card
- [x] Status badges: icon/label + color (never color-only)
- **Done when:** full journey clickable: intake → module → submit → dashboard reflects it. ✅ Verified locally (lint/build/tests/smoke); NOT yet deployed  -  awaiting go-ahead.

## Phase 3  -  Notice Translator
- [x] Server-side API route calling OpenAI model (key from env, never client-side)
- [x] Output rendered as the 3 fixed sections: What this means / What you need to do / By when
- [x] Pre-loaded example notice for reliable live demo; paste-input path wired to same endpoint
- [x] Loading + error states using generic error microcopy
- **Done when:** translator visibly runs live against the model during demo. ✅ Live on Groq
      (gpt-oss-120b, qwen3.6-27b fallback, 4-step degradation chain)  -  English + Hindi
      verified 200 against the real API; key in gitignored .env.local only.

## Phase 4  -  Honesty layer, accessibility, mobile
- [x] Consistent "Mocked" badge on every screen/action that would touch a real system
- [x] Visible "About this build" screen: what's real, what's mocked, how it scales
- [x] Real-device/small-viewport pass: tap targets, line lengths, keyboard usability
- [x] Slow-3G throttled run: core journey completes
- [x] Sensitive-data sweep: only obvious placeholder patterns anywhere
- **Done when:** every mocked touchpoint labeled; journey passes on throttle. ✅ 18/18 Playwright checks on iPhone-13 viewport @ Slow-3G (~39s full journey); screenshots reviewed; sweep clean.

## Phase 5  -  Final QA vs brief
- [x] Full click-through as first-time visitor, desktop + phone, start to finish
- [x] Live link opens with zero login/access request (incognito verify)
- [x] Acceptance checklist (plan.md §10) verified item by item
- [ ] Demo video + written summary assets ready ← written summary + shot-by-shot script done (docs/SUBMISSION.md); recording is a human step
- **Done when:** submission-ready. ◐ Code QA complete (26/26 on clean prod build, both devices). Live URL verified 200/no-login but serves the stale Phase-1 build  -  one `vercel --prod` push (awaiting go-ahead) + API key in Vercel env brings it level with the repo.

## Phase 6  -  Added scope (post-brief, user-approved; see plan.md §11)
- [x] Approved-status simulation: submittedAt timestamps + time-derived Approved flip
      (~15s), refresh-safe; bridge fills pylon by pylon; labeled as simulated review
- [x] Demo-mode seed: Landing button loads persona with staggered approvals (last one
      approves live on screen); Dashboard "start over" reset
- [x] Print/export roadmap: print button + stylesheet; clean one-page output
- [x] Hindi language toggle: EN/HI dictionaries for all six screens + 7 registration
      entries; persisted choice; translator answers in the notice's language
- **Done when:** all four verified by extended e2e (approval flip, seed, toggle, print)
      + screenshots reviewed; nothing deployed without go-ahead. ✅ 36/36 e2e checks on
      clean prod build; Hindi + print screenshots reviewed. Still local-only.

## Phase 6.1  -  Design polish pass (anti-slop audit)
- [x] Institutional craft pass: header mark + active nav + dark rule, PROTOTYPE phase
      banner, dark footer bookend, display-type landing (3-step strip + bridge preview +
      chain chips), roadmap task-list pattern (numbered circles + connector), dashboard
      big-numeral progress, pressed-edge buttons, section rules, rectangular status tags,
      150ms transitions, marigold selection color, OpenGraph image + metadata
- [x] Audited against the 35 AI-slop tells: none present (Plex not Inter, no gradients/
      glassmorphism/grids/sparkles/eyebrow-hero, left-stripes only on 2 genuine callouts,
      transitions everywhere, OG configured, meta titles set, static fast pages)
- **Done when:** e2e still green + screenshots reviewed at desktop + phone. ✅ 36/36;
      fixed a mobile header collision found in review. Still local-only.

## Phase 6.2 — Density, width & Indian-identity pass
- [x] Tricolor top strip (saffron/white/green) — Indian gov identity, not endorsement
- [x] Document-formality: every core page gets a formal header band (Prepared for /
      Reference SS-2026-XXXX / Generated date / Steps count, in mono)
- [x] Full-width layouts (max-w-7xl): roadmap + sticky sidebar (legend, next-up, full
      chain with struck-out conditional steps); dashboard 3-panel top + denser rows;
      translator 2-col workbench (input | live output + how-it-works + Groq privacy note)
- [x] Landing: stats band (7/2/2/0), "built for" card row, side-by-side bridge + steps
- [x] Footer: 3-column (brand+disclosure | product links | numbered registration chain)
- [x] New suspension-bridge SVG: tapered towers + crossbeams, draped main cable with
      hangers, anchorages, spans build in teal as steps complete
- **Done when:** 36/36 e2e green on clean build; desktop screenshots reviewed (roadmap,
      dashboard, translator incl. live Groq result). ✅ Still local-only.

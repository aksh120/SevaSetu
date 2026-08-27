# SevaSetu  -  Build Plan

## 1. What this is (restated)

SevaSetu is a hackathon prototype (Build What Moves India  -  Varun Mayya × OpenAI):
a copilot that takes first-time Indian NGO founders through the exact registration
chain *their* NGO needs, in plain English, instead of five unrelated government
portals in legal language.

The core product loop:
**Intake answers → branching roadmap engine → guided modules → status dashboard**,
plus an AI Notice Translator that proves an OpenAI model is meaningfully in the product.

Judging weights six things  -  problem, working build, usability, product thinking,
end-to-end thinking, honesty. Every phase below maps back to these.

## 2. Source-of-truth documents (do not deviate)

- `docs/ngo-copilot-registration-content.md`  -  7 registration types, roadmap branching logic
- `docs/ngo-copilot-wireframe-copy.md`  -  6 screens, field-by-field copy

All copy, branching logic, and screen structure come from these files verbatim.

## 3. Non-negotiable constraints

1. Zero contact with real government systems  -  no live NGO Darpan / income-tax / MHA, even read-only.
2. No real sensitive data anywhere, including mocks. Placeholder patterns only (`PAN: AAAAA0000A`).
3. No government logos/emblems; no styling implying endorsement.
4. Footer on every page: "Independent hackathon prototype  -  not an official government product,
   not affiliated with or endorsed by any government body."
5. Live URL opens for a first-time visitor with zero login/access request.
6. Every screen works end-to-end  -  no static mockup screens.

## 4. Tech stack

- Next.js (App Router) + TypeScript + Tailwind CSS → deployed on Vercel
- State: React state (useState/useReducer; Zustand only if needed). 2–3 mock NGO personas as seed data. No database.
- Phase 3 calls an OpenAI model from a server-side route; key lives in Vercel env vars, never client-side.
- **Phase 0 deploys before any real feature**  -  de-risk the public URL requirement day one.

## 5. Design system

GOV.UK-inspired: restrained, high-contrast, left-aligned, thin teal top bar, no decoration.
Not a startup landing page. Explicitly banned: cream+serif+terracotta template look,
dark bg + acid accent, centered hero + gradient blob, glassmorphism/neumorphism,
scroll-triggered sparkle animation.

Tokens (verify WCAG AA 4.5:1 on all text pairings during Phase 0):

| Token | Hex | Role |
|---|---|---|
| ink | #16211F | primary text |
| bridge | #14464D | primary brand |
| bridge-light | #1D5F68 | hover/secondary |
| paper | #F5F6F4 | background |
| mist | #DCE3E0 | borders/cards/dividers |
| marigold | #C1861F | accent  -  CTAs/highlights only |

Typography: IBM Plex Sans (headings/body), IBM Plex Mono (application IDs, statuses,
timestamps) via `next/font/google`. Status never conveyed by color alone  -  always icon/label too.

Signature element: hand-built line-drawn SVG bridge, one pylon per roadmap step  - 
outline = not started, solid bridge teal = complete, marigold = current next step.
Full-width on Roadmap, compact on Dashboard. The one custom piece; everything else
is one component source re-skinned with these tokens.

Writing style: active voice, plain verbs, buttons say what happens ("Submit for review"),
empty/error states state facts + next action.

## 6. Component policy

One source only: **Untitled UI (React)** structure/behavior (React Aria-based),
re-skinned with our tokens  -  never ship default theme. Deliberately excluded:
Aceternity UI (entirely), Uiverse.io, Shuffle.dev.

## 7. Information architecture

Six screens: Landing → Intake → Roadmap → Guided Module (ONE data-driven templated
component across all 7 registration types  -  never seven bespoke pages) → Dashboard →
Notice Translator.

## 8. Phase breakdown (confirmed, with done-when gates)

Phase 0  -  Skeleton & live URL: init project, deploy placeholder to Vercel, tokens,
header/footer shell. **Gate:** live URL reflects SevaSetu design.
Phase 1  -  Intake & roadmap engine: intake form, exact branching logic from content file,
Roadmap screen incl. FCRA "not yet achievable" callout card, bridge SVG.
**Gate:** different intake answers visibly produce different roadmaps.
Phase 2  -  Guided modules & Dashboard: one templated module data-driven from all 7 entries,
mocked checklist/upload, submit→status→confirmation flow, dashboard w/ progress,
next-action highlight, compact bridge.
**Gate:** full journey clickable intake→module submit→dashboard.
Phase 3  -  Notice Translator: real server-side OpenAI call returning the 3-part output
(means / do / by when), pre-loaded example notice for reliable demo.
**Gate:** runs live during demo, not a canned screenshot.
Phase 4  -  Honesty layer, accessibility, mobile: consistent "Mocked" badge everywhere,
visible "About this build" screen (real vs mocked vs scaling), real small-viewport mobile
pass, slow-3G throttled journey test.
**Gate:** every mocked touchpoint labeled; core journey completes on throttle.
Phase 5  -  Final QA vs brief: full click-through desktop+phone as first-time visitor,
no-login check, sensitive-data scan, ready for demo video + written summary.

## 9. Risks & feasibility flags

1. **Untitled UI React licensing**  -  the brief assumes it's free/open-source; the official
   React library is a paid product. Fallback: build the handful of needed primitives
   (progress steps, upload rows, badges, alerts, toggles) directly on React Aria Components
   (free, MIT) styled with our tokens. Same outcome, same accessibility guarantees.
2. **OpenAI key availability**  -  Phase 3 blocks without a funded key + Vercel env access;
   confirm by end of Phase 1 so there's time to debug server-side streaming/latency.
   If unavailable at demo time: graceful fallback UI that clearly labels the translator
   as offline  -  flagged honestly rather than faked.
3. **Timeline density**  -  Phases 0–2 are the critical path (they carry the "personalized"
   claim); Phase 4 must not be compressed below the mocked-badge consistency work, since
   honesty is a named judging criterion.
4. **Content accuracy figures**  -  thresholds/durations marked [verify] in the content file
   ship as-is with an "illustrative" label; do not present as fact.

## 10. Acceptance checklist (mapped to judging)

- Problem  -  About screen states who this serves and why today fails them
- Working build  -  full journey start-to-finish on live URL, no login wall
- Usability  -  mobile-first, plain English, works throttled, status never color-only
- Product thinking  -  branching roadmaps differ correctly per intake answers
- End-to-end thinking  -  About screen scaling section + visible mocked-vs-real labeling
- Honesty  -  Mocked badge applied consistently, visible in the demo video

## 11. Phase 6  -  added scope (post-brief, user-approved)

Beyond the original six phases, all four selected:

1. **Approved-status simulation**  -  submitted steps flip to Approved after a short,
   visible delay (time-derived, refresh-safe), lighting up the bridge pylon-by-pylon.
   Labeled as simulated review.
2. **Demo-mode seed**  -  one click on Landing loads a persona with a mostly-finished
   dashboard (staggered approval timestamps) so judges see a lived-in state instantly;
   session reset provided on Dashboard.
3. **Print/export roadmap**  -  print stylesheet + button producing a clean one-page
   roadmap (org name, steps, why, status, disclaimer) to carry to an agent/CA.
4. **Hindi language toggle**  -  full UI + registration-content translation (EN/HI),
   persisted choice; translator instructed to answer in the notice's language.

Constraints from Phases 0–5 still apply: no deploy without explicit go-ahead;
honest labeling for every simulated behavior.

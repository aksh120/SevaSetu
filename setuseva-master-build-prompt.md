# SevaSetu  -  Master Build Prompt

Paste this whole document into Codex as the opening brief. Before writing any code: restate this plan in your own words, flag anything that looks infeasible in the time available, and confirm or adjust the phase breakdown below. Then build phase by phase  -  pause after each phase, summarize what's done and what's left, and don't start the next phase without that checkpoint.

Two files must be in the repo (put them in a `/docs` folder) before you start, and they are the source of truth for all copy, the registration branching logic, and the screen structure  -  don't invent different copy or a different information architecture:
- `ngo-copilot-registration-content.md`  -  the seven registration types, their plain-English content, and the roadmap branching logic
- `ngo-copilot-wireframe-copy.md`  -  the six screens, field by field, with exact copy

---

## 0. What this is

SevaSetu is a prototype for the Build What Moves India hackathon (Varun Mayya × OpenAI): a copilot that gives first-time NGO founders in India a personalized, plain-English roadmap through the registration chain their NGO actually needs  -  instead of five unrelated government portals in legal language. Submissions are judged on six things: is the problem real, does the main journey actually work, is it simpler and more accessible, how thoughtful is the product reasoning, does it hold up end-to-end, and how honest it is about what's mocked. Build with all six in mind at every phase, not just at the end.

## 1. Non-negotiable constraints (apply throughout, not just at the end)

- Nothing in this build ever contacts a real government system  -  no live NGO Darpan, income-tax e-filing, or MHA connection, not even read-only.
- No real Aadhaar numbers, PAN details, passwords, OTPs, payment details, or any other sensitive data anywhere  -  including in mock data. Use obviously fake placeholder values (e.g. `PAN: AAAAA0000A`, clearly a placeholder pattern, not a real-looking one).
- No government logos or emblems, and no visual styling that implies official endorsement or partnership.
- Footer on every page, small but legible: "Independent hackathon prototype  -  not an official government product, not affiliated with or endorsed by any government body."
- The live URL must open in a browser with zero login or access request for a first-time visitor.
- The full citizen journey must actually work end to end  -  no screen that's a static mockup with no logic behind it.

## 2. Tech stack

- Next.js (App Router) + TypeScript + Tailwind CSS. Deploy to Vercel  -  free, fast, and gives you a working public URL in minutes.
- No real database needed. This is a demo: hold state in React (`useState`/`useReducer`, or Zustand if the state gets tangled) and hard-code 2–3 mock NGO personas as seed data. Optimize for "reliably re-runnable live in front of judges," not persistence.
- The Notice Translator (Phase 3) calls a real OpenAI model server-side. Store the API key as a Vercel environment variable and call it from a Next.js API route or server action  -  never expose it in client-side code.
- **Get Phase 0 deployed and publicly live before building any real feature.** An empty placeholder page at a working public URL solves the single riskiest submission requirement on day one instead of on the last night.

## 3. Design system

The brief's own words already pin the direction: minimalistic, doesn't look AI-generated, modern government website. That's a real, well-established reference point  -  think GOV.UK's design system: restrained color, strong type hierarchy, high accessibility contrast, almost no decoration, trustworthy without being cold. Build toward that, not toward a startup landing page.

**Explicitly avoid** (these are the current tells of an AI-generated template, not a designed product):
- Warm cream background with a high-contrast serif headline and a terracotta/clay accent
- Near-black background with a single acid-green or vermilion accent
- Centered hero, big soft gradient blob behind the headline, generic rounded-full pill buttons everywhere
- Glassmorphism, neumorphism, or any 3D-tilt/glow card effect
- Scroll-triggered animation on every section, sparkles, or ambient background motion with no functional purpose

**Color tokens**  -  drop directly into `tailwind.config`:
```
colors: {
  ink: '#16211F',        // primary text
  bridge: '#14464D',     // primary brand  -  deep teal, the "crossing" color
  'bridge-light': '#1D5F68', // hover/secondary shade of bridge
  paper: '#F5F6F4',      // background  -  cool neutral, NOT warm cream
  mist: '#DCE3E0',       // borders, card backgrounds, dividers
  marigold: '#C1861F',   // accent  -  used sparingly, CTAs and key highlights only
}
```
Verify every text/background pairing hits WCAG AA contrast (4.5:1 for body text)  -  adjust shade values if needed while keeping the same hue and role. Status must never be conveyed by color alone (pair every status badge with an icon or label too  -  this matters for the "accessible" half of the Usability score).

**Typography:** IBM Plex Sans for headings and body (different weights, same family  -  deliberate, not neutral-default Inter), IBM Plex Mono for anything that reads as an official artifact: application IDs, status codes, timestamps. The mono face is doing real work here, not decoration  -  it's what makes a tracked application feel like a real tracked application. Import both via `next/font/google`.

**Layout:** left-aligned content, not centered-hero. A persistent thin header in `bridge` teal (the GOV.UK top-bar convention). Reading-heavy screens (the guided modules) capped around 640–720px wide; the dashboard can run wider.

**Signature element  -  build this once, reuse everywhere:** a minimal line-drawn SVG bridge, one pylon per roadmap step. Unlit/outline for steps not started, fills solid `bridge` teal as each step completes, `marigold` marks the current next step. This is the one bold, bespoke piece  -  it's justified because the roadmap genuinely is a sequence, not decoration for its own sake. Full-width on the Roadmap screen, a compact version on the Dashboard. Everything else in the interface stays quiet and disciplined around it.

**Writing:** active voice, plain verbs, no filler. A button says what happens when you press it ("Submit for review," not "Submit"). Empty and error states explain what's true and what to do next, not an apology.

## 4. UI component library  -  one source, on purpose

Stitching together several component libraries with different visual languages is itself a common way a build ends up looking generic and AI-assembled  -  every library carries its own subtle tells. So this build draws from exactly **one**: **Untitled UI (React)**  -  free, open-source, built on React Aria (genuinely accessible) and Tailwind. It already covers everything this build needs: progress steps for the roadmap, file uploaders for the document checklist, badges and alerts for status, empty states, toggles, loading indicators. Pull structure and behavior from here, then re-skin every instance with the tokens in Section 3  -  shipping its default theme as-is is the fastest way to look like every other hackathon project built on it this week.

The bridge SVG signature element (Section 3) is the one fully custom piece, hand-built for this brief specifically  -  everything else comes from Untitled UI, reskinned.

**Deliberately not used:**
- **Aceternity UI**  -  dropped entirely, not just used sparingly. Its whole visual identity  -  glowing borders, aurora backgrounds, 3D-tilt cards, sparkles, vortex backgrounds  -  is the current default look of an AI-generated SaaS site. No component from this library, including "restrained" ones, belongs in a build that's explicitly trying not to look like that.
- **Uiverse.io**  -  not needed. Untitled UI already supplies toggles, checkboxes, and loading indicators, so there's no gap left for it to fill, and cutting it removes another source of visual inconsistency.
- **Shuffle.dev**  -  paywalled, and skews toward marketing-page sections rather than application UI. No loss in leaving it out.

## 5. Information architecture

Six screens, defined field-by-field in `ngo-copilot-wireframe-copy.md`: Landing → Intake → Roadmap (personalized) → Guided Module (one template, repeats across all seven registration types from the content file) → Dashboard → Notice Translator. Build the Guided Module as one data-driven component, not seven bespoke screens  -  this is both faster to build and a stronger "product thinking" signal than seven hand-written pages.

## 6. Build phases

**Phase 0  -  Skeleton and live URL**
Init the Next.js + TypeScript + Tailwind project. Deploy an empty/placeholder version to Vercel immediately  -  confirm the public URL loads with no login wall before anything else. Wire up the color and font tokens from Section 3. Build the shared layout shell: header with the SevaSetu wordmark, footer with the mandatory disclosure line from Section 1.
*Done when:* a live Vercel URL exists and reflects the SevaSetu design tokens, even with no real features yet.

**Phase 1  -  Intake and the roadmap engine**
Build the Intake screen. Build the branching logic exactly as specified in the content file's "Roadmap logic" section. Build the Roadmap screen, including the callout card for a conditional step that's been added but isn't realistically achievable yet (e.g. FCRA for a brand-new org). Build the bridge SVG signature element here  -  this is the one place it must work correctly before anything else, since it's reused everywhere downstream.
*Done when:* filling the intake form with different answers visibly produces different roadmaps. This is the single most important interaction in the whole build  -  it's the "personalized" claim made real.

**Phase 2  -  Guided modules and Dashboard**
Build the one templated guided-module component, data-driven from the seven entries in the content file. Mocked document checklist (marks items uploaded, no real file storage). Submit → status transition → confirmation copy, per the content file's "what happens after you submit" line for each type. Build the Dashboard: progress summary, next-action highlight, full status list, compact bridge visualization.

**Phase 3  -  Notice Translator**
Wire a real server-side call to an OpenAI model that takes notice text and returns the three-part output specified in the wireframe copy (what this means / what to do / by when). Pre-load one example notice for a reliable live demo rather than building a general-purpose parser in the time available. This feature is what proves an OpenAI model is meaningfully part of the product, not just the coding process  -  make sure it visibly runs live during a demo, not as a canned screenshot.

**Phase 4  -  Honesty layer, accessibility, mobile**
Add a small, consistent "Mocked" badge on every screen or action that would touch a real government system in production. Build the in-app "About this build" surface: what's real, what's mocked, how it could scale  -  this directly answers two of the six judging criteria, so it needs to be an actual visible screen, not a buried README line. Full mobile pass at a real small viewport (not a resized desktop window): tap target sizes, line lengths, on-screen-keyboard usability. Throttle to slow 3G in devtools and confirm the core journey still completes.

**Phase 5  -  Final QA against the brief**
Full click-through as a first-time visitor, start to finish, on both desktop and phone. Confirm the live link opens with zero login or access request. Confirm no real sensitive-looking data appears anywhere. Ready for the demo video and the written summary.

## 7. Acceptance checklist, mapped to judging

- **Problem**  -  the "About this build" screen states plainly who this is for and why the current experience fails them
- **Working build**  -  full journey clickable start to finish on the live URL, no login wall
- **Usability**  -  mobile-first, plain English throughout, functions on a throttled connection, status never color-only
- **Product thinking**  -  the branching roadmap is the core proof point; different intake answers produce visibly different, correctly-sequenced roadmaps
- **End-to-end thinking**  -  the "About this build" screen's scaling section, plus visible mocked-vs-real labeling throughout
- **Honesty**  -  the "Mocked" badge pattern from Phase 4, applied consistently, not just mentioned in the video

# SevaSetu  -  Submission Summary

**Build What Moves India (Varun Mayya × OpenAI)**
Live: https://setuseva.vercel.app · Stack: Next.js 16 (App Router) · TypeScript · Tailwind CSS · OpenAI (server-side only)

---

## The problem

A first-time NGO founder in India must piece together five separate government
portals  -  structure registration, PAN, 12A, 80G, NGO Darpan  -  plus FCRA or CSR-1
depending on funding plans. Each speaks legal language, none explains the chain's
hidden order, and one wrong assumption wastes months. Founders stall, or pay agents
to guess for them.

## What SevaSetu does

Answer four questions about your NGO. Get the exact registrations *your* NGO needs,
in order, in plain English  -  then work through each one with a guided module, and
paste any confusing government letter into an AI translator that returns what it
means, what to do, and by when.

## Why the six judging criteria are met

| Criterion | Evidence |
|---|---|
| **Problem is real** | `/about` opens with who this serves and why the portal experience fails them. |
| **Main journey works** | 26/26 automated Playwright checks: full intake → roadmap → module → submit → dashboard click-through, on desktop and phone, fresh-visitor contexts, zero login. |
| **Simpler & more accessible** | Plain English throughout (copy taken verbatim from the content spec); 44px+ tap targets; 16px inputs (no iOS zoom); status always icon + label, never color-only; works on Slow-3G (throttled phone journey ~20s). |
| **Product thinking** | The branching roadmap engine: funding answers add CSR-1 and/or FCRA in correct dependency order; a brand-new org gets an honesty callout on FCRA ("start paperwork now, approval isn't realistic yet") instead of a silent dead step. Verified by unit tests (5/5) and e2e. |
| **End-to-end thinking** | `/about` scaling section (persistence, DigiLocker, live status, language); "Mocked" badge on every touchpoint that would hit a real government system. |
| **Honesty** | Visible mocked-vs-real labeling on-screen (not just in this doc); footer disclosure on every page; illustrative figures labeled as such; translator states plainly when it isn't connected. |

## What is real vs mocked

**Real:** the branching roadmap engine; the guided-module flow with persistent
session state; AI notice translation via a live model call (server-side, key never
in client code). The translator is **provider-agnostic**  -  it speaks the
OpenAI-compatible format and currently runs free on **Groq**, which contractually
never trains on customer data (same policy free and paid; no retention by default).
See `docs/ai-provider.md` for the full comparison.

**Mocked (labeled in-product):** document uploads (nothing stored or sent);
submissions and office statuses (local simulation  -  no government system is
contacted, not even read-only); example notice and personas; timeline figures
(illustrative).

## Known limitations

- Statuses never advance beyond "Approved"  -  approvals are simulated on a visible
  ~15-second timer after submitting (labeled in-product); no real office exists to approve.
- The translator runs on one pre-loaded example notice for demo reliability; the
  paste path hits the same live endpoint and answers in the notice's language.
- No persistence across sessions (by design: reliably re-runnable demo).

## Beyond the brief (Phase 6 additions)

- **Simulated approvals**  -  submitted steps flip to Approved after a visible delay;
  the bridge fills pylon by pylon, ending with a fully-lit span.
- **Demo mode**  -  "Demo: see a filled dashboard" on the landing seeds a persona with
  staggered approvals (the last one approves live on screen); "Start over" resets.
- **Print/export**  -  a print stylesheet turns the roadmap into a clean one-pager
  (org name, steps, why, status, disclaimer) to carry to an agent or CA.
- **Hindi interface**  -  full EN/हिं toggle covering every screen and all seven
  registration entries, persisted across visits; the AI translator answers in the
  language of the pasted notice.

---

## Demo video script (~90 seconds)

1. **Hook (0:00–0:10)**  -  Live URL in a browser, incognito, no login. Landing:
   "Cut through NGO paperwork before it slows you down." Click **Start my roadmap**.
2. **Personalization (0:10–0:30)**  -  Intake: name a trust, tick *foreign funding*,
   pick *Just starting out*. **Build my roadmap.** Roadmap appears: 6 steps, bridge
   graphic with marigold pylon on the current step. Scroll to FCRA  -  show the
   honesty callout. *Say:* "It didn't just add FCRA  -  it told the truth about when
   a new NGO can actually get it."
3. **Contrast the branch (0:30–0:40)**  -  Back, change funding to *CSR only*:
   roadmap drops to 6→6? No  -  show CSR-1 replacing FCRA, no callout. *Say:*
   "Different answers, different roadmap  -  that's the product."
4. **Guided module (0:40–0:60)**  -  Open Structure Registration. Hit Upload on each
   item (badge: *Mocked upload*). Submit for review → "Submitted!" → **Go to your
   dashboard**: progress bar moved, Next up = PAN, compact bridge shows one solid
   pylon.
5. **AI translator (0:60–0:80)**  -  Notice Translator → **Load example notice** →
   **Translate this** → live model output in three sections. *Say:* "A real OpenAI
   call, server-side  -  the pattern that makes every future notice readable."
6. **Honesty close (0:80–0:90)**  -  Scroll any page to footer disclosure; open
   `/about`. *Say:* "Every mocked touchpoint is labeled in the product. What's
   real is real; what isn't, says so."

*Pre-record a backup of the translator call in case of demo-day network issues.*

---

## QA log (Phase 5)

- Production build on clean port, first-time-visitor contexts: **26/26 e2e checks**,
  desktop + iPhone-13 viewport, zero unexpected console errors.
- Slow-3G throttled phone journey: completes end-to-end (~20.5s wall).
- Live URL: HTTP 200, no login/access wall.
- Sensitive-data sweep: no PAN/Aadhaar/phone/email/key patterns in repo; only the
  deliberate `AAAAA0000A` placeholder example in planning docs.
- WCAG AA contrast verified on all token pairings; status never color-only.

# SevaSetu — Logo Master Prompt

Paste this into Codex to generate the logo as SVG code directly — do not run this through an AI image generator. Image generators are unreliable at producing flat, clean, scalable vector marks, and they tend to default to gradients, bevels, and over-rendering: exactly the "AI-generated" look the rest of this build has been built to avoid. A logo built the same way as the app's UI — geometric shapes, hand-specified coordinates — will actually be consistent with it.

---

## Hard constraints — non-negotiable

- No government emblems, seals, or national symbols of any kind: no Ashoka Chakra, no Lion Capital, no ministry crests, no NGO Darpan / NITI Aayog / MCA / Income Tax Department / MHA logos, no state emblems.
- No circular badge or seal composition with text arced around the border. That shape alone reads as "official government stamp" regardless of color or content — avoid it independent of everything else on this list.
- No navy-and-gold official-seal color language.
- The logo's job is to look like a credible, independent product — not to make the mandatory "independent hackathon prototype" disclosure elsewhere in the app feel unnecessary.

## Build on the existing system, don't start from scratch

This should look like it belongs to the same product as the app, not a separate design exercise:
- **Colors:** `ink` #16211F, `bridge` #14464D, `bridge-light` #1D5F68, `paper` #F5F6F4, `mist` #DCE3E0, `marigold` #C1861F
- **Motif:** the minimal line-drawn bridge/pylon shape already built as the in-product roadmap progress indicator. The logo should be a refined version of that exact visual language, not a new one.
- **Typography:** IBM Plex Sans for the wordmark, same family used throughout the app.

## Concepts to build (generate two, then pick one)

**A — Pylon Bridge (primary direction).** Two or three vertical pylons connected by a single horizontal deck line, directly echoing the in-app progress element. Strongest option because it's not just on-brand, it's the *same* mark the user already sees mid-journey in the product — reinforcing recognition rather than adding a second visual language to learn.

**B — Negative-space arch.** A single rounded arch or crossing shape formed from the negative space between two simple geometric blocks. More abstract, still geometric and flat — worth generating as a comparison point, use if A reads as too literal at small sizes.

*(Lower priority, only if there's time: a monogram treating the "S" of Seva/Setu as a bridge-span shape. Clever but risks feeling gimmicky — don't over-invest here.)*

## What to avoid, beyond the government-specific list above

- Gradients, drop shadows, bevels, any 3D rendering
- An overly literal or realistic bridge illustration (suspension cables, photographic detail) — stay abstract and geometric
- Generic sector clichés: connected-dots/network icons, generic swooshes or orbs, handshake or people-silhouette icons (common NGO-logo defaults, and exactly the kind of template feel this brand is trying not to have)
- More than two colors in the primary mark — restraint matters more here than anywhere else in the product

## Deliverables

- Icon-only mark, tested at 16px (favicon), 32px, and 120px — it has to actually read at 16px, not just look fine at full size
- Combination lockup: icon + "SevaSetu" wordmark, horizontal
- Single-color version in `ink`, for footers, print, or any context that can't carry the full palette
- Reversed version (`paper` mark on a `bridge` background), for the dark header bar

## Technical spec

- Output as clean SVG — no unnecessary nested groups or editor metadata bloat
- Build it as a reusable component in the same pattern as the existing bridge progress element, so it's one shared piece of code, not a separately-maintained asset

# NGO Compliance Copilot  -  Screen-by-Screen Copy

Six screens: Landing → Intake → Roadmap → Guided Module (templated, repeats per step) → Dashboard → Notice Translator. Registration content referenced here (the "why," the document checklists) lives in `ngo-copilot-registration-content.md`.

---

## 1. Landing

**Headline:** Cut through NGO paperwork before it slows you down
**Subhead:** Answer a few questions. Get the exact registrations your NGO needs  -  in order, in plain English.
**CTA button:** Start my roadmap
**Small print under CTA:** Takes about 2 minutes. No documents needed yet.

---

## 2. Intake

**Title:** Tell us about your NGO

**Field 1  -  org name**
Label: What's your NGO called?
Placeholder: e.g. Afora Foundation

**Field 2  -  structure status**
Label: Do you already have a legal structure?
Options (single select): Not yet  -  help me pick / Yes, it's a Trust / Yes, it's a Society / Yes, it's a Section-8 Company

**Field 3  -  funding plans**
Label: Where do you expect funding to come from? Select all that apply.
Options (multi-select): Individual donations in India / CSR funding from Indian companies / Grants or donations from outside India / Not sure yet

**Field 4  -  org age**
Label: How long has your NGO been operating?
Options (single select): Just starting out / Less than 3 years / 3 years or more

**CTA button:** Build my roadmap

---

## 3. Roadmap (personalized  -  output of intake)

**Title:** Your registration roadmap
**Subhead:** Based on what you told us, here's what [Org Name] needs  -  and why.

**Each step is a card containing:**
- Order number + registration name
- One-line "why" (pulled from the content file)
- Status badge: Not started / In progress / Submitted / Approved
- CTA: Start this step (or Continue, once in progress)

**Special callout card**  -  only shown when a conditional step is added but not realistically achievable yet (e.g. FCRA for a brand-new org):
"You can start this later. [Step name] usually needs [prerequisite, e.g. 'a longer track record'] first  -  we'll let you know when it's worth pursuing."

**Empty state** (before intake is completed): Complete your NGO's profile to see your personalized roadmap.

---

## 4. Guided Module (template  -  repeats for each of the 7 registration types)

**Title:** [Registration name]
**Section  -  What it is:** [plain-English explainer from content file]
**Section  -  Why you need it:** [from content file]
**Section  -  What you'll need:**
Checklist, each item with a checkbox and a mocked "Upload" button:
- [ ] [Document 1]  -  Upload
- [ ] [Document 2]  -  Upload
- [ ] [Document 3]  -  Upload

**CTA button:** Submit for review
Disabled state tooltip (if checklist incomplete): Upload everything on the checklist to submit.

**Post-submit confirmation:**
Headline: Submitted!
Body: [one-line "what happens after you submit," from content file]
Status badge updates to: Submitted

---

## 5. Dashboard

**Title:** [Org Name]'s Compliance Dashboard
**Progress summary:** [X] of [Y] required steps complete (with a progress bar)
**Next action, highlighted above the list:** Next up: [next incomplete step name]
**Full list below:** every step from the roadmap with its current status badge
**Secondary card, lower on the page:** Confused by a letter from one of these offices? → links to Notice Translator

---

## 6. Notice Translator

**Headline:** Confused by a government notice?
**Subhead:** Paste the text, or upload the letter  -  we'll break down what it means and what to do.
**Input:** text area (placeholder: Paste the notice text here) with a secondary "Upload instead" option (mocked file picker)
**CTA button:** Translate this

**Output template (three short sections, always in this order):**
- **What this means:** [plain-English summary]
- **What you need to do:** [concrete next action]
- **By when:** [deadline if the notice states one, otherwise "No deadline stated  -  but don't leave it too long"]

For the demo, this can run on a single pre-loaded example notice rather than a fully general parser  -  the point is showing the pattern working end-to-end, not building a robust document parser in four days.

---

## Cross-cutting microcopy

- Generic error state (avoid blaming the user): Something went wrong on our end  -  try again in a moment.
- Every screen: short lines, large tap targets, no paragraph over ~3 lines  -  this is the part of the brief that explicitly grades for mobile and low-digital-literacy users, so it's worth protecting even under time pressure.

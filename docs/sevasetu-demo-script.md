# SevaSetu (सेतुसेवा) — 2-Minute Demo & Architecture Script (2:00 max)

> **Structure**: 
> - **Minute 1 (0:00–1:00)**: Citizen Demo — End-to-end journey from a first-time NGO founder's perspective.
> - **Minute 2 (1:00–2:00)**: How We Built It & Why — Tech choices, product honesty, and architecture.
>
> **Pacing**: Easy, conversational pace. Read time is roughly **1:45**, leaving plenty of breathing room.

---

## ⏱️ Minute 1: The Citizen Demo (0:00 – 1:00)

**[0:00 – 0:10] ON SCREEN: Landing page (`/`)**
> **Spoken**: *"Meet a founder starting an education NGO in Bihar. To register, they have to deal with five different government websites. Until they get approved, every donation goes into their personal bank account—taxed as personal income at up to 30%. Agents take advantage of this confusion, charging 2,000 to 15,000 rupees for every single step."*
>
> **Action**: Scroll past the hero and problem cards, showing the Indian Tricolor accent.

**[0:10 – 0:22] ON SCREEN: Tap "Start Registration Roadmap" → SSO Portal (`/login`) → Click "1-Click Fill & Instant Sign In"**
> **Spoken**: *"With SevaSetu, founders log in through a simple government sign-in portal using Aadhaar OTP, PAN, or DigiLocker in just one click."*
>
> **Action**: Click `⚡ 1-Click Fill & Instant Sign In` in the side dialog. Redirects instantly to `/intake`.

**[0:22 – 0:34] ON SCREEN: 60-Second Intake (`/intake`) → Dynamic Roadmap (`/roadmap`)**
> **Spoken**: *"Four quick questions ask about their goals. If they want foreign funding, the FCRA step shows up with an honest warning that they need three years of track record first. If not, it stays hidden. No one has to guess what applies to them."*
>
> **Action**: Select "Public Charitable Trust", toggle "Foreign Grants" on (showing warning card), then off. Click "Generate Registration Roadmap →".

**[0:34 – 0:46] ON SCREEN: Open Guided Module (`/module/12a`) → Click "Pull from DigiLocker (Demo)"**
> **Spoken**: *"Every step turns complicated legal language into simple words. Founders can pull their verified Aadhaar, PAN, and trust papers straight from DigiLocker in one click, without scanning them over and over."*
>
> **Action**: Open Step 3 (12A) $\rightarrow$ Click `Pull from DigiLocker (Demo)` $\rightarrow$ Authorize modal $\rightarrow$ Checkmarks turn green.

**[0:46 – 0:54] ON SCREEN: Submit Module → Live Dashboard (`/dashboard`) with Suspension Bridge**
> **Spoken**: *"When you submit, you see live progress on the dashboard. The bridge graphic lights up as each government step gets cleared."*
>
> **Action**: Click "Submit for Review →" $\rightarrow$ Dashboard displays ~15s live approval countdown; bridge pylon turns teal.

**[0:54 – 1:00] ON SCREEN: Notice Translator (`/notice-translator`) → Load sample notice → Click "Translate Notice with AI"**
> **Spoken**: *"And if you get a scary letter from the Income Tax office, our AI Notice Translator explains what it means, what to do next, and the exact deadline in plain words."*
>
> **Action**: Click "Notice Translator" $\rightarrow$ `Load sample notice` $\rightarrow$ `Translate Notice with AI →`. Output streams in.

---

## ⏱️ Minute 2: How We Built It & Why (1:00 – 2:00)

**[1:00 – 1:15] ON SCREEN: Codebase / Architecture Overview / `/about` Page**
> **Spoken**: *"We built SevaSetu with Next.js, React, TypeScript, and Tailwind. We tested everything with 36 automated tests—on desktop, mobile, slow internet, and across both English and Hindi."*
>
> **Action**: Open `/about`, showing the 7 integrated subsystems and radical honesty matrix.

**[1:15 – 1:30] ON SCREEN: Personalized Roadmap (`/roadmap`) / Dynamic Rules Engine**
> **Spoken**: *"For the core logic, we turned the complex government rules across seven departments into smart code. The app figures out the exact step order automatically—so no founder wastes time applying for 80G before 12A, or Darpan before PAN."*
>
> **Action**: Scroll the roadmap view, highlighting step badges and struck-out conditional branches.

**[1:30 – 1:45] ON SCREEN: Dashboard Pro-Bono CA Network Card → Click "Request Free CA Review" → Live Reference `CA-REV-84920`**
> **Spoken**: *"We stayed totally honest: no app can skip the in-person deed signing or the Delhi FCRA bank account. And software alone cannot sign an official CA audit certificate. So we built a Pro-Bono CA Network, letting founders send their full file to partner Chartered Accountants for free legal review."*
>
> **Action**: Click `Request Free CA Review` on `/dashboard` $\rightarrow$ Click Send $\rightarrow$ Live tracking card with 24–48hr SLA appears.

**[1:45 – 1:52] ON SCREEN: Header Language Toggle (`हिं`) → 1-Page Print/PDF Export (`/roadmap`)**
> **Spoken**: *"We designed this for everyday India: full English and Hindi support, dark and light modes, and a clean one-page printout to hand directly to trustees and lawyers."*
>
> **Action**: Click `हिं` in header (switches to Hindi) $\rightarrow$ Navigate to `/roadmap` and trigger Print preview.

**[1:52 – 2:00] ON SCREEN: Final Logo / Home (`/`)**
> **Spoken**: *"NGO founders are doing seva. SevaSetu is the bridge that gets them registered."*

---

## 📋 Presenter Timing & Screen Cue Cheat Sheet

| Time | Section | Screen & Action | Key Spoken Phrase |
|---|---|---|---|
| **0:00–0:10** | Citizen Problem | Landing (`/`) | *"Donations taxed as personal income at up to 30%..."* |
| **0:10–0:22** | Citizen Auth | SSO (`/login`) $\rightarrow$ 1-Click Sign In | *"Simple government sign-in portal in just one click..."* |
| **0:22–0:34** | Citizen Intake | Intake (`/intake`) $\rightarrow$ Roadmap (`/roadmap`) | *"Honest warning that they need 3 years of track record..."* |
| **0:34–0:46** | Citizen DigiLocker | Module (`/module/12a`) $\rightarrow$ DigiLocker Import | *"Pull verified papers straight from DigiLocker in one click..."* |
| **0:46–0:54** | Citizen Dashboard | Dashboard (`/dashboard`) | *"Bridge graphic lights up as each step gets cleared..."* |
| **0:54–1:00** | Citizen Translator | Notice Translator (`/notice-translator`) | *"Explains what it means, what to do next, and the deadline..."* |
| **1:00–1:15** | Tech Stack | About (`/about`) | *"Next.js, React, TypeScript... 36 automated tests..."* |
| **1:15–1:30** | Smart Step Order | Roadmap (`/roadmap`) | *"Figures out the exact step order automatically..."* |
| **1:30–1:45** | Pro-Bono CA & Honesty| Pro-Bono CA Modal on Dashboard | *"Send their full file to partner CAs for free review..."* |
| **1:45–1:52** | Accessibility & Print | Bilingual (`हिं`) & Print Preview | *"Full English and Hindi support, clean one-page printout..."* |
| **1:52–2:00** | Mission Close | Landing (`/`) | *"NGO founders are doing seva. SevaSetu is the bridge."* |

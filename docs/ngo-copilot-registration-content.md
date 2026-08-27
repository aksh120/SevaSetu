# NGO Compliance Copilot  -  Registration Content

A note on accuracy: the *structure* of this content (which registrations exist, what order they depend on, why each one matters) is solid. Specific figures  -  exact rupee thresholds, exact year counts  -  are marked "verify" below. For a hackathon prototype that's fine to ship as-is with an honest "illustrative" label; just don't present those exact numbers as fact if this ever goes beyond the demo.

---

## Roadmap logic (drives the personalized sequence)

Always required, in this order:
1. Structure Registration (Trust / Society / Section-8 Company)
2. PAN (for the organisation)
3. 12A Registration
4. 80G Registration
5. NGO Darpan Registration

Conditional, added based on intake answers:
- **+ CSR-1 Filing** if the founder says they plan to raise money from Indian company CSR budgets
- **+ FCRA Registration** if the founder says they plan to raise money from outside India (foreign donors, grants, or foreign nationals)

Hard dependency worth surfacing in the UI, not hiding: FCRA requires the NGO Darpan ID to already exist, and applicants generally need an established activity track record before they're even eligible to apply  -  the copilot should tell a brand-new NGO this up front ("you can start the paperwork now, but full FCRA approval isn't realistic until you've been operating for a while") rather than silently add a step that can't actually be completed yet. That honesty is itself a good moment to show in the demo.

---

## Step-by-step content

### 1. Structure Registration
**Plain-English:** Before an NGO can do almost anything official  -  open a bank account, apply for tax benefits, receive donations  -  it needs a legal structure. Most Indian NGOs register as a Trust, a Society, or a Section-8 Company (a company formed for a non-profit purpose instead of to make money).
**Why you need it:** This is the NGO's birth certificate. Nothing else on this list works without it.
**Document checklist (mocked):** registered office address proof, ID proof for each trustee/member/director, a draft trust deed or memorandum of association, passport-size photos.
**Typical timeline:** A few weeks, depending on the state and the structure chosen  -  Trusts and Societies register at the state level, Section-8 Companies register centrally through the MCA.

### 2. PAN (for the organisation)
**Plain-English:** A PAN for the organisation itself  -  separate from any individual's personal PAN  -  is what lets it be recognised for tax purposes and open a bank account in its own name.
**Why you need it:** Every tax-related registration below needs the organisation's own PAN first.
**Document checklist (mocked):** registration certificate from step 1, registered address proof.
**Typical timeline:** Usually issued within about two weeks online.

### 3. 12A Registration
**Plain-English:** 12A means the NGO itself doesn't pay income tax on the money it receives for its charitable work.
**Why you need it:** Without it, your NGO's own income can be taxed like a business's  -  even though none of it is profit.
**Document checklist (mocked):** registration certificate, trust deed/MOA, PAN, financial statements (not applicable for a brand-new org  -  mock as "N/A, new organisation"), a description of planned activities.
**Typical timeline:** New NGOs usually get a provisional registration first, valid for a few years [verify exact duration], then apply for the permanent one once they have an activity track record.

### 4. 80G Registration
**Plain-English:** 80G means people or companies who donate to your NGO can deduct part of that donation from their own taxable income  -  which makes donating to you meaningfully more attractive.
**Why you need it:** This is often what turns a hesitant donor into an actual one. Many companies and larger individual donors won't give without it.
**Document checklist (mocked):** 12A certificate (usually filed together with or right after 12A), PAN, activity details, bank account details.
**Typical timeline:** Filed alongside or right after 12A; same provisional-then-permanent pattern.

### 5. NGO Darpan Registration
**Plain-English:** A free listing with NITI Aayog that gives the NGO a unique ID (a "Darpan ID"). It's how the government keeps a directory of NGOs, and it's increasingly required as a prerequisite for other filings rather than just a nice-to-have listing.
**Why you need it:** You'll be asked for this ID again later  -  for FCRA, for some government scheme partnerships, and for certain CSR-related processes.
**Document checklist (mocked):** PAN, registration certificate, contact details of the chief functionary.
**Typical timeline:** Usually quick  -  mostly a matter of filling in the online form correctly the first time.

### 6. CSR-1 Filing (conditional  -  domestic CSR funding)
**Plain-English:** A one-time filing with the Ministry of Corporate Affairs that makes the NGO legally eligible to receive CSR (Corporate Social Responsibility) money from Indian companies.
**Why you need it:** Companies above a certain size are required to spend a slice of profits on CSR  -  but they can only give that money to NGOs that have filed this.
**Document checklist (mocked):** 12A and 80G certificates, registration certificate, PAN, a summary of past project work (mock as illustrative for a new org).
**Typical timeline:** Filed online; the real bottleneck is usually having 12A/80G already in place, not the CSR-1 filing itself.

### 7. FCRA Registration (conditional  -  foreign funding)
**Plain-English:** Permission from the Ministry of Home Affairs to legally receive money from outside India  -  foreign donors, international grants, or funds from a foreign national.
**Why you need it:** Receiving foreign money without this is a serious legal violation, not just a paperwork gap.
**Document checklist (mocked):** NGO Darpan ID, registration certificate, PAN, audited financials for prior years, activity reports.
**Typical timeline:** The slowest step on this list  -  realistically months, not weeks. Historically required roughly three years of prior existence and a minimum spend on activities before an NGO is even eligible to apply [verify current figures]; newer NGOs sometimes have a "prior permission" route for a specific one-off contribution instead of full registration  -  worth a one-line mention in the copilot even if not fully built out.

---

## Content style rules (keep these consistent across every module)

- No legal jargon in the main copy. If a technical term is unavoidable, name it once in parentheses after the plain-English version, then never use it again in that module.
- Every module ends with one sentence on "what happens after you submit"  -  this is what the status dashboard displays.
- Every "why you need it" answers in terms of what it unlocks for the NGO, never just "because the law requires it."

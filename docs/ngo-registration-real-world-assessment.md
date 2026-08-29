# NGO Registration: Real-World Journey and SevaSetu Product Assessment

**Status: Comprehensive System Assessment & Regulatory Architecture Document**

---

## Important Prototype Boundary

SevaSetu is a product prototype and navigation copilot. It is not a government department, registrar, tax authority, ministry, bank, or legal representative. Any document upload, review, submission, status, or approval shown in the product is simulated for demonstration. SevaSetu cannot directly register an NGO, issue a certificate, grant tax exemption, grant FCRA permission, approve CSR eligibility, or make an organisation official.

In a production version, official applications would be submitted to the relevant statutory authority (MCA, Income Tax, NITI Aayog, or MHA), and the authority alone decides the legal outcome.

---

## Executive Summary

Without an integrated copilot, a first-time NGO founder in India must resolve three distinct structural challenges simultaneously:

1. **Choosing the Correct Legal Form**: Trust (Indian Trusts Act / State Public Trusts Acts), Society (Societies Registration Act 1860), or Section 8 Company (Companies Act 2013).
2. **Navigating Dependent Sequential Filings**: Managing multi-portal prerequisite dependencies across 7 regulatory authorities.
3. **Maintaining Evidence, Handling Scrutiny, & Professional Signoff**: Complying with digital signature (DSC) requirements, CA certification, and statutory scrutiny notices.

The journey is not a single universal "NGO registration" form. The founder creates a legal entity first, secures an organisation PAN and dedicated bank account, and then applies for tax exemptions (Section 12A/80G) and NITI Aayog NGO Darpan. MCA CSR-1 and MHA FCRA follow conditionally based on funding goals and operating age. The exact authority, fees, forms, signing requirements, and in-person mandates vary significantly by legal structure and state.

SevaSetu addresses this friction by turning a fragmented administrative maze into a personalised sequential roadmap, explaining the rationale behind each filing, providing interactive document verification via DigiLocker, translating automated scrutiny notices via AI, and connecting grassroots founders directly with verified pro-bono Chartered Accountants for legal review.

---

## What Founders Must Do Without SevaSetu

### 1. Legal Entity Structure Selection

The founder must first understand that "NGO" is a broad public service classification, not a specific legal structure. The three operational pathways are:

- **Public Charitable Trust**: Created via a formal Trust Deed and registered with the local Sub-Registrar / State Charity Commissioner. Governed by the Indian Trusts Act 1882 or State Public Trusts Acts (e.g. Bombay Public Trusts Act). Requires minimum 2 trustees.
- **Societies Registration**: Governed by the Societies Registration Act 1860 or State Society Acts. Requires minimum 7 founding members (or 8+ across states for national scope) with a Memorandum of Association (MoA) and Rules & Regulations.
- **Section 8 Non-Profit Company**: Incorporated federally under the Companies Act 2013 via the Ministry of Corporate Affairs (MCA SPICe+ and INC-12/INC-32). Requires Director Identification Numbers (DIN), Digital Signature Certificates (DSC), and Central Registration Centre (CRC) scrutiny.

---

### 2. Multi-Portal Sequential Filing Matrix

| Statutory Need | Relevant Authority & Portal | What the Founder Must Execute |
|---|---|---|
| **1. Structure Incorporation** | State Sub-Registrar / Charity Commissioner / MCA Portal | Execute registered trust deed, society bylaws, or Section 8 articles of association; pay stamp duty; obtain registered deed or Certificate of Incorporation. |
| **2. Organisation PAN & TAN** | Income Tax e-Filing / Protean (NSDL) / UTIITSL | Apply for dedicated non-individual PAN under the entity's exact registered name; obtain TAN for tax withholding. |
| **3. Non-Profit Bank Account** | Scheduled Commercial Bank Branch | Provide registered deed/MoA, entity PAN, board resolution, trustee KYC, and beneficial ownership declarations. |
| **4. Section 12A Tax Exemption** | Income Tax Department e-Filing Portal (Form 10A / 10AB) | Apply for provisional or regular tax-exempt status on charitable income; attach founding deeds, 3-year accounts (if existing), and activity reports. |
| **5. Section 80G Donor Deductions** | Income Tax Department e-Filing Portal (Form 10A / 10AB) | Apply for 50% donor tax deduction certificate; requires active 12A registration as a prerequisite. |
| **6. NGO Darpan Registration** | NITI Aayog NGO Darpan Portal | Register institutional profile, verify authorised office-bearers via Aadhaar OTP, and obtain unique Darpan ID required for government grants and CSR. |
| **7. CSR-1 Registration (Conditional)** | Ministry of Corporate Affairs (MCA V3 Portal) | File Form CSR-1 digitally signed by a practicing CA/CS/CMA to obtain unique CSR Registration Number for corporate donations. |
| **8. FCRA Registration / Prior Permission (Conditional)** | Ministry of Home Affairs (FCRA Online Portal) | Apply for foreign contribution registration (requires 3-year track record and Rs 15 Lakh charitable expenditure) or Prior Permission; open designated FCRA account at SBI New Delhi Main Branch (NDMB). |
| **9. Legal & Audit Verification** | Empanelled Chartered Accountants / Advocates | Review statutory compliance, verify Form 10A/10G application attachments, and affix Class-3 Digital Signature Certificates (DSC). |

---

## Key Real-World Friction Points

### A. Severe Portal & Data Fragmentation
There is no unified database shared between MCA, Income Tax, NITI Aayog, and MHA. Founders must re-enter identical organizational data, trustee details, and scanned documents across five independent portals, where minor typographical discrepancies trigger formal scrutiny notices.

### B. The Out-of-Order Filing Trap
The sequential dependency is non-negotiable: Legal Entity $\rightarrow$ PAN $\rightarrow$ Bank Account $\rightarrow$ 12A Exemption $\rightarrow$ 80G Deduction $\rightarrow$ NGO Darpan $\rightarrow$ CSR-1 / FCRA. Filing for 80G before 12A or Darpan before PAN results in outright rejection and wasted application fees.

### C. Unremovable Physical & Jurisdictional Bottlenecks
No software application can eliminate the statutory in-person deed registration before the local Sub-Registrar (which requires physical biometric presence and witnesses) or the statutory requirement that all foreign funding must flow through the State Bank of India New Delhi Main Branch (NDMB) on Parliament Street. Honest tools must prepare founders to clear these hurdles in one clean attempt.

### D. Intermediary Exploitation & Cost Barriers
Because the government portals are dense and written in bureaucratic prose, an aggressive intermediary market charges grassroots non-profits Rs 2,000 to Rs 15,000 per step. Early-stage NGOs with limited seed capital are often priced out of compliance.

### E. Post-Filing Scrutiny & Notice Intimidation
Automated scrutiny notices under Income Tax Section 142(1) or Form 10A discrepancy queries cause severe panic among grassroots founders, who cannot distinguish between routine document re-uploads and high-risk regulatory audits.

---

## How SevaSetu Addresses Each Problem

| Real-World Challenge | SevaSetu Prototype Implementation | Architectural Boundary |
|---|---|---|
| **Founder does not know where to start** | 60-second intake questionnaire evaluates NGO structure, age, and funding goals to compute a custom sequence. | Recommends a structured planning roadmap; does not legally incorporate the entity. |
| **Out-of-order filing & dependency errors** | Dynamic branching engine enforces strict sequential dependency (Structure $\rightarrow$ PAN $\rightarrow$ 12A $\rightarrow$ 80G $\rightarrow$ Darpan $\rightarrow$ CSR-1/FCRA). | Regulatory rules can vary by state and entity type; user must verify active portal rules. |
| **Repetitive document preparation & attachment** | Guided modules feature 1-click DigiLocker bulk import simulation for verified identity proofs, PAN, and Trust Deeds. | In demo mode, documents are simulated locally; no live UIDAI database is contacted. |
| **Scary bureaucratic scrutiny notices** | Server-side AI Notice Translator (4-tier fallback on Groq/OpenAI with zero data retention) extracts meaning, action, and deadlines. | Interpretation aid only; does not replace formal legal counsel or official replies. |
| **Expensive CA verification & DSC certification** | Verified Pro-Bono CA Network enables 1-click encrypted sharing with SHA-256 package digest to empanelled ICAI partner firms. | Prototype generates simulated tracking reference ID (`CA-REV-XXXXX`) with live dashboard tracking. |
| **Scattered status tracking** | Live dashboard featuring multi-state vector suspension bridge visualizer and ~15s asynchronous approval timer. | Prototype statuses are simulated locally and do not read government databases. |
| **Language & digital literacy exclusion** | Full bilingual parity in English and हिन्दी, high-contrast light/dark themes, and mobile-first responsive touch layout. | WCAG AA compliant; designed for phone viewports and low-bandwidth environments. |
| **Physical consultation & board handoff** | Print & PDF Export Engine produces a clean physical one-page administrative summary for CAs and trustees. | Formatted via `@media print` for immediate offline utility. |

---

## What the Current Implementation Demonstrates

1. **Government e-Pramaan SSO Portal**: Multi-modal institutional authentication (`Mobile/Aadhaar OTP`, `Entity PAN/DIN & Password`, `DigiLocker SSO`) with route-level security (`useRequireAuth()`).
2. **Dynamic Branching Compliance Engine**: Evaluates intake parameters to generate 5-to-7 step sequential registration chains with explicit honesty advisories for unfeasible registrations (e.g. FCRA < 3 years).
3. **Interactive Guided Filing Modules**: Standardized templates breaking down legal requirements into "What it is", "Why you need it", and "What happens after submission", with document checklist gating.
4. **DigiLocker Document Verification Gateway**: Simulated Digital India integration allowing 1-click bulk import of verified certificates.
5. **Real-Time Progress Dashboard & Suspension Bridge**: Adaptive vector graphic illustrating completed milestones with simulated ~15-second asynchronous approval transitions.
6. **AI Notice Translator (Zero-Retention)**: Server-side LLM inference with 4-stage fallback chain translating complex legal notices into plain action plans with deadlines.
7. **Verified Pro-Bono CA Network**: Interactive ICAI-registered firm selector, SHA-256 package encryption digest, simulated dispatch reference, and live dashboard tracking state.
8. **Bilingual Engine & Dual Themes**: 100% localization across English and Hindi, dark/light theme toggle, and standalone clean vector SVGs without boxy background wrappers.
9. **Physical Print/Export Engine**: CSS print stylesheet formatting the personalized roadmap for offline CA and trustee consultations.

---

## Recommended Production Scaling Safeguards

1. **Direct DigiLocker & MCA V3 / Income Tax Portal APIs**: Production OAuth2 / SAML2 integrations with Digital India and direct pre-filled JSON/XML schema generators for official e-filing portals.
2. **Verified CA Empanelled Network Scale**: Formal partnership with the Institute of Chartered Accountants of India (ICAI) and state bar councils to connect grassroots NGOs with certified pro-bono practitioners.
3. **Automated Government Status Webhooks**: Background polling and webhook listeners tracking Application Reference Numbers (ARNs) across MCA and Income Tax databases.
4. **Vernacular Expansion**: Broadening the bilingual engine to support 8 additional Indian languages (Marathi, Gujarati, Bengali, Tamil, Telugu, Kannada, Odia, Malayalam).
5. **Zero-Knowledge Encrypted Document Vault**: Client-side encrypted document storage ensuring complete non-profit data privacy and compliance with the Digital Personal Data Protection (DPDP) Act 2023.

---

<div align="center">
  <sub>SevaSetu Research & Architecture Document • Build What Moves India Hackathon</sub>
</div>

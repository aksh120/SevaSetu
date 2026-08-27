import { REGISTRATIONS_HI } from "./content.hi";
import type { Lang } from "./i18n";

export interface RegistrationContent {
  id: string;
  name: string;
  whyLine: string;
  whatItIs: string;
  whyYouNeedIt: string;
  checklist: string[];
  timeline: string;
  afterSubmit: string;
}

export const REGISTRATIONS: Record<string, RegistrationContent> = {
  structure: {
    id: "structure",
    name: "Structure Registration",
    whyLine: "Every registration below depends on your NGO legally existing first.",
    whatItIs:
      "Before an NGO can do almost anything official  -  open a bank account, apply for tax benefits, receive donations  -  it needs a legal structure. Most Indian NGOs register as a Trust, a Society, or a Section-8 Company (a company formed for a non-profit purpose instead of to make money).",
    whyYouNeedIt:
      "This is the NGO’s birth certificate. Nothing else on this list works without it.",
    checklist: [
      "Registered office address proof",
      "ID proof for each trustee / member / director",
      "Draft trust deed or memorandum of association",
      "Passport-size photos",
    ],
    timeline:
      "A few weeks, depending on the state and the structure chosen  -  Trusts and Societies register at the state level; Section-8 Companies register centrally through the MCA.",
    afterSubmit:
      "The registrar reviews your application; approval typically takes a few weeks depending on your state and chosen structure.",
  },
  pan: {
    id: "pan",
    name: "PAN (for the organisation)",
    whyLine: "Tax registrations and a bank account need the organisation’s own PAN.",
    whatItIs:
      "A PAN for the organisation itself  -  separate from any individual’s personal PAN  -  is what lets it be recognised for tax purposes and open a bank account in its own name.",
    whyYouNeedIt:
      "Every tax-related registration below needs the organisation’s own PAN first.",
    checklist: ["Registration certificate from Structure Registration", "Registered address proof"],
    timeline: "Usually issued within about two weeks online.",
    afterSubmit:
      "The income-tax department processes the application online; the PAN is usually issued within about two weeks.",
  },
  "12a": {
    id: "12a",
    name: "12A Registration",
    whyLine: "Keeps your NGO’s income from being taxed like a business’s.",
    whatItIs:
      "12A means the NGO itself doesn’t pay income tax on the money it receives for its charitable work.",
    whyYouNeedIt:
      "Without it, your NGO’s own income can be taxed like a business’s  -  even though none of it is profit.",
    checklist: [
      "Registration certificate",
      "Trust deed / memorandum of association",
      "PAN",
      "Financial statements (N/A for a new organisation)",
      "Description of planned activities",
    ],
    timeline:
      "New NGOs usually get a provisional registration first, valid for a few years (illustrative), then apply for the permanent one once they have an activity track record.",
    afterSubmit:
      "A provisional registration usually comes first, valid for a few years, before you apply for the permanent one.",
  },
  "80g": {
    id: "80g",
    name: "80G Registration",
    whyLine: "Lets donors deduct their gift  -  often what turns hesitation into donating.",
    whatItIs:
      "80G means people or companies who donate to your NGO can deduct part of that donation from their own taxable income  -  which makes donating to you meaningfully more attractive.",
    whyYouNeedIt:
      "This is often what turns a hesitant donor into an actual one. Many companies and larger individual donors won’t give without it.",
    checklist: [
      "12A certificate (usually filed together with or right after 12A)",
      "PAN",
      "Activity details",
      "Bank account details",
    ],
    timeline: "Filed alongside or right after 12A; same provisional-then-permanent pattern.",
    afterSubmit:
      "Filed alongside or right after 12A  -  expect the same provisional-then-permanent pattern before full approval.",
  },
  darpan: {
    id: "darpan",
    name: "NGO Darpan Registration",
    whyLine: "Increasingly required before FCRA, scheme partnerships, and CSR processes.",
    whatItIs:
      "A free listing with NITI Aayog that gives the NGO a unique ID (a “Darpan ID”). It’s how the government keeps a directory of NGOs, and it’s increasingly required as a prerequisite for other filings rather than just a nice-to-have listing.",
    whyYouNeedIt:
      "You’ll be asked for this ID again later  -  for FCRA, for some government scheme partnerships, and for certain CSR-related processes.",
    checklist: ["PAN", "Registration certificate", "Contact details of the chief functionary"],
    timeline: "Usually quick  -  mostly a matter of filling in the online form correctly the first time.",
    afterSubmit:
      "NITI Aayog verifies the details and issues your unique Darpan ID, usually quickly.",
  },
  csr1: {
    id: "csr1",
    name: "CSR-1 Filing",
    whyLine: "Makes your NGO legally eligible to receive CSR money from Indian companies.",
    whatItIs:
      "A one-time filing with the Ministry of Corporate Affairs that makes the NGO legally eligible to receive CSR (Corporate Social Responsibility) money from Indian companies.",
    whyYouNeedIt:
      "Companies above a certain size are required to spend a slice of profits on CSR  -  but they can only give that money to NGOs that have filed this.",
    checklist: [
      "12A and 80G certificates",
      "Registration certificate",
      "PAN",
      "Summary of past project work (illustrative for a new org)",
    ],
    timeline:
      "Filed online; the real bottleneck is usually having 12A/80G already in place, not the CSR-1 filing itself.",
    afterSubmit:
      "MCA processes the filing; the real bottleneck is having 12A and 80G in place first, not the filing itself.",
  },
  fcra: {
    id: "fcra",
    name: "FCRA Registration",
    whyLine: "Required to legally receive any money from outside India.",
    whatItIs:
      "Permission from the Ministry of Home Affairs to legally receive money from outside India  -  foreign donors, international grants, or funds from a foreign national.",
    whyYouNeedIt:
      "Receiving foreign money without this is a serious legal violation, not just a paperwork gap.",
    checklist: [
      "NGO Darpan ID",
      "Registration certificate",
      "PAN",
      "Audited financials for prior years",
      "Activity reports",
    ],
    timeline:
      "The slowest step on this list  -  realistically months, not weeks. Historically required roughly three years of prior existence and a minimum spend on activities before an NGO is even eligible to apply (illustrative); newer NGOs sometimes have a “prior permission” route for a specific one-off contribution instead of full registration.",
    afterSubmit:
      "MHA takes the longest  -  realistically months, and full approval generally needs an operating track record first.",
  },
};

export const ROADMAP_BASE_IDS = ["structure", "pan", "12a", "80g", "darpan"] as const;

export function getRegistration(id: string, lang: Lang = "en"): RegistrationContent | undefined {
  if (lang === "hi") return REGISTRATIONS_HI[id] ?? REGISTRATIONS[id];
  return REGISTRATIONS[id];
}

export function stepDisplay(id: string, lang: Lang = "en"): { name: string; why: string } {
  const r = getRegistration(id, lang);
  return { name: r?.name ?? id, why: r?.whyLine ?? "" };
}

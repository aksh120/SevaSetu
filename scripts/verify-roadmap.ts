import { buildRoadmap } from "../lib/roadmap";
import type { IntakeAnswers } from "../lib/types";

const cases: { label: string; answers: IntakeAnswers; expected: string[]; expectFcraCallout: boolean }[] = [
  {
    label: "New trust + foreign funding → FCRA appended + callout",
    answers: {
      orgName: "Afora Foundation",
      structureStatus: "trust",
      funding: ["individual", "foreign"],
      orgAge: "starting",
    },
    expected: ["structure", "pan", "12a", "80g", "darpan", "fcra"],
    expectFcraCallout: true,
  },
  {
    label: "Young society + CSR → CSR-1 appended, no callout",
    answers: {
      orgName: "Sahyog Collective",
      structureStatus: "society",
      funding: ["individual", "csr"],
      orgAge: "under3",
    },
    expected: ["structure", "pan", "12a", "80g", "darpan", "csr1"],
    expectFcraCallout: false,
  },
  {
    label: "Established Section-8, domestic only → base five only",
    answers: {
      orgName: "Aarohan Foundation",
      structureStatus: "section8",
      funding: ["individual"],
      orgAge: "over3",
    },
    expected: ["structure", "pan", "12a", "80g", "darpan"],
    expectFcraCallout: false,
  },
  {
    label: "Unsure funding, no structure → base five, no conditionals",
    answers: {
      orgName: "Test Org",
      structureStatus: "none",
      funding: ["unsure"],
      orgAge: "starting",
    },
    expected: ["structure", "pan", "12a", "80g", "darpan"],
    expectFcraCallout: false,
  },
  {
    label: "Both CSR + foreign, established → both appended, no callout (3+ yrs)",
    answers: {
      orgName: "Dual Funding Org",
      structureStatus: "trust",
      funding: ["csr", "foreign"],
      orgAge: "over3",
    },
    expected: ["structure", "pan", "12a", "80g", "darpan", "csr1", "fcra"],
    expectFcraCallout: false,
  },
];

let failures = 0;
for (const c of cases) {
  const result = buildRoadmap(c.answers);
  const ids = result.steps.map((s) => s.id);
  const hasCallout = result.callouts.some((x) => x.stepId === "fcra");
  const orderOk = JSON.stringify(ids) === JSON.stringify(c.expected);
  const calloutOk = hasCallout === c.expectFcraCallout;
  const ordersSequential = result.steps.every((s, i) => s.order === i + 1);
  if (orderOk && calloutOk && ordersSequential) {
    console.log(`PASS  -  ${c.label}`);
  } else {
    failures++;
    console.error(`FAIL  -  ${c.label}`);
    console.error(`  ids=${JSON.stringify(ids)} expected=${JSON.stringify(c.expected)}`);
    console.error(`  fcraCallout=${hasCallout} expected=${c.expectFcraCallout}`);
  }
}

if (failures > 0) {
  console.error(`${failures} case(s) failed`);
  process.exit(1);
}
console.log("All roadmap engine cases passed.");

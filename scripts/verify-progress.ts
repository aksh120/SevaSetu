import { allUploaded, deriveProfile, effectiveStatus, hasPendingApprovals, isStepComplete, progressOf, uploadsFor } from "../lib/progress";
import type { NgoProfile, Roadmap, StepStatus } from "../lib/types";

function makeRoadmap(statuses: StepStatus[]): Roadmap {
  const names = ["structure", "pan", "12a", "80g", "darpan", "csr1", "fcra"];
  return {
    steps: statuses.map((status, i) => ({
      id: names[i],
      order: i + 1,
      name: names[i],
      why: "why",
      status,
    })),
    callouts: [],
  };
}

let failures = 0;
function check(label: string, actual: unknown, expected: unknown) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    console.log(`PASS  -  ${label}`);
  } else {
    failures++;
    console.error(`FAIL  -  ${label}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`);
  }
}

const fresh = makeRoadmap(["not-started", "not-started", "not-started"]);
check("fresh roadmap: 0 complete of 3", progressOf(fresh).complete, 0);
check("fresh roadmap: next is index 0", progressOf(fresh).nextIndex, 0);

const mid = makeRoadmap(["submitted", "in-progress", "not-started"]);
check("mid roadmap: submitted counts as complete", progressOf(mid).complete, 1);
check("mid roadmap: next up skips in-progress? no  -  first incomplete", progressOf(mid).nextIndex, 1);
check("isStepComplete(in-progress) false", isStepComplete(mid.steps[1]), false);

const done = makeRoadmap(["approved", "submitted"]);
check("all-done roadmap: nextStep null", progressOf(done).nextStep, null);

check(
  "uploadsFor pads short arrays",
  uploadsFor({ pan: [true] }, "pan", 3),
  [true, false, false]
);
check("uploadsFor fills missing step with falses", uploadsFor({}, "fcra", 2), [false, false]);
check("allUploaded true only when every flag set", [allUploaded([true]), allUploaded([true, false]), allUploaded([])], [true, false, false]);

const T0 = 1_000_000_000;
check("effectiveStatus: submitted flips after delay", effectiveStatus("submitted", T0, T0 + 15_000), "approved");
check("effectiveStatus: submitted holds before delay", effectiveStatus("submitted", T0, T0 + 14_999), "submitted");
check("effectiveStatus: no timestamp never flips", effectiveStatus("submitted", undefined, T0 + 999_999), "submitted");
check("effectiveStatus: not-started untouched", effectiveStatus("not-started", T0, T0 + 99_999), "not-started");

const demoProfile: NgoProfile = {
  answers: { orgName: "X", structureStatus: "trust", funding: ["individual"], orgAge: "over3" },
  roadmap: makeRoadmap(["approved", "submitted", "not-started"]),
  uploads: {},
  submittedAt: { pan: T0 },
};
const derived = deriveProfile(demoProfile, T0 + 20_000);
check("deriveProfile flips aged submission", derived.roadmap.steps[1].status, "approved");
check("deriveProfile leaves fresh submission", deriveProfile(demoProfile, T0 + 5_000).roadmap.steps[1].status, "submitted");
check("hasPendingApprovals true while fresh", hasPendingApprovals(demoProfile, T0 + 5_000), true);
check("hasPendingApprovals false once aged", hasPendingApprovals(demoProfile, T0 + 20_000), false);

if (failures > 0) {
  console.error(`${failures} case(s) failed`);
  process.exit(1);
}
console.log("All progress helper cases passed.");

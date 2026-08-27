import { REGISTRATIONS, ROADMAP_BASE_IDS } from "./content";
import type { IntakeAnswers, Roadmap, RoadmapStep } from "./types";

export function buildRoadmap(answers: IntakeAnswers): Roadmap {
  const ids: string[] = [...ROADMAP_BASE_IDS];

  const wantsCsr = answers.funding.includes("csr");
  const wantsForeign = answers.funding.includes("foreign");

  if (wantsCsr) ids.push("csr1");
  if (wantsForeign) ids.push("fcra");

  const steps: RoadmapStep[] = ids.map((id, index) => ({
    id,
    order: index + 1,
    name: REGISTRATIONS[id].name,
    why: REGISTRATIONS[id].whyLine,
    status: "not-started",
  }));

  const callouts = [];
  if (wantsForeign && answers.orgAge !== "over3") {
    callouts.push({
      stepId: "fcra",
      message:
        "You can start this later. FCRA Registration usually needs a longer track record first  -  we’ll let you know when it’s worth pursuing.",
      hint:
        "For one specific contribution, a “prior permission” route can work before full registration.",
    });
  }

  return { steps, callouts };
}

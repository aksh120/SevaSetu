export type StructureStatus = "none" | "trust" | "society" | "section8";

export type FundingSource = "individual" | "csr" | "foreign" | "unsure";

export type OrgAge = "starting" | "under3" | "over3";

export interface IntakeAnswers {
  orgName: string;
  structureStatus: StructureStatus;
  funding: FundingSource[];
  orgAge: OrgAge;
}

export type StepStatus = "not-started" | "in-progress" | "submitted" | "approved";

export interface RoadmapStep {
  id: string;
  order: number;
  name: string;
  why: string;
  status: StepStatus;
}

export interface RoadmapCallout {
  stepId: string;
  message: string;
  hint?: string;
}

export interface Roadmap {
  steps: RoadmapStep[];
  callouts: RoadmapCallout[];
}

export interface NgoProfile {
  answers: IntakeAnswers;
  roadmap: Roadmap;
  uploads: Record<string, boolean[]>;
  submittedAt: Record<string, number>;
}

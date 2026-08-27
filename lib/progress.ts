import type { NgoProfile, Roadmap, RoadmapStep, StepStatus } from "./types";

export const APPROVAL_DELAY_MS = 15000;

export function isStepComplete(step: RoadmapStep): boolean {
  return step.status === "submitted" || step.status === "approved";
}

export function effectiveStatus(
  status: StepStatus,
  submittedAt: number | undefined,
  now: number
): StepStatus {
  if (
    status === "submitted" &&
    submittedAt !== undefined &&
    now - submittedAt >= APPROVAL_DELAY_MS
  ) {
    return "approved";
  }
  return status;
}

export function deriveProfile(profile: NgoProfile, now: number): NgoProfile {
  return {
    ...profile,
    roadmap: {
      ...profile.roadmap,
      steps: profile.roadmap.steps.map((step) => ({
        ...step,
        status: effectiveStatus(step.status, profile.submittedAt[step.id], now),
      })),
    },
  };
}

export function hasPendingApprovals(profile: NgoProfile, now: number): boolean {
  return profile.roadmap.steps.some(
    (step) => effectiveStatus(step.status, profile.submittedAt[step.id], now) === "submitted"
  );
}

export interface RoadmapProgress {
  total: number;
  complete: number;
  nextIndex: number;
  nextStep: RoadmapStep | null;
}

export function progressOf(roadmap: Roadmap): RoadmapProgress {
  const total = roadmap.steps.length;
  const complete = roadmap.steps.filter(isStepComplete).length;
  const nextIndex = roadmap.steps.findIndex((step) => !isStepComplete(step));
  return {
    total,
    complete,
    nextIndex,
    nextStep: nextIndex === -1 ? null : roadmap.steps[nextIndex],
  };
}

export function uploadsFor(
  uploads: Record<string, boolean[]>,
  stepId: string,
  checklistLength: number
): boolean[] {
  const existing = uploads[stepId] ?? [];
  const filled = Array.from({ length: checklistLength }, (_, i) => existing[i] ?? false);
  return filled;
}

export function allUploaded(flags: boolean[]): boolean {
  return flags.length > 0 && flags.every(Boolean);
}

export type { StepStatus };

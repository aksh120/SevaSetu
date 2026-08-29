"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { buildRoadmap } from "@/lib/roadmap";
import { deriveProfile, hasPendingApprovals } from "@/lib/progress";
import type { IntakeAnswers, NgoProfile, CaReviewSubmission } from "@/lib/types";

interface ProfileContextValue {
  profile: NgoProfile | null;
  saveProfile: (answers: IntakeAnswers) => void;
  setUpload: (stepId: string, index: number, uploaded: boolean) => void;
  setAllUploads: (stepId: string, count: number, uploaded: boolean) => void;
  submitStep: (stepId: string) => void;
  submitCaReview: (review: CaReviewSubmission) => void;
  cancelCaReview: () => void;
  seedDemo: (answers: IntakeAnswers, demoSubmittedAt: Record<string, number>) => void;
  resetProfile: () => void;
}

const STORAGE_KEY = "sevasetu-profile-v1";

let currentProfile: NgoProfile | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function persist(profile: NgoProfile | null) {
  try {
    if (profile) window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    else window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Private-browsing storage failures don't need to break the demo.
  }
}

function normalize(parsed: Partial<NgoProfile> | null): NgoProfile | null {
  if (!parsed?.answers || !parsed?.roadmap?.steps) return null;
  return {
    answers: parsed.answers,
    roadmap: parsed.roadmap,
    uploads: parsed.uploads ?? {},
    submittedAt: parsed.submittedAt ?? {},
    caReview: parsed.caReview ?? null,
  };
}

function restoreFromStorage() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    currentProfile = normalize(JSON.parse(raw));
    if (!currentProfile) persist(null);
  } catch {
    // Corrupt stored state starts the journey fresh instead of breaking it.
    persist(null);
  }
}

if (typeof window !== "undefined") restoreFromStorage();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): NgoProfile | null {
  return currentProfile;
}

function getServerSnapshot(): NgoProfile | null {
  return null;
}

const ProfileContext = createContext<ProfileContextValue>({
  profile: null,
  saveProfile: () => {},
  setUpload: () => {},
  setAllUploads: () => {},
  submitStep: () => {},
  seedDemo: () => {},
  resetProfile: () => {},
});

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const profile = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [now, setNow] = useState(() => Date.now());

  const pending = profile ? hasPendingApprovals(profile, now) : false;
  useEffect(() => {
    if (!pending) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [pending]);

  const mutateProfile = useCallback(
    (mutator: (draft: NgoProfile) => NgoProfile) => {
      if (!currentProfile) return;
      currentProfile = mutator(currentProfile);
      persist(currentProfile);
      notify();
    },
    []
  );

  const saveProfile = useCallback((answers: IntakeAnswers) => {
    currentProfile = {
      answers,
      roadmap: buildRoadmap(answers),
      uploads: {},
      submittedAt: {},
    };
    persist(currentProfile);
    notify();
  }, []);

  const seedDemo = useCallback(
    (answers: IntakeAnswers, demoSubmittedAt: Record<string, number>) => {
      const roadmap = buildRoadmap(answers);
      const submittedAt: Record<string, number> = {};
      for (const step of roadmap.steps) {
        if (demoSubmittedAt[step.id] !== undefined) {
          submittedAt[step.id] = demoSubmittedAt[step.id];
          step.status = "submitted";
        }
      }
      currentProfile = { answers, roadmap, uploads: {}, submittedAt };
      persist(currentProfile);
      notify();
    },
    []
  );

  const resetProfile = useCallback(() => {
    currentProfile = null;
    persist(null);
    notify();
  }, []);

  const setUpload = useCallback(
    (stepId: string, index: number, uploaded: boolean) => {
      mutateProfile((draft) => {
        const flags = [...(draft.uploads[stepId] ?? [])];
        flags[index] = uploaded;
        const steps = draft.roadmap.steps.map((step) =>
          step.id === stepId && step.status === "not-started" && uploaded
            ? { ...step, status: "in-progress" as const }
            : step
        );
        return {
          ...draft,
          uploads: { ...draft.uploads, [stepId]: flags },
          roadmap: { ...draft.roadmap, steps },
        };
      });
    },
    [mutateProfile]
  );

  const setAllUploads = useCallback(
    (stepId: string, count: number, uploaded: boolean) => {
      mutateProfile((draft) => {
        const flags = Array(count).fill(uploaded);
        const steps = draft.roadmap.steps.map((step) =>
          step.id === stepId && step.status === "not-started" && uploaded
            ? { ...step, status: "in-progress" as const }
            : step
        );
        return {
          ...draft,
          uploads: { ...draft.uploads, [stepId]: flags },
          roadmap: { ...draft.roadmap, steps },
        };
      });
    },
    [mutateProfile]
  );

  const submitStep = useCallback(
    (stepId: string) => {
      mutateProfile((draft) => ({
        ...draft,
        submittedAt: { ...draft.submittedAt, [stepId]: Date.now() },
        roadmap: {
          ...draft.roadmap,
          steps: draft.roadmap.steps.map((step) =>
            step.id === stepId ? { ...step, status: "submitted" as const } : step
          ),
        },
      }));
    },
    [mutateProfile]
  );

  const submitCaReview = useCallback(
    (caReview: CaReviewSubmission) => {
      mutateProfile((draft) => ({
        ...draft,
        caReview,
      }));
    },
    [mutateProfile]
  );

  const cancelCaReview = useCallback(() => {
    mutateProfile((draft) => ({
      ...draft,
      caReview: null,
    }));
  }, [mutateProfile]);

  const derivedProfile = useMemo(
    () => (profile ? deriveProfile(profile, now) : null),
    [profile, now]
  );

  const value = useMemo(
    () => ({
      profile: derivedProfile,
      saveProfile,
      setUpload,
      setAllUploads,
      submitStep,
      submitCaReview,
      cancelCaReview,
      seedDemo,
      resetProfile,
    }),
    [
      derivedProfile,
      saveProfile,
      setUpload,
      setAllUploads,
      submitStep,
      submitCaReview,
      cancelCaReview,
      seedDemo,
      resetProfile,
    ]
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  return useContext(ProfileContext);
}

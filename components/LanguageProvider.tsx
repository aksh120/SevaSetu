"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { getCopy } from "@/lib/i18n";
import type { Copy, Lang } from "@/lib/i18n";

const LANG_KEY = "setuseva-lang";

let currentLang: Lang = "en";
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function restoreLang() {
  try {
    const stored = window.localStorage.getItem(LANG_KEY);
    if (stored === "hi" || stored === "en") currentLang = stored;
  } catch {
    // Storage unavailable (private mode)  -  default language is fine.
  }
}

if (typeof window !== "undefined") restoreLang();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Lang {
  return currentLang;
}

function getServerSnapshot(): Lang {
  return "en";
}

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextValue>({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = useCallback((next: Lang) => {
    currentLang = next;
    try {
      window.localStorage.setItem(LANG_KEY, next);
    } catch {
      // Storage failures just mean the choice doesn't persist.
    }
    notify();
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}

export function useCopy(): Copy {
  return getCopy(useLang().lang);
}

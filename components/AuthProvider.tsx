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
import { useRouter, usePathname } from "next/navigation";

export interface AuthUser {
  id: string;
  name: string;
  role: string;
  loggedInAt: number;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isReady: boolean;
  login: (credentials?: { id?: string; name?: string; role?: string }) => void;
  logout: () => void;
}

const STORAGE_KEY = "sevasetu-auth-v1";

let currentUser: AuthUser | null = null;
let isInitialized = false;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function persist(user: AuthUser | null) {
  try {
    if (user) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      window.sessionStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Graceful degradation for private browsing
  }
}

function restoreFromStorage() {
  if (typeof window === "undefined") return;
  try {
    const raw =
      window.sessionStorage.getItem(STORAGE_KEY) ||
      window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      currentUser = JSON.parse(raw);
    }
  } catch {
    currentUser = null;
    persist(null);
  } finally {
    isInitialized = true;
  }
}

if (typeof window !== "undefined") {
  restoreFromStorage();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): AuthUser | null {
  return currentUser;
}

function getServerSnapshot(): AuthUser | null {
  return null;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  isReady: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const login = useCallback(
    (credentials?: { id?: string; name?: string; role?: string }) => {
      const authData: AuthUser = {
        id: credentials?.id?.trim() || "98765-43210",
        name: credentials?.name?.trim() || "Demo Trustee",
        role: credentials?.role?.trim() || "Authorized Signatory",
        loggedInAt: Date.now(),
      };
      currentUser = authData;
      persist(currentUser);
      notify();
    },
    []
  );

  const logout = useCallback(() => {
    currentUser = null;
    persist(null);
    notify();
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isReady: mounted,
      login,
      logout,
    }),
    [user, mounted, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Hook to guard protected process pages.
 * Redirects unauthenticated users to /login with redirect return param.
 */
export function useRequireAuth() {
  const { isAuthenticated, isReady } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isReady, isAuthenticated, pathname, router]);

  return { isAuthenticated, isReady };
}

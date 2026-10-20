"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { StudentPublic } from "@/lib/student";

type AuthView = "register" | "login";

type AuthContextValue = {
  student: StudentPublic | null;
  loading: boolean;
  authOpen: boolean;
  authView: AuthView;
  pendingRedirect: string | null;
  openAuth: (view?: AuthView, redirectTo?: string | null) => void;
  closeAuth: () => void;
  setAuthView: (view: AuthView) => void;
  setStudent: (student: StudentPublic | null) => void;
  clearPendingRedirect: () => void;
  logout: () => Promise<void>;
  requireAuth: (redirectTo: string, view?: AuthView) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [student, setStudent] = useState<StudentPublic | null>(null);
  const [loading, setLoading] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthView>("login");
  const [pendingRedirect, setPendingRedirect] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/api/auth/me", { cache: "no-store" })
      .then(async (response) => {
        const data = (await response.json()) as { student: StudentPublic | null };
        if (active) setStudent(data.student);
      })
      .catch(() => {
        if (active) setStudent(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const openAuth = useCallback(
    (view: AuthView = "login", redirectTo: string | null = null) => {
      setAuthView(view);
      setPendingRedirect(redirectTo);
      setAuthOpen(true);
    },
    [],
  );

  const closeAuth = useCallback(() => {
    setAuthOpen(false);
  }, []);

  const clearPendingRedirect = useCallback(() => {
    setPendingRedirect(null);
  }, []);

  const requireAuth = useCallback(
    (redirectTo: string, view: AuthView = "login") => {
      if (student) return true;
      openAuth(view, redirectTo);
      return false;
    },
    [student, openAuth],
  );

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setStudent(null);
    setAuthOpen(false);
    setPendingRedirect(null);
    router.push("/");
    router.refresh();
  }, [router]);

  const value = useMemo(
    () => ({
      student,
      loading,
      authOpen,
      authView,
      pendingRedirect,
      openAuth,
      closeAuth,
      setAuthView,
      setStudent,
      clearPendingRedirect,
      logout,
      requireAuth,
    }),
    [
      student,
      loading,
      authOpen,
      authView,
      pendingRedirect,
      openAuth,
      closeAuth,
      clearPendingRedirect,
      logout,
      requireAuth,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

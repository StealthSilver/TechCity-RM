"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

export default function RoadmapGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { student, loading, openAuth, authOpen } = useAuth();

  useEffect(() => {
    if (loading || student || authOpen) return;
    openAuth("login", pathname);
  }, [loading, student, authOpen, openAuth, pathname]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
          Checking account
        </p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent sm:text-[11px]">
          Sign in required
        </p>
        <h1 className="mt-3 text-balance text-[1.5rem] font-normal leading-tight tracking-tight sm:mt-4 sm:text-3xl">
          Log in to open this roadmap.
        </h1>
        <p className="mt-3 max-w-sm text-[13px] leading-6 text-foreground/65 sm:text-sm sm:leading-6">
          Use the same TechCity account you use for Spardha. Create one if you
          are new.
        </p>
        <button
          type="button"
          className="mt-7 inline-flex h-11 w-full max-w-xs items-center justify-center bg-accent px-5 text-[15px] font-medium text-on-accent transition-colors hover:bg-accent/90 sm:mt-8 sm:w-auto"
          onClick={() => openAuth("login", pathname)}
        >
          Log in
        </button>
      </div>
    );
  }

  return children;
}

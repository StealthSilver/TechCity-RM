"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

/** Opens the login popup when redirected from a protected roadmap URL. */
export default function AuthQueryOpener() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { student, loading, openAuth } = useAuth();

  useEffect(() => {
    if (loading || student) return;
    if (searchParams.get("auth") !== "login") return;

    const next = searchParams.get("next");
    openAuth("login", next && next.startsWith("/") ? next : null);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("auth");
    params.delete("next");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [loading, student, searchParams, openAuth, pathname, router]);

  return null;
}

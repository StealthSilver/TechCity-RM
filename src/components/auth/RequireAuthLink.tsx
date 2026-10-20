"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";

export default function RequireAuthLink({
  href,
  className,
  children,
  role,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  role?: string;
}) {
  const { student, loading, requireAuth } = useAuth();

  return (
    <Link
      href={href}
      role={role}
      className={className}
      onClick={(event) => {
        if (loading) {
          event.preventDefault();
          return;
        }
        if (!student) {
          event.preventDefault();
          requireAuth(href);
        }
      }}
    >
      {children}
    </Link>
  );
}

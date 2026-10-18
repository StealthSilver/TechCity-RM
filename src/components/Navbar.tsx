"use client";

import { useEffect, useState } from "react";
import BrandLockup from "@/components/BrandLockup";
import CtaLink from "@/components/CtaLink";

export default function Navbar({
  cta = { href: "/all", label: "Get started" },
}: {
  cta?: { href: string; label: string };
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "isolate border-foreground/10 bg-background/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-5 sm:px-8">
        <BrandLockup priority markClassName="h-11 w-11 sm:h-12 sm:w-12" />
        <CtaLink href={cta.href}>{cta.label}</CtaLink>
      </div>
    </header>
  );
}

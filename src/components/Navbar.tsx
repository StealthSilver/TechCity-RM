import Image from "next/image";
import Link from "next/link";
import CtaLink from "@/components/CtaLink";

export default function Navbar({
  cta = { href: "/all", label: "Get started" },
}: {
  cta?: { href: string; label: string };
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="relative z-10 shrink-0" aria-label="TechCity">
          <Image
            src="/logo.png"
            alt="TechCity"
            width={945}
            height={921}
            className="brand-mark h-11 w-11 object-contain sm:h-12 sm:w-12"
            priority
            unoptimized
          />
        </Link>
        <CtaLink href={cta.href}>{cta.label}</CtaLink>
      </div>
    </header>
  );
}

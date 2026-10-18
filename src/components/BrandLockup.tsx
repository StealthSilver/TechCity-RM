import Image from "next/image";
import Link from "next/link";

export default function BrandLockup({
  wordClassName = "text-[#4677e2]",
  markClassName = "h-11 w-11",
  priority = false,
}: {
  wordClassName?: string;
  markClassName?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      className="relative z-10 inline-flex shrink-0 items-end gap-2.5"
      aria-label="TechCity Roadmaps"
    >
      <Image
        src="/logo.png"
        alt=""
        width={945}
        height={921}
        className={`brand-mark object-contain ${markClassName}`}
        priority={priority}
        unoptimized
      />
      <span className={`-translate-y-0.5 text-[13px] font-bold uppercase leading-none tracking-[0.16em] sm:text-sm ${wordClassName}`}>
        Roadmaps
      </span>
    </Link>
  );
}

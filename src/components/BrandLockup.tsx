import Image from "next/image";
import Link from "next/link";

export default function BrandLockup({
  markClassName = "h-11 w-11",
  priority = false,
}: {
  markClassName?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      className="relative z-10 inline-flex shrink-0 items-center justify-center self-center"
      aria-label="TechCity Roadmaps"
    >
      <Image
        src="/logo.png"
        alt=""
        width={945}
        height={921}
        className={`brand-mark block object-contain ${markClassName}`}
        priority={priority}
        unoptimized
      />
    </Link>
  );
}

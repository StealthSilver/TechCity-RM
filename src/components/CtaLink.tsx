import Link from "next/link";

function PlusIcon() {
  return (
    <svg
      className="size-[0.75em]"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 1v10M1 6h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

const sizes = {
  sm: {
    box: "size-8",
    label: "h-8 px-4 text-[13px] -translate-x-[calc(2rem+6px)]",
  },
  lg: {
    box: "size-10",
    label: "h-10 px-5 text-[15px] -translate-x-[calc(2.5rem+6px)]",
  },
} as const;

export default function CtaLink({
  href,
  children,
  className = "",
  size = "sm",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof sizes;
}) {
  const { box, label } = sizes[size];

  return (
    <Link
      href={href}
      className={`group inline-flex min-w-0 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap font-medium outline-none ${className}`}
    >
      <span className="relative flex w-full items-center gap-1.5">
        <span
          className={`flex origin-left -rotate-45 scale-0 items-center justify-center bg-accent text-on-accent transition-transform duration-700 ease-power4-in-out group-hover:rotate-0 group-hover:scale-100 ${box}`}
        >
          <PlusIcon />
        </span>
        <span
          className={`flex w-full flex-1 items-center justify-center bg-accent text-on-accent transition-transform duration-700 ease-power4-in-out group-hover:translate-x-0 ${label}`}
        >
          <span>{children}</span>
        </span>
        <span
          className={`absolute right-0 z-10 flex origin-right scale-100 items-center justify-center bg-accent text-on-accent transition-transform duration-700 ease-power4-in-out group-hover:-rotate-45 group-hover:scale-0 ${box}`}
        >
          <PlusIcon />
        </span>
      </span>
    </Link>
  );
}

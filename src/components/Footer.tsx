import BrandLockup from "@/components/BrandLockup";
import ThemeToggle from "@/components/ThemeToggle";
import { sectionLinks } from "@/data/nav";

const links = [...sectionLinks, { href: "/all", label: "Roadmaps" }];

export default function Footer({ showThemeToggle = true }: { showThemeToggle?: boolean }) {
  return (
    <footer className="border-t border-foreground/10 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <BrandLockup markClassName="h-9 w-9 sm:h-11 sm:w-11" />
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-5" aria-label="Footer">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-foreground/55 transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            {showThemeToggle ? <ThemeToggle /> : null}
          </div>
        </div>
        <div className="flex min-w-0 flex-col items-start gap-2 text-left md:items-end md:text-right">
          <a
            href="mailto:techcityskillspvt.ltd@gmail.com"
            className="break-all text-[11px] text-foreground/55 underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
          >
            techcityskillspvt.ltd@gmail.com
          </a>
          <a
            href="tel:+919650657821"
            className="text-[11px] text-foreground/55 transition-colors hover:text-foreground"
          >
            9650657821
          </a>
        </div>
      </div>
    </footer>
  );
}

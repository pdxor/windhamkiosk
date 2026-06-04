import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { ButtonLink } from "./Button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/feedback", label: "Feedback" },
];

export function PageChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--charcoal)]">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-8 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius)] border border-[var(--stone)] bg-white px-4 py-3 shadow-sm sm:px-5">
          <Link href="/" className="min-w-0">
            <BrandLogo variant="header" />
          </Link>
          <nav
            aria-label="Site navigation"
            className="flex flex-wrap items-center gap-4 text-sm font-medium"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-[var(--forest-green)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ButtonLink href="/#connect" className="shrink-0 px-5 py-2.5 text-sm">
            Join KIOSK
          </ButtonLink>
        </header>
        {children}
      </div>
    </div>
  );
}

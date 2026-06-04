import { BrandLogo } from "./BrandLogo";
import { ButtonLink } from "./Button";

const navItems = [
  { href: "#top", label: "Home" },
  { href: "#mission", label: "About" },
  { href: "#programs", label: "Community" },
  { href: "#digital", label: "Resources" },
  { href: "#volunteer", label: "Events" },
  { href: "#connect", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="flex w-full min-w-0 flex-wrap items-center justify-between gap-3 rounded-[var(--radius)] border border-[var(--stone)] bg-white/92 px-3 py-3 shadow-sm backdrop-blur-md sm:gap-4 sm:px-5">
      <BrandLogo variant="header" className="min-w-0 flex-1 basis-auto" />
      <nav
        aria-label="Main navigation"
        className="hidden flex-1 justify-center gap-5 text-sm font-medium text-[var(--charcoal)] lg:flex"
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="transition hover:text-[var(--forest-green)]"
          >
            {item.label}
          </a>
        ))}
      </nav>
      <ButtonLink href="#connect" className="shrink-0 px-5 py-2.5 text-sm">
        Join KIOSK
      </ButtonLink>
    </header>
  );
}

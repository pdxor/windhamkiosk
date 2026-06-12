import { pageNavItems } from "@/app/lib/site-nav";
import { BrandLogo } from "./BrandLogo";
import { SiteNav } from "./SiteNav";

export function PageChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--charcoal)]">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-8 lg:px-10">
        <header className="relative flex flex-wrap items-center justify-between gap-3 py-2 sm:py-3">
          <BrandLogo variant="header" href="/" className="min-w-0" />
          <SiteNav
            items={pageNavItems}
            joinHref="/#connect"
            navAriaLabel="Site navigation"
          />
        </header>
        {children}
      </div>
    </div>
  );
}

import { homeNavItems } from "@/app/lib/site-nav";
import { BrandLogo } from "./BrandLogo";
import { SiteNav } from "./SiteNav";

export function SiteHeader() {
  return (
    <header className="relative flex w-full min-w-0 flex-wrap items-center justify-between gap-3 py-2 sm:gap-4 sm:py-3">
      <BrandLogo variant="header" href="#top" className="min-w-0" />
      <SiteNav items={homeNavItems} joinHref="#connect" />
    </header>
  );
}

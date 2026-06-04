import { BrandLogo } from "./BrandLogo";

const exploreLinks = [
  { href: "#programs", label: "Community" },
  { href: "#digital", label: "Resources" },
  { href: "#volunteer", label: "Events" },
  { href: "#mission", label: "Places" },
];

const involvedLinks = [
  { href: "#volunteer", label: "Volunteer" },
  { href: "#connect", label: "Donate" },
  { href: "#connect", label: "Partner" },
  { href: "#connect", label: "Contact" },
];

const aboutLinks = [
  { href: "#mission", label: "Our Story" },
  { href: "#mission", label: "Mission" },
  { href: "#connect", label: "Team" },
  { href: "#connect", label: "Contact" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-wide text-[var(--sage)]">
        {title}
      </p>
      <ul className="mt-4 space-y-2 text-sm text-white/85">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <a href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[var(--earth-brown)] px-5 py-14 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_2fr_1fr] lg:items-start">
        <div>
          <BrandLogo
            showTagline={false}
            imageClassName="h-16 w-auto brightness-0 invert"
          />
          <p className="mt-4 max-w-xs text-sm leading-7 text-white/80">
            Keeping It Open, Supportive &amp; Kind — a community network for
            Windham, Ashland, and Jewett.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <FooterColumn title="Explore" links={exploreLinks} />
          <FooterColumn title="Get Involved" links={involvedLinks} />
          <FooterColumn title="About" links={aboutLinks} />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--sage)]">
            Stay Connected
          </p>
          <p className="mt-3 text-sm leading-7 text-white/80">
            Newsletter and social updates coming soon.
          </p>
          <form className="mt-4 flex flex-col gap-2 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email"
              className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none focus:border-[var(--sage)]"
            />
            <button
              type="button"
              className="rounded-full bg-[var(--forest-green)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--forest-green-hover)]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-white/15 pt-6 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Windham KIOSK. All rights reserved.
      </p>
    </footer>
  );
}

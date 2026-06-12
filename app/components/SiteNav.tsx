"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import type { SiteNavItem } from "@/app/lib/site-nav";
import { ButtonLink } from "./Button";

type SiteNavProps = {
  items: SiteNavItem[];
  joinHref: string;
  joinLabel?: string;
  navAriaLabel?: string;
};

function NavLink({
  item,
  className,
  onClick,
}: {
  item: SiteNavItem;
  className: string;
  onClick?: () => void;
}) {
  if (item.href.startsWith("#")) {
    return (
      <a href={item.href} className={className} onClick={onClick}>
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} onClick={onClick}>
      {item.label}
    </Link>
  );
}

export function SiteNav({
  items,
  joinHref,
  joinLabel = "Join KIOSK",
  navAriaLabel = "Main navigation",
}: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <div className="relative ml-auto flex min-w-0 flex-1 items-center justify-end lg:justify-between">
      <nav
        aria-label={navAriaLabel}
        className="hidden flex-1 justify-center gap-5 text-sm font-medium text-[var(--charcoal)] lg:flex"
      >
        {items.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            className="transition hover:text-[var(--forest-green)]"
          />
        ))}
      </nav>

      <div className="flex shrink-0 items-center gap-2">
        <ButtonLink href={joinHref} className="px-5 py-2.5 text-sm">
          {joinLabel}
        </ButtonLink>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--stone)] bg-white/90 text-[var(--earth-brown)] shadow-sm transition hover:border-[var(--forest-green)] hover:text-[var(--forest-green)] lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((current) => !current)}
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6 6 18" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <nav
          id={menuId}
          aria-label={`${navAriaLabel} mobile`}
          className="absolute inset-x-0 top-full z-50 mt-2 border-b border-[var(--stone)] bg-white/95 px-4 py-4 shadow-lg backdrop-blur-sm sm:px-8 lg:hidden"
        >
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.href}>
                <NavLink
                  item={item}
                  className="block rounded-[var(--radius)] px-4 py-3 text-sm font-medium text-[var(--charcoal)] transition hover:bg-[var(--cream)] hover:text-[var(--forest-green)]"
                  onClick={closeMenu}
                />
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}

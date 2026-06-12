export type SiteNavItem = {
  href: string;
  label: string;
};

export const homeNavItems: SiteNavItem[] = [
  { href: "#top", label: "Home" },
  { href: "#mission", label: "About" },
  { href: "#programs", label: "Community" },
  { href: "#digital", label: "Resources" },
  { href: "/events", label: "Events" },
  { href: "#connect", label: "Contact" },
  { href: "/feedback", label: "Feedback" },
];

export const pageNavItems: SiteNavItem[] = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/request-help", label: "Get help" },
  { href: "/feedback", label: "Feedback" },
];

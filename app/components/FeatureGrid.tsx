import type { ReactNode } from "react";

type Feature = {
  title: string;
  description: string;
  icon: ReactNode;
};

function IconCircle({ children }: { children: ReactNode }) {
  return (
    <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[var(--stone)] bg-[var(--cream)] text-[var(--forest-green)]">
      {children}
    </span>
  );
}

const features: Feature[] = [
  {
    title: "Community",
    description:
      "Neighbor-to-neighbor connection, volunteer check-ins, and shared care across Windham, Ashland, and Jewett.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3L4 9v12h16V9l-8-6z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 21v-6h6v6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Places",
    description:
      "Local guides, resident resources, business spotlights, and welcoming paths for new homeowners.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 21s7-5.4 7-11a7 7 0 10-14 0c0 5.6 7 11 7 11z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Opportunities",
    description:
      "Events, vendor fairs, volunteer roles, seasonal outreach, and ways to offer practical blue-collar help.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M7 11l5 4 5-4M7 7l5 4 5-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 18h16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Kindness",
    description:
      "Transportation, companionship, wellness check-ins, seasonal baskets, and encouragement during hard moments.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 20s-7-4.5-7-9.5C5 7.5 8 5 12 8c4-3 7-.5 7 2.5C19 15.5 12 20 12 20z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function FeatureGrid() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => (
        <article
          key={feature.title}
          className="rounded-[var(--radius)] border border-[var(--stone)] bg-white p-6 text-center shadow-sm"
        >
          <IconCircle>{feature.icon}</IconCircle>
          <h3 className="brand-heading mt-5 text-xl font-bold text-[var(--earth-brown)]">
            {feature.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[var(--charcoal)]">
            {feature.description}
          </p>
        </article>
      ))}
    </div>
  );
}

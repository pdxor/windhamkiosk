const values = [
  {
    title: "Open",
    description:
      "A welcoming network where neighbors can reach out without barriers or judgment.",
    icon: "◎",
  },
  {
    title: "Supportive",
    description:
      "Practical help, volunteer skill, and community resources when they matter most.",
    icon: "✦",
  },
  {
    title: "Kind",
    description:
      "Small acts of care — calls, rides, check-ins, and encouragement — that change a day.",
    icon: "♥",
  },
];

export function ValueCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {values.map((value) => (
        <article
          key={value.title}
          className="rounded-[var(--radius)] border border-[var(--stone)] bg-white p-5 shadow-sm"
        >
          <p className="text-2xl text-[var(--forest-green)]" aria-hidden>
            {value.icon}
          </p>
          <h3 className="brand-heading mt-3 text-xl font-bold text-[var(--earth-brown)]">
            {value.title}
          </h3>
          <p className="mt-2 text-sm leading-7">{value.description}</p>
        </article>
      ))}
    </div>
  );
}

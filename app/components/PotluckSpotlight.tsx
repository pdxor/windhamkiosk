import type { PotluckInfo } from "@/app/lib/events";

type PotluckSpotlightProps = {
  potluck: PotluckInfo;
};

export function PotluckSpotlight({ potluck }: PotluckSpotlightProps) {
  return (
    <article className="rounded-[var(--radius)] border border-[var(--stone)] bg-white p-7 shadow-sm lg:p-9">
      <p className="text-sm font-bold uppercase tracking-wide text-[var(--forest-green)]">
        Monthly gathering
      </p>
      <h2 className="brand-heading mt-3 text-3xl font-bold text-[var(--earth-brown)] sm:text-4xl">
        {potluck.title}
      </h2>
      <p className="mt-5 text-lg leading-8">{potluck.description}</p>

      <dl className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[var(--radius)] bg-[var(--cream)] px-5 py-4">
          <dt className="text-xs font-bold uppercase tracking-wide text-[var(--forest-green)]">
            When
          </dt>
          <dd className="mt-2 font-semibold text-[var(--earth-brown)]">
            {potluck.schedule}
          </dd>
        </div>
        <div className="rounded-[var(--radius)] bg-[var(--cream)] px-5 py-4">
          <dt className="text-xs font-bold uppercase tracking-wide text-[var(--forest-green)]">
            Where
          </dt>
          <dd className="mt-2 font-semibold text-[var(--earth-brown)]">
            {potluck.location}
          </dd>
        </div>
      </dl>

      <div className="mt-8">
        <p className="text-sm font-bold uppercase tracking-wide text-[var(--mist-blue)]">
          What to bring
        </p>
        <ul className="mt-4 space-y-2 text-sm leading-7">
          {potluck.whatToBring.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden className="text-[var(--forest-green)]">
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

import Image from "next/image";
import { ButtonLink } from "./components/Button";
import { FeatureGrid } from "./components/FeatureGrid";
import { SectionHeading } from "./components/SectionHeading";
import { SiteFooter } from "./components/SiteFooter";
import { BrandLogo, THEME_LINE } from "./components/BrandLogo";
import { SiteHeader } from "./components/SiteHeader";
import { StatTile } from "./components/StatTile";
import { ValueCards } from "./components/ValueCards";

const coreAreas = [
  {
    title: "Community Support",
    body: "Volunteer check-ins, transportation help, wellness outreach, emergency coordination when possible, and neighbor-to-neighbor connection.",
  },
  {
    title: "Blue-Collar Volunteer Network",
    body: "Electricians, plumbers, carpenters, painters, landscapers, handymen, and labor volunteers offering practical help during times of need.",
  },
  {
    title: "Welcome Wagon",
    body: "Local guides, resident cards, community introductions, resource connections, and small donated welcomes for new homeowners.",
  },
  {
    title: "Resident Community Card",
    body: "A voluntary future program where participating businesses may offer resident appreciation perks, specials, activities, or seasonal access.",
  },
  {
    title: "Seasonal Outreach",
    body: "Thanksgiving and Christmas food baskets, senior holiday check-ins, donation drives, and community-sponsored giving programs.",
  },
  {
    title: "Events and Visibility",
    body: "Vendor fairs, karaoke nights, movie nights, raffles, dinners, business spotlights, community stories, and family-friendly gatherings.",
  },
];

const trades = [
  "Electricians",
  "Plumbers",
  "Carpenters",
  "Painters",
  "Landscapers",
  "Handymen",
  "Labor volunteers",
];

const digitalGoals = [
  "Volunteer sign-up",
  "Private support requests",
  "Community calendar",
  "Local resource library",
  "Business listings",
  "Sponsor recognition",
  "Newcomer information",
  "Community stories",
  "Seasonal outreach updates",
  "Newsletter sign-up",
  "Donation QR access",
  "Facebook and Instagram links",
];

const startPaths = [
  {
    label: "Residents",
    title: "Ask for connection or support",
    body: "A respectful private path for transportation, companionship, wellness check-ins, seasonal help, or navigating a difficult moment.",
  },
  {
    label: "Volunteers",
    title: "Offer time, skill, or care",
    body: "Join outreach calls, senior check-ins, event support, blue-collar help, donation drives, or welcome efforts for new neighbors.",
  },
  {
    label: "Businesses",
    title: "Partner with the community",
    body: "Share resident appreciation perks, sponsor a basket, donate welcome items, host an event, or be featured in a local spotlight.",
  },
];

export default function Home() {
  return (
    <main className="w-full min-w-0 overflow-x-clip bg-[var(--cream)] text-[var(--charcoal)]">
      <section className="relative isolate min-h-[min(88svh,100dvh)] overflow-x-clip border-b border-[var(--stone)]">
        <Image
          src="/hero-americana-main-street.png"
          alt="1950s-style Americana mountain main street with neighbors helping neighbors"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hero-image-tone object-cover object-[center_42%]"
        />
        <div className="hero-vintage-overlay absolute inset-0" aria-hidden />

        <div className="relative mx-auto flex min-h-[min(88svh,100dvh)] w-full max-w-7xl min-w-0 flex-col px-4 py-4 sm:px-8 sm:py-5 lg:px-10">
          <SiteHeader />

          <div
            id="top"
            className="flex min-w-0 flex-1 flex-col justify-center gap-8 py-10 sm:gap-10 sm:py-14 lg:py-16"
          >
            <BrandLogo variant="hero" className="w-fit max-w-full" />

            <div className="min-w-0 max-w-2xl lg:max-w-3xl">
              <p className="theme-line inline-block rounded-full border border-[var(--stone)] bg-white/85 px-4 py-2 text-lg font-semibold leading-snug text-[var(--earth-brown)] shadow-sm backdrop-blur-sm sm:text-xl lg:text-2xl">
                {THEME_LINE}
              </p>
              <p className="mt-5 text-sm font-bold uppercase tracking-wide text-[var(--forest-green)]">
                Keeping It Open, Supportive &amp; Kind
              </p>
              <h1 className="brand-heading mt-3 text-3xl font-bold leading-[1.02] text-[var(--earth-brown)] sm:text-5xl lg:text-[3.5rem]">
                Neighbors helping neighbors across the mountain towns.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
                Connect with people, places, stories, and opportunities that
                help strengthen Windham, Ashland, and Jewett — old-school care,
                visible kindness, practical help.
              </p>
              <div className="mt-8 flex max-w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <ButtonLink href="#connect" className="w-full sm:w-auto">
                  Join Our Community
                  <span aria-hidden>→</span>
                </ButtonLink>
                <ButtonLink
                  href="#programs"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Learn More
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto grid w-full min-w-0 max-w-7xl gap-3 sm:grid-cols-3">
          <StatTile value="3" label="Connected communities" />
          <StatTile value="$0" label="Membership dues planned" />
          <StatTile value="100%" label="Volunteer-driven vision" />
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-8 lg:px-10">
        <FeatureGrid />
      </section>

      <section id="mission" className="px-4 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid w-full min-w-0 max-w-7xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="About"
            title="A growing network of people, businesses, volunteers, events, and resources."
            description={`${THEME_LINE}. The Windham KIOSK strengthens community connection through volunteerism, local support, outreach, events, and neighbor-to-neighbor kindness — the way small mountain towns used to show up for one another.`}
          />
          <div className="space-y-6">
            <ValueCards />
            <div className="border-l-4 border-[var(--mist-blue)] pl-6 text-lg leading-8">
              <p className="font-semibold text-[var(--earth-brown)]">
                It is not a physical structure. It is a community network built
                around care, visibility, and practical help.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="bg-white px-4 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Community"
            title="Practical support with a neighborly center of gravity."
            description="Everyday help, welcoming outreach, seasonal giving, local business participation, and gatherings that keep small-town connection visible."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {coreAreas.map((area) => (
              <article
                key={area.title}
                className="rounded-[var(--radius)] border border-[var(--stone)] bg-[var(--cream)] p-6 shadow-[0_14px_34px_rgba(47,52,51,0.06)]"
              >
                <h3 className="brand-heading text-2xl font-bold text-[var(--earth-brown)]">
                  {area.title}
                </h3>
                <p className="mt-4 leading-7">{area.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="volunteer"
        className="bg-[var(--forest-green)] px-4 py-16 text-white sm:px-8 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Events & Volunteers"
            title="Blue-collar skill, local time, and small acts of care."
            description="The KIOSK organizes practical help when possible — a small repair, ride, call, or check-in can change the whole day."
            light
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {trades.map((trade) => (
              <div
                key={trade}
                className="rounded-[var(--radius)] border border-white/22 bg-white/11 p-5"
              >
                <p className="font-semibold">{trade}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <article className="rounded-[var(--radius)] border border-[var(--stone)] bg-white p-7 shadow-sm">
            <p className="text-sm font-bold uppercase text-[var(--forest-green)]">
              Welcome Wagon
            </p>
            <h2 className="brand-heading mt-4 text-3xl font-bold text-[var(--earth-brown)]">
              A warm first hello.
            </h2>
            <p className="mt-5 leading-8">
              New homeowners can be welcomed with local guides, community
              introductions, resident cards, resource connections, and small
              gifts or coupons donated by local businesses and neighbors.
            </p>
          </article>
          <article className="rounded-[var(--radius)] border border-[var(--stone)] bg-white p-7 shadow-sm">
            <p className="text-sm font-bold uppercase text-[var(--mist-blue)]">
              Resident Community Card
            </p>
            <h2 className="brand-heading mt-4 text-3xl font-bold text-[var(--earth-brown)]">
              Local appreciation.
            </h2>
            <p className="mt-5 leading-8">
              Participating businesses, hotels, restaurants, and recreational
              properties may choose occasional resident perks, specials, event
              access, or seasonal appreciation offerings.
            </p>
          </article>
        </div>
      </section>

      <section id="digital" className="bg-white px-4 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHeading
              eyebrow="Resources"
              title="A website built to make local help easier to find."
              description="The KIOSK can grow into a central place for sign-ups, requests, calendars, stories, sponsors, resource links, and donation access."
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {digitalGoals.map((goal) => (
                <div
                  key={goal}
                  className="rounded-[var(--radius)] border border-[var(--stone)] bg-[var(--cream)] px-4 py-3 text-sm font-semibold"
                >
                  {goal}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="connect"
        className="bg-[var(--sage)] px-4 py-16 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Contact"
            title="Support is not always financial."
            description="Sometimes people need connection, kindness, encouragement, transportation, companionship, or help navigating a difficult moment."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {startPaths.map((path) => (
              <article
                key={path.title}
                className="rounded-[var(--radius)] border border-[var(--stone)] bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-bold uppercase text-[var(--forest-green)]">
                  {path.label}
                </p>
                <h3 className="brand-heading mt-3 text-2xl font-bold text-[var(--earth-brown)]">
                  {path.title}
                </h3>
                <p className="mt-4 leading-7">{path.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <SectionHeading
            eyebrow="Vision"
            title={THEME_LINE}
            description="People know each other, support each other, and are not afraid to reach out during difficult times. Sometimes the smallest acts of kindness create the biggest impact."
            align="center"
          />
          <p className="mt-6 font-semibold text-[var(--earth-brown)]">
            Milly Morabito, Founder
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

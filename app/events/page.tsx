import type { Metadata } from "next";
import { EventGallery } from "@/app/components/EventGallery";
import { EventsCalendarPlaceholder } from "@/app/components/EventsCalendarPlaceholder";
import { PageChrome } from "@/app/components/PageChrome";
import { PotluckSpotlight } from "@/app/components/PotluckSpotlight";
import { SectionHeading } from "@/app/components/SectionHeading";
import { SiteFooter } from "@/app/components/SiteFooter";
import {
  PLACEHOLDER_CALENDAR_MONTH,
  eventGallery,
  monthlyPotluck,
  placeholderCalendarEvents,
} from "@/app/lib/events";

export const metadata: Metadata = {
  title: "Events & Calendar | Windham KIOSK",
  description:
    "Community gatherings, the monthly potluck, and a calendar of Windham KIOSK events across Windham, Ashland, and Jewett.",
};

export default function EventsPage() {
  return (
    <>
      <PageChrome>
        <main className="space-y-16 py-10 sm:space-y-20 sm:py-14">
          <SectionHeading
            eyebrow="KIOSK calendar"
            title="Events that keep neighbors connected."
            description="Vendor fairs, potlucks, movie nights, and seasonal gatherings across Windham, Ashland, and Jewett. This calendar is a placeholder for now — dates and details will update as the KIOSK grows."
          />

          <section aria-labelledby="potluck-heading">
            <h2 id="potluck-heading" className="sr-only">
              Monthly potluck
            </h2>
            <PotluckSpotlight potluck={monthlyPotluck} />
          </section>

          <section aria-labelledby="calendar-heading">
            <h2 id="calendar-heading" className="sr-only">
              Event calendar
            </h2>
            <EventsCalendarPlaceholder
              year={PLACEHOLDER_CALENDAR_MONTH.year}
              month={PLACEHOLDER_CALENDAR_MONTH.month}
              monthLabel={PLACEHOLDER_CALENDAR_MONTH.label}
              events={placeholderCalendarEvents}
            />
          </section>

          <section aria-labelledby="gallery-heading">
            <SectionHeading
              eyebrow="Event gallery"
              title="The kind of gatherings we are building toward."
              description="Photos and highlights will grow here as events happen. For now, these placeholders reflect the spirit of the KIOSK."
            />
            <div className="mt-10">
              <EventGallery items={eventGallery} />
            </div>
          </section>
        </main>
      </PageChrome>
      <SiteFooter />
    </>
  );
}

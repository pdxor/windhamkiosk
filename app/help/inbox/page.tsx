import type { Metadata } from "next";
import { HelpInbox } from "@/app/components/HelpInbox";
import { PageChrome } from "@/app/components/PageChrome";
import { SectionHeading } from "@/app/components/SectionHeading";
import { SiteFooter } from "@/app/components/SiteFooter";

export const metadata: Metadata = {
  title: "Help inbox | Windham KIOSK",
  description: "Private inbox for KIOSK organizers.",
  robots: { index: false, follow: false },
};

export default function HelpInboxPage() {
  return (
    <>
      <PageChrome>
        <main className="py-10 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="Organizers only"
              title="Private help inbox"
              description="Requests from the community are stored privately — not on the public feedback board."
            />
            <div className="mt-10">
              <HelpInbox />
            </div>
          </div>
        </main>
      </PageChrome>
      <SiteFooter />
    </>
  );
}

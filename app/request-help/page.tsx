import type { Metadata } from "next";
import { HelpRequestForm } from "@/app/components/HelpRequestForm";
import { PageChrome } from "@/app/components/PageChrome";
import { SectionHeading } from "@/app/components/SectionHeading";
import { SiteFooter } from "@/app/components/SiteFooter";

export const metadata: Metadata = {
  title: "Private help request | Windham KIOSK",
  description:
    "Submit a private request for connection, support, or volunteer interest. Not shown publicly on the site.",
  robots: { index: true, follow: true },
};

export default function RequestHelpPage() {
  return (
    <>
      <PageChrome>
        <main className="py-10 sm:py-14">
          <div className="mx-auto max-w-xl">
            <SectionHeading
              eyebrow="Private"
              title="Ask for connection or support"
              description="A respectful, private path for transportation, companionship, wellness check-ins, seasonal help, or navigating a difficult moment. Only the KIOSK team sees what you send."
            />
            <div className="mt-10">
              <HelpRequestForm />
            </div>
          </div>
        </main>
      </PageChrome>
      <SiteFooter />
    </>
  );
}

import type { Metadata } from "next";
import { FeedbackBoard } from "@/app/components/FeedbackBoard";
import { PageChrome } from "@/app/components/PageChrome";
import { SectionHeading } from "@/app/components/SectionHeading";
import { SiteFooter } from "@/app/components/SiteFooter";
import { readFeedbackStoreFromDisk } from "@/app/lib/feedback-file-store";

export const metadata: Metadata = {
  title: "Site Feedback | Windham KIOSK",
  description:
    "Leave notes for the Windham KIOSK website build. Published here for the team and development agent.",
};

export default async function FeedbackPage() {
  const store = await readFeedbackStoreFromDisk();

  return (
    <>
      <PageChrome>
        <main className="py-10 sm:py-14">
          <SectionHeading
            eyebrow="Site build"
            title="Feedback board"
            description="A living list of change requests for this website. Notes publish here immediately so collaborators and the coding agent can pick them up."
          />
          <FeedbackBoard initialEntries={store.entries} />
        </main>
      </PageChrome>
      <SiteFooter />
    </>
  );
}

import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { InboxClient } from "@/components/admin/inbox-client";
import type { ContactSubmission } from "@/lib/types";

export const metadata: Metadata = {
  title: "Inbox",
};

export default async function InboxPage() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Inbox</h1>
        <p className="mt-1 text-muted-foreground">
          Manage contact submissions.
        </p>
      </div>
      <InboxClient submissions={submissions as ContactSubmission[]} />
    </div>
  );
}

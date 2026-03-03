import type { Metadata } from "next";
import { getDb } from "@/lib/db";
import { InboxClient } from "@/components/admin/inbox-client";

export const metadata: Metadata = {
  title: "Inbox",
};

export default async function InboxPage() {
  const sql = getDb();
  const submissions = await sql`
    SELECT * FROM contact_submissions ORDER BY created_at DESC
  `;

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Inbox</h1>
        <p className="mt-1 text-muted-foreground">
          Manage contact submissions.
        </p>
      </div>
      <InboxClient submissions={submissions} />
    </div>
  );
}

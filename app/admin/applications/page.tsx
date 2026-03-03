import type { Metadata } from "next";
import { getDb } from "@/lib/db";
import { ApplicationsList } from "@/components/admin/applications-list";
import type { Application } from "@/lib/types";

export const metadata: Metadata = {
  title: "Applications",
};

export default async function ApplicationsPage() {
  const sql = getDb();
  const applications = (await sql`SELECT * FROM applications ORDER BY created_at DESC`) as Application[];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Applications</h1>
        <p className="mt-1 text-muted-foreground">
          Manage platform applications.
        </p>
      </div>
      <ApplicationsList applications={applications} />
    </div>
  );
}

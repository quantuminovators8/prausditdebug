import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { AppEditorClient } from "@/components/admin/app-editor-client";

export const metadata: Metadata = {
  title: "Edit Application",
};

export default async function AppEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sql = getDb();

  const apps = await sql`SELECT * FROM applications WHERE id = ${parseInt(id)}`;
  if (apps.length === 0) notFound();

  const docs = await sql`
    SELECT * FROM documentation
    WHERE application_id = ${parseInt(id)}
    ORDER BY sort_order ASC, created_at ASC
  `;

  return (
    <div className="p-6 md:p-8">
      <AppEditorClient application={apps[0]} documentation={docs} />
    </div>
  );
}

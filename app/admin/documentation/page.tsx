import type { Metadata } from "next";
import { getDb } from "@/lib/db";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation",
};

export default async function DocumentationPage() {
  const sql = getDb();
  const apps = await sql`SELECT * FROM applications ORDER BY name ASC`;

  const docCounts = await sql`
    SELECT application_id, COUNT(*) as count
    FROM documentation
    GROUP BY application_id
  `;

  const countMap = new Map(
    docCounts.map((d: { application_id: number; count: string }) => [
      d.application_id,
      parseInt(d.count),
    ])
  );

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Documentation</h1>
        <p className="mt-1 text-muted-foreground">
          Manage documentation across applications.
        </p>
      </div>

      {apps.length === 0 ? (
        <div className="rounded-xl border border-border bg-card py-12 text-center">
          <FileText
            size={40}
            className="mx-auto mb-3 text-muted-foreground/40"
          />
          <p className="text-muted-foreground">
            No applications yet. Create an application first.
          </p>
          <Link
            href="/admin/applications"
            className="mt-2 inline-flex items-center gap-1 text-sm text-[var(--neon-cyan)] hover:underline"
          >
            Go to Applications
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app: { id: number; name: string; slug: string }) => (
            <Link
              key={app.id}
              href={`/admin/applications/${app.id}`}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-[var(--neon-cyan)]/30"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{app.name}</h3>
                <ArrowRight size={16} className="text-muted-foreground" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground font-mono">
                /{app.slug}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {countMap.get(app.id) || 0} documentation page
                {(countMap.get(app.id) || 0) !== 1 ? "s" : ""}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

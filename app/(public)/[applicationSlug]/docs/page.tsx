import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getDb } from "@/lib/db";
import { BookOpen } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ applicationSlug: string }>;
}): Promise<Metadata> {
  const { applicationSlug } = await params;
  const sql = getDb();
  const apps =
    await sql`SELECT name FROM applications WHERE slug = ${applicationSlug} AND status = 'published'`;
  if (apps.length === 0) return { title: "Not Found" };
  return { title: `Documentation - ${apps[0].name}` };
}

export default async function DocsIndexPage({
  params,
}: {
  params: Promise<{ applicationSlug: string }>;
}) {
  const { applicationSlug } = await params;
  const sql = getDb();

  const apps =
    await sql`SELECT * FROM applications WHERE slug = ${applicationSlug} AND status = 'published'`;
  if (apps.length === 0) notFound();

  const docs = await sql`
    SELECT * FROM documentation
    WHERE application_id = ${apps[0].id} AND parent_id IS NULL
    ORDER BY sort_order ASC, created_at ASC
  `;

  return (
    <div className="max-w-3xl">
      <h1 className="mb-2 text-3xl font-bold text-foreground">
        {apps[0].name} Documentation
      </h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Browse the documentation to learn about {apps[0].name}.
      </p>

      {docs.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <BookOpen
            size={40}
            className="mx-auto mb-3 text-muted-foreground/40"
          />
          <p className="text-muted-foreground">
            Documentation is coming soon.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {docs.map(
            (doc: { id: number; title: string; slug: string }) => (
              <Link
                key={doc.id}
                href={`/${applicationSlug}/docs/${doc.slug}`}
                className="glass rounded-xl p-5 transition-all hover:neon-glow-cyan"
              >
                <div className="flex items-center gap-3">
                  <BookOpen
                    size={20}
                    className="shrink-0 text-[var(--neon-cyan)]"
                  />
                  <span className="font-medium text-foreground">
                    {doc.title}
                  </span>
                </div>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}

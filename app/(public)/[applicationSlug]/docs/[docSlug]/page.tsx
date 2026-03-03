import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getDb } from "@/lib/db";
import { DocContent } from "@/components/docs/doc-content";
import { ChevronLeft, ChevronRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ applicationSlug: string; docSlug: string }>;
}): Promise<Metadata> {
  const { applicationSlug, docSlug } = await params;
  const sql = getDb();
  const apps =
    await sql`SELECT id, name FROM applications WHERE slug = ${applicationSlug} AND status = 'published'`;
  if (apps.length === 0) return { title: "Not Found" };
  const docs =
    await sql`SELECT title FROM documentation WHERE application_id = ${apps[0].id} AND slug = ${docSlug}`;
  if (docs.length === 0) return { title: "Not Found" };
  return { title: `${docs[0].title} - ${apps[0].name}` };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ applicationSlug: string; docSlug: string }>;
}) {
  const { applicationSlug, docSlug } = await params;
  const sql = getDb();

  const apps =
    await sql`SELECT * FROM applications WHERE slug = ${applicationSlug} AND status = 'published'`;
  if (apps.length === 0) notFound();

  const docs =
    await sql`SELECT * FROM documentation WHERE application_id = ${apps[0].id} AND slug = ${docSlug}`;
  if (docs.length === 0) notFound();

  const doc = docs[0];

  // Get all docs for prev/next navigation
  const allDocs = await sql`
    SELECT id, title, slug, sort_order FROM documentation
    WHERE application_id = ${apps[0].id}
    ORDER BY sort_order ASC, created_at ASC
  `;

  const currentIndex = allDocs.findIndex((d) => d.id === doc.id);
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const nextDoc =
    currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

  // Get children for this doc
  const children = await sql`
    SELECT id, title, slug FROM documentation
    WHERE parent_id = ${doc.id}
    ORDER BY sort_order ASC
  `;

  return (
    <div className="max-w-3xl">
      <DocContent title={doc.title} content={doc.content || ""} />

      {/* Child pages */}
      {children.length > 0 && (
        <div className="mt-8 border-t border-border pt-8">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            In this section
          </h3>
          <div className="flex flex-col gap-2">
            {children.map((child) => (
                <Link
                  key={child.id}
                  href={`/${applicationSlug}/docs/${child.slug}`}
                  className="rounded-lg border border-border p-3 text-sm text-foreground transition-colors hover:border-primary/30 hover:bg-secondary"
                >
                  {child.title}
                </Link>
              )
            )}
          </div>
        </div>
      )}

      {/* Prev/Next navigation */}
      <div className="mt-8 flex items-center justify-between border-t border-border pt-8">
        {prevDoc ? (
          <Link
            href={`/${applicationSlug}/docs/${prevDoc.slug}`}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft size={16} />
            {prevDoc.title}
          </Link>
        ) : (
          <div />
        )}
        {nextDoc ? (
          <Link
            href={`/${applicationSlug}/docs/${nextDoc.slug}`}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {nextDoc.title}
            <ChevronRight size={16} />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

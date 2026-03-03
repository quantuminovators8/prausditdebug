import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import type { Application, Documentation, DocTreeNode } from "@/lib/types";

function buildDocTree(docs: Documentation[]): DocTreeNode[] {
  const map = new Map<number, DocTreeNode>();
  const roots: DocTreeNode[] = [];

  docs.forEach((doc) => {
    map.set(doc.id, { ...doc, children: [] });
  });

  docs.forEach((doc) => {
    const node = map.get(doc.id)!;
    if (doc.parent_id && map.has(doc.parent_id)) {
      map.get(doc.parent_id)!.children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ applicationSlug: string }>;
}) {
  const { applicationSlug } = await params;
  const sql = getDb();

  const apps =
    (await sql`SELECT * FROM applications WHERE slug = ${applicationSlug} AND status = 'published'`) as Application[];
  if (apps.length === 0) notFound();

  const app = apps[0];
  const docs = (await sql`
    SELECT * FROM documentation
    WHERE application_id = ${app.id}
    ORDER BY sort_order ASC, created_at ASC
  `) as Documentation[];

  const docTree = buildDocTree(docs);

  return (
    <div className="flex min-h-screen pt-24">
      <DocsSidebar
        appName={app.name}
        appSlug={applicationSlug}
        docTree={docTree}
      />
      <div className="flex-1 px-6 py-8 md:px-12 lg:px-16">{children}</div>
    </div>
  );
}

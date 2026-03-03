import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import type { Documentation, DocTreeNode } from "@/lib/types";

function buildDocTree(docs: Documentation[]): DocTreeNode[] {
  const map = new Map<number, DocTreeNode>();
  const roots: DocTreeNode[] = [];

  docs.forEach((doc) => {
    map.set(doc.id, { ...doc, children: [] });
  });

  docs.forEach((doc) => {
    const node = map.get(doc.id)!;
    if (doc.parentId && map.has(doc.parentId)) {
      map.get(doc.parentId)!.children.push(node);
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

  const app = await prisma.application.findUnique({
    where: { slug: applicationSlug },
  });
  if (!app || app.status !== "published") notFound();

  const docs = await prisma.documentation.findMany({
    where: { applicationId: app.id },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  const docTree = buildDocTree(docs as Documentation[]);

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

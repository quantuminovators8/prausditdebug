import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AppEditorClient } from "@/components/admin/app-editor-client";
import type { Application, Documentation } from "@/lib/types";

export const metadata: Metadata = {
  title: "Edit Application",
};

export default async function AppEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const app = await prisma.application.findUnique({
    where: { id: parseInt(id) },
  });
  if (!app) notFound();

  const docs = await prisma.documentation.findMany({
    where: { applicationId: parseInt(id) },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div className="p-6 md:p-8">
      <AppEditorClient
        application={app as Application}
        documentation={docs as Documentation[]}
      />
    </div>
  );
}

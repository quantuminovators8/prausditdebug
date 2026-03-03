import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ApplicationsList } from "@/components/admin/applications-list";
import type { Application } from "@/lib/types";

export const metadata: Metadata = {
  title: "Applications",
};

export default async function ApplicationsPage() {
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Applications</h1>
        <p className="mt-1 text-muted-foreground">
          Manage platform applications.
        </p>
      </div>
      <ApplicationsList applications={applications as Application[]} />
    </div>
  );
}

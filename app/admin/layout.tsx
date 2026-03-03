import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { resolveRole } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AccessDenied } from "@/components/admin/access-denied";
import type { DbUser } from "@/lib/types";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  // Sync user to DB if not exists
  let dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!dbUser) {
    const clerkUser = await currentUser();
    if (!clerkUser) redirect("/login");

    const name =
      `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
      "User";
    const email = clerkUser.emailAddresses[0]?.emailAddress || "";
    const role = resolveRole(email);

    dbUser = await prisma.user.upsert({
      where: { clerkId: userId },
      create: { clerkId: userId, name, email, role },
      update: { name, email },
    });
  } else {
    // Check if existing user should be promoted based on SUPER_ADMIN_EMAIL
    const expectedRole = resolveRole(dbUser.email);
    if (expectedRole === "admin" && dbUser.role !== "admin") {
      dbUser = await prisma.user.update({
        where: { clerkId: userId },
        data: { role: expectedRole },
      });
    }
  }

  if (dbUser.role !== "admin" && dbUser.role !== "developer") {
    return <AccessDenied />;
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar user={dbUser as DbUser} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

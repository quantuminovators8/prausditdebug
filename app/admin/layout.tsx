import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getDb } from "@/lib/db";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import type { DbUser } from "@/lib/types";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const sql = getDb();

  // Sync user to DB if not exists
  let users = (await sql`SELECT * FROM users WHERE clerk_id = ${userId}`) as DbUser[];
  if (users.length === 0) {
    // Auto-create user from Clerk
    const { currentUser } = await import("@clerk/nextjs/server");
    const clerkUser = await currentUser();
    if (!clerkUser) redirect("/login");

    const name =
      `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
      "User";
    const email = clerkUser.emailAddresses[0]?.emailAddress || "";

    users = (await sql`
      INSERT INTO users (clerk_id, name, email, role)
      VALUES (${userId}, ${name}, ${email}, 'user')
      ON CONFLICT (clerk_id) DO UPDATE SET name = ${name}, email = ${email}
      RETURNING *
    `) as DbUser[];
  }

  const dbUser = users[0];

  if (dbUser.role !== "admin" && dbUser.role !== "developer") {
    redirect("/");
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar user={dbUser} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

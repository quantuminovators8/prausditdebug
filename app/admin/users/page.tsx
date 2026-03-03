import type { Metadata } from "next";
import { getDb } from "@/lib/db";
import { UsersClient } from "@/components/admin/users-client";

export const metadata: Metadata = {
  title: "Users",
};

export default async function UsersPage() {
  const sql = getDb();
  const users = await sql`SELECT * FROM users ORDER BY created_at DESC`;

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Users</h1>
        <p className="mt-1 text-muted-foreground">Manage platform users and roles.</p>
      </div>
      <UsersClient users={users} />
    </div>
  );
}

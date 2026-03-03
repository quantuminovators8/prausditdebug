import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { getDb } from "@/lib/db";
import type { DbUser } from "@/lib/types";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const { userId } = await auth();
  const sql = getDb();
  const users = (await sql`SELECT * FROM users WHERE clerk_id = ${userId}`) as DbUser[];
  const user = users[0];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-muted-foreground">Platform configuration.</p>
      </div>

      <div className="max-w-2xl rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Account Information
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">Name</span>
            <span className="text-sm font-medium text-foreground">
              {user?.name}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">Email</span>
            <span className="text-sm font-medium text-foreground">
              {user?.email}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">Role</span>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
              {user?.role}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Clerk ID</span>
            <span className="text-sm font-mono text-muted-foreground">
              {user?.clerk_id}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

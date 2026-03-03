import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { UsersClient } from "@/components/admin/users-client";
import type { DbUser } from "@/lib/types";

export const metadata: Metadata = {
  title: "Users",
};

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Users</h1>
        <p className="mt-1 text-muted-foreground">Manage platform users and roles.</p>
      </div>
      <UsersClient users={users as DbUser[]} />
    </div>
  );
}

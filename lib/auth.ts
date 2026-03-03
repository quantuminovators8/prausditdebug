import { auth, currentUser } from "@clerk/nextjs/server";
import { getDb } from "./db";
import type { DbUser } from "./types";

export async function getAuthUser(): Promise<DbUser | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const sql = getDb();
  const rows = (await sql`SELECT * FROM users WHERE clerk_id = ${userId}`) as DbUser[];
  return rows[0] || null;
}

export async function syncUser(): Promise<DbUser | null> {
  const user = await currentUser();
  if (!user) return null;

  const sql = getDb();
  const name = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User";
  const email = user.emailAddresses[0]?.emailAddress || "";

  const existing = (await sql`SELECT * FROM users WHERE clerk_id = ${user.id}`) as DbUser[];

  if (existing.length > 0) {
    await sql`UPDATE users SET name = ${name}, email = ${email} WHERE clerk_id = ${user.id}`;
    return existing[0];
  }

  const result = (await sql`
    INSERT INTO users (clerk_id, name, email, role)
    VALUES (${user.id}, ${name}, ${email}, 'user')
    RETURNING *
  `) as DbUser[];
  return result[0];
}

export async function requireAdmin(): Promise<DbUser | null> {
  const dbUser = await getAuthUser();
  if (!dbUser || (dbUser.role !== "admin" && dbUser.role !== "developer")) {
    return null;
  }
  return dbUser;
}

export async function requireRole(roles: string[]): Promise<DbUser | null> {
  const dbUser = await getAuthUser();
  if (!dbUser || !roles.includes(dbUser.role)) {
    return null;
  }
  return dbUser;
}

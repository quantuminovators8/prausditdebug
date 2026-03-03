import { auth, currentUser } from "@clerk/nextjs/server";
import { getDb } from "./db";

export async function getAuthUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const sql = getDb();
  const rows = await sql`SELECT * FROM users WHERE clerk_id = ${userId}`;
  return rows[0] || null;
}

export async function syncUser() {
  const user = await currentUser();
  if (!user) return null;

  const sql = getDb();
  const name = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User";
  const email = user.emailAddresses[0]?.emailAddress || "";

  const existing = await sql`SELECT * FROM users WHERE clerk_id = ${user.id}`;

  if (existing.length > 0) {
    await sql`UPDATE users SET name = ${name}, email = ${email} WHERE clerk_id = ${user.id}`;
    return existing[0];
  }

  const result = await sql`
    INSERT INTO users (clerk_id, name, email, role)
    VALUES (${user.id}, ${name}, ${email}, 'user')
    RETURNING *
  `;
  return result[0];
}

export async function requireAdmin() {
  const dbUser = await getAuthUser();
  if (!dbUser || (dbUser.role !== "admin" && dbUser.role !== "developer")) {
    return null;
  }
  return dbUser;
}

export async function requireRole(roles: string[]) {
  const dbUser = await getAuthUser();
  if (!dbUser || !roles.includes(dbUser.role as string)) {
    return null;
  }
  return dbUser;
}

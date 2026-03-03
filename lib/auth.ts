import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
import type { DbUser } from "./types";

/**
 * Resolves the role a user should be assigned based on their email.
 * If the email matches SUPER_ADMIN_EMAIL, returns "admin".
 * Otherwise returns "user".
 */
export function resolveRole(email: string): string {
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
  if (superAdminEmail && email.toLowerCase() === superAdminEmail.toLowerCase()) {
    return "admin";
  }
  return "user";
}

export async function getAuthUser(): Promise<DbUser | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  return user as DbUser | null;
}

export async function syncUser(): Promise<DbUser | null> {
  const user = await currentUser();
  if (!user) return null;

  const name = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User";
  const email = user.emailAddresses[0]?.emailAddress || "";
  const role = resolveRole(email);

  const existing = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (existing) {
    // If the user should be admin based on SUPER_ADMIN_EMAIL, promote them
    if (role === "admin" && existing.role !== "admin") {
      const promoted = await prisma.user.update({
        where: { clerkId: user.id },
        data: { name, email, role },
      });
      return promoted as DbUser;
    }
    const updated = await prisma.user.update({
      where: { clerkId: user.id },
      data: { name, email },
    });
    return updated as DbUser;
  }

  const created = await prisma.user.create({
    data: { clerkId: user.id, name, email, role },
  });
  return created as DbUser;
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

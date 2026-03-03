import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getDb } from "@/lib/db";
import { resolveRole } from "@/lib/auth";
import type { DbUser } from "@/lib/types";

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const sql = getDb();
    const name =
      `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User";
    const email = user.emailAddresses[0]?.emailAddress || "";
    const role = resolveRole(email);

    const existing = (await sql`SELECT * FROM users WHERE clerk_id = ${userId}`) as DbUser[];

    if (existing.length > 0) {
      // If the user should be admin based on SUPER_ADMIN_EMAIL, promote them
      if (role === "admin" && existing[0].role !== "admin") {
        const promoted = (await sql`
          UPDATE users SET name = ${name}, email = ${email}, role = ${role} WHERE clerk_id = ${userId}
          RETURNING *
        `) as DbUser[];
        return NextResponse.json({ user: promoted[0], synced: true });
      }
      await sql`UPDATE users SET name = ${name}, email = ${email} WHERE clerk_id = ${userId}`;
      return NextResponse.json({ user: existing[0], synced: true });
    }

    const result = (await sql`
      INSERT INTO users (clerk_id, name, email, role)
      VALUES (${userId}, ${name}, ${email}, ${role})
      RETURNING *
    `) as DbUser[];

    return NextResponse.json({ user: result[0], synced: true });
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getDb } from "@/lib/db";
import type { DbUser, Documentation } from "@/lib/types";

async function checkAdmin() {
  const { userId } = await auth();
  if (!userId) return false;
  const sql = getDb();
  const users = (await sql`SELECT role FROM users WHERE clerk_id = ${userId}`) as Pick<DbUser, "role">[];
  return users.length > 0 && (users[0].role === "admin" || users[0].role === "developer");
}

export async function POST(req: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { application_id, title, slug, parent_id, content, sort_order } =
      await req.json();

    if (!application_id || !title || !slug) {
      return NextResponse.json(
        { error: "application_id, title, and slug are required" },
        { status: 400 }
      );
    }

    const sql = getDb();

    const result = (await sql`
      INSERT INTO documentation (application_id, title, slug, parent_id, content, sort_order)
      VALUES (${application_id}, ${title}, ${slug}, ${parent_id ? parseInt(parent_id) : null}, ${content || ""}, ${sort_order || 0})
      RETURNING *
    `) as Documentation[];

    return NextResponse.json({ doc: result[0] });
  } catch (error) {
    console.error("Create doc error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getDb } from "@/lib/db";

async function checkAdmin() {
  const { userId } = await auth();
  if (!userId) return false;
  const sql = getDb();
  const users = await sql`SELECT role FROM users WHERE clerk_id = ${userId}`;
  return users.length > 0 && (users[0].role === "admin" || users[0].role === "developer");
}

export async function POST(req: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, slug, introduction, hero_image, status } = await req.json();

    if (!name || !slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 }
      );
    }

    const sql = getDb();

    const existing = await sql`SELECT id FROM applications WHERE slug = ${slug}`;
    if (existing.length > 0) {
      return NextResponse.json(
        { error: "An application with this slug already exists" },
        { status: 409 }
      );
    }

    const result = await sql`
      INSERT INTO applications (name, slug, introduction, hero_image, status)
      VALUES (${name}, ${slug}, ${introduction || null}, ${hero_image || null}, ${status || "draft"})
      RETURNING *
    `;

    return NextResponse.json({ application: result[0] });
  } catch (error) {
    console.error("Create application error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getDb } from "@/lib/db";
import type { DbUser, Application } from "@/lib/types";

async function checkAdmin() {
  const { userId } = await auth();
  if (!userId) return false;
  const sql = getDb();
  const users = (await sql`SELECT role FROM users WHERE clerk_id = ${userId}`) as Pick<DbUser, "role">[];
  return users.length > 0 && (users[0].role === "admin" || users[0].role === "developer");
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const sql = getDb();

  const { name, slug, introduction, hero_image, status } = body;

  await sql`
    UPDATE applications
    SET name = COALESCE(${name}, name),
        slug = COALESCE(${slug}, slug),
        introduction = COALESCE(${introduction}, introduction),
        hero_image = COALESCE(${hero_image}, hero_image),
        status = COALESCE(${status}, status)
    WHERE id = ${parseInt(id)}
  `;

  const updated = (await sql`SELECT * FROM applications WHERE id = ${parseInt(id)}`) as Application[];
  return NextResponse.json({ application: updated[0] });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const sql = getDb();

  await sql`DELETE FROM applications WHERE id = ${parseInt(id)}`;
  return NextResponse.json({ success: true });
}

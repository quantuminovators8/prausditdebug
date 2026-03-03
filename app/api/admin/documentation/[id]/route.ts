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

  if (body.content !== undefined) {
    await sql`UPDATE documentation SET content = ${body.content} WHERE id = ${parseInt(id)}`;
  }
  if (body.title !== undefined) {
    await sql`UPDATE documentation SET title = ${body.title} WHERE id = ${parseInt(id)}`;
  }
  if (body.sort_order !== undefined) {
    await sql`UPDATE documentation SET sort_order = ${body.sort_order} WHERE id = ${parseInt(id)}`;
  }

  const updated = await sql`SELECT * FROM documentation WHERE id = ${parseInt(id)}`;
  return NextResponse.json({ doc: updated[0] });
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

  await sql`DELETE FROM documentation WHERE id = ${parseInt(id)}`;
  return NextResponse.json({ success: true });
}

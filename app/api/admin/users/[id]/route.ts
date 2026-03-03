import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getDb } from "@/lib/db";
import type { DbUser } from "@/lib/types";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getDb();
  const admins = (await sql`SELECT role FROM users WHERE clerk_id = ${userId}`) as Pick<DbUser, "role">[];
  if (admins.length === 0 || admins[0].role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const { role } = await req.json();

  if (!["user", "developer", "admin"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  await sql`UPDATE users SET role = ${role} WHERE id = ${parseInt(id)}`;
  return NextResponse.json({ success: true });
}

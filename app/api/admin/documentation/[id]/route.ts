import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  const data: Record<string, unknown> = {};
  if (body.content !== undefined) data.content = body.content;
  if (body.title !== undefined) data.title = body.title;
  if (body.sortOrder !== undefined) data.sortOrder = body.sortOrder;

  const doc = await prisma.documentation.update({
    where: { id: parseInt(id) },
    data,
  });

  return NextResponse.json({ doc });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await prisma.documentation.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ success: true });
}

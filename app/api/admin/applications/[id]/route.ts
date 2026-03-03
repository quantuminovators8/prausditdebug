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
  if (body.name !== undefined) data.name = body.name;
  if (body.slug !== undefined) data.slug = body.slug;
  if (body.introduction !== undefined) data.introduction = body.introduction;
  if (body.heroImage !== undefined) data.heroImage = body.heroImage;
  if (body.status !== undefined) data.status = body.status;

  const application = await prisma.application.update({
    where: { id: parseInt(id) },
    data,
  });

  return NextResponse.json({ application });
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

  await prisma.application.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ success: true });
}

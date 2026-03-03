import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const sql = getDb();
    const { name, email, subject, message } = await req.json();

    if (!name || !subject || !message) {
      return NextResponse.json(
        { error: "Name, subject, and message are required." },
        { status: 400 }
      );
    }

    // Get IP address
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip") || "unknown";

    // Determine role type
    let roleType = "anonymous";
    try {
      const { userId } = await auth();
      if (userId) {
        const users = await sql`SELECT role FROM users WHERE clerk_id = ${userId}`;
        if (users.length > 0) {
          roleType = users[0].role === "developer" ? "developer" : "user";
        } else {
          roleType = "user";
        }
      }
    } catch {
      // Not authenticated — anonymous
    }

    // Check duplicate submission
    const emailStr = email && email.trim() !== "" ? email.trim() : null;

    if (emailStr) {
      const existing = await sql`
        SELECT id FROM contact_submissions WHERE email = ${emailStr}
      `;
      if (existing.length > 0) {
        return NextResponse.json(
          { error: "A submission from this email already exists." },
          { status: 409 }
        );
      }
    } else {
      const existing = await sql`
        SELECT id FROM contact_submissions WHERE ip_address = ${ip} AND email IS NULL
      `;
      if (existing.length > 0) {
        return NextResponse.json(
          { error: "A submission from this IP already exists. Please provide an email for additional submissions." },
          { status: 409 }
        );
      }
    }

    await sql`
      INSERT INTO contact_submissions (name, email, subject, message, ip_address, role_type)
      VALUES (${name}, ${emailStr}, ${subject}, ${message}, ${ip}, ${roleType})
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

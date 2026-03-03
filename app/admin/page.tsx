import { getDb } from "@/lib/db";
import { AppWindow, FileText, Inbox, Users } from "lucide-react";

export default async function AdminDashboard() {
  const sql = getDb();

  const [apps, docs, messages, users] = await Promise.all([
    sql`SELECT COUNT(*) as count FROM applications`,
    sql`SELECT COUNT(*) as count FROM documentation`,
    sql`SELECT COUNT(*) as count FROM contact_submissions`,
    sql`SELECT COUNT(*) as count FROM users`,
  ]);

  const unreadMessages =
    await sql`SELECT COUNT(*) as count FROM contact_submissions WHERE is_read = false`;

  const stats = [
    {
      label: "Applications",
      value: apps[0].count,
      icon: AppWindow,
      color: "text-[var(--neon-cyan)]",
      bg: "bg-[var(--neon-cyan)]/10",
    },
    {
      label: "Documentation Pages",
      value: docs[0].count,
      icon: FileText,
      color: "text-[var(--neon-purple)]",
      bg: "bg-[var(--neon-purple)]/10",
    },
    {
      label: "Messages",
      value: messages[0].count,
      icon: Inbox,
      color: "text-[var(--neon-cyan)]",
      bg: "bg-[var(--neon-cyan)]/10",
      sub: `${unreadMessages[0].count} unread`,
    },
    {
      label: "Users",
      value: users[0].count,
      icon: Users,
      color: "text-[var(--neon-purple)]",
      bg: "bg-[var(--neon-purple)]/10",
    },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Overview of the Prausdit platform.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg}`}
              >
                <stat.icon size={20} className={stat.color} />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-foreground">
              {stat.value}
            </p>
            {stat.sub && (
              <p className="mt-1 text-xs text-muted-foreground">{stat.sub}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Quick Actions
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <a
            href="/admin/applications"
            className="rounded-lg border border-border p-4 text-center transition-colors hover:border-[var(--neon-cyan)]/30 hover:bg-secondary"
          >
            <AppWindow size={24} className="mx-auto mb-2 text-[var(--neon-cyan)]" />
            <p className="text-sm font-medium text-foreground">
              Manage Applications
            </p>
          </a>
          <a
            href="/admin/inbox"
            className="rounded-lg border border-border p-4 text-center transition-colors hover:border-[var(--neon-purple)]/30 hover:bg-secondary"
          >
            <Inbox size={24} className="mx-auto mb-2 text-[var(--neon-purple)]" />
            <p className="text-sm font-medium text-foreground">View Inbox</p>
          </a>
          <a
            href="/admin/users"
            className="rounded-lg border border-border p-4 text-center transition-colors hover:border-[var(--neon-cyan)]/30 hover:bg-secondary"
          >
            <Users size={24} className="mx-auto mb-2 text-[var(--neon-cyan)]" />
            <p className="text-sm font-medium text-foreground">Manage Users</p>
          </a>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  AppWindow,
  FileText,
  Inbox,
  Users,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { DbUser } from "@/lib/types";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/applications", label: "Applications", icon: AppWindow },
  { href: "/admin/documentation", label: "Documentation", icon: FileText },
  { href: "/admin/inbox", label: "Inbox", icon: Inbox },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar({ user }: { user: DbUser }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex h-full flex-col bg-sidebar border-r border-sidebar-border">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-4">
        <Image
          src="/images/logo.png"
          alt="Prausdit Logo"
          width={28}
          height={28}
          className="rounded-md"
        />
        <div>
          <p className="text-sm font-semibold text-sidebar-foreground">Prausdit</p>
          <p className="text-xs text-muted-foreground">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                isActive(item.href)
                  ? "bg-sidebar-accent text-sidebar-primary font-medium"
                  : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* User section */}
      <div className="flex items-center gap-3 border-t border-sidebar-border px-5 py-4">
        <UserButton afterSignOutUrl="/" />
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-medium text-sidebar-foreground">
            {user.name}
          </p>
          <p className="truncate text-xs text-muted-foreground capitalize">
            {user.role}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 rounded-lg bg-sidebar p-2 text-foreground md:hidden"
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 transform transition-transform md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden h-full w-64 shrink-0 md:block">
        {sidebarContent}
      </aside>
    </>
  );
}

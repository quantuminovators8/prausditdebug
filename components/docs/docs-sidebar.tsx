"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DocTreeNode } from "@/lib/types";

function DocNavItem({
  node,
  appSlug,
  pathname,
  depth = 0,
}: {
  node: DocTreeNode;
  appSlug: string;
  pathname: string;
  depth?: number;
}) {
  const href = `/${appSlug}/docs/${node.slug}`;
  const isActive = pathname === href;
  const hasChildren = node.children.length > 0;
  const [open, setOpen] = useState(
    isActive || node.children.some((c) => pathname === `/${appSlug}/docs/${c.slug}`)
  );

  return (
    <div>
      <div className="flex items-center">
        {hasChildren && (
          <button
            onClick={() => setOpen(!open)}
            className="mr-1 rounded p-0.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={open ? "Collapse" : "Expand"}
          >
            <ChevronRight
              size={14}
              className={cn("transition-transform duration-200", open && "rotate-90")}
            />
          </button>
        )}
        <Link
          href={href}
          className={cn(
            "flex-1 rounded-md px-3 py-1.5 text-sm transition-all duration-200",
            isActive
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary",
            !hasChildren && "ml-5"
          )}
          style={{ paddingLeft: `${depth * 12 + 12}px` }}
        >
          {node.title}
        </Link>
      </div>
      {hasChildren && open && (
        <div className="mt-0.5">
          {node.children.map((child) => (
            <DocNavItem
              key={child.id}
              node={child}
              appSlug={appSlug}
              pathname={pathname}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function DocsSidebar({
  appName,
  appSlug,
  docTree,
}: {
  appName: string;
  appSlug: string;
  docTree: DocTreeNode[];
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = (
    <div className="flex h-full flex-col bg-card">
      <div className="border-b border-border px-4 py-4">
        <Link
          href={`/${appSlug}`}
          className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
        >
          {appName}
        </Link>
        <p className="mt-0.5 text-xs text-muted-foreground">Documentation</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <div className="flex flex-col gap-0.5">
          {docTree.length === 0 ? (
            <p className="px-4 text-sm text-muted-foreground">
              No documentation yet.
            </p>
          ) : (
            docTree.map((node) => (
              <DocNavItem
                key={node.id}
                node={node}
                appSlug={appSlug}
                pathname={pathname}
              />
            ))
          )}
        </div>
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-primary p-3 text-primary-foreground shadow-lg md:hidden"
        aria-label="Toggle docs nav"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed top-24 left-0 z-40 h-[calc(100vh-6rem)] w-72 border-r border-border bg-card transition-transform duration-300 md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {content}
      </aside>

      {/* Desktop sidebar */}
      <aside className="sticky top-24 hidden h-[calc(100vh-6rem)] w-72 shrink-0 overflow-hidden border-r border-border md:block">
        {content}
      </aside>
    </>
  );
}

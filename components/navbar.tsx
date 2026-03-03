"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn, isLoaded } = useUser();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/protroit-os", label: "Protroit OS" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 z-50 w-[95%] max-w-6xl -translate-x-1/2">
      <div className="glass-strong rounded-2xl px-6 py-3 neon-glow-cyan">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Prausdit Logo"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="text-lg font-semibold tracking-wide text-foreground">
              Prausdit
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {isLoaded && isSignedIn ? (
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            ) : (
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[var(--neon-cyan)]/30 bg-transparent text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10 hover:text-[var(--neon-cyan)]"
                >
                  Sign In
                </Button>
              </SignInButton>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-2">
              {isLoaded && isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignInButton mode="modal">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-[var(--neon-cyan)]/30 bg-transparent text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10 hover:text-[var(--neon-cyan)]"
                  >
                    Sign In
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

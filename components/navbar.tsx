"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/protroit-os", label: "Protroit OS" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 z-50 w-[95%] max-w-5xl -translate-x-1/2">
      <div
        className={`rounded-full px-6 py-2.5 transition-all duration-300 ${
          scrolled
            ? "glass-strong shadow-lg"
            : "glass"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Left: Logo + Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/logo.png"
              alt="Prausdit Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-base font-bold tracking-tight text-foreground">
              Prausdit
            </span>
          </Link>

          {/* Center: Navigation Links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Theme Toggle + Auth */}
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
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
                  size="sm"
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                >
                  Sign In
                </Button>
              </SignInButton>
            )}
          </div>

          {/* Mobile: Sheet Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-foreground"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2.5">
                    <Image
                      src="/images/logo.png"
                      alt="Prausdit Logo"
                      width={28}
                      height={28}
                      className="rounded-md"
                    />
                    <span>Prausdit</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto border-t border-border px-4 pt-4">
                  {isLoaded && isSignedIn ? (
                    <div className="flex items-center gap-3">
                      <UserButton afterSignOutUrl="/" />
                      <span className="text-sm text-muted-foreground">Account</span>
                    </div>
                  ) : (
                    <SignInButton mode="modal">
                      <Button
                        className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                      >
                        Sign In
                      </Button>
                    </SignInButton>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      {/* Background grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,245,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,245,255,0.06)_0%,_transparent_70%)]" />

      <div className="relative z-10 flex max-w-5xl flex-col items-center text-center">
        {/* Banner */}
        <div className="mb-8 w-full max-w-3xl overflow-hidden rounded-2xl neon-border-cyan neon-glow-cyan">
          <Image
            src="/images/banner.png"
            alt="Prausdit - Engineering the AI-Native Future"
            width={1200}
            height={400}
            className="w-full object-cover"
            priority
          />
        </div>

        {/* Logo */}
        <Image
          src="/images/logo.png"
          alt="Prausdit Logo"
          width={80}
          height={80}
          className="mb-6 rounded-2xl"
          priority
        />

        <h1 className="mb-4 text-5xl font-bold tracking-tight text-foreground text-balance md:text-7xl">
          <span className="text-glow-cyan text-[var(--neon-cyan)]">Prausdit</span>
        </h1>

        <p className="mb-8 max-w-2xl text-xl leading-relaxed text-muted-foreground text-balance md:text-2xl">
          AI-Native Systems for the Next Computing Era
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-[var(--neon-cyan)] text-[var(--background)] hover:bg-[var(--neon-cyan)]/90 font-semibold"
          >
            <Link href="/protroit-os">
              Explore Protroit OS
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-[var(--neon-purple)]/40 text-[var(--neon-purple)] hover:bg-[var(--neon-purple)]/10 hover:text-[var(--neon-purple)]"
          >
            <Link href="/protroit-os/docs">
              <BookOpen className="mr-2" size={18} />
              Read Architecture
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            <Link href="/contact">
              <Users className="mr-2" size={18} />
              Join Community
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

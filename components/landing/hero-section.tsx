import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          aria-hidden="true"
        />
        {/* Overlay for light mode */}
        <div className="absolute inset-0 bg-background/80 dark:bg-background/60" />
        {/* Bottom gradient fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        {/* Tagline badge */}
        <div className="mb-8 inline-flex items-center rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          AI-Native Operating Systems
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground text-balance leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
          Engineering the{" "}
          <span className="text-primary text-glow-cyan">AI-Native</span>{" "}
          Future
        </h1>

        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground text-balance md:text-xl">
          Redefining operating systems with native intelligence. On-device AI
          agents that reason, predict, and act autonomously -- built from the
          silicon up.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
          >
            <Link href="/protroit-os">
              Explore Protroit OS
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-border font-medium px-8"
          >
            <Link href="/protroit-os/docs">
              <BookOpen className="mr-2 h-4 w-4" />
              Read Architecture
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="rounded-full font-medium px-8"
          >
            <Link href="/contact">
              <Users className="mr-2 h-4 w-4" />
              Join Community
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

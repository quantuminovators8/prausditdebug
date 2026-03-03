import Link from "next/link";
import { Code2, Users, Microscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const roles = [
  {
    icon: Code2,
    title: "Developers",
    description:
      "Build AI agents with AgentKit SDK. Contribute to open modules. Shape the developer experience.",
    cta: "Join as Developer",
    href: "/sign-up",
  },
  {
    icon: Users,
    title: "Contributors",
    description:
      "Help with documentation, testing, community support, and ecosystem growth.",
    cta: "Get Involved",
    href: "/contact",
  },
  {
    icon: Microscope,
    title: "Research Partners",
    description:
      "Collaborate on AI safety, on-device inference optimization, and context graph research.",
    cta: "Partner With Us",
    href: "/contact",
  },
];

export function CommunitySection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Community
          </p>
          <h2 className="mb-6 text-3xl font-bold text-foreground text-balance md:text-4xl">
            Build the Future With Us
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Prausdit is built by a growing community of engineers, researchers,
            and contributors who believe AI should be foundational, not bolted on.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {roles.map((role) => (
            <Card
              key={role.title}
              className="flex flex-col rounded-2xl border-border bg-card transition-all duration-300 hover:shadow-md hover:scale-[1.02] dark:hover:shadow-[0_0_20px_rgba(138,43,226,0.06)]"
            >
              <CardContent className="flex flex-1 flex-col p-8">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <role.icon size={28} className="text-accent" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-card-foreground">
                  {role.title}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {role.description}
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-border hover:border-accent/30 hover:bg-accent/5 font-medium"
                >
                  <Link href={role.href}>{role.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

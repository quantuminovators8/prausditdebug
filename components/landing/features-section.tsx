import { Bot, Cpu, Network, Shield, Puzzle, Code2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Bot,
    title: "System-Level AI Agents",
    description:
      "Autonomous agents embedded at the OS level that manage resources, predict failures, and optimize performance in real time.",
    accent: "primary" as const,
  },
  {
    icon: Cpu,
    title: "Hardware-Optimized Intelligence",
    description:
      "Direct integration with NPUs, TPUs, and GPU compute for inference workloads without middleware overhead.",
    accent: "accent" as const,
  },
  {
    icon: Network,
    title: "Context Graph Orchestration",
    description:
      "A live, dynamic graph connecting device state, user behavior, and application context for intelligent decision-making.",
    accent: "primary" as const,
  },
  {
    icon: Shield,
    title: "Privacy-First Architecture",
    description:
      "All inference happens on-device. No telemetry. No cloud dependency. Praus-Vault secures all sensitive AI assets.",
    accent: "accent" as const,
  },
  {
    icon: Puzzle,
    title: "Protroit-X Compatibility",
    description:
      "Backward-compatible runtime layer supporting existing Linux applications while enabling AI-enhanced execution.",
    accent: "primary" as const,
  },
  {
    icon: Code2,
    title: "AgentKit SDK",
    description:
      "Open SDK for developers to build, deploy, and manage AI agents within the Protroit OS ecosystem.",
    accent: "accent" as const,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Core Capabilities
          </p>
          <h2 className="mb-6 text-3xl font-bold text-foreground text-balance md:text-4xl">
            Built for the AI Era
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const isPrimary = feature.accent === "primary";
            return (
              <Card
                key={feature.title}
                className="rounded-2xl border-border bg-card transition-all duration-300 hover:shadow-md hover:scale-[1.02] dark:hover:shadow-[0_0_20px_rgba(0,245,255,0.06)]"
              >
                <CardContent className="p-6">
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${
                      isPrimary ? "bg-primary/10" : "bg-accent/10"
                    }`}
                  >
                    <feature.icon
                      size={24}
                      className={isPrimary ? "text-primary" : "text-accent"}
                    />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

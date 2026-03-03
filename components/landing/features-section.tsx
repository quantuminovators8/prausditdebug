import { Bot, Cpu, Network, Shield, Puzzle, Code2 } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "System-Level AI Agents",
    description:
      "Autonomous agents embedded at the OS level that manage resources, predict failures, and optimize performance in real time.",
    color: "cyan" as const,
  },
  {
    icon: Cpu,
    title: "Hardware-Optimized Intelligence",
    description:
      "Direct integration with NPUs, TPUs, and GPU compute for inference workloads without middleware overhead.",
    color: "purple" as const,
  },
  {
    icon: Network,
    title: "Context Graph Orchestration",
    description:
      "A live, dynamic graph connecting device state, user behavior, and application context for intelligent decision-making.",
    color: "cyan" as const,
  },
  {
    icon: Shield,
    title: "Privacy-First Architecture",
    description:
      "All inference happens on-device. No telemetry. No cloud dependency. Praus-Vault secures all sensitive AI assets.",
    color: "purple" as const,
  },
  {
    icon: Puzzle,
    title: "Protroit-X Compatibility",
    description:
      "Backward-compatible runtime layer supporting existing Linux applications while enabling AI-enhanced execution.",
    color: "cyan" as const,
  },
  {
    icon: Code2,
    title: "AgentKit SDK",
    description:
      "Open SDK for developers to build, deploy, and manage AI agents within the Protroit OS ecosystem.",
    color: "purple" as const,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--neon-cyan)]">
            Core Capabilities
          </p>
          <h2 className="mb-6 text-3xl font-bold text-foreground text-balance md:text-4xl">
            Built for the AI Era
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const glowClass =
              feature.color === "cyan"
                ? "hover:neon-glow-cyan"
                : "hover:neon-glow-purple";
            const iconBg =
              feature.color === "cyan"
                ? "bg-[var(--neon-cyan)]/10"
                : "bg-[var(--neon-purple)]/10";
            const iconColor =
              feature.color === "cyan"
                ? "text-[var(--neon-cyan)]"
                : "text-[var(--neon-purple)]";

            return (
              <div
                key={feature.title}
                className={`glass rounded-xl p-6 transition-all ${glowClass}`}
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${iconBg}`}
                >
                  <feature.icon size={24} className={iconColor} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { Brain, Network, Lock, Code2 } from "lucide-react";

const pillars = [
  {
    icon: Brain,
    title: "AI-Native Philosophy",
    description:
      "AI is not an afterthought. It is the foundation. Every layer of Prausdit systems is designed from the ground up to reason, predict, and adapt.",
  },
  {
    icon: Network,
    title: "System Inference Plane",
    description:
      "A dedicated inference layer between the kernel and application framework enabling real-time, on-device AI processing without cloud dependency.",
  },
  {
    icon: Code2,
    title: "Context Graph",
    description:
      "A dynamic knowledge graph that captures system state, user intent, and environmental context to enable predictive and intelligent resource orchestration.",
  },
  {
    icon: Lock,
    title: "Core Closed + Open SDK",
    description:
      "The kernel and AI core engine remain closed for security and integrity. The AgentKit SDK is fully open for developers to build AI-powered agents and applications.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--neon-cyan)]">
            About Prausdit
          </p>
          <h2 className="mb-6 text-3xl font-bold text-foreground text-balance md:text-4xl">
            Engineering the AI-Native Future
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Prausdit builds foundational AI-native operating systems and
            developer ecosystems. We believe intelligence should be woven into
            the fabric of computing, not layered on top.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="glass rounded-xl p-6 transition-all hover:neon-glow-cyan"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--neon-cyan)]/10">
                <pillar.icon size={24} className="text-[var(--neon-cyan)]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

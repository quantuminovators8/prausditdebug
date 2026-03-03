import { Lock, Code2, Scale } from "lucide-react";

const principles = [
  {
    icon: Lock,
    title: "Core Closed",
    description:
      "The kernel, AI Core Engine, and system-level agents remain proprietary to ensure security, stability, and integrity of the AI inference pipeline.",
  },
  {
    icon: Code2,
    title: "Open SDK",
    description:
      "AgentKit SDK is fully open-source. Developers can build, test, and ship AI agents with full transparency and community collaboration.",
  },
  {
    icon: Scale,
    title: "Responsible AI Development",
    description:
      "Every system-level AI capability undergoes rigorous safety evaluation. We publish our evaluation frameworks and safety benchmarks.",
  },
];

export function GovernanceSection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--neon-cyan)]">
            Governance
          </p>
          <h2 className="mb-6 text-3xl font-bold text-foreground text-balance md:text-4xl">
            Open Where It Matters. Secure Where It Counts.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {principles.map((p) => (
            <div
              key={p.title}
              className="glass rounded-xl p-8 text-center transition-all hover:neon-glow-cyan"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--neon-cyan)]/10">
                <p.icon size={28} className="text-[var(--neon-cyan)]" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

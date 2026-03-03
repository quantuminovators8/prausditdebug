import {
  Cpu,
  Brain,
  Eye,
  Shield,
  Layers,
  Gauge,
} from "lucide-react";

const capabilities = [
  {
    icon: Layers,
    title: "Linux-Based Foundation",
    description:
      "Built on a hardened Linux kernel with custom extensions for AI workload scheduling and NPU device management.",
  },
  {
    icon: Brain,
    title: "AI Core Engine",
    description:
      "A dedicated inference engine positioned between the kernel and application framework for system-wide AI coordination.",
  },
  {
    icon: Cpu,
    title: "NPU-First Inference",
    description:
      "Hardware-optimized inference pipelines that prioritize Neural Processing Units for maximum efficiency and minimal latency.",
  },
  {
    icon: Gauge,
    title: "Predictive Scheduler",
    description:
      "An AI-driven process scheduler that anticipates resource needs and pre-allocates compute before demand spikes.",
  },
  {
    icon: Eye,
    title: "Multimodal Interface",
    description:
      "Eye-gesture and context-aware multimodal input system enabling natural, intuitive human-computer interaction.",
  },
  {
    icon: Shield,
    title: "Praus-Vault",
    description:
      "A hardware-backed secure enclave for AI model weights, user credentials, and sensitive inference data.",
  },
];

export function ProtoitSection() {
  return (
    <section className="py-24 px-6 bg-[var(--secondary)]/30">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--neon-purple)]">
            Flagship Product
          </p>
          <h2 className="mb-6 text-3xl font-bold text-foreground text-balance md:text-4xl">
            Protroit OS
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            A Linux-based, AI-native operating system with a dedicated AI Core
            Engine between the kernel and application framework. On-device AI
            agents that reason, predict, and act autonomously.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="glass rounded-xl p-6 transition-all hover:neon-glow-purple"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--neon-purple)]/10">
                <cap.icon size={24} className="text-[var(--neon-purple)]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {cap.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

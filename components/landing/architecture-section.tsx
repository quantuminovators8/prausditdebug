import { ArrowDown } from "lucide-react";

const layers = [
  {
    label: "Applications",
    sub: "User-facing AI-powered apps",
    color: "bg-[var(--neon-cyan)]/10 border-[var(--neon-cyan)]/20 text-[var(--neon-cyan)]",
  },
  {
    label: "AgentKit SDK",
    sub: "Open developer toolkit",
    color: "bg-[var(--neon-cyan)]/10 border-[var(--neon-cyan)]/30 text-[var(--neon-cyan)]",
  },
  {
    label: "Application Framework",
    sub: "Runtime + UI + Services",
    color: "bg-[var(--neon-purple)]/10 border-[var(--neon-purple)]/20 text-[var(--neon-purple)]",
  },
  {
    label: "AI Core Engine",
    sub: "System Inference Plane + Context Graph",
    color: "bg-[var(--neon-purple)]/10 border-[var(--neon-purple)]/30 text-[var(--neon-purple)]",
  },
  {
    label: "Kernel",
    sub: "Hardened Linux + NPU Drivers",
    color: "bg-foreground/5 border-foreground/10 text-foreground",
  },
  {
    label: "Hardware",
    sub: "CPU + GPU + NPU + Secure Enclave",
    color: "bg-foreground/5 border-foreground/15 text-foreground",
  },
];

export function ArchitectureSection() {
  return (
    <section className="py-24 px-6 bg-[var(--secondary)]/30">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--neon-purple)]">
            System Architecture
          </p>
          <h2 className="mb-6 text-3xl font-bold text-foreground text-balance md:text-4xl">
            Full-Stack AI Architecture
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Every layer is purpose-built. From silicon to software, Protroit OS
            is designed as a coherent AI system.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          {layers.map((layer, i) => (
            <div key={layer.label} className="flex w-full flex-col items-center">
              <div
                className={`w-full rounded-xl border p-5 text-center transition-all hover:scale-[1.02] ${layer.color}`}
              >
                <p className="text-base font-semibold">{layer.label}</p>
                <p className="mt-1 text-xs opacity-70">{layer.sub}</p>
              </div>
              {i < layers.length - 1 && (
                <ArrowDown
                  size={20}
                  className="my-1 text-muted-foreground/40"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

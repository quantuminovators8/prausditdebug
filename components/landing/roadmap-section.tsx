const phases = [
  {
    phase: "Phase I",
    title: "AI Prototypes",
    status: "Completed",
    description:
      "Research-stage AI agent prototypes, inference benchmarking, and hardware compatibility studies.",
    active: false,
  },
  {
    phase: "Phase II",
    title: "AI Core Engine",
    status: "In Progress",
    description:
      "Building the System Inference Plane, Context Graph, and foundational AI services layer.",
    active: true,
  },
  {
    phase: "Phase III",
    title: "Protroit OS Foundation",
    status: "Upcoming",
    description:
      "Kernel integration, NPU driver stack, Praus-Vault implementation, and system-level agent deployment.",
    active: false,
  },
  {
    phase: "Phase IV",
    title: "Developer Ecosystem",
    status: "Planned",
    description:
      "AgentKit SDK public release, developer portal, partner program, and community-driven agent marketplace.",
    active: false,
  },
];

export function RoadmapSection() {
  return (
    <section className="py-24 px-6 bg-[var(--secondary)]/30">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--neon-purple)]">
            Roadmap
          </p>
          <h2 className="mb-6 text-3xl font-bold text-foreground text-balance md:text-4xl">
            Building in Public
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 left-6 h-full w-px bg-border md:left-1/2" />

          <div className="flex flex-col gap-8">
            {phases.map((p, i) => (
              <div
                key={p.phase}
                className={`relative flex flex-col md:flex-row ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-start gap-6`}
              >
                {/* Dot */}
                <div className="absolute left-6 z-10 md:left-1/2 -translate-x-1/2">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      p.active
                        ? "bg-[var(--neon-cyan)] shadow-[0_0_12px_rgba(0,245,255,0.6)]"
                        : "bg-border"
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="ml-14 w-full md:ml-0 md:w-[calc(50%-2rem)]">
                  <div
                    className={`glass rounded-xl p-6 ${
                      p.active ? "neon-border-cyan neon-glow-cyan" : ""
                    }`}
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-[var(--neon-cyan)]">
                        {p.phase}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          p.active
                            ? "bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)]"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Dr. Elena Vasquez",
    role: "AI Research Lead, MIT CSAIL",
    quote:
      "Prausdit's approach to on-device inference is exactly what the industry needs. Their System Inference Plane is a genuinely novel architecture that could redefine how we think about AI at the OS level.",
  },
  {
    name: "Marcus Chen",
    role: "Senior Systems Engineer, ARM",
    quote:
      "The NPU-first design philosophy is impressive. Most teams bolt AI onto existing systems. Prausdit is building from the silicon up. That's the right way to do this.",
  },
  {
    name: "Aisha Okafor",
    role: "Open Source Lead, CNCF",
    quote:
      "The Core Closed + Open SDK model strikes a perfect balance. Developers get full access to build agents while the core maintains security guarantees. I'm excited about AgentKit.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            What People Say
          </p>
          <h2 className="mb-6 text-3xl font-bold text-foreground text-balance md:text-4xl">
            Voices from the Community
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              className="rounded-2xl border-border bg-card transition-all duration-300 hover:shadow-md hover:scale-[1.02] dark:hover:shadow-[0_0_20px_rgba(0,245,255,0.06)]"
            >
              <CardContent className="p-8">
                <Quote size={24} className="mb-4 text-primary/40" />
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground italic">
                  {`"${t.quote}"`}
                </p>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

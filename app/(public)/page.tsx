import { HeroSection } from "@/components/landing/hero-section";
import { AboutSection } from "@/components/landing/about-section";
import { ProtoitSection } from "@/components/landing/protroit-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { ArchitectureSection } from "@/components/landing/architecture-section";
import { GovernanceSection } from "@/components/landing/governance-section";
import { RoadmapSection } from "@/components/landing/roadmap-section";
import { CommunitySection } from "@/components/landing/community-section";
import { VisionSection } from "@/components/landing/vision-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProtoitSection />
      <FeaturesSection />
      <ArchitectureSection />
      <GovernanceSection />
      <RoadmapSection />
      <CommunitySection />
      <VisionSection />
      <TestimonialsSection />
    </>
  );
}

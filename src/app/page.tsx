import { HeroSection } from "@/components/sections/hero";
import { TrustSection } from "@/components/sections/trust";
import { AboutSection } from "@/components/sections/about";
import { EcosystemSection } from "@/components/sections/ecosystem";
import { ProjectsSection } from "@/components/sections/projects";
import { TechnologySection } from "@/components/sections/technology";
import { RecognitionSection } from "@/components/sections/recognition";
import { TimelineSection } from "@/components/sections/timeline";
import { LeadershipSection } from "@/components/sections/leadership";
import { ContactCtaSection } from "@/components/sections/contact-cta";

/**
 * The narrative arc, in order:
 *
 *   Hero → Trust → About → Ecosystem → Projects → Technology
 *        → Clients & Recognition → Trajectory → Leadership → Contact
 *
 * Tone alternates dark / light / dark so the page reads as chapters rather than
 * a stack of independent slabs. Only ProjectsSection ships client JS.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <AboutSection />
      <EcosystemSection />
      <ProjectsSection />
      <TechnologySection />
      <RecognitionSection />
      <TimelineSection />
      <LeadershipSection />
      <ContactCtaSection />
    </>
  );
}

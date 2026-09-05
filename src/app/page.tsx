import { HeroSection } from "@/components/sections/hero";
import { TrustSection } from "@/components/sections/trust";
import { AboutSection } from "@/components/sections/about";
import { EcosystemSection } from "@/components/sections/ecosystem";
import { FieldGallery } from "@/components/sections/field-gallery";
import { FieldFilmSection } from "@/components/sections/field-film";
import { ProjectsSection } from "@/components/sections/projects";
import { TechnologySection } from "@/components/sections/technology";
import { RecognitionSection } from "@/components/sections/recognition";
import { TimelineSection } from "@/components/sections/timeline";
import { OfficeSection } from "@/components/sections/office";
import { MessagesSection } from "@/components/sections/messages";
import { CsrSection } from "@/components/sections/csr";
import { ContactCtaSection } from "@/components/sections/contact-cta";
import { pickPhotos } from "@/content/field";

/**
 * The narrative arc, in order:
 *
 *   Hero → Trust → About → Ecosystem → Site record → Projects → Film
 *        → Technology → Clients & Recognition → Trajectory → Messages
 *        → CSR → Contact
 *
 * Two evidence bands were added either side of the project record, which is
 * where the page previously went longest without showing the work: a photo
 * mosaic of jobs with their captions set inside the frames, and a band of site
 * footage. Claims sit better next to a photograph of the thing being claimed.
 *
 * Tone alternates light / mint / dark so the page reads as chapters rather than
 * a stack of independent slabs.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <AboutSection />
      <EcosystemSection />

      <FieldGallery
        eyebrow="The site record"
        title="This is what the work looks like."
        /* Every frame in this mosaic is a Morlatis job again — the two stock
           stand-ins were replaced by the heavy-lift photographs — so the
           original claim is true and has been restored. Check this line before
           swapping any tile here for licensed stock. */
        lede="Not renders and not stock photography — jobs in progress across Bihar, photographed by the crews delivering them."
        photos={pickPhotos(
          "substation-crew",
          "crane-pole",
          "transformer-hoist",
          "girder-lift",
          "cable-pull",
          "girder-set"
        )}
        tone="warm"
      />

      <ProjectsSection />

      <FieldFilmSection
        src="/video/field-01.mp4"
        poster="/img/field/pole-erection.jpg"
        label="Site footage of a Morlatis field crew at work"
        eyebrow="On site"
        title="Delivery is a field discipline."
        body="Drawings and protocols matter, but the job is won on the ground — a crew, an outage window and a network that has to be carrying load again by the end of it."
        stats={[
          { value: "1 hr", label: "Emergency response time" },
          { value: "5,000+", label: "Electrification works delivered" },
          { value: "4 states", label: "Bihar · Jharkhand · UP · Delhi" },
        ]}
      />

      <TechnologySection />
      <RecognitionSection />
      <TimelineSection />
      <OfficeSection />
      <MessagesSection />
      <CsrSection />
      <ContactCtaSection />
    </>
  );
}

import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `How the ${company.name} website uses cookies and similar technologies.`,
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      updated="July 2026"
      sections={[
        {
          heading: "What this site uses",
          body: [
            "This website is built as a set of static pages and does not currently set advertising, profiling or cross-site tracking cookies.",
            "Your browser may store standard technical data required to serve the site — for example cached fonts and stylesheets. This is ordinary browser behaviour and is not used to identify you.",
          ],
        },
        {
          heading: "If analytics are added",
          body: [
            "Should the Group introduce website analytics in future, this policy will be updated to name the provider, the data collected, the retention period, and the mechanism for opting out — and a consent notice will be presented before any non-essential cookie is set.",
          ],
        },
        {
          heading: "Third-party content",
          body: [
            "Links to third-party platforms, including our social media profiles, are subject to those platforms' own cookie policies once you leave this site.",
          ],
        },
        {
          heading: "Managing cookies",
          body: [
            "You can clear or block cookies through your browser settings at any time. Because this site does not rely on cookies for functionality, blocking them will not affect how it works.",
          ],
        },
        {
          heading: "Contact",
          body: [
            `Questions about this policy can be directed to ${company.email}.`,
          ],
        },
      ]}
    />
  );
}

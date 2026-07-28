import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing use of the ${company.name} website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="July 2026"
      sections={[
        {
          heading: "Acceptance",
          body: [
            `By accessing this website you agree to these terms. If you do not accept them, please do not use the site.`,
          ],
        },
        {
          heading: "Nature of the information",
          body: [
            "Content on this site describes the capability and scope classes of the Group. It is provided for general information and does not constitute an offer, a quotation, a warranty of capability for a specific project, or professional engineering advice.",
            "Project descriptions describe categories of work executed. Client-specific records, contract values and completion certificates are provided during formal pre-qualification, not through this website.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            `All content, marks, drawings and design on this site are the property of ${company.name} unless otherwise stated. You may view and print pages for your own reference. Reproduction, redistribution or commercial use requires written permission.`,
          ],
        },
        {
          heading: "Accuracy",
          body: [
            "We take care to keep information current, but make no warranty that content is complete, accurate or up to date at any given moment. Technical specifications, standards references and commercial figures should be confirmed with us in writing before being relied upon.",
          ],
        },
        {
          heading: "External links",
          body: [
            "This site may link to third-party websites. We do not control and are not responsible for their content, availability or practices.",
          ],
        },
        {
          heading: "Limitation of liability",
          body: [
            "To the extent permitted by law, the Group is not liable for any indirect or consequential loss arising from use of, or inability to use, this website.",
          ],
        },
        {
          heading: "Governing law",
          body: [
            "These terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of the courts at Patna, Bihar.",
          ],
        },
      ]}
    />
  );
}

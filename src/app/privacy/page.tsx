import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${company.name} collects, uses and protects personal information submitted through this website.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="July 2026"
      sections={[
        {
          heading: "Information we collect",
          body: [
            `${company.name} collects only the information you choose to provide through the enquiry and careers forms on this website: your name, email address, telephone number, the nature of your enquiry and any details you include in your message.`,
            "We do not operate advertising trackers, and we do not sell, rent or trade personal information to third parties.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "Enquiry information is used solely to respond to your request — to prepare a technical response, quotation or pre-qualification submission, or to consider a job application.",
            "Where a message concerns a tender or contract, correspondence may be retained as part of our commercial records for the period required under applicable law and contract terms.",
          ],
        },
        {
          heading: "Storage and retention",
          body: [
            "Enquiry data is retained for as long as necessary to serve the purpose it was collected for, and thereafter only where a statutory, tax or contractual retention obligation applies.",
            "Job applications are retained for twelve months from the date of receipt unless you ask us to remove them sooner.",
          ],
        },
        {
          heading: "Sharing",
          body: [
            "Personal information is shared only with employees and contractors of the Group who need it to respond to your enquiry, and with service providers who process it on our instruction under confidentiality obligations.",
            "We may disclose information where required by law, regulation, or a lawful request from a public authority.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You may request access to, correction of, or deletion of the personal information we hold about you, and you may withdraw consent to further contact at any time.",
            `To exercise any of these rights, write to ${company.email}. We will respond within thirty days.`,
          ],
        },
        {
          heading: "Security",
          body: [
            "We apply reasonable technical and organisational measures to protect information against unauthorised access, alteration, disclosure or destruction. No method of transmission over the internet is entirely secure, and we cannot guarantee absolute security.",
          ],
        },
        {
          heading: "Changes",
          body: [
            "This policy may be updated from time to time. Material changes will be reflected in the 'last updated' date above.",
          ],
        },
      ]}
    />
  );
}

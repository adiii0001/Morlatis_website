import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Icon } from "@/components/ui/icon";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Engineering, project management and field roles at Morlatis Group across electrical EPC, SCADA automation, protection and railway electrical works.",
  alternates: { canonical: "/careers" },
};

const openings = [
  {
    title: "Project Manager — Electrical EPC",
    discipline: "Projects",
    location: "Patna, Bihar",
    type: "Full-time",
    body: "Own end-to-end execution of substation and line works: planning, subcontractor coordination, outage scheduling and commissioning handover.",
  },
  {
    title: "SCADA / RTU Engineer",
    discipline: "Automation",
    location: "Patna, Bihar",
    type: "Full-time",
    body: "Configure and commission RTU/FRTU devices and SCADA integrations. Point list engineering, protocol mapping and site commissioning.",
  },
  {
    title: "Protection Engineer — Relay Retrofitting",
    discipline: "Engineering",
    location: "Multiple sites",
    type: "Full-time",
    body: "Coordination studies, relay setting calculations and supervision of numerical protection retrofits under outage conditions.",
  },
  {
    title: "Railway Electrical Engineer",
    discipline: "Railway",
    location: "Patna / Gorakhpur",
    type: "Full-time",
    body: "Execute station electrification, signalling power supply and IR material supply scope under railway safety governance.",
  },
  {
    title: "Business Development Manager",
    discipline: "Commercial",
    location: "Patna, Bihar",
    type: "Full-time",
    body: "Tender tracking, pre-qualification, client relationships and order pipeline across utilities and EPC contractors in Eastern India.",
  },
  {
    title: "Site Supervisor — Electrical",
    discipline: "Field",
    location: "Bihar / Jharkhand",
    type: "Full-time",
    body: "Supervise installation and termination work on site, enforce safety protocol and maintain daily progress and test records.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Engineering roles where the work gets energised."
        lede="If you want your name on commissioning records rather than slide decks, these are the openings."
        align="wide"
      />

      <section className="section bg-white">
        <div className="shell">
          <div className="flex items-baseline gap-4">
            <h2 className="display-3">Open positions</h2>
            <span className="font-mono text-[0.75rem] text-ink-500">
              {String(openings.length).padStart(2, "0")}
            </span>
            <span className="hidden h-px flex-1 bg-line sm:block" />
          </div>

          <ul className="mt-8 border-t border-line-strong">
            {openings.map((job) => (
              <li
                key={job.title}
                className="grid gap-x-8 gap-y-4 border-b border-line py-8 lg:grid-cols-12"
                data-reveal
              >
                <div className="lg:col-span-5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-signal-700">
                      {job.discipline}
                    </span>
                    <span className="h-px w-4 bg-line-strong" />
                    <span className="text-[0.75rem] text-ink-500">{job.location}</span>
                    <span className="text-[0.75rem] text-ink-500">· {job.type}</span>
                  </div>
                  <h3 className="title mt-3 text-ink-950">{job.title}</h3>
                </div>

                <p className="text-[0.9375rem] leading-relaxed text-ink-600 lg:col-span-5">
                  {job.body}
                </p>

                <div className="lg:col-span-2 lg:justify-self-end">
                  <a
                    href={`mailto:${company.careersEmail}?subject=${encodeURIComponent(
                      `Application — ${job.title}`
                    )}`}
                    className="btn btn-line h-11 px-5"
                  >
                    Apply
                    <Icon name="arrow-up-right" size={14} />
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-14 border border-line bg-paper-cool p-8" data-reveal>
            <h2 className="title text-ink-950">Nothing matching your discipline?</h2>
            <p className="mt-3 max-w-[42rem] text-[0.9375rem] leading-relaxed text-ink-600">
              Send a CV with the type of work you want to be doing. Field engineers, protection
              specialists and commissioning staff are hired continuously.
            </p>
            <a href={`mailto:${company.careersEmail}`} className="btn btn-ink mt-6">
              {company.careersEmail}
              <Icon name="arrow-right" size={15} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

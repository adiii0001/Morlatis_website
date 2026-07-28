import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: "Morlatis Industries",
  description:
    "The manufacturing and fabrication arm of Morlatis Group — LT panels, PCC, MCC, APFC and VFD panels, control systems and electrical enclosures built to IS and IEC standards.",
  alternates: { canonical: "/about/morlatis-industries" },
};

const lines = [
  {
    title: "Panel Manufacturing",
    body: "LT panels, PCC, MCC, APFC, VFD and synchronising panels, plus custom control panels built to project single-line diagrams.",
  },
  {
    title: "Control Systems",
    body: "PLC-based control and automation panels with HMI, developed for process plants, pumping stations and water treatment infrastructure.",
  },
  {
    title: "Fabrication",
    body: "Sheet metal fabrication, cutting, bending, welding, powder coating and assembly for enclosures and industrial equipment.",
  },
  {
    title: "Quality Assurance",
    body: "Routine testing to IS and IEC — insulation resistance, high voltage withstand and functional verification, with records issued before dispatch.",
  },
];

export default function MorlatisIndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Morlatis Industries"
        title="The manufacturing arm behind the EPC scope."
        lede="Panels, control systems and enclosures built in-house — so the automation and EPC verticals control their own lead times and quality records."
        breadcrumb={{ label: "About", href: "/about" }}
        align="wide"
      />

      <section className="section bg-white">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="display-3">Production lines</h2>
              <Icon
                name="crate"
                size={120}
                strokeWidth={0.7}
                className="mt-10 hidden text-ink-200 lg:block"
              />
            </div>

            <ul className="lg:col-span-7 lg:col-start-6">
              {lines.map((l, i) => (
                <li
                  key={l.title}
                  className="grid gap-2 border-t border-line py-7 last:border-b sm:grid-cols-[3rem_1fr] sm:gap-6"
                  data-reveal
                >
                  <span className="font-mono text-[0.75rem] tracking-widest text-ink-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="title text-ink-950">{l.title}</h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">{l.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 border border-line bg-paper-cool p-8" data-reveal>
            <p className="text-[0.9375rem] leading-relaxed text-ink-600">
              {/* Facility capacity figures deliberately omitted until verified —
                  the previous page published "10,000+ sq ft" and "50+ panels/year"
                  without a source. */}
              Facility specifications, capacity figures and test certificates are provided as part of
              vendor registration and pre-qualification.
            </p>
            <Link href="/contact" className="btn btn-ink mt-6">
              Request capability documents
              <Icon name="arrow-right" size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { fillLastRow } from "@/lib/grid";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Vision · Mission · Values",
  description:
    "The principles that govern how Morlatis Group prices, executes and hands over electrical infrastructure work.",
  alternates: { canonical: "/about/vision-mission" },
};

const pillars = [
  {
    key: "Vision",
    statement:
      "To be the engineering group India's utilities and railways call first when the work has to be right the first time.",
    body: "Not the largest. The one whose commissioning record makes the decision easy.",
  },
  {
    key: "Mission",
    statement:
      "To deliver electrical infrastructure that is engineered to the standard, executed to the outage window, and documented well enough to maintain a decade later.",
    body: "Every part of that sentence is a commitment someone on site has to keep.",
  },
];

const values = [
  {
    name: "Integrity",
    body: "What we quote is what we build. Variations are raised before work starts, not invoiced after.",
  },
  {
    name: "Safety",
    body: "Live-network discipline is not negotiable and is not traded against schedule.",
  },
  {
    name: "Precision",
    body: "Settings, terminations and test records are checked twice because the network does not forgive once.",
  },
  {
    name: "Ownership",
    body: "The team that commissions an asset is the team you reach when it needs attention.",
  },
  {
    name: "Interoperability",
    body: "We build into estates we did not design, using standards rather than proprietary shortcuts.",
  },
  {
    name: "Contribution",
    body: "A fixed share of Group profit returns to the communities the work is done in.",
  },
];

export default function VisionMissionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Vision · Mission · Values"
        title="What governs the decisions."
        breadcrumb={{ label: "About", href: "/about" }}
        align="wide"
      />

      <section className="section bg-white">
        <div className="shell">
          {pillars.map((p) => (
            <div
              key={p.key}
              className="grid gap-x-8 gap-y-5 border-t border-line-strong py-12 lg:grid-cols-12"
              data-reveal
            >
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-500 lg:col-span-3">
                {p.key}
              </h2>
              <div className="lg:col-span-9">
                <p className="display-3 !leading-[1.14]">{p.statement}</p>
                <p className="lede mt-5">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-tight border-t border-line bg-paper-warm">
        <div className="shell">
          <h2 className="display-3">Values, stated as behaviour</h2>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <li
                key={v.name}
                className={`bg-white px-7 py-8 ${fillLastRow(values.length, i, { sm: 2, lg: 3 })}`}
                data-reveal
              >
                <h3 className="title text-ink-950">{v.name}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

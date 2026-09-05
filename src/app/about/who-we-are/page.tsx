import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Icon } from "@/components/ui/icon";
import { credentials, statesOfOperation, company } from "@/content/company";
import { verticals } from "@/content/verticals";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Morlatis Group is a multi-vertical electrical engineering and automation group headquartered in Patna, Bihar, operating across four states.",
  alternates: { canonical: "/about/who-we-are" },
};

export default function WhoWeArePage() {
  return (
    <>
      <PageHeader
        eyebrow="Who we are"
        title="An engineering group built around live-network work."
        breadcrumb={{ label: "About", href: "/about" }}
        align="wide"
      />

      <section className="section bg-white">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="space-y-6">
                <p className="lede">
                  Morlatis Group of Companies is a multi-vertical electrical engineering and
                  infrastructure group headquartered in {company.headquarters}, with operations
                  across {statesOfOperation.join(", ")}.
                </p>
                <p className="text-ink-600">
                  Founded in {company.founded}, the Group serves state distribution utilities,
                  Indian Railways, Power Grid Corporation and national EPC contractors. The work
                  spans the electrical infrastructure value chain — 11 and 33 kV line works,
                  substation erection and automation, protection retrofits, railway electrification,
                  and the material supply that feeds all of it.
                </p>
                <p className="text-ink-600">
                  What ties the verticals together is the operating environment. Most of this work
                  happens on energised networks, inside outage windows, against acceptance criteria
                  written by the client. That constraint shapes how the Group plans, staffs and
                  documents every job.
                </p>
              </div>

              <h2 className="display-3 mt-16">Registrations &amp; empanelment</h2>
              <ul className="mt-8">
                {credentials.map((c) => (
                  <li
                    key={c.title}
                    className="flex items-start gap-4 border-t border-line py-5 last:border-b"
                    data-reveal
                  >
                    <Icon name="check" size={16} className="mt-1 shrink-0 text-signal-600" />
                    <div>
                      <p className="text-[0.9375rem] font-semibold text-ink-900">{c.title}</p>
                      <p className="mt-0.5 text-[0.875rem] text-ink-500">{c.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="border border-line p-7">
                <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-500">
                  At a glance
                </h2>
                <dl className="mt-6 space-y-5">
                  {[
                    { k: "Founded", v: String(company.founded) },
                    { k: "Headquarters", v: company.headquarters },
                    { k: "Operating states", v: String(statesOfOperation.length) },
                    { k: "Business verticals", v: String(verticals.length) },
                    { k: "Electrification works", v: "5,000+" },
                  ].map((row) => (
                    <div key={row.k} className="flex items-baseline justify-between gap-4">
                      <dt className="text-[0.8125rem] text-ink-500">{row.k}</dt>
                      <dd className="font-display text-[0.9375rem] font-semibold text-ink-950">
                        {row.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-6 border border-line p-7">
                <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-500">
                  Verticals
                </h2>
                <ul className="mt-5 space-y-2.5">
                  {verticals.map((v) => (
                    <li key={v.slug}>
                      <Link
                        href={`/business-verticals/${v.slug}`}
                        className="block text-[0.875rem] text-ink-600 transition-colors hover:text-signal-700"
                      >
                        {v.shortTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

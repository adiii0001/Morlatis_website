import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Icon } from "@/components/ui/icon";
import { credentials, company } from "@/content/company";

export const metadata: Metadata = {
  title: "Awards & Recognition",
  description:
    "Registrations, empanelment and recognition held by Morlatis Group — government electrical contractor, Indian Railways vendor, MSTC authorised and PHED Class-2.",
  alternates: { canonical: "/awards" },
};

/*
 * REMOVED CONTENT
 * This page previously listed ten specific awards attributed to ten named
 * third-party bodies ("Infrastructure Excellence Awards", "Smart Grid India
 * Summit", "MSME Development Council" and others), none of which could be
 * substantiated. Publishing unverifiable third-party honours to an audience of
 * PSU officials and investors is a liability, so they have been removed.
 *
 * What remains is what can be evidenced: the registrations and empanelment the
 * Group actually holds. Add real awards here — with issuing body and year — as
 * citations become available.
 */

export default function AwardsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Recognition"
        title="Credentials that can be verified."
        lede="Registrations and empanelment held by the Group, each checkable against the issuing authority."
        align="wide"
      />

      <section className="section bg-white">
        <div className="shell">
          <ul className="border-t border-line-strong">
            {credentials.map((c) => (
              <li
                key={c.title}
                className="grid items-baseline gap-x-8 gap-y-2 border-b border-line py-8 lg:grid-cols-12"
                data-reveal
              >
                <h2 className="display-3 !text-[clamp(1.25rem,2vw,1.625rem)] text-ink-950 lg:col-span-6">
                  {c.title}
                </h2>
                <p className="text-[0.9375rem] leading-relaxed text-ink-600 lg:col-span-6">
                  {c.detail}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid gap-8 lg:grid-cols-12" data-reveal>
            <div className="lg:col-span-7">
              <h2 className="display-3">Industry awards</h2>
              <p className="lede mt-5">
                Award citations are published here only where the issuing body, category and year can
                be evidenced. Certificates held by the Group are made available during tender
                pre-qualification and partner due diligence.
              </p>
              <Link href="/contact" className="btn btn-ink mt-8">
                Request certification pack
                <Icon name="arrow-right" size={15} />
              </Link>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="border border-line bg-paper-cool p-7">
                <Icon name="shield" size={26} className="text-signal-600" />
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-600">
                  For compliance queries, vendor registration or document verification, write to{" "}
                  <a
                    href={`mailto:${company.email}`}
                    className="font-semibold text-signal-700 underline underline-offset-4"
                  >
                    {company.email}
                  </a>
                  .
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

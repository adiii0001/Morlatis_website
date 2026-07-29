import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Icon } from "@/components/ui/icon";
import { leadership, leadershipDisciplines, company } from "@/content/company";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Leadership and governance at Morlatis Group — accountability by discipline across executive, projects, automation, railway, supply chain and finance.",
  alternates: { canonical: "/team" },
};

/*
 * The previous page listed eight "team members" whose names were the strings
 * "Founder & CEO", "COO", "CTO", "CFO" beside identical placeholder avatars.
 * Those have been removed. Populate `leadership` in content/company.ts with
 * real people and this page switches to profile cards automatically.
 */

export default function TeamPage() {
  const hasProfiles = leadership.length > 0;

  return (
    <>
      <PageHeader
        eyebrow="Leadership"
        title="Accountability, by discipline."
        lede="Every vertical reports to a named owner. Profiles, credentials and organisation charts are shared with clients and partners on request."
        align="wide"
      />

      <section className="section bg-white">
        <div className="shell">
          {hasProfiles ? (
            <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {leadership.map((person) => (
                <li
                  key={person.name}
                  data-reveal
                >
                  <div className="aspect-[4/5] w-full bg-ink-100" />
                  <h2 className="title mt-5 text-ink-950">{person.name}</h2>
                  <p className="mt-1 text-[0.875rem] font-semibold text-signal-700">{person.role}</p>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-600">{person.bio}</p>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="border-t border-line-strong">
              {leadershipDisciplines.map((d) => (
                <li
                  key={d.area}
                  className="grid items-baseline gap-x-10 gap-y-2 border-b border-line py-8 lg:grid-cols-12"
                  data-reveal
                >
                  <h2 className="display-3 !text-[clamp(1.25rem,2vw,1.625rem)] text-ink-950 lg:col-span-5">
                    {d.area}
                  </h2>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-600 lg:col-span-7">
                    {d.detail}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-14 border border-line bg-paper-cool p-8" data-reveal>
            <h2 className="title text-ink-950">Requesting leadership detail</h2>
            <p className="mt-3 max-w-[42rem] text-[0.9375rem] leading-relaxed text-ink-600">
              Named profiles, qualifications and signing authority are provided as part of tender
              documentation and partner due diligence. Write to{" "}
              <a
                href={`mailto:${company.email}`}
                className="font-semibold text-signal-700 underline underline-offset-4"
              >
                {company.email}
              </a>
              .
            </p>
            <Link href="/contact" className="btn btn-ink mt-6">
              Contact the Group
              <Icon name="arrow-right" size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

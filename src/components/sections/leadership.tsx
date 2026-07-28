import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { leadership, leadershipDisciplines } from "@/content/company";

/**
 * Leadership.
 *
 * The previous team section listed eight "people" whose names were the strings
 * "Founder & CEO", "COO", "CTO", "CFO" beside identical grey avatars. That
 * reads as a company with nothing to show. This renders the accountable
 * disciplines truthfully, and switches to real profiles the moment the
 * `leadership` array in content/company.ts is populated.
 */
export function LeadershipSection() {
  const hasProfiles = leadership.length > 0;

  return (
    <section className="section bg-paper-cool">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[36rem]">
            <p className="eyebrow" data-reveal>
              Leadership
            </p>
            <h2 className="display-2 mt-6" data-reveal>
              Accountability, by discipline.
            </h2>
          </div>
          <p className="lede max-w-[26rem]" data-reveal>
            Every vertical reports to a named owner. Profiles and credentials are shared with
            clients and partners on request.
          </p>
        </div>

        {hasProfiles ? (
          <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person) => (
              <li
                key={person.name}
                data-reveal
              >
                <div className="aspect-[4/5] w-full bg-ink-100" />
                <h3 className="title mt-5 text-ink-950">{person.name}</h3>
                <p className="mt-1 text-[0.875rem] font-semibold text-signal-700">{person.role}</p>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-600">{person.bio}</p>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {leadershipDisciplines.map((d, i) => (
              <li
                key={d.area}
                className="bg-white px-7 py-8 transition-colors duration-300 hover:bg-paper-warm"
                data-reveal
              >
                <p className="font-mono text-[0.6875rem] tracking-widest text-ink-500">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="title mt-4 text-ink-950">{d.area}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">{d.detail}</p>
              </li>
            ))}
          </ul>
        )}

        <Link href="/team" className="link-rule mt-9" data-reveal>
          Leadership &amp; governance
          <Icon name="arrow-right" size={15} />
        </Link>
      </div>
    </section>
  );
}

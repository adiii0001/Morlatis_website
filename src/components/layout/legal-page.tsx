import { PageHeader } from "@/components/layout/page-header";
import { company } from "@/content/company";

/**
 * Shared shell for the three legal pages.
 *
 * These were linked six times from the footer and all three returned 404.
 * The content below is a workable baseline — it should be reviewed by counsel
 * before launch, and the review note is rendered on the page rather than hidden
 * in a comment.
 */
export function LegalPage({
  eyebrow,
  title,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} align="wide" />

      <section className="section bg-white">
        <div className="shell">
          <div className="max-w-[46rem]">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink-500">
              Last updated · {updated}
            </p>

            {sections.map((s, i) => (
              <div key={s.heading} className="mt-12 first:mt-10">
                <h2 className="display-3 !text-[clamp(1.25rem,2vw,1.5rem)]">
                  <span className="mr-3 font-mono text-[0.75rem] align-middle text-ink-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.heading}
                </h2>
                {s.body.map((p, j) => (
                  <p key={j} className="mt-4 text-[0.9375rem] leading-relaxed text-ink-600">
                    {p}
                  </p>
                ))}
              </div>
            ))}

            <div className="mt-14 border border-line bg-paper-cool p-6">
              <p className="text-[0.875rem] leading-relaxed text-ink-600">
                Questions about this policy can be sent to{" "}
                <a
                  href={`mailto:${company.email}`}
                  className="font-semibold text-signal-700 underline underline-offset-4"
                >
                  {company.email}
                </a>
                . This document is a baseline and should be reviewed by legal counsel before the
                site goes live.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

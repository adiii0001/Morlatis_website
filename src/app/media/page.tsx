import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Icon } from "@/components/ui/icon";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Newsroom",
  description:
    "Media enquiries, press contact and brand assets for Morlatis Group of Companies.",
  alternates: { canonical: "/media" },
  robots: { index: true, follow: true },
};

/*
 * REMOVED CONTENT
 * This page previously carried six fabricated press releases, including a
 * claimed ₹100 crore order-book milestone, a "₹12 crore SBPDCL contract award"
 * and an "Indian Railways empanelment for signalling works" — all with specific
 * dates. Publishing invented contract values and PSU announcements is a
 * material misrepresentation, not a copy placeholder, so they are gone.
 *
 * Add real announcements to the `releases` array below and the page renders
 * them; leave it empty and it renders an honest press-contact state.
 */

type Release = { date: string; title: string; category: string; excerpt: string; href?: string };

const releases: Release[] = [];

export default function MediaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Newsroom"
        title="Press &amp; media enquiries."
        lede="Announcements, media contact and brand assets for journalists and partners."
        align="wide"
      />

      <section className="section bg-white">
        <div className="shell">
          {releases.length > 0 ? (
            <ul className="border-t border-line-strong">
              {releases.map((r) => (
                <li
                  key={r.title}
                  className="grid gap-x-8 gap-y-3 border-b border-line py-8 lg:grid-cols-12"
                  data-reveal
                >
                  <div className="lg:col-span-3">
                    <p className="font-mono text-[0.75rem] text-ink-500">{r.date}</p>
                    <p className="mt-1 text-[0.75rem] uppercase tracking-[0.12em] text-signal-700">
                      {r.category}
                    </p>
                  </div>
                  <div className="lg:col-span-9">
                    <h2 className="title text-ink-950">{r.title}</h2>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">
                      {r.excerpt}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7" data-reveal>
                <h2 className="display-3">No announcements published yet.</h2>
                <p className="lede mt-5">
                  Company announcements will appear here as they are released. In the meantime,
                  journalists and analysts can reach the Group directly for comment, background or
                  interview requests.
                </p>
                <Link href="/contact" className="btn btn-ink mt-8">
                  Media enquiry
                  <Icon name="arrow-right" size={15} />
                </Link>
              </div>

              <aside className="lg:col-span-4 lg:col-start-9" data-reveal>
                <div className="border border-line p-7">
                  <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-500">
                    Press contact
                  </h2>
                  <dl className="mt-6 space-y-5 text-[0.9375rem]">
                    <div>
                      <dt className="text-[0.75rem] text-ink-500">Email</dt>
                      <dd className="mt-1">
                        <a
                          href={`mailto:${company.email}`}
                          className="font-semibold text-ink-900 transition-colors hover:text-signal-700"
                        >
                          {company.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.75rem] text-ink-500">Telephone</dt>
                      <dd className="mt-1 font-semibold text-ink-900">{company.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.75rem] text-ink-500">Hours</dt>
                      <dd className="mt-1 text-ink-700">{company.hours}</dd>
                    </div>
                  </dl>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

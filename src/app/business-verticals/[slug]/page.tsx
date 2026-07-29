import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Icon } from "@/components/ui/icon";
import Image from "next/image";
import { PowerFlow } from "@/components/brand/power-flow";
import { Ribbon } from "@/components/brand/ribbon";
import { SectionFlag } from "@/components/brand/section-flag";
import { SolutionsHub } from "@/components/brand/solutions-hub";
import { WorkflowTrack } from "@/components/brand/workflow-track";
import { verticals, verticalBySlug } from "@/content/verticals";
import { fillLastRow } from "@/lib/grid";

/**
 * One route for all eight verticals.
 *
 * Replaces seven hand-maintained page files that were structurally identical —
 * ~330 lines of duplication in which the same vertical carried a different icon
 * in the nav, the home section and its own page.
 */

export function generateStaticParams() {
  return verticals.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vertical = verticalBySlug(slug);
  if (!vertical) return {};

  return {
    title: vertical.title,
    description: vertical.lede,
    alternates: { canonical: `/business-verticals/${vertical.slug}` },
    openGraph: { title: `${vertical.title} | Morlatis Group`, description: vertical.lede },
  };
}

export default async function VerticalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vertical = verticalBySlug(slug);
  if (!vertical) notFound();

  const others = verticals.filter((v) => v.slug !== vertical.slug);

  return (
    <>
      <PageHeader
        eyebrow="Business vertical"
        title={vertical.title}
        lede={vertical.lede}
        breadcrumb={{ label: "All verticals", href: "/business-verticals" }}
        align="wide"
      />

      {/* Hero photograph, where the vertical has one. */}
      {vertical.image && (
        <div className="zoom-frame relative aspect-[21/9] w-full overflow-hidden bg-ink-100 sm:aspect-[3/1]">
          <Image
            src={vertical.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="zoom-media object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink-950/45 to-transparent"
          />
        </div>
      )}

      {/* Technical envelope */}
      {vertical.specs.length > 0 && (
        <section className="border-b border-line bg-white">
          <div className="shell">
            <dl className="grid gap-px overflow-hidden bg-line sm:grid-cols-3">
              {vertical.specs.map((s) => (
                <div key={s.label} className="bg-white py-7">
                  <dt className="text-[0.6875rem] uppercase tracking-[0.16em] text-ink-500">
                    {s.label}
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] font-semibold text-ink-900">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/*
        The distribution chain, reproduced from the brochure. Only the EPC
        vertical carries it — it is the scope that touches every stage.
      */}
      {vertical.slug === "electrical-epc" && (
        <section className="section-tight relative overflow-hidden border-b border-line bg-paper-cool">
          <Ribbon corner="top-right" size={200} className="opacity-30" />
          <div className="shell relative">
            <div data-reveal-left>
              <SectionFlag>Where we work on the network</SectionFlag>
            </div>
            <p className="lede mt-6 max-w-[42rem]" data-reveal>
              From the grid infeed to the consumer meter — our scope covers every stage of the
              distribution chain, not a slice of it.
            </p>
            <PowerFlow className="mt-14" />
          </div>
        </section>
      )}

      {/* Capability */}
      {vertical.capabilities.length > 0 ? (
        <section className="section bg-white">
          <div className="shell">
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="eyebrow" data-reveal>
                  Capability
                </p>
                <h2 className="display-3 mt-6" data-reveal>
                  What this vertical delivers.
                </h2>
                <Icon
                  name={vertical.icon}
                  size={120}
                  strokeWidth={0.7}
                  className="mt-10 hidden text-ink-200 lg:block"
                />
              </div>

              <ul className="lg:col-span-7 lg:col-start-6">
                {vertical.capabilities.map((c, i) => (
                  <li
                    key={c.title}
                    className="grid gap-2 border-t border-line py-7 last:border-b sm:grid-cols-[3rem_1fr] sm:gap-6"
                    data-reveal
                  >
                    <span className="font-mono text-[0.75rem] tracking-widest text-ink-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="title text-ink-950">{c.title}</h3>
                      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">
                        {c.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : (
        /*
          Holding state. A vertical with no defined scope gets an honest panel
          saying so — not a page of plausible-sounding services nobody has
          agreed to deliver.
        */
        <section className="section bg-white">
          <div className="shell">
            <div className="relative overflow-hidden rounded-xl border border-line bg-paper-cool p-8 sm:p-12">
              <Ribbon corner="top-right" size={190} className="opacity-25" />
              <div className="relative max-w-[44rem]">
                <span className="inline-flex items-center gap-2.5 rounded-full bg-signal-100 px-3.5 py-1.5 font-nav text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-signal-700">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-500 opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-600" />
                  </span>
                  In formation
                </span>

                <h2 className="display-3 mt-6">Scope and workflow being defined.</h2>
                <p className="lede mt-5">
                  This vertical has been established, but its service lines and delivery workflow
                  are still being finalised. Rather than publish a scope that has not been agreed,
                  this page stays deliberately short — the detail lands here once it is settled.
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Link href="/contact" className="btn btn-ink">
                    Register an early enquiry
                    <Icon name="arrow-right" size={16} />
                  </Link>
                  <Link href="/business-verticals" className="btn btn-line">
                    See the operating verticals
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/*
        The delivery workflow and the problem/solution pairs, both from the UPS
        brochure. They describe distribution-utility work, so they sit on the
        EPC vertical rather than being repeated across all eight.
      */}
      {vertical.slug === "electrical-epc" && (
        <>
          <section className="section border-t border-line bg-white">
            <div className="shell">
              <div className="max-w-[46rem]" data-reveal-left>
                <SectionFlag>How a work order runs</SectionFlag>
                <p className="lede mt-7">
                  Allotment to payment — the eight stages every job passes through, and the
                  documentation that closes each one.
                </p>
              </div>
              <WorkflowTrack className="mt-16" />
            </div>
          </section>

          <section className="section border-t border-line bg-paper-cool">
            <div className="shell">
              <div className="max-w-[46rem]" data-reveal-left>
                <SectionFlag>What we fix</SectionFlag>
                <p className="lede mt-7">
                  Six places the conventional system loses time — and what we do about each.
                </p>
              </div>

              <SolutionsHub className="mt-16" />

              <dl className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
                {[
                  { v: "1 hr", l: "Emergency response time" },
                  { v: "3–4 hrs", l: "Non-emergency response" },
                  { v: "2–3 days", l: "Bill clearance" },
                ].map((s, i) => (
                  <div
                    key={s.l}
                    className="bg-white px-6 py-8"
                    data-reveal-scale
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <dt className="numeral text-[clamp(1.75rem,3.2vw,2.375rem)] text-ink-950">
                      {s.v}
                    </dt>
                    <dd className="mt-2.5 font-nav text-[0.8125rem] text-ink-500">{s.l}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[0.75rem] text-ink-500">Response times vary by site condition.</p>
            </div>
          </section>
        </>
      )}

      {/* Cross-navigation */}
      <section className="section-tight border-t border-line bg-paper-warm">
        <div className="shell">
          <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-500">
            Other verticals
          </h2>
          <ul className="mt-7 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {others.map((v, i) => (
              <li key={v.slug} className={fillLastRow(others.length, i, { sm: 2, lg: 3 })}>
                <Link
                  href={`/business-verticals/${v.slug}`}
                  className="group flex h-full items-start gap-4 bg-white p-6 transition-colors hover:bg-paper-cool"
                >
                  <Icon
                    name={v.icon}
                    size={22}
                    className="mt-0.5 shrink-0 text-ink-500 transition-colors group-hover:text-signal-600"
                  />
                  <span>
                    <span className="block font-display text-[1rem] font-semibold text-ink-950">
                      {v.shortTitle}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] leading-snug text-ink-500">
                      {v.summary}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/contact" className="btn btn-ink mt-10">
            Discuss a requirement
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

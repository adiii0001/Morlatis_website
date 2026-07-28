import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Icon } from "@/components/ui/icon";
import { verticals, verticalBySlug } from "@/content/verticals";

/**
 * One route for all seven verticals.
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
        eyebrow={`Vertical ${vertical.index}`}
        title={vertical.title}
        lede={vertical.lede}
        breadcrumb={{ label: "All verticals", href: "/business-verticals" }}
        align="wide"
      />

      {/* Technical envelope */}
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

      {/* Capability */}
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
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">{c.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cross-navigation */}
      <section className="section-tight border-t border-line bg-paper-warm">
        <div className="shell">
          <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-500">
            Other verticals
          </h2>
          <ul className="mt-7 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {others.map((v) => (
              <li key={v.slug}>
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

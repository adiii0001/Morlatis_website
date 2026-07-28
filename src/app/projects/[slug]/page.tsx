import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Icon } from "@/components/ui/icon";
import { projects, projectBySlug } from "@/content/projects";

/**
 * Project detail.
 *
 * Every project card on the old homepage linked to /projects/{id} — a route
 * that did not exist. All eight of them 404'd.
 */

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.detail,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={`${project.category} · ${project.discipline}`}
        title={project.title}
        lede={project.detail}
        breadcrumb={{ label: "All projects", href: "/projects" }}
        align="wide"
      />

      <section className="section bg-white">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="display-3">Scope delivered</h2>
              <ul className="mt-8">
                {project.outcomes.map((o, i) => (
                  <li
                    key={o}
                    className="flex items-start gap-4 border-t border-line py-5 last:border-b"
                    data-reveal
                  >
                    <span className="mt-1 font-mono text-[0.6875rem] tracking-widest text-ink-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.9375rem] text-ink-700">{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="border border-line p-7">
                <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-500">
                  Record
                </h2>
                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="text-[0.75rem] text-ink-500">Discipline</dt>
                    <dd className="mt-1 text-[0.9375rem] font-semibold text-ink-900">
                      {project.discipline}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.75rem] text-ink-500">Delivery scope</dt>
                    <dd className="mt-1 text-[0.9375rem] font-semibold text-ink-900">
                      {project.scope}
                    </dd>
                  </div>
                  {project.client && (
                    <div>
                      <dt className="text-[0.75rem] text-ink-500">Client</dt>
                      <dd className="mt-1 text-[0.9375rem] font-semibold text-ink-900">
                        {project.client}
                      </dd>
                    </div>
                  )}
                  {project.year && (
                    <div>
                      <dt className="text-[0.75rem] text-ink-500">Year</dt>
                      <dd className="mt-1 text-[0.9375rem] font-semibold text-ink-900">
                        {project.year}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-[0.75rem] text-ink-500">Technical</dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {project.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-line px-2 py-1 font-mono text-[0.6875rem] text-ink-500"
                        >
                          {s}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                <Link href="/contact" className="btn btn-ink mt-8 w-full">
                  Discuss similar scope
                  <Icon name="arrow-right" size={15} />
                </Link>
              </div>

              <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink-500">
                Named client references, contract values and completion certificates are provided
                during pre-qualification rather than published here.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-tight border-t border-line bg-paper-warm">
        <div className="shell">
          <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-500">
            Related scope
          </h2>
          <ul className="mt-7 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group block h-full bg-white p-6 transition-colors hover:bg-paper-cool"
                >
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-signal-700">
                    {p.category}
                  </p>
                  <p className="mt-3 font-display text-[1rem] font-semibold text-ink-950">
                    {p.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

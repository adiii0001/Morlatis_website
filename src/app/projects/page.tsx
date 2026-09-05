import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Icon } from "@/components/ui/icon";
import { FieldGallery } from "@/components/sections/field-gallery";
import { projects, projectCategories } from "@/content/projects";
import { pickPhotos } from "@/content/field";
import { fillLastRow } from "@/lib/grid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Substation electrification, feeder automation, relay room modernisation, railway electrification and industrial electrical works executed by Morlatis Group.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Project record"
        title="Work that has to be energised, not just delivered."
        lede="Scope classes the Group executes across government, automation, railway and corporate work. Client-specific records are shared during pre-qualification."
        align="wide"
      />

      <section className="section bg-white">
        <div className="shell">
          {projectCategories.map((category) => {
            const group = projects.filter((p) => p.category === category);
            if (group.length === 0) return null;

            return (
              <div key={category} className="mb-20 last:mb-0">
                <div className="flex items-baseline gap-4">
                  <h2 className="display-3">{category}</h2>
                  <span className="hidden h-px flex-1 bg-line sm:block" />
                </div>

                {/* Government carries three scopes and Corporate one — both
                    left a grey cell in a two-column grid. */}
                <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-2">
                  {group.map((p, i) => (
                    <li
                      key={p.slug}
                      className={fillLastRow(group.length, i, { lg: 2 })}
                      data-reveal
                    >
                      <Link
                        href={`/projects/${p.slug}`}
                        className="group flex h-full flex-col bg-white p-8 transition-colors hover:bg-paper-cool"
                      >
                        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-signal-700">
                          {p.discipline}
                        </p>
                        <h3 className="title mt-4 text-ink-950">{p.title}</h3>
                        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">
                          {p.detail}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-1.5">
                          {p.stack.map((s) => (
                            <span
                              key={s}
                              className="rounded-md border border-line px-2 py-1 font-mono text-[0.6875rem] text-ink-500"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                        <span className="link-rule mt-6">
                          Scope detail
                          <Icon name="arrow-right" size={14} />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/*
        The project record was entirely typographic — a page describing what
        the Group builds, without a single photograph of it. The scope classes
        above stay the substance; this is the evidence for them.
      */}
      <FieldGallery
        eyebrow="Executed scope"
        title="The record, photographed."
        lede="The same scope classes, on site: substation structures, transformer erection, cabling and the civil work that carries it."
        photos={pickPhotos(
          "substation-crew",
          "transformer-hoist",
          "building-wiring",
          "crane-pole",
          "cable-dressing",
          "road-concreting"
        )}
        tone="warm"
      />
    </>
  );
}

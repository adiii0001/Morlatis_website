"use client";

import { useState } from "react";
import Link from "next/link";
import { fillLastRow } from "@/lib/grid";
import { Icon } from "@/components/ui/icon";
import { projects, projectCategories, type ProjectCategory } from "@/content/projects";

type Filter = ProjectCategory | "All";
const filters: Filter[] = ["All", ...projectCategories];

export function ProjectsSection() {
  const [active, setActive] = useState<Filter>("All");
  const visible = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="section bg-white">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[40rem]">
            <p className="eyebrow" data-reveal>
              Project record
            </p>
            <h2 className="display-2 mt-6" data-reveal>
              Work that has to be energised, not just delivered.
            </h2>
          </div>
          <Link href="/projects" className="link-rule shrink-0" data-reveal>
            All project capability
            <Icon name="arrow-right" size={15} />
          </Link>
        </div>

        {/* Horizontally scrollable on small screens — the previous pill row was a
            non-wrapping inline-flex that overflowed the page at 375px. */}
        <div
          className="-mx-[var(--gutter)] mt-11 overflow-x-auto px-[var(--gutter)] pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          data-reveal
        >
          <div role="tablist" aria-label="Filter projects" className="flex w-max gap-2">
            {filters.map((f) => {
              const selected = active === f;
              return (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(f)}
                  className={`h-10 whitespace-nowrap rounded-full px-5 text-[0.875rem] font-medium transition-colors duration-200 ${
                    selected
                      ? "bg-ink-950 text-white"
                      : "border border-line text-ink-600 hover:border-ink-300 hover:text-ink-900"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        <ul className="mt-9 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <li
              key={p.slug}
              className={fillLastRow(visible.length, i, { sm: 2, lg: 3 })}
              data-reveal
            >
              <Link
                href={`/projects/${p.slug}`}
                className="group relative flex h-full flex-col bg-white p-7 transition-colors duration-300 hover:bg-paper-cool"
              >
                {/* Discipline glyph, oversized and quiet — a drawn mark rather
                    than the empty gradient rectangle used previously. */}
                <Icon
                  name={
                    p.discipline === "RTU · SCADA"
                      ? "signal"
                      : p.discipline === "Relay Retrofitting"
                        ? "relay"
                        : p.discipline === "Railway Electrical"
                          ? "rail"
                          : "bolt"
                  }
                  size={92}
                  strokeWidth={0.9}
                  className="pointer-events-none absolute -right-3 -top-2 text-ink-100 transition-colors duration-500 group-hover:text-signal-200"
                />

                <div className="relative flex items-center gap-2">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-signal-700">
                    {p.category}
                  </span>
                  <span className="h-px w-4 bg-line-strong" />
                  <span className="text-[0.6875rem] uppercase tracking-[0.12em] text-ink-500">
                    {p.discipline}
                  </span>
                </div>

                <h3 className="title relative mt-5 text-ink-950">{p.title}</h3>

                <p className="relative mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">
                  {p.detail}
                </p>

                <div className="relative mt-6 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-line px-2 py-1 font-mono text-[0.6875rem] text-ink-500"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <span className="link-rule relative mt-6">
                  Scope detail
                  <Icon name="arrow-right" size={14} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

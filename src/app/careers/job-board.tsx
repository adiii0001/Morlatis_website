"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { jobCategories, openings } from "@/content/careers";
import { company } from "@/content/company";

/**
 * The job board.
 *
 * Search, two select filters and a category chip row. The client's sketch also
 * had a Department dropdown, but department and category select the same rows —
 * so the chips carry that axis and the dropdowns are left to location and type.
 *
 * Filtering is a `useMemo` over a static array; there is no request to make.
 */
export function JobBoard() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All");
  const [type, setType] = useState("All");
  const [category, setCategory] = useState<string>("All");

  const locations = useMemo(
    () => ["All", ...Array.from(new Set(openings.map((o) => o.location)))],
    []
  );
  const types = useMemo(() => ["All", ...Array.from(new Set(openings.map((o) => o.type)))], []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return openings.filter((job) => {
      if (category !== "All" && job.category !== category) return false;
      if (location !== "All" && job.location !== location) return false;
      if (type !== "All" && job.type !== type) return false;
      if (!q) return true;
      return `${job.title} ${job.department} ${job.body}`.toLowerCase().includes(q);
    });
  }, [query, location, type, category]);

  return (
    <div>
      {/* Filter bar */}
      <div className="grid gap-3 rounded-xl border border-line bg-white p-3 shadow-[var(--lift-1)] md:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Icon
            name="search"
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jobs…"
            aria-label="Search jobs"
            className="field border-transparent bg-paper-cool pl-11"
          />
        </div>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          aria-label="Filter by location"
          className="field border-transparent bg-paper-cool font-nav text-[0.9375rem] md:w-52"
        >
          {locations.map((l) => (
            <option key={l} value={l}>
              {l === "All" ? "All locations" : l}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Filter by employment type"
          className="field border-transparent bg-paper-cool font-nav text-[0.9375rem] md:w-44"
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t === "All" ? "All types" : t}
            </option>
          ))}
        </select>
      </div>

      {/* Category chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        {jobCategories.map((c) => {
          const active = category === c;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(c)}
              className={`h-9 rounded-full px-4 font-nav text-[0.75rem] font-semibold uppercase tracking-[0.1em] transition-colors ${
                active
                  ? "bg-ink-950 text-white"
                  : "border border-line-strong text-ink-600 hover:border-ink-900 hover:text-ink-950"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      <p className="mt-6 font-nav text-[0.8125rem] text-ink-500" aria-live="polite">
        {results.length} {results.length === 1 ? "position" : "positions"}
      </p>

      {/* Results */}
      {results.length > 0 ? (
        <ul className="mt-3 border-t border-line-strong">
          {results.map((job) => (
            <li
              key={job.title}
              className="grid gap-x-8 gap-y-4 border-b border-line py-8 lg:grid-cols-12"
            >
              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="font-nav text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-signal-700">
                    {job.category}
                  </span>
                  <span className="h-px w-4 bg-line-strong" />
                  <span className="text-[0.75rem] text-ink-500">{job.location}</span>
                  <span className="text-[0.75rem] text-ink-500">· {job.type}</span>
                </div>
                <h3 className="title mt-3 text-ink-950">{job.title}</h3>
                <p className="mt-1.5 text-[0.8125rem] text-ink-500">{job.department}</p>
              </div>

              <p className="text-[0.9375rem] leading-relaxed text-ink-600 lg:col-span-5">
                {job.body}
              </p>

              <div className="lg:col-span-2 lg:justify-self-end">
                <a
                  href={`mailto:${company.careersEmail}?subject=${encodeURIComponent(
                    `Application — ${job.title}`
                  )}`}
                  className="btn btn-line h-11 px-5"
                >
                  Apply
                  <Icon name="arrow-up-right" size={14} />
                </a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-3 border-y border-line py-16 text-center">
          <p className="title text-ink-950">No positions match those filters.</p>
          <p className="mt-2.5 text-[0.9375rem] text-ink-600">
            Clear the filters, or send a CV — hiring across engineering disciplines is continuous.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setLocation("All");
              setType("All");
              setCategory("All");
            }}
            className="btn btn-line mt-7 h-11 px-6"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

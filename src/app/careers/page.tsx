import type { Metadata } from "next";
import Image from "next/image";
import { fillLastRow } from "@/lib/grid";
import { Icon } from "@/components/ui/icon";
import { Ribbon } from "@/components/brand/ribbon";
import { SectionFlag } from "@/components/brand/section-flag";
import { JobBoard } from "./job-board";
import { company } from "@/content/company";
import { careerStats, cultureTiles, departments, whyMorlatis } from "@/content/careers";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build a career at Morlatis Group — engineering, automation, railway, commercial and support roles across live government, railway and PSU projects in Eastern India.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      {/* ---------------------------------------------------------------- 01 */}
      {/* Hero — full-bleed brand stage, the brochure ribbon on both corners. */}
      <header className="stage page-top relative overflow-hidden pb-16">
        <div aria-hidden="true" className="grid-field absolute inset-0" />
        <Ribbon corner="top-right" size={300} className="opacity-40" />
        <Ribbon corner="bottom-left" size={240} className="opacity-25" />

        <div className="shell relative">
          <span
            className="inline-flex items-center gap-2.5 rounded-full bg-white/15 px-4 py-2 font-nav text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm"
            data-enter
          >
            <Icon name="people" size={14} />
            Join Morlatis Group
          </span>

          <h1
            className="display-1 mt-8 max-w-[20ch] text-white"
            data-enter
            style={{ "--enter-delay": "80ms" } as React.CSSProperties}
          >
            Build your career with Bihar&rsquo;s leading engineering group.
          </h1>

          <p
            className="lede mt-7 max-w-[46rem] text-white/80"
            data-enter
            style={{ "--enter-delay": "160ms" } as React.CSSProperties}
          >
            Work on real government projects, railway contracts, SCADA automation and the
            infrastructure that powers India.
          </p>

          <div
            className="mt-10 flex flex-wrap gap-3"
            data-enter
            style={{ "--enter-delay": "240ms" } as React.CSSProperties}
          >
            <a href="#openings" className="btn btn-paper">
              View open positions
              <Icon name="arrow-down" size={16} />
            </a>
            <a href={`mailto:${company.careersEmail}`} className="btn btn-line-invert">
              Send your CV
              <Icon name="arrow-up-right" size={15} />
            </a>
          </div>

          <dl className="mt-16 grid gap-px overflow-hidden rounded-xl bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {careerStats.map((stat, i) => (
              <div
                key={stat.label}
                className="bg-[#00563c] px-6 py-7"
                data-reveal-scale
                style={{ "--i": i } as React.CSSProperties}
              >
                <dt className="numeral text-[clamp(1.75rem,3.4vw,2.5rem)] text-white">
                  {stat.value}
                </dt>
                <dd className="mt-2.5 font-nav text-[0.8125rem] font-medium text-white/70">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* ---------------------------------------------------------------- 02 */}
      {/* Why work here */}
      <section className="section bg-white">
        <div className="shell">
          <div className="max-w-[46rem]" data-reveal-left>
            <SectionFlag>Why build your career here?</SectionFlag>
            <p className="lede mt-7">
              More than a job — a mission to power India&rsquo;s future.
            </p>
          </div>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {whyMorlatis.map((item, i) => (
              <li
                key={item.title}
                className={`group bg-white p-8 transition-colors hover:bg-paper-cool ${fillLastRow(whyMorlatis.length, i, { md: 2, lg: 3 })}`}
                data-reveal-wipe
                style={{ "--i": i % 3 } as React.CSSProperties}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-signal-100 text-signal-700 transition-colors group-hover:bg-signal-500 group-hover:text-white">
                  <Icon name={item.icon} size={22} />
                </span>
                <h3 className="title mt-6 text-ink-950">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------- 03 */}
      {/* Life at Morlatis */}
      <section className="section border-y border-line bg-paper-warm">
        <div className="shell">
          <div data-reveal-left>
            <SectionFlag>Life at Morlatis Group</SectionFlag>
          </div>

          {/*
            Tiles with an `image` render the photograph; tiles without fall back
            to a captioned schematic frame, so the grid stays whole while real
            office and site photography is still being shot.
          */}
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cultureTiles.map((tile, i) => (
              <li
                key={tile.caption}
                className={`zoom-frame group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-xl border border-line p-6 ${tile.span}`}
                data-reveal-scale
                style={{ "--i": i } as React.CSSProperties}
              >
                {tile.image ? (
                  <>
                    <Image
                      src={tile.image}
                      alt={tile.caption}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="zoom-media object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent"
                    />
                    <p className="relative font-nav text-[0.875rem] font-medium text-white">
                      {tile.caption}
                    </p>
                  </>
                ) : (
                  <>
                    <div
                      aria-hidden="true"
                      className="zoom-media grid-field-light absolute inset-0 bg-gradient-to-br from-paper-cool to-white"
                    />
                    <Icon
                      name={tile.icon}
                      size={40}
                      strokeWidth={1}
                      className="relative text-ink-300 transition-colors group-hover:text-signal-600"
                    />
                    <p className="relative mt-4 font-nav text-[0.875rem] font-medium text-ink-700">
                      {tile.caption}
                    </p>
                  </>
                )}
              </li>
            ))}
          </ul>

          <figure className="mt-14 border-l-[3px] border-signal-500 pl-7" data-reveal>
            <blockquote className="display-3 max-w-[46rem] text-ink-950">
              &ldquo;At Morlatis, every team member is not just an employee — they are a co-builder
              of Bihar&rsquo;s power infrastructure.&rdquo;
            </blockquote>
            <figcaption className="mt-6 font-nav text-[0.875rem] font-semibold text-ink-700">
              Amit Kumar
              <span className="ml-2 font-normal text-ink-500">CEO &amp; Managing Director</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------------------------------------------------------------- 04 */}
      {/* Departments */}
      <section className="section bg-white">
        <div className="shell">
          <div className="max-w-[46rem]" data-reveal-left>
            <SectionFlag>Departments we hire across</SectionFlag>
            <p className="lede mt-7">Find your place in the Morlatis ecosystem.</p>
          </div>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {departments.map((d, i) => (
              <li
                key={d.name}
                className={`group flex h-full flex-col gap-4 bg-white p-6 transition-colors hover:bg-paper-cool ${fillLastRow(departments.length, i, { sm: 2, lg: 5 })}`}
                data-reveal-scale
                style={{ "--i": i % 5 } as React.CSSProperties}
              >
                <Icon
                  name={d.icon}
                  size={26}
                  strokeWidth={1.4}
                  className="text-ink-400 transition-colors group-hover:text-signal-600"
                />
                <span className="font-nav text-[0.875rem] font-semibold leading-snug text-ink-950">
                  {d.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------- 05 */}
      {/* Openings */}
      <section id="openings" className="section scroll-mt-[var(--header-h)] bg-paper-cool">
        <div className="shell">
          <div className="max-w-[46rem]" data-reveal-left>
            <SectionFlag>Current openings</SectionFlag>
          </div>

          <div className="mt-12">
            <JobBoard />
          </div>

          <div
            className="relative mt-14 overflow-hidden rounded-xl border border-line bg-white p-8"
            data-reveal
          >
            <Ribbon corner="top-right" size={150} className="opacity-20" />
            <div className="relative">
              <h2 className="title text-ink-950">Nothing matching your discipline?</h2>
              <p className="mt-3 max-w-[42rem] text-[0.9375rem] leading-relaxed text-ink-600">
                Send a CV with the type of work you want to be doing. Field engineers, protection
                specialists and commissioning staff are hired continuously.
              </p>
              <a href={`mailto:${company.careersEmail}`} className="btn btn-ink mt-6">
                {company.careersEmail}
                <Icon name="arrow-right" size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Icon } from "@/components/ui/icon";
import { NetworkDepthSection } from "@/components/sections/network-depth";
import { FieldGallery } from "@/components/sections/field-gallery";
import { FieldFilmSection } from "@/components/sections/field-film";
import { verticals } from "@/content/verticals";
import { pickPhotos } from "@/content/field";
import { foundation, pillars } from "@/content/csr";

export const metadata: Metadata = {
  title: "Business Verticals",
  description:
    "Electrical EPC, RTU/FRTU/SCADA engineering, relay retrofitting, railway electrical works, strategic sourcing, Morlatis Equifin wealth management and real estate.",
  alternates: { canonical: "/business-verticals" },
};

export default function BusinessVerticalsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Capability"
        title="Seven verticals, one engineering discipline."
        lede="Each stands on its own commercially and shares the same field teams, safety regime and quality process."
        align="wide"
      />

      <section className="section bg-white">
        <div className="shell">
          <ul className="border-t border-line-strong">
            {verticals.map((v) => (
              <li
                key={v.slug}
                data-reveal
              >
                <Link
                  href={`/business-verticals/${v.slug}`}
                  className="group grid gap-x-8 gap-y-4 border-b border-line py-9 lg:grid-cols-12"
                >
                  <div className="flex items-start gap-5 lg:col-span-5">
                    <Icon
                      name={v.icon}
                      size={26}
                      className="mt-1 hidden shrink-0 text-ink-400 transition-colors group-hover:text-signal-600 sm:block"
                    />
                    <div>
                      <h2 className="display-3 !text-[clamp(1.5rem,2.4vw,2rem)] text-ink-950 transition-colors group-hover:text-signal-700">
                        {v.title}
                      </h2>
                      <p className="mt-2 text-[0.9375rem] text-ink-500">{v.summary}</p>
                    </div>
                  </div>

                  <p className="text-[0.9375rem] leading-relaxed text-ink-600 lg:col-span-5">
                    {v.lede}
                  </p>

                  <div className="flex items-start lg:col-span-2 lg:justify-end">
                    <span className="link-rule">
                      Detail
                      <Icon name="arrow-right" size={14} />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/*
        The page was a header and a list of seven rows and nothing else — the
        one directory on the site that showed none of the work it indexes.
        Three evidence bands follow it: the telemetry field, the buildings
        scope in photographs, and site footage.
      */}
      {/*
        The Foundation, on the verticals page.

        It is presented here as the eighth arm of the Group and explicitly not
        as an eighth vertical — it does not trade, and putting a charitable
        trust in the same index as a wealth-management desk misrepresents both.
        So it sits below the index rather than inside it, is labelled as the
        CSR arm, and links through to its own page.
      */}
      <section className="section-tight border-t border-line bg-paper-mint">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <p className="eyebrow" data-reveal-left>
                Beyond the verticals
              </p>
              <h2 className="display-3 mt-6" data-reveal-left>
                {foundation.name}
              </h2>
              <p className="lede mt-6" data-reveal-left>
                {foundation.lede}
              </p>

              <div className="mt-9 flex flex-wrap gap-3" data-reveal-left>
                <Link href="/csr" className="btn btn-signal">
                  The Foundation&apos;s work
                  <Icon name="arrow-right" size={16} />
                </Link>
              </div>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
              {pillars.slice(0, 4).map((p, i) => (
                <li
                  key={p.title}
                  className="plate lift-3d p-6"
                  data-reveal-scale
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line-mint bg-white text-signal-700">
                    <Icon name={p.icon} size={19} />
                  </span>
                  <h3 className="mt-4 font-display text-[1rem] font-semibold text-ink-950">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-600">{p.tagline}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <NetworkDepthSection />

      <FieldGallery
        eyebrow="Across the verticals"
        title="Substations, buildings and the ground between them."
        lede="The same crews carry HT line works, internal electrification and the civil work that goes with both."
        photos={pickPhotos(
          "building-wiring",
          "service-connection",
          "internal-riser",
          "cable-dressing",
          "office-fitout",
          "girder-set"
        )}
        tone="warm"
      />

      <FieldFilmSection
        src="/video/field-02.mp4"
        poster="/img/field/crane-pole.jpg"
        label="Site footage of Morlatis electrical works in progress"
        eyebrow="In the field"
        title="Seven verticals, one crew standard."
        body="Each vertical stands on its own commercially. What they share is the field discipline — the same safety regime, the same testing, the same documented handover."
        stats={[
          { value: "7", label: "Operating verticals" },
          { value: "33 kV", label: "Highest voltage class" },
          { value: "IEC 61850", label: "Protection standard" },
        ]}
      />
    </>
  );
}

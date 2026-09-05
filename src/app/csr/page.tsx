import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Icon } from "@/components/ui/icon";
import { FieldGallery } from "@/components/sections/field-gallery";
import { FieldFilmSection } from "@/components/sections/field-film";
import { fillLastRow } from "@/lib/grid";
import { foundation, pillars } from "@/content/csr";
import { pickPhotos } from "@/content/field";
import { company } from "@/content/company";

/**
 * Corporate social responsibility — the Morlatis Vasudhaara Foundation.
 *
 * The Foundation used to be published as a "business vertical", which put a
 * charitable trust in the same index as a trading desk. It now has its own
 * route; /about/vasudhaara-foundation and the old vertical URL both redirect
 * here so nothing that was linked or indexed breaks.
 */

export const metadata: Metadata = {
  title: "CSR — Morlatis Vasudhaara Foundation",
  description:
    "The Morlatis Vasudhaara Foundation, established 2026, is the CSR arm of the Morlatis Group: healthcare, agriculture and farmer welfare, education and skills, food and nutrition, and community welfare across Bihar, Jharkhand and Eastern Uttar Pradesh.",
  alternates: { canonical: "/csr" },
  openGraph: {
    title: "Morlatis Vasudhaara Foundation | CSR",
    description: foundation.lede,
  },
};

export default function CsrPage() {
  return (
    <>
      <PageHeader
        eyebrow="Corporate social responsibility"
        title={foundation.name}
        lede={foundation.lede}
        align="wide"
      />

      {/* ---- The promise ------------------------------------------------- */}
      <section className="stage-deep scene relative overflow-hidden py-16 text-white sm:py-20">
        <div className="grid-field absolute inset-0 opacity-50" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_10%,rgb(255_255_255/0.14),transparent_62%)]"
          aria-hidden="true"
        />
        <div className="shell relative">
          <p className="display-3 max-w-[46rem] text-white" data-reveal>
            &ldquo;{foundation.promise}&rdquo;
          </p>
          <p className="mt-6 font-display text-[1.0625rem] font-semibold text-signal-200" data-reveal>
            {foundation.tagline}
          </p>

          <dl className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { k: "Established", v: String(foundation.established) },
              { k: "Focus regions", v: foundation.regions },
              { k: "Funding", v: "A fixed share of Group profit" },
            ].map((row) => (
              <div key={row.k} className="plate-invert p-6" data-reveal-scale>
                <dt className="text-[0.6875rem] uppercase tracking-[0.16em] text-white/60">
                  {row.k}
                </dt>
                <dd className="mt-2.5 font-display text-[1.0625rem] font-semibold text-white">
                  {row.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---- Mission pillars --------------------------------------------- */}
      <section className="scene section bg-white">
        <div className="shell">
          <div className="max-w-[42rem]">
            <p className="eyebrow" data-reveal>
              Mission pillars
            </p>
            <h2 className="display-2 mt-6" data-reveal>
              Five places the work goes.
            </h2>
            <p className="lede mt-6" data-reveal>
              Vasudhaara means a flow — of water, of wealth, of care. The Foundation is how a share
              of what the Group earns returns to the districts its crews work in.
            </p>
          </div>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <li
                key={p.title}
                className={`plate lift-3d flex flex-col p-7 ${fillLastRow(pillars.length, i, { sm: 2, lg: 3 })}`}
                data-reveal-scale
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line-mint bg-[linear-gradient(160deg,#ffffff,#e2f8ea)] text-signal-700 shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_8px_16px_-8px_rgb(0_61_44/0.45)]">
                  <Icon name={p.icon} size={24} />
                </span>

                <h3 className="title mt-6 text-ink-950">{p.title}</h3>
                <p className="mt-2 text-[0.9375rem] font-semibold text-signal-700">{p.tagline}</p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">{p.body}</p>

                <ul className="mt-6 space-y-2.5 border-t border-line-mint pt-5">
                  {p.programmes.map((prog) => (
                    <li key={prog} className="flex items-start gap-2.5 text-[0.875rem] text-ink-600">
                      <Icon name="check" size={14} className="mt-1 shrink-0 text-signal-600" />
                      {prog}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/*
        The districts, in photographs.

        These are Group job photographs, not Foundation programme photographs,
        and the heading says so — the Foundation's own framing is that it
        returns a share of earnings to the districts the crews work in, so the
        honest caption for this band is the work, not the giving.
      */}
      <FieldGallery
        eyebrow="The districts"
        title="Where the crews work is where the money goes back."
        lede="Group jobs across Bihar — distribution works, service connections and the colony roads that go in alongside them. The Foundation's programmes run in these same districts."
        /* Every frame here has to be a Group job — the lede says so. Two were
           swapped out on quality rather than substituted with stock: an office
           corridor, and a gravel sub-base that carried no readable subject. */
        photos={pickPhotos(
          "road-concreting",
          "service-connection",
          "pole-erection",
          "line-crew",
          "cable-pull",
          "crane-pole"
        )}
        tone="warm"
      />

      <FieldFilmSection
        src="/video/field-03.mp4"
        poster="/img/field/road-concreting.jpg"
        label="Site footage of Morlatis works in a Patna neighbourhood"
        eyebrow="On the ground"
        title="A flow, back into the districts."
        body="Vasudhaara is funded by a fixed share of Group profit — so the more the crews deliver in these neighbourhoods, the more the Foundation returns to them."
        stats={[
          { value: String(foundation.established), label: "Established" },
          { value: "5", label: "Mission pillars" },
          { value: "3 states", label: foundation.regions },
        ]}
      />

      {/* ---- Contact ------------------------------------------------------ */}
      <section className="section-tight border-t border-line bg-paper-mint">
        <div className="shell">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[38rem]">
              <h2 className="display-3">Work with the Foundation.</h2>
              <p className="lede mt-5">
                Partnerships, programme proposals and volunteering enquiries from institutions
                working in the same districts are welcome.
              </p>
              <p className="mt-4 text-[0.875rem] text-ink-500">{foundation.parent}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-signal">
                Contact the Foundation
                <Icon name="arrow-right" size={16} />
              </Link>
              <a href={`mailto:${company.email}`} className="btn btn-line">
                {company.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

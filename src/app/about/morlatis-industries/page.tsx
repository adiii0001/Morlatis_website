import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Icon, type IconName } from "@/components/ui/icon";
import { Ribbon } from "@/components/brand/ribbon";
import { SectionFlag } from "@/components/brand/section-flag";
import { fillLastRow } from "@/lib/grid";

/**
 * Morlatis Industries.
 *
 * Built from the Morlatis Industries deck. That document is marked
 * "Confidential — For Investors Only", so everything on this page is the
 * business narrative only: the investor terms (valuation, IRR, the funding ask,
 * ticket size, debt structure, exit routes and the five-year revenue
 * projections) are deliberately not published here.
 */

export const metadata: Metadata = {
  title: "Morlatis Industries",
  description:
    "Morlatis Industries — the Group's metal recycling arm, processing copper and aluminium scrap into high-purity ingots for B2B buyers in Eastern India. Facility at Barun, Gaya on NH-2.",
  alternates: { canonical: "/about/morlatis-industries" },
};

const facts = [
  { label: "Planned capacity", value: "6,000 MT / year" },
  { label: "Facility", value: "Barun, Gaya — NH-2" },
  { label: "Land tenure", value: "90-year government lease" },
  { label: "Production from", value: "October 2026" },
];

const model: {
  step: string;
  icon: IconName;
  title: string;
  body: string;
  image: string;
  alt: string;
}[] = [
  {
    step: "01",
    icon: "recycle",
    title: "Efficient scrap sourcing",
    body: "Copper and aluminium scrap acquired through government e-auctions — a transparent, traceable supply chain rather than an informal one.",
    image: "/img/industries-sourcing.jpg",
    alt: "Engineer on the floor of a metal processing plant",
  },
  {
    step: "02",
    icon: "furnace",
    title: "Advanced processing",
    body: "Segregation, cleaning, melting, refining and casting on a single line, engineered for 6,000 MT of throughput a year.",
    image: "/img/industries-melting.jpg",
    alt: "Foundry crew working beneath a casting ladle",
  },
  {
    step: "03",
    icon: "ingot",
    title: "Direct B2B sales",
    body: "High-purity copper and aluminium ingots sold straight to manufacturers, with no intermediary layer between plant and buyer.",
    image: "/img/industries-scrapyard.jpg",
    alt: "Grab crane handling sorted metal scrap inside a processing hall",
  },
];

const edge = [
  {
    title: "Direct procurement partnerships",
    body: "Material sourced directly from government institutions — quality and provenance are documented, not assumed.",
  },
  {
    title: "Strategic location on NH-2",
    body: "Direct highway access to major manufacturing hubs, cutting inbound and outbound logistics cost by an estimated 30–40%.",
  },
  {
    title: "Secured land and experienced leadership",
    body: "A 90-year government land lease, with a promoter team drawn from senior government service and a decade of corporate operations.",
  },
];

const market = [
  {
    title: "The EV build-out",
    body: "India's shift to electric vehicles is lifting copper demand sharply and pulling the recycling sector along with it.",
  },
  {
    title: "Bihar's industrial base",
    body: "A rapidly forming industrial ecosystem with active state government support for new manufacturing capacity.",
  },
  {
    title: "A market compounding at 10–15%",
    body: "India's metal scrap market is valued at roughly ₹1.14 lakh crore; the aluminium scrap segment alone is projected to triple by 2034.",
  },
];

const roadmap = [
  { when: "Completed", title: "Incorporation, land and approvals", body: "Company incorporated, 90-year land lease secured and project approvals received." },
  { when: "In progress", title: "Funding, suppliers and pipeline", body: "Term loan sanction under way, supplier relationships formed and a customer pipeline in development." },
  { when: "2026", title: "Construction and commissioning", body: "Factory construction from May 2026, plant and machinery installed, pollution control systems commissioned." },
  { when: "Oct 2026", title: "Commercial production", body: "Market entry with copper and aluminium ingot output for B2B buyers across Eastern India." },
  { when: "2029 – 2031", title: "Scale and diversify", body: "Near-full capacity operation, ISO certification, expansion into further non-ferrous metals and a pan-India customer base.", projected: true },
];

export default function MorlatisIndustriesPage() {
  return (
    <>
      {/* ---------------------------------------------------------------- 01 */}
      <header className="stage-deep page-top relative overflow-hidden pb-16">
        {/*
          The pour shot from the deck, held right back — it carries the heat of
          the business without ever competing with the copy for contrast.
        */}
        <Image
          src="/img/industries-pour.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden="true"
          className="object-cover object-right opacity-30 mix-blend-luminosity"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#00402f] via-[#00402f]/85 to-transparent"
        />
        <div aria-hidden="true" className="grid-field absolute inset-0" />
        <Ribbon corner="top-right" size={300} className="opacity-35" />

        <div className="shell relative">
          <Link
            href="/about"
            className="mb-8 inline-flex items-center gap-2 font-nav text-[0.8125rem] font-medium text-white/60 transition-colors hover:text-white"
          >
            <Icon name="arrow-right" size={14} className="rotate-180" />
            About
          </Link>

          <p className="eyebrow eyebrow-invert" data-enter>
            Morlatis Industries
          </p>

          <h1
            className="display-1 mt-6 text-white"
            data-enter
            style={{ "--enter-delay": "80ms" } as React.CSSProperties}
          >
            Metal. Recycled.
            <br />
            Returned to industry.
          </h1>

          <p
            className="lede mt-7 max-w-[46rem] text-white/80"
            data-enter
            style={{ "--enter-delay": "160ms" } as React.CSSProperties}
          >
            The Group&rsquo;s metal recycling arm — processing government-sourced copper and
            aluminium scrap into high-purity ingots for manufacturers across Eastern India.
          </p>

          <dl className="mt-14 grid gap-px overflow-hidden rounded-xl bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className="bg-[#00402f] px-6 py-7 text-center"
                data-reveal-scale
                style={{ "--i": i } as React.CSSProperties}
              >
                <dt className="font-nav text-[0.6875rem] uppercase tracking-[0.16em] text-white/55">
                  {f.label}
                </dt>
                <dd className="mt-2.5 font-nav text-[1.0625rem] font-semibold text-white">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* ---------------------------------------------------------------- 02 */}
      {/* The opportunity */}
      <section className="section bg-white">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal-left>
              <SectionFlag>Unlocking scrap value</SectionFlag>
              <p className="lede mt-8">
                India generates millions of tonnes of metal scrap every year. Much of it is still
                exported raw or left unprocessed — value leaving the country in the cheapest
                possible form.
              </p>
              <Icon
                name="recycle"
                size={120}
                strokeWidth={0.7}
                className="mt-12 hidden text-ink-200 lg:block"
              />
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-[1.0625rem] leading-relaxed text-ink-700" data-reveal>
                Morlatis Industries closes that loop domestically. Scrap is bought through
                government e-auctions, processed at Barun in Gaya, and sold back into Eastern
                India&rsquo;s manufacturing base as ingot — a circular supply chain with the margin
                and the material both staying in the region.
              </p>

              <ul className="mt-10">
                {market.map((m) => (
                  <li key={m.title} className="border-t border-line py-7 last:border-b" data-reveal>
                    <h3 className="title text-ink-950">{m.title}</h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">{m.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- 03 */}
      {/* Business model */}
      <section className="section border-y border-line bg-paper-cool">
        <div className="shell">
          <div className="max-w-[46rem]" data-reveal-left>
            <SectionFlag>How the business works</SectionFlag>
            <p className="lede mt-7">Three stages, from auction lot to finished ingot.</p>
          </div>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-3">
            {model.map((m, i) => (
              <li
                key={m.step}
                className="group bg-white"
                data-reveal-wipe
                style={{ "--i": i } as React.CSSProperties}
              >
                <div className="zoom-frame relative aspect-[16/10] overflow-hidden bg-ink-100">
                  <Image
                    src={m.image}
                    alt={m.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="zoom-media object-cover"
                  />
                </div>

                <div className="p-8">
                  <Icon
                    name={m.icon}
                    size={30}
                    strokeWidth={1.3}
                    className="text-signal-700 transition-colors group-hover:text-signal-500"
                  />
                  <h3 className="title mt-6 text-ink-950">{m.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">{m.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------------- 04 */}
      {/* Competitive edge */}
      <section className="section bg-white">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4" data-reveal-left>
              <SectionFlag>Our edge</SectionFlag>
            </div>

            <ul className="lg:col-span-7 lg:col-start-6">
              {edge.map((e) => (
                <li
                  key={e.title}
                  className="border-t border-line py-7 last:border-b"
                  data-reveal
                >
                  <h3 className="title text-ink-950">{e.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">{e.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Roadmap.
          Was a five-across grid of white cards on a white-ish band: the two
          tones were a hair apart, so the block read as one large empty white
          slab with text floating in it, and the fifth column was near-empty at
          most widths. Rebuilt as a rail on the mint band — no cards, no white
          panel, and the stages read in sequence instead of as a table. */}
      <section className="section border-t border-line bg-paper-mint">
        <div className="shell">
          <div className="max-w-[46rem]" data-reveal-left>
            <SectionFlag>Where the project stands</SectionFlag>
          </div>

          <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {roadmap.map((r, i) => (
              <li
                key={r.title}
                className={fillLastRow(roadmap.length, i, { sm: 2, lg: 5 })}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
              >
                {/* Rail: a filled node for what is done, a hollow one for what
                    is forecast. */}
                <div className="flex items-center" aria-hidden="true">
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                      r.projected
                        ? "border-2 border-signal-500 bg-paper-mint"
                        : "bg-signal-500 shadow-[0_0_0_4px_rgb(23_185_74/0.16)]"
                    }`}
                  />
                  <span
                    className={`h-px flex-1 ${
                      r.projected
                        ? "bg-[repeating-linear-gradient(90deg,var(--color-line-mint)_0_6px,transparent_6px_12px)]"
                        : "bg-line-mint"
                    }`}
                  />
                </div>

                <p className="mt-6 font-nav text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-signal-700">
                  {r.when}
                </p>
                <h3 className="mt-3 font-display text-[1.0625rem] font-bold leading-snug text-ink-950">
                  {r.title}
                </h3>
                <p className="mt-2.5 pr-4 text-[0.875rem] leading-relaxed text-ink-600">{r.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------------- 06 */}
      <section className="stage relative overflow-hidden">
        <Ribbon corner="bottom-left" size={240} className="opacity-25" />
        <div className="shell section-tight relative">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="display-3 text-white" data-reveal>
                Buying ingot, or supplying scrap?
              </h2>
              <p className="lede mt-5 max-w-[38rem] text-white/80" data-reveal>
                Offtake conversations for the October 2026 production window are open now.
                Corporate office in Danapur, Patna; facility at Plot P-10, Industrial Estate,
                Barun, Gaya.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
              <Link href="/contact" className="btn btn-paper" data-reveal>
                Talk to the Industries team
                <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

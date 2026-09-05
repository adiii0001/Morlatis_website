import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { FieldFilmSection } from "@/components/sections/field-film";
import { Icon } from "@/components/ui/icon";
import { RailwayScene } from "@/components/visuals/railway-scene";
import { clients, credentials, company } from "@/content/company";
import { pickPhotos, type FieldPhoto } from "@/content/field";
import { fillLastRow } from "@/lib/grid";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "Morlatis Group serves state distribution utilities, Indian Railways, Power Grid Corporation and national EPC contractors including L&T, Sterling & Wilson and Ashoka Buildcon.",
  alternates: { canonical: "/clients" },
};

/*
 * The page used to be six bands of a four-column cell grid holding one to three
 * names each. Even with the last tile widened to close the row, a sector of one
 * client rendered as a single line of type in a box the width of the page — the
 * screen was mostly empty paper, and the only thing distinguishing "Utility"
 * from "EPC" was the word at the top.
 *
 * It is now a woven layout: each sector is a photograph of the work that sector
 * buys, set against the names that buy it, alternating sides down the page. The
 * client tiles are raised plates rather than grid cells, so the band has depth
 * rather than ruled lines, and the photographs carry their own captions from the
 * shared library — nothing here describes a photograph as a particular client's
 * site, because we cannot verify that mapping.
 */

type Sector = {
  /** What this group of clients buys. Describes Morlatis capability, not any
      individual contract. */
  descriptor: string;
  /** A slug from the field photography library. */
  photo?: string;
  /** Drawn artwork instead of a photograph, where no photograph exists. */
  scene?: "railway";
};

const SECTORS: Record<string, Sector> = {
  Utility: {
    descriptor:
      "State distribution licensees. 11 kV and 33 kV line works, transformer supply and commissioning, and system strengthening carried out on networks that stay live around us.",
    photo: "distribution-dusk",
  },
  Public: {
    descriptor:
      "Public infrastructure owners. Railway electrical works and approved material supply, executed under Indian Railways vendor registration.",
    scene: "railway",
  },
  EPC: {
    descriptor:
      "National contractors who place the electrical package of a larger civil or energy scope with a specialist. We are measured against their programme, not our own.",
    photo: "girder-lift",
  },
  Industry: {
    descriptor:
      "Manufacturers and industrial groups served through material sourcing, supply against specification and internal electrification of plant and offices.",
    photo: "overhead-network",
  },
  Institutional: {
    descriptor:
      "Hospitals, campuses and government buildings wired and rewired around their working day, with no scheduled interruption to the floor below.",
    photo: "building-wiring",
  },
  Infrastructure: {
    descriptor:
      "Infrastructure developers taking electrical scope and the associated civil work — foundations, approach roads and site services — from one contractor.",
    photo: "girder-set",
  },
};

/**
 * Two letters for the plate's monogram. Word initials where the full name has
 * words to take them from, and the first two letters otherwise, so a single-word
 * name like "Medanta" still fills the badge.
 */
function monogram(full: string) {
  const initials = full
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .map((w) => w[0])
    .join("");

  const two =
    initials.length >= 2 ? initials.slice(0, 2) : full.replace(/[^A-Za-z]/g, "").slice(0, 2);

  return two.toUpperCase();
}

/* ------------------------------------------------------------------ */

function Frame({ photo, scene }: { photo?: FieldPhoto; scene?: "railway" }) {
  if (scene === "railway") {
    /*
     * The deep-green surface is set as a utility rather than with `.stage-deep`:
     * that class and `.plate` both live in the components layer and both set
     * `background`, so whichever is written second in the stylesheet wins no
     * matter what order they are listed in here — which left this tile white.
     */
    return (
      <figure className="plate lift-3d relative h-full min-h-[18rem] overflow-hidden !bg-[linear-gradient(135deg,#003a2b_0%,#00563c_55%,#0b7f3f_100%)] p-0 lg:min-h-[24rem]">
        <div className="grid-field absolute inset-0 opacity-70" aria-hidden="true" />
        <RailwayScene className="absolute inset-0 h-full w-full text-white/40" />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_40_29/0.9)_0%,rgb(0_40_29/0.35)_45%,transparent_75%)]"
          aria-hidden="true"
        />
        <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
          <span className="media-chip">25 kV OHE</span>
          <h3 className="mt-3.5 font-display text-[1.0625rem] font-semibold leading-snug text-white sm:text-[1.1875rem]">
            Traction and railway power
          </h3>
          <p className="mt-1.5 max-w-[24rem] text-[0.8125rem] leading-relaxed text-white/75">
            Overhead equipment, signalling power and electrical material supplied to the railway.
          </p>
        </figcaption>
      </figure>
    );
  }

  if (!photo) return null;

  return (
    <figure className="zoom-frame plate lift-3d relative h-full min-h-[18rem] overflow-hidden p-0 lg:min-h-[24rem]">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 40vw"
        className="zoom-media object-cover"
      />
      <div className="media-scrim" aria-hidden="true" />
      <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        <span className="media-chip">{photo.chip}</span>
        <h3 className="mt-3.5 font-display text-[1.0625rem] font-semibold leading-snug text-white sm:text-[1.1875rem]">
          {photo.title}
        </h3>
        <p className="mt-1.5 max-w-[24rem] text-[0.8125rem] leading-relaxed text-white/75">
          {photo.note}
        </p>
      </figcaption>
    </figure>
  );
}

type Client = { name: string; full: string; logo?: string };

/**
 * The client's own mark, printed faintly across the tile it names. It is set in
 * the brand's ink rather than in the client's colours — a wall of full-colour
 * marks at this scale reads as an advertisement hoarding — and it is held clear
 * of the edge rather than bled off it, because a wordmark cut through the middle
 * of a word reads as a layout fault rather than as a watermark.
 */
function Watermark({ logo, solo }: { logo: string; solo: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute top-1/2 -translate-y-1/2 opacity-[0.09] mix-blend-multiply grayscale ${
        solo ? "right-8 h-36 w-56" : "right-5 h-20 w-32"
      }`}
    >
      <Image src={logo} alt="" fill sizes="256px" className="object-contain object-right" />
    </span>
  );
}

function SectorBand({
  sector,
  index,
  group,
}: {
  sector: string;
  index: number;
  group: Client[];
}) {
  const meta = SECTORS[sector];
  const [photo] = meta?.photo ? pickPhotos(meta.photo) : [];
  /* The photograph swaps sides every band, so the eye is handed down the page
     instead of running a single column. */
  const framedRight = index % 2 === 1;

  /*
   * Two sectors hold a single client whose short name and full name are the
   * same string — "Indian Railways", "Medanta". Rendered as an ordinary tile
   * that is one line of type in a box the width of the column, which is the
   * hole this page was rebuilt to close. A solo client instead gets a feature
   * tile that takes the sector's own description into it, so the band carries
   * the same weight as a three-client one and the copy is not printed twice.
   */
  const solo = group.length === 1;

  return (
    <div className="scene grid items-stretch gap-6 lg:grid-cols-12 lg:gap-10">
      <div className={`lg:col-span-5 ${framedRight ? "lg:order-last" : ""}`} data-reveal-scale>
        <Frame photo={photo} scene={meta?.scene} />
      </div>

      {/*
        `justify-between` rather than a plain stack: a two-client sector leaves
        the column shorter than the photograph beside it, and pushing the tiles
        to the foot of the column puts that slack between the description and
        the names — where it reads as spacing — instead of leaving it hanging
        under the last tile, where it reads as a missing row.
      */}
      <div className="flex flex-col justify-between lg:col-span-7">
        {/* Heading and description are one block so `justify-between` splits the
            column in two places, not three. */}
        <div>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span
              aria-hidden="true"
              className="numeral text-[clamp(1.75rem,3vw,2.375rem)] text-signal-200"
              data-reveal-left
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="display-3 !text-[clamp(1.5rem,2.4vw,2rem)]" data-reveal-left>
              {sector}
            </h2>
            <span className="inset px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-500">
              {group.length} {group.length === 1 ? "client" : "clients"}
            </span>
          </div>

          {!solo && (
            <p
              className="mt-5 max-w-[38rem] text-[0.9375rem] leading-relaxed text-ink-600"
              data-reveal-left
            >
              {meta?.descriptor}
            </p>
          )}
        </div>

        {/*
          Only the solo tile stretches — letting a pair of tiles fill the column
          height inflated each one to twice the height of its contents, which is
          the same hole in a different shape. Two names stack in one column
          instead of pairing, because two tiles side by side make a band half the
          height of the photograph next to it; stacked, the two columns finish
          within about a line of each other.
        */}
        <ul
          className={`mt-8 grid gap-4 ${
            solo ? "flex-1 auto-rows-fr" : group.length > 2 ? "sm:grid-cols-2" : ""
          }`}
        >
          {group.map((c, i) => (
            <li
              key={c.name}
              className={`plate lift-3d overflow-hidden ${
                solo
                  ? "flex flex-col justify-center p-8 sm:p-10"
                  : `flex items-center gap-4 p-6 ${
                      /* Only the paired grid has a row to close. */
                      group.length > 2 ? fillLastRow(group.length, i, { sm: 2 }) : ""
                    }`
              }`}
              data-reveal-scale
              style={{ "--i": Math.min(i, 3) } as React.CSSProperties}
            >
              {c.logo && <Watermark logo={c.logo} solo={solo} />}

              {/*
                The badge carries the client's own mark where we have one, and
                falls back to a monogram where we do not — a mark is padded
                inside the well rather than filling it, so the two treatments
                sit on the same circle and the row still scans as one set.
              */}
              <span
                aria-hidden="true"
                className={`inset relative z-10 flex shrink-0 items-center justify-center overflow-hidden rounded-full font-display font-bold tracking-[-0.02em] text-signal-700 ${
                  solo ? "h-16 w-16 text-[1.25rem]" : "h-12 w-12 text-[0.9375rem]"
                }`}
              >
                {c.logo ? (
                  <Image
                    src={c.logo}
                    alt=""
                    fill
                    sizes="64px"
                    /* Two of the marks are JPEGs on white paper. Multiplying
                       drops that square into the well instead of printing it
                       over the well's own tint. */
                    className={`object-contain mix-blend-multiply ${solo ? "p-2.5" : "p-2"}`}
                  />
                ) : (
                  monogram(c.full)
                )}
              </span>

              <span className={solo ? "relative z-10 mt-6 block" : "relative z-10 min-w-0"}>
                <span
                  className={`block font-display font-bold tracking-[-0.02em] text-ink-950 ${
                    solo ? "text-[clamp(1.25rem,2vw,1.5rem)]" : "text-[1.0625rem]"
                  }`}
                >
                  {c.name}
                </span>
                {c.full !== c.name && (
                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-500">
                    {c.full}
                  </span>
                )}
                {solo && (
                  <span className="mt-4 block max-w-[34rem] text-[0.9375rem] leading-relaxed text-ink-600">
                    {meta?.descriptor}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function ClientsPage() {
  const sectors = Array.from(new Set(clients.map((c) => c.sector)));
  const bands = sectors.map((sector) => ({
    sector,
    group: clients
      .filter((c) => c.sector === sector)
      .map((c) => ({ name: c.name, full: c.full, logo: "logo" in c ? c.logo : undefined })),
  }));

  /* The film splits the roster in half rather than closing it, so neither run
     of bands gets long enough to read as a list. */
  const split = Math.ceil(bands.length / 2);

  return (
    <>
      <PageHeader
        eyebrow="Clients"
        title="Judged by who re-appoints us."
        lede="Utilities, public infrastructure owners and EPC majors across four states — grouped by what each of them buys."
        align="wide"
      />

      <section className="section bg-white">
        <div className="shell space-y-20 lg:space-y-28">
          {bands.slice(0, split).map((b, i) => (
            <SectorBand key={b.sector} sector={b.sector} index={i} group={b.group} />
          ))}
        </div>
      </section>

      <FieldFilmSection
        src="/video/field-03.mp4"
        poster="/img/field/office-meeting.jpg"
        label="Footage of a Morlatis crew working inside an occupied building"
        eyebrow="How we are judged"
        title="Re-appointment is the only review that counts."
        body="Utilities re-tender. EPC majors re-award. Institutions call the same crew back into the same building. None of that happens on the strength of a brochure — it happens because the last job was energised on programme and handed over clean."
        stats={[
          { value: "30+", label: "Clients served since 2018" },
          { value: String(sectors.length), label: "Client sectors" },
          { value: "4 states", label: "Bihar · Jharkhand · UP · Delhi" },
        ]}
      />

      <section className="section bg-white">
        <div className="shell space-y-20 lg:space-y-28">
          {bands.slice(split).map((b, i) => (
            <SectorBand key={b.sector} sector={b.sector} index={split + i} group={b.group} />
          ))}
        </div>
      </section>

      {/*
        The closing band. This used to be one grey sentence floating under the
        last grid; the registrations that actually qualify us to hold these
        clients are on the page beside it now, because that is the question a
        reader has by the time they get here.
      */}
      <section className="section scene border-t border-line bg-paper-mint">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <p className="eyebrow" data-reveal-left>
                Pre-qualification
              </p>
              <h2 className="display-2 mt-6 !text-[clamp(1.75rem,3.2vw,2.5rem)]" data-reveal-left>
                The record is shown, not published.
              </h2>
              <p className="lede mt-6 max-w-[32rem]" data-reveal-left>
                Contract references, completion certificates and performance records are provided
                during tender pre-qualification rather than posted on a website. The registrations
                that let us bid are listed here.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row" data-reveal-left>
                <Link href="/contact" className="btn btn-ink">
                  Request references
                  <Icon name="arrow-right" size={15} />
                </Link>
                <a href={`mailto:${company.projectsEmail}`} className="btn btn-line">
                  {company.projectsEmail}
                </a>
              </div>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
              {credentials.map((c, i) => (
                <li
                  key={c.title}
                  className={`plate plate-flat lift-3d p-6 ${fillLastRow(credentials.length, i, {
                    sm: 2,
                  })}`}
                  data-reveal-scale
                  style={{ "--i": Math.min(i, 3) } as React.CSSProperties}
                >
                  <Icon name="shield" size={18} className="text-signal-600" />
                  <h3 className="mt-4 font-display text-[1rem] font-bold tracking-[-0.02em] text-ink-950">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-500">{c.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

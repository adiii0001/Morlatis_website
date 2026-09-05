import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { Magnetic } from "@/components/ui/magnetic";
import { CountUp } from "@/components/ui/count-up";
import { RotatingWord } from "@/components/ui/rotating-word";
import { SignalField } from "@/components/visuals/grid-scene";
import { metrics } from "@/content/company";

const enterDelay = (ms: number): React.CSSProperties =>
  ({ "--enter-delay": `${ms}ms` }) as React.CSSProperties;

/**
 * Hero.
 *
 * Rebuilt on white and light green rather than the full-bleed green stage. Two
 * reasons: the header is now a permanent white bar, which read as a seam
 * against a dark hero; and the identity brief is a white-and-light-green
 * palette, with green reserved for emphasis.
 *
 * The dimensionality is built from real layers rather than a drop shadow on a
 * flat card — the photograph sits on a rotated plate, a stat plate overlaps its
 * lower-left corner, and a caption chip floats above both. Text sits *on* the
 * photograph, which is what the brief asked for.
 *
 * Server-rendered and visible on first paint. Motion is additive only.
 */
export function HeroSection() {
  return (
    <section className="scene relative isolate overflow-hidden bg-white">
      {/* Atmosphere: a light-green wash and a faint schematic grid. */}
      <div
        className="absolute inset-0 bg-[radial-gradient(75%_60%_at_88%_8%,rgb(226_248_234/0.95),transparent_62%),radial-gradient(60%_55%_at_-5%_85%,rgb(226_248_234/0.8),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="grid-field-light absolute inset-0 opacity-40" aria-hidden="true" />
      <SignalField className="absolute inset-0 h-full w-full text-signal-500 opacity-25" />

      <div className="shell relative z-10 pt-[calc(var(--header-h)+3.5rem)] pb-[var(--section-y-tight)]">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* ---- Copy ---------------------------------------------------- */}
          <div className="lg:col-span-6">
            <p className="eyebrow" data-enter>
              Bihar&apos;s electrical EPC &amp; automation group
            </p>

            <h1 className="display-1 mt-6" data-enter style={enterDelay(90)}>
              Powering India&apos;s
              <br />
              <span className="text-signal-700">infrastructure</span>
            </h1>

            <p className="lede mt-7 max-w-[34rem]" data-enter style={enterDelay(180)}>
              Substation EPC, telemetry and protection engineering for the utilities, railways and
              contractors building the country&apos;s power network.
            </p>

            <p
              className="mt-6 flex flex-wrap items-baseline gap-x-2 font-display text-[1.0625rem] font-semibold text-ink-900"
              data-enter
              style={enterDelay(250)}
            >
              <span className="text-ink-500">Engineered for</span>
              <RotatingWord
                className="text-signal-700"
                words={[
                  "distribution utilities",
                  "Indian Railways",
                  "EPC contractors",
                  "smart grid operators",
                  "industrial estates",
                ]}
              />
            </p>

            <div
              className="mt-10 flex flex-col gap-3 sm:flex-row"
              data-enter
              style={enterDelay(330)}
            >
              <Magnetic>
                <Link href="/business-verticals" className="btn btn-signal">
                  Explore our capability
                  <Icon name="arrow-right" size={16} />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/projects" className="btn btn-line">
                  View project record
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* ---- The stack ----------------------------------------------- */}
          <div className="lg:col-span-6">
            <div
              className="relative mx-auto max-w-[36rem] lg:mr-0 lg:max-w-none"
              data-enter
              style={enterDelay(200)}
            >
              {/* Plate 1: the photograph, rotated a degree off-axis. */}
              <div className="zoom-frame plate group relative aspect-[4/5] overflow-hidden rounded-[1.25rem] p-0 [transform:rotateY(-3deg)_rotateX(1.5deg)] sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src="/img/field/substation-crew.jpg"
                  alt="Morlatis line crew working on an 11 kV distribution structure"
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 44vw"
                  className="zoom-media object-cover object-top"
                />
                <div className="media-scrim" aria-hidden="true" />

                {/*
                  Text inside the image. The bottom padding steps up from `sm`,
                  which is where the stat plate appears: the plate overhangs the
                  photograph's lower-left corner, and without the clearance it
                  sits on top of the last line of this caption.
                */}
                <div className="absolute inset-x-0 bottom-0 p-7 pb-7 sm:p-8 sm:pb-[7.5rem]">
                  <span className="media-chip">Live network · 11 kV</span>
                  <p className="display-3 mt-4 !text-[clamp(1.375rem,2.4vw,1.875rem)] text-white">
                    Energised, tested and handed over on the utility&apos;s terms.
                  </p>
                </div>
              </div>

              {/* Plate 2: the overlapping stat, floating clear of the photo. */}
              <div className="plate absolute -bottom-8 -left-4 hidden w-[15rem] p-5 [transform:translateZ(60px)_rotateY(4deg)] sm:block lg:-left-10">
                <p className="numeral text-[2.5rem] text-signal-700">
                  <CountUp value={5000} suffix="+" />
                </p>
                <p className="mt-2 text-[0.8125rem] font-semibold text-ink-900">
                  Electrification works
                </p>
                <p className="text-[0.75rem] text-ink-500">Delivered across India</p>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Metric strip ---------------------------------------------- */}
        <dl
          className="mt-20 grid gap-4 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4"
          data-enter
          style={enterDelay(420)}
        >
          {metrics.map((m) => (
            <div key={m.label} className="plate lift-3d px-6 py-7">
              <dd className="numeral text-[clamp(1.875rem,3vw,2.625rem)] text-ink-950">
                <CountUp
                  value={m.value}
                  decimals={m.decimals}
                  prefix={m.prefix}
                  suffix={m.suffix}
                />
              </dd>
              <dt className="mt-3">
                <span className="block text-[0.875rem] font-semibold text-ink-900">{m.label}</span>
                <span className="mt-0.5 block text-[0.8125rem] text-ink-500">{m.note}</span>
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

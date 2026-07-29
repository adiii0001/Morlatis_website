import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Magnetic } from "@/components/ui/magnetic";
import { CountUp } from "@/components/ui/count-up";
import { RotatingWord } from "@/components/ui/rotating-word";
import { GridScene, SignalField } from "@/components/visuals/grid-scene";
import { fillLastRow } from "@/lib/grid";
import { metrics } from "@/content/company";

const enterDelay = (ms: number): React.CSSProperties =>
  ({ "--enter-delay": `${ms}ms` }) as React.CSSProperties;

/**
 * Hero.
 *
 * Server-rendered and visible on first paint — the previous hero mounted at
 * opacity:0 and depended on a 3.1s GSAP chain to become visible, which made the
 * largest element on the page invisible to LCP and to any user whose JS failed.
 * Motion here is additive only.
 *
 * The stage is the brand green run dark-to-light across the page: the copy
 * sits on the deep teal end, where white clears AA comfortably, and the
 * corridor artwork gets the bright end it needs to read against.
 */
export function HeroSection() {
  return (
    <section className="stage relative isolate min-h-[44rem] overflow-hidden lg:min-h-[100dvh]">
      {/* Atmosphere: grid field, horizon glow, corridor, drifting nodes. */}
      <div className="grid-field absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_80%_at_78%_88%,rgb(255_255_255/0.20),transparent_58%),radial-gradient(90%_70%_at_12%_-10%,rgb(0_70_50/0.55),transparent_60%)]"
        aria-hidden="true"
      />
      <GridScene className="absolute inset-x-0 bottom-0 h-[62%] w-full text-white/25 opacity-[0.55] lg:h-[74%]" />
      <SignalField className="absolute inset-0 h-full w-full opacity-70" />
      {/* Left scrim: guarantees text contrast over the corridor without
          dimming the artwork on the right. */}
      <div
        className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#00563C] via-[#00563C]/85 to-transparent lg:w-[62%]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/25 to-transparent"
        aria-hidden="true"
      />

      <div className="shell relative z-10 flex min-h-[44rem] flex-col pt-[calc(var(--header-h)+3rem)] pb-10 lg:min-h-[100dvh] lg:pb-12">
        <div className="flex flex-1 items-center">
          <div className="max-w-[56rem]">
            {/* Above the fold: time-based entrance with stagger. A view()
                timeline would already be past its range here and show no
                motion at all. */}
            <p className="eyebrow eyebrow-invert" data-enter>
              Bihar&apos;s electrical EPC &amp; automation group
            </p>

            <h1 className="display-1 mt-7 text-white" data-enter style={enterDelay(90)}>
              Powering India&apos;s
              <br />
              <span className="text-signal-200">infrastructure</span>
            </h1>

            <p
              className="lede mt-8 max-w-[34rem] text-white/85"
              data-enter
              style={enterDelay(180)}
            >
              Substation EPC, telemetry and protection engineering for the utilities, railways and
              contractors building the country&apos;s power network.
            </p>

            <p
              className="mt-6 flex flex-wrap items-baseline gap-x-2 font-display text-[1.0625rem] font-semibold text-white"
              data-enter
              style={enterDelay(250)}
            >
              <span className="text-white/60">Engineered for</span>
              <RotatingWord
                className="text-signal-200"
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
                <Link href="/business-verticals" className="btn btn-paper">
                  Explore our capability
                  <Icon name="arrow-right" size={16} />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/projects" className="btn btn-line-invert">
                  View project record
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Metric strip — the five hero statistics the spec called for and the
            previous build omitted entirely. */}
        <div className="mt-14 border-t border-white/10 pt-8" data-enter style={enterDelay(420)}>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`border-l border-white/12 pl-4 ${fillLastRow(metrics.length, i, {
                  base: 2,
                  sm: 3,
                  lg: 5,
                })}`}
              >
                <dd className="numeral text-[clamp(1.75rem,3vw,2.5rem)] text-white">
                  <CountUp
                    value={m.value}
                    decimals={m.decimals}
                    prefix={m.prefix}
                    suffix={m.suffix}
                  />
                </dd>
                <dt className="mt-2">
                  <span className="block text-[0.8125rem] font-semibold text-white">
                    {m.label}
                  </span>
                  <span className="mt-0.5 block text-[0.75rem] text-white/60">{m.note}</span>
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>

    </section>
  );
}

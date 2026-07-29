import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { verticals } from "@/content/verticals";

/**
 * Business ecosystem.
 *
 * A capability index rather than eight identical cards. Each vertical is a
 * full-bleed row that inverts on hover — closer to how an annual report
 * indexes a group's operating segments, and it gives each vertical the width
 * its name deserves instead of squeezing "RTU · FRTU · SCADA Engineering" into
 * a 280px card.
 */
export function EcosystemSection() {
  return (
    <section className="section bg-paper-warm">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[38rem]">
            <p className="eyebrow" data-reveal>
              The ecosystem
            </p>
            <h2 className="display-2 mt-6" data-reveal>
              Eight verticals, one engineering discipline.
            </h2>
          </div>
          <p className="lede max-w-[24rem]" data-reveal>
            Each vertical stands on its own commercially and shares the same field teams, safety
            regime and quality process.
          </p>
        </div>

        <ul className="mt-14 border-t border-line-strong">
          {verticals.map((v) => (
            <li
              key={v.slug}
              data-reveal
            >
              <Link
                href={`/business-verticals/${v.slug}`}
                className="group relative grid grid-cols-[1fr_auto] items-center gap-x-5 gap-y-2 border-b border-line py-7 transition-colors duration-300 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_auto] md:gap-x-10"
              >
                {/* Ink wash that sweeps in from the left on hover. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 -inset-x-[var(--gutter)] -z-10 origin-left scale-x-0 bg-ink-950 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />

                <span className="flex items-center gap-4">
                  <Icon
                    name={v.icon}
                    size={26}
                    className="hidden shrink-0 text-ink-500 transition-colors duration-300 group-hover:text-signal-500 md:block"
                  />
                  <span className="display-3 !text-[clamp(1.375rem,2.2vw,1.875rem)] text-ink-950 transition-colors duration-300 group-hover:text-white">
                    {v.title}
                  </span>
                </span>

                <span className="col-span-2 text-[0.9375rem] text-ink-500 transition-colors duration-300 group-hover:text-ink-300 md:col-span-1">
                  {v.summary}
                </span>

                <span className="hidden h-11 w-11 items-center justify-center rounded-full border border-line text-ink-500 transition-all duration-300 group-hover:border-signal-500 group-hover:bg-signal-500 group-hover:text-ink-950 md:flex">
                  <Icon name="arrow-up-right" size={17} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { credentials, statesOfOperation } from "@/content/company";

/**
 * About.
 *
 * Asymmetric 5/7 grid, top-aligned. The previous version used a symmetric
 * two-column grid with `items-center`, which vertically centred a 500px column
 * against an 800px one and produced ~150px of dead space above and below the
 * shorter side — the whitespace visible in the original screenshots.
 */
export function AboutSection() {
  return (
    <section className="section relative overflow-hidden bg-white">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: the statement */}
          <div className="lg:col-span-5">
            <p className="eyebrow" data-reveal>
              About the Group
            </p>
            <h2 className="display-2 mt-6" data-reveal>
              Eight years from a contracting firm to a{" "}
              <span className="text-signal-700">multi-vertical</span> engineering group.
            </h2>

            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4" data-reveal>
              <div>
                <p className="numeral text-[2.25rem] text-ink-950">2018</p>
                <p className="mt-1 text-[0.8125rem] text-ink-500">Founded in Patna</p>
              </div>
              <div>
                <p className="numeral text-[2.25rem] text-ink-950">7</p>
                <p className="mt-1 text-[0.8125rem] text-ink-500">Business verticals</p>
              </div>
              <div>
                <p className="numeral text-[2.25rem] text-ink-950">
                  {statesOfOperation.length}
                </p>
                <p className="mt-1 text-[0.8125rem] text-ink-500">
                  {statesOfOperation.join(" · ")}
                </p>
              </div>
            </div>
          </div>

          {/* Right: the substance */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="space-y-5" data-reveal>
              <p className="lede">
                Morlatis began in 2018 as a focused electrical contracting venture serving Bihar&apos;s
                distribution utilities. It now spans substation EPC, telemetry and protection
                engineering, railway electrical works, material supply and commodity trading —
                alongside the Vasudhaara Foundation, the Group&apos;s CSR arm.
              </p>
              <p className="text-ink-600">
                The through-line is unchanged: work that has to be energised, tested and handed over
                on a live network, where the acceptance criteria are written by the utility rather
                than by us.
              </p>
            </div>

            <div className="mt-11" data-reveal>
              <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-500">
                Registrations &amp; empanelment
              </h3>
              <ul className="mt-5">
                {credentials.map((c) => (
                  <li
                    key={c.title}
                    className="flex items-start gap-4 border-t border-line py-4 last:border-b"
                    data-reveal
                  >
                    <Icon name="check" size={16} className="mt-1 shrink-0 text-signal-600" />
                    <div className="min-w-0">
                      <p className="text-[0.9375rem] font-semibold text-ink-900">{c.title}</p>
                      <p className="mt-0.5 text-[0.875rem] text-ink-500">{c.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/about/who-we-are" className="link-rule mt-8" data-reveal>
              Read the full company profile
              <Icon name="arrow-right" size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

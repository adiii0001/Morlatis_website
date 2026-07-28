import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Magnetic } from "@/components/ui/magnetic";
import { GridScene } from "@/components/visuals/grid-scene";
import { company } from "@/content/company";

/**
 * Closing CTA.
 *
 * The previous homepage ended on a project grid with no conversion path at all
 * — a visitor who read the whole page was offered nothing. This closes the arc
 * and mirrors the hero so the page reads as one composition.
 */
export function ContactCtaSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-white">
      <div className="grid-field absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(90%_70%_at_20%_100%,rgb(244_160_25/0.14),transparent_60%)]"
        aria-hidden="true"
      />
      <GridScene className="absolute inset-x-0 bottom-0 h-[70%] w-full opacity-25" />
      {/* Scrim: the corridor stays as atmosphere, the copy stays readable. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/92 to-ink-950/70"
        aria-hidden="true"
      />

      <div className="shell relative section">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow eyebrow-invert" data-reveal>
              Start a conversation
            </p>
            <h2 className="display-2 mt-6 text-white" data-reveal>
              Tell us what needs to be energised.
            </h2>
            <p className="lede mt-7 max-w-[32rem] text-ink-300" data-reveal>
              Tenders, turnkey scope, automation retrofits or material supply — send the
              specification and we will come back with a technical response, not a brochure.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-reveal>
              <Magnetic>
                <Link href="/contact" className="btn btn-signal">
                  Request a quote
                  <Icon name="arrow-right" size={16} />
                </Link>
              </Magnetic>
              <Magnetic>
                <a href={`mailto:${company.projectsEmail}`} className="btn btn-line-invert">
                  {company.projectsEmail}
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <dl className="space-y-px" data-reveal>
              {[
                { label: "Head office", value: `${company.headquarters}, India`, icon: "pin" as const },
                { label: "Telephone", value: company.phone, icon: "phone" as const },
                { label: "General enquiries", value: company.email, icon: "mail" as const },
                { label: "Business hours", value: company.hours, icon: "clock" as const },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 border-t border-white/10 py-5 last:border-b"
                >
                  <Icon name={item.icon} size={17} className="mt-0.5 shrink-0 text-signal-500" />
                  <div>
                    <dt className="text-[0.6875rem] uppercase tracking-[0.16em] text-ink-400">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-[0.9375rem] text-white">{item.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

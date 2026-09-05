import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { fillLastRow } from "@/lib/grid";
import { verticals } from "@/content/verticals";

/**
 * Business ecosystem.
 *
 * Was a flat index of full-bleed rows that inverted to near-black on hover.
 * Rebuilt as a grid of raised plates so the section carries the same depth as
 * the rest of the page, and so the verticals that have field photography can
 * show it with the title set over the image rather than beneath it.
 *
 * Verticals without a photograph get a schematic plate instead of a grey box —
 * the icon on a light-green field. That is a deliberate second treatment, not a
 * placeholder.
 */
export function EcosystemSection() {
  return (
    <section className="scene section bg-paper-mint">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[38rem]">
            <p className="eyebrow" data-reveal>
              The ecosystem
            </p>
            <h2 className="display-2 mt-6" data-reveal>
              {verticals.length} verticals, one engineering discipline.
            </h2>
          </div>
          <p className="lede max-w-[24rem]" data-reveal>
            Each vertical stands on its own commercially and shares the same field teams, safety
            regime and quality process.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {verticals.map((v, i) => (
            <li
              key={v.slug}
              className={fillLastRow(verticals.length, i, { sm: 2, lg: 3 })}
              data-reveal-scale
            >
              <Link
                href={`/business-verticals/${v.slug}`}
                className="group plate lift-3d zoom-frame flex h-full flex-col overflow-hidden"
              >
                {v.image ? (
                  <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
                    <Image
                      src={v.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                      className="zoom-media object-cover"
                    />
                    <div className="media-scrim" aria-hidden="true" />
                    <h3 className="title absolute inset-x-0 bottom-0 p-6 text-white">{v.title}</h3>
                  </div>
                ) : (
                  <div className="relative flex aspect-[16/10] shrink-0 items-center justify-center overflow-hidden bg-[linear-gradient(150deg,#e8f6ee_0%,#ffffff_60%,#e2f8ea_100%)]">
                    <div
                      className="grid-field-light absolute inset-0 opacity-60"
                      aria-hidden="true"
                    />
                    <Icon
                      name={v.icon}
                      size={54}
                      className="relative text-signal-600 drop-shadow-[0_10px_18px_rgb(0_61_44/0.22)] transition-transform duration-500 group-hover:scale-110"
                    />
                    <h3 className="title absolute inset-x-0 bottom-0 p-6 text-ink-950">{v.title}</h3>
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.9375rem] leading-relaxed text-ink-600">{v.summary}</p>
                  <span className="link-rule mt-5 self-start">
                    {v.status === "forming" ? "In formation" : "Explore"}
                    <Icon name="arrow-right" size={14} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

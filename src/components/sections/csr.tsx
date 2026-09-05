import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { fillLastRow } from "@/lib/grid";
import { foundation, pillars } from "@/content/csr";

/**
 * CSR band.
 *
 * The Foundation used to be listed as the Group's seventh "business vertical",
 * beside commodity trading and strategic sourcing. It does not trade, and
 * indexing it that way misrepresented both it and the commercial arms. It now
 * has its own band here and its own page at /csr.
 */
export function CsrSection() {
  return (
    <section className="stage-deep scene section relative overflow-hidden text-white">
      <div className="grid-field absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(65%_55%_at_15%_0%,rgb(255_255_255/0.16),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow eyebrow-invert" data-reveal>
              Corporate social responsibility
            </p>
            <h2 className="display-2 mt-6 text-white" data-reveal>
              {foundation.shortName}
            </h2>
            <p className="mt-5 font-display text-[1.0625rem] font-semibold text-signal-200" data-reveal>
              {foundation.tagline}
            </p>
            <p className="lede mt-7 text-white/80" data-reveal>
              {foundation.lede}
            </p>

            <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-5" data-reveal>
              <div>
                <dt className="text-[0.6875rem] uppercase tracking-[0.16em] text-white/60">
                  Established
                </dt>
                <dd className="numeral mt-1.5 text-[1.75rem] text-white">
                  {foundation.established}
                </dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] uppercase tracking-[0.16em] text-white/60">
                  Focus regions
                </dt>
                <dd className="mt-2 text-[0.9375rem] text-white">{foundation.regions}</dd>
              </div>
            </dl>

            <Link href="/csr" className="btn btn-paper mt-10" data-reveal>
              Inside the Foundation
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="grid gap-4 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <li
                  key={p.title}
                  className={`plate-invert lift-3d p-6 ${fillLastRow(pillars.length, i, { sm: 2 })}`}
                  data-reveal-scale
                >
                  <Icon name={p.icon} size={26} className="text-signal-300" />
                  <h3 className="title mt-4 text-white">{p.title}</h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-white/70">{p.tagline}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

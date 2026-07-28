import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { clients } from "@/content/company";

/**
 * Clients & recognition.
 *
 * The awards previously listed here were invented — ten specific honours
 * attributed to ten named third-party bodies. They have been removed. This
 * section carries the verifiable position (client base, sectors served,
 * empanelment) and links to an Awards page that states the recognition count
 * without fabricating citations.
 */
export function RecognitionSection() {
  const sectors = Array.from(new Set(clients.map((c) => c.sector)));

  return (
    <section className="section bg-white">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow" data-reveal>
              Clients &amp; recognition
            </p>
            <h2 className="display-2 mt-6" data-reveal>
              Judged by who re-appoints us.
            </h2>
            <p className="lede mt-6" data-reveal>
              State distribution utilities, Indian Railways, Power Grid and national EPC contractors
              across {sectors.length} sectors.
            </p>

            <div className="mt-9 flex gap-4" data-reveal>
              <Link href="/clients" className="btn btn-line">
                Client list
              </Link>
              <Link href="/awards" className="btn btn-line">
                Recognition
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {clients.map((c) => (
                <li
                  key={c.name}
                  className="group bg-white px-5 py-6 transition-colors duration-300 hover:bg-paper-cool"
                  data-reveal
                >
                  <p className="font-display text-[1.0625rem] font-bold tracking-[-0.03em] text-ink-900">
                    {c.name}
                  </p>
                  <p className="mt-1 text-[0.75rem] leading-snug text-ink-500">{c.full}</p>
                  <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-500 transition-colors group-hover:text-signal-700">
                    {c.sector}
                  </p>
                </li>
              ))}
            </ul>

            <div
              className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-xl border border-line bg-paper-cool px-6 py-5"
              data-reveal
            >
              <Icon name="shield" size={22} className="shrink-0 text-signal-600" />
              <p className="text-[0.9375rem] text-ink-700">
                Registered government electrical contractor · Indian Railways vendor · MSTC
                authorised · PHED Class-2
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

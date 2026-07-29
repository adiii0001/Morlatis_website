import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { clients } from "@/content/company";
import { fillLastRow } from "@/lib/grid";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "Morlatis Group serves state distribution utilities, Indian Railways, Power Grid Corporation and national EPC contractors including L&T, Sterling & Wilson and Ashoka Buildcon.",
  alternates: { canonical: "/clients" },
};

export default function ClientsPage() {
  const sectors = Array.from(new Set(clients.map((c) => c.sector)));

  return (
    <>
      <PageHeader
        eyebrow="Clients"
        title="Judged by who re-appoints us."
        lede="Utilities, public infrastructure owners and EPC majors across four states."
        align="wide"
      />

      <section className="section bg-white">
        <div className="shell">
          {sectors.map((sector) => {
            const group = clients.filter((c) => c.sector === sector);
            return (
              <div key={sector} className="mb-16 last:mb-0">
                <div className="flex items-baseline gap-4">
                  <h2 className="display-3 !text-[clamp(1.375rem,2.2vw,1.75rem)]">{sector}</h2>
                  <span className="font-mono text-[0.75rem] text-ink-500">
                    {String(group.length).padStart(2, "0")}
                  </span>
                  <span className="hidden h-px flex-1 bg-line sm:block" />
                </div>

                {/*
                  Sector groups run from one to three names, so a fixed
                  four-column grid left a grey hole in almost every band. The
                  last tile absorbs the shortfall instead, and its contents sit
                  on one line once it is wide enough to hold them.
                */}
                <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                  {group.map((c, i) => (
                    <li
                      key={c.name}
                      className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 bg-white px-6 py-7 ${fillLastRow(
                        group.length,
                        i,
                        { sm: 2, lg: 4 }
                      )}`}
                      data-reveal
                    >
                      <p className="font-display text-[1.125rem] font-bold tracking-[-0.02em] text-ink-950">
                        {c.name}
                      </p>
                      <p className="text-[0.8125rem] leading-snug text-ink-500">{c.full}</p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <p className="mt-4 max-w-[42rem] text-[0.875rem] leading-relaxed text-ink-500" data-reveal>
            Contract references, completion certificates and performance records are provided during
            tender pre-qualification rather than published.
          </p>
        </div>
      </section>
    </>
  );
}

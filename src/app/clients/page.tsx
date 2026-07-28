import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { clients } from "@/content/company";

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

                <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                  {group.map((c) => (
                    <li
                      key={c.name}
                      className="bg-white px-6 py-7"
                      data-reveal
                    >
                      <p className="font-display text-[1.125rem] font-bold tracking-[-0.03em] text-ink-950">
                        {c.name}
                      </p>
                      <p className="mt-1.5 text-[0.8125rem] leading-snug text-ink-500">{c.full}</p>
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

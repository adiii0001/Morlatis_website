import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Icon } from "@/components/ui/icon";
import { verticals } from "@/content/verticals";

export const metadata: Metadata = {
  title: "Business Verticals",
  description:
    "Seven verticals: Electrical EPC, RTU/FRTU/SCADA engineering, relay retrofitting, railway electrical works, material supply, commodity trading and the Vasudhaara Foundation.",
  alternates: { canonical: "/business-verticals" },
};

export default function BusinessVerticalsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Capability"
        title="Seven verticals, one engineering discipline."
        lede="Each stands on its own commercially and shares the same field teams, safety regime and quality process."
        align="wide"
      />

      <section className="section bg-white">
        <div className="shell">
          <ul className="border-t border-line-strong">
            {verticals.map((v) => (
              <li
                key={v.slug}
                data-reveal
              >
                <Link
                  href={`/business-verticals/${v.slug}`}
                  className="group grid gap-x-8 gap-y-4 border-b border-line py-9 lg:grid-cols-12"
                >
                  <div className="flex items-start gap-5 lg:col-span-5">
                    <span className="mt-1.5 font-mono text-[0.75rem] tracking-widest text-ink-500 transition-colors group-hover:text-signal-600">
                      {v.index}
                    </span>
                    <div>
                      <h2 className="display-3 !text-[clamp(1.5rem,2.4vw,2rem)] text-ink-950 transition-colors group-hover:text-signal-700">
                        {v.title}
                      </h2>
                      <p className="mt-2 text-[0.9375rem] text-ink-500">{v.summary}</p>
                    </div>
                  </div>

                  <p className="text-[0.9375rem] leading-relaxed text-ink-600 lg:col-span-5">
                    {v.lede}
                  </p>

                  <div className="flex items-start lg:col-span-2 lg:justify-end">
                    <span className="link-rule">
                      Detail
                      <Icon name="arrow-right" size={14} />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Icon } from "@/components/ui/icon";
import { verticals } from "@/content/verticals";

export const metadata: Metadata = {
  title: "Business Verticals",
  description:
    "Eight verticals: Electrical EPC, RTU/FRTU/SCADA engineering, relay retrofitting, railway electrical works, strategic sourcing, commodity trading, the Vasudhaara Foundation and real estate.",
  alternates: { canonical: "/business-verticals" },
};

export default function BusinessVerticalsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Capability"
        title="Eight verticals, one engineering discipline."
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
                    <Icon
                      name={v.icon}
                      size={26}
                      className="mt-1 hidden shrink-0 text-ink-400 transition-colors group-hover:text-signal-600 sm:block"
                    />
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

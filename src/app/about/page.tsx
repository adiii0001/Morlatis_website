import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Icon } from "@/components/ui/icon";
import { metrics } from "@/content/company";

export const metadata: Metadata = {
  title: "About",
  description:
    "Morlatis Group of Companies — a multi-vertical electrical engineering and automation group founded in 2018 and headquartered in Patna, Bihar.",
  alternates: { canonical: "/about" },
};

const sections = [
  {
    href: "/about/who-we-are",
    title: "Who We Are",
    body: "Capability, scale, registrations and operating footprint.",
  },
  {
    href: "/about/our-story",
    title: "Our Story",
    body: "How the Group formed, what the name and mark stand for, and the route from 2018 to today.",
  },
  {
    href: "/about/vision-mission",
    title: "Vision · Mission · Values",
    body: "The principles that govern how scope is priced, executed and handed over.",
  },
  {
    href: "/about/morlatis-industries",
    title: "Morlatis Industries",
    body: "The metal recycling arm — copper and aluminium scrap processed into high-purity ingot at Barun, Gaya.",
  },
  {
    href: "/about/vasudhaara-foundation",
    title: "Vasudhaara Foundation",
    body: "The Group's CSR arm, working across education, healthcare, agriculture and community.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the Group"
        title="A multi-vertical engineering group, eight years in."
        lede="Founded in Patna in 2018, Morlatis now spans substation EPC, automation, railway electrical works, material supply and commodity trading."
        align="wide"
      />

      <section className="border-b border-line bg-white">
        <div className="shell">
          <dl className="grid grid-cols-2 gap-px overflow-hidden bg-line sm:grid-cols-3 lg:grid-cols-5">
            {metrics.map((m) => (
              <div key={m.label} className="bg-white px-1 py-8">
                <dd className="numeral text-[2rem] text-ink-950">
                  {m.prefix}
                  {m.value.toFixed(m.decimals)}
                  {m.suffix}
                </dd>
                <dt className="mt-2 text-[0.8125rem] font-semibold text-ink-800">{m.label}</dt>
                <p className="mt-0.5 text-[0.75rem] text-ink-500">{m.note}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section bg-white">
        <div className="shell">
          <ul className="border-t border-line-strong">
            {sections.map((s, i) => (
              <li
                key={s.href}
                data-reveal
              >
                <Link
                  href={s.href}
                  className="group grid items-baseline gap-x-8 gap-y-2 border-b border-line py-8 lg:grid-cols-12"
                >
                  <span className="font-mono text-[0.75rem] tracking-widest text-ink-500 transition-colors group-hover:text-signal-600 lg:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="display-3 !text-[clamp(1.375rem,2.2vw,1.875rem)] text-ink-950 transition-colors group-hover:text-signal-700 lg:col-span-4">
                    {s.title}
                  </h2>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-600 lg:col-span-6">
                    {s.body}
                  </p>
                  <span className="flex lg:col-span-1 lg:justify-end">
                    <Icon
                      name="arrow-up-right"
                      size={18}
                      className="text-ink-500 transition-colors group-hover:text-signal-600"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

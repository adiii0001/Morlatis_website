import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { fillLastRow } from "@/lib/grid";
import { WealthCalculator } from "@/components/equifin/wealth-calculator";

/**
 * Morlatis Equifin — the vertical-specific blocks.
 *
 * Kept out of the shared [slug] route the way the EPC brochure blocks are:
 * this is the only vertical that is a financial-services business, and it is
 * the only one that needs a process ladder, an FAQ and a compliance footer.
 *
 * Content is taken verbatim in substance from the Equifin brief. The
 * compliance note there is binding on the copy: no guaranteed returns, no
 * performance claims, and the regulatory position stated plainly.
 */

const process = [
  { title: "Initial consultation", body: "Understanding the household or business, not just the portfolio." },
  { title: "Financial assessment", body: "Current position, obligations, liquidity and genuine risk tolerance." },
  { title: "Goal planning", body: "Naming what the money is for, and when it is needed." },
  { title: "Portfolio design", body: "An allocation built to that brief, with the rationale written down." },
  { title: "Investment execution", body: "Implementation at transparent cost, with every instruction documented." },
  { title: "Continuous monitoring", body: "Ongoing review against the plan rather than against the index." },
  { title: "Performance review", body: "Scheduled reporting in plain language, including what did not work." },
];

const why = [
  "Experienced investment professionals",
  "Personalised investment strategies",
  "Research-driven decisions",
  "Disciplined risk management",
  "Transparent reporting",
  "Client-centric approach",
  "Regular portfolio reviews",
  "Long-term wealth creation focus",
];

const faqs = [
  {
    q: "Who is Morlatis Equifin for?",
    a: "Individuals, families and businesses who want a planned approach to wealth rather than a product sale — typically those with a long horizon and a specific goal in mind.",
  },
  {
    q: "How is a portfolio constructed?",
    a: "From the financial assessment and the goals agreed in planning. The allocation, the reasoning behind it and the risks it carries are documented before anything is executed.",
  },
  {
    q: "How often will I hear from you?",
    a: "Portfolios are monitored continuously and reviewed on a scheduled basis. Reporting is written to be understood without a finance background.",
  },
  {
    q: "What does onboarding involve?",
    a: "An initial consultation, a documented financial assessment, and agreement on goals before any investment is made. Nothing is executed until the plan is signed off.",
  },
  {
    q: "How is risk managed?",
    a: "Through diversification, position sizing appropriate to the stated risk tolerance, and periodic rebalancing. Risk is disclosed up front, not explained after a drawdown.",
  },
  {
    q: "Do you guarantee returns?",
    a: "No. No one lawfully can. Investments in securities carry market risk, and past performance does not indicate future results. What we commit to is process, transparency and disclosure.",
  },
];

export function EquifinSections() {
  return (
    <>
      {/* ---- Calculator ------------------------------------------------- */}
      <section className="scene section border-t border-line bg-paper-mint">
        <div className="shell">
          <div className="max-w-[42rem]">
            <p className="eyebrow" data-reveal>
              Projection tool
            </p>
            <h2 className="display-3 mt-6" data-reveal>
              What a disciplined monthly contribution compounds into.
            </h2>
            <p className="lede mt-6" data-reveal>
              Move the three variables and watch contributed capital separate from growth. The
              assumption is yours to set — we publish the arithmetic, not a forecast.
            </p>
          </div>

          <div className="mt-12" data-reveal>
            <WealthCalculator />
          </div>
        </div>
      </section>

      {/* ---- Investment process ----------------------------------------- */}
      <section className="scene section border-t border-line bg-white">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="eyebrow" data-reveal>
                Investment process
              </p>
              <h2 className="display-3 mt-6" data-reveal>
                Seven stages, in this order, every time.
              </h2>
              <p className="lede mt-6" data-reveal>
                The sequence is the safeguard. Nothing is bought before the goal it is meant to
                serve has been written down.
              </p>
            </div>

            <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
              {process.map((s, i) => (
                <li
                  key={s.title}
                  className={`plate lift-3d p-6 ${fillLastRow(process.length, i, { sm: 2 })}`}
                  data-reveal-scale
                >
                  <h3 className="title text-ink-950">{s.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---- Why choose us ---------------------------------------------- */}
      <section className="stage-deep section relative overflow-hidden text-white">
        <div className="grid-field absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="shell relative">
          <div className="max-w-[38rem]">
            <p className="eyebrow eyebrow-invert" data-reveal>
              Why Equifin
            </p>
            <h2 className="display-3 mt-6 text-white" data-reveal>
              Unbiased advice, held to a documented process.
            </h2>
          </div>

          <ul className="mt-12 grid gap-x-10 gap-y-px sm:grid-cols-2">
            {why.map((w) => (
              <li
                key={w}
                className="flex items-center gap-3.5 border-b border-white/10 py-4 text-[0.9375rem] text-white/85"
                data-reveal
              >
                <Icon name="check" size={16} className="shrink-0 text-signal-300" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- FAQ --------------------------------------------------------- */}
      <section className="section border-t border-line bg-white">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="eyebrow" data-reveal>
                Questions
              </p>
              <h2 className="display-3 mt-6" data-reveal>
                Before you invest.
              </h2>
              <Link href="/contact" className="btn btn-signal mt-8" data-reveal>
                Schedule a consultation
                <Icon name="arrow-right" size={16} />
              </Link>
            </div>

            <dl className="lg:col-span-7 lg:col-start-6">
              {faqs.map((f) => (
                <div key={f.q} className="border-t border-line py-7 last:border-b" data-reveal>
                  <dt className="title text-ink-950">{f.q}</dt>
                  <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---- Compliance --------------------------------------------------- */}
      <section className="border-t border-line bg-paper-mint py-10">
        <div className="shell">
          <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-500">
            Regulatory &amp; risk disclosure
          </h2>
          <p className="mt-4 max-w-[62rem] text-[0.8125rem] leading-relaxed text-ink-500">
            Morlatis Equifin Private Limited provides wealth management and investment advisory
            services. Advisory activity is conducted under a SEBI Registered Investment Advisor
            (RIA). Investments in securities are subject to market risk; read all scheme-related
            documents carefully before investing. No return is guaranteed or assured, and past
            performance does not indicate future results. Nothing on this page constitutes an offer
            to buy or sell any security, or personalised investment advice.
          </p>
        </div>
      </section>
    </>
  );
}

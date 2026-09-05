import { timeline } from "@/content/company";

/**
 * Trajectory.
 *
 * A horizontal rail on desktop, a vertical one on mobile. Deliberately a
 * different rhythm from every other section — the page should not be six
 * variations of "centred heading over a card grid".
 */
export function TimelineSection() {
  return (
    <section className="section overflow-hidden bg-paper-mint">
      <div className="shell">
        <div className="max-w-[38rem]">
          <p className="eyebrow" data-reveal>
            Trajectory
          </p>
          <h2 className="display-2 mt-6" data-reveal>
            2018 to 5,000+ works energised.
          </h2>
          <p className="lede mt-6" data-reveal>
            Growth has come from adding engineering capability, not from adding headcount to the
            same scope.
          </p>
        </div>
      </div>

      {/* Full-bleed scroller: it sits outside .shell, so its inline padding has
          to reproduce the shell's alignment itself. */}
      <div className="mt-16 overflow-x-auto pb-4 [scrollbar-width:thin]" data-reveal>
        <ol className="flex w-max gap-0 px-[max(var(--gutter),calc((100vw-90rem)/2+var(--gutter)))]">
          {timeline.map((t) => (
            <li
              key={t.year}
              className="relative w-[17rem] shrink-0 pr-8 sm:w-[19rem]"
              data-reveal
            >
              {/* Rail */}
              <div className="relative flex items-center">
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                    "projected" in t && t.projected
                      ? "border-2 border-signal-500 bg-paper-mint"
                      : "bg-signal-500"
                  }`}
                />
                <span
                  className={`h-px flex-1 ${
                    "projected" in t && t.projected
                      ? "bg-[repeating-linear-gradient(90deg,var(--color-line-strong)_0_6px,transparent_6px_12px)]"
                      : "bg-line-strong"
                  }`}
                />
              </div>

              <p className="numeral mt-7 text-[2.75rem] text-ink-950">{t.year}</p>
              <h3 className="title mt-2 text-ink-900">{t.title}</h3>
              <p className="mt-3 pr-4 text-[0.9375rem] leading-relaxed text-ink-600">{t.body}</p>
              {"projected" in t && t.projected && (
                <p className="mt-4 inline-flex rounded-full border border-line-strong px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-500">
                  Target
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

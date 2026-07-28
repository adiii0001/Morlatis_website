import { clients } from "@/content/company";

/**
 * Trust band.
 *
 * CSS-driven marquee: GPU-composited, frame-rate independent and pausable on
 * hover and focus. The previous version mutated `style.transform` by 1px per
 * animation frame, so it ran at double speed on a 120 Hz display, jumped at the
 * loop point, and cloned its own DOM after mount.
 */
export function TrustSection() {
  const row = [...clients, ...clients];

  return (
    <section id="trust" className="section-tight border-b border-line bg-paper-cool">
      <div className="shell">
        <p className="eyebrow justify-center text-center" data-reveal>
          Trusted by India&apos;s utilities, railways and EPC majors
        </p>
      </div>

      <div className="marquee fade-edges mt-10 overflow-hidden" data-reveal>
        <div
          className="marquee-track items-center"
          style={{ "--marquee-duration": "56s" } as React.CSSProperties}
        >
          {row.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              /* aria-hidden on the duplicate half so screen readers hear the
                 list once, not twice. */
              aria-hidden={i >= clients.length}
              className="flex shrink-0 flex-col items-center gap-1 px-9"
            >
              <span className="whitespace-nowrap font-display text-[1.375rem] font-bold tracking-[-0.03em] text-ink-800">
                {client.name}
              </span>
              <span className="whitespace-nowrap text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">
                {client.sector}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

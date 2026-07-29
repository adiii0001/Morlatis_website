import { Icon, type IconName } from "@/components/ui/icon";

/**
 * The distribution chain — the brochure's "Work Style" diagram.
 *
 * The printed version snakes down one column and back up another; here the
 * seven stages run as a single left-to-right track on desktop, and a vertical
 * rail on mobile, which is the same information in a shape a browser can
 * actually hold.
 *
 * Note on ordering: the brochure numbers LT / 440 V as stage 04, ahead of the
 * distribution transformer. That is the reverse of how power actually flows —
 * an 11 kV feeder reaches the DSS/DTR, and LT is what leaves it. The sequence
 * below is the correct one.
 */

type Stage = { step: string; label: string; detail: string; icon: IconName };

const STAGES: Stage[] = [
  { step: "01", label: "Grid", detail: "Transmission source", icon: "tower" },
  { step: "02", label: "33 kV Line", detail: "Sub-transmission", icon: "pole" },
  { step: "03", label: "33/11 kV PSS", detail: "Power substation", icon: "transformer" },
  { step: "04", label: "11 kV Line", detail: "HT distribution", icon: "pole" },
  { step: "05", label: "DSS / DTR", detail: "Distribution transformer", icon: "transformer" },
  { step: "06", label: "LT Line · 440 V", detail: "Low-tension network", icon: "bolt" },
  { step: "07", label: "Consumer Meter", detail: "Point of supply", icon: "meter" },
];

export function PowerFlow({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <ol className="relative grid gap-y-7 md:grid-cols-7 md:gap-x-2 md:gap-y-0">
        {/* The track. Vertical on mobile, horizontal from md up — sitting behind
            the numbered pins, which carry their own background to punch it. */}
        <span
          aria-hidden="true"
          className="absolute left-[1.5625rem] top-3 bottom-3 w-px bg-line-strong md:left-0 md:right-0 md:top-[1.5625rem] md:bottom-auto md:h-px md:w-auto"
        />

        {STAGES.map((stage, i) => (
          <li
            key={stage.step}
            className="relative flex items-center gap-4 md:flex-col md:gap-0 md:text-center"
            data-reveal-scale
            style={{ "--i": i } as React.CSSProperties}
          >
            <span className="relative z-10 flex h-[3.125rem] w-[3.125rem] shrink-0 items-center justify-center rounded-full border-2 border-signal-600 bg-white font-nav text-[0.8125rem] font-bold text-signal-700">
              {stage.step}
            </span>

            <div className="md:mt-4">
              <Icon
                name={stage.icon}
                size={26}
                strokeWidth={1.3}
                className="hidden text-ink-700 md:mx-auto md:block"
              />
              <p className="font-nav text-[0.875rem] font-semibold leading-tight text-ink-950 md:mt-2.5">
                {stage.label}
              </p>
              <p className="mt-1 text-[0.75rem] leading-snug text-ink-500">{stage.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

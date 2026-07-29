import { Icon, type IconName } from "@/components/ui/icon";
import { LogoMark } from "@/components/brand/logo";

/**
 * Problem → solution.
 *
 * The brochure runs this as two facing radial diagrams — "Problems in Current
 * System" in red, "Solutions By Morlatis" in green, same six spokes on both.
 * Two diagrams the reader has to hold side by side is a print luxury; here the
 * pair is collapsed into one hub, with each spoke carrying the problem and the
 * answer to it in the same card.
 *
 * Three spokes left, hub centre, three right — the brochure's own arrangement,
 * which happens to be exactly a three-column grid.
 */

type Spoke = { icon: IconName; area: string; problem: string; solution: string };

const SPOKES: Spoke[] = [
  {
    icon: "search",
    area: "Field survey",
    problem: "Delayed — on-field engineers are stretched across too many sections.",
    solution: "We supply additional survey manpower, with the JEE / AEE / EEE's consent.",
  },
  {
    icon: "clock",
    area: "Work execution",
    problem: "Estimates run late and land inaccurate; hidden item costs surface afterwards.",
    solution: "Once the field survey is done, the fault is resolved within 24 hours.",
  },
  {
    icon: "crate",
    area: "Material",
    problem: "Disorganised storage, fabricated-material shortages, time lost in transport.",
    solution: "Material is staged in Morlatis stores; vetted vendors deliver on schedule.",
  },
  {
    icon: "shield",
    area: "Safety",
    problem: "Safety measures are inconsistent during live work.",
    solution: "Safety gear issued to every worker, with set precautions for pole erection.",
  },
  {
    icon: "gauge",
    area: "Data & sanctions",
    problem: "Off-section reports don't tally with actuals; manual routing delays sanction.",
    solution: "The field engineer reconciles data post-survey and the follow-up estimate runs without a queue.",
  },
  {
    icon: "check",
    area: "Billing",
    problem: "Post-completion approval is slow, and large division payments stall behind it.",
    solution: "Bills cleared and signed by every concerned officer in 2–3 days.",
  },
];

export function SolutionsHub({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-10">
        {SPOKES.slice(0, 3).map((s, i) => (
          <SpokeCard key={s.area} spoke={s} align="right" index={i} />
        ))}

        {/* The hub. Sits between the columns on desktop, first on mobile. */}
        <div className="order-first flex items-center justify-center lg:order-none lg:col-start-2 lg:row-span-3">
          <div className="relative flex h-40 w-40 flex-col items-center justify-center rounded-full border-2 border-signal-500 bg-white p-6 text-center shadow-[var(--lift-2)]">
            <LogoMark size={26} />
            <span className="mt-2 font-nav text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-signal-700">
              Solutions by
              <br />
              Morlatis
            </span>
          </div>
        </div>

        {SPOKES.slice(3).map((s, i) => (
          <SpokeCard key={s.area} spoke={s} align="left" index={i} />
        ))}
      </div>
    </div>
  );
}

function SpokeCard({
  spoke,
  align,
  index,
}: {
  spoke: Spoke;
  align: "left" | "right";
  index: number;
}) {
  return (
    <div
      className={`panel rounded-xl p-6 ${align === "right" ? "lg:col-start-1" : "lg:col-start-3"}`}
      data-reveal-scale
      style={{ "--i": index } as React.CSSProperties}
    >
      <div className="flex items-center gap-2.5">
        <Icon name={spoke.icon} size={17} className="shrink-0 text-signal-700" />
        <h3 className="font-nav text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink-950">
          {spoke.area}
        </h3>
      </div>

      <p className="mt-4 border-l-2 border-line-strong pl-3.5 text-[0.8125rem] leading-relaxed text-ink-500">
        {spoke.problem}
      </p>
      <p className="mt-3 border-l-2 border-signal-500 pl-3.5 text-[0.875rem] leading-relaxed text-ink-800">
        {spoke.solution}
      </p>
    </div>
  );
}

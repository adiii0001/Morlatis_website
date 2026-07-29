/**
 * The delivery workflow — the brochure's "Existing Working System of SBPDCL"
 * page, which alternates numbered pins left and right of a dotted spine.
 *
 * Reproduced as a centre-spine track on desktop and a single left-hand rail on
 * mobile, so the alternation never forces a horizontal squeeze.
 */

const STEPS = [
  { step: "01", title: "Work allotment", body: "Scope issued by the division and accepted against the work order." },
  { step: "02", title: "Material requisition", body: "Requisition slip raised and signed off by the JEE, AEE, EEE or store JE." },
  { step: "03", title: "Material drawn", body: "Material collected from the utility store against the approved requisition." },
  { step: "04", title: "Gate pass issued", body: "Movement documented before anything leaves the store premises." },
  { step: "05", title: "Work executed", body: "Site work carried out by the deployed gang under supervision and safety protocol." },
  { step: "06", title: "Work agreement", body: "Completion recorded and countersigned by the JEE, AEE and EEE." },
  { step: "07", title: "Bill submitted", body: "Signed bill lodged with the accounts officer with supporting measurement records." },
  { step: "08", title: "Payment released", body: "Certified bill cleared and payment processed by the division." },
];

export function WorkflowTrack({ className = "" }: { className?: string }) {
  return (
    <ol className={`relative ${className}`}>
      {/* The spine. Left rail on mobile, centred from lg up. */}
      <span
        aria-hidden="true"
        className="absolute left-[1.375rem] top-2 bottom-2 w-px border-l border-dashed border-line-strong lg:left-1/2 lg:-translate-x-1/2"
      />

      {STEPS.map((s, i) => {
        /*
         * Odd steps sit right of the spine, even steps left. Both the pin and
         * the copy are placed explicitly into row 1 of the item's own grid, so
         * each step's text exists exactly once in the DOM — the side it lands
         * on is a column assignment, not a second copy behind a `hidden` class.
         */
        const right = i % 2 === 1;
        return (
          <li
            key={s.step}
            className="relative grid grid-cols-[2.75rem_1fr] gap-x-5 pb-9 last:pb-0 lg:grid-cols-[1fr_2.75rem_1fr] lg:gap-x-8"
            data-reveal-scale
            style={{ "--i": i % 4 } as React.CSSProperties}
          >
            <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-signal-600 bg-white font-nav text-[0.75rem] font-bold text-signal-700 lg:col-start-2 lg:row-start-1">
              {s.step}
            </span>

            <div
              className={
                right
                  ? "lg:col-start-3 lg:row-start-1 lg:max-w-[26rem]"
                  : "lg:col-start-1 lg:row-start-1 lg:ml-auto lg:max-w-[26rem] lg:text-right"
              }
            >
              <h3 className="font-display text-[1.0625rem] font-bold leading-snug text-ink-950">
                {s.title}
              </h3>
              <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-600">{s.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

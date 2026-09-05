import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { DepthField } from "@/components/visuals/depth-field";
import { protocolStack } from "@/content/technology";

/**
 * The telemetry band.
 *
 * The one place on the site where the subject is the network as a whole rather
 * than a job on it, so it gets the depth field behind it: a volume of nodes
 * drifting toward the reader and linking to their neighbours as they pass. That
 * is what the work actually produces — a distribution network that reports
 * itself — and it is worth showing as something with depth you move through.
 */
export function NetworkDepthSection() {
  return (
    <section className="stage-deep relative isolate overflow-hidden text-white">
      <DepthField className="absolute inset-0 h-full w-full" />

      {/* Pulls the centre down so the heading holds against the brightest part
          of the field, where the near nodes carry their halo. */}
      <div
        className="absolute inset-0 bg-[radial-gradient(70%_75%_at_18%_45%,rgb(0_36_26/0.94),rgb(0_36_26/0.55)_55%,transparent_78%)]"
        aria-hidden="true"
      />

      <div className="shell section relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow eyebrow-invert" data-reveal-left>
              Grid intelligence
            </p>

            <h2 className="display-2 mt-6 text-white" data-reveal-left>
              A network that
              <br />
              reports itself.
            </h2>

            <p className="lede mt-7 text-white/80" data-reveal-left>
              Every feeder we automate stops being a line on a drawing and starts being a live data
              point — its state, its load and its faults visible from the control room the moment
              they happen.
            </p>

            <Link href="/business-verticals/rtu-scada" className="btn btn-signal mt-10">
              How the telemetry works
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {protocolStack.map((p, i) => (
              <li
                key={p.code}
                className="plate-invert lift-3d p-6"
                data-reveal-scale
                style={{ "--i": i } as React.CSSProperties}
              >
                <p className="font-mono text-[0.75rem] tracking-[0.1em] text-signal-300">{p.code}</p>
                <h3 className="mt-3 font-display text-[1.0625rem] font-semibold text-white">
                  {p.name}
                </h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-white/70">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

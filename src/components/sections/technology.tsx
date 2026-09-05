import { fillLastRow } from "@/lib/grid";
import { DepthField } from "@/components/visuals/depth-field";
import { protocolStack, capabilities } from "@/content/technology";

/**
 * Technology.
 *
 * The section that was entirely absent before. It is the one place the site
 * demonstrates engineering rather than asserting it: the protocols the Group
 * builds against, named and explained.
 *
 * The depth field sits behind it — a volume of linked nodes drifting toward the
 * reader. This is the band it belongs to: the subject here is interoperability
 * across a mixed-vendor estate, which is a network with depth, not a texture.
 * The flat schematic grid it replaces stays as a second layer, well down, so
 * the drawing-office language does not disappear entirely.
 */
export function TechnologySection() {
  return (
    <section className="stage-deep section relative overflow-hidden text-white">
      <DepthField className="absolute inset-0 h-full w-full" />
      <div className="grid-field absolute inset-0 opacity-30" aria-hidden="true" />

      {/* Holds the left column legible over the moving field. */}
      <div
        className="absolute inset-0 bg-[radial-gradient(60%_80%_at_10%_50%,rgb(0_58_43/0.9),rgb(0_58_43/0.34)_55%,transparent_78%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_0%,rgb(255_255_255/0.12),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow eyebrow-invert" data-reveal>
              Technology
            </p>
            <h2 className="display-2 mt-6 text-white" data-reveal>
              We engineer to the standard, not to the brochure.
            </h2>
            <p className="lede mt-7 text-white/80" data-reveal>
              Distribution networks are mixed-vendor estates assembled over decades. Interoperability
              is not a feature we advertise — it is the constraint every scheme has to satisfy before
              a utility will accept it.
            </p>

            <ul className="mt-11 space-y-px" data-reveal>
              {protocolStack.map((p) => (
                <li
                  key={p.code}
                  className="group grid grid-cols-[8.5rem_1fr] items-baseline gap-4 border-t border-white/10 py-5 last:border-b"
                >
                  <span className="font-mono text-[0.8125rem] tracking-wide text-signal-200">
                    {p.code}
                  </span>
                  <span>
                    <span className="block text-[0.9375rem] font-semibold text-white">
                      {p.name}
                    </span>
                    <span className="mt-1 block text-[0.875rem] leading-relaxed text-white/65">
                      {p.body}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {capabilities.map((c, i) => (
                <div
                  key={c.title}
                  className={`bg-[#00402f] p-7 transition-colors duration-300 hover:bg-[#00523b] ${fillLastRow(capabilities.length, i, { sm: 2 })}`}
                  data-reveal
                >
                  <h3 className="title text-white">{c.title}</h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-white/70">{c.body}</p>
                  <ul className="mt-5 space-y-2">
                    {c.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-center gap-2.5 text-[0.8125rem] text-white/75"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-signal-300" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

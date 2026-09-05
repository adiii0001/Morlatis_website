import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { LogoMark } from "@/components/brand/logo";
import { timeline } from "@/content/company";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "How Morlatis Group formed in 2018, what the mark stands for, and the route from electrical contracting to an eight-vertical engineering group.",
  alternates: { canonical: "/about/our-story" },
};

/*
 * NOTE ON THE NAME
 * The previous copy claimed "Morlatis" derives from the Latin `morator`,
 * "one who does not delay". That is the opposite of what the word means —
 * `morator` is a delayer. The claim has been removed rather than corrected,
 * because the real origin is the company's to state. Supply it and this
 * section can carry it.
 */

export default function OurStoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="From one contracting licence to a multi-vertical group."
        breadcrumb={{ label: "About", href: "/about" }}
        align="wide"
      />

      <section className="section bg-white">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="display-3">The beginning</h2>
              <div className="mt-6 space-y-5">
                <p className="lede">
                  Morlatis started in 2018 with a single premise: Bihar&apos;s distribution network
                  needed contractors who could be trusted with energised assets, and who would still
                  be reachable a year after handover.
                </p>
                <p className="text-ink-600">
                  The first work was line and substation scope for the state distribution companies.
                  It is unglamorous, heavily specified, and entirely unforgiving — a substation is
                  either commissioned to the utility&apos;s satisfaction or it is not. That standard
                  set the operating culture, and every vertical added since has been held to it.
                </p>
                <p className="text-ink-600">
                  Automation followed, because utilities that could not see their own feeders could
                  not operate them. Railway electrical works followed the same logic — the same
                  discipline applied to a different owner with a stricter safety regime. Material
                  supply and trading grew out of procurement the Group was already doing for itself.
                </p>
              </div>

              <h2 className="display-3 mt-16">The mark</h2>
              <div className="mt-6 space-y-5">
                <p className="text-ink-600">
                  The wordmark is built out of the work itself. The letters are not decorated with
                  industry symbols; they are made of them — a gear and dial, a leaf, a circuit run
                  traced through the middle of the name, a tower crane whose jib becomes the beam
                  across the top, columns rising into an arrow, and a currency mark closing it.
                  Every vertical the Group operates in is somewhere in the name.
                </p>
                <p className="text-ink-600">
                  Green carries the current throughout, in three tones: the solid green of the
                  letters and the crane beam, a lighter green for the outlines and the finer
                  detail, and a deep teal at the close. Deep navy carries the other half of the
                  business — the substations, the documentation, the compliance — and is the ground
                  the mark is set against.
                </p>
              </div>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="stage-deep flex flex-col items-center justify-center border border-line px-8 py-16">
                <LogoMark size={96} tone="invert" />
                <p className="mt-8 font-display text-[1.5rem] font-extrabold tracking-[-0.04em] text-white">
                  MORLATIS
                </p>
                <p className="mt-2 text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-signal-200">
                  Innovation Unfurl
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-tight border-t border-line bg-paper-warm">
        <div className="shell">
          <h2 className="display-3">The route so far</h2>
          <ol className="mt-10 border-t border-line-strong">
            {timeline.map((t) => (
              <li
                key={t.year}
                className="grid gap-x-8 gap-y-2 border-b border-line py-7 sm:grid-cols-[7rem_1fr]"
                data-reveal
              >
                <p className="numeral text-[1.75rem] text-signal-700">{t.year}</p>
                <div>
                  <h3 className="title text-ink-950">
                    {t.title}
                    {"projected" in t && t.projected && (
                      <span className="ml-3 align-middle font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-500">
                        Target
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

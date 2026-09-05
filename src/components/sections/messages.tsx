import Image from "next/image";
import { executiveMessages } from "@/content/company";

/**
 * Messages from the Founder and the Managing Director.
 *
 * Replaces the homepage leadership grid, which listed six accountable
 * disciplines and no people — a section that asserted governance without ever
 * putting a voice behind it.
 *
 * Both messages currently carry draft copy (see `executiveMessages` in
 * content/company.ts). While `draft` is true the block renders a small
 * "awaiting final text" marker so nobody mistakes the placeholder for a
 * published statement; setting `draft: false` removes it with no other change.
 */
function Monogram({ role }: { role: string }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line-mint bg-[linear-gradient(160deg,#ffffff,#e2f8ea)] font-display text-[1.125rem] font-bold text-signal-700 shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_6px_14px_-6px_rgb(0_61_44/0.4)]"
    >
      {role
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)}
    </div>
  );
}

export function MessagesSection() {
  return (
    <section className="scene section bg-white">
      <div className="shell">
        <div className="max-w-[40rem]">
          <p className="eyebrow" data-reveal>
            In their words
          </p>
          <h2 className="display-2 mt-6" data-reveal>
            The people who sign off the work.
          </h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {executiveMessages.map((m) => (
            <article key={m.role} className="plate lift-3d flex flex-col p-8 sm:p-10" data-reveal>
              {/* The opening quote mark, set as artwork rather than punctuation. */}
              <span
                aria-hidden="true"
                className="font-display text-[4.5rem] leading-[0.6] text-signal-200"
              >
                &ldquo;
              </span>

              <p className="mt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-signal-700">
                {m.eyebrow}
              </p>

              <h3 className="display-3 mt-4 !text-[clamp(1.375rem,2vw,1.75rem)]">{m.heading}</h3>

              <div className="mt-6 space-y-4 text-ink-600">
                {m.body.map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-4 pt-9">
                {m.image ? (
                  <Image
                    src={m.image}
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <Monogram role={m.role} />
                )}
                <div className="min-w-0">
                  {m.name && (
                    <p className="text-[0.9375rem] font-semibold text-ink-950">{m.name}</p>
                  )}
                  <p className="text-[0.875rem] text-ink-500">
                    {m.role}, {"Morlatis Group"}
                  </p>
                </div>
              </div>

              {m.draft && (
                <p className="mt-6 inline-flex self-start rounded-full border border-line-mint bg-paper-mint px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-500">
                  Awaiting final text
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

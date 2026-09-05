import { LazyVideo } from "@/components/ui/lazy-video";

/**
 * A band of site footage with the copy set on top of it.
 *
 * The film runs behind the text rather than beside it, which is the only way a
 * 16:9 clip fills a full-width band without either letterboxing or being
 * cropped to a strip. Legibility over moving footage is carried by three
 * layers, not one: the scrim, a schematic grid that breaks up the motion, and a
 * dark base the video is composited onto at reduced opacity. Text over video at
 * full brightness is unreadable the moment the frame changes.
 */
export function FieldFilmSection({
  src,
  poster,
  label,
  eyebrow,
  title,
  body,
  stats,
}: {
  src: string;
  poster: string;
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  stats?: { value: string; label: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#012118] text-white">
      <LazyVideo
        src={src}
        poster={poster}
        label={label}
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />

      <div
        className="absolute inset-0 bg-[linear-gradient(100deg,rgb(0_33_24/0.94)_0%,rgb(0_33_24/0.78)_42%,rgb(0_33_24/0.35)_100%)]"
        aria-hidden="true"
      />
      <div className="grid-field absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="shell section relative">
        <div className="max-w-[38rem]">
          <p className="eyebrow eyebrow-invert" data-reveal-left>
            {eyebrow}
          </p>

          <h2 className="display-2 mt-6 text-white" data-reveal-left>
            {title}
          </h2>

          <p className="lede mt-7 text-white/80" data-reveal-left>
            {body}
          </p>
        </div>

        {stats && (
          <dl className="mt-14 grid gap-4 sm:grid-cols-3">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="plate-invert lift-3d px-6 py-7"
                data-reveal-scale
                style={{ "--i": i } as React.CSSProperties}
              >
                <dt className="numeral text-[clamp(1.5rem,2.6vw,2.125rem)] text-signal-300">
                  {s.value}
                </dt>
                <dd className="mt-2 font-nav text-[0.8125rem] text-white/70">{s.label}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

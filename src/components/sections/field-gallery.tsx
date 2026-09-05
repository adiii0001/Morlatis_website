import Image from "next/image";
import type { FieldPhoto } from "@/content/field";

/**
 * The photo mosaic — the site record, with its captions set inside the frames
 * rather than underneath them.
 *
 * The layout is a fixed six-tile figure: one double-square, four singles and a
 * full-width banner. That is a deliberate constraint. A gallery that accepts
 * any number of photographs has to choose between leaving holes in its last row
 * and letting tiles stretch to odd proportions, and both look like a mistake.
 * Six tiles tessellate a four-column grid exactly.
 *
 * Below `lg` the mosaic resolves to plain columns with their own aspect ratios,
 * because a 2×2 tile in a two-column grid is just a big square.
 */

/** Column and row behaviour per position, in order. */
const SHAPE = [
  "sm:col-span-2 lg:col-span-2 lg:row-span-2 aspect-[4/3] lg:aspect-auto",
  "aspect-[4/3] lg:aspect-auto",
  "aspect-[4/3] lg:aspect-auto",
  "aspect-[4/3] lg:aspect-auto",
  "aspect-[4/3] lg:aspect-auto",
  "sm:col-span-2 lg:col-span-4 aspect-[16/9] lg:aspect-auto",
];

/** Matches the shapes above, so the browser is not handed a 100vw hint for a
    quarter-width tile. */
const SIZES = [
  "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 45vw",
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 23vw",
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 23vw",
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 23vw",
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 23vw",
  "100vw",
];

export function FieldGallery({
  photos,
  eyebrow,
  title,
  lede,
  tone = "warm",
}: {
  photos: FieldPhoto[];
  eyebrow: string;
  title: string;
  lede?: string;
  tone?: "warm" | "mint" | "white";
}) {
  const surface =
    tone === "mint" ? "bg-paper-mint" : tone === "white" ? "bg-white" : "bg-paper-warm";

  return (
    <section className={`section border-t border-line ${surface}`}>
      <div className="shell">
        <div className="max-w-[46rem]">
          <p className="eyebrow" data-reveal-left>
            {eyebrow}
          </p>
          <h2 className="display-2 mt-6" data-reveal-left>
            {title}
          </h2>
          {lede && (
            <p className="lede mt-6" data-reveal-left>
              {lede}
            </p>
          )}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[14.5rem] lg:grid-cols-4">
          {photos.slice(0, 6).map((photo, i) => (
            <figure
              key={photo.slug}
              className={`zoom-frame plate group relative h-full overflow-hidden p-0 ${SHAPE[i]}`}
              data-reveal-scale
              style={{ "--i": Math.min(i, 3) } as React.CSSProperties}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={SIZES[i]}
                className="zoom-media object-cover"
              />
              <div className="media-scrim" aria-hidden="true" />

              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <span className="media-chip">{photo.chip}</span>
                <h3 className="mt-3.5 font-display text-[1.0625rem] font-semibold leading-snug text-white sm:text-[1.1875rem]">
                  {photo.title}
                </h3>
                <p className="mt-1.5 max-w-[26rem] text-[0.8125rem] leading-relaxed text-white/75">
                  {photo.note}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

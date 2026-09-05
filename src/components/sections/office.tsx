import Image from "next/image";
import { pickPhotos } from "@/content/field";

/**
 * The head office band.
 *
 * The homepage carried a lot of evidence of what happens on site and none at
 * all of where it is run from, which left the Group looking like a field crew
 * rather than a company a utility can place a tender with. Both photographs are
 * the real Patna office, so this is the one band on the page that shows the
 * front door.
 *
 * The frames are portrait because the photographs are: cropping a 3:4 phone
 * shot of a reception desk into a landscape tile throws away the sign, which is
 * the only reason to run the picture at all.
 */
export function OfficeSection() {
  const photos = pickPhotos("office-reception", "office-meeting");

  return (
    <section className="scene section border-t border-line bg-paper-mint">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className="eyebrow" data-reveal-left>
              The head office
            </p>
            <h2 className="display-2 mt-6 !text-[clamp(1.75rem,3.2vw,2.5rem)]" data-reveal-left>
              Run out of Patna.
            </h2>
            <p className="lede mt-6" data-reveal-left>
              Estimation, design, procurement and project control sit in one building, with
              regional offices in Delhi, Ranchi and Lucknow behind it. The crew you meet on site
              is briefed in this room first.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-4 sm:gap-5 lg:col-span-7 lg:col-start-6">
            {photos.map((p, i) => (
              <li
                key={p.slug}
                className="zoom-frame plate lift-3d relative aspect-[3/4] overflow-hidden p-0"
                data-reveal-scale
                style={{ "--i": i } as React.CSSProperties}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="zoom-media object-cover"
                />
                <div className="media-scrim" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <span className="media-chip">{p.chip}</span>
                  <h3 className="mt-3 font-display text-[1rem] font-semibold leading-snug text-white sm:text-[1.125rem]">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-white/75">{p.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

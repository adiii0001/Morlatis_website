/**
 * Morlatis identity.
 *
 * The mark is the supplied brand artwork — the "MRLATIS" wordmark built out of
 * the trades the group works in: the gear and clock, the leaf, the circuit
 * run, the tower crane, the rising columns. Because the wordmark is inside the
 * artwork there is no separate type lockup here.
 *
 * Two files, same coverage: the colour original for light surfaces, and a
 * white silhouette for the green hero and the navy footer, where the deep
 * teal-green details in the original would otherwise disappear.
 */

import Image from "next/image";

const SRC = "/morlatis-logo.png";
const SRC_WHITE = "/morlatis-logo-white.png";

/** Natural size of the artwork, used to hold the aspect ratio. */
const RATIO = 808 / 300;

/**
 * Both files are already palette PNGs sized for their largest use, so there is
 * nothing for the image optimizer to win here — and routing them through it
 * costs real time, because Chrome's Accept header negotiates AVIF and encoding
 * this much fine alpha detail to AVIF takes minutes, not milliseconds.
 */
const RAW = true;

export function LogoMark({
  size = 34,
  className,
  tone = "duo",
}: {
  size?: number;
  className?: string;
  tone?: "duo" | "invert" | "mono";
}) {
  return (
    <Image
      src={tone === "duo" ? SRC : SRC_WHITE}
      alt=""
      width={Math.round(size * RATIO)}
      height={size}
      className={className}
      unoptimized={RAW}
      aria-hidden="true"
    />
  );
}

export function Logo({
  invert = false,
  className,
  compact = false,
}: {
  invert?: boolean;
  className?: string;
  compact?: boolean;
}) {
  /* The mark carries interior detail — gear, circuit run, crane lattice — so
     it needs more height than a plain wordmark before it turns to noise. */
  const height = compact ? 34 : 44;

  return (
    <span className={`flex items-center ${className ?? ""}`}>
      <Image
        src={invert ? SRC_WHITE : SRC}
        alt="Morlatis"
        width={Math.round(height * RATIO)}
        height={height}
        priority
        unoptimized={RAW}
        className="w-auto transition-[height] duration-300"
        style={{ height }}
      />
    </span>
  );
}

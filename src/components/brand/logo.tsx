/**
 * Morlatis identity.
 *
 * The mark is two ascending chevrons: read together they form an M; read as
 * motion they are the "unfurl" — energy rising left to right. The second
 * chevron carries the signal green because it is the one that climbs.
 */

export function LogoMark({
  size = 34,
  className,
  tone = "duo",
}: {
  size?: number;
  className?: string;
  tone?: "duo" | "invert" | "mono";
}) {
  const base = tone === "invert" ? "#ffffff" : tone === "mono" ? "currentColor" : "#050d19";
  const accent = tone === "mono" ? "currentColor" : "#17b94a";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2.5 25.5 11 13l5 7.35"
        stroke={base}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 22 21 10.5l8.5 12"
        stroke={accent}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark size={compact ? 28 : 32} tone={invert ? "invert" : "duo"} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-extrabold tracking-[-0.04em] ${
            compact ? "text-[1.0625rem]" : "text-[1.1875rem]"
          } ${invert ? "text-white" : "text-ink-950"}`}
        >
          MORLATIS
          <span
            className={`align-super text-[0.5em] font-semibold tracking-normal ${
              invert ? "text-white/50" : "text-ink-500"
            }`}
          >
            ®
          </span>
        </span>
        <span
          className={`mt-[3px] text-[0.5rem] font-semibold uppercase tracking-[0.24em] ${
            invert ? "text-signal-400" : "text-signal-700"
          }`}
        >
          Innovation Unfurl
        </span>
      </span>
    </span>
  );
}

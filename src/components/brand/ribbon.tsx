/**
 * The corner ribbon.
 *
 * Lifted from the Morlatis UPS brochure cover: a fan of parallel 45° bars in
 * the brand green, the deep teal and the navy, running off the corner of the
 * page. It is the one decorative device the printed collateral uses everywhere,
 * so it is the cheapest way to make the site read as the same material.
 *
 * Purely decorative — no text, no semantics, aria-hidden throughout.
 */

const BARS = [
  { offset: 0, width: 26, color: "#35d468", opacity: 1 },
  { offset: 34, width: 14, color: "#0e9b3c", opacity: 1 },
  { offset: 54, width: 22, color: "#13233b", opacity: 1 },
  { offset: 84, width: 10, color: "#007a5c", opacity: 0.55 },
  { offset: 102, width: 16, color: "#9ab0cd", opacity: 0.4 },
];

export function Ribbon({
  corner = "top-right",
  size = 260,
  className = "",
}: {
  corner?: "top-right" | "bottom-left" | "top-left" | "bottom-right";
  size?: number;
  className?: string;
}) {
  // Each corner is the top-right artwork under a different flip.
  const flip = {
    "top-right": "",
    "bottom-left": "scale(-1, -1)",
    "top-left": "scale(-1, 1)",
    "bottom-right": "scale(1, -1)",
  }[corner];

  const place = {
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
  }[corner];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute ${place} ${className}`}
    >
      <g transform={flip ? `${flip} translate(-200, -200)` : undefined}>
        {/* Bars run bottom-left to top-right and are clipped by the viewBox,
            which is what gives the brochure's cut-off-at-the-edge look. */}
        {BARS.map((bar) => (
          <rect
            key={bar.offset}
            x={200 - bar.offset - bar.width}
            y={-120}
            width={bar.width}
            height={340}
            fill={bar.color}
            opacity={bar.opacity}
            transform={`rotate(45 ${200 - bar.offset - bar.width / 2} 40)`}
          />
        ))}
      </g>
    </svg>
  );
}

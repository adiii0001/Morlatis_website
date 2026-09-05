/**
 * Railway electrification scene.
 *
 * The brief asked for an AI-generated video here. I can't generate video, and
 * the three site clips supplied were interior office footage, so this is the
 * substitute: a drawn 25 kV overhead-equipment corridor in perspective, with
 * traction current animated along the contact wire.
 *
 * It is built as inline SVG rather than a raster or a clip because it costs one
 * request, stays sharp at any width, and — unlike stock footage — depicts the
 * actual scope: masts, cantilevers, catenary and contact wire over a receding
 * track. The perspective is a real one-point projection to a vanishing point at
 * (VP_X, HORIZON), so mast spacing, height and track gauge all converge
 * together instead of being drawn by eye.
 *
 * Server-rendered. No JavaScript.
 */

const W = 1200;
const H = 520;
const HORIZON = 250;
const VP_X = 760; // vanishing point, right of centre so copy can sit left

/** Depth 0 = nearest, 1 = at the horizon. Non-linear, so near masts spread. */
const project = (t: number) => {
  const k = 1 - Math.pow(1 - t, 2.4);
  return {
    /** Scale factor of an object at this depth. */
    s: 1 - k * 0.86,
    /** How far along the convergence to the vanishing point. */
    k,
  };
};

const MASTS = [0.02, 0.2, 0.38, 0.54, 0.68, 0.79, 0.87, 0.93];

function Mast({ t, side }: { t: number; side: -1 | 1 }) {
  const { s, k } = project(t);

  // Ground position: track-side offset shrinks toward the vanishing point.
  const baseOffset = side * 470 * s;
  const x = VP_X + baseOffset;
  const groundY = HORIZON + (H - HORIZON) * (1 - k) * 0.92 + 24;

  const height = 300 * s;
  const topY = groundY - height;
  const armReach = -side * 300 * s; // cantilever reaches over the track

  return (
    <g opacity={0.35 + s * 0.65}>
      {/* Mast: a tapered H-section with lattice bracing. */}
      <path
        d={`M${x - 9 * s} ${groundY} L${x - 5 * s} ${topY} M${x + 9 * s} ${groundY} L${x + 5 * s} ${topY}`}
        stroke="currentColor"
        strokeWidth={Math.max(1, 3 * s)}
        strokeLinecap="round"
      />
      {Array.from({ length: 7 }, (_, i) => {
        const y1 = groundY - (height / 7) * i;
        const y2 = groundY - (height / 7) * (i + 1);
        const dir = i % 2 === 0 ? 1 : -1;
        return (
          <path
            key={i}
            d={`M${x - 7 * s * dir} ${y1} L${x + 7 * s * dir} ${y2}`}
            stroke="currentColor"
            strokeWidth={Math.max(0.5, 1.1 * s)}
            opacity="0.7"
          />
        );
      })}

      {/* Cantilever: bracing tube + registration arm over the contact wire. */}
      <path
        d={`M${x} ${topY + 14 * s} L${x + armReach} ${topY + 40 * s}`}
        stroke="currentColor"
        strokeWidth={Math.max(0.8, 2 * s)}
        strokeLinecap="round"
      />
      <path
        d={`M${x} ${topY + 60 * s} L${x + armReach * 0.92} ${topY + 44 * s}`}
        stroke="currentColor"
        strokeWidth={Math.max(0.6, 1.4 * s)}
        opacity="0.75"
      />
      {/* Dropper down to the contact wire. */}
      <path
        d={`M${x + armReach} ${topY + 40 * s} v${34 * s}`}
        stroke="currentColor"
        strokeWidth={Math.max(0.5, 1.2 * s)}
        opacity="0.8"
      />
      {/* Insulator. */}
      <circle cx={x + armReach} cy={topY + 40 * s} r={Math.max(1, 3.4 * s)} fill="currentColor" />
    </g>
  );
}

export function RailwayScene({ className }: { className?: string }) {
  // Catenary and contact wire, drawn from the nearest mast to the horizon.
  const near = project(MASTS[0]);
  const nearGround = HORIZON + (H - HORIZON) * (1 - near.k) * 0.92 + 24;
  const nearTop = nearGround - 300 * near.s;

  const wireStart = { x: VP_X - 300 * near.s, y: nearTop + 74 * near.s };
  const catStart = { x: VP_X - 300 * near.s, y: nearTop + 40 * near.s };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="rail-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="34%" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="rail-mask">
          <rect width={W} height={H} fill="url(#rail-fade)" />
        </mask>
      </defs>

      <g mask="url(#rail-mask)">
        {/* Track: two rails and sleepers converging on the vanishing point. */}
        {[-1, 1].map((side) => (
          <path
            key={side}
            d={`M${VP_X + side * 210} ${H} L${VP_X} ${HORIZON}`}
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.4"
          />
        ))}
        {Array.from({ length: 22 }, (_, i) => {
          const t = i / 22;
          const { s, k } = project(t);
          const y = HORIZON + (H - HORIZON) * (1 - k) * 0.92 + 24;
          const half = 210 * s;
          return (
            <path
              key={i}
              d={`M${VP_X - half} ${y} H${VP_X + half}`}
              stroke="currentColor"
              strokeWidth={Math.max(0.4, 1.6 * s)}
              opacity={0.1 + s * 0.22}
            />
          );
        })}

        {/* Catenary (upper) and contact wire (lower), both to the vanishing point. */}
        <path
          d={`M${catStart.x} ${catStart.y} L${VP_X} ${HORIZON}`}
          stroke="currentColor"
          strokeWidth="1.6"
          opacity="0.5"
        />
        <path
          d={`M${wireStart.x} ${wireStart.y} L${VP_X} ${HORIZON}`}
          stroke="currentColor"
          strokeWidth="1.6"
          opacity="0.55"
        />

        {/* Traction current running down the contact wire, toward the viewer. */}
        <path
          d={`M${VP_X} ${HORIZON} L${wireStart.x} ${wireStart.y}`}
          stroke="#35d468"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeDasharray="4 60"
          style={{ animation: "current-flow 4.5s linear infinite" }}
        />
        <path
          d={`M${VP_X} ${HORIZON} L${catStart.x} ${catStart.y}`}
          stroke="#b7edcb"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="3 74"
          style={{ animation: "current-flow 6s linear infinite", animationDelay: "1.4s" }}
        />

        {/* Masts, far to near, so nearer ones overlap correctly. */}
        {[...MASTS].reverse().map((t) => (
          <Mast key={`l-${t}`} t={t} side={-1} />
        ))}
      </g>
    </svg>
  );
}

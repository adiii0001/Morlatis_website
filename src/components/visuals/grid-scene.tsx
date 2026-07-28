/**
 * The hero scene.
 *
 * A transmission corridor drawn as an engineering elevation: lattice pylons
 * whose bracing geometry is COMPUTED from the leg taper rather than eyeballed,
 * catenary conductors sagging between arm tips, and current animated along the
 * conductors as a stroke-dash flow.
 *
 * Rendered as inline SVG — no image request, no layout shift, scales to any
 * viewport, ~6 kB gzipped, and it is the real subject matter of the business.
 */

const TOWER_W = 120;
const TOWER_H = 280;
const BASE_Y = 280;
const WAIST_Y = 70;
const HEAD_Y = 16;
const LEG_OUT = 8; // leg x at base
const LEG_IN = 44; // leg x at waist

/** Left leg x-position at a given height — the taper both bracing and arms follow. */
const legX = (y: number) => LEG_OUT + (LEG_IN - LEG_OUT) * ((BASE_Y - y) / (BASE_Y - WAIST_Y));

function Pylon() {
  const body: string[] = [];

  // Lattice bracing across the tapered body, 30px panels.
  for (let y = BASE_Y; y > WAIST_Y; y -= 30) {
    const yNext = Math.max(y - 30, WAIST_Y);
    const l = legX(y);
    const r = TOWER_W - l;
    const lNext = legX(yNext);
    const rNext = TOWER_W - lNext;
    body.push(`M${l} ${y} L${rNext} ${yNext}`);
    body.push(`M${r} ${y} L${lNext} ${yNext}`);
    body.push(`M${lNext} ${yNext} L${rNext} ${yNext}`);
  }

  // Head section: parallel legs with tighter bracing.
  for (let y = WAIST_Y; y > HEAD_Y; y -= 18) {
    const yNext = Math.max(y - 18, HEAD_Y);
    body.push(`M${LEG_IN} ${y} L${TOWER_W - LEG_IN} ${yNext}`);
    body.push(`M${TOWER_W - LEG_IN} ${y} L${LEG_IN} ${yNext}`);
    body.push(`M${LEG_IN} ${yNext} L${TOWER_W - LEG_IN} ${yNext}`);
  }

  // Cross arms: horizontal boom + diagonal stay back to the mast.
  const arms = [
    { y: 62, reach: 68 },
    { y: 40, reach: 52 },
    { y: 20, reach: 34 },
  ];

  return (
    <g>
      {/* Legs */}
      <path
        d={`M${LEG_OUT} ${BASE_Y} L${LEG_IN} ${WAIST_Y} L${LEG_IN} ${HEAD_Y}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d={`M${TOWER_W - LEG_OUT} ${BASE_Y} L${TOWER_W - LEG_IN} ${WAIST_Y} L${TOWER_W - LEG_IN} ${HEAD_Y}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />

      {/* Bracing */}
      <path d={body.join(" ")} fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.72" />

      {/* Cross arms + insulator strings */}
      {arms.map(({ y, reach }) => {
        const l = TOWER_W / 2 - reach;
        const r = TOWER_W / 2 + reach;
        return (
          <g key={y}>
            <path
              d={`M${l} ${y} H${r}`}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d={`M${l} ${y} L${LEG_IN} ${y + 16} M${r} ${y} L${TOWER_W - LEG_IN} ${y + 16}`}
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.7"
            />
            {[l, r].map((x) => (
              <g key={x}>
                <path d={`M${x} ${y} v9`} stroke="currentColor" strokeWidth="1.4" />
                <circle cx={x} cy={y + 10.5} r="1.9" fill="currentColor" />
              </g>
            ))}
          </g>
        );
      })}

      {/* Peak / earth wire attachment */}
      <path
        d={`M${LEG_IN} ${HEAD_Y} L${TOWER_W / 2} 4 L${TOWER_W - LEG_IN} ${HEAD_Y}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx={TOWER_W / 2} cy="4" r="2.2" fill="currentColor" />
    </g>
  );
}

/**
 * Conductor catenary between two towers. Real conductors sag as a catenary;
 * a quadratic curve with the control point below the midpoint reads correctly
 * at this scale.
 */
function Conductor({
  x1,
  y1,
  x2,
  y2,
  sag,
  flow = false,
  delay = 0,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  sag: number;
  flow?: boolean;
  delay?: number;
}) {
  const d = `M${x1} ${y1} Q${(x1 + x2) / 2} ${(y1 + y2) / 2 + sag} ${x2} ${y2}`;
  return (
    <g>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      {flow && (
        <path
          d={d}
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="3 46"
          opacity="0.9"
          style={{
            animation: `current-flow 5.5s linear infinite`,
            animationDelay: `${delay}s`,
          }}
        />
      )}
    </g>
  );
}

export function GridScene({ className }: { className?: string }) {
  // Three towers at receding scale — atmospheric depth without any raster.
  // Positioned right of centre so the corridor never sits under the headline.
  const towers = [
    { x: 330, scale: 1, opacity: 0.5 },
    { x: 620, scale: 0.78, opacity: 0.34 },
    { x: 860, scale: 0.6, opacity: 0.2 },
  ];

  const armY = (t: (typeof towers)[number], y: number) => 420 - (TOWER_H - y) * t.scale;
  const armX = (t: (typeof towers)[number], offset: number) =>
    t.x + (TOWER_W / 2 + offset) * t.scale;

  return (
    <svg
      viewBox="0 0 960 440"
      fill="none"
      className={className}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Fades OUT toward the left, where the headline and body copy sit. */}
        <linearGradient id="scene-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="26%" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="58%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="scene-mask">
          <rect width="960" height="440" fill="url(#scene-fade)" />
        </mask>
      </defs>

      <g mask="url(#scene-mask)" className="text-ink-100">
        {/* Conductors run behind the towers. */}
        {towers.slice(0, -1).map((t, i) => {
          const next = towers[i + 1];
          return [68, 52, 34].map((offset, k) => (
            <g key={`${i}-${k}`}>
              <Conductor
                x1={armX(t, offset)}
                y1={armY(t, [62, 40, 20][k]) + 11}
                x2={armX(next, offset)}
                y2={armY(next, [62, 40, 20][k]) + 11}
                sag={26 + k * 4}
                flow={k === 1}
                delay={i * 1.4 + k * 0.6}
              />
              <Conductor
                x1={armX(t, -offset)}
                y1={armY(t, [62, 40, 20][k]) + 11}
                x2={armX(next, -offset)}
                y2={armY(next, [62, 40, 20][k]) + 11}
                sag={26 + k * 4}
                flow={k === 0}
                delay={i * 1.1 + k * 0.9}
              />
            </g>
          ));
        })}

        {towers.map((t, i) => (
          <g
            key={i}
            transform={`translate(${t.x} ${420 - TOWER_H * t.scale}) scale(${t.scale})`}
            opacity={t.opacity}
          >
            <Pylon />
          </g>
        ))}

        {/* Ground line */}
        <path d="M0 420 H960" stroke="currentColor" strokeWidth="1" opacity="0.18" />
      </g>
    </svg>
  );
}

/**
 * Slow-pulsing luminous nodes.
 *
 * Rendered as absolutely positioned elements rather than SVG circles: a
 * percentage viewBox with preserveAspectRatio="none" stretches circles into
 * ellipses, and animating the `r` attribute fights the authored radius.
 * Fixed-size dots positioned in percent stay round at every viewport.
 */
export function SignalField({ className }: { className?: string }) {
  const nodes = [
    { x: 12, y: 22, d: 0 },
    { x: 28, y: 64, d: 1.6 },
    { x: 44, y: 30, d: 3.1 },
    { x: 58, y: 74, d: 0.8 },
    { x: 71, y: 44, d: 2.4 },
    { x: 84, y: 24, d: 4.2 },
    { x: 92, y: 62, d: 1.1 },
    { x: 20, y: 84, d: 3.6 },
    { x: 66, y: 14, d: 2.9 },
  ];

  return (
    <div className={`pointer-events-none ${className ?? ""}`} aria-hidden="true">
      {nodes.map((n, i) => (
        <span
          key={i}
          className="absolute h-[3px] w-[3px] rounded-full bg-white"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            boxShadow: "0 0 12px 2px rgb(255 255 255 / 0.45)",
            animation: "pulse-node 6s ease-in-out infinite",
            animationDelay: `${n.d}s`,
          }}
        />
      ))}
    </div>
  );
}

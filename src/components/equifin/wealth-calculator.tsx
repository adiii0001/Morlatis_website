"use client";

import { useId, useMemo, useState } from "react";

/**
 * Equifin wealth projection calculator.
 *
 * A monthly-contribution (SIP) projection: three inputs, three outputs and a
 * year-by-year breakdown of contributed capital against growth.
 *
 * Two things it deliberately does NOT do, both on compliance grounds — the
 * Equifin brief is explicit that no guaranteed return may be implied:
 *
 *   1. The return field is labelled "assumed", never "expected" or "our
 *      returns", and it is the user who sets it.
 *   2. Every result is prefixed "projected" and carries the disclaimer beneath
 *      the panel. There is no default that could be read as a house forecast.
 *
 * The chart is inline SVG with a drawn top face on each bar, so the depth is
 * geometric rather than a filter — it stays crisp at any zoom and costs no
 * library.
 */

const MONTHLY = { min: 1_000, max: 200_000, step: 1_000 };
const YEARS = { min: 1, max: 30, step: 1 };
const RETURN = { min: 4, max: 18, step: 0.5 };

/** Indian short-form currency: ₹1.2 Cr, ₹34.5 L, ₹62,000. */
function inr(value: number): string {
  const n = Math.round(value);
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000) return `₹${(n / 1_00_000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

function Slider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
}) {
  const id = useId();
  const fill = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[0.875rem] font-semibold text-ink-800">
          {label}
        </label>
        <output htmlFor={id} className="numeral text-[1.125rem] text-signal-700">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        className="slider mt-3"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--slider-fill": `${fill}%` } as React.CSSProperties}
      />
    </div>
  );
}

export function WealthCalculator() {
  const [monthly, setMonthly] = useState(25_000);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(11);

  const { invested, projected, growth, series } = useMemo(() => {
    const i = rate / 100 / 12;
    const points: { year: number; invested: number; total: number }[] = [];

    for (let y = 1; y <= years; y++) {
      const n = y * 12;
      // Future value of an annuity-due: contributions are made at the start of
      // each month, which is how a standing instruction actually behaves.
      const total = i === 0 ? monthly * n : monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      points.push({ year: y, invested: monthly * n, total });
    }

    const last = points[points.length - 1];
    return {
      invested: last.invested,
      projected: last.total,
      growth: last.total - last.invested,
      series: points,
    };
  }, [monthly, years, rate]);

  /* Chart geometry. The bars are drawn in a 0–100 box and stretched by the
     viewBox, so the SVG needs no measurement pass. */
  const peak = series[series.length - 1].total;
  const barGap = 100 / series.length;
  const barW = Math.min(barGap * 0.62, 7);
  const depth = Math.min(barGap * 0.22, 2.4);

  return (
    <div className="scene">
      <div className="plate grid gap-px overflow-hidden bg-line-mint lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* ---- Inputs ---------------------------------------------------- */}
        <div className="bg-white p-7 sm:p-9">
          <h3 className="title text-ink-950">Model a contribution</h3>
          <p className="mt-2 text-[0.875rem] text-ink-500">
            Set the three variables. Nothing here is a recommendation.
          </p>

          <div className="mt-9 space-y-8">
            <Slider
              label="Monthly investment"
              value={monthly}
              display={inr(monthly)}
              {...MONTHLY}
              onChange={setMonthly}
            />
            <Slider
              label="Investment period"
              value={years}
              display={`${years} ${years === 1 ? "year" : "years"}`}
              {...YEARS}
              onChange={setYears}
            />
            <Slider
              label="Assumed annual return"
              value={rate}
              display={`${rate.toFixed(1)}%`}
              {...RETURN}
              onChange={setRate}
            />
          </div>

          <dl className="inset mt-9 divide-y divide-line-mint px-5">
            <div className="flex items-baseline justify-between gap-4 py-3.5">
              <dt className="text-[0.875rem] text-ink-600">Total invested</dt>
              <dd className="numeral text-[1.0625rem] text-ink-950">{inr(invested)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-3.5">
              <dt className="text-[0.875rem] text-ink-600">Projected growth</dt>
              <dd className="numeral text-[1.0625rem] text-signal-700">{inr(growth)}</dd>
            </div>
          </dl>
        </div>

        {/* ---- Readout + chart -------------------------------------------- */}
        <div className="relative overflow-hidden bg-[linear-gradient(158deg,#003a2b_0%,#00563c_58%,#0b7f3f_100%)] p-7 text-white sm:p-9">
          <div className="grid-field pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

          <div className="relative">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/65">
              Projected value after {years} {years === 1 ? "year" : "years"}
            </p>
            <p className="numeral mt-3 text-[clamp(2.25rem,5vw,3.25rem)] text-white">
              {inr(projected)}
            </p>

            <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2 text-[0.8125rem]">
              <span className="flex items-center gap-2 text-white/80">
                <span className="h-2.5 w-2.5 rounded-[2px] bg-signal-200" />
                Contributed
              </span>
              <span className="flex items-center gap-2 text-white/80">
                <span className="h-2.5 w-2.5 rounded-[2px] bg-signal-400" />
                Growth
              </span>
            </div>

            <svg
              viewBox={`0 -${depth} 100 ${100 + depth}`}
              preserveAspectRatio="none"
              className="mt-8 h-56 w-full sm:h-64"
              role="img"
              aria-label={`Projection: ${inr(invested)} contributed grows to ${inr(projected)} over ${years} years at an assumed ${rate}% annual return.`}
            >
              {series.map((p, idx) => {
                const x = idx * barGap + (barGap - barW) / 2;
                const hTotal = (p.total / peak) * 100;
                const hInvested = (p.invested / peak) * 100;

                return (
                  <g key={p.year}>
                    {/* Growth column — the full bar. */}
                    <rect
                      x={x}
                      y={100 - hTotal}
                      width={barW}
                      height={hTotal}
                      fill="#35d468"
                      opacity="0.92"
                    />
                    {/* Contributed capital, stacked at the base. */}
                    <rect
                      x={x}
                      y={100 - hInvested}
                      width={barW}
                      height={hInvested}
                      fill="#b7edcb"
                    />
                    {/* Drawn top face: the bar reads as a solid, not a rectangle. */}
                    <polygon
                      points={`${x},${100 - hTotal} ${x + depth},${100 - hTotal - depth} ${x + barW + depth},${100 - hTotal - depth} ${x + barW},${100 - hTotal}`}
                      fill="#ffffff"
                      opacity="0.55"
                    />
                    {/* Right face. */}
                    <polygon
                      points={`${x + barW},${100 - hTotal} ${x + barW + depth},${100 - hTotal - depth} ${x + barW + depth},${100 - depth} ${x + barW},100`}
                      fill="#000000"
                      opacity="0.22"
                    />
                  </g>
                );
              })}
            </svg>

            <div className="mt-2 flex justify-between text-[0.6875rem] text-white/55">
              <span>Year 1</span>
              <span>Year {years}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-500">
        Illustrative only. The figures above are arithmetic on the assumptions you set — they are
        not a forecast, an offer or a guarantee of return. Investments in securities are subject to
        market risk; past performance does not indicate future results. Speak to an adviser before
        acting on any projection.
      </p>
    </div>
  );
}

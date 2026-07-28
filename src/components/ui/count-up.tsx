"use client";

import { useEffect, useRef } from "react";

/**
 * Animated numeral.
 *
 * Writes to the DOM through a ref inside a rAF loop — zero React re-renders,
 * where the previous implementation fired 60 setState calls per stat.
 *
 * Also fixes the rounding bug that rendered ₹26.47Cr as "26.5": decimal places
 * are declared per-stat and held for the whole tween.
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1600,
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = `${prefix}${value.toFixed(decimals)}`;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.textContent = final;
      return;
    }

    let frame = 0;
    let start = 0;
    let cancelled = false;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      node.textContent = `${prefix}${(value * easeOut(progress)).toFixed(decimals)}`;
      if (progress < 1 && !cancelled) frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frame = requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [value, decimals, prefix, duration, final]);

  return (
    <span className={className}>
      {/* Server-rendered final value: correct without JS, correct for crawlers. */}
      <span ref={ref}>{final}</span>
      {suffix}
    </span>
  );
}

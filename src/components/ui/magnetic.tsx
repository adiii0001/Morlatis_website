"use client";

import { useEffect, useRef } from "react";

/**
 * Magnetic hover.
 *
 * Pointer-driven translation with spring-back, written directly to transform
 * (no React state, no GSAP dependency for something this small). Disabled on
 * coarse pointers and under reduced motion.
 */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let frame = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const loop = () => {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      frame = requestAnimationFrame(loop);
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      tx = (event.clientX - rect.left - rect.width / 2) * strength;
      ty = (event.clientY - rect.top - rect.height / 2) * strength;
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.style.transform = "";
    };
  }, [strength]);

  return (
    <span ref={ref} className={`inline-flex will-change-transform ${className ?? ""}`}>
      {children}
    </span>
  );
}

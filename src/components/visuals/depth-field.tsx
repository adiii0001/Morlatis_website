"use client";

import { useEffect, useRef } from "react";

/**
 * The depth field.
 *
 * A volume of nodes drifting toward the camera and linking to their neighbours
 * as they pass — the network drawn as something you are moving through rather
 * than something printed on the page.
 *
 * This is real three-dimensional geometry, not a parallax trick: every node
 * holds a world position, is rotated about two axes by the pointer, and is then
 * put through a perspective divide. Depth is therefore consistent across all of
 * size, spacing, brightness and the rate a node crosses the frame, which is
 * what separates a scene with depth from a flat one with a blur on it.
 *
 * Drawn on a 2D canvas. A WebGL library would be several hundred kilobytes for
 * a background texture; a hundred-odd projected points cost a fraction of a
 * millisecond a frame and no dependency at all.
 */

/** Node count. Past roughly 150 the links turn to soup and the frame cost
    starts to show on phones — the link pass is the quadratic one. */
const COUNT = 118;

/** Focal length, in world units. Smaller is a wider lens and a more aggressive
    convergence toward the vanishing point. */
const FOCAL = 620;

/** How far back the volume extends, and how wide it is at the far plane. */
const DEPTH = 1500;
const SPREAD = 1700;

/** World units per second toward the camera. Slow: this is atmosphere. */
const SPEED = 30;

/** Screen-space radius within which two nodes are linked. */
const LINK = 130;

/** Nodes are recycled to the back once they get this close, before they start
    to smear across the whole frame. */
const NEAR = 30;

type Node = { x: number; y: number; z: number; s: number };

const seed = (n: Node, back: boolean) => {
  n.x = (Math.random() - 0.5) * SPREAD;
  n.y = (Math.random() - 0.5) * SPREAD * 0.62;
  n.z = back ? DEPTH : Math.random() * DEPTH;
  n.s = 0.5 + Math.random() * 1.3;
};

export function DepthField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const nodes: Node[] = Array.from({ length: COUNT }, () => {
      const n = { x: 0, y: 0, z: 0, s: 1 };
      seed(n, false);
      return n;
    });

    /* Projected positions, reused each frame rather than reallocated. */
    const px = new Float32Array(COUNT);
    const py = new Float32Array(COUNT);
    const pk = new Float32Array(COUNT);
    const pa = new Float32Array(COUNT);

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    /* Pointer parallax. Targets are set by the listener; the values chase them
       so a flicked pointer glides rather than snapping the whole field. */
    let yaw = 0;
    let pitch = 0;
    let yawTo = 0;
    let pitchTo = 0;

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      yawTo = ((e.clientX - rect.left) / rect.width - 0.5) * 0.34;
      pitchTo = ((e.clientY - rect.top) / rect.height - 0.5) * 0.2;
    };

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      if (!w || !h) return;

      yaw += (yawTo - yaw) * 0.055;
      pitch += (pitchTo - pitch) * 0.055;

      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);
      const cx = w / 2;
      const cy = h / 2;

      for (let i = 0; i < COUNT; i++) {
        const n = nodes[i];

        n.z -= SPEED * dt;
        if (n.z < NEAR) seed(n, true);

        /* Yaw about the vertical axis, then pitch about the horizontal one. */
        const x1 = n.x * cosY + n.z * sinY;
        const z1 = n.z * cosY - n.x * sinY;
        const y2 = n.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + n.y * sinX;

        /* Behind the lens: park it off-frame rather than projecting it to a
           mirrored ghost on the far side of the vanishing point. */
        if (z2 <= NEAR) {
          pa[i] = 0;
          continue;
        }

        const k = FOCAL / (FOCAL + z2);
        px[i] = cx + x1 * k;
        py[i] = cy + y2 * k;
        pk[i] = k;

        /* Fade in out of the far plane, and back out as it arrives — a node
           that vanished at full brightness would read as a dropped frame. */
        const far = 1 - z2 / DEPTH;
        const near = Math.min(1, (z2 - NEAR) / 260);
        pa[i] = Math.max(0, Math.min(1, far)) * near;
      }

      /* Links first, so nodes sit on top of their own connections. */
      ctx.lineWidth = 1;
      for (let i = 0; i < COUNT; i++) {
        if (pa[i] <= 0.02) continue;
        for (let j = i + 1; j < COUNT; j++) {
          if (pa[j] <= 0.02) continue;

          const dx = px[i] - px[j];
          const dy = py[i] - py[j];
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;

          const closeness = 1 - Math.sqrt(d2) / LINK;
          const alpha = closeness * pa[i] * pa[j] * 0.52;
          if (alpha < 0.01) continue;

          ctx.strokeStyle = `rgba(53, 212, 104, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(px[i], py[i]);
          ctx.lineTo(px[j], py[j]);
          ctx.stroke();
        }
      }

      for (let i = 0; i < COUNT; i++) {
        const a = pa[i];
        if (a <= 0.02) continue;

        const r = Math.max(0.6, nodes[i].s * pk[i] * 3.4);

        /* Near nodes get a halo. Far ones do not — a glow on something that
           should read as distant flattens the whole field. */
        if (pk[i] > 0.5) {
          const g = ctx.createRadialGradient(px[i], py[i], 0, px[i], py[i], r * 6);
          g.addColorStop(0, `rgba(53, 212, 104, ${a * 0.6})`);
          g.addColorStop(1, "rgba(53, 212, 104, 0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(px[i], py[i], r * 6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(183, 237, 203, ${Math.min(1, a * 0.95)})`;
        ctx.beginPath();
        ctx.arc(px[i], py[i], r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    /* ---- Scheduling ------------------------------------------------------
       Run only while on screen and while the tab is in front. A background
       canvas has no business holding a phone's GPU awake behind another tab. */

    let frame = 0;
    let last = 0;
    let visible = false;

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
      last = now;
      draw(dt);
      frame = requestAnimationFrame(tick);
    };

    const play = () => {
      if (frame || !visible || document.hidden || still) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };

    const pause = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) play();
        else pause();
      },
      { rootMargin: "120px" }
    );
    observer.observe(canvas);

    const onVisibility = () => (document.hidden ? pause() : play());

    const sizes = new ResizeObserver(() => {
      resize();
      if (still) draw(0);
    });
    sizes.observe(canvas);

    /* Reduced motion still gets the scene, held on a single frame. */
    if (still) draw(0);

    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      pause();
      observer.disconnect();
      sizes.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

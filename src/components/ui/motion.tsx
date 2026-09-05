"use client";

import { useEffect } from "react";

/**
 * Entrance motion driver.
 *
 * The brief: content must arrive with a real three-dimensional move — a swing
 * through depth, not a flat nudge — travelling left-to-right or right-to-left,
 * and it must run the other way round when the reader scrolls back up. It has
 * to happen on every page without each page opting in.
 *
 * Three decisions follow from that:
 *
 *  1. TRANSITIONS, NOT KEYFRAMES. The previous build used a one-shot CSS
 *     animation, which can only play forwards; an element that had arrived was
 *     unobserved and never moved again. A transition between two attribute
 *     states runs in whichever direction the state changes, so the same
 *     declaration covers both the entrance and the retreat, and interrupting it
 *     mid-flight resumes from where it is instead of snapping.
 *
 *  2. THE SIDE IS DERIVED FROM GEOMETRY, NOT FROM A SCROLL-DIRECTION FLAG.
 *     Each element carries a base side, alternating section by section, so a
 *     whole band arrives together rather than its parts scattering. When an
 *     element leaves the viewport we look at *which edge* it left by. Off the
 *     top means the reader is going down and will next meet it coming back up,
 *     so it is re-armed on the opposite side; off the bottom means the reverse.
 *     Reading the edge is exact — a direction variable sampled per frame is not,
 *     and drifts on momentum scrolling and trackpad reversals.
 *
 *  3. AUTO-TAGGING. Pages mark up the elements they care about; anything left
 *     untagged inside a section's content shell gets tagged here, so a new page
 *     inherits the motion without a single attribute. Tagging skips anything
 *     that already animates, already contains something that animates, is
 *     decorative, is positioned out of flow, or is already transformed — those
 *     are the four ways an automatic transform breaks a layout.
 *
 * Because the pre-motion state is `opacity: 0`, the one unacceptable outcome is
 * a trigger that never fires and leaves the page blank. Four things guard it:
 * the hidden state is scoped to `<html data-motion>`, set here on mount, so
 * without JS nothing is ever hidden; motion is not enabled while the document is
 * hidden, since a hidden document reports zero-size rects and never resolves;
 * the first sweep is synchronous rather than waiting on a callback; and a
 * timeout drops `data-motion` outright if nothing has been revealed. Losing the
 * animation is acceptable. Losing the content is not.
 */

const ATTRS = [
  "data-reveal",
  "data-reveal-wipe",
  "data-reveal-left",
  "data-reveal-right",
  "data-reveal-scale",
  "data-reveal-3d",
] as const;

const SELECTOR = ATTRS.map((a) => `[${a}]`).join(",");

/** Reveal a little before the element is fully on screen, so the swing has
    somewhere to travel rather than completing off the bottom edge. */
const IN_MARGIN = 0.1;

/** How far past the edge an element must be before it is re-armed. Re-arming
    flips its side, so doing it while any part is still visible would show the
    element jumping across the page. */
const OUT_PAD = 96;

/** Cap the stagger. A twelve-card grid should not take two and a half seconds
    to finish arriving because its last child inherited index eleven. */
const MAX_STEP = 5;

const other = (side: string) => (side === "left" ? "right" : "left");

export function Motion() {
  useEffect(() => {
    const root = document.documentElement;

    /* Reduced motion: no hidden state, no observers, nothing to undo. The
       page is already complete as server-rendered. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.setAttribute("data-ready", "");
      return;
    }

    let started = false;
    let breaker = 0;
    let ready = 0;

    /* ---- Tagging ---------------------------------------------------------
       Runs on mount and again whenever the DOM changes, so client-rendered
       and route-changed content is covered too. Tagging is idempotent. */

    const skip = (el: Element) => {
      if (el.matches(SELECTOR)) return true; // already animates
      if (el.querySelector(SELECTOR)) return true; // its children do
      if (el.closest("[data-inview],[data-no-reveal]")) return true;
      if (el.hasAttribute("aria-hidden")) return true;
      if (el.hasAttribute("data-enter")) return true;

      const r = el.getBoundingClientRect();
      if (!r.width && !r.height) return true;

      const cs = getComputedStyle(el);
      if (cs.position === "absolute" || cs.position === "fixed" || cs.position === "sticky") {
        return true;
      }
      /* An element that is already transformed is being positioned by that
         transform. Overwriting it would move it permanently. */
      if (cs.transform !== "none") return true;

      return false;
    };

    const tag = () => {
      /*
       * A "band" is any top-level run of content, not only <section>. Page
       * headers are <header class="page-top"> and every interior page starts
       * with one, so scoping this to sections left the first thing a reader
       * saw as the one thing that never took part: it animated, but with no
       * side assigned it always came from the left and never reversed.
       */
      const sections = document.querySelectorAll("main section, main header, main article");

      sections.forEach((section, index) => {
        /* Alternate the arrival side band by band. Within a band everything
           comes from the same side, staggered — that reads as one movement
           rather than as a dozen independent ones. */
        const base = index % 2 === 0 ? "left" : "right";

        /* Content lives inside a shell. Sections without one (full-bleed
           media, for instance) fall back to their own children. */
        const holders = section.querySelectorAll(".shell, .shell-narrow");
        const candidates: Element[] = [];

        if (holders.length) {
          holders.forEach((h) => candidates.push(...Array.from(h.children)));
        } else {
          candidates.push(...Array.from(section.children));
        }

        for (const el of candidates) {
          if (skip(el)) continue;
          el.setAttribute("data-reveal-3d", "");
        }

        /* Side and stagger, for hand-tagged and auto-tagged alike. */
        const marked = Array.from(section.querySelectorAll(SELECTOR));
        const groups = new Map<Element | null, Element[]>();

        for (const el of marked) {
          if (!el.hasAttribute("data-side")) {
            const side = el.hasAttribute("data-reveal-left")
              ? "left"
              : el.hasAttribute("data-reveal-right")
                ? "right"
                : base;
            el.setAttribute("data-side", side);
            el.setAttribute("data-from", side);
          }

          const parent = el.parentElement;
          const arr = groups.get(parent);
          if (arr) arr.push(el);
          else groups.set(parent, [el]);
        }

        /* Siblings arrive in sequence. Pages that set --i themselves — the
           hand-timed grids — keep their own numbering. */
        groups.forEach((arr) => {
          arr.forEach((el, i) => {
            const node = el as HTMLElement;
            if (node.style.getPropertyValue("--i")) return;
            node.style.setProperty("--i", String(Math.min(i, MAX_STEP)));
          });
        });
      });

      /*
       * Anything the band pass did not reach — markup nested somewhere no
       * selector above anticipated — still gets a side. Without one it falls
       * back to the stylesheet's default and can never be flipped, so it would
       * arrive from the left both going down and coming back up.
       */
      document.querySelectorAll(`main ${SELECTOR.split(",").join(", main ")}`).forEach((el, i) => {
        if (el.hasAttribute("data-side")) return;
        const side = i % 2 === 0 ? "left" : "right";
        el.setAttribute("data-side", side);
        el.setAttribute("data-from", side);
      });
    };

    /* ---- Sweep -----------------------------------------------------------
       One pass: read every rect, then write every attribute. Reading and
       writing in the same loop would force a layout per element. */

    let elements: Element[] = [];

    const collect = () => {
      elements = Array.from(document.querySelectorAll(SELECTOR));
    };

    const sweep = () => {
      const h = window.innerHeight || root.clientHeight;
      const enter: Element[] = [];
      const leave: [Element, boolean][] = [];

      for (const el of elements) {
        const r = el.getBoundingClientRect();
        if (!r.width && !r.height) continue;

        const inside = r.top < h * (1 - IN_MARGIN) && r.bottom > 0;

        if (inside) {
          if (!el.hasAttribute("data-inview")) enter.push(el);
          continue;
        }

        if (!el.hasAttribute("data-inview")) continue;

        const aboveTop = r.bottom < -OUT_PAD;
        const belowBottom = r.top > h + OUT_PAD;
        if (aboveTop || belowBottom) leave.push([el, aboveTop]);
      }

      for (const el of enter) el.setAttribute("data-inview", "");

      for (const [el, aboveTop] of leave) {
        el.removeAttribute("data-inview");

        /* Left by the top edge: the reader is heading down, and will meet
           this again on the way back up — so it arrives from the far side.
           Left by the bottom: the reverse, and it keeps its base side. */
        const base = el.getAttribute("data-side") === "right" ? "right" : "left";
        el.setAttribute("data-from", aboveTop ? other(base) : base);
      }
    };

    /*
     * Everything is coalesced into one animation frame, and tagging in
     * particular is never done from inside the MutationObserver callback.
     *
     * That callback is a microtask. React streams a suspended subtree in by
     * moving nodes out of a hidden div with an inline script, and hydrates the
     * boundary afterwards — so tagging from the microtask writes attributes
     * onto markup React is about to hydrate, and hydration then reports a
     * mismatch it explicitly will not patch up. Deferring to the next frame
     * puts the tagging after React's commit.
     *
     * It is also the cheaper shape: a burst of DOM changes now costs one pass
     * over the document rather than one per mutation record.
     */
    let ticking = false;
    let retag = false;

    const schedule = (dirty = false) => {
      if (dirty) retag = true;
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;
        if (retag) {
          retag = false;
          tag();
          collect();
        }
        sweep();
      });
    };

    const onScroll = () => schedule();
    const mutations = new MutationObserver(() => schedule(true));

    const start = () => {
      if (started || document.visibilityState !== "visible") return;
      started = true;

      root.setAttribute("data-motion", "");

      tag();
      collect();
      sweep();

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      mutations.observe(document.body, { childList: true, subtree: true });

      /* The above-the-fold sequence waits for the preloader to lift. If the
         preloader is absent or fails, release it here so the hero is never
         left hidden. */
      ready = window.setTimeout(() => root.setAttribute("data-ready", ""), 2400);

      /*
       * Last-resort backstop: if something that is on screen has still not
       * been revealed, the trigger is not working here — render plain rather
       * than blank.
       *
       * The test is specifically "on screen and still hidden", not "nothing
       * has been revealed at all". The looser test tripped on every load of
       * the home page: the hero fills the first viewport and is driven by
       * [data-enter], so at rest there is no [data-reveal] on screen to
       * reveal, the count stayed at zero, and the backstop concluded the
       * observer was broken and switched off the motion for the whole page.
       * An empty first screen is not evidence of a failure.
       */
      breaker = window.setTimeout(() => {
        const h = window.innerHeight || root.clientHeight;

        const stuck = elements.some((el) => {
          if (el.hasAttribute("data-inview")) return false;
          const r = el.getBoundingClientRect();
          if (!r.width && !r.height) return false;
          return r.top < h && r.bottom > 0;
        });

        if (stuck) root.removeAttribute("data-motion");
      }, 2000);
    };

    start();
    document.addEventListener("visibilitychange", start);

    return () => {
      window.clearTimeout(breaker);
      window.clearTimeout(ready);
      document.removeEventListener("visibilitychange", start);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mutations.disconnect();
      root.removeAttribute("data-motion");
    };
  }, []);

  return null;
}

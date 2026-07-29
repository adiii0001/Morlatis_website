"use client";

import { useEffect } from "react";

/**
 * Entrance motion driver.
 *
 * Matches the reference industrial template's mechanism exactly, which was
 * measured rather than guessed: its animated elements carry a CSSAnimation on
 * the DocumentTimeline with `iteration-count: 1` and `fill: backwards`, held
 * `paused` until the element enters the viewport. So the motion is time-based
 * and plays once — it is not scrubbed against scroll position, and nothing
 * parallaxes (the template's background media tracks scroll 1:1).
 *
 * This replaces the previous `animation-timeline: view()` approach, which tied
 * progress to scroll offset and so reversed when you scrolled back up. It also
 * removes the Firefox gap, since view() timelines are unsupported there.
 *
 * Because the pre-animation state is `opacity: 0`, the one unacceptable outcome
 * is a trigger that never fires and leaves content permanently invisible. Four
 * things guard against it:
 *
 *   1. the hidden state is scoped to `<html data-motion>`, set here on mount —
 *      without JS nothing is ever hidden;
 *   2. motion is not enabled at all while the document is hidden. A hidden
 *      document reports zero-size rects, never fires IntersectionObserver, and
 *      freezes its animation timeline — so `fill: backwards` would pin every
 *      element at its 0% keyframe indefinitely. Enabling is deferred to the
 *      first `visibilitychange`;
 *   3. a synchronous sweep reveals whatever is already on screen, rather than
 *      waiting for an observer callback;
 *   4. a scroll/resize sweep backs the observer up, and a timeout drops
 *      `data-motion` entirely if nothing has been revealed — losing the
 *      animation is acceptable, losing the content is not.
 */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SELECTOR =
      "[data-reveal],[data-reveal-wipe],[data-reveal-left],[data-reveal-right],[data-reveal-scale]";

    /* Reveal a little before the element is fully on screen, so the rise has
       somewhere to travel rather than completing off the bottom edge. */
    const MARGIN = 0.12;

    let observer: IntersectionObserver | null = null;
    let breaker = 0;
    let started = false;

    const reveal = (el: Element) => {
      if (el.hasAttribute("data-inview")) return;
      el.setAttribute("data-inview", "");
      observer?.unobserve(el);
    };

    const onScreen = (el: Element) => {
      const r = el.getBoundingClientRect();
      if (!r.width && !r.height) return false;
      const h = window.innerHeight || root.clientHeight;
      return r.top < h * (1 - MARGIN) && r.bottom > 0;
    };

    const sweep = () => {
      document.querySelectorAll(`${SELECTOR}:not([data-inview])`).forEach((el) => {
        if (onScreen(el)) reveal(el);
        else observer?.observe(el);
      });
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        sweep();
        ticking = false;
      });
    };

    const mutations = new MutationObserver(onScroll);

    const start = () => {
      if (started || document.visibilityState !== "visible") return;
      started = true;

      root.setAttribute("data-motion", "");

      if (typeof IntersectionObserver !== "undefined") {
        observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) if (entry.isIntersecting) reveal(entry.target);
          },
          { rootMargin: `0px 0px -${MARGIN * 100}% 0px`, threshold: 0.01 }
        );
      }

      sweep();

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      mutations.observe(document.body, { childList: true, subtree: true });

      /* Last-resort backstop: if nothing has been revealed shortly after start,
         the trigger is not working here — render plain rather than blank. */
      breaker = window.setTimeout(() => {
        if (!document.querySelector(`${SELECTOR}:not([data-inview])`)) return;
        if (document.querySelector("[data-inview]")) return;
        root.removeAttribute("data-motion");
      }, 2000);
    };

    start();
    document.addEventListener("visibilitychange", start);

    return () => {
      window.clearTimeout(breaker);
      document.removeEventListener("visibilitychange", start);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer?.disconnect();
      mutations.disconnect();
      root.removeAttribute("data-motion");
    };
  }, []);

  return null;
}

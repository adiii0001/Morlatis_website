"use client";

import { useEffect, useRef } from "react";

/**
 * Background footage that only costs anything once it is about to be seen.
 *
 * `preload="none"` plus a src that is not attached until the element nears the
 * viewport: the file is several megabytes, and a reader who never scrolls that
 * far should never pay for it. The poster is a still from the same job, so the
 * frame is never empty while the video is fetched.
 *
 * Autoplay is a request, not a guarantee — a browser in a data-saving or
 * low-power mode will refuse it. When the promise rejects the element is given
 * controls, so the footage stays reachable instead of sitting on a dead poster.
 * Reduced motion takes the same path deliberately: poster and controls, and
 * nothing moves until it is asked to.
 */
export function LazyVideo({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.controls = true;
      video.preload = "metadata";
      video.src = src;
      return;
    }

    let attached = false;
    let onScreen = false;

    const start = () => {
      if (!onScreen || document.hidden) return;

      if (!attached) {
        attached = true;
        video.src = src;
        video.load();
      }

      video.play().catch(() => {
        video.controls = true;
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) start();
        else video.pause();
      },
      { rootMargin: "240px" }
    );

    observer.observe(video);

    /*
     * Chrome pauses media in a backgrounded tab. The observer will not fire
     * again on return — the element never stopped intersecting — so without
     * this the reader comes back to a frozen frame.
     */
    const onVisibility = () => {
      if (document.hidden) video.pause();
      else start();
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * The loading screen.
 *
 * A green stage carrying the Morlatis mark, which wipes in behind a moving
 * highlight while a rail fills beneath it; when the page is ready the stage
 * splits and the two halves draw back like curtains to reveal the site.
 *
 * Two things make this safe to put in front of the whole site:
 *
 *  1. It is rendered on the server, so it is painted with the first frame.
 *     A loading screen that only appears once JS has hydrated shows the page
 *     first and then covers it up, which is worse than having none at all.
 *
 *  2. It can always be got rid of without JS. The overlay carries a keyframe
 *     that hides it outright at 2.6s regardless of what the script does, so a
 *     failed bundle, a blocked script or a thrown error cannot leave a reader
 *     staring at a green rectangle. In the normal path React has unmounted it
 *     long before that keyframe is reached.
 *
 * It also owns `<html data-ready>`, which releases the hero's entrance — see
 * the note in components/ui/motion.tsx.
 */

/** Long enough for the mark to finish arriving. Below about a second the
    animation is a flicker, and reads as a glitch rather than an entrance. */
const MIN_VISIBLE = 1150;

/** Never hold the page longer than this waiting on `load`, which does not
    fire until every image and font has settled. */
const MAX_WAIT = 2000;

/** Matches the curtain transition in globals.css. */
const EXIT = 900;

const RATIO = 808 / 300;

export function Preloader() {
  const [gone, setGone] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let exitTimer = 0;
    let unmountTimer = 0;

    const release = () => {
      document.documentElement.setAttribute("data-ready", "");
      setDone(true);
      unmountTimer = window.setTimeout(() => setGone(true), EXIT);
    };

    const finish = () => {
      if (exitTimer) return;
      const held = performance.now() - start;
      exitTimer = window.setTimeout(release, Math.max(0, MIN_VISIBLE - held));
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    /* The ceiling. `load` can be a long way out on a page of photographs, and
       the reader should not be made to wait for the last of them. */
    const cap = window.setTimeout(finish, MAX_WAIT);

    return () => {
      window.clearTimeout(cap);
      window.clearTimeout(exitTimer);
      window.clearTimeout(unmountTimer);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (gone) return null;

  return (
    <div className="preloader" data-done={done ? "" : undefined} aria-hidden="true">
      <div className="preloader-panel preloader-panel-top">
        <div className="grid-field absolute inset-0 opacity-70" />
      </div>
      <div className="preloader-panel preloader-panel-bottom">
        <div className="grid-field absolute inset-0 opacity-70" />
      </div>

      <div className="preloader-core">
        <div className="preloader-mark">
          <Image
            src="/morlatis-logo-white.png"
            alt=""
            width={Math.round(96 * RATIO)}
            height={96}
            priority
            unoptimized
          />
          <span className="preloader-sheen" />
        </div>

        <div className="preloader-rail">
          <span />
        </div>

        <p className="preloader-word">Powering India&apos;s infrastructure</p>
      </div>
    </div>
  );
}

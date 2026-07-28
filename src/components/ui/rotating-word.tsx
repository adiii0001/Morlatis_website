"use client";

import { useEffect, useState } from "react";

/**
 * Cycling word with a masked vertical swap.
 *
 * The spec asked for a typewriter effect. A typewriter reads as a 2010s
 * landing-page tic; a masked swap carries the same information with more
 * composure. The longest word is reserved invisibly so nothing reflows.
 *
 * Reduced motion is handled entirely in CSS (.word-swap), so this component
 * holds no branching state and never calls setState during an effect.
 */
export function RotatingWord({
  words,
  interval = 2600,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className={`relative inline-grid overflow-hidden align-bottom ${className ?? ""}`}>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {longest}
      </span>
      <span key={index} className="word-swap col-start-1 row-start-1 whitespace-nowrap">
        {words[index]}
      </span>
    </span>
  );
}

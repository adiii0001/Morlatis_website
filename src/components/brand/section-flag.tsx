/**
 * The section flag.
 *
 * Every section in the Morlatis UPS brochure opens the same way: a solid green
 * tab with a chamfered trailing edge holding white text, sitting above a short
 * heavy navy rule that is inset from the left. Reproduced here as a heading
 * wrapper so section titles on the site carry the printed identity.
 */
export function SectionFlag({
  children,
  as: Tag = "h2",
  invert = false,
  className = "",
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "p";
  invert?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Tag
        className={`inline-flex items-center py-2.5 pl-5 pr-9 text-[clamp(1.25rem,2.4vw,1.875rem)] font-bold leading-none tracking-[-0.01em] ${
          invert ? "bg-white text-ink-950" : "bg-signal-500 text-white"
        }`}
        // The chamfer. A clip-path rather than a rotated pseudo-element, so the
        // tab keeps its shape at any string length.
        style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 1.15rem) 100%, 0 100%)" }}
      >
        {children}
      </Tag>
      <div
        className={`ml-5 mt-3 h-[3px] w-[9.5rem] max-w-full ${
          invert ? "bg-white/70" : "bg-ink-900"
        }`}
      />
    </div>
  );
}

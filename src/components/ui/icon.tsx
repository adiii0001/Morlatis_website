/**
 * The Morlatis icon set.
 *
 * One 24×24 grid. One 1.5 stroke weight. Round caps and joins throughout.
 * Drawn for this brand — no emoji, no mixed icon libraries.
 */

export type IconName =
  | "bolt"
  | "signal"
  | "relay"
  | "rail"
  | "crate"
  | "trend"
  | "leaf"
  | "arrow-right"
  | "arrow-up-right"
  | "arrow-down"
  | "chevron-down"
  | "menu"
  | "close"
  | "search"
  | "phone"
  | "mail"
  | "pin"
  | "clock"
  | "check"
  | "plus"
  | "shield"
  | "tower"
  | "gauge";

const paths: Record<IconName, React.ReactNode> = {
  bolt: <path d="M13.6 2.5 5 13.9h5.4L9.9 21.5 18.5 10h-5.4l.5-7.5Z" />,
  signal: (
    <>
      <path d="M12 13.5V21" />
      <path d="M8.6 9.9a4.8 4.8 0 0 1 6.8 0" />
      <path d="M5.6 6.6a9 9 0 0 1 12.8 0" />
      <circle cx="12" cy="12" r="1.6" />
    </>
  ),
  relay: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="1" />
      <path d="M2.5 12h4M17.5 12h4" />
      <path d="M9.2 15.2 14.8 9.4" />
      <circle cx="9.2" cy="15.2" r="1" />
    </>
  ),
  rail: (
    <>
      <path d="M8.6 3 6.4 21M15.4 3l2.2 18" />
      <path d="M5.6 8.5h12.8M5 13.2h14M4.4 17.9h15.2" />
    </>
  ),
  crate: (
    <>
      <path d="M3.5 8.2 12 4l8.5 4.2v7.6L12 20l-8.5-4.2V8.2Z" />
      <path d="m3.5 8.2 8.5 4.2 8.5-4.2" />
      <path d="M12 12.4V20" />
    </>
  ),
  trend: (
    <>
      <path d="M3 17.2 8.8 11.4l3.4 3.4L21 6.2" />
      <path d="M15.4 6.2H21v5.6" />
    </>
  ),
  leaf: (
    <>
      <path d="M20.5 3.5c0 9.4-5.4 13.6-11 13.6-2 0-3.7-.6-4.8-1.7 0 0 .6-9.4 7.8-10.5 3.1-.5 8-1.4 8-1.4Z" />
      <path d="M4 20.5c1.8-6 5.6-9.4 10.6-11.4" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M3.5 12h17" />
      <path d="m14 5.5 6.5 6.5-6.5 6.5" />
    </>
  ),
  "arrow-up-right": (
    <>
      <path d="M7 17 17 7" />
      <path d="M8.2 7H17v8.8" />
    </>
  ),
  "arrow-down": (
    <>
      <path d="M12 3.5v17" />
      <path d="m5.5 14 6.5 6.5 6.5-6.5" />
    </>
  ),
  "chevron-down": <path d="m6 9.5 6 6 6-6" />,
  menu: <path d="M3.5 7.5h17M3.5 16.5h17" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.75" />
      <path d="m16.2 16.2 4.3 4.3" />
    </>
  ),
  phone: (
    <path d="M6.3 3.5h3l1.5 3.8-2 1.3a11 11 0 0 0 5.6 5.6l1.3-2 3.8 1.5v3a1.8 1.8 0 0 1-2 1.8A15.6 15.6 0 0 1 4.5 5.5a1.8 1.8 0 0 1 1.8-2Z" />
  ),
  mail: (
    <>
      <rect x="2.75" y="5" width="18.5" height="14" rx="1.75" />
      <path d="m3.5 6.8 8.5 6 8.5-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5s7-6 7-11.5a7 7 0 1 0-14 0c0 5.5 7 11.5 7 11.5Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.75" />
      <path d="M12 6.8V12l3.6 2.2" />
    </>
  ),
  check: <path d="m4.5 12.4 5 5.1L19.5 6.9" />,
  plus: <path d="M12 5v14M5 12h14" />,
  shield: (
    <>
      <path d="M12 2.8 4.8 5.6v6c0 4.4 3 8.2 7.2 9.6 4.2-1.4 7.2-5.2 7.2-9.6v-6L12 2.8Z" />
      <path d="m8.8 11.8 2.3 2.3 4.1-4.4" />
    </>
  ),
  tower: (
    <>
      <path d="M12 2.5v19" />
      <path d="M6.5 21.5 12 2.5l5.5 19" />
      <path d="M8.6 15h6.8M7.6 18.2h8.8M9.7 11.5h4.6" />
      <path d="M4.5 7.5h15" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 17a8.5 8.5 0 1 1 16 0" />
      <path d="M12 17 16 10" />
      <circle cx="12" cy="17" r="1.3" />
    </>
  ),
};

export function Icon({
  name,
  size = 20,
  className,
  strokeWidth = 1.5,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

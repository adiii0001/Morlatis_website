/**
 * Filling the last row of a cell grid.
 *
 * The site's card grids are "cell grids": `gap-px` over a `bg-line` parent, so
 * the 1px gutters read as hairlines between tiles. That treatment has one
 * failure mode — when the item count doesn't divide by the column count, the
 * leftover cells are not blank space, they are grey blocks the same colour as
 * the gutters. Three government projects in a two-column grid left a grey hole;
 * one corporate project left another; the clients page left one per sector.
 *
 * The fix is to widen the final item of the last row by exactly the shortfall,
 * so every row is full at every breakpoint. Nothing is invented to pad the grid
 * out — the last tile simply gets the space that would otherwise be a hole, and
 * reads as a deliberate wider card.
 *
 *   cols 4, 13 items → last row holds 1 → it spans 4
 *   cols 4, 15 items → last row holds 3 → the third spans 2
 *   cols 3,  7 items → last row holds 1 → it spans 3
 *   cols 2,  3 items → last row holds 1 → it spans 2
 */

export type Breakpoint = "base" | "sm" | "md" | "lg";

/** Column count per breakpoint, matching the grid's own `*:grid-cols-*`. */
export type ColumnPlan = Partial<Record<Breakpoint, number>>;

/*
 * Tailwind scans source text for complete class names, so every class has to
 * appear here literally — a template string would compile to nothing.
 */
const SPAN: Record<Breakpoint, Record<number, string>> = {
  base: {
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
  },
  sm: {
    2: "sm:col-span-2",
    3: "sm:col-span-3",
    4: "sm:col-span-4",
    5: "sm:col-span-5",
    6: "sm:col-span-6",
  },
  md: {
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
    5: "md:col-span-5",
    6: "md:col-span-6",
  },
  lg: {
    2: "lg:col-span-2",
    3: "lg:col-span-3",
    4: "lg:col-span-4",
    5: "lg:col-span-5",
    6: "lg:col-span-6",
  },
};

/**
 * Span classes for the item at `index` of `total`. Only the final item is ever
 * widened, and only at breakpoints where the count leaves a shortfall — so this
 * returns "" for every item in a grid that already divides evenly.
 */
export function fillLastRow(total: number, index: number, plan: ColumnPlan): string {
  if (index !== total - 1) return "";

  const classes: string[] = [];

  for (const [breakpoint, cols] of Object.entries(plan) as [Breakpoint, number][]) {
    if (cols < 2) continue;

    /* `total % cols` covers the short grid too: three items in four columns
       leaves a remainder of three, and the third tile spans the missing two. */
    const remainder = total % cols;
    if (remainder === 0) continue;

    const span = SPAN[breakpoint][cols - remainder + 1];
    if (span) classes.push(span);
  }

  return classes.join(" ");
}

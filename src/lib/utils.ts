import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Class merge helper.
 *
 * The rest of this file previously exported twelve utilities — formatNumber,
 * formatCurrency, formatYear, debounce, throttle, generateId, getInitials,
 * slugify, truncate, formatDate, getScrollProgress, isInViewport — none of
 * which were imported anywhere.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

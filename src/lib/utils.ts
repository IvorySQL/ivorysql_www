import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parses a date-only string (e.g. "2026-07-25") as UTC midnight instead of
 * the JS-default local-timezone interpretation. Combined with
 * `timeZone: "UTC"` at format time, this keeps date rendering identical
 * between the server (SSR) and the client's browser timezone, avoiding
 * React hydration mismatches on date-driven text.
 */
export function parseUTCDate(dateStr: string): Date {
  return new Date(dateStr.includes("T") ? dateStr : `${dateStr}T00:00:00Z`);
}

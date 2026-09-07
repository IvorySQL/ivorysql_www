/**
 * Client-safe types and labels for IvorySQL server packages ("介质包").
 *
 * Deliberately separate from `db-releases.ts`: that module carries the
 * build-time GitHub fetch and the committed snapshot, and importing it from a
 * client component would drag both into the browser bundle. Everything here is
 * plain data, safe on either side of the boundary.
 */

/** Every IvorySQL release, all versions and platforms. */
export const GITHUB_RELEASES_URL =
  "https://github.com/IvorySQL/IvorySQL/releases";

export const DB_ARCHES = [
  "x86_64",
  "arm64",
  "loongarch64",
  "mips64el",
] as const;
export type DbArch = (typeof DB_ARCHES)[number];

export const DB_FORMATS = ["rpm", "deb"] as const;
export type DbFormat = (typeof DB_FORMATS)[number];

/** Architecture names are technical identifiers — the same in every locale. */
export const DB_ARCH_LABELS: Record<DbArch, string> = {
  x86_64: "x86_64",
  arm64: "ARM64",
  loongarch64: "LoongArch64",
  mips64el: "MIPS64el",
};

export const DB_FORMAT_LABELS: Record<DbFormat, string> = {
  rpm: "RPM",
  deb: "DEB",
};

export type DbPackage = {
  arch: DbArch;
  format: DbFormat;
  filename: string;
  url: string;
  /** Bytes. Formatted for display at the UI layer. */
  size: number;
  /** `null` when the `.md5` sidecar could not be read — the UI hides the row. */
  md5: string | null;
};

export type DbRelease = {
  /** GitHub tag, e.g. `IvorySQL_5.4`. */
  tag: string;
  /** e.g. `5.4`. */
  version: string;
  /** Major version line, e.g. `5`. */
  line: string;
  /** Date-only (`YYYY-MM-DD`) — format with `parseUTCDate` to stay SSR-safe. */
  publishedAt: string;
  packages: DbPackage[];
};

/** Formats a byte count for display, e.g. `134.5 MB`. */
export function formatPackageSize(bytes: number): string {
  const mb = bytes / 1024 / 1024;
  if (mb >= 1024) return `${(mb / 1024).toFixed(2)} GB`;
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

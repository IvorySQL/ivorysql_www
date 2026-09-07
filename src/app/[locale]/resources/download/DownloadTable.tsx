"use client";

import { Download } from "lucide-react";
import { useTranslations } from "next-intl";

import { CopyButton } from "./CopyButton";

import { cn } from "@/lib/utils";

export type DownloadItem = {
  key: string;
  name: string;
  version: string;
  platform: string;
  size: string;
  checksumAlgo: string;
  checksum: string;
  url: string;
  disabled?: boolean;
};

export type TableVariant = "drivers" | "tools";

const TABLE_STYLES: Record<
  TableVariant,
  {
    headerBg: string;
    platformBg: string;
    checksumBadgeBg: string;
    checksumBadgeText: string;
    dlText: string;
    dlBorder: string;
    dlBg: string;
    dlHoverBg: string;
  }
> = {
  drivers: {
    headerBg: "bg-primary/5",
    platformBg: "bg-primary",
    checksumBadgeBg: "bg-primary/10",
    checksumBadgeText: "text-primary",
    dlText: "text-primary",
    dlBorder: "border-primary/30",
    dlBg: "bg-primary/5",
    dlHoverBg: "hover:bg-primary/15",
  },
  tools: {
    headerBg: "bg-cyan-500/5",
    platformBg: "bg-cyan-500",
    checksumBadgeBg: "bg-cyan-500/10",
    checksumBadgeText: "text-cyan-600 dark:text-cyan-400",
    dlText: "text-cyan-600 dark:text-cyan-400",
    dlBorder: "border-cyan-500/30",
    dlBg: "bg-cyan-500/5",
    dlHoverBg: "hover:bg-cyan-500/15",
  },
};

type Styles = (typeof TABLE_STYLES)[TableVariant];

function DownloadButton({
  item,
  styles,
}: {
  item: DownloadItem;
  styles: Styles;
}) {
  const t = useTranslations("DownloadUI");
  if (item.disabled) {
    return (
      <span className="border-border bg-muted text-muted-foreground inline-flex cursor-not-allowed items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold">
        <Download className="size-3.5" />
        {t("table.download")}
      </span>
    );
  }

  return (
    <a
      href={item.url}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors",
        styles.dlText,
        styles.dlBorder,
        styles.dlBg,
        styles.dlHoverBg,
      )}
    >
      <Download className="size-3.5" />
      {t("table.download")}
    </a>
  );
}

/**
 * The mobile row has more horizontal room for the hash than the desktop
 * checksum column does, so each breakpoint keeps its own truncation width.
 */
const CHECKSUM_SIZES = {
  desktop: { maxWidth: "max-w-[110px]", chars: 14 },
  mobile: { maxWidth: "max-w-[130px]", chars: 16 },
} as const;

function Checksum({
  item,
  styles,
  size,
}: {
  item: DownloadItem;
  styles: Styles;
  size: keyof typeof CHECKSUM_SIZES;
}) {
  if (!item.checksum) {
    return <span className="text-muted-foreground/50 text-xs">—</span>;
  }
  const { maxWidth, chars } = CHECKSUM_SIZES[size];
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={cn(
          "shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold",
          styles.checksumBadgeBg,
          styles.checksumBadgeText,
        )}
      >
        {item.checksumAlgo}
      </span>
      <code
        className={cn(
          "text-muted-foreground truncate font-mono text-xs",
          maxWidth,
        )}
      >
        {item.checksum.slice(0, chars)}...
      </code>
      <CopyButton value={item.checksum} />
    </div>
  );
}

export function DownloadTable({
  items,
  variant,
}: {
  items: DownloadItem[];
  variant: TableVariant;
}) {
  const t = useTranslations("DownloadUI");
  const styles = TABLE_STYLES[variant];
  const headers = [
    t("table.packageType"),
    t("table.size"),
    t("table.integrityCheck"),
    t("table.download"),
  ];

  return (
    <div className="overflow-hidden rounded-xl border">
      {/* Desktop column headers */}
      <div
        className={cn(
          "hidden border-b md:grid md:grid-cols-[2fr_1fr_2.5fr_140px]",
          styles.headerBg,
        )}
      >
        {headers.map((h, i) => (
          <div
            key={h}
            className={cn(
              "text-muted-foreground px-4 py-2.5 text-xs font-bold tracking-wide uppercase",
              i === 3 && "text-center",
            )}
          >
            {h}
          </div>
        ))}
      </div>

      {/* Rows */}
      {items.map((item, idx) => (
        <div
          key={item.key}
          className={cn(idx > 0 && "border-t", idx % 2 === 1 && "bg-muted/20")}
        >
          {/* Desktop */}
          <div className="hidden items-center md:grid md:grid-cols-[2fr_1fr_2.5fr_140px]">
            <div className="px-4 py-4">
              <p className="text-foreground text-sm font-semibold">
                {item.name}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5 text-xs font-semibold text-white",
                    styles.platformBg,
                  )}
                >
                  {item.platform}
                </span>
                <span className="text-muted-foreground text-xs">
                  v{item.version}
                </span>
              </div>
            </div>
            <div className="text-muted-foreground px-4 py-4 text-sm tabular-nums">
              {item.size}
            </div>
            <div className="px-4 py-4">
              <Checksum item={item} styles={styles} size="desktop" />
            </div>
            <div className="flex justify-center px-4 py-4">
              <DownloadButton item={item} styles={styles} />
            </div>
          </div>

          {/* Mobile */}
          <div className="p-4 md:hidden">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-foreground text-sm font-semibold">
                  {item.name}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <span
                    className={cn(
                      "rounded px-1.5 py-0.5 text-xs font-semibold text-white",
                      styles.platformBg,
                    )}
                  >
                    {item.platform}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    v{item.version}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {item.size}
                  </span>
                </div>
                <div className="mt-2">
                  <Checksum item={item} styles={styles} size="mobile" />
                </div>
              </div>
              <div className="shrink-0">
                <DownloadButton item={item} styles={styles} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

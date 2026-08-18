"use client";

import { useState } from "react";

import Link from "next/link";

import {
  Check,
  ClipboardCopy,
  Database,
  Download,
  ExternalLink,
  Mail,
  Settings,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

type DownloadItem = {
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

// ─── Data ────────────────────────────────────────────────────────────────────

const DRIVER_ITEMS: DownloadItem[] = [
  {
    key: "jdbc",
    name: "JDBC Driver",
    version: "9.0",
    platform: "All Platforms",
    size: "1.02 MB",
    checksumAlgo: "MD5",
    checksum: "e3dd1552586cf392cfd8135a7c1fde9e",
    url: "/download/hgdb-jdbc-v9.0.jar",
  },
];

const TOOL_ITEMS: DownloadItem[] = [
  {
    key: "assess-x86",
    name: "Assessment Tool",
    version: "1.0.0",
    platform: "Linux x86_64",
    size: "352 MB",
    checksumAlgo: "MD5",
    checksum: "8a75568de634f5f6ace18797d0d217d8",
    url: "https://yum.highgo.com/dists/IvorySQL/download/assess-1.0.0-linux.gtk.x86_64.tar.gz",
  },
];

// ─── Table variant styles ─────────────────────────────────────────────────────

type TableVariant = "drivers" | "tools";

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

// ─── Sub-components ───────────────────────────────────────────────────────────

function CopyButton({ checksum }: { checksum: string }) {
  const t = useTranslations("DownloadUI");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(checksum).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={t("copyChecksum")}
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded transition-colors",
        copied
          ? "text-green-500"
          : "text-muted-foreground/40 hover:text-muted-foreground",
      )}
    >
      {copied ? (
        <Check className="size-3.5" />
      ) : (
        <ClipboardCopy className="size-3.5" />
      )}
    </button>
  );
}

function DownloadButton({
  item,
  styles,
}: {
  item: DownloadItem;
  styles: (typeof TABLE_STYLES)[TableVariant];
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

function DownloadTable({
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
                <code className="text-muted-foreground max-w-[110px] truncate font-mono text-xs">
                  {item.checksum.slice(0, 14)}...
                </code>
                <CopyButton checksum={item.checksum} />
              </div>
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
                <div className="mt-2 flex items-center gap-1.5">
                  <span
                    className={cn(
                      "shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold",
                      styles.checksumBadgeBg,
                      styles.checksumBadgeText,
                    )}
                  >
                    {item.checksumAlgo}
                  </span>
                  <code className="text-muted-foreground max-w-[130px] truncate font-mono text-xs">
                    {item.checksum.slice(0, 16)}...
                  </code>
                  <CopyButton checksum={item.checksum} />
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

// ─── Main export ──────────────────────────────────────────────────────────────

export function DownloadClient() {
  const t = useTranslations("DownloadUI");
  return (
    <div className="space-y-12">
      {/* Database */}
      <section>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
            <Database className="size-5" />
          </div>
          <div>
            <p className="text-foreground text-base leading-tight font-semibold">
              {t("database.title")}
            </p>
            <p className="text-muted-foreground mt-0.5 text-xs">
              {t("database.subtitle")}
            </p>
          </div>
        </div>
        <Link
          href="https://github.com/IvorySQL/IvorySQL/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-card flex items-center gap-4 rounded-xl border p-5 transition-all hover:border-blue-500/40 hover:bg-blue-500/5"
        >
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-white shadow-sm shadow-blue-500/30">
            <Download className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-foreground text-base font-semibold">
                {t("database.packageName")}
              </span>
              <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                {t("database.latestStable")}
              </span>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              {t("database.description")}
            </p>
          </div>
          <ExternalLink className="size-4 shrink-0 text-blue-500 opacity-50 transition-opacity group-hover:opacity-100" />
        </Link>
      </section>

      {/* Drivers */}
      <section>
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-xl">
            <Zap className="size-5" />
          </div>
          <div>
            <p className="text-foreground text-base leading-tight font-semibold">
              {t("drivers.title")}
            </p>
            <p className="text-muted-foreground mt-0.5 text-xs">
              {t("drivers.subtitle")}
            </p>
          </div>
        </div>
        <DownloadTable items={DRIVER_ITEMS} variant="drivers" />
      </section>

      {/* Tools */}
      <section>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <Settings className="size-5" />
          </div>
          <div>
            <p className="text-foreground text-base leading-tight font-semibold">
              {t("tools.title")}
            </p>
            <p className="text-muted-foreground mt-0.5 text-xs">
              {t("tools.subtitle")}
            </p>
          </div>
        </div>
        <DownloadTable items={TOOL_ITEMS} variant="tools" />
      </section>

      {/* Contact */}
      <div className="border-primary/20 bg-primary/5 flex flex-wrap items-center gap-3 rounded-xl border px-5 py-4">
        <Mail className="text-primary size-4 shrink-0" />
        <p className="text-muted-foreground text-sm">
          {t("contact.needHelp")}{" "}
          <a
            href="mailto:support@ivorysql.org"
            className="text-primary font-semibold hover:underline"
          >
            support@ivorysql.org
          </a>
        </p>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";

import {
  Database,
  Download,
  ExternalLink,
  Mail,
  Settings,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { DatabaseDownload } from "./DatabaseDownload";
import { DownloadTable, type DownloadItem } from "./DownloadTable";

import { GITHUB_RELEASES_URL, type DbRelease } from "@/lib/db-packages";

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

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({
  icon,
  iconClassName,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  iconClassName: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div
        className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-foreground text-base leading-tight font-semibold">
          {title}
        </p>
        <p className="text-muted-foreground mt-0.5 text-xs">{subtitle}</p>
      </div>
    </div>
  );
}

/**
 * Last-resort view for when both the live GitHub fetch and the committed
 * snapshot come up empty — links out rather than leaving the section blank.
 */
function GithubReleasesFallback() {
  const t = useTranslations("DownloadUI");
  return (
    <Link
      href={GITHUB_RELEASES_URL}
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
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function DownloadClient({ releases }: { releases: DbRelease[] }) {
  const t = useTranslations("DownloadUI");

  return (
    <div className="space-y-12">
      {/* Database */}
      <section>
        <SectionHeader
          icon={<Database className="size-5" />}
          iconClassName="bg-blue-500/10 text-blue-500"
          title={t("database.title")}
          subtitle={t("database.subtitle")}
        />
        {releases.length > 0 ? (
          <DatabaseDownload releases={releases} />
        ) : (
          <GithubReleasesFallback />
        )}
      </section>

      {/* Drivers */}
      <section>
        <SectionHeader
          icon={<Zap className="size-5" />}
          iconClassName="bg-primary/10 text-primary"
          title={t("drivers.title")}
          subtitle={t("drivers.subtitle")}
        />
        <DownloadTable items={DRIVER_ITEMS} variant="drivers" />
      </section>

      {/* Tools */}
      <section>
        <SectionHeader
          icon={<Settings className="size-5" />}
          iconClassName="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
          title={t("tools.title")}
          subtitle={t("tools.subtitle")}
        />
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

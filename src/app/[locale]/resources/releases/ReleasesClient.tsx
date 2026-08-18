"use client";

import { useState } from "react";

import { ChevronRight, FileText, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { CURRENT_VERSIONS, HISTORICAL_VERSIONS } from "@/lib/releases";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

type TabId = "current" | "historical";

// ─── Main export ──────────────────────────────────────────────────────────────

const HISTORY_PREVIEW = 10;

export function ReleasesClient() {
  const t = useTranslations("ReleasesUI");
  const [activeTab, setActiveTab] = useState<TabId>("current");
  const [showAllHistory, setShowAllHistory] = useState(false);

  const tabs: { id: TabId; label: string }[] = [
    { id: "current", label: t("tabCurrent") },
    { id: "historical", label: t("tabHistorical") },
  ];

  return (
    <div className="space-y-10">
      {/* Tab Navigation */}
      <div className="border-b">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "-mb-px border-b-2 px-4 pt-1 pb-3 text-sm font-semibold transition-colors",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground border-transparent",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Current Versions */}
      {activeTab === "current" && (
        <div className="space-y-4">
          {CURRENT_VERSIONS.map((item) => (
            <a
              key={item.version}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div
                className={cn(
                  "bg-card flex items-center gap-5 rounded-xl border p-6 transition-all",
                  "hover:-translate-y-0.5 hover:shadow-lg",
                  item.highlight
                    ? "border-l-primary hover:border-primary/30 hover:shadow-primary/10 border-l-[3px]"
                    : "border-l-border hover:shadow-muted/20 border-l-[3px]",
                )}
              >
                {/* Version icon */}
                <div
                  className={cn(
                    "flex size-14 shrink-0 items-center justify-center rounded-xl text-white shadow-sm",
                    item.highlight
                      ? "bg-primary shadow-primary/30"
                      : "bg-slate-500 shadow-slate-500/20 dark:bg-slate-600",
                  )}
                >
                  <FileText className="size-6" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="text-foreground text-lg font-bold">
                      {item.version}
                    </span>
                    {item.highlight && (
                      <span className="bg-primary rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wide text-white uppercase">
                        {t("latestStable")}
                      </span>
                    )}
                  </div>
                  <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                    <span>
                      {t("released")}: {item.date}
                    </span>
                    <span>
                      {t("basedOn")} {item.pg}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight
                  className={cn(
                    "size-5 shrink-0 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:opacity-100",
                    item.highlight ? "text-primary" : "text-muted-foreground",
                  )}
                />
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Historical Versions */}
      {activeTab === "historical" && (
        <div className="overflow-hidden rounded-xl border">
          {/* Header row */}
          <div className="bg-muted/30 hidden border-b px-5 py-3 sm:grid sm:grid-cols-[1fr_160px_24px]">
            <span className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
              {t("colVersion")}
            </span>
            <span className="text-muted-foreground text-right text-xs font-bold tracking-widest uppercase">
              {t("colReleased")}
            </span>
            <div />
          </div>

          {/* Rows */}
          {(showAllHistory
            ? HISTORICAL_VERSIONS
            : HISTORICAL_VERSIONS.slice(0, HISTORY_PREVIEW)
          ).map((item, idx) => (
            <a
              key={item.version}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group hover:bg-primary/5 flex items-center gap-3 px-5 py-3.5 transition-colors",
                idx > 0 && "border-t",
                idx % 2 === 0 ? "bg-muted/10" : "bg-background",
              )}
            >
              {/* Dot */}
              <div className="bg-primary/40 size-2 shrink-0 rounded-full" />
              {/* Version */}
              <span className="text-foreground flex-1 text-sm font-semibold">
                {item.version}
              </span>
              {/* Date */}
              <span className="text-muted-foreground min-w-[120px] text-right text-sm tabular-nums">
                {item.date}
              </span>
              {/* Arrow */}
              <ChevronRight className="text-primary size-4 shrink-0 opacity-30 transition-all group-hover:translate-x-0.5 group-hover:opacity-70" />
            </a>
          ))}

          {/* Expand / Collapse */}
          {!showAllHistory && HISTORICAL_VERSIONS.length > HISTORY_PREVIEW && (
            <button
              onClick={() => setShowAllHistory(true)}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/30 flex w-full items-center justify-center gap-1.5 border-t py-3 text-sm font-medium transition-colors"
            >
              {t("showAll", { count: HISTORICAL_VERSIONS.length })}
              <ChevronRight className="size-4 rotate-90" />
            </button>
          )}
          {showAllHistory && (
            <button
              onClick={() => setShowAllHistory(false)}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/30 flex w-full items-center justify-center gap-1.5 border-t py-3 text-sm font-medium transition-colors"
            >
              {t("showLess")}
              <ChevronRight className="size-4 -rotate-90" />
            </button>
          )}
        </div>
      )}

      {/* Contact */}
      <div className="border-primary/20 bg-primary/5 flex flex-wrap items-center gap-3 rounded-xl border px-5 py-4">
        <Mail className="text-primary size-4 shrink-0" />
        <p className="text-muted-foreground text-sm">
          {t("contactPrompt")}{" "}
          <a
            href="mailto:support@ivorysql.org"
            className="text-primary font-semibold hover:underline"
          >
            {t("contactLink")}
          </a>
        </p>
      </div>
    </div>
  );
}

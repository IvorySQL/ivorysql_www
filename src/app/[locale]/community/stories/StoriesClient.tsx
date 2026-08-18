"use client";

import { useMemo, useState } from "react";

import { ChevronRight, Filter, MessageSquareQuote } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import type { StoryItem } from "@/lib/stories";
import { cn } from "@/lib/utils";

const INDUSTRY_STYLES: Record<string, string> = {
  "public-sector":
    "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  finance:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

const DEFAULT_INDUSTRY_STYLE =
  "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";

interface StoriesClientProps {
  items: StoryItem[];
}

export function StoriesClient({ items }: StoriesClientProps) {
  const t = useTranslations("StoriesUI");
  const [activeIndustry, setActiveIndustry] = useState<string>("all");

  const industries = useMemo(() => {
    const map = new Map<string, string>();
    map.set("all", t("all"));
    for (const item of items) {
      map.set(item.industry, item.industryLabel);
    }
    return Array.from(map.entries()).map(([key, label]) => ({ key, label }));
  }, [items, t]);

  const filteredItems = useMemo(() => {
    if (activeIndustry === "all") return items;
    return items.filter((item) => item.industry === activeIndustry);
  }, [items, activeIndustry]);

  return (
    <div>
      {/* Industry Filter */}
      {industries.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {industries.map((ind) => (
            <button
              key={ind.key}
              onClick={() => setActiveIndustry(ind.key)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                ind.key === activeIndustry
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {ind.key !== "all" && <Filter className="size-3.5" />}
              {ind.label}
            </button>
          ))}
        </div>
      )}

      {/* Story List */}
      {filteredItems.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center py-20 text-center">
          <MessageSquareQuote className="mb-4 size-10 opacity-30" />
          <p className="text-lg">{t("noResults")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {filteredItems.map((item) => (
            <StoryCard key={item.slug} item={item} />
          ))}
        </div>
      )}

      {/* Count */}
      <div className="text-muted-foreground mt-8 flex items-center justify-center gap-2 text-sm">
        <MessageSquareQuote className="size-4" />
        <span>{t("caseCount", { count: filteredItems.length })}</span>
      </div>
    </div>
  );
}

// ─── Story Card ─────────────────────────────────────────────────────────────

function StoryCard({ item }: { item: StoryItem }) {
  const t = useTranslations("StoriesUI");
  const industryStyle =
    INDUSTRY_STYLES[item.industry] ?? DEFAULT_INDUSTRY_STYLE;

  return (
    <Link
      href={item.path}
      className="group bg-card hover:border-primary/30 flex flex-col gap-4 rounded-2xl border p-6 transition-all hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-medium",
            industryStyle,
          )}
        >
          {item.industryLabel}
        </span>
      </div>

      <div>
        <h3 className="text-foreground group-hover:text-primary text-xl leading-snug font-semibold transition-colors">
          {item.title}
        </h3>
        <p className="text-muted-foreground mt-2 line-clamp-3 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>

      {item.stats.length > 0 && (
        <div className="mt-auto grid grid-cols-3 gap-3 border-t pt-4">
          {item.stats.slice(0, 3).map((stat) => (
            <div key={stat.label} className="min-w-0">
              <div className="text-primary text-lg font-bold tracking-tight md:text-xl">
                {stat.value}
              </div>
              <div className="text-muted-foreground mt-0.5 line-clamp-2 text-xs leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-primary flex items-center gap-1 text-sm font-medium opacity-0 transition-all group-hover:opacity-100">
        {t("readMore")}
        <ChevronRight className="size-4" />
      </div>
    </Link>
  );
}

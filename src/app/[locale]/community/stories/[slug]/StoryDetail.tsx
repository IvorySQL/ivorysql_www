"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { StoryContentRenderer } from "./StoryContentRenderer";

import { Link } from "@/i18n/navigation";
import type { StoryItem, StoryItemWithContent } from "@/lib/stories";

const INDUSTRY_STYLES: Record<string, string> = {
  "public-sector":
    "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  finance:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

const DEFAULT_INDUSTRY_STYLE =
  "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";

interface StoryDetailProps {
  item: StoryItemWithContent;
  prevItem: StoryItem | null;
  nextItem: StoryItem | null;
}

export function StoryDetail({ item, prevItem, nextItem }: StoryDetailProps) {
  const t = useTranslations("StoriesUI");
  const industryStyle =
    INDUSTRY_STYLES[item.industry] ?? DEFAULT_INDUSTRY_STYLE;

  return (
    <article className="bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Back Button */}
        <Link
          href="/community/stories"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1 text-sm transition-colors"
        >
          <ChevronLeft className="size-4" />
          {t("backToStories")}
        </Link>

        {/* Hero Section */}
        <div className="mx-auto max-w-3xl">
          {/* Industry Badge */}
          <span
            className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium ${industryStyle}`}
          >
            {item.industryLabel}
          </span>

          {/* Title */}
          <h1 className="text-foreground text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            {item.title}
          </h1>

          {/* Headline */}
          {item.headline && (
            <p className="text-primary mt-4 text-lg font-medium">
              {item.headline}
            </p>
          )}

          {/* Description */}
          <p className="text-muted-foreground mt-3 text-lg leading-relaxed">
            {item.description}
          </p>

          {/* Stats Strip */}
          {item.stats.length > 0 && (
            <div className="bg-muted/30 mt-8 grid grid-cols-2 gap-6 rounded-2xl border p-6 sm:grid-cols-3">
              {item.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-primary text-2xl font-bold tracking-tight md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground mt-1 text-sm leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mx-auto mt-12 max-w-3xl">
          <StoryContentRenderer content={item.content} />
        </div>

        {/* Divider */}
        <div className="mx-auto mt-16 max-w-3xl border-t" />

        {/* Prev/Next Navigation */}
        <div className="mx-auto mt-8 flex max-w-3xl items-center justify-between gap-4">
          {prevItem ? (
            <Link
              href={prevItem.path}
              className="text-muted-foreground hover:text-foreground group flex max-w-[45%] items-center gap-2 text-sm transition-colors"
            >
              <ChevronLeft className="size-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
              <span className="line-clamp-2">{prevItem.title}</span>
            </Link>
          ) : (
            <div />
          )}

          {nextItem ? (
            <Link
              href={nextItem.path}
              className="text-muted-foreground hover:text-foreground group flex max-w-[45%] items-center justify-end gap-2 text-sm transition-colors"
            >
              <span className="line-clamp-2 text-right">{nextItem.title}</span>
              <ChevronRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </article>
  );
}

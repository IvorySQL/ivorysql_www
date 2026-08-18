"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { NewsContentRenderer } from "./NewsContentRenderer";

import { Link } from "@/i18n/navigation";
import type { NewsItemWithContent } from "@/lib/news";

type NewsItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  formattedDate: string;
  category: string;
  categoryLabel: string;
  image: string;
  path: string;
};

interface NewsDetailProps {
  item: NewsItemWithContent;
  prevItem: NewsItem | null;
  nextItem: NewsItem | null;
}

export function NewsDetail({ item, prevItem, nextItem }: NewsDetailProps) {
  const t = useTranslations("NewsUI");
  return (
    <article className="bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Back Button */}
        <Link
          href="/news"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1 text-sm transition-colors"
        >
          <ChevronLeft className="size-4" />
          {t("backToNews")}
        </Link>

        {/* Hero Section */}
        <div className="mx-auto max-w-3xl">
          {/* Category Badge */}
          <span
            className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium ${
              item.category === "product"
                ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                : "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400"
            }`}
          >
            {item.categoryLabel}
          </span>

          {/* Title */}
          <h1 className="text-foreground text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            {item.title}
          </h1>

          {/* Description */}
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            {item.description}
          </p>

          {/* Date */}
          <div className="text-muted-foreground mt-4 text-sm">
            {item.formattedDate}
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto mt-12 max-w-3xl">
          <NewsContentRenderer content={item.content} />
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

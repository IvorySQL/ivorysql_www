"use client";

import { useMemo, useState } from "react";

import Image from "next/image";

import { CalendarDays, ChevronRight, Filter } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

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

interface NewsClientProps {
  items: NewsItem[];
}

export function NewsClient({ items }: NewsClientProps) {
  const t = useTranslations("NewsUI");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const cats = new Map<string, string>();
    cats.set("all", t("all"));
    for (const item of items) {
      cats.set(item.category, item.categoryLabel);
    }
    return Array.from(cats.entries()).map(([key, label]) => ({ key, label }));
  }, [items, t]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              cat.key === activeCategory
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {cat.key !== "all" && <Filter className="size-3.5" />}
            {cat.label}
          </button>
        ))}
      </div>

      {/* News List */}
      {filteredItems.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center py-20 text-center">
          <Filter className="mb-4 size-10 opacity-30" />
          <p className="text-lg">{t("noResults")}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {filteredItems.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      )}

      {/* Count */}
      <div className="text-muted-foreground mt-8 flex items-center justify-center gap-2 text-sm">
        <CalendarDays className="size-4" />
        <span>{t("articleCount", { count: filteredItems.length })}</span>
      </div>
    </div>
  );
}

// ─── News Card ──────────────────────────────────────────────────────────────

function NewsCard({ item }: { item: NewsItem }) {
  const t = useTranslations("NewsUI");
  return (
    <Link
      href={item.path}
      className="group bg-card hover:border-primary/30 flex gap-5 rounded-xl border p-4 transition-all hover:shadow-md md:gap-6 md:p-5"
    >
      {/* Image */}
      <div className="bg-muted/60 relative w-40 shrink-0 overflow-hidden rounded-lg sm:w-52 md:w-64">
        <div className="aspect-[16/10]">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="text-muted-foreground flex size-full items-center justify-center">
              <svg
                className="size-8 opacity-20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2l1.586-1.586a2 2 0 0 1 2.828 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-col justify-center">
        <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs">
          <time>{item.formattedDate}</time>
          <span>·</span>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-medium",
              item.category === "product"
                ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                : "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
            )}
          >
            {item.categoryLabel}
          </span>
        </div>

        <h3 className="text-foreground group-hover:text-primary line-clamp-2 text-lg leading-snug font-semibold transition-colors md:text-xl">
          {item.title}
        </h3>

        <p className="text-muted-foreground mt-1.5 line-clamp-2 text-sm leading-relaxed">
          {item.description}
        </p>

        <div className="text-primary mt-3 flex items-center gap-1 text-sm font-medium opacity-0 transition-all group-hover:opacity-100">
          {t("readMore")}
          <ChevronRight className="size-4" />
        </div>
      </div>
    </Link>
  );
}

import {
  Activity,
  ArrowLeftRight,
  Award,
  Code2,
  ExternalLink,
  Network,
  Shield,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { CertCarousel } from "@/components/blocks/cert-carousel";
import { docUrl } from "@/lib/docs-version";
import {
  CATEGORIES,
  LEGEND_STATUSES,
  TOOL_META,
  getToolStatus,
} from "@/lib/ecosystem";
import type { EcosystemCategory, ToolStatus } from "@/lib/ecosystem";
import { cn } from "@/lib/utils";

type ToolMetaTranslations = Record<string, { desc: string }>;
type CategoryTranslation = { title: string; desc: string };

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "EcosystemPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: "https://www.ivorysql.org/ecosystem",
      images: [{ url: "/og-image.jpg" }],
    },
  };
}

// ─── Style maps (static Tailwind classes only) ────────────────────────────────

const ACCENT_STYLES: Record<
  EcosystemCategory["accent"],
  { bar: string; iconBg: string; iconText: string; label: string }
> = {
  blue: {
    bar: "bg-blue-500",
    iconBg: "bg-blue-500/10",
    iconText: "text-blue-500",
    label: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  },
  teal: {
    bar: "bg-teal-500",
    iconBg: "bg-teal-500/10",
    iconText: "text-teal-500",
    label: "bg-teal-500/10 text-teal-700 dark:text-teal-400",
  },
  indigo: {
    bar: "bg-indigo-500",
    iconBg: "bg-indigo-500/10",
    iconText: "text-indigo-500",
    label: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400",
  },
  amber: {
    bar: "bg-amber-500",
    iconBg: "bg-amber-500/10",
    iconText: "text-amber-500",
    label: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  },
  purple: {
    bar: "bg-purple-500",
    iconBg: "bg-purple-500/10",
    iconText: "text-purple-500",
    label: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  },
  rose: {
    bar: "bg-rose-500",
    iconBg: "bg-rose-500/10",
    iconText: "text-rose-500",
    label: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
  },
};

const CHIP_STYLES: Record<ToolStatus, string> = {
  supported:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/20 transition-colors",
  progress:
    "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/25",
  planned:
    "bg-muted/30 text-muted-foreground/70 border border-dashed border-border/60",
  proprietary:
    "bg-violet-500/10 text-violet-700 dark:text-violet-400 border border-violet-500/25",
};

const DOT_STYLES: Record<Exclude<ToolStatus, "supported">, string> = {
  progress: "bg-amber-500",
  planned: "bg-muted-foreground/40",
  proprietary: "bg-violet-500",
};

const LEGEND_DOT_STYLES: Record<ToolStatus, string> = {
  supported: "bg-emerald-500 rounded-full",
  progress: "bg-amber-500 rounded-full",
  planned:
    "bg-muted-foreground/40 rounded-full border border-dashed border-border",
  proprietary: "bg-violet-500 rounded-full",
};

const CATEGORY_ICONS: Record<EcosystemCategory["accent"], React.ReactNode> = {
  blue: <Network className="size-5" />,
  teal: <Shield className="size-5" />,
  indigo: <Code2 className="size-5" />,
  amber: <Activity className="size-5" />,
  purple: <ArrowLeftRight className="size-5" />,
  rose: <Sparkles className="size-5" />,
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ToolChip({ name, desc }: { name: string; desc?: string }) {
  const status = getToolStatus(name);
  const meta = TOOL_META[name];
  const baseClass = cn(
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
    CHIP_STYLES[status],
  );

  const inner = (
    <>
      {name}
      {status !== "supported" && (
        <span
          className={cn(
            "size-1.5 shrink-0 rounded-full",
            DOT_STYLES[status as Exclude<ToolStatus, "supported">],
          )}
        />
      )}
    </>
  );

  if (meta?.url) {
    return (
      <a
        href={meta.url}
        target="_blank"
        rel="noopener noreferrer"
        title={desc}
        className={baseClass}
      >
        {inner}
      </a>
    );
  }

  return (
    <span title={desc} className={baseClass}>
      {inner}
    </span>
  );
}

function CategoryCard({
  category,
  translation,
  toolMeta,
}: {
  category: EcosystemCategory;
  translation: CategoryTranslation;
  toolMeta: ToolMetaTranslations;
}) {
  const styles = ACCENT_STYLES[category.accent];
  const icon = CATEGORY_ICONS[category.accent];

  return (
    <div className="bg-card flex flex-col overflow-hidden rounded-2xl border">
      {/* Colored accent bar */}
      <div className={cn("h-1 w-full shrink-0", styles.bar)} />

      <div className="flex flex-1 flex-col p-6">
        {/* Header */}
        <div className="mb-4 flex items-start gap-3">
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-xl",
              styles.iconBg,
              styles.iconText,
            )}
          >
            {icon}
          </div>
          <div>
            <h2 className="text-foreground text-base leading-snug font-semibold">
              {translation.title}
            </h2>
            <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
              {translation.desc}
            </p>
          </div>
        </div>

        {/* Tool chips */}
        <div className="flex flex-wrap gap-2">
          {category.tools.map((tool) => {
            // Map tool names with dots to their translation keys (next-intl doesn't allow dots in keys)
            const translationKey = tool.replace(/\./g, "_");
            return (
              <ToolChip
                key={tool}
                name={tool}
                desc={toolMeta[translationKey]?.desc || toolMeta[tool]?.desc}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function EcosystemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "EcosystemPage" });
  const docsLocale = locale === "zh" ? "cn" : "en";
  const toolMetaTranslations = t.raw("toolMeta") as ToolMetaTranslations;
  const categoryTranslations = t.raw("categories") as Record<
    string,
    CategoryTranslation
  >;
  const legendLabels = t.raw("legendLabels") as Record<ToolStatus, string>;

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Page header */}
        <div className="mb-10 lg:mb-14">
          <h1 className="text-foreground text-3xl font-semibold tracking-tight md:text-4xl">
            {t("heading")}
          </h1>
          <p className="text-muted-foreground mt-2 max-w-3xl text-lg">
            {t("subheading")}
          </p>
        </div>

        {/* Legend */}
        <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2">
          {LEGEND_STATUSES.map((status) => (
            <div key={status} className="flex items-center gap-1.5">
              <span
                className={cn("size-2 shrink-0", LEGEND_DOT_STYLES[status])}
              />
              <span className="text-muted-foreground text-xs">
                {legendLabels[status]}
              </span>
            </div>
          ))}
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.key}
              category={category}
              translation={categoryTranslations[category.key]}
              toolMeta={toolMetaTranslations}
            />
          ))}
        </div>

        {/* Domestic Compatibility & Certification */}
        <div className="mt-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
              <Award className="size-5" />
            </div>
            <div>
              <h2 className="text-foreground text-xl font-semibold">
                {t("domesticCompatTitle")}
              </h2>
              <p className="text-muted-foreground mt-0.5 text-sm">
                {t("domesticCompatDescription")}
              </p>
            </div>
          </div>

          <CertCarousel />
        </div>

        {/* Docs link */}
        <div className="mt-10 text-center">
          <a
            href={docUrl(docsLocale, "cpu_arch_adp")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          >
            {t("browseDocsLink")}
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

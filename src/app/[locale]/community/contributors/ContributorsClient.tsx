"use client";

import { useMemo, useState } from "react";

import Image from "next/image";

import { ChevronLeft, ExternalLink, Search, Users } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import type { Contributor } from "@/lib/contributors";

const toneClasses = [
  "from-blue-500 to-blue-400",
  "from-orange-400 to-amber-300",
  "from-indigo-900 to-indigo-600",
  "from-emerald-500 to-teal-400",
  "from-violet-600 to-violet-400",
  "from-amber-700 to-amber-500",
];

function getToneClass(id: string): string {
  const seed = id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return toneClasses[seed % 6];
}

function getMonogram(name: string): string {
  const cleaned = name.replace(/^@/, "");
  const parts = cleaned.split(/[\s-]+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return cleaned.slice(0, 2).toUpperCase();
}

function ContributorCard({ contributor }: { contributor: Contributor }) {
  const toneClass = getToneClass(contributor.id);
  const githubUrl = contributor.github
    ? `https://github.com/${contributor.github}`
    : null;
  const localAvatarUrl = contributor.avatarSrc || null;
  const showGithubAvatar =
    !localAvatarUrl && githubUrl && contributor.avatarMode !== "monogram";
  const avatarSrc = localAvatarUrl
    ? localAvatarUrl
    : showGithubAvatar
      ? `https://github.com/${contributor.github}.png?size=240`
      : null;
  const yearsLabel = contributor.years.join(" \u00b7 ");

  return (
    <article className="group rounded-2xl border bg-gradient-to-b from-white to-zinc-50/50 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 dark:from-zinc-900 dark:to-zinc-800/50 dark:hover:border-blue-800">
      <div className="flex items-center gap-4">
        <div
          className={`relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br text-base font-bold tracking-wide text-white shadow-sm ${toneClass}`}
        >
          {avatarSrc ? (
            <Image
              src={avatarSrc}
              alt={contributor.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          ) : (
            <span>{getMonogram(contributor.name)}</span>
          )}
        </div>
        <div className="min-w-0">
          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground text-sm font-semibold transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              {contributor.name}
            </a>
          ) : (
            <h3 className="text-foreground text-sm font-semibold">
              {contributor.name}
            </h3>
          )}
          {contributor.github ? (
            <p className="text-muted-foreground mt-0.5 text-xs">
              @{contributor.github}
            </p>
          ) : null}
        </div>
      </div>
      <p className="text-primary mt-3 text-xs font-bold">{yearsLabel}</p>
    </article>
  );
}

interface ContributorsClientProps {
  contributors: Contributor[];
  contributorYears: number[];
  includedYears: string;
}

export function ContributorsClient({
  contributors: allContributors,
  contributorYears,
  includedYears,
}: ContributorsClientProps) {
  const t = useTranslations("ContributorsPage");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [query, setQuery] = useState("");
  const deferredQuery = query.trim().toLowerCase();

  const filterOptions = useMemo(
    () => [
      { key: "all", label: t("filterAll") },
      ...contributorYears.map((year) => ({
        key: String(year),
        label: String(year),
      })),
    ],
    [contributorYears, t],
  );

  const filteredContributors = useMemo(() => {
    return allContributors.filter((item) => {
      const matchesYear =
        selectedYear === "all" || item.years.includes(Number(selectedYear));
      const matchesQuery =
        !deferredQuery ||
        item.name.toLowerCase().includes(deferredQuery) ||
        (item.github && item.github.toLowerCase().includes(deferredQuery));
      return matchesYear && matchesQuery;
    });
  }, [deferredQuery, selectedYear, allContributors]);

  return (
    <div className="bg-background">
      {/* Subtle gradient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.06),transparent_24%),radial-gradient(circle_at_left_18%,rgba(99,130,255,0.05),transparent_20%),linear-gradient(180deg,#f8fafc_0%,#ffffff_24%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_24%),radial-gradient(circle_at_left_18%,rgba(99,130,255,0.06),transparent_20%),linear-gradient(180deg,#0c0c0c_0%,#111111_24%,#0c0c0c_100%)]" />

      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Back Link */}
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1 text-sm transition-colors"
        >
          <ChevronLeft className="size-4" />
          {t("backToHome")}
        </Link>

        {/* Hero */}
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-b from-white to-zinc-50/80 p-8 shadow-xl shadow-slate-200/40 md:p-10 dark:from-zinc-900 dark:to-zinc-800/60 dark:shadow-none">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/3 to-transparent" />

            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                <Users className="size-3.5" />
                {t("badge")}
              </div>
              <h1 className="text-foreground text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                {t("heading")}
              </h1>
              <p className="text-muted-foreground mt-4 max-w-3xl text-lg leading-relaxed">
                {t("description")}
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <span className="text-muted-foreground inline-flex items-center gap-1.5 rounded-full border border-blue-200/60 bg-white/80 px-3.5 py-2 text-sm dark:border-blue-800/40 dark:bg-zinc-800/80">
                  <Users className="size-3.5 text-blue-500" />
                  {t("statContributors", { count: allContributors.length })}
                </span>
                <span className="text-muted-foreground inline-flex items-center gap-1.5 rounded-full border border-blue-200/60 bg-white/80 px-3.5 py-2 text-sm dark:border-blue-800/40 dark:bg-zinc-800/80">
                  {t("statYearsIncluded", { years: includedYears })}
                </span>
                <span className="text-muted-foreground inline-flex items-center gap-1.5 rounded-full border border-blue-200/60 bg-white/80 px-3.5 py-2 text-sm dark:border-blue-800/40 dark:bg-zinc-800/80">
                  {t("statCategory")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mx-auto mt-8 max-w-5xl">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap gap-2.5">
              {filterOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setSelectedYear(option.key)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    selectedYear === option.key
                      ? "border border-transparent bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-muted-foreground border border-zinc-200 bg-white/90 hover:border-blue-300 hover:text-blue-600 dark:border-zinc-700 dark:bg-zinc-800/90 dark:hover:border-blue-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="relative min-w-[min(100%,280px)] flex-1">
              <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="text-foreground placeholder:text-muted-foreground w-full rounded-xl border border-blue-200/30 bg-white/90 py-2.5 pr-4 pl-10 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-all focus:border-blue-400/60 focus:ring-4 focus:ring-blue-500/10 focus:outline-none dark:border-blue-800/30 dark:bg-zinc-800/90 dark:focus:border-blue-600/60"
                aria-label={t("searchPlaceholder")}
              />
            </div>
          </div>
        </div>

        {/* Contributor Grid */}
        <div className="mx-auto mt-8 max-w-5xl">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-foreground text-2xl font-semibold">
              {t("gridHeading")}
            </h2>
            <p className="text-muted-foreground text-sm">
              {t("gridCount", { count: filteredContributors.length })}
            </p>
          </div>

          {filteredContributors.length ? (
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredContributors.map((contributor) => (
                <ContributorCard
                  key={contributor.id}
                  contributor={contributor}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-blue-300/40 bg-white/80 px-8 py-10 text-center dark:border-blue-700/40 dark:bg-zinc-800/60">
              <Users className="text-muted-foreground/50 mb-3 size-8" />
              <p className="text-muted-foreground text-sm">{t("noResults")}</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mx-auto mt-8 max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-blue-200/20 pt-6 dark:border-blue-800/20">
            <div className="flex max-w-2xl flex-col gap-2">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t("ctaWant")}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t("ctaCertificate")}{" "}
                <a
                  href="https://github.com/IvorySQL/community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
                >
                  {t("ctaCertificateLink")}
                </a>
              </p>
            </div>
            <Link
              href="/community/contribution-guidelines"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700"
            >
              {t("ctaButton")}
              <ExternalLink className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

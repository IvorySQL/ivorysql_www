"use client";

import Image from "next/image";

import { ChevronLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { MDXRenderer } from "@/app/[locale]/blog/[slug]/MDXRenderer";
import { Link } from "@/i18n/navigation";
import type { IvoryEventWithContent } from "@/lib/events";
import { parseUTCDate } from "@/lib/utils";

type IvoryEvent = {
  slug: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  eventType: string;
  type: "Online" | "Offline";
  image: string;
  path: string;
};

interface EventDetailProps {
  event: IvoryEventWithContent;
  prevEvent: IvoryEvent | null;
  nextEvent: IvoryEvent | null;
  relatedEvents: IvoryEvent[];
}

export function EventDetail({
  event,
  prevEvent,
  nextEvent,
  relatedEvents,
}: EventDetailProps) {
  const locale = useLocale();
  const t = useTranslations("EventsUI");
  const tc = useTranslations("Common");
  const dateLocale = locale === "zh" ? "zh-CN" : "en-US";

  return (
    <article className="bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Back Button */}
        <Link
          href="/community/events"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1 text-sm transition-colors"
        >
          <ChevronLeft className="size-4" />
          {t("backToEvents")}
        </Link>

        {/* Hero Section */}
        <div className="mx-auto max-w-3xl">
          {/* Event Type Badge */}
          <span className="text-primary border-primary/20 bg-primary/5 mb-4 inline-block rounded-full border px-3 py-1 text-xs font-medium">
            {event.eventType}
          </span>

          {/* Title */}
          <h1 className="text-foreground text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            {event.title}
          </h1>

          {/* Description */}
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            {event.description}
          </p>

          {/* Meta Row */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {/* Date */}
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <time>
                {formatDateRange(event.date, event.endDate, dateLocale)}
              </time>
            </div>

            {/* Location */}
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {event.location}
            </div>

            {/* Type */}
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    event.type === "Online"
                      ? "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      : "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  }
                />
              </svg>
              {event.type}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto mt-10 max-w-3xl">
          <div className="prose prose-lg dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-strong:text-foreground prose-strong:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:border prose-img:border-border prose-code:text-foreground prose-code:rounded-md prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-normal prose-pre:border prose-pre:border-border prose-pre:bg-muted/30 max-w-none">
            <MDXRenderer content={event.content} />
          </div>

          {/* Prev/Next Navigation */}
          {(prevEvent || nextEvent) && (
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {prevEvent && (
                <Link
                  href={prevEvent.path}
                  className="group bg-muted/30 hover:bg-muted/50 rounded-xl border-0 p-5 transition-all"
                >
                  <p className="text-muted-foreground text-xs">
                    {t("previousEvent")}
                  </p>
                  <p className="text-foreground mt-1 text-sm font-medium group-hover:underline">
                    {prevEvent.title}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {parseUTCDate(prevEvent.date).toLocaleDateString(
                      dateLocale,
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        timeZone: "UTC",
                      },
                    )}
                  </p>
                </Link>
              )}
              {nextEvent && (
                <Link
                  href={nextEvent.path}
                  className="group bg-muted/30 hover:bg-muted/50 rounded-xl border-0 p-5 text-right transition-all sm:ml-auto sm:max-w-sm"
                >
                  <p className="text-muted-foreground text-xs">
                    {t("nextEvent")}
                  </p>
                  <p className="text-foreground mt-1 text-sm font-medium group-hover:underline">
                    {nextEvent.title}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {parseUTCDate(nextEvent.date).toLocaleDateString(
                      dateLocale,
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        timeZone: "UTC",
                      },
                    )}
                  </p>
                </Link>
              )}
            </div>
          )}

          {/* Related Events */}
          {relatedEvents.length > 0 && (
            <div className="border-border mt-12 border-t pt-8">
              <h3 className="text-foreground mb-4 text-sm font-semibold">
                {t("relatedEvents")}
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {relatedEvents.map((re) => (
                  <Link key={re.slug} href={re.path} className="group block">
                    <div className="bg-muted/60 relative aspect-[16/10] overflow-hidden rounded-lg">
                      {re.image ? (
                        <Image
                          src={re.image}
                          alt={re.title}
                          fill
                          sizes="(min-width: 640px) 33vw, 100vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : null}
                    </div>
                    <p className="text-foreground mt-2 line-clamp-2 text-sm font-medium group-hover:underline">
                      {re.title}
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {parseUTCDate(re.date).toLocaleDateString(dateLocale, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        timeZone: "UTC",
                      })}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-muted/30 mt-12 flex flex-wrap items-center justify-between gap-6 rounded-xl border-0 p-6">
            <div>
              <h3 className="text-foreground text-sm font-semibold">
                {t("joinCommunity.title")}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                {t("joinCommunity.description")}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link
                href="/community/contribution-guidelines"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-center text-sm font-medium transition-colors"
              >
                {tc("getStarted")}
              </Link>
              <Link
                href="https://github.com/IvorySQL/IvorySQL"
                className="border-border bg-background text-foreground hover:bg-muted rounded-lg border px-4 py-2 text-center text-sm font-medium transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function formatDate(dateStr: string, dateLocale: string): string {
  const date = parseUTCDate(dateStr);
  return date.toLocaleDateString(dateLocale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatDateRange(
  dateStr: string,
  endDateStr: string | undefined,
  dateLocale: string,
): string {
  const start = formatDate(dateStr, dateLocale);
  if (!endDateStr || endDateStr === dateStr) return start;
  const end = formatDate(endDateStr, dateLocale);
  return `${start} → ${end}`;
}

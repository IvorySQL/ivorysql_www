import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { getAllEventSlugs, getEventData } from "@/lib/events";
import { getAllNewsSlugs, getNewsItem } from "@/lib/news";
import { getAllPostSlugs, getPostdata } from "@/lib/posts";
import { getAllStorySlugs, getStoryItem } from "@/lib/stories";

const BASE_URL = "https://www.ivorysql.org";

const STATIC_PATHS = [
  "/",
  "/blog",
  "/news",
  "/community/events",
  "/community/expert-advisory-committee",
  "/community/contribution-guidelines",
  "/community/contributors",
  "/community/roadmap",
  "/community/stories",
  "/ecosystem",
  "/partners",
  "/resources/download",
  "/resources/releases",
  "/security/vulnerability-management",
];

function localizedUrl(locale: string, path: string): string {
  const normalizedPath = path === "/" ? "" : path;
  return locale === routing.defaultLocale
    ? `${BASE_URL}${normalizedPath || "/"}`
    : `${BASE_URL}/${locale}${normalizedPath}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    entries.push({
      url: localizedUrl(routing.defaultLocale, path),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((locale) => [locale, localizedUrl(locale, path)]),
        ),
      },
    });
  }

  for (const locale of routing.locales) {
    for (const slug of getAllPostSlugs(locale)) {
      const post = getPostdata(locale, slug);
      entries.push({
        url: localizedUrl(locale, post.path),
        lastModified: post.date,
      });
    }
    for (const slug of getAllNewsSlugs(locale)) {
      const item = getNewsItem(locale, slug);
      entries.push({
        url: localizedUrl(locale, item.path),
        lastModified: item.date,
      });
    }
    for (const slug of getAllEventSlugs(locale)) {
      const event = getEventData(locale, slug);
      entries.push({
        url: localizedUrl(locale, event.path),
        lastModified: event.date,
      });
    }
    for (const slug of getAllStorySlugs(locale)) {
      const story = getStoryItem(locale, slug);
      entries.push({
        url: localizedUrl(locale, story.path),
      });
    }
  }

  return entries;
}

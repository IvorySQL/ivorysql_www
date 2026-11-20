import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { EventsClient } from "./EventsClient";

import { getSortedEvents } from "@/lib/events";
import { buildAlternates } from "@/lib/hreflang";

// Supply a fresh initial clock for the client status overview.
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "EventsPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates("/community/events"),
    openGraph: {
      title: t("heading"),
      description: t("metaDescription"),
      url: "https://www.ivorysql.org/community/events",
      images: [{ url: "/og-image.jpg" }],
    },
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("EventsPage");
  const allEvents = getSortedEvents(locale);

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-foreground text-3xl font-semibold tracking-tight md:text-4xl">
            {t("heading")}
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl text-lg">
            {t("subheading")}
          </p>
        </div>

        <EventsClient allEvents={allEvents} initialNow={Date.now()} />
      </div>
    </div>
  );
}

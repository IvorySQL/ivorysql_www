"use client";

import { useState } from "react";

import Image from "next/image";

import { ChevronLeft, Mail, UserRound } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import type { ExpertCommitteeMember } from "@/lib/expert-committee";

function ExpertAvatar({
  expert,
  locale,
}: {
  expert: ExpertCommitteeMember;
  locale: string;
}) {
  const name = locale === "zh" ? expert.name.zh : expert.name.en;

  if (!expert.avatar) {
    return (
      <span className="bg-muted text-muted-foreground/60 flex size-24 shrink-0 items-center justify-center rounded-full">
        <UserRound className="size-10" strokeWidth={1.5} />
      </span>
    );
  }

  const framing = expert.avatarFraming;

  return (
    <span className="ring-primary/15 relative size-24 shrink-0 overflow-hidden rounded-full ring-4">
      <Image
        src={expert.avatar}
        alt={name}
        fill
        sizes="96px"
        className="object-cover"
        style={
          framing
            ? {
                objectPosition: framing.position,
                transform: `scale(${framing.scale})`,
                transformOrigin: framing.position,
              }
            : undefined
        }
      />
    </span>
  );
}

function ExpertCard({ expert }: { expert: ExpertCommitteeMember }) {
  const locale = useLocale();
  const t = useTranslations("ExpertCommitteePage");
  const [expanded, setExpanded] = useState(false);
  const name = locale === "zh" ? expert.name.zh : expert.name.en;
  const title = locale === "zh" ? expert.title.zh : expert.title.en;
  const bio = locale === "zh" ? expert.bio.zh : expert.bio.en;
  const bioId = `${expert.id}-bio`;

  return (
    <article className="group bg-card flex flex-col items-center rounded-2xl border p-6 text-center transition-shadow hover:shadow-lg">
      <ExpertAvatar expert={expert} locale={locale} />
      <h3 className="text-foreground mt-4 text-base font-semibold">{name}</h3>
      <p className="text-muted-foreground mt-1 text-sm">{title}</p>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={bioId}
        onClick={() => setExpanded((value) => !value)}
        className="text-primary mt-3 text-xs font-medium underline-offset-4 hover:underline"
      >
        {expanded ? t("hideBio") : t("readBio")}
      </button>
      {expanded && (
        <p
          id={bioId}
          className="text-muted-foreground mt-3 text-left text-sm leading-relaxed"
        >
          {bio}
        </p>
      )}
    </article>
  );
}

interface ExpertCommitteeClientProps {
  experts: ExpertCommitteeMember[];
}

export function ExpertCommitteeClient({ experts }: ExpertCommitteeClientProps) {
  const t = useTranslations("ExpertCommitteePage");

  return (
    <div className="bg-background">
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
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="text-foreground mt-3 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            {t("heroDescription")}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <span className="text-muted-foreground rounded-full border px-3.5 py-2 text-sm">
              {t("statExperts", { count: experts.length })}
            </span>
            <span className="text-muted-foreground rounded-full border px-3.5 py-2 text-sm">
              {t("statGlobal")}
            </span>
            <span className="text-muted-foreground rounded-full border px-3.5 py-2 text-sm">
              {t("statUnordered")}
            </span>
          </div>
        </div>

        {/* Members */}
        <div className="mx-auto mt-12 max-w-6xl">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-foreground text-2xl font-semibold">
                {t("sectionTitle")}
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                {t("orderNote")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {experts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div className="mx-auto mt-12 max-w-6xl">
          <div className="bg-muted/30 flex flex-wrap items-center justify-between gap-6 rounded-2xl border-0 p-8">
            <div className="max-w-2xl">
              <h2 className="text-foreground text-xl font-semibold">
                {t("joinTitle")}
              </h2>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {t("joinDescription")}
              </p>
            </div>
            <a
              href="mailto:ivorysql1213@gmail.com"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors"
            >
              <Mail className="size-4" />
              {t("joinAction")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

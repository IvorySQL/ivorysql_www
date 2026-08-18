"use client";

import {
  ArrowRight,
  Building2,
  Factory,
  Flame,
  Globe2,
  Landmark,
  Lock,
  Puzzle,
  Rocket,
  Split,
  Wallet,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

// ─── Industries & scale ────────────────────────────────────────────────────────

const INDUSTRIES_DEF = [
  { key: "finance", icon: Landmark, tint: "text-blue-600 dark:text-blue-400" },
  {
    key: "telecom",
    icon: Building2,
    tint: "text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "government",
    icon: Lock,
    tint: "text-violet-600 dark:text-violet-400",
  },
  { key: "energy", icon: Flame, tint: "text-orange-600 dark:text-orange-400" },
  {
    key: "manufacturing",
    icon: Factory,
    tint: "text-rose-600 dark:text-rose-400",
  },
  { key: "internet", icon: Globe2, tint: "text-sky-600 dark:text-sky-400" },
];

const SCALE_TAGS_DEF = [
  "startupMvp",
  "smbProduction",
  "enterpriseCore",
  "missionCritical",
  "multiRegion",
  "highConcurrency",
];

// ─── Pain points → Solutions ───────────────────────────────────────────────────

const CHALLENGES_DEF = [
  {
    key: "licensing",
    icon: Wallet,
    accent: "from-rose-500/20 to-amber-500/20",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  {
    key: "migration",
    icon: Puzzle,
    accent: "from-amber-500/20 to-orange-500/20",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    key: "htap",
    icon: Split,
    accent: "from-violet-500/20 to-blue-500/20",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    key: "compliance",
    icon: Rocket,
    accent: "from-emerald-500/20 to-teal-500/20",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export const BusinessValue = () => {
  const t = useTranslations("BusinessValue");
  const reduce = useReducedMotion();

  return (
    <section className="py-10 lg:py-14">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            {t("heading")}
          </h2>
          <p className="text-muted-foreground mt-4 leading-snug">
            {t("description")}
          </p>
        </motion.div>

        {/* ── Sub-section 1: Industries & Scale ── */}
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 lg:mt-12"
        >
          <p className="text-muted-foreground mb-4 text-center text-xs font-semibold tracking-wider uppercase">
            {t("industriesLabel")}
          </p>

          {/* Industry pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {INDUSTRIES_DEF.map((item) => {
              const Icon = item.icon;
              const label = t(`industries.${item.key}`);
              return (
                <div
                  key={item.key}
                  className="bg-card hover:bg-muted/60 group flex items-center gap-2 rounded-full border px-3.5 py-1.5 transition-all hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <Icon
                    className={cn(
                      "size-3.5 transition-transform group-hover:scale-110",
                      item.tint,
                    )}
                  />
                  <span className="text-foreground text-xs font-medium">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Scale tags */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
            {SCALE_TAGS_DEF.map((tagKey) => (
              <span
                key={tagKey}
                className="text-muted-foreground bg-muted/30 rounded-md px-2 py-0.5 text-[10px] font-medium"
              >
                {t(`scaleTags.${tagKey}`)}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Sub-section 2: Pain Points → Solutions ── */}
        <div className="mt-12 lg:mt-14">
          <p className="text-muted-foreground mb-6 text-center text-xs font-semibold tracking-wider uppercase">
            {t("challengesLabel")}
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {CHALLENGES_DEF.map((c, i) => {
              const Icon = c.icon;
              const pain = t(`challenges.${c.key}.pain`);
              const solution = t(`challenges.${c.key}.solution`);
              return (
                <motion.div
                  key={c.key}
                  initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl p-[1.5px]",
                    "transition-all duration-300 hover:shadow-lg",
                    `bg-gradient-to-br ${c.accent}`,
                  )}
                >
                  <div className="bg-card relative flex h-full flex-col gap-4 rounded-[calc(1.5rem-1.5px)] p-6">
                    {/* Top: Icon + Pain */}
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                          c.iconBg,
                        )}
                      >
                        <Icon className={cn("size-5", c.iconColor)} />
                      </div>
                      <div className="flex-1">
                        <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                          {t("challengeBadge")}
                        </span>
                        <h3 className="text-foreground mt-1 text-base leading-snug font-semibold">
                          {pain}
                        </h3>
                      </div>
                    </div>

                    {/* Divider with arrow */}
                    <div className="flex items-center gap-2 pl-[52px]">
                      <div className="bg-border h-px flex-1" />
                      <ArrowRight className="text-muted-foreground size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>

                    {/* Bottom: Solution */}
                    <div className="pl-[52px]">
                      <span
                        className={cn(
                          "text-[10px] font-semibold tracking-wider uppercase",
                          c.iconColor,
                        )}
                      >
                        {t("solutionBadge")}
                      </span>
                      <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                        {solution}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-muted-foreground mb-3 text-sm">
            {t("ctaQuestion")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/community/stories"
              className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              {t("readCustomerStories")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

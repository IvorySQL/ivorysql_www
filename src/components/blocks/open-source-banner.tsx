"use client";

import { Gift, Heart, ScrollText, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const PERKS_DEF = [
  { key: "freeForever", icon: Heart },
  { key: "apache2", icon: ScrollText },
  { key: "commercialUse", icon: Sparkles },
];

export const OpenSourceBanner = () => {
  const t = useTranslations("OpenSourceBanner");
  const reduce = useReducedMotion();

  return (
    <section className="relative px-4 py-4">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="bg-primary/10 h-40 w-[60%] rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-5xl"
      >
        {/* Animated gradient border wrapper */}
        <div className="relative rounded-3xl p-[1.5px]">
          <div
            className={cn(
              "absolute inset-0 rounded-3xl",
              "bg-[linear-gradient(110deg,hsl(var(--primary)),hsl(45_93%_58%),hsl(280_80%_65%),hsl(var(--primary)))]",
              "animate-gradient-border bg-[length:250%_100%]",
            )}
          />

          {/* Inner card */}
          <div className="bg-background/90 relative flex flex-col items-center gap-5 overflow-hidden rounded-[calc(1.5rem-1.5px)] px-6 py-7 backdrop-blur-sm sm:flex-row sm:gap-6 sm:px-8 sm:py-6">
            {/* Shimmer sweep */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div
                className={cn(
                  "absolute inset-y-0 -left-1/3 w-1/2",
                  "via-primary/5 bg-gradient-to-r from-transparent to-transparent",
                  "animate-shimmer",
                )}
              />
            </div>

            {/* Icon cluster */}
            <div className="relative flex shrink-0 items-center justify-center">
              <div className="bg-primary/15 absolute size-20 rounded-full blur-xl" />
              <div className="bg-primary/10 ring-primary/20 relative flex size-16 items-center justify-center rounded-2xl shadow-sm ring-1">
                <Gift className="text-primary size-7" />
                <span className="ring-background absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-md ring-2">
                  <Sparkles className="size-3 text-white" />
                </span>
              </div>
            </div>

            {/* Text */}
            <div className="relative flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <h3 className="text-foreground text-lg font-semibold tracking-tight sm:text-xl">
                  {t("title")}
                </h3>
                <span className="bg-primary/10 text-primary border-primary/20 rounded-full border px-2 py-0.5 text-[10px] font-medium">
                  {t("license")}
                </span>
              </div>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                {t("description")}{" "}
                <span className="text-foreground font-medium">
                  {t("descriptionHighlight")}
                </span>
              </p>
            </div>

            {/* Learn more */}
            <div className="relative shrink-0">
              <Link
                href="/community/contribution-guidelines"
                className="group text-primary hover:text-primary/80 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              >
                {t("joinCommunity")}
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Perk chips */}
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{
            duration: 0.5,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {PERKS_DEF.map((perk) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.key}
                className="bg-muted/40 hover:bg-muted/60 group hover:border-primary/20 flex items-center gap-2 rounded-full border border-transparent px-3.5 py-1.5 transition-all hover:shadow-sm"
                title={t(`perks.${perk.key}.detail`)}
              >
                <Icon className="text-primary size-3.5 transition-transform group-hover:scale-110" />
                <span className="text-muted-foreground group-hover:text-foreground text-xs font-medium">
                  {t(`perks.${perk.key}.label`)}
                </span>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

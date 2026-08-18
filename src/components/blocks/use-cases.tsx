"use client";

import { BarChart3, Database, Globe, MapPin, Server } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const USE_CASES_DEF = [
  {
    key: "enterpriseDb",
    icon: Database,
    accent: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200/50 dark:border-blue-800/40",
    glow: "group-hover:shadow-blue-500/10",
  },
  {
    key: "lbs",
    icon: MapPin,
    accent: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-200/50 dark:border-emerald-800/40",
    glow: "group-hover:shadow-emerald-500/10",
  },
  {
    key: "unifiedData",
    icon: BarChart3,
    accent: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950/40",
    border: "border-violet-200/50 dark:border-violet-800/40",
    glow: "group-hover:shadow-violet-500/10",
  },
  {
    key: "aiEmpowered",
    icon: Globe,
    accent: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200/50 dark:border-amber-800/40",
    glow: "group-hover:shadow-amber-500/10",
  },
  {
    key: "dbMigration",
    icon: Server,
    accent: "text-rose-600",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    border: "border-rose-200/50 dark:border-rose-800/40",
    glow: "group-hover:shadow-rose-500/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const UseCases = () => {
  const t = useTranslations("UseCases");
  const useCases = USE_CASES_DEF.map((item) => ({
    ...item,
    title: t(`${item.key}.title`),
    desc: t(`${item.key}.description`),
  }));

  return (
    <section className="py-10 lg:py-14">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-2xl tracking-tight md:text-4xl lg:text-5xl">
            {t("heading")}
          </h2>
          <p className="text-muted-foreground mt-2 text-base leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Row 1: 3 cards */}
        <motion.div
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {useCases.slice(0, 3).map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-xl border bg-gradient-to-b from-white to-zinc-50/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:from-zinc-900 dark:to-zinc-800/50"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${item.bg} ${item.accent} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-foreground text-base font-semibold">
                    {item.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {item.desc}
                </p>
                {/* Bottom accent line */}
                <div
                  className={`absolute inset-x-0 bottom-0 h-0.5 ${item.bg} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Row 2: 2 cards centered */}
        <motion.div
          className="mt-3 grid gap-4 sm:grid-cols-2 lg:mx-auto lg:w-[calc(66.666%-1rem)]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {useCases.slice(3).map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-xl border bg-gradient-to-b from-white to-zinc-50/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:from-zinc-900 dark:to-zinc-800/50"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${item.bg} ${item.accent} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-foreground text-base font-semibold">
                    {item.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {item.desc}
                </p>
                <div
                  className={`absolute inset-x-0 bottom-0 h-0.5 ${item.bg} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

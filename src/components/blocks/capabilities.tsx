"use client";

import { useEffect, useState } from "react";

import { Blocks, CheckCircle2, Cloud, Code2, Database } from "lucide-react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { docUrl } from "@/lib/docs-version";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    id: "pg-kernel",
    icon: Database,
    hex: "#3b82f6",
    docsUrl: "https://www.postgresql.org/docs/current/",
    code: `-- Window functions & analytics
SELECT
  dept,
  name,
  salary,
  RANK() OVER (
    PARTITION BY dept
    ORDER BY salary DESC
  ) AS dept_rank,
  AVG(salary) OVER (
    PARTITION BY dept
  ) AS dept_avg
FROM employees
WHERE active = TRUE;`,
  },
  {
    id: "oracle",
    icon: Code2,
    hex: "#f59e0b",
    docsUrl: docUrl("en", "7.3"),
    docPath: "7.3",
    code: `CREATE OR REPLACE PROCEDURE proc_example(
  p_id IN NUMBER
) IS
  v_name VARCHAR2(100);
BEGIN
  SELECT name INTO v_name
  FROM employees WHERE id = p_id;
  DBMS_OUTPUT.PUT_LINE('Hello, ' || v_name);
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    RAISE_APPLICATION_ERROR(-20001, 'Not found');
END;
/`,
  },
  {
    id: "ecosystem",
    icon: Blocks,
    hex: "#10b981",
    docsUrl: docUrl("en", "cpu_arch_adp"),
    docPath: "cpu_arch_adp",
    code: `-- Enable extensions in minutes
CREATE EXTENSION postgis;
CREATE EXTENSION pgroonga;
CREATE EXTENSION pgaudit;
CREATE EXTENSION pg_cron;

-- Geospatial query with PostGIS
SELECT name
FROM locations
WHERE ST_DWithin(
  geom,
  ST_MakePoint(116.4, 39.9)::geography,
  5000  -- within 5 km
);`,
  },
  {
    id: "cloud-native",
    icon: Cloud,
    hex: "#06b6d4",
    docsUrl: docUrl("en", "4.6.1"),
    docPath: "4.6.1",
    code: `# Docker Compose
$ docker compose up -d
[+] Running 3/3
  ✔ ivorysql-primary   Started
  ✔ ivorysql-standby   Started
  ✔ ivorysql-monitor   Started

# Kubernetes — Helm install
$ helm install ivorysql \\
    ivorysql/ivorysql \\
    --set replicaCount=3`,
  },
];

type PillarId = (typeof PILLARS)[number]["id"];

// ─── PillarCard ───────────────────────────────────────────────────────────────

function PillarCard({
  pillar,
  isActive,
  onSelect,
  index,
}: {
  pillar: (typeof PILLARS)[number];
  isActive: boolean;
  onSelect: () => void;
  index: number;
}) {
  const t = useTranslations("Capabilities");
  const Icon = pillar.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      className="group bg-card relative cursor-pointer overflow-hidden rounded-2xl border p-6 text-left focus-visible:outline-none"
      style={{
        borderColor: isActive ? `${pillar.hex}55` : undefined,
        boxShadow: isActive
          ? `0 0 0 1px ${pillar.hex}20, 0 12px 48px -8px ${pillar.hex}28`
          : undefined,
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Cursor-tracking spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 180px at var(--mx, 50%) var(--my, 50%), ${pillar.hex}15, transparent 70%)`,
        }}
      />

      {/* Ambient glow when active */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isActive ? 1 : 0,
          background: `radial-gradient(ellipse 130% 80% at 50% -20%, ${pillar.hex}0d, transparent 60%)`,
        }}
      />

      {/* Shimmer sweep on hover */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-1/3",
            "-translate-x-full skew-x-12",
            "bg-gradient-to-r from-transparent via-white/5 to-transparent",
            "transition-transform duration-700 ease-out",
            "group-hover:translate-x-[350%]",
          )}
        />
      </div>

      {/* Card body */}
      <div className="relative flex flex-col gap-4">
        {/* Icon + Label */}
        <div className="flex items-center gap-3">
          <div
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${pillar.hex}18` }}
          >
            <Icon className="size-5" style={{ color: pillar.hex }} />
          </div>
          <p className="text-foreground text-sm leading-snug font-semibold">
            {t(`pillars.${pillar.id}.label`)}
          </p>
        </div>

        {/* Tagline */}
        <div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t(`pillars.${pillar.id}.tagline`)}
          </p>
        </div>
      </div>

      {/* Active dot — animates position between cards via layoutId */}
      {isActive && (
        <motion.div
          layoutId="pillar-dot"
          className="absolute top-4 right-4 size-2 rounded-full"
          style={{ backgroundColor: pillar.hex }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
    </motion.button>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Capabilities = () => {
  const t = useTranslations("Capabilities");
  const locale = useLocale();
  const docsLocale = locale === "zh" ? "cn" : "en";
  const [activeId, setActiveId] = useState<PillarId>("pg-kernel");
  const [prevIndex, setPrevIndex] = useState(0);
  const [userPicked, setUserPicked] = useState(false);
  const reduce = useReducedMotion();

  const activeIndex = PILLARS.findIndex((p) => p.id === activeId);
  const active = PILLARS[activeIndex];
  const activeDocsUrl = active.docPath
    ? docUrl(docsLocale, active.docPath)
    : active.docsUrl;
  const activePoints = t.raw(`pillars.${active.id}.points`) as string[];
  const direction = activeIndex > prevIndex ? 1 : -1;

  const slideTransition = reduce
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const };

  // Auto-advance; stops when user manually picks a tab
  useEffect(() => {
    if (userPicked) return;
    const timer = setInterval(() => {
      const next = (activeIndex + 1) % PILLARS.length;
      setPrevIndex(activeIndex);
      setActiveId(PILLARS[next].id);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex, userPicked]);

  const handleSelect = (id: PillarId) => {
    setUserPicked(true);
    setPrevIndex(activeIndex);
    setActiveId(id);
  };

  return (
    <section className="pb-10 lg:pb-14">
      <div className="container">
        {/* Section heading */}
        <div className="mx-auto mt-8 max-w-4xl text-center lg:mt-16">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            {t("heading")}
          </h2>
          <p className="text-muted-foreground mt-4 leading-snug">
            {t("description")}
          </p>
        </div>

        {/* Pillar cards */}
        <LayoutGroup>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:mt-12 lg:grid-cols-4">
            {PILLARS.map((pillar, index) => (
              <PillarCard
                key={pillar.id}
                pillar={pillar}
                isActive={activeId === pillar.id}
                onSelect={() => handleSelect(pillar.id)}
                index={index}
              />
            ))}
          </div>
        </LayoutGroup>

        {/* Detail section */}
        <div className="mt-8 grid min-h-[350px] gap-8 lg:mt-10 lg:min-h-[392px] lg:grid-cols-5">
          {/* Description */}
          <div className="flex lg:col-span-3">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeId}
                custom={direction}
                initial={
                  reduce ? { opacity: 1 } : { opacity: 0, x: 20 * direction }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  reduce ? { opacity: 1 } : { opacity: 0, x: -20 * direction }
                }
                transition={slideTransition}
                className="flex flex-col"
              >
                <p className="text-muted-foreground leading-relaxed">
                  {t(`pillars.${active.id}.description`)}
                </p>
                <ul className="text-muted-foreground mt-6 space-y-2">
                  {activePoints.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0"
                        style={{ color: active.hex }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={activeDocsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("viewDocumentation")}
                    </a>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Code block */}
          <div className="flex lg:col-span-2">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeId}
                custom={direction}
                className="bg-card flex w-full flex-col overflow-hidden rounded-2xl border"
                initial={
                  reduce ? { opacity: 1 } : { opacity: 0, x: -20 * direction }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  reduce ? { opacity: 1 } : { opacity: 0, x: 20 * direction }
                }
                transition={slideTransition}
              >
                <div className="border-b px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-red-500/60" />
                    <span className="size-2.5 rounded-full bg-yellow-500/60" />
                    <span className="size-2.5 rounded-full bg-green-500/60" />
                  </div>
                </div>
                <pre className="text-muted-foreground flex-1 overflow-x-auto p-4 text-sm leading-relaxed">
                  <code>{active.code}</code>
                </pre>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

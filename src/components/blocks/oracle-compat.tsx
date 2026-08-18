"use client";

import { useEffect, useState } from "react";

import {
  CheckCircle2,
  Cloud,
  Code2,
  Cpu,
  Layers,
  Puzzle,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tabs = [
  {
    id: "oracle",
    label: "Oracle Compatible",
    icon: Code2,
    title: "Oracle PL/SQL Procedural Language",
    description:
      "Native PL/SQL procedural syntax with blocks, loops, cursors, packages, and exception handling.",
    code: `CREATE OR REPLACE PROCEDURE proc_example(p_id IN NUMBER) IS
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
    points: [
      "Native PL/SQL procedural syntax",
      "Oracle-style exception handling",
      "Package spec/body separation",
      "DUAL table & built-in functions",
    ],
  },
  {
    id: "ecosystem",
    label: "Ecosystem",
    icon: Layers,
    title: "Domestic OS & Ecosystem Certified",
    description:
      "Certified and tested on Kylin, Anolis, UOS, and other domestic platforms.",
    code: `$ cat /etc/os-release
PRETTY_NAME="Kylin Linux V10"
NAME="Kylin Linux Advanced Server"

$ rpm -qa | grep ivorysql
ivorysql5.3-server-5.3-1.el8.ky10.x86_64`,
    points: [
      "Kylin Linux Advanced Server V10",
      "Anolis OS 8/23",
      "UnionTech OS Server (UOS)",
      "Loongnix & openEuler",
    ],
  },
  {
    id: "packages",
    label: "Full Platform",
    icon: Cpu,
    title: "Cross-Architecture Installation",
    description:
      "One-click install on x86, ARM, MIPS, and LoongArch — zero external dependencies.",
    code: `$ uname -m
aarch64

# One-click install
# zero external dependencies
$ sudo rpm -ivh \\
  ivorysql5.3-server-5.3-1.el8.aarch64.rpm
Preparing...            ## [100%]
Updating / installing...
  1:ivorysql5.3-server  ## [100%]`,
    points: [
      "x86_64, ARM64, MIPS, LoongArch",
      "RPM, DEB, and tarball packages",
      "Zero external dependencies",
      "Full-platform media coverage",
    ],
  },
  {
    id: "cloud-native",
    label: "Cloud Native",
    icon: Cloud,
    title: "Containerized Deployment & Cloud",
    description:
      "Docker Compose, Podman, Swarm, and Kubernetes Operator support with full lifecycle management.",
    code: `# Docker Compose
$ docker compose up -d
[+] Running 3/3
  ✔ ivorysql-primary   Started
  ✔ ivorysql-standby   Started
  ✔ ivorysql-monitor   Started

# Kubernetes — Helm install
$ helm install ivorysql ivorysql/ivorysql \\
    --set replicaCount=3`,
    points: [
      "Docker Compose & Podman",
      "Swarm & Kubernetes Operator",
      "IvorySQL Cloud lifecycle management",
      "Ecosystem tool integration",
    ],
  },
  {
    id: "extensions",
    label: "PG Extensions",
    icon: Puzzle,
    title: "Rich Extension Ecosystem",
    description:
      "PGroonga, PostGIS, pg_cron, pgAudit, pgRouting and more — beyond the core database.",
    code: `-- Install extensions
CREATE EXTENSION pg_cron;
CREATE EXTENSION pgaudit;
CREATE EXTENSION postgis;
CREATE EXTENSION pgRouting;
CREATE EXTENSION pgroonga;

-- Schedule maintenance with pg_cron
SELECT cron.schedule('vacuum',
  '0 2 * * *',
  'VACUUM ANALYZE');`,
    points: [
      "PGroonga — full-text search",
      "PostGIS — geospatial queries",
      "pg_cron — scheduled tasks",
      "pgAudit — audit logging",
    ],
  },
];

export const OracleCompat = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [prevIndex, setPrevIndex] = useState(0);
  const active = tabs.find((t) => t.id === activeTab)!;
  const activeIndex = tabs.findIndex((t) => t.id === activeTab);
  const reduce = useReducedMotion();
  const direction = activeIndex > prevIndex ? 1 : -1;

  // Auto-play: switch to next tab every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % tabs.length;
      setPrevIndex(activeIndex);
      setActiveTab(tabs[nextIndex].id);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleTabClick = (tabId: string) => {
    setPrevIndex(activeIndex);
    setActiveTab(tabId);
  };

  const ActiveIcon = active.icon;

  const transition = reduce
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section className="pb-10 lg:pb-14">
      <div className="container">
        {/* Section header */}
        <div className="text-center mx-auto mt-8 max-w-4xl lg:mt-16">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Enterprise-Ready by Design
          </h2>
          <p className="text-muted-foreground mt-4 leading-snug">
            Deep Oracle compatibility, certified ecosystem, cross-platform packages,
            cloud-native deployment, and a rich extension library — all in one database.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 lg:mt-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all flex items-center gap-2",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80",
                )}
              >
                <Icon className="size-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-5 lg:gap-8">
          {/* Description - 3/5 */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeTab}
                custom={direction}
                initial={reduce ? { opacity: 1 } : { opacity: 0, x: 20 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, x: -20 * direction }}
                transition={transition}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-muted/50 flex size-10 items-center justify-center rounded-xl">
                    <ActiveIcon className="text-muted-foreground size-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{active.title}</h3>
                </div>
                <p className="text-muted-foreground mt-3 leading-relaxed">
                  {active.description}
                </p>
                <ul className="text-muted-foreground mt-6 space-y-2">
                  {active.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="text-primary mt-0.5 size-4 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://docs.ivorysql.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Documentation
                    </a>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Code Block - 2/5 */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeTab}
                custom={direction}
                className="bg-card overflow-hidden rounded-2xl border"
                initial={reduce ? { opacity: 1 } : { opacity: 0, x: -20 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, x: 20 * direction }}
                transition={transition}
              >
                <div className="border-b px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-red-500/60" />
                    <span className="size-2.5 rounded-full bg-yellow-500/60" />
                    <span className="size-2.5 rounded-full bg-green-500/60" />
                  </div>
                </div>
                <pre className="text-muted-foreground overflow-x-auto p-4 text-sm leading-relaxed">
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

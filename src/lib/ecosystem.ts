// ─── Types ────────────────────────────────────────────────────────────────────

export type ToolStatus = "supported" | "progress" | "planned" | "proprietary";

export type ToolMeta = {
  url?: string;
};

export type EcosystemCategory = {
  key: string;
  accent: "blue" | "teal" | "indigo" | "amber" | "purple" | "rose";
  tools: string[];
};

// ─── Tool metadata ────────────────────────────────────────────────────────────
// Descriptions live in messages/{locale}.json under EcosystemPage.toolMeta.

export const TOOL_META: Record<string, ToolMeta> = {
  "pgpool-II": { url: "https://www.pgpool.net/" },
  pgBouncer: { url: "https://www.pgbouncer.org/" },
  odyssey: { url: "https://github.com/yandex/odyssey" },
  HAProxy: { url: "https://www.haproxy.org/" },
  ShardingSphere: { url: "https://shardingsphere.apache.org/" },
  Citus: { url: "https://www.citusdata.com/" },
  "vip-manager": { url: "https://github.com/Cybertec-PostgreSQL/vip-manager" },
  MyBatis: { url: "https://mybatis.org/" },
  Hibernate: { url: "https://hibernate.org/" },
  libpq: { url: "https://www.postgresql.org/docs/current/libpq.html" },
  JDBC: { url: "https://jdbc.postgresql.org/" },
  ODBC: { url: "https://odbc.postgresql.org/" },
  psycopg2: { url: "https://www.psycopg.org/" },
  "ADO.NET": { url: "https://www.npgsql.org/" },
  "lib/pq": { url: "https://github.com/lib/pq" },
  pgx: { url: "https://github.com/jackc/pgx" },
  Ruby: { url: "https://github.com/ged/ruby-pg" },
  Rust: { url: "https://github.com/sfackler/rust-postgres" },
  DBeaver: { url: "https://dbeaver.io/" },
  pgAdmin: { url: "https://www.pgadmin.org/" },
  Navicat: { url: "https://www.navicat.com/" },
  "Navicat Premium": {
    url: "https://www.navicat.com/en/products/navicat-premium",
  },
  pg_rman: { url: "https://github.com/ossc-db/pg_rman" },
  "WAL-G": { url: "https://github.com/wal-g/wal-g" },
  pg_probackup: { url: "https://github.com/postgrespro/pg_probackup" },
  pgBackRest: { url: "https://pgbackrest.org/" },
  Patroni: { url: "https://patroni.readthedocs.io/" },
  repmgr: { url: "https://repmgr.org/" },
  "Pacemaker Corosync": { url: "https://clusterlabs.org/" },
  StackGres: { url: "https://stackgres.io/" },
  Prometheus: { url: "https://prometheus.io/" },
  Alertmanager: {
    url: "https://prometheus.io/docs/alerting/latest/alertmanager/",
  },
  pgMonitor: { url: "https://github.com/CrunchyData/pgmonitor" },
  Grafana: { url: "https://grafana.com/" },
  PoWA: { url: "https://powa.readthedocs.io/" },
  Debezium: { url: "https://debezium.io/" },
  pglogical: { url: "https://github.com/2ndQuadrant/pglogical" },
  mysql_fdw: { url: "https://github.com/EnterpriseDB/mysql_fdw" },
  oracle_fdw: { url: "https://github.com/laurenz/oracle_fdw" },
  Ora2Pg: { url: "https://ora2pg.darold.net/" },
  pg_bulkload: { url: "https://github.com/ossc-db/pg_bulkload" },
  ddlx: { url: "https://github.com/lacanoid/pgddl" },
  Databene: { url: "https://databene.org/" },
  TimescaleDB: { url: "https://www.timescale.com/" },
  DocumentDB: { url: "https://github.com/microsoft/documentdb" },
  "PostgreSQL AGE": { url: "https://age.apache.org/" },
  FerretDB: { url: "https://www.ferretdb.com/" },
  PostGIS: { url: "https://postgis.net/" },
  pgRouting: { url: "https://pgrouting.org/" },
  pgvector: { url: "https://github.com/pgvector/pgvector" },
  MADlib: { url: "https://madlib.apache.org/" },
  "postgres-wasm": { url: "https://github.com/snaplet/postgres-wasm" },
  pg_cron: { url: "https://github.com/citusdata/pg_cron" },
  pgAgent: {
    url: "https://www.pgadmin.org/docs/pgadmin4/latest/pgagent.html",
  },
  "Docker Compose": { url: "https://docs.docker.com/compose/" },
  Podman: { url: "https://podman.io/" },
  "Docker Swarm": { url: "https://docs.docker.com/engine/swarm/" },
};

// ─── Status ───────────────────────────────────────────────────────────────────

const IN_PROGRESS = new Set([
  "citus",
  "pg_ai_query",
  "stackgres",
  "databene",
  "madlib",
]);
const PLANNED = new Set([
  "shardingsphere",
  "pacemaker corosync",
  "postgresql age",
  "yukon",
  "powa",
]);
const PROPRIETARY = new Set([
  "ivymigration",
  "ivyevaluation",
  "ivorysql serverless",
]);

export function getToolStatus(toolName: string): ToolStatus {
  const n = toolName.replace(/‌/g, "").toLowerCase().trim();
  if (PROPRIETARY.has(n)) return "proprietary";
  if (IN_PROGRESS.has(n)) return "progress";
  if (PLANNED.has(n)) return "planned";
  return "supported";
}

// ─── Categories ───────────────────────────────────────────────────────────────

export const CATEGORIES: EcosystemCategory[] = [
  {
    key: "connectivity",
    accent: "blue",
    tools: [
      "pgpool-II",
      "pgBouncer",
      "odyssey",
      "HAProxy",
      "ShardingSphere",
      "Citus",
      "vip-manager",
    ],
  },
  {
    key: "haBackup",
    accent: "teal",
    tools: [
      "Patroni",
      "repmgr",
      "Pacemaker Corosync",
      "StackGres",
      "pg_rman",
      "WAL-G",
      "pg_probackup",
      "pgBackRest",
      "Docker Compose",
      "Podman",
      "Docker Swarm",
    ],
  },
  {
    key: "devTools",
    accent: "indigo",
    tools: [
      "DBeaver",
      "pgAdmin",
      "Navicat",
      "Navicat Premium",
      "MyBatis",
      "Hibernate",
      "libpq",
      "JDBC",
      "ODBC",
      "psycopg2",
      "pgx",
      "ADO.NET",
      "lib/pq",
      "Ruby",
      "Rust",
      "Go",
      "NodeJS",
      "Python",
    ],
  },
  {
    key: "monitoring",
    accent: "amber",
    tools: [
      "Prometheus",
      "Alertmanager",
      "pgMonitor",
      "Grafana",
      "PoWA",
      "pg_cron",
      "pgAgent",
      "pg_jobs",
    ],
  },
  {
    key: "dataIntegration",
    accent: "purple",
    tools: [
      "Debezium",
      "pglogical",
      "mysql_fdw",
      "oracle_fdw",
      "Ora2Pg",
      "ivyMigration",
      "ivyEvaluation",
      "pg_bulkload",
      "ddlx",
      "Yukon",
      "Databene",
      "WhaleOps",
    ],
  },
  {
    key: "aiGeo",
    accent: "rose",
    tools: [
      "pgvector",
      "MADlib",
      "pg_ai_query",
      "PostGIS",
      "pgRouting",
      "TimescaleDB",
      "DocumentDB",
      "PostgreSQL AGE",
      "FerretDB",
    ],
  },
];

// ─── Misc ─────────────────────────────────────────────────────────────────────
// Display labels for these live in messages/{locale}.json under
// EcosystemPage.platformFooters / EcosystemPage.legendLabels.

export const LEGEND_STATUSES: ToolStatus[] = [
  "supported",
  "progress",
  "planned",
  "proprietary",
];

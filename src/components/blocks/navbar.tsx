"use client";

import { useState } from "react";

import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  BarChart3,
  Blocks,
  BookOpen,
  Cloud,
  CalendarDays,
  ChevronRight,
  CircleAlert,
  Database,
  Download,
  Globe,
  GraduationCap,
  Handshake,
  History,
  Map,
  MessageSquareQuote,
  MonitorPlay,
  Newspaper,
  Package,
  Server,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { GitHubStarsButton } from "@/components/github-stars-button";
import { LanguageSwitch } from "@/components/language-switch";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "@/i18n/navigation";
import { docUrl } from "@/lib/docs-version";
import { cn } from "@/lib/utils";

// ─── Brand Icons ────────────────────────────────────────────────────────────

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const GiteeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z" />
  </svg>
);

const AtomGitIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="3" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
  </svg>
);

// ─── Data (translation keys, not literal strings) ──────────────────────────

type NavItemDef = {
  key: string;
  href: string;
  /** Version-relative docs.ivorysql.org path — resolved per-locale at render time. */
  docPath?: string;
  icon?: React.ReactNode;
};

type NavItem = {
  title: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
};

const PRODUCTS_DEF: NavItemDef[] = [
  {
    key: "oracleCompat",
    href: docUrl("en", "7.3"),
    docPath: "7.3",
    icon: <Database className="size-5" />,
  },
  {
    key: "ecosystem",
    href: "/ecosystem",
    icon: <Blocks className="size-5" />,
  },
  {
    key: "cloudNative",
    href: docUrl("en", "4.6.1"),
    docPath: "4.6.1",
    icon: <Cloud className="size-5" />,
  },
];

const SCENARIOS_DEF: {
  key: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { key: "enterpriseDb", icon: Database },
  { key: "lbs", icon: Map },
  { key: "unifiedData", icon: BarChart3 },
  { key: "aiEmpowered", icon: Globe },
  { key: "dbMigration", icon: Server },
];

const COMMUNITY_GROUPS_DEF: { groupKey: string; items: NavItemDef[] }[] = [
  {
    groupKey: "community",
    items: [
      {
        key: "events",
        href: "/community/events",
        icon: <CalendarDays className="size-4" />,
      },
      {
        key: "news",
        href: "/news",
        icon: <Newspaper className="size-4" />,
      },
      {
        key: "expertCommittee",
        href: "/community/expert-advisory-committee",
        icon: <GraduationCap className="size-4" />,
      },
      {
        key: "partners",
        href: "/partners",
        icon: <Handshake className="size-4" />,
      },
      {
        key: "customerStories",
        href: "/community/stories",
        icon: <MessageSquareQuote className="size-4" />,
      },
    ],
  },
  {
    groupKey: "getInvolved",
    items: [
      {
        key: "contributingGuide",
        href: "/community/contribution-guidelines",
        icon: <BookOpen className="size-4" />,
      },
      {
        key: "contributors",
        href: "/community/contributors",
        icon: <Users className="size-4" />,
      },
      {
        key: "roadmap",
        href: "/community/roadmap",
        icon: <Map className="size-4" />,
      },
      {
        key: "issueTracker",
        href: "https://github.com/IvorySQL/IvorySQL/issues",
        icon: <CircleAlert className="size-4" />,
      },
      {
        key: "vulnerabilityManagement",
        href: "/security/vulnerability-management",
        icon: <ShieldCheck className="size-4" />,
      },
    ],
  },
];

const RESOURCE_GROUPS_DEF: { groupKey: string; items: NavItemDef[] }[] = [
  {
    groupKey: "gettingStarted",
    items: [
      {
        key: "downloads",
        href: "/resources/download",
        icon: <Download className="size-4" />,
      },
      {
        key: "releases",
        href: "/resources/releases",
        icon: <History className="size-4" />,
      },
      {
        key: "installation",
        href: docUrl("en", "3.1"),
        docPath: "3.1",
        icon: <Package className="size-4" />,
      },
      {
        key: "onlineTrial",
        href: "https://trial.ivorysql.org/",
        icon: <MonitorPlay className="size-4" />,
      },
      {
        key: "sandboxes",
        href: "https://pgnexus.ai/sandboxes",
        icon: <Blocks className="size-4" />,
      },
    ],
  },
  {
    groupKey: "repositories",
    items: [
      {
        key: "github",
        href: "https://github.com/IvorySQL/IvorySQL",
        icon: <GitHubIcon className="size-5" />,
      },
      {
        key: "atomgit",
        href: "https://atomgit.com/IvorySQL/IvorySQL",
        icon: <AtomGitIcon className="size-5" />,
      },
      {
        key: "gitee",
        href: "https://gitee.com/IvorySQL/IvorySQL",
        icon: <GiteeIcon className="size-5" />,
      },
    ],
  },
];

// ─── Components ─────────────────────────────────────────────────────────────

const NavItemCard = ({ item }: { item: NavItem }) => (
  <NavigationMenuLink asChild>
    <Link
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group/menu-item hover:bg-accent focus-visible:ring-ring flex items-start gap-3 rounded-lg p-3 text-sm outline-hidden transition-colors focus-visible:ring-2"
    >
      {item.icon && (
        <div className="bg-muted/50 text-muted-foreground group-hover/menu-item:text-foreground mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg border">
          {item.icon}
        </div>
      )}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1">
          <p className="text-foreground leading-snug font-medium">
            {item.title}
          </p>
          <ChevronRight
            strokeWidth={2}
            className="text-muted-foreground size-3 -translate-x-1 opacity-0 transition-all group-hover/menu-item:translate-x-0 group-hover/menu-item:opacity-100"
          />
        </div>
        {item.description && (
          <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs leading-snug">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  </NavigationMenuLink>
);

const LinksGroup = ({ label, items }: { label: string; items: NavItem[] }) => (
  <div className="flex flex-col gap-4">
    <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
      {label}
    </p>
    <ul className="flex flex-col gap-1">
      {items.map((item) => (
        <li key={item.title}>
          <NavItemCard item={item} />
        </li>
      ))}
    </ul>
  </div>
);

// ─── Mega Dropdown Panels ───────────────────────────────────────────────────

const ProductDropdown = ({
  products,
  scenarios,
  t,
}: {
  products: NavItem[];
  scenarios: {
    title: string;
    desc: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
  t: ReturnType<typeof useTranslations>;
}) => (
  <div className="flex flex-col xl:flex-row">
    <div className="w-[320px] px-6 py-6 xl:w-[360px]">
      <p className="text-muted-foreground mb-4 block font-mono text-xs tracking-widest uppercase">
        {t("products.coreCapabilities")}
      </p>
      <ul className="flex flex-col gap-1">
        {products.map((item) => (
          <li key={item.title}>
            <NavItemCard item={item} />
          </li>
        ))}
      </ul>
    </div>
    <div className="bg-muted/30 w-full border-t px-6 py-6 xl:w-[380px] xl:border-t-0 xl:border-l">
      <p className="text-muted-foreground mb-4 block font-mono text-xs tracking-widest uppercase">
        {t("products.applicationScenarios")}
      </p>
      <ul className="space-y-3">
        {scenarios.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.title} className="flex items-start gap-3 text-sm">
              <div className="bg-muted/50 mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg">
                <Icon className="text-muted-foreground size-4" />
              </div>
              <div>
                <p className="text-foreground font-medium">{item.title}</p>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  {item.desc}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);

const CommunityDropdown = ({
  groups,
}: {
  groups: { label: string; items: NavItem[] }[];
}) => (
  <div className="flex flex-col xl:flex-row">
    {groups.map((group, i) => (
      <div
        key={group.label}
        className={cn(
          "w-[280px] px-6 py-6 xl:w-[300px]",
          i < groups.length - 1 &&
            "bg-muted/30 border-t xl:border-t-0 xl:border-r",
        )}
      >
        <LinksGroup label={group.label} items={group.items} />
      </div>
    ))}
  </div>
);

const ResourceDropdown = ({
  groups,
}: {
  groups: { label: string; items: NavItem[] }[];
}) => (
  <div className="flex flex-col xl:flex-row">
    {groups.map((group, i) => (
      <div
        key={group.label}
        className={cn(
          "w-[280px] px-6 py-6 xl:w-[300px]",
          i < groups.length - 1 &&
            "bg-muted/30 border-t xl:border-t-0 xl:border-r",
        )}
      >
        <LinksGroup label={group.label} items={group.items} />
      </div>
    ))}
  </div>
);

// ─── Navbar ─────────────────────────────────────────────────────────────────

export const Navbar = () => {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const docsLocale = locale === "zh" ? "cn" : "en";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const resolveHref = (item: NavItemDef) =>
    item.docPath ? docUrl(docsLocale, item.docPath) : item.href;

  const products: NavItem[] = PRODUCTS_DEF.map((item) => ({
    title: t(`products.${item.key}.title`),
    description: t(`products.${item.key}.description`),
    href: resolveHref(item),
    icon: item.icon,
  }));

  const scenarios = SCENARIOS_DEF.map((item) => ({
    title: t(`products.scenarios.${item.key}.title`),
    desc: t(`products.scenarios.${item.key}.description`),
    icon: item.icon,
  }));

  const communityGroups = COMMUNITY_GROUPS_DEF.map((group) => ({
    label: t(`community.groups.${group.groupKey}`),
    items: group.items.map((item) => ({
      title: t(`community.${item.key}.title`),
      description: t(`community.${item.key}.description`),
      href: resolveHref(item),
      icon: item.icon,
    })),
  }));

  const resourceGroups = RESOURCE_GROUPS_DEF.map((group) => ({
    label: t(`resources.groups.${group.groupKey}`),
    items: group.items.map((item) => ({
      title: t(`resources.${item.key}.title`),
      description: t(`resources.${item.key}.description`),
      href: resolveHref(item),
      icon: item.icon,
    })),
  }));

  const communityFlat = communityGroups.flatMap((g) => g.items);
  const resourceFlat = resourceGroups.flatMap((g) => g.items);

  return (
    <section className="bg-background/90 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/ivorysql-logo-light.svg"
              alt="IvorySQL logo"
              width={120}
              height={36}
              className="h-9 w-auto dark:hidden"
            />
            <Image
              src="/ivorysql-logo.svg"
              alt="IvorySQL logo"
              width={120}
              height={36}
              className="hidden h-9 w-auto dark:block"
            />
            <span className="text-foreground text-lg font-semibold tracking-tight">
              IvorySQL
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="max-lg:hidden">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {t("products.trigger")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ProductDropdown
                    products={products}
                    scenarios={scenarios}
                    t={t}
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {t("community.trigger")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <CommunityDropdown groups={communityGroups} />
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {t("resources.trigger")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ResourceDropdown groups={resourceGroups} />
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="https://docs.ivorysql.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 text-sm font-medium transition-opacity hover:opacity-75"
                  >
                    {t("docs")}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/blog"
                    className={cn(
                      "px-2 text-sm font-medium transition-opacity hover:opacity-75",
                      pathname === "/blog" && "text-muted-foreground",
                    )}
                  >
                    {t("blog")}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <GitHubStarsButton />

          <ThemeToggle />

          <LanguageSwitch />

          {/* Mobile hamburger */}
          <button
            className="text-muted-foreground relative flex size-8 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">{t("openMenu")}</span>
            <div className="absolute top-1/2 left-1/2 block w-[18px] -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`}
              />
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "bg-background fixed inset-x-0 top-14 z-40 flex flex-col border-b p-6 transition-all duration-300 ease-in-out lg:hidden",
          isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0",
        )}
      >
        <nav className="divide-border flex flex-1 flex-col divide-y">
          {/* Products */}
          <div className="py-3 first:pt-0">
            <button
              className="flex w-full items-center justify-between text-base font-medium"
              onClick={() =>
                setOpenDropdown(openDropdown === "products" ? null : "products")
              }
            >
              {t("products.trigger")}
              <ChevronRight
                className={cn(
                  "size-4 transition-transform duration-300",
                  openDropdown === "products" && "rotate-90",
                )}
              />
            </button>
            {openDropdown === "products" && (
              <div className="mt-2 space-y-1">
                {products.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground hover:bg-accent block rounded-md px-3 py-2 text-sm transition-colors"
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                    {item.description && (
                      <p className="text-muted-foreground mt-0.5 text-xs">
                        {item.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Community */}
          <div className="py-3 first:pt-0">
            <button
              className="flex w-full items-center justify-between text-base font-medium"
              onClick={() =>
                setOpenDropdown(
                  openDropdown === "community" ? null : "community",
                )
              }
            >
              {t("community.trigger")}
              <ChevronRight
                className={cn(
                  "size-4 transition-transform duration-300",
                  openDropdown === "community" && "rotate-90",
                )}
              />
            </button>
            {openDropdown === "community" && (
              <div className="mt-2 space-y-1">
                {communityFlat.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground hover:bg-accent block rounded-md px-3 py-2 text-sm transition-colors"
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Resources */}
          <div className="py-3 first:pt-0">
            <button
              className="flex w-full items-center justify-between text-base font-medium"
              onClick={() =>
                setOpenDropdown(
                  openDropdown === "resources" ? null : "resources",
                )
              }
            >
              {t("resources.trigger")}
              <ChevronRight
                className={cn(
                  "size-4 transition-transform duration-300",
                  openDropdown === "resources" && "rotate-90",
                )}
              />
            </button>
            {openDropdown === "resources" && (
              <div className="mt-2 space-y-1">
                {resourceFlat.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground hover:bg-accent block rounded-md px-3 py-2 text-sm transition-colors"
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Docs & Blog */}
          {[
            { label: t("docs"), href: "https://docs.ivorysql.org/" },
            { label: t("blog"), href: "/blog" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-primary hover:text-primary/80 py-4 text-base font-medium transition-colors first:pt-0 last:pb-0"
              target={href.startsWith("http") ? "_blank" : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
};

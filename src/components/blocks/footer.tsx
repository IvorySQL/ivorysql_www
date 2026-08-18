import { ArrowUpRight, Github } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const docsLinks = [
  { key: "documentation", href: "https://docs.ivorysql.org/" },
  { key: "releases", href: "https://github.com/IvorySQL/IvorySQL/releases" },
  { key: "onlineTrial", href: "https://trial.ivorysql.org/" },
];

const communityLinks = [
  { key: "mailingLists", href: "https://lists.ivorysql.org" },
  { key: "discord", href: "https://discord.gg/Fu3FRay" },
  { key: "twitter", href: "https://twitter.com/IvorySQL" },
];

const developerLinks = [
  { key: "github", href: "https://github.com/IvorySQL/IvorySQL" },
  { key: "atomgit", href: "https://atomgit.com/IvorySQL/IvorySQL" },
  { key: "gitee", href: "https://gitee.com/IvorySQL/IvorySQL" },
  {
    key: "contributors",
    href: "https://github.com/IvorySQL/IvorySQL/graphs/contributors",
  },
  { key: "roadmap", href: "https://github.com/orgs/IvorySQL/projects" },
];

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="flex flex-col items-center gap-14 pt-28 lg:pt-32">
      {/* CTA Section */}
      <div className="container space-y-3 text-center">
        <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
          {t("ctaTitle")}
        </h2>
        <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
          {t("ctaDescription")}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link
              href="https://docs.ivorysql.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("getStarted")}
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link
              href="https://trial.ivorysql.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("onlineTrial")}
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link
              href="https://pgnexus.ai/sandboxes"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("sandboxes")}
            </Link>
          </Button>
        </div>
      </div>

      {/* Navigation Columns */}
      <div className="container grid grid-cols-2 gap-8 md:grid-cols-4">
        {/* Brand Column */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-lg font-semibold">IvorySQL</h3>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {t("brandDescription")}
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              href="https://github.com/IvorySQL/IvorySQL"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="size-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>

        {/* Docs Column */}
        <div>
          <h3 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
            {t("columns.docs")}
          </h3>
          <ul className="mt-4 space-y-3">
            {docsLinks.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-opacity hover:opacity-75"
                >
                  {t(`docsLinks.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Community Column */}
        <div>
          <h3 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
            {t("columns.community")}
          </h3>
          <ul className="mt-4 space-y-3">
            {communityLinks.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-0.5 text-sm transition-opacity hover:opacity-75"
                >
                  {t(`communityLinks.${item.key}`)}
                  <ArrowUpRight className="size-3" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Developers Column */}
        <div>
          <h3 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
            {t("columns.developers")}
          </h3>
          <ul className="mt-4 space-y-3">
            {developerLinks.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-0.5 text-sm transition-opacity hover:opacity-75"
                >
                  {t(`developerLinks.${item.key}`)}
                  <ArrowUpRight className="size-3" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-muted-foreground container border-t pt-8 text-center text-sm">
        {t("copyright", { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
}

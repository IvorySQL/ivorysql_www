import { ArrowUpRight, Blocks, Container, Globe, Zap } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { docUrl } from "@/lib/docs-version";
import { cn } from "@/lib/utils";

const OPTIONS_DEF = [
  { key: "quickInstall", docPath: "3.1", external: true, icon: Zap },
  {
    key: "containerDeploy",
    docPath: "4.6.1",
    external: true,
    icon: Container,
  },
  {
    key: "onlineTrial",
    href: "https://trial.ivorysql.org/",
    external: true,
    icon: Globe,
  },
  {
    key: "sandboxes",
    href: "https://pgnexus.ai/sandboxes",
    external: true,
    icon: Blocks,
  },
];

export const Quickstart = () => {
  const t = useTranslations("Quickstart");
  const tc = useTranslations("Common");
  const locale = useLocale();
  const docsLocale = locale === "zh" ? "cn" : "en";

  return (
    <section className="pb-10 lg:pb-14">
      <div className="container">
        {/* Section header */}
        <div className="mx-auto mt-8 max-w-4xl text-center lg:mt-16">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            {t("heading")}
          </h2>
          <p className="text-muted-foreground mt-4 leading-snug">
            {t("description")}
          </p>
        </div>

        {/* Quickstart Cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {OPTIONS_DEF.map((option) => {
            const Icon = option.icon;
            const title =
              option.key === "onlineTrial"
                ? tc("onlineTrial")
                : option.key === "sandboxes"
                  ? tc("sandboxes")
                  : t(`${option.key}.title`);
            const description = t(`${option.key}.description`);
            const href = option.docPath
              ? docUrl(docsLocale, option.docPath)
              : (option.href ?? "");
            return (
              <Link
                key={option.key}
                href={href}
                target={option.external ? "_blank" : undefined}
                rel={option.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "group rounded-2xl border p-6 transition-colors",
                  "hover:border-primary/50 hover:bg-primary/5",
                )}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-muted group-hover:bg-primary/20 flex size-12 shrink-0 items-center justify-center rounded-2xl transition-colors">
                    <Icon className="text-primary size-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                </div>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {description}
                </p>
                <div className="text-muted-foreground group-hover:text-primary mt-4 flex items-center gap-1.5 text-sm font-medium transition-colors">
                  {option.external ? tc("tryItNow") : tc("readDocs")}
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

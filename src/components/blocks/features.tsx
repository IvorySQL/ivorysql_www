import Image from "next/image";

import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const FEATURES_DEF = [
  { key: "openSource", icon: "/features/icon-01.svg" },
  { key: "postgresql", icon: "/features/icon-02.svg" },
  { key: "oracleCompat", icon: "/features/icon-03.svg" },
  { key: "customization", icon: "/features/icon-04.svg" },
  { key: "openatom", icon: "/features/icon-05.svg" },
  { key: "communityDriven", icon: "/features/icon-06.svg" },
];

export const Features = () => {
  const t = useTranslations("Features");

  return (
    <section id="features" className="pb-10 lg:pb-14">
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

        {/* Features Grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {FEATURES_DEF.map((feature) => {
            const title = t(`${feature.key}.title`);
            return (
              <Card
                key={feature.key}
                className="bg-muted/30 hover:bg-muted/50 rounded-2xl border-0 shadow-none transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex size-12 shrink-0 items-center justify-center rounded-xl">
                      <Image
                        src={feature.icon}
                        alt={title}
                        width={40}
                        height={40}
                        className="size-10 dark:invert"
                      />
                    </div>
                    <CardTitle>{title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {t(`${feature.key}.description`)}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

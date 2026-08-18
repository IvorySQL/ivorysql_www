import {
  Github,
  ExternalLink,
  GitFork,
  MessageSquare,
  Mail,
  Twitter,
  HandHeart,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { StatCounter } from "@/components/blocks/stat-counter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const COMMUNITY_LINKS_DEF = [
  {
    key: "github",
    href: "https://github.com/IvorySQL/IvorySQL",
    icon: Github,
  },
  {
    key: "atomgit",
    href: "https://atomgit.com/IvorySQL/IvorySQL",
    icon: ExternalLink,
  },
  {
    key: "gitee",
    href: "https://gitee.com/IvorySQL/IvorySQL",
    icon: GitFork,
  },
  {
    key: "discord",
    href: "https://discord.gg/Fu3FRay",
    icon: MessageSquare,
  },
  {
    key: "mailingLists",
    href: "https://lists.ivorysql.org",
    icon: Mail,
  },
  {
    key: "twitter",
    href: "https://twitter.com/IvorySQL",
    icon: Twitter,
  },
];

const yearCount = new Date().getFullYear() - 2021;

async function fetchGitHubStats(): Promise<{
  stars: number | null;
  repos: number | null;
}> {
  try {
    const [repoRes, orgRes] = await Promise.all([
      fetch("https://api.github.com/repos/IvorySQL/IvorySQL", {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }),
      fetch("https://api.github.com/orgs/IvorySQL", {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }),
    ]);
    const repo = repoRes.ok ? await repoRes.json() : null;
    const org = orgRes.ok ? await orgRes.json() : null;
    return {
      stars: repo?.stargazers_count ?? null,
      repos: org?.public_repos ?? null,
    };
  } catch {
    return { stars: null, repos: null };
  }
}

export const Community = async () => {
  const [{ stars, repos }, t, tc] = await Promise.all([
    fetchGitHubStats(),
    getTranslations("Community"),
    getTranslations("Common"),
  ]);

  const stats = [
    {
      key: "yearsOfDevelopment",
      end: yearCount,
      suffix: "",
      decimals: 0,
    },
    {
      key: "githubStars",
      end: stars != null ? stars / 1000 : 0,
      suffix: "k",
      decimals: 1,
      fallback: stars == null ? "—" : undefined,
    },
    {
      key: "openSourceRepos",
      end: repos ?? 0,
      suffix: "+",
      decimals: 0,
      fallback: repos == null ? "—" : undefined,
    },
  ] as const;

  return (
    <section id="community" className="py-10 lg:py-14">
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

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:mt-12">
          {stats.map((stat) => (
            <Card
              key={stat.key}
              className="bg-muted/30 rounded-2xl border-0 text-center shadow-none"
            >
              <CardContent className="pt-6">
                <StatCounter
                  end={stat.end}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  fallback={"fallback" in stat ? stat.fallback : undefined}
                />
                <p className="text-muted-foreground mt-2 text-sm">
                  {t(`stats.${stat.key}`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Links Grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
          {COMMUNITY_LINKS_DEF.map((link) => {
            const Icon = link.icon;
            return (
              <Card
                key={link.key}
                className="bg-muted/30 hover:bg-muted/50 rounded-2xl border-0 shadow-none transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex size-10 items-center justify-center rounded-xl",
                        "bg-primary/10",
                      )}
                    >
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="text-lg">
                      {t(`links.${link.key}.name`)}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <CardDescription>
                    {t(`links.${link.key}.description`)}
                  </CardDescription>
                  <Button variant="ghost" size="sm" asChild>
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tc("visit")}
                      <ExternalLink className="ml-1 size-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button asChild size="lg">
            <Link
              href="https://github.com/IvorySQL/IvorySQL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 size-4" />
              {t("contributeOnGithub")}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/community/contribution-guidelines">
              <HandHeart className="mr-2 size-4" />
              {t("contributionGuidelines")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

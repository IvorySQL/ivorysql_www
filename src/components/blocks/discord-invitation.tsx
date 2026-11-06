import { ExternalLink, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { DISCORD_INVITE_URL } from "@/lib/community";

export function DiscordLink({
  variant = "default",
}: {
  variant?: "default" | "outline";
}) {
  const t = useTranslations("DiscordInvitation");

  return (
    <Button
      asChild
      variant={variant}
      className="h-auto min-h-10 whitespace-normal"
    >
      <a href={DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer">
        <MessageSquare className="size-4" aria-hidden="true" />
        {t("join")}
        <ExternalLink className="size-4" aria-hidden="true" />
      </a>
    </Button>
  );
}

export function DiscordInvitation({
  context,
  children,
}: {
  context: "blog" | "news" | "event";
  children?: React.ReactNode;
}) {
  const t = useTranslations("DiscordInvitation");

  return (
    <aside className="border-primary/20 bg-primary/5 mt-10 rounded-xl border p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground min-w-0 text-sm leading-relaxed">
          {t(context)}
        </p>
        <div className="flex shrink-0">
          <DiscordLink />
        </div>
      </div>
      {children && (
        <div className="border-primary/20 mt-4 flex flex-wrap gap-2 border-t pt-4">
          {children}
        </div>
      )}
    </aside>
  );
}

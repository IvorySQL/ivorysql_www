import { MessageSquare } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const DISCORD_INVITE_URL = "https://discord.gg/BBNjXKfcK";

export async function DiscordInvite({ className }: { className?: string }) {
  const t = await getTranslations("Community");

  return (
    <section className={cn("container py-10 lg:py-14", className)}>
      <Card className="mx-auto max-w-4xl border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="size-5" />
            {t("discordInviteTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardDescription className="max-w-xl text-sm leading-snug">
            {t("discordInviteDescription")}
          </CardDescription>
          <Button asChild>
            <a href={DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer">
              {t("discordInviteCta")}
            </a>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

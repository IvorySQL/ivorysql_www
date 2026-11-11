import { DiscordInvite } from "@/components/blocks/discord-invite";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <DiscordInvite />
    </>
  );
}

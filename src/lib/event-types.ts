const chineseLabels: Record<string, string> = {
  Conference: "大会",
  Meetup: "技术交流",
  Webinar: "技术直播",
  Program: "社区计划",
  Competition: "赛事挑战",
};

export function getEventTypeLabel(eventType: string, locale: string): string {
  return locale === "zh" ? (chineseLabels[eventType] ?? eventType) : eventType;
}

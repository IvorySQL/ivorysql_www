type EventTiming = {
  date: string;
  endDate?: string;
  startsAt?: string;
  endsAt?: string;
};

export type EventStatus = "upcoming" | "ongoing" | "ended";

// Date-only community events cover the whole calendar day in China.
export function getEventStart(event: EventTiming): Date {
  return new Date(
    event.startsAt ??
      (event.date.includes("T") ? event.date : `${event.date}T00:00:00+08:00`),
  );
}

export function getEventEnd(event: EventTiming): Date {
  const end = event.endsAt ?? event.endDate ?? event.date;
  if (end.includes("T")) return new Date(end);
  // Use the next midnight as an exclusive boundary, including the final day.
  return new Date(new Date(`${end}T00:00:00+08:00`).getTime() + 86_400_000);
}

export function getEventStatus(event: EventTiming, now: Date): EventStatus {
  if (now < getEventStart(event)) return "upcoming";
  if (now >= getEventEnd(event)) return "ended";
  return "ongoing";
}

export function getEventGroups<T extends EventTiming>(events: T[], now: Date) {
  const groups: Record<EventStatus, T[]> = {
    ongoing: [],
    upcoming: [],
    ended: [],
  };
  for (const event of events) {
    groups[getEventStatus(event, now)].push(event);
  }
  groups.upcoming.sort(
    (a, b) => getEventStart(a).getTime() - getEventStart(b).getTime(),
  );
  groups.ongoing.sort(
    (a, b) => getEventEnd(a).getTime() - getEventEnd(b).getTime(),
  );
  return groups;
}

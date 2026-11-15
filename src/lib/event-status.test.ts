import { describe, expect, it } from "vitest";

import { getEventGroups } from "./event-status";

const events = [
  { slug: "later", date: "2026-11-20" },
  { slug: "case-study", date: "2025-02-26", endDate: "2026-12-31" },
  { slug: "pgconf", date: "2026-11-17", endDate: "2026-11-18" },
  { slug: "contest", date: "2026-10-25", endDate: "2026-12-31" },
  { slug: "past", date: "2026-10-22" },
];

describe("event status groups", () => {
  it("keeps every ongoing event visible alongside upcoming events", () => {
    const groups = getEventGroups(
      events,
      new Date("2026-11-15T12:00:00+08:00"),
    );
    expect(groups.ongoing.map((event) => event.slug)).toEqual([
      "case-study",
      "contest",
    ]);
    expect(groups.upcoming.map((event) => event.slug)).toEqual([
      "pgconf",
      "later",
    ]);
    expect(groups.ended.map((event) => event.slug)).toEqual(["past"]);
    expect(events[0].slug).toBe("later");
  });

  it("moves events across groups at their exact start and end", () => {
    const event = {
      date: "2026-11-17",
      startsAt: "2026-11-17T19:00:00+08:00",
      endsAt: "2026-11-17T20:00:00+08:00",
    };
    expect(
      getEventGroups([event], new Date("2026-11-17T18:59:59+08:00")).upcoming,
    ).toHaveLength(1);
    expect(
      getEventGroups([event], new Date("2026-11-17T19:00:00+08:00")).ongoing,
    ).toHaveLength(1);
    expect(
      getEventGroups([event], new Date("2026-11-17T20:00:00+08:00")).ended,
    ).toHaveLength(1);
  });

  it("returns empty groups when no events are available", () => {
    expect(getEventGroups([], new Date())).toEqual({
      ongoing: [],
      upcoming: [],
      ended: [],
    });
  });
});

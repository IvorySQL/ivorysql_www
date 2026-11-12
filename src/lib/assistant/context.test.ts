import { describe, expect, it } from "vitest";

import { prepareContext } from "./context";
import { MAX_BODY_BYTES } from "./limits";
import type { StoredChatMessage } from "./storage";
import { validateAssistantRequest } from "./validation";

describe("prepareContext", () => {
  it("keeps long completed answers but excludes interrupted and oversized history", () => {
    const messages: StoredChatMessage[] = [
      {
        id: "1",
        role: "assistant",
        content: "答".repeat(32000),
        status: "complete",
      },
      {
        id: "2",
        role: "assistant",
        content: "答".repeat(32001),
        status: "complete",
      },
      { id: "3", role: "assistant", content: "partial", status: "incomplete" },
      { id: "4", role: "user", content: "继续" },
    ];
    const result = prepareContext("zh", messages);
    expect(result).toHaveLength(2);
    expect(result[0].content).toHaveLength(32000);
    expect(
      validateAssistantRequest({ locale: "zh", messages: result }, 100000).ok,
    ).toBe(true);
  });

  it("removes oldest messages to fit UTF-8 bytes while preserving the new question", () => {
    const history: StoredChatMessage[] = Array.from({ length: 20 }, (_, i) => ({
      id: String(i),
      role: "assistant",
      content: "数".repeat(32000),
      status: "complete",
    }));
    const result = prepareContext("zh", [
      ...history,
      { id: "new", role: "user", content: "继续" },
    ]);
    const bytes = new TextEncoder().encode(
      JSON.stringify({ locale: "zh", messages: result }),
    ).length;
    expect(bytes).toBeLessThanOrEqual(MAX_BODY_BYTES);
    expect(result.at(-1)?.content).toBe("继续");
    expect(result).toHaveLength(3);
  });
});

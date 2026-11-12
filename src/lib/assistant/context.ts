import {
  MAX_ASSISTANT_LENGTH,
  MAX_BODY_BYTES,
  MAX_MESSAGES,
  MAX_USER_LENGTH,
} from "./limits";
import type { StoredChatMessage } from "./storage";
import type { AssistantLocale } from "./types";

export function prepareContext(
  locale: AssistantLocale,
  conversation: StoredChatMessage[],
) {
  const messages = conversation
    .filter(
      (message, index) =>
        index === conversation.length - 1 ||
        ((message.role === "user" || message.status === "complete") &&
          Array.from(message.content).length <=
            (message.role === "user" ? MAX_USER_LENGTH : MAX_ASSISTANT_LENGTH)),
    )
    .map(({ role, content }) => ({ role, content }))
    .slice(-MAX_MESSAGES);
  const encoder = new TextEncoder();
  while (
    messages.length > 1 &&
    encoder.encode(JSON.stringify({ locale, messages })).byteLength >
      MAX_BODY_BYTES
  ) {
    messages.shift();
  }
  return messages;
}

import authorsData from "./authors.json";

export function resolveAuthor(authorId: string, locale: string) {
  const info = authorsData.find((author) => author.author_id === authorId);

  if (!info) {
    return { author: authorId, position: "" };
  }

  return {
    ...info,
    author: locale === "zh" ? info.author_zh : info.author_en,
  };
}

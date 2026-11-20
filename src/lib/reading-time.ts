/** Estimate prose reading time; running examples and reading logs are excluded. */
export function generateReadingTime(content: string, locale: string): string {
  let fence: { marker: string; length: number } | null = null;
  const prose = content
    .replace(/<(pre|script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "\n")
    .split(/\r?\n/)
    .filter((line) => {
      const match = line.match(/^\s{0,3}(`{3,}|~{3,})(.*)$/);
      if (fence) {
        if (
          match &&
          match[1][0] === fence.marker &&
          match[1].length >= fence.length &&
          !match[2].trim()
        ) {
          fence = null;
        }
        return false;
      }
      // Backticks in an info string indicate inline code, not a block fence.
      if (match && (match[1][0] !== "`" || !match[2].includes("`"))) {
        fence = { marker: match[1][0], length: match[1].length };
        return false;
      }
      return !/^(?: {4}|\t)/.test(line);
    })
    .join("\n")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/^\s*\[[^\]]+\]:\s+.*$/gm, " ")
    .replace(/!\[[^\]]*\](?:\([^\n]*?\)|\[[^\]]*\])/g, " ")
    .replace(/\[([^\]]*)\]\([^\n]*?\)/g, "$1")
    .replace(/\[([^\]]*)\]\[[^\]]*\]/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/https?:\/\/[^\s<>]+/g, " ")
    .replace(/&(?:#\d+|#x[\da-f]+|\w+);/gi, " ");

  const chineseCharacters = (
    prose.match(/[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g) ?? []
  ).length;
  const englishWords = (
    prose.match(/[a-z0-9]+(?:['’_-][a-z0-9]+)*/gi) ?? []
  ).length;
  const minutes = Math.max(
    1,
    Math.ceil(chineseCharacters / 400 + englishWords / 200),
  );

  return locale === "zh" ? `${minutes} 分钟阅读` : `${minutes} min read`;
}

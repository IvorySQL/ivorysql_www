import fs from "fs";
import matter from "gray-matter";
import path from "path";

function storiesDirectory(locale: string): string {
  return path.join(process.cwd(), "content/stories", locale);
}

export type StoryStat = {
  value: string;
  label: string;
};

export type StoryItem = {
  slug: string;
  title: string;
  description: string;
  industry: string;
  industryLabel: string;
  headline: string;
  stats: StoryStat[];
  order: number;
  path: string;
};

export type StoryItemWithContent = StoryItem & { content: string };

export function getAllStorySlugs(locale: string): string[] {
  const dir = storiesDirectory(locale);
  if (!fs.existsSync(dir)) return [];
  const directories = fs.readdirSync(dir);
  return directories
    .filter(
      (d) => !d.startsWith(".") && fs.statSync(path.join(dir, d)).isDirectory(),
    )
    .map((d) => {
      const filePath = path.join(dir, d, "index.mdx");
      if (!fs.existsSync(filePath)) return null;
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      return (data.slug as string) || d;
    })
    .filter(Boolean) as string[];
}

export function getStoryItem(
  locale: string,
  slug: string,
): StoryItemWithContent {
  const dir = storiesDirectory(locale);
  const directories = fs.readdirSync(dir);
  const dirName = directories.find((d) => {
    const filePath = path.join(dir, d, "index.mdx");
    if (!fs.existsSync(filePath)) return false;
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    return (data.slug as string) === slug || d === slug;
  });

  if (!dirName) {
    throw new Error(`Story not found: ${slug}`);
  }

  const filePath = path.join(dir, dirName, "index.mdx");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: (data.slug as string) || slug,
    title: (data.title as string) || "",
    description: (data.description as string) || "",
    industry: (data.industry as string) || "other",
    industryLabel: (data.industryLabel as string) || "",
    headline: (data.headline as string) || "",
    stats: (data.stats as StoryStat[]) || [],
    order: (data.order as number) ?? 0,
    path: `/community/stories/${data.slug || slug}`,
    content,
  };
}

export function getSortedStories(
  locale: string,
  {
    industry,
    currentStorySlug,
  }: {
    industry?: string;
    currentStorySlug?: string;
  } = {},
): StoryItem[] {
  const dir = storiesDirectory(locale);
  if (!fs.existsSync(dir)) return [];

  const directories = fs.readdirSync(dir);
  const items: StoryItem[] = [];

  for (const d of directories) {
    if (d.startsWith(".") || !fs.statSync(path.join(dir, d)).isDirectory())
      continue;

    const filePath = path.join(dir, d, "index.mdx");
    if (!fs.existsSync(filePath)) continue;

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    if (currentStorySlug && (data.slug as string) === currentStorySlug)
      continue;

    if (
      industry &&
      industry !== "all" &&
      (data.industry as string) !== industry
    )
      continue;

    items.push({
      slug: (data.slug as string) || d,
      title: (data.title as string) || "",
      description: (data.description as string) || "",
      industry: (data.industry as string) || "other",
      industryLabel: (data.industryLabel as string) || "",
      headline: (data.headline as string) || "",
      stats: (data.stats as StoryStat[]) || [],
      order: (data.order as number) ?? 0,
      path: `/community/stories/${data.slug || d}`,
    });
  }

  items.sort((a, b) => b.order - a.order);

  return items;
}

export function getAllStoryIndustries(
  locale: string,
): { key: string; label: string }[] {
  const items = getSortedStories(locale);
  const industryMap = new Map<string, string>();
  for (const item of items) {
    industryMap.set(item.industry, item.industryLabel);
  }
  return Array.from(industryMap.entries()).map(([key, label]) => ({
    key,
    label,
  }));
}

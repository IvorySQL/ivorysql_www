export const BLOG_PLACEHOLDER_IMAGE = "/images/blog-placeholder.svg";

export const BLOG_FEATURED_IMAGE_SIZES =
  "(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 800px";

export const BLOG_GRID_IMAGE_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 400px";

export const BLOG_POST_HERO_IMAGE_SIZES =
  "(max-width: 1280px) 100vw, 1000px";

export function getBlogThumbnailImage(
  post: { image?: string; slug?: string },
  options?: { fallbackToPlaceholder?: boolean }
): string | null {
  const fallback = options?.fallbackToPlaceholder ?? true;

  if (post.image) {
    // If it's a relative path from Docusaurus (e.g., "img/blog/covers/xxx.svg")
    // convert to Next.js public path
    if (post.image.startsWith("img/")) {
      return `/${post.image.replace("img/", "")}`;
    }
    return post.image;
  }

  return fallback ? BLOG_PLACEHOLDER_IMAGE : null;
}

export function toAbsoluteBlogImageUrl(
  relativePath: string,
  origin: string
): string {
  return `${origin}/${relativePath.replace(/^\//, "")}`;
}

export function getAbsoluteBlogSocialImage(
  post: { image?: string },
  origin: string
): string | null {
  if (!post.image) return null;
  const url = getBlogThumbnailImage(post, { fallbackToPlaceholder: false });
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return toAbsoluteBlogImageUrl(url, origin);
}

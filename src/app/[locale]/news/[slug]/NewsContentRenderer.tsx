"use client";

type NewsContentRendererProps = {
  content: string;
};

export function NewsContentRenderer({ content }: NewsContentRendererProps) {
  // Convert remaining markdown image syntax to HTML img tags
  // Pattern: ![alt](/path/to/image)
  const processedContent = content.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="my-8 w-full rounded-xl border border-border" />',
  );

  return (
    <div
      className="prose prose-zinc dark:prose-invert prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl prose-h2:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl prose-h3:font-medium prose-p:leading-relaxed prose-p:text-base prose-li:text-sm prose-li:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-strong:font-semibold prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:bg-muted/20 prose-blockquote:rounded-r-lg prose-blockquote:px-4 prose-blockquote:py-3 prose-blockquote:text-muted-foreground prose-blockquote:not-italic prose-img:rounded-xl prose-img:border prose-img:border-border prose-code:bg-muted/50 prose-code:rounded-md prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono prose-pre:bg-muted/30 prose-pre:border prose-pre:border-border prose-pre:text-foreground max-w-none"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}

import Link from "next/link";

import type { Metadata } from "next";

type ComingSoonProps = {
  title?: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
};

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export function ComingSoon({
  title = "Coming Soon",
  description = "This page is currently under construction. Check back later for updates.",
  backHref = "/",
  backLabel = "Back to Home",
}: ComingSoonProps) {
  return (
    <div className="bg-background">
      <div className="container mx-auto flex min-h-[60dvh] flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-muted/50">
          <svg
            className="size-8 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.42 15.17l-5.1-2.94a1.5 1.5 0 0 1 0-2.6l5.1-2.94a1.5 1.5 0 0 1 1.5 0l5.1 2.94a1.5 1.5 0 0 1 0 2.6l-5.1 2.94a1.5 1.5 0 0 1-1.5 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.42 15.17V21"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.32 12.23v6.54"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.68 12.23v6.54"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9.23V6l9-3 9 3v3.23"
            />
          </svg>
        </div>
        <h1 className="text-foreground text-2xl font-semibold tracking-tight md:text-3xl">
          {title}
        </h1>
        <p className="text-muted-foreground mx-auto mt-3 max-w-md text-base">
          {description}
        </p>
        <Link
          href={backHref}
          className="text-primary mt-6 inline-flex items-center gap-1 text-sm font-medium transition-colors hover:underline"
        >
          {backLabel}
        </Link>
      </div>
    </div>
  );
}

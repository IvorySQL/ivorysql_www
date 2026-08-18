import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Excludes paths ending in a known static-file extension, not just any path
  // containing a dot — a slug like "ivorysql-5.0-oracle-to-postgresql-migration"
  // (version number in the slug) must still go through the i18n middleware.
  matcher:
    "/((?!api|_next|_vercel|.*\\.(?:ico|png|jpg|jpeg|gif|webp|avif|svg|css|js|mjs|json|xml|txt|woff2?|ttf|otf|map|webmanifest|pdf|jar|zip|gz|mp4|webm|mp3|doc|docx|csv)$).*)",
};

#!/usr/bin/env node
/**
 * Refreshes src/lib/db-releases.snapshot.json — the offline fallback for the
 * download page's server-package list.
 *
 * Run with `pnpm refresh:releases`. The download page fetches GitHub directly
 * at build time, so this snapshot only matters when that fetch fails (no
 * network, API outage, rate limit). Refresh it after a release so the fallback
 * stays close to reality, then commit the result.
 *
 * This script deliberately holds NO domain logic — it stores the raw GitHub
 * response shape, and src/lib/db-releases.ts applies the same transform to
 * live and snapshot data alike. Keeping the parsing rules in one place is why
 * the fallback can't drift from the real thing.
 */

import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const RELEASES_ENDPOINT =
  "https://api.github.com/repos/IvorySQL/IvorySQL/releases?per_page=100";

/**
 * How many of the most recent releases to keep, checksums included.
 *
 * The page only renders the newest release of each of the two most recently
 * active lines, so the rest of the history is dead weight in a file that gets
 * committed. Replaying every point in IvorySQL's release history, the deepest
 * either of those two releases has ever sat is index 4 — five releases — which
 * happened in March 2025 when the 3.x line went quiet while 4.x kept shipping.
 * Ten leaves 2x headroom over that observed worst case without the cap having
 * to encode the selection rule itself.
 *
 * Raise it if a line ever goes quiet for much longer than that; the symptom
 * would be the fallback showing only one release line.
 */
const RELEASE_LIMIT = 10;

const MD5_SUFFIX = ".md5";
const TIMEOUT_MS = 30_000;

const OUTPUT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "lib",
  "db-releases.snapshot.json",
);

function headers() {
  const value = {
    "User-Agent": "ivorysql-www-snapshot",
    Accept: "application/vnd.github+json",
  };
  if (process.env.GITHUB_TOKEN) {
    value.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return value;
}

async function getJson(url) {
  const response = await fetch(url, {
    headers: headers(),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`GET ${url} → ${response.status} ${response.statusText}`);
  }
  return response.json();
}

/** Keeps only the fields the transform reads, so the snapshot stays small. */
function trimRelease(release) {
  return {
    tag_name: release.tag_name,
    draft: release.draft,
    prerelease: release.prerelease,
    published_at: release.published_at,
    assets: release.assets.map((asset) => ({
      name: asset.name,
      size: asset.size,
      browser_download_url: asset.browser_download_url,
    })),
  };
}

async function fetchMd5(asset) {
  const response = await fetch(asset.browser_download_url, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`${asset.name} → ${response.status}`);
  }
  // Standard md5sum output: "<hash>  <filename>".
  const hash = (await response.text()).trim().split(/\s+/)[0];
  if (!/^[0-9a-f]{32}$/i.test(hash)) {
    throw new Error(`${asset.name} → unexpected content`);
  }
  return hash;
}

async function main() {
  console.log("Fetching IvorySQL releases from GitHub…");
  const all = await getJson(RELEASES_ENDPOINT);
  // The API returns releases newest-first.
  const releases = all.slice(0, RELEASE_LIMIT).map(trimRelease);
  console.log(
    `  ${all.length} releases, keeping the newest ${releases.length}`,
  );

  const sidecars = releases.flatMap((release) =>
    release.assets.filter((asset) => asset.name.endsWith(MD5_SUFFIX)),
  );

  console.log(`Fetching ${sidecars.length} checksum sidecars…`);
  const results = await Promise.all(
    sidecars.map(async (asset) => {
      try {
        return [asset.name.slice(0, -MD5_SUFFIX.length), await fetchMd5(asset)];
      } catch (error) {
        console.warn(`  skipped: ${error.message}`);
        return null;
      }
    }),
  );

  const md5s = Object.fromEntries(results.filter(Boolean));
  console.log(`  ${Object.keys(md5s).length} checksums resolved`);

  const snapshot = {
    fetchedAt: new Date().toISOString(),
    releases,
    md5s,
  };

  await writeFile(OUTPUT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(`Wrote ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(`\nFailed to refresh snapshot: ${error.message}`);
  process.exit(1);
});

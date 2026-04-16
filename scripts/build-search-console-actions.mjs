import fs from "node:fs/promises";
import path from "node:path";

import { LEGACY_GONE_ROUTES } from "../data/route-policy.mjs";

const ROOT = process.cwd();
const REPORTS_DIR = path.join(ROOT, "reports");
const SITEMAP_FILE = path.join(ROOT, "sitemap.xml");
const SITE_ORIGIN = "https://finlogichub5.com";
const TODAY = "2026-04-16";
const NEW_GUIDE_PATHS = [
  "/tools/arizona/annual-report-deadline/",
  "/tools/arkansas/franchise-tax-deadline/",
  "/tools/indiana/business-entity-report-deadline/",
  "/tools/michigan/annual-report-deadline/",
  "/tools/utah/annual-renewal-deadline/"
];
const UPDATED_CORE_PATHS = [
  "/",
  "/states"
];
const SPOT_CHECK_PATHS = [
  "/weekly/",
  "/market-risk-today/",
  "/does-not-exist"
];

function toUrl(pathname) {
  return new URL(pathname, SITE_ORIGIN).toString();
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

function renderUrlList(urls) {
  return urls.map((url) => `- ${url}`).join("\n");
}

async function main() {
  await fs.mkdir(REPORTS_DIR, { recursive: true });

  const sitemapXml = await fs.readFile(SITEMAP_FILE, "utf8");
  const sitemapUrls = extractLocs(sitemapXml);
  const legacyUrls = LEGACY_GONE_ROUTES.map(toUrl);
  const requestIndexingUrls = [...UPDATED_CORE_PATHS, ...NEW_GUIDE_PATHS].map(toUrl);
  const missingFromSitemap = requestIndexingUrls.filter((url) => !sitemapUrls.includes(url));

  const markdown = `# Search Console Manual Actions | ${TODAY}

This file is designed to help with two safe actions:

1. Remove retired legacy finance URLs that now return \`410 Gone\`
2. Request indexing for newly published or materially updated live pages

## Google Search Console

### A. Removals

Use **Indexing -> Removals -> New request** for these retired URLs:

${renderUrlList(legacyUrls)}

### B. Request Indexing

Use **URL Inspection -> Request indexing** for these live pages:

${renderUrlList(requestIndexingUrls)}

### C. Resubmit Sitemap

- ${SITE_ORIGIN}/sitemap.xml

### D. Spot Check After Crawl

Use URL Inspection or a live fetch for:

${renderUrlList(SPOT_CHECK_PATHS.map(toUrl))}

Expected outcomes:

- legacy URLs: \`410\` and \`noindex\`
- unknown URLs: \`404\` and \`noindex\`
- live guide URLs: \`200\` and **no** \`noindex\`

## Bing Webmaster Tools

### A. Submit URLs

${renderUrlList(requestIndexingUrls)}

### B. Check Retired URLs

${renderUrlList(legacyUrls.slice(0, 5))}

### C. Sitemap

- ${SITE_ORIGIN}/sitemap.xml

## Notes

- Legacy cleanup deploy commits: \`284e76f\`, \`f7e2870\`
- New state-guide deploy commit: \`850b7b8\`
- This checklist does not ask Google to deindex valid live pages.
`;

  const baseName = `search-console-actions-${TODAY}`;
  const reportPath = path.join(REPORTS_DIR, `${baseName}.md`);
  const legacyTxtPath = path.join(REPORTS_DIR, `${baseName}-removals.txt`);
  const requestTxtPath = path.join(REPORTS_DIR, `${baseName}-request-indexing.txt`);

  await Promise.all([
    fs.writeFile(reportPath, markdown),
    fs.writeFile(legacyTxtPath, `${legacyUrls.join("\n")}\n`),
    fs.writeFile(requestTxtPath, `${requestIndexingUrls.join("\n")}\n`)
  ]);

  console.log(`Wrote ${reportPath}`);
  console.log(`Wrote ${legacyTxtPath}`);
  console.log(`Wrote ${requestTxtPath}`);

  if (missingFromSitemap.length > 0) {
    console.log("");
    console.log("Warning: these live URLs are not currently listed in sitemap.xml:");
    for (const url of missingFromSitemap) {
      console.log(`- ${url}`);
    }
    process.exitCode = 1;
  } else {
    console.log("");
    console.log("All request-indexing URLs are present in sitemap.xml.");
  }
}

await main();

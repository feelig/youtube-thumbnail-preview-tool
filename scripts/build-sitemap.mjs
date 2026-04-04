import fs from "node:fs/promises";
import path from "node:path";

import { liveStatePages } from "../data/live-state-pages.mjs";
import { parseReviewDate } from "./lib/state-page-utils.mjs";

const ROOT = process.cwd();
const SITEMAP_FILE = path.join(ROOT, "sitemap.xml");
const SITE_ORIGIN = "https://finlogichub5.com";

function formatDate(value) {
  return value.toISOString().slice(0, 10);
}

function renderUrl(entry) {
  const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : "";

  return `  <url>
    <loc>${entry.loc}</loc>${lastmod}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
}

const latestStateReview = new Date(
  Math.max(...liveStatePages.map((page) => parseReviewDate(page.lastReviewed).getTime()))
);

const staticPages = [
  {
    loc: `${SITE_ORIGIN}/`,
    changefreq: "weekly",
    priority: "1.0",
    lastmod: formatDate(latestStateReview)
  },
  {
    loc: `${SITE_ORIGIN}/about`,
    changefreq: "monthly",
    priority: "0.6"
  },
  {
    loc: `${SITE_ORIGIN}/states`,
    changefreq: "weekly",
    priority: "0.8",
    lastmod: formatDate(latestStateReview)
  },
  {
    loc: `${SITE_ORIGIN}/filing-basics`,
    changefreq: "monthly",
    priority: "0.7"
  },
  {
    loc: `${SITE_ORIGIN}/filing-help-options`,
    changefreq: "monthly",
    priority: "0.7"
  },
  {
    loc: `${SITE_ORIGIN}/privacy`,
    changefreq: "monthly",
    priority: "0.4"
  },
  {
    loc: `${SITE_ORIGIN}/contact`,
    changefreq: "monthly",
    priority: "0.4"
  },
  {
    loc: `${SITE_ORIGIN}/terms`,
    changefreq: "monthly",
    priority: "0.4"
  }
];

const statePages = [...liveStatePages]
  .sort((left, right) => left.canonicalUrl.localeCompare(right.canonicalUrl))
  .map((page) => ({
    loc: page.canonicalUrl,
    changefreq: "monthly",
    priority: "0.8",
    lastmod: formatDate(parseReviewDate(page.lastReviewed))
  }));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPages, ...statePages].map(renderUrl).join("\n")}
</urlset>
`;

await fs.writeFile(SITEMAP_FILE, xml);

console.log(`Built sitemap with ${staticPages.length + statePages.length} URLs.`);

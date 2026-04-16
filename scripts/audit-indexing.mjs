import fs from "node:fs/promises";
import path from "node:path";

import { liveStatePages } from "../data/live-state-pages.mjs";
import {
  LEGACY_GONE_ROUTES,
  LIVE_ROUTE_PATHS,
  normalizeRoutePath
} from "../data/route-policy.mjs";

const ROOT = process.cwd();
const ROBOTS_FILE = path.join(ROOT, "robots.txt");
const SITEMAP_FILE = path.join(ROOT, "sitemap.xml");
const ROUTES_FILE = path.join(ROOT, "_routes.json");
const NOT_FOUND_FILE = path.join(ROOT, "404.html");
const SITE_ORIGIN = "https://finlogichub5.com";
const REQUIRED_STATIC_URLS = [
  `${SITE_ORIGIN}/`,
  `${SITE_ORIGIN}/states`,
  `${SITE_ORIGIN}/filing-basics`,
  `${SITE_ORIGIN}/filing-help-options`
];

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

const robotsText = await fs.readFile(ROBOTS_FILE, "utf8");
const sitemapXml = await fs.readFile(SITEMAP_FILE, "utf8");
const routesConfig = JSON.parse(await fs.readFile(ROUTES_FILE, "utf8"));

const robotProblems = [];
const sitemapProblems = [];
const routeProblems = [];
const expectedUrls = [
  ...REQUIRED_STATIC_URLS,
  ...liveStatePages.map((page) => page.canonicalUrl)
];

if (!/User-agent:\s*\*/i.test(robotsText)) {
  robotProblems.push("robots.txt is missing a wildcard user-agent rule");
}

if (!/Allow:\s*\//i.test(robotsText)) {
  robotProblems.push("robots.txt is missing an allow-all rule");
}

if (!/Sitemap:\s*https:\/\/finlogichub5\.com\/sitemap\.xml/i.test(robotsText)) {
  robotProblems.push("robots.txt is missing the sitemap directive for https://finlogichub5.com/sitemap.xml");
}

const sitemapUrls = extractLocs(sitemapXml);
const sitemapUrlSet = new Set(sitemapUrls);
const duplicateUrls = sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index);
const missingUrls = expectedUrls.filter((url) => !sitemapUrlSet.has(url));
const legacyGonePathSet = new Set(LEGACY_GONE_ROUTES.map((route) => normalizeRoutePath(route)));
const sitemapLegacyUrls = sitemapUrls.filter((url) =>
  legacyGonePathSet.has(normalizeRoutePath(new URL(url).pathname))
);
const liveAndLegacyOverlap = LIVE_ROUTE_PATHS.map((route) => normalizeRoutePath(route)).filter((route) =>
  legacyGonePathSet.has(route)
);

if (!/<urlset\b/i.test(sitemapXml)) {
  sitemapProblems.push("sitemap.xml is missing the urlset root element");
}

if (duplicateUrls.length > 0) {
  sitemapProblems.push(`sitemap.xml contains duplicate URLs: ${[...new Set(duplicateUrls)].join(", ")}`);
}

if (missingUrls.length > 0) {
  sitemapProblems.push(`sitemap.xml is missing expected URLs: ${missingUrls.join(", ")}`);
}

if (sitemapLegacyUrls.length > 0) {
  sitemapProblems.push(`sitemap.xml still lists retired legacy URLs: ${sitemapLegacyUrls.join(", ")}`);
}

if (!Array.isArray(routesConfig.include) || !routesConfig.include.includes("/*")) {
  routeProblems.push('_routes.json should include "/*" so legacy and unknown paths are handled before they soft-404 to the homepage');
}

if (liveAndLegacyOverlap.length > 0) {
  routeProblems.push(`Route policy overlaps live and retired paths: ${[...new Set(liveAndLegacyOverlap)].join(", ")}`);
}

try {
  await fs.access(NOT_FOUND_FILE);
} catch {
  routeProblems.push("404.html is missing");
}

console.log(`Robots checks: ${robotProblems.length === 0 ? "passed" : "failed"}`);
console.log(`Sitemap URLs found: ${sitemapUrls.length}`);
console.log(`Expected URLs checked: ${expectedUrls.length}`);

if (robotProblems.length > 0) {
  console.log("");
  console.log("robots.txt issues:");
  for (const issue of robotProblems) {
    console.log(`- ${issue}`);
  }
}

if (sitemapProblems.length > 0) {
  console.log("");
  console.log("sitemap.xml issues:");
  for (const issue of sitemapProblems) {
    console.log(`- ${issue}`);
  }
}

if (routeProblems.length > 0) {
  console.log("");
  console.log("Routing issues:");
  for (const issue of routeProblems) {
    console.log(`- ${issue}`);
  }
}

if (robotProblems.length === 0 && sitemapProblems.length === 0) {
  console.log("");
  console.log("Indexing essentials look consistent.");
}

if (robotProblems.length > 0 || sitemapProblems.length > 0 || routeProblems.length > 0) {
  process.exitCode = 1;
}

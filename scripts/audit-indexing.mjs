import fs from "node:fs/promises";
import path from "node:path";

import { liveStatePages } from "../data/live-state-pages.mjs";

const ROOT = process.cwd();
const ROBOTS_FILE = path.join(ROOT, "robots.txt");
const SITEMAP_FILE = path.join(ROOT, "sitemap.xml");
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

const robotProblems = [];
const sitemapProblems = [];
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

if (!/<urlset\b/i.test(sitemapXml)) {
  sitemapProblems.push("sitemap.xml is missing the urlset root element");
}

if (duplicateUrls.length > 0) {
  sitemapProblems.push(`sitemap.xml contains duplicate URLs: ${[...new Set(duplicateUrls)].join(", ")}`);
}

if (missingUrls.length > 0) {
  sitemapProblems.push(`sitemap.xml is missing expected URLs: ${missingUrls.join(", ")}`);
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

if (robotProblems.length === 0 && sitemapProblems.length === 0) {
  console.log("");
  console.log("Indexing essentials look consistent.");
}

if (robotProblems.length > 0 || sitemapProblems.length > 0) {
  process.exitCode = 1;
}

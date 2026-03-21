import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const REPORT_FILE = path.join(ROOT, "reports", "daily-source-scan.json");

const report = JSON.parse(await fs.readFile(REPORT_FILE, "utf8"));
const brokenCount = report.linkHealth?.brokenOrError ?? 0;
const staleCount = Array.isArray(report.stalePages) ? report.stalePages.length : 0;
const blockedCount = report.linkHealth?.blocked ?? 0;
const timedOutCount = report.linkHealth?.timedOut ?? 0;
const transportCount = report.linkHealth?.transportIssues ?? 0;

console.log(`Source scan timestamp: ${report.scannedAt ?? "unknown"}`);
console.log(`Pages scanned: ${report.pagesScanned ?? 0}`);
console.log(`Source links checked: ${report.sourceLinksChecked ?? 0}`);
console.log(`Broken or error links: ${brokenCount}`);
console.log(`Stale pages: ${staleCount}`);
console.log(`Blocked links: ${blockedCount}`);
console.log(`Timed out links: ${timedOutCount}`);
console.log(`Transport issues: ${transportCount}`);

if (brokenCount === 0 && staleCount === 0) {
  console.log("");
  console.log("Source scan audit passed.");
} else {
  console.log("");
  console.log("Source scan audit failed.");
}

if (brokenCount > 0 || staleCount > 0) {
  process.exitCode = 1;
}

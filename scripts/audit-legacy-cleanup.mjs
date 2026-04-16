import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const TEXT_EXTENSIONS = new Set([
  ".html",
  ".js",
  ".json",
  ".mjs",
  ".svg",
  ".txt",
  ".xml"
]);
const IGNORED_DIRECTORIES = new Set([".git", "node_modules"]);
const CONTENT_EXCEPTIONS = new Set([
  "data/route-policy.mjs",
  "scripts/audit-legacy-cleanup.mjs"
]);
const FORBIDDEN_FILE_PATHS = [
  "functions/methodology.js",
  "functions/pillar/asset-allocation-method.js",
  "functions/pillar/market-risk-framework.js",
  "functions/tools/delaware/annual-fee-calculator.js",
  "functions/tools/washington/annual-report-deadline.js"
];
const FORBIDDEN_PATTERNS = [
  /Market Risk Index \(MRI\)/i,
  /market risk regime/i,
  /Institutional-style summary of market risk/i,
  /Part of the Market Risk Framework Series/i,
  /\brisk-on\b/i,
  /\brisk-off\b/i,
  /allocation posture/i
];

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === ".DS_Store") {
      files.push(path.join(directory, entry.name));
      continue;
    }

    if (entry.isDirectory()) {
      if (!IGNORED_DIRECTORIES.has(entry.name)) {
        files.push(...(await walk(path.join(directory, entry.name))));
      }
      continue;
    }

    files.push(path.join(directory, entry.name));
  }

  return files;
}

function toRepoRelative(filePath) {
  return path.relative(ROOT, filePath).replaceAll(path.sep, "/");
}

function linePreview(content, matchIndex) {
  const lineStart = content.lastIndexOf("\n", matchIndex) + 1;
  const lineEnd = content.indexOf("\n", matchIndex);
  return content.slice(lineStart, lineEnd === -1 ? undefined : lineEnd).trim();
}

const repoFiles = await walk(ROOT);
const problems = [];

for (const relativePath of FORBIDDEN_FILE_PATHS) {
  try {
    await fs.access(path.join(ROOT, relativePath));
    problems.push(`Retired legacy handler still exists: ${relativePath}`);
  } catch {
    // Expected.
  }
}

for (const filePath of repoFiles) {
  const relativePath = toRepoRelative(filePath);

  if (relativePath.endsWith(".DS_Store")) {
    problems.push(`Unexpected .DS_Store file present: ${relativePath}`);
    continue;
  }

  if (CONTENT_EXCEPTIONS.has(relativePath)) {
    continue;
  }

  if (!TEXT_EXTENSIONS.has(path.extname(relativePath))) {
    continue;
  }

  const content = await fs.readFile(filePath, "utf8");

  for (const pattern of FORBIDDEN_PATTERNS) {
    const match = content.match(pattern);

    if (!match || match.index === undefined) {
      continue;
    }

    problems.push(
      `Legacy finance copy remains in ${relativePath}: ${linePreview(content, match.index)}`
    );
    break;
  }
}

console.log(`Files scanned: ${repoFiles.length}`);

if (problems.length === 0) {
  console.log("Legacy cleanup audit passed.");
} else {
  console.log("");
  console.log("Legacy cleanup issues:");
  for (const issue of problems) {
    console.log(`- ${issue}`);
  }
  process.exitCode = 1;
}

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SITEMAP_FILE = path.join(ROOT, "sitemap.xml");
const KEY_NAME_PATTERN = /^[A-Za-z0-9-]{8,128}$/;
const INDEXNOW_ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
  "https://search.seznam.cz/indexnow"
];

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function chunk(list, size) {
  const batches = [];

  for (let index = 0; index < list.length; index += size) {
    batches.push(list.slice(index, index + size));
  }

  return batches;
}

async function findIndexNowKeyFile() {
  const entries = await fs.readdir(ROOT, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".txt")) {
      continue;
    }

    const key = entry.name.slice(0, -4);

    if (!KEY_NAME_PATTERN.test(key)) {
      continue;
    }

    const keyPath = path.join(ROOT, entry.name);
    const body = (await fs.readFile(keyPath, "utf8")).trim();

    if (body === key) {
      return {
        key,
        fileName: entry.name
      };
    }
  }

  throw new Error("No valid IndexNow key file found at the repository root.");
}

async function readSitemapUrls() {
  const xml = await fs.readFile(SITEMAP_FILE, "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

function getOrigin(urls) {
  if (!urls.length) {
    throw new Error("Sitemap does not contain any URLs.");
  }

  return new URL(urls[0]).origin;
}

function toPublicUrl(origin, filePath) {
  const normalizedPath = filePath.replace(/\\/g, "/").replace(/^\.\//, "");

  if (normalizedPath === "index.html") {
    return `${origin}/`;
  }

  if (!normalizedPath.endsWith(".html")) {
    return null;
  }

  if (normalizedPath.endsWith("/index.html")) {
    const routePath = normalizedPath.slice(0, -"/index.html".length);
    return `${origin}/${routePath}/`;
  }

  if (!normalizedPath.includes("/")) {
    return `${origin}/${normalizedPath.slice(0, -".html".length)}`;
  }

  return `${origin}/${normalizedPath}`;
}

function collectUrlsFromFiles(origin, files) {
  const normalizedFiles = files
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => value.replace(/\\/g, "/").replace(/^\.\//, ""));

  const requiresFullSubmit = normalizedFiles.some(
    (filePath) =>
      filePath === "sitemap.xml" ||
      filePath === "robots.txt" ||
      (filePath.endsWith(".txt") && KEY_NAME_PATTERN.test(path.basename(filePath, ".txt")))
  );

  if (requiresFullSubmit) {
    return null;
  }

  const urlList = normalizedFiles
    .map((filePath) => toPublicUrl(origin, filePath))
    .filter(Boolean);

  return [...new Set(urlList)];
}

async function waitForLiveKey(origin, keyFile, timeoutMs) {
  const keyUrl = `${origin}/${keyFile}`;
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(`${keyUrl}?ts=${Date.now()}`, {
        headers: {
          "cache-control": "no-cache"
        }
      });

      const body = (await response.text()).trim();

      if (response.ok && body === keyFile.replace(/\.txt$/, "")) {
        console.log(`Verified live IndexNow key file: ${keyUrl}`);
        return;
      }
    } catch (error) {
      console.log(`Waiting for live key file: ${error.message}`);
    }

    console.log("IndexNow key file is not live yet. Waiting 30 seconds...");
    await sleep(30_000);
  }

  throw new Error(`Timed out waiting for live IndexNow key file at ${keyUrl}.`);
}

async function submitIndexNow({ host, key, keyLocation, urlList }) {
  const payload = JSON.stringify({
    host,
    key,
    keyLocation,
    urlList
  });
  const failures = [];
  let successCount = 0;

  for (const endpoint of INDEXNOW_ENDPOINTS) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=utf-8"
      },
      body: payload
    });
    const body = await response.text();

    if (response.ok) {
      successCount += 1;
      console.log(`Submitted ${urlList.length} URL(s) to ${endpoint}. Status: ${response.status}`);

      if (body.trim()) {
        console.log(body.trim());
      }

      continue;
    }

    failures.push(`${endpoint} -> ${response.status}: ${body || "No response body"}`);
  }

  if (!successCount) {
    throw new Error(`IndexNow submission failed on every endpoint.\n${failures.join("\n")}`);
  }

  if (failures.length) {
    console.log("Some IndexNow endpoints failed, but at least one accepted the submission:");
    console.log(failures.join("\n"));
  }
}

const args = process.argv.slice(2);
const submitAll = args.includes("--all") || !args.some((value) => !value.startsWith("--"));
const ensureLiveKey = args.includes("--ensure-live-key");
const timeoutFlagIndex = args.findIndex((value) => value === "--timeout-seconds");
const timeoutSeconds =
  timeoutFlagIndex >= 0 && args[timeoutFlagIndex + 1]
    ? Number.parseInt(args[timeoutFlagIndex + 1], 10)
    : 900;
const fileArgs = args.filter((value, index) => {
  if (value.startsWith("--")) {
    return false;
  }

  return timeoutFlagIndex < 0 || index !== timeoutFlagIndex + 1;
});

const sitemapUrls = await readSitemapUrls();
const origin = getOrigin(sitemapUrls);
const host = new URL(origin).host;
const { key, fileName } = await findIndexNowKeyFile();
const keyLocation = `${origin}/${fileName}`;

if (ensureLiveKey) {
  await waitForLiveKey(origin, fileName, timeoutSeconds * 1000);
}

let urlsToSubmit;

if (submitAll) {
  urlsToSubmit = sitemapUrls;
} else {
  const mappedUrls = collectUrlsFromFiles(origin, fileArgs);
  urlsToSubmit = mappedUrls ?? sitemapUrls;
}

if (!urlsToSubmit.length) {
  console.log("No public URLs detected for IndexNow submission.");
  process.exit(0);
}

for (const batch of chunk(urlsToSubmit, 10_000)) {
  await submitIndexNow({
    host,
    key,
    keyLocation,
    urlList: batch
  });
}

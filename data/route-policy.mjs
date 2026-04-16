import { liveStatePages } from "./live-state-pages.mjs";

export const STATIC_PAGE_ROUTES = [
  "/",
  "/about",
  "/states",
  "/filing-basics",
  "/filing-help-options",
  "/privacy",
  "/contact",
  "/terms",
  "/operations"
];

export const ROOT_PUBLIC_FILE_PATHS = [
  "/robots.txt",
  "/sitemap.xml",
  "/style.css",
  "/script.js",
  "/social-preview.svg",
  "/BingSiteAuth.xml",
  "/035c0643075c4058a31f69be1bfebef0.txt",
  "/yandex_ee96a1c002059a3e.html"
];

export const LEGACY_GONE_ROUTES = [
  "/archive",
  "/market-risk-today",
  "/methodology",
  "/risk-history",
  "/weekly",
  "/pillar/asset-allocation-method",
  "/pillar/market-risk-framework",
  "/pillar/risk-regime-explained",
  "/tools/delaware/annual-fee-calculator",
  "/tools/pennsylvania/annual-fee-calculator",
  "/tools/washington/annual-report-deadline"
];

function trimTrailingSlash(pathname) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname || "/";
}

export function normalizeRoutePath(pathname) {
  return trimTrailingSlash(pathname || "/");
}

function buildStaticRouteVariants(route) {
  if (route === "/") {
    return ["/", "/index.html"];
  }

  return [route, `${route}/`, `${route}.html`];
}

function buildToolRouteVariants(route) {
  const normalized = normalizeRoutePath(route);
  return [normalized, `${normalized}/`, `${normalized}/index.html`];
}

function buildLegacyRouteVariants(route) {
  const normalized = normalizeRoutePath(route);
  return [normalized, `${normalized}/`, `${normalized}.html`, `${normalized}/index.html`];
}

export const LIVE_TOOL_ROUTES = liveStatePages.map((page) => new URL(page.canonicalUrl).pathname);
export const LIVE_ROUTE_PATHS = [...STATIC_PAGE_ROUTES, ...LIVE_TOOL_ROUTES];
export const PASSTHROUGH_ROUTE_PATHS = [
  ...STATIC_PAGE_ROUTES.flatMap(buildStaticRouteVariants),
  ...LIVE_TOOL_ROUTES.flatMap(buildToolRouteVariants),
  ...ROOT_PUBLIC_FILE_PATHS
];
export const LEGACY_GONE_ROUTE_PATHS = [
  ...new Set(LEGACY_GONE_ROUTES.flatMap(buildLegacyRouteVariants))
];

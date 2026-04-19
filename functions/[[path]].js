import {
  LEGACY_GONE_ROUTE_PATHS,
  PASSTHROUGH_ROUTE_PATHS
} from "../data/route-policy.mjs";
import { goneResponse } from "./_utils/gone.js";
import { notFoundResponse } from "./_utils/not-found.js";

const goneRouteSet = new Set(LEGACY_GONE_ROUTE_PATHS);
const passthroughRouteSet = new Set(PASSTHROUGH_ROUTE_PATHS);
const legacyPagesDevHost = "youtube-thumbnail-preview-tool.pages.dev";

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const { hostname, pathname, search } = url;

  if (hostname === legacyPagesDevHost || hostname.endsWith(`.${legacyPagesDevHost}`)) {
    return Response.redirect(`https://finlogichub5.com${pathname}${search}`, 301);
  }

  if (goneRouteSet.has(pathname)) {
    return goneResponse();
  }

  if (passthroughRouteSet.has(pathname)) {
    return context.next();
  }

  return notFoundResponse();
}

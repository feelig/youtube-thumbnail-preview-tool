import {
  LEGACY_GONE_ROUTE_PATHS,
  PASSTHROUGH_ROUTE_PATHS
} from "../data/route-policy.mjs";
import { goneResponse } from "./_utils/gone.js";
import { notFoundResponse } from "./_utils/not-found.js";

const goneRouteSet = new Set(LEGACY_GONE_ROUTE_PATHS);
const passthroughRouteSet = new Set(PASSTHROUGH_ROUTE_PATHS);

export async function onRequest(context) {
  const { pathname } = new URL(context.request.url);

  if (goneRouteSet.has(pathname)) {
    return goneResponse();
  }

  if (passthroughRouteSet.has(pathname)) {
    return context.next();
  }

  return notFoundResponse();
}

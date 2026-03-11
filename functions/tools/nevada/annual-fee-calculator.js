import { goneResponse } from "../../_utils/gone.js";

export function onRequest() {
  return goneResponse();
}

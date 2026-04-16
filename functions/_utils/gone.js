export function goneResponse() {
  return new Response("Gone", {
    status: 410,
    headers: {
      "content-type": "text/plain; charset=UTF-8",
      "cache-control": "public, max-age=0, must-revalidate",
      "x-robots-tag": "noindex"
    }
  });
}

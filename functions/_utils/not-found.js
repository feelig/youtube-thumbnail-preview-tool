const NOT_FOUND_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Not Found | FinLogic Hub</title>
    <meta
      name="description"
      content="This page is no longer available. Use the FinLogic Hub homepage or state directory to find the current filing guide."
    />
    <meta name="robots" content="noindex,follow" />
    <style>
      :root {
        color-scheme: light;
      }

      body {
        margin: 0;
        font-family: "Public Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: #f5f1e8;
        color: #1f2933;
      }

      main {
        max-width: 720px;
        margin: 0 auto;
        padding: 96px 24px;
      }

      .card {
        background: #ffffff;
        border: 1px solid #d8e0e8;
        border-radius: 20px;
        padding: 32px;
        box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
      }

      .eyebrow {
        margin: 0 0 12px;
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #7c5c16;
      }

      h1 {
        margin: 0 0 12px;
        font-size: clamp(2rem, 4vw, 2.75rem);
        line-height: 1.1;
      }

      p {
        margin: 0 0 16px;
        font-size: 1rem;
        line-height: 1.7;
      }

      a {
        color: #7c5c16;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <main>
      <section class="card">
        <p class="eyebrow">Page not found</p>
        <h1>This URL is not part of the current FinLogic Hub site.</h1>
        <p>
          If you were looking for a filing guide, start from the
          <a href="https://finlogichub5.com/">homepage</a> or go straight to
          <a href="https://finlogichub5.com/states">State compare</a>.
        </p>
        <p>Legacy finance URLs are intentionally retired so search engines stop treating them as live pages.</p>
      </section>
    </main>
  </body>
</html>
`;

export function notFoundResponse() {
  return new Response(NOT_FOUND_HTML, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=UTF-8",
      "cache-control": "public, max-age=0, must-revalidate",
      "x-robots-tag": "noindex"
    }
  });
}

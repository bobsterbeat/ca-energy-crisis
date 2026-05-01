#!/usr/bin/env node
// Prerender each React route to its own static HTML file.
//
// Flow:
//   1. Read routes from src/routes.js (single source of truth)
//   2. Serve dist/ on a local port (with SPA fallback for unknown paths)
//   3. Launch puppeteer; for each route:
//      a. Set window.__PRERENDER__ = true (signal to skip three.js etc.)
//      b. Navigate; wait until canonical link reflects the route
//      c. Capture page.content(); strip any dev-state blobs
//      d. Assert per-route content marker present; assert canonical points
//         at the production URL for THIS route (not the homepage)
//      e. Write to dist/<route>/index.html
//
// Failure modes (script exits non-zero):
//   - any route's content marker missing
//   - any route's canonical doesn't match expected production URL
//   - navigation timeout or puppeteer error

import { writeFileSync, mkdirSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:http";
import { routes, ORIGIN } from "../src/routes.js";

// Vercel build containers don't include libnspr4 / libnss3 / friends, so the
// Chromium that `puppeteer` bundles can't launch there. On Vercel we use
// `@sparticuz/chromium` (a Linux-serverless-tuned build with those libs
// statically linked) via `puppeteer-core`. Local dev keeps regular puppeteer
// for cross-platform convenience.
async function launchBrowser() {
  if (process.env.VERCEL) {
    const { default: puppeteerCore } = await import("puppeteer-core");
    const { default: chromium } = await import("@sparticuz/chromium");
    return puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
  const { default: puppeteer } = await import("puppeteer");
  return puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const PORT = 4321;
const NAV_TIMEOUT_MS = 30000;
const META_TIMEOUT_MS = 10000;

const CONTENT_TYPES = {
  html: "text/html; charset=utf-8",
  js: "application/javascript; charset=utf-8",
  mjs: "application/javascript; charset=utf-8",
  css: "text/css; charset=utf-8",
  json: "application/json; charset=utf-8",
  xml: "application/xml; charset=utf-8",
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  ico: "image/x-icon",
  txt: "text/plain; charset=utf-8",
  woff: "font/woff",
  woff2: "font/woff2",
};

function startServer() {
  const server = createServer(async (req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    let filePath = join(DIST, urlPath);

    try {
      const s = await stat(filePath);
      if (s.isDirectory()) filePath = join(filePath, "index.html");
    } catch {
      // Not on disk — SPA fallback to dist/index.html so React Router can route it.
      filePath = join(DIST, "index.html");
    }

    try {
      const data = await readFile(filePath);
      const ext = filePath.split(".").pop().toLowerCase();
      res.writeHead(200, { "Content-Type": CONTENT_TYPES[ext] || "application/octet-stream" });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end("404");
    }
  });

  return new Promise((res) => server.listen(PORT, () => res(server)));
}

function stripDevState(html) {
  // Defensive pass — production Vite builds shouldn't emit these, but if they
  // ever do we don't want them in the static HTML.
  return html
    .replace(/<!--\s*\$REACT_HOT_RELOAD\s*-->[\s\S]*?<!--\s*\$END\s*-->/g, "")
    .replace(/<script[^>]*data-vite-dev[^>]*>[\s\S]*?<\/script>/g, "")
    .replace(/window\.__REACT_DEVTOOLS_GLOBAL_HOOK__[^;]*;/g, "");
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    window.__PRERENDER__ = true;
  });
  // Suppress noisy console output during prerender.
  page.on("pageerror", (err) => {
    console.error(`  [pageerror ${route.path}] ${err.message}`);
  });

  const url = `http://localhost:${PORT}${route.path}`;
  const expectedCanonical = `${ORIGIN}${route.path === "/" ? "/" : route.path}`;

  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: NAV_TIMEOUT_MS });

    // Wait for our App.jsx useEffect to run and update the canonical to the
    // route-specific URL. This is the universal "route is rendered" signal.
    await page.waitForFunction(
      (want) => {
        const el = document.querySelector('link[rel="canonical"]');
        return el && el.href === want;
      },
      { timeout: META_TIMEOUT_MS },
      expectedCanonical
    );

    const html = stripDevState(await page.content());

    // Assert content marker (route-specific text from src/routes.js).
    if (route.prerender?.marker && !html.includes(route.prerender.marker)) {
      throw new Error(`marker "${route.prerender.marker}" not found`);
    }
    // Assert canonical (belt + suspenders — waitForFunction already checked).
    if (!html.includes(`href="${expectedCanonical}"`)) {
      throw new Error(`canonical "${expectedCanonical}" not in captured HTML`);
    }
    // Assert the homepage canonical didn't leak into a non-home route.
    const homeCanonical = `${ORIGIN}/`;
    if (route.path !== "/" && html.includes(`<link rel="canonical" href="${homeCanonical}"`)) {
      throw new Error(`homepage canonical leaked into ${route.path}`);
    }

    const outDir = route.path === "/" ? DIST : join(DIST, route.path);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, "index.html"), html);

    console.log(`  ✓ ${route.path.padEnd(20)} → dist${route.path === "/" ? "/index.html" : route.path + "/index.html"}`);
    return true;
  } catch (e) {
    console.error(`  ✗ ${route.path.padEnd(20)} ${e.message}`);
    return false;
  } finally {
    await page.close();
  }
}

async function main() {
  console.log(`▶ Prerendering ${routes.length} routes…`);
  const server = await startServer();
  console.log(`  static server: http://localhost:${PORT}`);

  const browser = await launchBrowser();

  let failed = 0;
  for (const r of routes) {
    const ok = await prerenderRoute(browser, r);
    if (!ok) failed++;
  }

  await browser.close();
  server.close();

  if (failed > 0) {
    console.error(`\n✗ Prerender failed for ${failed}/${routes.length} route(s).`);
    process.exit(1);
  }
  console.log(`\n✓ Prerendered ${routes.length} routes successfully.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

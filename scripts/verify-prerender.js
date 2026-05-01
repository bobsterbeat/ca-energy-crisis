#!/usr/bin/env node
// Spot-check verification: pick 3 random prerendered routes plus / and
// /healthcare (always), confirm each has a unique <title>, a canonical that
// matches the route's expected production URL, and a route-specific content
// marker. Cheap, prevents silent regression.

import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { routes, ORIGIN } from "../src/routes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");

function pickSample(all, n) {
  const pool = [...all];
  const out = [];
  while (out.length < n && pool.length) {
    out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  }
  return out;
}

async function check(route) {
  const file = route.path === "/" ? join(DIST, "index.html") : join(DIST, route.path, "index.html");
  let html;
  try {
    html = await readFile(file, "utf-8");
  } catch {
    return { route: route.path, ok: false, reason: `file missing: ${file}` };
  }

  const expectedCanonical = `${ORIGIN}${route.path === "/" ? "/" : route.path}`;
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);

  // page.content() serializes &/</> as HTML entities — unescape before comparing.
  const decode = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  if (!titleMatch || decode(titleMatch[1].trim()) !== route.title) {
    return { route: route.path, ok: false, reason: `title mismatch (got: ${titleMatch?.[1]?.slice(0, 80) || "—"})` };
  }
  if (!canonicalMatch || canonicalMatch[1] !== expectedCanonical) {
    return { route: route.path, ok: false, reason: `canonical mismatch (got: ${canonicalMatch?.[1] || "—"})` };
  }
  if (route.prerender?.marker && !html.includes(route.prerender.marker)) {
    return { route: route.path, ok: false, reason: `marker "${route.prerender.marker}" missing` };
  }
  return { route: route.path, ok: true, title: titleMatch[1].slice(0, 60) + "…" };
}

async function main() {
  // Always verify / and /healthcare (per spec); plus 3 random others.
  const required = routes.filter((r) => r.path === "/" || r.path === "/healthcare");
  const others = routes.filter((r) => r.path !== "/" && r.path !== "/healthcare");
  const sample = [...required, ...pickSample(others, 3)];

  console.log(`▶ Verifying ${sample.length} prerendered routes…`);

  let failed = 0;
  for (const r of sample) {
    const result = await check(r);
    if (result.ok) {
      console.log(`  ✓ ${r.path.padEnd(20)} ${result.title}`);
    } else {
      console.error(`  ✗ ${r.path.padEnd(20)} ${result.reason}`);
      failed++;
    }
  }

  // Cross-route check: distinct titles + canonicals across all sampled routes
  const titles = new Set();
  const canonicals = new Set();
  for (const r of sample) {
    titles.add(r.title);
    canonicals.add(`${ORIGIN}${r.path === "/" ? "/" : r.path}`);
  }
  if (titles.size !== sample.length) {
    console.error(`  ✗ duplicate titles across sampled routes`);
    failed++;
  }
  if (canonicals.size !== sample.length) {
    console.error(`  ✗ duplicate canonicals across sampled routes`);
    failed++;
  }

  if (failed > 0) {
    console.error(`\n✗ Verify failed (${failed} issue${failed === 1 ? "" : "s"}).`);
    process.exit(1);
  }
  console.log(`\n✓ Verified ${sample.length} routes — all unique title + canonical + marker.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

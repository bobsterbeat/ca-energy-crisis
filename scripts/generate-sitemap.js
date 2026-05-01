#!/usr/bin/env node
// Regenerate public/sitemap.xml from src/routes.js (single source of truth)
// + staticPages. Stamps today's date as <lastmod> on every URL.

import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { routes, staticPages, ORIGIN } from "../src/routes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const today = new Date().toISOString().slice(0, 10);

const entry = (loc, lastmod, changefreq, priority) =>
  `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;

const all = [
  ...routes.map((r) => entry(`${ORIGIN}${r.path === "/" ? "/" : r.path}`, today, r.sitemap.changefreq, r.sitemap.priority)),
  ...staticPages.map((s) => entry(`${ORIGIN}${s.path}`, today, s.sitemap.changefreq, s.sitemap.priority)),
].join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all}
</urlset>
`;

const outPath = resolve(__dirname, "..", "public", "sitemap.xml");
writeFileSync(outPath, xml);
console.log(`✓ sitemap.xml regenerated (${routes.length + staticPages.length} URLs, lastmod ${today})`);

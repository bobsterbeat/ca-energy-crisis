#!/usr/bin/env node
// Regenerates public/sitemap.xml on every build with today's date.
// Until real routes (Option B) ship, sections are hash anchors on the homepage —
// listing them gives Google topical signal even though they all resolve to /.

import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ORIGIN = "https://ca-policy.com";
const today = new Date().toISOString().slice(0, 10);

const homepage = { path: "/", changefreq: "weekly", priority: "1.0" };

// Section anchors. Slug matches the React app's setPage() ids and the
// SEO-only block links in index.html. Order roughly mirrors site flow.
const sections = [
  ["gas",            "monthly", "0.9"],
  ["elec",           "monthly", "0.9"],
  ["water",          "monthly", "0.8"],
  ["globe",          "monthly", "0.7"],
  ["col",            "monthly", "0.9"],
  ["housing",        "monthly", "0.9"],
  ["insurance",      "monthly", "0.8"],
  ["biz",            "monthly", "0.8"],
  ["fastfood",       "monthly", "0.9"],
  ["healthcarewage", "monthly", "0.9"],
  ["homeless",       "monthly", "0.8"],
  ["rail",           "monthly", "0.8"],
  ["edu",            "monthly", "0.8"],
  ["crime",          "monthly", "0.8"],
  ["infra",          "monthly", "0.8"],
  ["roadcharge",     "monthly", "0.9"],
  ["ceqa",           "monthly", "0.8"],
  ["politics",       "monthly", "0.8"],
  ["stategov",       "monthly", "0.8"],
  ["fraud",          "monthly", "0.8"],
  ["unions",         "monthly", "0.8"],
  ["gerrymandering", "monthly", "0.9"],
  ["wildfires",      "monthly", "0.9"],
  ["healthcare",     "monthly", "0.8"],
  ["immigration",    "monthly", "0.8"],
  ["exodus",         "monthly", "0.8"],
  ["conclusion",     "monthly", "0.8"],
];

const entry = (loc, lastmod, changefreq, priority) =>
  `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;

const urls = [
  entry(`${ORIGIN}/`, today, homepage.changefreq, homepage.priority),
  ...sections.map(([slug, cf, pr]) => entry(`${ORIGIN}/${slug}`, today, cf, pr)),
].join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outPath = resolve(__dirname, "..", "public", "sitemap.xml");
writeFileSync(outPath, xml);
console.log(`✓ sitemap.xml regenerated (${sections.length + 1} URLs, lastmod ${today})`);

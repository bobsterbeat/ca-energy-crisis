// Pulls current US/CA/TX retail gasoline (weekly) and residential electricity
// (monthly) prices from the U.S. Energy Information Administration (EIA) v2 API
// and rewrites src/data/prices.json. Run by .github/workflows/update-prices.yml.
//
// Required env: EIA_API_KEY  (free key at https://www.eia.gov/opendata/register.php)

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const API_KEY = process.env.EIA_API_KEY;
if (!API_KEY) {
  console.error("EIA_API_KEY environment variable is not set.");
  process.exit(1);
}

const BASE = "https://api.eia.gov/v2";

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

// Weekly retail regular gasoline, $/gal.
// duoarea: NUS=US, SCA=California, STX=Texas
// product EPMR = regular gasoline; process PTE = retail price
async function fetchGasoline(area) {
  const url =
    `${BASE}/petroleum/pri/gnd/data/?api_key=${API_KEY}` +
    `&frequency=weekly&data[0]=value` +
    `&facets[duoarea][]=${area}&facets[product][]=EPMR&facets[process][]=PTE` +
    `&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=1`;
  const json = await getJson(url);
  const row = json?.response?.data?.[0];
  if (!row || row.value == null) throw new Error(`No gasoline data for ${area}`);
  return { value: parseFloat(row.value), period: row.period };
}

// Monthly residential retail electricity, cents/kWh.
// stateid: US, CA, TX (state two-letter except US which is the rollup)
// sectorid RES = residential
async function fetchElectricity(state) {
  const url =
    `${BASE}/electricity/retail-sales/data/?api_key=${API_KEY}` +
    `&frequency=monthly&data[0]=price` +
    `&facets[stateid][]=${state}&facets[sectorid][]=RES` +
    `&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=1`;
  const json = await getJson(url);
  const row = json?.response?.data?.[0];
  if (!row || row.price == null) throw new Error(`No electricity data for ${state}`);
  return { value: parseFloat(row.price), period: row.period };
}

const path = resolve("src/data/prices.json");
const existing = JSON.parse(readFileSync(path, "utf8"));

console.log("Fetching gasoline prices …");
const [gCA, gUS, gTX] = await Promise.all([
  fetchGasoline("SCA"),
  fetchGasoline("NUS"),
  fetchGasoline("STX"),
]);

console.log("Fetching electricity rates …");
const [eCA, eUS, eTX] = await Promise.all([
  fetchElectricity("CA"),
  fetchElectricity("US"),
  fetchElectricity("TX"),
]);

const today = new Date().toISOString().slice(0, 10);

// Format the asOf labels off the EIA period (e.g. "2026-04-13" → "April 2026")
function periodLabel(period) {
  // EIA gas weekly periods are ISO date strings; electricity monthly are "YYYY-MM"
  const d = period.length === 7 ? new Date(period + "-01") : new Date(period);
  return d.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

const updated = {
  ...existing,
  lastUpdated: today,
  source: "U.S. Energy Information Administration (EIA)",
  gasoline: {
    ca: Math.round(gCA.value * 100) / 100,
    us: Math.round(gUS.value * 100) / 100,
    tx: Math.round(gTX.value * 100) / 100,
    asOf: periodLabel(gUS.period),
    period: gUS.period,
  },
  electricity: {
    ca: Math.round(eCA.value * 10) / 10,
    us: Math.round(eUS.value * 10) / 10,
    tx: Math.round(eTX.value * 10) / 10,
    asOf: periodLabel(eUS.period),
    period: eUS.period,
  },
};

writeFileSync(path, JSON.stringify(updated, null, 2) + "\n");
console.log("Updated", path);
console.log(JSON.stringify(updated, null, 2));

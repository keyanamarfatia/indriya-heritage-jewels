// Live, indicative gold price in rupees, from free public sources (no API key).
//
// Primary:  Gold API (international spot, USD per troy ounce) × ExchangeRate-API (USD → INR).
// Fallback: fawazahmed0 currency API, which publishes XAU → INR directly (updated daily).
//
// This is the international market price converted to rupees. It does NOT include Indian
// import duty, GST or making charges, so it is lower than a jeweller's store rate.

const GRAMS_PER_TROY_OUNCE = 31.1034768;

export type LiveGold = {
  perGram24k: number;
  perGram22k: number;
  /** When the source last updated its price. */
  asOf: Date;
  source: "spot" | "daily";
};

const toLive = (inrPerOunce: number, asOf: Date, source: LiveGold["source"]): LiveGold | null => {
  const perGram24k = inrPerOunce / GRAMS_PER_TROY_OUNCE;
  // Sanity check: reject anything clearly broken rather than show a wrong number.
  if (!Number.isFinite(perGram24k) || perGram24k < 2000 || perGram24k > 60000) return null;
  return { perGram24k, perGram22k: (perGram24k * 22) / 24, asOf, source };
};

async function getJson(url: string, signal: AbortSignal): Promise<unknown> {
  const res = await fetch(url, { signal, cache: "no-store" });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.json();
}

const num = (v: unknown) => (typeof v === "number" ? v : Number.NaN);

async function fromSpot(signal: AbortSignal): Promise<LiveGold | null> {
  const [gold, fx] = (await Promise.all([
    getJson("https://api.gold-api.com/price/XAU", signal),
    getJson("https://open.er-api.com/v6/latest/USD", signal),
  ])) as [Record<string, unknown>, Record<string, unknown>];
  const usdPerOunce = num(gold["price"]);
  const rates = (fx["rates"] ?? {}) as Record<string, unknown>;
  const inrPerUsd = num(rates["INR"]);
  const updated = typeof gold["updatedAt"] === "string" ? new Date(gold["updatedAt"]) : new Date();
  return toLive(
    usdPerOunce * inrPerUsd,
    Number.isNaN(updated.getTime()) ? new Date() : updated,
    "spot",
  );
}

async function fromDaily(signal: AbortSignal): Promise<LiveGold | null> {
  const urls = [
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/xau.json",
    "https://latest.currency-api.pages.dev/v1/currencies/xau.json",
  ];
  for (const url of urls) {
    try {
      const data = (await getJson(url, signal)) as Record<string, unknown>;
      const xau = (data["xau"] ?? {}) as Record<string, unknown>;
      const date =
        typeof data["date"] === "string" ? new Date(`${data["date"]}T00:00:00Z`) : new Date();
      const live = toLive(num(xau["inr"]), date, "daily");
      if (live) return live;
    } catch {
      // try the next mirror
    }
  }
  return null;
}

let cache: { at: number; value: LiveGold } | null = null;
const CACHE_MS = 10 * 60 * 1000;

/** Fetch the live rate, trying the spot source first and the daily source as a fallback. */
export async function fetchLiveGold(): Promise<LiveGold | null> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.value;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    let value: LiveGold | null = null;
    try {
      value = await fromSpot(controller.signal);
    } catch {
      value = null;
    }
    value ??= await fromDaily(controller.signal);
    if (value) cache = { at: Date.now(), value };
    return value;
  } finally {
    clearTimeout(timer);
  }
}

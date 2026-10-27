// Figures computed from the site's own data (indriya.com listings and store ratings), shared by
// the homepage passages so every number stays in sync when prices are updated.

import { PRODUCTS, formatINR, type Product } from "@/lib/products";
import { STORES } from "@/lib/stores";

export type Priced = Product & { listing: NonNullable<Product["listing"]> };
export const priced = PRODUCTS.filter((p): p is Priced => !!p.listing);
export const byType = (t: Product["type"]) => priced.filter((p) => p.type === t);

export function rangeOf(list: Priced[]) {
  const byPrice = [...list].sort((a, b) => a.listing.price - b.listing.price);
  const lo = byPrice[0]!;
  const hi = byPrice[byPrice.length - 1]!;
  const weights = list.map((p) => p.listing.grossWeightG);
  return {
    count: list.length,
    lo,
    hi,
    minW: Math.min(...weights),
    maxW: Math.max(...weights),
  };
}

export const necklaces = rangeOf(byType("necklace"));
export const earrings = rangeOf(byType("earrings"));
export const all = rangeOf(priced);
export const perGram = priced.map((p) => p.listing.price / p.listing.grossWeightG);
export const avgPerGram =
  priced.reduce((n, p) => n + p.listing.price, 0) /
  priced.reduce((n, p) => n + p.listing.grossWeightG, 0);

export const totalReviews = STORES.reduce((n, s) => n + s.reviews, 0);
export const avgRating = STORES.reduce((n, s) => n + s.rating * s.reviews, 0) / totalReviews;
export const mostReviewed = [...STORES].sort((a, b) => b.reviews - a.reviews)[0]!;
export const topRated = [...STORES].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
export const bridalStores = STORES.filter((s) => s.services.includes("Bridal Studio"));

export const necklaceCount = PRODUCTS.filter((p) => p.type === "necklace").length;
export const earringCount = PRODUCTS.filter((p) => p.type === "earrings").length;

export const g = (n: number) => `${Number(n.toFixed(2))} g`;
export const rupee = (n: number) => formatINR(Math.round(n));
export const shortName = (name: string) => name.replace(/, Mumbai$/, "");
export const listJoin = (xs: string[]) =>
  xs.length < 2 ? (xs[0] ?? "") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`;

/** Pieces whose names honour a Hindu deity (Ganesha/Vinayaka, Lakshmi, Vishnu, Garuda). */
export const deityNamed = PRODUCTS.filter((p) =>
  /Ganesha|Vinayaka|Lakshmi|Vishnu|Garuda/.test(p.name),
);
export const lightestEarrings = [...byType("earrings")].sort(
  (a, b) => a.listing.grossWeightG - b.listing.grossWeightG,
)[0];

/** Whole-number percentage, e.g. pct(8, 12) → "67%". */
export const pct = (part: number, whole: number) => `${Math.round((part / whole) * 100)}%`;
export const mostReviewedShare = pct(mostReviewed.reviews, totalReviews);
export const storesAtLeast48 = STORES.filter((s) => s.rating >= 4.8).length;
export const priceSpread = Math.round(all.hi.listing.price / all.lo.listing.price);

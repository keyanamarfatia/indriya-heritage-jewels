import { absoluteUrl } from "@/lib/site";
// Pieces from Indriya's Anantara bridal temple jewellery collection.
// Names are Indriya's own; photos are © Indriya / Aditya Birla Group, used for academic purposes.
import heirloomGaneshaNecklace from "@/assets/anantara/heirloom-ganesha-necklace.webp";
import lakshmiGraceNecklace from "@/assets/anantara/lakshmi-grace-necklace.webp";
import swarnGajikaEarrings from "@/assets/anantara/swarn-gajika-earrings.webp";
import lakshmiBottuMala from "@/assets/anantara/lakshmi-bottu-mala.webp";
import haripriyaEarrings from "@/assets/anantara/haripriya-earrings.webp";
import udayaNecklace from "@/assets/anantara/udaya-necklace.webp";
import vinayakaEarrings from "@/assets/anantara/vinayaka-earrings.webp";
import heirloomGaneshaEarrings from "@/assets/anantara/heirloom-ganesha-earrings.webp";
import vinayakaNecklace from "@/assets/anantara/vinayaka-necklace.webp";
import vishnuHaar from "@/assets/anantara/vishnu-haar.webp";
import garudaHaar from "@/assets/anantara/garuda-haar.webp";
import udayaEarrings from "@/assets/anantara/udaya-earrings.webp";

export const ANANTARA_URL =
  "https://www.indriya.com/anantara/anantara-collection?collection_name=936";

// Small (≈320px) versions for product grids. Matched by source path, so it also works
// after Vite adds content hashes to file names in production.
const ALL_IMAGES = import.meta.glob("@/assets/anantara/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const THUMB_BY_FULL: Record<string, string> = {};
for (const [path, url] of Object.entries(ALL_IMAGES)) {
  const thumb = ALL_IMAGES[path.replace(/\.webp$/, "-300.webp")];
  if (thumb) THUMB_BY_FULL[url] = thumb;
}

/** srcset for product cards: a 320px thumb for phones and grids, the full image for larger screens. */
export const productSrcSet = (p: { image: string }, fullWidth = 584) => {
  const thumb = THUMB_BY_FULL[p.image];
  return thumb ? `${thumb} 400w, ${p.image} ${fullWidth}w` : undefined;
};

export type ProductType = "necklace" | "earrings";

export type Product = {
  slug: string;
  name: string;
  type: ProductType;
  image: string;
  alt: string;
  description: string;
  /** Where "View on Indriya" goes: the exact product page when known, else the Anantara collection. */
  indriyaUrl: string;
  /** Price and details as listed on indriya.com on PRICES_AS_OF. Prices move with the gold rate. */
  listing?: { price: number; grossWeightG: number; sku: string; size?: string };
};

/** The day the listed prices were copied from indriya.com. Update with the prices. */
export const PRICES_AS_OF = "2026-10-27";

export const pricesAsOfLabel = new Date(PRICES_AS_OF).toLocaleDateString("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** ₹8,61,544 (Indian digit grouping). */
export const formatINR = (n: number) =>
  `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

/**
 * Offer + details for Product schema. Prices are indriya.com's approximate prices excluding taxes,
 * shown on the page beside the same date so the schema matches what visitors see.
 */
const productUrl = (p: Product) => absoluteUrl(`/jewellery/${p.slug}`);
export const productId = (p: Product) => `${productUrl(p)}#product`;
const offerId = (p: Product) => `${productUrl(p)}#offer`;

const offerBody = (p: Product, price: number) => ({
  "@type": "Offer",
  "@id": offerId(p),
  url: p.indriyaUrl,
  price: price.toFixed(2),
  priceCurrency: "INR",
  priceSpecification: {
    "@type": "UnitPriceSpecification",
    price: price.toFixed(2),
    priceCurrency: "INR",
    valueAddedTaxIncluded: false,
  },
  seller: { "@type": "Organization", name: "Indriya" },
});

/**
 * Offer + details for Product schema. Prices are indriya.com's approximate prices excluding taxes,
 * shown on the page beside the same date so the schema matches what visitors see.
 */
export const productOfferLd = (p: Product) =>
  p.listing
    ? {
        sku: p.listing.sku,
        weight: { "@type": "QuantitativeValue", value: p.listing.grossWeightG, unitCode: "GRM" },
        offers: offerBody(p, p.listing.price),
      }
    : {};

/** A complete top-level Product (with its offer), linked by @id. */
export const productLd = (p: Product) => ({
  "@type": "Product",
  "@id": productId(p),
  name: p.name,
  description: p.description,
  image: absoluteUrl(p.image),
  url: productUrl(p),
  sameAs: p.indriyaUrl,
  brand: { "@type": "Brand", name: "Indriya" },
  material: "22 karat BIS Hallmark gold",
  category: "Temple jewellery",
  ...productOfferLd(p),
});

/** The same offer as its own top-level node, pointing back to its product by @id. */
export const offerLd = (p: Product) =>
  p.listing
    ? { ...offerBody(p, p.listing.price), itemOffered: { "@id": productId(p) } }
    : undefined;

/** Matching piece that completes a set, where Anantara has one. */
export const PAIRS: Record<string, string> = {
  "heirloom-ganesha-gold-bridal-necklace": "heirloom-ganesha-gold-bridal-drop-earrings",
  "heirloom-ganesha-gold-bridal-drop-earrings": "heirloom-ganesha-gold-bridal-necklace",
  "udaya-gold-bridal-necklace": "udaya-gold-bridal-drop-earrings",
  "udaya-gold-bridal-drop-earrings": "udaya-gold-bridal-necklace",
  "vinayaka-gold-bridal-necklace": "vinayaka-gold-bridal-drop-earrings",
  "vinayaka-gold-bridal-drop-earrings": "vinayaka-gold-bridal-necklace",
};

export const productPath = (p: Product) => `/jewellery/${p.slug}`;

export const findProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

/** Pieces to suggest on a product page: its set partner first, then others of the opposite type. */
export const relatedTo = (p: Product, n = 4): Product[] => {
  const pair = PAIRS[p.slug];
  const first = pair ? PRODUCTS.filter((x) => x.slug === pair) : [];
  const rest = PRODUCTS.filter((x) => x.slug !== p.slug && x.slug !== pair).sort(
    (a, b) => Number(a.type === p.type) - Number(b.type === p.type),
  );
  return [...first, ...rest].slice(0, n);
};

export const PRODUCTS: Product[] = [
  {
    slug: "heirloom-ganesha-gold-bridal-necklace",
    name: "Heirloom Ganesha Gold Bridal Necklace",
    type: "necklace",
    image: heirloomGaneshaNecklace,
    alt: "Heirloom Ganesha 22 karat gold bridal necklace with a Lord Ganesha pendant, ruby drops and pearls",
    description:
      "A sculpted 22 karat gold necklace with a Ganesha pendant, ruby drops and a pearl fringe.",
    indriyaUrl:
      "https://www.indriya.com/jewellery-products/heirloom-ganesha-gold-bridal-necklace-jtyya20-dina886",
    listing: { price: 861544, grossWeightG: 56.09, sku: "JTYYA20-DINA886" },
  },
  {
    slug: "lakshmi-grace-gold-bridal-necklace",
    name: "Lakshmi Grace Gold Bridal Necklace",
    type: "necklace",
    image: lakshmiGraceNecklace,
    alt: "Lakshmi Grace gold bridal necklace with pearl and green bead strands and a Goddess Lakshmi pendant",
    description: "Pearl and green bead strands meeting at a Goddess Lakshmi pendant in gold.",
    indriyaUrl:
      "https://www.indriya.com/jewellery-products/lakshmi-grace-gold-bridal-necklace-jtlya20-dina885",
    listing: { price: 1338967, grossWeightG: 125.4, sku: "JTLYA20-DINA885", size: "61 cm" },
  },
  {
    slug: "swarn-gajika-gold-bridal-drop-earrings",
    name: "Swarn Gajika Gold Bridal Drop Earrings",
    type: "earrings",
    image: swarnGajikaEarrings,
    alt: "Swarn Gajika gold temple jhumkas with deity studs, pearl drops and green stones",
    description: "Temple jhumkas with Ganesha motifs, a pearl fringe and green drops.",
    indriyaUrl:
      "https://www.indriya.com/jewellery-products/swarn-gajika-gold-bridal-drop-earrings-jtyyb20-diea885",
    listing: { price: 312801, grossWeightG: 21.2, sku: "JTYYB20-DIEA885" },
  },
  {
    slug: "lakshmi-bottu-mala-gold-long-necklace",
    name: "Lakshmi Bottu Mala Gold Long Necklace",
    type: "necklace",
    image: lakshmiBottuMala,
    alt: "Lakshmi Bottu Mala long gold temple necklace with coin motifs, green drops and a Lakshmi pendant",
    description: "A long temple mala of Lakshmi coin motifs, finished with green drops.",
    indriyaUrl:
      "https://www.indriya.com/jewellery-products/lakshmi-bottu-mala-gold-long-necklace-jtiya20-dina849",
    listing: { price: 4667771, grossWeightG: 336.6, sku: "JTIYA20-DINA849", size: "48.3 cm" },
  },
  {
    slug: "haripriya-gold-drop-earrings",
    name: "Haripriya Gold Drop Earrings",
    type: "earrings",
    image: haripriyaEarrings,
    alt: "Haripriya long gold temple drop earrings with tiered jhumkas and ruby accents",
    description: "Long tiered temple drops ending in miniature jhumkas.",
    indriyaUrl: ANANTARA_URL,
  },
  {
    slug: "udaya-gold-bridal-necklace",
    name: "Udaya Gold Bridal Necklace",
    type: "necklace",
    image: udayaNecklace,
    alt: "Udaya long gold bridal necklace with sculpted crescent motifs and red stones",
    description: "A long haram of sculpted crescent motifs set with red stones.",
    indriyaUrl: ANANTARA_URL,
    listing: { price: 1334065, grossWeightG: 94.103, sku: "JTKYA20-DINA884", size: "55.9 cm" },
  },
  {
    slug: "vinayaka-gold-bridal-drop-earrings",
    name: "Vinayaka Gold Bridal Drop Earrings",
    type: "earrings",
    image: vinayakaEarrings,
    alt: "Vinayaka gold chandbali drop earrings with a deity motif, pearls and green stones",
    description: "Chandbali-style drops with a deity motif, pearls and green stones.",
    indriyaUrl: ANANTARA_URL,
    listing: { price: 298653, grossWeightG: 22.737, sku: "JTYYB20-DIEA883" },
  },
  {
    slug: "heirloom-ganesha-gold-bridal-drop-earrings",
    name: "Heirloom Ganesha Gold Bridal Drop Earrings",
    type: "earrings",
    image: heirloomGaneshaEarrings,
    alt: "Heirloom Ganesha gold temple jhumkas with ruby-set round studs, pearls and ruby drops",
    description: "Round ruby-set studs over temple jhumkas, pearls and ruby drops.",
    indriyaUrl: ANANTARA_URL,
    listing: { price: 220827, grossWeightG: 15.839, sku: "JTYYB20-DIEA886" },
  },
  {
    slug: "vinayaka-gold-bridal-necklace",
    name: "Vinayaka Gold Bridal Necklace",
    type: "necklace",
    image: vinayakaNecklace,
    alt: "Vinayaka gold bridal necklace with green bead strands and a cluster of temple jhumka drops",
    description: "Green bead strands carrying a cluster of temple jhumka drops.",
    indriyaUrl: ANANTARA_URL,
    listing: { price: 1710340, grossWeightG: 159.2, sku: "JTLYA20-DINA883", size: "61 cm" },
  },
  {
    slug: "vishnu-haar-gold-short-necklace",
    name: "Vishnu Haar Gold Short Necklace",
    type: "necklace",
    image: vishnuHaar,
    alt: "Vishnu Haar short gold necklace with red stone links and a deity pendant with pearl drops",
    description: "Red stone links leading to a deity pendant with a pearl fringe.",
    indriyaUrl: ANANTARA_URL,
    listing: { price: 1139690, grossWeightG: 78.95, sku: "JTIYA20-DINA848", size: "30.5 cm" },
  },
  {
    slug: "garuda-haar-gold-short-necklace",
    name: "Garuda Haar Gold Short Necklace",
    type: "necklace",
    image: garudaHaar,
    alt: "Garuda Haar gold short necklace with twin Garuda heads, ruby setting and ruby drops",
    description: "A collar of twin Garuda heads set with rubies and drops.",
    indriyaUrl: ANANTARA_URL,
    listing: { price: 3429544, grossWeightG: 259.813, sku: "JTYYA20-DINA847", size: "Free size" },
  },
  {
    slug: "udaya-gold-bridal-drop-earrings",
    name: "Udaya Gold Bridal Drop Earrings",
    type: "earrings",
    image: udayaEarrings,
    alt: "Udaya gold bridal drop earrings with coral flower studs and crescent coin motifs",
    description: "Coral flower studs above crescent coin drops.",
    indriyaUrl: ANANTARA_URL,
    listing: { price: 195327, grossWeightG: 13.492, sku: "JTYYB20-DIEA884" },
  },
];

export const productBySlug = (slug: string): Product => {
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown product: ${slug}`);
  return p;
};

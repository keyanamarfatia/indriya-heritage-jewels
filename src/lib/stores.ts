// Indriya's Mumbai stores, as listed on indriya.com/jewellery-stores/mumbai (October 2026).
// Photos are from each store's "Store at a Glance" gallery on indriya.com,
// © Indriya / Aditya Birla Group, used for academic purposes.
import { OFFICIAL_URL } from "@/lib/site";
import andheri1 from "@/assets/stores/andheri-w-mumbai-1.webp";
import andheri2 from "@/assets/stores/andheri-w-mumbai-2.webp";
import andheri3 from "@/assets/stores/andheri-w-mumbai-3.webp";
import borivali1 from "@/assets/stores/borivali-w-mumbai-1.webp";
import borivali2 from "@/assets/stores/borivali-w-mumbai-2.webp";
import borivali3 from "@/assets/stores/borivali-w-mumbai-3.webp";
import nexus1 from "@/assets/stores/nexus-seawoods-mall-mumbai-1.webp";
import nexus2 from "@/assets/stores/nexus-seawoods-mall-mumbai-2.webp";
import nexus3 from "@/assets/stores/nexus-seawoods-mall-mumbai-3.webp";
import phoenix1 from "@/assets/stores/phoenix-marketcity-kurla-1.webp";
import phoenix2 from "@/assets/stores/phoenix-marketcity-kurla-2.webp";
import phoenix3 from "@/assets/stores/phoenix-marketcity-kurla-3.webp";
import rcity1 from "@/assets/stores/r-city-mall-mumbai-1.webp";
import rcity2 from "@/assets/stores/r-city-mall-mumbai-2.webp";
import rcity3 from "@/assets/stores/r-city-mall-mumbai-3.webp";
import sky1 from "@/assets/stores/sky-city-mall-mumbai-1.webp";
import sky2 from "@/assets/stores/sky-city-mall-mumbai-2.webp";
import sky3 from "@/assets/stores/sky-city-mall-mumbai-3.webp";

export const STORES_URL = `${OFFICIAL_URL}jewellery-stores`;

export type StorePhoto = { src: string; alt: string };

export type Store = {
  slug: string;
  name: string;
  area: string;
  /** Short line for the card, e.g. "Inside R City Mall". */
  landmark: string;
  address: string;
  hours: string;
  phone: string;
  rating: number;
  reviews: number;
  services: string[];
  languages?: string[];
  flagship?: boolean;
  /** Index into gallery used as the card cover. */
  cover: number;
  gallery: StorePhoto[];
};

const W = 710;
const H = 543;
export const STORE_PHOTO_SIZE = { width: W, height: H };

export const STORES: Store[] = [
  {
    slug: "borivali-w-mumbai",
    name: "Borivali (W), Mumbai",
    area: "Borivali West",
    landmark: "Opposite Ajanta Talkies",
    address:
      "Ground & 1st Floor, Solitaire Business Centre, Opp. Ajanta Talkies, Gulmohar Rd, Market Road, Borivali West, Mumbai, Maharashtra - 400092",
    hours: "11:00 AM – 9:00 PM",
    phone: "08037837978",
    rating: 4.8,
    reviews: 1846,
    services: ["In-house stylist", "Bridal Studio", "Design Customization"],
    flagship: true,
    cover: 1,
    gallery: [
      {
        src: borivali1,
        alt: "Blue deer sculpture beneath the sculpted gold ceiling of the Indriya Borivali store",
      },
      {
        src: borivali2,
        alt: "Facade of the Indriya flagship store in Borivali West with the deer logo and floral window display",
      },
      {
        src: borivali3,
        alt: "Bridal room at Indriya Borivali with a red lehenga and necklace displays before a gold lattice wall",
      },
    ],
  },
  {
    slug: "andheri-w-mumbai",
    name: "Andheri (W), Mumbai",
    area: "Andheri West",
    landmark: "New Link Road, Oshiwara",
    address:
      "Esquina Private Residences, New Link Road, Oshiwara, Andheri West, Mumbai, Maharashtra - 400102",
    hours: "11:00 AM – 9:00 PM",
    phone: "08071500067",
    rating: 4.8,
    reviews: 270,
    services: ["In-house stylist", "Bridal Studio", "Design Customization"],
    cover: 1,
    gallery: [
      {
        src: andheri1,
        alt: "Blue deer sculpture in the peach-toned interior of Indriya Andheri West",
      },
      {
        src: andheri2,
        alt: "Arched gold display cabinets and a glass jewellery counter at Indriya Andheri West",
      },
      {
        src: andheri3,
        alt: "Bridal lehenga and necklace display behind a carved gold screen at Indriya Andheri West",
      },
    ],
  },
  {
    slug: "r-city-mall-mumbai",
    name: "R City Mall, Mumbai",
    area: "Ghatkopar West",
    landmark: "Inside R City Mall",
    address: "R City, LBS Marg, Amrut Nagar, Ghatkopar West, Mumbai, Maharashtra - 400086",
    hours: "11:00 AM – 9:30 PM",
    phone: "08037241114",
    rating: 4.8,
    reviews: 946,
    services: ["In-house stylist", "Design Customization"],
    cover: 0,
    gallery: [
      {
        src: rcity1,
        alt: "Blue deer sculpture on a round podium with white flowers at Indriya R City Mall",
      },
      { src: rcity2, alt: "Seating at the jewellery counters inside Indriya R City Mall" },
      {
        src: rcity3,
        alt: "Display walls and counters across the Indriya store at R City Mall, Ghatkopar",
      },
    ],
  },
  {
    slug: "sky-city-mall-mumbai",
    name: "Sky City Mall, Mumbai",
    area: "Borivali East",
    landmark: "Western Express Highway",
    address:
      "1st Floor, F-40, Sky City Mall, Western Express Highway, Borivali East, Mumbai, Maharashtra - 400066",
    hours: "11:00 AM – 11:00 PM",
    phone: "08071500068",
    rating: 4.9,
    reviews: 527,
    services: ["In-house stylist", "Design Customization"],
    cover: 1,
    gallery: [
      {
        src: sky1,
        alt: "Jewellery counters and seating under a gold ceiling at Indriya Sky City Mall",
      },
      { src: sky2, alt: "Blue deer sculpture beside lit display shelves at Indriya Sky City Mall" },
      {
        src: sky3,
        alt: "Bridal display with a red lehenga and necklace stands at Indriya Sky City Mall",
      },
    ],
  },
  {
    slug: "nexus-seawoods-mall-mumbai",
    name: "Nexus Seawoods Mall",
    area: "Seawoods, Navi Mumbai",
    landmark: "Upper Ground Floor",
    address:
      "Upper Ground Floor-3, Nexus Seawoods Mall, Sector 40, Nerul East, Navi Mumbai, Seawoods, Maharashtra - 400706",
    hours: "11:00 AM – 9:30 PM",
    phone: "08037241116",
    rating: 4.8,
    reviews: 794,
    services: ["In-house stylist", "Design Customization"],
    cover: 0,
    gallery: [
      {
        src: nexus1,
        alt: "Blue deer sculpture framed by an arch of white flowers at Indriya Nexus Seawoods",
      },
      { src: nexus2, alt: "Lit shelves of gold necklaces at Indriya Nexus Seawoods" },
      { src: nexus3, alt: "Display wall and glass counter at Indriya Nexus Seawoods" },
    ],
  },
  {
    slug: "phoenix-marketcity-kurla",
    name: "Phoenix Marketcity, Kurla",
    area: "Kurla West",
    landmark: "Ground Floor, Phoenix Marketcity",
    address:
      "Ground Floor, Phoenix Market City, Patelwadi, Lal Bahadur Shastri Marg, Kurla West, Mumbai, Maharashtra - 400070",
    // indriya.com lists "11:00 AM to 9:00 AM", an evident typo for 9:00 PM.
    hours: "11:00 AM – 9:00 PM",
    phone: "1800-210-8383",
    rating: 5,
    reviews: 28,
    services: [],
    languages: ["Marathi", "Hindi", "English"],
    cover: 0,
    gallery: [
      {
        src: phoenix1,
        alt: "Arched gold display cabinets against a floral mural at Indriya Phoenix Marketcity",
      },
      {
        src: phoenix2,
        alt: "Curved glass jewellery counter with patterned chairs at Indriya Phoenix Marketcity",
      },
      {
        src: phoenix3,
        alt: "A row of arched necklace cabinets above glass counters at Indriya Phoenix Marketcity",
      },
    ],
  },
];

export const storeBySlug = (slug: string) => STORES.find((s) => s.slug === slug);

export const coverOf = (s: Store) => s.gallery[s.cover] ?? s.gallery[0]!;

export const telHref = (phone: string) => `tel:${phone.replace(/[^0-9+]/g, "")}`;

export const directionsUrl = (s: Store) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Indriya ${s.name}, ${s.address}`)}`;

export const mapEmbedUrl = (s: Store) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(`Indriya ${s.name}, ${s.address}`)}&z=16&output=embed`;

export const officialStoreUrl = (s: Store) => `${STORES_URL}/mumbai/${s.slug}`;

/**
 * JewelryStore schema. The rating is the store's Google rating as shown on indriya.com, and it is
 * displayed wherever this schema is used (store cards, store pages, the homepage store list).
 */
export const storeLd = (s: Store, url: string, images: string[] = []) => ({
  "@type": "JewelryStore",
  name: `Indriya – ${s.name}`,
  ...(images.length ? { image: images } : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: s.address,
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  telephone: s.phone,
  openingHours: s.hours,
  url,
  sameAs: officialStoreUrl(s),
  brand: { "@type": "Brand", name: "Indriya" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: s.rating,
    reviewCount: s.reviews,
    bestRating: 5,
    worstRating: 1,
  },
});

// 480px versions of store photos for cards and phones (matched by source path, hash-safe).
const STORE_IMAGES = import.meta.glob("@/assets/stores/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const SMALL_BY_FULL: Record<string, string> = {};
for (const [path, url] of Object.entries(STORE_IMAGES)) {
  const small = STORE_IMAGES[path.replace(/\.webp$/, "-480.webp")];
  if (small) SMALL_BY_FULL[url] = small;
}

export const storeSrcSet = (src: string) => {
  const small = SMALL_BY_FULL[src];
  return small ? `${small} 480w, ${src} ${STORE_PHOTO_SIZE.width}w` : undefined;
};

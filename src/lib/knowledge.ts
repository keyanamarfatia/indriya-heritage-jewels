// Knowledge pack for the FAQ page and the "Ask Indriya" assistant.
// Facts come from indriya.com (as captured for this project, October 2026), the Aditya Birla Group's
// Indriya page and the Bureau of Indian Standards. To teach the assistant something new, add a FAQ
// below or a fact to BRAND_FACTS: both the page and the assistant read from this file.

import { OFFICIAL_URL } from "@/lib/site";
import { ANANTARA_URL } from "@/lib/products";
import { STORES_URL } from "@/lib/stores";
import { TEMPLE_FAQS } from "@/lib/faqs";

export const CARE_PHONE = "1800-210-8383";
export const BIS_URL = "https://www.bis.gov.in/";
export const ABG_INDRIYA_URL = "https://www.adityabirla.com/businesses/companies/indriya/";

/** Where an answer can point. Official links open indriya.com (navy ↗); the rest stay on this site. */
export type Source = { id: string; label: string; href: string; official: boolean };

export const SOURCES: Source[] = [
  { id: "indriya", label: "indriya.com", href: OFFICIAL_URL, official: true },
  { id: "anantara", label: "Anantara on indriya.com", href: ANANTARA_URL, official: true },
  {
    id: "stores-official",
    label: "Store locator on indriya.com",
    href: STORES_URL,
    official: true,
  },
  { id: "abg", label: "Aditya Birla Group: Indriya", href: ABG_INDRIYA_URL, official: true },
  { id: "bis", label: "Bureau of Indian Standards", href: BIS_URL, official: true },
  {
    id: "guide",
    label: "Temple Jewellery Guide",
    href: "/temple-jewellery-guide",
    official: false,
  },
  { id: "exchange", label: "Lifetime Exchange", href: "/lifetime-exchange", official: false },
  { id: "stores", label: "Mumbai stores", href: "/store-locator", official: false },
  { id: "collection", label: "Shop temple jewellery", href: "/temple-jewellery", official: false },
  {
    id: "vratham",
    label: "Varalakshmi Vratham edit",
    href: "/temple-jewellery/varalakshmi-vratham",
    official: false,
  },
];

export const sourceById = (id: string) => SOURCES.find((s) => s.id === id);

/** Short facts the assistant may use that are not already a FAQ answer. */
export const BRAND_FACTS = [
  "Indriya is the jewellery brand of the Aditya Birla Group, launched in 2024 under Novel Jewels Limited. Its insignia is a gazelle and its name comes from Sanskrit. [abg]",
  "Indriya has stores in cities including Mumbai, New Delhi, Hyderabad, Pune, Ahmedabad, Jaipur, Patna, Indore, Surat, Lucknow, Vijayawada and Bhubaneswar. [abg]",
  "Indriya's head office is at One International Centre, Dadar West, Mumbai. [abg]",
  "Anantara is Indriya's bridal temple jewellery collection: necklaces, harams and jhumkas with Lakshmi, Ganesha, Garuda and Vishnu motifs, pearls and ruby-red and green stones. Its tagline is 'Be the bride of your dreams, adorned in divine heritage.' [anantara]",
  "Indriya's brand line is 'Every Jewel Tells a Story'. [indriya]",
  `Indriya customer care: ${CARE_PHONE} (toll free). [indriya]`,
  "Gold prices change every day, so this site shows today's gold rate in a pop-up (the gold bar button) instead of fixed prices. [indriya]",
  "Golden Programs are Indriya's gold purchase and savings programmes; current plans and terms are listed on indriya.com and explained in store. [indriya]",
  "This website is a student project by BBA Marketing students at Atlas SkillTech University. It is not the official Indriya website and does not sell jewellery; purchases happen on indriya.com or in an Indriya store. [indriya]",
];

export type FaqItem = { q: string; a: string; source?: string };

/** Extra words people use for a question (only for the offline matcher, never shown). */
const KEYWORDS: Record<string, string> = {
  "How should temple jewellery be stored?":
    "store storage keep necklace earrings box pouch tarnish",
  "How do you clean temple jewellery at home?": "clean wash polish shine dirty necklace",
  "Where are Indriya's stores in Mumbai?":
    "near address location andheri borivali kurla ghatkopar seawoods navi showroom",
  "How is the price of gold jewellery worked out?": "price cost making charges gst expensive",
  "Does Indriya offer lifetime exchange?": "exchange old gold buyback trade upgrade",
};
export type FaqGroup = { id: string; label: string; items: FaqItem[] };

const templeSources = ["guide", "bis", "vratham", "guide", "guide"];

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "temple-jewellery",
    label: "Temple jewellery",
    items: [
      ...TEMPLE_FAQS.map((f, i) => ({ q: f.q, a: f.a, source: templeSources[i] ?? "guide" })),
      {
        q: "What do the Lakshmi, peacock and lotus motifs mean?",
        a: "Goddess Lakshmi stands for wealth and prosperity, the peacock for grace (it is the mount of Lord Murugan) and the lotus for purity, as the flower Lakshmi sits upon. Ganesha motifs stand for new beginnings, which makes them popular with brides.",
        source: "guide",
      },
      {
        q: "Which temple jewellery should I wear for Varalakshmi Vratham?",
        a: "Lakshmi motifs suit the festival best: a Lakshmi haram or a kasu mala strung with Lakshmi coins, paired with temple jhumkas. Antique gold finishes look right with a silk saree for the puja.",
        source: "vratham",
      },
    ],
  },
  {
    id: "gold-purity",
    label: "Gold & purity",
    items: [
      {
        q: "What is a BIS hallmark and HUID?",
        a: "A BIS hallmark is the Bureau of Indian Standards' certification of gold purity. It has three marks: the BIS logo, the purity grade (such as 22K916) and a 6-character HUID code that is unique to that piece.",
        source: "bis",
      },
      {
        q: "What does 22K916 mean?",
        a: "22K916 means 22 karat gold that is 91.6% pure. It is the most common purity for traditional and temple jewellery in India.",
        source: "bis",
      },
      {
        q: "How is the price of gold jewellery worked out?",
        a: "The price is the day's gold rate multiplied by the weight of the piece, plus making charges and GST. Indriya shows the gold rate, making charges and taxes separately on the bill.",
        source: "indriya",
      },
      {
        q: "Where can I see today's gold rate?",
        a: "Tap the gold bar button on any page of this site for today's rate. It shows the live market rate with Indriya's last listed store rate underneath for reference.",
        source: "indriya",
      },
    ],
  },
  {
    id: "anantara",
    label: "Anantara collection",
    items: [
      {
        q: "What is the Anantara collection?",
        a: "Anantara is Indriya's bridal temple jewellery collection. It includes harams, short necklaces and jhumkas with Lakshmi, Ganesha, Garuda and Vishnu motifs, finished in antique gold with pearls and coloured stones.",
        source: "anantara",
      },
      {
        q: "Can I buy Anantara jewellery on this website?",
        a: "No. This site is a student project, so every product links to its page on indriya.com, where you can buy it, or you can see it in an Indriya store.",
        source: "anantara",
      },
    ],
  },
  {
    id: "exchange",
    label: "Exchange & programmes",
    items: [
      {
        q: "Does Indriya offer lifetime exchange?",
        a: "Yes. You can bring Indriya gold jewellery to any Indriya store and exchange it for a new design. The gold is valued at the current gold rate, and exact deductions follow Indriya's official exchange policy in store.",
        source: "exchange",
      },
      {
        q: "What do I need to exchange my jewellery?",
        a: "Bring the jewellery and its invoice to an Indriya store. The store checks purity against the BIS hallmark and HUID, values the gold at the current rate and applies that value to your new piece.",
        source: "exchange",
      },
      {
        q: "What are Indriya's Golden Programs?",
        a: "Golden Programs are Indriya's gold purchase and savings plans. The current plans and their terms are listed on indriya.com, and store staff can explain them in person.",
        source: "indriya",
      },
    ],
  },
  {
    id: "stores",
    label: "Stores & help",
    items: [
      {
        q: "Where are Indriya's stores in Mumbai?",
        a: "Mumbai has six Indriya stores: Borivali West, Andheri West, R City Mall in Ghatkopar, Sky City Mall in Borivali East, Nexus Seawoods Mall in Navi Mumbai and Phoenix Marketcity in Kurla. Each has its own page with the address, hours and map.",
        source: "stores",
      },
      {
        q: "What are Indriya's store timings?",
        a: "Most Mumbai stores open at 11:00 AM and close between 9:00 PM and 9:30 PM; Sky City Mall stays open until 11:00 PM. Check the store's page before you visit.",
        source: "stores",
      },
      {
        q: "How do I contact Indriya customer care?",
        a: `Call Indriya customer care toll free on ${CARE_PHONE}, or visit any Indriya store.`,
        source: "indriya",
      },
      {
        q: "Is this the official Indriya website?",
        a: "No. This is a student project by BBA Marketing students at Atlas SkillTech University. The official website is indriya.com, and every navy link with an ↗ arrow on this site opens it.",
        source: "indriya",
      },
    ],
  },
];

export const ALL_FAQS = FAQ_GROUPS.flatMap((g) => g.items);

export const SUGGESTED_QUESTIONS = [
  "Is temple jewellery real gold?",
  "Can I exchange my old gold?",
  "What should I wear for Varalakshmi Vratham?",
  "Which Indriya store is near Andheri?",
];

/* ---------- offline answers (used if the AI service is unavailable) ---------- */

const STOP = new Set(
  "a an and are as at be can do does for from how i in is it my of on or should the to what when where which who why with you your me we our this that".split(
    " ",
  ),
);

const words = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map((w) => w.slice(0, 5)); // crude stem: store / stored / storage all match

const DOCS = ALL_FAQS.map((f) => ({
  item: f,
  q: new Set(words(`${f.q} ${KEYWORDS[f.q] ?? ""}`)),
  a: new Set(words(f.a)),
}));
const IDF = (() => {
  const df = new Map<string, number>();
  for (const d of DOCS) for (const w of new Set([...d.q, ...d.a])) df.set(w, (df.get(w) ?? 0) + 1);
  return (w: string) => Math.log((DOCS.length + 1) / ((df.get(w) ?? 0) + 0.5));
})();

/** Best-matching FAQ for a question: rare shared words count most, words in the question double. */
export function matchFaq(question: string): FaqItem | undefined {
  const qWords = [...new Set(words(question))];
  if (qWords.length === 0) return undefined;
  let best: { item: FaqItem; score: number } | undefined;
  for (const d of DOCS) {
    const score = qWords.reduce(
      (sum, w) => sum + (d.q.has(w) ? 2 * IDF(w) : d.a.has(w) ? IDF(w) : 0),
      0,
    );
    if (!best || score > best.score) best = { item: d.item, score };
  }
  return best && best.score >= 3 ? best.item : undefined;
}

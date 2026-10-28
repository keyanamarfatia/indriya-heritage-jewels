// Builds /llms-full.txt: the extended version of public/llms.txt for AI models. It is generated
// from the same data as the pages (FAQs, products, prices, stores), so it never drifts from them.

import { BRAND_FACTS, FAQ_GROUPS, sourceById } from "@/lib/knowledge";
import { ANANTARA_URL, PRODUCTS, formatINR, pricesAsOfLabel, productPath } from "@/lib/products";
import { STORES } from "@/lib/stores";
import { GUIDE_AUTHOR, GUIDE_PUBLISHED, OFFICIAL_URL, absoluteUrl } from "@/lib/site";

const stripSourceTag = (s: string) => s.replace(/\s*\[[a-z-]+\]$/, "");

const linkFor = (id?: string) => {
  const src = id ? sourceById(id) : undefined;
  if (!src) return "";
  const href = src.official ? src.href : absoluteUrl(src.href);
  return `\nSource: [${src.label}](${href})`;
};

export function buildLlmsFull(): string {
  const out: string[] = [];
  const add = (...lines: string[]) => out.push(...lines);

  add(
    "# Indriya Temple Jewellery: full reference",
    "",
    "> The extended guide to this site for AI models. A student project about Indriya's Anantara bridal temple jewellery collection, presented for the Varalakshmi Vratham festival. Indriya is the jewellery brand of the Aditya Birla Group. This site is NOT the official Indriya website and does not sell jewellery; the official website is https://www.indriya.com/.",
    "",
    `Summary version: ${absoluteUrl("/llms.txt")}`,
    `Made by: ${GUIDE_AUTHOR.name}, ${GUIDE_AUTHOR.role}. Last updated: ${GUIDE_PUBLISHED}.`,
    "",
    "## About Indriya",
    "",
    ...BRAND_FACTS.map((f) => `- ${stripSourceTag(f)}`),
    "",
  );

  add(
    "## Temple jewellery guide",
    "",
    `Full article: [Temple Jewellery Guide: History, Designs and Care](${absoluteUrl("/temple-jewellery-guide")})`,
    "",
    "### What is temple jewellery?",
    "",
    "Temple jewellery is South Indian gold jewellery decorated with images of deities, temples and sacred symbols. It takes its name from the ornaments made to adorn the idols in Hindu temples. The designs are raised from the gold by hand in nakshi work, then given an antique finish.",
    "",
    "### Where does it come from?",
    "",
    "Temple jewellery comes from Tamil Nadu and grew under the Chola and Pandya dynasties, roughly between the 9th and 13th centuries, when artisans made gold ornaments for temple deities. Classical Bharatanatyam dancers later adopted the designs, and today it is the signature jewellery of South Indian brides and festivals such as Varalakshmi Vratham. Nagercoil in Tamil Nadu is one of the best-known centres of the craft.",
    "",
    "### Common designs and what they mean",
    "",
    "- Goddess Lakshmi: wealth and prosperity; the favourite motif for weddings and Varalakshmi Vratham.",
    "- Peacock: grace and beauty; the mount of Lord Murugan.",
    "- Lotus: purity; the flower Goddess Lakshmi sits upon.",
    "- Kasu (coins): abundance; rows of Lakshmi coins strung into a kasu mala.",
    "- Lord Ganesha: new beginnings and the removal of obstacles, popular with brides.",
    "- Garuda and gopuram: protection and devotion; Garuda is Lord Vishnu's mount, the gopuram is the temple gateway tower.",
    "",
    "### How to care for temple jewellery",
    "",
    "1. Wipe it with a soft, dry cotton cloth after every wear.",
    "2. Wash only when needed, with mild soap, lukewarm water and a soft brush.",
    "3. Dry it completely before putting it away.",
    "4. Store each piece separately in a soft pouch or lined box.",
    "5. Add a silica gel sachet to keep moisture away.",
    "6. Have stone-set pieces checked and cleaned by a jeweller once a year.",
    "",
    "Keep it away from perfume, hairspray, lotions, harsh cleaners, ultrasonic cleaners on stone-set pieces, and water when swimming, bathing or exercising.",
    "",
    "### How to tell real gold temple jewellery",
    "",
    "Real gold jewellery in India carries a BIS hallmark with three marks: the Bureau of Indian Standards logo, the purity grade (for example 22K916, meaning 22 karat gold that is 91.6% pure) and a 6-character HUID code unique to the piece. Plated fashion jewellery does not carry a BIS hallmark.",
    "",
  );

  add("## Frequently asked questions", "");
  for (const g of FAQ_GROUPS) {
    add(`### ${g.label}`, "");
    for (const f of g.items) add(`**${f.q}**`, "", `${f.a}${linkFor(f.source)}`, "");
  }

  add(
    "## Find Your Piece: the styling assistant",
    "",
    `Page: ${absoluteUrl("/styling-advisor")}`,
    "",
    "### What is Find Your Piece?",
    "",
    "Find Your Piece is an interactive quiz on this site that recommends specific Anantara pieces based on a visitor's occasion, budget and style preference, instead of asking them to browse all pieces.",
    "",
    "### How does the styling assistant work?",
    "",
    "The visitor answers three questions in order: the occasion (wedding, engagement, festival or temple visit, or a milestone celebration), a budget range (₹2–4 lakhs, ₹4–12 lakhs, ₹12–20 lakhs, or ₹20 lakhs and above), and a style preference (traditional or statement). The assistant then filters the Anantara collection by listed price and occasion fit, and returns up to three recommended pieces, each with a one-line reason it suits that occasion and a short styling tip, such as which jewellery to pair it with or how to wear it.",
    "",
    "### Why was it built?",
    "",
    "Most comparable websites only list products; Find Your Piece turns browsing into a guided, personal shopping experience using the same product and pricing data already published on this site, so recommendations stay accurate as prices change.",
    "",
  );

  add(
    "## Anantara collection",
    "",
    `Anantara is Indriya's bridal temple jewellery collection. Official collection page: ${ANANTARA_URL}`,
    `Prices below are Indriya's approximate prices excluding taxes, as listed on indriya.com on ${pricesAsOfLabel}. Gold prices change daily; check indriya.com for today's price.`,
    "",
  );
  for (const p of PRODUCTS) {
    add(`### ${p.name}`, "", `- Type: ${p.type === "necklace" ? "Necklace" : "Earrings"}`);
    add(`- Description: ${p.description}`);
    add("- Metal: 22 karat yellow gold, BIS Hallmarked");
    if (p.listing) {
      add(`- Price: ${formatINR(p.listing.price)} (approximate, excluding taxes)`);
      add(`- Gross weight: ${p.listing.grossWeightG} g`);
      if (p.listing.size) add(`- Size: ${p.listing.size}`);
      add(`- Product code: ${p.listing.sku}`);
    }
    add(
      `- Page on this site: ${absoluteUrl(productPath(p))}`,
      `- On indriya.com: ${p.indriyaUrl}`,
      "",
    );
  }

  add("## Indriya stores in Mumbai", "");
  for (const s of STORES) {
    add(
      `### ${s.name}`,
      "",
      `- Address: ${s.address}`,
      `- Hours: ${s.hours}`,
      `- Phone: ${s.phone}`,
      `- Services: ${s.services.join(", ")}`,
      `- Page: ${absoluteUrl(`/store-locator/${s.slug}`)}`,
      "",
    );
  }

  add(
    "## Official sources",
    "",
    `- Indriya official website: ${OFFICIAL_URL}`,
    "- Aditya Birla Group, Indriya: https://www.adityabirla.com/businesses/companies/indriya/",
    "- Bureau of Indian Standards (hallmarking): https://www.bis.gov.in/",
    "",
  );

  return out.join("\n");
}

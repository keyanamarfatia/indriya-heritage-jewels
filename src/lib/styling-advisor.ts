// Styling Advisor: personalized piece recommendations based on occasion, budget, and preference.

import type { Product } from "@/lib/products";
import { PRODUCTS } from "@/lib/products";
import { formatINR } from "@/lib/products";

export type Occasion = "wedding" | "engagement" | "festival" | "milestone";
export type BudgetRange = "2-4" | "4-12" | "12-20" | "20+";
export type StyleVibe = "traditional" | "statement";

export interface Recommendation {
  product: Product;
  reason: string;
  stylingTip: string;
}

const occasionLabels: Record<Occasion, string> = {
  wedding: "Wedding or Bridal",
  engagement: "Engagement",
  festival: "Festival or Temple Visit",
  milestone: "Milestone Celebration",
};

const budgetLabels: Record<BudgetRange, string> = {
  "2-4": "₹2–4 lakhs",
  "4-12": "₹4–12 lakhs",
  "12-20": "₹12–20 lakhs",
  "20+": "₹20+ lakhs",
};

const styleLabels: Record<StyleVibe, string> = {
  traditional: "Traditional",
  statement: "Statement / Sophisticated",
};

/** Budget range in rupees: [min, max) */
const budgetRanges: Record<BudgetRange, [number, number]> = {
  "2-4": [200000, 400000],
  "4-12": [400000, 1200000],
  "12-20": [1200000, 2000000],
  "20+": [2000000, Infinity],
};

/** Recommend pieces based on occasion, budget, and style vibe. */
export function getRecommendations(
  occasion: Occasion,
  budgetRange: BudgetRange,
  vibe: StyleVibe,
): Recommendation[] {
  const [minPrice, maxPrice] = budgetRanges[budgetRange];

  // Filter products that:
  // 1. Fit the budget (have a listing price in range)
  // 2. Match the occasion
  // 3. Match the style vibe
  const candidates = PRODUCTS.filter((p) => {
    if (!p.listing) return false;
    if (p.listing.price < minPrice || p.listing.price >= maxPrice) return false;

    // Match occasion
    const occasionMatch =
      occasion === "wedding" ||
      (occasion === "engagement" && p.type === "necklace") ||
      occasion === "festival" ||
      occasion === "milestone";

    // Match vibe
    const vibeMatch =
      vibe === "traditional" || // All pieces are traditional; "statement" is those with heavy/deity focus
      (vibe === "statement" &&
        ["ganesha", "garuda", "lakshmi", "bottu-mala"].some((keyword) =>
          p.slug.toLowerCase().includes(keyword),
        ));

    return occasionMatch && vibeMatch;
  });

  // Sort: necklaces first, then by price (cheaper first within range)
  candidates.sort((a, b) => {
    if (a.type !== b.type) return a.type === "necklace" ? -1 : 1;
    return (a.listing?.price ?? 0) - (b.listing?.price ?? 0);
  });

  return candidates.slice(0, 3).map((p) => ({
    product: p,
    reason: getReason(p, occasion, vibe),
    stylingTip: getStylingTip(p, occasion),
  }));
}

function getReason(product: Product, occasion: Occasion, vibe: StyleVibe): string {
  const isHeavy = (product.listing?.grossWeightG ?? 0) > 100;
  const isDeity = ["ganesha", "lakshmi", "garuda", "vishnu"].some((d) =>
    product.name.toLowerCase().includes(d),
  );

  if (occasion === "wedding" && isHeavy) {
    return "Perfect for a wedding: substantial, formal, and a true heirloom piece.";
  }
  if (occasion === "engagement") {
    return "Elegant and statement-making for an engagement ceremony.";
  }
  if (occasion === "festival" && isDeity) {
    return `Auspicious choice: the ${product.name.split(" ")[1]} motif is traditionally worn at festivals and temple visits.`;
  }
  if (occasion === "milestone") {
    return "A meaningful piece to mark a special moment in your life.";
  }
  if (vibe === "statement") {
    return `A sophisticated piece with intricate deity work and substantial gold—true statement jewellery.`;
  }
  return "A beautiful temple jewellery piece that honours tradition.";
}

function getStylingTip(product: Product, occasion: Occasion): string {
  if (product.type === "necklace") {
    if (occasion === "wedding") {
      return `Pair with ${product.name.includes("long") || product.name.includes("Bottu") ? "drop earrings" : "statement earrings"} to balance proportions. The ${product.name.split(" ")[1]} motif complements bridal red beautifully.`;
    }
    if (occasion === "festival") {
      return "Wear with a silk saree in deep jewel tones (emerald, burgundy, navy) for a cohesive festival look.";
    }
    return "Layer with another necklace in a complementary length for a modern take on tradition.";
  }

  // Earrings
  if (occasion === "wedding") {
    return "Pair with a matching necklace from our collection—most of our sets share design motifs for a cohesive bridal look.";
  }
  if (occasion === "festival") {
    return "Wear with a loose braid or side part to let the drops catch light and movement.";
  }
  return "These work beautifully as statement pieces on their own or paired with a delicate necklace.";
}

export function describeQuiz(occasion: Occasion, budget: BudgetRange, vibe: StyleVibe): string {
  return `Looking for something for ${occasionLabels[occasion]} within ${budgetLabels[budget]}, with a ${styleLabels[vibe]} feel.`;
}

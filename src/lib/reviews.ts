// Real Google reviews of Indriya's Mumbai stores, copied as shown on Google on 27 October 2026.
// Reviewers are shown by first name and initial only. Long reviews are cut at a sentence break
// and marked "…"; the full text is on Google. Add a store by copying its Google review panel.

export type ReviewTopic = { label: string; count: number };
export type StoreReview = {
  author: string;
  meta?: string;
  stars: number;
  when: string;
  text: string;
  ownerReply?: string;
};
export type StoreReviews = {
  checked: string;
  topics: ReviewTopic[];
  reviews: StoreReview[];
};

export const GOOGLE_REVIEWS: Record<string, StoreReviews> = {
  "andheri-w-mumbai": {
    checked: "27 October 2026",
    topics: [
      { label: "designs", count: 46 },
      { label: "polite staff", count: 35 },
      { label: "jewellery designs", count: 5 },
      { label: "old gold exchange", count: 2 },
    ],
    reviews: [
      {
        author: "Sony K.",
        stars: 5,
        when: "about 2 months before 27 October 2026",
        text: "'Indriya' is a relatively new jewellery brand from the Aditya Birla Group, just about two years old, but it has already made a strong impression in the industry. …",
        ownerReply:
          "We're thrilled to receive your wonderful feedback! Thank you for choosing Indriya – Aditya Birla Jewellery. We look forward to serving you again. For any assistance, call 1800-210-8383 or email indriya@adityabirla.com.",
      },
      {
        author: "Nits K.",
        meta: "Google Local Guide",
        stars: 5,
        when: "about 4 months before 27 October 2026",
        text: "This is the best jewellery store in mumbai …",
      },
    ],
  },
};

/** Other review platforms where Indriya's Mumbai stores are listed (found October 2026). */
export const OTHER_LISTINGS: Record<string, { name: string; href: string }[]> = {
  "borivali-w-mumbai": [
    {
      name: "Justdial",
      href: "https://www.justdial.com/Mumbai/Indriya-Aditya-Birla-Jewellery-Borivali-West-Borivali/022PXX22-XX22-241105200835-P2C2_BZDET",
    },
    {
      name: "magicpin",
      href: "https://magicpin.in/Mumbai/Thakkar-Shopping-Mall/Fashion/Indriya-Aditya-Birla-Jewellery-Borivali-West,-Mumbai/store/173a37a",
    },
  ],
  "nexus-seawoods-mall-mumbai": [
    {
      name: "Justdial",
      href: "https://www.justdial.com/Navi-Mumbai/Indriya-Aditya-Birla-Jewellery/022PXX22-XX22-250625041712-N2E1_BZDET",
    },
  ],
};

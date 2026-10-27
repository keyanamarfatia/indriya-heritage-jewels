// Real press coverage of Indriya and the Anantara collection, newest first.
// Each entry was checked against the article (headline, outlet, date) in October 2026.

export type PressItem = {
  outlet: string;
  headline: string;
  date?: string; // ISO, when the article states it
  url: string;
  summary: string;
  anantara?: boolean;
};

export const PRESS: PressItem[] = [
  {
    outlet: "Medianews4u",
    headline: "Indriya by Aditya Birla Jewellery launches regional bridal lines for India's brides",
    date: "2025-11-18",
    url: "https://www.medianews4u.com/indriya-by-aditya-birla-jewellery-launches-regional-bridal-lines-for-indias-brides/",
    summary:
      "Indriya launched four regional bridal collections. Anantara is designed for brides in Andhra Pradesh, Telangana and Karnataka, with pieces such as the Garuda Haar and the Lakshmi Bottu Mala.",
    anantara: true,
  },
  {
    outlet: "Indian Jeweller",
    headline:
      "Indriya Unveils 'Anantara': A Gold Masterpiece Celebrating Hyderabad's Sacred Artistry",
    date: "2025-05-28",
    url: "https://www.indianjeweller.in/Indian-Jewellery-News/15462/indriya-unveils-%E2%80%98anantara%E2%80%99:-a-gold-masterpiece-celebrating-hyderabad%E2%80%99s-sacred-artistry",
    summary:
      "Anantara's first showpiece is a three-layered 22KT gold piece modelled on motifs from the Hoysala-era Chennakeshava and Keshava temples at Somanathapura.",
    anantara: true,
  },
  {
    outlet: "India Retailing",
    headline:
      "Indriya's point of difference is going to be designs and experience: CEO Sandeep Kohli",
    date: "2024-11-05",
    url: "https://www.indiaretailing.com/2024/11/05/sandeep-kohli-indriya-novel-jewels-aditya-birla-group-interview",
    summary: "An interview with Indriya CEO Sandeep Kohli on the brand's design-led strategy.",
  },
  {
    outlet: "Harper's Bazaar India",
    headline: "Aditya Birla Group is all set to sparkle with Indriya",
    date: "2024-08-07",
    url: "https://harpersbazaar.in/fashion/story/aditya-birla-group-is-all-set-to-shine-and-sparkle-with-indriya-1064676-2024-08-07",
    summary: "A fashion-press look at the launch of Indriya.",
  },
  {
    outlet: "Outlook Business",
    headline:
      "Aditya Birla Group Enters Retail Jewellery Business with 'Indriya', Plans Rs 5,000 Crore Investment",
    date: "2024-07-27",
    url: "https://www.outlookbusiness.com/corporate/aditya-birla-group-enters-retail-jewellery-business-with-indriya-plans-rs-5000-crore-investment",
    summary:
      "The Aditya Birla Group announced a Rs 5,000 crore investment in Indriya, opening its first stores in Delhi, Indore and Jaipur.",
  },
  {
    outlet: "Business Today",
    headline:
      "Aditya Birla Group ventures into Rs 6.7 lakh crore Indian jewellery retail market with launch of Indriya",
    date: "2024-07-27",
    url: "https://www.businesstoday.in/amp/latest/corporate/story/aditya-birla-group-ventures-into-rs-67-lakh-crore-indian-jewellery-retail-market-with-launch-of-indriya-439002-2024-07-27",
    summary: "Business coverage of Indriya's launch into India's jewellery retail market.",
  },
  {
    outlet: "GJEPC Solitaire",
    headline: "Aditya Birla Group Unveils Rs. 5,000 Crore Jewellery Brand 'Indriya'",
    url: "https://gjepc.org/solitaire/?p=27007",
    summary: "The Gem & Jewellery Export Promotion Council's magazine on Indriya's launch.",
  },
  {
    outlet: "Aditya Birla Group",
    headline: "Indriya: A New Era of Elegance in Fine Jewellery",
    url: "https://www.adityabirla.com/media/stories/indriya-a-new-era-of-elegance-in-fine-jewellery",
    summary: "The Aditya Birla Group's own story on Indriya.",
  },
];

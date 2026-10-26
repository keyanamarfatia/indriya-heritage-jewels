// The 5 People Also Ask questions answered for CIA 3 (AEO). Used for both the visible FAQ and the FAQPage schema.
export const TEMPLE_FAQS = [
  {
    tag: "Basics",
    q: "What is temple jewellery?",
    a: "Temple jewellery is traditional South Indian gold jewellery decorated with motifs of deities, temples and sacred symbols such as Goddess Lakshmi, the lotus and the peacock. It was first made to adorn temple idols and classical dancers, and today it is worn by brides and at festivals.",
  },
  {
    tag: "Purity",
    q: "Is temple jewellery made of real gold?",
    a: "It can be. Traditional temple jewellery is made in 22-karat gold, while fashion versions use gold-plated silver or alloy. Indriya's temple jewellery is BIS Hallmark certified gold with a HUID code, so its purity can be verified.",
  },
  {
    tag: "Bridal",
    q: "Which temple jewellery is best for a South Indian wedding?",
    a: "Most South Indian brides wear a layered set: a choker, a long haram or kasu mala, jhumkas, a vaddanam (waist belt), armlets and a maang tikka. Lakshmi and peacock motifs in an antique gold finish are the most popular bridal choices.",
  },
  {
    tag: "Care",
    q: "How do you clean temple jewellery at home?",
    a: "Wipe it gently with a soft, dry cotton cloth after every wear. For a deeper clean, use a soft brush with mild soap in lukewarm water, rinse, and dry it completely. Avoid harsh chemicals, and have stone-set pieces cleaned professionally.",
  },
  {
    tag: "Storage",
    q: "How should temple jewellery be stored?",
    a: "Keep each piece in its own soft pouch or lined box, away from air and moisture. Add a silica gel sachet and keep it away from perfume and sprays so the antique finish does not dull.",
  },
];

export const faqPageLd = {
  "@type": "FAQPage",
  mainEntity: TEMPLE_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

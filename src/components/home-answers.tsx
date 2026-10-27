import { Link } from "@tanstack/react-router";
import { PRODUCTS, pricesAsOfLabel } from "@/lib/products";
import { STORES } from "@/lib/stores";
import {
  all,
  avgPerGram,
  avgRating,
  bridalStores,
  deityNamed,
  earringCount,
  earrings,
  g,
  listJoin,
  mostReviewed,
  necklaceCount,
  necklaces,
  perGram,
  rupee,
  shortName,
  topRated,
  totalReviews,
} from "@/lib/anantara-stats";
import { INDRIYA_RATE } from "@/lib/live-gold";
import { CARE_PHONE } from "@/lib/knowledge";

/*
 * Answer-first passages for AI citability: each block opens with a direct answer, names its
 * subject instead of using pronouns, runs about 130-170 words and carries sourced figures.
 * The price, weight and rating figures are computed from the site's own data, so they stay true
 * when prices are updated.
 */

const link = "text-maroon underline decoration-gold underline-offset-4 hover:text-gold-deep";

export function HomeAnswers() {
  return (
    <section className="border-t border-border py-16" aria-labelledby="answers-heading">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <p className="eyebrow">Temple jewellery, answered</p>
          <h2
            id="answers-heading"
            className="mt-3 font-display text-4xl font-light text-ink sm:text-5xl"
          >
            What do shoppers ask about Anantara?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Shoppers most often ask what Anantara is, what temple jewellery means, what Anantara
            costs and where to buy it. We answered those 4 questions with our own analysis of{" "}
            {all.count} indriya.com product listings checked on {pricesAsOfLabel}, the Google
            ratings of Indriya&rsquo;s {STORES.length} Mumbai stores (
            {totalReviews.toLocaleString("en-IN")} reviews), the Bureau of Indian Standards&rsquo;
            hallmarking rules and press coverage from Indian Jeweller and Medianews4u.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-border bg-card p-7 sm:p-8">
            <h2 className="font-display text-3xl leading-tight text-ink">
              What is Indriya&rsquo;s Anantara collection?
            </h2>
            <p className="mt-4 leading-relaxed text-ink/85">
              <strong className="font-medium text-ink">
                Anantara is Indriya&rsquo;s bridal temple jewellery collection
              </strong>{" "}
              of 22 karat gold harams, short necklaces and jhumkas decorated with Goddess Lakshmi,
              Lord Ganesha, Garuda and Vishnu motifs. Indriya is the jewellery brand of the Aditya
              Birla Group, launched in 2024 under Novel Jewels Limited, and according to the Aditya
              Birla Group, Indriya has stores in 12 Indian cities, including Mumbai, Hyderabad and
              Vijayawada.
            </p>
            <p className="mt-3 leading-relaxed text-ink/85">
              Anantara pieces are made in 22K916 gold, which is 91.6% pure, finished in an antique
              geru tone and set with pearls, rubies and green stones. Every Anantara piece is BIS
              Hallmarked with a 6-character HUID code. This site features {PRODUCTS.length} Anantara
              pieces, {necklaceCount} necklaces and {earringCount} pairs of earrings, each linked to
              its page on indriya.com. Indriya unveiled Anantara in May 2025 for brides in Andhra
              Pradesh, Telangana and Karnataka, with designs drawn from the Hoysala-era temples at
              Somanathapura, according to Indian Jeweller and Medianews4u.
            </p>
          </article>

          <article className="rounded-3xl border border-border bg-card p-7 sm:p-8">
            <h2 className="font-display text-3xl leading-tight text-ink">
              What is temple jewellery?
            </h2>
            <p className="mt-4 leading-relaxed text-ink/85">
              <strong className="font-medium text-ink">
                Temple jewellery is South Indian gold jewellery
              </strong>{" "}
              decorated with images of deities, temples and sacred symbols, first made to adorn the
              idols of Hindu temples. Temple jewellery grew in Tamil Nadu under the Chola and Pandya
              dynasties, roughly between the 9th and 13th centuries, and Nagercoil in southern Tamil
              Nadu remains a well-known centre of the craft. Bharatanatyam dancers later adopted
              temple jewellery for the stage, and today temple jewellery is the signature jewellery
              of South Indian brides.
            </p>
            <p className="mt-3 leading-relaxed text-ink/85">
              The three classic temple jewellery motifs are Goddess Lakshmi for prosperity, the
              peacock for grace and the lotus for purity. According to the Bureau of Indian
              Standards, real gold temple jewellery carries three hallmark marks: the BIS logo, a
              purity grade such as 22K916 and a unique 6-character HUID code. We found that{" "}
              {deityNamed.length} of the {PRODUCTS.length} Anantara pieces on this site are named
              after a Hindu deity. Read more in our{" "}
              <Link to="/temple-jewellery-guide" className={link}>
                Temple Jewellery Guide
              </Link>
              .
            </p>
          </article>

          <article className="rounded-3xl border border-border bg-card p-7 sm:p-8">
            <h2 className="font-display text-3xl leading-tight text-ink">
              How much does Anantara temple jewellery cost?
            </h2>
            <p className="mt-4 leading-relaxed text-ink/85">
              <strong className="font-medium text-ink">
                Anantara temple jewellery costs between {rupee(all.lo.listing.price)} and{" "}
                {rupee(all.hi.listing.price)} before taxes
              </strong>
              , based on our analysis of {all.count} Anantara pieces listed on indriya.com on{" "}
              {pricesAsOfLabel}. Across all {all.count} pieces, the average works out to{" "}
              {rupee(avgPerGram)} per gram of gross weight, close to Indriya&rsquo;s 22 karat store
              rate of {rupee(INDRIYA_RATE.perGram22kt)} per gram on {INDRIYA_RATE.updatedLabel}.
              Price per gram ranges from {rupee(Math.min(...perGram))} to{" "}
              {rupee(Math.max(...perGram))}, because gross weight includes pearls and stones and
              making charges differ by design. The most expensive Anantara piece, the {all.hi.name},
              weighs {g(all.hi.listing.grossWeightG)}.
            </p>
            <table className="mt-5 w-full text-left text-sm">
              <caption className="sr-only">
                Anantara prices and weights on indriya.com, {pricesAsOfLabel}
              </caption>
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-[0.14em] text-gold-deep">
                  <th className="py-2 font-medium">Type</th>
                  <th className="py-2 font-medium">Pieces</th>
                  <th className="py-2 font-medium">Weight</th>
                  <th className="py-2 font-medium">Price (excl. tax)</th>
                </tr>
              </thead>
              <tbody className="text-ink/85">
                {[
                  { label: "Earrings", r: earrings },
                  { label: "Necklaces", r: necklaces },
                ].map(({ label, r }) => (
                  <tr key={label} className="border-b border-border/60">
                    <td className="py-2.5">{label}</td>
                    <td className="py-2.5">{r.count}</td>
                    <td className="py-2.5">
                      {g(r.minW)} – {g(r.maxW)}
                    </td>
                    <td className="py-2.5">
                      {rupee(r.lo.listing.price)} – {rupee(r.hi.listing.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-muted-foreground">
              Source: indriya.com product pages, {pricesAsOfLabel}. Gold prices change daily.
            </p>
          </article>

          <article className="rounded-3xl border border-border bg-card p-7 sm:p-8">
            <h2 className="font-display text-3xl leading-tight text-ink">
              How are Indriya&rsquo;s Mumbai stores rated?
            </h2>
            <p className="mt-4 leading-relaxed text-ink/85">
              <strong className="font-medium text-ink">
                Indriya&rsquo;s {STORES.length} Mumbai jewellery stores average{" "}
                {avgRating.toFixed(1)} out of 5 on Google across{" "}
                {totalReviews.toLocaleString("en-IN")} reviews
              </strong>
              , based on our count of the ratings shown on indriya.com in October 2026. The{" "}
              {shortName(mostReviewed.name)} store has the most reviews,{" "}
              {mostReviewed.reviews.toLocaleString("en-IN")} at {mostReviewed.rating.toFixed(1)}{" "}
              stars, while {shortName(topRated[0]!.name)} is rated {topRated[0]!.rating.toFixed(1)}{" "}
              from {topRated[0]!.reviews} reviews and {shortName(topRated[1]!.name)} is rated{" "}
              {topRated[1]!.rating.toFixed(1)} from {topRated[1]!.reviews} reviews.
            </p>
            <p className="mt-3 leading-relaxed text-ink/85">
              Every Indriya store in Mumbai opens at 11:00 AM and closes between 9:00 PM and 11:00
              PM, depending on the store. The {listJoin(bridalStores.map((s) => shortName(s.name)))}{" "}
              stores offer a bridal studio, in-house stylists and design customisation, which suits
              brides choosing a temple jewellery set. In our count, {bridalStores.length} of the{" "}
              {STORES.length} Mumbai stores list a bridal studio. Indriya stores also handle
              lifetime exchange, valuing Indriya gold at the current gold rate. Indriya customer
              care is available toll free on {CARE_PHONE}, and every store has its own page in our{" "}
              <Link to="/store-locator" className={link}>
                store locator
              </Link>
              .
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, SiteShell } from "@/components/site-shell";
import {
  GUIDE_AUTHOR,
  GUIDE_PUBLISHED,
  SITE_NAME,
  absoluteUrl,
  breadcrumbLd,
  jsonLd,
  pageHead,
} from "@/lib/site";
import guideImage from "@/assets/anantara/ganesha-large.webp";

const PATH = "/temple-jewellery-guide";
const HEADLINE = "Temple Jewellery Guide: History, Designs and Care";
const DESCRIPTION =
  "What temple jewellery is, where it comes from, what Lakshmi, peacock and lotus motifs mean, and how to clean and store it.";

const publishedLabel = new Date(GUIDE_PUBLISHED).toLocaleDateString("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export const Route = createFileRoute("/temple-jewellery-guide")({
  head: () => ({
    ...pageHead({
      title: "Temple Jewellery Guide: History, Designs & Care | Indriya",
      description: DESCRIPTION,
      path: PATH,
    }),
    scripts: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Temple Jewellery Guide", path: PATH },
      ]),
      jsonLd({
        "@type": "Article",
        headline: HEADLINE,
        description: DESCRIPTION,
        datePublished: GUIDE_PUBLISHED,
        dateModified: GUIDE_PUBLISHED,
        author: { "@type": "Person", name: GUIDE_AUTHOR.name, jobTitle: GUIDE_AUTHOR.role },
        publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
        mainEntityOfPage: absoluteUrl(PATH),
        about: ["Temple jewellery", "South Indian jewellery", "Nakshi work"],
      }),
    ],
  }),
  component: GuidePage,
});

const DESIGNS = [
  {
    name: "Goddess Lakshmi",
    text: "The Lakshmi motif stands for wealth and prosperity, which is why it is the favourite design for weddings and Varalakshmi Vratham. It appears on harams, pendants and on the coins of the kasu mala.",
  },
  {
    name: "Peacock",
    text: "The peacock stands for grace and beauty and is linked to Lord Murugan. It is often set with red and green stones on necklaces and jhumkas.",
  },
  {
    name: "Lotus",
    text: "The lotus stands for purity and is the seat of Goddess Lakshmi. Lotus pendants and lotus-shaped bangles are common in festive sets.",
  },
  {
    name: "Other designs",
    text: "Other popular designs include the kasu mala (coin necklace), the manga mala (mango necklace) and gopuram-shaped pendants.",
  },
];

function GuidePage() {
  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Temple Jewellery Guide" }]} />

        <h1 className="mt-6 font-display text-5xl leading-tight text-maroon">{HEADLINE}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{DESCRIPTION}</p>

        <img
          src={guideImage}
          alt="Heirloom Ganesha gold temple necklace from Indriya's Anantara collection, with a deity pendant, ruby drops and pearls"
          width={900}
          height={900}
          className="mt-8 aspect-[16/10] w-full rounded-t-[200px] bg-[#fbeee3] object-cover"
          loading="lazy"
          decoding="async"
        />

        <section className="mt-12">
          <h2 className="font-display text-3xl text-maroon">What is temple jewellery?</h2>
          <p className="mt-3 leading-relaxed">
            <strong>
              Temple jewellery is South Indian gold jewellery decorated with images of deities,
              temples and sacred symbols.
            </strong>{" "}
            It began as ornaments made to adorn the idols in Hindu temples. Classical Bharatanatyam
            dancers later wore it on stage, and over time it became the signature jewellery of South
            Indian brides and of festivals such as{" "}
            <Link
              to="/temple-jewellery/varalakshmi-vratham"
              className="text-maroon underline decoration-gold underline-offset-4"
            >
              Varalakshmi Vratham
            </Link>
            .
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-3xl text-maroon">
            Where does temple jewellery come from?
          </h2>
          <p className="mt-3 leading-relaxed">
            <strong>
              Temple jewellery comes from Tamil Nadu and grew under the Chola and Pandya dynasties,
              roughly between the 9th and 13th centuries.
            </strong>{" "}
            Artisans made heavy gold ornaments for temple deities, using the same carvings seen on
            temple walls and gopurams. Today the craft is practised across Tamil Nadu, Andhra
            Pradesh, Telangana, Karnataka and Kerala.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-3xl text-maroon">
            What are the common temple jewellery designs?
          </h2>
          <p className="mt-3 leading-relaxed">
            <strong>
              The three classic motifs are Goddess Lakshmi, the peacock and the lotus.
            </strong>{" "}
            Each carries its own meaning.
          </p>
          <div className="mt-6 space-y-6">
            {DESIGNS.map((d) => (
              <div key={d.name}>
                <h3 className="font-display text-2xl text-maroon">{d.name}</h3>
                <p className="mt-2 leading-relaxed">{d.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-3xl text-maroon">
            How do you care for temple jewellery?
          </h2>
          <p className="mt-3 leading-relaxed">
            <strong>
              Temple jewellery lasts longest when it is kept dry, wiped after every wear and stored
              separately.
            </strong>
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
            <li>Wipe each piece with a soft dry cloth after wearing it.</li>
            <li>
              Clean gently with mild soap, lukewarm water and a soft brush, then dry completely.
            </li>
            <li>Avoid perfume, hairspray and harsh chemicals.</li>
            <li>Store each piece in its own pouch or lined box with a silica gel sachet.</li>
            <li>Get stone-set pieces cleaned and checked by your jeweller once a year.</li>
          </ul>
          <p className="mt-6 text-sm">
            More quick answers are in the{" "}
            <a
              href="/temple-jewellery/varalakshmi-vratham#faq"
              className="text-maroon underline decoration-gold underline-offset-4"
            >
              temple jewellery FAQ
            </a>
            .
          </p>
        </section>

        <footer className="mt-14 border-t pt-6 text-sm text-muted-foreground">
          <p>
            Written by <span className="font-medium text-maroon">{GUIDE_AUTHOR.name}</span>,{" "}
            {GUIDE_AUTHOR.role} · Published <time dateTime={GUIDE_PUBLISHED}>{publishedLabel}</time>
          </p>
        </footer>
      </article>
    </SiteShell>
  );
}

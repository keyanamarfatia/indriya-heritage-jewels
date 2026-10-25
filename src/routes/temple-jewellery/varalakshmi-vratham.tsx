import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, IndianRupee, RefreshCcw } from "lucide-react";
import { Breadcrumbs, SiteShell } from "@/components/site-shell";
import { breadcrumbLd, jsonLd, pageHead, absoluteUrl } from "@/lib/site";
import { TEMPLE_FAQS, faqPageLd } from "@/lib/faqs";
import heroImage from "@/assets/hero.webp";
import chokerImage from "@/assets/temple-choker.webp";
import jhumkaImage from "@/assets/temple-jhumkas.webp";
import bangleImage from "@/assets/temple-bangle.webp";
import nakshiImage from "@/assets/nakshi-detail.webp";

const PATH = "/temple-jewellery/varalakshmi-vratham";
const TITLE = "Temple Jewellery for Varalakshmi Vratham | Indriya";
const DESCRIPTION =
  "Celebrate Varalakshmi Vratham with Indriya's temple jewellery: nakshi Lakshmi harams, kasu malas and antique gold. BIS Hallmark gold, lifetime exchange.";

export const Route = createFileRoute("/temple-jewellery/varalakshmi-vratham")({
  head: () => ({
    ...pageHead({ title: TITLE, description: DESCRIPTION, path: PATH }),
    scripts: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Temple Jewellery", path: "/temple-jewellery" },
        { name: "Varalakshmi Vratham", path: PATH },
      ]),
      jsonLd(faqPageLd),
      jsonLd({
        "@type": "CollectionPage",
        name: "Temple Jewellery for Varalakshmi Vratham",
        description: DESCRIPTION,
        url: absoluteUrl(PATH),
        // Product schema for each featured piece. No price or availability: this is a student
        // project without real pricing, so those fields are left out rather than invented.
        mainEntity: {
          "@type": "ItemList",
          itemListElement: PIECES.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              name: p.name,
              description: p.description,
              image: absoluteUrl(p.src),
              brand: { "@type": "Brand", name: "Indriya" },
              material: "22-karat BIS Hallmark gold",
              category: "Temple jewellery",
            },
          })),
        },
      }),
    ],
  }),
  component: VaralakshmiPage,
});

const PIECES = [
  {
    src: chokerImage,
    w: 800,
    h: 500,
    name: "Lakshmi temple choker",
    description:
      "Antique gold temple choker with hand-chased Goddess Lakshmi panels, pearl drops and ruby and emerald stones.",
    alt: "Antique gold Lakshmi temple choker with carved goddess panels, pearl drops and ruby and emerald stones",
  },
  {
    src: jhumkaImage,
    w: 400,
    h: 340,
    name: "Lakshmi temple jhumkas",
    description:
      "Bell-shaped antique gold jhumkas with a Goddess Lakshmi stud and a ring of pearl drops.",
    alt: "Pair of antique gold temple jhumkas with Goddess Lakshmi studs and pearl drops",
  },
  {
    src: bangleImage,
    w: 430,
    h: 240,
    name: "Nakshi temple bangle",
    description:
      "Hand-chased nakshi temple bangle in antique gold with a Lakshmi motif and red stones.",
    alt: "Antique gold nakshi temple bangle with Lakshmi motif and red stones on maroon silk",
  },
];

function VaralakshmiPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-maroon">
        <img
          src={heroImage}
          alt="Antique gold temple jewellery set with a Goddess Lakshmi choker, jhumkas and bangle on maroon silk beside a brass diya for Varalakshmi Vratham"
          className="absolute inset-0 h-full w-full object-cover object-right"
          width={1920}
          height={1088}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon/90 via-maroon/60 to-maroon/10" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-5 py-20 sm:px-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-ivory/80">
            Varalakshmi Vratham Collection
          </p>
          <h1 className="max-w-2xl font-display text-5xl font-medium leading-[1.1] text-ivory sm:text-6xl">
            Temple Jewellery for Varalakshmi Vratham
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ivory/85">
            Welcome Varalakshmi home in gold. Every Jewel Tells a Story.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/store-locator"
              className="inline-flex h-12 items-center rounded-full bg-gold px-7 font-medium text-maroon hover:bg-gold/90"
            >
              Find a Store Near You
            </Link>
            <Link
              to="/temple-jewellery"
              className="inline-flex h-12 items-center rounded-full border border-ivory/60 px-7 font-medium text-ivory hover:bg-ivory/10"
            >
              Explore the Collection
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="pt-6">
          <Breadcrumbs
            items={[
              { name: "Home", to: "/" },
              { name: "Temple Jewellery", to: "/temple-jewellery" },
              { name: "Varalakshmi Vratham" },
            ]}
          />
        </div>

        {/* Intro */}
        <section className="max-w-3xl py-12 text-lg leading-relaxed">
          <p>
            On Varalakshmi Vratham, homes across Andhra Pradesh, Telangana and Karnataka welcome the
            Goddess of prosperity with flowers, kalasham and prayer. Our{" "}
            <strong>temple jewellery for Varalakshmi Vratham</strong> is crafted for that morning.
            Each piece carries the motifs of South India&rsquo;s temples, in gold you can pass down
            for generations. Whether you are choosing a{" "}
            <Link
              to="/temple-jewellery/lakshmi-haram"
              className="text-maroon underline decoration-gold underline-offset-4"
            >
              lakshmi haram
            </Link>{" "}
            for yourself or a gift for your mother-in-law, every jewel tells a story of devotion and
            family.
          </p>
        </section>

        {/* Pieces */}
        <section aria-label="Featured pieces" className="grid gap-6 pb-14 sm:grid-cols-3">
          {PIECES.map((p) => (
            <figure key={p.name} className="overflow-hidden rounded-lg border bg-card">
              <img
                src={p.src}
                alt={p.alt}
                width={p.w}
                height={p.h}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="px-4 py-3 font-display text-xl text-maroon">
                {p.name}
              </figcaption>
            </figure>
          ))}
        </section>

        {/* Craft */}
        <section className="grid gap-10 border-t py-14 md:grid-cols-[2fr_1fr] md:items-start">
          <div className="space-y-8">
            <h2 className="font-display text-4xl text-maroon">Crafted in the Temple Tradition</h2>
            <div>
              <h3 className="font-display text-2xl text-maroon">Nakshi work, shaped by hand</h3>
              <p className="mt-3 leading-relaxed">
                Every design begins with nakshi work, the age-old art of hand-chasing patterns into
                gold. Our artisans raise tiny figures of Goddess Lakshmi, blooming lotuses and
                dancing peacocks from the metal. They then finish each piece in a warm antique gold
                tone that recalls the ornaments of temple deities.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl text-maroon">Designs for every ritual</h3>
              <p className="mt-3 leading-relaxed">
                Our temple jewellery necklace designs include kasu mala necklaces strung with
                Lakshmi coins and layered harams, alongside jhumkas, bangles, armlets and vaddanams.
                Explore{" "}
                <Link
                  to="/temple-jewellery"
                  className="text-maroon underline decoration-gold underline-offset-4"
                >
                  gold temple jewellery
                </Link>{" "}
                for the vratham puja, a family wedding later in the season, or an evening aarti.
                Pair a temple necklace with matching earrings for the full festive look. Or choose a
                single antique gold necklace as an heirloom gift.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl text-maroon">
                Varamahalakshmi, the Karnataka way
              </h3>
              <p className="mt-3 leading-relaxed">
                In Karnataka, the festival is celebrated as Varamahalakshmi. Our designs honour both
                traditions, with motifs inspired by the temple architecture of South India.
              </p>
            </div>
          </div>
          <img
            src={nakshiImage}
            alt="Close-up of nakshi work: a seated Goddess Lakshmi figure hand-chased in antique gold with pearl and stone details"
            width={240}
            height={270}
            loading="lazy"
            decoding="async"
            className="w-full rounded-lg object-cover"
          />
        </section>

        {/* Trust */}
        <section className="border-t py-14">
          <h2 className="font-display text-4xl text-maroon">Gold You Can Trust</h2>
          <p className="mt-3 max-w-3xl leading-relaxed">
            Varalakshmi Vratham gold jewellery is an investment in your family&rsquo;s future, so
            every promise we make is clear.
          </p>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            <li className="rounded-lg border bg-card p-6">
              <BadgeCheck className="h-7 w-7 text-gold" aria-hidden="true" />
              <h3 className="mt-3 font-display text-2xl text-maroon">
                BIS Hallmark certified gold
              </h3>
              <p className="mt-2 text-sm leading-relaxed">
                Every gold piece carries its BIS Hallmark and HUID code, so the purity you pay for
                is the purity you wear.
              </p>
            </li>
            <li className="rounded-lg border bg-card p-6">
              <IndianRupee className="h-7 w-7 text-gold" aria-hidden="true" />
              <h3 className="mt-3 font-display text-2xl text-maroon">Transparent pricing</h3>
              <p className="mt-2 text-sm leading-relaxed">
                Gold rate, making charges and taxes are shown separately on every bill. No hidden
                costs, only clarity.
              </p>
            </li>
            <li className="rounded-lg border bg-card p-6">
              <RefreshCcw className="h-7 w-7 text-gold" aria-hidden="true" />
              <h3 className="mt-3 font-display text-2xl text-maroon">Lifetime exchange</h3>
              <p className="mt-2 text-sm leading-relaxed">
                Your Indriya jewellery always holds its value.{" "}
                <Link
                  to="/lifetime-exchange"
                  className="text-maroon underline decoration-gold underline-offset-4"
                >
                  Exchange it
                </Link>{" "}
                for a new design whenever your story calls for one.
              </p>
            </li>
          </ul>
        </section>

        {/* FAQ (AEO) — native <details> keeps every answer in the server-rendered HTML */}
        <section id="faq" className="border-t py-14">
          <h2 className="font-display text-4xl text-maroon">Frequently Asked Questions</h2>
          <div className="mt-8 divide-y rounded-lg border bg-card">
            {TEMPLE_FAQS.map((f, i) => (
              <details key={f.q} className="group px-6 py-5" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="font-display text-2xl text-maroon">{f.q}</h3>
                  <span
                    className="text-2xl text-gold transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-sm">
            Want the full story behind these designs? Read our{" "}
            <Link
              to="/temple-jewellery-guide"
              className="text-maroon underline decoration-gold underline-offset-4"
            >
              Temple Jewellery Guide
            </Link>
            .
          </p>
        </section>

        {/* Visit */}
        <section className="mb-16 rounded-lg bg-maroon px-6 py-12 text-center text-ivory sm:px-12">
          <h2 className="font-display text-4xl">Visit Us This Festive Season</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-ivory/85">
            Celebrate Varalakshmi Vratham with jewellery you choose in person. Explore the temple
            collection at an Indriya store in Hyderabad, in Vijayawada or{" "}
            <Link to="/store-locator" className="text-gold underline underline-offset-4">
              near you
            </Link>
            . Our jewellery experts will help you find the piece that belongs on your puja plate.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/store-locator"
              className="inline-flex h-12 items-center rounded-full bg-gold px-7 font-medium text-maroon hover:bg-gold/90"
            >
              Find a Store Near You
            </Link>
            <Link
              to="/temple-jewellery"
              className="inline-flex h-12 items-center rounded-full border border-ivory/60 px-7 font-medium hover:bg-ivory/10"
            >
              Explore the Collection
            </Link>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}

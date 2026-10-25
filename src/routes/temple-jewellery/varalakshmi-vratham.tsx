import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Breadcrumbs, SiteShell } from "@/components/site-shell";
import { KolamDivider, ProductCard, PromiseIcon, ScriptHeading } from "@/components/brand";
import { breadcrumbLd, jsonLd, pageHead, absoluteUrl } from "@/lib/site";
import { TEMPLE_FAQS, faqPageLd } from "@/lib/faqs";
import { ANANTARA_URL, productBySlug } from "@/lib/products";
import heroImage from "@/assets/anantara/ganesha-large.webp";
import nakshiImage from "@/assets/anantara/ganesha-detail.webp";

const PATH = "/temple-jewellery/varalakshmi-vratham";
const TITLE = "Temple Jewellery for Varalakshmi Vratham | Indriya";
const DESCRIPTION =
  "Celebrate Varalakshmi Vratham with Indriya's temple jewellery: nakshi Lakshmi harams, kasu malas and antique gold. BIS Hallmark gold, lifetime exchange.";

const FEATURED = [
  "heirloom-ganesha-gold-bridal-necklace",
  "lakshmi-grace-gold-bridal-necklace",
  "swarn-gajika-gold-bridal-drop-earrings",
  "lakshmi-bottu-mala-gold-long-necklace",
].map((s) => productBySlug(s));

const SET = [
  productBySlug("heirloom-ganesha-gold-bridal-necklace"),
  productBySlug("heirloom-ganesha-gold-bridal-drop-earrings"),
];

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
        // Product schema for each featured piece. Prices change daily with the gold rate, so
        // price and availability are left out rather than copied.
        mainEntity: {
          "@type": "ItemList",
          itemListElement: FEATURED.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              name: p.name,
              description: p.description,
              image: absoluteUrl(p.image),
              url: p.indriyaUrl,
              brand: { "@type": "Brand", name: "Indriya" },
              material: "22 karat BIS Hallmark gold",
              category: "Temple jewellery",
            },
          })),
        },
      }),
    ],
  }),
  component: VaralakshmiPage,
});

const link = "text-maroon underline decoration-gold underline-offset-4";

function VaralakshmiPage() {
  return (
    <SiteShell>
      {/* Hero: text left, arch-framed jewellery right */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
              Varalakshmi Vratham Collection
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[1.08] text-ink sm:text-6xl">
              Temple Jewellery for{" "}
              <span className="font-script text-[1.25em] font-normal text-maroon">Varalakshmi</span>{" "}
              Vratham
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Welcome Varalakshmi home in gold. Every Jewel Tells a Story.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/store-locator"
                className="inline-flex h-12 items-center rounded-full bg-maroon px-7 font-medium text-ivory hover:bg-maroon/90"
              >
                Find a Store Near You
              </Link>
              <Link
                to="/temple-jewellery"
                className="inline-flex h-12 items-center rounded-full border border-maroon px-7 font-medium text-maroon hover:bg-maroon/5"
              >
                Explore the Collection
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-t-[999px] border-4 border-ivory bg-[#fbeee3] shadow-xl">
              <img
                src={heroImage}
                alt="Heirloom Ganesha 22 karat gold temple necklace with a Lord Ganesha pendant, ruby drops and pearls for Varalakshmi Vratham"
                width={900}
                height={900}
                fetchPriority="high"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
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
        <section className="mx-auto max-w-3xl py-12 text-center text-lg leading-relaxed">
          <p>
            On Varalakshmi Vratham, homes across Andhra Pradesh, Telangana and Karnataka welcome the
            Goddess of prosperity with flowers, kalasham and prayer. Our{" "}
            <strong>temple jewellery for Varalakshmi Vratham</strong> is crafted for that morning.
            Each piece carries the motifs of South India&rsquo;s temples, in gold you can pass down
            for generations. Whether you are choosing a{" "}
            <Link to="/temple-jewellery/lakshmi-haram" className={link}>
              lakshmi haram
            </Link>{" "}
            for yourself or a gift for your mother-in-law, every jewel tells a story of devotion and
            family.
          </p>
          <KolamDivider className="mt-10" />
        </section>

        {/* Featured pieces */}
        <section className="pb-16">
          <div className="text-center">
            <ScriptHeading before="Pieces for the" script="Vratham" />
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>

        {/* Craft */}
        <section className="grid gap-10 border-t border-border py-16 md:grid-cols-[2fr_1fr] md:items-center">
          <div className="space-y-8">
            <ScriptHeading before="Crafted in the Temple" script="Tradition" />
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
                <Link to="/temple-jewellery" className={link}>
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
            alt="Close-up of nakshi work on a gold temple necklace: a hand-chased deity pendant with ruby and pearl drops"
            width={368}
            height={368}
            loading="lazy"
            decoding="async"
            className="w-full rounded-t-[999px] border-4 border-sand object-cover"
          />
        </section>

        {/* Make it a set */}
        <section className="border-t border-border py-16 text-center">
          <ScriptHeading before="Make it a" script="Set" />
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Pair the Heirloom Ganesha necklace with its matching jhumkas for the full festive look.
          </p>
          <div className="mx-auto mt-10 grid max-w-3xl gap-8 sm:grid-cols-2">
            {SET.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>

        {/* Trust */}
        <section className="border-t border-border py-16">
          <div className="text-center">
            <ScriptHeading before="Gold You Can" script="Trust" />
            <p className="mx-auto mt-4 max-w-3xl leading-relaxed">
              Varalakshmi Vratham gold jewellery is an investment in your family&rsquo;s future, so
              every promise we make is clear.
            </p>
          </div>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            <li className="flex gap-4">
              <PromiseIcon kind="certified" />
              <div>
                <h3 className="font-sans text-lg font-semibold text-maroon">
                  BIS Hallmark certified gold
                </h3>
                <p className="mt-1 text-sm leading-relaxed">
                  Every gold piece carries its BIS Hallmark and HUID code, so the purity you pay for
                  is the purity you wear.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <PromiseIcon kind="pricing" />
              <div>
                <h3 className="font-sans text-lg font-semibold text-maroon">Transparent pricing</h3>
                <p className="mt-1 text-sm leading-relaxed">
                  Gold rate, making charges and taxes are shown separately on every bill. No hidden
                  costs, only clarity.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <PromiseIcon kind="exchange" />
              <div>
                <h3 className="font-sans text-lg font-semibold text-maroon">Lifetime exchange</h3>
                <p className="mt-1 text-sm leading-relaxed">
                  Your Indriya jewellery always holds its value.{" "}
                  <Link to="/lifetime-exchange" className={link}>
                    Exchange it
                  </Link>{" "}
                  for a new design whenever your story calls for one.
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* FAQ (AEO) — native <details> keeps every answer in the server-rendered HTML */}
        <section id="faq" className="border-t border-border py-16">
          <div className="text-center">
            <ScriptHeading before="Frequently Asked" script="Questions" />
          </div>
          <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
            {TEMPLE_FAQS.map((f, i) => (
              <details key={f.q} className="group px-6 py-5" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="font-sans text-lg font-medium text-ink">{f.q}</h3>
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand text-xl text-maroon transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-sm">
            Want the full story behind these designs? Read our{" "}
            <Link to="/temple-jewellery-guide" className={link}>
              Temple Jewellery Guide
            </Link>
            .
          </p>
        </section>

        {/* Visit */}
        <section className="mb-16 overflow-hidden rounded-t-[200px] bg-sand px-6 pb-12 pt-16 text-center sm:px-12">
          <ScriptHeading before="Visit Us This Festive" script="Season" />
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed">
            Celebrate Varalakshmi Vratham with jewellery you choose in person. Explore the temple
            collection at an Indriya store in Hyderabad, in Vijayawada or{" "}
            <Link to="/store-locator" className={link}>
              near you
            </Link>
            . Our jewellery experts will help you find the piece that belongs on your puja plate.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/store-locator"
              className="inline-flex h-12 items-center rounded-full bg-maroon px-7 font-medium text-ivory hover:bg-maroon/90"
            >
              Find a Store Near You
            </Link>
            <a
              href={ANANTARA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-maroon px-7 font-medium text-maroon hover:bg-maroon/5"
            >
              Shop Anantara on Indriya <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}

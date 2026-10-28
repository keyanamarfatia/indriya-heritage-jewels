import { createFileRoute, Link } from "@tanstack/react-router";
import { OffsiteLink } from "@/components/offsite";
import { SiteShell } from "@/components/site-shell";
import { AnimatedLogo } from "@/components/animated-logo";
import {
  KolamDivider,
  ProductCard,
  PromiseIcon,
  ScriptHeading,
  SectionQuestion,
} from "@/components/brand";
import { PRESS } from "@/lib/press";
import {
  all as allStats,
  avgRating,
  deityNamed,
  earrings as earringStats,
  g,
  lightestEarrings,
  listJoin,
  necklaces as necklaceStats,
  mostReviewed,
  mostReviewedShare,
  pct,
  priced,
  shortName,
  storesAtLeast48,
  rupee,
  totalReviews as reviewTotal,
} from "@/lib/anantara-stats";
import {
  GUIDE_AUTHOR,
  OFFICIAL_URL,
  SITE_NAME,
  SITE_PUBLISHED,
  SITE_UPDATED,
  PARENT_LINKS,
  SOCIAL_LINKS,
  absoluteUrl,
  authorLd,
  breadcrumbLd,
  formatDateLong,
  jsonLd,
  pageHead,
} from "@/lib/site";
import { BIS_URL, CARE_PHONE } from "@/lib/knowledge";
import {
  ANANTARA_URL,
  PRODUCTS,
  offerLd,
  pricesAsOfLabel,
  productBySlug,
  productLd,
  productSrcSet,
} from "@/lib/products";
import { STORES, storeRatingLd } from "@/lib/stores";
import { Rating } from "@/components/store-card";
import { HomeAnswers } from "@/components/home-answers";
import { GoogleReviewsPanel } from "@/components/google-reviews";
import { GOOGLE_REVIEWS } from "@/lib/reviews";
import bannerImage from "@/assets/anantara/anantara-banner.webp";
import banner640 from "@/assets/anantara/anantara-banner-640.webp";
import banner960 from "@/assets/anantara/anantara-banner-960.webp";
import banner1280 from "@/assets/anantara/anantara-banner-1280.webp";
import logoLight from "@/assets/indriya-logo-light.png";
import rcity from "@/assets/stores/r-city-mall-mumbai-1.webp";
import guide800 from "@/assets/anantara/ganesha-large-800.webp";

export const Route = createFileRoute("/")({
  head: () => {
    const base = pageHead({
      title: "Indriya Temple Jewellery — Every Jewel Tells a Story",
      description:
        "Heritage South Indian temple jewellery in BIS Hallmark gold, from Indriya's Anantara bridal collection. Explore Varalakshmi Vratham pieces and our guide.",
      path: "/",
    });
    return {
      ...base,
      meta: [
        ...base.meta,
        { name: "author", content: `${GUIDE_AUTHOR.name}, ${GUIDE_AUTHOR.role}` },
        { property: "article:published_time", content: `${SITE_PUBLISHED}T10:00:00+05:30` },
        { property: "article:modified_time", content: `${SITE_UPDATED}T17:00:00+05:30` },
        { property: "og:updated_time", content: `${SITE_UPDATED}T17:00:00+05:30` },
        { name: "date", content: SITE_PUBLISHED },
        { name: "last-modified", content: SITE_UPDATED },
      ],
      // Preload the hero banner so the largest image starts downloading immediately
      links: [
        ...base.links,
        {
          rel: "preload",
          as: "image",
          href: bannerImage,
          imageSrcSet: `${banner640} 640w, ${banner960} 960w, ${banner1280} 1280w, ${bannerImage} 1920w`,
          imageSizes: "(min-width: 768px) 72vw, 100vw",
          fetchPriority: "high",
        },
      ],
      scripts: [
        breadcrumbLd([{ name: "Home", path: "/" }]),
        // The priced pieces shown in "Temple Treasures" below, each as its own Product and
        // Offer node (linked by @id), and the Mumbai stores' Google ratings shown in "Visit a
        // store". Top-level nodes so every crawler sees them, not only ones that read nested lists.
        ...FEATURED_PRICED.map((p) => jsonLd(productLd(p))),
        ...FEATURED_PRICED.flatMap((p) => {
          const o = offerLd(p);
          return o ? [jsonLd(o)] : [];
        }),
        ...STORES.map((s) => jsonLd(storeRatingLd(s, absoluteUrl(`/store-locator/${s.slug}`)))),
        jsonLd({
          "@type": "Organization",
          name: "Indriya",
          url: OFFICIAL_URL,
          logo: absoluteUrl(logoLight),
          parentOrganization: {
            "@type": "Organization",
            name: "Aditya Birla Group",
            url: "https://www.adityabirla.com/",
            sameAs: PARENT_LINKS.map((l) => l.href),
          },
          sameAs: [
            OFFICIAL_URL,
            ...SOCIAL_LINKS.map((l) => l.href),
            "https://www.adityabirla.com/businesses/companies/indriya/",
          ],
        }),
        jsonLd({
          "@type": "WebPage",
          name: "Indriya Temple Jewellery — Every Jewel Tells a Story",
          url: absoluteUrl("/"),
          datePublished: SITE_PUBLISHED,
          dateModified: SITE_UPDATED,
          author: authorLd(),
          publisher: authorLd(),
          citation: [OFFICIAL_URL, BIS_URL],
        }),
        jsonLd({
          "@type": "WebSite",
          name: SITE_NAME,
          url: absoluteUrl("/"),
          author: authorLd(),
          publisher: authorLd(),
          potentialAction: {
            "@type": "SearchAction",
            target: `${absoluteUrl("/temple-jewellery")}?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }),
      ],
    };
  },
  component: Index,
});

const FEATURED = PRODUCTS.slice(0, 8);
const reviewStore = STORES.find((s) => s.slug === "andheri-w-mumbai")!;
const designs = GOOGLE_REVIEWS["andheri-w-mumbai"]?.topics.find((t) => t.label === "designs");
const polite = GOOGLE_REVIEWS["andheri-w-mumbai"]?.topics.find((t) => t.label === "polite staff");
const TOTAL_REVIEWS = STORES.reduce((n, s) => n + s.reviews, 0);
const FEATURED_PRICED = FEATURED.filter((p) => p.listing);
const necklaces = PRODUCTS.filter((p) => p.type === "necklace");
const earrings = PRODUCTS.filter((p) => p.type === "earrings");

function Index() {
  return (
    <SiteShell>
      {/* Hero: full-width campaign banner with our own lockup over a deep-red fade */}
      <section className="relative isolate overflow-hidden bg-maroon text-ivory">
        <img
          src={bannerImage}
          srcSet={`${banner640} 640w, ${banner960} 960w, ${banner1280} 1280w, ${bannerImage} 1920w`}
          sizes="(min-width: 768px) 72vw, 100vw"
          alt="A South Indian bride in a cream silk saree wearing Indriya Anantara gold temple jewellery, leaning on a carved wooden pillar"
          width={1920}
          height={1315}
          fetchPriority="high"
          className="relative -z-10 block h-[52vh] min-h-80 w-full object-cover object-[58%_12%] md:absolute md:inset-y-0 md:right-0 md:h-full md:min-h-0 md:w-[72%] md:object-[40%_20%]"
        />
        {/* Fade into deep red so the text reads, and the photo melts into the panel */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(max(52vh,20rem)-8rem)] -z-10 h-32 bg-gradient-to-b from-transparent to-maroon md:inset-0 md:top-0 md:h-auto md:bg-gradient-to-r md:from-maroon md:from-[30%] md:via-maroon/60 md:via-[48%] md:to-transparent md:to-[70%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-maroon/60 to-transparent"
        />

        <div className="relative mx-auto -mt-20 flex max-w-7xl px-5 pb-24 sm:px-8 md:mt-0 md:min-h-[640px] md:items-center md:py-20 lg:min-h-[78vh]">
          <div className="max-w-xl">
            <AnimatedLogo light className="h-10 opacity-90 sm:h-12" />
            <p className="mt-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#d8b878]">
              <span className="h-px w-8 bg-[#d8b878]/70" /> Presents
            </p>
            <p className="mt-3 font-script text-6xl leading-none text-[#e2c48f] sm:text-7xl">
              Anantara
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.3em] text-ivory/80">
              Bridal Temple Jewellery Collection
            </p>
            <h1 className="mt-8 font-display text-4xl font-light leading-[1.1] text-ivory sm:text-5xl">
              Every Jewel Tells a Story
            </h1>
            <p className="mt-3 font-display text-lg italic leading-snug text-[#e2c48f] sm:text-xl">
              What is the Anantara collection?
            </p>
            <p className="mt-3 max-w-md text-base font-light leading-relaxed text-ivory/80 sm:text-lg">
              Anantara is Indriya&rsquo;s bridal temple jewellery collection: {PRODUCTS.length}{" "}
              pieces ({necklaces.length} necklaces and {earrings.length} pairs of earrings) in 22
              karat gold that is 91.6% pure and BIS Hallmarked. Indriya unveiled Anantara in May
              2025 for brides in Andhra Pradesh, Telangana and Karnataka, with designs drawn from
              the Hoysala-era temples at Somanathapura. Pieces carry Lakshmi, Ganesha or Garuda
              motifs in an antique gold finish, and list from about ₹2 lakhs to over ₹46 lakhs
              depending on weight and design.
            </p>
            <ul
              className="mt-5 flex flex-wrap gap-2 text-xs text-ivory/85"
              aria-label="Anantara at a glance"
            >
              <li className="rounded-full border border-ivory/25 px-3 py-1">
                22K gold · 91.6% pure
              </li>
              <li className="rounded-full border border-ivory/25 px-3 py-1">
                {PRODUCTS.length} pieces · {necklaces.length} necklaces, {earrings.length} earrings
              </li>
              <li className="rounded-full border border-ivory/25 px-3 py-1">
                {STORES.length} Mumbai stores · {avgRating.toFixed(1)}★ on Google
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Link to="/temple-jewellery/varalakshmi-vratham" className="btn-lux-gold">
                Shop for Varalakshmi Vratham
              </Link>
              <Link to="/temple-jewellery" className="btn-lux-ghost">
                Explore the Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by category */}
      <section className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-8">
        <ScriptHeading as="p" before="Shop by" script="Category" />
        <SectionQuestion>What can you shop in the Anantara collection?</SectionQuestion>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          <strong className="font-medium text-ink">
            The Anantara collection on this site has {PRODUCTS.length} pieces: {necklaces.length}{" "}
            temple necklaces and {earrings.length} pairs of temple earrings.
          </strong>{" "}
          Every piece is 22 karat gold, which is 91.6% pure. Indriya unveiled Anantara in May 2025
          for brides in Andhra Pradesh, Telangana and Karnataka.
        </p>
        <ul className="mx-auto mt-5 grid max-w-3xl gap-3 text-left text-sm text-ink/85 sm:grid-cols-3">
          <li className="rounded-2xl border border-border bg-card px-4 py-3">
            <strong className="font-medium text-ink">Necklaces:</strong> {necklaces.length} pieces (
            {pct(necklaces.length, PRODUCTS.length)}), {g(necklaceStats.minW)} to{" "}
            {g(necklaceStats.maxW)}, {rupee(necklaceStats.lo.listing.price)} to{" "}
            {rupee(necklaceStats.hi.listing.price)}.
          </li>
          <li className="rounded-2xl border border-border bg-card px-4 py-3">
            <strong className="font-medium text-ink">Earrings:</strong> {earrings.length} pairs (
            {pct(earrings.length, PRODUCTS.length)}), {g(earringStats.minW)} to{" "}
            {g(earringStats.maxW)}, {rupee(earringStats.lo.listing.price)} to{" "}
            {rupee(earringStats.hi.listing.price)}.
          </li>
          <li className="rounded-2xl border border-border bg-card px-4 py-3">
            <strong className="font-medium text-ink">Prices:</strong> {priced.length} of{" "}
            {PRODUCTS.length} pieces ({pct(priced.length, PRODUCTS.length)}) listed, before 3% GST.
          </li>
        </ul>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Our research checked every price on indriya.com on {pricesAsOfLabel}. Gold prices change
          daily, so confirm today&rsquo;s price on indriya.com before you buy.
        </p>
        <KolamDivider className="mt-6" />
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:gap-8">
          {[
            {
              label: "Necklaces",
              href: "/temple-jewellery?type=necklace",
              p: productBySlug("heirloom-ganesha-gold-bridal-necklace"),
              count: necklaces.length,
            },
            {
              label: "Earrings",
              href: "/temple-jewellery?type=earrings",
              p: productBySlug("heirloom-ganesha-gold-bridal-drop-earrings"),
              count: earrings.length,
            },
          ].map((c) => (
            <a key={c.label} href={c.href} className="group block">
              <div className="overflow-hidden rounded-t-[999px] border border-border bg-[#efe1cd]">
                <img
                  src={c.p.image}
                  srcSet={productSrcSet(c.p)}
                  sizes="(min-width: 640px) 360px, 90vw"
                  alt={c.p.alt}
                  width={584}
                  height={584}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="mt-4 block font-display text-3xl text-maroon">{c.label}</span>
              <span className="text-sm text-muted-foreground">{c.count} temple pieces</span>
            </a>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-sand/60 py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-center">
            <ScriptHeading as="p" before="Temple" script="Treasures" />
            <SectionQuestion>Which Anantara pieces stand out?</SectionQuestion>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              Temple Treasures is our selection of {FEATURED.length} Anantara pieces. Our research
              found that {deityNamed.length} of the {PRODUCTS.length} Anantara pieces on this site (
              {pct(deityNamed.length, PRODUCTS.length)}) are named after a Hindu deity: Lord Ganesha
              (also called Vinayaka), Goddess Lakshmi, Lord Vishnu or Garuda. The {allStats.hi.name}{" "}
              is the heaviest and most expensive piece at {g(allStats.hi.listing.grossWeightG)} and{" "}
              {rupee(allStats.hi.listing.price)}, while the {lightestEarrings?.name} are the
              lightest piece with a listed weight, at{" "}
              {lightestEarrings ? g(lightestEarrings.listing.grossWeightG) : ""}. Tap any piece to
              see its details and its page on indriya.com.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4">
            {FEATURED.map((p) => (
              <ProductCard key={p.slug} product={p} headingLevel="p" compact />
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Approximate prices excluding taxes, as listed on indriya.com on {pricesAsOfLabel}.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/temple-jewellery" className="btn-lux">
              View all 12 pieces
            </Link>
            <OffsiteLink href={ANANTARA_URL} variant="button">
              Anantara on indriya.com
            </OffsiteLink>
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="text-center">
          <ScriptHeading as="p" before="The Indriya" script="Promise" />
          <SectionQuestion>What does the Indriya promise include?</SectionQuestion>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            The Indriya promise is three guarantees on every gold piece: BIS Hallmark certified
            purity, a bill that shows the gold rate, making charges and taxes separately, and
            lifetime exchange at any Indriya store. According to the Bureau of Indian Standards,
            hallmarking of gold jewellery became mandatory in India on 16 June 2021, starting in 256
            districts, and every hallmark carries a 6-character HUID code. A 22K916 hallmark means
            the gold is 91.6% pure. In India, gold jewellery also carries 3% GST, which Indriya
            lists on the bill.
          </p>
        </div>
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            {
              kind: "certified" as const,
              title: "BIS Hallmark gold",
              text: "Every gold piece carries its BIS Hallmark and HUID code.",
            },
            {
              kind: "pricing" as const,
              title: "Transparent pricing",
              text: "Gold rate, making charges and taxes shown separately on every bill.",
            },
            {
              kind: "exchange" as const,
              title: "Lifetime exchange",
              text: "Exchange your Indriya jewellery for a new design, whenever you like.",
            },
          ].map((x) => (
            <li key={x.title} className="flex gap-4">
              <PromiseIcon kind={x.kind} />
              <div>
                <p className="font-sans text-lg font-semibold text-maroon">{x.title}</p>
                <p className="mt-1 text-sm leading-relaxed">{x.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Guide + stores */}
      <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-20 sm:px-8 md:grid-cols-2">
        <Link
          to="/temple-jewellery-guide"
          className="group flex flex-col overflow-hidden rounded-2xl bg-sand"
        >
          <div className="relative min-h-64 flex-1 overflow-hidden">
            <img
              src={guide800}
              alt="Heirloom Ganesha gold temple necklace from the Anantara collection"
              width={800}
              height={800}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div className="p-8">
            <p className="eyebrow">Read the Temple Jewellery Guide</p>
            <h2 className="mt-3 font-display text-3xl text-ink">
              What does the Temple Jewellery Guide cover?
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              <strong className="font-medium text-ink">
                The Temple Jewellery Guide is a 6-minute read answering 5 questions about South
                Indian temple jewellery.
              </strong>{" "}
              It covers what temple jewellery is, where it comes from (Tamil Nadu, under the Chola
              and Pandya dynasties), what the Lakshmi, peacock, lotus and Ganesha motifs mean, a
              6-step routine for cleaning and storing it, and how to tell real BIS Hallmarked gold
              from plated fashion jewellery.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink/80">
              <li>History: the Chola and Pandya dynasties of Tamil Nadu, 9th to 13th centuries.</li>
              <li>Designs: 6 motifs, from Goddess Lakshmi to the peacock and the lotus.</li>
              <li>Care: 6 steps to clean and store temple jewellery.</li>
              <li>Purity: the 3 marks of a BIS hallmark, such as 22K916 (91.6% pure gold).</li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Our research for the guide drew on the Bureau of Indian Standards and indriya.com. The
              guide was published on {formatDateLong(SITE_PUBLISHED)}.
            </p>
            <span className="mt-5 inline-block text-maroon underline decoration-gold underline-offset-4">
              Read the guide
            </span>
          </div>
        </Link>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <Link to="/store-locator" className="block">
            <img
              src={rcity}
              alt="Inside the Indriya jewellery store at R City Mall, Mumbai, with its blue deer sculpture"
              width={710}
              height={543}
              loading="lazy"
              className="aspect-[16/9] w-full object-cover"
            />
          </Link>
          <div className="p-8 pt-6">
            <p className="eyebrow">Visit a store</p>
            <h2 className="mt-3 font-display text-3xl text-ink">
              <Link to="/store-locator" className="hover:text-maroon">
                Where are Indriya&rsquo;s stores in Mumbai?
              </Link>
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              <strong className="font-medium text-ink">
                Indriya has {STORES.length} stores in Mumbai, rated {avgRating.toFixed(1)} out of 5
                on Google
              </strong>
              , in {listJoin(STORES.map((s) => s.area.replace(", Navi Mumbai", " (Navi Mumbai)")))}.
              Every Mumbai store opens at 11:00 AM; closing time varies by store from 9:00 PM to
              11:00 PM. Each store sells Indriya&rsquo;s full range, including the Anantara bridal
              collection, and offers lifetime exchange on gold jewellery at the day&rsquo;s gold
              rate.
            </p>
            <ul className="mt-5 divide-y divide-border border-y border-border">
              {STORES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/store-locator/$slug"
                    params={{ slug: s.slug }}
                    className="flex items-center justify-between gap-3 py-2.5 text-sm text-ink hover:text-maroon"
                  >
                    <span className="min-w-0">{s.name.replace(", Mumbai", "")}</span>
                    <Rating store={s} className="shrink-0 !text-xs" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Our research found that all {STORES.length} stores (
              {pct(storesAtLeast48, STORES.length)}) are rated 4.8 stars or higher, from{" "}
              {reviewTotal.toLocaleString("en-IN")} Google reviews. The{" "}
              {shortName(mostReviewed.name)} store holds {mostReviewedShare} of those reviews, and 2
              of the {STORES.length} stores (33%) offer a bridal studio.
            </p>
            <Link
              to="/store-locator"
              className="mt-5 inline-block text-maroon underline decoration-gold underline-offset-4"
            >
              Find a store
            </Link>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Indriya+jewellery+store+Mumbai"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-5 inline-block text-sm text-ink/70 underline decoration-dotted underline-offset-4 hover:text-maroon"
            >
              Read the reviews on Google ↗
            </a>
          </div>
        </div>
      </section>
      {/* Real Google reviews */}
      <section className="border-t border-border bg-sand/40 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <div>
            <p className="eyebrow">Google reviews</p>
            <h2 className="mt-3 font-display text-4xl font-light leading-tight text-ink">
              What do customers say about Indriya?
            </h2>
            <p className="mt-4 leading-relaxed text-ink/85">
              Customers rate Indriya&rsquo;s {shortName(reviewStore.name)} store{" "}
              {reviewStore.rating.toFixed(1)} out of 5 across {reviewStore.reviews} Google reviews.
              Our research of Google&rsquo;s review topics found that &ldquo;designs&rdquo; comes up
              in {designs?.count} reviews ({pct(designs?.count ?? 0, reviewStore.reviews)}) and
              &ldquo;polite staff&rdquo; in {polite?.count} reviews (
              {pct(polite?.count ?? 0, reviewStore.reviews)}).
            </p>
            <p className="mt-3 leading-relaxed text-ink/85">
              Across all {STORES.length} Mumbai stores, Indriya averages {avgRating.toFixed(1)}{" "}
              stars from {reviewTotal.toLocaleString("en-IN")} Google reviews. Every store page on
              this site links to its Google reviews, and the Borivali West and Seawoods stores are
              also reviewed on Justdial.
            </p>
          </div>
          <GoogleReviewsPanel store={reviewStore} />
        </div>
      </section>

      <HomeAnswers />

      {/* About this site: who made it, when, and where the facts come from (E-E-A-T) */}
      <section className="border-t border-border bg-sand/50">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="eyebrow">About this site</p>
            <h2 className="mt-3 font-display text-3xl leading-snug text-ink">
              Who made this site?
            </h2>
            <p className="mt-3 font-display text-xl leading-snug text-ink">
              This site is curated by{" "}
              <a
                href="/about"
                rel="author"
                className="text-maroon underline decoration-gold underline-offset-4"
              >
                {GUIDE_AUTHOR.name}
              </a>
              , {GUIDE_AUTHOR.role}.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink/85">
              Indriya Temple Jewellery is a student project by BBA Marketing students at Atlas
              SkillTech University, Mumbai, built for a Digital Marketing course on SEO, AEO and
              GEO. We researched what people ask Google about temple jewellery, compared
              Indriya&rsquo;s listings and store ratings ourselves, and built every page to answer
              those questions. Our credentials and research:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink/85">
              <li>
                Our research covered {PRODUCTS.length} Anantara pieces, {STORES.length} stores and{" "}
                {PRESS.length} press articles.
              </li>
              <li>
                {priced.length} of {PRODUCTS.length} pieces ({pct(priced.length, PRODUCTS.length)})
                carry a price checked on indriya.com on {pricesAsOfLabel}.
              </li>
              <li>
                Purity facts follow the Bureau of Indian Standards: 22K916 gold is 91.6% pure.
              </li>
            </ul>
            <ul
              className="mt-4 flex flex-wrap gap-2 text-xs"
              aria-label="Why shoppers trust Indriya"
            >
              <li className="rounded-full border border-gold/40 bg-card px-3 py-1.5">
                ★ 4.8 average from {TOTAL_REVIEWS.toLocaleString("en-IN")} Google reviews
              </li>
              <li className="rounded-full border border-gold/40 bg-card px-3 py-1.5">
                BIS Hallmark certified gold
              </li>
              <li className="rounded-full border border-gold/40 bg-card px-3 py-1.5">
                <a href="/lifetime-exchange" className="hover:text-maroon">
                  Lifetime exchange policy
                </a>
              </li>
              <li className="rounded-full border border-gold/40 bg-card px-3 py-1.5">
                Backed by the Aditya Birla Group
              </li>
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Published:{" "}
              <time dateTime={`${SITE_PUBLISHED}T10:00:00+05:30`}>
                {formatDateLong(SITE_PUBLISHED)}
              </time>{" "}
              · Last updated:{" "}
              <time dateTime={`${SITE_UPDATED}T17:00:00+05:30`}>
                {formatDateLong(SITE_UPDATED)}
              </time>{" "}
              ·{" "}
              <a href="/about#sources" className="underline underline-offset-4 hover:text-maroon">
                Sources
              </a>{" "}
              ·{" "}
              <a href="/press" className="underline underline-offset-4 hover:text-maroon">
                Press
              </a>{" "}
              ·{" "}
              <a href="/privacy-policy" className="underline underline-offset-4 hover:text-maroon">
                Privacy policy
              </a>{" "}
              ·{" "}
              <a href="/terms" className="underline underline-offset-4 hover:text-maroon">
                Terms of use
              </a>
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 text-sm">
            <p className="eyebrow">Contact Indriya</p>
            <a
              href={`tel:${CARE_PHONE.replace(/-/g, "")}`}
              className="mt-3 block font-display text-2xl text-maroon lining-nums hover:text-gold-deep"
            >
              {CARE_PHONE}
            </a>
            <p className="text-muted-foreground">Customer care, toll free</p>
            <address className="mt-3 not-italic leading-relaxed text-ink/85">
              One International Centre, Dadar West, Mumbai 400012
            </address>
            <a
              href="/about"
              className="mt-4 inline-block text-maroon underline decoration-gold underline-offset-4"
            >
              About this project
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

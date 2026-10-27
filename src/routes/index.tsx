import { createFileRoute, Link } from "@tanstack/react-router";
import { OffsiteLink } from "@/components/offsite";
import { SiteShell } from "@/components/site-shell";
import { AnimatedLogo } from "@/components/animated-logo";
import { KolamDivider, ProductCard, PromiseIcon, ScriptHeading } from "@/components/brand";
import {
  GUIDE_AUTHOR,
  OFFICIAL_URL,
  SITE_NAME,
  SITE_PUBLISHED,
  SITE_UPDATED,
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
          parentOrganization: { "@type": "Organization", name: "Aditya Birla Group" },
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
            <p className="mt-4 max-w-md text-base font-light leading-relaxed text-ivory/80 sm:text-lg">
              Be the bride of your dreams, adorned in divine heritage: hand-finished temple gold
              with Lakshmi, Ganesha and Garuda motifs.
            </p>
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
        <ScriptHeading before="Shop by" script="Category" />
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
            <ScriptHeading before="Temple" script="Treasures" />
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A first look at the Anantara collection. Tap any piece to see it, and its price, on
              Indriya.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4">
            {FEATURED.map((p) => (
              <ProductCard key={p.slug} product={p} />
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
          <ScriptHeading before="The Indriya" script="Promise" />
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            The Indriya promise covers every gold piece with three guarantees: BIS Hallmark
            certified purity, a bill that shows the gold rate, making charges and taxes separately,
            and lifetime exchange at any Indriya store.
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
                <h3 className="font-sans text-lg font-semibold text-maroon">{x.title}</h3>
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
            <p className="eyebrow">Read</p>
            <h2 className="mt-3 font-display text-3xl text-ink">The Temple Jewellery Guide</h2>
            <p className="mt-3 text-muted-foreground">
              Where temple jewellery comes from, what Lakshmi, peacock and lotus motifs mean, and
              how to care for it.
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
            <h2 className="font-display text-3xl text-ink">
              <Link to="/store-locator" className="hover:text-maroon">
                Visit a store
              </Link>
            </h2>
            <p className="mt-2 text-muted-foreground">
              Six stores in Mumbai, plus Hyderabad, Vijayawada and more.
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
      <HomeAnswers />

      {/* About this site: who made it, when, and where the facts come from (E-E-A-T) */}
      <section className="border-t border-border bg-sand/50">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="eyebrow">About this site</p>
            <p className="mt-3 font-display text-2xl leading-snug text-ink">
              Curated by{" "}
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
              Our credentials: we are BBA Marketing students at Atlas SkillTech University, Mumbai,
              and built this site for our Digital Marketing course on SEO, AEO and GEO. We
              researched what people ask Google about temple jewellery and wrote every page to
              answer it. Product details and prices are sourced from indriya.com; according to the
              Bureau of Indian Standards, every hallmarked piece carries a BIS logo, purity grade
              and HUID code.
            </p>
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

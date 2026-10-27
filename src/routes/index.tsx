import { createFileRoute, Link } from "@tanstack/react-router";
import { OffsiteLink } from "@/components/offsite";
import { SiteShell } from "@/components/site-shell";
import { AnimatedLogo } from "@/components/animated-logo";
import { KolamDivider, ProductCard, PromiseIcon, ScriptHeading } from "@/components/brand";
import { OFFICIAL_URL, SITE_NAME, absoluteUrl, breadcrumbLd, jsonLd, pageHead } from "@/lib/site";
import {
  ANANTARA_URL,
  PRODUCTS,
  pricesAsOfLabel,
  productBySlug,
  productOfferLd,
  productPath,
  productSrcSet,
} from "@/lib/products";
import { STORES, storeLd } from "@/lib/stores";
import { Rating } from "@/components/store-card";
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
        // The priced pieces shown in "Temple Treasures" below, with indriya.com's listed price.
        jsonLd({
          "@type": "ItemList",
          name: "Anantara temple jewellery",
          itemListElement: FEATURED_PRICED.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              name: p.name,
              description: p.description,
              image: absoluteUrl(p.image),
              url: absoluteUrl(productPath(p)),
              brand: { "@type": "Brand", name: "Indriya" },
              material: "22 karat BIS Hallmark gold",
              category: "Temple jewellery",
              ...productOfferLd(p),
            },
          })),
        }),
        // The Mumbai stores listed in "Visit a store", with their Google ratings (shown there).
        jsonLd({
          "@type": "ItemList",
          name: "Indriya stores in Mumbai",
          itemListElement: STORES.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: storeLd(s, absoluteUrl(`/store-locator/${s.slug}`)),
          })),
        }),
        jsonLd({
          "@type": "Organization",
          name: "Indriya",
          url: OFFICIAL_URL,
          logo: absoluteUrl(logoLight),
          parentOrganization: { "@type": "Organization", name: "Aditya Birla Group" },
          sameAs: [OFFICIAL_URL],
        }),
        jsonLd({
          "@type": "WebSite",
          name: SITE_NAME,
          url: absoluteUrl("/"),
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
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

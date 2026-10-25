import { createFileRoute, Link } from "@tanstack/react-router";
import { OffsiteLink } from "@/components/offsite";
import { SiteShell } from "@/components/site-shell";
import { KolamDivider, ProductCard, PromiseIcon, ScriptHeading } from "@/components/brand";
import { pageHead } from "@/lib/site";
import { ANANTARA_URL, PRODUCTS, productBySlug } from "@/lib/products";
import bannerImage from "@/assets/anantara/anantara-banner.webp";
import logoLight from "@/assets/indriya-logo-light.png";
import rcity from "@/assets/stores/r-city-mall-mumbai-1.webp";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Indriya Temple Jewellery — Every Jewel Tells a Story",
      description:
        "Heritage South Indian temple jewellery in BIS Hallmark gold, from Indriya's Anantara bridal collection. Explore Varalakshmi Vratham pieces and our guide.",
      path: "/",
    }),
  component: Index,
});

const necklaces = PRODUCTS.filter((p) => p.type === "necklace");
const earrings = PRODUCTS.filter((p) => p.type === "earrings");

function Index() {
  return (
    <SiteShell>
      {/* Hero: full-width campaign banner with our own lockup over a deep-red fade */}
      <section className="relative isolate overflow-hidden bg-maroon text-ivory">
        <img
          src={bannerImage}
          alt="A South Indian bride in a cream silk saree wearing Indriya Anantara gold temple jewellery, leaning on a carved wooden pillar"
          width={1353}
          height={926}
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
            <img
              src={logoLight}
              alt=""
              aria-hidden="true"
              width={274}
              height={79}
              className="h-10 w-auto opacity-90 sm:h-12"
            />
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
            {PRODUCTS.slice(0, 8).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
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
        <Link to="/temple-jewellery-guide" className="group rounded-2xl bg-sand p-8">
          <p className="eyebrow">Read</p>
          <h2 className="mt-3 font-display text-3xl text-ink">The Temple Jewellery Guide</h2>
          <p className="mt-3 text-muted-foreground">
            Where temple jewellery comes from, what Lakshmi, peacock and lotus motifs mean, and how
            to care for it.
          </p>
          <span className="mt-5 inline-block text-maroon underline decoration-gold underline-offset-4">
            Read the guide
          </span>
        </Link>
        <Link
          to="/store-locator"
          className="group overflow-hidden rounded-2xl border border-border bg-card"
        >
          <img
            src={rcity}
            alt="Inside the Indriya jewellery store at R City Mall, Mumbai, with its blue deer sculpture"
            width={710}
            height={543}
            loading="lazy"
            className="aspect-[16/9] w-full object-cover"
          />
          <div className="p-8 pt-6">
            <h2 className="font-display text-3xl text-ink">Visit a store</h2>
            <p className="mt-2 text-muted-foreground">
              Six stores in Mumbai, plus Hyderabad, Vijayawada and more.
            </p>
            <span className="mt-4 inline-block text-maroon underline decoration-gold underline-offset-4">
              Find a store
            </span>
          </div>
        </Link>
      </section>
    </SiteShell>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { KolamDivider, ProductCard, PromiseIcon, ScriptHeading } from "@/components/brand";
import { pageHead } from "@/lib/site";
import { ANANTARA_URL, PRODUCTS, productBySlug } from "@/lib/products";
import brideImage from "@/assets/anantara/anantara-bride.webp";
import rcity from "@/assets/stores/rcity.webp";

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
      {/* Hero: arch-framed campaign photo with our own headline */}
      <section className="relative overflow-hidden bg-sand">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
              Anantara · Bridal Temple Jewellery
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] text-ink sm:text-7xl">
              Every <span className="font-script text-[1.3em] font-normal text-maroon">Jewel</span>{" "}
              Tells a Story
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              South Indian temple jewellery in BIS Hallmark gold, shaped by hand with Lakshmi,
              Ganesha and Garuda motifs for brides and festive mornings.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/temple-jewellery/varalakshmi-vratham"
                className="inline-flex h-12 items-center rounded-full bg-maroon px-7 font-medium text-ivory hover:bg-maroon/90"
              >
                Shop the Varalakshmi Collection
              </Link>
              <Link
                to="/temple-jewellery"
                className="inline-flex h-12 items-center rounded-full border border-maroon px-7 font-medium text-maroon hover:bg-maroon/5"
              >
                Explore Temple Jewellery
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-t-[999px] border-4 border-ivory shadow-xl">
              <img
                src={brideImage}
                alt="A South Indian bride in a cream silk saree wearing Indriya Anantara gold temple jewellery: layered necklaces, a waist belt and a maang tikka"
                width={900}
                height={834}
                fetchPriority="high"
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shop by category */}
      <section className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-8">
        <ScriptHeading before="Shop by" script="Category" />
        <KolamDivider className="mt-6" />
        <div className="mx-auto mt-10 grid max-w-3xl gap-8 sm:grid-cols-2">
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
              <div className="overflow-hidden rounded-t-[999px] border border-border bg-[#fbeee3]">
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
          <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.slice(0, 8).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/temple-jewellery"
              className="inline-flex h-12 items-center rounded-full bg-maroon px-7 font-medium text-ivory hover:bg-maroon/90"
            >
              View all 12 pieces
            </Link>
            <a
              href={ANANTARA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-maroon px-7 font-medium text-maroon hover:bg-maroon/5"
            >
              Anantara on Indriya <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
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
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">Read</p>
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
            width={900}
            height={336}
            loading="lazy"
            className="aspect-[3/1] w-full object-cover"
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

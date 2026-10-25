import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Star } from "lucide-react";
import { Breadcrumbs, SiteShell } from "@/components/site-shell";
import { KolamDivider, ScriptHeading } from "@/components/brand";
import { StoreCard } from "@/components/store-card";
import { absoluteUrl, breadcrumbLd, jsonLd, pageHead } from "@/lib/site";
import { STORES, STORES_URL, coverOf } from "@/lib/stores";

const PATH = "/store-locator";

// Other cities with Indriya stores. Addresses are on the official locator.
const OTHER_CITIES = [
  "Hyderabad",
  "Vijayawada",
  "Bengaluru",
  "New Delhi",
  "Kolkata",
  "Jaipur",
  "Lucknow",
  "Indore",
  "Pune",
  "Ahmedabad",
  "Surat",
  "Patna",
];

export const Route = createFileRoute("/store-locator/")({
  head: () => ({
    ...pageHead({
      title: "Indriya Stores in Mumbai and Across India | Store Locator",
      description:
        "Find Indriya jewellery stores in Mumbai with full addresses, hours and phone numbers, and get directions on Google Maps. See every city on Indriya.",
      path: PATH,
    }),
    scripts: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Store Locator", path: PATH },
      ]),
      jsonLd({
        "@type": "ItemList",
        name: "Indriya stores in Mumbai",
        itemListElement: STORES.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(`${PATH}/${s.slug}`),
          name: `Indriya – ${s.name}`,
          image: absoluteUrl(coverOf(s).src),
        })),
      }),
    ],
  }),
  component: StoreLocatorPage,
});

function StoreLocatorPage() {
  return (
    <SiteShell>
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-5 py-12 text-center sm:px-8">
          <h1 className="font-display text-5xl text-ink sm:text-6xl">
            Indriya in your{" "}
            <span className="font-script text-[1.25em] font-normal text-gold">city</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            See the temple jewellery collection in person. Find a store, get directions, or open its
            page for the map, hours and services.
          </p>
          <a href={STORES_URL} target="_blank" rel="noopener noreferrer" className="btn-lux mt-6">
            Official Indriya store locator <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <KolamDivider className="mt-8" />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Store Locator" }]} />
          <p className="text-sm text-muted-foreground">Showing {STORES.length} stores in Mumbai</p>
        </div>

        <section className="mt-10">
          <div className="text-center">
            <ScriptHeading before="Indriya stores in" script="Mumbai" />
          </div>
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {STORES.map((s) => (
              <li key={s.slug}>
                <StoreCard store={s} />
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20">
          <div className="text-center">
            <ScriptHeading before="More" script="cities" />
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Our temple jewellery stores in Hyderabad and Vijayawada carry the Varalakshmi Vratham
              range. Find addresses for every city on the official Indriya store locator.
            </p>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {OTHER_CITIES.map((city) => (
              <li key={city}>
                <a
                  href={STORES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 rounded-full border border-border bg-card px-5 py-3.5 transition-colors hover:border-maroon"
                >
                  <span className="font-display text-xl text-maroon">{city}</span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 text-gold" aria-hidden="true" /> Store details, ratings and
            photos as listed on indriya.com, October 2026.
          </p>
        </section>
      </div>
    </SiteShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Breadcrumbs, SiteShell } from "@/components/site-shell";
import { breadcrumbLd, pageHead } from "@/lib/site";

const PATH = "/store-locator";

export const Route = createFileRoute("/store-locator")({
  head: () => ({
    ...pageHead({
      title: "Indriya Store Locator: Hyderabad, Vijayawada and More",
      description:
        "Find an Indriya jewellery store near you in Hyderabad, Vijayawada and other Indian cities, and see the temple jewellery collection in person.",
      path: PATH,
    }),
    scripts: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Store Locator", path: PATH },
      ]),
    ],
  }),
  component: StoreLocatorPage,
});

// Cities listed on the Aditya Birla Group's Indriya page. South India first for the Varalakshmi campaign.
const CITIES = [
  "Hyderabad",
  "Vijayawada",
  "Mumbai",
  "Pune",
  "New Delhi",
  "Ahmedabad",
  "Surat",
  "Jaipur",
  "Indore",
  "Lucknow",
  "Patna",
  "Bhubaneswar",
];

const mapsUrl = (city: string) =>
  `https://www.google.com/maps/search/${encodeURIComponent(`Indriya jewellery store ${city}`)}`;

function StoreLocatorPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Store Locator" }]} />
        <h1 className="mt-6 font-display text-5xl text-maroon">Find an Indriya Store</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed">
          See the temple jewellery collection in person. Our temple jewellery stores in Hyderabad
          and Vijayawada carry the Varalakshmi Vratham range.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CITIES.map((city) => (
            <li key={city}>
              <a
                href={mapsUrl(city)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border bg-card p-5 transition-colors hover:border-gold"
              >
                <MapPin className="h-5 w-5 text-gold" aria-hidden="true" />
                <span>
                  <span className="block font-display text-2xl text-maroon">{city}</span>
                  <span className="text-sm text-muted-foreground">
                    Get directions on Google Maps
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </SiteShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Clock, ExternalLink, MapPin, Navigation, Phone, Star } from "lucide-react";
import { Breadcrumbs, SiteShell } from "@/components/site-shell";
import { KolamDivider, ScriptHeading } from "@/components/brand";
import { OFFICIAL_URL, breadcrumbLd, jsonLd, pageHead } from "@/lib/site";
import andheri from "@/assets/stores/andheri.webp";
import rcity from "@/assets/stores/rcity.webp";
import nexus from "@/assets/stores/nexus.webp";
import phoenix from "@/assets/stores/phoenix.webp";

const PATH = "/store-locator";
const STORES_URL = `${OFFICIAL_URL}jewellery-stores`;

type Store = {
  name: string;
  area: string;
  address: string;
  hours: string;
  phone: string;
  services: string[];
  photo?: string;
  flagship?: boolean;
  /** Store page on indriya.com when known, else the Mumbai list. */
  detailsUrl: string;
};

// Mumbai stores as listed on indriya.com/jewellery-stores/mumbai (October 2026).
const MUMBAI: Store[] = [
  {
    name: "Borivali (W), Mumbai",
    area: "Borivali West",
    address:
      "Ground & 1st Floor, Solitaire Business Centre, Opp. Ajanta Talkies, Gulmohar Rd, Market Road, Borivali West, Mumbai, Maharashtra - 400092",
    hours: "11:00 AM to 9:00 PM",
    phone: "08037837978",
    services: ["In-house stylist", "Bridal Studio", "Design Customization"],
    flagship: true,
    detailsUrl: `${STORES_URL}/mumbai`,
  },
  {
    name: "Andheri (W), Mumbai",
    area: "Andheri West",
    address:
      "Esquina Private Residences, New Link Road, Oshiwara, Andheri West, Mumbai, Maharashtra - 400102",
    hours: "11:00 AM to 9:00 PM",
    phone: "08071500067",
    services: ["In-house stylist", "Bridal Studio", "Design Customization"],
    photo: andheri,
    detailsUrl: `${STORES_URL}/mumbai`,
  },
  {
    name: "R City Mall, Mumbai",
    area: "Ghatkopar West",
    address: "R City, LBS Marg, Amrut Nagar, Ghatkopar West, Mumbai, Maharashtra - 400086",
    hours: "11:00 AM to 9:30 PM",
    phone: "08037241114",
    services: ["In-house stylist", "Design Customization"],
    photo: rcity,
    detailsUrl: `${STORES_URL}/mumbai/r-city-mall-mumbai`,
  },
  {
    name: "Sky City Mall, Mumbai",
    area: "Borivali East",
    address:
      "1st Floor, F-40, Sky City Mall, Western Express Highway, Borivali East, Mumbai, Maharashtra - 400066",
    hours: "11:00 AM to 11:00 PM",
    phone: "08071500068",
    services: ["In-house stylist", "Design Customization"],
    detailsUrl: `${STORES_URL}/mumbai`,
  },
  {
    name: "Nexus Seawoods Mall, Mumbai",
    area: "Seawoods, Navi Mumbai",
    address:
      "Upper Ground Floor-3, Nexus Seawoods Mall, Sector 40, Nerul East, Navi Mumbai, Seawoods, Maharashtra - 400706",
    hours: "11:00 AM to 9:30 PM",
    phone: "08037241116",
    services: ["In-house stylist", "Design Customization"],
    photo: nexus,
    detailsUrl: `${STORES_URL}/mumbai`,
  },
  {
    name: "Phoenix Marketcity, Kurla",
    area: "Kurla West",
    address:
      "Ground Floor, Phoenix Market City, Patelwadi, Lal Bahadur Shastri Marg, Kurla West, Mumbai, Maharashtra - 400070",
    hours: "11:00 AM to 9:00 PM",
    phone: "1800-210-8383",
    services: [],
    photo: phoenix,
    detailsUrl: `${STORES_URL}/mumbai`,
  },
];

// Other cities with Indriya stores (Aditya Birla Group / indriya.com). Addresses are on the official locator.
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

const mapsUrl = (s: Store) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Indriya ${s.name}, ${s.address}`)}`;

export const Route = createFileRoute("/store-locator")({
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
      ...MUMBAI.map((s) =>
        jsonLd({
          "@type": "JewelryStore",
          name: `Indriya – ${s.name}`,
          address: s.address,
          telephone: s.phone,
          openingHours: s.hours,
          url: s.detailsUrl,
          brand: { "@type": "Brand", name: "Indriya" },
        }),
      ),
    ],
  }),
  component: StoreLocatorPage,
});

function StoreCard({ store }: { store: Store }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative">
        {store.photo ? (
          <img
            src={store.photo}
            alt={`Inside the Indriya jewellery store at ${store.name}`}
            width={900}
            height={300}
            loading="lazy"
            decoding="async"
            className="aspect-[3/1] w-full object-cover"
          />
        ) : (
          <div
            className="flex aspect-[3/1] w-full items-center justify-center bg-sand"
            aria-hidden="true"
          >
            <MapPin className="h-10 w-10 text-terracotta" />
          </div>
        )}
        {store.flagship && (
          <span className="absolute left-0 top-4 bg-maroon px-4 py-1.5 text-sm font-medium text-ivory">
            Flagship Store
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-sans text-xl font-semibold text-ink">{store.name}</h3>
        <p className="text-sm text-terracotta">{store.area}</p>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex gap-3">
            <dt className="sr-only">Address</dt>
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-maroon" aria-hidden="true" />
            <dd>{store.address}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="sr-only">Hours</dt>
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-maroon" aria-hidden="true" />
            <dd>{store.hours}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="sr-only">Phone</dt>
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-maroon" aria-hidden="true" />
            <dd>
              <a
                href={`tel:${store.phone.replace(/-/g, "")}`}
                className="text-maroon underline underline-offset-2"
              >
                {store.phone}
              </a>
            </dd>
          </div>
        </dl>
        {store.services.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {store.services.map((s) => (
              <li
                key={s}
                className="rounded-full border border-border bg-sand px-3 py-1 text-xs text-ink"
              >
                {s}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 flex flex-wrap gap-3 pt-2">
          <a
            href={mapsUrl(store)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lux flex-1"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" /> Open in Google Maps
          </a>
          <a
            href={store.detailsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lux-outline"
          >
            Store page on Indriya <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </li>
  );
}

function StoreLocatorPage() {
  return (
    <SiteShell>
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-5 py-12 text-center sm:px-8">
          <h1 className="font-display text-5xl text-ink sm:text-6xl">
            Indriya in your{" "}
            <span className="font-script text-[1.25em] font-normal text-maroon">city</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            See the temple jewellery collection in person. Read each store&rsquo;s address and hours
            here, then open it in Google Maps for directions.
          </p>
          <a href={STORES_URL} target="_blank" rel="noopener noreferrer" className="btn-lux mt-6">
            Open the official Indriya store locator{" "}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <KolamDivider className="mt-8" />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Store Locator" }]} />

        <section className="mt-8">
          <div className="text-center">
            <ScriptHeading before="Indriya stores in" script="Mumbai" />
            <p className="mt-3 text-muted-foreground">Showing 6 stores in Mumbai</p>
          </div>
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {MUMBAI.map((s) => (
              <StoreCard key={s.name} store={s} />
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
                  className="flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-maroon"
                >
                  <span className="font-display text-xl text-maroon">{city}</span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 text-gold" aria-hidden="true" /> Store details as listed on
            indriya.com, October 2026.
          </p>
        </section>
      </div>
    </SiteShell>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { OffsiteLink } from "@/components/offsite";
import {
  Clock,
  Gem,
  Languages,
  MapPin,
  Navigation,
  Palette,
  Phone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumbs, SiteShell } from "@/components/site-shell";
import { ScriptHeading } from "@/components/brand";
import { Rating, StoreCard } from "@/components/store-card";
import { absoluteUrl, breadcrumbLd, jsonLd, pageHead } from "@/lib/site";
import {
  STORES,
  STORE_PHOTO_SIZE,
  coverOf,
  directionsUrl,
  mapEmbedUrl,
  officialStoreUrl,
  storeBySlug,
  telHref,
  type Store,
} from "@/lib/stores";

const SERVICE_INFO: Record<string, { icon: LucideIcon; text: string }> = {
  "In-house stylist": { icon: Sparkles, text: "Personal styling to pair pieces with your outfit." },
  "Bridal Studio": { icon: Gem, text: "A private space to plan your bridal trousseau." },
  "Design Customization": { icon: Palette, text: "Adapt a design, or create one of your own." },
};

export const Route = createFileRoute("/store-locator/$slug")({
  loader: ({ params }) => {
    const store = storeBySlug(params.slug);
    if (!store) throw notFound();
    return { store };
  },
  head: ({ loaderData }) => {
    const store = loaderData?.store;
    if (!store) return {};
    const path = `/store-locator/${store.slug}`;
    return {
      ...pageHead({
        title: `Indriya ${store.name} | Store Address, Hours & Directions`,
        description: `Visit Indriya ${store.name} in ${store.area}: ${store.address}. Open ${store.hours}. Get directions and call the store.`,
        path,
        image: absoluteUrl(coverOf(store).src),
      }),
      scripts: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Store Locator", path: "/store-locator" },
          { name: store.name, path },
        ]),
        jsonLd({
          "@type": "JewelryStore",
          name: `Indriya – ${store.name}`,
          image: store.gallery.map((g) => absoluteUrl(g.src)),
          address: {
            "@type": "PostalAddress",
            streetAddress: store.address,
            addressRegion: "Maharashtra",
            addressCountry: "IN",
          },
          telephone: store.phone,
          openingHours: store.hours,
          url: absoluteUrl(path),
          sameAs: officialStoreUrl(store),
          brand: { "@type": "Brand", name: "Indriya" },
        }),
      ],
    };
  },
  component: StorePage,
});

function StorePage() {
  const { store } = Route.useLoaderData();
  const [main, ...rest] = [coverOf(store), ...store.gallery.filter((g) => g !== coverOf(store))];
  const others = STORES.filter((s) => s.slug !== store.slug).slice(0, 2);

  return (
    <SiteShell>
      {/* Hero: name and actions on deep red, gallery mosaic beside */}
      <section className="relative overflow-hidden bg-maroon text-ivory">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(168,131,74,0.28),transparent_55%)]"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:py-20">
          <div>
            <p className="eyebrow !text-[#d8b878]">
              Indriya Store · Mumbai{store.flagship ? " · Flagship" : ""}
            </p>
            <h1 className="mt-5 font-display text-5xl font-light leading-[1.05] sm:text-6xl">
              {store.name}
            </h1>
            <p className="mt-3 text-lg font-light text-ivory/75">
              {store.landmark} · {store.area}
            </p>
            <Rating store={store} className="mt-5 [&_span:last-child]:text-ivory/60" />
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={directionsUrl(store)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lux-gold"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" /> Get Directions
              </a>
              <a href={telHref(store.phone)} className="btn-lux-ghost">
                <Phone className="h-4 w-4" aria-hidden="true" /> Call {store.phone}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-[1.5fr_1fr] gap-3 sm:gap-4">
            <div className="row-span-2 overflow-hidden rounded-t-[999px] rounded-b-2xl ring-1 ring-[#d8b878]/50">
              <img
                src={main!.src}
                alt={main!.alt}
                width={STORE_PHOTO_SIZE.width}
                height={STORE_PHOTO_SIZE.height}
                fetchPriority="high"
                className="h-full min-h-72 w-full object-cover"
              />
            </div>
            {rest.map((g) => (
              <div key={g.src} className="overflow-hidden rounded-2xl ring-1 ring-[#d8b878]/40">
                <img
                  src={g.src}
                  alt={g.alt}
                  width={STORE_PHOTO_SIZE.width}
                  height={STORE_PHOTO_SIZE.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="pt-6">
          <Breadcrumbs
            items={[
              { name: "Home", to: "/" },
              { name: "Store Locator", to: "/store-locator" },
              { name: store.name },
            ]}
          />
        </div>

        {/* Map with a floating details card */}
        <section className="py-14">
          <div className="text-center">
            <ScriptHeading before="Find your" script="way" />
          </div>
          <div className="relative mt-10">
            <div className="overflow-hidden rounded-3xl border border-border bg-sand">
              <iframe
                title={`Map showing Indriya ${store.name}`}
                src={mapEmbedUrl(store)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[360px] w-full border-0 lg:h-[560px]"
              />
            </div>
            <StoreDetails
              store={store}
              className="mt-6 lg:absolute lg:bottom-8 lg:left-8 lg:top-8 lg:mt-0 lg:w-[400px] lg:overflow-y-auto"
            />
          </div>
        </section>

        {/* Services */}
        {(store.services.length > 0 || store.languages) && (
          <section className="border-t border-border py-14">
            <div className="text-center">
              <ScriptHeading
                before={store.services.length > 0 ? "In-store" : "Languages"}
                script={store.services.length > 0 ? "services" : "spoken"}
              />
            </div>
            {store.services.length > 0 ? (
              <ul className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {store.services.map((s) => {
                  const info = SERVICE_INFO[s];
                  const Icon = info?.icon ?? Sparkles;
                  return (
                    <li
                      key={s}
                      className="rounded-3xl border border-border bg-card p-7 text-center"
                    >
                      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sand">
                        <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 font-display text-2xl text-ink">{s}</h3>
                      {info && <p className="mt-1 text-sm text-muted-foreground">{info.text}</p>}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <ul className="mt-8 flex flex-wrap justify-center gap-3">
                {store.languages?.map((l) => (
                  <li
                    key={l}
                    className="rounded-full border border-border bg-card px-6 py-2.5 font-display text-xl text-maroon"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Other stores */}
        <section className="border-t border-border py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <ScriptHeading before="More stores in" script="Mumbai" className="!text-4xl" />
            <Link to="/store-locator" className="btn-lux-outline">
              All Mumbai stores
            </Link>
          </div>
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {others.map((s) => (
              <li key={s.slug}>
                <StoreCard store={s} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </SiteShell>
  );
}

function StoreDetails({ store, className = "" }: { store: Store; className?: string }) {
  const rows: { icon: LucideIcon; label: string; body: React.ReactNode }[] = [
    { icon: MapPin, label: "Address", body: store.address },
    { icon: Clock, label: "Store hours", body: `Open daily, ${store.hours}` },
    {
      icon: Phone,
      label: "Contact",
      body: (
        <a
          href={telHref(store.phone)}
          className="text-maroon underline decoration-gold underline-offset-4"
        >
          {store.phone}
        </a>
      ),
    },
  ];
  if (store.languages)
    rows.push({ icon: Languages, label: "Languages spoken", body: store.languages.join(", ") });

  return (
    <aside
      className={`rounded-3xl border border-gold/30 bg-card/95 p-7 shadow-[0_30px_60px_-30px_rgba(74,20,32,0.5)] backdrop-blur ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-3xl text-ink">Store details</h2>
        {store.flagship && (
          <span className="rounded-full bg-maroon px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-ivory">
            Flagship
          </span>
        )}
      </div>
      <div className="my-5 h-px bg-gold/30" />
      <dl className="space-y-5">
        {rows.map(({ icon: Icon, label, body }) => (
          <div key={label} className="flex gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand">
              <Icon className="h-4 w-4 text-gold" aria-hidden="true" />
            </span>
            <div>
              <dt className="eyebrow !tracking-[0.2em]">{label}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-ink">{body}</dd>
            </div>
          </div>
        ))}
      </dl>
      {store.services.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
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
      <OffsiteLink href={officialStoreUrl(store)} variant="pill" className="mt-6">
        This store on indriya.com
      </OffsiteLink>
    </aside>
  );
}

import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Navigation, Phone, Star } from "lucide-react";
import {
  STORE_PHOTO_SIZE,
  coverOf,
  directionsUrl,
  storeSrcSet,
  telHref,
  type Store,
} from "@/lib/stores";

export function Rating({ store, className = "" }: { store: Store; className?: string }) {
  return (
    <p className={`flex items-center gap-1.5 text-sm ${className}`}>
      <Star className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
      <span className="font-medium">{store.rating.toFixed(1)}</span>
      <span className="text-muted-foreground">
        ({store.reviews.toLocaleString("en-IN")} Google reviews)
      </span>
    </p>
  );
}

/** Compact store card — two fit side by side on desktop. */
export function StoreCard({
  store,
  headingLevel = "h3",
}: {
  store: Store;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  const cover = coverOf(store);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow duration-500 hover:shadow-[0_24px_50px_-28px_rgba(74,20,32,0.45)]">
      <Link
        to="/store-locator/$slug"
        params={{ slug: store.slug }}
        className="relative block overflow-hidden"
        aria-label={`${store.flagship ? "Flagship Store: " : ""}Show details for Indriya ${store.name}`}
      >
        <img
          src={cover.src}
          srcSet={storeSrcSet(cover.src)}
          sizes="(min-width: 768px) 520px, 92vw"
          alt={cover.alt}
          width={STORE_PHOTO_SIZE.width}
          height={STORE_PHOTO_SIZE.height}
          loading="lazy"
          decoding="async"
          className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {store.flagship && (
          <span className="absolute left-4 top-4 rounded-full bg-maroon/90 px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-ivory backdrop-blur">
            Flagship Store
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <div>
            <H className="font-display text-2xl leading-tight text-ink">{store.name}</H>
            <p className="mt-0.5 text-sm text-terracotta">{store.landmark}</p>
          </div>
          <Rating store={store} className="shrink-0 sm:pt-1" />
        </div>

        <div className="my-4 h-px bg-gold/25" />

        <ul className="space-y-2.5 text-sm">
          <li className="flex gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            <span className="line-clamp-2">{store.address}</span>
          </li>
          <li className="flex flex-wrap gap-x-6 gap-y-2.5">
            <span className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              {store.hours}
            </span>
            <a
              href={telHref(store.phone)}
              className="flex items-center gap-2.5 py-1 text-maroon hover:underline"
            >
              <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              {store.phone}
            </a>
          </li>
        </ul>

        <div className="mt-auto grid grid-cols-[1fr_1fr_auto] items-center gap-2 pt-6 sm:gap-3">
          <a
            href={directionsUrl(store)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lux !px-3 sm:!px-4"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" /> Directions
          </a>
          <Link
            to="/store-locator/$slug"
            params={{ slug: store.slug }}
            className="btn-lux-outline !px-3 sm:!px-4"
          >
            <span className="sm:hidden">Details</span>
            <span className="hidden sm:inline">Show Details</span>
          </Link>
          <a
            href={telHref(store.phone)}
            aria-label={`Call Indriya ${store.name}`}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-maroon text-maroon transition-colors hover:bg-maroon hover:text-ivory"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

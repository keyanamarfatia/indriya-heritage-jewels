import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Breadcrumbs, SiteShell } from "@/components/site-shell";
import { KolamDivider, ProductCard, PromiseIcon, ScriptHeading } from "@/components/brand";
import { OffsiteLink } from "@/components/offsite";
import { absoluteUrl, breadcrumbLd, jsonLd, pageHead } from "@/lib/site";
import {
  ANANTARA_URL,
  PAIRS,
  findProduct,
  formatINR,
  pricesAsOfLabel,
  productId,
  productOfferLd,
  productPath,
  relatedTo,
} from "@/lib/products";

const TYPE_LABEL = { necklace: "Necklace", earrings: "Earrings" } as const;

export const Route = createFileRoute("/jewellery/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return {};
    const path = productPath(p);
    const description = `${p.description} From Indriya's Anantara bridal temple jewellery collection, in BIS Hallmark gold.`;
    return {
      ...pageHead({
        title: `${p.name} | Anantara by Indriya`,
        description,
        path,
        image: absoluteUrl(p.image),
      }),
      scripts: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Temple Jewellery", path: "/temple-jewellery" },
          { name: p.name, path },
        ]),
        // Product schema only when we have indriya.com's listed price (shown on the page with its
        // date): Google treats a Product without a price, review or rating as invalid.
        ...(p.listing
          ? [
              jsonLd({
                "@type": "Product",
                "@id": productId(p),
                name: p.name,
                description,
                image: absoluteUrl(p.image),
                url: absoluteUrl(path),
                sameAs: p.indriyaUrl,
                brand: { "@type": "Brand", name: "Indriya" },
                material: "22 karat BIS Hallmark gold",
                category: `Temple jewellery > ${TYPE_LABEL[p.type]}`,
                ...productOfferLd(p),
              }),
            ]
          : []),
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const pair = PAIRS[p.slug] ? findProduct(PAIRS[p.slug]!) : undefined;
  const related = relatedTo(p, 5).filter((r) => r.slug !== pair?.slug);

  const details: [string, string][] = [
    ["Collection", "Anantara, bridal temple jewellery"],
    ["Category", TYPE_LABEL[p.type]],
    ["Metal", "22 karat gold, BIS Hallmarked with HUID"],
    ["Finish", "Antique gold, hand-finished"],
    ["Ideal for", "Weddings, Varalakshmi Vratham and festive pujas"],
    ...(p.listing
      ? ([
          ["Gross weight", `${p.listing.grossWeightG} g`],
          ...(p.listing.size ? [["Size", p.listing.size] as [string, string]] : []),
          ["Product code", p.listing.sku],
        ] as [string, string][])
      : []),
  ];

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="pt-6">
          <Breadcrumbs
            items={[
              { name: "Home", to: "/" },
              { name: "Temple Jewellery", to: "/temple-jewellery" },
              { name: p.name },
            ]}
          />
        </div>

        <section className="grid gap-10 py-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-14">
          {/* Image */}
          <div className="mx-auto w-full max-w-xl">
            <div className="rounded-t-[999px] bg-[#efe1cd] p-2 ring-1 ring-gold/30 sm:p-3">
              <img
                src={p.image}
                alt={p.alt}
                width={584}
                height={584}
                fetchPriority="high"
                className="aspect-[4/5] w-full rounded-t-[999px] object-cover mix-blend-multiply"
              />
            </div>
          </div>

          {/* Info */}
          <div className="lg:pt-6">
            <p className="eyebrow">Anantara · {TYPE_LABEL[p.type]}</p>
            <h1 className="mt-4 font-display text-4xl font-light leading-tight text-ink sm:text-5xl">
              {p.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{p.description}</p>

            <div className="my-7 h-px bg-gold/30" />

            {p.listing ? (
              <div>
                <p className="font-display text-4xl text-ink lining-nums">
                  {formatINR(p.listing.price)}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Approximate, excluding taxes, as listed on indriya.com on {pricesAsOfLabel}. Gold
                  prices change daily, so check today&rsquo;s price before you buy.
                </p>
              </div>
            ) : (
              <p className="text-sm text-ink">
                Price changes daily with the gold rate. See today&rsquo;s price, sizes and weight on
                Indriya&rsquo;s own site.
              </p>
            )}
            <div className="mt-5 flex flex-wrap gap-3">
              <OffsiteLink href={p.indriyaUrl} variant="button">
                View price on indriya.com
              </OffsiteLink>
              <Link to="/store-locator" className="btn-lux-outline">
                <MapPin className="h-4 w-4" aria-hidden="true" /> Try it in store
              </Link>
            </div>

            <dl className="mt-9 divide-y divide-border rounded-3xl border border-border bg-card">
              {details.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 px-6 py-4 text-sm">
                  <dt className="eyebrow !tracking-[0.18em]">{k}</dt>
                  <dd className="text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-8 grid gap-5 sm:grid-cols-3">
              {(
                [
                  ["certified", "BIS Hallmark gold"],
                  ["pricing", "Transparent pricing"],
                  ["exchange", "Lifetime exchange"],
                ] as const
              ).map(([kind, label]) => (
                <li key={kind} className="flex items-center gap-3 sm:flex-col sm:text-center">
                  <PromiseIcon kind={kind} />
                  <span className="text-sm text-ink">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Complete the set */}
        {pair && (
          <section className="border-t border-border py-14 text-center">
            <ScriptHeading before="Complete the" script="Set" />
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Anantara pairs the {p.name} with its matching{" "}
              {pair.type === "earrings" ? "earrings" : "necklace"}.
            </p>
            <div className="mx-auto mt-10 max-w-xs">
              <ProductCard product={pair} />
            </div>
          </section>
        )}

        {/* You may also like */}
        <section className="border-t border-border py-14">
          <div className="text-center">
            <ScriptHeading before="You may also" script="like" />
            <KolamDivider className="mt-6" />
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-8 lg:grid-cols-4">
            {related.slice(0, 4).map((r) => (
              <ProductCard key={r.slug} product={r} />
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/temple-jewellery" className="btn-lux">
              All temple jewellery
            </Link>
            <OffsiteLink href={ANANTARA_URL} variant="button">
              Anantara on indriya.com
            </OffsiteLink>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}

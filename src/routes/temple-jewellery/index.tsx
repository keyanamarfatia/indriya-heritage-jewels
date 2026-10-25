import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Breadcrumbs, SiteShell } from "@/components/site-shell";
import { KolamDivider, ProductCard, ScriptHeading } from "@/components/brand";
import { breadcrumbLd, pageHead } from "@/lib/site";
import { ANANTARA_URL, PRODUCTS, type ProductType } from "@/lib/products";

const PATH = "/temple-jewellery";

type Search = { type?: ProductType | undefined; q?: string | undefined };

export const Route = createFileRoute("/temple-jewellery/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    type: s["type"] === "necklace" || s["type"] === "earrings" ? s["type"] : undefined,
    q: typeof s["q"] === "string" && s["q"].trim() ? s["q"].trim().slice(0, 60) : undefined,
  }),
  head: () => ({
    ...pageHead({
      title: "Gold Temple Jewellery Collection | Indriya",
      description:
        "Explore gold temple jewellery from Indriya's Anantara bridal collection: Lakshmi and Ganesha necklaces, harams and temple jhumkas in BIS Hallmark gold.",
      path: PATH,
    }),
    scripts: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Temple Jewellery", path: PATH },
      ]),
    ],
  }),
  component: CollectionPage,
});

const FILTERS: { label: string; type?: ProductType }[] = [
  { label: "All" },
  { label: "Necklaces", type: "necklace" },
  { label: "Earrings", type: "earrings" },
];

function CollectionPage() {
  const { type, q } = Route.useSearch();
  const words = (q ?? "").toLowerCase().split(/\s+/).filter(Boolean);
  const shown = PRODUCTS.filter(
    (p) =>
      (!type || p.type === type) &&
      words.every((w) =>
        `${p.name} ${p.description} ${p.type}`.toLowerCase().includes(w.replace(/s$/, "")),
      ),
  );

  return (
    <SiteShell>
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-5 py-12 text-center sm:px-8">
          <h1 className="font-display text-5xl text-ink sm:text-6xl">
            Gold Temple{" "}
            <span className="font-script text-[1.25em] font-normal text-maroon">Jewellery</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Pieces from Indriya&rsquo;s Anantara bridal temple collection, hand-finished with nakshi
            work and Goddess Lakshmi, Ganesha and Garuda motifs. Shopping for the festival? See our{" "}
            <Link
              to="/temple-jewellery/varalakshmi-vratham"
              className="text-maroon underline decoration-gold underline-offset-4"
            >
              temple jewellery for Varalakshmi Vratham
            </Link>
            .
          </p>
          <KolamDivider className="mt-8" />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Temple Jewellery" }]} />

        <div className="mt-6 flex flex-wrap items-center gap-3 border-b border-border pb-6">
          {FILTERS.map((f) => {
            const active = f.type === type;
            const href = f.type ? `${PATH}?type=${f.type}` : PATH;
            return (
              <a
                key={f.label}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                  active
                    ? "border-maroon bg-maroon text-ivory"
                    : "border-border bg-card text-maroon hover:border-maroon"
                }`}
              >
                {f.label}
              </a>
            );
          })}
          {q && (
            <a
              href={PATH}
              className="rounded-full border border-terracotta px-4 py-2 text-sm text-terracotta"
            >
              &ldquo;{q}&rdquo; ✕
            </a>
          )}
          <p className="ml-auto text-sm text-muted-foreground">
            {shown.length} {shown.length === 1 ? "piece" : "pieces"} found
          </p>
        </div>

        {shown.length > 0 ? (
          <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {shown.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} headingLevel="h2" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-12 text-center text-muted-foreground">
            No pieces match that search here.{" "}
            <a
              href={ANANTARA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-maroon underline"
            >
              Browse the full collection on Indriya
            </a>
            .
          </p>
        )}

        <div className="mt-16 rounded-2xl bg-sand px-6 py-10 text-center">
          <ScriptHeading before="New to temple" script="jewellery?" />
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Learn what the motifs mean and how to care for each piece in our{" "}
            <Link
              to="/temple-jewellery-guide"
              className="text-maroon underline decoration-gold underline-offset-4"
            >
              Temple Jewellery Guide
            </Link>
            , or{" "}
            <Link
              to="/temple-jewellery/lakshmi-haram"
              className="text-maroon underline decoration-gold underline-offset-4"
            >
              discover the lakshmi haram
            </Link>
            .
          </p>
          <a
            href={ANANTARA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-maroon px-7 font-medium text-ivory hover:bg-maroon/90"
          >
            See all Anantara pieces on Indriya{" "}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </SiteShell>
  );
}

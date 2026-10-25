import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, SiteShell } from "@/components/site-shell";
import { ExternalLink } from "lucide-react";
import { ProductCard, ScriptHeading } from "@/components/brand";
import { breadcrumbLd, pageHead } from "@/lib/site";
import { productBySlug } from "@/lib/products";

const PATH = "/temple-jewellery/lakshmi-haram";

export const Route = createFileRoute("/temple-jewellery/lakshmi-haram")({
  head: () => ({
    ...pageHead({
      title: "Lakshmi Haram in Antique Gold | Indriya Temple Jewellery",
      description:
        "The Lakshmi haram: a long antique gold temple necklace for Varalakshmi Vratham and South Indian weddings, from Indriya's Anantara collection.",
      path: PATH,
    }),
    scripts: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Temple Jewellery", path: "/temple-jewellery" },
        { name: "Lakshmi Haram", path: PATH },
      ]),
    ],
  }),
  component: HaramPage,
});

const MALA = productBySlug("lakshmi-bottu-mala-gold-long-necklace");
const UDAYA = productBySlug("udaya-gold-bridal-necklace");

function HaramPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", to: "/" },
            { name: "Temple Jewellery", to: "/temple-jewellery" },
            { name: "Lakshmi Haram" },
          ]}
        />
        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="overflow-hidden rounded-t-[999px] border border-border bg-[#fbeee3]">
            <img
              src={MALA.image}
              alt={MALA.alt}
              width={584}
              height={584}
              fetchPriority="high"
              className="aspect-square w-full object-cover"
            />
          </div>
          <div>
            <p className="inline-block border border-terracotta/50 bg-sand px-3 py-1 text-sm text-maroon">
              Anantara
            </p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-ink">
              Lakshmi Haram in Antique Gold
            </h1>
            <p className="mt-5 text-lg leading-relaxed">
              The lakshmi haram is the long necklace at the heart of a Telugu bridal and festive
              look. In Indriya&rsquo;s Anantara collection, the Lakshmi Bottu Mala strings Goddess
              Lakshmi coin motifs in 22 karat gold, finished with green drops, and is made to be
              layered over a temple choker.
            </p>
            <a
              href={MALA.indriyaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lux mt-6"
            >
              View price on Indriya <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>

            <h2 className="mt-10 font-display text-3xl text-maroon">
              Why it suits Varalakshmi Vratham
            </h2>
            <p className="mt-3 leading-relaxed">
              Goddess Lakshmi is the deity of the vratham, so a Lakshmi haram is the most
              traditional choice for the puja and a meaningful gift for a mother or mother-in-law.
            </p>

            <h2 className="mt-10 font-display text-3xl text-maroon">Our promise</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed">
              <li>BIS Hallmark certified gold with a HUID code</li>
              <li>Gold rate, making charges and taxes shown separately</li>
              <li>
                <Link
                  to="/lifetime-exchange"
                  className="text-maroon underline decoration-gold underline-offset-4"
                >
                  Lifetime exchange
                </Link>
              </li>
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/store-locator" className="btn-lux-outline">
                Find a Store Near You
              </Link>
              <Link to="/temple-jewellery/varalakshmi-vratham" className="btn-lux-outline">
                See the Varalakshmi collection
              </Link>
            </div>
          </div>
        </div>

        <section className="mt-20 text-center">
          <ScriptHeading before="You may also" script="like" />
          <div className="mx-auto mt-10 grid max-w-3xl gap-8 sm:grid-cols-2">
            {[UDAYA, productBySlug("vinayaka-gold-bridal-necklace")].map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}

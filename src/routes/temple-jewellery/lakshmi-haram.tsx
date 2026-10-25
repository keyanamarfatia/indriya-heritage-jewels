import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, SiteShell } from "@/components/site-shell";
import { breadcrumbLd, pageHead } from "@/lib/site";

const PATH = "/temple-jewellery/lakshmi-haram";

export const Route = createFileRoute("/temple-jewellery/lakshmi-haram")({
  head: () => ({
    ...pageHead({
      title: "Lakshmi Haram in Antique Gold | Indriya Temple Jewellery",
      description:
        "A long Lakshmi haram in antique gold with nakshi work, made for Varalakshmi Vratham and South Indian weddings. BIS Hallmark gold.",
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

function HaramPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", to: "/" },
            { name: "Temple Jewellery", to: "/temple-jewellery" },
            { name: "Lakshmi Haram" },
          ]}
        />
        <h1 className="mt-6 font-display text-5xl text-maroon">Lakshmi Haram in Antique Gold</h1>
        <p className="mt-5 text-lg leading-relaxed">
          The lakshmi haram is the long necklace at the heart of a Telugu bridal and festive look.
          Ours carries a row of Goddess Lakshmi figures in hand-chased nakshi work, finished in
          antique gold and made to be layered over a temple choker.
        </p>

        <h2 className="mt-10 font-display text-3xl text-maroon">
          Why it suits Varalakshmi Vratham
        </h2>
        <p className="mt-3 leading-relaxed">
          Goddess Lakshmi is the deity of the vratham, so a Lakshmi haram is the most traditional
          choice for the puja and a meaningful gift for a mother or mother-in-law.
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
          <Link
            to="/store-locator"
            className="inline-flex h-12 items-center rounded-full bg-maroon px-7 font-medium text-ivory hover:bg-maroon/90"
          >
            Find a Store Near You
          </Link>
          <Link
            to="/temple-jewellery/varalakshmi-vratham"
            className="inline-flex h-12 items-center rounded-full border border-maroon px-7 font-medium text-maroon hover:bg-maroon/5"
          >
            See the Varalakshmi collection
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}

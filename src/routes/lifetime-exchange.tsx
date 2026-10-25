import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, SiteShell } from "@/components/site-shell";
import { breadcrumbLd, pageHead } from "@/lib/site";

const PATH = "/lifetime-exchange";

export const Route = createFileRoute("/lifetime-exchange")({
  head: () => ({
    ...pageHead({
      title: "Lifetime Exchange on Gold Jewellery | Indriya",
      description:
        "Indriya's lifetime exchange lets you trade your gold jewellery for a new design at any time, valued at the current gold rate.",
      path: PATH,
    }),
    scripts: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Lifetime Exchange", path: PATH },
      ]),
    ],
  }),
  component: ExchangePage,
});

function ExchangePage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Lifetime Exchange" }]} />
        <h1 className="mt-6 font-display text-5xl text-maroon">Lifetime Exchange</h1>
        <p className="mt-5 text-lg leading-relaxed">
          Your Indriya jewellery always holds its value. Bring it to any Indriya store and exchange
          it for a new design whenever your story calls for one.
        </p>
        <h2 className="mt-10 font-display text-3xl text-maroon">How it works</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6 leading-relaxed">
          <li>Bring your jewellery and its invoice to an Indriya store.</li>
          <li>We check its purity against the BIS Hallmark and HUID code.</li>
          <li>The gold is valued at the current gold rate, shown to you on the bill.</li>
          <li>Choose a new design and use that value towards it.</li>
        </ol>
        <p className="mt-8 text-sm text-muted-foreground">
          Exact deductions and terms follow Indriya&rsquo;s official exchange policy in store.
        </p>
        <Link to="/store-locator" className="btn-lux mt-8">
          Find a Store Near You
        </Link>
      </div>
    </SiteShell>
  );
}

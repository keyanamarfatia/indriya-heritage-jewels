import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { pageHead } from "@/lib/site";
import heroImage from "@/assets/hero.webp";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Indriya Temple Jewellery — Every Jewel Tells a Story",
      description:
        "Heritage South Indian temple jewellery in BIS Hallmark gold. Explore the Varalakshmi Vratham collection and our Temple Jewellery Guide.",
      path: "/",
    }),
  component: Index,
});

const FEATURES = [
  {
    to: "/temple-jewellery/varalakshmi-vratham",
    title: "Varalakshmi Vratham",
    text: "Temple jewellery for the festival of Goddess Lakshmi.",
  },
  {
    to: "/temple-jewellery",
    title: "The Collection",
    text: "Chokers, harams, jhumkas and bangles in antique gold.",
  },
  {
    to: "/temple-jewellery-guide",
    title: "Temple Jewellery Guide",
    text: "Its history, its motifs, and how to care for it.",
  },
] as const;

function Index() {
  return (
    <SiteShell>
      {/* Hero banner */}
      <section className="relative min-h-[80vh] overflow-hidden">
        <img
          src={heroImage}
          alt="Antique gold South Indian temple jewellery — a goddess-motif choker, jhumka earrings and a bangle arranged on deep maroon silk"
          className="absolute inset-0 h-full w-full object-cover object-right"
          width={1920}
          height={1088}
          fetchPriority="high"
        />
        {/* Maroon veil so the ivory headline reads over the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-maroon/85 via-maroon/40 to-transparent" />
        <div className="relative z-10 flex min-h-[80vh] items-center px-6 sm:px-12 lg:px-24">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-ivory/80">
              Indriya Temple Jewellery
            </p>
            <h1 className="font-display text-5xl font-medium leading-[1.1] text-ivory sm:text-6xl lg:text-7xl">
              Every Jewel Tells a Story
            </h1>
            <div className="mt-6 h-px w-24 bg-gold" />
            <Link
              to="/temple-jewellery/varalakshmi-vratham"
              className="mt-8 inline-flex h-12 items-center rounded-full bg-gold px-7 font-medium text-maroon hover:bg-gold/90"
            >
              Shop the Varalakshmi Collection
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h2 className="font-display text-4xl text-maroon">
          South Indian temple jewellery, in hallmarked gold
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed">
          Inspired by the ornaments of South India&rsquo;s temples, every piece is finished by hand
          with nakshi work and Goddess Lakshmi, lotus and peacock motifs, in BIS Hallmark certified
          gold with lifetime exchange.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <li key={f.to}>
              <Link
                to={f.to}
                className="block h-full rounded-lg border bg-card p-6 transition-colors hover:border-gold"
              >
                <h3 className="font-display text-2xl text-maroon">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{f.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs, SiteShell } from "@/components/site-shell";
import { breadcrumbLd, pageHead } from "@/lib/site";
import chokerImage from "@/assets/temple-choker.webp";
import jhumkaImage from "@/assets/temple-jhumkas.webp";
import bangleImage from "@/assets/temple-bangle.webp";

const PATH = "/temple-jewellery";

export const Route = createFileRoute("/temple-jewellery/")({
  head: () => ({
    ...pageHead({
      title: "Gold Temple Jewellery Collection | Indriya",
      description:
        "Explore gold temple jewellery with nakshi work: Lakshmi chokers, harams, kasu malas, jhumkas, bangles and vaddanams in BIS Hallmark gold.",
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

type Piece = {
  name: string;
  text: string;
  img?: { src: string; alt: string; w: number; h: number };
  href?: string;
};

const PIECES: Piece[] = [
  {
    name: "Lakshmi temple choker",
    text: "Carved goddess panels framed by pearl drops and ruby and emerald stones.",
    img: {
      src: chokerImage,
      w: 800,
      h: 500,
      alt: "Antique gold Lakshmi temple choker with carved goddess panels, pearl drops and ruby and emerald stones",
    },
  },
  {
    name: "Lakshmi temple jhumkas",
    text: "Bell-shaped jhumkas with a Lakshmi stud and a ring of pearls.",
    img: {
      src: jhumkaImage,
      w: 400,
      h: 340,
      alt: "Pair of antique gold temple jhumkas with Goddess Lakshmi studs and pearl drops",
    },
  },
  {
    name: "Nakshi temple bangle",
    text: "A hand-chased bangle with a Lakshmi motif and red stones.",
    img: {
      src: bangleImage,
      w: 430,
      h: 240,
      alt: "Antique gold nakshi temple bangle with Lakshmi motif and red stones on maroon silk",
    },
  },
  {
    name: "Lakshmi haram",
    text: "The long festive necklace at the heart of every Telugu bridal set.",
    href: "/temple-jewellery/lakshmi-haram",
  },
  {
    name: "Kasu mala",
    text: "A coin necklace strung with Goddess Lakshmi kasu, worn for prosperity.",
  },
  {
    name: "Gold vaddanam",
    text: "The temple-style waist belt that completes a South Indian bridal look.",
  },
];

function CollectionPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Temple Jewellery" }]} />
        <h1 className="mt-6 font-display text-5xl text-maroon">Gold Temple Jewellery Collection</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed">
          Antique gold temple jewellery, hand-finished with nakshi work and Goddess Lakshmi, lotus
          and peacock motifs. Shopping for the festival? See our{" "}
          <Link
            to="/temple-jewellery/varalakshmi-vratham"
            className="text-maroon underline decoration-gold underline-offset-4"
          >
            temple jewellery for Varalakshmi Vratham
          </Link>
          .
        </p>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PIECES.map((p) => (
            <li key={p.name} className="flex flex-col overflow-hidden rounded-lg border bg-card">
              {p.img ? (
                <img
                  src={p.img.src}
                  alt={p.img.alt}
                  width={p.img.w}
                  height={p.img.h}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex aspect-[4/3] w-full items-center justify-center bg-maroon font-display text-6xl text-gold/80"
                >
                  ॐ
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-display text-2xl text-maroon">{p.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed">{p.text}</p>
                {p.href ? (
                  <a
                    href={p.href}
                    className="mt-4 text-sm font-medium text-maroon underline decoration-gold underline-offset-4"
                  >
                    View details
                  </a>
                ) : (
                  <Link
                    to="/store-locator"
                    className="mt-4 text-sm font-medium text-maroon underline decoration-gold underline-offset-4"
                  >
                    See it in store
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-sm">
          New to temple jewellery? Start with our{" "}
          <Link
            to="/temple-jewellery-guide"
            className="text-maroon underline decoration-gold underline-offset-4"
          >
            Temple Jewellery Guide
          </Link>
          .
        </p>
      </div>
    </SiteShell>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Ban,
  BookOpen,
  CalendarCheck,
  Clock3,
  Coins,
  Crown,
  Droplets,
  Feather,
  Flower2,
  Hand,
  Landmark,
  Music2,
  Package,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumbs, SiteShell } from "@/components/site-shell";
import { HeroArch, KolamDivider, ProductCard, ScriptHeading } from "@/components/brand";
import { OffsiteLink } from "@/components/offsite";
import {
  GUIDE_AUTHOR,
  GUIDE_PUBLISHED,
  SITE_NAME,
  teamLd,
  absoluteUrl,
  breadcrumbLd,
  jsonLd,
  pageHead,
} from "@/lib/site";
import { ANANTARA_URL, productBySlug, productSrcSet } from "@/lib/products";
import guideImage from "@/assets/anantara/ganesha-large.webp";
import guide480 from "@/assets/anantara/ganesha-large-480.webp";
import guide800 from "@/assets/anantara/ganesha-large-800.webp";

const PATH = "/temple-jewellery-guide";
const HEADLINE = "Temple Jewellery Guide: History, Designs and Care";
const DESCRIPTION =
  "What temple jewellery is, where it comes from, what Lakshmi, peacock and lotus motifs mean, and how to clean and store it.";
const BIS_URL = "https://www.bis.gov.in/";
const READ_MINUTES = 6;

const publishedLabel = new Date(GUIDE_PUBLISHED).toLocaleDateString("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const TOC = [
  { id: "what-is-temple-jewellery", label: "What it is" },
  { id: "origins", label: "Where it comes from" },
  { id: "designs", label: "Common designs" },
  { id: "care", label: "How to care for it" },
  { id: "real-gold", label: "Real gold or plated?" },
  { id: "shop", label: "Shop the motifs" },
];

export const Route = createFileRoute("/temple-jewellery-guide")({
  head: () => ({
    ...pageHead({
      title: "Temple Jewellery Guide: History, Designs & Care | Indriya",
      description: DESCRIPTION,
      path: PATH,
      image: absoluteUrl(guideImage),
    }),
    scripts: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "Temple Jewellery Guide", path: PATH },
      ]),
      jsonLd({
        "@type": "Article",
        headline: HEADLINE,
        description: DESCRIPTION,
        image: absoluteUrl(guideImage),
        datePublished: GUIDE_PUBLISHED,
        dateModified: GUIDE_PUBLISHED,
        author: teamLd(),
        publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
        mainEntityOfPage: absoluteUrl(PATH),
        about: ["Temple jewellery", "South Indian jewellery", "Nakshi work", "Anantara"],
        citation: [BIS_URL, ANANTARA_URL],
      }),
    ],
  }),
  component: GuidePage,
});

/* ---------- content ---------- */

const TAKEAWAYS = [
  "Temple jewellery is South Indian gold jewellery carved with deities and sacred symbols.",
  "It began in Tamil Nadu under the Chola and Pandya dynasties, about the 9th–13th centuries.",
  "Goddess Lakshmi, the peacock and the lotus are its three classic motifs.",
  "Keep it dry, wipe it after every wear and store each piece separately.",
];

const TIMELINE: { icon: LucideIcon; era: string; title: string; text: string }[] = [
  {
    icon: Landmark,
    era: "9th–13th century",
    title: "Made for the temple",
    text: "Under the Chola and Pandya kings, artisans in Tamil Nadu made heavy gold ornaments to adorn the idols of temple deities, copying the carvings on temple walls and gopurams.",
  },
  {
    icon: Music2,
    era: "Centuries later",
    title: "Worn by dancers",
    text: "Classical Bharatanatyam dancers took up the same designs on stage, which is why temple jewellery is still part of the dance costume today.",
  },
  {
    icon: Crown,
    era: "Today",
    title: "Brides and festivals",
    text: "It is now the signature jewellery of South Indian brides and of festivals such as Varalakshmi Vratham, made across Tamil Nadu, Andhra Pradesh, Telangana, Karnataka and Kerala.",
  },
];

type Motif = {
  name: string;
  meaning: string;
  seenOn: string;
  icon?: LucideIcon;
  productSlug?: string;
};

const MOTIFS: Motif[] = [
  {
    name: "Goddess Lakshmi",
    meaning:
      "Wealth and prosperity. It is the favourite motif for weddings and for Varalakshmi Vratham, the festival of Lakshmi herself.",
    seenOn: "Harams, pendants and the coins of a kasu mala",
    productSlug: "lakshmi-grace-gold-bridal-necklace",
  },
  {
    name: "Peacock",
    meaning:
      "Grace and beauty. The peacock is the mount of Lord Murugan, and is often set with red and green stones.",
    seenOn: "Necklaces, jhumkas and hair ornaments",
    icon: Feather,
  },
  {
    name: "Lotus",
    meaning:
      "Purity. The lotus is the flower Goddess Lakshmi sits upon, so it often appears alongside her.",
    seenOn: "Pendants, bangles and the centre of chokers",
    icon: Flower2,
  },
  {
    name: "Kasu (coins)",
    meaning:
      "Abundance. Rows of small gold coins, each stamped with Lakshmi, are strung into a long kasu mala.",
    seenOn: "Long necklaces and waist belts",
    productSlug: "lakshmi-bottu-mala-gold-long-necklace",
  },
  {
    name: "Lord Ganesha",
    meaning:
      "New beginnings and the removal of obstacles, which is why it is a natural choice for a bride.",
    seenOn: "Bridal necklaces and matching jhumkas",
    productSlug: "heirloom-ganesha-gold-bridal-necklace",
  },
  {
    name: "Garuda and gopuram",
    meaning:
      "Protection and devotion. Garuda is the mount of Lord Vishnu; the gopuram is the temple's gateway tower.",
    seenOn: "Short necklaces and pendants",
    productSlug: "garuda-haar-gold-short-necklace",
  },
];

const CARE_STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Hand,
    title: "Wipe after wearing",
    text: "Use a soft, dry cotton cloth to remove sweat and oils.",
  },
  {
    icon: Droplets,
    title: "Wash gently",
    text: "Mild soap, lukewarm water and a soft brush, only when needed.",
  },
  {
    icon: Wind,
    title: "Dry completely",
    text: "Pat dry and let it air out before you put it away.",
  },
  {
    icon: Package,
    title: "Store separately",
    text: "One piece per soft pouch or lined box, so nothing scratches.",
  },
  {
    icon: Sparkles,
    title: "Add silica gel",
    text: "A sachet in the box keeps moisture away from the antique finish.",
  },
  {
    icon: CalendarCheck,
    title: "Check once a year",
    text: "Have stone-set pieces cleaned and checked by your jeweller.",
  },
];

const AVOID = [
  "Perfume, hairspray and lotions",
  "Harsh cleaners, bleach or toothpaste",
  "Ultrasonic cleaners on stone-set pieces",
  "Wearing it to swim, bathe or exercise",
];

const HALLMARK = [
  { mark: "BIS logo", text: "The Bureau of Indian Standards triangle." },
  { mark: "Purity grade", text: "For example 22K916, meaning 91.6% pure gold." },
  { mark: "HUID", text: "A unique 6-character code for that single piece." },
];

const SHOP = [
  "lakshmi-grace-gold-bridal-necklace",
  "heirloom-ganesha-gold-bridal-necklace",
  "swarn-gajika-gold-bridal-drop-earrings",
  "lakshmi-bottu-mala-gold-long-necklace",
].map((s) => productBySlug(s));

const link = "text-maroon underline decoration-gold underline-offset-4 hover:text-gold-deep";

/* ---------- page ---------- */

function GuidePage() {
  const initials = GUIDE_AUTHOR.initials;

  return (
    <SiteShell>
      {/* Hero */}
      <header className="relative overflow-hidden bg-maroon text-ivory">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_40%,rgba(168,131,74,0.3),transparent_55%)]"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:py-20">
          <div>
            <p className="eyebrow !text-[#d8b878]">The Indriya Journal · Guide</p>
            <h1 className="mt-5 font-display text-4xl font-light leading-[1.08] sm:text-6xl">
              Temple Jewellery Guide:{" "}
              <span className="font-script text-[1.15em] font-normal text-[#e2c48f]">
                History, Designs
              </span>{" "}
              and Care
            </h1>
            <p className="mt-5 max-w-xl text-lg font-light leading-relaxed text-ivory/80">
              {DESCRIPTION}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ivory/75">
              <span className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d8b878] font-display text-lg text-maroon"
                >
                  {initials}
                </span>
                <span>
                  <span className="block text-ivory">{GUIDE_AUTHOR.name}</span>
                  <span className="text-xs">{GUIDE_AUTHOR.role}</span>
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarCheck className="h-4 w-4 text-[#d8b878]" aria-hidden="true" />
                <time dateTime={GUIDE_PUBLISHED}>{publishedLabel}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock3 className="h-4 w-4 text-[#d8b878]" aria-hidden="true" />
                {READ_MINUTES} min read
              </span>
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm">
            <HeroArch
              src={guideImage}
              srcSet={`${guide480} 480w, ${guide800} 800w, ${guideImage} 1280w`}
              sizes="(min-width: 1024px) 384px, 80vw"
              alt="Heirloom Ganesha gold temple necklace from Indriya's Anantara collection, with a deity pendant, ruby drops and pearls"
              width={1280}
              height={1280}
            />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="pt-6">
          <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Temple Jewellery Guide" }]} />
        </div>

        <div className="grid gap-12 py-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          {/* Table of contents */}
          <nav aria-label="On this page" className="min-w-0 lg:sticky lg:top-40 lg:self-start">
            <p className="eyebrow">On this page</p>
            <ol className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:border-gold/30 lg:pb-0">
              {TOC.map((t, i) => (
                <li key={t.id} className="shrink-0">
                  <a
                    href={`#${t.id}`}
                    className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-ink transition-colors hover:border-maroon hover:text-maroon lg:-ml-px lg:rounded-none lg:border-0 lg:border-l lg:border-transparent lg:bg-transparent lg:py-2.5 lg:pl-4 lg:hover:border-maroon"
                  >
                    <span className="font-display text-gold-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="min-w-0 max-w-3xl">
            {/* Key takeaways (answer-first summary for readers and AI tools) */}
            <aside className="rounded-3xl border border-gold/40 bg-card p-7">
              <p className="flex items-center gap-2 font-display text-2xl text-ink">
                <BookOpen className="h-5 w-5 text-gold-deep" aria-hidden="true" /> Key takeaways
              </p>
              <ul className="mt-4 space-y-3">
                {TAKEAWAYS.map((t) => (
                  <li key={t} className="flex gap-3 leading-relaxed text-ink/90">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </aside>

            {/* 1. What it is */}
            <section id="what-is-temple-jewellery" className="scroll-mt-40 pt-14">
              <p className="eyebrow">01</p>
              <h2 className="mt-2 font-display text-4xl font-light leading-tight text-ink">
                What is temple jewellery?
              </h2>
              <p className="mt-5 text-lg leading-relaxed">
                <strong className="font-medium">
                  Temple jewellery is South Indian gold jewellery decorated with images of deities,
                  temples and sacred symbols.
                </strong>{" "}
                It takes its name from the ornaments made to adorn the idols in Hindu temples. The
                designs are raised from the gold by hand in <em>nakshi</em> work, then given an
                antique finish so they look like the ornaments of a temple deity.
              </p>
              <blockquote className="mt-8 border-l-2 border-gold pl-6 font-display text-2xl font-light italic leading-snug text-maroon">
                Every piece is a small temple carving in gold: the goddess, her lotus, the peacock
                at her side.
              </blockquote>
            </section>

            {/* 2. Origins */}
            <section id="origins" className="scroll-mt-40 pt-14">
              <p className="eyebrow">02</p>
              <h2 className="mt-2 font-display text-4xl font-light leading-tight text-ink">
                Where does temple jewellery come from?
              </h2>
              <p className="mt-5 text-lg leading-relaxed">
                <strong className="font-medium">
                  Temple jewellery comes from Tamil Nadu and grew under the Chola and Pandya
                  dynasties, roughly between the 9th and 13th centuries.
                </strong>{" "}
                Nagercoil, in the far south of Tamil Nadu, is still one of the best-known centres of
                the craft.
              </p>
              <ol className="relative ml-5 mt-10 space-y-8 border-l border-gold/40 pl-8">
                {TIMELINE.map(({ icon: Icon, era, title, text }) => (
                  <li key={title} className="relative">
                    <span className="absolute -left-[3.05rem] flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 bg-card">
                      <Icon className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                    </span>
                    <p className="eyebrow !tracking-[0.2em]">{era}</p>
                    <h3 className="mt-1 font-display text-2xl text-ink">{title}</h3>
                    <p className="mt-2 leading-relaxed text-ink/85">{text}</p>
                  </li>
                ))}
              </ol>
            </section>

            {/* 3. Designs */}
            <section id="designs" className="scroll-mt-40 pt-14">
              <p className="eyebrow">03</p>
              <h2 className="mt-2 font-display text-4xl font-light leading-tight text-ink">
                What are the common temple jewellery designs?
              </h2>
              <p className="mt-5 text-lg leading-relaxed">
                <strong className="font-medium">
                  The three classic motifs are Goddess Lakshmi, the peacock and the lotus.
                </strong>{" "}
                Kasu coins, Lord Ganesha and Garuda are close behind. Each carries its own meaning.
              </p>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                {MOTIFS.map((m) => {
                  const p = m.productSlug ? productBySlug(m.productSlug) : undefined;
                  const Icon = m.icon;
                  return (
                    <li
                      key={m.name}
                      className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card"
                    >
                      {p ? (
                        <Link
                          to="/jewellery/$slug"
                          params={{ slug: p.slug }}
                          className="block bg-[#efe1cd]"
                          aria-label={`${m.name} motif: see the ${p.name}`}
                        >
                          <img
                            src={p.image}
                            srcSet={productSrcSet(p)}
                            sizes="(min-width: 640px) 360px, 90vw"
                            alt={p.alt}
                            width={584}
                            height={584}
                            loading="lazy"
                            decoding="async"
                            className="aspect-[16/10] w-full object-cover mix-blend-multiply"
                          />
                        </Link>
                      ) : (
                        <div
                          className="flex aspect-[16/10] items-center justify-center bg-sand"
                          aria-hidden="true"
                        >
                          {Icon && <Icon className="h-16 w-16 text-gold-deep" strokeWidth={1} />}
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="font-display text-2xl text-ink">{m.name}</h3>
                        <p className="mt-2 flex-1 leading-relaxed text-ink/85">{m.meaning}</p>
                        <p className="mt-4 text-sm text-muted-foreground">
                          <span className="font-medium text-gold-deep">Seen on:</span> {m.seenOn}
                        </p>
                        {p && (
                          <Link
                            to="/jewellery/$slug"
                            params={{ slug: p.slug }}
                            className={`mt-3 text-sm ${link}`}
                          >
                            See the {p.name}
                          </Link>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* 4. Care */}
            <section id="care" className="scroll-mt-40 pt-14">
              <p className="eyebrow">04</p>
              <h2 className="mt-2 font-display text-4xl font-light leading-tight text-ink">
                How do you care for temple jewellery?
              </h2>
              <p className="mt-5 text-lg leading-relaxed">
                <strong className="font-medium">
                  Temple jewellery lasts longest when it is kept dry, wiped after every wear and
                  stored separately.
                </strong>{" "}
                Six habits keep the antique finish looking as it did on the day you bought it.
              </p>
              <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {CARE_STEPS.map(({ icon: Icon, title, text }, i) => (
                  <li key={title} className="rounded-3xl border border-border bg-card p-5">
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand">
                        <Icon className="h-5 w-5 text-gold-deep" aria-hidden="true" />
                      </span>
                      <span
                        className="font-display text-2xl font-light text-gold-deep/60"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 font-sans text-base font-semibold text-ink">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/80">{text}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-6 rounded-3xl border border-maroon/20 bg-[#f6e7e2] p-6">
                <p className="flex items-center gap-2 font-sans font-semibold text-maroon">
                  <Ban className="h-4 w-4" aria-hidden="true" /> Keep it away from
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {AVOID.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-sm text-ink/85">
                      <SprayCan className="h-4 w-4 shrink-0 text-maroon/60" aria-hidden="true" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 5. Real gold */}
            <section id="real-gold" className="scroll-mt-40 pt-14">
              <p className="eyebrow">05</p>
              <h2 className="mt-2 font-display text-4xl font-light leading-tight text-ink">
                Is it real gold or plated?
              </h2>
              <p className="mt-5 text-lg leading-relaxed">
                <strong className="font-medium">
                  Real gold temple jewellery carries a BIS hallmark with three marks; plated fashion
                  pieces do not.
                </strong>{" "}
                Every gold piece from Indriya is BIS Hallmarked, so you can check it yourself.
              </p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                {HALLMARK.map((h) => (
                  <li
                    key={h.mark}
                    className="rounded-3xl border border-gold/40 bg-card p-5 text-center"
                  >
                    <ShieldCheck className="mx-auto h-7 w-7 text-gold-deep" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-xl text-ink">{h.mark}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/80">{h.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">
                Read more about hallmarking from the{" "}
                <a href={BIS_URL} target="_blank" rel="noopener noreferrer" className={link}>
                  Bureau of Indian Standards
                </a>
                , or see our{" "}
                <a href="/faq" className={link}>
                  temple jewellery FAQ
                </a>
                .
              </p>
            </section>

            <KolamDivider className="mt-16" />

            {/* Author + sources */}
            <footer className="mt-12 rounded-3xl border border-border bg-card p-7">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-maroon font-display text-2xl text-[#e2c48f]"
                >
                  {initials}
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Written by
                  </p>
                  <p className="font-display text-2xl text-ink">{GUIDE_AUTHOR.name}</p>
                  <p className="text-sm text-muted-foreground">{GUIDE_AUTHOR.role}</p>
                </div>
              </div>
              <p className="mt-5 text-sm text-ink/80">
                Published <time dateTime={GUIDE_PUBLISHED}>{publishedLabel}</time> · Last reviewed{" "}
                <time dateTime={GUIDE_PUBLISHED}>{publishedLabel}</time>
              </p>
              <div className="mt-5 border-t border-border pt-5">
                <p className="eyebrow">Sources</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a href={BIS_URL} target="_blank" rel="noopener noreferrer" className={link}>
                      Bureau of Indian Standards: gold hallmarking
                    </a>
                  </li>
                  <li>
                    <OffsiteLink href={ANANTARA_URL}>
                      Indriya: Anantara bridal temple jewellery collection
                    </OffsiteLink>
                  </li>
                </ul>
              </div>
            </footer>
          </article>
        </div>

        {/* Shop the motifs */}
        <section id="shop" className="scroll-mt-40 border-t border-border py-16 text-center">
          <ScriptHeading before="Shop the" script="Motifs" />
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Lakshmi, Ganesha and kasu designs from Indriya&rsquo;s Anantara collection.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-8 lg:grid-cols-4">
            {SHOP.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <Link to="/temple-jewellery/varalakshmi-vratham" className="btn-lux mt-12">
            Shop for Varalakshmi Vratham
          </Link>
        </section>
      </div>
    </SiteShell>
  );
}

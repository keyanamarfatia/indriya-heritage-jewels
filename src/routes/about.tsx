import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  BookOpen,
  CalendarCheck,
  GraduationCap,
  Store,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Star,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumbs, SiteShell } from "@/components/site-shell";
import { OffsiteLink } from "@/components/offsite";
import {
  GUIDE_AUTHOR,
  OFFICIAL_URL,
  SITE_PUBLISHED,
  SITE_UPDATED,
  absoluteUrl,
  authorLd,
  breadcrumbLd,
  formatDate,
  jsonLd,
  pageHead,
} from "@/lib/site";
import { ABG_INDRIYA_URL, BIS_URL, CARE_PHONE } from "@/lib/knowledge";
import { ANANTARA_URL, pricesAsOfLabel } from "@/lib/products";
import { STORES } from "@/lib/stores";

const PATH = "/about";
const TITLE = "About This Project | Indriya Temple Jewellery";
const DESCRIPTION =
  "Who made this Indriya temple jewellery site, how we researched it, where our facts come from, and how to contact Indriya.";

const BASE = pageHead({ title: TITLE, description: DESCRIPTION, path: PATH });

const TOTAL_REVIEWS = STORES.reduce((n, s) => n + s.reviews, 0);

export const Route = createFileRoute("/about")({
  head: () => ({
    ...BASE,
    meta: [
      ...BASE.meta,
      { name: "author", content: `${GUIDE_AUTHOR.name}, ${GUIDE_AUTHOR.role}` },
      { property: "article:published_time", content: SITE_PUBLISHED },
      { property: "article:modified_time", content: SITE_UPDATED },
    ],
    scripts: [
      breadcrumbLd([
        { name: "Home", path: "/" },
        { name: "About", path: PATH },
      ]),
      jsonLd({
        "@type": "AboutPage",
        name: TITLE,
        description: DESCRIPTION,
        url: absoluteUrl(PATH),
        datePublished: SITE_PUBLISHED,
        dateModified: SITE_UPDATED,
        author: authorLd(),
        publisher: authorLd(),
        about: { "@type": "Organization", name: "Indriya", url: OFFICIAL_URL },
        citation: [OFFICIAL_URL, ANANTARA_URL, BIS_URL, ABG_INDRIYA_URL],
      }),
    ],
  }),
  component: AboutPage,
});

const RESEARCH: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Search,
    title: "What people search",
    text: "We researched the keywords and Google “People also ask” questions around temple jewellery and Varalakshmi Vratham, and built our pages and FAQ to answer them.",
  },
  {
    icon: BadgeCheck,
    title: "Facts from the source",
    text: "Product names, photos, weights and prices come from indriya.com. Gold purity facts follow the Bureau of Indian Standards. Company facts come from the Aditya Birla Group.",
  },
  {
    icon: Star,
    title: "Competitor study",
    text: "We compared the backlink profiles of Tanishq and CaratLane in Ahrefs to understand how established jewellery brands earn trust online.",
  },
  {
    icon: CalendarCheck,
    title: "Kept current",
    text: `Prices are copied with their date (currently ${pricesAsOfLabel}) because gold prices change daily. Every page shows when it was last updated.`,
  },
];

const link = "text-maroon underline decoration-gold underline-offset-4 hover:text-gold-deep";

function AboutPage() {
  return (
    <SiteShell>
      <header className="relative overflow-hidden bg-maroon text-ivory">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(168,131,74,0.28),transparent_55%)]"
        />
        <div className="relative mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="eyebrow !text-[#d8b878]">About this project</p>
          <h1 className="mt-5 font-display text-4xl font-light leading-[1.08] sm:text-6xl">
            Who made this site, and{" "}
            <span className="font-script text-[1.15em] font-normal text-[#e2c48f]">why</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-ivory/80">
            This website is a student project about Indriya&rsquo;s Anantara bridal temple
            jewellery. It is not the official Indriya website and does not sell jewellery.
          </p>
          <p className="mt-6 text-sm text-ivory/75">
            By <span className="text-ivory">{GUIDE_AUTHOR.name}</span>, {GUIDE_AUTHOR.role} ·
            Published <time dateTime={SITE_PUBLISHED}>{formatDate(SITE_PUBLISHED)}</time> · Updated{" "}
            <time dateTime={SITE_UPDATED}>{formatDate(SITE_UPDATED)}</time>
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="pt-6">
          <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "About" }]} />
        </div>

        {/* Who we are */}
        <section className="py-12">
          <div className="flex flex-col gap-6 rounded-3xl border border-gold/40 bg-card p-7 sm:flex-row sm:items-center">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-maroon">
              <GraduationCap className="h-7 w-7 text-[#e2c48f]" aria-hidden="true" />
            </span>
            <div>
              <p className="eyebrow">Written and curated by</p>
              <h2 className="mt-1 font-display text-3xl text-ink">{GUIDE_AUTHOR.name}</h2>
              <p className="mt-1 text-muted-foreground">
                {GUIDE_AUTHOR.role}, Mumbai. Built for our Digital Marketing course (SEO, AEO and
                GEO).
              </p>
            </div>
          </div>
          <p className="mt-8 text-lg leading-relaxed">
            We chose Indriya because it is one of the newest jewellery brands in India: the Aditya
            Birla Group launched it in 2024. Its Anantara collection of temple jewellery is made for
            South Indian brides and festivals, so we built this site around one of those festivals,
            Varalakshmi Vratham. Our goal was to show how a new brand can be found on Google and
            cited by AI assistants such as ChatGPT and Gemini.
          </p>
        </section>

        {/* How we researched */}
        <section className="border-t border-border py-12">
          <h2 className="font-display text-4xl font-light text-ink">How we researched this site</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {RESEARCH.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-3xl border border-border bg-card p-6">
                <Icon className="h-6 w-6 text-gold-deep" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-3 font-sans text-base font-semibold text-ink">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/85">{text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Sources */}
        <section id="sources" className="scroll-mt-32 border-t border-border py-12">
          <h2 className="font-display text-4xl font-light text-ink">Our sources</h2>
          <p className="mt-4 leading-relaxed">
            According to the Bureau of Indian Standards, hallmarked gold carries three marks: the
            BIS logo, the purity grade and a unique HUID code. As listed on indriya.com, every
            Anantara piece is 22 karat gold. We cite these sources wherever we use them:
          </p>
          <ul className="mt-5 space-y-3">
            <li>
              <OffsiteLink href={OFFICIAL_URL} variant="inline">
                indriya.com, Indriya&rsquo;s official website
              </OffsiteLink>
            </li>
            <li>
              <OffsiteLink href={ANANTARA_URL} variant="inline">
                The Anantara collection on indriya.com
              </OffsiteLink>
            </li>
            <li>
              <a href={BIS_URL} target="_blank" rel="noopener noreferrer" className={link}>
                Bureau of Indian Standards: gold hallmarking
              </a>
            </li>
            <li>
              <a href={ABG_INDRIYA_URL} target="_blank" rel="noopener noreferrer" className={link}>
                Aditya Birla Group: Indriya
              </a>
            </li>
          </ul>
        </section>

        {/* Trust */}
        <section className="border-t border-border py-12">
          <h2 className="font-display text-4xl font-light text-ink">Why shoppers trust Indriya</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-3">
            <li className="rounded-3xl border border-border bg-card p-6 text-center">
              <ShieldCheck className="mx-auto h-7 w-7 text-gold-deep" aria-hidden="true" />
              <p className="mt-3 font-display text-2xl text-ink">BIS Hallmark</p>
              <p className="mt-1 text-sm text-ink/80">Certified gold with a HUID code</p>
            </li>
            <li className="rounded-3xl border border-border bg-card p-6 text-center">
              <Star className="mx-auto h-7 w-7 fill-gold text-gold" aria-hidden="true" />
              <p className="mt-3 font-display text-2xl text-ink lining-nums">4.8–5.0 ★</p>
              <p className="mt-1 text-sm text-ink/80">
                {TOTAL_REVIEWS.toLocaleString("en-IN")} Google reviews across six Mumbai stores
              </p>
            </li>
            <li className="rounded-3xl border border-border bg-card p-6 text-center">
              <BookOpen className="mx-auto h-7 w-7 text-gold-deep" aria-hidden="true" />
              <p className="mt-3 font-display text-2xl text-ink">Lifetime exchange</p>
              <p className="mt-1 text-sm text-ink/80">
                <Link to="/lifetime-exchange" className={link}>
                  How exchange works
                </Link>
              </p>
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-32 border-t border-border py-12">
          <h2 className="font-display text-4xl font-light text-ink">Contact</h2>
          <p className="mt-4 leading-relaxed">
            For orders, prices or jewellery questions, contact Indriya directly:
          </p>
          <ul className="mt-5 space-y-3">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gold-deep" aria-hidden="true" />
              <a href={`tel:${CARE_PHONE.replace(/-/g, "")}`} className={link}>
                Customer care {CARE_PHONE} (toll free)
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
              <address className="not-italic">
                Indriya head office: One International Centre, Tower 3, 15th Floor, Dadar West,
                Mumbai, Maharashtra 400012
              </address>
            </li>
            <li className="flex items-center gap-3">
              <Store className="h-4 w-4 text-gold-deep" aria-hidden="true" />
              <Link to="/store-locator" className={link}>
                Or visit one of six Indriya stores in Mumbai
              </Link>
            </li>
          </ul>
        </section>

        {/* Privacy */}
        <section id="privacy" className="scroll-mt-32 border-t border-border py-12">
          <h2 className="font-display text-4xl font-light text-ink">Privacy policy</h2>
          <p className="mt-4 leading-relaxed">
            This site has no accounts, checkout or tracking cookies. If you use the Ask Indriya
            assistant on our{" "}
            <Link to="/faq" className={link}>
              FAQ page
            </Link>
            , the question you type is saved anonymously, with no name or contact details, so we can
            improve our answers. Please don&rsquo;t type personal details into it.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="mb-16 rounded-3xl bg-sand p-7 text-sm leading-relaxed">
          <p className="font-medium text-ink">Disclaimer</p>
          <p className="mt-2 text-ink/85">
            Indriya&rsquo;s name, logo and product images belong to Indriya / Aditya Birla Group and
            are used here for academic purposes only. Prices are approximate and change daily.
            Always confirm details on{" "}
            <OffsiteLink href={OFFICIAL_URL} variant="inline">
              indriya.com
            </OffsiteLink>{" "}
            or in store.
          </p>
        </section>
      </div>
    </SiteShell>
  );
}

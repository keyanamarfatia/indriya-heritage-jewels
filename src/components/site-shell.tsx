import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  Facebook,
  Instagram,
  Flower2,
  Gem,
  Heart,
  MapPin,
  Menu,
  MessageCircleQuestion,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  User,
  X,
  Youtube,
  type LucideIcon,
} from "lucide-react";

const SOCIAL_ICONS: Record<(typeof SOCIAL_LINKS)[number]["name"], LucideIcon> = {
  Instagram,
  Facebook,
  YouTube: Youtube,
};
import { OFFICIAL_URL, PARENT_LINKS, PROJECT_LINKS, REVIEW_LINKS, SOCIAL_LINKS } from "@/lib/site";
import { ANANTARA_URL, PRODUCTS } from "@/lib/products";
import { AnimatedLogo } from "@/components/animated-logo";
import { GoldRateWidget } from "@/components/gold-rate";
import { OffsiteLink } from "@/components/offsite";

/** Indriya's customer care number, as listed in the footer of indriya.com. */
const CARE_PHONE = "1800-210-8383";

type MenuLink = { label: string; href: string; external?: boolean };
type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  columns?: { title: string; links: MenuLink[] }[];
  images?: { src: string; alt: string; label: string; href: string }[];
};

const necklace = PRODUCTS.find((p) => p.slug === "heirloom-ganesha-gold-bridal-necklace")!;
const earrings = PRODUCTS.find((p) => p.slug === "swarn-gajika-gold-bridal-drop-earrings")!;

const NAV: NavItem[] = [
  {
    label: "Temple Jewellery",
    href: "/temple-jewellery",
    icon: Gem,
    columns: [
      {
        title: "By category",
        links: [
          { label: "All Temple Jewellery", href: "/temple-jewellery" },
          { label: "Necklaces", href: "/temple-jewellery?type=necklace" },
          { label: "Earrings", href: "/temple-jewellery?type=earrings" },
          { label: "Lakshmi Haram", href: "/temple-jewellery/lakshmi-haram" },
        ],
      },
      {
        title: "By occasion",
        links: [
          { label: "Varalakshmi Vratham", href: "/temple-jewellery/varalakshmi-vratham" },
          { label: "South Indian Bridal", href: "/temple-jewellery?type=necklace" },
        ],
      },
      {
        title: "On Indriya",
        links: [
          { label: "Anantara Collection", href: ANANTARA_URL, external: true },
          { label: "All Jewellery", href: `${OFFICIAL_URL}jewellery`, external: true },
        ],
      },
    ],
    images: [
      {
        src: necklace.image,
        alt: necklace.alt,
        label: "Necklaces",
        href: "/temple-jewellery?type=necklace",
      },
      {
        src: earrings.image,
        alt: earrings.alt,
        label: "Earrings",
        href: "/temple-jewellery?type=earrings",
      },
    ],
  },
  { label: "Find Your Piece", href: "/styling-advisor", icon: Sparkles },
  { label: "Varalakshmi Vratham", href: "/temple-jewellery/varalakshmi-vratham", icon: Flower2 },
  { label: "Jewellery Guide", href: "/temple-jewellery-guide", icon: BookOpen },
  { label: "FAQ", href: "/faq", icon: MessageCircleQuestion },
  { label: "Stores", href: "/store-locator", icon: MapPin },
  {
    label: "Our Promises",
    href: "/lifetime-exchange",
    icon: ShieldCheck,
    columns: [
      {
        title: "Our promises",
        links: [
          { label: "Lifetime Exchange", href: "/lifetime-exchange" },
          { label: "FAQ & Ask Indriya", href: "/faq" },
          { label: "Store Locator", href: "/store-locator" },
        ],
      },
      {
        title: "On Indriya",
        links: [
          { label: "Indriya Stores", href: `${OFFICIAL_URL}jewellery-stores`, external: true },
          { label: "Visit indriya.com", href: OFFICIAL_URL, external: true },
        ],
      },
    ],
  },
];

function MenuAnchor({ link, className }: { link: MenuLink; className?: string }) {
  return link.external ? (
    <OffsiteLink href={link.href} className={`${className ?? ""} !text-navy`}>
      {link.label}
    </OffsiteLink>
  ) : (
    <a href={link.href} className={className}>
      {link.label}
    </a>
  );
}

function SearchBox({ className = "" }: { className?: string }) {
  return (
    <form action="/temple-jewellery" method="get" role="search" className={className}>
      <label className="flex h-11 items-center gap-3 rounded-full border border-maroon/25 bg-card/70 px-5 focus-within:border-maroon">
        <Search className="h-5 w-5 text-maroon" aria-hidden="true" />
        <span className="sr-only">Search temple jewellery</span>
        <input
          type="search"
          name="q"
          placeholder="Search for necklaces, jhumkas…"
          className="w-full bg-transparent text-sm text-ink placeholder:text-muted-foreground focus:outline-none"
        />
      </label>
    </form>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Student-project disclaimer, linking to the real brand */}
      <div
        role="note"
        className="bg-maroon px-5 py-2 text-center text-[11px] tracking-wide text-ivory/85 sm:text-xs"
      >
        Student project for Atlas SkillTech University, not the official Indriya website.{" "}
        <OffsiteLink href={OFFICIAL_URL} variant="light" className="whitespace-nowrap font-medium">
          Visit the official indriya.com
        </OffsiteLink>
      </div>

      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
        {/* Row 1: logo, search, quick links */}
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-3 sm:px-8">
          <Link
            to="/"
            aria-label="Indriya Temple Jewellery, home"
            onClick={() => setOpen(false)}
            className="shrink-0"
          >
            <AnimatedLogo className="h-9 sm:h-11" />
          </Link>
          <SearchBox className="mx-auto hidden w-full max-w-xl md:block" />
          <nav
            aria-label="Quick links"
            className="ml-auto hidden items-center gap-5 text-sm text-maroon md:flex"
          >
            <Link to="/store-locator" className="flex items-center gap-1.5 hover:text-ink">
              <MapPin className="h-5 w-5" aria-hidden="true" /> Store
            </Link>
            {/* Everything in this navy pill opens indriya.com */}
            <div
              className="flex items-center gap-4 rounded-full border border-navy/25 bg-navy/[0.05] py-1.5 pl-3 pr-4 text-navy"
              title="These open the official indriya.com in a new tab"
            >
              <span className="flex items-center gap-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-navy/70">
                indriya.com <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </span>
              <OffsiteLink
                href={OFFICIAL_URL}
                variant="icon"
                arrow={false}
                className="hidden whitespace-nowrap xl:inline-flex"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" /> Golden Programs
              </OffsiteLink>
              <OffsiteLink
                href={ANANTARA_URL}
                variant="icon"
                arrow={false}
                label="Wishlist on Indriya"
              >
                <Heart className="h-4 w-4" aria-hidden="true" />
              </OffsiteLink>
              <OffsiteLink
                href={OFFICIAL_URL}
                variant="icon"
                arrow={false}
                label="Your Indriya account"
              >
                <User className="h-4 w-4" aria-hidden="true" />
              </OffsiteLink>
            </div>
          </nav>
          <button
            type="button"
            className="ml-auto inline-flex h-11 w-11 items-center justify-center text-maroon md:ml-0 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Row 2: category nav with dropdown panels (desktop) */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="mx-auto flex max-w-7xl justify-center gap-8 px-8 xl:gap-12">
            {NAV.map((item) => (
              <li key={item.label} className="group">
                <a
                  href={item.href}
                  className="inline-flex items-center gap-2 whitespace-nowrap border-b border-transparent py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-maroon transition-colors hover:border-gold group-focus-within:border-gold"
                >
                  <item.icon
                    className="h-4 w-4 text-gold-deep transition-transform group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  {item.label}
                  {item.columns && (
                    <ChevronDown
                      className="-ml-0.5 h-3 w-3 text-maroon/60 transition-transform group-hover:rotate-180"
                      aria-hidden="true"
                    />
                  )}
                </a>
                {item.columns && (
                  <div className="invisible absolute inset-x-0 top-full border-t border-border bg-sand opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="mx-auto flex max-w-6xl gap-12 px-8 py-8">
                      {item.columns.map((col) => (
                        <div key={col.title}>
                          <p className="eyebrow">{col.title}</p>
                          <ul className="mt-4 space-y-3">
                            {col.links.map((l) => (
                              <li key={l.label}>
                                <MenuAnchor
                                  link={l}
                                  className="font-display text-lg text-maroon hover:text-gold-deep"
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {item.images && (
                        <div className="ml-auto flex gap-5">
                          {item.images.map((img) => (
                            <a key={img.label} href={img.href} className="block w-40">
                              <img
                                src={img.src}
                                alt={img.alt}
                                width={160}
                                height={160}
                                loading="lazy"
                                className="aspect-square w-40 rounded-t-[999px] object-cover"
                              />
                              <span className="mt-2 block text-sm text-maroon">{img.label}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu */}
        {open && (
          <nav aria-label="Mobile" className="border-t border-border bg-card px-5 pb-5 lg:hidden">
            <SearchBox className="mt-4 md:hidden" />
            <ul className="mt-2">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 py-3 text-base text-maroon"
                    onClick={() => setOpen(false)}
                  >
                    <item.icon
                      className="h-5 w-5 text-gold-deep"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <OffsiteLink href={OFFICIAL_URL} variant="pill" className="mt-3 !text-sm">
                  Visit the official indriya.com
                </OffsiteLink>
              </li>
            </ul>
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-maroon px-6 pb-28 pt-16 text-ivory/85 sm:px-12 lg:pb-12">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <AnimatedLogo light className="h-10" />
            <p className="mt-4 font-display text-2xl italic text-[#e2c48f]">
              Every Jewel Tells a Story
            </p>
          </div>
          <div>
            <p className="eyebrow !text-[#d8b878]">Shop</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="/temple-jewellery" className="hover:text-[#e2c48f]">
                  Temple Jewellery
                </a>
              </li>
              <li>
                <a href="/temple-jewellery?type=necklace" className="hover:text-[#e2c48f]">
                  Necklaces
                </a>
              </li>
              <li>
                <a href="/temple-jewellery?type=earrings" className="hover:text-[#e2c48f]">
                  Earrings
                </a>
              </li>
              <li>
                <a href="/temple-jewellery/varalakshmi-vratham" className="hover:text-[#e2c48f]">
                  Varalakshmi Vratham
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow !text-[#d8b878]">Help</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="/store-locator" className="hover:text-[#e2c48f]">
                  Store Locator
                </a>
              </li>
              <li>
                <a href="/lifetime-exchange" className="hover:text-[#e2c48f]">
                  Lifetime Exchange
                </a>
              </li>
              <li>
                <a href="/temple-jewellery-guide" className="hover:text-[#e2c48f]">
                  Temple Jewellery Guide
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-[#e2c48f]">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-[#e2c48f]">
                  About this project
                </a>
              </li>
              <li>
                <a href="/press" className="hover:text-[#e2c48f]">
                  Press &amp; media
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-[#e2c48f]">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-[#e2c48f]">
                  Terms of use
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow !text-[#d8b878]">Official Indriya</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <OffsiteLink href={OFFICIAL_URL} variant="light">
                  indriya.com
                </OffsiteLink>
              </li>
              <li>
                <a href={`tel:${CARE_PHONE.replace(/-/g, "")}`} className="hover:text-[#e2c48f]">
                  Customer care {CARE_PHONE}
                </a>
              </li>
              <li>Stores open from 11:00 AM; hours vary by store</li>
            </ul>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#d8b878]">Follow Indriya</p>
            <ul className="mt-3 flex gap-3" aria-label="Indriya on social media">
              {SOCIAL_LINKS.map(({ name, href }) => {
                const Icon = SOCIAL_ICONS[name];
                return (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      aria-label={`Indriya on ${name} (opens in a new tab)`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 text-ivory/85 transition-colors hover:border-[#e2c48f] hover:text-[#e2c48f]"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#d8b878]">
              Indriya reviewed on
            </p>
            <ul
              className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm"
              aria-label="Indriya on review platforms"
            >
              {REVIEW_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Indriya on ${l.name} (opens in a new tab)`}
                    className="hover:text-[#e2c48f]"
                  >
                    {l.name} ↗
                  </a>
                </li>
              ))}
            </ul>
            {PROJECT_LINKS.length > 0 && (
              <>
                <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#d8b878]">
                  This student project on
                </p>
                <ul
                  className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm"
                  aria-label="This project"
                >
                  {PROJECT_LINKS.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="hover:text-[#e2c48f]"
                      >
                        {l.name} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#d8b878]">
              Parent company: Aditya Birla Group
            </p>
            <ul
              className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm"
              aria-label="Aditya Birla Group"
            >
              {PARENT_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${l.name} (opens in a new tab)`}
                    className="hover:text-[#e2c48f]"
                  >
                    {l.short} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl space-y-1 border-t border-ivory/15 pt-6 text-center text-xs text-ivory/60">
          <p>
            Student project for Atlas SkillTech University — not affiliated with Indriya / Aditya
            Birla Group.
          </p>
          <p>
            Indriya name, logo and product images © Indriya / Aditya Birla Group, used for academic
            purposes.
          </p>
        </div>
      </footer>

      {/* Desktop: floating gold-rate and call buttons */}
      <div className="fixed bottom-6 right-6 z-50 hidden flex-col items-end gap-3 lg:flex">
        <GoldRateWidget />
        <a
          href={`tel:${CARE_PHONE.replace(/-/g, "")}`}
          aria-label={`Call Indriya customer care on ${CARE_PHONE}`}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-card text-maroon shadow-lg transition-transform hover:scale-105"
        >
          <Phone className="h-6 w-6" aria-hidden="true" />
        </a>
      </div>

      {/* Mobile: one bottom dock instead of floating buttons over the content */}
      <nav
        aria-label="Quick actions"
        className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-3 divide-x divide-ivory/15 overflow-visible rounded-full bg-maroon shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)] ring-1 ring-gold/40 lg:hidden"
      >
        <Link
          to="/store-locator"
          className="flex h-14 flex-col items-center justify-center gap-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-ivory"
        >
          <MapPin className="h-5 w-5 text-[#d8b878]" aria-hidden="true" />
          Stores
        </Link>
        <GoldRateWidget variant="dock" />
        <a
          href={`tel:${CARE_PHONE.replace(/-/g, "")}`}
          aria-label={`Call Indriya customer care on ${CARE_PHONE}`}
          className="flex h-14 flex-col items-center justify-center gap-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-ivory"
        >
          <Phone className="h-5 w-5 text-[#d8b878]" aria-hidden="true" />
          Call
        </a>
      </nav>
    </div>
  );
}

/** Visible breadcrumb trail; pairs with BreadcrumbList JSON-LD in each route's head(). */
export function Breadcrumbs({ items }: { items: { name: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.to ? (
              <a href={item.to} className="hover:text-maroon hover:underline">
                {item.name}
              </a>
            ) : (
              <span aria-current="page" className="text-maroon">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

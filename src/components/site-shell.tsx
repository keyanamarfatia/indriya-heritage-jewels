import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { MapPin, Menu, X } from "lucide-react";

const NAV = [
  { to: "/temple-jewellery", label: "Collection" },
  { to: "/temple-jewellery/varalakshmi-vratham", label: "Varalakshmi Vratham" },
  { to: "/temple-jewellery-guide", label: "Temple Jewellery Guide" },
  { to: "/lifetime-exchange", label: "Lifetime Exchange" },
  { to: "/store-locator", label: "Store Locator" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-gold/30 bg-maroon text-ivory">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            to="/"
            className="font-display text-2xl tracking-wide"
            onClick={() => setOpen(false)}
          >
            Indriya <span className="text-gold">Temple Jewellery</span>
          </Link>
          <nav aria-label="Main" className="hidden gap-6 text-sm lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-ivory/85 transition-colors hover:text-gold"
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: true }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <nav aria-label="Mobile" className="border-t border-gold/20 px-5 pb-4 lg:hidden">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block py-3 text-base text-ivory/90"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-maroon px-6 pb-24 pt-10 text-ivory sm:px-12 lg:pb-10">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2">
          <div>
            <p className="font-display text-2xl">Indriya Temple Jewellery</p>
            <p className="mt-2 text-sm text-ivory/75">Every Jewel Tells a Story.</p>
          </div>
          <ul className="grid grid-cols-2 gap-2 text-sm text-ivory/85">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mx-auto mt-8 max-w-6xl border-t border-ivory/15 pt-6 text-center text-sm text-ivory/75">
          Student project for Atlas SkillTech University — not affiliated with Indriya / Aditya
          Birla Group.
        </p>
      </footer>

      {/* Sticky store CTA on mobile */}
      <Link
        to="/store-locator"
        className="fixed inset-x-4 bottom-4 z-50 flex h-12 items-center justify-center gap-2 rounded-full bg-gold font-medium text-maroon shadow-lg lg:hidden"
      >
        <MapPin className="h-5 w-5" aria-hidden="true" />
        Find a Store
      </Link>
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

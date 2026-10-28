import { createFileRoute } from "@tanstack/react-router";
import { SITE_UPDATED, absoluteUrl } from "@/lib/site";
import { PRODUCTS, productPath } from "@/lib/products";
import { STORES } from "@/lib/stores";

// Every public page, built from the same data as the site so new products or stores appear here.
const PAGES: { path: string; priority: string }[] = [
  { path: "/", priority: "1.0" },
  { path: "/temple-jewellery/varalakshmi-vratham", priority: "0.9" },
  { path: "/temple-jewellery", priority: "0.9" },
  { path: "/temple-jewellery-guide", priority: "0.8" },
  { path: "/faq", priority: "0.8" },
  { path: "/styling-advisor", priority: "0.8" },
  { path: "/temple-jewellery/lakshmi-haram", priority: "0.7" },
  { path: "/store-locator", priority: "0.7" },
  { path: "/lifetime-exchange", priority: "0.6" },
  { path: "/about", priority: "0.6" },
  { path: "/press", priority: "0.5" },
  { path: "/privacy-policy", priority: "0.3" },
  { path: "/terms", priority: "0.3" },
  ...PRODUCTS.map((p) => ({ path: productPath(p), priority: "0.7" })),
  ...STORES.map((s) => ({ path: `/store-locator/${s.slug}`, priority: "0.6" })),
];

function buildSitemap() {
  const urls = PAGES.map(
    ({ path, priority }) =>
      `  <url>\n    <loc>${absoluteUrl(path)}</loc>\n    <lastmod>${SITE_UPDATED}</lastmod>\n    <priority>${priority}</priority>\n  </url>`,
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});

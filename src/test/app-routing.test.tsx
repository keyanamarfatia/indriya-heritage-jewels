import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
const PATHS = [
  "/",
  "/temple-jewellery",
  "/temple-jewellery/varalakshmi-vratham",
  "/temple-jewellery/lakshmi-haram",
  "/temple-jewellery-guide",
  "/lifetime-exchange",
  "/store-locator",
  "/store-locator/borivali-w-mumbai",
  "/store-locator/phoenix-marketcity-kurla",
];

describe("App routing", () => {
  it.each(PATHS)("matches a page for %s instead of falling back to not found", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes(path);

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});

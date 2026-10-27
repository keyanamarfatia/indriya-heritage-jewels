import { createFileRoute } from "@tanstack/react-router";
import { buildLlmsFull } from "@/lib/llms-full";

// Serves /llms-full.txt as plain text, built from the site's own data.
export const Route = createFileRoute("/llms-full.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildLlmsFull(), {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});

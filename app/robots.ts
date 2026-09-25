import type { MetadataRoute } from "next";

import { SITE } from "@/content/site";

/**
 * robots.txt
 *
 * Celowo NIE blokujemy `Google-Extended`, `GPTBot` ani `ClaudeBot` —
 * blokada wyklucza stronę z AI Overviews i z odpowiedzi asystentów AI,
 * a to dziś realny kanał pozyskiwania klientów.
 *
 * Uwaga przy podstronach: `nosnippet` i `max-snippet:0` wykluczają stronę
 * z AI Overviews. Nie ustawiać ich nigdzie poza polityką prywatności.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}

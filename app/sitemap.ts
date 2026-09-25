import type { MetadataRoute } from "next";

import { SITE } from "@/content/site";
import { CITY_SLUGS } from "@/content/cities";
import { listPosts, listCaseStudies, listServiceCategories } from "@/lib/cms";
import { languageAlternates, publicPath, DEFAULT_LOCALE } from "@/lib/routes";

/**
 * Mapa strony.
 *
 * ⚠ To Route Handler, więc `next/root-params` tu NIE działa. Wszystkie
 * adresy budujemy z mapy slugów (`lib/routes.ts`) — nigdy z `params`.
 *
 * Celowo pomijamy `priority` i `changeFrequency` — Google ich nie używa,
 * a ich obecność tylko sugeruje, że wiemy więcej, niż wiemy.
 *
 * `lastModified` podajemy WYŁĄCZNIE tam, gdzie znamy prawdziwą datę zmiany.
 * Wstawianie dzisiejszej daty przy każdym adresie sprawia, że Google
 * przestaje ufać całej sitemapie.
 */

function absolute(path: string): string {
  return new URL(path, SITE.url).toString();
}

/** Wpis z kompletem wersji językowych. */
function entry(segments: string[], lastModified?: string) {
  const languages = languageAlternates(segments);
  return {
    url: absolute(publicPath(DEFAULT_LOCALE, segments)),
    ...(lastModified ? { lastModified } : {}),
    alternates: {
      languages: Object.fromEntries(
        Object.entries(languages).map(([lang, path]) => [lang, absolute(path)])
      ),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, caseStudies, categories] = await Promise.all([
    listPosts(DEFAULT_LOCALE),
    listCaseStudies(DEFAULT_LOCALE),
    listServiceCategories(DEFAULT_LOCALE),
  ]);

  return [
    entry([]),
    entry(["oferta"]),
    ...categories.map((c) => entry(["oferta", c.slug])),

    entry(["realizacje"]),
    ...caseStudies.map((c) => entry(["realizacje", c.slug])),

    entry(["blog"]),
    ...posts.map((p) => entry(["blog", p.slug], p.updatedAt ?? p.publishedAt)),

    /* Tylko miasta z opublikowanym etapem — reszta nie ma jeszcze podstrony. */
    ...CITY_SLUGS.map((slug) => entry(["strony-internetowe", slug])),

    entry(["o-mnie"]),
    entry(["kontakt"]),

    /* Polityka prywatności celowo pominięta — jest oznaczona noindex. */
  ];
}

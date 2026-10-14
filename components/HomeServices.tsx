/**
 * Obszary usług na stronie głównej — Server Component.
 *
 * Każdy obszar to osobna karta ze swoim znakiem (`CategoryGlyph`): mały
 * w kafelku przy nazwie i duży, liniowy w rogu karty jako tło. Dzięki
 * temu cztery obszary odróżniają się na pierwszy rzut oka, zanim ktoś
 * przeczyta nagłówek. Strzałka w rogu działa jak w wierszach `.oc-row`.
 */

import Link from "next/link";

import type { ServiceCategory, ServiceCategorySlug } from "@/lib/cms";
import { CategoryGlyph } from "@/components/CategoryGlyph";

import "./home-services.css";

const ARROW = "M5 12h14M13 6l6 6-6 6";

export function HomeServices({
  categories,
  hrefFor,
  cursorLabel,
}: {
  categories: ServiceCategory[];
  hrefFor: (slug: ServiceCategorySlug) => string;
  cursorLabel: string;
}) {
  return (
    <div className="reveal-stagger mt-14 grid gap-5 md:grid-cols-2">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={hrefFor(category.slug)}
          data-cursor="view"
          data-cursor-label={cursorLabel}
          className="hs-card group"
        >
          <CategoryGlyph slug={category.slug} className="hs-card__mark" />

          <div className="flex items-start justify-between gap-6">
            <span className="hs-card__glyph">
              <CategoryGlyph slug={category.slug} />
            </span>
            <span className="hs-card__arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d={ARROW} />
              </svg>
            </span>
          </div>

          <h3 className="mt-8 text-3xl transition-colors group-hover:text-voltage">
            {category.title}
          </h3>
          <p className="mt-4 max-w-[50ch] text-sm leading-[1.6] text-bone-70">
            {category.lead}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {category.services.map((service) => (
              <li key={service.slug} className="chip">
                {service.title}
              </li>
            ))}
          </ul>
        </Link>
      ))}
    </div>
  );
}

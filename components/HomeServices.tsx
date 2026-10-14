/**
 * Obszary usług na stronie głównej — Server Component.
 *
 * Każdy obszar to karta z żywą sceną u góry (`ServiceScene`) — w pętli
 * widać, co klient dostaje: zamówienie ze strony, dane płynące przez AI,
 * awans w Google, stały nadzór. Na krawędzi sceny siedzą kafelek ze znakiem
 * kategorii (`CategoryGlyph`) i strzałka jak w wierszach `.oc-row`.
 */

import Link from "next/link";

import type { Dictionary } from "@/content/dictionary";
import type { ServiceCategory, ServiceCategorySlug } from "@/lib/cms";
import { CategoryGlyph } from "@/components/CategoryGlyph";
import { ServiceScene } from "@/components/ServiceScenes";

import "./home-services.css";

const ARROW = "M5 12h14M13 6l6 6-6 6";

export function HomeServices({
  categories,
  scenes,
  hrefFor,
  cursorLabel,
}: {
  categories: ServiceCategory[];
  scenes: Dictionary["home"]["services"]["scenes"];
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
          <div className="hs-card__scene">
            <ServiceScene slug={category.slug} scenes={scenes} />
          </div>

          {/* Znak i strzałka siedzą na krawędzi sceny — nie zasłaniają jej. */}
          <div className="hs-card__edge">
            <span className="hs-card__glyph">
              <CategoryGlyph slug={category.slug} />
            </span>
            <span className="hs-card__arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d={ARROW} />
              </svg>
            </span>
          </div>

          <h3 className="mt-5 text-3xl transition-colors group-hover:text-voltage">
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

/**
 * Wyjścia z podstrony kategorii — Server Components.
 *
 * `ProfitBand` — pas produktu wiodącego: wielka nazwa dryfująca przy
 * przewijaniu, czternaście kratek „dni do uruchomienia" zapełniających się
 * na osi widoczności i konkretne punkty zamiast akapitu z linkiem.
 *
 * `OtherAreas` — pozostałe kategorie jako duże wiersze w języku listy
 * realizacji z głównej (`.work-row`): znak kategorii, nazwa, usługi
 * w chipach i strzałka, która przy najechaniu obraca się „do przodu".
 */

import Link from "next/link";
import type { CSSProperties } from "react";

import type { ServiceCategory, ServiceCategorySlug } from "@/lib/cms";

import "./offer-cross-links.css";

const ARROW = "M5 12h14M13 6l6 6-6 6";
const CHECK = "M5 12.5l4.2 4.2L19 7";

/* Znaki kategorii — ten sam motyw, co makieta danej kategorii. */
const GLYPHS: Record<ServiceCategorySlug, string> = {
  "strony-i-sklepy": "M3.5 5h17v14h-17zM3.5 9h17M6.5 7h.01M9 7h.01",
  "sztuczna-inteligencja":
    "M5 9a2.5 2.5 0 1 0 0-5a2.5 2.5 0 1 0 0 5zM19 9a2.5 2.5 0 1 0 0-5a2.5 2.5 0 1 0 0 5zM12 20.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 1 0 0 5zM7.3 7.6l3.5 8M16.7 7.6l-3.5 8M7.5 6.5h9",
  "marketing-i-widocznosc":
    "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21zM12 12.2a2.2 2.2 0 1 0 0-4.4a2.2 2.2 0 1 0 0 4.4z",
  "opieka-i-wsparcie": "M3 12h4l2.5-6 4 12 2.5-6H21",
};

function Svg({ d, className }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      <path d={d} />
    </svg>
  );
}

export function ProfitBand({
  name,
  text,
  points,
  link,
  href,
}: {
  name: string;
  text: string;
  points: string[];
  link: string;
  href: string;
}) {
  return (
    <section className="pn">
      <div className="mx-auto max-w-6xl px-5 py-24 lg:py-28">
        <div className="pn__drift">
          <h2 className="mask-reveal pn__name">
            <span className="mask-reveal__inner">
              <span className="pn__dot" aria-hidden="true" />
              {name}
            </span>
          </h2>
        </div>

        {/* Czternaście dni do uruchomienia — dekoracja. Kratki zapełniają
            się falą przy przewijaniu, ostatnia świeci jak strona „na żywo". */}
        <div className="pn__days" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <i key={i} style={{ "--i": i } as CSSProperties} />
          ))}
        </div>

        <div className="mt-12 grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-end">
          <div>
            <p className="reveal max-w-[50ch] text-lg leading-[1.55] text-bone-70">{text}</p>
            <div className="reveal mt-9 flex">
              <Link
                href={href}
                data-magnetic
                className="btn-fill rounded-full bg-signal px-7 py-3.5 text-sm font-medium text-bone"
              >
                {link}
              </Link>
            </div>
          </div>

          <ul className="reveal-stagger pn__points">
            {points.map((point) => (
              <li key={point}>
                <span className="pn__check">
                  <Svg d={CHECK} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function OtherAreas({
  heading,
  lead,
  allLabel,
  allHref,
  cursorLabel,
  categories,
  hrefFor,
}: {
  heading: string;
  lead: string;
  allLabel: string;
  allHref: string;
  cursorLabel: string;
  categories: ServiceCategory[];
  hrefFor: (slug: ServiceCategorySlug) => string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-28">
      <div className="section-head">
        <h2 className="mask-reveal text-5xl">
          <span className="mask-reveal__inner">{heading}</span>
        </h2>
        <Link
          href={allHref}
          className="hit reveal text-sm font-medium text-voltage underline-offset-4 hover:underline"
        >
          {allLabel}
        </Link>
      </div>
      <p className="reveal mt-5 max-w-[56ch] leading-relaxed text-lichen">{lead}</p>

      <ul className="mt-14 divide-y divide-hairline border-y border-hairline">
        {categories.map((category) => (
          <li key={category.slug} className="reveal">
            <Link
              href={hrefFor(category.slug)}
              data-cursor="view"
              data-cursor-label={cursorLabel}
              className="work-row oc-row group"
            >
              <span className="oc-row__glyph" aria-hidden="true">
                <Svg d={GLYPHS[category.slug]} />
              </span>

              <div className="min-w-0">
                <h3 className="work-row__name text-3xl group-hover:text-voltage">
                  {category.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.services.map((service) => (
                    <span key={service.slug} className="chip">
                      {service.title}
                    </span>
                  ))}
                </div>
              </div>

              <span className="oc-row__arrow" aria-hidden="true">
                <Svg d={ARROW} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Schematyczna mapa zasięgu — element wyróżniający strony głównej.
 *
 * Renderowana w całości na serwerze jako SVG z prawdziwymi linkami.
 * Pełni dwie funkcje naraz:
 *  1. wizualną — pokazuje, że firma jest realnie z tego regionu,
 *  2. SEO — jest hubem linkowania wewnętrznego do podstron miast,
 *     czyli tym, co Google nazywa „clearly defined, browseable hierarchy"
 *     i czego brak jest jednym z sygnałów doorway pages.
 *
 * Zero JavaScriptu. Miasta bez opublikowanej podstrony są widoczne jako
 * punkty, ale nie są linkami — nie obiecujemy stron, których nie ma.
 */

import Link from "next/link";

import {
  CITIES,
  BASE_CITY,
  getCoords,
  getPhase,
  CURRENT_PHASE,
} from "@/content/cities";
import { publicPath, type Locale } from "@/lib/routes";

/* Kadr obejmujący wszystkie miasta, z marginesem na etykiety. */
const BOUNDS = { minLng: 20.3, maxLng: 22.35, minLat: 49.9, maxLat: 50.75 };
const VIEW = { width: 760, height: 430, pad: 34 };

function project(lat: number, lng: number) {
  const x =
    VIEW.pad +
    ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) *
      (VIEW.width - VIEW.pad * 2);
  /* Oś Y odwrócona — większa szerokość geograficzna jest wyżej. */
  const y =
    VIEW.pad +
    ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) *
      (VIEW.height - VIEW.pad * 2);
  return { x, y };
}

export function TerritoryMap({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const base = getCoords(BASE_CITY.slug)!;
  const origin = project(base.lat, base.lng);

  const points = CITIES.map((city) => {
    const coords = getCoords(city.slug);
    if (!coords) return null;
    return {
      city,
      published: getPhase(city.slug) <= CURRENT_PHASE,
      ...project(coords.lat, coords.lng),
    };
  }).filter((p): p is NonNullable<typeof p> => p !== null);

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
        role="img"
        aria-label={label}
        className="h-auto w-full"
      >
        {/* Promienie z Mielca — pokazują, że wszystko liczy się od bazy. */}
        <g stroke="var(--color-hairline)" strokeWidth="1">
          {points
            .filter((p) => !p.city.isBase)
            .map((p) => (
              <line
                key={`ray-${p.city.slug}`}
                x1={origin.x}
                y1={origin.y}
                x2={p.x}
                y2={p.y}
              />
            ))}
        </g>

        {/* Okręgi odległości: ok. 30 i 60 km od Mielca. */}
        <g fill="none" stroke="var(--color-hairline)" strokeDasharray="2 5">
          <circle cx={origin.x} cy={origin.y} r={78} />
          <circle cx={origin.x} cy={origin.y} r={156} />
        </g>

        {points.map(({ city, published, x, y }) => {
          const isBase = Boolean(city.isBase);

          const dot = (
            <>
              {isBase && (
                <circle
                  cx={x}
                  cy={y}
                  r={11}
                  fill="var(--color-voltage)"
                  opacity={0.18}
                />
              )}
              <circle
                cx={x}
                cy={y}
                r={isBase ? 5 : published ? 3.5 : 2.5}
                fill={
                  isBase
                    ? "var(--color-voltage)"
                    : published
                      ? "var(--color-signal)"
                      : "var(--color-lichen)"
                }
              />
              <text
                x={x + (isBase ? 12 : 8)}
                y={y + 4}
                fill={
                  isBase
                    ? "var(--color-bone)"
                    : published
                      ? "var(--color-bone)"
                      : "var(--color-lichen)"
                }
                fontSize={isBase ? 15 : 12}
                fontWeight={isBase ? 600 : 400}
                className="font-sans"
              >
                {city.name}
              </text>
            </>
          );

          /* Tylko miasta z gotową podstroną są klikalne. */
          return published ? (
            <Link
              key={city.slug}
              href={publicPath(locale, ["strony-internetowe", city.slug])}
              className="[&>text]:hover:fill-voltage [&>circle]:hover:fill-voltage"
            >
              {dot}
            </Link>
          ) : (
            <g key={city.slug}>{dot}</g>
          );
        })}
      </svg>
    </figure>
  );
}

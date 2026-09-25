/**
 * Podstrona lokalizacyjna — `/strony-internetowe/[miasto]`.
 *
 * ⚠ TO NIE JEST DOORWAY PAGE — i nie wolno dopuścić, żeby się nim stała.
 *
 * Google karze zestawy podstron różniące się wyłącznie nazwą miasta
 * („substantially similar pages"). Cała lokalna konkurencja robi dokładnie
 * to — dlatego tutaj obowiązuje twarda zasada podziału ról:
 *
 *   treść merytoryczna  → WYŁĄCZNIE `city.intro` i `city.localContext`
 *                         (ręcznie pisane, inne dla każdego miasta)
 *   szablon             → layout, nawigacja, dane strukturalne, CTA
 *
 * Czego tu celowo NIE MA:
 *  - akapitów generowanych przez podmianę nazwy miasta w szablonowym zdaniu,
 *  - bloku „obsługujemy także: Mielec, Dębica, Ropczyce…" — Google wymienia
 *    takie listy wprost w polityce keyword stuffing; linkujemy tylko do
 *    faktycznych sąsiadów z `getNearbyCities`, opisowymi anchorami,
 *  - `PostalAddress` z adresem Mielca. Schemat to `Service` z `areaServed`
 *    wskazującym TO miasto i `provider` linkującym do firmy przez `@id`.
 *
 * ⚠ Nazwy miast zawsze w pełnym brzmieniu („Głogów Małopolski",
 * „Sokołów Małopolski", „Sędziszów Małopolski") — biorą się z `city.name`
 * i nigdy nie są skracane. Powiat jest pokazany nad nagłówkiem, co rozróżnia
 * m.in. Tyczyn w powiecie rzeszowskim od Tychów.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { CITY_SLUGS, getCity, getNearbyCities } from "@/content/cities";
import {
  cityMetaDescription,
  cityText,
  countyLabel,
  getCitiesCopy,
} from "@/content/pages/cities-page";
import { SITE } from "@/content/site";
import { listCaseStudies, listServiceCategories } from "@/lib/cms";
import { breadcrumbSchema, cityServiceSchema } from "@/lib/schema";
import {
  LOCALES,
  isLocale,
  metadataAlternates,
  publicPath,
  type Locale,
} from "@/lib/routes";

/**
 * Tylko miasta z bieżącego etapu publikacji.
 * `CITY_SLUGS` celowo NIE zawiera wszystkich 22 miast — publikacja całego
 * zestawu jednego dnia to wzorzec, który Google opisuje jako „scaled content
 * abuse". Etap podnosi się w `content/cities.ts`, nie tutaj.
 */
export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    CITY_SLUGS.map((miasto) => ({ lang, miasto }))
  );
}

/* Slug spoza bieżącego etapu ma dawać 404, a nie renderować się na żądanie. */
export const dynamicParams = false;

/** Miasto z bieżącego etapu albo `undefined`. */
function publishedCity(slug: string) {
  return CITY_SLUGS.includes(slug) ? getCity(slug) : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; miasto: string }>;
}): Promise<Metadata> {
  const { lang, miasto } = await params;
  if (!isLocale(lang)) return {};

  const city = publishedCity(miasto);
  if (!city) return {};

  const copy = getCitiesCopy(lang);
  return {
    title: copy.city.metaTitle(city),
    description: cityMetaDescription(lang, city),
    alternates: metadataAlternates(lang, ["strony-internetowe", city.slug]),
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ lang: string; miasto: string }>;
}) {
  const { lang, miasto } = await params;
  if (!isLocale(lang)) notFound();

  const city = publishedCity(miasto);
  if (!city) notFound();

  const locale: Locale = lang;
  const copy = getCitiesCopy(locale);
  const text = cityText(locale, city);

  const [categories, caseStudies] = await Promise.all([
    listServiceCategories(locale),
    listCaseStudies(locale),
  ]);

  /* Realizacja z tego miasta — tylko gdy klient jawnie stąd jest. */
  const localWork = caseStudies.find((study) => study.citySlug === city.slug);

  /* Sąsiedzi: wyłącznie ci z opublikowaną podstroną, maksymalnie czterech. */
  const nearby = getNearbyCities(city)
    .filter((neighbour) => CITY_SLUGS.includes(neighbour.slug))
    .slice(0, 4);

  /* Konkret logistyczny — dane z wpisu miasta, nie zdania z szablonu. */
  const facts = [
    city.isBase
      ? { label: copy.city.facts.base, value: copy.city.facts.baseValue }
      : {
          label: copy.city.facts.distance,
          value: copy.city.facts.distanceValue(city.distanceKm),
        },
    {
      label: copy.city.facts.population,
      value: copy.city.facts.populationValue(city.population),
    },
    {
      label: copy.city.facts.meetings,
      value: city.isBase
        ? copy.city.facts.meetingsBaseValue
        : copy.city.facts.meetingsValue,
    },
  ];

  return (
    <>
      <JsonLd
        data={cityServiceSchema(
          locale,
          city,
          copy.city.schemaName(city),
          text.intro
        )}
      />
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: copy.breadcrumb.home, segments: [] },
          { name: copy.breadcrumb.hub, segments: ["strony-internetowe"] },
          {
            name: city.name,
            segments: ["strony-internetowe", city.slug],
          },
        ])}
      />

      {/* ---------------------------------------------------------- hero */}
      <section className="mx-auto max-w-6xl px-5 pt-12 pb-16 lg:pt-16">
        <nav aria-label={copy.breadcrumb.label}>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-lichen">
            <li>
              <Link
                href={publicPath(locale, [])}
                className="underline-offset-4 hover:text-bone hover:underline"
              >
                {copy.breadcrumb.home}
              </Link>
            </li>
            <li aria-hidden="true" className="opacity-50">
              /
            </li>
            <li>
              <Link
                href={publicPath(locale, ["strony-internetowe"])}
                className="underline-offset-4 hover:text-bone hover:underline"
              >
                {copy.breadcrumb.hub}
              </Link>
            </li>
            <li aria-hidden="true" className="opacity-50">
              /
            </li>
            <li className="text-bone">{city.name}</li>
          </ol>
        </nav>

        {/* Powiat + województwo: rozróżnienie miejscowości o podobnych nazwach. */}
        <p className="mt-10 text-xs uppercase tracking-[0.18em] text-lichen">
          {countyLabel(city, locale)} · {copy.voivodeshipFull[city.voivodeship]}
        </p>

        <h1 className="mt-4 max-w-[16ch] text-6xl">{copy.city.h1(city)}</h1>

        {/* Lead = `intro` tego miasta. Nic tu nie jest generowane z szablonu. */}
        <p className="mt-7 max-w-[54ch] text-lg leading-relaxed text-lichen">
          {text.intro}
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href={publicPath(locale, ["kontakt"])}
            className="rounded-md bg-signal px-5 py-3 text-sm font-medium text-bone transition-colors hover:bg-voltage hover:text-obsydian"
          >
            {copy.city.ctaButton}
          </Link>
          <Link
            href={publicPath(locale, ["oferta"])}
            className="rounded-md border border-hairline px-5 py-3 text-sm font-medium text-bone transition-colors hover:border-signal"
          >
            {copy.city.ctaSecondary}
          </Link>
        </div>
      </section>

      {/* -------------------------------------------- rynek lokalny + fakty */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
            <div>
              <h2 className="text-4xl">{copy.city.contextHeading(city)}</h2>
              {/* `localContext` — akapit napisany osobno dla tego miasta. */}
              <p className="mt-6 max-w-[60ch] leading-relaxed text-lichen">
                {text.localContext}
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-lichen">
                {copy.city.factsHeading}
              </h3>
              <dl className="mt-4 border-t border-hairline">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="border-b border-hairline py-3"
                  >
                    <dt className="text-xs text-lichen">{fact.label}</dt>
                    <dd className="mt-1 text-bone">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- oferta */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
            <h2 className="text-3xl">{copy.city.offerHeading(city)}</h2>

            <ul className="divide-y divide-hairline border-y border-hairline">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={publicPath(locale, ["oferta", category.slug])}
                    className="block py-4 text-lg text-bone transition-colors hover:text-voltage"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------ realizacja z tego miasta */}
      {localWork && (
        <section className="border-t border-hairline">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <h2 className="text-3xl">{copy.city.workHeading(city)}</h2>

            <Link
              href={publicPath(locale, ["realizacje", localWork.slug])}
              className="group mt-8 block max-w-[62ch] border-t border-hairline pt-5 transition-colors hover:border-signal"
            >
              <span className="font-display text-2xl text-bone transition-colors group-hover:text-voltage">
                {localWork.name}
              </span>
              <span className="mt-1 block text-sm text-lichen">
                {localWork.industry} · {localWork.domain}
              </span>
              <span className="mt-3 block leading-relaxed text-lichen">
                {localWork.outcome}
              </span>
              <span className="mt-4 block text-sm font-medium text-voltage">
                {copy.city.workLink}
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------- sąsiedzi */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-16">
          {nearby.length > 0 && (
            <>
              <h2 className="text-3xl">{copy.city.nearbyHeading}</h2>
              <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
                {nearby.map((neighbour) => (
                  <li key={neighbour.slug}>
                    <Link
                      href={publicPath(locale, [
                        "strony-internetowe",
                        neighbour.slug,
                      ])}
                      className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 py-4"
                    >
                      <span className="text-bone transition-colors group-hover:text-voltage">
                        {copy.city.nearbyAnchor(neighbour)}
                      </span>
                      <span className="ml-auto text-sm text-lichen">
                        {neighbour.isBase
                          ? copy.hub.baseLabel
                          : `${neighbour.distanceKm} ${copy.hub.distanceSuffix}`}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          <Link
            href={publicPath(locale, ["strony-internetowe"])}
            className={`inline-block text-sm font-medium text-voltage underline-offset-4 hover:underline ${
              nearby.length > 0 ? "mt-8" : ""
            }`}
          >
            {copy.city.backToHub}
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------- kontakt */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="max-w-[18ch] text-5xl">
            {copy.city.ctaHeading(city)}
          </h2>
          <p className="mt-5 max-w-[54ch] leading-relaxed text-lichen">
            {copy.city.ctaBody}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={publicPath(locale, ["kontakt"])}
              className="rounded-md bg-signal px-5 py-3 text-sm font-medium text-bone transition-colors hover:bg-voltage hover:text-obsydian"
            >
              {copy.city.ctaButton}
            </Link>
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="text-sm text-lichen underline-offset-4 hover:text-bone hover:underline"
            >
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="text-sm text-lichen underline-offset-4 hover:text-bone hover:underline"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

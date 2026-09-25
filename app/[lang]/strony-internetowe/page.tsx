/**
 * Hub obszaru działania — `/strony-internetowe`, EN `/en/web-design`.
 *
 * Rola SEO: to jest węzeł, który spina wszystkie podstrony miast w jedną
 * przeglądalną hierarchię („clearly defined, browseable hierarchy").
 * Brak takiego węzła jest jednym z sygnałów, po których Google rozpoznaje
 * zestaw doorway pages.
 *
 * Linkujemy WYŁĄCZNIE do miast opublikowanych (`PUBLISHED_CITIES`), bo tylko
 * one mają wygenerowaną podstronę. Pozostałe są widoczne na mapie jako punkty
 * bez linku — nie obiecujemy stron, których nie ma.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { TerritoryMap } from "@/components/TerritoryMap";
import { BASE_CITY, PUBLISHED_CITIES, type City } from "@/content/cities";
import { getCitiesCopy } from "@/content/pages/cities-page";
import { SITE } from "@/content/site";
import { listServiceCategories } from "@/lib/cms";
import { breadcrumbSchema, serviceAreaListSchema } from "@/lib/schema";
import { isLocale, metadataAlternates, publicPath } from "@/lib/routes";

/* Kolejność grup: od macierzystego województwa na zewnątrz. */
const VOIVODESHIP_ORDER: City["voivodeship"][] = [
  "podkarpackie",
  "małopolskie",
  "świętokrzyskie",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const copy = getCitiesCopy(lang);
  return {
    title: copy.hub.metaTitle,
    description: copy.hub.metaDescription,
    alternates: metadataAlternates(lang, ["strony-internetowe"]),
  };
}

export default async function TerritoryHubPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const copy = getCitiesCopy(lang);
  const categories = await listServiceCategories(lang);

  /* Grupowanie po województwie; wewnątrz grupy — od najbliższego. */
  const groups = VOIVODESHIP_ORDER.map((voivodeship) => ({
    voivodeship,
    cities: PUBLISHED_CITIES.filter(
      (city) => city.voivodeship === voivodeship
    ).sort((a, b) => a.distanceKm - b.distanceKm),
  })).filter((group) => group.cities.length > 0);

  return (
    <>
      <JsonLd data={serviceAreaListSchema(lang)} />
      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: copy.breadcrumb.home, segments: [] },
          { name: copy.breadcrumb.hub, segments: ["strony-internetowe"] },
        ])}
      />

      {/* ---------------------------------------------------------- hero */}
      <section className="mx-auto max-w-6xl px-5 pt-12 pb-16 lg:pt-20">
        <nav aria-label={copy.breadcrumb.label}>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-lichen">
            <li>
              <Link
                href={publicPath(lang, [])}
                className="underline-offset-4 hover:text-bone hover:underline"
              >
                {copy.breadcrumb.home}
              </Link>
            </li>
            <li aria-hidden="true" className="opacity-50">
              /
            </li>
            <li className="text-bone">{copy.breadcrumb.hub}</li>
          </ol>
        </nav>

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h1 className="text-5xl">{copy.hub.h1}</h1>
            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-lichen">
              {copy.hub.lead}
            </p>
            <p className="mt-4 text-sm text-lichen">
              {BASE_CITY.name}, {copy.voivodeshipFull[BASE_CITY.voivodeship]}
            </p>
          </div>

          <div>
            <TerritoryMap locale={lang} label={copy.hub.mapLabel} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- dojeżdżam */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-16">
            <h2 className="text-3xl">{copy.hub.travelHeading}</h2>
            <p className="max-w-[62ch] leading-relaxed text-lichen">
              {copy.hub.travelBody}
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- miasta */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-4xl">{copy.hub.citiesHeading}</h2>
          <p className="mt-5 max-w-[58ch] leading-relaxed text-lichen">
            {copy.hub.citiesLead}
          </p>

          <div className="mt-10 space-y-10">
            {groups.map((group) => (
              <div key={group.voivodeship}>
                <h3 className="text-xs uppercase tracking-[0.18em] text-lichen">
                  {copy.voivodeshipShort[group.voivodeship]}
                </h3>

                <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
                  {group.cities.map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={publicPath(lang, [
                          "strony-internetowe",
                          city.slug,
                        ])}
                        className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 py-4"
                      >
                        <span className="font-display text-xl text-bone transition-colors group-hover:text-voltage">
                          {city.name}
                        </span>
                        <span className="ml-auto text-sm text-lichen">
                          {city.isBase
                            ? copy.hub.baseLabel
                            : `${city.distanceKm} ${copy.hub.distanceSuffix}`}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-[62ch] border-l border-hairline pl-5">
            <h3 className="text-xl">{copy.hub.upcomingHeading}</h3>
            <p className="mt-3 text-sm leading-relaxed text-lichen">
              {copy.hub.upcomingBody}
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- oferta */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 className="text-3xl">{copy.hub.offerHeading}</h2>
              <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-lichen">
                {copy.hub.offerLead}
              </p>
            </div>

            <ul className="divide-y divide-hairline border-y border-hairline">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={publicPath(lang, ["oferta", category.slug])}
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

      {/* ---------------------------------------------------------- kontakt */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="max-w-[20ch] text-4xl">{copy.hub.ctaHeading}</h2>
          <p className="mt-5 max-w-[54ch] leading-relaxed text-lichen">
            {copy.hub.ctaBody}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={publicPath(lang, ["kontakt"])}
              className="rounded-md bg-signal px-5 py-3 text-sm font-medium text-bone transition-colors hover:bg-voltage hover:text-obsydian"
            >
              {copy.hub.ctaButton}
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

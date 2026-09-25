import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TerritoryMap } from "@/components/TerritoryMap";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/content/dictionary";
import { BASE_CITY, CITIES } from "@/content/cities";
import { listServiceCategories, listCaseStudies } from "@/lib/cms";
import { personSchema } from "@/lib/schema";
import { isLocale, metadataAlternates, publicPath } from "@/lib/routes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const pl = lang === "pl";
  return {
    title: pl
      ? "PROJSTOG — strony internetowe, które zarabiają | Mielec"
      : "PROJSTOG — websites that pay for themselves | Mielec, Poland",
    description: pl
      ? "Strony internetowe, sklepy i automatyzacje AI dla firm z Podkarpacia. Robię je sam, z Mielca — jeden kontakt od rozmowy po wsparcie po uruchomieniu."
      : "Websites, online stores and AI automation for companies in south-eastern Poland. Built by one person from Mielec, start to finish.",
    alternates: metadataAlternates(lang, []),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const t = getDictionary(lang);
  const [categories, work] = await Promise.all([
    listServiceCategories(lang),
    listCaseStudies(lang),
  ]);

  return (
    <>
      <JsonLd data={personSchema(lang)} />

      {/* ---------------------------------------------------------- hero */}
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-20 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h1 className="text-6xl">{t.home.h1}</h1>

            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-lichen">
              {t.home.lead}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={publicPath(lang, ["kontakt"])}
                className="rounded-md bg-signal px-5 py-3 text-sm font-medium text-bone transition-colors hover:bg-voltage hover:text-obsydian"
              >
                {t.home.ctaPrimary}
              </Link>
              <Link
                href={publicPath(lang, ["realizacje"])}
                className="rounded-md border border-hairline px-5 py-3 text-sm font-medium text-bone transition-colors hover:border-signal"
              >
                {t.home.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Mapa zasięgu — jedyne miejsce, gdzie strona pozwala sobie na efekt. */}
          <div>
            <TerritoryMap locale={lang} label={t.a11y.territoryMap} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ terytorium */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 className="text-4xl">{t.home.territory.heading}</h2>
              <p className="mt-5 max-w-[52ch] leading-relaxed text-lichen">
                {t.home.territory.lead}
              </p>
              <Link
                href={publicPath(lang, ["strony-internetowe"])}
                className="mt-6 inline-block text-sm font-medium text-voltage underline-offset-4 hover:underline"
              >
                {t.home.territory.allCities}
              </Link>
            </div>

            {/* Lista miast jako tekst — dostępna też bez odczytu mapy. */}
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm sm:grid-cols-3">
              {CITIES.map((city) => (
                <li key={city.slug} className="text-lichen">
                  {city.isBase ? (
                    <span className="font-medium text-bone">
                      {city.name} — {t.home.territory.base.split("—")[1]?.trim()}
                    </span>
                  ) : (
                    <>
                      {city.name}{" "}
                      <span className="text-xs opacity-60">
                        {city.distanceKm} {t.home.territory.distanceFromBase}
                      </span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- oferta */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-4xl">{t.nav.offer}</h2>

          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={publicPath(lang, ["oferta", category.slug])}
                className="group border-t border-hairline pt-5 transition-colors hover:border-signal"
              >
                <h3 className="text-2xl transition-colors group-hover:text-voltage">
                  {category.title}
                </h3>
                <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-lichen">
                  {category.lead}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ realizacje */}
      {work.length > 0 && (
        <section className="border-t border-hairline">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <h2 className="text-4xl">{t.nav.work}</h2>

            <ul className="mt-10 divide-y divide-hairline border-y border-hairline">
              {work.slice(0, 6).map((study) => (
                <li key={study.slug}>
                  <Link
                    href={publicPath(lang, ["realizacje", study.slug])}
                    className="group flex flex-wrap items-baseline gap-x-5 gap-y-1 py-5 transition-colors"
                  >
                    <span className="font-display text-xl text-bone transition-colors group-hover:text-voltage">
                      {study.name}
                    </span>
                    <span className="text-sm text-lichen">
                      {study.industry}
                    </span>
                    <span className="ml-auto text-sm text-lichen opacity-70">
                      {study.domain}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------- kontakt */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="max-w-[18ch] text-5xl">{t.home.ctaPrimary}</h2>
          <p className="mt-5 max-w-[50ch] leading-relaxed text-lichen">
            {BASE_CITY.intro}
          </p>
          <Link
            href={publicPath(lang, ["kontakt"])}
            className="mt-8 inline-block rounded-md bg-signal px-5 py-3 text-sm font-medium text-bone transition-colors hover:bg-voltage hover:text-obsydian"
          >
            {t.nav.cta}
          </Link>
        </div>
      </section>
    </>
  );
}

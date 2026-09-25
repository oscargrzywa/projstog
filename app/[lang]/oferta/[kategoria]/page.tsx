import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/content/site";
import { OFFER_CATEGORY_PAGE } from "@/content/pages/offer";
import {
  getServiceCategory,
  listServiceCategories,
  type ServiceCategory,
} from "@/lib/cms";
import { breadcrumbSchema } from "@/lib/schema";
import {
  DEFAULT_LOCALE,
  LOCALES,
  isLocale,
  metadataAlternates,
  publicPath,
  type Locale,
} from "@/lib/routes";

type RouteParams = { lang: string; kategoria: string };

/**
 * Iloczyn: 2 języki × 4 kategorie = 8 podstron prerenderowanych przy buildzie.
 *
 * Slugi kategorii są IDENTYCZNE w obu językach — tłumaczy je dopiero `SEGMENTS`
 * w `lib/routes.ts` przy składaniu publicznego adresu. Dlatego listę wystarczy
 * pobrać raz, dla języka podstawowego.
 */
export async function generateStaticParams() {
  const categories = await listServiceCategories(DEFAULT_LOCALE);

  return LOCALES.flatMap((lang) =>
    categories.map((category) => ({ lang, kategoria: category.slug }))
  );
}

/* Poza tymi ośmioma kombinacjami nic nie istnieje — żadnego renderu na żądanie. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { lang, kategoria } = await params;
  if (!isLocale(lang)) return {};

  const category = await getServiceCategory(lang, kategoria);
  if (!category) return {};

  return {
    title: category.seo.title,
    description: category.seo.description,
    alternates: metadataAlternates(lang, ["oferta", category.slug]),
  };
}

/**
 * Kategoria usług jako `Service`.
 *
 * Budowana lokalnie zamiast w `lib/schema.ts` — dotyczy wyłącznie tego route'u.
 * Wzorzec za `cityServiceSchema`: `provider` wskazuje przez `@id` na profil
 * firmy wystawiony raz w root layoucie, zamiast powielać dane NAP.
 *
 * `hasOfferCatalog` wymienia dokładnie te usługi, które widać na stronie —
 * dane strukturalne niezgodne z treścią widoczną łamią wytyczne Google.
 */
function categoryServiceSchema(
  locale: Locale,
  category: ServiceCategory
): object {
  const absolute = (path: string) => new URL(path, SITE.url).toString();

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: category.title,
    description: category.seo.description,
    serviceType: category.title,
    provider: { "@id": `${SITE.url}/#firma` },
    areaServed: SITE.areaServed.map((region) => ({
      "@type": "AdministrativeArea",
      name: `województwo ${region}`,
    })),
    url: absolute(publicPath(locale, ["oferta", category.slug])),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: category.title,
      itemListElement: category.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
        },
      })),
    },
  };
}

export default async function ServiceCategoryPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { lang, kategoria } = await params;
  if (!isLocale(lang)) notFound();

  const [category, all] = await Promise.all([
    getServiceCategory(lang, kategoria),
    listServiceCategories(lang),
  ]);
  if (!category) notFound();

  const page = OFFER_CATEGORY_PAGE[lang];
  const others = all.filter((c) => c.slug !== category.slug);

  return (
    <>
      <JsonLd data={categoryServiceSchema(lang, category)} />
      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: page.breadcrumb.home, segments: [] },
          { name: page.breadcrumb.offer, segments: ["oferta"] },
          { name: category.title, segments: ["oferta", category.slug] },
        ])}
      />

      {/* ---------------------------------------------------- nagłówek */}
      <section className="mx-auto max-w-6xl px-5 pt-10 pb-14 lg:pt-14">
        <nav
          aria-label={page.breadcrumb.label}
          className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-lichen"
        >
          <Link
            href={publicPath(lang, [])}
            className="underline-offset-4 transition-colors hover:text-bone hover:underline"
          >
            {page.breadcrumb.home}
          </Link>
          <span aria-hidden className="opacity-50">
            /
          </span>
          <Link
            href={publicPath(lang, ["oferta"])}
            className="underline-offset-4 transition-colors hover:text-bone hover:underline"
          >
            {page.breadcrumb.offer}
          </Link>
          <span aria-hidden className="opacity-50">
            /
          </span>
          <span aria-current="page" className="text-bone">
            {category.title}
          </span>
        </nav>

        <h1 className="mt-8 max-w-[18ch] text-5xl">{category.title}</h1>
        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-lichen">
          {category.lead}
        </p>
      </section>

      {/* ------------------------------------------------------- usługi */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <h2 className="text-4xl">{page.servicesHeading}</h2>
          <p className="mt-4 max-w-[56ch] leading-relaxed text-lichen">
            {page.servicesLead}
          </p>

          <ol className="mt-12">
            {category.services.map((service, index) => (
              <li
                key={service.slug}
                id={service.slug}
                className="scroll-mt-24 border-t border-hairline py-8 last:border-b"
              >
                <div className="grid gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
                  <div>
                    <span className="text-sm tabular-nums text-lichen opacity-70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-3xl">{service.title}</h3>
                    <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-lichen">
                      {service.summary}
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm leading-relaxed text-lichen"
                      >
                        <span
                          aria-hidden
                          className="mt-2.5 h-px w-4 shrink-0 bg-signal"
                        />
                        <span className="max-w-[56ch]">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------- produkt wiodący */}
      <section className="border-t border-hairline bg-basalt">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <p className="max-w-[62ch] leading-relaxed text-lichen">
            {page.profitNudge.text}
          </p>
          <Link
            href={publicPath(lang, ["oferta"])}
            className="mt-4 inline-block text-sm font-medium text-voltage underline-offset-4 hover:underline"
          >
            {page.profitNudge.link}
          </Link>
        </div>
      </section>

      {/* ------------------------------------------- pozostałe obszary */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl">{page.other.heading}</h2>
          <p className="mt-4 max-w-[52ch] leading-relaxed text-lichen">
            {page.other.lead}
          </p>

          <ul className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={publicPath(lang, ["oferta", other.slug])}
                  className="group block border-t border-hairline pt-4 transition-colors hover:border-signal"
                >
                  <h3 className="text-xl transition-colors group-hover:text-voltage">
                    {other.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-lichen opacity-70">
                    {other.services.map((s) => s.title).join(" · ")}
                  </p>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={publicPath(lang, ["oferta"])}
                className="group block border-t border-hairline pt-4 transition-colors hover:border-signal"
              >
                <h3 className="text-xl transition-colors group-hover:text-voltage">
                  {page.backToOffer}
                </h3>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------ kontakt */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="max-w-[20ch] text-5xl">{page.cta.heading}</h2>
          <p className="mt-5 max-w-[56ch] leading-relaxed text-lichen">
            {page.cta.lead}
          </p>
          <Link
            href={publicPath(lang, ["kontakt"])}
            className="mt-8 inline-block rounded-md bg-signal px-5 py-3 text-sm font-medium text-bone transition-colors hover:bg-voltage hover:text-obsydian"
          >
            {page.cta.button}
          </Link>
        </div>
      </section>
    </>
  );
}

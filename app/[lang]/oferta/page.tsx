import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/content/site";
import { OFFER_PAGE } from "@/content/pages/offer";
import { getDictionary } from "@/content/dictionary";
import { listServiceCategories, type ServiceCategory } from "@/lib/cms";
import { breadcrumbSchema } from "@/lib/schema";
import { isLocale, metadataAlternates, publicPath, type Locale } from "@/lib/routes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const { seo } = OFFER_PAGE[lang];
  return {
    title: seo.title,
    description: seo.description,
    alternates: metadataAlternates(lang, ["oferta"]),
  };
}

/**
 * Produkt wiodący jako `Service`.
 *
 * Budowany lokalnie, a nie w `lib/schema.ts` — dotyczy wyłącznie tej podstrony,
 * więc nie ma powodu obciążać nim wspólnego modułu. Wzorzec i `@id` dostawcy
 * są te same co w `cityServiceSchema`: profil firmy istnieje raz, w root layoucie,
 * a każdy `Service` tylko się do niego odwołuje.
 *
 * `hasOfferCatalog` wymienia cztery obszary usług — dokładnie te, które widać
 * niżej na stronie. Dane strukturalne nie mogą obiecywać więcej niż treść.
 */
function profitSiteSchema(
  locale: Locale,
  categories: ServiceCategory[]
): object {
  const { profit, categories: section } = OFFER_PAGE[locale];
  const absolute = (path: string) => new URL(path, SITE.url).toString();

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: profit.name,
    description: profit.tagline,
    serviceType:
      locale === "pl" ? "Tworzenie stron internetowych" : "Web design",
    provider: { "@id": `${SITE.url}/#firma` },
    areaServed: SITE.areaServed.map((region) => ({
      "@type": "AdministrativeArea",
      name: `województwo ${region}`,
    })),
    url: absolute(publicPath(locale, ["oferta"])),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: section.heading,
      itemListElement: categories.map((category) => ({
        "@type": "OfferCatalog",
        name: category.title,
        url: absolute(publicPath(locale, ["oferta", category.slug])),
        itemListElement: category.services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.summary,
          },
        })),
      })),
    },
  };
}

export default async function OfferPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const t = getDictionary(lang);
  const page = OFFER_PAGE[lang];
  const categories = await listServiceCategories(lang);

  return (
    <>
      <JsonLd data={profitSiteSchema(lang, categories)} />
      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: page.breadcrumb.home, segments: [] },
          { name: page.breadcrumb.offer, segments: ["oferta"] },
        ])}
      />

      {/* ------------------------------------------------------------ hero */}
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-14 lg:pt-24">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-lichen">
          {t.nav.offer}
        </p>
        <h1 className="mt-5 max-w-[16ch] text-6xl">{page.h1}</h1>
        <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-lichen">
          {page.lead}
        </p>
      </section>

      {/* --------------------------------------------- produkt wiodący */}
      <section className="border-y border-hairline bg-basalt">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-voltage">
                {page.profit.eyebrow}
              </p>
              <h2 className="mt-4 text-5xl">{page.profit.name}</h2>
              <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-bone">
                {page.profit.tagline}
              </p>

              {page.profit.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="mt-5 max-w-[56ch] leading-relaxed text-lichen"
                >
                  {paragraph}
                </p>
              ))}

              <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Link
                  href={publicPath(lang, ["kontakt"])}
                  className="rounded-md bg-signal px-5 py-3 text-sm font-medium text-bone transition-colors hover:bg-voltage hover:text-obsydian"
                >
                  {page.profit.cta}
                </Link>
                <p className="max-w-[34ch] text-sm leading-relaxed text-lichen">
                  {page.profit.ctaNote}
                </p>
              </div>
            </div>

            {/* Zakres / termin / cena — trzy obietnice, każda z warunkiem. */}
            <dl className="grid gap-y-6 self-start sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-1">
              {page.profit.pillars.map((pillar) => (
                <div key={pillar.label} className="border-t border-hairline pt-4">
                  <dt className="text-xs font-medium uppercase tracking-[0.18em] text-lichen">
                    {pillar.label}
                  </dt>
                  <dd className="mt-2 font-display text-xl leading-tight text-bone">
                    {pillar.value}
                  </dd>
                  <dd className="mt-2 max-w-[44ch] text-sm leading-relaxed text-lichen">
                    {pillar.note}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Zawartość pakietu. */}
          <div className="mt-14 border-t border-hairline pt-8">
            <h3 className="text-2xl">{page.profit.includesHeading}</h3>
            <ul className="mt-6 grid gap-x-12 sm:grid-cols-2">
              {page.profit.includes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-t border-hairline py-3 text-sm leading-relaxed text-lichen"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 h-px w-4 shrink-0 bg-signal"
                  />
                  <span className="max-w-[48ch]">{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-[64ch] text-sm leading-relaxed text-lichen">
              {page.profit.notFit}
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- cztery obszary */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <h2 className="text-4xl">{page.categories.heading}</h2>
          <p className="mt-4 max-w-[56ch] leading-relaxed text-lichen">
            {page.categories.lead}
          </p>

          <ul className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={publicPath(lang, ["oferta", category.slug])}
                  className="group block border-t border-hairline pt-5 transition-colors hover:border-signal"
                >
                  <h3 className="text-2xl transition-colors group-hover:text-voltage">
                    {category.title}
                  </h3>
                  <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-lichen">
                    {category.lead}
                  </p>
                  <p className="mt-4 text-xs leading-relaxed text-lichen opacity-70">
                    {category.services.map((s) => s.title).join(" · ")}
                  </p>
                  <span className="mt-5 inline-block text-sm font-medium text-voltage underline-offset-4 group-hover:underline">
                    {page.categories.linkLabel}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------- proces */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <h2 className="text-4xl">{page.process.heading}</h2>
          <p className="mt-4 max-w-[56ch] leading-relaxed text-lichen">
            {page.process.lead}
          </p>

          <ol className="mt-12 border-t border-hairline">
            {page.process.steps.map((step, index) => (
              <li
                key={step.name}
                className="grid gap-x-10 gap-y-2 border-b border-hairline py-6 sm:grid-cols-[2.5rem_minmax(0,12rem)_minmax(0,1fr)]"
              >
                <span className="text-sm tabular-nums text-lichen opacity-70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl">{step.name}</h3>
                <div>
                  <p className="max-w-[56ch] text-sm leading-relaxed text-lichen">
                    {step.description}
                  </p>
                  <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-lichen opacity-70">
                    {step.need}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------- kontakt */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="max-w-[18ch] text-5xl">{page.cta.heading}</h2>
          <p className="mt-5 max-w-[56ch] leading-relaxed text-lichen">
            {page.cta.lead}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={publicPath(lang, ["kontakt"])}
              className="rounded-md bg-signal px-5 py-3 text-sm font-medium text-bone transition-colors hover:bg-voltage hover:text-obsydian"
            >
              {page.cta.button}
            </Link>
            <Link
              href={publicPath(lang, ["realizacje"])}
              className="rounded-md border border-hairline px-5 py-3 text-sm font-medium text-bone transition-colors hover:border-signal"
            >
              {t.home.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

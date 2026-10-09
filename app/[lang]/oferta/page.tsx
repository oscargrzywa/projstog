import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ProfitSpec } from "@/components/ProfitSpec";
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
 * więc nie ma powodu obciążać nim wspólnego modułu. Profil firmy istnieje raz,
 * w root layoucie, a każdy `Service` tylko się do niego odwołuje przez `@id`.
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
  /* Etykieta kursora nad wierszem obszaru (czyta ją components/Cursor). */
  const cursorViewLabel = lang === "pl" ? "Zobacz" : "View";

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
      <PageHero
        crumbsLabel={page.breadcrumb.label}
        crumbs={[
          { label: page.breadcrumb.home, href: publicPath(lang, []) },
          { label: page.breadcrumb.offer },
        ]}
        title={page.h1}
        lead={<p>{page.lead}</p>}
        actions={
          <>
            <Link
              href={publicPath(lang, ["kontakt"])}
              data-magnetic
              className="btn-fill rounded-full bg-signal px-7 py-3.5 text-sm font-medium text-bone"
            >
              {page.profit.cta}
            </Link>
            <Link
              href={publicPath(lang, ["realizacje"])}
              data-magnetic
              className="rounded-full border border-bone-12 px-7 py-3.5 text-sm font-medium text-bone transition-colors duration-250 hover:border-signal"
            >
              {t.home.ctaSecondary}
            </Link>
          </>
        }
        aside={
          <ProfitSpec
            name={page.profit.name}
            caption={page.profit.spec.caption}
            sign={page.profit.spec.sign}
            pillars={page.profit.pillars}
          />
        }
      />

      {/* --------------------------------------------- produkt wiodący */}
      <section id="profit-site" className="border-b border-hairline bg-basalt">
        <div className="mx-auto max-w-6xl px-5 py-28">
          <p className="reveal chip inline-flex items-center gap-2">
            <span className="live-dot" aria-hidden="true" />
            {page.profit.eyebrow}
          </p>
          <h2 className="mask-reveal mt-7 text-7xl">
            <span className="mask-reveal__inner">{page.profit.name}</span>
          </h2>
          <p className="reveal mt-7 max-w-[30ch] font-display text-3xl leading-[1.15] text-bone">
            {page.profit.tagline}
          </p>

          <div className="mt-16 grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
            <div>
              {page.profit.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="reveal prose-col mb-5 text-bone-70"
                >
                  {paragraph}
                </p>
              ))}

              <div className="reveal mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link
                  href={publicPath(lang, ["kontakt"])}
                  data-magnetic
                  className="btn-fill rounded-full bg-signal px-7 py-3.5 text-sm font-medium text-bone"
                >
                  {page.profit.cta}
                </Link>
                <p className="max-w-[34ch] text-sm leading-relaxed text-lichen">
                  {page.profit.ctaNote}
                </p>
              </div>
            </div>

            {/* Zakres / termin / cena — trzy obietnice, każda z warunkiem. */}
            <dl className="reveal-stagger grid gap-y-8 self-start">
              {page.profit.pillars.map((pillar) => (
                <div key={pillar.label} className="panel">
                  <dt className="text-sm text-lichen">{pillar.label}</dt>
                  <dd className="mt-2 font-display text-2xl leading-tight text-bone">
                    {pillar.value}
                  </dd>
                  <dd className="mt-3 max-w-[44ch] text-sm leading-relaxed text-bone-70">
                    {pillar.note}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Zawartość pakietu — ptaszki rysują się przy przewijaniu. */}
          <div className="mt-24">
            <h3 className="mask-reveal text-4xl">
              <span className="mask-reveal__inner">{page.profit.includesHeading}</span>
            </h3>
            <ul className="reveal-stagger mt-10 grid gap-x-14 border-t border-hairline sm:grid-cols-2">
              {page.profit.includes.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 border-b border-hairline py-5 leading-relaxed text-bone-70"
                >
                  <svg className="includes-check" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 8.5l3.2 3.2L13 4.5" />
                  </svg>
                  <span className="max-w-[46ch]">{item}</span>
                </li>
              ))}
            </ul>

            <p className="reveal mt-10 max-w-[64ch] border-l-2 border-signal pl-5 leading-relaxed text-bone-70">
              {page.profit.notFit}
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- cztery obszary */}
      {/* Wiersze, nie kafelki — nazwa, zakres i usługi czytają się jak spis
          treści oferty. Hover jak na liście realizacji na głównej. */}
      <section className="mx-auto max-w-6xl px-5 py-28">
        <h2 className="mask-reveal max-w-[18ch] text-5xl">
          <span className="mask-reveal__inner">{page.categories.heading}</span>
        </h2>
        <p className="reveal mt-5 max-w-[56ch] leading-relaxed text-lichen">
          {page.categories.lead}
        </p>

        <ul className="mt-14 divide-y divide-hairline border-y border-hairline">
          {categories.map((category) => (
            <li key={category.slug} className="reveal">
              <Link
                href={publicPath(lang, ["oferta", category.slug])}
                data-cursor="view"
                data-cursor-label={cursorViewLabel}
                className="work-row group grid gap-x-10 gap-y-4 py-10 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)]"
              >
                <h3 className="work-row__name text-3xl group-hover:text-voltage">
                  {category.title}
                </h3>
                <div>
                  <p className="max-w-[58ch] leading-relaxed text-bone-70">
                    {category.lead}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {category.services.map((service) => (
                      <li key={service.slug} className="chip">
                        {service.title}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-block text-sm font-medium text-voltage underline-offset-4 group-hover:underline">
                    {page.categories.linkLabel}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* -------------------------------------------------------- proces */}
      <section className="overflow-x-clip border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-28">
          <h2 className="mask-reveal max-w-[18ch] text-5xl">
            <span className="mask-reveal__inner">{page.process.heading}</span>
          </h2>
          <p className="reveal mt-5 max-w-[56ch] leading-relaxed text-lichen">
            {page.process.lead}
          </p>

          <div className="mt-14">
            <ProcessSteps steps={page.process.steps} visual={page.process.visual} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- kontakt */}
      <CtaBand
        heading={page.cta.heading}
        lead={page.cta.lead}
        primary={{ label: page.cta.button, href: publicPath(lang, ["kontakt"]) }}
        secondary={{ label: t.home.ctaSecondary, href: publicPath(lang, ["realizacje"]) }}
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { OtherAreas, ProfitBand } from "@/components/OfferCrossLinks";
import { PageHero } from "@/components/PageHero";
import { ServiceScrolly } from "@/components/ServiceScrolly";
import { ServiceStage } from "@/components/ServiceStage";
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

/** Kotwica listy usług — cel przycisku w nagłówku. */
const SERVICES_ANCHOR = "uslugi";

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
 * `provider` wskazuje przez `@id` na profil
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
  const offerHref = publicPath(lang, ["oferta"]);
  const contactHref = publicPath(lang, ["kontakt"]);

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
      <PageHero
        crumbsLabel={page.breadcrumb.label}
        crumbs={[
          { label: page.breadcrumb.home, href: publicPath(lang, []) },
          { label: page.breadcrumb.offer, href: offerHref },
          { label: category.title },
        ]}
        title={category.title}
        titleClassName="max-w-[15ch]"
        lead={<p>{category.lead}</p>}
        actions={
          <>
            <Link
              href={contactHref}
              data-magnetic
              className="btn-fill rounded-full bg-signal px-7 py-3.5 text-sm font-medium text-bone"
            >
              {page.cta.button}
            </Link>
            <a
              href={`#${SERVICES_ANCHOR}`}
              data-magnetic
              className="rounded-full border border-bone-12 px-7 py-3.5 text-sm font-medium text-bone transition-colors duration-250 ease-[var(--ease-out-quart)] hover:border-signal"
            >
              {page.jump}
            </a>
          </>
        }
      />

      {/* ------------------------------------------------------- usługi */}
      {/* Scrollytelling: pełne opisy usług renderuje serwer; wyspa
          ServiceScrolly dokłada tylko numer usługi w kadrze, od którego
          zależy stan przyklejonej makiety obok (od lg). Do lg każda usługa
          ma nad opisem statyczną kopię swojej warstwy makiety. */}
      <section
        id={SERVICES_ANCHOR}
        className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-28 pb-24 lg:pb-32"
      >
        <h2 className="mask-reveal max-w-[18ch] text-5xl">
          <span className="mask-reveal__inner">{page.servicesHeading}</span>
        </h2>
        <p className="reveal mt-5 max-w-[56ch] leading-relaxed text-lichen">
          {page.servicesLead}
        </p>

        <div className="mt-16 lg:mt-12">
          <ServiceScrolly
            items={category.services.map(({ slug, title }) => ({ slug, title }))}
            indexLabel={page.indexLabel}
            stage={<ServiceStage category={category} copy={page.stage} />}
          >
            <ol className="svc-steps">
              {category.services.map((service, index) => (
                <li
                  key={service.slug}
                  id={service.slug}
                  data-step={index}
                  className="svc-step"
                >
                  <div className="svc-step__stage reveal" aria-hidden="true" data-s={index}>
                    <ServiceStage category={category} copy={page.stage} only={index} />
                  </div>

                  <h3 className="mask-reveal text-4xl">
                    <span className="mask-reveal__inner">{service.title}</span>
                  </h3>
                  <p className="reveal mt-6 max-w-[50ch] text-lg leading-[1.55] text-bone-70">
                    {service.summary}
                  </p>

                  <ul className="svc-step__bullets reveal-stagger mt-8">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="svc-step__bullet">
                        <span className="svc-step__check" aria-hidden="true">
                          <svg viewBox="0 0 24 24" focusable="false">
                            <path d="M5 12.5l4.2 4.2L19 7" />
                          </svg>
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </ServiceScrolly>
        </div>
      </section>

      {/* ------------------------------------------- produkt wiodący */}
      <ProfitBand
        name={page.profitNudge.name}
        text={page.profitNudge.text}
        points={page.profitNudge.points}
        link={page.profitNudge.link}
        href={offerHref}
      />

      {/* ------------------------------------------- pozostałe obszary */}
      <OtherAreas
        heading={page.other.heading}
        lead={page.other.lead}
        allLabel={page.backToOffer}
        allHref={offerHref}
        cursorLabel={page.other.cursor}
        categories={others}
        hrefFor={(slug) => publicPath(lang, ["oferta", slug])}
      />

      {/* ------------------------------------------------------ kontakt */}
      <CtaBand
        heading={page.cta.heading}
        lead={page.cta.lead}
        primary={{ label: page.cta.button, href: contactHref }}
      />
    </>
  );
}

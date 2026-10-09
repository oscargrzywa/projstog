/**
 * Dane strukturalne schema.org.
 *
 * Zasada: opisujemy wyłącznie stan faktyczny. Dane strukturalne niezgodne
 * z treścią widoczną na stronie są łamaniem wytycznych Google i grożą
 * ręczną karą — nie dopisywać tu niczego „na wyrost".
 */

import { SITE } from "@/content/site";
import { publicPath, type Locale } from "./routes";

function absolute(path: string): string {
  return new URL(path, SITE.url).toString();
}

/** Stałe identyfikatory — spinają wszystkie grafy na stronie. */
const BUSINESS_ID = `${SITE.url}/#firma`;
const OWNER_ID = `${SITE.url}/#wlasciciel`;

/** Adres — stałe miejsce wykonywania działalności wg CEIDG. */
function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    postalCode: SITE.address.postalCode,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  };
}

/**
 * Profil firmy. Obecny na każdej podstronie przez root layout.
 *
 * ⚠ Typ: `["LocalBusiness", "Organization"]`, NIE `ProfessionalService`.
 * schema.org wycofało `ProfessionalService` („deprecated due to confusion
 * with Service"), mimo że większość poradników nadal go zaleca.
 *
 * ⚠ Celowo BEZ `aggregateRating`. Google nie pokazuje gwiazdek dla opinii,
 * którymi zarządza sam opisywany podmiot („If the entity that's being
 * reviewed controls the reviews about itself... ineligible for star review
 * feature"). Opinie prezentujemy wizualnie i zbieramy w Google Moja Firma.
 */
export function localBusinessSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Organization"],
    "@id": BUSINESS_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: absolute(publicPath(locale)),
    email: SITE.email,
    telephone: SITE.phoneRaw,
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: SITE.hours.opens,
        closes: SITE.hours.closes,
      },
    ],
    founder: { "@type": "Person", "@id": OWNER_ID, name: SITE.owner },
    taxID: SITE.nip,
    identifier: { "@type": "PropertyValue", propertyID: "REGON", value: SITE.regon },
    sameAs: Object.values(SITE.social).filter(Boolean),
    /* Obszar obsługi — miasta działania i województwo. Google nie wymienia
       `areaServed` w dokumentacji, to nie jest dźwignia rankingowa. */
    areaServed: [
      ...SITE.cities.map((city) => ({ "@type": "City", name: city })),
      ...SITE.areaServed.map((region) => ({
        "@type": "AdministrativeArea",
        name: `województwo ${region}`,
      })),
    ],
    priceRange: SITE.priceRange,
  };
}

/**
 * Profil właściciela jako osoby. Buduje encję eksperta — istotne dla E-E-A-T
 * i dla tego, czy modele AI potrafią powiązać firmę z konkretnym człowiekiem.
 */
export function personSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": OWNER_ID,
    name: SITE.owner,
    url: absolute(publicPath(locale, ["o-mnie"])),
    worksFor: { "@id": BUSINESS_ID },
    knowsAbout:
      locale === "pl"
        ? [
            "tworzenie stron internetowych",
            "sklepy internetowe",
            "pozycjonowanie lokalne",
            "automatyzacje AI",
            "Next.js",
            "WordPress",
          ]
        : [
            "web development",
            "e-commerce",
            "local SEO",
            "AI automation",
            "Next.js",
            "WordPress",
          ],
    sameAs: Object.values(SITE.social).filter(Boolean),
  };
}

/** Okruszki nawigacyjne. Segmenty podaje się jako pary etykieta + ścieżka wewnętrzna. */
export function breadcrumbSchema(
  locale: Locale,
  trail: { name: string; segments: string[] }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(publicPath(locale, item.segments)),
    })),
  };
}

/** Wpis blogowy. */
export function articleSchema(
  locale: Locale,
  post: {
    slug: string;
    title: string;
    description: string;
    publishedAt: string;
    updatedAt?: string;
  }
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Person", name: SITE.owner, url: absolute(publicPath(locale, ["o-mnie"])) },
    publisher: { "@id": BUSINESS_ID },
    mainEntityOfPage: absolute(publicPath(locale, ["blog", post.slug])),
    inLanguage: locale,
  };
}

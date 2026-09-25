/**
 * JEDYNE ŹRÓDŁO PRAWDY o adresach strony.
 *
 * Używane przez:
 *  - `proxy.ts`          — przepisanie publicznego URL-a na wewnętrzną ścieżkę
 *  - `generateMetadata`  — canonical + hreflang
 *  - `app/sitemap.ts`    — lista URL-i z alternatywami językowymi
 *  - przełącznik języka  — odpowiednik bieżącej strony w drugim języku
 *
 * ⚠ Dlaczego to musi być jeden plik:
 * Next.js NIE WIE o przepisaniu (rewrite) wykonanym w `proxy.ts`. Do
 * `generateMetadata` trafiają params ścieżki WEWNĘTRZNEJ (polskie slugi).
 * Gdyby canonical budować z `params`, strona angielska wystawiłaby
 * `/en/oferta` zamiast `/en/services`. Dlatego każdy publiczny adres
 * powstaje wyłącznie z tej mapy.
 *
 * ⚠ Plik musi zostać CZYSTY — same stałe i funkcje bez stanu.
 * Jest importowany przez `proxy.ts`, który działa poza kodem renderującym.
 */

export const LOCALES = ["pl", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pl";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Segmenty ścieżek. Klucz = segment WEWNĘTRZNY (nazwa folderu w `app/[lang]/`).
 * Wartość = publiczny slug w każdym języku.
 *
 * Nazwy folderów są polskie, bo polski jest językiem podstawowym.
 */
const SEGMENTS = {
  oferta: { pl: "oferta", en: "services" },
  "strony-i-sklepy": { pl: "strony-i-sklepy", en: "websites-and-stores" },
  "sztuczna-inteligencja": {
    pl: "sztuczna-inteligencja",
    en: "artificial-intelligence",
  },
  "marketing-i-widocznosc": {
    pl: "marketing-i-widocznosc",
    en: "marketing-and-visibility",
  },
  "opieka-i-wsparcie": { pl: "opieka-i-wsparcie", en: "care-and-support" },
  realizacje: { pl: "realizacje", en: "work" },
  blog: { pl: "blog", en: "blog" },
  "strony-internetowe": { pl: "strony-internetowe", en: "web-design" },
  "o-mnie": { pl: "o-mnie", en: "about" },
  kontakt: { pl: "kontakt", en: "contact" },
  "polityka-prywatnosci": {
    pl: "polityka-prywatnosci",
    en: "privacy-policy",
  },
} as const satisfies Record<string, Record<Locale, string>>;

export type InternalSegment = keyof typeof SEGMENTS;

/** Odwrotna mapa: publiczny slug (per język) → segment wewnętrzny. */
const PUBLIC_TO_INTERNAL: Record<Locale, Record<string, string>> = {
  pl: {},
  en: {},
};

for (const [internal, byLocale] of Object.entries(SEGMENTS)) {
  for (const locale of LOCALES) {
    PUBLIC_TO_INTERNAL[locale][byLocale[locale]] = internal;
  }
}

/** Publiczny slug segmentu w danym języku. Nieznany segment zwracany bez zmian. */
export function publicSegment(segment: string, locale: Locale): string {
  const entry = SEGMENTS[segment as InternalSegment];
  return entry ? entry[locale] : segment;
}

/** Segment wewnętrzny dla publicznego sluga. Nieznany slug zwracany bez zmian. */
export function internalSegment(segment: string, locale: Locale): string {
  return PUBLIC_TO_INTERNAL[locale][segment] ?? segment;
}

/**
 * Publiczna ścieżka dla podanych segmentów wewnętrznych.
 *
 * PL nie ma prefiksu (`/oferta`), EN ma (`/en/services`).
 * Segmenty dynamiczne (slug wpisu, slug miasta) przekazuj jako zwykłe stringi —
 * nie ma ich w mapie, więc przejdą bez zmian.
 *
 *   publicPath("pl", ["oferta"])                     -> "/oferta"
 *   publicPath("en", ["oferta"])                     -> "/en/services"
 *   publicPath("en", ["strony-internetowe", "mielec"]) -> "/en/web-design/mielec"
 *   publicPath("pl", [])                             -> "/"
 */
export function publicPath(locale: Locale, segments: string[] = []): string {
  const translated = segments.map((s) => publicSegment(s, locale));
  const prefix = locale === DEFAULT_LOCALE ? [] : [locale];
  const path = [...prefix, ...translated].join("/");
  return path ? `/${path}` : "/";
}

/**
 * Wewnętrzna ścieżka (ta, którą rozumie router Next) dla publicznego URL-a.
 * Używane wyłącznie przez `proxy.ts`.
 *
 *   internalPath("/oferta")            -> "/pl/oferta"
 *   internalPath("/en/services")       -> "/en/oferta"
 *   internalPath("/en/web-design/mielec") -> "/en/strony-internetowe/mielec"
 *   internalPath("/")                  -> "/pl"
 */
export function internalPath(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);

  const locale: Locale =
    parts[0] && isLocale(parts[0]) ? parts[0] : DEFAULT_LOCALE;
  const rest = parts[0] && isLocale(parts[0]) ? parts.slice(1) : parts;

  const translated = rest.map((s) => internalSegment(s, locale));
  return `/${[locale, ...translated].join("/")}`;
}

/**
 * Wszystkie warianty językowe danej strony — do `alternates.languages`.
 * `x-default` wskazuje wersję polską, bo to język podstawowy i rynek docelowy.
 */
export function languageAlternates(
  segments: string[] = []
): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    alternates[locale] = publicPath(locale, segments);
  }
  alternates["x-default"] = publicPath(DEFAULT_LOCALE, segments);
  return alternates;
}

/**
 * Odpowiednik bieżącego publicznego adresu w drugim języku.
 * Używane przez przełącznik języka, który zna tylko `usePathname()`.
 *
 *   switchLocale("/oferta", "en")            -> "/en/services"
 *   switchLocale("/en/web-design/mielec", "pl") -> "/strony-internetowe/mielec"
 */
export function switchLocale(publicPathname: string, target: Locale): string {
  const parts = publicPathname.split("/").filter(Boolean);

  const current: Locale =
    parts[0] && isLocale(parts[0]) ? parts[0] : DEFAULT_LOCALE;
  const rest = parts[0] && isLocale(parts[0]) ? parts.slice(1) : parts;

  /* Publiczne slugi bieżącego języka -> segmenty wewnętrzne -> slugi docelowe. */
  const internal = rest.map((s) => internalSegment(s, current));
  return publicPath(target, internal);
}

/**
 * Komplet pól `alternates` dla `generateMetadata`.
 * Ścieżki są względne — składa je `metadataBase` z root layoutu.
 */
export function metadataAlternates(locale: Locale, segments: string[] = []) {
  return {
    canonical: publicPath(locale, segments),
    languages: languageAlternates(segments),
  };
}

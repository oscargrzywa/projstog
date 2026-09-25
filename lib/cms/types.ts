/**
 * Model treści — niezależny od źródła.
 *
 * Te typy są kontraktem między warstwą treści a widokami. Komponenty znają
 * WYŁĄCZNIE te typy i nigdy nie importują plików z `content/` bezpośrednio.
 * Dzięki temu podmiana źródła na headless CMS (Sanity, Payload, Contentful,
 * Strapi) sprowadza się do napisania nowej implementacji `ContentSource`
 * i podmiany jednej linijki w `lib/cms/index.ts`.
 *
 * Kształt pól jest celowo zbliżony do tego, co CMS-y zwracają natywnie —
 * zwłaszcza `RichText` jako lista bloków, którą bez strat odwzorowuje
 * Portable Text (Sanity), Rich Text (Contentful) i Lexical (Payload).
 */

import type { Locale } from "@/lib/routes";

/* ---------------------------------------------------------------- treść */

export type RichTextBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "callout"; text: string };

export type RichText = RichTextBlock[];

/** Pola SEO wspólne dla każdej treści — CMS-y zwykle mają je jako osobną grupę. */
export type Seo = {
  title: string;
  description: string;
  /** Ścieżka do obrazu OG. Gdy brak, generowany jest domyślny. */
  ogImage?: string;
  /** Wyłączenie z indeksowania — np. dla polityki prywatności. */
  noIndex?: boolean;
};

export type ImageRef = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

/* ------------------------------------------------------------------ blog */

export type Author = {
  name: string;
  role?: string;
  avatar?: ImageRef;
};

export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  cover?: ImageRef;
  tags: string[];
  /** Czas czytania w minutach — liczony przy imporcie, nie w komponencie. */
  readingMinutes: number;
  /** Slug miasta, jeśli wpis jest powiązany z konkretnym rynkiem lokalnym. */
  citySlug?: string;
};

export type Post = PostSummary & {
  body: RichText;
  author: Author;
  seo: Seo;
};

/* ------------------------------------------------------------ realizacje */

export type CaseStudySummary = {
  slug: string;
  /** Nazwa klienta lub projektu. */
  name: string;
  /** Domena bez protokołu — „luksusowyogrod.pl". */
  domain: string;
  url: string;
  /** Branża — „ogrody", „ubezpieczenia". */
  industry: string;
  /** Jednozdaniowy efekt: po co to powstało i co dało. */
  outcome: string;
  tech: string[];
  cover?: ImageRef;
  /** Miasto klienta, jeśli lokalny — wiąże realizację z podstroną miasta. */
  citySlug?: string;
  /** Kolejność na liście; niżej = wyżej na stronie. */
  order: number;
};

export type CaseStudy = CaseStudySummary & {
  body: RichText;
  seo: Seo;
};

/* ---------------------------------------------------------------- usługi */

export type ServiceCategorySlug =
  | "strony-i-sklepy"
  | "sztuczna-inteligencja"
  | "marketing-i-widocznosc"
  | "opieka-i-wsparcie";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
};

export type ServiceCategory = {
  slug: ServiceCategorySlug;
  title: string;
  lead: string;
  services: Service[];
  seo: Seo;
};

/* -------------------------------------------------------- źródło treści */

/**
 * Interfejs źródła treści.
 *
 * Wszystkie metody są asynchroniczne — lokalne źródło zwraca gotowe dane
 * natychmiast, ale dzięki temu podmiana na CMS z zapytaniami sieciowymi
 * nie wymusza zmian w komponentach.
 */
export interface ContentSource {
  listPosts(locale: Locale): Promise<PostSummary[]>;
  getPost(locale: Locale, slug: string): Promise<Post | null>;

  listCaseStudies(locale: Locale): Promise<CaseStudySummary[]>;
  getCaseStudy(locale: Locale, slug: string): Promise<CaseStudy | null>;

  listServiceCategories(locale: Locale): Promise<ServiceCategory[]>;
  getServiceCategory(
    locale: Locale,
    slug: string
  ): Promise<ServiceCategory | null>;
}

/**
 * Teksty ramowe sekcji BLOG i REALIZACJE.
 *
 * Tu mieszka wyłącznie „obudowa" — nagłówki list, etykiety metadanych,
 * podpisy przycisków. Treść merytoryczna (wpisy, opisy realizacji) przychodzi
 * przez `lib/cms` i nigdy nie jest importowana z tego pliku.
 *
 * Dlaczego osobny plik, a nie `content/dictionary.ts`: słownik opisuje
 * nawigację i elementy obecne na każdej stronie. To są teksty dwóch
 * konkretnych sekcji — rosną razem z nimi i nie mają po co puchnąć
 * w pliku dzielonym przez cały serwis.
 *
 * Obie gałęzie muszą mieć identyczny kształt — pilnuje tego typ `PagesCopy`.
 */

import type { Locale } from "@/lib/routes";

/**
 * Znacznik treści do dopisania przez właściciela strony.
 *
 * Gdy pojawi się w `outcome` realizacji, podstrona pokazuje dyskretną
 * informację zamiast udawać, że opis jest gotowy. Świadomie NIE ukrywamy
 * takiego wpisu — niewidoczna luka to luka, o której nikt nie pamięta.
 */
export const TODO_MARKER = "[DO UZUPEŁNIENIA]";

const pl = {
  blog: {
    title: "Blog",
    lead:
      "Piszę o tym, co realnie wpływa na to, czy strona firmy zarabia: o widoczności w Google, o kosztach, o decyzjach, które zapadają na długo przed pierwszą linijką kodu. Bez marketingowej nowomowy i bez porad przepisanych z angielskich blogów.",
    empty:
      "Pierwsze wpisy są w przygotowaniu. Wrócę tu z konkretami, nie z wypełniaczem.",
    readingTime: "min czytania",
    author: "Autor",
    published: "Opublikowano",
    updated: "Aktualizacja",
    tags: "Tagi",
    backToList: "Wszystkie wpisy",
    related: "Inne wpisy",
    cta: {
      heading: "Masz pytanie do tego tekstu?",
      body:
        "Jeśli coś z powyższego dotyczy Twojej firmy — napisz. Odpowiadam osobiście, nie przez formularz obsługiwany przez dział.",
      button: "Napisz do mnie",
    },
  },

  work: {
    title: "Realizacje",
    lead:
      "Strony, które działają pod prawdziwymi adresami i mają prawdziwych właścicieli. Każdą można otworzyć i sprawdzić samemu — dlatego nie ma tu obiecanych wzrostów, tylko zakres pracy i to, po co powstała.",
    empty: "Realizacje są w przygotowaniu.",
    industry: "Branża",
    outcome: "Po co powstała",
    tech: "Technologie",
    visitSite: "Otwórz stronę",
    backToList: "Wszystkie realizacje",
    todoNotice:
      "Opis tej realizacji czeka na uzupełnienie przez właściciela strony.",
    cta: {
      heading: "Chcesz podobną stronę?",
      body:
        "Zacznijmy od rozmowy o tym, co ma robić — układ i technologia wynikną z odpowiedzi.",
      button: "Umów rozmowę",
    },
  },
};

/* Bez `as const` — inaczej typ opisywałby konkretne polskie napisy
   i wersja angielska nie dałaby się do niego przypisać. */
export type PagesCopy = typeof pl;

const en: PagesCopy = {
  blog: {
    title: "Blog",
    lead:
      "Notes on what actually decides whether a company website pays for itself: visibility in Google, real costs, and the choices made long before the first line of code. No marketing jargon, no advice copied from someone else's blog.",
    empty: "The first posts are being written. I will be back with substance, not filler.",
    readingTime: "min read",
    author: "Author",
    published: "Published",
    updated: "Updated",
    tags: "Tags",
    backToList: "All posts",
    related: "More posts",
    cta: {
      heading: "A question about this piece?",
      body:
        "If any of the above applies to your company, write to me. I answer personally — not through a form handled by a department.",
      button: "Get in touch",
    },
  },

  work: {
    title: "Work",
    lead:
      "Websites that run under real addresses and belong to real owners. You can open every one of them and check for yourself — which is why there are no promised growth figures here, only the scope of the work and the reason the site exists.",
    empty: "Case studies are on the way.",
    industry: "Industry",
    outcome: "Why it exists",
    tech: "Stack",
    visitSite: "Visit the site",
    backToList: "All work",
    todoNotice: "This case study is still waiting for the owner to finish the copy.",
    cta: {
      heading: "Want something similar?",
      body:
        "Let's start with what the site has to do — the layout and the stack follow from that answer.",
      button: "Book a call",
    },
  },
};

const COPY: Record<Locale, PagesCopy> = { pl, en };

export function getPageCopy(locale: Locale): PagesCopy {
  return COPY[locale];
}

/**
 * Data w formacie właściwym dla języka strony.
 *
 * Mapowanie locale → tag BCP 47 jest decyzją redakcyjną (EN celujemy
 * w brytyjski zapis dzień-miesiąc-rok, nie amerykański), dlatego mieszka
 * przy tekstach, a nie w warstwie widoku. Formatowanie ręczne odpada —
 * polski wymaga dopełniacza miesiąca, który `Intl` zna, a `toLocaleDateString`
 * bez jawnego locale zwróciłby format serwera.
 */
export function formatDate(locale: Locale, iso: string): string {
  return new Intl.DateTimeFormat(locale === "pl" ? "pl-PL" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

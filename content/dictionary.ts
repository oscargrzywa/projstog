/**
 * Treści interfejsu w obu językach.
 *
 * Teksty merytoryczne (opisy miast, wpisy blogowe, opisy usług) mieszkają
 * w osobnych plikach — tutaj trzymamy wyłącznie warstwę interfejsu, żeby
 * plik nie spuchł tak jak `content.ts` na starej stronie.
 *
 * Obie gałęzie muszą mieć identyczny kształt — pilnuje tego typ `Dictionary`.
 */

import type { Locale } from "@/lib/routes";

const pl = {
  a11y: {
    skipToContent: "Przejdź do treści",
    mainNav: "Nawigacja główna",
    footerNav: "Nawigacja w stopce",
    openMenu: "Otwórz menu",
    closeMenu: "Zamknij menu",
    switchLanguage: "Zmień język na angielski",
    territoryMap: "Mapa miast, w których działa PROJSTOG",
  },

  nav: {
    offer: "Oferta",
    work: "Realizacje",
    blog: "Blog",
    about: "O mnie",
    contact: "Kontakt",
    cta: "Napisz do mnie",
  },

  home: {
    /* Nagłówek bez akcentowania pojedynczych słów kolorem. */
    h1: "Strony, które zarabiają.",
    lead:
      "Robię strony internetowe dla firm z Podkarpacia i okolic. Sam — od rozmowy, przez projekt, po wsparcie po uruchomieniu. Bez account managerów i bez przerzucania się mailami między działami.",
    ctaPrimary: "Umów rozmowę",
    ctaSecondary: "Zobacz realizacje",

    territory: {
      heading: "Gdzie pracuję",
      lead:
        "Jestem z Mielca i stąd jeżdżę do klientów. Poniżej miasta, które obsługuję — kliknij swoje, żeby zobaczyć, jak wygląda tam rynek i czego potrzebuje lokalna firma.",
      baseLabel: "moja baza",
      distanceFromBase: "km od Mielca",
      allCities: "Wszystkie miasta",
    },
  },

  footer: {
    tagline: "Strony internetowe i rozwiązania cyfrowe dla firm z Podkarpacia.",
    columnOffer: "Oferta",
    columnCompany: "Firma",
    columnCities: "Miasta",
    columnContact: "Kontakt",
    privacy: "Polityka prywatności",
    rights: "Wszelkie prawa zastrzeżone.",
    moreCities: "Zobacz wszystkie miasta",
  },

  common: {
    readMore: "Czytaj dalej",
    backToHome: "Wróć na stronę główną",
    phone: "Telefon",
    email: "E-mail",
  },
};

/* Bez `as const` — inaczej typ opisywałby konkretne polskie napisy
   i wersja angielska nie dałaby się do niego przypisać. */
export type Dictionary = typeof pl;

const en: Dictionary = {
  a11y: {
    skipToContent: "Skip to content",
    mainNav: "Main navigation",
    footerNav: "Footer navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: "Switch language to Polish",
    territoryMap: "Map of cities served by PROJSTOG",
  },

  nav: {
    offer: "Services",
    work: "Work",
    blog: "Blog",
    about: "About",
    contact: "Contact",
    cta: "Get in touch",
  },

  home: {
    h1: "Websites that pay for themselves.",
    lead:
      "I build websites for companies across south-eastern Poland. On my own — from the first conversation through design to support after launch. No account managers, no messages bouncing between departments.",
    ctaPrimary: "Book a call",
    ctaSecondary: "See the work",

    territory: {
      heading: "Where I work",
      lead:
        "I am based in Mielec and drive out to clients from here. Below are the cities I serve — pick yours to see what the local market looks like and what a business there actually needs.",
      baseLabel: "home base",
      distanceFromBase: "km from Mielec",
      allCities: "All cities",
    },
  },

  footer: {
    tagline: "Websites and digital tools for companies in south-eastern Poland.",
    columnOffer: "Services",
    columnCompany: "Company",
    columnCities: "Cities",
    columnContact: "Contact",
    privacy: "Privacy policy",
    rights: "All rights reserved.",
    moreCities: "See all cities",
  },

  common: {
    readMore: "Read more",
    backToHome: "Back to home",
    phone: "Phone",
    email: "Email",
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = { pl, en };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

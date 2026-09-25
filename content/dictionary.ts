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
    badge: "Mielec, Podkarpacie",
    h1: "Strony, które zarabiają.",
    lead:
      "Robię strony internetowe, sklepy i automatyzacje dla firm z Podkarpacia. Sam — od pierwszej rozmowy, przez projekt, po wsparcie po uruchomieniu. Jeden numer telefonu, jedna osoba odpowiedzialna.",
    ctaPrimary: "Umów rozmowę",
    ctaSecondary: "Zobacz realizacje",
    orCall: "albo zadzwoń",

    stats: {
      /* ⚠ Liczba zrealizowanych projektów — DO PODANIA przez właściciela.
         Nie wpisywać tu liczby realizacji z portfolio: na stronie pokazujemy
         tylko wybrane, a zrobionych jest znacznie więcej. Dopóki nie znamy
         prawdziwej liczby, pokazujemy rok startu. */
      sinceLabel: "robię to od",
      baseLabel: "baza i dojazd",
      replyValue: "do 24 h",
      replyLabel: "czas odpowiedzi",
    },

    services: {
      heading: "Co dla Ciebie zrobię",
      lead:
        "Cztery obszary, trzynaście konkretnych usług. Zakres i cenę ustalamy przed startem, żeby nie było niespodzianek w trakcie.",
      all: "Pełna oferta",
    },

    notAgency: {
      heading: "Nie agencja. Człowiek z Mielca.",
      lead:
        "Sprawdziłem, kto wyświetla się w Google na strony internetowe w podkarpackich miastach. Prawie żadna z tych firm nie ma tu siedziby:",
      punchline: "Ja mam. Dojadę, usiądziemy i pogadamy.",
      detail:
        "To nie jest argument marketingowy, tylko różnica w tym, jak wygląda współpraca. Nie przekazuję projektu dalej i nie tłumaczę Ci, że „to inny dział”. Odbieram telefon i znam Twój projekt na pamięć, bo zrobiłem go sam.",
    },

    local: {
      heading: "Obsługuję firmy z całego regionu",
      lead:
        "Jestem z Mielca i stąd dojeżdżam do klientów. Wybierz swoje miasto — opisuję tam, jak wygląda lokalny rynek i czego zwykle potrzebuje firma z okolicy.",
      all: "Zobacz obszar działania",
    },

    process: {
      heading: "Jak to wygląda",
      steps: [
        {
          title: "Rozmowa",
          body: "Telefon albo spotkanie. Mówisz, co ma robić strona i dla kogo. Ja mówię, co się da zrobić i w jakim zakresie.",
        },
        {
          title: "Wycena i zakres",
          body: "Dostajesz spisany zakres i jedną kwotę za całość. Bez rozliczania godzin i bez dopłat w trakcie.",
        },
        {
          title: "Projekt i realizacja",
          body: "Pokazuję układ strony, potem buduję. Na bieżąco masz podgląd, więc uwagi zgłaszasz zanim będzie za późno.",
        },
        {
          title: "Uruchomienie i opieka",
          body: "Wdrożenie, wizytówka Google, indeksacja. Potem hosting, kopie zapasowe i zmiany w treści, jeśli chcesz.",
        },
      ],
    },

    work: {
      heading: "Realizacje",
      lead: "Strony, które działają na żywo. Każdą zrobiłem od początku do końca.",
      all: "Wszystkie realizacje",
      visit: "Otwórz stronę",
    },

    blog: {
      heading: "Z bloga",
      lead: "Konkretne odpowiedzi na pytania, które słyszę najczęściej.",
      all: "Wszystkie wpisy",
    },

    contact: {
      heading: "Porozmawiajmy o Twojej stronie",
      lead:
        "Napisz albo zadzwoń. Powiem wprost, czy umiem pomóc, ile to będzie kosztować i ile potrwa. Jeśli to nie jest robota dla mnie — też to usłyszysz.",
      cta: "Napisz do mnie",
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
    badge: "Mielec, south-eastern Poland",
    h1: "Websites that pay for themselves.",
    lead:
      "I build websites, online stores and automation for companies across south-eastern Poland. On my own — from the first conversation through design to support after launch. One phone number, one person accountable.",
    ctaPrimary: "Book a call",
    ctaSecondary: "See the work",
    orCall: "or call",

    stats: {
      sinceLabel: "building sites since",
      baseLabel: "base and travel",
      replyValue: "under 24 h",
      replyLabel: "reply time",
    },

    services: {
      heading: "What I can build for you",
      lead:
        "Four areas, thirteen concrete services. Scope and price are agreed before we start, so nothing changes halfway through.",
      all: "Full service list",
    },

    notAgency: {
      heading: "Not an agency. A person from Mielec.",
      lead:
        "I checked who ranks in Google for web design in this region's towns. Almost none of those companies are based here:",
      punchline: "I am. I can drive over and we can talk in person.",
      detail:
        "This is not a marketing line, it changes how the work actually goes. I do not hand your project to someone else and I never tell you it belongs to another department. I answer the phone and I know your project by heart, because I built it.",
    },

    local: {
      heading: "Working across the region",
      lead:
        "I am based in Mielec and drive out to clients from here. Pick your town — each page describes the local market and what a business there usually needs.",
      all: "See the service area",
    },

    process: {
      heading: "How it works",
      steps: [
        {
          title: "Conversation",
          body: "A call or a meeting. You say what the site has to do and who it is for. I say what is realistic and what it takes.",
        },
        {
          title: "Scope and quote",
          body: "You get the scope in writing and one price for the whole thing. No hourly billing, no extras added along the way.",
        },
        {
          title: "Design and build",
          body: "I show the layout first, then build it. You can follow progress throughout, so feedback lands while it still costs nothing.",
        },
        {
          title: "Launch and care",
          body: "Deployment, Google Business Profile, indexing. Then hosting, backups and content changes whenever you need them.",
        },
      ],
    },

    work: {
      heading: "Work",
      lead: "Sites running live right now. I built each one end to end.",
      all: "All projects",
      visit: "Open the site",
    },

    blog: {
      heading: "From the blog",
      lead: "Straight answers to the questions I hear most often.",
      all: "All posts",
    },

    contact: {
      heading: "Let's talk about your site",
      lead:
        "Write or call. I will tell you plainly whether I can help, what it costs and how long it takes. If it is not a job for me, you will hear that too.",
      cta: "Get in touch",
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

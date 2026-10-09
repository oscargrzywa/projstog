/**
 * Teksty podstron OFERTY — `/oferta` i `/oferta/[kategoria]`.
 *
 * Merytoryka usług (nazwy, opisy, punkty zakresu) mieszka w `content/services.ts`
 * i trafia tutaj przez `lib/cms`. Ten plik trzyma WYŁĄCZNIE warstwę redakcyjną
 * samych widoków: nagłówki sekcji, opis produktu wiodącego, opis procesu i CTA.
 *
 * Celowo osobno od `content/dictionary.ts` — tam jest interfejs wspólny dla
 * całej strony, tu teksty istotne tylko dla dwóch route'ów.
 *
 * ⚠ Redakcja: nigdzie nie podajemy kwot. Cennik nie jest ustalony, a wpisana
 * „od X zł" rozjedzie się z ofertą przy pierwszej rozmowie. Mówimy o MODELU
 * rozliczenia („stała cena ustalana przed startem"), nie o liczbach.
 */

import type { Locale } from "@/lib/routes";

/** Filar produktu wiodącego: jedna obietnica + warunek, na jakim jest ważna. */
type Pillar = {
  label: string;
  value: string;
  note: string;
};

/** Etap procesu. `need` mówi wprost, czego potrzebuję od klienta — to najczęstsze źródło opóźnień. */
type ProcessStep = {
  name: string;
  description: string;
  need: string;
};

export type OfferOverviewContent = {
  seo: { title: string; description: string };
  h1: string;
  lead: string;

  profit: {
    eyebrow: string;
    name: string;
    tagline: string;
    body: string[];
    pillars: Pillar[];
    includesHeading: string;
    includes: string[];
    cta: string;
    ctaNote: string;
    notFit: string;
  };

  categories: { heading: string; lead: string; linkLabel: string };
  process: { heading: string; lead: string; steps: ProcessStep[] };
  cta: { heading: string; lead: string; button: string };

  breadcrumb: { label: string; home: string; offer: string };
};

export type OfferCategoryContent = {
  backToOffer: string;
  servicesHeading: string;
  servicesLead: string;
  other: { heading: string; lead: string };
  profitNudge: { text: string; link: string };
  cta: { heading: string; lead: string; button: string };
  breadcrumb: { label: string; home: string; offer: string };
};

/* ------------------------------------------------------- /oferta (przegląd) */

export const OFFER_PAGE: Record<Locale, OfferOverviewContent> = {
  pl: {
    seo: {
      title: "Oferta — strony, sklepy, AI i lokalne SEO | PROJSTOG Mielec / Rzeszów",
      description:
        "Profit Site: strona o ustalonym zakresie, uruchomienie w 14 dni, " +
        "stała cena podana przed startem. Do tego sklepy, automatyzacje AI, " +
        "widoczność w Google i opieka po uruchomieniu. Mielec, Rzeszów i Podkarpacie.",
    },

    h1: "Wiesz, co dostajesz, zanim zaczniemy.",
    lead:
      "Stronę, sklep, automatyzacje, widoczność w Google i opiekę załatwisz " +
      "u jednej osoby. Najprostszy start to Profit Site — strona o z góry " +
      "ustalonym zakresie, terminie i cenie. Jeśli potrzebujesz więcej, " +
      "dobierasz to, co pasuje do Twojej firmy.",

    profit: {
      eyebrow: "Produkt wiodący",
      name: "Profit Site",
      tagline:
        "Strona firmowa uruchamiana w 14 dni, w stałym zakresie i stałej cenie.",
      body: [
        "Przy stronie internetowej najbardziej boli nie projekt graficzny, " +
          "tylko brak odpowiedzi na dwa pytania: kiedy będzie gotowa i ile " +
          "ostatecznie wyjdzie. Profit Site zaczyna właśnie od nich. Zakres, " +
          "termin i cenę znasz, zanim powstanie pierwsza linijka kodu.",
        "Dostajesz spisany komplet podstron i funkcji. Nic nie zostaje do " +
          "niego dopisane po cichu ani doliczone później. Jeśli w trakcie " +
          "zechcesz czegoś spoza listy, dostaniesz osobną wycenę i sam " +
          "zdecydujesz, czy robimy to teraz, czy po uruchomieniu.",
      ],
      pillars: [
        {
          label: "Zakres",
          value: "Ustalony przed startem",
          note:
            "Lista podstron, sekcji i funkcji spisana w jednym dokumencie, " +
            "który akceptujemy oboje przed rozpoczęciem pracy.",
        },
        {
          label: "Termin",
          value: "14 dni do uruchomienia",
          note:
            "Liczone od dnia, w którym dostanę od Ciebie komplet treści i zdjęć. " +
            "Ten warunek usłyszysz już na pierwszej rozmowie, żeby nie był niespodzianką.",
        },
        {
          label: "Cena",
          value: "Stała, znana przed startem",
          note:
            "Jedna kwota za całość, podana w ofercie. Zmienić ją może wyłącznie " +
            "Twoja decyzja o rozszerzeniu zakresu — nigdy moja.",
        },
      ],
      includesHeading: "Co wchodzi w pakiet",
      includes: [
        "Projekt robiony pod Twoją firmę, nie szablon z podmienionym logo",
        "Komplet podstron ustalony na starcie — zwykle strona główna, oferta, o firmie, realizacje i kontakt",
        "Teksty napisane na podstawie rozmowy z Tobą, nie przeklejone od konkurencji",
        "Formularz kontaktowy i dane firmy zgodne z wizytówką Google Moja Firma",
        "Podstawy SEO: tytuły, opisy, mapa strony, dane strukturalne LocalBusiness",
        "Mierzenie ruchu od pierwszego dnia — widzisz, skąd przychodzą zapytania",
        "Szkolenie po uruchomieniu i okres poprawek wliczony w cenę",
      ],
      cta: "Zapytaj o Profit Site",
      ctaNote:
        "Pierwsza rozmowa jest bezpłatna i do niczego nie zobowiązuje. " +
        "Odpowiedź dostajesz zwykle tego samego dnia.",
      notFit:
        "Profit Site nie pasuje do wszystkiego. Jeśli potrzebujesz sklepu, " +
        "portalu z panelem redakcyjnym albo aplikacji pod konkretny proces, " +
        "to inna praca i inna wycena. Wtedy zacznij od obszarów poniżej.",
    },

    categories: {
      heading: "Wybierz, czego potrzebujesz",
      lead:
        "Na każdej podstronie zobaczysz pełną listę usług i to, co dokładnie " +
        "wchodzi w zakres.",
      linkLabel: "Zobacz zakres",
    },

    process: {
      heading: "Co się dzieje na każdym etapie",
      lead:
        "Pięć etapów, zawsze tych samych, niezależnie od wielkości projektu. " +
        "Na każdym wiesz, co się dzieje i czego potrzeba od Ciebie.",
      steps: [
        {
          name: "Brief",
          description:
            "Rozmowa o Twojej firmie, o tym, kto do Ciebie dzwoni i po co ta " +
            "strona. Po niej dostajesz spisany zakres, termin i cenę.",
          need: "Od Ciebie: godzina czasu i szczera odpowiedź, na czym naprawdę Ci zależy.",
        },
        {
          name: "Projekt",
          description:
            "Układ podstron i wygląd do zatwierdzenia, zanim powstanie kod. " +
            "Poprawki na tym etapie są najszybsze i nic nie kosztują.",
          need: "Od Ciebie: uwagi zebrane w jednej turze, zamiast mailem co godzinę.",
        },
        {
          name: "Realizacja",
          description:
            "Strona powstaje z Twoimi treściami i zdjęciami i jest sprawdzana " +
            "na telefonie, tablecie i komputerze. Pracę widzisz na bieżąco pod roboczym adresem.",
          need: "Od Ciebie: komplet tekstów i zdjęć — to najczęstszy powód opóźnień.",
        },
        {
          name: "Uruchomienie",
          description:
            "Domena, certyfikat, mapa strony, wizytówka Google, mierzenie " +
            "ruchu. Twoja strona trafia na żywo, a ja sprawdzam, czy Google ją widzi.",
          need: "Od Ciebie: dostęp do domeny albo zgoda, żebym kupił ją w Twoim imieniu.",
        },
        {
          name: "Opieka",
          description:
            "Kopie zapasowe, aktualizacje, drobne zmiany i telefon do tej samej " +
            "osoby, gdy coś przestanie działać. Bez systemu zgłoszeń.",
          need: "Od Ciebie: nic. Na tym polega ten etap.",
        },
      ],
    },

    cta: {
      heading: "Powiedz, czego potrzebuje Twoja firma",
      lead:
        "Napisz w dwóch zdaniach, co chcesz zrobić. Dowiesz się, czy to " +
        "robota na Profit Site, czy na osobną wycenę — także wtedy, gdy " +
        "lepiej pomoże Ci ktoś inny.",
      button: "Zapytaj o wycenę",
    },

    breadcrumb: {
      label: "Okruszki nawigacyjne",
      home: "Strona główna",
      offer: "Oferta",
    },
  },

  en: {
    seo: {
      title: "Services — websites, stores, AI and local SEO | PROJSTOG",
      description:
        "Profit Site: a website with a fixed scope, live in 14 days, at a " +
        "price agreed before we start. Plus online stores, AI automation, " +
        "Google visibility and ongoing care. Based in Mielec and Rzeszów, Poland.",
    },

    h1: "You know what you get before we start.",
    lead:
      "Your website, store, automation, Google visibility and ongoing care, " +
      "all handled by one person. The simplest start is Profit Site — a " +
      "website with the scope, deadline and price settled up front. If you " +
      "need more, you add what fits your business.",

    profit: {
      eyebrow: "Flagship product",
      name: "Profit Site",
      tagline:
        "A company website live in 14 days, at a fixed scope and a fixed price.",
      body: [
        "The painful part of a website project is rarely the design. It is not " +
          "knowing the answer to two questions: when will it be finished, and " +
          "what will it finally cost. Profit Site starts with those. You know " +
          "the scope, deadline and price before a single line of code exists.",
        "You get a written list of pages and features. Nothing quietly gets " +
          "added to it, and nothing quietly gets billed for later. If halfway " +
          "through you want something outside that list, you get a separate " +
          "quote and decide whether it happens now or after launch.",
      ],
      pillars: [
        {
          label: "Scope",
          value: "Agreed before we start",
          note:
            "A list of pages, sections and features written into one document " +
            "that we both sign off before any work begins.",
        },
        {
          label: "Timeline",
          value: "14 days to launch",
          note:
            "Counted from the day you send all the copy and photos. You hear " +
            "that condition in the first call, so it is never a surprise.",
        },
        {
          label: "Price",
          value: "Fixed, known up front",
          note:
            "One figure for the whole job, stated in the quote. Only your " +
            "decision to widen the scope can change it — never mine.",
        },
      ],
      includesHeading: "What the package covers",
      includes: [
        "A design made for your business, not a template with your logo dropped in",
        "A set of pages agreed at the start — usually home, services, about, work and contact",
        "Copy written from our conversation, not lifted from a competitor",
        "A contact form and business details matching your Google Business Profile",
        "Search basics: titles, descriptions, sitemap, LocalBusiness structured data",
        "Traffic measurement from day one, so you can see where enquiries come from",
        "A handover session after launch and a revision period included in the price",
      ],
      cta: "Ask about Profit Site",
      ctaNote:
        "The first conversation is free and commits you to nothing. " +
        "You usually get a reply the same day.",
      notFit:
        "Profit Site does not fit every job. If you need a store, an editorial " +
        "platform or an application built around one specific process, that is " +
        "different work and a different quote. Start from the areas below.",
    },

    categories: {
      heading: "Pick what you need",
      lead:
        "Each page shows you the full list of services and exactly what is " +
        "included.",
      linkLabel: "See what it covers",
    },

    process: {
      heading: "What happens at each stage",
      lead:
        "Five stages, always the same ones, whatever the size of the project. " +
        "At every stage you know what is happening and what is needed from you.",
      steps: [
        {
          name: "Brief",
          description:
            "A conversation about your business, who calls you and what the " +
            "site is for. Afterwards you get a written scope, deadline and price.",
          need: "From you: an hour, and an honest answer about what really matters.",
        },
        {
          name: "Design",
          description:
            "Page structure and visuals for your approval before any code " +
            "exists. Changes at this stage are the fastest and cost nothing.",
          need: "From you: feedback gathered in one round, not an email every hour.",
        },
        {
          name: "Build",
          description:
            "Your site is built with your content and photos, and checked on " +
            "phone, tablet and desktop. You watch it grow on a staging address.",
          need: "From you: all the copy and photos — the most common cause of delay.",
        },
        {
          name: "Launch",
          description:
            "Domain, certificate, sitemap, Google listing, analytics. Your site " +
            "goes live and I confirm that Google can actually see it.",
          need: "From you: access to the domain, or permission to buy it on your behalf.",
        },
        {
          name: "Care",
          description:
            "Backups, updates, small changes and a phone number for the same " +
            "person when something stops working. No ticket system.",
          need: "From you: nothing. That is the whole point of this stage.",
        },
      ],
    },

    cta: {
      heading: "Tell me what your business needs",
      lead:
        "Two sentences about what you want to build is enough. You will find " +
        "out whether it is a Profit Site job or a separate quote — including " +
        "when someone else would serve you better.",
      button: "Ask for a quote",
    },

    breadcrumb: {
      label: "Breadcrumb",
      home: "Home",
      offer: "Services",
    },
  },
};

/* ------------------------------------------------ /oferta/[kategoria] */

export const OFFER_CATEGORY_PAGE: Record<Locale, OfferCategoryContent> = {
  pl: {
    backToOffer: "Cała oferta",
    servicesHeading: "Co dokładnie dostajesz",
    servicesLead:
      "Poniżej każda usługa z tego obszaru: po co jest i co konkretnie " +
      "wchodzi w zakres. Jeśli czegoś na liście nie ma, po prostu zapytaj.",
    other: {
      heading: "Pozostałe obszary",
      lead:
        "Projekty rzadko mieszczą się w jednej szufladzie. Zobacz, co jeszcze " +
        "możesz zdjąć ze swojej głowy.",
    },
    profitNudge: {
      text:
        "Potrzebujesz po prostu dobrej strony bez rozkładania wszystkiego na " +
        "czynniki pierwsze? Profit Site ma ustalony zakres, stałą cenę i " +
        "uruchomienie w 14 dni.",
      link: "Poznaj Profit Site",
    },
    cta: {
      heading: "Nie wiesz, czy to ten obszar?",
      lead:
        "Opisz krótko, co chcesz osiągnąć. Jeśli sprawa należy do innej " +
        "kategorii albo w ogóle nie do mnie, usłyszysz to od razu — bez " +
        "przeciągania rozmowy.",
      button: "Zapytaj o wycenę",
    },
    breadcrumb: {
      label: "Okruszki nawigacyjne",
      home: "Strona główna",
      offer: "Oferta",
    },
  },

  en: {
    backToOffer: "All services",
    servicesLead:
      "Every service in this area below: what it is for and what exactly is " +
      "included. If something you need is not on the list, just ask.",
    servicesHeading: "What exactly you get",
    other: {
      heading: "The other areas",
      lead:
        "Projects rarely fit into a single box. Here is what else I can take " +
        "off your hands.",
    },
    profitNudge: {
      text:
        "Just need a good website without taking everything apart first? " +
        "Profit Site comes with a fixed scope, a fixed price and a launch in " +
        "14 days.",
      link: "See Profit Site",
    },
    cta: {
      heading: "Not sure this is the right area?",
      lead:
        "Describe briefly what you want to achieve. If it belongs in another " +
        "category, or not with me at all, you will hear so straight away " +
        "rather than having the conversation dragged out.",
      button: "Ask for a quote",
    },
    breadcrumb: {
      label: "Breadcrumb",
      home: "Home",
      offer: "Services",
    },
  },
};

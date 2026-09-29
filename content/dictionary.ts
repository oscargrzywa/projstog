/**
 * Treści interfejsu w obu językach.
 *
 * Teksty merytoryczne (wpisy blogowe, opisy usług, realizacje) mieszkają
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
  },

  nav: {
    offer: "Oferta",
    work: "Realizacje",
    blog: "Blog",
    about: "O mnie",
    contact: "Kontakt",
    cta: "Zapytaj o wycenę",
  },

  home: {
    badge: "Mielec, Podkarpacie",
    h1: "Strona, która zarabia dla Twojej firmy.",
    lead:
      "Dostajesz stronę, sklep albo automatyzację, która pomaga Ci zdobywać klientów i zdejmuje z Ciebie ręczną robotę. Od pierwszej rozmowy po opiekę po starcie masz jeden numer telefonu i jedną osobę, która odpowiada za całość.",
    ctaPrimary: "Umów bezpłatną rozmowę",
    ctaSecondary: "Zobacz strony klientów",
    orCall: "albo zadzwoń",

    services: {
      heading: "Co zyskuje Twoja firma",
      lead:
        "Wybierasz to, czego potrzebujesz: stronę, sklep, automatyzację, widoczność w Google albo opiekę. Zakres i cenę znasz przed startem, więc w trakcie nic Cię nie zaskoczy.",
      all: "Pełna oferta",
    },

    notAgency: {
      heading: "Rozmawiasz z człowiekiem z Mielca, nie z agencją.",
      lead:
        "Wpisz w Google „strony internetowe” i nazwę podkarpackiego miasta. Prawie żadna z firm na górze wyników nie ma tu siedziby.",
      punchline: "Ze mną spotkasz się na miejscu, przy jednym stole.",
      detail:
        "Dla Ciebie to prostsza współpraca. Twój projekt nie trafia do podwykonawcy i nikt nie odsyła Cię do „innego działu”. Dzwonisz i rozmawiasz z osobą, która zrobiła Twoją stronę i zna ją na pamięć.",
    },


    /* Sekcja-film na stronie głównej (components/ProcessFilm).
       `chapters` idą do HTML-u jako treść; `demo` to wyłącznie teksty
       dekoracyjnej animacji (aria-hidden) — fikcyjna firma klienta. */
    process: {
      heading: "Od pierwszej rozmowy do pierwszego klienta",
      lead:
        "Tak wygląda cała droga Twojej strony, krok po kroku. Każdy etap prowadzę sam, więc przez cały czas rozmawiasz z tą samą osobą.",
      chapters: [
        {
          title: "Rozmowa i wycena",
          body: "Mówisz, co strona ma dla Ciebie robić i do kogo trafiać. Dostajesz spisany zakres i jedną kwotę za całość, bez rozliczania godzin i dopłat w trakcie.",
        },
        {
          title: "Szkic",
          body: "Najpierw sam układ: co jest na stronie i w jakiej kolejności. Na tym etapie zmiana to kilka minut, więc tu zgłaszasz najwięcej uwag.",
        },
        {
          title: "Projekt",
          body: "Szkic dostaje kolory, typografię i zdjęcia Twojej firmy. Widzisz stronę tak, jak zobaczą ją klienci, zanim powstanie pierwsza linijka kodu.",
        },
        {
          title: "Kod",
          body: "Piszę stronę od podstaw, bez ciężkich szablonów, które spowalniają ładowanie. Podgląd masz na bieżąco i widzisz każdą zmianę.",
        },
        {
          title: "Uruchomienie",
          body: "Strona trafia na Twoją domenę z certyfikatem SSL. Przed startem sprawdzam szybkość i wygląd na telefonie, bo stamtąd wejdzie wielu Twoich klientów.",
        },
        {
          title: "Chatbot",
          body: "Jeśli chcesz, na stronie pracuje asystent AI. Odpowiada na pytania o ofertę, ceny i terminy, także wieczorem i w weekend.",
        },
        {
          title: "Automatyzacja",
          body: "Zapytanie z formularza albo czatu samo trafia tam, gdzie trzeba: do Twojej skrzynki, CRM-u albo SMS-em na telefon. Nic nie ginie w mailach.",
        },
        {
          title: "Google i opieka",
          body: "Ustawiam wizytówkę Google i zgłaszam stronę do wyszukiwarki. Potem, jeśli chcesz, zostaję przy niej: hosting, kopie zapasowe i zmiany w treści.",
        },
      ],
      controls: {
        play: "Odtwórz animację",
        pause: "Zatrzymaj animację",
        cursorPlay: "Odtwórz",
        cursorPause: "Pauza",
        chapter: "Rozdział",
      },
      demo: {
        brand: "Twoja Firma",
        nav: ["Oferta", "Realizacje", "Kontakt"],
        navCta: "Zadzwoń",
        heroTitle: "Meble na wymiar, które zostają na lata.",
        heroLead: "Kuchnie, szafy i zabudowy projektowane pod Twoje wnętrze.",
        cta: "Umów pomiar",
        imageTag: "Realizacja · kuchnia",
        cards: ["Kuchnie", "Szafy i garderoby", "Łazienki"],
        urls: [
          "notatki — brief",
          "projekt — szkic",
          "projekt — makieta",
          "localhost:3000",
          "twojafirma.pl",
          "twojafirma.pl",
          "twojafirma.pl",
          "google.pl/search?q=meble+na+wymiar+mielec",
        ],
        brief: {
          call: "Rozmowa",
          title: "Brief — Twoja Firma",
          rows: [
            ["Cel", "więcej zapytań z okolicy"],
            ["Klient", "właściciele domów i mieszkań"],
            ["Zakres", "5 podstron, formularz, czat"],
            ["Cena", "jedna kwota za całość"],
          ],
          stamp: "Zakres zatwierdzony",
        },
        code: { file: "Hero.tsx", preview: "Podgląd" },
        speed: { label: "Wydajność", note: "Przykładowy pomiar" },
        chat: {
          name: "Asystent Twojej Firmy",
          status: "online",
          question: "Ile trwa wykonanie kuchni na wymiar?",
          answer:
            "Zwykle kilka tygodni od pomiaru, zależnie od materiałów. Zapisać Cię na bezpłatny pomiar?",
          chip: "Tak, umów pomiar",
          input: "Napisz wiadomość…",
        },
        flow: {
          label: "Scenariusz: nowe zapytanie",
          nodes: [
            ["Czat", "nowe pytanie"],
            ["AI", "temat i pilność"],
            ["CRM", "nowy kontakt"],
            ["Ty", "SMS i e-mail"],
          ],
          toastTitle: "Nowe zapytanie",
          toastBody: "Kuchnia na wymiar · pomiar w tym tygodniu",
        },
        serp: {
          query: "meble na wymiar mielec",
          note: "Symulacja",
          domain: "twojafirma.pl",
          title: "Meble na wymiar, które zostają na lata — Twoja Firma",
          desc: "Kuchnie, szafy i zabudowy projektowane pod Twoje wnętrze. Bezpłatny pomiar.",
          panelType: "Producent mebli · Mielec",
          panelHours: "Otwarte · do 17:00",
          panelActions: ["Trasa", "Zadzwoń", "Strona"],
        },
      },
    },

    work: {
      heading: "Strony, które już pracują dla klientów",
      lead: "Każdą możesz otworzyć i sprawdzić na żywo. Zobacz, co dostali inni, zanim zdecydujesz.",
      all: "Wszystkie realizacje",
      visit: "Otwórz stronę",
    },

    blog: {
      heading: "Z bloga",
      lead: "Konkretne odpowiedzi na pytania, które zadajesz przed zamówieniem strony.",
      all: "Wszystkie wpisy",
    },

    contact: {
      heading: "Powiedz, czego potrzebuje Twoja firma",
      lead:
        "Napisz albo zadzwoń. Usłyszysz wprost, czy mogę Ci pomóc, ile to będzie kosztować i ile potrwa. Jeśli to nie jest zlecenie dla mnie, też się o tym dowiesz.",
      cta: "Zapytaj o wycenę",
    },
  },

  footer: {
    tagline: "Strony internetowe i narzędzia cyfrowe dla firm z Podkarpacia, które chcą więcej zapytań od klientów.",
    columnOffer: "Oferta",
    columnCompany: "Firma",
    columnContact: "Kontakt",
    privacy: "Polityka prywatności",
    rights: "Wszelkie prawa zastrzeżone.",
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
  },

  nav: {
    offer: "Services",
    work: "Work",
    blog: "Blog",
    about: "About",
    contact: "Contact",
    cta: "Ask for a quote",
  },

  home: {
    badge: "Mielec, south-eastern Poland",
    h1: "A website that earns for your business.",
    lead:
      "You get a website, an online store or an automation that helps you win customers and takes manual work off your plate. From the first call to support after launch, you have one phone number and one person responsible for all of it.",
    ctaPrimary: "Book a free call",
    ctaSecondary: "See client sites",
    orCall: "or call",

    services: {
      heading: "What your business gets",
      lead:
        "Pick what you need: a website, a store, automation, visibility in Google or ongoing care. You know the scope and price before we start, so nothing surprises you halfway through.",
      all: "Full service list",
    },

    notAgency: {
      heading: "You deal with a person from Mielec, not an agency.",
      lead:
        "Search Google for web design plus the name of any town in the region. Almost none of the companies at the top are based here.",
      punchline: "With me, you can sit down and talk face to face.",
      detail:
        "For you, that means simpler work together. Your project is not passed to a subcontractor and nobody sends you to another department. You call and speak to the person who built your site and knows it by heart.",
    },


    process: {
      heading: "From the first call to your first customer",
      lead:
        "This is the whole journey of your website, step by step. I handle every stage myself, so you talk to the same person throughout.",
      chapters: [
        {
          title: "Call and quote",
          body: "You say what the site should do for you and who it should reach. You get the scope in writing and one price for the whole thing, with no hourly billing and no extras along the way.",
        },
        {
          title: "Sketch",
          body: "The layout comes first: what goes on the page and in what order. At this stage a change takes minutes, so this is where most of your feedback lands.",
        },
        {
          title: "Design",
          body: "The sketch gets your colours, typography and photos. You see the site the way your customers will, before a single line of code is written.",
        },
        {
          title: "Code",
          body: "I build the site from scratch, without heavy templates that slow it down. You get a live preview and see every change as it happens.",
        },
        {
          title: "Launch",
          body: "The site goes live on your domain with an SSL certificate. Before launch I check speed and layout on phones, because that is where many of your customers will find you.",
        },
        {
          title: "Chatbot",
          body: "If you want, an AI assistant works on your site. It answers questions about your offer, prices and lead times, evenings and weekends included.",
        },
        {
          title: "Automation",
          body: "An enquiry from the form or the chat goes where it should on its own: your inbox, your CRM or a text to your phone. Nothing gets lost in email.",
        },
        {
          title: "Google and care",
          body: "I set up your Google Business Profile and submit the site to Google. After that, if you want, I stay with it: hosting, backups and content changes.",
        },
      ],
      controls: {
        play: "Play animation",
        pause: "Pause animation",
        cursorPlay: "Play",
        cursorPause: "Pause",
        chapter: "Chapter",
      },
      demo: {
        brand: "Your Company",
        nav: ["Services", "Projects", "Contact"],
        navCta: "Call us",
        heroTitle: "Made-to-measure furniture that lasts for years.",
        heroLead: "Kitchens, wardrobes and fitted units designed for your home.",
        cta: "Book a visit",
        imageTag: "Project · kitchen",
        cards: ["Kitchens", "Wardrobes", "Bathrooms"],
        urls: [
          "notes — brief",
          "design — sketch",
          "design — mock-up",
          "localhost:3000",
          "yourcompany.pl",
          "yourcompany.pl",
          "yourcompany.pl",
          "google.com/search?q=fitted+kitchens+mielec",
        ],
        brief: {
          call: "Call",
          title: "Brief — Your Company",
          rows: [
            ["Goal", "more local enquiries"],
            ["Audience", "home and flat owners"],
            ["Scope", "5 pages, form, chat"],
            ["Price", "one fixed amount"],
          ],
          stamp: "Scope approved",
        },
        code: { file: "Hero.tsx", preview: "Preview" },
        speed: { label: "Performance", note: "Sample audit" },
        chat: {
          name: "Your Company assistant",
          status: "online",
          question: "How long does a fitted kitchen take?",
          answer:
            "Usually a few weeks from the measuring visit, depending on materials. Shall I book you a free visit?",
          chip: "Yes, book a visit",
          input: "Type a message…",
        },
        flow: {
          label: "Workflow: new enquiry",
          nodes: [
            ["Chat", "new question"],
            ["AI", "topic and urgency"],
            ["CRM", "new contact"],
            ["You", "text and email"],
          ],
          toastTitle: "New enquiry",
          toastBody: "Fitted kitchen · visit this week",
        },
        serp: {
          query: "fitted kitchens mielec",
          note: "Simulation",
          domain: "yourcompany.pl",
          title: "Made-to-measure furniture that lasts — Your Company",
          desc: "Kitchens, wardrobes and fitted units designed for your home. Free measuring visit.",
          panelType: "Furniture maker · Mielec",
          panelHours: "Open · until 5 pm",
          panelActions: ["Directions", "Call", "Website"],
        },
      },
    },

    work: {
      heading: "Sites already working for clients",
      lead: "You can open each one and check it live. See what others got before you decide.",
      all: "All projects",
      visit: "Open the site",
    },

    blog: {
      heading: "From the blog",
      lead: "Straight answers to the questions you ask before ordering a website.",
      all: "All posts",
    },

    contact: {
      heading: "Tell me what your business needs",
      lead:
        "Write or call. You will hear plainly whether I can help, what it costs and how long it takes. If it is not a job for me, you will hear that too.",
      cta: "Ask for a quote",
    },
  },

  footer: {
    tagline: "Websites and digital tools for businesses in south-eastern Poland that want more enquiries.",
    columnOffer: "Services",
    columnCompany: "Company",
    columnContact: "Contact",
    privacy: "Privacy policy",
    rights: "All rights reserved.",
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

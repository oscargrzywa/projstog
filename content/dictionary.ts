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


    /* Makieta „strona buduje się sama" (components/ProcessFilm).
       heading/lead/cta idą do HTML-u jako treść; `demo` to wyłącznie teksty
       dekoracyjnej animacji (aria-hidden) — fikcyjna firma klienta. */
    process: {
      heading: "Zobacz, jak powstaje Twoja strona",
      lead:
        "Strona firmowa, sklep z panelem do zarządzania produktami, rezerwacje domków albo stolików. Każda powstaje od pustej siatki, każda działa na komputerze, tablecie i telefonie — i każdy jej etap robię sam.",
      cta: "Chcę taką stronę",
      controls: {
        play: "Odtwórz animację",
        pause: "Zatrzymaj animację",
        cursorPlay: "Odtwórz",
        cursorPause: "Pauza",
      },
      demo: {
        status: [
          "układam siatkę…",
          "stawiam sekcje…",
          "wpisuję treści…",
          "dobieram kolory…",
          "dodaję zdjęcia i detale…",
          "sprawdzam na tablecie…",
          "sprawdzam na telefonie…",
          "wracam na desktop…",
          "online",
          "online",
          "następny projekt…",
        ],
        cabins: {
          domain: "twojedomki.pl",
          brand: "Twoje Domki",
          nav: ["Domki", "Okolica", "Kontakt"],
          cta: "Zarezerwuj",
          eyebrow: "Podkarpacie · 2–6 osób",
          title: ["Cisza, las", "i Twój domek", "na weekend."],
          lead: "Drewniane domki z sauną i kominkiem, 10 minut od szlaku.",
          price: "od 390 zł / noc",
          amenitiesTitle: "Na miejscu",
          amenities: ["Sauna", "Kominek", "Wi-Fi", "Grill"],
          month: "Październik",
          weekdays: ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"],
          book: "Zarezerwuj termin",
          toastTitle: "Rezerwacja potwierdzona",
          toastBody: "12–14 października · 2 noce",
        },
        shop: {
          domain: "twojsklep.pl",
          brand: "Twój Sklep",
          nav: ["Nowości", "Kolekcje", "O nas"],
          title: ["Ceramika", "robiona ręcznie."],
          lead: "Kubki, misy i wazony z małej pracowni. Wysyłka w 48 godzin.",
          cta: "Zobacz kolekcję",
          products: [
            ["Kubek Mech", "79 zł"],
            ["Misa Len", "129 zł"],
            ["Wazon Glina", "189 zł"],
            ["Talerz Piasek", "99 zł"],
          ],
          add: "Do koszyka",
          added: "Dodano",
          toastTitle: "Dodano do koszyka",
          toastBody: "2 produkty · 318 zł",
        },
        admin: {
          domain: "twojsklep.pl/panel",
          brand: "Twój Sklep",
          menu: ["Produkty", "Zamówienia", "Klienci", "Statystyki"],
          heading: "Produkty",
          add: "Dodaj produkt",
          sample: "Dane przykładowe",
          kpis: [
            ["Sprzedaż · 7 dni", "4 820 zł"],
            ["Zamówienia", "36"],
            ["Nowi klienci", "12"],
          ],
          chart: "Sprzedaż",
          cols: ["Produkt", "Cena", "Stan", "Status"],
          rows: [
            ["Kubek Mech", "79 zł", "24 szt."],
            ["Misa Len", "149 zł", "8 szt."],
            ["Wazon Glina", "189 zł", "5 szt."],
            ["Talerz Piasek", "99 zł", "31 szt."],
          ],
          active: "Aktywny",
          ordersTitle: "Nowe zamówienia",
          orders: [
            ["#1048", "Anna K.", "208 zł"],
            ["#1047", "Marek W.", "79 zł"],
            ["#1046", "Ola S.", "318 zł"],
          ],
          orderNew: "Nowe",
          newPrice: "129 zł",
          save: "Zapisz",
          preview: "Na sklepie",
          toastTitle: "Zapisano",
          toastBody: "Nowa cena jest już na sklepie.",
        },
        company: {
          domain: "twojafirma.pl",
          brand: "Twoja Firma",
          nav: ["Oferta", "Realizacje", "Kontakt"],
          navCta: "Wycena",
          eyebrow: "Meble na wymiar · Mielec",
          title: ["Meble na wymiar,", "które zostają", "na lata."],
          lead: "Kuchnie, szafy i zabudowy projektowane pod Twoje wnętrze.",
          cta: "Zapytaj o wycenę",
          ctaSecondary: "Realizacje",
          imageTag: "Realizacja · kuchnia",
          cards: [
            ["Kuchnie", "Od projektu po montaż"],
            ["Szafy", "Każdy centymetr wykorzystany"],
            ["Łazienki", "Odporne na wilgoć"],
          ],
          quote: "Projekt 3D kuchni, zanim ruszą prace.",
          quoteAuthor: "Pomiar u Ciebie w domu",
          email: "biuro@twojafirma.pl",
          toastTitle: "Zapytanie wysłane",
          toastBody: "Odpowiemy jeszcze dziś.",
        },
        cafe: {
          domain: "twojakawiarnia.pl",
          brand: "Twoja Kawiarnia",
          nav: ["Menu", "Śniadania", "Kontakt"],
          title: ["Kawa, która", "zatrzymuje."],
          lead: "Palona na miejscu. Śniadania do 13:00, desery do zamknięcia.",
          formTitle: "Zarezerwuj stolik",
          people: ["1 os.", "2 os.", "4 os."],
          times: ["16:00", "18:00", "20:00"],
          book: "Rezerwuję",
          menuTitle: "Menu",
          menu: [
            ["Espresso", "9 zł"],
            ["Flat white", "14 zł"],
            ["Sernik baskijski", "18 zł"],
            ["Tost z awokado", "24 zł"],
          ],
          toastTitle: "Stolik zarezerwowany",
          toastBody: "Sobota, 18:00 · 2 osoby",
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
      heading: "Watch your website come together",
      lead:
        "A company site, a shop with a panel for managing products, bookings for cabins or tables. Each one starts from an empty grid, each works on desktop, tablet and phone — and I handle every stage myself.",
      cta: "I want a site like this",
      controls: {
        play: "Play animation",
        pause: "Pause animation",
        cursorPlay: "Play",
        cursorPause: "Pause",
      },
      demo: {
        status: [
          "setting the grid…",
          "placing sections…",
          "writing content…",
          "applying colours…",
          "adding photos and details…",
          "checking on tablet…",
          "checking on mobile…",
          "back to desktop…",
          "online",
          "online",
          "next project…",
        ],
        cabins: {
          domain: "yourcabins.pl",
          brand: "Your Cabins",
          nav: ["Cabins", "Area", "Contact"],
          cta: "Book",
          eyebrow: "South-east Poland · 2–6 guests",
          title: ["Quiet woods", "and your cabin", "for the weekend."],
          lead: "Timber cabins with a sauna and fireplace, 10 minutes from the trail.",
          price: "from 390 zł / night",
          amenitiesTitle: "On site",
          amenities: ["Sauna", "Fireplace", "Wi-Fi", "Grill"],
          month: "October",
          weekdays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
          book: "Book these dates",
          toastTitle: "Booking confirmed",
          toastBody: "12–14 October · 2 nights",
        },
        shop: {
          domain: "yourshop.pl",
          brand: "Your Shop",
          nav: ["New", "Collections", "About"],
          title: ["Ceramics", "made by hand."],
          lead: "Mugs, bowls and vases from a small studio. Shipped within 48 hours.",
          cta: "See the collection",
          products: [
            ["Moss Mug", "79 zł"],
            ["Linen Bowl", "129 zł"],
            ["Clay Vase", "189 zł"],
            ["Sand Plate", "99 zł"],
          ],
          add: "Add to cart",
          added: "Added",
          toastTitle: "Added to cart",
          toastBody: "2 items · 318 zł",
        },
        admin: {
          domain: "yourshop.pl/admin",
          brand: "Your Shop",
          menu: ["Products", "Orders", "Customers", "Analytics"],
          heading: "Products",
          add: "Add product",
          sample: "Sample data",
          kpis: [
            ["Sales · 7 days", "4 820 zł"],
            ["Orders", "36"],
            ["New customers", "12"],
          ],
          chart: "Sales",
          cols: ["Product", "Price", "Stock", "Status"],
          rows: [
            ["Moss Mug", "79 zł", "24 pcs"],
            ["Linen Bowl", "149 zł", "8 pcs"],
            ["Clay Vase", "189 zł", "5 pcs"],
            ["Sand Plate", "99 zł", "31 pcs"],
          ],
          active: "Active",
          ordersTitle: "New orders",
          orders: [
            ["#1048", "Anna K.", "208 zł"],
            ["#1047", "Mark W.", "79 zł"],
            ["#1046", "Ola S.", "318 zł"],
          ],
          orderNew: "New",
          newPrice: "129 zł",
          save: "Save",
          preview: "In the shop",
          toastTitle: "Saved",
          toastBody: "The new price is already live.",
        },
        company: {
          domain: "yourcompany.pl",
          brand: "Your Company",
          nav: ["Services", "Projects", "Contact"],
          navCta: "Quote",
          eyebrow: "Made-to-measure · Mielec",
          title: ["Made-to-measure", "furniture that", "lasts for years."],
          lead: "Kitchens, wardrobes and fitted units designed for your home.",
          cta: "Ask for a quote",
          ctaSecondary: "Projects",
          imageTag: "Project · kitchen",
          cards: [
            ["Kitchens", "From design to fitting"],
            ["Wardrobes", "Every inch put to use"],
            ["Bathrooms", "Built to handle moisture"],
          ],
          quote: "A 3D design of your kitchen before work starts.",
          quoteAuthor: "Measured at your home",
          email: "hello@yourcompany.pl",
          toastTitle: "Enquiry sent",
          toastBody: "We will reply today.",
        },
        cafe: {
          domain: "yourcafe.pl",
          brand: "Your Café",
          nav: ["Menu", "Breakfast", "Contact"],
          title: ["Coffee worth", "slowing down for."],
          lead: "Roasted on site. Breakfast until 1 pm, cakes until closing.",
          formTitle: "Book a table",
          people: ["1 guest", "2 guests", "4 guests"],
          times: ["4:00 pm", "6:00 pm", "8:00 pm"],
          book: "Book now",
          menuTitle: "Menu",
          menu: [
            ["Espresso", "9 zł"],
            ["Flat white", "14 zł"],
            ["Basque cheesecake", "18 zł"],
            ["Avocado toast", "24 zł"],
          ],
          toastTitle: "Table booked",
          toastBody: "Saturday, 6 pm · 2 guests",
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

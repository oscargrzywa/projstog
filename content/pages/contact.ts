/**
 * Treści strony kontaktu i formularza.
 *
 * ⚠ Formularz jest jedynym dużym komponentem klienckim na stronie, więc teksty
 * interfejsu formularza trzymamy w osobnym eksporcie (`CONTACT_FORM_COPY`).
 * Dzięki temu do paczki klienta trafia tylko ta część, a nie treść strony.
 * Małe wyspy (status „na żywo", kopiowanie NIP) dostają swoje teksty
 * przez propsy z Server Componentu.
 *
 * Słowniki interfejsu (`content/dictionary.ts`) celowo NIE puchną o te teksty —
 * mieszkają tu, bo dotyczą jednej strony.
 */

import type { Locale } from "@/lib/routes";

/* ==========================================================================
   Wybór usługi w formularzu
   ==========================================================================

   Wartości pokrywają się ze slugami 4 kategorii z `content/services.ts`
   plus „inne". Przesyłamy slug, nie etykietę — dzięki temu serwer waliduje
   wartość z zamkniętej listy, niezależnie od języka formularza.
*/

export const SERVICE_VALUES = [
  "strony-i-sklepy",
  "sztuczna-inteligencja",
  "marketing-i-widocznosc",
  "opieka-i-wsparcie",
  "inne",
] as const;

export type ServiceValue = (typeof SERVICE_VALUES)[number];

export function isServiceValue(value: unknown): value is ServiceValue {
  return (
    typeof value === "string" &&
    (SERVICE_VALUES as readonly string[]).includes(value)
  );
}

/** Etykiety usług po polsku — do treści maila wysyłanego właścicielowi. */
export const SERVICE_EMAIL_LABELS: Record<ServiceValue, string> = {
  "strony-i-sklepy": "Strony i sklepy internetowe",
  "sztuczna-inteligencja": "Sztuczna inteligencja i automatyzacje",
  "marketing-i-widocznosc": "Marketing i widoczność",
  "opieka-i-wsparcie": "Opieka i wsparcie",
  inne: "Inne",
};

/* ==========================================================================
   Limity — jedno źródło prawdy dla klienta i serwera
   ==========================================================================

   ⚠ Klient używa ich jako `maxLength`, serwer jako twardej walidacji.
   Nigdy nie ufamy temu, że przeglądarka je wymusiła.
*/

export const FIELD_LIMITS = {
  name: { min: 2, max: 100 },
  phone: { min: 7, max: 30 },
  email: { min: 5, max: 160 },
  message: { min: 0, max: 2000 },
} as const;

/** Nazwa pola-pułapki. Musi brzmieć wiarygodnie dla bota wypełniającego formularze. */
export const HONEYPOT_FIELD = "nazwa-firmy-www";

/* ==========================================================================
   Teksty formularza (trafiają do paczki klienta)
   ========================================================================== */

type FormCopy = {
  legend: string;
  fields: {
    name: { label: string; placeholder: string; error: string };
    phone: { label: string; placeholder: string; error: string };
    email: { label: string; placeholder: string; error: string };
    service: { label: string; placeholder: string; error: string };
    message: { label: string; placeholder: string; hint: string };
  };
  serviceOptions: Record<ServiceValue, string>;
  consent: {
    before: string;
    linkText: string;
    after: string;
    error: string;
  };
  required: string;
  optional: string;
  submit: string;
  submitting: string;
  /* Komunikaty statusu — konkretne, nigdy „coś poszło nie tak". */
  status: {
    success: string;
    networkError: string;
    serverError: string;
    validationError: string;
    rateLimited: string;
    fallback: string;
  };
};

export const CONTACT_FORM_COPY: Record<Locale, FormCopy> = {
  pl: {
    legend: "Formularz kontaktowy",
    fields: {
      name: {
        label: "Imię i nazwisko",
        placeholder: "Jan Kowalski",
        error: "Podaj imię — przynajmniej 2 znaki.",
      },
      phone: {
        label: "Telefon",
        placeholder: "+48 600 100 200",
        error: "Podaj numer telefonu — co najmniej 7 cyfr.",
      },
      email: {
        label: "E-mail",
        placeholder: "jan@firma.pl",
        error: "Adres e-mail wygląda na niepełny — sprawdź znak @ i domenę.",
      },
      service: {
        label: "Czego dotyczy zapytanie",
        placeholder: "Wybierz z listy",
        error: "Wybierz jedną z pozycji z listy.",
      },
      message: {
        label: "Wiadomość",
        placeholder:
          "Czym zajmuje się firma, co ma robić strona, na kiedy jest potrzebna…",
        hint: "Im więcej szczegółów, tym konkretniejszą odpowiedź dostaniesz.",
      },
    },
    serviceOptions: {
      "strony-i-sklepy": "Strona internetowa lub sklep",
      "sztuczna-inteligencja": "Automatyzacje AI, chatbot, CRM",
      "marketing-i-widocznosc": "Google Moja Firma, SEO, social media",
      "opieka-i-wsparcie": "Hosting, opieka nad stroną, wsparcie",
      inne: "Coś innego — opiszę w wiadomości",
    },
    consent: {
      before:
        "Wyrażam zgodę na przetwarzanie moich danych osobowych przez Oscara Grzywę (PROJSTOG) w celu odpowiedzi na to zapytanie, zgodnie z ",
      linkText: "polityką prywatności",
      after: ". Zgodę mogę wycofać w każdej chwili.",
      error: "Bez tej zgody nie mogę odpisać — zaznacz pole powyżej.",
    },
    required: "pole wymagane",
    optional: "opcjonalnie",
    submit: "Wyślij zapytanie",
    submitting: "Wysyłam…",
    status: {
      success:
        "Wiadomość dotarła. Odpowiedź dostaniesz w ciągu jednego dnia roboczego — jeśli sprawa jest pilna, zadzwoń.",
      networkError:
        "Nie udało się połączyć z serwerem. Sprawdź internet i spróbuj jeszcze raz albo zadzwoń.",
      serverError:
        "Serwer poczty nie przyjął wiadomości. Napisz proszę bezpośrednio na biuro@projstog.pl lub zadzwoń.",
      validationError:
        "Formularz nie przeszedł sprawdzenia — popraw zaznaczone pola i wyślij ponownie.",
      rateLimited:
        "Wiadomość z tego formularza została już wysłana przed chwilą. Odczekaj minutę albo zadzwoń.",
      fallback:
        "Wysyłka się nie powiodła. Napisz proszę na biuro@projstog.pl lub zadzwoń — odbieram osobiście.",
    },
  },

  en: {
    legend: "Contact form",
    fields: {
      name: {
        label: "Name",
        placeholder: "John Smith",
        error: "Please enter your name — at least 2 characters.",
      },
      phone: {
        label: "Phone",
        placeholder: "+48 600 100 200",
        error: "Please enter a phone number — at least 7 digits.",
      },
      email: {
        label: "Email",
        placeholder: "john@company.com",
        error: "This email looks incomplete — check the @ sign and the domain.",
      },
      service: {
        label: "What is this about",
        placeholder: "Pick one",
        error: "Please pick one item from the list.",
      },
      message: {
        label: "Message",
        placeholder:
          "What your company does, what the site should do, when you need it…",
        hint: "The more detail you give, the more specific the answer you get.",
      },
    },
    serviceOptions: {
      "strony-i-sklepy": "A website or an online store",
      "sztuczna-inteligencja": "AI automation, chatbot, CRM",
      "marketing-i-widocznosc": "Google Business Profile, SEO, social media",
      "opieka-i-wsparcie": "Hosting, website care, support",
      inne: "Something else — I will describe it below",
    },
    consent: {
      before:
        "I agree to Oscar Grzywa (PROJSTOG) processing my personal data in order to answer this enquiry, in line with the ",
      linkText: "privacy policy",
      after: ". I can withdraw this consent at any time.",
      error: "Without this consent I cannot reply — please tick the box above.",
    },
    required: "required",
    optional: "optional",
    submit: "Send enquiry",
    submitting: "Sending…",
    status: {
      success:
        "Your message arrived. You will get a reply within one working day — if it is urgent, please call.",
      networkError:
        "Could not reach the server. Check your connection and try again, or call instead.",
      serverError:
        "The mail server rejected the message. Please write directly to biuro@projstog.pl or call.",
      validationError:
        "The form did not pass validation — fix the highlighted fields and send again.",
      rateLimited:
        "A message from this form was just sent. Wait a minute or call instead.",
      fallback:
        "Sending failed. Please write to biuro@projstog.pl or call — I answer in person.",
    },
  },
};

/* ==========================================================================
   Treść strony (Server Component — nie trafia do paczki klienta)
   ========================================================================== */

/**
 * Status „na żywo" przy telefonie (wyspa kliencka `LiveStatus`).
 *
 * Serwer renderuje wariant neutralny (bez godziny), przeglądarka po
 * hydratacji podmienia go na „odbieram teraz" albo „oddzwonię …".
 * Placeholdery: {opens}, {closes} — z `SITE.hours`; {day} — „dziś",
 * „jutro" albo dzień tygodnia z przyimkiem.
 */
export type LiveStatusCopy = {
  neutralTitle: string;
  neutralDetail: string;
  openTitle: string;
  openDetail: string;
  closedTitle: string;
  closedDetail: string;
  today: string;
  tomorrow: string;
  /** Dzień tygodnia z przyimkiem, od niedzieli — jak `Date.getUTCDay()`. */
  weekdays: string[];
};

type ContactPageCopy = {
  seo: { title: string; description: string };
  breadcrumbHome: string;
  /** Etykieta dostępności nawigacji okruszków. */
  crumbsLabel: string;
  h1: string;
  lead: string;
  /** Przycisk w nagłówku — skok do formularza. */
  formJump: string;
  liveStatus: LiveStatusCopy;
  /** Etykiety przy klikalnych danych kontaktowych. */
  phoneLabel: string;
  phoneNote: string;
  emailLabel: string;
  emailNote: string;
  hoursLabel: string;
  hoursNote: string;
  responseHeading: string;
  responsePoints: string[];
  formHeading: string;
  locationHeading: string;
  locationBody: string;
  locationTravel: string;
  mapsLinkLabel: string;
  /** Podpis na mapie przy linii Mielec–Rzeszów (~49,6 km w linii prostej). */
  mapDistance: string;
  /** Tekst pod mapą — mapa jest aria-hidden, więc to on niesie treść. */
  mapCaption: string;
  /** Dane rejestrowe z CEIDG. */
  companyHeading: string;
  companyLabels: { name: string; nip: string; regon: string; address: string };
  companyNote: string;
  companyLink: string;
  /** Przycisk kopiowania NIP / REGON (wyspa `CopyValue`). */
  copyLabel: string;
  copiedLabel: string;
};

export const CONTACT_PAGE: Record<Locale, ContactPageCopy> = {
  pl: {
    seo: {
      title: "Kontakt — Oscar Grzywa, PROJSTOG Mielec / Rzeszów",
      description:
        "Zadzwoń, napisz albo wypełnij formularz. Rozmawiasz od razu z osobą, która zrobi Twój projekt — bez pośredników. Mielec i Rzeszów, woj. podkarpackie.",
    },
    breadcrumbHome: "Strona główna",
    crumbsLabel: "Ścieżka nawigacji",
    h1: "Kontakt",
    lead:
      "Dzwonisz albo piszesz prosto do osoby, która zrobi Twoją stronę. Bez infolinii, systemu zgłoszeń i opiekuna klienta, który przekaże sprawę dalej.",
    formJump: "Wypełnij formularz",
    liveStatus: {
      neutralTitle: "Odbieram od poniedziałku do piątku",
      neutralDetail:
        "W godzinach {opens}–{closes}. Poza nimi napisz — oddzwonię w następny dzień roboczy.",
      openTitle: "Teraz odbieram — zadzwoń",
      openDetail: "Dziś jestem pod telefonem do {closes}.",
      closedTitle: "Teraz poza godzinami",
      closedDetail: "Napisz przez formularz — oddzwonię {day} od {opens}.",
      today: "dziś",
      tomorrow: "jutro",
      weekdays: [
        "w niedzielę",
        "w poniedziałek",
        "we wtorek",
        "w środę",
        "w czwartek",
        "w piątek",
        "w sobotę",
      ],
    },
    phoneLabel: "Telefon",
    phoneNote: "Najszybsza droga — dzwoń śmiało w godzinach pracy.",
    emailLabel: "E-mail",
    emailNote: "Wolisz napisać? Odpowiedź przyjdzie z tego samego adresu.",
    hoursLabel: "Godziny",
    hoursNote: "od poniedziałku do piątku",
    responseHeading: "Co dostajesz po wysłaniu wiadomości",
    responsePoints: [
      "Odpowiedź w ciągu jednego dnia roboczego — telefonicznie albo mailem, jak wolisz.",
      "Rozmowę z osobą, która potem zrobi Twój projekt, a nie z pośrednikiem.",
      "Pierwsza rozmowa jest bezpłatna i do niczego nie zobowiązuje.",
      "Jasną informację od razu, jeśli z Twoim problemem lepiej pójść gdzie indziej.",
    ],
    formHeading: "Napisz, czego potrzebujesz",
    locationHeading: "Gdzie się spotkamy",
    locationBody:
      "Mielec i Rzeszów, województwo podkarpackie. Masz wykonawcę z realnym adresem w regionie, nie wirtualne biuro ani oddział firmy z drugiego końca Polski.",
    locationTravel:
      "Jeśli jesteś z Mielca, Rzeszowa albo okolic, przyjadę do Ciebie na spotkanie. Do dalszych miast regionu też — wystarczy ustalić termin.",
    mapsLinkLabel: "Zobacz w Mapach Google",
    mapDistance: "ok. 50 km",
    mapCaption: "Mielec i Rzeszów dzieli ok. 50 km w linii prostej.",
    companyHeading: "Dane firmy",
    companyLabels: { name: "Firma", nip: "NIP", regon: "REGON", address: "Adres" },
    companyNote: "Fakturę dostajesz na te dane.",
    companyLink: "Sprawdź wpis w CEIDG",
    copyLabel: "Kopiuj",
    copiedLabel: "Skopiowano",
  },

  en: {
    seo: {
      title: "Contact — Oscar Grzywa, PROJSTOG Mielec / Rzeszów",
      description:
        "Call, write or use the contact form. You talk straight to the person who will build your project — no middlemen. Mielec and Rzeszów, south-eastern Poland.",
    },
    breadcrumbHome: "Home",
    crumbsLabel: "Breadcrumb",
    h1: "Contact",
    lead:
      "You call or write straight to the person who will build your site. No call centre, no ticket queue and no account manager passing your case along.",
    formJump: "Fill in the form",
    liveStatus: {
      neutralTitle: "Taking calls Monday to Friday",
      neutralDetail:
        "Between {opens} and {closes}. Outside those hours, write — I will call you back on the next working day.",
      openTitle: "Taking calls now — ring me",
      openDetail: "Today I am by the phone until {closes}.",
      closedTitle: "Outside working hours now",
      closedDetail: "Use the form — I will call you back {day} from {opens}.",
      today: "today",
      tomorrow: "tomorrow",
      weekdays: [
        "on Sunday",
        "on Monday",
        "on Tuesday",
        "on Wednesday",
        "on Thursday",
        "on Friday",
        "on Saturday",
      ],
    },
    phoneLabel: "Phone",
    phoneNote: "The fastest route — call during working hours.",
    emailLabel: "Email",
    emailNote: "Prefer writing? The reply comes from the same address.",
    hoursLabel: "Hours",
    hoursNote: "Monday to Friday",
    responseHeading: "What you get after you write",
    responsePoints: [
      "A reply within one working day — by phone or email, whichever you prefer.",
      "A conversation with the person who will then build your project, not a middleman.",
      "The first conversation is free and commits you to nothing.",
      "A straight answer right away if your problem is better taken elsewhere.",
    ],
    formHeading: "Tell me what you need",
    locationHeading: "Where we can meet",
    locationBody:
      "Mielec and Rzeszów, Podkarpackie voivodeship. You get someone with a real address in the region — not a virtual office and not a branch of a company from the other end of the country.",
    locationTravel:
      "If you are in Mielec, Rzeszów or nearby, I will come to you for a meeting. The wider region too — we just agree a date.",
    mapsLinkLabel: "Open in Google Maps",
    mapDistance: "approx. 50 km",
    mapCaption: "Mielec and Rzeszów are about 50 km apart in a straight line.",
    companyHeading: "Company details",
    companyLabels: { name: "Company", nip: "Tax ID (NIP)", regon: "REGON", address: "Address" },
    companyNote: "Your invoice is issued from these details.",
    companyLink: "Verify in CEIDG, the Polish business register",
    copyLabel: "Copy",
    copiedLabel: "Copied",
  },
};

/**
 * Link do wizytówki w Mapach Google.
 *
 * ⚠ Celowo zapytanie wyszukiwania, a nie zmyślony identyfikator wizytówki.
 * Po weryfikacji profilu Google Moja Firma podmienić na krótki link z panelu.
 * ⚠ ŚWIADOMIE bez iframe'a — osadzona mapa Google dokłada third-party
 * i psuje LCP na stronie, która ma się ładować poniżej sekundy.
 */
export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=%C5%9Aniadeckich%2020D%2C%2035-006%20Rzesz%C3%B3w";

/** Publiczny wpis w CEIDG — wyszukiwarka po NIP. */
export const CEIDG_URL = "https://aplikacja.ceidg.gov.pl/ceidg/ceidg.public.ui/search.aspx";

/**
 * Treści strony kontaktu i formularza.
 *
 * ⚠ Formularz jest jedynym komponentem klienckim na stronie, więc teksty
 * interfejsu formularza trzymamy w osobnym eksporcie (`CONTACT_FORM_COPY`).
 * Dzięki temu do paczki klienta trafia tylko ta część, a nie treść strony.
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
        hint: "Im więcej szczegółów, tym konkretniej odpowiem.",
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
        "Wiadomość dotarła. Odpowiadam w ciągu jednego dnia roboczego — jeśli sprawa jest pilna, zadzwoń.",
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
        hint: "The more detail you give, the more specific my answer will be.",
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
        "Your message arrived. I reply within one working day — if it is urgent, please call.",
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

type ContactPageCopy = {
  seo: { title: string; description: string };
  breadcrumbHome: string;
  h1: string;
  lead: string;
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
};

export const CONTACT_PAGE: Record<Locale, ContactPageCopy> = {
  pl: {
    seo: {
      title: "Kontakt — Oscar Grzywa, PROJSTOG Mielec",
      description:
        "Telefon, e-mail i formularz kontaktowy. Odbiera i odpisuje Oscar Grzywa — ta sama osoba, która później robi projekt. Mielec, woj. podkarpackie.",
    },
    breadcrumbHome: "Strona główna",
    h1: "Kontakt",
    lead:
      "Piszesz albo dzwonisz bezpośrednio do mnie. Nie ma infolinii, formularza zgłoszeniowego ani opiekuna klienta, który przekaże sprawę dalej.",
    phoneLabel: "Telefon",
    phoneNote: "Najszybsza droga — dzwoń śmiało w godzinach pracy.",
    emailLabel: "E-mail",
    emailNote: "Wolisz napisać? Odpisuję z tego samego adresu.",
    hoursLabel: "Godziny",
    hoursNote: "od poniedziałku do piątku",
    responseHeading: "Czego możesz się spodziewać",
    responsePoints: [
      "Odpowiadam w ciągu jednego dnia roboczego — telefonicznie albo mailem, jak wolisz.",
      "Rozmawiasz ze mną, nie z pośrednikiem. Tą samą osobą, która potem pisze kod.",
      "Pierwsza rozmowa jest bezpłatna i do niczego nie zobowiązuje.",
      "Jeśli Twojego problemu nie umiem rozwiązać, mówię to od razu.",
    ],
    formHeading: "Napisz, czego potrzebujesz",
    locationHeading: "Gdzie jestem",
    locationBody:
      "Mielec, województwo podkarpackie. Realny adres w regionie, nie wirtualne biuro ani oddział firmy z drugiego końca Polski.",
    locationTravel:
      "Do klientów w Mielcu i okolicy dojeżdżam na spotkania, do dalszych miast regionu także — wystarczy ustalić termin.",
    mapsLinkLabel: "Zobacz w Mapach Google",
  },

  en: {
    seo: {
      title: "Contact — Oscar Grzywa, PROJSTOG Mielec",
      description:
        "Phone, email and a contact form. Oscar Grzywa answers personally — the same person who later builds the project. Mielec, south-eastern Poland.",
    },
    breadcrumbHome: "Home",
    h1: "Contact",
    lead:
      "You write or call me directly. There is no call centre, no ticket queue and no account manager passing your case along.",
    phoneLabel: "Phone",
    phoneNote: "The fastest route — call during working hours.",
    emailLabel: "Email",
    emailNote: "Prefer writing? I reply from the same address.",
    hoursLabel: "Hours",
    hoursNote: "Monday to Friday",
    responseHeading: "What to expect",
    responsePoints: [
      "I reply within one working day — by phone or email, whichever you prefer.",
      "You talk to me, not to a middleman. The same person who then writes the code.",
      "The first conversation is free and commits you to nothing.",
      "If I cannot solve your problem, I say so straight away.",
    ],
    formHeading: "Tell me what you need",
    locationHeading: "Where I am",
    locationBody:
      "Mielec, Podkarpackie voivodeship. A real address in the region — not a virtual office and not a branch of a company from the other end of the country.",
    locationTravel:
      "I drive out to meetings in Mielec and the surrounding area, and to the wider region as well — we just agree a date.",
    mapsLinkLabel: "Open in Google Maps",
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
  "https://www.google.com/maps/search/?api=1&query=PROJSTOG%20Mielec";

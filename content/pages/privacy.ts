/**
 * Polityka prywatności — treść.
 *
 * ⚠⚠ TO JEST SZABLON, NIE GOTOWY DOKUMENT PRAWNY.
 * Powstał na bazie starej polityki z `old_projstog/` i został dostosowany do
 * tego, co ta strona faktycznie robi (formularz kontaktowy + Resend jako
 * procesor poczty). Przed publikacją MUSI zostać zweryfikowany przez osobę
 * z uprawnieniami prawnymi — zwłaszcza w zakresie podstawy prawnej,
 * okresów retencji i transferu danych poza EOG.
 *
 * ⚠ Wyrzucono z niej fragmenty, które były nieprawdziwe dla tej strony:
 * hashowanie haseł (nie ma logowania), Google Analytics, remarketing i mapy
 * ciepła (nie ma tych narzędzi). Deklarowanie niestosowanych rozwiązań
 * w polityce prywatności jest gorsze niż ich pominięcie.
 * Jeśli analityka albo piksel reklamowy kiedyś wejdą na stronę — dopisać
 * sekcję ZANIM skrypt trafi na produkcję.
 */

import type { Locale } from "@/lib/routes";

export type PrivacyBlock = {
  text: string;
  /** Lista wypunktowana pod akapitem. */
  items?: string[];
};

export type PrivacySection = {
  heading: string;
  blocks: PrivacyBlock[];
};

type PrivacyPageCopy = {
  seo: { title: string; description: string };
  breadcrumbHome: string;
  h1: string;
  updated: string;
  /** Ostrzeżenie o statusie dokumentu — renderowane na samej górze. */
  disclaimerTitle: string;
  disclaimerBody: string;
  intro: string;
  sections: PrivacySection[];
  contactHeading: string;
  contactBody: string;
};

/** ⚠ Aktualizować przy każdej zmianie treści polityki. */
export const PRIVACY_UPDATED_AT = "2026-09-25";

export const PRIVACY_PAGE: Record<Locale, PrivacyPageCopy> = {
  pl: {
    seo: {
      title: "Polityka prywatności | PROJSTOG",
      description:
        "Zasady przetwarzania danych osobowych przekazanych przez formularz kontaktowy na projstog.pl.",
    },
    breadcrumbHome: "Strona główna",
    h1: "Polityka prywatności",
    updated: "Ostatnia aktualizacja",

    disclaimerTitle: "Dokument w wersji roboczej",
    disclaimerBody:
      "Poniższy tekst jest szablonem przygotowanym pod faktyczny zakres działania tej strony i wymaga weryfikacji prawnej przed publikacją. Do czasu takiej weryfikacji nie należy traktować go jako wiążącej informacji o przetwarzaniu danych.",

    intro:
      "Ta polityka opisuje, jakie dane zbieram przez stronę projstog.pl, po co je zbieram, komu je powierzam i jakie masz w związku z tym prawa.",

    sections: [
      {
        heading: "1. Administrator danych",
        blocks: [
          {
            text: "Administratorem Twoich danych osobowych jest Oscar Grzywa, prowadzący działalność pod nazwą PROJSTOG, z siedzibą w Mielcu (39-300), województwo podkarpackie.",
          },
          {
            text: "Kontakt w sprawach dotyczących danych osobowych:",
            items: [
              "e-mail: biuro@projstog.pl",
              "telefon: +48 730 771 568",
            ],
          },
          {
            text: "⚠ DO UZUPEŁNIENIA przed publikacją: pełny adres działalności oraz NIP — jeśli mają być podane w dokumencie.",
          },
        ],
      },
      {
        heading: "2. Jakie dane zbieram",
        blocks: [
          {
            text: "Strona zbiera wyłącznie dane, które sam wpiszesz w formularzu kontaktowym. Są to:",
            items: [
              "imię i nazwisko,",
              "numer telefonu,",
              "adres e-mail,",
              "wskazany przez Ciebie obszar zapytania,",
              "treść wiadomości — o ile ją wypełnisz.",
            ],
          },
          {
            text: "Strona nie wymaga zakładania konta i nie prowadzi profilowania. Nie zbiera danych szczególnych kategorii — jeśli wpiszesz je w treści wiadomości, robisz to z własnej inicjatywy.",
          },
          {
            text: "Serwer, na którym działa strona, zapisuje techniczne logi żądań (adres IP, czas żądania, adres zasobu, informacje o przeglądarce). Służą one wyłącznie diagnostyce i bezpieczeństwu.",
          },
        ],
      },
      {
        heading: "3. Cel i podstawa prawna przetwarzania",
        blocks: [
          {
            text: "Dane z formularza przetwarzam wyłącznie po to, żeby odpowiedzieć na Twoje zapytanie i — jeśli do tego dojdzie — przedstawić ofertę.",
          },
          {
            text: "Podstawy prawne:",
            items: [
              "art. 6 ust. 1 lit. a RODO — Twoja zgoda wyrażona przy wysyłce formularza,",
              "art. 6 ust. 1 lit. b RODO — działania podejmowane na Twoje żądanie przed zawarciem umowy,",
              "art. 6 ust. 1 lit. f RODO — mój uzasadniony interes, czyli utrzymanie bezpieczeństwa strony i obrona przed nadużyciami (logi serwera, zabezpieczenia formularza).",
            ],
          },
          {
            text: "Podanie danych jest dobrowolne, ale bez imienia, telefonu lub adresu e-mail nie mam jak odpisać.",
          },
        ],
      },
      {
        heading: "4. Jak długo przechowuję dane",
        blocks: [
          {
            text: "Korespondencję z zapytań przechowuję przez czas potrzebny do obsługi sprawy, a następnie przez okres przedawnienia ewentualnych roszczeń. Jeśli zapytanie nie kończy się współpracą, usuwam je po zakończeniu rozmów.",
          },
          {
            text: "Logi serwera są nadpisywane w cyklu ustalonym przez dostawcę hostingu.",
          },
          {
            text: "⚠ DO USTALENIA z prawnikiem: konkretne okresy retencji podane w latach.",
          },
        ],
      },
      {
        heading: "5. Komu powierzam dane",
        blocks: [
          {
            text: "Twoich danych nie sprzedaję i nie udostępniam do celów marketingowych osób trzecich. Powierzam je wyłącznie podmiotom, które są technicznie niezbędne do obsługi zapytania:",
            items: [
              "Resend (Plus Five Five, Inc.) — dostawca usługi wysyłki poczty transakcyjnej. Wiadomość z formularza trafia do mojej skrzynki właśnie przez tę usługę, więc przechodzą przez nią dane, które wpiszesz w formularzu.",
              "dostawca hostingu strony — na zasadzie powierzenia, w zakresie logów serwera i utrzymania usługi,",
              "dostawca mojej poczty e-mail — w zakresie przechowywania korespondencji.",
            ],
          },
          {
            text: "Resend jest podmiotem z siedzibą w Stanach Zjednoczonych, co oznacza transfer danych poza Europejski Obszar Gospodarczy. Transfer odbywa się na podstawie mechanizmów przewidzianych w rozdziale V RODO.",
          },
          {
            text: "⚠ DO WERYFIKACJI PRAWNEJ: konkretna podstawa transferu (Data Privacy Framework albo standardowe klauzule umowne), aktualna nazwa i adres podmiotu oraz zawarcie umowy powierzenia z każdym z wymienionych dostawców.",
          },
        ],
      },
      {
        heading: "6. Twoje prawa",
        blocks: [
          {
            text: "W odniesieniu do swoich danych masz prawo żądać:",
            items: [
              "dostępu do nich i otrzymania ich kopii,",
              "sprostowania danych nieprawidłowych,",
              "usunięcia danych,",
              "ograniczenia przetwarzania,",
              "przeniesienia danych,",
              "wniesienia sprzeciwu wobec przetwarzania opartego na uzasadnionym interesie.",
            ],
          },
          {
            text: "Zgodę na przetwarzanie danych możesz wycofać w każdej chwili — wystarczy wiadomość na biuro@projstog.pl. Wycofanie zgody nie wpływa na zgodność z prawem przetwarzania, którego dokonano przed jej wycofaniem.",
          },
          {
            text: "Przysługuje Ci też skarga do organu nadzorczego: Prezes Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.",
          },
        ],
      },
      {
        heading: "7. Pliki cookies",
        blocks: [
          {
            text: "Strona nie korzysta z ciasteczek analitycznych, reklamowych ani śledzących. Nie ma tu Google Analytics, pikseli reklamowych, map ciepła ani nagrywania sesji.",
          },
          {
            text: "Jeśli w przyszłości takie narzędzia zostaną dodane, ta polityka zostanie zaktualizowana, a zgoda zostanie pozyskana przed uruchomieniem skryptów.",
          },
          {
            text: "Ustawieniami ciasteczek zarządzasz w swojej przeglądarce — każda z popularnych przeglądarek pozwala je blokować i usuwać.",
          },
        ],
      },
      {
        heading: "8. Bezpieczeństwo",
        blocks: [
          {
            text: "Połączenie ze stroną jest szyfrowane certyfikatem SSL, więc dane z formularza nie są przesyłane otwartym tekstem.",
          },
          {
            text: "Formularz jest zabezpieczony przed automatycznym wypełnianiem przez boty, a dane wpisane w formularzu są sprawdzane po stronie serwera przed wysłaniem wiadomości.",
          },
          {
            text: "Oprogramowanie strony i jej zależności są aktualizowane, a dostęp do skrzynki z zapytaniami jest chroniony uwierzytelnianiem dwuskładnikowym.",
          },
        ],
      },
      {
        heading: "9. Zmiany polityki",
        blocks: [
          {
            text: "Politykę aktualizuję, gdy zmienia się zakres danych, które zbieram, albo lista podmiotów, którym je powierzam. Datę ostatniej zmiany podaję na górze strony.",
          },
        ],
      },
    ],

    contactHeading: "Pytania o dane",
    contactBody:
      "Jeśli coś w tym dokumencie jest niejasne albo chcesz skorzystać ze swoich praw — napisz albo zadzwoń. Odpowiadam osobiście.",
  },

  en: {
    seo: {
      title: "Privacy Policy | PROJSTOG",
      description:
        "How personal data submitted through the contact form on projstog.pl is processed.",
    },
    breadcrumbHome: "Home",
    h1: "Privacy Policy",
    updated: "Last updated",

    disclaimerTitle: "Draft document",
    disclaimerBody:
      "The text below is a template written around what this website actually does. It requires legal review before publication. Until it has been reviewed, do not treat it as a binding statement about data processing.",

    intro:
      "This policy describes what data projstog.pl collects, why it is collected, who it is entrusted to and what rights you have in connection with it.",

    sections: [
      {
        heading: "1. Data controller",
        blocks: [
          {
            text: "The controller of your personal data is Oscar Grzywa, trading as PROJSTOG, based in Mielec (39-300), Podkarpackie voivodeship, Poland.",
          },
          {
            text: "Contact for data protection matters:",
            items: ["email: biuro@projstog.pl", "phone: +48 730 771 568"],
          },
          {
            text: "⚠ TO BE COMPLETED before publication: full business address and tax identification number, if they are to appear in this document.",
          },
        ],
      },
      {
        heading: "2. What data is collected",
        blocks: [
          {
            text: "The website collects only the data you type into the contact form yourself:",
            items: [
              "your name,",
              "phone number,",
              "email address,",
              "the subject area you select,",
              "the message text, if you write one.",
            ],
          },
          {
            text: "The site requires no account and performs no profiling. It does not collect special categories of data — if you enter them in the message, you do so on your own initiative.",
          },
          {
            text: "The server hosting the site records technical request logs (IP address, request time, requested resource, browser information). They are used only for diagnostics and security.",
          },
        ],
      },
      {
        heading: "3. Purpose and legal basis",
        blocks: [
          {
            text: "Form data is processed solely in order to answer your enquiry and, if it gets that far, to prepare a quote.",
          },
          {
            text: "Legal bases:",
            items: [
              "Art. 6(1)(a) GDPR — the consent you give when submitting the form,",
              "Art. 6(1)(b) GDPR — steps taken at your request before entering into a contract,",
              "Art. 6(1)(f) GDPR — legitimate interest in keeping the site secure and defending against abuse (server logs, form protection).",
            ],
          },
          {
            text: "Providing data is voluntary, but without a name, phone number or email address there is no way to reply.",
          },
        ],
      },
      {
        heading: "4. How long data is kept",
        blocks: [
          {
            text: "Enquiry correspondence is kept for as long as handling the matter requires, and then for the limitation period of any related claims. If an enquiry does not lead to cooperation, it is deleted once the conversation ends.",
          },
          {
            text: "Server logs are rotated on the schedule set by the hosting provider.",
          },
          {
            text: "⚠ TO BE AGREED with a lawyer: specific retention periods stated in years.",
          },
        ],
      },
      {
        heading: "5. Who the data is entrusted to",
        blocks: [
          {
            text: "Your data is never sold and never shared for third-party marketing. It is entrusted only to providers that are technically necessary to handle an enquiry:",
            items: [
              "Resend (Plus Five Five, Inc.) — transactional email provider. The message from the form reaches my inbox through this service, so the data you enter passes through it.",
              "the website hosting provider — for server logs and service maintenance,",
              "my email provider — for storing correspondence.",
            ],
          },
          {
            text: "Resend is established in the United States, which means data is transferred outside the European Economic Area. The transfer relies on the mechanisms set out in Chapter V of the GDPR.",
          },
          {
            text: "⚠ REQUIRES LEGAL REVIEW: the exact transfer mechanism (Data Privacy Framework or standard contractual clauses), the current legal name and address of the provider, and a signed data processing agreement with each provider listed.",
          },
        ],
      },
      {
        heading: "6. Your rights",
        blocks: [
          {
            text: "In relation to your data you have the right to request:",
            items: [
              "access to it and a copy of it,",
              "rectification of inaccurate data,",
              "erasure,",
              "restriction of processing,",
              "data portability,",
              "to object to processing based on legitimate interest.",
            ],
          },
          {
            text: "You can withdraw your consent at any time — an email to biuro@projstog.pl is enough. Withdrawal does not affect the lawfulness of processing carried out before it.",
          },
          {
            text: "You may also lodge a complaint with the supervisory authority: President of the Personal Data Protection Office, ul. Stawki 2, 00-193 Warsaw, Poland.",
          },
        ],
      },
      {
        heading: "7. Cookies",
        blocks: [
          {
            text: "This site uses no analytics, advertising or tracking cookies. There is no Google Analytics, no advertising pixel, no heatmaps and no session recording.",
          },
          {
            text: "If such tools are added in the future, this policy will be updated and consent will be collected before any script is loaded.",
          },
          {
            text: "Cookie settings are managed in your browser — every popular browser lets you block and delete them.",
          },
        ],
      },
      {
        heading: "8. Security",
        blocks: [
          {
            text: "The connection to this site is encrypted with an SSL certificate, so form data is not transmitted in plain text.",
          },
          {
            text: "The form is protected against automated submissions by bots, and everything entered is validated on the server before any message is sent.",
          },
          {
            text: "The site software and its dependencies are kept up to date, and access to the enquiry inbox is protected with two-factor authentication.",
          },
        ],
      },
      {
        heading: "9. Changes to this policy",
        blocks: [
          {
            text: "This policy is updated whenever the scope of collected data or the list of processors changes. The date of the last change is shown at the top of the page.",
          },
        ],
      },
    ],

    contactHeading: "Questions about your data",
    contactBody:
      "If anything here is unclear, or you want to exercise your rights — write or call. I answer personally.",
  },
};

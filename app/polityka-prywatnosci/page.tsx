"use client";

import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { useLang } from "../components/LangContext";

const pp = {
  pl: {
    title: "Polityka prywatności",
    updated: "Ostatnia aktualizacja: 2026",
    intro: "Polityka prywatności opisuje zasady przetwarzania przez nas informacji na Twój temat, w tym danych osobowych oraz ciasteczek, czyli tzw. cookies.",
    sections: [
      {
        h: "1. Informacje ogólne",
        items: [
          "Niniejsza polityka dotyczy Serwisu www, funkcjonującego pod adresem url: projstog.pl",
          "Operatorem serwisu oraz Administratorem danych osobowych jest: Oscar Grzywa",
          "Adres kontaktowy poczty elektronicznej operatora: biuro@projstog.pl",
          "Operator jest Administratorem Twoich danych osobowych w odniesieniu do danych podanych dobrowolnie w Serwisie.",
          ["Serwis wykorzystuje dane osobowe w następujących celach:", ["Obsługa zapytań przez formularz", "Prezentacja oferty lub informacji"]],
          ["Serwis realizuje funkcje pozyskiwania informacji o użytkownikach i ich zachowaniu w następujący sposób:", ["Poprzez dobrowolnie wprowadzone w formularzach dane, które zostają wprowadzone do systemów Operatora.", "Poprzez zapisywanie w urządzeniach końcowych plików cookie (tzw. „ciasteczka")."]],
        ],
      },
      {
        h: "2. Wybrane metody ochrony danych stosowane przez Operatora",
        items: [
          "Miejsca logowania i wprowadzania danych osobowych są chronione w warstwie transmisji (certyfikat SSL).",
          "Hasła użytkowników są przechowywane w postaci hashowanej.",
          "W celu ochrony danych Operator regularnie wykonuje kopie bezpieczeństwa.",
          "Istotnym elementem ochrony danych jest regularna aktualizacja wszelkiego oprogramowania, wykorzystywanego przez Operatora do przetwarzania danych osobowych.",
        ],
      },
      {
        h: "3. Hosting",
        items: [
          "Serwis jest hostowany na serwerach operatora zewnętrznej firmy hostingowej.",
          ["Firma hostingowa w celu zapewnienia niezawodności technicznej prowadzi logi na poziomie serwera. Zapisowi mogą podlegać:", ["zasoby określone identyfikatorem URL (adresy żądanych zasobów – stron, plików),", "czas nadejścia zapytania,", "czas wysłania odpowiedzi,", "nazwę stacji klienta – identyfikacja realizowana przez protokół HTTP,", "informacje o błędach jakie nastąpiły przy realizacji transakcji HTTP,", "adres URL strony poprzednio odwiedzanej przez użytkownika (referer link),", "informacje o przeglądarce użytkownika,", "informacje o adresie IP."]],
        ],
      },
      {
        h: "4. Twoje prawa i dodatkowe informacje o sposobie wykorzystania danych",
        items: [
          ["W niektórych sytuacjach Administrator ma prawo przekazywać Twoje dane osobowe innym odbiorcom:", ["firma hostingowa na zasadzie powierzenia"]],
          "Twoje dane osobowe przetwarzane przez Administratora nie dłużej, niż jest to konieczne do wykonania związanych z nimi czynności. W odniesieniu do danych marketingowych dane nie będą przetwarzane dłużej niż przez 3 lata.",
          ["Przysługuje Ci prawo żądania od Administratora:", ["dostępu do danych osobowych Ciebie dotyczących,", "ich sprostowania,", "usunięcia,", "ograniczenia przetwarzania,", "oraz przenoszenia danych."]],
          "Przysługuje Ci prawo do złożenia sprzeciwu w zakresie przetwarzania wskazanego w pkt 3.2.",
          "Na działania Administratora przysługuje skarga do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.",
          "Podanie danych osobowych jest dobrowolne, lecz niezbędne do obsługi Serwisu.",
          "Dane osobowe nie są przekazywane do krajów trzecich w rozumieniu przepisów o ochronie danych osobowych.",
        ],
      },
      {
        h: "5. Informacje w formularzach",
        items: [
          "Serwis zbiera informacje podane dobrowolnie przez użytkownika, w tym dane osobowe, o ile zostaną one podane.",
          "Serwis może zapisać informacje o parametrach połączenia (oznaczenie czasu, adres IP).",
          "Dane podane w formularzu są przetwarzane w celu wynikającym z funkcji konkretnego formularza.",
        ],
      },
      {
        h: "6. Logi Administratora",
        items: ["Informacje o zachowaniu użytkowników w serwisie mogą podlegać logowaniu. Dane te są wykorzystywane w celu administrowania serwisem."],
      },
      {
        h: "7. Istotne techniki marketingowe",
        items: [
          "Operator stosuje analizę statystyczną ruchu na stronie, poprzez Google Analytics (Google Inc. z siedzibą w USA). Operator nie przekazuje do operatora tej usługi danych osobowych, a jedynie zanonimizowane informacje.",
          "Operator stosuje techniki remarketingowe, pozwalające na dopasowanie przekazów reklamowych do zachowania użytkownika na stronie.",
          "Operator stosuje rozwiązanie badające zachowanie użytkowników poprzez tworzenie map ciepła oraz nagrywanie zachowania na stronie. Te informacje są anonimizowane zanim zostaną przesłane do operatora usługi.",
        ],
      },
      {
        h: "8. Informacja o plikach cookies",
        items: [
          "Serwis korzysta z plików cookies.",
          "Pliki cookies stanowią dane informatyczne, w szczególności pliki tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika Serwisu.",
          "Podmiotem zamieszczającym na urządzeniu końcowym Użytkownika Serwisu pliki cookies oraz uzyskującym do nich dostęp jest operator Serwisu.",
          ["Pliki cookies wykorzystywane są w następujących celach:", ["utrzymanie sesji użytkownika Serwisu;", "realizacji celów określonych powyżej w części „Istotne techniki marketingowe";"]],
          "W ramach Serwisu stosowane są dwa zasadnicze rodzaje plików cookies: „sesyjne" (session cookies) oraz „stałe" (persistent cookies).",
          "Pliki cookies zamieszczane w urządzeniu końcowym Użytkownika Serwisu wykorzystywane mogą być również przez współpracujące z operatorem Serwisu podmioty, w szczególności dotyczy to firm: Google (Google Inc. z siedzibą w USA), Facebook (Facebook Inc. z siedzibą w USA).",
        ],
      },
      {
        h: "9. Zarządzanie plikami cookies",
        items: [
          "Jeśli użytkownik nie chce otrzymywać plików cookies, może zmienić ustawienia przeglądarki.",
          ["W celu zarządzania ustawieniami cookies wybierz z listy poniżej przeglądarkę internetową:", ["Edge", "Chrome", "Safari", "Firefox", "Opera"]],
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    updated: "Last updated: 2026",
    intro: "This Privacy Policy describes how we process information about you, including personal data and cookies.",
    sections: [
      {
        h: "1. General information",
        items: [
          "This policy applies to the website operating at: projstog.pl",
          "The operator of the website and the Controller of personal data is: Oscar Grzywa",
          "Contact email address of the operator: biuro@projstog.pl",
          "The operator is the Controller of your personal data with respect to data voluntarily provided in the Service.",
          ["The Service uses personal data for the following purposes:", ["Handling enquiries submitted via the contact form", "Presenting offers or information"]],
          ["The Service collects information about users and their behaviour in the following ways:", ["Through data voluntarily entered in forms, which is stored in the Operator's systems.", "Through saving cookies on end devices."]],
        ],
      },
      {
        h: "2. Selected data protection methods used by the Operator",
        items: [
          "Login and data entry areas are protected at the transmission layer (SSL certificate).",
          "User passwords are stored in hashed form.",
          "The Operator regularly creates backups to protect data.",
          "Regular software updates are an essential element of data protection.",
        ],
      },
      {
        h: "3. Hosting",
        items: [
          "The Service is hosted on the servers of an external hosting company.",
          ["The hosting company maintains server-level logs for technical reliability. The following may be recorded:", ["Resources identified by URL (addresses of requested resources — pages, files),", "Time of request arrival,", "Time of response,", "Client station name — identification via HTTP protocol,", "Information about errors during HTTP transactions,", "URL of the previously visited page (referrer link),", "Browser information,", "IP address."]],
        ],
      },
      {
        h: "4. Your rights and additional information on data use",
        items: [
          ["In certain situations the Administrator may transfer your personal data to other recipients:", ["the hosting company on an entrustment basis"]],
          "Your personal data is processed by the Administrator no longer than necessary to perform the related activities. Marketing data will not be processed for more than 3 years.",
          ["You have the right to request from the Administrator:", ["access to your personal data,", "rectification,", "erasure,", "restriction of processing,", "and data portability."]],
          "You have the right to object to processing referred to in section 3.2.",
          "You may lodge a complaint with the President of the Personal Data Protection Office, ul. Stawki 2, 00-193 Warsaw, Poland.",
          "Providing personal data is voluntary but necessary to use the Service.",
          "Personal data is not transferred to third countries within the meaning of data protection regulations.",
        ],
      },
      {
        h: "5. Information in forms",
        items: [
          "The Service collects information voluntarily provided by the user, including personal data where provided.",
          "The Service may save information about connection parameters (timestamp, IP address).",
          "Data provided in a form is processed for the purpose resulting from the function of that specific form.",
        ],
      },
      {
        h: "6. Administrator logs",
        items: ["Information about user behaviour on the website may be logged. This data is used for website administration purposes."],
      },
      {
        h: "7. Key marketing techniques",
        items: [
          "The Operator uses statistical traffic analysis via Google Analytics (Google Inc., USA). The Operator does not pass personal data to this service — only anonymised information.",
          "The Operator uses remarketing techniques to match advertising messages to user behaviour on the site.",
          "The Operator uses solutions that study user behaviour through heatmaps and session recordings. This information is anonymised before being sent to the service operator.",
        ],
      },
      {
        h: "8. Cookie information",
        items: [
          "The Service uses cookies.",
          "Cookies are IT data, in particular text files, stored on the end device of the Service user.",
          "The entity placing cookies on the user's end device and accessing them is the Service operator.",
          ["Cookies are used for the following purposes:", ["maintaining the user's session;", "achieving the purposes described above in the 'Key marketing techniques' section;"]],
          "The Service uses two main types of cookies: session cookies and persistent cookies.",
          "Cookies placed on the user's end device may also be used by the Operator's partners, in particular: Google (Google Inc., USA), Facebook (Facebook Inc., USA).",
        ],
      },
      {
        h: "9. Managing cookies",
        items: [
          "If you do not want to receive cookies, you can change your browser settings.",
          ["To manage cookie settings, select your browser from the list below:", ["Edge", "Chrome", "Safari", "Firefox", "Opera"]],
        ],
      },
    ],
  },
};

type Section = { h: string; items: (string | [string, string[]])[]; };

function renderItems(items: (string | [string, string[]])[]) {
  return (
    <ol>
      {items.map((item, i) => (
        <li key={i}>
          {Array.isArray(item) ? (
            <>{item[0]}<ul>{item[1].map((sub, j) => <li key={j}>{sub}</li>)}</ul></>
          ) : item}
        </li>
      ))}
    </ol>
  );
}

export default function PolitykaPrywatnosci() {
  const { lang } = useLang();
  const t = pp[lang];

  return (
    <div style={{ color: "#ECE7DD", background: "#060807", minHeight: "100vh" }}>
      <Nav />

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "120px 24px 80px" }}>

        <h1 style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 900, fontSize: "clamp(1.8rem, 5vw, 3rem)", color: "#ECE7DD", marginBottom: 12, letterSpacing: "-0.03em" }}>
          {t.title}
        </h1>
        <p style={{ color: "#4a6347", fontSize: 14, marginBottom: 48 }}>{t.updated}</p>

        <div style={{ borderRadius: 16, border: "1px solid rgba(52,225,46,0.08)", padding: "20px 28px", marginBottom: 40, background: "rgba(52,225,46,0.03)" }}>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#9aad96", margin: 0 }}>{t.intro}</p>
        </div>

        <style>{`
          .pp h2 { font-family: var(--font-geist-sans); font-weight: 800; font-size: 1.15rem; color: #ECE7DD; margin: 2.5rem 0 1rem; letter-spacing: -0.02em; }
          .pp ol, .pp ul { padding-left: 1.4rem; }
          .pp li { color: #9aad96; font-size: 14px; line-height: 1.85; margin-bottom: 6px; }
          .pp a { color: #34E12E; }
        `}</style>

        <div className="pp">
          {(t.sections as Section[]).map((sec, i) => (
            <div key={i}>
              <h2>{sec.h}</h2>
              {renderItems(sec.items)}
            </div>
          ))}
        </div>

      </div>

      <Footer />
    </div>
  );
}

"use client";

import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export default function PolitykaPrywatnosci() {
  return (
    <div style={{ color: "#ECE7DD", background: "#060807", minHeight: "100vh" }}>
      <Nav />

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "120px 24px 80px" }}>

        <h1 style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 900, fontSize: "clamp(1.8rem, 5vw, 3rem)", color: "#ECE7DD", marginBottom: 12, letterSpacing: "-0.03em" }}>
          Polityka prywatności
        </h1>
        <p style={{ color: "#4a6347", fontSize: 14, marginBottom: 48 }}>Ostatnia aktualizacja: 2026</p>

        <div style={{ borderRadius: 16, border: "1px solid rgba(52,225,46,0.08)", padding: "20px 28px", marginBottom: 40, background: "rgba(52,225,46,0.03)" }}>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#9aad96" }}>
            Polityka prywatności opisuje zasady przetwarzania przez nas informacji na Twój temat,
            w tym danych osobowych oraz ciasteczek, czyli tzw. cookies.
          </p>
        </div>

        <style>{`
          .pp h2 { font-family: var(--font-geist-sans); font-weight: 800; font-size: 1.15rem; color: #ECE7DD; margin: 2.5rem 0 1rem; letter-spacing: -0.02em; }
          .pp ol, .pp ul { padding-left: 1.4rem; }
          .pp li { color: #9aad96; font-size: 14px; line-height: 1.85; margin-bottom: 6px; }
          .pp a { color: #34E12E; }
          .pp hr { border: none; border-top: 1px solid rgba(52,225,46,0.08); margin: 2rem 0; }
        `}</style>

        <div className="pp">
          <h2>1. Informacje ogólne</h2>
          <ol>
            <li>Niniejsza polityka dotyczy Serwisu www, funkcjonującego pod adresem url: <strong style={{ color: "#ECE7DD" }}>projstog.pl</strong></li>
            <li>Operatorem serwisu oraz Administratorem danych osobowych jest: <strong style={{ color: "#ECE7DD" }}>Oscar Grzywa</strong></li>
            <li>Adres kontaktowy poczty elektronicznej operatora: <a href="mailto:biuro@projstog.pl">biuro@projstog.pl</a></li>
            <li>Operator jest Administratorem Twoich danych osobowych w odniesieniu do danych podanych dobrowolnie w Serwisie.</li>
            <li>Serwis wykorzystuje dane osobowe w następujących celach:
              <ul>
                <li>Obsługa zapytań przez formularz</li>
                <li>Prezentacja oferty lub informacji</li>
              </ul>
            </li>
            <li>Serwis realizuje funkcje pozyskiwania informacji o użytkownikach i ich zachowaniu w następujący sposób:
              <ol>
                <li>Poprzez dobrowolnie wprowadzone w formularzach dane, które zostają wprowadzone do systemów Operatora.</li>
                <li>Poprzez zapisywanie w urządzeniach końcowych plików cookie (tzw. „ciasteczka").</li>
              </ol>
            </li>
          </ol>

          <h2>2. Wybrane metody ochrony danych stosowane przez Operatora</h2>
          <ol>
            <li>Miejsca logowania i wprowadzania danych osobowych są chronione w warstwie transmisji (certyfikat SSL).</li>
            <li>Hasła użytkowników są przechowywane w postaci hashowanej.</li>
            <li>W celu ochrony danych Operator regularnie wykonuje kopie bezpieczeństwa.</li>
            <li>Istotnym elementem ochrony danych jest regularna aktualizacja wszelkiego oprogramowania, wykorzystywanego przez Operatora do przetwarzania danych osobowych.</li>
          </ol>

          <h2>3. Hosting</h2>
          <ol>
            <li>Serwis jest hostowany na serwerach operatora zewnętrznej firmy hostingowej.</li>
            <li>Firma hostingowa w celu zapewnienia niezawodności technicznej prowadzi logi na poziomie serwera. Zapisowi mogą podlegać:
              <ul>
                <li>zasoby określone identyfikatorem URL (adresy żądanych zasobów – stron, plików),</li>
                <li>czas nadejścia zapytania,</li>
                <li>czas wysłania odpowiedzi,</li>
                <li>nazwę stacji klienta – identyfikacja realizowana przez protokół HTTP,</li>
                <li>informacje o błędach jakie nastąpiły przy realizacji transakcji HTTP,</li>
                <li>adres URL strony poprzednio odwiedzanej przez użytkownika (referer link),</li>
                <li>informacje o przeglądarce użytkownika,</li>
                <li>informacje o adresie IP.</li>
              </ul>
            </li>
          </ol>

          <h2>4. Twoje prawa i dodatkowe informacje o sposobie wykorzystania danych</h2>
          <ol>
            <li>W niektórych sytuacjach Administrator ma prawo przekazywać Twoje dane osobowe innym odbiorcom:
              <ul><li>firma hostingowa na zasadzie powierzenia</li></ul>
            </li>
            <li>Twoje dane osobowe przetwarzane przez Administratora nie dłużej, niż jest to konieczne do wykonania związanych z nimi czynności. W odniesieniu do danych marketingowych dane nie będą przetwarzane dłużej niż przez 3 lata.</li>
            <li>Przysługuje Ci prawo żądania od Administratora:
              <ul>
                <li>dostępu do danych osobowych Ciebie dotyczących,</li>
                <li>ich sprostowania,</li>
                <li>usunięcia,</li>
                <li>ograniczenia przetwarzania,</li>
                <li>oraz przenoszenia danych.</li>
              </ul>
            </li>
            <li>Przysługuje Ci prawo do złożenia sprzeciwu w zakresie przetwarzania wskazanego w pkt 3.2.</li>
            <li>Na działania Administratora przysługuje skarga do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.</li>
            <li>Podanie danych osobowych jest dobrowolne, lecz niezbędne do obsługi Serwisu.</li>
            <li>Dane osobowe nie są przekazywane do krajów trzecich w rozumieniu przepisów o ochronie danych osobowych.</li>
          </ol>

          <h2>5. Informacje w formularzach</h2>
          <ol>
            <li>Serwis zbiera informacje podane dobrowolnie przez użytkownika, w tym dane osobowe, o ile zostaną one podane.</li>
            <li>Serwis może zapisać informacje o parametrach połączenia (oznaczenie czasu, adres IP).</li>
            <li>Dane podane w formularzu są przetwarzane w celu wynikającym z funkcji konkretnego formularza.</li>
          </ol>

          <h2>6. Logi Administratora</h2>
          <ol>
            <li>Informacje zachowaniu użytkowników w serwisie mogą podlegać logowaniu. Dane te są wykorzystywane w celu administrowania serwisem.</li>
          </ol>

          <h2>7. Istotne techniki marketingowe</h2>
          <ol>
            <li>Operator stosuje analizę statystyczną ruchu na stronie, poprzez Google Analytics (Google Inc. z siedzibą w USA). Operator nie przekazuje do operatora tej usługi danych osobowych, a jedynie zanonimizowane informacje.</li>
            <li>Operator stosuje techniki remarketingowe, pozwalające na dopasowanie przekazów reklamowych do zachowania użytkownika na stronie.</li>
            <li>Operator stosuje rozwiązanie badające zachowanie użytkowników poprzez tworzenie map ciepła oraz nagrywanie zachowania na stronie. Te informacje są anonimizowane zanim zostaną przesłane do operatora usługi.</li>
          </ol>

          <h2>8. Informacja o plikach cookies</h2>
          <ol>
            <li>Serwis korzysta z plików cookies.</li>
            <li>Pliki cookies stanowią dane informatyczne, w szczególności pliki tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika Serwisu.</li>
            <li>Podmiotem zamieszczającym na urządzeniu końcowym Użytkownika Serwisu pliki cookies oraz uzyskującym do nich dostęp jest operator Serwisu.</li>
            <li>Pliki cookies wykorzystywane są w następujących celach:
              <ol>
                <li>utrzymanie sesji użytkownika Serwisu;</li>
                <li>realizacji celów określonych powyżej w części „Istotne techniki marketingowe";</li>
              </ol>
            </li>
            <li>W ramach Serwisu stosowane są dwa zasadnicze rodzaje plików cookies: „sesyjne" (session cookies) oraz „stałe" (persistent cookies).</li>
            <li>Pliki cookies zamieszczane w urządzeniu końcowym Użytkownika Serwisu wykorzystywane mogą być również przez współpracujące z operatorem Serwisu podmioty, w szczególności dotyczy to firm: Google (Google Inc. z siedzibą w USA), Facebook (Facebook Inc. z siedzibą w USA).</li>
          </ol>

          <h2>9. Zarządzanie plikami cookies</h2>
          <ol>
            <li>Jeśli użytkownik nie chce otrzymywać plików cookies, może zmienić ustawienia przeglądarki.</li>
            <li>W celu zarządzania ustawienia cookies wybierz z listy poniżej przeglądarkę internetową:
              <ul>
                <li><a href="https://support.microsoft.com/pl-pl/help/10607/microsoft-edge-view-delete-browser-history" target="_blank" rel="noopener noreferrer">Edge</a></li>
                <li><a href="https://support.google.com/chrome/bin/answer.py?hl=pl&answer=95647" target="_blank" rel="noopener noreferrer">Chrome</a></li>
                <li><a href="http://support.apple.com/kb/PH5042" target="_blank" rel="noopener noreferrer">Safari</a></li>
                <li><a href="http://support.mozilla.org/pl/kb/W%C5%82%C4%85czanie%20i%20wy%C5%82%C4%85czanie%20obs%C5%82ugi%20ciasteczek" target="_blank" rel="noopener noreferrer">Firefox</a></li>
                <li><a href="http://help.opera.com/Windows/12.10/pl/cookies.html" target="_blank" rel="noopener noreferrer">Opera</a></li>
              </ul>
            </li>
          </ol>
        </div>

      </div>

      <Footer />
    </div>
  );
}

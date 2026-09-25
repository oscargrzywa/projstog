/**
 * Wpisy blogowe.
 *
 * ⚠ SLUGI SĄ WSPÓLNE DLA OBU JĘZYKÓW.
 * `publicPath()` przepuszcza segmenty dynamiczne bez tłumaczenia, więc
 * przełącznik języka (`switchLocale`) zadziała tylko wtedy, gdy wpis PL i jego
 * odpowiednik EN mają IDENTYCZNY `slug`. Gdyby kiedyś doszła mapa slugów per
 * język w `lib/routes.ts`, można to rozdzielić — do tego czasu slug polski
 * obowiązuje w obu wersjach.
 *
 * ⚠ `readingMinutes` zostawiamy na 0 — realną wartość liczy `lib/cms/local.ts`
 * przy odczycie, na podstawie długości `body`. Ręczne wpisywanie rozjeżdża się
 * z treścią przy pierwszej edycji.
 *
 * ⚠ Rzetelność: wszystkie kwoty w tekstach są opisane jako ORIENTACYJNE WIDEŁKI
 * RYNKOWE, a nie cennik PROJSTOG ani wynik badania. Wpis o dostępności cyfrowej
 * opiera się na dyrektywie (UE) 2019/882 i ustawie z 26 kwietnia 2024 r.
 * o zapewnianiu spełniania wymagań dostępności niektórych produktów i usług
 * przez podmioty gospodarcze (stosowanej od 28 czerwca 2025 r.) i zawiera
 * wyraźne zastrzeżenie, że nie jest poradą prawną.
 */

import type { Post } from "@/lib/cms/types";
import type { Locale } from "@/lib/routes";

const AUTHOR_PL = { name: "Oscar Grzywa", role: "Właściciel PROJSTOG" };
const AUTHOR_EN = { name: "Oscar Grzywa", role: "Owner, PROJSTOG" };

/* ------------------------------------------------------------------- PL */

const POSTS_PL: Post[] = [
  {
    slug: "ile-kosztuje-strona-internetowa-dla-malej-firmy",
    title: "Ile kosztuje strona internetowa dla małej firmy",
    excerpt:
      "Orientacyjne widełki rynkowe, lista rzeczy, które realnie windują cenę, i koszty, o których nikt nie mówi przy podpisaniu umowy.",
    publishedAt: "2026-04-10",
    tags: ["koszty", "strony internetowe", "mała firma"],
    readingMinutes: 0,
    author: AUTHOR_PL,
    seo: {
      title: "Ile kosztuje strona internetowa dla małej firmy",
      description:
        "Orientacyjne widełki rynkowe dla strony firmowej w Polsce, co realnie podnosi cenę, jakie koszty dochodzą po wdrożeniu i na jakie zapisy w umowie uważać.",
    },
    body: [
      {
        type: "heading",
        level: 2,
        text: "Ile kosztuje strona internetowa dla małej firmy?",
      },
      {
        type: "paragraph",
        text: "Orientacyjnie: prosta strona wizytówkowa to na polskim rynku najczęściej okolice 3–8 tys. zł netto, strona firmowa z blogiem i osobnymi podstronami usług 6–15 tys. zł, a sklep internetowy startuje zwykle od 8 tys. zł i idzie w górę razem z liczbą integracji. To widełki, jakie widać w ofertach wykonawców, a nie cennik ani wynik badania — u konkretnego freelancera będzie taniej, w agencji z projektantem i kierownikiem projektu wyraźnie drożej.",
      },
      {
        type: "paragraph",
        text: "Rozrzut jest tak duży, bo „strona internetowa” to nie jeden produkt. Dwie oferty na 4 tys. i 14 tys. zł mogą dotyczyć czegoś zupełnie innego, a różnicy nie widać na zrzucie ekranu.",
      },
      {
        type: "heading",
        level: 2,
        text: "Co realnie podbija cenę",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Liczba unikalnych układów, a nie liczba podstron. Dziesięć podstron na tym samym szablonie to jeden układ. Strona główna, oferta, cennik, kontakt i blog to pięć.",
          "Treść. Jeśli wykonawca ma napisać teksty, to osobna praca — i zwykle najbardziej niedoszacowana pozycja w wycenie.",
          "Zdjęcia. Stocki są tanie i widać je na kilometr. Sesja u fotografa to realny wydatek, ale dla firmy lokalnej zwykle zwraca się najszybciej ze wszystkiego.",
          "Integracje: system rezerwacji, płatności, CRM, fakturowanie, magazyn. Każda to osobne testy i osobne miejsce, w którym coś kiedyś pęknie.",
          "Dwa języki. To nie jest +10%, tylko drugi komplet treści i druga struktura adresów do utrzymania.",
          "Wymogi wydajności i dostępności. Strona, która ma realnie szybko działać na słabym telefonie w zasięgu LTE, kosztuje więcej niż taka, która ładnie wygląda na laptopie wykonawcy.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Koszty, których nie ma na wycenie",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Domena — kilkadziesiąt złotych rocznie, ale odnowienie bywa droższe niż pierwszy rok.",
          "Hosting — od kilkuset złotych rocznie w górę, w zależności od tego, czy strona jest statyczna, czy ciągnie bazę danych.",
          "Poczta na własnej domenie — osobna usługa, bardzo często pomijana w budżecie.",
          "Aktualizacje i kopie zapasowe, jeśli strona stoi na CMS-ie. Nieaktualizowany WordPress to kwestia czasu, nie ryzyka.",
          "Drobne zmiany po wdrożeniu. Ustal stawkę godzinową ZANIM będą potrzebne.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Na co uważać w ofercie",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Abonament bez prawa do kodu. Jeśli po rozstaniu z wykonawcą zostajesz z niczym, to nie jest strona — to wynajem.",
          "Brak jasnego zapisu o przekazaniu dostępów: domena, hosting, panel, konto analityczne. Domena powinna być zarejestrowana na Ciebie, nie na wykonawcę.",
          "„SEO w cenie” bez sprecyzowania, co to znaczy. Poprawne nagłówki i szybkie ładowanie to standard, a nie usługa dodatkowa. Pozycjonowanie to osobna, ciągła praca.",
          "Gotowy szablon wyceniony jak projekt autorski. Szablon nie jest zły — ale cena powinna to odzwierciedlać.",
          "Wycena bez pytania o Twój proces sprzedaży. Kto nie pyta, skąd dziś przychodzą klienci, wycenia wygląd, a nie efekt.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Jak ustawić budżet, żeby się nie rozjechał",
      },
      {
        type: "paragraph",
        text: "Zacznij od tego, ile jest wart jeden klient. Jeśli warsztat zarabia na średnim zleceniu kilkaset złotych, a strona ma przynieść dwa dodatkowe zlecenia w miesiącu, to widać, w jakim czasie zwraca się wydatek 6 tys. zł. Bez tej liczby każda wycena jest „droga”, bo nie ma do czego jej przyłożyć.",
      },
      {
        type: "paragraph",
        text: "Druga rzecz: nie kupuj od razu wszystkiego. Lepiej wystartować z solidną stroną na pięć podstron i dołożyć blog albo kalkulator za pół roku, niż wydać cały budżet na funkcje, których nikt nie używa. Strona i tak będzie żyła — to nie jest zakup jednorazowy jak drukarka.",
      },
      {
        type: "callout",
        text: "Kwoty w tym wpisie są orientacyjnymi widełkami obserwowanymi na rynku, nie cennikiem. Wycena zawsze zależy od zakresu — dlatego rzetelną dostaniesz dopiero po rozmowie o tym, co strona ma robić.",
      },
    ],
  },

  {
    slug: "ile-kosztuje-chatbot-ai-dla-malej-firmy",
    title: "Ile kosztuje chatbot AI dla małej firmy",
    excerpt:
      "Co składa się na cenę wdrożenia, ile realnie kosztuje utrzymanie miesięczne i kiedy chatbot się po prostu nie opłaca.",
    publishedAt: "2026-05-08",
    tags: ["koszty", "AI", "chatboty", "mała firma"],
    readingMinutes: 0,
    author: AUTHOR_PL,
    seo: {
      title: "Ile kosztuje chatbot AI dla małej firmy",
      description:
        "Z czego składa się cena chatbota AI, ile kosztuje utrzymanie miesięczne, jak nie przepłacić i w jakich firmach taki bot zwyczajnie nie ma sensu.",
    },
    body: [
      {
        type: "heading",
        level: 2,
        text: "Ile kosztuje chatbot AI dla małej firmy?",
      },
      {
        type: "paragraph",
        text: "Orientacyjnie: prosty bot odpowiadający na stały zestaw pytań to na polskim rynku okolice 2–6 tys. zł wdrożenia. Bot, który odpowiada na podstawie Twoich własnych materiałów — cenników, regulaminów, opisów usług — to raczej 8–20 tys. zł. Powyżej tego zaczynają się wdrożenia z integracjami do systemów firmowych. Do tego dochodzi koszt miesięczny, najczęściej od około 150 zł do kilkuset złotych przy typowym ruchu małej firmy.",
      },
      {
        type: "paragraph",
        text: "To widełki obserwowane w ofertach, nie cennik. Ale ważniejsze od samej liczby jest to, za co się płaci — bo tu różnice między wykonawcami są większe niż przy stronach.",
      },
      {
        type: "heading",
        level: 2,
        text: "Z czego składa się cena wdrożenia",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Uporządkowanie wiedzy. To zwykle największa część pracy. Firma ma odpowiedzi w głowie właściciela, w mailach i w trzech wersjach cennika — ktoś musi to zebrać, uzgodnić i zapisać.",
          "Konfiguracja zachowania bota: ton, zakres, granice. Co robi, gdy nie wie. Kiedy przekazuje rozmowę do człowieka.",
          "Integracje: formularz kontaktowy, kalendarz, CRM, baza produktów. Każda osobno.",
          "Testy na prawdziwych pytaniach. Nie na wymyślonych — na tych, które faktycznie przychodzą na Messengera i mailem.",
          "Osadzenie na stronie i uruchomienie pomiarów: ile rozmów, ile z nich skończyło się kontaktem, na czym bot się wykłada.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Na co idzie koszt miesięczny",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Zapytania do modelu językowego — rozliczane za ilość przetworzonego tekstu. Przy kilkuset rozmowach miesięcznie w małej firmie to zwykle najmniejsza pozycja.",
          "Hosting warstwy, która łączy bota z Twoimi danymi.",
          "Opieka: przeglądanie rozmów, dopisywanie brakujących odpowiedzi, poprawki po zmianie cennika. Bez tego bot starzeje się w kilka miesięcy.",
        ],
      },
      {
        type: "paragraph",
        text: "Pytanie, które warto zadać każdemu wykonawcy: kto płaci za zapytania do modelu i czy rozliczenie idzie przez jego konto, czy przez Twoje. Rozliczenie przez Twoje konto jest zwykle tańsze i zawsze bardziej przejrzyste.",
      },
      {
        type: "heading",
        level: 2,
        text: "Kiedy chatbot się nie opłaca",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Gdy dostajesz kilka zapytań tygodniowo. Przy takiej skali szybciej i taniej odbierzesz telefon.",
          "Gdy każda wycena jest indywidualna i wymaga obejrzenia obiektu albo auta. Bot zbierze wtedy najwyżej dane kontaktowe — a z tym poradzi sobie zwykły formularz.",
          "Gdy firma nie ma spisanej żadnej wiedzy i nie ma czasu, żeby ją spisać. Bot nie wymyśli odpowiedzi, których nigdzie nie ma.",
          "Gdy główny kanał to Facebook, a strona ma dwa wejścia dziennie. Wtedy najpierw naprawia się stronę.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Jak nie przepłacić",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Zacznij od 20 najczęstszych pytań. Wyciągnij je ze skrzynki i z Messengera, nie z głowy.",
          "Ustal na piśmie, co bot robi, gdy nie zna odpowiedzi — przyznaje się i podaje telefon, a nie improwizuje.",
          "Zażądaj możliwości samodzielnej edycji bazy wiedzy i jej eksportu. To Twoja treść.",
          "Umów się na pomiar: liczba rozmów, liczba przekazań do człowieka, liczba pozyskanych kontaktów. Po dwóch miesiącach będzie wiadomo, czy to się spina.",
          "Wdrażaj etapami. Najpierw FAQ na stronie, potem ewentualnie integracje.",
        ],
      },
      {
        type: "callout",
        text: "Podane kwoty to orientacyjne widełki rynkowe, nie oferta. Najuczciwsza wycena chatbota zaczyna się od przejrzenia Twoich realnych zapytań z ostatniego miesiąca.",
      },
    ],
  },

  {
    slug: "ile-kosztuje-automatyzacja-procesow-w-malej-firmie",
    title: "Ile kosztuje automatyzacja procesów w małej firmie",
    excerpt:
      "Automatyzację wycenia się per proces, nie per firma. Jak policzyć, czy się opłaca, co idzie łatwo, a czego lepiej nie ruszać.",
    publishedAt: "2026-06-12",
    tags: ["koszty", "automatyzacja", "AI", "mała firma"],
    readingMinutes: 0,
    author: AUTHOR_PL,
    seo: {
      title: "Ile kosztuje automatyzacja procesów w małej firmie",
      description:
        "Orientacyjne widełki wyceny automatyzacji, prosty sposób na policzenie zwrotu, lista procesów wartych automatyzacji i tych, których lepiej nie ruszać.",
    },
    body: [
      {
        type: "heading",
        level: 2,
        text: "Ile kosztuje automatyzacja procesów w małej firmie?",
      },
      {
        type: "paragraph",
        text: "Automatyzację wycenia się za proces, nie za firmę. Pojedynczy przepływ typu „formularz ze strony trafia do arkusza, klient dostaje potwierdzenie, a Ty powiadomienie” to orientacyjnie 800–3000 zł. Łańcuch łączący kilka systemów, z warunkami i obsługą błędów — zwykle 3–10 tys. zł. Do tego abonament narzędzia, na którym to stoi, i opieka. To widełki rynkowe, nie cennik.",
      },
      {
        type: "paragraph",
        text: "Dlatego pytanie „ile kosztuje automatyzacja mojej firmy” nie ma sensownej odpowiedzi, dopóki nie wskażesz konkretnej czynności, którą ktoś u Ciebie wykonuje ręcznie co tydzień.",
      },
      {
        type: "heading",
        level: 2,
        text: "Jak w minutę policzyć, czy się opłaca",
      },
      {
        type: "paragraph",
        text: "Weź jedną czynność. Policz, ile minut zajmuje raz, ile razy w miesiącu się powtarza i ile kosztuje godzina osoby, która ją wykonuje. Przykład rachunku: 10 minut × 60 razy w miesiącu to 10 godzin. Przy stawce 50 zł to 500 zł miesięcznie, czyli 6 tys. zł rocznie. Automatyzacja za 2 tys. zł zwraca się wtedy w cztery miesiące — i to jest cała matematyka.",
      },
      {
        type: "paragraph",
        text: "Drugi, często ważniejszy składnik: błędy. Przepisywanie danych z maila do systemu generuje pomyłki, a jedna pomyłka w zamówieniu potrafi kosztować więcej niż całe wdrożenie.",
      },
      {
        type: "heading",
        level: 2,
        text: "Co automatyzuje się najłatwiej",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Zapytanie ze strony → wpis w CRM lub arkuszu → potwierdzenie do klienta → powiadomienie na telefon.",
          "Rezerwacja terminu → wpis w kalendarzu → przypomnienie SMS-em lub mailem dzień wcześniej.",
          "Faktura z maila → odczytanie kwoty i kontrahenta → wpis do zestawienia.",
          "Zdjęcia i opisy produktów → jednolity format → wysyłka do sklepu i na marketplace.",
          "Cykliczny raport, który ktoś co poniedziałek składa ręcznie z trzech miejsc.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Czego lepiej nie automatyzować",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Procesu, który zmienia się co miesiąc. Zdąży się zepsuć, zanim się zwróci.",
          "Procesu, którego nikt w firmie nie potrafi opisać krok po kroku. Automatyzacja bałaganu daje szybszy bałagan.",
          "Decyzji wymagających oceny — komu dać rabat, kiedy odpuścić windykację. Tu automat może najwyżej przygotować dane.",
          "Czynności wykonywanej raz na kwartał. Nawet jeśli zajmuje pół dnia, rachunek najczęściej nie wychodzi.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Ukryte koszty, o które trzeba dopytać",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Limity operacji w narzędziu. Plan, który wystarczał przy 200 zdarzeniach miesięcznie, przy 2000 kosztuje wielokrotnie więcej.",
          "Zmiany po stronie systemów, z którymi się łączysz. Dostawca zmienia interfejs, automatyzacja przestaje działać — ktoś musi to naprawić.",
          "Kto i w jakim czasie reaguje, gdy przepływ padnie w piątek po południu. To powinno być w umowie, nie w dobrej woli.",
          "Gdzie lądują dane po drodze. Jeśli przechodzą przez zewnętrzną usługę, trzeba to uwzględnić w dokumentacji RODO.",
        ],
      },
      {
        type: "callout",
        text: "Zacznij od jednego procesu, który najbardziej Cię irytuje, i policz go tak jak wyżej. Jeśli rachunek nie wychodzi, to znak, że automatyzacja nie jest teraz najpilniejszym wydatkiem.",
      },
    ],
  },

  {
    slug: "wordpress-czy-strona-pisana-od-zera",
    title: "WordPress czy strona pisana od zera — co wybrać dla firmy",
    excerpt:
      "Kiedy WordPress jest rozsądnym wyborem, kiedy przegrywa z kodem pisanym pod konkretną firmę i jak policzyć koszt utrzymania w trzy lata.",
    publishedAt: "2026-07-03",
    tags: ["strony internetowe", "WordPress", "mała firma"],
    readingMinutes: 0,
    author: AUTHOR_PL,
    seo: {
      title: "WordPress czy strona pisana od zera — co wybrać",
      description:
        "Kiedy WordPress ma sens dla małej firmy, kiedy lepiej wypada strona pisana od zera, ile kosztuje utrzymanie jednego i drugiego oraz o co spytać wykonawcę.",
    },
    body: [
      {
        type: "heading",
        level: 2,
        text: "WordPress czy strona pisana od zera?",
      },
      {
        type: "paragraph",
        text: "Dla większości małych firm WordPress jest sensownym wyborem — o ile ktoś nim faktycznie opiekuje. Strona pisana od zera wygrywa wtedy, gdy liczy się szybkość ładowania, nietypowa logika albo spokój na kilka lat bez aktualizacji. To nie jest wybór między „gorszym” a „lepszym”, tylko między dwoma różnymi rozkładami kosztów w czasie.",
      },
      {
        type: "heading",
        level: 2,
        text: "Kiedy WordPress jest dobrym wyborem",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Będziesz sam dodawać treść — wpisy, realizacje, aktualności — i chcesz to robić bez dzwonienia do wykonawcy.",
          "Potrzebujesz gotowych klocków: sklep, rezerwacje, formularze, wielojęzyczność. Ekosystem wtyczek to realna oszczędność.",
          "Chcesz mieć łatwo dostępnego następcę. WordPressa przejmie po Tobie praktycznie każdy wykonawca w Polsce.",
          "Budżet startowy jest ograniczony, a strona ma ruszyć szybko.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Kiedy lepiej wypada strona pisana od zera",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Gdy strona ma być bardzo szybka na telefonie. Strona wygenerowana statycznie nie musi przy każdym wejściu odpytywać bazy danych.",
          "Gdy treści jest mało i rzadko się zmienia — wizytówka usługowa, landing pod kampanię, katalog kilkunastu realizacji.",
          "Gdy potrzebujesz nietypowej logiki: kalkulatora wyceny, konfiguratora, integracji z Twoim systemem. W WordPressie dopisuje się to i tak kodem, tylko w mniej wygodnym miejscu.",
          "Gdy nie chcesz co miesiąc myśleć o aktualizacjach wtyczek i o tym, czy któraś nie otworzy dziury.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Trzecia droga, o której rzadko się mówi",
      },
      {
        type: "paragraph",
        text: "Można mieć jedno i drugie: panel do edycji treści osobno, a stronę generowaną statycznie. Treść edytujesz w wygodnym panelu, a odwiedzający dostaje gotowy plik bez bazy danych pod spodem. Kosztuje to więcej na starcie i wymaga wykonawcy, który to ogarnia — ale rozwiązuje jednocześnie problem szybkości i problem samodzielnej edycji.",
      },
      {
        type: "heading",
        level: 2,
        text: "Koszt w perspektywie trzech lat",
      },
      {
        type: "paragraph",
        text: "Przy WordPressie licz hosting pod PHP i bazę danych, płatne licencje wtyczek odnawiane co rok, kopie zapasowe i czyjąś pracę przy aktualizacjach. Przy stronie statycznej hosting bywa symboliczny, nie ma licencji i nie ma cyklicznych aktualizacji — ale każda zmiana poza treścią wymaga wykonawcy. Policz to raz, na kartce, zanim wybierzesz. Bardzo często okazuje się, że różnica w cenie wdrożenia wyrównuje się w drugim roku.",
      },
      {
        type: "heading",
        level: 2,
        text: "O co zapytać wykonawcę przed decyzją",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Które elementy będę mógł zmienić sam, a przy których muszę dzwonić?",
          "Ile wtyczek płatnych jest w projekcie i kto odnawia licencje?",
          "Kto robi aktualizacje i kopie zapasowe, jak często i za ile?",
          "Czy dostanę kod i pełne dostępy, jeśli się rozstaniemy?",
          "Jak strona zachowa się na trzyletnim telefonie przy słabym zasięgu?",
        ],
      },
      {
        type: "callout",
        text: "Zła odpowiedź na pytanie o aktualizacje jest groźniejsza niż zły wybór technologii. Porzucony WordPress to nie tylko wolna strona — to strona, która prędzej czy później zostanie przejęta.",
      },
    ],
  },

  {
    slug: "wizytowka-google-moja-firma-jak-ja-ustawic",
    title: "Wizytówka Google Moja Firma — jak ją ustawić, żeby działała",
    excerpt:
      "Pięć ustawień, które robią większość efektu, pola ignorowane przez prawie wszystkich i sposób na sprawdzenie, czy profil faktycznie przynosi telefony.",
    publishedAt: "2026-08-14",
    tags: ["SEO lokalne", "Google", "mała firma"],
    readingMinutes: 0,
    author: AUTHOR_PL,
    seo: {
      title: "Wizytówka Google Moja Firma — jak ją ustawić",
      description:
        "Kategoria główna, obszar działania, zdjęcia, opinie i sekcja pytań — konkretne ustawienia profilu firmy w Google plus sposób na pomiar realnych efektów.",
    },
    body: [
      {
        type: "heading",
        level: 2,
        text: "Co w wizytówce Google faktycznie robi różnicę?",
      },
      {
        type: "paragraph",
        text: "Pięć rzeczy: poprawnie dobrana kategoria główna, dane kontaktowe identyczne jak na stronie, prawdziwe zdjęcia dodawane regularnie, odpowiedzi na wszystkie opinie i uzupełniona lista usług wraz z obszarem działania. Reszta to dokładanie procentów. Jeśli któraś z tej piątki leży, nie ma sensu zajmować się niczym innym.",
      },
      {
        type: "paragraph",
        text: "Uwaga organizacyjna: „Google Moja Firma” to stara nazwa. Dziś to Profil Firmy w Google, a edytuje się go bezpośrednio w wynikach wyszukiwania i w Mapach, po zalogowaniu na konto właściciela — nie w osobnej aplikacji.",
      },
      {
        type: "heading",
        level: 2,
        text: "Kategoria główna — jedno pole, które waży najwięcej",
      },
      {
        type: "paragraph",
        text: "Kategoria główna decyduje, na jakie zapytania Google w ogóle rozważy Twoją firmę. „Warsztat samochodowy” i „Serwis klimatyzacji samochodowej” to dwa różne zestawy zapytań. Wybierz tę, która opisuje Twój główny zarobek, a resztę dodaj jako kategorie dodatkowe. Zanim wybierzesz, wpisz w Mapy zapytanie, na które chcesz się pokazywać, i sprawdź, jakie kategorie mają firmy z pierwszej trójki.",
      },
      {
        type: "heading",
        level: 2,
        text: "Adres czy obszar działania",
      },
      {
        type: "paragraph",
        text: "Jeśli nie przyjmujesz klientów pod swoim adresem — dojeżdżasz do nich — ustaw obszar działania i ukryj adres. Podawanie adresu, pod którym nikogo nie obsługujesz, jest niezgodne z zasadami Google i grozi zawieszeniem profilu. Obszar działania ustaw realistycznie: kilka najbliższych miejscowości i powiat, a nie całe województwo. Szeroki obszar nie zwiększa zasięgu, a rozmywa trafność.",
      },
      {
        type: "heading",
        level: 2,
        text: "Zdjęcia — co ma znaczenie, a co nie",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Prawdziwe zdjęcia z telefonu biją stocki. Klient lokalny chce zobaczyć Twój warsztat, a nie zdjęcie warsztatu z Kalifornii.",
          "Regularność jest ważniejsza niż liczba. Kilka zdjęć co miesiąc działa lepiej niż czterdzieści wrzucone raz.",
          "Pokaż wnętrze, wejście od ulicy i miejsce, gdzie się parkuje. To realnie ułatwia klientowi dotarcie.",
          "Dodaj zdjęcia efektów pracy — przed i po. To jest to, co ludzie oglądają najdłużej.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Opinie: jak prosić i jak odpowiadać",
      },
      {
        type: "paragraph",
        text: "Poproś osobiście, przy odbiorze, gdy klient jest zadowolony — wtedy zgoda jest najwyższa. Wyślij krótki link do wystawienia opinii SMS-em, bo szukanie profilu w Mapach zniechęca połowę ludzi. Nie kupuj opinii i nie proś o nie hurtem: nagły skok jest dla Google sygnałem, a dla klienta czytającego profil — też.",
      },
      {
        type: "paragraph",
        text: "Odpowiadaj na wszystkie, także na te pięciogwiazdkowe bez treści. Przy negatywnej: bez emocji, bez podważania, konkretna propozycja kontaktu. Tę odpowiedź czyta nie autor opinii, tylko kolejnych pięćdziesięciu klientów, którzy rozważają telefon do Ciebie.",
      },
      {
        type: "heading",
        level: 2,
        text: "Sekcja pytań i odpowiedzi — pole, które prawie wszyscy ignorują",
      },
      {
        type: "paragraph",
        text: "W profilu jest sekcja pytań, w której odpowiedzieć może każdy — również ktoś, kto nie ma pojęcia o Twojej firmie. Możesz zadać pytanie sam, z innego konta, i sam na nie odpowiedzieć. To całkowicie legalne i pozwala umieścić w profilu odpowiedzi, o które klienci pytają przez telefon po pięć razy dziennie: czy wystawiacie fakturę, czy trzeba się umawiać, jak płacić, czy dojeżdżacie do danej miejscowości.",
      },
      {
        type: "heading",
        level: 2,
        text: "Jak sprawdzić, czy to działa",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "W statystykach profilu patrz na liczbę telefonów, kliknięć w trasę i wejść na stronę — a nie na samą liczbę wyświetleń.",
          "Do adresu strony w profilu dopisz znaczniki kampanii, żeby w analityce oddzielić ruch z wizytówki od reszty.",
          "Sprawdzaj to raz w miesiącu, nie co tydzień. Wahania tygodniowe to szum.",
          "Porównuj rok do roku, jeśli Twoja branża jest sezonowa — inaczej wyciągniesz błędne wnioski.",
        ],
      },
      {
        type: "callout",
        text: "Numer telefonu, nazwa i adres muszą brzmieć identycznie na stronie, w profilu i w katalogach firm. Nawet inny zapis numeru to niepotrzebny rozjazd w sygnałach lokalnych.",
      },
    ],
  },

  {
    slug: "dostepnosc-cyfrowa-eaa-strona-firmowa",
    title: "Dostępność cyfrowa (EAA) — co musi spełniać strona firmowa",
    excerpt:
      "Kogo naprawdę dotyczą przepisy obowiązujące od czerwca 2025, czego wymagają od strony i jak w 20 minut sprawdzić własny serwis.",
    publishedAt: "2026-09-18",
    tags: ["prawo", "dostępność", "strony internetowe"],
    readingMinutes: 0,
    author: AUTHOR_PL,
    seo: {
      title: "Dostępność cyfrowa (EAA) a strona firmowa",
      description:
        "Kogo obejmują przepisy o dostępności cyfrowej obowiązujące od czerwca 2025, co powinna spełniać strona firmy i jak samodzielnie sprawdzić własny serwis.",
    },
    body: [
      {
        type: "heading",
        level: 2,
        text: "Czy moja strona firmowa musi spełniać wymogi dostępności?",
      },
      {
        type: "paragraph",
        text: "Krótko: jeśli prowadzisz mikroprzedsiębiorstwo i świadczysz usługi, najprawdopodobniej nie — ustawa wyłącza usługi mikroprzedsiębiorców. Jeśli jednak sprzedajesz online i firma przekracza próg mikro, sklep jest objęty przepisami. Europejski Akt o Dostępności to dyrektywa (UE) 2019/882, którą w Polsce wdraża ustawa z 26 kwietnia 2024 r. o zapewnianiu spełniania wymagań dostępności niektórych produktów i usług przez podmioty gospodarcze, stosowana od 28 czerwca 2025 r.",
      },
      {
        type: "callout",
        text: "To nie jest porada prawna. Piszę jako wykonawca stron, nie prawnik. Jeśli prowadzisz sprzedaż online albo działasz w branży objętej wprost — sklep, bankowość, transport pasażerski, e-booki, telekomunikacja — zakres obowiązków ustal z prawnikiem.",
      },
      {
        type: "heading",
        level: 2,
        text: "Kogo to dotyczy w praktyce",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Warsztat, gabinet czy firma budowlana ze zwykłą stroną wizytówkową i formularzem kontaktowym — co do zasady poza zakresem, o ile mieści się w definicji mikroprzedsiębiorcy.",
          "Sklep internetowy firmy większej niż mikro — handel elektroniczny jest jedną z usług wymienionych w ustawie.",
          "Wyłączenie dla mikroprzedsiębiorców dotyczy usług. Przy obrocie produktami objętymi ustawą sytuacja wygląda inaczej.",
          "Ustawa przewiduje też okresy przejściowe oraz możliwość powołania się na nieproporcjonalne obciążenie — ale to trzeba udokumentować, a nie tylko stwierdzić.",
          "Za niespełnienie wymagań ustawa przewiduje kary pieniężne.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Dlaczego warto nawet bez obowiązku",
      },
      {
        type: "paragraph",
        text: "Dostępność to nie jest wyłącznie kwestia niepełnosprawności. Z tych samych poprawek korzysta klient po sześćdziesiątce, który nie widzi jasnoszarego tekstu, i klient czytający Twój cennik na telefonie w pełnym słońcu. Dodatkowo większość wymagań pokrywa się z tym, co i tak robi się dla wyszukiwarek: sensowna hierarchia nagłówków, opisy obrazków, czytelne etykiety formularzy.",
      },
      {
        type: "heading",
        level: 2,
        text: "Co konkretnie sprawdzić na stronie",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Kontrast tekstu względem tła. Modny jasnoszary tekst na białym tle to najczęstszy błąd polskich stron firmowych.",
          "Obsługa klawiaturą. Przejdź całą stronę klawiszem Tab — do wszystkiego da się dojść i widać, co jest aktualnie zaznaczone?",
          "Widoczny znacznik zaznaczenia. Częsta „poprawka” projektanta to usunięcie obramowania wokół aktywnego elementu. Nie usuwaj — zastąp ładniejszym.",
          "Opisy alternatywne obrazków. Opisowe tam, gdzie obrazek niesie treść; puste tam, gdzie jest wyłącznie dekoracją.",
          "Etykiety pól formularza połączone z polami. Sam szary napis w środku pola znika po kliknięciu i przestaje cokolwiek tłumaczyć.",
          "Hierarchia nagłówków: jeden nagłówek główny, niżej kolejne poziomy po kolei, bez przeskoków dobieranych pod rozmiar czcionki.",
          "Informacja przekazywana nie tylko kolorem. Samo czerwone obramowanie pola nie mówi nic osobie, która nie rozróżnia kolorów — dopisz komunikat tekstowy.",
          "Powiększenie strony do 200%. Treść ma się przelać, a nie zniknąć pod krawędzią ekranu.",
          "Filmy z napisami, jeśli niosą treść istotną dla klienta.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Czego nie robić",
      },
      {
        type: "paragraph",
        text: "Nie kupuj nakładek typu „widget dostępności” w przekonaniu, że załatwiają temat. Doklejony skrypt z suwakiem kontrastu nie naprawi źle zbudowanego formularza ani braku opisów obrazków — a potrafi dodatkowo przeszkodzić osobom korzystającym z własnych narzędzi. Poprawki robi się w kodzie strony.",
      },
      {
        type: "heading",
        level: 2,
        text: "Szybki test we własnym zakresie",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Odłóż mysz i przejdź całą ścieżkę do wysłania formularza samą klawiaturą.",
          "Ustaw powiększenie przeglądarki na 200% i sprawdź, czy da się korzystać ze strony.",
          "Uruchom wbudowany w przeglądarkę audyt dostępności — nie wyłapie wszystkiego, ale wyłapie kontrast i braki opisów.",
          "Poproś kogoś po sześćdziesiątce, żeby przy Tobie znalazł Twój numer telefonu na stronie. Ten jeden test mówi więcej niż większość raportów.",
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------- EN */

const POSTS_EN: Post[] = [
  {
    slug: "ile-kosztuje-strona-internetowa-dla-malej-firmy",
    title: "How much does a small business website cost",
    excerpt:
      "Realistic market ranges for the Polish market, what actually drives the price up, and the costs nobody mentions when you sign.",
    publishedAt: "2026-04-10",
    tags: ["costs", "websites", "small business"],
    readingMinutes: 0,
    author: AUTHOR_EN,
    seo: {
      title: "How much does a small business website cost",
      description:
        "Indicative market ranges for a business website in Poland, what genuinely drives the price, the running costs to budget for and the contract traps to avoid.",
    },
    body: [
      {
        type: "heading",
        level: 2,
        text: "How much does a small business website cost?",
      },
      {
        type: "paragraph",
        text: "As a rough guide for the Polish market: a simple one-purpose site tends to land around 3,000–8,000 PLN net, a full company site with a blog and separate service pages around 6,000–15,000 PLN, and an online store usually starts near 8,000 PLN and climbs with every integration. These are ranges you see in the market, not a price list and not research findings — a freelancer will quote less, an agency with a designer and a project manager noticeably more.",
      },
      {
        type: "paragraph",
        text: "The spread is wide because a website is not one product. A 4,000 PLN quote and a 14,000 PLN quote can describe completely different work, and the difference never shows up in a screenshot.",
      },
      {
        type: "heading",
        level: 2,
        text: "What actually drives the price",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "The number of distinct layouts, not the number of pages. Ten pages on one template is one layout.",
          "Copy. If the developer writes it, that is separate work — and the most commonly underestimated line in any quote.",
          "Photography. Stock images are cheap and everyone can tell. For a local business a real photo session usually pays back faster than anything else on the list.",
          "Integrations: booking, payments, CRM, invoicing, inventory. Each one is separate testing and one more thing that can break later.",
          "A second language. It is not plus ten percent — it is a second set of content and a second URL structure to maintain.",
          "Performance and accessibility requirements. A site that has to feel fast on an old phone on a weak connection costs more than one that looks good on the developer's laptop.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Costs that are not in the quote",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Domain renewal, which is often pricier than the first year.",
          "Hosting — cheap for a static site, more for anything running a database.",
          "Email on your own domain, a separate service that is routinely forgotten.",
          "Updates and backups if the site runs on a CMS. An unmaintained CMS install is a question of when, not if.",
          "Small changes after launch. Agree an hourly rate before you need one.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "What to watch for",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "A monthly fee with no rights to the code. If you leave with nothing, you were renting, not buying.",
          "No clear handover clause for domain, hosting, admin panel and analytics. The domain should be registered to you.",
          "'SEO included' with no definition. Clean headings and fast loading are a baseline, not a service. Ongoing ranking work is separate.",
          "A stock template priced like a custom design. Templates are fine — the price should reflect it.",
          "A quote produced without a single question about how you currently get customers.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Setting a budget that holds",
      },
      {
        type: "paragraph",
        text: "Start from what one customer is worth. If an average job earns you a few hundred zloty and the site is meant to bring two extra jobs a month, the payback period for a 6,000 PLN build is obvious. Without that number every quote feels expensive, because there is nothing to compare it against.",
      },
      {
        type: "callout",
        text: "The figures here are indicative market ranges, not a price list. A meaningful quote only exists after a conversation about what the site is supposed to do.",
      },
    ],
  },

  {
    slug: "ile-kosztuje-chatbot-ai-dla-malej-firmy",
    title: "How much does an AI chatbot cost for a small business",
    excerpt:
      "What you are actually paying for, what the monthly bill consists of, and the cases where a chatbot simply does not pay off.",
    publishedAt: "2026-05-08",
    tags: ["costs", "AI", "chatbots", "small business"],
    readingMinutes: 0,
    author: AUTHOR_EN,
    seo: {
      title: "How much does an AI chatbot cost for a business",
      description:
        "What goes into the price of an AI chatbot, what the monthly running cost covers, how to avoid overpaying and when a chatbot makes no sense at all.",
    },
    body: [
      {
        type: "heading",
        level: 2,
        text: "How much does an AI chatbot cost for a small business?",
      },
      {
        type: "paragraph",
        text: "Roughly, on the Polish market: a simple bot answering a fixed set of questions sits around 2,000–6,000 PLN to build. A bot that answers from your own material — price lists, terms, service descriptions — is more like 8,000–20,000 PLN. Above that you are into integrations with internal systems. Then there is a monthly cost, typically somewhere between 150 PLN and a few hundred zloty at small business traffic levels.",
      },
      {
        type: "paragraph",
        text: "Those are ranges observed in the market, not a price list. What matters more than the number is what the money buys, because the variation between suppliers is bigger here than it is for websites.",
      },
      {
        type: "heading",
        level: 2,
        text: "What you are paying for",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Organising the knowledge. Usually the largest part of the work — the answers live in the owner's head, in old emails and in three versions of a price list.",
          "Configuring behaviour: tone, scope, limits, what happens when the bot does not know, when it hands over to a human.",
          "Integrations — contact form, calendar, CRM, product data. Each one separately.",
          "Testing against real questions, not invented ones.",
          "Deployment plus measurement: how many conversations, how many turned into an enquiry, where the bot fails.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "What the monthly cost covers",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Language model usage, billed by the volume of text processed. At a few hundred conversations a month this is usually the smallest item.",
          "Hosting for the layer connecting the bot to your data.",
          "Maintenance: reading transcripts, filling gaps, updating answers after a price change. Without it the bot goes stale within months.",
        ],
      },
      {
        type: "paragraph",
        text: "One question worth asking any supplier: who pays for model usage, and does it run through their account or yours? Your own account is normally cheaper and always more transparent.",
      },
      {
        type: "heading",
        level: 2,
        text: "When a chatbot is not worth it",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "When you get a handful of enquiries a week. Answering the phone is faster and cheaper.",
          "When every quote requires seeing the vehicle or the site. The bot will only collect contact details, and a form already does that.",
          "When nothing is written down and nobody has time to write it. A bot cannot invent answers that do not exist anywhere.",
          "When your site gets two visits a day. Fix the site first.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "How to avoid overpaying",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Start from your twenty most common questions, pulled from your inbox rather than from memory.",
          "Agree in writing what the bot does when it does not know: admit it and give a phone number, never improvise.",
          "Insist on editing and exporting the knowledge base yourself. It is your content.",
          "Agree on measurement — conversations, handovers, enquiries captured. Two months of data settles the argument.",
          "Roll out in stages: website FAQ first, integrations later if at all.",
        ],
      },
      {
        type: "callout",
        text: "These are indicative market ranges, not an offer. An honest chatbot quote starts with reading a month of your real enquiries.",
      },
    ],
  },

  {
    slug: "ile-kosztuje-automatyzacja-procesow-w-malej-firmie",
    title: "How much does process automation cost in a small business",
    excerpt:
      "Automation is priced per process, not per company. How to work out the payback, what automates easily and what to leave alone.",
    publishedAt: "2026-06-12",
    tags: ["costs", "automation", "AI", "small business"],
    readingMinutes: 0,
    author: AUTHOR_EN,
    seo: {
      title: "How much does process automation cost",
      description:
        "Indicative pricing for business process automation, a simple payback calculation, the processes worth automating and the ones best left as they are.",
    },
    body: [
      {
        type: "heading",
        level: 2,
        text: "How much does process automation cost in a small business?",
      },
      {
        type: "paragraph",
        text: "It is priced per process, not per company. A single flow — a website form lands in a spreadsheet, the customer gets a confirmation, you get a notification — is roughly 800–3,000 PLN. A chain linking several systems with conditions and error handling is usually 3,000–10,000 PLN, plus the subscription for the tool it runs on and ongoing maintenance. Indicative market ranges, not a price list.",
      },
      {
        type: "paragraph",
        text: "Which is why 'how much would it cost to automate my company' has no useful answer until you name one specific task somebody repeats by hand every week.",
      },
      {
        type: "heading",
        level: 2,
        text: "Working out the payback in a minute",
      },
      {
        type: "paragraph",
        text: "Take one task. Multiply the minutes it takes by how often it happens per month, then by the hourly cost of the person doing it. Ten minutes done sixty times a month is ten hours; at 50 PLN an hour that is 500 PLN a month, or 6,000 PLN a year. A 2,000 PLN automation pays for itself in four months. That is the whole calculation.",
      },
      {
        type: "paragraph",
        text: "The second factor, often the larger one, is errors. Retyping data between systems produces mistakes, and one wrong order can cost more than the entire build.",
      },
      {
        type: "heading",
        level: 2,
        text: "What automates easily",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Website enquiry into CRM or spreadsheet, confirmation to the customer, notification to your phone.",
          "Booking into the calendar plus a reminder the day before.",
          "Invoice from email, amount and supplier extracted, row added to a summary.",
          "Product photos and descriptions normalised and pushed to the store and marketplaces.",
          "The recurring report somebody assembles by hand every Monday from three places.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "What to leave alone",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "A process that changes every month. It will break before it pays back.",
          "A process nobody can describe step by step. Automating a mess gives you a faster mess.",
          "Judgement calls — who gets a discount, when to stop chasing an invoice. Automation can only prepare the data.",
          "Anything done once a quarter, even if it takes half a day.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Hidden costs to ask about",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Operation limits in the tool. The plan that suited 200 events a month costs far more at 2,000.",
          "Changes at the other end. A supplier changes their interface, the flow stops, somebody has to fix it.",
          "Who responds, and how fast, when a flow dies on Friday afternoon. Put it in the contract.",
          "Where the data travels. If it passes through a third-party service, that belongs in your GDPR documentation.",
        ],
      },
      {
        type: "callout",
        text: "Start with the one process that annoys you most and run the numbers above. If it does not add up, automation is not your most urgent spend right now.",
      },
    ],
  },

  {
    slug: "wordpress-czy-strona-pisana-od-zera",
    title: "WordPress or a custom-built site — what to choose",
    excerpt:
      "When WordPress is the sensible choice, when custom code wins, and how the three-year running cost compares.",
    publishedAt: "2026-07-03",
    tags: ["websites", "WordPress", "small business"],
    readingMinutes: 0,
    author: AUTHOR_EN,
    seo: {
      title: "WordPress or a custom-built site — what to choose",
      description:
        "When WordPress makes sense for a small business, when a custom-built site wins, what each costs to run over three years and what to ask your developer.",
    },
    body: [
      {
        type: "heading",
        level: 2,
        text: "WordPress or a site built from scratch?",
      },
      {
        type: "paragraph",
        text: "For most small businesses WordPress is a reasonable choice — provided somebody actually maintains it. A custom-built site wins when loading speed matters, when the logic is unusual, or when you want several quiet years without update cycles. This is not better versus worse; it is two different distributions of cost over time.",
      },
      {
        type: "heading",
        level: 2,
        text: "When WordPress is the right call",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "You will add content yourself and want to do it without calling anyone.",
          "You need ready-made building blocks: store, bookings, forms, multiple languages.",
          "You want an easily replaceable supplier. Almost any developer can pick up a WordPress site.",
          "The starting budget is tight and the site needs to launch soon.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "When custom-built wins",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "When the site has to be genuinely fast on a phone. A statically generated page does not query a database on every visit.",
          "When there is little content that rarely changes — a service page, a campaign landing page, a short portfolio.",
          "When you need unusual logic: a pricing calculator, a configurator, an integration with your own system.",
          "When you do not want to think about plugin updates and the security holes they occasionally open.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "The option nobody mentions",
      },
      {
        type: "paragraph",
        text: "You can have both: a separate editing panel with a statically generated front end. You edit content comfortably, the visitor gets a prebuilt page with no database underneath. It costs more upfront and needs a developer who knows the approach, but it solves speed and self-service editing at the same time.",
      },
      {
        type: "heading",
        level: 2,
        text: "Three-year cost",
      },
      {
        type: "paragraph",
        text: "With WordPress, budget hosting that runs PHP and a database, annual plugin licences, backups and somebody's time spent on updates. With a static site, hosting is often trivial, there are no licences and no update treadmill — but every change beyond content needs a developer. Do this arithmetic once on paper before you decide; the build-cost gap frequently evens out in year two.",
      },
      {
        type: "heading",
        level: 2,
        text: "Questions to ask before deciding",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Which parts can I change myself, and which require a call?",
          "How many paid plugins are in this project and who renews the licences?",
          "Who handles updates and backups, how often, at what cost?",
          "Do I get the code and full access if we part ways?",
          "How will the site behave on a three-year-old phone with poor signal?",
        ],
      },
      {
        type: "callout",
        text: "A bad answer about maintenance is more dangerous than a bad technology choice. An abandoned CMS install is not just slow — sooner or later it gets compromised.",
      },
    ],
  },

  {
    slug: "wizytowka-google-moja-firma-jak-ja-ustawic",
    title: "Google Business Profile — how to set it up so it works",
    excerpt:
      "The five settings that carry most of the result, the fields almost everyone ignores, and how to tell whether the profile brings calls.",
    publishedAt: "2026-08-14",
    tags: ["local SEO", "Google", "small business"],
    readingMinutes: 0,
    author: AUTHOR_EN,
    seo: {
      title: "Google Business Profile — how to set it up",
      description:
        "Primary category, service area, photos, reviews and the questions section — concrete Google Business Profile settings plus how to measure real results.",
    },
    body: [
      {
        type: "heading",
        level: 2,
        text: "What in a Google Business Profile actually makes a difference?",
      },
      {
        type: "paragraph",
        text: "Five things: the right primary category, contact details identical to those on your website, genuine photos added regularly, replies to every review, and a filled-in service list with a service area. Everything else adds percentage points. If one of those five is broken, nothing else is worth doing.",
      },
      {
        type: "paragraph",
        text: "A practical note: the old 'Google My Business' app is gone. You edit the profile directly in Google Search and Maps while signed in as the owner.",
      },
      {
        type: "heading",
        level: 2,
        text: "Primary category — the single heaviest field",
      },
      {
        type: "paragraph",
        text: "The primary category decides which searches Google will even consider you for. 'Car repair shop' and 'car air conditioning service' are two different search sets. Pick the one describing where your money actually comes from and add the rest as secondary categories. Before choosing, search Maps for the query you want to appear for and check what the top three businesses use.",
      },
      {
        type: "heading",
        level: 2,
        text: "Address or service area",
      },
      {
        type: "paragraph",
        text: "If customers never come to your address because you travel to them, set a service area and hide the address. Listing an address where you serve nobody breaks Google's rules and risks suspension. Keep the area realistic — the nearby towns and your county, not the whole region. A huge area does not widen reach, it dilutes relevance.",
      },
      {
        type: "heading",
        level: 2,
        text: "Photos and reviews",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Real phone photos beat stock. A local customer wants to see your workshop, not one in California.",
          "Regularity beats volume — a few photos monthly works better than forty uploaded once.",
          "Show the entrance from the street and where to park. It genuinely helps people arrive.",
          "Ask for reviews in person at handover, and send the review link by text — hunting for your profile loses half of them.",
          "Reply to every review, including the blank five-star ones. Your reply to a negative review is read by the next fifty prospects, not by its author.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "The questions section almost everyone ignores",
      },
      {
        type: "paragraph",
        text: "Your profile has a questions area where anyone can answer — including people who know nothing about your business. You are allowed to post a question yourself from another account and answer it. Use it for the things customers ask on the phone five times a day: do you issue invoices, do I need an appointment, which towns do you travel to.",
      },
      {
        type: "heading",
        level: 2,
        text: "Checking whether it works",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In the profile statistics, watch calls, direction requests and website clicks — not impressions.",
          "Add campaign tags to the website link in your profile so analytics separates that traffic.",
          "Review monthly, not weekly. Weekly swings are noise.",
          "Compare year over year if your trade is seasonal.",
        ],
      },
      {
        type: "callout",
        text: "Name, address and phone number must read identically on the site, in the profile and in directories. Even a different way of formatting the number is a pointless inconsistency.",
      },
    ],
  },

  {
    slug: "dostepnosc-cyfrowa-eaa-strona-firmowa",
    title: "Digital accessibility (EAA) — what a business website needs",
    excerpt:
      "Who the rules in force since June 2025 actually apply to, what they expect from a website, and how to check your own in twenty minutes.",
    publishedAt: "2026-09-18",
    tags: ["compliance", "accessibility", "websites"],
    readingMinutes: 0,
    author: AUTHOR_EN,
    seo: {
      title: "Digital accessibility (EAA) and business websites",
      description:
        "Who the digital accessibility rules applying since June 2025 cover, what a company website should meet, and a short self-check you can run yourself.",
    },
    body: [
      {
        type: "heading",
        level: 2,
        text: "Does my business website have to meet accessibility requirements?",
      },
      {
        type: "paragraph",
        text: "Short answer: if you are a micro-enterprise providing services, most likely not — the Polish act excludes services provided by micro-enterprises. If you sell online and the company is above the micro threshold, the store is covered. The European Accessibility Act is Directive (EU) 2019/882, transposed in Poland by the act of 26 April 2024 on ensuring accessibility requirements for certain products and services, applying from 28 June 2025.",
      },
      {
        type: "callout",
        text: "This is not legal advice. I build websites, I am not a lawyer. If you sell online or operate in a sector named directly — e-commerce, retail banking, passenger transport, e-books, telecoms — confirm your obligations with a lawyer.",
      },
      {
        type: "heading",
        level: 2,
        text: "Who it covers in practice",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "A workshop, clinic or builder with a plain brochure site and a contact form is generally outside the scope, provided it meets the micro-enterprise definition.",
          "An online store belonging to a company larger than micro is covered — e-commerce is one of the listed services.",
          "The micro-enterprise exclusion concerns services. Trading in covered products is a different matter.",
          "The act also provides transition periods and a disproportionate burden defence — but that has to be documented, not merely asserted.",
          "Financial penalties are provided for non-compliance.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Worth doing even without the obligation",
      },
      {
        type: "paragraph",
        text: "Accessibility is not only about disability. The same fixes help the sixty-year-old customer who cannot read pale grey text and the one reading your price list on a phone in bright sunlight. Most of the requirements also overlap with what you do for search engines anyway: a sensible heading structure, image descriptions, clear form labels.",
      },
      {
        type: "heading",
        level: 2,
        text: "What to check on the site",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Text contrast against the background. Fashionable pale grey on white is the most common failure.",
          "Keyboard operation. Tab through the whole page — can you reach everything, and can you see where you are?",
          "A visible focus indicator. Removing the outline around the active element is a frequent 'design fix'. Replace it, do not delete it.",
          "Image alternative text: descriptive where the image carries meaning, empty where it is decoration.",
          "Form labels tied to their fields. Grey placeholder text disappears the moment you start typing.",
          "Heading hierarchy — one main heading, levels in order, not chosen by font size.",
          "Information never conveyed by colour alone. A red border tells a colour-blind user nothing; add text.",
          "Zoom to 200%. Content should reflow, not vanish off the edge.",
          "Captions on videos that carry information customers need.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "What not to do",
      },
      {
        type: "paragraph",
        text: "Do not buy an accessibility overlay widget and assume the subject is closed. A bolted-on script with a contrast slider will not fix a badly built form or missing image descriptions, and it can actively get in the way of people using their own assistive tools. The fixes belong in the site's code.",
      },
      {
        type: "heading",
        level: 2,
        text: "A twenty-minute self-check",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Put the mouse away and complete your contact form using only the keyboard.",
          "Set browser zoom to 200% and see whether the site is still usable.",
          "Run the accessibility audit built into your browser — it will not catch everything, but it catches contrast and missing descriptions.",
          "Ask someone in their sixties to find your phone number on the site while you watch. That single test says more than most reports.",
        ],
      },
    ],
  },
];

export const POSTS: Record<Locale, Post[]> = {
  pl: POSTS_PL,
  en: POSTS_EN,
};

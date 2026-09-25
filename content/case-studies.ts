/**
 * Realizacje PROJSTOG.
 *
 * ⚠ ZASADA NADRZĘDNA: to są strony realnych klientów. Nie wolno tu dopisywać
 * efektów, liczb ani szczegółów projektu, których nie da się pokazać palcem
 * na żywej stronie. Opisy powstały na podstawie tego, co faktycznie znajduje
 * się pod danym adresem — zakres prac i charakter projektu, nie obietnice.
 *
 * ⚠ Żadnych metryk (wzrost ruchu, konwersje, pozycje w Google). Nie mamy do
 * nich dostępu, a publikowanie ich „na oko" byłoby wprowadzaniem w błąd.
 * Jedyny dopuszczalny wyjątek: liczba, którą klient sam podaje publicznie na
 * własnej stronie — i wtedy jako jego deklaracja, nie jako nasz wynik.
 *
 * `citySlug` wypełniamy WYŁĄCZNIE wtedy, gdy adres klienta jest jawny i
 * pokrywa się ze slugiem z `content/cities.ts`. Nigdy nie zgadujemy.
 *
 * `order` — niżej = wyżej na liście. Nowe realizacje dostają niższe numery.
 */

import type { Locale } from "@/lib/routes";
import type { CaseStudy } from "@/lib/cms/types";

export const CASE_STUDIES: Record<Locale, CaseStudy[]> = {
  pl: [
    {
      slug: "finanse-szelagowski",
      name: "Adam Szelągowski — Finanse",
      domain: "finanseszelagowski.pl",
      url: "https://finanseszelagowski.pl",
      industry: "ubezpieczenia i kredyty",
      outcome:
        "Strona niezależnego doradcy z Włodawy, która porządkuje trzy osobne obszary jego pracy — ubezpieczenia, kredyty i pomoc kredytobiorcom — i za każdym razem kończy się umówieniem konsultacji.",
      tech: ["Next.js", "React", "Tailwind CSS"],
      order: 1,
      body: [
        {
          type: "paragraph",
          text: "Adam Szelągowski prowadzi biuro przy Kościuszki we Włodawie i pracuje jako agent multiagencji — porównuje oferty zamiast sprzedawać jedną. Na jego stronie spotykają się dwa bardzo różne tematy: polisa komunikacyjna, którą klient chce mieć z głowy w dziesięć minut, i kredyt hipoteczny, nad którym zastanawia się miesiącami.",
        },
        {
          type: "heading",
          level: 2,
          text: "Co było do zrobienia",
        },
        {
          type: "paragraph",
          text: "Rozdzielić te ścieżki tak, żeby żadna nie przeszkadzała drugiej. Ubezpieczenia, kredyty i doradztwo dostały własne sekcje z pełnym rozpisaniem zakresu — od OC i AC, przez polisy na życie, majątkowe, grupowe, firmowe i rolne, po kredyty hipoteczne, gotówkowe, konsolidacyjne, leasing i finansowanie dla rolników.",
        },
        {
          type: "heading",
          level: 2,
          text: "Co powstało",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Serwis wielostronicowy z osobnymi wejściami w ubezpieczenia, kredyty i pomoc kredytobiorcom",
            "Kalkulator OC i możliwość kupienia polisy online, bez wizyty w biurze",
            "Sekcja opinii klientów i blog — treści, które budują zaufanie przed pierwszym telefonem",
            "Godziny otwarcia biura, adres i numer widoczne na każdej podstronie",
          ],
        },
        {
          type: "paragraph",
          text: "Nacisk położyliśmy na wiarygodność i szybkość. Doradca bez własnej marki produktowej musi ją zbudować na dostępie do rynku — dlatego na stronie od razu widać, z iloma towarzystwami i bankami pracuje (sam podaje: blisko 40 towarzystw i 20 banków) oraz to, że pierwsza konsultacja jest bezpłatna. Całość stoi na Next.js, więc strona ładuje się natychmiast również na telefonie, z którego przychodzi większość zapytań o OC.",
        },
      ],
      seo: {
        title: "Finanse Szelągowski — strona doradcy | PROJSTOG",
        description:
          "Strona dla niezależnego doradcy ubezpieczeniowego i kredytowego z Włodawy. Trzy rozdzielone ścieżki usług, kalkulator OC, zakup polisy online. Next.js.",
      },
    },
    {
      slug: "apartsea",
      name: "Apartsea",
      domain: "apartsea.pl",
      url: "https://apartsea.pl",
      industry: "apartamenty na wynajem",
      outcome:
        "Jedna strona dla pięciu obiektów nad Bałtykiem, która prowadzi gościa od wyboru miejscowości do rezerwacji w systemie, bez pośrednika i bez prowizji portalu.",
      tech: ["Next.js", "React", "Tailwind CSS", "Hotres"],
      order: 2,
      body: [
        {
          type: "paragraph",
          text: "Apartsea zarządza apartamentami w czterech nadmorskich miejscowościach — w Sopocie, Gdyni, Ustce i Juracie. Obiektów jest pięć, każdy o innej wielkości i innym charakterze: od dwóch apartamentów w willi przy wydmach po kilkunastolokalowe budynki kilkaset metrów od plaży.",
        },
        {
          type: "heading",
          level: 2,
          text: "Co było do zrobienia",
        },
        {
          type: "paragraph",
          text: "Pogodzić dwa poziomy: markę, która ma być wspólna i rozpoznawalna, oraz obiekty, które gość wybiera wyłącznie po lokalizacji. Ktoś, kto planuje wakacje w Juracie, nie chce przewijać oferty z Ustki — ale powinien wiedzieć, że stoi za nią ten sam gospodarz i ten sam standard.",
        },
        {
          type: "heading",
          level: 2,
          text: "Co powstało",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Strona-parasol z osobną podstroną każdego obiektu: galeria, metraż, wyposażenie, odległość do plaży",
            "Rezerwacja online podpięta do systemu Hotres — dostępność i ceny bez ręcznej aktualizacji",
            "Przewodniki po okolicy z mapami Google — co jest w zasięgu spaceru od danego apartamentu",
            "Informacje, które realnie decydują o wyborze: przyjmowanie zwierząt, bezpłatny parking, Wi-Fi, samodzielne zameldowanie kodem",
          ],
        },
        {
          type: "paragraph",
          text: "Największy nacisk położyliśmy na drogę do rezerwacji. Każda podstrona obiektu kończy się tym samym krokiem — wyborem terminu w kalendarzu, a nie formularzem kontaktowym i czekaniem na odpowiedź. Zdjęcia dostają dużo miejsca, bo w wynajmie wakacyjnym to one sprzedają; reszta układu ma im nie przeszkadzać.",
        },
      ],
      seo: {
        title: "Apartsea — strona z rezerwacją online | PROJSTOG",
        description:
          "Strona dla pięciu obiektów apartamentowych nad Bałtykiem: Sopot, Gdynia, Ustka, Jurata. Podstrony obiektów, przewodniki po okolicy, rezerwacja w Hotres.",
      },
    },
    {
      slug: "moja-gruzja",
      name: "Moja Gruzja",
      domain: "mojagruzja.pl",
      url: "https://mojagruzja.pl",
      industry: "hurtowa dystrybucja alkoholi",
      outcome:
        "Katalog B2B gruzińskich win i alkoholi, który zastępuje wysyłanie PDF-ów z ofertą i pozwala restauracji albo sklepowi samodzielnie przejrzeć cały asortyment.",
      tech: ["Next.js", "React", "Tailwind CSS"],
      order: 3,
      body: [
        {
          type: "paragraph",
          text: "Moja Gruzja to gdański importer i dystrybutor gruzińskich win oraz alkoholi mocnych — brandy, czaczy, whisky Jimsher — sprzedający wyłącznie w kanale hurtowym: do HoReCa, sieci i sklepów specjalistycznych. W portfolio jest kilkadziesiąt pozycji rozpisanych na siedem marek, m.in. Dugladze, Kazbegi, Kayaki i Khitiri.",
        },
        {
          type: "heading",
          level: 2,
          text: "Co było do zrobienia",
        },
        {
          type: "paragraph",
          text: "Gruzińskie wino sprzedaje się przez opowieść o regionie i metodzie, ale kupuje się je po konkretnym indeksie. Strona musiała obsłużyć oba te tryby naraz: sommelier szuka kwewri z Kachetii, a kierownik zakupów szuka pozycji, którą widział w cenniku.",
        },
        {
          type: "heading",
          level: 2,
          text: "Co powstało",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Katalog produktów z filtrowaniem po kategorii i po marce",
            "Sekcje regionów — Kachetia, Kartlia, Imeretia, Racza-Leczchumi — z opisem stylu win",
            "Profile producentów wraz z materiałami wideo",
            "Zestawienie nagród z konkursów międzynarodowych jako argument sprzedażowy",
            "Formularz zapytania handlowego i jasna informacja, że oferta dotyczy wyłącznie klientów biznesowych",
          ],
        },
        {
          type: "paragraph",
          text: "Katalog zbudowaliśmy na Next.js jako treść statyczną, więc mimo dużej liczby kart produktowych strona zachowuje się jak lekka wizytówka — a każda pozycja ma własny adres, który da się wkleić w mailu do klienta. Nacisk poszedł w edukację: przy takim asortymencie połowa pracy handlowca polega na wyjaśnieniu, czym kwewri różni się od stali, i to wyjaśnienie może odbyć się jeszcze przed spotkaniem.",
        },
      ],
      seo: {
        title: "Moja Gruzja — katalog B2B win | PROJSTOG",
        description:
          "Strona dla gdańskiego importera gruzińskich win i alkoholi. Katalog z filtrowaniem po marce i kategorii, profile producentów, sekcje regionów, zapytania B2B.",
      },
    },
    {
      slug: "landrew",
      name: "LANDREW",
      domain: "landrew.pl",
      url: "https://landrew.pl",
      industry: "konstrukcje drewniane",
      outcome:
        "Strona wykonawcy konstrukcji drewnianych z Głogowa Małopolskiego, na której zdjęcia realizacji robią robotę przed pierwszą rozmową, a wycena zaczyna się od jednego formularza.",
      tech: ["Next.js", "React"],
      order: 4,
      citySlug: "glogow-malopolski",
      body: [
        {
          type: "paragraph",
          text: "LANDREW to firma z Huciska pod Głogowem Małopolskim, zajmująca się budownictwem szkieletowym i konstrukcjami z drewna: zadaszeniami tarasów i pergolami, tarasami drewnianymi i kompozytowymi, wiatami samochodowymi, altanami oraz domami szkieletowymi — całorocznymi i letniskowymi.",
        },
        {
          type: "heading",
          level: 2,
          text: "Co było do zrobienia",
        },
        {
          type: "paragraph",
          text: "W tej branży klient najpierw ogląda, a dopiero potem czyta. Jednocześnie musi szybko rozstrzygnąć dwie rzeczy: czy firma robi dokładnie to, czego on potrzebuje, i czy w ogóle dojedzie pod jego adres. Obie odpowiedzi trzeba było podać bez przewijania połowy strony.",
        },
        {
          type: "heading",
          level: 2,
          text: "Co powstało",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Oferta rozbita na pięć osobnych typów konstrukcji — każdy z własną podstroną, a nie jedną wspólną listą",
            "Galeria realizacji ze zdjęciami w formacie WebP, żeby duże fotografie nie spowalniały wejścia z telefonu",
            "Interaktywna mapa obszaru działania z promieniem do 80 km od siedziby",
            "Formularz wyceny i numer telefonu dostępne z każdego miejsca w serwisie",
            "Blog — zaplecze treściowe pod zapytania w rodzaju „taras kompozytowy czy drewniany”",
          ],
        },
        {
          type: "paragraph",
          text: "Mapa zasięgu okazała się ważniejsza, niż się wydaje: firma spod Rzeszowa obsługuje też Tarnobrzeg, Stalową Wolę i Sandomierz, a bez takiej informacji klient z drugiego końca województwa po prostu nie zadzwoni. Strona stoi na Next.js i jest przygotowana pod frazy lokalne z nazwą miejscowości, bo tak właśnie szuka się wykonawcy zadaszenia.",
        },
      ],
      seo: {
        title: "LANDREW — strona wykonawcy z Głogowa Młp. | PROJSTOG",
        description:
          "Strona firmy budującej zadaszenia, tarasy i domy szkieletowe pod Głogowem Małopolskim. Galeria realizacji, mapa zasięgu do 80 km, formularz wyceny, Next.js.",
      },
    },
    {
      slug: "luksusowy-ogrod",
      name: "FreshGarden",
      domain: "luksusowyogrod.pl",
      url: "https://luksusowyogrod.pl",
      industry: "ogrody i architektura krajobrazu",
      outcome:
        "Strona firmy ogrodniczej z Bochni, która zbiera dziesięć bardzo różnych usług w jedną czytelną ofertę i pokazuje gotowe ogrody zamiast je opisywać.",
      tech: ["WordPress", "PHP"],
      order: 5,
      citySlug: "bochnia",
      body: [
        {
          type: "paragraph",
          text: "FreshGarden z Bochni zajmuje się ogrodami kompleksowo — od projektu, przez założenie i nasadzenia, po późniejszą pielęgnację. Do tego dochodzą prace, które z ogrodnictwem kojarzą się mniej oczywiście: bruk, tarasy, ogrodzenia i instalacje wodne.",
        },
        {
          type: "heading",
          level: 2,
          text: "Co było do zrobienia",
        },
        {
          type: "paragraph",
          text: "Dziesięć kategorii usług to dla małej firmy realny problem komunikacyjny. Zbyt długa lista wygląda jak „robimy wszystko” i osłabia zaufanie, a skrócenie jej odcina zapytania o konkretną robotę. Rozwiązaniem było pogrupowanie usług tak, żeby klient szukający samego trawnika i klient planujący cały ogród od zera trafiali w to samo miejsce różnymi drogami.",
        },
        {
          type: "heading",
          level: 2,
          text: "Co powstało",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Osobna strona każdej usługi — projektowanie, zakładanie ogrodów i trawników, pielęgnacja, nawadnianie, brukarstwo, tarasy, ogrodzenia",
            "Galerie realizacji jako główny argument sprzedażowy",
            "Sekcja o firmie z danymi rejestrowymi i kontaktem lokalnym",
            "Powiązanie z profilami na Facebooku i TikToku, gdzie firma pokazuje bieżące prace",
          ],
        },
        {
          type: "paragraph",
          text: "Serwis działa na WordPressie, więc właściciel sam dorzuca zdjęcia po zakończonym zleceniu — w branży sezonowej to warunek, żeby portfolio nie zestarzało się po jednym lecie. Struktura adresów i opisy są ułożone pod wyszukiwania łączące usługę z miastem, bo ogrodnika szuka się w promieniu kilkunastu kilometrów.",
        },
      ],
      seo: {
        title: "FreshGarden Bochnia — strona firmy ogrodniczej | PROJSTOG",
        description:
          "Strona dla firmy ogrodniczej z Bochni: projektowanie i zakładanie ogrodów, trawniki, nawadnianie, bruk, tarasy. Galerie realizacji, edycja w WordPressie.",
      },
    },
    {
      slug: "kasza-ubezpieczenia",
      name: "Kasza Ubezpieczenia",
      domain: "kaszaubezpieczenia.pl",
      url: "https://kaszaubezpieczenia.pl",
      industry: "ubezpieczenia",
      outcome:
        "Strona mieleckiego biura ubezpieczeniowego, która obsługuje klienta w dwóch trybach naraz: szybki zakup polisy online i spokojna rozmowa w biurze przy Wolności.",
      tech: ["WordPress", "PHP"],
      order: 6,
      citySlug: "mielec",
      body: [
        {
          type: "paragraph",
          text: "Kasza Ubezpieczenia prowadzi biuro przy ulicy Wolności w Mielcu i pośredniczy w ubezpieczeniach oraz leasingu. Zakres jest szeroki: komunikacja, życie i zdrowie, majątek, firma, rolnictwo, polisy szkolne i turystyczne.",
        },
        {
          type: "heading",
          level: 2,
          text: "Co było do zrobienia",
        },
        {
          type: "paragraph",
          text: "W ubezpieczeniach każdy produkt ma inny rytm sprzedaży. Polisę szkolną kupuje się we wrześniu w trzy minuty, ubezpieczenie gospodarstwa omawia się przy biurku. Strona musiała obsłużyć oba te przypadki, nie spychając żadnego do zakładki „kontakt”.",
        },
        {
          type: "heading",
          level: 2,
          text: "Co powstało",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Podstrona dla każdego rodzaju ubezpieczenia zamiast jednej zbiorczej listy",
            "Formularz wyceny OC dla tych, którzy chcą mieć sprawę z głowy tego samego dnia",
            "Zakup ubezpieczenia szkolnego online, z płatnością",
            "Sekcja o zespole z imionami i twarzami agentów oraz zdjęcia biura",
            "Adres, godziny otwarcia i mapa dojazdu w widocznym miejscu",
          ],
        },
        {
          type: "paragraph",
          text: "Nacisk położyliśmy na lokalność i zaufanie. To biuro, do którego klienci przychodzą osobiście, więc pokazanie konkretnych ludzi i realnego wnętrza działa mocniej niż zdjęcia stockowe. Strona stoi na WordPressie, co pozwala samodzielnie dopisywać produkty i aktualizować ofertę sezonową bez kontaktu z wykonawcą.",
        },
      ],
      seo: {
        title: "Kasza Ubezpieczenia Mielec — strona biura | PROJSTOG",
        description:
          "Strona dla biura ubezpieczeniowego z Mielca: podstrony produktów, formularz wyceny OC, zakup polisy szkolnej online, prezentacja zespołu i biura. WordPress.",
      },
    },
  ],

  en: [
    {
      slug: "finanse-szelagowski",
      name: "Adam Szelągowski — Financial Advisory",
      domain: "finanseszelagowski.pl",
      url: "https://finanseszelagowski.pl",
      industry: "insurance and lending",
      outcome:
        "A site for an independent adviser in Włodawa that keeps his three lines of work — insurance, loans and borrower support — apart, and routes every one of them to a booked consultation.",
      tech: ["Next.js", "React", "Tailwind CSS"],
      order: 1,
      body: [
        {
          type: "paragraph",
          text: "Adam Szelągowski runs an office in Włodawa and works as a multi-agency broker: he compares offers rather than pushing a single provider. Two very different decisions meet on his site — a motor policy someone wants dealt with in ten minutes, and a mortgage they have been weighing for months.",
        },
        {
          type: "heading",
          level: 2,
          text: "The problem",
        },
        {
          type: "paragraph",
          text: "Those two journeys had to be separated so neither got in the other's way. Insurance, lending and borrower support each received their own section with the full scope spelled out — motor, life, property, group, business and agricultural cover on one side; mortgages, cash and consolidation loans, leasing and farm finance on the other.",
        },
        {
          type: "heading",
          level: 2,
          text: "What we built",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "A multi-page site with separate entry points for insurance, lending and borrower support",
            "A motor insurance quote calculator and online policy purchase, with no office visit needed",
            "Client reviews and a blog — the groundwork that earns trust before the first phone call",
            "Office hours, address and phone number visible on every page",
          ],
        },
        {
          type: "paragraph",
          text: "The emphasis fell on credibility and speed. An adviser with no product brand of his own builds one on market access, so the site states up front how many providers he works with — his own figure is close to 40 insurers and 20 banks — and that the first consultation costs nothing. It runs on Next.js, which keeps it instant on the phones most motor enquiries come from.",
        },
      ],
      seo: {
        title: "Financial adviser website, Włodawa | PROJSTOG",
        description:
          "A website for an independent insurance and mortgage adviser in Włodawa: three separated service paths, a motor quote calculator and online policy purchase.",
      },
    },
    {
      slug: "apartsea",
      name: "Apartsea",
      domain: "apartsea.pl",
      url: "https://apartsea.pl",
      industry: "holiday apartment rentals",
      outcome:
        "One site covering five Baltic coast properties that carries a guest from picking a town to a confirmed booking, with no marketplace commission in between.",
      tech: ["Next.js", "React", "Tailwind CSS", "Hotres booking engine"],
      order: 2,
      body: [
        {
          type: "paragraph",
          text: "Apartsea manages apartments in four seaside towns on the Polish Baltic coast — Sopot, Gdynia, Ustka and Jurata. There are five properties in total, each a different size and character, from a two-apartment villa in the dunes to buildings with more than a dozen units a few hundred metres from the beach.",
        },
        {
          type: "heading",
          level: 2,
          text: "The problem",
        },
        {
          type: "paragraph",
          text: "Two levels had to coexist: a brand meant to be shared and recognisable, and properties guests choose purely by location. Someone planning a week in Jurata will not scroll through listings in Ustka — but they should still see that the same host and the same standard sit behind both.",
        },
        {
          type: "heading",
          level: 2,
          text: "What we built",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "An umbrella site with a dedicated page per property: gallery, floor area, amenities, distance to the beach",
            "Online booking wired into the Hotres system, so availability and rates need no manual updating",
            "Neighbourhood guides with Google Maps — what is within walking distance of each apartment",
            "The details that actually decide a booking: pets welcome, free parking, Wi-Fi, self check-in with a personal code",
          ],
        },
        {
          type: "paragraph",
          text: "Most of the work went into the path to a reservation. Every property page ends in the same step — choosing dates in a calendar, not filling in a contact form and waiting for a reply. Photography gets generous space, because in holiday rentals that is what sells; the rest of the layout is built to stay out of its way.",
        },
      ],
      seo: {
        title: "Apartsea — booking site for five properties | PROJSTOG",
        description:
          "A website for five apartment properties on the Polish Baltic coast: Sopot, Gdynia, Ustka and Jurata. Per-property pages, area guides and Hotres booking.",
      },
    },
    {
      slug: "moja-gruzja",
      name: "Moja Gruzja",
      domain: "mojagruzja.pl",
      url: "https://mojagruzja.pl",
      industry: "beverage wholesale",
      outcome:
        "A B2B catalogue of Georgian wines and spirits that replaces emailing PDF price lists and lets a restaurant or shop browse the full range on its own.",
      tech: ["Next.js", "React", "Tailwind CSS"],
      order: 3,
      body: [
        {
          type: "paragraph",
          text: "Moja Gruzja is a Gdańsk-based importer and distributor of Georgian wines and spirits — brandy, chacha, Jimsher whisky — selling wholesale only, to HoReCa, retail chains and specialist shops. The portfolio spans dozens of products across seven brands, among them Dugladze, Kazbegi, Kayaki and Khitiri.",
        },
        {
          type: "heading",
          level: 2,
          text: "The problem",
        },
        {
          type: "paragraph",
          text: "Georgian wine sells on the story of its region and method, but it is ordered by a specific product code. The site had to serve both modes at once: a sommelier looking for qvevri-fermented Kakheti, and a buyer looking for the line they saw on a price list.",
        },
        {
          type: "heading",
          level: 2,
          text: "What we built",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "A product catalogue filterable by category and by brand",
            "Region sections — Kakheti, Kartli, Imereti, Racha-Lechkhumi — describing the style of each",
            "Producer profiles with video material",
            "A record of international competition awards, used as a sales argument",
            "A trade enquiry form and a clear statement that the offer is for business customers only",
          ],
        },
        {
          type: "paragraph",
          text: "The catalogue is built as static content on Next.js, so despite the number of product cards the site behaves like a lightweight brochure — and every item has its own URL that can be pasted straight into an email. The emphasis is educational: with a range like this, half a sales rep's job is explaining how qvevri differs from steel, and that explanation can now happen before the meeting.",
        },
      ],
      seo: {
        title: "Moja Gruzja — B2B wine catalogue | PROJSTOG",
        description:
          "A website for a Gdańsk importer of Georgian wines and spirits: a catalogue filtered by brand and type, producer profiles, region guides and trade enquiries.",
      },
    },
    {
      slug: "landrew",
      name: "LANDREW",
      domain: "landrew.pl",
      url: "https://landrew.pl",
      industry: "timber structures",
      outcome:
        "A site for a timber construction firm near Głogów Małopolski where finished projects do the convincing before the first call, and a quote starts with a single form.",
      tech: ["Next.js", "React"],
      order: 4,
      citySlug: "glogow-malopolski",
      body: [
        {
          type: "paragraph",
          text: "LANDREW works out of Hucisko near Głogów Małopolski, building timber-frame and timber structures: terrace roofs and pergolas, wooden and composite decking, carports, garden pavilions and frame houses for year-round or seasonal use.",
        },
        {
          type: "heading",
          level: 2,
          text: "The problem",
        },
        {
          type: "paragraph",
          text: "In this trade people look before they read. At the same time they need two quick answers: does this firm build exactly the thing I need, and will they travel to my address. Both had to be visible without scrolling half the page.",
        },
        {
          type: "heading",
          level: 2,
          text: "What we built",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Five structure types split into separate pages rather than one combined list",
            "A project gallery served in WebP, so large photographs do not slow down a mobile visit",
            "An interactive service-area map covering a radius of up to 80 km from the workshop",
            "A quote form and phone number reachable from anywhere on the site",
            "A blog — groundwork for searches like \"composite or wooden decking\"",
          ],
        },
        {
          type: "paragraph",
          text: "The coverage map matters more than it sounds: a firm based outside Rzeszów also serves Tarnobrzeg, Stalowa Wola and Sandomierz, and without that stated plainly a client from the far side of the region simply never calls. The site runs on Next.js and is structured around local search phrases that include a town name, which is how contractors get found.",
        },
      ],
      seo: {
        title: "LANDREW — timber contractor website | PROJSTOG",
        description:
          "A site for a timber construction firm near Głogów Małopolski: terrace roofs, decking and frame houses, a project gallery, an 80 km service map and quote form.",
      },
    },
    {
      slug: "luksusowy-ogrod",
      name: "FreshGarden",
      domain: "luksusowyogrod.pl",
      url: "https://luksusowyogrod.pl",
      industry: "gardens and landscaping",
      outcome:
        "A site for a Bochnia landscaping firm that pulls ten very different services into one readable offer and shows finished gardens instead of describing them.",
      tech: ["WordPress", "PHP"],
      order: 5,
      citySlug: "bochnia",
      body: [
        {
          type: "paragraph",
          text: "FreshGarden of Bochnia handles gardens end to end — design, construction and planting, then ongoing maintenance. Alongside that sit trades less obviously associated with gardening: paving, decking, fencing and irrigation.",
        },
        {
          type: "heading",
          level: 2,
          text: "The problem",
        },
        {
          type: "paragraph",
          text: "For a small firm, ten service categories is a genuine communication problem. Too long a list reads as \"we do everything\" and costs trust; cutting it back loses enquiries for specific jobs. The answer was to group the services so that a client who only wants a lawn and a client planning a garden from scratch arrive at the same place by different routes.",
        },
        {
          type: "heading",
          level: 2,
          text: "What we built",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "A page per service — design, garden and lawn installation, maintenance, irrigation, paving, decking, fencing",
            "Project galleries as the primary sales argument",
            "An about section with company registration details and local contact information",
            "Links to the Facebook and TikTok profiles where the firm posts work in progress",
          ],
        },
        {
          type: "paragraph",
          text: "The site runs on WordPress so the owner can add photographs himself the moment a job wraps up — in a seasonal trade that is the only way a portfolio survives past one summer. URL structure and copy are arranged around searches that pair a service with a town, because landscapers get hired within a radius of a few kilometres.",
        },
      ],
      seo: {
        title: "FreshGarden Bochnia — landscaping website | PROJSTOG",
        description:
          "A site for a landscaping firm in Bochnia: garden design and construction, lawns, irrigation, paving and decking, project galleries and WordPress editing.",
      },
    },
    {
      slug: "kasza-ubezpieczenia",
      name: "Kasza Ubezpieczenia",
      domain: "kaszaubezpieczenia.pl",
      url: "https://kaszaubezpieczenia.pl",
      industry: "insurance",
      outcome:
        "A site for an insurance office in Mielec that serves two modes at once: buying a policy online in minutes, or sitting down with an agent on Wolności street.",
      tech: ["WordPress", "PHP"],
      order: 6,
      citySlug: "mielec",
      body: [
        {
          type: "paragraph",
          text: "Kasza Ubezpieczenia runs an office on Wolności street in Mielec, broking insurance and leasing. The range is wide: motor, life and health, property, business, agriculture, plus school and travel policies.",
        },
        {
          type: "heading",
          level: 2,
          text: "The problem",
        },
        {
          type: "paragraph",
          text: "In insurance every product has its own sales rhythm. A school policy is bought in September in three minutes; farm cover is discussed across a desk. The site had to handle both without pushing either into a \"contact us\" tab.",
        },
        {
          type: "heading",
          level: 2,
          text: "What we built",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "A page per insurance type instead of one combined list",
            "A motor quote form for people who want the matter settled the same day",
            "Online purchase of school insurance, payment included",
            "A team section with the agents' names and faces, plus photographs of the office",
            "Address, opening hours and a route map kept in plain sight",
          ],
        },
        {
          type: "paragraph",
          text: "The emphasis went on being local and being trusted. This is an office clients walk into, so showing the actual people and the actual room works harder than stock photography. It runs on WordPress, which lets the team add products and refresh seasonal offers without coming back to us.",
        },
      ],
      seo: {
        title: "Kasza Ubezpieczenia — insurance office site | PROJSTOG",
        description:
          "A website for an insurance office in Mielec: a page per product, a motor quote form, online school policy purchase and a team section built on WordPress.",
      },
    },
  ],
};

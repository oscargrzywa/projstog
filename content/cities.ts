/**
 * Miasta objęte pozycjonowaniem lokalnym.
 *
 * Dodanie nowego miasta = dopisanie jednego wpisu do CITIES.
 * Route `/strony-internetowe/[miasto]` generuje się z tej listy automatycznie
 * (generateStaticParams), więc lista jest jedynym miejscem do edycji.
 *
 * ⚠ UWAGA SEO — ryzyko "doorway pages":
 * Google karze zestawy podstron różniące się wyłącznie nazwą miasta.
 * Dlatego każdy wpis MUSI mieć własne, niepowtarzalne `intro` i `localContext`.
 * Nigdy nie generować tych pól automatycznie z szablonu przez podmianę nazwy.
 *
 * ⚠ Pola `distanceKm` i `population` są PRZYBLIŻONE i wymagają weryfikacji
 * przed publikacją. Nie opierać na nich twardych deklaracji w treści.
 */

export type City = {
  /** slug w URL: /strony-internetowe/<slug> */
  slug: string;
  /** mianownik — "Mielec" */
  name: string;
  /** miejscownik z przyimkiem — "w Mielcu" (do fraz "strony internetowe w Mielcu") */
  inCity: string;
  /** dopełniacz — "Mielca" (do fraz "firma z Mielca") */
  ofCity: string;
  voivodeship: "podkarpackie" | "małopolskie" | "świętokrzyskie";
  county: string;
  /** przybliżona odległość drogowa od Mielca w km — DO WERYFIKACJI */
  distanceKm: number;
  /** przybliżona liczba mieszkańców — DO WERYFIKACJI */
  population: number;
  /** siedziba firmy */
  isBase?: boolean;
  /** priorytet w sitemapie i w nawigacji — "core" trafia do menu */
  tier: "core" | "extended";
  /** UNIKALNE 2–3 zdania o obecności w tym mieście */
  intro: string;
  /** UNIKALNY akapit o lokalnej gospodarce i typach klientów */
  localContext: string;
  /** slugi sąsiednich miast — linkowanie wewnętrzne między podstronami */
  nearby: string[];
};

export const CITIES: City[] = [
  {
    slug: "mielec",
    name: "Mielec",
    inCity: "w Mielcu",
    ofCity: "Mielca",
    voivodeship: "podkarpackie",
    county: "mielecki",
    distanceKm: 0,
    population: 60000,
    isBase: true,
    tier: "core",
    intro:
      "Mielec to moje miasto — tutaj mieszkam i stąd prowadzę PROJSTOG. Do większości klientów w mieście dojadę w kwadrans, więc spotkanie na żywo jest tu normą, a nie wyjątkiem.",
    localContext:
      "Mielec żyje przemysłem lotniczym i Specjalną Strefą Ekonomiczną, ale codzienny rynek usług tworzą tu firmy rodzinne: warsztaty, gabinety, budowlanka, handel. To one najczęściej mają albo bardzo starą stronę, albo żadnej — a szukają ich w Google sąsiedzi z tej samej ulicy.",
    nearby: ["kolbuszowa", "nowa-deba", "tarnobrzeg", "debica"],
  },
  {
    slug: "rzeszow",
    name: "Rzeszów",
    inCity: "w Rzeszowie",
    ofCity: "Rzeszowa",
    voivodeship: "podkarpackie",
    county: "Rzeszów (miasto na prawach powiatu)",
    distanceKm: 55,
    population: 196000,
    tier: "core",
    intro:
      "Rzeszów to największy rynek w regionie i jednocześnie najbardziej wymagający — konkurencja w Google jest tu realna. Dojeżdżam na spotkania, a projekt prowadzę tak samo jak w Mielcu: jeden kontakt, bez pośredników.",
    localContext:
      "Stolica Podkarpacia skupia firmy IT, uczelnie, usługi dla biznesu i gęstą sieć gastronomii oraz medycyny prywatnej. Klient z Rzeszowa zwykle ma już jakąś stronę — problem polega na tym, że nie sprzedaje i nie wychodzi ponad trzecią stronę wyników.",
    nearby: ["boguchwala", "glogow-malopolski", "tyczyn", "lancut"],
  },
  {
    slug: "tarnow",
    name: "Tarnów",
    inCity: "w Tarnowie",
    ofCity: "Tarnowa",
    voivodeship: "małopolskie",
    county: "Tarnów (miasto na prawach powiatu)",
    distanceKm: 55,
    population: 105000,
    tier: "core",
    intro:
      "Tarnów jest drugim po Rzeszowie dużym rynkiem w zasięgu godziny jazdy z Mielca. Obsługuję tu firmy, które chcą wyjść poza lokalne ogłoszenia i zbudować własny kanał pozyskiwania klientów.",
    localContext:
      "Tarnów to chemia, przetwórstwo i mocny sektor handlowo-usługowy, a do tego ruch turystyczny na starówce. Widać tu wyraźny podział: firmy z wieloletnią marką offline, które w internecie są niewidoczne, i młode usługi, które walczą o pierwsze zlecenia.",
    nearby: ["dabrowa-tarnowska", "brzesko", "bochnia", "debica"],
  },
  {
    slug: "debica",
    name: "Dębica",
    inCity: "w Dębicy",
    ofCity: "Dębicy",
    voivodeship: "podkarpackie",
    county: "dębicki",
    distanceKm: 35,
    population: 44000,
    tier: "core",
    intro:
      "Dębica leży pół godziny od Mielca, dokładnie w połowie drogi między Rzeszowem a Tarnowem. To jeden z tych rynków, gdzie dobrze zrobiona strona lokalna daje efekt wyjątkowo szybko.",
    localContext:
      "Miasto kojarzone z przemysłem gumowym i motoryzacją, ale zaplecze stanowią tu warsztaty, transport, usługi budowlane i handel. Klienci szukają w Google bardzo konkretnie — po nazwie usługi i po mieście, rzadko po nazwie firmy.",
    nearby: ["ropczyce", "mielec", "sedziszow-malopolski", "tarnow"],
  },
  {
    slug: "tarnobrzeg",
    name: "Tarnobrzeg",
    inCity: "w Tarnobrzegu",
    ofCity: "Tarnobrzega",
    voivodeship: "podkarpackie",
    county: "Tarnobrzeg (miasto na prawach powiatu)",
    distanceKm: 35,
    population: 46000,
    tier: "core",
    intro:
      "Tarnobrzeg to najbliższy Mielcowi większy ośrodek po drugiej stronie Wisłoki. Dojazd zajmuje mi około pół godziny, więc obsługuję go praktycznie na tych samych zasadach co własne miasto.",
    localContext:
      "Po zamknięciu kopalni siarki miasto przestawiło się na usługi, handel i turystykę wokół Jeziora Tarnobrzeskiego. To rynek, na którym sezonowość realnie wpływa na sprzedaż — strona musi być gotowa na szczyt sezonu, a nie dopiero w jego trakcie.",
    nearby: ["nowa-deba", "sandomierz", "nisko", "mielec"],
  },
  {
    slug: "stalowa-wola",
    name: "Stalowa Wola",
    inCity: "w Stalowej Woli",
    ofCity: "Stalowej Woli",
    voivodeship: "podkarpackie",
    county: "stalowowolski",
    distanceKm: 55,
    population: 57000,
    tier: "core",
    intro:
      "Stalowa Wola to miasto zbudowane wokół przemysłu ciężkiego, z rynkiem B2B silniejszym niż w sąsiednich miejscowościach. Robię tu zarówno strony usługowe, jak i bardziej techniczne prezentacje firm produkcyjnych.",
    localContext:
      "Duży zakład przemysłowy w centrum oznacza gęstą sieć poddostawców, usług technicznych i firm okołobudowlanych. Taki klient nie potrzebuje efekciarskiej strony — potrzebuje czytelnej oferty, referencji i szybkiego kontaktu.",
    nearby: ["nisko", "tarnobrzeg", "nowa-deba", "sandomierz"],
  },
  {
    slug: "sandomierz",
    name: "Sandomierz",
    inCity: "w Sandomierzu",
    ofCity: "Sandomierza",
    voivodeship: "świętokrzyskie",
    county: "sandomierski",
    distanceKm: 55,
    population: 23000,
    tier: "core",
    intro:
      "Sandomierz to rynek mocno turystyczny — i to zmienia priorytety strony. Tutaj liczy się prezentacja, zdjęcia i rezerwacja, a nie rozbudowany katalog usług.",
    localContext:
      "Starówka, winnice i ruch turystyczny napędzają noclegi, gastronomię i usługi przewodnickie. Sezon jest krótki i intensywny, więc strona musi ładować się błyskawicznie na telefonie i prowadzić prosto do rezerwacji lub telefonu.",
    nearby: ["tarnobrzeg", "polaniec", "staszow", "nowa-deba"],
  },
  {
    slug: "lancut",
    name: "Łańcut",
    inCity: "w Łańcucie",
    ofCity: "Łańcuta",
    voivodeship: "podkarpackie",
    county: "łańcucki",
    distanceKm: 75,
    population: 17000,
    tier: "core",
    intro:
      "Łańcut to mniejszy rynek, ale z rozpoznawalną marką turystyczną i sporą liczbą firm rodzinnych. Konkurencja w Google jest tu znacznie mniejsza niż w Rzeszowie, co bardzo skraca drogę do pierwszej strony.",
    localContext:
      "Zamek i ruch zwiedzających napędzają gastronomię oraz noclegi, a obok działa klasyczny mix usług lokalnych i rzemiosła. Wiele z tych firm opiera całą obecność w sieci na jednym profilu społecznościowym — własna strona od razu je wyróżnia.",
    nearby: ["rzeszow", "tyczyn", "sokolow-malopolski", "glogow-malopolski"],
  },
  {
    slug: "bochnia",
    name: "Bochnia",
    inCity: "w Bochni",
    ofCity: "Bochni",
    voivodeship: "małopolskie",
    county: "bocheński",
    distanceKm: 100,
    population: 29000,
    tier: "extended",
    intro:
      "Bochnia to najdalej wysunięty na zachód punkt, który obsługuję regularnie. Projekt prowadzę zdalnie, a na spotkanie kluczowe — brief albo odbiór — dojeżdżam.",
    localContext:
      "Zabytkowa kopalnia soli i bliskość Krakowa tworzą tu mieszankę turystyki i firm obsługujących aglomerację. Klient z Bochni często konkuruje nie tylko lokalnie, ale też o ruch z Krakowa, więc strona musi być zauważalnie lepsza niż średnia w okolicy.",
    nearby: ["brzesko", "tarnow", "dabrowa-tarnowska"],
  },
  {
    slug: "brzesko",
    name: "Brzesko",
    inCity: "w Brzesku",
    ofCity: "Brzeska",
    voivodeship: "małopolskie",
    county: "brzeski",
    distanceKm: 85,
    population: 16000,
    tier: "extended",
    intro:
      "Brzesko obsługuję przy okazji rynku tarnowskiego — leży dokładnie po drodze. To rynek na tyle mały, że dobrze prowadzona wizytówka Google i solidna strona potrafią zdominować lokalne wyniki.",
    localContext:
      "Miasto z tradycjami browarniczymi i zapleczem produkcyjno-handlowym, z dużą liczbą mikrofirm usługowych. Przy takiej skali rynku decyduje nie budżet reklamowy, tylko to, czy firma w ogóle da się znaleźć i czy wzbudza zaufanie.",
    nearby: ["bochnia", "tarnow", "dabrowa-tarnowska"],
  },
  {
    slug: "dabrowa-tarnowska",
    name: "Dąbrowa Tarnowska",
    inCity: "w Dąbrowie Tarnowskiej",
    ofCity: "Dąbrowy Tarnowskiej",
    voivodeship: "małopolskie",
    county: "dąbrowski",
    distanceKm: 35,
    population: 11000,
    tier: "extended",
    intro:
      "Dąbrowa Tarnowska leży pół godziny od Mielca, po drodze do Tarnowa. Mały rynek oznacza tu bardzo szybkie efekty w wynikach lokalnych.",
    localContext:
      "Ośrodek rolniczo-usługowy dla całego powiatu, z handlem, budowlanką i usługami dla gospodarstw. Klienci szukają najczęściej z telefonu i dzwonią od razu — dlatego numer musi być widoczny bez przewijania.",
    nearby: ["mielec", "tarnow", "brzesko", "polaniec"],
  },
  {
    slug: "ropczyce",
    name: "Ropczyce",
    inCity: "w Ropczycach",
    ofCity: "Ropczyc",
    voivodeship: "podkarpackie",
    county: "ropczycko-sędziszowski",
    distanceKm: 40,
    population: 15000,
    tier: "extended",
    intro:
      "Ropczyce leżą przy trasie Rzeszów–Tarnów, czterdzieści minut od Mielca. To rynek, na którym wciąż łatwo zająć czołowe pozycje na frazy usługowe z nazwą miasta.",
    localContext:
      "Lokalna gospodarka opiera się na produkcji materiałów ogniotrwałych oraz na drobnych usługach i handlu. Wiele firm działa tu od pokoleń wyłącznie na poleceniach — strona jest dla nich sposobem na dotarcie do nowego pokolenia klientów.",
    nearby: ["sedziszow-malopolski", "debica", "kolbuszowa"],
  },
  {
    slug: "sedziszow-malopolski",
    name: "Sędziszów Małopolski",
    inCity: "w Sędziszowie Małopolskim",
    ofCity: "Sędziszowa Małopolskiego",
    voivodeship: "podkarpackie",
    county: "ropczycko-sędziszowski",
    distanceKm: 45,
    population: 12000,
    tier: "extended",
    intro:
      "Sędziszów Małopolski obsługuję razem z Ropczycami — to ten sam powiat i ta sama trasa. Rynek jest niewielki, więc jedna dobrze zoptymalizowana strona robi tu ogromną różnicę.",
    localContext:
      "Miasto z zapleczem produkcyjnym i logistycznym przy trasie na Rzeszów, do tego typowy mix usług dla mieszkańców. Konkurencja w Google jest minimalna — liczy się głównie to, by w ogóle mieć poprawnie opisaną ofertę i wizytówkę.",
    nearby: ["ropczyce", "debica", "glogow-malopolski"],
  },
  {
    slug: "nisko",
    name: "Nisko",
    inCity: "w Nisku",
    ofCity: "Niska",
    voivodeship: "podkarpackie",
    county: "niżański",
    distanceKm: 65,
    population: 15000,
    tier: "extended",
    intro:
      "Nisko obsługuję przy okazji Stalowej Woli — miasta leżą obok siebie. To spokojny rynek, gdzie solidna strona wystarcza, by wyprzedzić większość lokalnej konkurencji.",
    localContext:
      "Ośrodek powiatowy z usługami dla mieszkańców, handlem i firmami powiązanymi z przemysłem Stalowej Woli. Duża część zapytań przychodzi tu z okolicznych gmin, więc treść nie może zamykać się na jedno miasto.",
    nearby: ["stalowa-wola", "tarnobrzeg", "nowa-deba"],
  },
  {
    slug: "nowa-deba",
    name: "Nowa Dęba",
    inCity: "w Nowej Dębie",
    ofCity: "Nowej Dęby",
    voivodeship: "podkarpackie",
    county: "tarnobrzeski",
    distanceKm: 25,
    population: 11000,
    tier: "extended",
    intro:
      "Nowa Dęba to jeden z najbliższych Mielcowi rynków — dwadzieścia kilka kilometrów. Dojeżdżam bez problemu, a znajomość okolicy pozwala pisać treści, które brzmią lokalnie, a nie szablonowo.",
    localContext:
      "Miasto z zapleczem wojskowym i przemysłowym, z usługami skupionymi wokół mieszkańców i firm ze strefy. Rynek jest mały, więc opinie i polecenia ważą tu jeszcze więcej niż gdzie indziej — i tym bardziej muszą być widoczne na stronie.",
    nearby: ["mielec", "tarnobrzeg", "kolbuszowa", "nisko"],
  },
  {
    slug: "kolbuszowa",
    name: "Kolbuszowa",
    inCity: "w Kolbuszowej",
    ofCity: "Kolbuszowej",
    voivodeship: "podkarpackie",
    county: "kolbuszowski",
    distanceKm: 30,
    population: 9000,
    tier: "extended",
    intro:
      "Kolbuszowa leży pół godziny od Mielca, w połowie drogi do Rzeszowa. Niewielki rynek i znikoma konkurencja w wyszukiwarce to tu największa przewaga.",
    localContext:
      "Powiatowy ośrodek z tradycjami meblarskimi i stolarskimi, otoczony gminami rolniczymi. Producenci mebli i wykonawcy na zamówienie zyskują tu najwięcej na dobrym portfolio ze zdjęciami — to ono sprzedaje, nie opis.",
    nearby: ["mielec", "sokolow-malopolski", "nowa-deba", "ropczyce"],
  },
  {
    slug: "staszow",
    name: "Staszów",
    inCity: "w Staszowie",
    ofCity: "Staszowa",
    voivodeship: "świętokrzyskie",
    county: "staszowski",
    distanceKm: 60,
    population: 14000,
    tier: "extended",
    intro:
      "Staszów to kierunek świętokrzyski, obsługiwany razem z Połańcem i Sandomierzem. Rynek mały, ale stabilny — i praktycznie bez konkurencji w wynikach lokalnych.",
    localContext:
      "Miasto powiatowe z zapleczem przemysłowym i usługowym, blisko elektrowni w Połańcu. Lokalne firmy działają w promieniu kilkunastu kilometrów, więc treść strony powinna obejmować cały powiat, nie samo miasto.",
    nearby: ["polaniec", "sandomierz", "tarnobrzeg"],
  },
  {
    slug: "polaniec",
    name: "Połaniec",
    inCity: "w Połańcu",
    ofCity: "Połańca",
    voivodeship: "świętokrzyskie",
    county: "staszowski",
    distanceKm: 45,
    population: 8000,
    tier: "extended",
    intro:
      "Połaniec jest bliżej Mielca, niż się większości wydaje — niecała godzina drogi. Obsługuję tu głównie usługi i firmy współpracujące z zakładem energetycznym.",
    localContext:
      "Elektrownia wyznacza rytm lokalnej gospodarki i generuje popyt na usługi techniczne, transport i zaplecze socjalne. To rynek B2B, gdzie strona pełni rolę wizytówki potwierdzającej wiarygodność przed podpisaniem umowy.",
    nearby: ["staszow", "sandomierz", "dabrowa-tarnowska", "mielec"],
  },
  {
    slug: "glogow-malopolski",
    name: "Głogów Małopolski",
    inCity: "w Głogowie Małopolskim",
    ofCity: "Głogowa Małopolskiego",
    voivodeship: "podkarpackie",
    county: "rzeszowski",
    distanceKm: 55,
    population: 6000,
    tier: "extended",
    intro:
      "Głogów Małopolski to praktycznie przedmieście Rzeszowa, ale z własnym, znacznie mniej obleganym zestawem fraz lokalnych. Dla wielu firm to prostsza droga do widoczności niż walka o samo miasto Rzeszów.",
    localContext:
      "Gmina rozwija się dzięki strefie inwestycyjnej i napływowi mieszkańców z aglomeracji. Rosnąca liczba nowych domów napędza popyt na wykończenia, ogrody, instalacje i usługi remontowe.",
    nearby: ["rzeszow", "sokolow-malopolski", "sedziszow-malopolski"],
  },
  {
    slug: "boguchwala",
    name: "Boguchwała",
    inCity: "w Boguchwale",
    ofCity: "Boguchwały",
    voivodeship: "podkarpackie",
    county: "rzeszowski",
    distanceKm: 60,
    population: 6000,
    tier: "extended",
    intro:
      "Boguchwała sąsiaduje z Rzeszowem od południa. Frazy z nazwą tej miejscowości są znacznie tańsze i łatwiejsze do zdobycia niż rzeszowskie, a klient i tak trafia ten sam.",
    localContext:
      "Gmina łączy funkcję podmiejskiej sypialni z zapleczem produkcyjnym i rolniczym. Wśród klientów dominują usługi dla domu i małe firmy obsługujące mieszkańców aglomeracji rzeszowskiej.",
    nearby: ["rzeszow", "tyczyn", "sedziszow-malopolski"],
  },
  {
    slug: "tyczyn",
    name: "Tyczyn",
    inCity: "w Tyczynie",
    ofCity: "Tyczyna",
    voivodeship: "podkarpackie",
    county: "rzeszowski",
    distanceKm: 65,
    population: 4000,
    tier: "extended",
    intro:
      "Tyczyn to niewielkie miasto tuż pod Rzeszowem. Przy takiej skali rynku wystarczy poprawnie zrobiona strona i wizytówka, by być pierwszym wyborem w okolicy.",
    localContext:
      "Miejscowość o charakterze podmiejskim, z zabudową jednorodzinną i usługami nastawionymi na mieszkańców. Popyt generują głównie remonty, ogrody, opieka zdrowotna i drobne rzemiosło.",
    nearby: ["rzeszow", "boguchwala", "lancut"],
  },
  {
    slug: "sokolow-malopolski",
    name: "Sokołów Małopolski",
    inCity: "w Sokołowie Małopolskim",
    ofCity: "Sokołowa Małopolskiego",
    voivodeship: "podkarpackie",
    county: "rzeszowski",
    distanceKm: 50,
    population: 4000,
    tier: "extended",
    intro:
      "Sokołów Małopolski leży w połowie drogi między Kolbuszową a Rzeszowem. To najmniejszy z obsługiwanych rynków — i jednocześnie ten, gdzie najszybciej widać efekty.",
    localContext:
      "Ośrodek gminny obsługujący okoliczne wsie, z handlem, usługami budowlanymi i przetwórstwem. Zasięg działania firm to zwykle kilkanaście kilometrów, więc strona powinna celować w całą gminę, a nie w samo miasto.",
    nearby: ["kolbuszowa", "glogow-malopolski", "rzeszow", "lancut"],
  },
];

/* ==========================================================================
   ETAPOWANIE PUBLIKACJI
   ==========================================================================

   ⚠ Publikacja wszystkich 22 podstron jednego dnia to wzorzec, który Google
   opisuje jako „scaled content abuse" — nawet gdy treść jest dobra.
   Dlatego miasta wchodzą falami, a nie naraz.

   Kolejność wynika z badania konkurencji, nie z wielkości miasta.
   Zaczynamy od rynków, gdzie wyniki wyszukiwania są najsłabsze — tam
   najszybciej zbudujemy pierwszy ruch i sygnały jakości.

   ⚠ Przy małych miastach ZAWSZE pisz pełną nazwę z członem rozróżniającym:
   „Głogów Małopolski", „Sokołów Małopolski", „Sędziszów Małopolski".
   Konkurencja tego nie robi i traci ruch na rzecz Głogowa dolnośląskiego,
   Sokołowa Podlaskiego i Sędziszowa świętokrzyskiego. Podobnie Tyczyn
   bywa mylony z Tychami — dopisuj powiat rzeszowski.
*/

/** Baza + rynki z najsłabszą konkurencją. Najszybsze wygrane. */
const PHASE_1 = [
  "mielec",
  "glogow-malopolski",
  "sokolow-malopolski",
  "tyczyn",
  "nowa-deba",
  "boguchwala",
  "polaniec",
  "kolbuszowa",
  "sedziszow-malopolski",
];

/** Średnia konkurencja — w wynikach dominują ogólnopolskie farmy podstron. */
const PHASE_2 = [
  "debica",
  "tarnobrzeg",
  "stalowa-wola",
  "tarnow",
  "nisko",
  "ropczyce",
  "dabrowa-tarnowska",
  "staszow",
];

/** Najtrudniejsze — realni gracze z lokalnym adresem. Na koniec. */
const PHASE_3 = ["rzeszow", "sandomierz", "lancut", "bochnia", "brzesko"];

export type Phase = 1 | 2 | 3;

export function getPhase(slug: string): Phase {
  if (PHASE_1.includes(slug)) return 1;
  if (PHASE_2.includes(slug)) return 2;
  return 3;
}

/**
 * Etap, do którego publikujemy. Podnosić DOPIERO po sprawdzeniu w Search
 * Console, że poprzednia fala zbiera wyświetlenia — nie według kalendarza.
 */
export const CURRENT_PHASE: Phase = 1;

/** Miasta z własną podstroną. Tylko te trafiają do sitemapy i do routingu. */
export const PUBLISHED_CITIES = CITIES.filter(
  (c) => getPhase(c.slug) <= CURRENT_PHASE
);

/* ==========================================================================
   WSPÓŁRZĘDNE — do schematycznej mapy zasięgu w hero
   ==========================================================================

   Wartości przybliżone, wystarczające do poprawnego ROZMIESZCZENIA miast
   względem siebie. Mapa jest schematem zasięgu, nie mapą nawigacyjną.

   ⚠ Nie używać tych liczb w JSON-LD ani nigdzie, gdzie deklarujemy dokładną
   lokalizację. Współrzędne siedziby są osobno, w `content/site.ts`.
*/
const COORDS: Record<string, { lat: number; lng: number }> = {
  mielec: { lat: 50.287, lng: 21.424 },
  rzeszow: { lat: 50.041, lng: 21.999 },
  tarnow: { lat: 50.013, lng: 20.986 },
  debica: { lat: 50.052, lng: 21.411 },
  tarnobrzeg: { lat: 50.573, lng: 21.679 },
  "stalowa-wola": { lat: 50.582, lng: 22.053 },
  sandomierz: { lat: 50.679, lng: 21.749 },
  lancut: { lat: 50.068, lng: 22.229 },
  bochnia: { lat: 49.969, lng: 20.43 },
  brzesko: { lat: 49.969, lng: 20.606 },
  "dabrowa-tarnowska": { lat: 50.174, lng: 20.987 },
  ropczyce: { lat: 50.052, lng: 21.611 },
  "sedziszow-malopolski": { lat: 50.071, lng: 21.702 },
  nisko: { lat: 50.521, lng: 22.14 },
  "nowa-deba": { lat: 50.428, lng: 21.75 },
  kolbuszowa: { lat: 50.244, lng: 21.777 },
  staszow: { lat: 50.562, lng: 21.17 },
  polaniec: { lat: 50.43, lng: 21.276 },
  "glogow-malopolski": { lat: 50.173, lng: 21.972 },
  boguchwala: { lat: 49.978, lng: 21.945 },
  tyczyn: { lat: 49.968, lng: 22.038 },
  "sokolow-malopolski": { lat: 50.228, lng: 22.123 },
};

export function getCoords(slug: string) {
  return COORDS[slug];
}

/** Siedziba firmy — Mielec. */
export const BASE_CITY = CITIES.find((c) => c.isBase)!;

/** Miasta pokazywane w nawigacji i na stronie głównej. */
export const CORE_CITIES = CITIES.filter((c) => c.tier === "core");

/** Slugi miast, dla których generujemy podstrony. */
export const CITY_SLUGS = PUBLISHED_CITIES.map((c) => c.slug);

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

/** Sąsiednie miasta danego miasta — do linkowania wewnętrznego. */
export function getNearbyCities(city: City): City[] {
  return city.nearby
    .map((slug) => CITIES.find((c) => c.slug === slug))
    .filter((c): c is City => Boolean(c));
}

/** Województwa, w których działa firma — do `areaServed` w JSON-LD. */
export const SERVED_VOIVODESHIPS = [
  ...new Set(CITIES.map((c) => c.voivodeship)),
];

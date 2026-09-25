/**
 * Teksty RAMOWE podstron lokalizacyjnych — hub `/strony-internetowe`
 * i podstrony miast `/strony-internetowe/[miasto]`.
 *
 * ⚠ ZASADA NADRZĘDNA (ryzyko „doorway pages"):
 * Ten plik dostarcza WYŁĄCZNIE warstwę ramową: nagłówki sekcji, etykiety,
 * nawigację i CTA. Treść merytoryczna każdej podstrony miasta pochodzi
 * z pól `intro` i `localContext` w `content/cities.ts` — ręcznie pisanych,
 * innych dla każdego miasta.
 *
 * Czego tu NIE MA i nie wolno dopisywać:
 *  - akapitów budowanych z szablonu przez podmianę nazwy miasta,
 *  - list „obsługujemy także: …" powtarzanych na każdej podstronie,
 *  - zdań opisujących lokalny rynek — te są w `content/cities.ts`.
 *
 * ⚠ ANGIELSKIE OPISY MIAST.
 * `content/cities.ts` trzyma `intro` i `localContext` tylko po polsku
 * (typ `City` ma po jednym polu na tekst). Żeby wersja `/en/web-design/...`
 * nie serwowała polskich akapitów, tłumaczenia mieszkają tutaj, w
 * `CITY_TEXT_EN`, kluczowane slugiem. To jedno w jednym te same treści,
 * nie ich rozwinięcie — przy zmianie polskiego oryginału poprawić też tutaj.
 * Brak tłumaczenia = fallback na polski oryginał (lepiej niż pusta strona).
 */

import type { City } from "@/content/cities";
import type { Locale } from "@/lib/routes";

/* ==========================================================================
   Angielskie odpowiedniki opisów miast
   ========================================================================== */

type CityText = { intro: string; localContext: string };

const CITY_TEXT_EN: Record<string, CityText> = {
  mielec: {
    intro:
      "Mielec is my home town — I live here and run PROJSTOG from here. I can reach most clients in the city within fifteen minutes, so meeting in person is the rule here, not the exception.",
    localContext:
      "Mielec runs on aviation and its Special Economic Zone, but the everyday market for services is made of family firms: garages, clinics, builders, shops. They are the ones with either a very old website or none at all — and they are the ones being searched for in Google by neighbours from the same street.",
  },
  rzeszow: {
    intro:
      "Rzeszów is the largest market in the region and the most demanding one — competition in Google here is real. I drive over for meetings and run the project exactly as I would in Mielec: one point of contact, no middlemen.",
    localContext:
      "The capital of Podkarpacie concentrates IT companies, universities, business services and a dense network of restaurants and private healthcare. A client from Rzeszów usually already has a website — the problem is that it does not sell and never gets past the third page of results.",
  },
  tarnow: {
    intro:
      "Tarnów is the second large market after Rzeszów within an hour's drive of Mielec. I work here with companies that want to move beyond local classifieds and build a channel for winning customers of their own.",
    localContext:
      "Tarnów means chemicals, processing and a strong retail and service sector, plus tourist traffic around the old town. The split here is clear: businesses with a decades-old offline reputation that are invisible online, and young service firms fighting for their first jobs.",
  },
  debica: {
    intro:
      "Dębica is half an hour from Mielec, exactly halfway between Rzeszów and Tarnów. It is one of those markets where a properly built local website shows results unusually fast.",
    localContext:
      "The town is associated with the rubber and automotive industry, but the backbone is garages, transport, construction services and retail. People search Google very specifically — by the name of the service and the town, rarely by company name.",
  },
  tarnobrzeg: {
    intro:
      "Tarnobrzeg is the nearest larger centre to Mielec on the other side of the Wisłoka. The drive takes me about half an hour, so I serve it on practically the same terms as my own town.",
    localContext:
      "After the sulphur mine closed, the town moved towards services, retail and tourism around Lake Tarnobrzeskie. Seasonality genuinely drives sales here — a website has to be ready before the peak season, not halfway through it.",
  },
  "stalowa-wola": {
    intro:
      "Stalowa Wola grew around heavy industry and has a stronger B2B market than the towns around it. I build both service websites here and more technical presentations for manufacturing companies.",
    localContext:
      "A large industrial plant in the centre means a dense network of subcontractors, technical services and construction-related firms. That kind of client does not need a flashy website — they need a clear offer, references and a fast way to get in touch.",
  },
  sandomierz: {
    intro:
      "Sandomierz is a heavily tourist market, and that changes what a website has to do. Presentation, photography and booking matter more here than an extensive catalogue of services.",
    localContext:
      "The old town, the vineyards and visitor traffic drive accommodation, restaurants and guide services. The season is short and intense, so a site has to load instantly on a phone and lead straight to a booking or a phone call.",
  },
  lancut: {
    intro:
      "Łańcut is a smaller market, but one with a recognisable tourist name and plenty of family businesses. Competition in Google is far lighter than in Rzeszów, which shortens the road to the first page considerably.",
    localContext:
      "The castle and its visitors keep restaurants and guest houses busy, alongside a classic mix of local services and crafts. Many of those firms base their entire online presence on a single social profile — a website of their own sets them apart immediately.",
  },
  bochnia: {
    intro:
      "Bochnia is the westernmost point I serve regularly. I run the project remotely and drive over for the meetings that matter — the brief and the handover.",
    localContext:
      "The historic salt mine and the proximity of Kraków create a mix of tourism and firms serving the metropolitan area. A client from Bochnia often competes not only locally but for traffic from Kraków, so the website has to be noticeably better than the local average.",
  },
  brzesko: {
    intro:
      "I serve Brzesko alongside the Tarnów market — it sits right on the way. The market is small enough that a well-kept Google listing and a solid website can dominate local results.",
    localContext:
      "A town with brewing traditions and a manufacturing and retail base, with a large number of micro service businesses. At that scale it is not the advertising budget that decides, but whether the company can be found at all and whether it looks trustworthy.",
  },
  "dabrowa-tarnowska": {
    intro:
      "Dąbrowa Tarnowska is half an hour from Mielec, on the road to Tarnów. A small market means local results move here very quickly.",
    localContext:
      "An agricultural and service centre for the whole county, with retail, construction and services for farms. Customers usually search from a phone and call straight away — which is why the number has to be visible without scrolling.",
  },
  ropczyce: {
    intro:
      "Ropczyce sits on the Rzeszów–Tarnów route, forty minutes from Mielec. It is a market where the top positions for service phrases with the town name are still easy to take.",
    localContext:
      "The local economy rests on refractory materials production and on small services and retail. Many firms here have worked on referrals alone for generations — a website is how they reach the next generation of customers.",
  },
  "sedziszow-malopolski": {
    intro:
      "I serve Sędziszów Małopolski together with Ropczyce — the same county, the same route. The market is small, so a single well-optimised website makes an enormous difference.",
    localContext:
      "A town with manufacturing and logistics facilities along the road to Rzeszów, plus the usual mix of services for residents. Competition in Google is minimal — what counts is simply having the offer and the business listing described correctly.",
  },
  nisko: {
    intro:
      "I serve Nisko alongside Stalowa Wola — the towns sit next to each other. It is a quiet market where a solid website is enough to get ahead of most of the local competition.",
    localContext:
      "A county centre with services for residents, retail and firms tied to the industry in Stalowa Wola. A large share of enquiries comes from the surrounding communes, so the content cannot be limited to one town.",
  },
  "nowa-deba": {
    intro:
      "Nowa Dęba is one of the closest markets to Mielec — just over twenty kilometres. I get there easily, and knowing the area lets me write content that sounds local rather than templated.",
    localContext:
      "A town with military and industrial facilities, with services centred on residents and on companies from the economic zone. The market is small, so reviews and referrals weigh even more than elsewhere — all the more reason to make them visible on the site.",
  },
  kolbuszowa: {
    intro:
      "Kolbuszowa is half an hour from Mielec, halfway to Rzeszów. A small market and almost no competition in search is the biggest advantage here.",
    localContext:
      "A county centre with furniture-making and joinery traditions, surrounded by farming communes. Furniture makers and made-to-order workshops gain the most from a strong photo portfolio — that is what sells, not the description.",
  },
  staszow: {
    intro:
      "Staszów is the Świętokrzyskie direction, served together with Połaniec and Sandomierz. A small but stable market — and practically free of competition in local results.",
    localContext:
      "A county town with industrial and service facilities, close to the power plant in Połaniec. Local firms operate within a radius of a dozen or so kilometres, so the content should cover the whole county rather than the town alone.",
  },
  polaniec: {
    intro:
      "Połaniec is closer to Mielec than most people assume — just under an hour's drive. I mostly work here with service firms and companies tied to the power plant.",
    localContext:
      "The power plant sets the rhythm of the local economy and creates demand for technical services, transport and support facilities. It is a B2B market where the website works as the credential that gets checked before a contract is signed.",
  },
  "glogow-malopolski": {
    intro:
      "Głogów Małopolski is practically a suburb of Rzeszów, but with its own, far less crowded set of local search phrases. For many firms it is an easier route to visibility than fighting for Rzeszów itself.",
    localContext:
      "The commune is growing thanks to its investment zone and an inflow of residents from the metropolitan area. The rising number of new houses drives demand for finishing work, gardens, installations and renovation services.",
  },
  boguchwala: {
    intro:
      "Boguchwała borders Rzeszów from the south. Phrases with this name are far cheaper and easier to win than the Rzeszów ones, and the customer who arrives is exactly the same.",
    localContext:
      "The commune combines the role of a suburban dormitory with manufacturing and farming. The clients here are mostly home services and small firms serving residents of the Rzeszów area.",
  },
  tyczyn: {
    intro:
      "Tyczyn is a small town just outside Rzeszów, in the Rzeszów county. At that scale of market, a properly built website and business listing are enough to become the first choice in the area.",
    localContext:
      "A suburban town of single-family housing and services aimed at residents. Demand comes mainly from renovations, gardens, healthcare and small crafts.",
  },
  "sokolow-malopolski": {
    intro:
      "Sokołów Małopolski lies halfway between Kolbuszowa and Rzeszów. It is the smallest of the markets I serve — and the one where results show up fastest.",
    localContext:
      "A commune centre serving the surrounding villages, with retail, construction services and processing. Firms here usually operate within a dozen or so kilometres, so a website should aim at the whole commune, not the town itself.",
  },
};

/** Opis miasta w danym języku. PL prosto z `content/cities.ts`. */
export function cityText(locale: Locale, city: City): CityText {
  if (locale === "pl") {
    return { intro: city.intro, localContext: city.localContext };
  }
  return (
    CITY_TEXT_EN[city.slug] ?? {
      intro: city.intro,
      localContext: city.localContext,
    }
  );
}

/* ==========================================================================
   Pomocnicze formatowanie danych miasta
   ========================================================================== */

/**
 * Powiat w formie do wyświetlenia.
 * Miasta na prawach powiatu mają w danych pełny opis w nawiasie — nie
 * doklejamy im słowa „powiat".
 */
export function countyLabel(city: City, locale: Locale): string {
  const isCityCounty = city.county.includes("(");
  if (isCityCounty) {
    if (locale === "pl") return city.county;
    return `${city.county.split("(")[0].trim()} (city county)`;
  }
  return locale === "pl" ? `powiat ${city.county}` : `${city.county} county`;
}

/** Pierwsze pełne zdania tekstu mieszczące się w budżecie znaków. */
function leadSentences(text: string, budget: number): string {
  const parts = text.split(/(?<=[.!?])\s+/);
  let out = "";
  for (const part of parts) {
    const next = out ? `${out} ${part}` : part;
    if (next.length > budget) break;
    out = next;
  }
  return out || parts[0];
}

/**
 * Opis meta podstrony miasta.
 * Zdanie otwierające pochodzi z `intro` danego miasta — jest więc inne dla
 * każdej podstrony. Doklejony konkret logistyczny jest krótki i oparty
 * na danych (`distanceKm`), nie na szablonowej frazie marketingowej.
 */
export function cityMetaDescription(locale: Locale, city: City): string {
  const { intro } = cityText(locale, city);

  const tail = city.isBase
    ? locale === "pl"
      ? "Strony, sklepy i widoczność w Google — od rozmowy po wsparcie."
      : "Websites, stores and Google visibility — from first call to support."
    : locale === "pl"
      ? `Dojeżdżam z Mielca, ok. ${city.distanceKm} km.`
      : `About ${city.distanceKm} km from my base in Mielec.`;

  return `${leadSentences(intro, 158 - tail.length - 1)} ${tail}`;
}

/* ==========================================================================
   Warstwa ramowa — PL
   ========================================================================== */

const pl = {
  /* Krótkie nazwy do grupowania listy miast. */
  voivodeshipShort: {
    podkarpackie: "Podkarpackie",
    małopolskie: "Małopolskie",
    świętokrzyskie: "Świętokrzyskie",
  } as Record<City["voivodeship"], string>,

  /* Pełne nazwy — nad nagłówkiem podstrony miasta. */
  voivodeshipFull: {
    podkarpackie: "województwo podkarpackie",
    małopolskie: "województwo małopolskie",
    świętokrzyskie: "województwo świętokrzyskie",
  } as Record<City["voivodeship"], string>,

  breadcrumb: {
    label: "Ścieżka nawigacji",
    home: "Strona główna",
    hub: "Obszar działania",
  },

  contact: {
    phone: "Telefon",
    email: "E-mail",
  },

  hub: {
    metaTitle: "Obszar działania — miasta, w których robię strony | PROJSTOG",
    metaDescription:
      "Jestem z Mielca i jeżdżę do klientów po Podkarpaciu, Małopolsce i ziemi świętokrzyskiej. Zobacz miasta, które mają u mnie własną podstronę.",

    h1: "Obszar działania",
    lead:
      "Mieszkam w Mielcu i stąd prowadzę PROJSTOG. Zasięg wyznacza mi nie mapa marketingowa, tylko to, dokąd realnie jestem w stanie dojechać na spotkanie i wrócić tego samego dnia.",
    mapLabel: "Mapa miast, do których dojeżdżam z Mielca",

    travelHeading: "Dojeżdżam",
    travelBody:
      "Na brief, odbiór i zdjęcia z realizacji przyjeżdżam osobiście — w obszarze z tej listy bez doliczania kosztów dojazdu. Resztę projektu prowadzę zdalnie, bo tak jest szybciej dla obu stron: poprawkę zamykamy w godzinę, a nie w terminie kolejnego spotkania.",

    citiesHeading: "Miasta z własną podstroną",
    citiesLead:
      "Każde z nich ma osobny opis lokalnego rynku — napisany ręcznie, nie wygenerowany z szablonu. Kliknij swoje, żeby zobaczyć, jak to wygląda u Ciebie.",
    distanceSuffix: "km od Mielca",
    baseLabel: "moja baza",

    upcomingHeading: "Reszta regionu",
    upcomingBody:
      "Kolejne miasta z mapy dochodzą stopniowo — każde dopiero wtedy, gdy mam dla niego napisany własny opis rynku. Jeśli Twojej miejscowości jeszcze tu nie ma, po prostu napisz: obszar obsługi kończy się tam, gdzie kończy się rozsądny dojazd, a nie na tej liście.",

    offerHeading: "Co robię",
    offerLead:
      "Zakres jest ten sam niezależnie od miasta. Różni się to, czego wymaga lokalny rynek — i o tym są podstrony miast.",

    ctaHeading: "Nie wiesz, czy dojadę?",
    ctaBody:
      "Napisz, gdzie działasz i czego potrzebujesz. Jeśli to za daleko, powiem wprost — zamiast obiecywać „obsługę zdalną”, która kończy się na mailach bez odpowiedzi.",
    ctaButton: "Napisz do mnie",
  },

  city: {
    /* Nagłówek bez upychania fraz: jedno miasto, jedna usługa. */
    h1: (city: City) => `Strony internetowe — ${city.name}`,
    metaTitle: (city: City) => `Strony internetowe ${city.inCity} | PROJSTOG`,
    schemaName: (city: City) => `Tworzenie stron internetowych ${city.inCity}`,

    contextHeading: (city: City) => `Rynek ${city.ofCity}`,

    factsHeading: "Konkrety",
    facts: {
      distance: "Odległość od Mielca",
      distanceValue: (km: number) => `ok. ${km} km`,
      base: "Siedziba",
      baseValue: "stąd pracuję",
      population: "Mieszkańcy",
      populationValue: (people: number) =>
        `ok. ${Math.round(people / 1000)} tys.`,
      meetings: "Spotkania",
      meetingsValue: "przyjeżdżam na brief i na odbiór",
      meetingsBaseValue: "na miejscu, kiedy trzeba",
    },

    offerHeading: (city: City) => `Co robię dla firm ${city.inCity}`,

    workHeading: (city: City) => `Zrobione ${city.inCity}`,
    workLink: "Zobacz realizację",

    nearbyHeading: "Blisko stąd",
    nearbyAnchor: (city: City) => `Strony internetowe ${city.inCity}`,
    backToHub: "Zobacz cały obszar, po którym jeżdżę",

    ctaHeading: (city: City) => `Zaczynamy ${city.inCity}?`,
    ctaBody:
      "Odpisuję osobiście, zwykle tego samego dnia. Po jednej rozmowie wiesz, ile to potrwa i ile kosztuje — bez ofert rozpisanych na dwadzieścia stron.",
    ctaButton: "Napisz do mnie",
    ctaSecondary: "Zobacz ofertę",
  },
};

/* Bez `as const` — angielska wersja musi dać się przypisać do tego typu. */
export type CitiesCopy = typeof pl;

/* ==========================================================================
   Warstwa ramowa — EN
   ========================================================================== */

const en: CitiesCopy = {
  voivodeshipShort: {
    podkarpackie: "Podkarpackie",
    małopolskie: "Małopolskie",
    świętokrzyskie: "Świętokrzyskie",
  },

  voivodeshipFull: {
    podkarpackie: "Podkarpackie Voivodeship",
    małopolskie: "Małopolskie Voivodeship",
    świętokrzyskie: "Świętokrzyskie Voivodeship",
  },

  breadcrumb: {
    label: "Breadcrumb",
    home: "Home",
    hub: "Where I work",
  },

  contact: {
    phone: "Phone",
    email: "Email",
  },

  hub: {
    metaTitle: "Where I work — the cities I build websites for | PROJSTOG",
    metaDescription:
      "I am based in Mielec and drive out to clients across south-eastern Poland. See the towns that have a page of their own here.",

    h1: "Where I work",
    lead:
      "I live in Mielec and run PROJSTOG from here. My range is not drawn by a marketing map — it is however far I can realistically drive for a meeting and be back the same day.",
    mapLabel: "Map of the towns I drive to from Mielec",

    travelHeading: "I come to you",
    travelBody:
      "I turn up in person for the brief, the handover and the photos of finished work — anywhere on this list, with no travel charge added. The rest of the project runs remotely, because that is faster for both of us: a change takes an hour, not until the next meeting.",

    citiesHeading: "Towns with a page of their own",
    citiesLead:
      "Each one has a separate description of its local market, written by hand rather than generated from a template. Pick yours to see how it looks where you are.",
    distanceSuffix: "km from Mielec",
    baseLabel: "home base",

    upcomingHeading: "The rest of the region",
    upcomingBody:
      "The remaining towns on the map go live gradually — each one only once I have written a proper description of its market. If your town is not here yet, just write to me: the service area ends where a sensible drive ends, not where this list does.",

    offerHeading: "What I do",
    offerLead:
      "The scope is the same wherever you are. What differs is what the local market demands — and that is what the town pages are about.",

    ctaHeading: "Not sure whether I reach you?",
    ctaBody:
      "Tell me where you work and what you need. If it is too far, I will say so plainly, instead of promising “remote service” that ends in unanswered emails.",
    ctaButton: "Get in touch",
  },

  city: {
    h1: (city: City) => `Web design — ${city.name}`,
    metaTitle: (city: City) => `Web design in ${city.name} | PROJSTOG`,
    schemaName: (city: City) => `Web design in ${city.name}`,

    contextHeading: (city: City) => `The market in ${city.name}`,

    factsHeading: "The practical bits",
    facts: {
      distance: "Distance from Mielec",
      distanceValue: (km: number) => `approx. ${km} km`,
      base: "Home base",
      baseValue: "this is where I work from",
      population: "Residents",
      populationValue: (people: number) =>
        `approx. ${Math.round(people / 1000)},000`,
      meetings: "Meetings",
      meetingsValue: "I drive over for the brief and the handover",
      meetingsBaseValue: "in person whenever it helps",
    },

    offerHeading: (city: City) => `What I build for companies in ${city.name}`,

    workHeading: (city: City) => `Built in ${city.name}`,
    workLink: "See the project",

    nearbyHeading: "Close by",
    nearbyAnchor: (city: City) => `Web design in ${city.name}`,
    backToHub: "See the whole area I cover",

    ctaHeading: (city: City) => `Ready to start in ${city.name}?`,
    ctaBody:
      "You get an answer from me personally, usually the same day. One conversation is enough to know how long it takes and what it costs — no twenty-page proposals.",
    ctaButton: "Get in touch",
    ctaSecondary: "See the services",
  },
};

const COPY: Record<Locale, CitiesCopy> = { pl, en };

export function getCitiesCopy(locale: Locale): CitiesCopy {
  return COPY[locale];
}

/**
 * Treść strony „O mnie".
 *
 * ⚠ ZASADA NADRZĘDNA: żadnych zmyślonych faktów.
 * Nie ma tu studiów, certyfikatów, nagród ani „X lat doświadczenia", bo takich
 * danych nie ma w materiałach źródłowych. Opisujemy wyłącznie to, co wynika
 * z `content/site.ts` (rok startu, lokalizacja, dane kontaktowe),
 * z `content/cities.ts` (zasięg) i ze sposobu pracy.
 *
 * Jedyna twarda liczba, jakiej wolno tu użyć, to rok rozpoczęcia działalności
 * — i ona też jest wyliczana z `SITE.foundedYear`, nie wpisana ręcznie.
 */

import type { Locale } from "@/lib/routes";

type AboutPageCopy = {
  seo: { title: string; description: string };
  breadcrumbHome: string;
  /** Nadtytuł nad H1 — pozycjonowanie w jednym zdaniu. */
  kicker: string;
  h1: string;
  lead: string;
  photoAlt: string;
  photoCaption: string;

  /** Sekcja przewagi lokalnej — najważniejszy blok na stronie. */
  localHeading: string;
  localLead: string;
  /** Miasta, z których działa konkurencja rankująca na Podkarpaciu. */
  competitorOrigins: { city: string; distance: string }[];
  localPunchline: string;
  localDetail: string;

  approachHeading: string;
  approachPoints: { title: string; body: string }[];

  workHeading: string;
  workBody: string;

  factsHeading: string;
  factsLabels: {
    base: string;
    since: string;
    reach: string;
    contact: string;
  };
  reachValue: string;

  ctaHeading: string;
  ctaBody: string;
  ctaButton: string;
  ctaSecondary: string;
};

export const ABOUT_PAGE: Record<Locale, AboutPageCopy> = {
  pl: {
    seo: {
      title: "O mnie — Oscar Grzywa, PROJSTOG Mielec",
      description:
        "Nie agencja, tylko konkretny człowiek z Mielca. Strony internetowe dla firm z Podkarpacia robi i utrzymuje jedna osoba — od pierwszej rozmowy po wsparcie po uruchomieniu.",
    },
    breadcrumbHome: "Strona główna",
    kicker: "Nie agencja. Człowiek z Mielca.",
    h1: "Oscar Grzywa",
    lead:
      "Prowadzę PROJSTOG jednoosobowo. Rozmawiasz ze mną, ofertę dostajesz ode mnie, kod piszę ja i ja odbieram telefon, gdy trzeba coś poprawić po uruchomieniu. Na żadnym etapie nie pojawia się account manager ani podwykonawca, o którym nic nie wiesz.",
    photoAlt: "Oscar Grzywa, właściciel PROJSTOG",
    photoCaption: "Oscar Grzywa · PROJSTOG · Mielec",

    localHeading: "Jestem stąd. Większość konkurencji nie jest.",
    localLead:
      "Sprawdziłem, kto realnie wyświetla się w Google na hasła o stronach internetowych na Podkarpaciu. Wyniki są jednoznaczne: prawie żadna z tych firm nie ma siedziby w regionie.",
    competitorOrigins: [
      { city: "Sochaczew", distance: "woj. mazowieckie" },
      { city: "Piła", distance: "woj. wielkopolskie" },
      { city: "Czechowice-Dziedzice", distance: "woj. śląskie" },
      { city: "Kraków", distance: "woj. małopolskie" },
    ],
    localPunchline:
      "To firmy, które obsługują Podkarpacie zdalnie, z adresem oddalonym o kilkaset kilometrów. Ja mieszkam i pracuję w Mielcu.",
    localDetail:
      "W praktyce oznacza to, że mogę przyjechać na spotkanie, obejrzeć lokal albo zdjęcia z realizacji na miejscu i znam rynek, o którym piszę. Nie muszę zgadywać, jak wygląda gospodarka w Dębicy, Tarnobrzegu czy Kolbuszowej — jeżdżę tamtędy.",

    approachHeading: "Jak pracuję",
    approachPoints: [
      {
        title: "Jeden kontakt, od początku do końca",
        body:
          "Brief, wycena, projekt, wdrożenie i poprawki — wszystko z tą samą osobą. Nie musisz drugi raz tłumaczyć, o co chodzi w Twojej firmie.",
      },
      {
        title: "Cena ustalona przed startem",
        body:
          "Zakres spisujemy zanim zacznę. Wiesz, co wchodzi w kwotę, a co wyceniam osobno — bez faktur-niespodzianek w trakcie.",
      },
      {
        title: "Strona ma przynosić zapytania",
        body:
          "Efekt mierzymy telefonami i wiadomościami od klientów, nie liczbą animacji. Szybkie ładowanie, czytelna oferta i widoczny numer telefonu są tu ważniejsze niż efekciarstwo.",
      },
      {
        title: "Kod i dostępy zostają u Ciebie",
        body:
          "Domena, hosting i projekt są Twoje. Jeśli kiedyś zechcesz przejść do kogoś innego, zabierasz wszystko ze sobą — nie ma zamka na klucz.",
      },
    ],

    workHeading: "Czym się zajmuję",
    workBody:
      "Strony firmowe i one page, sklepy internetowe, blogi i platformy treści. Do tego automatyzacje i chatboty AI, proste systemy CRM, wizytówka Google Moja Firma i lokalne SEO, a po uruchomieniu hosting, aktualizacje i wsparcie techniczne. Wszystko w jednym miejscu, u tej samej osoby.",

    factsHeading: "W skrócie",
    factsLabels: {
      base: "Baza",
      since: "Działam od",
      reach: "Zasięg",
      contact: "Kontakt",
    },
    reachValue: "Podkarpacie, Małopolska wschodnia, południowe Świętokrzyskie",

    ctaHeading: "Porozmawiajmy o Twojej firmie",
    ctaBody:
      "Pierwsza rozmowa jest bezpłatna i do niczego nie zobowiązuje. Powiem wprost, czy i jak mogę pomóc.",
    ctaButton: "Napisz do mnie",
    ctaSecondary: "Zobacz ofertę",
  },

  en: {
    seo: {
      title: "About — Oscar Grzywa, PROJSTOG Mielec",
      description:
        "Not an agency — one person from Mielec. Websites for companies in south-eastern Poland, built and maintained by the same person from the first call to post-launch support.",
    },
    breadcrumbHome: "Home",
    kicker: "Not an agency. One person from Mielec.",
    h1: "Oscar Grzywa",
    lead:
      "I run PROJSTOG on my own. You talk to me, the quote comes from me, I write the code, and I am the one who picks up the phone when something needs fixing after launch. At no point does an account manager or an unnamed subcontractor appear.",
    photoAlt: "Oscar Grzywa, owner of PROJSTOG",
    photoCaption: "Oscar Grzywa · PROJSTOG · Mielec",

    localHeading: "I am from here. Most of the competition is not.",
    localLead:
      "I checked who actually ranks in Google for web design queries across south-eastern Poland. The result is unambiguous: almost none of those companies are based in the region.",
    competitorOrigins: [
      { city: "Sochaczew", distance: "Mazowieckie voivodeship" },
      { city: "Piła", distance: "Wielkopolskie voivodeship" },
      { city: "Czechowice-Dziedzice", distance: "Śląskie voivodeship" },
      { city: "Kraków", distance: "Małopolskie voivodeship" },
    ],
    localPunchline:
      "These are firms serving Podkarpacie remotely, from an address several hundred kilometres away. I live and work in Mielec.",
    localDetail:
      "In practice that means I can come to a meeting, look at the premises or the job photos in person, and I know the market I write about. I do not have to guess what the economy looks like in Dębica, Tarnobrzeg or Kolbuszowa — I drive through them.",

    approachHeading: "How I work",
    approachPoints: [
      {
        title: "One contact, start to finish",
        body:
          "Brief, quote, design, launch and revisions — all with the same person. You never have to explain your business twice.",
      },
      {
        title: "Price agreed before we start",
        body:
          "The scope is written down first. You know what the figure covers and what I quote separately — no surprise invoices halfway through.",
      },
      {
        title: "The site exists to bring enquiries",
        body:
          "Success is measured in calls and messages from customers, not in the number of animations. Fast loading, a readable offer and a visible phone number matter more than visual tricks.",
      },
      {
        title: "The code and the access stay yours",
        body:
          "Domain, hosting and project belong to you. If you ever want to move to someone else, you take everything with you — nothing is locked down.",
      },
    ],

    workHeading: "What I do",
    workBody:
      "Company websites and one-pagers, online stores, blogs and content platforms. Plus AI automation and chatbots, simple CRM systems, Google Business Profile and local SEO, and after launch: hosting, updates and technical support. All in one place, from the same person.",

    factsHeading: "In short",
    factsLabels: {
      base: "Based in",
      since: "Working since",
      reach: "Coverage",
      contact: "Contact",
    },
    reachValue:
      "Podkarpackie, eastern Małopolskie and southern Świętokrzyskie",

    ctaHeading: "Let's talk about your business",
    ctaBody:
      "The first conversation is free and commits you to nothing. I will tell you plainly whether and how I can help.",
    ctaButton: "Get in touch",
    ctaSecondary: "See the services",
  },
};

/** Zdjęcie właściciela. Wymiary podane wprost — `next/image` bez CLS. */
export const OWNER_PHOTO = {
  src: "/img/owner.jpg",
  width: 600,
  height: 600,
} as const;

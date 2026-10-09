/**
 * Treść strony „O mnie".
 *
 * ⚠ ZASADA NADRZĘDNA: żadnych zmyślonych faktów.
 * Nie ma tu studiów, certyfikatów, nagród ani „X lat doświadczenia", bo takich
 * danych nie ma w materiałach źródłowych. Opisujemy wyłącznie to, co wynika
 * z `content/site.ts` (rok startu, siedziba, obszar obsługi, dane kontaktowe)
 * i ze sposobu pracy.
 *
 * `reachValue` musi zgadzać się z `SITE.areaServed` (JSON-LD) — treść
 * widoczna i dane strukturalne nie mogą sobie przeczyć.
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
        "Twoją stronę internetową robi i utrzymuje jedna osoba z Mielca — od pierwszej rozmowy po wsparcie po uruchomieniu. Bez agencji, pośredników i przekazywania sprawy dalej.",
    },
    breadcrumbHome: "Strona główna",
    kicker: "Nie agencja. Człowiek z Mielca.",
    h1: "Oscar Grzywa",
    lead:
      "Prowadzę PROJSTOG jednoosobowo, więc przez cały projekt masz jeden kontakt. Rozmawiasz ze mną, ofertę dostajesz ode mnie, kod piszę ja i ja odbieram telefon, gdy po uruchomieniu trzeba coś poprawić. Na żadnym etapie nie trafiasz do account managera ani do podwykonawcy, o którym nic nie wiesz.",
    photoAlt: "Oscar Grzywa, właściciel PROJSTOG",
    photoCaption: "Oscar Grzywa · PROJSTOG · Mielec",

    localHeading: "Masz wykonawcę stąd. Większość konkurencji jest daleko.",
    localLead:
      "Wpisz w Google hasło o stronach internetowych na Podkarpaciu i sprawdź, skąd są firmy na górze wyników. Prawie żadna nie ma siedziby w regionie.",
    localPunchline:
      "To firmy, które obsługują Podkarpacie zdalnie, z adresem oddalonym o kilkaset kilometrów. Ja mieszkam i pracuję w Mielcu, więc możesz umówić się ze mną na spotkanie.",
    localDetail:
      "Dla Ciebie to znaczy, że przyjadę na spotkanie, obejrzę Twój lokal albo realizacje na miejscu, a teksty na Twoją stronę napiszę z wiedzą o lokalnym rynku. Nie zgaduję, jak wygląda sytuacja w Dębicy, Tarnobrzegu czy Kolbuszowej — jeżdżę tamtędy.",

    approachHeading: "Jak wygląda współpraca",
    approachPoints: [
      {
        title: "Jeden kontakt, od początku do końca",
        body:
          "Brief, wycena, projekt, wdrożenie i poprawki — wszystko z tą samą osobą. Nie musisz drugi raz tłumaczyć, o co chodzi w Twojej firmie.",
      },
      {
        title: "Cena ustalona przed startem",
        body:
          "Zakres spisujemy, zanim zacznę. Wiesz, co wchodzi w kwotę, a co jest wyceniane osobno — bez faktur-niespodzianek w trakcie.",
      },
      {
        title: "Twoja strona ma przynosić zapytania",
        body:
          "Liczy się to, czy klienci dzwonią i piszą, a nie liczba animacji. Dlatego dostajesz szybkie ładowanie, czytelną ofertę i widoczny numer telefonu zamiast efekciarstwa.",
      },
      {
        title: "Kod i dostępy zostają u Ciebie",
        body:
          "Domena, hosting i projekt są Twoje. Jeśli kiedyś zechcesz przejść do kogoś innego, zabierasz wszystko ze sobą — nie ma zamka na klucz.",
      },
    ],

    workHeading: "W czym mogę Ci pomóc",
    workBody:
      "Strona firmowa albo one page, sklep internetowy, blog lub platforma treści. Do tego automatyzacje i chatboty AI, proste systemy CRM, wizytówka Google Moja Firma i lokalne SEO, a po uruchomieniu hosting, aktualizacje i wsparcie techniczne. Wszystko załatwiasz w jednym miejscu, u tej samej osoby.",

    factsHeading: "W skrócie",
    factsLabels: {
      base: "Baza",
      since: "Działam od",
      reach: "Zasięg",
      contact: "Kontakt",
    },
    reachValue: "Mielec i całe Podkarpacie",

    ctaHeading: "Powiedz, czego potrzebuje Twoja firma",
    ctaBody:
      "Pierwsza rozmowa jest bezpłatna i do niczego nie zobowiązuje. Usłyszysz wprost, czy i jak mogę Ci pomóc.",
    ctaButton: "Zapytaj o wycenę",
    ctaSecondary: "Zobacz ofertę",
  },

  en: {
    seo: {
      title: "About — Oscar Grzywa, PROJSTOG Mielec",
      description:
        "Your website, built and maintained by one person from Mielec — from the first call to post-launch support. No agency, no middlemen, no passing your case along.",
    },
    breadcrumbHome: "Home",
    kicker: "Not an agency. One person from Mielec.",
    h1: "Oscar Grzywa",
    lead:
      "I run PROJSTOG on my own, so you have one contact for the whole project. You talk to me, the quote comes from me, I write the code, and I pick up the phone when something needs fixing after launch. At no point are you handed to an account manager or an unnamed subcontractor.",
    photoAlt: "Oscar Grzywa, owner of PROJSTOG",
    photoCaption: "Oscar Grzywa · PROJSTOG · Mielec",

    localHeading: "Your contractor is local. Most of the competition is far away.",
    localLead:
      "Search Google for web design anywhere in south-eastern Poland and check where the companies at the top are based. Almost none of them are in the region.",
    localPunchline:
      "These are firms serving Podkarpacie remotely, from an address several hundred kilometres away. I live and work in Mielec, so you can meet me in person.",
    localDetail:
      "For you, that means I come to the meeting, look at your premises or your work on site, and write your copy knowing the local market. I do not guess what things look like in Dębica, Tarnobrzeg or Kolbuszowa — I drive through them.",

    approachHeading: "How working together goes",
    approachPoints: [
      {
        title: "One contact, start to finish",
        body:
          "Brief, quote, design, launch and revisions — all with the same person. You never have to explain your business twice.",
      },
      {
        title: "Price agreed before we start",
        body:
          "The scope is written down first. You know what the figure covers and what is quoted separately — no surprise invoices halfway through.",
      },
      {
        title: "Your site exists to bring enquiries",
        body:
          "What counts is whether customers call and write, not the number of animations. So you get fast loading, a readable offer and a visible phone number instead of visual tricks.",
      },
      {
        title: "The code and the access stay yours",
        body:
          "Domain, hosting and project belong to you. If you ever want to move to someone else, you take everything with you — nothing is locked down.",
      },
    ],

    workHeading: "What I can help you with",
    workBody:
      "A company website or one-pager, an online store, a blog or content platform. Plus AI automation and chatbots, simple CRM systems, Google Business Profile and local SEO, and after launch: hosting, updates and technical support. You get it all in one place, from the same person.",

    factsHeading: "In short",
    factsLabels: {
      base: "Based in",
      since: "Working since",
      reach: "Coverage",
      contact: "Contact",
    },
    reachValue: "Mielec and the whole Podkarpackie region",

    ctaHeading: "Tell me what your business needs",
    ctaBody:
      "The first conversation is free and commits you to nothing. You will hear plainly whether and how I can help.",
    ctaButton: "Ask for a quote",
    ctaSecondary: "See the services",
  },
};

/** Zdjęcie właściciela. Wymiary podane wprost — `next/image` bez CLS. */
export const OWNER_PHOTO = {
  src: "/img/owner.jpg",
  width: 600,
  height: 600,
} as const;

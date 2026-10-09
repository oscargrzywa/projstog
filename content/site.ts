/**
 * Dane firmy — NAP (nazwa, adres, telefon).
 *
 * ⚠ To jest ŹRÓDŁO PRAWDY dla JSON-LD, stopki, strony kontaktu i sitemapy.
 * NAP musi być IDENTYCZNY tutaj, w wizytówce Google Moja Firma i w katalogach
 * firm. Rozjazd choćby w formacie telefonu osłabia sygnały lokalne.
 */

/**
 * Firma działa w Mielcu i Rzeszowie (decyzja właściciela, 2026-10-09).
 * Adres rejestrowy — z CEIDG — jest w Rzeszowie i to on trafia do JSON-LD.
 * Podstron miast nie ma (decyzja z 2026-09-29).
 */
const VOIVODESHIP = "podkarpackie";

export const SITE = {
  name: "PROJSTOG",
  /** Firma przedsiębiorcy — dokładnie jak w CEIDG. */
  legalName: "PROJSTOG Oscar Grzywa",
  owner: "Oscar Grzywa",
  nip: "8172228348",
  regon: "545844575",

  /** Miasta działania — do haseł i meta tagów. */
  cities: ["Mielec", "Rzeszów"],
  /** Etykieta „Mielec / Rzeszów" do treści. */
  citiesLabel: "Mielec / Rzeszów",

  /** Domena produkcyjna — baza dla canonical, OG i sitemapy. */
  url: "https://projstog.pl",

  email: "biuro@projstog.pl",

  /** Format do wyświetlenia. */
  phone: "+48 730 771 568",
  /** Format E.164 — do `tel:` i do JSON-LD. */
  phoneRaw: "+48730771568",

  /** Stałe miejsce wykonywania działalności — wg CEIDG. */
  address: {
    street: "ul. Jana i Jędrzeja Śniadeckich 20D/7",
    city: "Rzeszów",
    postalCode: "35-006",
    region: VOIVODESHIP,
    country: "PL",
  },

  /** Współrzędne adresu z CEIDG (OpenStreetMap). */
  geo: { latitude: 50.04112, longitude: 22.01601 },

  /** Godziny pracy — muszą zgadzać się z wizytówką Google Moja Firma. */
  hours: { opens: "09:00", closes: "17:00" },

  /**
   * Widełki cenowe. Konkurencja w regionie cen NIE podaje — jawny cennik
   * jest tu realną przewagą. ⚠ DO USTALENIA przez właściciela.
   */
  priceRange: "1500 PLN - 15000 PLN",

  /** Obszar obsługi — do `areaServed` w JSON-LD. */
  areaServed: [VOIVODESHIP],

  social: {
    facebook: "https://www.facebook.com/oscar.grzywa",
    instagram: "https://www.instagram.com/oscargrzywa",
    linkedin: "https://www.linkedin.com/in/oscar-grzywa",
  },
} as const;

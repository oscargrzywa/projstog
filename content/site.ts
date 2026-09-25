/**
 * Dane firmy — NAP (nazwa, adres, telefon).
 *
 * ⚠ To jest ŹRÓDŁO PRAWDY dla JSON-LD, stopki, strony kontaktu i sitemapy.
 * NAP musi być IDENTYCZNY tutaj, w wizytówce Google Moja Firma i w katalogach
 * firm. Rozjazd choćby w formacie telefonu osłabia sygnały lokalne.
 */

import { BASE_CITY, SERVED_VOIVODESHIPS } from "./cities";

export const SITE = {
  name: "PROJSTOG",
  legalName: "PROJSTOG Oscar Grzywa",
  owner: "Oscar Grzywa",

  /** Domena produkcyjna — baza dla canonical, OG i sitemapy. */
  url: "https://projstog.pl",

  email: "biuro@projstog.pl",

  /** Format do wyświetlenia. */
  phone: "+48 730 771 568",
  /** Format E.164 — do `tel:` i do JSON-LD. */
  phoneRaw: "+48730771568",

  address: {
    city: BASE_CITY.name,
    postalCode: "39-300",
    region: "podkarpackie",
    country: "PL",
    /**
     * ⚠ DO UZUPEŁNIENIA przed publikacją.
     * Jeśli firma nie przyjmuje klientów pod adresem, zostaw puste — wtedy
     * JSON-LD opisze ją jako działalność z obszarem obsługi (service area),
     * bez adresu ulicznego. Podawanie nieprawdziwego adresu jest niezgodne
     * z regulaminem Google Moja Firma.
     */
    street: "",
  },

  /**
   * Współrzędne siedziby (Mielec).
   * ⚠ DO WERYFIKACJI — Google zaleca min. 5 miejsc po przecinku.
   * Odczytać dokładne z wizytówki Google Moja Firma i wstawić tutaj.
   */
  geo: { latitude: 50.28751, longitude: 21.42389 },

  /** Godziny pracy — muszą zgadzać się z wizytówką Google Moja Firma. */
  hours: { opens: "09:00", closes: "17:00" },

  /**
   * Widełki cenowe. Konkurencja w regionie cen NIE podaje — jawny cennik
   * jest tu realną przewagą. ⚠ DO USTALENIA przez właściciela.
   */
  priceRange: "1500 PLN - 15000 PLN",

  /** Obszar obsługi — do `areaServed` w JSON-LD. */
  areaServed: SERVED_VOIVODESHIPS,

  social: {
    facebook: "https://www.facebook.com/oscar.grzywa",
    instagram: "https://www.instagram.com/oscargrzywa",
    linkedin: "https://www.linkedin.com/in/oscar-grzywa",
  },

  /** Rok startu działalności — do stopki i treści „O mnie". */
  foundedYear: 2022,
} as const;

/** Czy mamy pełny adres uliczny (wpływa na kształt JSON-LD). */
export const HAS_STREET_ADDRESS = SITE.address.street.length > 0;

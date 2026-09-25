/**
 * Opinie klientów.
 *
 * ⚠ To są PRAWDZIWE opinie z wizytówki Google, przeniesione ze starej strony
 * (`old_projstog/my-app/app/components/ReviewsSection.tsx`). Nazwiska i treść
 * pochodzą od realnych osób.
 *
 * ZASADY:
 *  - Nie dopisywać, nie skracać i nie „poprawiać" cudzych słów.
 *  - Nie dodawać opinii, których nie ma w wizytówce.
 *  - Nigdy nie podpisywać anonimowo („klient z Rzeszowa") — opinia bez
 *    nazwiska jest bezwartościowa jako dowód i wygląda na zmyśloną.
 *  - Treść zostaje po polsku również w wersji angielskiej. Tłumaczenie cudzej
 *    wypowiedzi zmienia jej słowa; zamiast tego oznaczamy język oryginału.
 *
 * ⚠ Nie budować z tego `aggregateRating` w danych strukturalnych — Google
 * nie pokazuje gwiazdek dla opinii, którymi zarządza opisywany podmiot.
 * Gwiazdki mają działać w wizytówce, nie w naszym JSON-LD.
 */

export type Review = {
  name: string;
  initials: string;
  stars: 1 | 2 | 3 | 4 | 5;
  text: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Michał Wałęga",
    initials: "MW",
    stars: 5,
    text: "Współpraca z Panem Oscarem była super. Kontakt był bardzo dobry, Pan Oscar był konkretny i bardzo zaangażowany, zawsze służył pomocą i dawał różne pomysły na stronę. Moja decyzja o wyborze właśnie jego oferty była trafiona – strona została zrobiona szybciej niż zakładaliśmy (miało być 2–3 tygodnie, a była gotowa w niespełna dwa) i od razu można jej używać. Jestem bardzo zadowolony.",
  },
  {
    name: "Katarzyna Kołek-Radłowska",
    initials: "KK",
    stars: 5,
    text: "Z pełnym przekonaniem polecam współpracę z biurem Projstog. Pan Oskar stworzył dla mnie stronę internetową, która jest nowoczesna, estetyczna i funkcjonalna. Kontakt z biurem był bezproblemowy i bardzo profesjonalny. Pan Oskar cierpliwie odpowiadał na każde moje pytanie.",
  },
  {
    name: "Agnieszka Flis",
    initials: "AF",
    stars: 5,
    text: "Fachowa, profesjonalna pomoc. Duża wiedza i szeroki zakres działania. Spełnione oczekiwania. Bardzo dobry kontakt i pomoc w każdym temacie. Profesjonalne doradztwo. POLECAM",
  },
  {
    name: "Marta Ziółkowska",
    initials: "MZ",
    stars: 5,
    text: "Polecam współpracę z tą firmą. Jakość usług zdecydowanie spełniła moje oczekiwania. Profesjonalne i terminowe podejście do sprawy.",
  },
  {
    name: "Mateusz Małek",
    initials: "MM",
    stars: 5,
    text: "Polecam. Osoba godna zaufania z ciekawymi pomysłami.",
  },
  {
    name: "Leśny Dwór",
    initials: "LD",
    stars: 5,
    text: "Bardzo miła i konkretna współpraca, polecam jak najbardziej.",
  },
];

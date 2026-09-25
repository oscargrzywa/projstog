# PROJSTOG 2.0

Rekonstrukcja strony **projstog.pl** — z one-pagera na profesjonalną stronę
wielostronicową, nastawioną przede wszystkim na **pozycjonowanie lokalne**.

---

## Struktura katalogów — ZASADA NADRZĘDNA

```
projstog_2.0/            <- root repo git, TUTAJ powstaje nowy projekt
├── old_projstog/        <- ARCHIWUM, tylko do odczytu
│   └── my-app/          <- stara strona (Next.js 16, one-pager)
└── <nowy projekt>
```

**`old_projstog/` jest folderem roboczym z wizualizacją starej strony.
NIE modyfikować niczego w środku — ma zostać dokładnie tak, jak było.**
Służy wyłącznie jako referencja: treści, komponenty, style, assety do przeniesienia.

Wszystkie nowe pliki powstają w `projstog_2.0/`.

## Repozytorium

- remote: `https://github.com/oscargrzywa/projstog.git`, branch `main`
- git root: `projstog_2.0/` (przeniesiony z `old_projstog/my-app` w commicie `2537d16`)

**Workflow: commitować i pushować na bieżąco** — po każdej samodzielnej całości
(`git add` → `git commit` z opisową wiadomością → `git push origin main`).
Nie czekać z commitem do końca sesji, nie pytać za każdym razem o zgodę.

Repo jest **publiczne** — nigdy nie commitować sekretów. Root `.gitignore`
blokuje `.env*`, `node_modules/`, buildy i artefakty `.playwright-mcp/`.

---

## Firma

**PROJSTOG** — jednoosobowa firma **Oscara Grzywy**.

| | |
|---|---|
| Lokalizacja | **Mielec, woj. podkarpackie, 39-300** |
| E-mail | biuro@projstog.pl |
| Telefon | +48 730 771 568 |
| Social | FB `oscar.grzywa`, IG `@oscargrzywa`, LinkedIn |

Pozycjonowanie: **„NIE AGENCJA. CZŁOWIEK Z MIELCA."** — jeden kontakt, bez
account managerów, jasna cena. Tagline z brand-concept: **„Strony, które zarabiają."**

Usługi: strony WWW (one page, firmowe, sklepy WooCommerce, blogi), automatyzacje
AI (Make/n8n/OpenAI), chatboty, CRM, aplikacje Next.js, Google Moja Firma /
lokalne SEO, social media, copywriting, hosting i wsparcie.

---

## Cel przebudowy

1. **Gruntowna rekonstrukcja** — nie refaktor starej strony, tylko projekt od nowa.
2. **Wielostronicowość** — realne route'y zamiast kotwic `#hash`.
3. **Nowoczesny klimat** połączony z **mocną pozycją na rynku lokalnym**.
   Estetyka ma być współczesna, ale nie kosztem SEO — treść musi być
   renderowana serwerowo i indeksowalna.
4. **Cel biznesowy wprost od właściciela:** strona ma wygrywać z lokalną
   konkurencją w całej okolicy — lepszą stroną i lepszym SEO.

### Decyzje architektoniczne (ustalone)

| Obszar | Decyzja |
|---|---|
| Zasięg | Mielec jako baza + 21 miast regionu, docelowo **znacznie więcej** |
| Oferta | Produkt wiodący „Profit Site" + 4 kategorie usług |
| Języki | PL bez prefiksu + EN pod `/en/...`, `hreflang`, serwerowo |
| Wizualia | Restart — zostaje tylko paleta i logo z brand-concept |
| Blog | **Tak** — pełna sekcja, filar strategii SEO |

### Mapa route'ów

```
/                                   strona główna
/oferta                             Profit Site na czele
/oferta/strony-i-sklepy
/oferta/sztuczna-inteligencja
/oferta/marketing-i-widocznosc
/oferta/opieka-i-wsparcie
/realizacje            /realizacje/[slug]
/blog                  /blog/[slug]
/strony-internetowe/[miasto]        22 podstrony lokalizacyjne
/o-mnie   /kontakt   /polityka-prywatnosci
```

Routing i18n: drzewo pod `app/[lang]/`, foldery mają **polskie slugi**,
publiczne angielskie URL-e mapuje `proxy.ts` (w Next 16 middleware nazywa się
**proxy**). PL jest przepisywany (rewrite) na `/pl/...` bez zmiany paska adresu.

### Pozycjonowanie lokalne — priorytet nr 1

Stara strona miała pod to zerowe fundamenty. Nowa musi mieć:

- Server Components dla treści (stara strona miała `"use client"` na `page.tsx` —
  to główny dług SEO, nie powtarzać tego błędu)
- `metadataBase`, `openGraph`, `alternates.canonical` + `alternates.languages`
- `sitemap.ts` i `robots.ts` (stary `robots.txt` obiecywał sitemapę, której nie było)
- **JSON-LD `LocalBusiness`** z adresem, telefonem, godzinami, `areaServed`
- spójność NAP (nazwa, adres, telefon) z wizytówką Google Moja Firma
- **blog** budujący topical authority

### Miasta — `content/cities.ts`

22 miasta na start, model danych przygotowany na rozbudowę: dodanie miasta
= dopisanie wpisu do `CITIES`, route generuje się sam przez `generateStaticParams`.

Rdzeń (`tier: "core"`): Mielec (siedziba), Rzeszów, Tarnów, Dębica, Tarnobrzeg,
Stalowa Wola, Sandomierz, Łańcut.
Rozszerzenie (`tier: "extended"`): Ropczyce, Sędziszów Młp., Nisko, Kolbuszowa,
Nowa Dęba, Staszów, Połaniec, Bochnia, Brzesko, Dąbrowa Tarnowska,
Głogów Młp., Boguchwała, Tyczyn, Sokołów Młp.

> **⚠ Ryzyko „doorway pages".** Zestaw podstron różniących się wyłącznie nazwą
> miasta to praktyka karana przez Google. Każdy wpis w `CITIES` ma własne,
> ręcznie napisane `intro` i `localContext` — **nigdy nie generować tych pól
> z szablonu przez podmianę nazwy miasta.**
>
> Pola `distanceKm` i `population` są przybliżone i **wymagają weryfikacji
> przed publikacją** — nie opierać na nich twardych deklaracji w treści.

## Realizacje (portfolio)

**Nowe do dodania:** `finanseszelagowski.pl`, `apartsea.pl`, `mojagruzja.pl`, `landrew.pl`

**Zostawić ze starych:** `luksusowyogrod.pl`, `kaszaubezpieczenia.pl`

**Usunąć:** Luxury Car Care, Drzewka Wałęga, Meble Antek, Eko-Stal Mielec

Docelowo 6 realizacji. Screenshoty starych leżą w
`old_projstog/my-app/public/img/portfolio/` (stara strona ich nie używała —
renderowała sztuczny wireframe `BrowserMock`).

---

## Design system (z `docs/brand-concept.md`)

```
--bg-primary   #060807   obsydian, tło główne
--bg-card      #0e130e
--green-mid    #1B9D17   Signal Green — kolor bazowy
--green-bright #34E12E   Voltage — akcenty „live"
--text-bone    #ECE7DD   Bone
--text-muted   #6b8068
```

Typografia wg brand-concept: **Clash Display / Satoshi / Space Mono**.
Uwaga: stara strona używała Geist — czyli **nie zgadzała się z własnym specem**.

Rytm 4px, radii 10/16px, elevation „hairline-and-glow", znak „rising-stack / stóg".
Strona jest **wyłącznie ciemna** — brak trybu jasnego.

## Czego NIE powtarzać ze starej strony

- `"use client"` na stronach z treścią — zabija SEO
- **scroll-jacking** (`ServicesSection` przechwytywał `wheel`, `ProcessSection`
  miał `400vh` i był ukryty na mobile) — szkodzi UX i dostępności
- 842 linie globalnego CSS-u z `!important` nadpisującym inline style
- kolory wpisane na sztywno setki razy zamiast tokenów
- i18n trzymane wyłącznie w stanie React (brak URL, brak `hreflang`,
  `<html lang>` zawsze `pl`) — przy multipage wymaga decyzji: `/[locale]` albo rezygnacja z EN
- martwy kod: nieużywane stałe i ikony zalegające po refaktorach

---

## Wnioski z badania rynku (wrzesień 2026)

### Gdzie jest przewaga

**Cała konkurencja rankująca na Podkarpaciu siedzi poza regionem.** Firmy
powtarzające się w TOP10 dla wielu miast mają siedziby w Sochaczewie, Pile,
Czechowicach-Dziedzicach, Krakowie i na Podlasiu. Większość to farmy podstron
lokalizacyjnych — jedna z nich ma szacunkowo 1800–2300 podstron miejskich
z identycznym cennikiem i FAQ.

Z tego wynikają cztery przewagi do wyeksponowania:

1. **Realny adres w Mielcu** — nie do skopiowania przez farmy. Eksponować
   wysoko, nie w stopce.
2. **Jawny cennik** — większość konkurencji cen nie podaje.
3. **Case studies z konkretami** — lokalni konkurenci pokazują wyłącznie
   logotypy bez żadnych danych.
4. **Poprawne polskie nazwy miast** — konkurencja myli Głogów Małopolski
   z dolnośląskim, Sokołów Małopolski z Podlaskim, Tyczyn z Tychami,
   a jedna strona ma URL `/polancu/` zamiast Połańca.

### Kolejność zdobywania miast

Od najsłabszej konkurencji, nie od największych miast — patrz `PHASE_1/2/3`
w `content/cities.ts`. Rzeszów, Sandomierz i Łańcut na sam koniec: to jedyne
miasta z realnymi lokalnymi graczami.

### Twarde zasady SEO — wynikają z dokumentacji Google

| Zasada | Powód |
|---|---|
| **Nie publikować 22 podstron miast naraz** | Wzorzec „scaled content abuse". Stąd etapowanie |
| **Żadnego bloku „obsługujemy także: [22 miasta]"** | Google wymienia to wprost w polityce keyword stuffing |
| **Nigdy `PostalAddress` z adresem Mielca na stronie innego miasta** | Wprowadzanie w błąd, ryzyko ręcznej kary |
| **`LocalBusiness` + `Organization`, nie `ProfessionalService`** | schema.org wycofało ten typ |
| **Bez `aggregateRating` na własnej stronie** | Google nie pokazuje gwiazdek dla opinii kontrolowanych przez opisywany podmiot |
| **Bez `nosnippet` i `max-snippet:0`** | Wykluczają z AI Overviews |
| **Nie blokować `GPTBot` / `ClaudeBot` / `Google-Extended`** | To dziś realny kanał pozyskiwania klientów |
| **Każda strona miasta linkuje do usług, nie tylko do kontaktu** | Inaczej wpada w „test funnela" na doorway |
| **Hub `/strony-internetowe` ↔ miasta, dwukierunkowo** | Google wymaga „clearly defined, browseable hierarchy" |
| **`lastModified` w sitemapie tylko prawdziwe** | Fałszywe daty podważają zaufanie do całej sitemapy |
| **Pominąć `priority` i `changefreq`** | Google ich nie używa |

### Czego NIE robić

- **Wirtualne biuro** dla wejścia do Local Packa innego miasta — wprost
  zakazane w regulaminie Google Moja Firma, grozi zawieszeniem wizytówki.
- **Review gating** (filtrowanie: zadowolony → Google, niezadowolony →
  formularz) — zakazane. Od kwietnia 2026 zakazane jest też proszenie
  o wymienienie konkretnej osoby z imienia i stawianie pracownikom limitów opinii.
- **Pakiety „100 katalogów"** — martwe domeny generujące rozjazdy NAP.
  Wystarczy 6 miejsc zrobionych porządnie, z identycznym formatem danych.
- **`llms.txt` jako priorytet** — Google go nie używa i potwierdziło to wprost.

### Realistyczne oczekiwania

Są **dwa osobne rankingi**. Podstrony miast walczą o wyniki **organiczne** —
i tam mogą wygrać. W **Local Packu / Mapach** bez adresu w danym mieście
realnie się nie wejdzie; tam gramy o Mielec i najbliższą okolicę.
Mylenie tych dwóch rzeczy to źródło rozczarowań.

### Otwarta rekomendacja: wersja EN

Badanie sugeruje **odłożenie publikacji EN** — przy rynku podkarpackim
podwaja pracę przy każdej treści i rozprasza wysiłek. Architektura i18n jest
już gotowa i nic nie kosztuje, więc decyzja dotyczy wyłącznie momentu
publikacji. Do ustalenia z właścicielem.

## Praca

- **Subagenci** — używać tam, gdzie realnie pomagają: równoległe niezależne
  zadania, szerokie przeszukiwanie kodu, research. Nie forsować przy prostych zmianach.
- **Next.js** — `old_projstog/my-app/AGENTS.md` ostrzega: „This is NOT the Next.js
  you know". Przy nowej wersji Next czytać docs z `node_modules/next/dist/docs/`
  zamiast polegać na pamięci.
- **Język odpowiedzi do użytkownika: polski.**

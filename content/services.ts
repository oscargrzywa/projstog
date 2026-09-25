/**
 * Oferta — 4 kategorie usług.
 *
 * ⚠ `slug` kategorii musi być zgodny z `ServiceCategorySlug` ORAZ z kluczami
 * `SEGMENTS` w `lib/routes.ts` — z nich powstają route'y `/oferta/[kategoria]`.
 *
 * Slugi pojedynczych usług są celowo POLSKIE w obu językach: nie mają własnych
 * route'ów, służą jako identyfikatory i kotwice, więc muszą się zgadzać między
 * wersjami językowymi, żeby przełącznik języka trafiał w to samo miejsce.
 */

import type { Locale } from "@/lib/routes";
import type { ServiceCategory } from "@/lib/cms/types";

export const SERVICE_CATEGORIES: Record<Locale, ServiceCategory[]> = {
  pl: [
    {
      slug: "strony-i-sklepy",
      title: "Strony i sklepy internetowe",
      lead:
        "Strona to najczęściej pierwsze miejsce, w którym ktoś sprawdza, czy " +
        "warto do Ciebie zadzwonić. Robię takie, które ładują się szybko, " +
        "dobrze wyglądają na telefonie i mówią jasno, co oferujesz. Piszę kod " +
        "sam, więc wiesz, kto odbierze telefon, gdy trzeba coś poprawić.",
      services: [
        {
          slug: "strona-one-page",
          title: "Strona one page",
          summary:
            "Jedna strona, jeden cel: żeby ktoś zadzwonił albo wypełnił " +
            "formularz. Dobra dla firm usługowych, freelancerów i kampanii.",
          bullets: [
            "Treść, sekcje i formularz ustalone przed startem — bez dopisywania w trakcie",
            "Ładowanie poniżej sekundy i pełna czytelność na telefonie",
            "Podstawy SEO: tytuły, opisy, dane firmy podane Google wprost",
            "Live w 14 dni w ramach pakietu Profit Site",
          ],
        },
        {
          slug: "strona-firmowa",
          title: "Strona firmowa",
          summary:
            "Kilka albo kilkanaście podstron: oferta, realizacje, o firmie, " +
            "kontakt. Dla firm, które mają więcej do pokazania niż jeden ekran.",
          bullets: [
            "Osobna podstrona pod każdą usługę — Google ocenia je niezależnie",
            "Panel do samodzielnej edycji treści, jeśli chcesz pisać sam",
            "Teksty pisane pod Twoich klientów, nie przeklejone z szablonu",
            "Struktura przygotowana na dokładanie kolejnych podstron",
          ],
        },
        {
          slug: "sklep-internetowy",
          title: "Sklep internetowy",
          summary:
            "Sklep na WooCommerce z płatnościami, wysyłką i fakturami. " +
            "Prowadzisz go sam, bez dzwonienia do mnie przy każdej zmianie ceny.",
          bullets: [
            "Płatności online (BLIK, przelewy, karty) i integracja z kurierami",
            "Panel do produktów, stanów magazynowych i zamówień",
            "Faktury i maile potwierdzające wysyłane automatycznie po zakupie",
            "Nagrane szkolenie z obsługi — możesz do niego wrócić w każdej chwili",
          ],
        },
        {
          slug: "blog-i-platforma-tresci",
          title: "Blog i platforma treści",
          summary:
            "Sekcja bloga albo cały portal z panelem redakcyjnym. Dla firm, " +
            "które chcą, żeby Google przysyłał im klientów przez lata.",
          bullets: [
            "Kategorie i tagi zaplanowane pod to, czego klienci naprawdę szukają",
            "Pisanie i publikowanie bez dotykania kodu",
            "Mapa strony i dane strukturalne generowane automatycznie",
            "Zapis na newsletter i powiązane wpisy pod każdym artykułem",
          ],
        },
      ],
      seo: {
        title: "Strony internetowe i sklepy — Mielec | PROJSTOG",
        description:
          "Strony one page, strony firmowe, sklepy WooCommerce i blogi. " +
          "Projektuję i koduję sam, w Mielcu, dla firm z Podkarpacia. " +
          "Stała cena ustalana przed startem.",
      },
    },

    {
      slug: "sztuczna-inteligencja",
      title: "Sztuczna inteligencja i automatyzacje",
      lead:
        "Większość małych firm traci kilka godzin tygodniowo na przepisywaniu " +
        "tego samego ze skrzynki do arkusza. Tę część da się oddać maszynie. " +
        "Ustawiam automatyzacje, chatboty i proste systemy, które robią nudną " +
        "robotę w tle, a Ty zajmujesz się klientami.",
      services: [
        {
          slug: "automatyzacje-ai",
          title: "Automatyzacje w firmie",
          summary:
            "Łączę narzędzia, których już używasz, tak żeby przekazywały sobie " +
            "dane bez Ciebie w środku. Formularz, mail, arkusz, faktura — " +
            "jeden ciąg zamiast pięciu kliknięć.",
          bullets: [
            "Make albo n8n jako silnik — po Twojej stronie zero kodu",
            "Zapytanie z formularza trafia od razu do arkusza, skrzynki i kalendarza",
            "Modele OpenAI tam, gdzie trzeba coś streścić, posegregować albo wstępnie odpisać",
            "Proces rozpisany na kartce, zanim cokolwiek włączę — widzisz, co się zmieni",
          ],
        },
        {
          slug: "chatboty-ai",
          title: "Chatboty AI",
          summary:
            "Asystent na stronie albo na Messengerze, który odpowiada klientom " +
            "w nocy i w weekend. Nauczony na Twoich materiałach, nie na ogólnikach.",
          bullets: [
            "Baza wiedzy zbudowana z Twojej oferty, cennika i najczęstszych pytań",
            "Zbiera kontakt i przekazuje rozmowę do Ciebie, gdy pytanie jest trudne",
            "Zapisy rozmów — widzisz, o co klienci naprawdę pytają",
            "Ograniczenie tematów, żeby bot nie zmyślał poza swoją działką",
          ],
        },
        {
          slug: "systemy-crm",
          title: "Systemy CRM",
          summary:
            "Jedno miejsce, w którym widać wszystkie zapytania i wiadomo, co " +
            "dalej z każdym. Zamiast notatek w telefonie i maili, które przepadły.",
          bullets: [
            "Lejek ułożony pod to, jak naprawdę prowadzisz sprzedaż",
            "Przypomnienia o kontakcie, żeby żadne zapytanie nie wystygło",
            "Zapytania ze strony i z telefonu wpadają same",
            "Prosty podgląd: ile zapytań, ile ofert, ile domkniętych",
          ],
        },
        {
          slug: "aplikacje-na-zamowienie",
          title: "Aplikacje na zamówienie",
          summary:
            "Narzędzie zbudowane pod jeden Twój proces: kalkulator wyceny, " +
            "panel klienta, system rezerwacji. Wtedy, gdy gotowce nie pasują.",
          bullets: [
            "Next.js i TypeScript — to samo, na czym stoi ta strona",
            "Zakres i etapy spisane przed startem, płatność po etapach",
            "Na telefonie działa tak samo jak na komputerze",
            "Kod zostaje u Ciebie — nie jesteś do mnie przywiązany",
          ],
        },
      ],
      seo: {
        title: "Automatyzacje AI, chatboty i CRM — Mielec | PROJSTOG",
        description:
          "Automatyzacje w Make i n8n, chatboty odpowiadające klientom po " +
          "godzinach, proste systemy CRM i aplikacje na zamówienie. " +
          "Robi je jedna osoba z Mielca.",
      },
    },

    {
      slug: "marketing-i-widocznosc",
      title: "Marketing i widoczność",
      lead:
        "Najlepsza strona nic nie da, jeśli nikt na nią nie trafi. Zajmuję się " +
        "tym, żeby firma była widoczna tam, gdzie klienci naprawdę szukają — " +
        "w mapach Google, w wynikach wyszukiwania i w social mediach. Bez " +
        "kampanii na oślep i bez raportów, których nikt nie czyta.",
      services: [
        {
          slug: "google-moja-firma",
          title: "Google Moja Firma i lokalne SEO",
          summary:
            "Dla lokalnej firmy wizytówka w Google bywa ważniejsza od samej " +
            "strony. Ustawiam ją tak, żeby pokazywała się ludziom z okolicy.",
          bullets: [
            "Wizytówka uzupełniona do końca: kategorie, obszar obsługi, godziny, zdjęcia",
            "Te same dane firmy na stronie, w wizytówce i w katalogach",
            "Dane strukturalne LocalBusiness na stronie, żeby Google nie zgadywał",
            "Ustalony sposób zbierania opinii i odpowiadania na nie",
          ],
        },
        {
          slug: "social-media",
          title: "Social media",
          summary:
            "Prowadzenie profili na Facebooku, Instagramie i LinkedIn: plan, " +
            "posty, grafiki. Dla firm, które wiedzą, że powinny tam być, ale " +
            "nie mają na to głowy.",
          bullets: [
            "Plan publikacji na miesiąc, zatwierdzany z góry",
            "Posty i grafiki spójne ze stroną, nie ściągnięte z szablonu",
            "Materiał z tego, co masz — zdjęcia z realizacji zamiast stocków",
            "Odpowiadanie na komentarze i wiadomości, jeśli tego potrzebujesz",
          ],
        },
        {
          slug: "copywriting",
          title: "Copywriting",
          summary:
            "Teksty na stronę, do oferty, do maila i na social media. Piszę po " +
            "polsku, Twoim tonem, tak żeby klient wiedział, co dostaje i ile to kosztuje.",
          bullets: [
            "Rozmowa o tym, jak mówisz do klientów, zanim napiszę pierwsze zdanie",
            "Opisy usług pod realne pytania, nie pod listę fraz",
            "Oferty i maile, które nie brzmią jak wzór ściągnięty z internetu",
            "Dwie rundy poprawek w cenie",
          ],
        },
      ],
      seo: {
        title: "Google Moja Firma i lokalne SEO — Mielec | PROJSTOG",
        description:
          "Wizytówka Google, lokalne SEO, social media i teksty, które " +
          "sprzedają. Pomagam firmom z Mielca, Rzeszowa i okolic pokazać się " +
          "tam, gdzie szukają klienci.",
      },
    },

    {
      slug: "opieka-i-wsparcie",
      title: "Opieka i wsparcie",
      lead:
        "Strona nie jest projektem, który kończy się w dniu publikacji. Trzeba " +
        "ją aktualizować, pilnować kopii i reagować, gdy coś przestanie " +
        "działać. Biorę to na siebie, żebyś nie musiał logować się do żadnego panelu.",
      services: [
        {
          slug: "hosting-i-administracja",
          title: "Hosting i administracja",
          summary:
            "Hosting, domena, certyfikat SSL, aktualizacje i kopie zapasowe w " +
            "jednym miejscu. Jedna faktura zamiast trzech loginów do trzech firm.",
          bullets: [
            "Hosting dobrany pod to, czego strona naprawdę potrzebuje",
            "Automatyczne kopie zapasowe i szybkie przywrócenie po awarii",
            "Odnawianie domeny i certyfikatu pilnowane po mojej stronie",
            "Aktualizacje sprawdzane na kopii, zanim trafią na żywo",
          ],
        },
        {
          slug: "wsparcie-techniczne",
          title: "Wsparcie techniczne",
          summary:
            "Coś się zepsuło albo trzeba dziś zmienić treść — piszesz do mnie " +
            "bezpośrednio. Bez systemu zgłoszeń i bez czekania na przydzielenie opiekuna.",
          bullets: [
            "Mail albo telefon, zawsze do tej samej osoby",
            "Drobne zmiany w treści i zdjęciach w ramach opieki",
            "Znam Twój projekt od pierwszej linijki kodu — nie muszę się wdrażać",
            "Jasne zasady: co wchodzi w abonament, a co wyceniam osobno",
          ],
        },
      ],
      seo: {
        title: "Hosting, opieka nad stroną i wsparcie | PROJSTOG Mielec",
        description:
          "Hosting, SSL, kopie zapasowe, aktualizacje i szybka pomoc, gdy coś " +
          "przestanie działać. Opiekę nad stroną prowadzi ta sama osoba, " +
          "która ją zbudowała.",
      },
    },
  ],

  en: [
    {
      slug: "strony-i-sklepy",
      title: "Websites and online stores",
      lead:
        "Your website is usually the first place someone checks before deciding " +
        "whether to call you. I build sites that load fast, read well on a " +
        "phone and say plainly what you do. I write the code myself, so you " +
        "always know who picks up when something needs fixing.",
      services: [
        {
          slug: "strona-one-page",
          title: "One-page website",
          summary:
            "A single page built around one action: a phone call or a filled-in " +
            "form. It suits service businesses, freelancers and ad campaigns.",
          bullets: [
            "Content, sections and form agreed up front — nothing bolted on later",
            "Loads in under a second and stays readable on a phone",
            "Search basics covered: titles, descriptions, business data for Google",
            "Live in 14 days as part of the Profit Site package",
          ],
        },
        {
          slug: "strona-firmowa",
          title: "Company website",
          summary:
            "Several pages — services, work, about, contact — for businesses " +
            "with more to show than fits on a single screen.",
          bullets: [
            "A separate page per service, so Google can rank each one on its own",
            "An editing panel if you want to update the text yourself",
            "Copy written for your customers, not lifted from a template",
            "A structure that takes new pages as the business grows",
          ],
        },
        {
          slug: "sklep-internetowy",
          title: "Online store",
          summary:
            "A WooCommerce store with payments, shipping and invoicing. You run " +
            "it day to day without calling me every time a price changes.",
          bullets: [
            "Online payments (cards, bank transfers, BLIK) and courier integrations",
            "A panel for products, stock levels and orders",
            "Invoices and confirmation emails sent automatically after checkout",
            "A recorded handover session you can go back to any time",
          ],
        },
        {
          slug: "blog-i-platforma-tresci",
          title: "Blog and content platform",
          summary:
            "A blog section or a full editorial site with its own panel. For " +
            "businesses that want Google sending them customers for years.",
          bullets: [
            "Categories and tags planned around what customers actually search for",
            "Writing and publishing without touching any code",
            "Sitemap and structured data generated for you",
            "Newsletter sign-up and related posts under every article",
          ],
        },
      ],
      seo: {
        title: "Websites and Online Stores — PROJSTOG, Mielec",
        description:
          "One-page sites, company websites, WooCommerce stores and blogs, " +
          "designed and coded by one person in Mielec, Poland. " +
          "Fixed price agreed before we start.",
      },
    },

    {
      slug: "sztuczna-inteligencja",
      title: "Artificial intelligence and automation",
      lead:
        "Most small businesses lose a few hours a week retyping the same data " +
        "from an inbox into a spreadsheet. That part can be handed to a " +
        "machine. I set up automations, chatbots and small internal systems so " +
        "the dull work runs in the background while you deal with customers.",
      services: [
        {
          slug: "automatyzacje-ai",
          title: "Business automation",
          summary:
            "I connect the tools you already use so they pass data to each " +
            "other without you in the middle. Form, email, spreadsheet, " +
            "invoice — one chain instead of five clicks.",
          bullets: [
            "Make or n8n under the hood, so there is no code on your side",
            "An enquiry lands in your spreadsheet, inbox and calendar at once",
            "OpenAI models where something needs summarising, sorting or drafting",
            "The process gets mapped out on paper before anything is switched on",
          ],
        },
        {
          slug: "chatboty-ai",
          title: "AI chatbots",
          summary:
            "An assistant on your site or Messenger that answers customer " +
            "questions at night and at weekends. Trained on your own material, " +
            "not on generic filler.",
          bullets: [
            "A knowledge base built from your offer, pricing and common questions",
            "Collects contact details and hands the conversation to you when a question gets hard",
            "Chat transcripts show what customers are really asking about",
            "Topic limits, so the bot does not invent answers outside its remit",
          ],
        },
        {
          slug: "systemy-crm",
          title: "CRM systems",
          summary:
            "One place where every enquiry is visible and you know what happens " +
            "next with each one. No more notes in your phone and emails that vanish.",
          bullets: [
            "A pipeline shaped around how you actually sell",
            "Follow-up reminders, so no enquiry goes cold",
            "Enquiries from the website and the phone arrive on their own",
            "A plain view of how many enquiries, quotes and closed deals you have",
          ],
        },
        {
          slug: "aplikacje-na-zamowienie",
          title: "Custom applications",
          summary:
            "A tool built around one of your processes: a quote calculator, a " +
            "client portal, a booking system. For when off-the-shelf software " +
            "does not fit.",
          bullets: [
            "Next.js and TypeScript — the same stack this site runs on",
            "Scope and milestones written down first, payment per milestone",
            "Works the same on a phone as on a desktop",
            "You keep the code, so you are never locked in to me",
          ],
        },
      ],
      seo: {
        title: "AI Automation, Chatbots and CRM — PROJSTOG",
        description:
          "Automations in Make and n8n, chatbots that answer after hours, " +
          "simple CRM systems and custom apps — built by one developer based " +
          "in Mielec, Poland.",
      },
    },

    {
      slug: "marketing-i-widocznosc",
      title: "Marketing and visibility",
      lead:
        "The best website in the world does nothing if nobody finds it. My job " +
        "here is to put your business where customers are already looking — " +
        "Google Maps, search results and social feeds. No scattergun campaigns " +
        "and no reports nobody reads.",
      services: [
        {
          slug: "google-moja-firma",
          title: "Google Business Profile and local SEO",
          summary:
            "For a local business, the Google listing often matters more than " +
            "the website itself. I set it up so it shows to people searching nearby.",
          bullets: [
            "The listing filled in properly: categories, service area, hours, photos",
            "The same business details on the site, in the listing and in directories",
            "LocalBusiness structured data on the site, so Google is not guessing",
            "A working routine for collecting reviews and replying to them",
          ],
        },
        {
          slug: "social-media",
          title: "Social media",
          summary:
            "Running your Facebook, Instagram and LinkedIn profiles: plan, " +
            "posts, graphics. For businesses that know they should be there but " +
            "have no time for it.",
          bullets: [
            "A monthly posting plan you approve in advance",
            "Posts and graphics that match your website, not a stock template",
            "Material made from what you have — real job photos instead of stock images",
            "Replies to comments and messages, if you want that covered too",
          ],
        },
        {
          slug: "copywriting",
          title: "Copywriting",
          summary:
            "Text for your site, your offers, your emails and your social " +
            "posts. Written so a customer knows what they get and roughly what it costs.",
          bullets: [
            "A conversation about how you talk to customers before I write a word",
            "Service descriptions built around real questions, not keyword lists",
            "Offers and emails that do not read like a downloaded template",
            "Two rounds of revisions included",
          ],
        },
      ],
      seo: {
        title: "Local SEO, Social Media and Copywriting — PROJSTOG",
        description:
          "Google Business Profile, local SEO, social media and copy that " +
          "sells. I help firms around Mielec and Rzeszów show up where their " +
          "customers are looking.",
      },
    },

    {
      slug: "opieka-i-wsparcie",
      title: "Care and support",
      lead:
        "A website is not a project that ends on launch day. It needs updates, " +
        "backups and someone to react when something stops working. I take that " +
        "off your hands, so you never have to log into a control panel.",
      services: [
        {
          slug: "hosting-i-administracja",
          title: "Hosting and administration",
          summary:
            "Hosting, domain, SSL certificate, updates and backups in one " +
            "place. One invoice instead of three logins to three providers.",
          bullets: [
            "Hosting chosen for what the site actually needs",
            "Automatic backups and a quick restore when something breaks",
            "Domain and certificate renewals tracked on my side",
            "Updates tested on a copy before they go live",
          ],
        },
        {
          slug: "wsparcie-techniczne",
          title: "Technical support",
          summary:
            "Something broke, or the text has to change today — you message me " +
            "directly. No ticket system and no waiting to be assigned an account manager.",
          bullets: [
            "Email or phone, always the same person",
            "Small text and image changes included in the plan",
            "I know your project from its first line of code, so there is no ramp-up",
            "Clear rules about what the plan covers and what I quote separately",
          ],
        },
      ],
      seo: {
        title: "Hosting, Website Care and Support — PROJSTOG",
        description:
          "Hosting, SSL, backups, updates and fast help when something stops " +
          "working. Your site is looked after by the same person who built it, " +
          "based in Mielec.",
      },
    },
  ],
};

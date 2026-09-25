export type Lang = "pl" | "en";

export const content = {
  pl: {
    nav: {
      links: [
        { label: "Usługi",     href: "#uslugi" },
        { label: "Realizacje", href: "#portfolio" },
        { label: "O mnie",    href: "#o-mnie" },
        { label: "Kontakt",   href: "#kontakt" },
      ],
      cta: "Wycena",
      phone: "+48 730 771 568",
    },
    hero: {
      chips: ["PRZYJMUJĘ PROJEKTY", "AGENCJA INTERAKTYWNA", "MIELEC, PODKARPACIE"],
      h1a: "Cyfrowe rozwiązania,",
      h1b: "które zarabiają dla Ciebie.",
      sub: "Tworzę strony, sklepy i systemy AI dla firm z całej Polski. Więcej klientów online — mniej pracy ręcznej.",
      cta1: "Bezpłatna wycena",
      cta2: "Zobacz realizacje",
      stats: [
        ["14+",  "Usług cyfrowych"],
        ["30+",  "Projektów online"],
        ["<24h", "Czas odpowiedzi"],
      ] as [string, string][],
      ticker: [
        "Strony One Page", "Sklepy Internetowe", "Automatyzacje AI", "Chatboty AI",
        "Systemy CRM", "Google Moja Firma", "Social Media", "Copywriting",
        "Strony Firmowe", "Wsparcie Techniczne", "Blog & Content", "Indywidualne Aplikacje",
      ],
      gadgets: {
        lead:   { label: "+1 Nowy lead",   sub: "Właśnie teraz · Formularz" },
        google: { label: "+340% Google",   sub: "Ruch organiczny · 3 miesiące" },
        ai:     { label: "AI Chatbot",     sub: "Online · Odpowiada za Ciebie" },
        live:   { label: "Live w 14 dni",  sub: "Gwarantowany termin startu" },
      },
    },
    services: {
      label: "Pełny zakres usług",
      h2: "Co zyskujesz współpracując z PROJSTOG",
      sub: "Każda usługa ma jeden cel — żebyś zarabiał więcej, tracił mniej czasu i nie martwił się technologią.",
      categories: [
        {
          label: "Obecność w sieci",
          services: [
            { title: "Strona One Page",         desc: "Twoi klienci szukają Cię w Google — ta strona sprawi, że Cię znajdą i zadzwonią. Gotowa w 7 dni, zoptymalizowana pod lokalne SEO, nastawiona na jeden cel: zapytania od nowych klientów.", tags: ["Mobile-first", "SEO", "Szybka realizacja"] },
            { title: "Strona firmowa",           desc: "Zanim klient zadzwoni, sprawdza Twoją stronę. Jeśli znajdzie profesjonalną prezentację oferty i zaufa temu, co zobaczy — zadzwoni. Twoja strona pracuje na Ciebie 24 godziny na dobę.", tags: ["Wielostronicowa", "CMS", "Copywriting"] },
            { title: "Sklep internetowy",        desc: "Sprzedawaj gdy śpisz. Sklep z intuicyjnym koszykiem, szybką płatnością i automatycznym procesem zamówień — klient kupuje sam, bez Twojego udziału i bez pytań na Messengerze.", tags: ["WooCommerce", "Płatności online", "Magazyn"] },
            { title: "Blog & platforma treści",  desc: "Każdy wpis na blogu to nowy klient znaleziony w Google bez płacenia za reklamy. Po roku regularnego contentu Twoja strona staje się maszyną generującą darmowy ruch przez lata.", tags: ["SEO-content", "CMS", "Newsletter"] },
          ],
        },
        {
          label: "Sztuczna inteligencja",
          services: [
            { title: "Automatyzacje AI w firmach", desc: "Ile godzin tygodniowo tracisz na faktury, e-maile i raporty? Te procesy można zautomatyzować — AI zrobi to za Ciebie, a Ty skupisz się wyłącznie na tym, co przynosi pieniądze.", tags: ["Make / N8N", "OpenAI", "Bez kodu"] },
            { title: "Chatboty AI",                desc: "Klient pisze o 23:00 z pytaniem o ofertę — chatbot odpowiada, kwalifikuje zapytanie i zapisuje go do kalendarza. Rano wstajesz z gotowym leadem zamiast z nieodebranym pytaniem.", tags: ["GPT-4", "Obsługa 24/7", "Integracja"] },
            { title: "Systemy CRM",                desc: "Koniec z szukaniem kto, co i kiedy. Widzisz każdego klienta, na jakim etapie jest rozmowa i co musisz zrobić dziś — zamiast wyciągać to z pamięci, Excela i skrzynki mailowej jednocześnie.", tags: ["Pipeline", "Automatyzacja", "Raporty"] },
            { title: "Indywidualne aplikacje",     desc: "Twój proces jest unikalny i gotowe narzędzia do niego nie pasują. Projektuję aplikacje szyte pod konkretny workflow: kalkulator wycen, panel klienta, platforma rezerwacji online.", tags: ["Custom", "Next.js", "Na zamówienie"] },
          ],
        },
        {
          label: "Marketing & Widoczność",
          services: [
            { title: "Google Moja Firma", desc: "Gdy ktoś w Twojej okolicy szuka tego, co oferujesz, Google pokazuje mu mapę z 3 firmami. Optymalizuję Twoją wizytówkę tak, żebyś był jedną z nich — i żeby klienci dzwonili właśnie do Ciebie.", tags: ["Lokalne SEO", "Mapy Google", "Opinie"] },
            { title: "Social Media",      desc: "Twoi klienci spędzają godziny na Facebooku i Instagramie — a Twoja firma tam nie istnieje lub nie angażuje. Buduję obecność w social media, która zamienia obserwujących w płacących klientów.", tags: ["Facebook", "Instagram", "LinkedIn"] },
            { title: "Copywriting",       desc: "Zły tekst na stronie to ciche 'nie interesuje mnie' od klienta. Piszę teksty, które mówią do Twoich klientów ich językiem i odpowiadają na pytanie, którego nikt nie zadaje wprost: dlaczego właśnie Ty?", tags: ["Oferty", "E-maile", "SEO-copy"] },
          ],
        },
        {
          label: "Opieka & Wsparcie",
          services: [
            { title: "Zarządzanie & Administracja", desc: "Nigdy nie będziesz się martwił czy strona działa, certyfikat SSL jest ważny i backup jest zrobiony. Zajmuję się całą technologią w tle — Ty zajmujesz się prowadzeniem firmy.", tags: ["Hosting", "SSL", "Backup"] },
            { title: "Wsparcie techniczne",         desc: "Coś przestało działać? Średni czas mojej reakcji to 2 godziny. Nie piszesz do anonimowego 'supportu' — piszesz do Oscara, który zna Twoją stronę od pierwszej linii kodu.", tags: ["Szybka reakcja", "Bez biletów", "Priorytet"] },
          ],
        },
      ],
    },
    notAgency: {
      label: "Lokalnie. Bez kompromisów.",
      h2a: "NIE",
      h2b: "AGENCJA.",
      h2c: "CZŁOWIEK",
      h2d: "Z MIELCA.",
      p1: "Zamiast korporacyjnego łańcucha działów — jeden specjalista, który rozumie Twój biznes i odpowiada za wyniki. Nie ma tu nikogo między Tobą a osobą, która robi Twój projekt.",
      p2: "Kiedy piszesz — odbiera ten, kto projektuje i koduje. Nie recepcjonistka, nie junior, nie chatbot.",
      location: "Mielec, Podkarpacie",
      locationSub: "Działam lokalnie i obsługuję klientów w całej Polsce",
      compare: {
        col1: "Duża agencja",
        col2: "PROJSTOG",
        rows: [
          { a: "Tygodnie 'discovery phase'",              b: "Rozmowa dziś, projekt jutro" },
          { a: "Account manager zamiast kodera",           b: "Oscar — jeden kontakt, pełna wiedza" },
          { a: "Faktura za każdego maila",                 b: "Jasna cena, zero niespodzianek" },
          { a: "Gotowy szablon przemalowany na Twoją barwę", b: "Projekt szyty na miarę od zera" },
        ],
      },
    },
    process: {
      label: "Jak działamy",
      h2: "Od rozmowy do wyników",
      steps: [
        { step: "01", title: "Rozmowa",    desc: "Mówisz mi co chcesz osiągnąć — bez presji i gotowych pakietów do wciskania. Słucham, pytam i dopiero potem proponuję. Pierwsza rozmowa zawsze bezpłatna." },
        { step: "02", title: "Strategia",  desc: "Dostajesz konkretną propozycję: makietę, zakres prac, termin i cenę. Wiesz dokładnie za co płacisz zanim powiesz 'tak' — zero niespodzianek na fakturze." },
        { step: "03", title: "Realizacja", desc: "Projektuję, koduję i informuję Cię na każdym etapie. Dostajesz projekt w uzgodnionym terminie — nie 'wkrótce' ani 'niedługo'." },
        { step: "04", title: "Launch & opieka", desc: "Wdrażam, testuję i konfiguruję każdy detal. Możesz też zostawić dalszą opiekę mi — żebyś nigdy nie musiał myśleć o hostingu, aktualizacjach czy bezpieczeństwie." },
      ],
    },
    portfolio: {
      label: "Realizacje",
      h2: "Projekty, które pracują",
      sub: "Każdy projekt to wymierne rezultaty — nie piękna strona dla samej estetyki.",
      soon: "Więcej realizacji wkrótce — każdy nowy projekt to nowy dowód, że to działa.",
      items: [
        { name: "Luxury Car Care",     url: "https://luxurycc.pl",           cat: "Strona One Page",  result: "Profesjonalne studio detailingu samochodowego",   tech: ["WordPress", "SEO", "CSS"],            bg: "#0b1a13", accentBg: "rgba(27,157,23,0.12)" },
        { name: "Luksusowy Ogród",     url: "https://luksusowyogrod.pl",     cat: "Strona firmowa",   result: "Ekskluzywne projektowanie ogrodów premium",       tech: ["WordPress", "SEO", "CMS"],            bg: "#0d1a10", accentBg: "rgba(27,157,23,0.10)" },
        { name: "Kasza Ubezpieczenia", url: "https://kaszaubezpieczenia.pl", cat: "Strona firmowa",   result: "Biuro ubezpieczeń — generowanie zapytań online",  tech: ["WordPress", "SEO", "CMS"],            bg: "#0d1a1f", accentBg: "rgba(0,100,180,0.10)" },
        { name: "Drzewka Wałęga",      url: "https://drzewkawalega.eu",      cat: "Strona One Page",  result: "Szkółka drzewek — widoczność lokalna",            tech: ["WordPress", "SEO", "GMB"],            bg: "#111a0a", accentBg: "rgba(100,160,0,0.10)" },
        { name: "Meble Antek",         url: "https://mebleantek.pl",         cat: "Sklep internetowy",result: "E-commerce mebli na zamówienie",                  tech: ["WordPress", "WooCommerce", "CMS"],    bg: "#1a0d0a", accentBg: "rgba(180,60,0,0.08)" },
        { name: "Eko-Stal Mielec",     url: "https://eko-stal.mielec.pl",    cat: "Strona firmowa",   result: "Producent konstrukcji stalowych — B2B online",    tech: ["HTML", "CSS", "JS"],                  bg: "#0a0f1a", accentBg: "rgba(0,80,180,0.10)" },
      ],
    },
    owner: {
      label: "O mnie",
      h2: "Buduję cyfrowe narzędzia",
      role: "CEO PROJSTOG",
      city: "Mielec, Podkarpacie",
      email: "Napisz",
      p1: "Jestem Oscar Grzywa — zaczynałem od stron internetowych, dziś projektuję pełne ekosystemy cyfrowe. Strony, które konwertują. Systemy AI, które zastępują papierologię. Chatboty obsługujące klientów gdy śpisz. Narzędzia, które dają Ci czas na to, co robisz najlepiej.",
      p2: "Nie stoi za mną agencja. Stoi jeden człowiek — który odbierze Twój telefon, odpowie na maila i dostarczy projekt w terminie. Możesz mi zaufać, bo moja reputacja zależy bezpośrednio od Twoich wyników.",
      points: [
        "Traktuję każdą złotówkę Twojego budżetu jak własną — zależy mi na ROI, nie na liczbie godzin na fakturze.",
        "Jeden kontakt przez cały projekt: piszesz do mnie, nie do 'supportu'. Odpowiada i dostarcza ten sam człowiek.",
        "Łączę web development, AI i marketing w jedno spójne rozwiązanie — bez podwykonawców, bez telefonu głuchego.",
      ],
    },
    contact: {
      label: "Kontakt",
      h2: "Umów bezpłatną rozmowę",
      sub: "Pierwsza rozmowa zawsze bezpłatna — bez presji i bez propozycji, których nie chciałeś.",
      phoneCta: "Zadzwoń teraz",
      meetCta: "Umów Google Meet →",
      meetSub: "Bezpłatne spotkanie wideo",
      availableText: "Odbieram osobiście — bezpośredni kontakt.",
      meetText: "Bezpłatne spotkanie. Omówimy projekt i możliwości.",
      divider: "lub zostaw dane, a ja się odezwę",
      formTitle: "Zostaw numer lub e-mail",
      formText: "Odezwę się tego samego dnia lub następnego ranka. Bez automatycznych odpowiedzi — piszę i dzwonię osobiście.",
    },
    footer: {
      tagline: "Cyfrowe rozwiązania, które zarabiają na Ciebie",
      city: "Oscar Grzywa · Mielec, Podkarpacie",
      copy: "PROJSTOG · Oscar Grzywa",
      links: [["Usługi","#uslugi"],["Realizacje","#portfolio"],["O mnie","#o-mnie"],["Kontakt","#kontakt"]] as [string,string][],
    },
  },

  en: {
    nav: {
      links: [
        { label: "Services",  href: "#uslugi" },
        { label: "Work",      href: "#portfolio" },
        { label: "About",     href: "#o-mnie" },
        { label: "Contact",   href: "#kontakt" },
      ],
      cta: "Quote",
      phone: "+48 730 771 568",
    },
    hero: {
      chips: ["ACCEPTING PROJECTS", "INTERACTIVE AGENCY", "MIELEC, POLAND"],
      h1a: "Digital solutions,",
      h1b: "that earn for you.",
      sub: "I build websites, stores and AI systems for businesses across Poland. More clients online — less manual work.",
      cta1: "Get a quote",
      cta2: "View work",
      stats: [
        ["14+",    "Digital services"],
        ["Mielec", "Based in Poland"],
        ["24h",    "Response time"],
      ] as [string, string][],
      ticker: [
        "One Page Websites", "Online Stores", "AI Automations", "AI Chatbots",
        "CRM Systems", "Google My Business", "Social Media", "Copywriting",
        "Company Websites", "Technical Support", "Blog & Content", "Custom Applications",
      ],
      gadgets: {
        lead:   { label: "+1 New Lead",      sub: "Just now · Form submission" },
        google: { label: "+340% Google",     sub: "Organic traffic · 3 months" },
        ai:     { label: "AI Chatbot",       sub: "Online · Handling for you" },
        live:   { label: "Live in 14 days",  sub: "Guaranteed launch date" },
      },
    },
    services: {
      label: "Full service range",
      h2: "What you gain working with PROJSTOG",
      sub: "Every service has one goal — you earn more, waste less time and stop worrying about technology.",
      categories: [
        {
          label: "Online presence",
          services: [
            { title: "One Page Website",         desc: "Your clients search Google for what you do — this site makes sure they find you and call. Ready in 7 days, optimised for local SEO, built for one goal: new client inquiries.", tags: ["Mobile-first", "SEO", "Fast delivery"] },
            { title: "Company Website",          desc: "Before a client calls, they check your website. If they find a professional presentation and trust what they see — they call. Your site works for you 24 hours a day.", tags: ["Multi-page", "CMS", "Copywriting"] },
            { title: "Online Store",             desc: "Sell while you sleep. A store with an intuitive checkout, fast payment and automated order processing — customers buy on their own, without your involvement or Messenger questions.", tags: ["WooCommerce", "Online payments", "Inventory"] },
            { title: "Blog & Content Platform",  desc: "Every blog post is a new customer found on Google without paying for ads. After a year of regular content your site becomes a machine generating free traffic for years.", tags: ["SEO-content", "CMS", "Newsletter"] },
          ],
        },
        {
          label: "Artificial intelligence",
          services: [
            { title: "AI Business Automations", desc: "How many hours a week do you lose to invoices, emails and reports? These processes can be automated — AI handles them for you so you focus only on what brings in money.", tags: ["Make / N8N", "OpenAI", "No code"] },
            { title: "AI Chatbots",             desc: "A client messages at 11pm asking about your offer — the chatbot replies, qualifies the enquiry and books them in your calendar. You wake up with a ready lead instead of an unanswered question.", tags: ["GPT-4", "24/7 support", "Integration"] },
            { title: "CRM Systems",             desc: "No more searching for who, what and when. You see every client, what stage the conversation is at and what you need to do today — instead of piecing it together from memory, Excel and your inbox.", tags: ["Pipeline", "Automation", "Reports"] },
            { title: "Custom Applications",     desc: "Your process is unique and off-the-shelf tools don't fit. I build applications tailored to your workflow: quote calculator, client portal, online booking platform.", tags: ["Custom", "Next.js", "On demand"] },
          ],
        },
        {
          label: "Marketing & Visibility",
          services: [
            { title: "Google My Business", desc: "When someone nearby searches for what you offer, Google shows a map with 3 businesses. I optimise your listing so you're one of them — and so clients call you specifically.", tags: ["Local SEO", "Google Maps", "Reviews"] },
            { title: "Social Media",       desc: "Your clients spend hours on Facebook and Instagram — and your business either doesn't exist there or doesn't engage them. I build a social media presence that turns followers into paying clients.", tags: ["Facebook", "Instagram", "LinkedIn"] },
            { title: "Copywriting",        desc: "Bad copy on your site is a silent 'not interested' from the client. I write texts that speak to your clients in their language and answer the question nobody asks out loud: why you specifically?", tags: ["Offers", "Emails", "SEO-copy"] },
          ],
        },
        {
          label: "Care & Support",
          services: [
            { title: "Management & Administration", desc: "You'll never worry about whether the site is running, the SSL certificate is valid or a backup was made. I handle all the technology in the background — you focus on running your business.", tags: ["Hosting", "SSL", "Backup"] },
            { title: "Technical Support",           desc: "Something stopped working? My average response time is 2 hours. You're not writing to anonymous 'support' — you're writing to Oscar, who knows your site from the first line of code.", tags: ["Fast response", "No tickets", "Priority"] },
          ],
        },
      ],
    },
    notAgency: {
      label: "Local. Without compromises.",
      h2a: "NOT AN",
      h2b: "AGENCY.",
      h2c: "A PERSON",
      h2d: "FROM MIELEC.",
      p1: "Behind PROJSTOG there's no corporation, sales department or eight-person-board agency. There's one person — who personally designs, codes and delivers every project.",
      p2: "When you write — the person who builds answers. Not a receptionist, not a junior, not a chatbot.",
      location: "Mielec, Podkarpacie, Poland",
      locationSub: "Working locally, serving clients across Poland",
      compare: {
        col1: "Big agency",
        col2: "PROJSTOG",
        rows: [
          { a: "Weeks of 'discovery phase'",              b: "Call today, project tomorrow" },
          { a: "Account manager instead of coder",         b: "Oscar — one contact, full knowledge" },
          { a: "Invoice for every email",                  b: "Clear price, no surprises" },
          { a: "Ready template painted in your colors",    b: "Project tailored from scratch" },
        ],
      },
    },
    process: {
      label: "How we work",
      h2: "From conversation to results",
      steps: [
        { step: "01", title: "Call",     desc: "Free, no agenda. Tell me what you want to achieve — I listen and ask the right questions." },
        { step: "02", title: "Strategy", desc: "I propose a solution tailored to your case. Mockup, scope, deadline and clear price. No surprises." },
        { step: "03", title: "Build",    desc: "I build the project and keep you in the loop at every step. Delivered on time." },
        { step: "04", title: "Launch & care", desc: "Deployment, tests, configuration. And ongoing care if you want — so you never worry about technicalities." },
      ],
    },
    portfolio: {
      label: "Work",
      h2: "Projects that work",
      sub: "Every project delivers measurable results — not just a beautiful website for aesthetics.",
      soon: "More projects coming soon — each new one is new proof that it works.",
      items: [
        { name: "Luxury Car Care",     url: "https://luxurycc.pl",           cat: "One Page Website",  result: "Professional car detailing studio",             tech: ["WordPress", "SEO", "CSS"],           bg: "#0b1a13", accentBg: "rgba(27,157,23,0.12)" },
        { name: "Luksusowy Ogród",     url: "https://luksusowyogrod.pl",     cat: "Company Website",   result: "Premium luxury garden design",                  tech: ["WordPress", "SEO", "CMS"],           bg: "#0d1a10", accentBg: "rgba(27,157,23,0.10)" },
        { name: "Kasza Ubezpieczenia", url: "https://kaszaubezpieczenia.pl", cat: "Company Website",   result: "Insurance office — online lead generation",     tech: ["WordPress", "SEO", "CMS"],           bg: "#0d1a1f", accentBg: "rgba(0,100,180,0.10)" },
        { name: "Drzewka Wałęga",      url: "https://drzewkawalega.eu",      cat: "One Page Website",  result: "Tree nursery — local visibility",                tech: ["WordPress", "SEO", "GMB"],           bg: "#111a0a", accentBg: "rgba(100,160,0,0.10)" },
        { name: "Meble Antek",         url: "https://mebleantek.pl",         cat: "Online Store",      result: "Custom furniture e-commerce",                   tech: ["WordPress", "WooCommerce", "CMS"],   bg: "#1a0d0a", accentBg: "rgba(180,60,0,0.08)" },
        { name: "Eko-Stal Mielec",     url: "https://eko-stal.mielec.pl",    cat: "Company Website",   result: "Steel structures manufacturer — B2B online",    tech: ["HTML", "CSS", "JS"],                 bg: "#0a0f1a", accentBg: "rgba(0,80,180,0.10)" },
      ],
    },
    owner: {
      label: "About",
      h2: "Building digital tools from Mielec",
      role: "Founder of PROJSTOG",
      city: "Mielec, Podkarpacie",
      email: "Write",
      p1: "I'm Oscar Grzywa — I started with websites, today I design full digital ecosystems. Sites that convert. AI systems that replace paperwork. Chatbots that handle clients while you sleep. Tools that give you time to focus on what you do best.",
      p2: "There's no agency behind me. There's one person — who answers your call, replies to your email and delivers on time. You can trust me because my reputation depends directly on your results.",
      points: [
        "I treat every złoty of your budget as my own — I care about your ROI, not the number of hours on the invoice.",
        "One contact throughout the entire project: you write to me, not 'support'. The same person answers and delivers.",
        "I combine web development, AI and marketing into one cohesive solution — no subcontractors, no broken telephone.",
      ],
    },
    contact: {
      label: "Contact",
      h2: "Book a free call",
      sub: "First call always free — no pressure and no proposals you didn't ask for.",
      phoneCta: "Call now",
      meetCta: "Book Google Meet →",
      meetSub: "Free video meeting",
      availableText: "I answer personally — direct contact.",
      meetText: "Free meeting. We'll discuss your project and options.",
      divider: "or leave your details and I'll reach out",
      formTitle: "Leave your number or email",
      formText: "I'll reach out the same day or next morning. No automated responses — I write and call personally.",
    },
    footer: {
      tagline: "Digital solutions that earn for you",
      city: "Oscar Grzywa · Mielec, Poland",
      copy: "PROJSTOG · Oscar Grzywa",
      links: [["Services","#uslugi"],["Work","#portfolio"],["About","#o-mnie"],["Contact","#kontakt"]] as [string,string][],
    },
  },
} as const;

export type Content = typeof content.pl;

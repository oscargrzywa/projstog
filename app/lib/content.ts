export type Lang = "pl" | "en";

export const content = {
  pl: {
    nav: {
      links: [
        { label: "Usługi",    href: "#uslugi" },
        { label: "Realizacje", href: "#portfolio" },
        { label: "Proces",    href: "#proces" },
        { label: "O mnie",   href: "#o-mnie" },
      ],
      cta: "Wycena",
      phone: "+48 730 771 568",
    },
    hero: {
      chips: ["PRZYJMUJĘ PROJEKTY", "AGENCJA INTERAKTYWNA", "MIELEC, PODKARPACIE"],
      h1a: "Cyfrowe rozwiązania,",
      h1b: "które zarabiają.",
      sub: "Strony, sklepy, aplikacje, automatyzacje AI i systemy CRM. Kompleksowa agencja interaktywna.",
      cta1: "Wycień projekt",
      cta2: "Zobacz realizacje",
      stats: [
        ["14+",    "Usług cyfrowych"],
        ["Mielec", "Centrum dowodzenia"],
        ["24h",    "Czas reakcji"],
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
      h2: "Co mogę zrobić dla Ciebie",
      sub: "Od strony po systemy AI — wszystko, czego potrzebujesz żeby wyglądać profesjonalnie i zarabiać więcej.",
      categories: [
        {
          label: "Obecność w sieci",
          services: [
            { title: "Strona One Page",         desc: "Skuteczna jednostronicowa wizytówka dla lokalnych firm, freelancerów i kampanii. Szybka, mobilna, nastawiona na jeden cel — żebyś dostawał zapytania.", tags: ["Mobile-first", "SEO", "Szybka realizacja"] },
            { title: "Strona firmowa",           desc: "Wielostronicowa reprezentacja firmy: Oferta, Realizacje, O nas, Kontakt. Buduje zaufanie klientów i generuje zapytania zanim jeszcze odbierzesz telefon.", tags: ["Wielostronicowa", "CMS", "Copywriting"] },
            { title: "Sklep internetowy",        desc: "E-commerce, który naprawdę sprzedaje. Intuicyjny UX, integracje z płatnościami, automatyczne faktury i wygodne zarządzanie produktami.", tags: ["WooCommerce", "Płatności online", "Magazyn"] },
            { title: "Blog & platforma treści",  desc: "Profesjonalny blog lub portal z panelem redakcyjnym. Buduj autorytet w swojej branży i sprowadzaj darmowy ruch z Google przez lata.", tags: ["SEO-content", "CMS", "Newsletter"] },
          ],
        },
        {
          label: "Sztuczna inteligencja",
          services: [
            { title: "Automatyzacje AI w firmach", desc: "Zautomatyzuj powtarzalne zadania: faktury, e-maile, raporty, rezerwacje. AI pracuje za Ciebie zanim rano wstaniesz.", tags: ["Make / N8N", "OpenAI", "Bez kodu"] },
            { title: "Chatboty AI",                desc: "Wirtualny asystent odpowiada na pytania klientów 24/7, kwalifikuje leady i umawia spotkania — bez Twojego udziału.", tags: ["GPT-4", "Obsługa 24/7", "Integracja"] },
            { title: "Systemy CRM",                desc: "Spersonalizowany system zarządzania klientami i lejkiem sprzedażowym. Koniec z Excelem, karteczkami i zagubionymi mailami.", tags: ["Pipeline", "Automatyzacja", "Raporty"] },
            { title: "Indywidualne aplikacje",     desc: "Niestandardowe narzędzie cyfrowe zaprojektowane pod Twój proces: kalkulator ofert, panel klienta, system rezerwacji.", tags: ["Custom", "Next.js", "Na zamówienie"] },
          ],
        },
        {
          label: "Marketing & Widoczność",
          services: [
            { title: "Google Moja Firma", desc: "Optymalizacja wizytówki Google — pojawiasz się gdy ktoś w Twojej okolicy szuka tego, co robisz. Lokalne SEO przekładające się na telefony.", tags: ["Lokalne SEO", "Mapy Google", "Opinie"] },
            { title: "Social Media",      desc: "Strategia i prowadzenie profili: posty, grafiki, stories, kampanie na Facebooku, Instagramie i LinkedIn.", tags: ["Facebook", "Instagram", "LinkedIn"] },
            { title: "Copywriting",       desc: "Teksty, które sprzedają: opisy usług, oferty, posty, e-maile, landing page'e. Piszę po polsku, dla Twoich klientów, w Twoim głosie.", tags: ["Oferty", "E-maile", "SEO-copy"] },
          ],
        },
        {
          label: "Opieka & Wsparcie",
          services: [
            { title: "Zarządzanie & Administracja", desc: "Hosting, domeny, SSL, aktualizacje i backup — wszystko pod kontrolą. Nigdy nie musisz logować się do żadnego panelu.", tags: ["Hosting", "SSL", "Backup"] },
            { title: "Wsparcie techniczne",         desc: "Coś się zepsuło? Reaguję szybko. Jeden człowiek, który zna Twój projekt od początku — bez biletów i kolejki.", tags: ["Szybka reakcja", "Bez biletów", "Priorytet"] },
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
      p1: "Za PROJSTOG nie stoi korporacja, dział sprzedaży ani agencja z ośmioosobowym zarządem. Stoi jeden człowiek — który osobiście projektuje, koduje i dostarcza każdy projekt.",
      p2: "Kiedy piszesz — odbiera ten, kto robi. Nie recepcjonistka, nie junior, nie chatbot.",
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
        { step: "01", title: "Rozmowa",    desc: "Bezpłatna, bez agendy. Mówisz mi co chcesz osiągnąć — ja słucham i zadaję właściwe pytania." },
        { step: "02", title: "Strategia",  desc: "Proponuję rozwiązanie szyte pod Twój przypadek. Makieta, zakres, termin i jasna cena. Zero niespodzianek." },
        { step: "03", title: "Realizacja", desc: "Buduję projekt i trzymam Cię w pętli na każdym etapie. Oddaję w terminie." },
        { step: "04", title: "Launch & opieka", desc: "Wdrożenie, testy, konfiguracja. I stała opieka, jeśli chcesz — żebyś nigdy nie martwił się technikaliami." },
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
      p1: "Jestem Oscar Grzywa — zaczynałem od stron internetowych. Dziś projektuję pełne ekosystemy cyfrowe: strony, które konwertują, systemy AI zastępujące papierologię, chatboty obsługujące klientów w nocy, i narzędzia, które pozwalają Ci skupić się na tym, co robisz najlepiej.",
      p2: "Nie stoi za mną agencja. Stoi jeden człowiek — który odbierze Twój telefon, odpowie na maila i dostarczy projekt na czas. Bo tak po prostu działa mój biznes.",
      points: [
        "Każdą złotówkę zainwestowaną w projekt traktuję jak własną — moja reputacja zależy od Twoich wyników.",
        "Jeden kontakt przez cały projekt: piszesz do mnie, nie do 'zespołu'. Odbiera ten, kto projektuje i dostarcza.",
        "Łączę web development, AI i marketing w jedno spójne rozwiązanie — bez podwykonawców i przepisywania przez pośredników.",
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
        { label: "Services", href: "#uslugi" },
        { label: "Work",     href: "#portfolio" },
        { label: "Process",  href: "#proces" },
        { label: "About",    href: "#o-mnie" },
      ],
      cta: "Quote",
      phone: "+48 730 771 568",
    },
    hero: {
      chips: ["ACCEPTING PROJECTS", "INTERACTIVE AGENCY", "MIELEC, POLAND"],
      h1a: "Digital solutions,",
      h1b: "that earn for you.",
      sub: "Websites, stores, apps, AI automations and CRM systems. Full-service interactive agency.",
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
      h2: "What I can do for you",
      sub: "From websites to AI systems — everything you need to look professional and earn more.",
      categories: [
        {
          label: "Online presence",
          services: [
            { title: "One Page Website",         desc: "Effective single-page business card for local companies, freelancers and campaigns. Fast, mobile, focused on getting you inquiries.", tags: ["Mobile-first", "SEO", "Fast delivery"] },
            { title: "Company Website",          desc: "Multi-page company representation: Services, Work, About, Contact. Builds trust and generates inquiries before you answer the phone.", tags: ["Multi-page", "CMS", "Copywriting"] },
            { title: "Online Store",             desc: "E-commerce that actually sells. Intuitive UX, payment integrations, automatic invoices and easy product management.", tags: ["WooCommerce", "Online payments", "Inventory"] },
            { title: "Blog & Content Platform",  desc: "Professional blog or portal with a built-in editorial panel. Build authority in your industry and attract free Google traffic for years.", tags: ["SEO-content", "CMS", "Newsletter"] },
          ],
        },
        {
          label: "Artificial intelligence",
          services: [
            { title: "AI Business Automations", desc: "Automate repetitive tasks: invoices, emails, reports, reservations. AI works for you before you get out of bed.", tags: ["Make / N8N", "OpenAI", "No code"] },
            { title: "AI Chatbots",             desc: "Virtual assistant answers customer questions 24/7, qualifies leads and books meetings — without your involvement.", tags: ["GPT-4", "24/7 support", "Site integration"] },
            { title: "CRM Systems",             desc: "Personalized client management system and sales pipeline. No more Excel, sticky notes and lost emails.", tags: ["Pipeline", "Automation", "Reports"] },
            { title: "Custom Applications",     desc: "Custom digital tool designed for your process: quote calculator, client portal, booking system, internal dashboard.", tags: ["Custom", "Next.js", "On demand"] },
          ],
        },
        {
          label: "Marketing & Visibility",
          services: [
            { title: "Google My Business", desc: "Google listing optimization — you appear when someone nearby searches for exactly what you do. Local SEO that translates into calls.", tags: ["Local SEO", "Google Maps", "Reviews"] },
            { title: "Social Media",       desc: "Strategy and profile management: posts, graphics, stories, campaigns on Facebook, Instagram and LinkedIn.", tags: ["Facebook", "Instagram", "LinkedIn"] },
            { title: "Copywriting",        desc: "Texts that sell: service descriptions, offers, posts, emails, landing pages. Written in your language, for your clients, in your voice.", tags: ["Offers", "Emails", "SEO-copy"] },
          ],
        },
        {
          label: "Care & Support",
          services: [
            { title: "Management & Administration", desc: "Hosting, domains, SSL, updates and backup — all under control. You never need to log into any panel.", tags: ["Hosting", "SSL", "Backup"] },
            { title: "Technical Support",           desc: "Something broke? I respond quickly. One person who knows your project from start to finish — no tickets or queues.", tags: ["Fast response", "No tickets", "Priority"] },
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
      p1: "I'm Oscar Grzywa — I started with websites. Today I design full digital ecosystems: websites that convert, AI systems replacing paperwork, chatbots handling clients overnight, and tools that let you focus on what you do best.",
      p2: "There's no agency behind me. There's one person — who will answer your call, reply to your email and deliver on time. Because that's simply how my business works.",
      points: [
        "I treat every złoty invested in a project as my own — my reputation depends on your results.",
        "One contact throughout the entire project: you write to me, not 'the team'. Answered by the person who designs and delivers.",
        "I combine web development, AI and marketing into one cohesive solution — no subcontractors or message-telephone chains.",
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

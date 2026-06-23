"use client";

import { Nav } from "./components/Nav";
import { ContactForm } from "./components/ContactForm";
import { AnimateOnScroll } from "./components/AnimateOnScroll";
import { HeroZoom } from "./components/HeroZoom";
import { ServicesSection } from "./components/ServicesSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { ProcessSection } from "./components/ProcessSection";
import { useLang } from "./components/LangContext";
import { content } from "./lib/content";

// ── Brand assets (from docs/img) ──────────────────────────────────────────────
function ProjstogIcon({ size = 40 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size} aria-hidden={true}>
      <g stroke="#1B9D17" strokeWidth="2.6" fill="none" strokeLinecap="round" opacity="0.55">
        <path d="M10,27 L10,10 L27,10" />
        <path d="M90,73 L90,90 L73,90" />
      </g>
      <path d="M21,78 L21,55.5 Q21,52 24.5,52 L30.5,52 Q34,52 34,55.5 L34,78 Z" fill="#126410" />
      <path d="M43.5,78 L43.5,41.5 Q43.5,38 47.0,38 L53.0,38 Q56.5,38 56.5,41.5 L56.5,78 Z" fill="#1B9D17" />
      <path d="M66,78 L66,25.5 Q66,22 69.5,22 L75.5,22 Q79,22 79,25.5 L79,78 Z" fill="#34E12E" />
      <circle cx="72.5" cy="13" r="9" fill="#34E12E" opacity="0.18" />
      <circle cx="72.5" cy="13" r="5" fill="#34E12E" />
    </svg>
  );
}

// Small version for footer
function ProjstogIconSmall() {
  return <ProjstogIcon size={24} />;
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const S = { width: 22, height: 22, fill: "none", stroke: "#34E12E", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };

const IconLayout     = () => <svg {...S} viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>;
const IconBuilding   = () => <svg {...S} viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="15" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>;
const IconCart       = () => <svg {...S} viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>;
const IconFileText   = () => <svg {...S} viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>;
const IconBrain      = () => <svg {...S} viewBox="0 0 24 24"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" /></svg>;
const IconBot        = () => <svg {...S} viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4M8 15h.01M16 15h.01" /></svg>;
const IconDatabase   = () => <svg {...S} viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>;
const IconCode       = () => <svg {...S} viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>;
const IconMapPin     = () => <svg {...S} viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
const IconShare      = () => <svg {...S} viewBox="0 0 24 24"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>;
const IconPen        = () => <svg {...S} viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>;
const IconSettings   = () => <svg {...S} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
const IconHeadphones = () => <svg {...S} viewBox="0 0 24 24"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>;
const IconPhone      = () => <svg {...S} viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.3a16 16 0 0 0 6 6l.85-1.04a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 15h.52a2 2 0 0 1 0 1.92z" /></svg>;
const IconVideo      = () => <svg {...S} viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>;
const IconCheck      = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34E12E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}><polyline points="20 6 9 17 4 12" /></svg>;
const IconMail       = () => <svg {...S} viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>;
const IconTrendUp    = () => <svg {...S} viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>;
const IconX          = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3d4d3a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;

// ── Data ──────────────────────────────────────────────────────────────────────
const SERVICE_CATEGORIES: {
  label: string;
  services: { Icon: () => React.JSX.Element; title: string; desc: string; tags: readonly string[] }[];
}[] = [
  {
    label: "Obecność w sieci",
    services: [
      { Icon: IconLayout,   title: "Strona One Page",         desc: "Skuteczna jednostronicowa wizytówka dla lokalnych firm, freelancerów i kampanii. Szybka, mobilna, nastawiona na jeden cel — żebyś dostawał zapytania.", tags: ["Mobile-first", "SEO", "Szybka realizacja"] },
      { Icon: IconBuilding, title: "Strona firmowa",           desc: "Wielostronicowa reprezentacja firmy: Oferta, Realizacje, O nas, Kontakt. Buduje zaufanie klientów i generuje zapytania zanim jeszcze odbierzesz telefon.", tags: ["Wielostronicowa", "CMS", "Copywriting"] },
      { Icon: IconCart,     title: "Sklep internetowy",        desc: "E-commerce, który naprawdę sprzedaje. Intuicyjny UX, integracje z płatnościami, automatyczne faktury i wygodne zarządzanie produktami.", tags: ["WooCommerce", "Płatności online", "Magazyn"] },
      { Icon: IconFileText, title: "Blog & platforma treści",  desc: "Profesjonalny blog lub portal z panelem redakcyjnym. Buduj autorytet w swojej branży i sprowadzaj darmowy ruch z Google przez lata.", tags: ["SEO-content", "CMS", "Newsletter"] },
    ],
  },
  {
    label: "Sztuczna inteligencja",
    services: [
      { Icon: IconBrain,    title: "Automatyzacje AI w firmach", desc: "Zautomatyzuj powtarzalne zadania: faktury, e-maile, raporty, rezerwacje. AI pracuje za Ciebie zanim rano wstaniesz.", tags: ["Make / N8N", "OpenAI", "Bez kodu"] },
      { Icon: IconBot,      title: "Chatboty AI",                desc: "Wirtualny asystent odpowiada na pytania klientów 24/7, kwalifikuje leady i umawia spotkania — bez Twojego udziału.", tags: ["GPT-4", "Obsługa 24/7", "Integracja"] },
      { Icon: IconDatabase, title: "Systemy CRM",                desc: "Spersonalizowany system zarządzania klientami i lejkiem sprzedażowym. Koniec z Excelem, karteczkami i zagubionymi mailami.", tags: ["Pipeline", "Automatyzacja", "Raporty"] },
      { Icon: IconCode,     title: "Indywidualne aplikacje",     desc: "Niestandardowe narzędzie cyfrowe zaprojektowane pod Twój proces: kalkulator ofert, panel klienta, system rezerwacji.", tags: ["Custom", "Next.js", "Na zamówienie"] },
    ],
  },
  {
    label: "Marketing & Widoczność",
    services: [
      { Icon: IconMapPin, title: "Google Moja Firma", desc: "Optymalizacja wizytówki Google — pojawiasz się gdy ktoś w Twojej okolicy szuka tego, co robisz. Lokalne SEO, które przekłada się na telefony.", tags: ["Lokalne SEO", "Mapy Google", "Opinie"] },
      { Icon: IconShare,  title: "Social Media",      desc: "Strategia i prowadzenie profili: posty, grafiki, stories, kampanie na Facebooku, Instagramie i LinkedIn.", tags: ["Facebook", "Instagram", "LinkedIn"] },
      { Icon: IconPen,    title: "Copywriting",       desc: "Teksty, które sprzedają: opisy usług, oferty, posty, e-maile, landing page'e. Piszę po polsku, dla Twoich klientów, w Twoim głosie.", tags: ["Oferty", "E-maile", "SEO-copy"] },
    ],
  },
  {
    label: "Opieka & Wsparcie",
    services: [
      { Icon: IconSettings,   title: "Zarządzanie & Administracja", desc: "Hosting, domeny, SSL, aktualizacje i backup — wszystko pod kontrolą. Nigdy nie musisz logować się do żadnego panelu.", tags: ["Hosting", "SSL", "Backup"] },
      { Icon: IconHeadphones, title: "Wsparcie techniczne",         desc: "Coś się zepsuło? Reaguję szybko. Jeden człowiek, który zna Twój projekt od początku — bez biletów i kolejki.", tags: ["Szybka reakcja", "Bez biletów", "Priorytet"] },
    ],
  },
];

const PORTFOLIO = [
  { name: "Studio Detailingowe", cat: "Strona One Page + Google Moja Firma", result: "+340% zapytań z Google w 3 miesiące", tech: ["Next.js", "SEO lokalne", "GMB"], bg: "#0b1a13", accentBg: "rgba(27,157,23,0.12)" },
  { name: "Producent Konstrukcji Stalowych", cat: "Strona firmowa + Automatyzacja ofert AI", result: "Oferty generowane w 3 minuty zamiast 2 dni", tech: ["React", "OpenAI", "PDF auto"], bg: "#0d1a1f", accentBg: "rgba(0,100,180,0.10)" },
  { name: "Agentka Nieruchomości Podkarpacie", cat: "Strona + CRM + Chatbot AI", result: "Obsługa zapytań 24/7 bez zatrudnienia asystenta", tech: ["Next.js", "GPT-4", "CRM custom"], bg: "#1a0d1f", accentBg: "rgba(100,0,180,0.10)" },
] as const;

const PROCESS = [
  { step: "01", title: "Rozmowa", desc: "Bezpłatna, bez agendy. Mówisz mi co chcesz osiągnąć — ja słucham i zadaję właściwe pytania." },
  { step: "02", title: "Strategia", desc: "Proponuję rozwiązanie szyte pod Twój przypadek. Makieta, zakres, termin i jasna cena. Zero niespodzianek." },
  { step: "03", title: "Realizacja", desc: "Buduję projekt i trzymam Cię w pętli na każdym etapie. Oddaję w terminie." },
  { step: "04", title: "Launch & opieka", desc: "Wdrożenie, testy, konfiguracja. I stała opieka, jeśli chcesz — żebyś nigdy nie martwił się technikaliami." },
] as const;

const COMPARE_ROWS = [
  { agency: "Tygodnie 'discovery phase'",              projstog: "Rozmowa dziś, projekt jutro" },
  { agency: "Account manager zamiast kodera",           projstog: "Oscar — jeden kontakt, pełna wiedza" },
  { agency: "Faktura za każdego maila",                 projstog: "Jasna cena, zero niespodzianek" },
  { agency: "Gotowy szablon przemalowany na Twoją barwę", projstog: "Projekt szyty na miarę od zera" },
] as const;

const OWNER_POINTS = [
  "Każdą złotówkę zainwestowaną w projekt traktuję jak własną — moja reputacja zależy od Twoich wyników.",
  "Jeden kontakt przez cały projekt: piszesz do mnie, nie do 'zespołu'. Odbiera ten, kto projektuje i dostarcza.",
  "Łączę web development, AI i marketing w jedno spójne rozwiązanie — bez podwykonawców i przepisywania przez pośredników.",
] as const;

const TICKER_ITEMS = [
  "Strony One Page", "Sklepy Internetowe", "Automatyzacje AI", "Chatboty",
  "Systemy CRM", "Google Moja Firma", "Social Media", "Copywriting",
  "Strony Firmowe", "Wsparcie Techniczne", "Blog & Content", "Indywidualne Aplikacje",
];

const STATS: [string, string][] = [
  ["14+",    "Usług cyfrowych"],
  ["Mielec", "Centrum dowodzenia"],
  ["24h",    "Czas reakcji"],
];

const FOOTER_LINKS: [string, string][] = [
  ["Usługi",     "#uslugi"],
  ["Realizacje", "#portfolio"],
  ["O mnie",     "#o-mnie"],
  ["Kontakt",    "#kontakt"],
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 100, background: "rgba(52,225,46,0.07)", color: "#34E12E", letterSpacing: 0.4, whiteSpace: "nowrap" as const }}>
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, color: "#34E12E", letterSpacing: 3, textTransform: "uppercase", margin: "0 0 14px" }}>
      {children}
    </p>
  );
}


// Browser mockup for portfolio
function BrowserMock({ bg, accentBg }: { bg: string; accentBg: string }) {
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", background: bg, border: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Chrome */}
      <div style={{ padding: "10px 14px", background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(255,80,80,0.45)" }} />
        <div style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(255,180,0,0.35)" }} />
        <div style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(52,225,46,0.35)" }} />
        <div style={{ flex: 1, height: 16, borderRadius: 4, background: "rgba(255,255,255,0.04)", marginLeft: 10 }} />
      </div>
      {/* Wireframe content */}
      <div style={{ padding: "20px 18px", display: "flex", flexDirection: "column", gap: 12, minHeight: 140 }}>
        <div style={{ background: accentBg, borderRadius: 6, height: 36, display: "flex", alignItems: "center", paddingLeft: 12 }}>
          <div style={{ width: 24, height: 4, background: "rgba(52,225,46,0.4)", borderRadius: 2 }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {[0.7, 0.5, 0.6].map((o, i) => <div key={i} style={{ height: 48, background: `rgba(52,225,46,${o * 0.07})`, borderRadius: 5 }} />)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8 }}>
          <div style={{ height: 28, background: "rgba(255,255,255,0.03)", borderRadius: 5 }} />
          <div style={{ height: 28, background: "rgba(52,225,46,0.12)", borderRadius: 5 }} />
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <div style={{ color: "#ECE7DD", position: "relative", zIndex: 1 }}>
      <Nav />

      {/* ═══ HERO ═══════════════════════════════════════════════════════════════ */}
      <HeroZoom />

      {/* ═══ SERVICES ════════════════════════════════════════════════════════════ */}
      <ServicesSection />

      {/* ─── Green accent separator ───────────────────────────────────────────── */}
      <div style={{ position: "relative", height: 160, background: "rgba(7,12,7,0.92)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Animated bars */}
        {[...Array(7)].map((_, i) => (
          <div key={i} style={{
            position: "absolute", bottom: 0,
            left: `${8 + i * 12}%`,
            width: `clamp(3px,0.6vw,8px)`,
            background: `rgba(52,225,46,${0.08 + (i % 3) * 0.06})`,
            borderRadius: "3px 3px 0 0",
            transformOrigin: "bottom",
            animationName: "bar-grow",
            animationDuration: `${1.2 + i * 0.18}s`,
            animationTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
            animationFillMode: "both",
            animationDelay: `${i * 0.08}s`,
            animationIterationCount: "1",
            height: `${38 + ((i * 37) % 52)}%`,
          }} />
        ))}
        {/* Central glow line */}
        <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: "linear-gradient(90deg,transparent,rgba(52,225,46,0.18),transparent)", transform: "translateY(-50%)" }} />
        {/* Center brand mark */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 14, background: "rgba(6,8,7,0.9)", border: "1px solid rgba(52,225,46,0.14)", borderRadius: 100, padding: "10px 24px" }}>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 700, color: "#4a6347", letterSpacing: 3, textTransform: "uppercase" }}>
            {lang === "pl" ? "Obsługiwane technologie" : "Technologies"}
          </span>
          {["Next.js", "GPT-4", "Make", "n8n", "Shopify", "Google Ads"].map((t2, i) => (
            <span key={t2} style={{ fontSize: 10, fontWeight: 700, color: "rgba(52,225,46,0.45)", letterSpacing: 1.5, textTransform: "uppercase" }}>
              {i > 0 && <span style={{ marginRight: 8, color: "rgba(52,225,46,0.15)" }}>·</span>}
              {t2}
            </span>
          ))}
        </div>
      </div>

      {/* ═══ NOT AGENCY + OWNER + COMPARE ═══════════════════════════════════════ */}
      <section id="o-mnie" style={{ padding: "120px 0 120px", background: "rgba(7,12,7,0.88)", overflow: "hidden" }}>
        <div style={{ maxWidth: 1500, margin: "0 auto", padding: "0 40px" }}>

          {/* Staircase headlines */}
          <div style={{ marginBottom: 80 }}>
            <AnimateOnScroll from="left">
              <p className="staircase-t1" style={{ fontFamily: "var(--font-geist-mono)", fontSize: "clamp(3.5rem,9vw,9rem)", fontWeight: 800, lineHeight: 1.05, color: "#ECE7DD", margin: 0 }}>{t.notAgency.h2a}</p>
            </AnimateOnScroll>
            <AnimateOnScroll from="left" delay={80}>
              <p className="staircase-t1" style={{ fontFamily: "var(--font-geist-mono)", fontSize: "clamp(3.5rem,9vw,9rem)", fontWeight: 800, lineHeight: 1.05, color: "#ECE7DD", margin: 0, paddingLeft: "6%" }}>{t.notAgency.h2b}</p>
            </AnimateOnScroll>
            <AnimateOnScroll from="left" delay={160}>
              <p className="staircase-sub" style={{ fontFamily: "var(--font-geist-mono)", fontSize: "clamp(2rem,5.5vw,5.5rem)", fontWeight: 800, lineHeight: 1.05, background: "linear-gradient(135deg,#1B9D17,#34E12E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", margin: 0, paddingLeft: "12%" }}>{t.notAgency.h2c}</p>
            </AnimateOnScroll>
            <AnimateOnScroll from="left" delay={240}>
              <p className="staircase-sub" style={{ fontFamily: "var(--font-geist-mono)", fontSize: "clamp(2rem,5.5vw,5.5rem)", fontWeight: 800, lineHeight: 1.05, color: "#34E12E", margin: 0, paddingLeft: "18%", filter: "drop-shadow(0 0 32px rgba(52,225,46,0.2))" }}>{t.notAgency.h2d}</p>
            </AnimateOnScroll>
          </div>

          {/* Map — Mielec, dark overlay */}
          <AnimateOnScroll>
            <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", height: 240, marginBottom: 80 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d547633.0579593611!2d21.260360665462485!3d50.38628142733994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473d6b4ff4d294d7%3A0x19cc789a16d17201!2sMielec!5e0!3m2!1spl!2spl!4v1782132324021!5m2!1spl!2spl"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, filter: "grayscale(1) brightness(0.55) contrast(1.05)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mielec, Podkarpackie"
              />
              {/* Subtle dark + green tint */}
              <div style={{ position: "absolute", inset: 0, background: "rgba(6,8,7,0.35)", mixBlendMode: "multiply", pointerEvents: "none" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(27,157,23,0.06)", pointerEvents: "none" }} />
              {/* Location pin badge */}
              <div style={{ position: "absolute", bottom: 20, left: 20, display: "flex", alignItems: "center", gap: 10, background: "rgba(6,8,7,0.88)", border: "1px solid rgba(52,225,46,0.28)", borderRadius: 12, padding: "10px 16px" }}>
                <IconMapPin />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#ECE7DD" }}>Mielec, Podkarpackie</div>
                  <div style={{ fontSize: 11, color: "#4a6347", marginTop: 2 }}>Polska · 39-300</div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Owner — left: avatar/stats, right: bio/points */}
          <div className="owner-full-grid" style={{ display: "grid", gridTemplateColumns: "400px 1fr", gap: 96, marginBottom: 96, alignItems: "start" }}>

            <AnimateOnScroll from="left">
              <div>
                <div style={{ position: "relative", width: "100%", aspectRatio: "1", borderRadius: 28, border: "1px solid rgba(52,225,46,0.20)", boxShadow: "0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(52,225,46,0.10), 0 0 60px rgba(52,225,46,0.12)", marginBottom: 28, overflow: "hidden", background: "#0d1f0d" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/img/owner.jpg" alt="Oscar Grzywa" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(7,12,7,0.45) 0%, transparent 50%)", pointerEvents: "none" }} />
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#ECE7DD", marginBottom: 4 }}>Oscar Grzywa</div>
                <div style={{ fontSize: 14, color: "#34E12E", fontWeight: 600, marginBottom: 8 }}>{t.owner.role}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#4a6347", marginBottom: 32 }}>
                  <IconMapPin /><span>{t.owner.city}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
                  {[["14+", "Usług cyfrowych"], ["24h", "Czas reakcji"], ["3+", "Lata doświadczenia"], ["100%", "Realizuję osobiście"]].map(([n, l]) => (
                    <div key={l} style={{ background: "rgba(52,225,46,0.05)", border: "1px solid rgba(52,225,46,0.10)", borderRadius: 14, padding: "16px 18px" }}>
                      <div style={{ fontSize: 26, fontWeight: 900, color: "#34E12E", fontFamily: "var(--font-geist-mono)", lineHeight: 1 }}>{n}</div>
                      <div style={{ fontSize: 11, color: "#4a6347", marginTop: 6, lineHeight: 1.4 }}>{l}</div>
                    </div>
                  ))}
                </div>
                <a href="mailto:biuro@projstog.pl" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, background: "linear-gradient(135deg,#1B9D17,#34E12E)", color: "#060807", fontWeight: 700, fontSize: 14, padding: "14px 24px", borderRadius: 12, textDecoration: "none" }}>
                  <IconMail />Napisz do mnie
                </a>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll from="right">
              <div>
                <h2 style={{ fontFamily: "var(--font-geist-mono)", fontSize: "clamp(1.9rem,3.5vw,3rem)", fontWeight: 700, color: "#ECE7DD", margin: "0 0 28px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                  {t.owner.h2}
                </h2>
                <p style={{ fontSize: 16, color: "#6b8068", lineHeight: 1.9, margin: "0 0 18px" }}>{t.owner.p1}</p>
                <p style={{ fontSize: 16, color: "#6b8068", lineHeight: 1.9, margin: "0 0 40px" }}>{t.owner.p2}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[...t.owner.points].map((txt, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: "rgba(52,225,46,0.04)", border: "1px solid rgba(52,225,46,0.09)", borderRadius: 14, padding: "18px 20px" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(52,225,46,0.10)", border: "1px solid rgba(52,225,46,0.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        <IconCheck />
                      </div>
                      <p style={{ fontSize: 14.5, color: "#b8d4b2", lineHeight: 1.8, margin: 0 }}>{txt}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

          </div>

          {/* Comparison table — bottom */}
          <AnimateOnScroll>
            <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(52,225,46,0.10)", background: "rgba(14,19,14,0.5)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "14px 20px", background: "rgba(52,225,46,0.04)", borderBottom: "1px solid rgba(52,225,46,0.09)" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#3d5e3a", letterSpacing: 2, textTransform: "uppercase" }}>{t.notAgency.compare.col1}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#34E12E", letterSpacing: 2, textTransform: "uppercase" }}>{t.notAgency.compare.col2}</span>
              </div>
              {t.notAgency.compare.rows.map(({ a, b }) => (
                <div key={a} className="compare-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "16px 20px", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ marginTop: 3, flexShrink: 0 }}><IconX /></div>
                    <span style={{ fontSize: 13, color: "#4a5e44", lineHeight: 1.6 }}>{a}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ marginTop: 3, flexShrink: 0 }}><IconCheck /></div>
                    <span style={{ fontSize: 13, color: "#b8d4b2", lineHeight: 1.6 }}>{b}</span>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>

        </div>
      </section>

      {/* ═══ PROCESS ════════════════════════════════════════════════════════════ */}
      <ProcessSection steps={t.process.steps} label={t.process.label} h2={t.process.h2} lang={lang} />

      {/* ═══ PORTFOLIO ═══════════════════════════════════════════════════════════ */}
      <section id="portfolio" style={{ padding: "120px 40px", background: "rgba(7,12,7,0.88)" }}>
        <div style={{ maxWidth: 1500, margin: "0 auto" }}>
          <AnimateOnScroll>
            <SectionLabel>Realizacje</SectionLabel>
            <h2 style={{ fontFamily: "var(--font-geist-mono)", fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 700, color: "#ECE7DD", lineHeight: 1.2, margin: "0 0 8px" }}>
              Projekty, które pracują
            </h2>
            <p style={{ fontSize: 15, color: "#6b8068", margin: "0 0 72px", maxWidth: 440 }}>
              Każdy projekt to wymierne rezultaty — nie piękna strona dla samej estetyki.
            </p>
          </AnimateOnScroll>

          <div className="portfolio-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {t.portfolio.items.map(({ name, cat, result, tech, bg, accentBg }, i) => (
              <AnimateOnScroll key={name} delay={i * 100}>
                <div className="portfolio-card" style={{ borderRadius: 16, overflow: "hidden", background: bg, height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ padding: 4 }}>
                    <BrowserMock bg={bg} accentBg={accentBg} />
                  </div>
                  <div style={{ padding: "20px 22px 26px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 10, color: "#34E12E", fontWeight: 700, letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>{cat}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#ECE7DD", marginBottom: 14 }}>{name}</div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(52,225,46,0.08)", border: "1px solid rgba(52,225,46,0.14)", borderRadius: 8, padding: "7px 11px", marginBottom: 14, alignSelf: "flex-start" }}>
                      <IconTrendUp />
                      <span style={{ fontSize: 11.5, color: "#34E12E", fontWeight: 600 }}>{result}</span>
                    </div>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: "auto" }}>
                      {[...tech].map((tech) => <span key={tech} style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: "rgba(255,255,255,0.04)", color: "#4a6347" }}>{tech}</span>)}
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll>
            <p style={{ textAlign: "center", fontSize: 13, color: "#2d4a2a", marginTop: 44 }}>{t.portfolio.soon}</p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ═══ REVIEWS ═════════════════════════════════════════════════════════════ */}
      <ReviewsSection />

      {/* ═══ CONTACT ═════════════════════════════════════════════════════════════ */}
      <section id="kontakt" style={{ padding: "120px 40px", background: "rgba(7,12,7,0.88)" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <AnimateOnScroll>
            <SectionLabel>{t.contact.label}</SectionLabel>
            <h2 style={{ fontFamily: "var(--font-geist-mono)", fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 700, color: "#ECE7DD", lineHeight: 1.2, margin: "0 0 12px" }}>{t.contact.h2}</h2>
            <p style={{ fontSize: 15, color: "#6b8068", margin: "0 0 60px", maxWidth: 480 }}>{t.contact.sub}</p>
          </AnimateOnScroll>

          <div className="booking-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 56 }}>
            <AnimateOnScroll from="left">
              <div className="booking-card" style={{ borderRadius: 20, padding: "44px 36px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", height: "100%" }}>
                <div style={{ width: 68, height: 68, borderRadius: 18, background: "rgba(52,225,46,0.08)", border: "1px solid rgba(52,225,46,0.16)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
                  <IconPhone />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#ECE7DD", margin: "0 0 10px" }}>{lang === "pl" ? "Zadzwoń" : "Call"}</h3>
                <p style={{ fontSize: 14, color: "#6b8068", lineHeight: 1.75, margin: "0 0 24px", maxWidth: 200 }}>{t.contact.availableText}</p>
                <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 19, fontWeight: 700, color: "#34E12E", marginBottom: 24 }}>{t.nav.phone}</div>
                <a href={`tel:${t.nav.phone.replace(/\s/g,"")}`} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#1B9D17,#34E12E)", color: "#060807", fontWeight: 700, fontSize: 14, padding: "12px 28px", borderRadius: 10, textDecoration: "none", width: "100%" }}>
                  {t.contact.phoneCta}
                </a>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll from="right">
              <div className="booking-card" style={{ borderRadius: 20, padding: "44px 36px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", height: "100%" }}>
                <div style={{ width: 68, height: 68, borderRadius: 18, background: "rgba(52,225,46,0.08)", border: "1px solid rgba(52,225,46,0.16)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
                  <IconVideo />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#ECE7DD", margin: "0 0 10px" }}>Google Meet</h3>
                <p style={{ fontSize: 14, color: "#6b8068", lineHeight: 1.75, margin: "0 0 24px", maxWidth: 200 }}>{t.contact.meetText}</p>
                <div style={{ fontSize: 13, color: "#4a6347", fontStyle: "italic", marginBottom: 24 }}>{t.contact.meetSub}</div>
                <a href="https://calendar.app.google/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, border: "1px solid rgba(52,225,46,0.32)", color: "#34E12E", fontWeight: 700, fontSize: 14, padding: "12px 28px", borderRadius: 10, textDecoration: "none", width: "100%" }}>
                  {t.contact.meetCta}
                </a>
              </div>
            </AnimateOnScroll>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 56 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(52,225,46,0.07)" }} />
            <span style={{ fontSize: 12, color: "#3d5e3a", fontWeight: 500, whiteSpace: "nowrap", letterSpacing: 0.5 }}>{t.contact.divider}</span>
            <div style={{ flex: 1, height: 1, background: "rgba(52,225,46,0.07)" }} />
          </div>

          {/* Form */}
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72 }}>
            <AnimateOnScroll from="left">
              <h3 style={{ fontSize: 19, fontWeight: 700, color: "#ECE7DD", margin: "0 0 14px" }}>Zostaw numer lub e-mail</h3>
              <p style={{ fontSize: 15, color: "#6b8068", lineHeight: 1.85, margin: "0 0 32px" }}>
                Odezwę się tego samego dnia lub następnego ranka.{" "}
                <strong style={{ color: "#ECE7DD" }}>Bez automatycznych odpowiedzi</strong>{" "}
                — piszę i dzwonię osobiście.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(52,225,46,0.07)", border: "1px solid rgba(52,225,46,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <IconPhone />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "#4a6347", marginBottom: 3, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 700 }}>Telefon</div>
                    <a href="tel:+48730771568" className="contact-info-link">+48 730 771 568</a>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(52,225,46,0.07)", border: "1px solid rgba(52,225,46,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <IconMail />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "#4a6347", marginBottom: 3, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 700 }}>E-mail</div>
                    <a href="mailto:biuro@projstog.pl" className="contact-info-link">biuro@projstog.pl</a>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(52,225,46,0.07)", border: "1px solid rgba(52,225,46,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <IconMapPin />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "#4a6347", marginBottom: 3, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 700 }}>Lokalizacja</div>
                    <span style={{ color: "#b8d4b2", fontSize: 14.5, fontWeight: 500 }}>Mielec, Podkarpackie</span>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll from="right">
              <ContactForm />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─── Floating phone button ────────────────────────────────────────────── */}
      <a
        href="tel:+48730771568"
        aria-label="Zadzwoń: +48 730 771 568"
        style={{
          position: "fixed", bottom: 28, right: 28, width: 58, height: 58,
          borderRadius: "50%", background: "linear-gradient(135deg,#1B9D17,#34E12E)",
          color: "#060807", display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 200, textDecoration: "none",
          animationName: "phone-pulse", animationDuration: "2.8s", animationIterationCount: "infinite",
        }}
      >
        <IconPhone />
      </a>

      {/* ═══ FOOTER — premium ════════════════════════════════════════════════════ */}
      <footer style={{ background: "rgba(4,7,4,0.96)", borderTop: "1px solid rgba(52,225,46,0.10)", position: "relative", overflow: "hidden" }}>

        {/* Top glow accent */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: 1, background: "linear-gradient(90deg, transparent, rgba(52,225,46,0.4), transparent)" }} aria-hidden />
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "30%", height: 80, background: "radial-gradient(ellipse at top, rgba(52,225,46,0.08) 0%, transparent 70%)", pointerEvents: "none" }} aria-hidden />

        {/* Main columns */}
        <div style={{ maxWidth: 1600, margin: "0 auto", padding: "72px 40px 48px" }}>
          <div className="footer-cols" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.4fr", gap: 48, marginBottom: 56 }}>

            {/* Col 1 — Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <ProjstogIcon size={36} />
                <span style={{ fontFamily: "var(--font-geist-mono)", fontWeight: 900, fontSize: 17, color: "#ECE7DD", letterSpacing: 3 }}>PROJSTOG</span>
              </div>
              <p style={{ fontSize: 14, color: "#4a6347", lineHeight: 1.75, margin: "0 0 20px", maxWidth: 260 }}>
                {lang === "pl"
                  ? "Cyfrowe rozwiązania, które zarabiają na Ciebie — strony, AI, automatyzacje i marketing z jednego miejsca."
                  : "Digital solutions that earn for you — websites, AI, automations and marketing from one place."}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#3d5e3a", marginBottom: 24 }}>
                <IconMapPin />
                <span>Mielec, Podkarpackie</span>
              </div>
              {/* Social icons */}
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { label: "LinkedIn", href: "#", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> },
                  { label: "Instagram", href: "#", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" strokeWidth="0" /></svg> },
                ].map(({ label, href, icon }) => (
                  <a key={label} href={href} aria-label={label} className="footer-social">
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 — Services */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: "#34E12E", letterSpacing: 2.5, textTransform: "uppercase", margin: "0 0 18px" }}>
                {lang === "pl" ? "Usługi" : "Services"}
              </p>
              <nav style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {(lang === "pl"
                  ? ["Strony internetowe", "Sklepy e-commerce", "Automatyzacje AI", "Chatboty AI", "Marketing & SEO", "Systemy CRM"]
                  : ["Websites", "E-commerce shops", "AI Automations", "AI Chatbots", "Marketing & SEO", "CRM Systems"]
                ).map(s => (
                  <a key={s} href="#uslugi" className="footer-link">{s}</a>
                ))}
              </nav>
            </div>

            {/* Col 3 — Navigation */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: "#34E12E", letterSpacing: 2.5, textTransform: "uppercase", margin: "0 0 18px" }}>
                {lang === "pl" ? "Nawigacja" : "Navigation"}
              </p>
              <nav style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {t.footer.links.map(([l, h]) => (
                  <a key={l} href={h} className="footer-link">{l}</a>
                ))}
              </nav>
            </div>

            {/* Col 4 — Contact */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: "#34E12E", letterSpacing: 2.5, textTransform: "uppercase", margin: "0 0 18px" }}>
                {lang === "pl" ? "Kontakt" : "Contact"}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <a href="tel:+48730771568" className="footer-contact-link">
                  <IconPhone /><span>+48 730 771 568</span>
                </a>
                <a href="mailto:biuro@projstog.pl" className="footer-contact-link">
                  <IconMail /><span>biuro@projstog.pl</span>
                </a>
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#3d5e3a", fontSize: 13 }}>
                  <IconMapPin /><span>Mielec, Podkarpackie</span>
                </div>
              </div>

              {/* CTA */}
              <a href="mailto:biuro@projstog.pl" className="footer-cta" style={{ marginTop: 24 }}>
                <IconMail />
                {lang === "pl" ? "Napisz do mnie" : "Get in touch"}
              </a>
            </div>

          </div>

          {/* Separator */}
          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(52,225,46,0.12), transparent)", marginBottom: 28 }} />

          {/* Bottom bar */}
          <div className="footer-bottom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontSize: 12, color: "#2d4a2a", margin: 0 }}>
              &copy; {new Date().getFullYear()} PROJSTOG · Oscar Grzywa · Mielec, Polska
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <a href="/polityka-prywatnosci" className="footer-link" style={{ fontSize: 12 }}>
                {lang === "pl" ? "Polityka prywatności" : "Privacy Policy"}
              </a>
              <span style={{ color: "#1d3a1a", fontSize: 12 }}>·</span>
              <a href="/regulamin" className="footer-link" style={{ fontSize: 12 }}>
                {lang === "pl" ? "Regulamin" : "Terms"}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

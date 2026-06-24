"use client";

import { useState } from "react";
import { Nav } from "./components/Nav";
import { ContactForm } from "./components/ContactForm";
import { AnimateOnScroll } from "./components/AnimateOnScroll";
import { HeroZoom } from "./components/HeroZoom";
import { ServicesSection } from "./components/ServicesSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { ProcessSection } from "./components/ProcessSection";
import { Footer } from "./components/Footer";
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


// ── Social popup data ────────────────────────────────────────────────────────
const SOCIAL_ITEMS = [
  {
    key: "facebook", label: "Facebook",
    href: "https://www.facebook.com/oscar.grzywa",
    display: "Oscar Grzywa",
    title: "Facebook",
    desc: "Odwiedź mój prywatny profil na Facebooku",
    cta: "Przejdź na Facebooka →",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877F2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
    btnIcon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  },
  {
    key: "instagram", label: "Instagram",
    href: "https://www.instagram.com/oscargrzywa",
    display: "@oscargrzywa",
    title: "Instagram",
    desc: "Obserwuj PROJSTOG na Instagramie",
    cta: "Otwórz Instagram →",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#ig)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#fd5949"/><stop offset="50%" stopColor="#d6249f"/><stop offset="100%" stopColor="#285AEB"/></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
    btnIcon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  },
  {
    key: "linkedin", label: "LinkedIn",
    href: "https://www.linkedin.com/in/oscar-grzywa-2885942a3/",
    display: "Oscar Grzywa",
    title: "LinkedIn",
    desc: "Połącz się ze mną na LinkedIn",
    cta: "Przejdź na LinkedIn →",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="#0A66C2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
    btnIcon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    key: "mail", label: "E-mail",
    href: "mailto:biuro@projstog.pl",
    display: "biuro@projstog.pl",
    title: "Napisz wiadomość",
    desc: "Odpiszę tego samego dnia lub rano",
    cta: "Napisz maila →",
    isContact: true,
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34E12E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    btnIcon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  },
  {
    key: "phone", label: "Telefon",
    href: "tel:+48730771568",
    display: "+48 730 771 568",
    title: "Zadzwoń",
    desc: "Odbieram osobiście — bez pośredników",
    cta: "Zadzwoń teraz →",
    isContact: true,
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34E12E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.3a16 16 0 0 0 6 6l.85-1.04a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 15h.52a2 2 0 0 1 0 1.92z"/></svg>,
    btnIcon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.3a16 16 0 0 0 6 6l.85-1.04a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 15h.52a2 2 0 0 1 0 1.92z"/></svg>,
  },
];

function SocialModal({ item, onClose }: { item: typeof SOCIAL_ITEMS[number]; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(item.display).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", padding: "20px", animation: "backdropIn 0.2s ease" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: "rgba(5,10,5,0.97)", border: "1px solid rgba(52,225,46,0.20)", borderRadius: 24, padding: "36px 32px", maxWidth: 340, width: "100%", position: "relative", boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(52,225,46,0.08)", animation: "modalIn 0.28s cubic-bezier(0.22,1,0.36,1)" }}
      >
        {/* Close X */}
        <button onClick={onClose} aria-label="Zamknij" style={{ position: "absolute", top: 14, right: 14, width: 32, height: 32, borderRadius: 8, background: "rgba(52,225,46,0.08)", border: "1px solid rgba(52,225,46,0.15)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#4a6347" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {/* Icon */}
        <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(52,225,46,0.06)", border: "1px solid rgba(52,225,46,0.14)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          {item.icon}
        </div>

        {/* Title + desc */}
        <p style={{ fontSize: 10, color: "#34E12E", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 6px" }}>{item.label}</p>
        <h3 style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 800, fontSize: "1.25rem", color: "#ECE7DD", margin: "0 0 8px", letterSpacing: "-0.02em" }}>{item.title}</h3>
        <p style={{ fontSize: 14, color: "#6b8068", margin: "0 0 20px", lineHeight: 1.6 }}>{item.desc}</p>

        {/* Display value */}
        <div style={{ background: "rgba(52,225,46,0.05)", border: "1px solid rgba(52,225,46,0.12)", borderRadius: 12, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 14, fontWeight: 700, color: "#ECE7DD", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.display}</span>
          {(item as { isContact?: boolean }).isContact && (
            <button
              onClick={handleCopy}
              style={{ background: copied ? "rgba(52,225,46,0.18)" : "rgba(52,225,46,0.08)", border: `1px solid ${copied ? "rgba(52,225,46,0.4)" : "rgba(52,225,46,0.16)"}`, borderRadius: 7, padding: "5px 10px", cursor: "pointer", fontSize: 10, color: "#34E12E", fontWeight: 700, transition: "all 0.2s", width: 88, flexShrink: 0, textAlign: "center" }}
            >
              {copied ? "Skopiowano ✓" : "Kopiuj"}
            </button>
          )}
        </div>

        {/* CTA */}
        <a
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          onClick={onClose}
          className="cta-green"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "linear-gradient(135deg,#1B9D17,#34E12E)", color: "#060807", fontWeight: 700, fontSize: 14, padding: "13px 20px", borderRadius: 11, textDecoration: "none" }}
        >
          {item.btnIcon}
          {item.cta}
        </a>
      </div>
    </div>
  );
}

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
function BrowserMock({ bg, accentBg, url }: { bg: string; accentBg: string; url: string }) {
  const domain = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", background: bg, border: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Chrome bar */}
      <div style={{ padding: "8px 12px", background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,80,80,0.45)", flexShrink: 0 }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,180,0,0.35)", flexShrink: 0 }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(52,225,46,0.35)", flexShrink: 0 }} />
        <div style={{ flex: 1, height: 18, borderRadius: 5, background: "rgba(255,255,255,0.05)", marginLeft: 8, display: "flex", alignItems: "center", paddingLeft: 10, gap: 5 }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(52,225,46,0.5)" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span style={{ fontSize: 9, color: "rgba(52,225,46,0.6)", fontFamily: "var(--font-geist-mono)", letterSpacing: 0.3 }}>{domain}</span>
        </div>
      </div>
      {/* Wireframe content */}
      <div style={{ padding: "16px 14px", display: "flex", flexDirection: "column", gap: 10, minHeight: 130 }}>
        <div style={{ background: accentBg, borderRadius: 6, height: 32, display: "flex", alignItems: "center", paddingLeft: 10, gap: 8 }}>
          <div style={{ width: 18, height: 3, background: "rgba(52,225,46,0.5)", borderRadius: 2 }} />
          <div style={{ width: 32, height: 3, background: "rgba(52,225,46,0.25)", borderRadius: 2 }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          {[0.7, 0.5, 0.6].map((o, i) => <div key={i} style={{ height: 44, background: `rgba(52,225,46,${o * 0.06})`, borderRadius: 5 }} />)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 6 }}>
          <div style={{ height: 24, background: "rgba(255,255,255,0.03)", borderRadius: 5 }} />
          <div style={{ height: 24, background: "rgba(52,225,46,0.12)", borderRadius: 5 }} />
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const { lang } = useLang();
  const t = content[lang];
  const [socialKey, setSocialKey] = useState<string | null>(null);
  const activeSocial = SOCIAL_ITEMS.find(s => s.key === socialKey) ?? null;

  return (
    <div style={{ color: "#ECE7DD", position: "relative", zIndex: 1 }}>
      {activeSocial && <SocialModal item={activeSocial} onClose={() => setSocialKey(null)} />}
      <Nav />

      {/* ═══ HERO ═══════════════════════════════════════════════════════════════ */}
      <HeroZoom />

      {/* ═══ SERVICES ════════════════════════════════════════════════════════════ */}
      <ServicesSection />


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
                  <img src="/img/owner.jpg" alt="Oscar Grzywa" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(7,12,7,0.45) 0%, transparent 50%)", pointerEvents: "none" }} />
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "#ECE7DD", marginBottom: 4, margin: "0 0 4px" }}>Oscar Grzywa</h2>
                <div style={{ fontSize: 14, color: "#34E12E", fontWeight: 600, marginBottom: 8 }}>{t.owner.role}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#4a6347", marginBottom: 20 }}>
                  <IconMapPin /><span>{t.owner.city}</span>
                </div>
                {/* Social links — above stats */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                  {SOCIAL_ITEMS.map(item => (
                    <button key={item.key} onClick={() => setSocialKey(item.key)} aria-label={item.label} className="owner-social-btn" style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(52,225,46,0.07)", border: "1px solid rgba(52,225,46,0.14)", display: "flex", alignItems: "center", justifyContent: "center", color: "#4a6347", cursor: "pointer", transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)" }}>
                      {item.btnIcon}
                    </button>
                  ))}
                </div>
                {/* Stats grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                  {[["14+", "Usług cyfrowych"], ["24h", "Czas reakcji"], ["3+", "Lata doświadczenia"], ["100%", "Realizuję osobiście"]].map(([n, l]) => (
                    <div key={l} className="stat-card" style={{ background: "rgba(52,225,46,0.05)", border: "1px solid rgba(52,225,46,0.10)", borderRadius: 14, padding: "16px 18px", cursor: "default" }}>
                      <div className="stat-card-num" style={{ fontSize: 26, fontWeight: 900, color: "#34E12E", fontFamily: "var(--font-geist-mono)", lineHeight: 1 }}>{n}</div>
                      <div style={{ fontSize: 11, color: "#4a6347", marginTop: 6, lineHeight: 1.4 }}>{l}</div>
                    </div>
                  ))}
                </div>
                <a href="#kontakt" className="cta-green" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, background: "linear-gradient(135deg,#1B9D17,#34E12E)", color: "#060807", fontWeight: 700, fontSize: 14, padding: "14px 24px", borderRadius: 12, textDecoration: "none" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  {lang === "pl" ? "Skontaktuj się" : "Get in touch"}
                </a>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll from="right">
              <div>
                <h2 style={{ fontFamily: "var(--font-geist-sans)", fontSize: "clamp(1.9rem,3.5vw,3rem)", fontWeight: 900, color: "#ECE7DD", margin: "0 0 28px", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
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
            <h2 style={{ fontFamily: "var(--font-geist-sans)", fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 900, color: "#ECE7DD", lineHeight: 1.1, margin: "0 0 8px", letterSpacing: "-0.03em" }}>
              {t.portfolio.h2}
            </h2>
            <p style={{ fontSize: 15, color: "#6b8068", margin: "0 0 72px", maxWidth: 440 }}>
              Każdy projekt to wymierne rezultaty — nie piękna strona dla samej estetyki.
            </p>
          </AnimateOnScroll>

          <div className="portfolio-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {t.portfolio.items.map(({ name, cat, result, tech, bg, accentBg, url }, i) => (
              <AnimateOnScroll key={name} delay={i * 80}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="portfolio-card" style={{ borderRadius: 16, overflow: "hidden", background: bg, height: "100%", display: "flex", flexDirection: "column", textDecoration: "none" }}>
                  <div style={{ padding: 4 }}>
                    <BrowserMock bg={bg} accentBg={accentBg} url={url} />
                  </div>
                  <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 9, color: "#34E12E", fontWeight: 700, letterSpacing: 2, marginBottom: 6, textTransform: "uppercase" }}>{cat}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#ECE7DD", marginBottom: 10 }}>{name}</div>
                    <div style={{ fontSize: 12, color: "#6b8068", lineHeight: 1.6, marginBottom: 14, flex: 1 }}>{result}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {[...tech].map((t) => <span key={t} style={{ fontSize: 9, fontWeight: 600, padding: "2px 7px", borderRadius: 5, background: "rgba(255,255,255,0.04)", color: "#4a6347" }}>{t}</span>)}
                      </div>
                      <span style={{ fontSize: 11, color: "#34E12E", fontWeight: 600, whiteSpace: "nowrap", marginLeft: 8 }}>Otwórz →</span>
                    </div>
                  </div>
                </a>
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
            <h2 style={{ fontFamily: "var(--font-geist-sans)", fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 900, color: "#ECE7DD", lineHeight: 1.1, margin: "0 0 12px", letterSpacing: "-0.03em" }}>{t.contact.h2}</h2>
            <p style={{ fontSize: 15, color: "#6b8068", margin: "0 0 60px", maxWidth: 480 }}>{t.contact.sub}</p>
          </AnimateOnScroll>

          <div className="booking-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 56, alignItems: "stretch" }}>
            <AnimateOnScroll from="left" style={{ height: "100%" }}>
              <div className="booking-card" style={{ borderRadius: 20, padding: "44px 36px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", height: "100%" }}>
                <div style={{ width: 68, height: 68, borderRadius: 18, background: "rgba(52,225,46,0.08)", border: "1px solid rgba(52,225,46,0.16)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
                  <IconPhone />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#ECE7DD", margin: "0 0 10px" }}>{lang === "pl" ? "Zadzwoń" : "Call"}</h3>
                <p style={{ fontSize: 14, color: "#6b8068", lineHeight: 1.75, margin: "0 0 24px", maxWidth: 200 }}>{t.contact.availableText}</p>
                <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 19, fontWeight: 700, color: "#34E12E", marginBottom: 24 }}>{t.nav.phone}</div>
                <a href={`tel:${t.nav.phone.replace(/\s/g,"")}`} className="cta-green" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#1B9D17,#34E12E)", color: "#060807", fontWeight: 700, fontSize: 14, padding: "12px 28px", borderRadius: 10, textDecoration: "none", width: "100%", marginTop: "auto" }}>
                  {t.contact.phoneCta}
                </a>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll from="right" style={{ height: "100%" }}>
              <div className="booking-card" style={{ borderRadius: 20, padding: "44px 36px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", height: "100%" }}>
                <div style={{ width: 68, height: 68, borderRadius: 18, background: "rgba(52,225,46,0.08)", border: "1px solid rgba(52,225,46,0.16)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
                  <IconMail />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#ECE7DD", margin: "0 0 10px" }}>{lang === "pl" ? "Wyślij maila" : "Send an email"}</h3>
                <p style={{ fontSize: 14, color: "#6b8068", lineHeight: 1.75, margin: "0 0 28px", maxWidth: 220 }}>{lang === "pl" ? "Odpisuję tego samego dnia — najczęściej w ciągu kilku godzin." : "I reply the same day — usually within a few hours."}</p>
                <a href="mailto:biuro@projstog.pl" className="cta-outline" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, border: "1px solid rgba(52,225,46,0.32)", color: "#34E12E", fontWeight: 700, fontSize: 14, padding: "12px 28px", borderRadius: 10, textDecoration: "none", width: "100%", marginTop: "auto" }}>
                  biuro@projstog.pl →
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
          <AnimateOnScroll>
            <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>
              {/* Glass background */}
              <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", padding: "40px 36px 44px", background: "rgba(8,14,8,0.72)", backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)", border: "1px solid rgba(52,225,46,0.12)", boxShadow: "0 8px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(52,225,46,0.07)" }}>
                {/* Decorative gradient blob */}
                <div aria-hidden style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,225,46,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div aria-hidden style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(27,157,23,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
                {/* Header */}
                <div style={{ marginBottom: 28, position: "relative" }}>
                  <p style={{ fontSize: 9, fontWeight: 700, color: "#34E12E", letterSpacing: 3, textTransform: "uppercase", margin: "0 0 8px", opacity: 0.8 }}>Szybki kontakt</p>
                  <h3 style={{ fontFamily: "var(--font-geist-mono)", fontSize: "clamp(1.25rem,2.5vw,1.6rem)", fontWeight: 800, color: "#ECE7DD", margin: "0 0 8px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{lang === "pl" ? "Napisz — odezwę się tego samego dnia" : "Write — I'll reply the same day"}</h3>
                  <p style={{ fontSize: 13, color: "#4a6347", margin: 0, lineHeight: 1.6 }}>{lang === "pl" ? "Bez automatycznych odpowiedzi. Piszę osobiście." : "No automated replies. I write personally."}</p>
                </div>
                <ContactForm />
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>


      <Footer />
    </div>
  );
}

"use client";

import { useLang } from "./LangContext";
import { content } from "../lib/content";

const S = { width: 22, height: 22, fill: "none", stroke: "#34E12E", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const IconPhone  = () => <svg {...S} viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.3a16 16 0 0 0 6 6l.85-1.04a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 15h.52a2 2 0 0 1 0 1.92z" /></svg>;
const IconMail   = () => <svg {...S} viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>;
const IconMapPin = () => <svg {...S} viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;

function ProjstogIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={36} height={36} aria-hidden>
      <g stroke="#1B9D17" strokeWidth="2.6" fill="none" strokeLinecap="round" opacity="0.55">
        <path d="M10,27 L10,10 L27,10" /><path d="M90,73 L90,90 L73,90" />
      </g>
      <path d="M21,78 L21,55.5 Q21,52 24.5,52 L30.5,52 Q34,52 34,55.5 L34,78 Z" fill="#126410" />
      <path d="M43.5,78 L43.5,41.5 Q43.5,38 47.0,38 L53.0,38 Q56.5,38 56.5,41.5 L56.5,78 Z" fill="#1B9D17" />
      <path d="M66,78 L66,25.5 Q66,22 69.5,22 L75.5,22 Q79,22 79,25.5 L79,78 Z" fill="#34E12E" />
      <circle cx="72.5" cy="13" r="9" fill="#34E12E" opacity="0.18" />
      <circle cx="72.5" cy="13" r="5" fill="#34E12E" />
    </svg>
  );
}

export function Footer() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <footer style={{ background: "rgba(4,7,4,0.96)", borderTop: "1px solid rgba(52,225,46,0.10)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: 1, background: "linear-gradient(90deg, transparent, rgba(52,225,46,0.4), transparent)" }} aria-hidden />
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "30%", height: 80, background: "radial-gradient(ellipse at top, rgba(52,225,46,0.08) 0%, transparent 70%)", pointerEvents: "none" }} aria-hidden />

      <div style={{ maxWidth: 1600, margin: "0 auto", padding: "72px 40px 48px" }}>
        <div className="footer-cols" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.4fr", gap: 48, marginBottom: 56 }}>

          {/* Col 1 — Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <ProjstogIcon />
              <span style={{ fontFamily: "var(--font-geist-mono)", fontWeight: 900, fontSize: 17, color: "#ECE7DD", letterSpacing: 3 }}>PROJSTOG</span>
            </div>
            <p style={{ fontSize: 14, color: "#4a6347", lineHeight: 1.75, margin: "0 0 20px", maxWidth: 260 }}>
              {lang === "pl"
                ? "Cyfrowe rozwiązania, które zarabiają na Ciebie — strony, AI, automatyzacje i marketing z jednego miejsca."
                : "Digital solutions that earn for you — websites, AI, automations and marketing from one place."}
            </p>
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
              ).map(s => <a key={s} href="/#uslugi" className="footer-link">{s}</a>)}
            </nav>
          </div>

          {/* Col 3 — Navigation */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, color: "#34E12E", letterSpacing: 2.5, textTransform: "uppercase", margin: "0 0 18px" }}>
              {lang === "pl" ? "Nawigacja" : "Navigation"}
            </p>
            <nav style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {t.footer.links.map(([l, h]) => (
                <a key={l} href={`/${h}`} className="footer-link">{l}</a>
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
              <a href="https://maps.google.com/?q=Mielec,Podkarpackie" target="_blank" rel="noopener noreferrer" className="footer-contact-link footer-map-link">
                <IconMapPin /><span>Mielec, Podkarpackie</span>
              </a>
            </div>
            <a href="mailto:biuro@projstog.pl" className="footer-cta" style={{ marginTop: 24 }}>
              <IconMail />
              {lang === "pl" ? "Napisz do mnie" : "Get in touch"}
            </a>
          </div>

        </div>

        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(52,225,46,0.12), transparent)", marginBottom: 28 }} />

        <div className="footer-bottom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 12, color: "#2d4a2a", margin: 0 }}>
            &copy; {new Date().getFullYear()} PROJSTOG · Oscar Grzywa · Mielec, Polska
          </p>
          <a href="/polityka-prywatnosci" className="footer-link" style={{ fontSize: 12 }}>
            {lang === "pl" ? "Polityka prywatności" : "Privacy Policy"}
          </a>
        </div>
      </div>
    </footer>
  );
}

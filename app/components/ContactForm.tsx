"use client";

import { useState } from "react";

const SERVICES = [
  "Strona internetowa",
  "Sklep e-commerce",
  "Automatyzacja AI / Make / n8n",
  "Chatbot AI",
  "Marketing / Google Ads / SEO",
  "Social Media",
  "Copywriting",
  "System CRM",
  "Google Moja Firma",
  "Aplikacja na zamówienie",
  "Wsparcie techniczne",
  "Inne",
];

const label: React.CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 700, color: "#6b8068",
  marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8,
};
const inp: React.CSSProperties = {
  width: "100%", padding: "13px 16px", borderRadius: 8,
  background: "#0a110a", border: "1px solid rgba(52,225,46,0.15)",
  color: "#ECE7DD", fontSize: 14, boxSizing: "border-box", fontFamily: "inherit",
};

export function ContactForm() {
  const [name,     setName]     = useState("");
  const [phone,    setPhone]    = useState("");
  const [email,    setEmail]    = useState("");
  const [service,  setService]  = useState("");
  const [other,    setOther]    = useState("");
  const [message,  setMessage]  = useState("");
  const [gdpr,     setGdpr]     = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [sent,     setSent]     = useState(false);
  const [err,      setErr]      = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!gdpr) { setErr("Zaznacz zgodę przed wysłaniem."); return; }
    setErr("");
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  }

  if (sent) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "48px 0", gap: 16 }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(52,225,46,0.1)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 40px rgba(52,225,46,0.15)" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
            <polyline points="20 6 9 17 4 12" stroke="#34E12E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: "#ECE7DD", margin: 0 }}>Odezwę się!</h3>
        <p style={{ fontSize: 14, color: "#6b8068", margin: 0, lineHeight: 1.75 }}>
          Oddzwonię lub napiszę w ciągu 24 godzin.<br />
          <span style={{ color: "#ECE7DD", fontWeight: 600 }}>— Oscar</span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Imię i nazwisko */}
      <div>
        <label htmlFor="cf-name" style={label}>Imię i nazwisko *</label>
        <input id="cf-name" type="text" required value={name} onChange={e => setName(e.target.value)}
          placeholder="Jan Kowalski" className="form-field" style={inp} />
      </div>

      {/* Telefon + E-mail side by side */}
      <div className="contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label htmlFor="cf-phone" style={label}>Telefon *</label>
          <input id="cf-phone" type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
            placeholder="+48 600 000 000" className="form-field" style={inp} />
        </div>
        <div>
          <label htmlFor="cf-email" style={label}>E-mail *</label>
          <input id="cf-email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
            placeholder="jan@firma.pl" className="form-field" style={inp} />
        </div>
      </div>

      {/* Service select */}
      <div>
        <label htmlFor="cf-service" style={label}>Jaka usługa Cię interesuje? *</label>
        <select id="cf-service" required value={service} onChange={e => setService(e.target.value)}
          className="form-field"
          style={{ ...inp, appearance: "none", WebkitAppearance: "none", cursor: "pointer",
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%2334E12E' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
            paddingRight: 40,
          }}>
          <option value="" disabled>Wybierz usługę...</option>
          {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Other service text input — shown when "Inne" is selected */}
      {service === "Inne" && (
        <div>
          <label htmlFor="cf-other" style={label}>Opisz czego potrzebujesz *</label>
          <input id="cf-other" type="text" required value={other} onChange={e => setOther(e.target.value)}
            placeholder="np. platforma e-learningowa, system rezerwacji..." className="form-field" style={inp} />
        </div>
      )}

      {/* Wiadomość (optional) */}
      <div>
        <label htmlFor="cf-msg" style={label}>Wiadomość (opcjonalnie)</label>
        <textarea id="cf-msg" value={message} onChange={e => setMessage(e.target.value)}
          placeholder="Dodatkowe informacje, pytania, termin realizacji..."
          className="form-field"
          rows={3}
          style={{ ...inp, resize: "vertical", minHeight: 90, lineHeight: 1.6 }} />
      </div>

      {/* GDPR checkbox */}
      <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}>
        <div style={{ position: "relative", flexShrink: 0, marginTop: 1 }}>
          <input type="checkbox" checked={gdpr} onChange={e => setGdpr(e.target.checked)}
            style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
          <div style={{
            width: 18, height: 18, borderRadius: 5,
            background: gdpr ? "linear-gradient(135deg,#1B9D17,#34E12E)" : "#0a110a",
            border: `1.5px solid ${gdpr ? "#34E12E" : "rgba(52,225,46,0.25)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}>
            {gdpr && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#060807" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="20 6 9 17 4 12"/></svg>}
          </div>
        </div>
        <span style={{ fontSize: 12, color: "#4a6347", lineHeight: 1.65 }}>
          Wyrażam zgodę na przetwarzanie moich danych osobowych przez Oscara Grzywa (PROJSTOG) w celu nawiązania kontaktu i przedstawienia oferty, zgodnie z{" "}
          <a href="#kontakt" style={{ color: "#34E12E", textDecoration: "underline" }}>Polityką Prywatności</a>. Dane nie będą udostępniane osobom trzecim. *
        </span>
      </label>

      {err && <p style={{ fontSize: 12, color: "#f87171", margin: 0 }}>{err}</p>}

      <button type="submit" disabled={loading}
        className="cta-green"
        style={{
          background: "linear-gradient(135deg,#1B9D17,#34E12E)",
          color: "#060807", fontWeight: 700, fontSize: 15,
          padding: "15px", borderRadius: 10, border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
          boxShadow: "0 0 28px rgba(52,225,46,0.25)", letterSpacing: 0.3,
          width: "100%",
        }}>
        {loading ? "Wysyłanie..." : "Wyślij →"}
      </button>

      <p style={{ fontSize: 11, color: "#3d5e3a", margin: 0, textAlign: "center" }}>
        * Pola obowiązkowe · Pierwsza rozmowa jest bezpłatna
      </p>
    </form>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Nie znaleziono strony | PROJSTOG",
};

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh", background: "#060807", color: "#ECE7DD",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "40px 24px", textAlign: "center", position: "relative", overflow: "hidden",
    }}>

      {/* Background grid */}
      <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="g404" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            <circle cx="24" cy="24" r="1.2" fill="#34E12E" />
            <line x1="24" y1="24" x2="48" y2="24" stroke="#34E12E" strokeWidth="0.5" />
            <line x1="24" y1="24" x2="24" y2="48" stroke="#34E12E" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#g404)" />
      </svg>

      {/* Glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,225,46,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Corner brackets */}
      <svg aria-hidden style={{ position: "absolute", top: 40, left: 40, opacity: 0.25 }} width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M0 20 L0 0 L20 0" stroke="#34E12E" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <svg aria-hidden style={{ position: "absolute", bottom: 40, right: 40, opacity: 0.25 }} width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M40 20 L40 40 L20 40" stroke="#34E12E" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Big 404 */}
        <div style={{
          fontFamily: "var(--font-geist-mono)", fontWeight: 900,
          fontSize: "clamp(7rem, 25vw, 14rem)", lineHeight: 1,
          color: "transparent",
          backgroundImage: "linear-gradient(135deg, rgba(52,225,46,0.12) 0%, rgba(52,225,46,0.04) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.06em",
          userSelect: "none",
          marginBottom: -12,
          textShadow: "none",
          filter: "drop-shadow(0 0 60px rgba(52,225,46,0.15))",
        }}>
          404
        </div>

        {/* Divider line */}
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, transparent, #34E12E, transparent)", margin: "0 auto 32px", borderRadius: 2 }} />

        {/* Title */}
        <h1 style={{
          fontFamily: "var(--font-geist-sans)", fontWeight: 900,
          fontSize: "clamp(1.5rem, 5vw, 2.5rem)", color: "#ECE7DD",
          margin: "0 0 16px", letterSpacing: "-0.035em",
        }}>
          Nie znaleziono strony
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: 16, color: "#4a6347", maxWidth: 360, margin: "0 auto 48px", lineHeight: 1.7 }}>
          Strona, której szukasz, nie istnieje lub została przeniesiona pod inny adres.
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg,#1B9D17,#34E12E)", color: "#060807",
              fontWeight: 700, fontSize: 14, padding: "13px 28px", borderRadius: 11,
              textDecoration: "none", boxShadow: "0 8px 32px rgba(52,225,46,0.3)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Wróć na stronę główną
          </Link>
          <a
            href="mailto:biuro@projstog.pl"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "transparent", color: "#34E12E",
              fontWeight: 700, fontSize: 14, padding: "12px 28px", borderRadius: 11,
              textDecoration: "none", border: "1px solid rgba(52,225,46,0.22)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Napisz do mnie
          </a>
        </div>

        {/* Brand tag */}
        <div style={{ marginTop: 64, display: "flex", alignItems: "center", gap: 8, justifyContent: "center", opacity: 0.35 }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="20" height="20">
            <path d="M21,78 L21,55.5 Q21,52 24.5,52 L30.5,52 Q34,52 34,55.5 L34,78 Z" fill="#126410" />
            <path d="M43.5,78 L43.5,41.5 Q43.5,38 47.0,38 L53.0,38 Q56.5,38 56.5,41.5 L56.5,78 Z" fill="#1B9D17" />
            <path d="M66,78 L66,25.5 Q66,22 69.5,22 L75.5,22 Q79,22 79,25.5 L79,78 Z" fill="#34E12E" />
          </svg>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 12, fontWeight: 800, letterSpacing: 2.5, color: "#ECE7DD" }}>PROJSTOG</span>
        </div>

      </div>
    </div>
  );
}

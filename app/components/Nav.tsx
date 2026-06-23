"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLang } from "./LangContext";
import { content } from "../lib/content";

function ProjstogIcon({ size = 28 }: { size?: number }) {
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

export function Nav() {
  const { lang, setLang } = useLang();
  const t = content[lang].nav;

  const [open,    setOpen]    = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y < 80) { setVisible(true); }
      else         { setVisible(y < lastScrollY.current); }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Nawigacja główna"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(6,8,7,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(52,225,46,0.08)" : "1px solid transparent",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), background 0.3s, border-color 0.3s",
      }}
    >
      <div style={{ maxWidth: 1600, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>

        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }} aria-label="PROJSTOG">
          <ProjstogIcon size={28} />
          <span style={{ fontFamily: "var(--font-geist-mono)", fontWeight: 800, fontSize: 15, color: "#ECE7DD", letterSpacing: 3 }}>PROJSTOG</span>
        </a>

        {/* Desktop centre links */}
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {t.links.map(({ label, href }) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
        </div>

        {/* Desktop right */}
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Phone */}
          <a href={`tel:${t.phone.replace(/\s/g, "")}`} style={{ fontSize: 13, fontWeight: 600, color: "#ECE7DD", textDecoration: "none", letterSpacing: 0.3, whiteSpace: "nowrap" }}>
            {t.phone}
          </a>

          {/* PL | EN toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            {(["pl", "en"] as const).map((l, i) => (
              <React.Fragment key={l}>
                {i > 0 && (
                  <span style={{ fontSize: 11, color: "rgba(52,225,46,0.25)", margin: "0 4px" }}>|</span>
                )}
                <button
                  onClick={() => setLang(l)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: 12, fontWeight: 700, letterSpacing: 1.5,
                    color: lang === l ? "#34E12E" : "#4a6347",
                    padding: "2px 0",
                    transition: "color 0.2s",
                    textTransform: "uppercase",
                  }}
                >
                  {l}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#kontakt"
            style={{ background: "linear-gradient(135deg,#1B9D17,#34E12E)", color: "#060807", fontWeight: 700, fontSize: 13, padding: "9px 20px", borderRadius: 8, textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(52,225,46,0.2)" }}
          >
            {t.cta}
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="nav-burger"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={open}
          style={{ display: "none", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "none", border: "none", cursor: "pointer", padding: 8, gap: 5, width: 40, height: 40 }}
        >
          <span style={{ display: "block", width: 22, height: 2, background: "#34E12E", borderRadius: 2, transition: "transform 0.3s", transform: open ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#34E12E", borderRadius: 2, transition: "opacity 0.3s", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#34E12E", borderRadius: 2, transition: "transform 0.3s", transform: open ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ padding: "8px 24px 24px", borderTop: "1px solid rgba(52,225,46,0.07)", background: "rgba(6,8,7,0.98)" }}>
          {t.links.map(({ label, href }) => (
            <a key={href} href={href} onClick={() => setOpen(false)} style={{ display: "block", color: "#ECE7DD", textDecoration: "none", padding: "13px 0", fontSize: 16, fontWeight: 500, borderBottom: "1px solid rgba(52,225,46,0.06)" }}>
              {label}
            </a>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid rgba(52,225,46,0.06)" }}>
            <a href={`tel:${t.phone.replace(/\s/g, "")}`} style={{ fontSize: 14, fontWeight: 600, color: "#ECE7DD", textDecoration: "none" }}>{t.phone}</a>
            <div style={{ display: "flex", gap: 8 }}>
              {(["pl", "en"] as const).map(l => (
                <button key={l} onClick={() => setLang(l)} style={{ background: "none", border: `1px solid ${lang === l ? "#34E12E" : "rgba(52,225,46,0.2)"}`, borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: lang === l ? "#34E12E" : "#4a6347", padding: "4px 10px", textTransform: "uppercase", transition: "all 0.2s" }}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <a href="#kontakt" onClick={() => setOpen(false)} style={{ display: "block", marginTop: 16, textAlign: "center", background: "linear-gradient(135deg,#1B9D17,#34E12E)", color: "#060807", fontWeight: 700, fontSize: 15, padding: "13px", borderRadius: 8, textDecoration: "none" }}>
            {t.cta}
          </a>
        </div>
      )}
    </nav>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLang } from "./LangContext";
import { content } from "../lib/content";

function ProjstogIcon({ size = 28 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size} aria-hidden>
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

  const [open,     setOpen]     = useState(false);
  const [visible,  setVisible]  = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setVisible(y < 80 || y < lastScrollY.current);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav
        aria-label="Nawigacja główna"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
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

          {/* Desktop links */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {t.links.map(({ label, href }) => (
              <a key={href} href={href} className="nav-link">{label}</a>
            ))}
          </div>

          {/* Desktop right */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <a href={`tel:${t.phone.replace(/\s/g,"")}`} style={{ fontSize: 13, fontWeight: 600, color: "#ECE7DD", textDecoration: "none", letterSpacing: 0.3, whiteSpace: "nowrap" }}>{t.phone}</a>
            <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
              {(["pl","en"] as const).map((l, i) => (
                <React.Fragment key={l}>
                  {i > 0 && <span style={{ fontSize: 11, color: "rgba(52,225,46,0.25)", margin: "0 4px" }}>|</span>}
                  <button onClick={() => setLang(l)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, letterSpacing: 1.5, color: lang === l ? "#34E12E" : "#4a6347", padding: "2px 0", transition: "color 0.2s", textTransform: "uppercase" }}>{l}</button>
                </React.Fragment>
              ))}
            </div>
            <a href="#kontakt" style={{ background: "linear-gradient(135deg,#1B9D17,#34E12E)", color: "#060807", fontWeight: 700, fontSize: 13, padding: "9px 20px", borderRadius: 8, textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(52,225,46,0.2)" }}>{t.cta}</a>
          </div>

          {/* Hamburger button — 3 bars, always */}
          <button
            className="nav-burger"
            onClick={() => setOpen(true)}
            aria-label="Otwórz menu"
            aria-expanded={open}
            style={{
              display: "none", alignItems: "center", justifyContent: "center",
              width: 44, height: 44, borderRadius: 12, cursor: "pointer",
              background: "rgba(52,225,46,0.06)",
              border: "1px solid rgba(52,225,46,0.14)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ display: "block", width: 22, height: 2, borderRadius: 2, background: "#34E12E" }} />
              <span style={{ display: "block", width: 16, height: 2, borderRadius: 2, background: "#34E12E" }} />
              <span style={{ display: "block", width: 22, height: 2, borderRadius: 2, background: "#34E12E" }} />
            </div>
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        onClick={close}
        style={{
          position: "fixed", inset: 0, zIndex: 148,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
        aria-hidden
      />

      {/* Drawer — slides in from right */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu nawigacji"
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "min(340px, 92vw)",
          zIndex: 149,
          background: "rgba(5,8,5,0.98)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderLeft: "1px solid rgba(52,225,46,0.10)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.42s cubic-bezier(0.22,1,0.36,1)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Drawer header — logo + X */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: 68, borderBottom: "1px solid rgba(52,225,46,0.07)", flexShrink: 0 }}>
          <a href="#" onClick={close} style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
            <ProjstogIcon size={24} />
            <span style={{ fontFamily: "var(--font-geist-mono)", fontWeight: 800, fontSize: 13, color: "#ECE7DD", letterSpacing: 2.5 }}>PROJSTOG</span>
          </a>
          {/* X close button */}
          <button
            onClick={close}
            aria-label="Zamknij menu"
            style={{
              width: 40, height: 40, borderRadius: 10, cursor: "pointer",
              background: "rgba(52,225,46,0.07)",
              border: "1px solid rgba(52,225,46,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, color: "#34E12E",
              transition: "background 0.2s, border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(52,225,46,0.14)"; (e.currentTarget as HTMLButtonElement).style.transform = "rotate(90deg)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(52,225,46,0.07)"; (e.currentTarget as HTMLButtonElement).style.transform = "rotate(0deg)"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: "8px 0" }}>
          {t.links.map(({ label, href }, i) => (
            <a
              key={href}
              href={href}
              onClick={close}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 22px",
                textDecoration: "none",
                borderBottom: "1px solid rgba(52,225,46,0.05)",
                color: "#ECE7DD",
                fontSize: "1.1rem",
                fontWeight: 700,
                fontFamily: "var(--font-geist-sans)",
                letterSpacing: "-0.01em",
                transform: open ? "translateX(0)" : "translateX(18px)",
                opacity: open ? 1 : 0,
                transition: `transform 0.38s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s, opacity 0.3s ease ${i * 0.06}s, color 0.18s`,
              }}
              className="mobile-menu-link"
            >
              <span style={{
                fontFamily: "var(--font-geist-mono)", fontSize: "0.6em",
                color: "#34E12E", opacity: 0.5, minWidth: "2em", textAlign: "right",
                fontWeight: 600, letterSpacing: 0.5, lineHeight: 1,
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {label}
              <span style={{ marginLeft: "auto", fontSize: 12, color: "rgba(52,225,46,0.3)" }}>→</span>
            </a>
          ))}
        </nav>

        {/* Bottom — lang + CTA */}
        <div style={{
          padding: "16px 20px 28px", borderTop: "1px solid rgba(52,225,46,0.07)",
          display: "flex", flexDirection: "column", gap: 12, flexShrink: 0,
          transform: open ? "translateY(0)" : "translateY(16px)",
          opacity: open ? 1 : 0,
          transition: `transform 0.38s cubic-bezier(0.22,1,0.36,1) ${t.links.length * 0.06 + 0.06}s, opacity 0.3s ease ${t.links.length * 0.06 + 0.06}s`,
        }}>
          {/* Lang toggle */}
          <div style={{ display: "flex", gap: 4, background: "rgba(52,225,46,0.04)", border: "1px solid rgba(52,225,46,0.09)", borderRadius: 9, padding: 3, alignSelf: "flex-start" }}>
            {(["pl","en"] as const).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                background: lang === l ? "rgba(52,225,46,0.13)" : "none",
                border: "none", borderRadius: 6, cursor: "pointer",
                fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
                color: lang === l ? "#34E12E" : "#4a6347",
                padding: "7px 14px", transition: "all 0.2s",
              }}>{l}</button>
            ))}
          </div>
          {/* CTA */}
          <a
            href="#kontakt"
            onClick={close}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "linear-gradient(135deg,#1B9D17,#34E12E)", color: "#060807", fontWeight: 700, fontSize: 14, borderRadius: 10, textDecoration: "none", padding: "14px 20px" }}
          >
            {t.cta}
          </a>
        </div>
      </div>
    </>
  );
}

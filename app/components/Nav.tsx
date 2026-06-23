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

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34E12E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.3a16 16 0 0 0 6 6l.85-1.04a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 15h.52a2 2 0 0 1 0 1.92z" />
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

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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

          {/* Hamburger button */}
          <button
            className="nav-burger"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={open}
            style={{
              display: "none", alignItems: "center", justifyContent: "center",
              width: 44, height: 44, borderRadius: 12, cursor: "pointer",
              background: open ? "rgba(52,225,46,0.12)" : "rgba(52,225,46,0.06)",
              border: `1px solid ${open ? "rgba(52,225,46,0.32)" : "rgba(52,225,46,0.14)"}`,
              transition: "background 0.25s, border-color 0.25s",
              position: "relative", zIndex: 200,
              flexShrink: 0,
            }}
          >
            <div style={{ position: "relative", width: 22, height: 15 }}>
              {/* Line 1 */}
              <span style={{
                position: "absolute", left: 0, width: "100%", height: 2, borderRadius: 2,
                background: "#34E12E",
                top: open ? "50%" : 0,
                transform: open ? "translateY(-50%) rotate(45deg)" : "translateY(0)",
                transformOrigin: "center",
                transition: "top 0.32s cubic-bezier(0.22,1,0.36,1), transform 0.32s cubic-bezier(0.22,1,0.36,1)",
              }} />
              {/* Line 2 */}
              <span style={{
                position: "absolute", left: 0, height: 2, borderRadius: 2,
                background: "#34E12E",
                top: "50%", transform: "translateY(-50%)",
                width: open ? 0 : "70%",
                opacity: open ? 0 : 1,
                transition: "width 0.22s ease 0.05s, opacity 0.18s ease 0.05s",
              }} />
              {/* Line 3 */}
              <span style={{
                position: "absolute", left: 0, width: "100%", height: 2, borderRadius: 2,
                background: "#34E12E",
                bottom: open ? "50%" : 0,
                transform: open ? "translateY(50%) rotate(-45deg)" : "translateY(0)",
                transformOrigin: "center",
                transition: "bottom 0.32s cubic-bezier(0.22,1,0.36,1), transform 0.32s cubic-bezier(0.22,1,0.36,1)",
              }} />
            </div>
          </button>
        </div>
      </nav>

      {/* Full-screen mobile overlay */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu nawigacji"
        style={{
          position: "fixed", inset: 0, zIndex: 150,
          background: "rgba(4,6,4,0.97)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
          display: "flex",
          flexDirection: "column",
          padding: "88px 40px 48px",
          overflowY: "auto",
        }}
      >
        {/* Decorative watermark */}
        <div aria-hidden style={{
          position: "absolute", bottom: "5%", right: "-5%",
          fontFamily: "var(--font-geist-mono)", fontSize: "38vw", fontWeight: 900,
          color: "#34E12E", opacity: 0.025, pointerEvents: "none",
          lineHeight: 0.9, letterSpacing: "-4vw", userSelect: "none",
        }}>P<br/>S</div>

        {/* Top accent line */}
        <div aria-hidden style={{ position: "absolute", top: 68, left: 40, right: 40, height: 1, background: "linear-gradient(90deg,rgba(52,225,46,0.25),rgba(52,225,46,0.05))" }} />

        {/* Navigation links */}
        <nav style={{ flex: 1, marginTop: 16 }}>
          {t.links.map(({ label, href }, i) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "16px 0",
                textDecoration: "none",
                borderBottom: "1px solid rgba(52,225,46,0.07)",
                color: "#ECE7DD",
                fontSize: "clamp(1.5rem,6vw,2.4rem)",
                fontWeight: 800,
                fontFamily: "var(--font-geist-mono)",
                letterSpacing: "-0.02em",
                transform: open ? "translateX(0)" : "translateX(28px)",
                opacity: open ? 1 : 0,
                transition: `transform 0.45s cubic-bezier(0.22,1,0.36,1) ${i * 0.07}s, opacity 0.35s ease ${i * 0.07}s, color 0.2s`,
              }}
              className="mobile-menu-link"
            >
              <span style={{
                fontFamily: "var(--font-geist-mono)", fontSize: "0.45em",
                color: "#34E12E", opacity: 0.45, minWidth: "2.2em", textAlign: "right",
                fontWeight: 600, letterSpacing: 0, lineHeight: 1,
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {label}
            </a>
          ))}
        </nav>

        {/* Bottom section */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 16, marginTop: 32,
          transform: open ? "translateY(0)" : "translateY(20px)",
          opacity: open ? 1 : 0,
          transition: `transform 0.45s cubic-bezier(0.22,1,0.36,1) ${t.links.length * 0.07 + 0.08}s, opacity 0.35s ease ${t.links.length * 0.07 + 0.08}s`,
        }}>
          {/* Phone */}
          <a href={`tel:${t.phone.replace(/\s/g,"")}`} style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(52,225,46,0.07)", border: "1px solid rgba(52,225,46,0.14)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <PhoneIcon />
            </div>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 17, fontWeight: 700, color: "#34E12E" }}>{t.phone}</span>
          </a>

          {/* Language + CTA */}
          <div style={{ display: "flex", gap: 12, alignItems: "stretch" }}>
            <div style={{ display: "flex", gap: 4, background: "rgba(52,225,46,0.04)", border: "1px solid rgba(52,225,46,0.1)", borderRadius: 10, padding: 4, flexShrink: 0 }}>
              {(["pl","en"] as const).map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  background: lang === l ? "rgba(52,225,46,0.13)" : "none",
                  border: "none", borderRadius: 7, cursor: "pointer",
                  fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
                  color: lang === l ? "#34E12E" : "#4a6347",
                  padding: "8px 14px", transition: "all 0.2s",
                }}>{l}</button>
              ))}
            </div>
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#1B9D17,#34E12E)", color: "#060807", fontWeight: 700, fontSize: 15, borderRadius: 10, textDecoration: "none" }}
            >
              {t.cta}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

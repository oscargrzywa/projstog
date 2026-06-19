"use client";

import { useState } from "react";

function ProjstogLogo({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.2)}
      viewBox="0 0 40 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={true}
    >
      <path d="M20 2L33 14H7L20 2Z" fill="#34E12E" />
      <rect x="7" y="16" width="26" height="9" rx="1" fill="#34E12E" opacity="0.85" />
      <rect x="4" y="27" width="32" height="9" rx="1" fill="#34E12E" opacity="0.65" />
      <rect x="1" y="38" width="38" height="9" rx="1" fill="#34E12E" opacity="0.45" />
    </svg>
  );
}

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Usługi",        href: "#uslugi" },
  { label: "Jak działamy",  href: "#proces" },
  { label: "Portfolio",     href: "#portfolio" },
  { label: "O właścicielu", href: "#wlasciciel" },
  { label: "Kontakt",       href: "#kontakt" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="Nawigacja główna"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(6,8,7,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(52,225,46,0.09)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
          aria-label="PROJSTOG – strona główna"
        >
          <ProjstogLogo size={30} />
          <span
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontWeight: 800,
              fontSize: 17,
              color: "#ECE7DD",
              letterSpacing: 3,
            }}
          >
            PROJSTOG
          </span>
        </a>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} className="nav-link">
              {label}
            </a>
          ))}
          <a
            href="#kontakt"
            style={{
              background: "linear-gradient(135deg,#1B9D17,#34E12E)",
              color: "#060807",
              fontWeight: 700,
              fontSize: 14,
              padding: "10px 20px",
              borderRadius: 8,
              textDecoration: "none",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 16px rgba(52,225,46,0.2)",
            }}
          >
            Darmowa wycena
          </a>
        </div>

        {/* Burger button */}
        <button
          className="nav-burger"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={open}
          style={{
            display: "none",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            gap: 5,
            width: 40,
            height: 40,
          }}
        >
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "#34E12E",
              borderRadius: 2,
              transition: "transform 0.3s",
              transform: open ? "rotate(45deg) translateY(7px)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "#34E12E",
              borderRadius: 2,
              transition: "opacity 0.3s",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "#34E12E",
              borderRadius: 2,
              transition: "transform 0.3s",
              transform: open ? "rotate(-45deg) translateY(-7px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div style={{ padding: "8px 24px 24px", borderTop: "1px solid rgba(52,225,46,0.07)" }}>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                color: "#ECE7DD",
                textDecoration: "none",
                padding: "13px 0",
                fontSize: 16,
                fontWeight: 500,
                borderBottom: "1px solid rgba(52,225,46,0.06)",
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              marginTop: 16,
              textAlign: "center",
              background: "linear-gradient(135deg,#1B9D17,#34E12E)",
              color: "#060807",
              fontWeight: 700,
              fontSize: 15,
              padding: "13px",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            Darmowa wycena
          </a>
        </div>
      )}
    </nav>
  );
}

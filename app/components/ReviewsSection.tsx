"use client";

import React from "react";
import { useLang } from "./LangContext";
import { AnimateOnScroll } from "./AnimateOnScroll";

// ── UZUPEŁNIJ: Wstaw swoje opinie z Google poniżej ───────────────────────────
// Zmień: name, date, stars, text, initials (pierwsze litery imienia i nazwiska)
const REVIEWS = [
  {
    name: "Imię Nazwisko",
    date: "Styczeń 2025",
    stars: 5,
    text: "Wstaw tutaj treść pierwszej opinii z Google. Skopiuj ją bezpośrednio z Google Maps i wklej w to miejsce.",
    initials: "IN",
    color: "#1B9D17",
  },
  {
    name: "Imię Nazwisko",
    date: "Luty 2025",
    stars: 5,
    text: "Wstaw tutaj treść drugiej opinii z Google. Możesz wybrać najdłuższą i najbardziej szczegółową — takie najlepiej konwertują.",
    initials: "IN",
    color: "#34E12E",
  },
  {
    name: "Imię Nazwisko",
    date: "Marzec 2025",
    stars: 5,
    text: "Wstaw tutaj treść trzeciej opinii z Google. Trzy opinie to minimum — możesz dodać czwartą duplikując ten obiekt.",
    initials: "IN",
    color: "#00C8A0",
  },
] as const;

// ── Google "G" logo (SVG) ─────────────────────────────────────────────────────
function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

// ── Stars ─────────────────────────────────────────────────────────────────────
function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[0,1,2,3,4].map(i => (
        <span key={i} style={{ fontSize: 15, color: i < count ? "#febc2e" : "rgba(254,188,46,0.22)", lineHeight: 1 }}>★</span>
      ))}
    </div>
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────────
function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${color}22`, border: `2px solid ${color}44`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontSize: 16, fontWeight: 800, color: color }}>{initials}</span>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export function ReviewsSection() {
  const { lang } = useLang();

  const heading   = lang === "pl" ? "Co mówią klienci"         : "What clients say";
  const subLabel  = lang === "pl" ? "Opinie Google"            : "Google Reviews";
  const overallLbl = lang === "pl" ? "Średnia ocena · Google"  : "Average rating · Google";
  const reviewsLbl = lang === "pl" ? "opinii"                  : "reviews";
  const viaBadge  = lang === "pl" ? "via Google"               : "via Google";

  return (
    <section id="opinie" style={{ padding: "120px 24px", background: "rgba(6,8,7,0.88)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <AnimateOnScroll>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 32, marginBottom: 64 }}>

            {/* Left: title */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <GoogleG size={16} />
                <p style={{ fontSize: 11, fontWeight: 700, color: "#34E12E", letterSpacing: 3, textTransform: "uppercase", margin: 0 }}>
                  {subLabel}
                </p>
              </div>
              <h2 style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 900, fontSize: "clamp(2rem,5vw,3.4rem)", color: "#fff", lineHeight: 1.1, margin: 0, letterSpacing: "-0.03em" }}>
                {heading}
              </h2>
            </div>

            {/* Right: overall rating */}
            <div style={{ display: "flex", alignItems: "center", gap: 20, background: "#0e130e", border: "1px solid rgba(52,225,46,0.1)", borderRadius: 16, padding: "20px 28px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 48, fontWeight: 900, color: "#ECE7DD", lineHeight: 1, letterSpacing: "-0.04em" }}>5.0</div>
                <div style={{ display: "flex", gap: 3, justifyContent: "center", margin: "6px 0 4px" }}>
                  {[0,1,2,3,4].map(i => <span key={i} style={{ fontSize: 16, color: "#febc2e" }}>★</span>)}
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: 0.5 }}>48 {reviewsLbl}</div>
              </div>
              <div style={{ width: 1, height: 56, background: "rgba(52,225,46,0.1)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <GoogleG size={20} />
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#ECE7DD" }}>Google</span>
                </div>
                <span style={{ fontSize: 11, color: "#6b8068", maxWidth: 120, lineHeight: 1.4 }}>{overallLbl}</span>
              </div>
            </div>

          </div>
        </AnimateOnScroll>

        {/* Review cards */}
        <div className="reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {REVIEWS.map((review, i) => (
            <AnimateOnScroll key={i} delay={i * 100}>
              <div className="review-card" style={{ height: "100%" }}>
                <div style={{ background: "#0e130e", border: "1px solid rgba(52,225,46,0.09)", borderRadius: 16, padding: "24px", height: "100%", display: "flex", flexDirection: "column", gap: 16, boxSizing: "border-box" }}>

                  {/* Top row: avatar + name + Google badge */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar initials={review.initials} color={review.color} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#ECE7DD", lineHeight: 1.3 }}>{review.name}</div>
                      <div style={{ fontSize: 11, color: "#6b8068", marginTop: 2 }}>{review.date}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(66,133,244,0.08)", border: "1px solid rgba(66,133,244,0.18)", borderRadius: 100, padding: "4px 10px", flexShrink: 0 }}>
                      <GoogleG size={12} />
                      <span style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.45)", letterSpacing: 0.3 }}>{viaBadge}</span>
                    </div>
                  </div>

                  {/* Stars */}
                  <Stars count={review.stars} />

                  {/* Review text */}
                  <p style={{ fontSize: 14, color: "#9aad96", lineHeight: 1.75, margin: 0, flex: 1, fontStyle: "italic" }}>
                    &ldquo;{review.text}&rdquo;
                  </p>

                  {/* Bottom accent line */}
                  <div style={{ height: 2, width: "30%", background: `linear-gradient(90deg,${review.color},transparent)`, borderRadius: 2 }} />

                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Link to Google */}
        <AnimateOnScroll>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#6b8068", fontSize: 13 }}>
              <GoogleG size={14} />
              <span>
                {lang === "pl"
                  ? "Wszystkie opinie dostępne na "
                  : "All reviews available on "}
                <span style={{ color: "#34E12E", fontWeight: 600 }}>Google Maps</span>
              </span>
            </div>
          </div>
        </AnimateOnScroll>

      </div>
    </section>
  );
}

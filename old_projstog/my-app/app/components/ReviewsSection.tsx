"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLang } from "./LangContext";
import { AnimateOnScroll } from "./AnimateOnScroll";

const REVIEWS = [
  { name: "Michał Wałęga",             initials: "MW", color: "#34E12E", stars: 5, text: "Współpraca z Panem Oscarem była super. Kontakt był bardzo dobry, Pan Oscar był konkretny i bardzo zaangażowany, zawsze służył pomocą i dawał różne pomysły na stronę. Moja decyzja o wyborze właśnie jego oferty była trafiona – strona została zrobiona szybciej niż zakładaliśmy (miało być 2–3 tygodnie, a była gotowa w niespełna dwa) i od razu można jej używać. Jestem bardzo zadowolony." },
  { name: "Katarzyna Kołek-Radłowska", initials: "KK", color: "#00C8A0", stars: 5, text: "Z pełnym przekonaniem polecam współpracę z biurem Projstog. Pan Oskar stworzył dla mnie stronę internetową, która jest nowoczesna, estetyczna i funkcjonalna. Kontakt z biurem był bezproblemowy i bardzo profesjonalny. Pan Oskar cierpliwie odpowiadał na każde moje pytanie." },
  { name: "Marta Ziółkowska",          initials: "MZ", color: "#a3e635", stars: 5, text: "Polecam współpracę z tą firmą. Jakość usług zdecydowanie spełniła moje oczekiwania. Profesjonalne i terminowe podejście do sprawy." },
  { name: "Leśny Dwór",               initials: "LD", color: "#34E12E", stars: 5, text: "Bardzo miła i konkretna współpraca, polecam jak najbardziej." },
  { name: "Mateusz Małek",            initials: "MM", color: "#00C8A0", stars: 5, text: "Polecam. Osoba godna zaufania z ciekawymi pomysłami." },
  { name: "Agnieszka Flis",           initials: "AF", color: "#a3e635", stars: 5, text: "Fachowa, profesjonalna pomoc. Duża wiedza i szeroki zakres działania. Spełnione oczekiwania. Bardzo dobry kontakt i pomoc w każdym temacie. Profesjonalne doradztwo. POLECAM" },
] as const;

const GAP = 20;

function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export function ReviewsSection() {
  const { lang } = useLang();
  const [active,     setActive]     = useState(0);
  const [animated,   setAnimated]   = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cw, setCw]  = useState(0);
  const n = REVIEWS.length;

  // Behaviour flags
  const isHovered = useRef(false);
  const isManual  = useRef(false);
  const nextFnRef = useRef<() => void>(() => {});

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const mobile = window.innerWidth <= 1024;
        setIsMobile(mobile);
        setCw(mobile
          ? containerRef.current.offsetWidth - 32
          : (containerRef.current.offsetWidth - GAP * 2) / 3
        );
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Wrap-aware navigation
  const goTo = useCallback((idx: number, manual = false) => {
    if (manual) isManual.current = true;
    const wrapped = ((idx % n) + n) % n;
    const distance = Math.abs(wrapped - active);
    if (distance > n / 2) {
      // Looping around: instant jump, then re-enable transition
      setAnimated(false);
      setActive(wrapped);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)));
    } else {
      setActive(wrapped);
      setAnimated(true);
    }
  }, [active, n]);

  const prev = useCallback((manual = false) => goTo(active - 1, manual), [active, goTo]);
  const next = useCallback((manual = false) => goTo(active + 1, manual), [active, goTo]);

  // Keep nextFnRef fresh for the auto-play interval
  useEffect(() => { nextFnRef.current = () => next(false); }, [next]);

  // Auto-play
  useEffect(() => {
    const id = setInterval(() => {
      if (!isHovered.current && !isManual.current) nextFnRef.current();
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // translateX: center active card (offset by 1 card on desktop to show prev/active/next)
  const tx = cw > 0 ? -(active * (cw + GAP)) + (isMobile ? 16 : (cw + GAP)) : 0;

  // Touch / mouse drag
  const touchStart = useRef(0);
  const dragStart  = useRef(0);
  const dragging   = useRef(false);
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const d = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(d) > 50) { if (d > 0) next(true); else prev(true); }
  };
  const onMouseDown  = (e: React.MouseEvent) => { dragStart.current = e.clientX; dragging.current = true; };
  const onMouseUp    = (e: React.MouseEvent) => {
    if (!dragging.current) return; dragging.current = false;
    const d = dragStart.current - e.clientX;
    if (Math.abs(d) > 60) { if (d > 0) next(true); else prev(true); }
  };
  const onMouseLeave = () => { dragging.current = false; };

  return (
    <section id="opinie" style={{ padding: "120px 0", background: "rgba(6,8,7,0.88)", overflow: "hidden" }}>
      <div style={{ maxWidth: 1600, margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <AnimateOnScroll>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 64 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <GoogleG size={16} />
                <p style={{ fontSize: 11, fontWeight: 700, color: "#34E12E", letterSpacing: 3, textTransform: "uppercase", margin: 0 }}>
                  {lang === "pl" ? "Opinie Google" : "Google Reviews"}
                </p>
              </div>
              <h2 style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 900, fontSize: "clamp(2rem,5vw,3.4rem)", color: "#fff", lineHeight: 1.1, margin: 0, letterSpacing: "-0.03em" }}>
                {lang === "pl" ? "Co mówią klienci" : "What clients say"}
              </h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, background: "#0e130e", border: "1px solid rgba(52,225,46,0.1)", borderRadius: 16, padding: "18px 24px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 44, fontWeight: 900, color: "#ECE7DD", lineHeight: 1, letterSpacing: "-0.04em" }}>5.0</div>
                <div style={{ display: "flex", gap: 2, justifyContent: "center", margin: "5px 0 3px" }}>
                  {[0,1,2,3,4].map(i => <span key={i} style={{ fontSize: 14, color: "#febc2e" }}>★</span>)}
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>7 {lang === "pl" ? "opinii" : "reviews"}</div>
              </div>
              <div style={{ width: 1, height: 52, background: "rgba(52,225,46,0.08)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <GoogleG size={18} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#ECE7DD" }}>Google</span>
                </div>
                <span style={{ fontSize: 11, color: "#6b8068", maxWidth: 110, lineHeight: 1.4 }}>
                  {lang === "pl" ? "Średnia ocena · Google" : "Average rating · Google"}
                </span>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Carousel */}
        <div
          style={{ position: "relative" }}
          onMouseEnter={() => { isHovered.current = true; }}
          onMouseLeave={() => { isHovered.current = false; }}
        >
          {/* Edge fade overlays */}
          <div aria-hidden style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(90deg,rgba(6,8,7,0.88),transparent)", zIndex: 5, pointerEvents: "none" }} />
          <div aria-hidden style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(-90deg,rgba(6,8,7,0.88),transparent)", zIndex: 5, pointerEvents: "none" }} />

          {/* Track */}
          <div
            ref={containerRef}
            style={{ overflow: "hidden", padding: "28px 0 4px" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
          >
            <div style={{
              display: "flex",
              gap: GAP,
              transform: `translateX(${tx}px)`,
              transition: animated ? "transform 0.55s cubic-bezier(0.22,1,0.36,1)" : "none",
              cursor: "grab",
              userSelect: "none",
            }}>
              {REVIEWS.map((r, i) => {
                const isActive = i === active;
                const dist = Math.min(Math.abs(i - active), n - Math.abs(i - active));
                const isSide = dist === 1;
                return (
                  <div
                    key={i}
                    onClick={() => { if (!dragging.current) goTo(i, true); }}
                    style={{
                      flex: `0 0 ${cw > 0 ? cw : "calc(33.333% - 14px)"}px`,
                      transition: animated ? "transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.55s, box-shadow 0.45s, border-color 0.45s" : "none",
                      transform: isActive ? "scale(1.06)" : "scale(0.90)",
                      opacity: isActive ? 1 : isMobile ? 0 : (isSide ? 0.5 : 0.15),
                      cursor: isActive ? "default" : "pointer",
                      position: "relative", zIndex: isActive ? 3 : isSide ? 2 : 1,
                      background: isActive ? "rgba(14,22,14,0.72)" : "rgba(10,15,10,0.35)",
                      backdropFilter: "blur(18px)",
                      WebkitBackdropFilter: "blur(18px)",
                      border: `1px solid ${isActive ? "rgba(52,225,46,0.38)" : "rgba(52,225,46,0.07)"}`,
                      borderRadius: 20,
                      boxShadow: isActive
                        ? "0 0 0 1px rgba(52,225,46,0.06), 0 0 48px rgba(52,225,46,0.12), 0 28px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)"
                        : "0 4px 28px rgba(0,0,0,0.3)",
                      padding: "28px 28px 24px",
                      display: "flex", flexDirection: "column", gap: 16,
                      overflow: "hidden", minHeight: 260,
                    }}
                  >
                    {isActive && <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(52,225,46,0.5),transparent)", pointerEvents: "none" }} />}

                    {/* Avatar + name + Google badge */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${r.color}1a`, border: `1.5px solid ${r.color}44`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 14, fontWeight: 800, color: r.color }}>{r.initials}</span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#ECE7DD", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name}</div>
                        <div style={{ display: "flex", gap: 1, marginTop: 3 }}>
                          {[0,1,2,3,4].map(j => <span key={j} style={{ fontSize: 11, color: "#febc2e" }}>★</span>)}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(66,133,244,0.07)", border: "1px solid rgba(66,133,244,0.14)", borderRadius: 100, padding: "4px 8px", flexShrink: 0 }}>
                        <GoogleG size={11} />
                      </div>
                    </div>

                    {/* Quote */}
                    <p style={{ fontSize: 13.5, color: isActive ? "#b8d4b2" : "#4a6347", lineHeight: 1.78, margin: 0, fontStyle: "italic", flex: 1 }}>
                      &ldquo;{r.text}&rdquo;
                    </p>

                    {/* Bottom accent */}
                    <div style={{ height: 2, width: "40%", background: `linear-gradient(90deg,${r.color},transparent)`, borderRadius: 2 }} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation: arrows + dots */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 36 }}>
            <button
              onClick={() => prev(true)}
              aria-label={lang === "pl" ? "Poprzednia opinia" : "Previous review"}
              style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(14,19,14,0.8)", border: "1px solid rgba(52,225,46,0.18)", color: "#34E12E", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(8px)", transition: "all 0.2s", flexShrink: 0 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {REVIEWS.map((r, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, true)}
                  aria-label={`${r.name}`}
                  aria-current={i === active ? "true" : undefined}
                  style={{ width: 44, height: 44, background: "transparent", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <div style={{ width: i === active ? 28 : 8, height: 8, borderRadius: 4, background: i === active ? "#34E12E" : "rgba(52,225,46,0.22)", transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)", boxShadow: i === active ? "0 0 12px rgba(52,225,46,0.5)" : "none" }} />
                </button>
              ))}
            </div>
            <button
              onClick={() => next(true)}
              aria-label={lang === "pl" ? "Następna opinia" : "Next review"}
              style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(14,19,14,0.8)", border: "1px solid rgba(52,225,46,0.18)", color: "#34E12E", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(8px)", transition: "all 0.2s", flexShrink: 0 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          {/* Google link */}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <a href="https://maps.app.goo.gl/NaSNZRqN2QSQ1LFp7" target="_blank" rel="noopener noreferrer" className="reviews-gmap-link">
              <GoogleG size={14} />
              <span>{lang === "pl" ? "Wszystkie opinie na Google Maps" : "All reviews on Google Maps"}</span>
              <span style={{ color: "#34E12E", fontWeight: 700 }}>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

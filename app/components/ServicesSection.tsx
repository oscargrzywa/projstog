"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLang } from "./LangContext";
import { content } from "../lib/content";

// ── Shared visual building blocks ─────────────────────────────────────────────

function MetricRow({ value, label, accent = "#34E12E" }: { value: string; label: string; accent?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 28, fontWeight: 900, color: accent, lineHeight: 1, minWidth: 96 }}>{value}</div>
      <div style={{ fontSize: 12, color: "#6b8068", lineHeight: 1.5 }}>{label}</div>
    </div>
  );
}

function BarChart({ bars, accent = "#34E12E" }: { bars: { label: string; pct: number }[]; accent?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
      {bars.map(b => (
        <div key={b.label}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: "#4a6347" }}>{b.label}</span>
            <span style={{ fontSize: 11, color: accent, fontWeight: 700, fontFamily: "var(--font-geist-mono)" }}>{b.pct}%</span>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: "rgba(52,225,46,0.08)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${b.pct}%`, background: `linear-gradient(90deg,${accent},${accent}88)`, borderRadius: 2 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function StatGrid({ items, accent = "#34E12E" }: { items: [string, string][]; accent?: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%" }}>
      {items.map(([v, l]) => (
        <div key={l} style={{ background: "rgba(52,225,46,0.04)", border: "1px solid rgba(52,225,46,0.10)", borderRadius: 12, padding: "14px 16px" }}>
          <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 22, fontWeight: 900, color: accent, lineHeight: 1 }}>{v}</div>
          <div style={{ fontSize: 11, color: "#4a6347", marginTop: 5, lineHeight: 1.4 }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

function Pill({ text, accent = "#34E12E" }: { text: string; accent?: string }) {
  return <span style={{ fontSize: 10, fontWeight: 700, color: accent, background: `${accent}14`, border: `1px solid ${accent}2a`, borderRadius: 100, padding: "3px 10px", letterSpacing: 0.5 }}>{text}</span>;
}

function VisualWrap({ children, accent = "#34E12E", headline, sub }: { children?: React.ReactNode; accent?: string; headline: string; sub: string }) {
  return (
    <div className="svc-vwrap" style={{ display: "flex", flexDirection: "column", height: "100%", padding: "28px 36px 24px", gap: 14 }}>
      <div>
        <div className="svc-vheadline" style={{ fontFamily: "var(--font-geist-mono)", fontSize: "clamp(1.8rem,4.5vw,4rem)", fontWeight: 900, color: accent, lineHeight: 1, letterSpacing: "-0.03em" }}>{headline}</div>
        <div className="svc-vsub" style={{ fontSize: 12, color: "#ECE7DD", fontWeight: 600, marginTop: 5 }}>{sub}</div>
      </div>
      {children}
    </div>
  );
}

// ── 13 Benefit visuals ────────────────────────────────────────────────────────

function V_OnePage() {
  return (
    <VisualWrap accent="#34E12E" headline="+340%" sub="więcej zapytań z Google · typowy wynik po 3 mies.">
      <BarChart bars={[{ label: "Zapytania telefoniczne", pct: 94 }, { label: "Widoczność w Google", pct: 88 }, { label: "Czas wczytywania", pct: 97 }]} />
    </VisualWrap>
  );
}
function V_Firmowa() {
  return (
    <VisualWrap accent="#34E12E" headline="24/7" sub="Twoja firma reprezentuje się profesjonalnie przez całą dobę">
      <StatGrid items={[["4.9★", "Avg ocena klientów"], ["-60%", "Odrzucenia powrotu"], ["+2 min", "Czas na stronie"], ["×3", "Więcej kontaktów"]]} />
    </VisualWrap>
  );
}
function V_Sklep() {
  return (
    <VisualWrap accent="#34E12E" headline="3:42 AM" sub="Zamówienie złożone — bez Twojego udziału">
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[["22:15", "Nowe zamówienie · 189 zł ✓"], ["01:38", "Nowe zamówienie · 320 zł ✓"], ["03:42", "Nowe zamówienie · 540 zł ✓"]].map(([t, m]) => (
          <div key={t} style={{ display: "flex", gap: 12, alignItems: "center", background: "rgba(52,225,46,0.04)", border: "1px solid rgba(52,225,46,0.10)", borderRadius: 10, padding: "11px 14px" }}>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 12, color: "#34E12E", minWidth: 42 }}>{t}</span>
            <span style={{ fontSize: 12, color: "#ECE7DD" }}>{m}</span>
          </div>
        ))}
      </div>
    </VisualWrap>
  );
}
function V_Blog() {
  return (
    <VisualWrap accent="#34E12E" headline="×18" sub="Więcej bezpłatnego ruchu z Google po roku treści SEO">
      <BarChart bars={[{ label: "Mies. 1", pct: 5 }, { label: "Mies. 6", pct: 38 }, { label: "Mies. 12", pct: 89 }]} />
    </VisualWrap>
  );
}
function V_AutomacjaAI() {
  return (
    <VisualWrap accent="#00C8A0" headline="-20h" sub="tygodniowo zwrócone Tobie — AI obsługuje powtarzalne zadania">
      <StatGrid accent="#00C8A0" items={[["<3min", "Czas generowania oferty"], ["0", "Niezapłacone faktury"], ["100%", "Raporty na czas"], ["-80%", "Ręczna praca"]]} />
    </VisualWrap>
  );
}
function V_Chatbot() {
  return (
    <VisualWrap accent="#00C8A0" headline="24/7" sub="Chatbot AI obsługuje klientów gdy Ty śpisz">
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { from: "client", text: "Czy mają Państwo coś w rozmiarze L?", time: "03:14" },
          { from: "bot", text: "Tak, mamy dostępne L w 3 kolorach. Czy chcesz zobaczyć?", time: "03:14" },
          { from: "client", text: "Tak! Ile wynosi dostawa?", time: "03:15" },
        ].map((msg, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: msg.from === "client" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "82%", padding: "9px 13px", borderRadius: msg.from === "client" ? "12px 12px 3px 12px" : "3px 12px 12px 12px", background: msg.from === "client" ? "rgba(0,200,160,0.09)" : "#0e130e", border: `1px solid ${msg.from === "client" ? "rgba(0,200,160,0.2)" : "rgba(255,255,255,0.05)"}` }}>
              <span style={{ fontSize: 11, color: msg.from === "client" ? "rgba(255,255,255,0.75)" : "#9aad96" }}>{msg.text}</span>
            </div>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", marginTop: 2, paddingInline: 4 }}>{msg.time}</span>
          </div>
        ))}
      </div>
    </VisualWrap>
  );
}
function V_CRM() {
  return (
    <VisualWrap accent="#00C8A0" headline="0" sub="zgubionych klientów — każdy lead jest widoczny w lejku">
      <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
        {[["Nowy kontakt", 12, "rgba(0,200,160,0.5)"], ["Wysłano ofertę", 8, "rgba(0,200,160,0.6)"], ["Negocjacje", 5, "rgba(0,200,160,0.75)"], ["Zamknięte ✓", 4, "#00C8A0"]].map(([l, n, c]) => (
          <div key={String(l)} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 11, color: "#4a6347", minWidth: 120 }}>{l}</span>
            <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.04)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(Number(n) / 12) * 100}%`, background: String(c), borderRadius: 3 }} />
            </div>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, color: String(c), minWidth: 20, textAlign: "right" }}>{n}</span>
          </div>
        ))}
      </div>
    </VisualWrap>
  );
}
function V_App() {
  return (
    <VisualWrap accent="#00C8A0" headline="∞" sub="Twój własny cyfrowy proces — zbudowany dokładnie pod Ciebie">
      <StatGrid accent="#00C8A0" items={[["1", "Kontakt przez cały projekt"], ["100%", "Twoje wymagania"], ["0", "Nadmiarowych funkcji"], ["✓", "Dopasowanie do procesu"]]} />
    </VisualWrap>
  );
}
function V_GMB() {
  return (
    <VisualWrap accent="#a3e635" headline="Top 3" sub="Pojawiasz się w mapach Google dla lokalnych klientów">
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ background: "rgba(163,230,53,0.06)", border: "1px solid rgba(163,230,53,0.2)", borderRadius: 12, padding: "12px 16px" }}>
          <div style={{ fontSize: 10, color: "#a3e635", fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>GOOGLE MAPS · TWOJA OKOLICA</div>
          {[["★ 4.9", "Twoja firma", true], ["4.7", "Konkurent A", false], ["4.6", "Konkurent B", false]].map(([r, n, h]) => (
            <div key={String(n)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderTop: "1px solid rgba(163,230,53,0.07)" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: h ? "#a3e635" : "rgba(255,255,255,0.15)", flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: h ? "#ECE7DD" : "#4a6347", fontWeight: h ? 700 : 400 }}>{n}</span>
              <span style={{ fontSize: 12, color: h ? "#a3e635" : "#3d5e3a", marginLeft: "auto", fontFamily: "var(--font-geist-mono)" }}>{r}</span>
            </div>
          ))}
        </div>
        <MetricRow value="+68%" label="Więcej połączeń telefonicznych z profilu Google" accent="#a3e635" />
      </div>
    </VisualWrap>
  );
}
function V_Social() {
  return (
    <VisualWrap accent="#a3e635" headline="+2 400" sub="obserwujących w 6 miesięcy — marka, która przyciąga klientów">
      <BarChart accent="#a3e635" bars={[{ label: "Zasięg postów", pct: 82 }, { label: "Zaangażowanie", pct: 74 }, { label: "Zapytania z social", pct: 61 }]} />
    </VisualWrap>
  );
}
function V_Copy() {
  return (
    <VisualWrap accent="#a3e635" headline="+43%" sub="wzrost konwersji po przepisaniu tekstów ofertowych">
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "14px" }}>
          <div style={{ fontSize: 9, color: "#3d5e3a", marginBottom: 8, fontWeight: 700, letterSpacing: 1 }}>PRZED</div>
          <div style={{ fontSize: 11, color: "#4a6347", lineHeight: 1.65 }}>"Oferujemy kompleksowe usługi w zakresie..."</div>
          <div style={{ fontSize: 10, color: "#2d4a2a", marginTop: 8, fontFamily: "var(--font-geist-mono)" }}>Konwersja: 1.2%</div>
        </div>
        <div style={{ flex: 1, background: "rgba(163,230,53,0.05)", border: "1px solid rgba(163,230,53,0.18)", borderRadius: 10, padding: "14px" }}>
          <div style={{ fontSize: 9, color: "#a3e635", marginBottom: 8, fontWeight: 700, letterSpacing: 1 }}>PO</div>
          <div style={{ fontSize: 11, color: "#ECE7DD", lineHeight: 1.65 }}>"Zarabiaj więcej — my zajmiemy się resztą."</div>
          <div style={{ fontSize: 10, color: "#a3e635", marginTop: 8, fontFamily: "var(--font-geist-mono)" }}>Konwersja: 4.3%</div>
        </div>
      </div>
    </VisualWrap>
  );
}
function V_Admin() {
  return (
    <VisualWrap accent="#1B9D17" headline="99.9%" sub="uptime — Twoja strona działa zawsze, hosting i SSL pod kontrolą">
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[["Uptime (30 dni)", "99.97%", true], ["Czas odpowiedzi", "182 ms", true], ["SSL ważny", "tak ✓", true], ["Backup", "codziennie ✓", true]].map(([l, v, ok]) => (
          <div key={String(l)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 14px", background: "rgba(27,157,23,0.04)", border: "1px solid rgba(27,157,23,0.10)", borderRadius: 9 }}>
            <span style={{ fontSize: 12, color: "#6b8068" }}>{l}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: ok ? "#1B9D17" : "#ECE7DD", fontFamily: "var(--font-geist-mono)" }}>{v}</span>
          </div>
        ))}
      </div>
    </VisualWrap>
  );
}
function V_Support() {
  return (
    <VisualWrap accent="#1B9D17" headline="< 2h" sub="czas reakcji — jeden człowiek, który zna Twój projekt od początku">
      <StatGrid accent="#1B9D17" items={[["1", "Kontakt · zawsze Oscar"], ["24/7", "Monitoring systemu"], ["0", "Biletów i kolejek"], ["✓", "Bez umów na rok"]]} />
    </VisualWrap>
  );
}

// ── Category config ───────────────────────────────────────────────────────────
const CATEGORY_VISUALS = [
  [V_OnePage, V_Firmowa, V_Sklep, V_Blog],
  [V_AutomacjaAI, V_Chatbot, V_CRM, V_App],
  [V_GMB, V_Social, V_Copy],
  [V_Admin, V_Support],
] as const;

const CAT_ACCENTS = ["#34E12E", "#00C8A0", "#a3e635", "#1B9D17"];
const CAT_EMOJIS  = ["🌐", "⚡", "📣", "🛡️"];

function Tag({ children, accent }: { children: React.ReactNode; accent: string }) {
  return <span style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 100, background: `${accent}12`, color: accent, border: `1px solid ${accent}22`, letterSpacing: 0.3, whiteSpace: "nowrap" as const }}>{children}</span>;
}

type DotCard = { catIndex: number; title: string; accent: string };
function ServiceDots({ cards, current, onJump }: { cards: DotCard[]; current: number; onJump: (i: number) => void }) {
  const [hov, setHov] = useState<number | null>(null);
  return (
    <div style={{ position: "absolute", bottom: 22, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 5, zIndex: 30, pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: -8, bottom: -8, left: -14, right: -14, background: "rgba(6,8,7,0.6)", backdropFilter: "blur(10px)", borderRadius: 100, border: "1px solid rgba(52,225,46,0.07)" }} />
      {cards.map((c, i) => {
        const active = i === current, isHov = i === hov;
        const isCB = i > 0 && c.catIndex !== cards[i - 1]?.catIndex;
        const sz = active ? 11 : isHov ? 9 : 7;
        return (
          <React.Fragment key={i}>
            {isCB && <div style={{ width: 9, pointerEvents: "none" }} />}
            <div style={{ position: "relative", pointerEvents: "auto" }}>
              <div style={{ position: "absolute", bottom: "calc(100% + 9px)", left: "50%", transform: `translateX(-50%) translateY(${isHov ? 0 : 5}px)`, opacity: isHov ? 1 : 0, transition: "opacity 0.2s, transform 0.22s", pointerEvents: "none", whiteSpace: "nowrap", background: "#0e130e", border: `1px solid ${c.accent}44`, borderRadius: 8, padding: "5px 11px", fontSize: 11, fontWeight: 600, color: c.accent, boxShadow: "0 4px 20px rgba(0,0,0,0.55)", zIndex: 40 }}>{c.title}</div>
              <button onClick={() => onJump(i)} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ width: sz, height: sz, borderRadius: "50%", background: active ? c.accent : isHov ? `${c.accent}bb` : `${c.accent}44`, border: "none", cursor: "pointer", padding: 0, display: "block", boxShadow: active ? `0 0 0 3px ${c.accent}33, 0 0 14px ${c.accent}55` : "none", outline: "none", transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)" }} />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function ServicesSection() {
  const { lang } = useLang(), t = content[lang], svc = t.services;
  const allCards = svc.categories.flatMap((cat, ci) =>
    cat.services.map((s, si) => ({
      ...s, catIndex: ci, catLabel: cat.label, catServiceIndex: si, catTotal: cat.services.length,
      Visual: (CATEGORY_VISUALS[ci] as readonly (()=>React.ReactElement)[])[si] ?? V_OnePage,
      accent: CAT_ACCENTS[ci], emoji: CAT_EMOJIS[ci],
    }))
  );
  const TOTAL = allCards.length;
  const [currentCard, setCurrentCard] = useState(0);
  const [isActive, setIsActive]       = useState(false);
  const spacerRef    = useRef<HTMLDivElement>(null);
  const currentRef   = useRef(0);
  const isActiveRef  = useRef(false);
  const exitCooldown = useRef(false);

  useEffect(() => { currentRef.current = currentCard; }, [currentCard]);
  useEffect(() => { isActiveRef.current = isActive; }, [isActive]);

  const activeCat    = allCards[currentCard]?.catIndex ?? 0;
  const activeInCat  = allCards[currentCard]?.catServiceIndex ?? 0;
  const isLast       = currentCard === TOTAL - 1;

  const exitSection = (dir: "up" | "down") => {
    const spacer = spacerRef.current; if (!spacer) return;
    setIsActive(false); isActiveRef.current = false;
    exitCooldown.current = true;
    setTimeout(() => { exitCooldown.current = false; }, 1100);
    if (dir === "down") window.scrollTo({ top: spacer.getBoundingClientRect().top + window.scrollY + spacer.offsetHeight + 10, behavior: "smooth" });
    else { setCurrentCard(0); currentRef.current = 0; window.scrollTo({ top: spacer.getBoundingClientRect().top + window.scrollY - 10, behavior: "smooth" }); }
  };

  useEffect(() => {
    const check = () => {
      if (exitCooldown.current) return;
      const spacer = spacerRef.current; if (!spacer) return;
      const { top, bottom } = spacer.getBoundingClientRect();
      if (top <= 0 && bottom > 0 && !isActiveRef.current) { setIsActive(true); isActiveRef.current = true; }
      else if ((top > 0 || bottom <= 0) && isActiveRef.current) { setIsActive(false); isActiveRef.current = false; }
    };
    window.addEventListener("scroll", check, { passive: true }); check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => {
    let accum = 0, cd = false;
    const onWheel = (e: WheelEvent) => {
      if (!isActiveRef.current) return; e.preventDefault();
      accum += e.deltaY;
      const dir = accum > 55 ? 1 : accum < -55 ? -1 : 0; if (!dir) return;
      accum = 0; if (cd) return; cd = true; setTimeout(() => { cd = false; }, 540);
      const next = currentRef.current + dir;
      if (next < 0) exitSection("up"); else if (next >= TOTAL) exitSection("down");
      else { setCurrentCard(next); currentRef.current = next; }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [TOTAL]);

  /* Touch swipe for mobile */
  useEffect(() => {
    let startY = 0, cd = false;
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onEnd   = (e: TouchEvent) => {
      if (!isActiveRef.current) return;
      const dy = startY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 40) return;
      if (cd) return; cd = true; setTimeout(() => { cd = false; }, 600);
      const dir = dy > 0 ? 1 : -1;
      const next = currentRef.current + dir;
      if (next < 0) exitSection("up"); else if (next >= TOTAL) exitSection("down");
      else { setCurrentCard(next); currentRef.current = next; }
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => { window.removeEventListener("touchstart", onStart); window.removeEventListener("touchend", onEnd); };
  }, [TOTAL]);

  const jumpToCard = (i: number) => {
    const spacer = spacerRef.current; if (!spacer) return;
    window.scrollTo({ top: spacer.getBoundingClientRect().top + window.scrollY + 2, behavior: "smooth" });
    setTimeout(() => { setCurrentCard(i); currentRef.current = i; setIsActive(true); isActiveRef.current = true; }, 350);
  };
  const jumpToCategory = (ci: number) => { const f = allCards.findIndex(c => c.catIndex === ci); jumpToCard(f); };

  const panelStyle: React.CSSProperties = isActive
    ? { position: "fixed",    top: 0, left: 0, width: "100%", height: "100vh" }
    : { position: "absolute", top: 0, left: 0, width: "100%", height: "100vh" };

  return (
    <div ref={spacerRef} id="uslugi" style={{ position: "relative", height: "100vh" }}>
      <div style={{ ...panelStyle, display: "flex", background: "rgba(6,8,7,0.88)", zIndex: 10, justifyContent: "center" }}>
        <div className="svc-inner" style={{ maxWidth: 1700, width: "100%", display: "flex" }}>

          {/* MOBILE: compact category bar */}
          <div className="svc-mobile-cats">
            <div style={{ display: "flex", gap: 6, overflowX: "auto", padding: "0 16px 0", scrollbarWidth: "none" }}>
              {svc.categories.map((cat, i) => (
                <button key={i} onClick={() => jumpToCategory(i)} style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 100, background: i === activeCat ? `${CAT_ACCENTS[i]}18` : "transparent", border: `1px solid ${i === activeCat ? CAT_ACCENTS[i] : "rgba(52,225,46,0.12)"}`, color: i === activeCat ? CAT_ACCENTS[i] : "#4a6347", fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5, whiteSpace: "nowrap", transition: "all 0.22s" }}>
                  {CAT_EMOJIS[i]} {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* SIDEBAR — desktop only */}
          <div className="svc-sidebar" style={{ width: 288, flexShrink: 0, height: "100%", borderRight: "1px solid rgba(52,225,46,0.07)", display: "flex", flexDirection: "column", padding: "80px 26px 32px", background: "rgba(6,8,7,0.88)", overflowY: "auto" }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: "#34E12E", letterSpacing: 3, textTransform: "uppercase", margin: "0 0 12px" }}>{svc.label}</p>
            <h2 style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 900, fontSize: "clamp(1.1rem,1.5vw,1.5rem)", color: "#fff", lineHeight: 1.2, margin: "0 0 10px", letterSpacing: "-0.02em" }}>{svc.h2}</h2>
            <p style={{ fontSize: 12.5, color: "#6b8068", lineHeight: 1.75, margin: "0 0 22px" }}>{svc.sub}</p>
            <div style={{ height: 1, background: "rgba(52,225,46,0.08)", marginBottom: 18 }} />
            <div style={{ borderRadius: 12, border: "1px solid rgba(52,225,46,0.09)", background: "#0e130e", overflow: "hidden", marginBottom: 18 }}>
              {svc.categories.map((cat, i) => {
                const active = i === activeCat;
                return (
                  <button key={i} onClick={() => jumpToCategory(i)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", background: active ? `${CAT_ACCENTS[i]}0d` : "transparent", border: "none", borderLeft: `3px solid ${active ? CAT_ACCENTS[i] : "transparent"}`, borderBottom: i < svc.categories.length - 1 ? "1px solid rgba(52,225,46,0.06)" : "none", cursor: "pointer", textAlign: "left", transition: "background 0.22s" }}>
                    <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0 }}>{CAT_EMOJIS[i]}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: active ? CAT_ACCENTS[i] : "#6b8068", transition: "color 0.22s" }}>{cat.label}</div>
                      {active && <div style={{ display: "flex", gap: 5, marginTop: 6 }}>
                        {Array.from({ length: cat.services.length }).map((_, j) => (
                          <div key={j} style={{ width: 5, height: 5, borderRadius: "50%", background: j <= activeInCat ? CAT_ACCENTS[i] : "rgba(52,225,46,0.15)", transition: "background 0.25s" }} />
                        ))}
                      </div>}
                    </div>
                    {active && <div style={{ width: 5, height: 5, borderRadius: "50%", background: CAT_ACCENTS[i], flexShrink: 0, animationName: "live-blink", animationDuration: "2s", animationIterationCount: "infinite" }} />}
                  </button>
                );
              })}
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ fontSize: 11, color: "#2d4a2a", fontFamily: "var(--font-geist-mono)", marginBottom: 14, letterSpacing: 0.5 }}>
              {String(currentCard + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
            </div>
            <a href="#kontakt" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#1B9D17,#34E12E)", color: "#060807", fontWeight: 700, fontSize: 13, padding: "13px 16px", borderRadius: 10, textDecoration: "none", textAlign: "center" }}>
              {lang === "pl" ? "Wycień projekt →" : "Get a quote →"}
            </a>
          </div>

          {/* CARD STAGE */}
          <div className="svc-stage" style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            {allCards.map((card, i) => {
              const active = i === currentCard, above = i < currentCard;
              const V = card.Visual;
              return (
                <div key={card.title} style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", opacity: active ? 1 : 0, transform: `translateY(${active ? 0 : above ? -28 : 28}px)`, transition: "opacity 0.42s cubic-bezier(0.22,1,0.36,1), transform 0.42s cubic-bezier(0.22,1,0.36,1)", pointerEvents: active ? "auto" : "none" }}>

                  {/* TEXT */}
                  <div className="svc-text" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 52px 20px" }}>
                    <div style={{ maxWidth: 620 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                        <span style={{ fontSize: 12, color: "#2d4a2a", fontFamily: "var(--font-geist-mono)", letterSpacing: 0.5 }}>{String(card.catServiceIndex + 1).padStart(2, "0")} / {String(card.catTotal).padStart(2, "0")}</span>
                        <div style={{ flex: 1, height: 1, background: "rgba(52,225,46,0.08)" }} />
                        <span style={{ fontSize: 9, color: "#2d4a2a", fontFamily: "var(--font-geist-mono)", letterSpacing: 1 }}>{card.catLabel.toUpperCase()}</span>
                      </div>
                      <h3 style={{ fontFamily: "var(--font-geist-sans)", fontSize: "clamp(1.4rem,2.2vw,2.3rem)", fontWeight: 900, color: "#ECE7DD", margin: "0 0 12px", lineHeight: 1.1, letterSpacing: "-0.025em" }}>{card.title}</h3>
                      <p style={{ fontSize: 14, color: "#6b8068", lineHeight: 1.8, margin: "0 0 16px" }}>{card.desc}</p>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                        {[...card.tags].map(tag => <Tag key={tag} accent={card.accent}>{tag}</Tag>)}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 30, height: 30, borderRadius: "50%", border: `1px solid ${card.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, animationName: isLast ? undefined : "scroll-hint-bounce", animationDuration: "1.8s", animationIterationCount: "infinite" }}>
                          <span style={{ fontSize: 13, color: card.accent }}>{isLast ? "✓" : "↓"}</span>
                        </div>
                        <span style={{ fontSize: 12, color: "#4a6347" }}>
                          {isLast ? (lang === "pl" ? "Wszystkie usługi — przewiń dalej" : "Scroll to continue") : (lang === "pl" ? "Scroll po następną usługę" : "Scroll for next service")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BENEFIT VISUAL */}
                  <div className="svc-visual" style={{ flex: "0 0 48vh", background: "rgba(7,12,7,0.88)", borderTop: "1px solid rgba(52,225,46,0.06)", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 60%, ${card.accent}10 0%, transparent 65%)`, pointerEvents: "none" }} />
                    <div style={{ position: "absolute", top: 12, left: 14, zIndex: 2 }}>
                      <span style={{ fontSize: 9, fontWeight: 700, color: card.accent, letterSpacing: 1.5, textTransform: "uppercase", background: `${card.accent}12`, border: `1px solid ${card.accent}24`, borderRadius: 100, padding: "3px 10px" }}>{card.emoji} {card.catLabel}</span>
                    </div>
                    <div style={{ position: "absolute", inset: 0, paddingTop: 36 }}>
                      <V />
                    </div>
                  </div>

                </div>
              );
            })}
            <ServiceDots cards={allCards.map(c => ({ catIndex: c.catIndex, title: c.title, accent: c.accent }))} current={currentCard} onJump={jumpToCard} />
          </div>

        </div>
      </div>
    </div>
  );
}

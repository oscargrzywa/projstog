"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLang } from "./LangContext";
import { content } from "../lib/content";

// ── VisualWrap shell ──────────────────────────────────────────────────────────

function VisualWrap({ children, accent = "#34E12E", headline, sub }: { children?: React.ReactNode; accent?: string; headline: string; sub: string }) {
  return (
    <div className="svc-vwrap" style={{ display: "flex", flexDirection: "column", height: "100%", padding: "28px 36px 24px", gap: 16 }}>
      <div>
        <div className="svc-vheadline" style={{ fontFamily: "var(--font-geist-mono)", fontSize: "clamp(2.2rem,5vw,4.5rem)", fontWeight: 900, color: accent, lineHeight: 1, letterSpacing: "-0.04em" }}>{headline}</div>
        <div className="svc-vsub" style={{ fontSize: 12, color: "#9aad96", fontWeight: 500, marginTop: 6, lineHeight: 1.5 }}>{sub}</div>
      </div>
      {children}
    </div>
  );
}

// ── 13 Benefit visuals — simple & animated ────────────────────────────────────

function V_OnePage() {
  return (
    <VisualWrap accent="#34E12E" headline="+340%" sub="więcej zapytań z Google po 3 miesiącach">
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 6, paddingBottom: 2 }}>
        {[12, 18, 28, 42, 58, 76, 100].map((h, i) => (
          <div key={i} style={{
            flex: 1, borderRadius: "4px 4px 0 0",
            background: i === 6 ? "#34E12E" : `rgba(52,225,46,${0.1 + i * 0.09})`,
            height: `${h}%`, transformOrigin: "bottom",
            animationName: "bar-grow", animationDuration: "0.65s",
            animationDelay: `${i * 0.07}s`, animationTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
            animationFillMode: "both",
          }} />
        ))}
      </div>
    </VisualWrap>
  );
}

function V_Firmowa() {
  return (
    <VisualWrap accent="#34E12E" headline="24/7" sub="Twoja firma zawsze online">
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {[0,1,2,3,4].map(i => (
            <span key={i} style={{
              fontSize: "clamp(1.6rem,4vw,2.8rem)", color: "#febc2e", lineHeight: 1,
              animationName: "svc-fade-up", animationDuration: "0.35s",
              animationDelay: `${0.2 + i * 0.1}s`, animationFillMode: "both",
            }}>★</span>
          ))}
        </div>
        <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 13, color: "#34E12E", fontWeight: 600 }}>
          4.9 · Średnia ocena klientów
        </div>
      </div>
    </VisualWrap>
  );
}

function V_Sklep() {
  return (
    <VisualWrap accent="#34E12E" headline="3:42 AM" sub="Zamówienie bez Twojego udziału">
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, justifyContent: "center" }}>
        {[["22:15", "189 zł"], ["01:38", "320 zł"], ["03:42", "540 zł"]].map(([t, a], i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12,
            background: "rgba(52,225,46,0.05)", borderRadius: 10, padding: "11px 14px",
            border: "1px solid rgba(52,225,46,0.1)",
            animationName: "svc-slide-r", animationDuration: "0.45s",
            animationDelay: `${0.2 + i * 0.15}s`, animationFillMode: "both",
            animationTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#34E12E", flexShrink: 0, animationName: "live-blink", animationDuration: "2s", animationIterationCount: "infinite", animationDelay: `${i * 0.7}s` }} />
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, color: "#34E12E", minWidth: 40 }}>{t}</span>
            <span style={{ fontSize: 12, color: "#ECE7DD", flex: 1 }}>Nowe zamówienie</span>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 12, fontWeight: 700, color: "#34E12E" }}>{a}</span>
          </div>
        ))}
      </div>
    </VisualWrap>
  );
}

function V_Blog() {
  return (
    <VisualWrap accent="#34E12E" headline="×18" sub="więcej ruchu z Google po roku treści">
      <svg viewBox="0 0 180 70" style={{ flex: 1, width: "100%", overflow: "visible" }} preserveAspectRatio="none">
        <defs>
          <linearGradient id="blog-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34E12E" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#34E12E" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,68 L25,64 L55,56 L90,42 L125,24 L155,12 L180,4 L180,70 L0,70 Z" fill="url(#blog-grad)" />
        <path d="M0,68 L25,64 L55,56 L90,42 L125,24 L155,12 L180,4"
          fill="none" stroke="#34E12E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationName: "svc-draw", animationDuration: "1.6s", animationDelay: "0.2s", animationFillMode: "forwards", animationTimingFunction: "ease-out" }}
        />
        <circle cx="180" cy="4" r="4" fill="#34E12E"
          style={{ opacity: 0, animationName: "svc-fade-up", animationDuration: "0.3s", animationDelay: "1.7s", animationFillMode: "forwards" }} />
      </svg>
    </VisualWrap>
  );
}

function V_AutomacjaAI() {
  return (
    <VisualWrap accent="#00C8A0" headline="-20h" sub="tygodniowo — AI robi to za Ciebie">
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="42" stroke="rgba(0,200,160,0.1)" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="42" stroke="#00C8A0" strokeWidth="1.5" strokeDasharray="1000" strokeDashoffset="1000"
            style={{ animationName: "svc-draw", animationDuration: "1.8s", animationDelay: "0.2s", animationFillMode: "forwards", animationTimingFunction: "linear" }} />
          <g style={{ transformOrigin: "50px 50px", animationName: "svc-spin", animationDuration: "10s", animationTimingFunction: "linear", animationIterationCount: "infinite" }}>
            {[0,45,90,135,180,225,270,315].map((a, i) => {
              const rad = (a * Math.PI) / 180;
              return <circle key={i} cx={50 + 32 * Math.cos(rad)} cy={50 + 32 * Math.sin(rad)} r={i % 2 === 0 ? 3.5 : 2.2} fill="#00C8A0" opacity={0.35 + i * 0.07} />;
            })}
          </g>
          <circle cx="50" cy="50" r="18" fill="rgba(0,200,160,0.08)" stroke="#00C8A0" strokeWidth="1" />
          <text x="50" y="54" textAnchor="middle" fill="#00C8A0" fontFamily="var(--font-geist-mono)" fontSize="11" fontWeight="700">AI</text>
        </svg>
      </div>
    </VisualWrap>
  );
}

function V_Chatbot() {
  return (
    <VisualWrap accent="#00C8A0" headline="24/7" sub="Chatbot odpowiada gdy śpisz">
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, justifyContent: "center" }}>
        {[
          { role: "user", text: "Czy macie rozmiar L?" },
          { role: "bot",  text: "Tak! Dostępne w 3 kolorach 🎨" },
          { role: "user", text: "Ile kosztuje dostawa?" },
        ].map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", animationName: "svc-fade-up", animationDuration: "0.4s", animationDelay: `${0.2 + i * 0.22}s`, animationFillMode: "both" }}>
            <div style={{
              maxWidth: "80%", padding: "8px 13px",
              borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "2px 12px 12px 12px",
              background: m.role === "user" ? "rgba(0,200,160,0.1)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${m.role === "user" ? "rgba(0,200,160,0.22)" : "rgba(255,255,255,0.07)"}`,
              fontSize: 12, color: m.role === "user" ? "#ECE7DD" : "#9aad96",
            }}>{m.text}</div>
          </div>
        ))}
        <div style={{ display: "flex", gap: 5, paddingLeft: 6, animationName: "svc-fade-up", animationDuration: "0.3s", animationDelay: "1s", animationFillMode: "both" }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#00C8A0", animationName: "live-blink", animationDuration: "1.2s", animationDelay: `${i * 0.22}s`, animationIterationCount: "infinite" }} />)}
        </div>
      </div>
    </VisualWrap>
  );
}

function V_CRM() {
  return (
    <VisualWrap accent="#00C8A0" headline="0" sub="zgubionych leadów — wszystko w lejku">
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
        {[["Nowy lead", 100, 12], ["Kontakt", 67, 8], ["Oferta", 42, 5], ["Zamknięte ✓", 33, 4]].map(([l, pct, n], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 10, color: "#4a6347", minWidth: 80, textAlign: "right" }}>{l}</span>
            <div style={{ flex: 1, height: 7, background: "rgba(0,200,160,0.08)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${pct}%`, borderRadius: 4,
                background: "linear-gradient(90deg,#00C8A0,rgba(0,200,160,0.5))",
                transformOrigin: "left", animationName: "svc-widen",
                animationDuration: "0.8s", animationDelay: `${0.2 + i * 0.12}s`,
                animationFillMode: "both", animationTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
              }} />
            </div>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, color: "#00C8A0", minWidth: 16, textAlign: "right" }}>{n}</span>
          </div>
        ))}
      </div>
    </VisualWrap>
  );
}

function V_App() {
  return (
    <VisualWrap accent="#00C8A0" headline="∞" sub="Twój własny cyfrowy proces">
      <div style={{ flex: 1, background: "rgba(0,0,0,0.32)", borderRadius: 10, padding: "16px 18px", fontFamily: "var(--font-geist-mono)", display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          ["$", "build --custom", "#6b8068"],
          [">", "Kompilowanie...", "#4a6347"],
          [">", "✓ Gotowe", "#00C8A0"],
          ["$", "deploy --prod", "#6b8068"],
          [">", "✓ Live na produkcji", "#00C8A0"],
        ].map(([prefix, text, color], i) => (
          <div key={i} style={{
            display: "flex", gap: 7, fontSize: 11, color: color,
            animationName: "svc-fade-up", animationDuration: "0.3s",
            animationDelay: `${0.2 + i * 0.22}s`, animationFillMode: "both",
          }}>
            <span style={{ color: "#00C8A0", opacity: 0.55 }}>{prefix}</span>
            <span>{text}</span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 4, animationName: "svc-fade-up", animationDuration: "0.3s", animationDelay: "1.5s", animationFillMode: "both" }}>
          <span style={{ color: "#00C8A0", fontSize: 11, opacity: 0.55 }}>$</span>
          <div style={{ width: 6, height: 13, background: "#00C8A0", opacity: 0.8, animationName: "live-blink", animationDuration: "1s", animationIterationCount: "infinite" }} />
        </div>
      </div>
    </VisualWrap>
  );
}

function V_GMB() {
  return (
    <VisualWrap accent="#a3e635" headline="Top 3" sub="w mapach Google dla Twojej okolicy">
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {[0,1,2].map(i => (
          <div key={i} aria-hidden style={{
            position: "absolute", width: 56 + i * 30, height: 56 + i * 30, borderRadius: "50%",
            border: `1px solid rgba(163,230,53,${0.5 - i * 0.14})`,
            animationName: "svc-ping", animationDuration: "2.4s",
            animationDelay: `${i * 0.8}s`, animationIterationCount: "infinite",
            animationTimingFunction: "ease-out",
          }} />
        ))}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <svg width="38" height="48" viewBox="0 0 38 48" fill="none">
            <path d="M19 0C8.51 0 0 8.51 0 19c0 14.25 19 29 19 29s19-14.75 19-29C38 8.51 29.49 0 19 0Z" fill="#a3e635" />
            <circle cx="19" cy="19" r="8" fill="#060807" />
          </svg>
          <div style={{ width: 2, height: 10, background: "#a3e635" }} />
          <div style={{ width: 16, height: 4, borderRadius: "50%", background: "rgba(163,230,53,0.3)" }} />
        </div>
      </div>
    </VisualWrap>
  );
}

function V_Social() {
  return (
    <VisualWrap accent="#a3e635" headline="+2 400" sub="obserwujących w 6 miesięcy">
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 5, paddingBottom: 2 }}>
        {[8, 14, 22, 34, 48, 64, 80, 100].map((h, i) => (
          <div key={i} style={{
            flex: 1, borderRadius: "3px 3px 0 0",
            background: i === 7 ? "#a3e635" : `rgba(163,230,53,${0.1 + i * 0.1})`,
            height: `${h}%`, transformOrigin: "bottom",
            animationName: "bar-grow", animationDuration: "0.6s",
            animationDelay: `${i * 0.06}s`, animationTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
            animationFillMode: "both",
          }} />
        ))}
      </div>
    </VisualWrap>
  );
}

function V_Copy() {
  return (
    <VisualWrap accent="#a3e635" headline="+43%" sub="wzrost konwersji po przepisaniu tekstów">
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, alignContent: "center" }}>
        {[
          { label: "PRZED", bg: "rgba(255,255,255,0.02)", border: "rgba(255,255,255,0.06)", textColor: "#4a6347", bar: "rgba(255,80,80,0.45)", acc: "1.2%", text: `"Oferujemy kompleksowe usługi w zakresie..."`, delay: "0.2s", barDelay: "0.4s" },
          { label: "PO",    bg: "rgba(163,230,53,0.05)", border: "rgba(163,230,53,0.2)",   textColor: "#ECE7DD", bar: "#a3e635",              acc: "4.3%", text: `"Zarabiaj więcej — my zajmiemy się resztą"`, delay: "0.4s", barDelay: "0.8s" },
        ].map((c, i) => (
          <div key={i} style={{
            background: c.bg, border: `1px solid ${c.border}`, borderRadius: 10, padding: "12px 10px",
            animationName: "svc-fade-up", animationDuration: "0.4s", animationDelay: c.delay, animationFillMode: "both",
          }}>
            <div style={{ fontSize: 8, color: i === 0 ? "#3d5e3a" : "#a3e635", fontWeight: 700, letterSpacing: 1.4, marginBottom: 7 }}>{c.label}</div>
            <div style={{ fontSize: 10, color: c.textColor, lineHeight: 1.55, fontStyle: "italic", minHeight: 42 }}>{c.text}</div>
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ height: 2, flex: 1, background: c.bar, borderRadius: 1, transformOrigin: "left", animationName: "svc-widen", animationDuration: "0.7s", animationDelay: c.barDelay, animationFillMode: "both" }} />
              <span style={{ fontSize: 9, color: c.bar, fontWeight: 700, fontFamily: "var(--font-geist-mono)" }}>{c.acc}</span>
            </div>
          </div>
        ))}
      </div>
    </VisualWrap>
  );
}

function V_Admin() {
  return (
    <VisualWrap accent="#1B9D17" headline="99.9%" sub="uptime — hosting, SSL i backup">
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
        <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {Array.from({ length: 28 }, (_, i) => ({ ok: i !== 5 && i !== 17 })).map((b, i) => (
            <div key={i} style={{
              width: 13, height: 26, borderRadius: 3,
              background: b.ok ? "#1B9D17" : "rgba(255,80,80,0.5)",
              opacity: b.ok ? 0.35 + (i / 28) * 0.65 : 1,
              animationName: "svc-fade-up", animationDuration: "0.25s",
              animationDelay: `${i * 0.025}s`, animationFillMode: "both",
            }} />
          ))}
        </div>
        <span style={{ fontSize: 10, color: "#4a6347", fontFamily: "var(--font-geist-mono)" }}>Ostatnie 28 dni · 2 incydenty naprawione &lt;1h</span>
      </div>
    </VisualWrap>
  );
}

function V_Support() {
  return (
    <VisualWrap accent="#1B9D17" headline="< 2h" sub="czas reakcji — jeden kontakt przez cały czas">
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
        {[
          ["Twoja wiadomość", "00:00", false],
          ["Czytam",          "00:08", false],
          ["Odpowiadam",      "00:41", false],
          ["Rozwiązane ✓",    "01:17", true],
        ].map(([label, time, done], i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            animationName: "svc-fade-up", animationDuration: "0.35s",
            animationDelay: `${0.2 + i * 0.15}s`, animationFillMode: "both",
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: done ? "#1B9D17" : "rgba(27,157,23,0.3)", flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: done ? "#ECE7DD" : "#4a6347", flex: 1 }}>{label}</span>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "#1B9D17" }}>{time}</span>
          </div>
        ))}
      </div>
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
  const catScrollRef = useRef<HTMLDivElement>(null);
  const currentRef   = useRef(0);
  const isActiveRef  = useRef(false);
  const exitCooldown = useRef(false);

  useEffect(() => { currentRef.current = currentCard; }, [currentCard]);
  useEffect(() => { isActiveRef.current = isActive; }, [isActive]);

  const activeCat    = allCards[currentCard]?.catIndex ?? 0;
  const activeInCat  = allCards[currentCard]?.catServiceIndex ?? 0;
  const isLast       = currentCard === TOTAL - 1;

  // Auto-scroll mobile category bar to active tab
  useEffect(() => {
    const bar = catScrollRef.current;
    if (!bar) return;
    const btn = bar.children[activeCat] as HTMLElement | undefined;
    if (btn) btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeCat]);

  const exitSection = (dir: "up" | "down") => {
    const spacer = spacerRef.current; if (!spacer) return;
    setIsActive(false); isActiveRef.current = false;
    exitCooldown.current = true;
    setTimeout(() => { exitCooldown.current = false; }, 600);
    if (dir === "down") window.scrollTo({ top: spacer.getBoundingClientRect().top + window.scrollY + spacer.offsetHeight + 10, behavior: "smooth" });
    else { setCurrentCard(0); currentRef.current = 0; window.scrollTo({ top: spacer.getBoundingClientRect().top + window.scrollY - 10, behavior: "smooth" }); }
  };

  useEffect(() => {
    const check = () => {
      if (exitCooldown.current) return;
      const spacer = spacerRef.current; if (!spacer) return;
      const { top, bottom } = spacer.getBoundingClientRect();
      if (top <= 0 && bottom > 0 && !isActiveRef.current) { setIsActive(true); isActiveRef.current = true; setCurrentCard(0); currentRef.current = 0; }
      else if ((top > 0 || bottom <= 0) && isActiveRef.current) { setIsActive(false); isActiveRef.current = false; }
    };
    window.addEventListener("scroll", check, { passive: true }); check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => {
    let accum = 0, cd = false;
    const onWheel = (e: WheelEvent) => {
      if (exitCooldown.current) return;
      const spacer = spacerRef.current; if (!spacer) return;
      const { top, bottom } = spacer.getBoundingClientRect();
      if (!(top <= 0 && bottom > 0)) return;
      e.preventDefault();
      if (!isActiveRef.current) { setIsActive(true); isActiveRef.current = true; }
      accum += e.deltaY;
      const dir = accum > 40 ? 1 : accum < -40 ? -1 : 0; if (!dir) return;
      accum = 0; if (cd) return; cd = true; setTimeout(() => { cd = false; }, 300);
      const next = currentRef.current + dir;
      if (next < 0) exitSection("up"); else if (next >= TOTAL) exitSection("down");
      else { setCurrentCard(next); currentRef.current = next; }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [TOTAL]);

  useEffect(() => {
    let startY = 0, cd = false;
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onMove  = (e: TouchEvent) => {
      if (exitCooldown.current) return;
      const spacer = spacerRef.current; if (!spacer) return;
      const { top, bottom } = spacer.getBoundingClientRect();
      if (top <= 0 && bottom > 0) e.preventDefault();
    };
    const onEnd   = (e: TouchEvent) => {
      if (exitCooldown.current) return;
      const spacer = spacerRef.current; if (!spacer) return;
      const { top, bottom } = spacer.getBoundingClientRect();
      if (!(top <= 0 && bottom > 0)) return;
      const dy = startY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 30) return;
      if (cd) return; cd = true; setTimeout(() => { cd = false; }, 400);
      const dir = dy > 0 ? 1 : -1;
      const next = currentRef.current + dir;
      if (next < 0) exitSection("up"); else if (next >= TOTAL) exitSection("down");
      else { setCurrentCard(next); currentRef.current = next; }
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchmove", onMove,  { passive: false });
    window.addEventListener("touchend",   onEnd,   { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove",  onMove);
      window.removeEventListener("touchend",   onEnd);
    };
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
            <div ref={catScrollRef} style={{ display: "flex", gap: 6, overflowX: "auto", padding: "0 16px 0", scrollbarWidth: "none" }}>
              {svc.categories.map((cat, i) => (
                <button key={i} onClick={() => jumpToCategory(i)} style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 100, background: i === activeCat ? `${CAT_ACCENTS[i]}18` : "transparent", border: `1px solid ${i === activeCat ? CAT_ACCENTS[i] : "rgba(52,225,46,0.12)"}`, color: i === activeCat ? CAT_ACCENTS[i] : "#4a6347", fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5, whiteSpace: "nowrap", transition: "all 0.22s" }}>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* SIDEBAR — desktop only */}
          <div className="svc-sidebar" style={{ width: 280, flexShrink: 0, height: "100%", borderRight: "1px solid rgba(52,225,46,0.06)", display: "flex", flexDirection: "column", background: "rgba(5,7,5,0.95)" }}>

            {/* Top section */}
            <div style={{ padding: "80px 28px 0" }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: "#34E12E", letterSpacing: 4, textTransform: "uppercase", margin: "0 0 4px", opacity: 0.7 }}>{svc.label}</p>
              <h2 style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 900, fontSize: "1.15rem", color: "#ECE7DD", lineHeight: 1.25, margin: "0 0 28px", letterSpacing: "-0.03em" }}>{svc.h2}</h2>
            </div>

            {/* Category nav */}
            <div style={{ padding: "0 16px", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
              {svc.categories.map((cat, i) => {
                const active = i === activeCat;
                const acc = CAT_ACCENTS[i];
                return (
                  <button
                    key={i}
                    onClick={() => jumpToCategory(i)}
                    style={{
                      width: "100%", display: "flex", flexDirection: "column", gap: 8,
                      padding: "14px 16px", borderRadius: 12,
                      background: active ? `${acc}0c` : "transparent",
                      border: `1px solid ${active ? `${acc}22` : "transparent"}`,
                      cursor: "pointer", textAlign: "left",
                      transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: active ? acc : "#4a6347", transition: "color 0.22s", letterSpacing: "-0.01em" }}>
                        {cat.label}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 600, color: active ? `${acc}99` : "rgba(52,225,46,0.2)", fontFamily: "var(--font-geist-mono)", letterSpacing: 0.5 }}>
                        {cat.services.length}
                      </span>
                    </div>
                    {active && (
                      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        {Array.from({ length: cat.services.length }).map((_, j) => (
                          <div key={j} style={{
                            height: 3, borderRadius: 2,
                            flex: j <= activeInCat ? 2 : 1,
                            background: j <= activeInCat ? acc : `${acc}25`,
                            transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                          }} />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom */}
            <div style={{ padding: "20px 28px 32px", borderTop: "1px solid rgba(52,225,46,0.06)" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 20 }}>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 32, fontWeight: 900, color: "#34E12E", lineHeight: 1, letterSpacing: "-0.04em" }}>
                  {String(currentCard + 1).padStart(2, "0")}
                </span>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 14, color: "#2d4a2a", fontWeight: 500 }}>
                  / {String(TOTAL).padStart(2, "0")}
                </span>
              </div>
              <a href="#kontakt" className="cta-green" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "linear-gradient(135deg,#1B9D17,#34E12E)", color: "#060807", fontWeight: 700, fontSize: 13, padding: "13px 16px", borderRadius: 10, textDecoration: "none", textAlign: "center" }}>
                {lang === "pl" ? "Wycień projekt" : "Get a quote"} <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          {/* CARD STAGE */}
          <div className="svc-stage" style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            {allCards.map((card, i) => {
              const active = i === currentCard, above = i < currentCard;
              const V = card.Visual;
              return (
                <div key={card.title} className="svc-card" style={{ position: "absolute", inset: "28px 0", display: "flex", flexDirection: "row", opacity: active ? 1 : 0, transform: `translateY(${active ? 0 : above ? -28 : 28}px)`, transition: "opacity 0.42s cubic-bezier(0.22,1,0.36,1), transform 0.42s cubic-bezier(0.22,1,0.36,1)", pointerEvents: active ? "auto" : "none", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(52,225,46,0.07)" }}>

                  {/* LEFT — service info */}
                  <div className="svc-text" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 48px 32px", overflowY: "auto" }}>
                    {/* Icon + category + index */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                      <div style={{ width: 46, height: 46, borderRadius: 13, background: `${card.accent}0d`, border: `1px solid ${card.accent}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: 22 }}>{card.emoji}</span>
                      </div>
                      <div>
                        <div style={{ fontSize: 9, color: card.accent, letterSpacing: 2.5, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>{card.catLabel}</div>
                        <div style={{ fontSize: 10, color: "#2d4a2a", fontFamily: "var(--font-geist-mono)", letterSpacing: 0.5 }}>{String(card.catServiceIndex + 1).padStart(2, "0")} / {String(card.catTotal).padStart(2, "0")}</div>
                      </div>
                      <div style={{ flex: 1, height: 1, background: "rgba(52,225,46,0.06)", marginLeft: 8 }} />
                    </div>

                    <h3 style={{ fontFamily: "var(--font-geist-sans)", fontSize: "clamp(1.5rem,2.4vw,2.6rem)", fontWeight: 900, color: "#ECE7DD", margin: "0 0 14px", lineHeight: 1.1, letterSpacing: "-0.025em" }}>{card.title}</h3>
                    <p style={{ fontSize: 15, color: "#6b8068", lineHeight: 1.85, margin: "0 0 22px", maxWidth: 500 }}>{card.desc}</p>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 30 }}>
                      {[...card.tags].map(tag => <Tag key={tag} accent={card.accent}>{tag}</Tag>)}
                    </div>

                    {/* CTA + scroll hint */}
                    <div className="svc-actions" style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <a href="#kontakt" className="cta-green" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: `linear-gradient(135deg,#1B9D17,${card.accent})`, color: "#060807", fontWeight: 700, fontSize: 13, padding: "10px 20px", borderRadius: 9, textDecoration: "none" }}>
                        {lang === "pl" ? "Zapytaj o wycenę" : "Get a quote"} →
                      </a>
                      <div className="svc-scroll-hint" style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", border: `1px solid ${card.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, animationName: isLast ? undefined : "scroll-hint-bounce", animationDuration: "1.8s", animationIterationCount: "infinite" }}>
                          <span style={{ fontSize: 11, color: card.accent }}>{isLast ? "✓" : "↓"}</span>
                        </div>
                        <span style={{ fontSize: 12, color: "#4a6347" }}>
                          {isLast ? (lang === "pl" ? "koniec — przewiń dalej" : "end — scroll on") : (lang === "pl" ? "następna usługa" : "next service")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT — benefit visual */}
                  <div className="svc-visual" style={{ width: "44%", flexShrink: 0, background: "rgba(5,8,5,0.72)", borderLeft: "1px solid rgba(52,225,46,0.06)", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 35% 55%, ${card.accent}0e 0%, transparent 68%)`, pointerEvents: "none" }} />
                    <div style={{ position: "absolute", top: 14, left: 16, zIndex: 2 }}>
                      <span style={{ fontSize: 9, fontWeight: 700, color: card.accent, letterSpacing: 1.5, textTransform: "uppercase", background: `${card.accent}12`, border: `1px solid ${card.accent}24`, borderRadius: 100, padding: "3px 10px" }}>{card.emoji} {card.catLabel}</span>
                    </div>
                    <div style={{ position: "absolute", inset: 0, paddingTop: 40 }}>
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

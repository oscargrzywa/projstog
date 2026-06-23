"use client";

import { useEffect, useRef, useState } from "react";

const S = { width: 20, height: 20, fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const IconPhone      = () => <svg {...S} viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.3a16 16 0 0 0 6 6l.85-1.04a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 15h.52a2 2 0 0 1 0 1.92z" /></svg>;
const IconBrain      = () => <svg {...S} viewBox="0 0 24 24"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" /></svg>;
const IconCode       = () => <svg {...S} viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>;
const IconHeadphones = () => <svg {...S} viewBox="0 0 24 24"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>;

const STEP_ICONS = [IconPhone, IconBrain, IconCode, IconHeadphones];
const METAS_PL = ["Bezpłatna · 30–60 min", "Makieta · Wycena · Termin", "Testy · Deploy · Szkolenie", "24h czas reakcji"];
const METAS_EN = ["Free · 30–60 min", "Mockup · Quote · Timeline", "Tests · Deploy · Training", "24h response time"];

type Step = { step: string; title: string; desc: string };

function BgPattern() {
  return (
    <svg
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06, pointerEvents: "none" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="pg" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <circle cx="24" cy="24" r="1.2" fill="#34E12E" />
          <line x1="24" y1="24" x2="48" y2="24" stroke="#34E12E" strokeWidth="0.5" />
          <line x1="24" y1="24" x2="24" y2="48" stroke="#34E12E" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pg)" />
    </svg>
  );
}

function ProcessCard({ title, desc, icon, meta, active }: {
  title: string; desc: string; icon: React.ReactNode; meta: string; active: boolean;
}) {
  return (
    <div className="process-card-wrap" style={{
      background: "rgba(10,16,10,0.85)",
      border: `1px solid ${active ? "rgba(52,225,46,0.32)" : "rgba(52,225,46,0.07)"}`,
      borderRadius: 18,
      padding: "20px 24px",
      width: "100%",
      maxWidth: 540,
      boxShadow: active
        ? "0 0 0 1px rgba(52,225,46,0.08), 0 8px 48px rgba(0,0,0,0.4), 0 0 48px rgba(52,225,46,0.12)"
        : "0 2px 16px rgba(0,0,0,0.2)",
      transform: active ? "scale(1.03)" : "scale(1)",
      transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div className="process-icon-wrap" style={{
          width: 34, height: 34, borderRadius: 9, flexShrink: 0,
          background: active ? "rgba(52,225,46,0.10)" : "rgba(52,225,46,0.04)",
          border: `1px solid ${active ? "rgba(52,225,46,0.28)" : "rgba(52,225,46,0.07)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: active ? "#34E12E" : "#4a6347",
          transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}>
          {icon}
        </div>
        <h3 style={{
          fontSize: 17, fontWeight: 800,
          color: active ? "#ECE7DD" : "#4a5e44",
          margin: 0, letterSpacing: "-0.02em", lineHeight: 1.2,
          transition: "color 0.4s",
        }}>{title}</h3>
      </div>
      <p style={{
        fontSize: 13, color: active ? "#6b8068" : "#333f31",
        lineHeight: 1.8, margin: "0 0 14px",
        transition: "color 0.4s",
      }}>{desc}</p>
      <div style={{ borderTop: `1px solid ${active ? "rgba(52,225,46,0.09)" : "rgba(52,225,46,0.03)"}`, paddingTop: 11 }}>
        <span style={{
          fontSize: 10, fontWeight: 600,
          color: active ? "rgba(52,225,46,0.65)" : "rgba(52,225,46,0.18)",
          letterSpacing: 1.5, textTransform: "uppercase",
          transition: "color 0.4s",
        }}>{meta}</span>
      </div>
    </div>
  );
}

export function ProcessSection({ steps, label, h2, lang }: {
  steps: readonly Step[]; label: string; h2: string; lang: string;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const stepRef   = useRef(0);
  const coolRef   = useRef(false);
  const metas     = lang === "en" ? METAS_EN : METAS_PL;
  const total     = steps.length;

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      if (rect.top > 1 || rect.bottom < window.innerHeight - 1) return;

      // Sync step with scroll position — fixes entering section from below
      const scrolled = Math.max(0, -rect.top);
      const synced = Math.max(0, Math.min(total - 1, Math.round(scrolled / window.innerHeight)));
      if (synced !== stepRef.current) {
        stepRef.current = synced;
        setActiveStep(synced);
      }

      const down = e.deltaY > 0;

      if (down && stepRef.current >= total - 1) {
        e.preventDefault();
        if (wrap) {
          const abs = wrap.getBoundingClientRect().bottom + window.scrollY;
          window.scrollTo({ top: abs - window.innerHeight + 2, behavior: "instant" as ScrollBehavior });
        }
        return;
      }
      if (!down && stepRef.current <= 0) {
        e.preventDefault();
        if (wrap) {
          const abs = wrap.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: Math.max(0, abs - 2), behavior: "instant" as ScrollBehavior });
        }
        return;
      }

      e.preventDefault();
      if (coolRef.current) return;
      coolRef.current = true;
      setTimeout(() => { coolRef.current = false; }, 260);

      const next = down
        ? Math.min(total - 1, stepRef.current + 1)
        : Math.max(0, stepRef.current - 1);
      stepRef.current = next;
      setActiveStep(next);
    };

    document.addEventListener("wheel", onWheel, { passive: false });
    return () => document.removeEventListener("wheel", onWheel);
  }, [total]);

  const fillPct = total > 1 ? (activeStep / (total - 1)) * 100 : 100;

  return (
    <div ref={wrapRef} id="proces" style={{ height: `${total * 100}vh`, position: "relative" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        background: "rgba(7,12,7,0.92)",
        display: "flex", flexDirection: "column", justifyContent: "center",
        overflow: "hidden", padding: "0 40px",
      }}>
        <BgPattern />

        <div style={{ maxWidth: 1500, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>

          {/* Header */}
          <div style={{ marginBottom: 36 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#34E12E", letterSpacing: 3, textTransform: "uppercase", margin: "0 0 10px" }}>{label}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
              <h2 style={{ fontFamily: "var(--font-geist-sans)", fontSize: "clamp(1.4rem,3vw,2.2rem)", fontWeight: 900, color: "#ECE7DD", lineHeight: 1.1, margin: 0, letterSpacing: "-0.025em" }}>
                {h2}
              </h2>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                {steps.map((_, i) => (
                  <div key={i} style={{
                    width: i === activeStep ? 28 : 8, height: 8, borderRadius: 4,
                    background: i === activeStep ? "#34E12E" : i < activeStep ? "rgba(52,225,46,0.35)" : "rgba(52,225,46,0.12)",
                    transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                    boxShadow: i === activeStep ? "0 0 12px rgba(52,225,46,0.5)" : "none",
                  }} />
                ))}
              </div>
            </div>
          </div>

          {/* Zig-zag rows + center line */}
          <div className="process-zz" style={{ position: "relative" }}>
            <div aria-hidden style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 3, background: "rgba(52,225,46,0.06)", transform: "translateX(-50%)", borderRadius: 2 }} />
            <div aria-hidden style={{ position: "absolute", left: "50%", top: 0, width: 3, height: `${fillPct}%`, background: "linear-gradient(to bottom, #34E12E, rgba(52,225,46,0.35))", transform: "translateX(-50%)", borderRadius: 2, transition: "height 0.4s cubic-bezier(0.22,1,0.36,1)", boxShadow: "0 0 10px rgba(52,225,46,0.35)" }} />

            {steps.map(({ step, title, desc }, i) => {
              const isLeft   = i % 2 === 0;
              const isActive = i === activeStep;
              const StepIcon = STEP_ICONS[i % STEP_ICONS.length];
              const meta     = metas[i] ?? "";
              return (
                <div key={step} className="process-row" style={{ display: "grid", gridTemplateColumns: "1fr 72px 1fr", alignItems: "center", marginBottom: i < total - 1 ? 18 : 0 }}>
                  <div className="process-left" style={{ display: "flex", justifyContent: "flex-end", paddingRight: 28 }}>
                    {isLeft ? <ProcessCard title={title} desc={desc} icon={<StepIcon />} meta={meta} active={isActive} /> : null}
                  </div>
                  <div className="process-node" style={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 1 }}>
                    <div className="process-node-circle" style={{
                      width: 48, height: 48, borderRadius: "50%",
                      background: isActive ? "#0d1f0d" : "#08110a",
                      border: `2.5px solid ${isActive ? "rgba(52,225,46,0.8)" : "rgba(52,225,46,0.15)"}`,
                      boxShadow: isActive ? "0 0 0 5px rgba(52,225,46,0.08), 0 0 28px rgba(52,225,46,0.35)" : "none",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-geist-mono)", fontSize: 12, fontWeight: 900,
                      color: isActive ? "#34E12E" : "rgba(52,225,46,0.22)",
                      letterSpacing: "0.05em",
                      transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                    }}>
                      {step}
                    </div>
                  </div>
                  <div className="process-right" style={{ paddingLeft: 28 }}>
                    {!isLeft ? <ProcessCard title={title} desc={desc} icon={<StepIcon />} meta={meta} active={isActive} /> : null}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll hint */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 28, opacity: activeStep < total - 1 ? 0.6 : 0, transition: "opacity 0.4s" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(52,225,46,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            <span style={{ fontSize: 11, color: "rgba(52,225,46,0.6)", letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>
              {lang === "en" ? "Scroll to continue" : "Przewiń dalej"}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

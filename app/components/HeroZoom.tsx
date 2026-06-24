"use client";

import { useEffect, useRef } from "react";
import { useLang } from "./LangContext";
import { content } from "../lib/content";

// ── Mini icons ────────────────────────────────────────────────────────────────
const G = { width: 14, height: 14, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const GIconTrend = () => <svg {...G} viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>;
const GIconBot   = () => <svg {...G} viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /></svg>;
const GIconBell  = () => <svg {...G} viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /></svg>;
const GIconZap   = () => <svg {...G} viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;

function LiveDot({ color }: { color: string }) {
  return <span aria-hidden style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: color, marginRight: 5, verticalAlign: "middle", animationName: "live-blink", animationDuration: "2s", animationIterationCount: "infinite", animationTimingFunction: "ease-in-out" }} />;
}

function GadgetCard({ icon, label, sub, color, posStyle, animName, animDelay }: {
  icon: React.ReactNode; label: string; sub: React.ReactNode;
  color: string; posStyle: React.CSSProperties; animName: string; animDelay: string;
}) {
  return (
    <div aria-hidden className="hero-gadget" style={{ position: "absolute", ...posStyle, animationName: animName, animationDuration: "7s", animationDelay: animDelay, animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", background: "rgba(8,14,8,0.82)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", border: `1px solid ${color}28`, borderRadius: 14, padding: "11px 14px", display: "flex", alignItems: "center", gap: 10, minWidth: 172, boxShadow: "0 8px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)", userSelect: "none", pointerEvents: "auto", zIndex: 3 }}>
      <div style={{ width: 30, height: 30, borderRadius: 8, background: `${color}1a`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color }}>{icon}</div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.25, fontFamily: "var(--font-geist-mono)" }}>{label}</div>
        <div style={{ fontSize: 11, color, marginTop: 3, fontWeight: 500, display: "flex", alignItems: "center" }}>{sub}</div>
      </div>
    </div>
  );
}

// ── Interactive canvas particle network ───────────────────────────────────────
function InteractiveNet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Anchored "service" positions (normalized 0-1)
    const ANCHORS = [
      { hx: 0.20, hy: 0.20 }, { hx: 0.78, hy: 0.18 },
      { hx: 0.12, hy: 0.65 }, { hx: 0.86, hy: 0.68 },
      { hx: 0.50, hy: 0.82 }, { hx: 0.50, hy: 0.48 }, // hub
    ];
    const EXTRA = 30;

    const nodes: Array<{ x: number; y: number; hx: number; hy: number; vx: number; vy: number; anchor: boolean }> = [
      ...ANCHORS.map(a => ({ ...a, x: a.hx, y: a.hy, vx: 0, vy: 0, anchor: true })),
      ...Array.from({ length: EXTRA }, () => {
        const hx = 0.05 + Math.random() * 0.9;
        const hy = 0.05 + Math.random() * 0.9;
        return { x: hx, y: hy, hx, hy, vx: 0, vy: 0, anchor: false };
      }),
    ];

    let mx = 0.5, my = 0.5, hasM = false;
    let raf = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width;
      my = (e.clientY - r.top)  / r.height;
      hasM = true;
    };
    const onLeave = () => { hasM = false; };
    window.addEventListener("mousemove", onMove);
    canvas.closest("[data-hero]")?.addEventListener("mouseleave", onLeave);

    const MAX_CONN = 0.24; // max connection distance (normalized diagonal fraction)

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const diag = Math.sqrt(w * w + h * h);

      ctx.clearRect(0, 0, w, h);

      nodes.forEach(n => {
        // Spring toward home
        n.vx += (n.hx - n.x) * (n.anchor ? 0.008 : 0.005);
        n.vy += (n.hy - n.y) * (n.anchor ? 0.008 : 0.005);
        // Mouse attraction
        if (hasM) {
          const dx = mx - n.x, dy = my - n.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          const R  = n.anchor ? 0.35 : 0.26;
          if (d < R && d > 0) {
            const f = ((R - d) / R) * (n.anchor ? 0.005 : 0.004);
            n.vx += dx * f;
            n.vy += dy * f;
          }
        }
        n.vx *= 0.86;
        n.vy *= 0.86;
        n.x += n.vx;
        n.y += n.vy;
      });

      // Lines
      const maxPx = diag * MAX_CONN;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = (nodes[i].x - nodes[j].x) * w;
          const dy = (nodes[i].y - nodes[j].y) * h;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxPx) {
            const t     = 1 - dist / maxPx;
            const eitherA = nodes[i].anchor || nodes[j].anchor;
            const bothA   = nodes[i].anchor && nodes[j].anchor;
            const alpha = t * (bothA ? 0.42 : eitherA ? 0.22 : 0.13);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x * w, nodes[i].y * h);
            ctx.lineTo(nodes[j].x * w, nodes[j].y * h);
            ctx.strokeStyle = `rgba(52,225,46,${alpha})`;
            ctx.lineWidth   = bothA ? 1.0 : eitherA ? 0.7 : 0.4;
            ctx.stroke();
          }
        }
      }

      // Dots
      nodes.forEach(n => {
        let proxGlow = 0;
        if (hasM) {
          const dx = mx - n.x, dy = my - n.y;
          proxGlow = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 0.20);
        }
        const radius = n.anchor ? 3.0 + proxGlow * 3 : 1.6 + proxGlow * 2;
        const alpha  = n.anchor ? 0.65 + proxGlow * 0.3 : 0.30 + proxGlow * 0.5;
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52,225,46,${alpha})`;
        ctx.fill();
        // Glow halo on hover
        if (proxGlow > 0.2) {
          ctx.beginPath();
          ctx.arc(n.x * w, n.y * h, radius + 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(52,225,46,${proxGlow * 0.07})`;
          ctx.fill();
        }
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      canvas.closest("[data-hero]")?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
    />
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function HeroZoom() {
  const { lang } = useLang();
  const t = content[lang].hero;

  const bgRef      = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tickerRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ZOOM_PX = 600;
    const onScroll = () => {
      const p = Math.min(Math.max(window.scrollY / ZOOM_PX, 0), 1);
      if (bgRef.current)      bgRef.current.style.transform = `scale(${1 + p * 0.20})`;
      if (contentRef.current) {
        contentRef.current.style.transform = `scale(${1 + p * 0.05}) translateY(${-p * 56}px)`;
        contentRef.current.style.opacity   = `${Math.max(0, 1 - p * 1.15)}`;
      }
      if (tickerRef.current)  tickerRef.current.style.opacity = `${Math.max(0, 1 - p * 2.2)}`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const phone = content[lang].nav.phone;

  return (
    <div data-hero style={{ height: "calc(100vh + 600px)", background: "#060807" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#060807" }}>

        {/* Aurora blobs */}
        <div ref={bgRef} style={{ position: "absolute", inset: "-8%", transformOrigin: "center", willChange: "transform" }}>
          <div style={{ position: "absolute", top: "5%", left: "-5%", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle,rgba(27,157,23,0.16) 0%,transparent 70%)", filter: "blur(80px)", animationName: "aurora-blob-1", animationDuration: "16s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }} />
          <div style={{ position: "absolute", top: "20%", right: "-5%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(52,225,46,0.09) 0%,transparent 70%)", filter: "blur(100px)", animationName: "aurora-blob-2", animationDuration: "20s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }} />
          <div style={{ position: "absolute", bottom: "-5%", left: "28%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,200,160,0.08) 0%,transparent 70%)", filter: "blur(90px)", animationName: "aurora-blob-3", animationDuration: "14s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }} />
          {/* Corner bracket accents */}
          <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <polyline points="2,8 2,2 8,2"    fill="none" stroke="#34E12E" strokeWidth="0.5" strokeLinecap="round" />
            <polyline points="92,8 92,2 98,2"  fill="none" stroke="#34E12E" strokeWidth="0.5" strokeLinecap="round" />
            <polyline points="2,92 2,98 8,98"  fill="none" stroke="#34E12E" strokeWidth="0.5" strokeLinecap="round" />
            <polyline points="92,92 92,98 98,98" fill="none" stroke="#34E12E" strokeWidth="0.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Interactive particle network */}
        <InteractiveNet />

        {/* Floating gadgets */}
        <GadgetCard icon={<GIconBell />}  label={t.gadgets.lead.label}   sub={<><LiveDot color="#34E12E" />{t.gadgets.lead.sub}</>}   color="#34E12E" posStyle={{ left: "3%", top: "27%" }}    animName="gadget-float-a" animDelay="0s"   />
        <GadgetCard icon={<GIconTrend />} label={t.gadgets.google.label} sub={<><LiveDot color="#34E12E" />{t.gadgets.google.sub}</>} color="#34E12E" posStyle={{ right: "3%", top: "22%" }}   animName="gadget-float-b" animDelay="1.8s" />
        <GadgetCard icon={<GIconBot />}   label={t.gadgets.ai.label}     sub={<><LiveDot color="#00C8A0" />{t.gadgets.ai.sub}</>}     color="#00C8A0" posStyle={{ left: "3%", bottom: "30%" }}  animName="gadget-float-c" animDelay="3.5s" />
        <GadgetCard icon={<GIconZap />}   label={t.gadgets.live.label}   sub={t.gadgets.live.sub}                                     color="#1B9D17" posStyle={{ right: "3%", bottom: "32%" }} animName="gadget-float-a" animDelay="5s"   />

        {/* Content */}
        <div ref={contentRef} style={{ position: "absolute", inset: 0, zIndex: 4, display: "flex", alignItems: "center", paddingTop: 68, willChange: "transform, opacity", transformOrigin: "center 38%" }}>
          <div style={{ maxWidth: 1500, width: "100%", margin: "0 auto", padding: "0 48px" }}>
            <div className="hero-content" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
              {t.chips.map((chip, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: "#34E12E", letterSpacing: 2, textTransform: "uppercase", background: "rgba(52,225,46,0.07)", border: "1px solid rgba(52,225,46,0.2)", borderRadius: 100, padding: "5px 14px" }}>
                  {i === 0 && <span aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", background: "#34E12E", boxShadow: "0 0 6px #34E12E", display: "inline-block", animationName: "live-blink", animationDuration: "2s", animationIterationCount: "infinite" }} />}
                  {chip}
                </span>
              ))}
            </div>

            <h1 className="hero-content" style={{ margin: "0 0 28px", lineHeight: 1.0 }}>
              <span style={{ display: "block", fontFamily: "var(--font-geist-sans)", fontWeight: 900, fontSize: "clamp(2.8rem, 7.5vw, 8rem)", color: "#ffffff", letterSpacing: "-0.03em" }}>{t.h1a}</span>
              <span style={{ display: "block", fontFamily: "var(--font-geist-sans)", fontWeight: 900, fontSize: "clamp(2.8rem, 7.5vw, 8rem)", color: "#34E12E", letterSpacing: "-0.03em", fontStyle: "italic" }}>{t.h1b}</span>
            </h1>

            <div className="hero-sub">
              <p style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)", color: "#7a9477", lineHeight: 1.8, margin: "0 0 40px", maxWidth: 560 }}>{t.sub}</p>
            </div>

            <div className="hero-cta" style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
              <a href="#kontakt" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#1B9D17,#34E12E)", color: "#060807", fontWeight: 700, fontSize: 15, padding: "15px 32px", borderRadius: 10, textDecoration: "none", boxShadow: "0 8px 40px rgba(52,225,46,0.28)", letterSpacing: 0.2 }}>
                {t.cta1} <span aria-hidden>→</span>
              </a>
              <a href={`tel:${phone.replace(/\s/g, "")}`} style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#ECE7DD", textDecoration: "none", fontSize: 15, fontWeight: 600, letterSpacing: 0.2 }}>
                <span style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(52,225,46,0.08)", border: "1px solid rgba(52,225,46,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34E12E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.3a16 16 0 0 0 6 6l.85-1.04a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 15h.52a2 2 0 0 1 0 1.92z" /></svg>
                </span>
                {phone}
              </a>
            </div>
          </div>
        </div>

        {/* Ticker */}
        <div ref={tickerRef} style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 5, overflow: "hidden", padding: "16px 0", borderTop: "1px solid rgba(52,225,46,0.06)", background: "linear-gradient(to top,rgba(6,8,7,0.7) 0%,transparent 100%)", willChange: "opacity" }}>
          <div className="marquee-track">
            {[...t.ticker, ...t.ticker].map((item, i) => (
              <span key={i} style={{ fontSize: 11, fontWeight: 700, color: "#3d5e3a", padding: "0 26px", letterSpacing: 2.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>
                {item}<span style={{ color: "#1B9D17", marginLeft: 26 }}>·</span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

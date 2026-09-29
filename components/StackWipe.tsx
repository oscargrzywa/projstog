"use client";

/**
 * Przejście po zjechaniu z hero: „budowanie strony".
 *
 * Nawiązuje do znaku PROJSTOG (rosnący stóg): od dołu wyrastają kolumny
 * warstw — blok po bloku, falą od lewej — z zieloną krawędzią jak pasek
 * postępu builda. Zakrywają widok, odlatują w górę i odsłaniają sekcję.
 * Pod nimi przepływa dym w kolorach hero.
 *
 * Wyzwalacz: znacznik (w miejscu komponentu) mija przy przewijaniu w dół
 * linię na 65% wysokości ekranu. Powrót nad linię uzbraja efekt ponownie.
 * Canvas istnieje tylko w trakcie animacji, pointer-events: none.
 * prefers-reduced-motion: reduce → nic się nie dzieje.
 */

import { useEffect, useRef, useState } from "react";

type RGB = [number, number, number];

const DURATION = 1500;
const LINE = 0.65;

const easeInOut = (t: number) =>
  t < 0.5 ? 16 * t ** 5 : 1 - Math.pow(-2 * t + 2, 5) / 2;

/* Token (#rrggbb) → RGB. Canvas nie wszędzie rozumie color-mix(),
   więc przezroczystość składamy sami. */
function readRgb(name: string, fallback: RGB): RGB {
  const hex = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return fallback;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const rgba = ([r, g, b]: RGB, a: number) => `rgba(${r}, ${g}, ${b}, ${a})`;

export function StackWipe() {
  const markerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // n = licznik wystrzałów (0 = spoczynek), up = przewijanie w górę.
  const [playing, setPlaying] = useState({ n: 0, up: false });

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Czy znacznik jest nad linią. Zmiana stanu = przekroczenie linii:
    // w dół → warstwy od dołu, w górę → lustrzanie, od góry.
    let above = marker.getBoundingClientRect().top < window.innerHeight * LINE;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rootTop = entry.rootBounds?.top ?? window.innerHeight * LINE;
        const nowAbove = !entry.isIntersecting && entry.boundingClientRect.top < rootTop;
        if (nowAbove === above) return;
        above = nowAbove;
        if (reduced.matches) return;
        setPlaying((prev) => ({ n: prev.n + 1, up: !nowAbove }));
      },
      { threshold: 0, rootMargin: `-${LINE * 100}% 0px 0px 0px` }
    );
    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing.n) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    // W górę: ta sama animacja odbita w pionie.
    if (playing.up) ctx.setTransform(dpr, 0, 0, -dpr, 0, H * dpr);
    else ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const obsydian = readRgb("--color-obsydian", [6, 8, 7]);
    const basalt = readRgb("--color-basalt", [14, 19, 14]);
    const hairline = readRgb("--color-hairline", [29, 38, 28]);
    const signal = readRgb("--color-signal", [27, 157, 23]);
    const voltage = readRgb("--color-voltage", [52, 225, 46]);

    // Siatka warstw: kolumny ~ co 90px, warstwy ~ co 1/7 ekranu.
    const cols = Math.max(6, Math.round(W / 90));
    const rows = 7;
    const colW = W / cols;
    const rowH = H / rows;
    const gap = 3;

    // Fala od lewej + lekki szum, żeby nie wyglądało jak linijka.
    const colDelay = Array.from(
      { length: cols },
      (_, i) => (i / cols) * 0.22 + Math.random() * 0.05
    );

    const puffs = Array.from({ length: 7 }, (_, i) => ({
      x: (W / 7) * (i + 0.5),
      r: Math.max(W, H) * (0.25 + Math.random() * 0.15),
      drift: (Math.random() - 0.5) * W * 0.1,
    }));

    let raf = 0;
    const start = performance.now();

    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      ctx.clearRect(0, 0, W, H);

      // Dym pod spodem — unosi się przez cały czas trwania przejścia.
      ctx.globalCompositeOperation = "lighter";
      const smokeA = Math.sin(t * Math.PI) * 0.2;
      for (const s of puffs) {
        const y = H * 1.2 - H * 1.6 * t;
        const x = s.x + s.drift * t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, s.r);
        g.addColorStop(0, rgba(signal, smokeA));
        g.addColorStop(0.5, rgba(voltage, smokeA * 0.3));
        g.addColorStop(1, rgba(signal, 0));
        ctx.fillStyle = g;
        ctx.fillRect(x - s.r, y - s.r, s.r * 2, s.r * 2);
      }
      ctx.globalCompositeOperation = "source-over";

      for (let c = 0; c < cols; c++) {
        // Każda kolumna: faza budowania (0–0.5) i odlotu (0.5–1).
        const local = Math.min(1, Math.max(0, (t - colDelay[c]) / (1 - 0.27)));
        if (local <= 0) continue;

        const build = easeInOut(Math.min(1, local / 0.5));
        const leave = easeInOut(Math.max(0, (local - 0.5) / 0.5));

        // Ile warstw już stoi (ułamek = warstwa w trakcie wjazdu).
        const stacked = build * rows;
        const lift = leave * (H + rowH);
        const x = c * colW + gap / 2;
        const w = colW - gap;

        for (let r = 0; r < rows; r++) {
          const grow = Math.min(1, Math.max(0, stacked - r));
          if (grow <= 0) break;
          // Warstwa wjeżdża od dołu na swoje miejsce.
          const slotY = H - (r + 1) * rowH;
          const y = slotY + (1 - grow) * rowH * 0.6 - lift;
          const h = rowH - gap;
          if (y > H || y + h < 0) continue;

          ctx.globalAlpha = grow;
          ctx.fillStyle = rgba(r % 2 ? basalt : obsydian, 1);
          ctx.fillRect(x, y, w, h);
          ctx.strokeStyle = rgba(hairline, 1);
          ctx.lineWidth = 1;
          ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
        }

        // Krawędź postępu: świecąca linia na szczycie stosu.
        const topY = H - stacked * rowH - lift;
        if (topY > -4 && topY < H) {
          ctx.globalAlpha = 1 - leave;
          ctx.fillStyle = rgba(voltage, 0.9);
          ctx.fillRect(x, topY - 1, w, 2);
          const glow = ctx.createLinearGradient(0, topY, 0, topY + 40);
          glow.addColorStop(0, rgba(voltage, 0.25));
          glow.addColorStop(1, rgba(voltage, 0));
          ctx.fillStyle = glow;
          ctx.fillRect(x, topY, w, 40);
        }
      }
      ctx.globalAlpha = 1;

      if (t < 1) raf = requestAnimationFrame(frame);
      else setPlaying((prev) => ({ ...prev, n: 0 }));
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  return (
    <>
      <div ref={markerRef} className="h-px w-full" aria-hidden="true" />
      {playing.n > 0 && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[60] h-full w-full"
        />
      )}
    </>
  );
}

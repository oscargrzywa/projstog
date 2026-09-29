"use client";

/**
 * Własny kursor z efektem „soczewki" + magnetyczne przyciski.
 *
 * Czysta dekoracja: aria-hidden, nie łapie fokusu, nie dotyka focus-visible.
 * Włącza się wyłącznie na urządzeniach z precyzyjnym wskaźnikiem i bez
 * `prefers-reduced-motion` — na dotyku i przy ograniczonym ruchu nic się
 * nie renderuje, zostaje natywny kursor.
 *
 * API atrybutów (wszystko przez delegację, zero listenerów per element):
 * - `data-cursor="view"` — pierścień rośnie i pokazuje etykietę,
 * - `data-cursor-label` — tekst etykiety (domyślnie „Zobacz"),
 * - `data-magnetic` — element lekko ciągnie się za wskaźnikiem,
 * - `data-cursor="lens"` — strefa z własną soczewką (HeroLens): pierścień
 *   znika, zostaje sama kropka.
 */

import { useEffect, useRef, useSyncExternalStore } from "react";

import "./cursor.css";

const QUERIES = [
  "(hover: hover) and (pointer: fine)",
  "(prefers-reduced-motion: no-preference)",
];

const INTERACTIVE =
  "a, button, summary, [role=button], input, textarea, select, label";

// Pola, w których się pisze — tu pierścień znika, zostaje natywna karetka.
const TEXT_FIELD =
  "textarea, [contenteditable]:not([contenteditable=false]), input:not([type=button], [type=submit], [type=reset], [type=checkbox], [type=radio], [type=range], [type=color], [type=file], [type=image])";

const DEFAULT_LABEL = "Zobacz";

// Pogoń pierścienia: udział dystansu nadrabiany w jednej klatce przy 60 fps.
const RING_LERP = 0.18;
const FRAME_MS = 1000 / 60;

// Magnetyzm: siła i twardy limit przesunięcia w px.
const MAGNET_STRENGTH = 0.3;
const MAGNET_MAX = 10;

type CursorState = "default" | "hover" | "view" | "text" | "lens";

function subscribe(onChange: () => void) {
  const lists = QUERIES.map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", onChange));
  return () => lists.forEach((l) => l.removeEventListener("change", onChange));
}

const getSnapshot = () => QUERIES.every((q) => window.matchMedia(q).matches);
const getServerSnapshot = () => false;

const clamp = (v: number, max: number) => Math.max(-max, Math.min(max, v));

export function Cursor() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!enabled || !root || !dot || !ring || !label) return;

    const html = document.documentElement;
    html.classList.add("has-custom-cursor");

    const target = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };
    let seen = false;
    let raf = 0;
    let last = 0;

    let magnet: HTMLElement | null = null;
    const offset = { x: 0, y: 0 };

    const place = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    // Pętla żyje tylko dopóki pierścień nie dogonił kropki.
    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 100) : FRAME_MS;
      last = now;

      // Lerp niezależny od FPS: ta sama krzywa przy 60 i 144 Hz.
      const k = 1 - Math.pow(1 - RING_LERP, dt / FRAME_MS);
      ringPos.x += (target.x - ringPos.x) * k;
      ringPos.y += (target.y - ringPos.y) * k;

      if (Math.abs(target.x - ringPos.x) < 0.1 && Math.abs(target.y - ringPos.y) < 0.1) {
        ringPos.x = target.x;
        ringPos.y = target.y;
        place(ring, ringPos.x, ringPos.y);
        raf = 0;
        last = 0;
        return;
      }

      place(ring, ringPos.x, ringPos.y);
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const setState = (state: CursorState, text?: string) => {
      root.dataset.state = state;
      if (state === "view") label.textContent = text || DEFAULT_LABEL;
    };

    const releaseMagnet = () => {
      if (!magnet) return;
      magnet.removeAttribute("data-magnet-active");
      magnet.style.transform = "";
      magnet = null;
      offset.x = 0;
      offset.y = 0;
    };

    const pullMagnet = (x: number, y: number) => {
      if (!magnet) return;
      // Prostokąt zawiera już nasze przesunięcie — odejmujemy je,
      // żeby liczyć od spoczynkowego środka (bez sprzężenia zwrotnego).
      const r = magnet.getBoundingClientRect();
      const cx = r.left + r.width / 2 - offset.x;
      const cy = r.top + r.height / 2 - offset.y;
      offset.x = clamp((x - cx) * MAGNET_STRENGTH, MAGNET_MAX);
      offset.y = clamp((y - cy) * MAGNET_STRENGTH, MAGNET_MAX);
      magnet.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0)`;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      target.x = e.clientX;
      target.y = e.clientY;
      place(dot, target.x, target.y);

      // Pierwszy ruch: pierścień startuje od razu pod wskaźnikiem,
      // nie przylatuje z lewego górnego rogu.
      if (!seen) {
        seen = true;
        ringPos.x = target.x;
        ringPos.y = target.y;
        place(ring, ringPos.x, ringPos.y);
      }
      root.dataset.visible = "true";

      pullMagnet(e.clientX, e.clientY);
      wake();
    };

    const onOver = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const el = e.target instanceof Element ? e.target : null;

      const view = el?.closest<HTMLElement>('[data-cursor="view"]');
      if (view) setState("view", view.dataset.cursorLabel);
      else if (el?.closest(TEXT_FIELD)) setState("text");
      else if (el?.closest(INTERACTIVE)) setState("hover");
      else if (el?.closest('[data-cursor="lens"]')) setState("lens");
      else setState("default");

      const next = el?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (next !== magnet) {
        releaseMagnet();
        magnet = next;
        magnet?.setAttribute("data-magnet-active", "");
      }
    };

    // Wyjście poza okno: relatedTarget === null.
    const onOut = (e: PointerEvent) => {
      if (e.relatedTarget) return;
      root.dataset.visible = "false";
      releaseMagnet();
    };

    const onLeave = () => {
      root.dataset.visible = "false";
      releaseMagnet();
    };

    const onDown = () => {
      root.dataset.pressed = "true";
    };
    const onUp = () => {
      root.dataset.pressed = "false";
    };

    // Po przewinięciu środek magnesu jest gdzie indziej — puszczamy go.
    const onScroll = () => releaseMagnet();

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    html.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      html.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      releaseMagnet();
      html.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      className="cursor"
      aria-hidden="true"
      data-state="default"
      data-visible="false"
      data-pressed="false"
    >
      <div ref={ringRef} className="cursor__ring">
        <div className="cursor__lens" />
        <span ref={labelRef} className="cursor__label">
          {DEFAULT_LABEL}
        </span>
      </div>
      <div ref={dotRef} className="cursor__dot">
        <div className="cursor__pip" />
      </div>
    </div>
  );
}

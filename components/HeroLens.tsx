"use client";

/**
 * Nagłówek hero z soczewką „pod wodą".
 *
 * Kursor w hero zamienia się w kroplę: pod nią nagłówek jest powiększony
 * i załamany jak przez taflę wody (SVG feTurbulence + feDisplacementMap,
 * z lekkim rozszczepieniem kanałów). Kropla idzie za wskaźnikiem z oporem
 * cieczy i rozciąga się w kierunku ruchu.
 *
 * SEO: prawdziwy <h1> renderuje się serwerowo zawsze. Soczewka to osobna,
 * aria-hidden kopia tekstu (div, nie drugi h1), dokładana dopiero na
 * urządzeniach z myszą i bez prefers-reduced-motion.
 */

import { useEffect, useId, useRef, useSyncExternalStore } from "react";

import "./hero-lens.css";

const QUERIES = [
  "(hover: hover) and (pointer: fine)",
  "(prefers-reduced-motion: no-preference)",
];

// Nad przyciskami kropla znika — tam rządzi zwykły kursor.
const INTERACTIVE = "a, button, summary, [role=button], input, textarea, select";

// Opór cieczy: udział dystansu nadrabiany w klatce przy 60 fps.
const FOLLOW = 0.1;
const GROW = 0.08;
const FRAME_MS = 1000 / 60;

// Powiększenie pod kroplą.
const ZOOM = 1.45;

function subscribe(onChange: () => void) {
  const lists = QUERIES.map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", onChange));
  return () => lists.forEach((l) => l.removeEventListener("change", onChange));
}

const getSnapshot = () => QUERIES.every((q) => window.matchMedia(q).matches);
const getServerSnapshot = () => false;

export function HeroLens({
  text,
  className = "",
  headingClassName = "",
  style,
}: {
  text: string;
  /** Klasy wrappera: marginesy, animacja wejścia. */
  className?: string;
  /** Klasy typograficzne — wspólne dla h1 i kopii w soczewce. */
  headingClassName?: string;
  style?: React.CSSProperties;
}) {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const filterId = `water-${useId().replace(/:/g, "")}`;

  const wrapRef = useRef<HTMLDivElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const turb = turbRef.current;
    if (!enabled || !wrap || !turb) return;

    // Kropla żyje w całej sekcji hero, nie tylko nad samym nagłówkiem.
    const zone = wrap.closest("section") ?? wrap;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let radius = 0;
    let targetRadius = 0;
    let seen = false;
    let raf = 0;
    let last = 0;

    const baseRadius = () => Math.min(150, Math.max(90, window.innerWidth * 0.085));

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 100) : FRAME_MS;
      last = now;
      const f = dt / FRAME_MS;

      const kPos = 1 - Math.pow(1 - FOLLOW, f);
      const kGrow = 1 - Math.pow(1 - GROW, f);
      const vx = (target.x - pos.x) * kPos;
      const vy = (target.y - pos.y) * kPos;
      pos.x += vx;
      pos.y += vy;
      radius += (targetRadius - radius) * kGrow;

      // Rozciągnięcie kropli wzdłuż ruchu — jak kropla ciągnięta w wodzie.
      const speed = Math.hypot(vx, vy) / f;
      const stretch = 1 + Math.min(speed / 60, 0.28);
      const angle = Math.atan2(vy, vx);

      wrap.style.setProperty("--lx", `${pos.x}px`);
      wrap.style.setProperty("--ly", `${pos.y}px`);
      wrap.style.setProperty("--lr", `${radius}px`);
      wrap.style.setProperty("--ls", `${stretch}`);
      wrap.style.setProperty("--la", `${angle}rad`);

      // Falowanie tafli: powolne „oddychanie" częstotliwości szumu.
      // Małe amplitudy — fala ma płynąć, nie migotać.
      const t = now / 1000;
      turb.setAttribute(
        "baseFrequency",
        `${(0.0035 + Math.sin(t * 0.6) * 0.0006).toFixed(5)} ${(0.009 + Math.cos(t * 0.45) * 0.0015).toFixed(5)}`
      );

      const settled =
        targetRadius === 0 &&
        radius < 0.5 &&
        Math.abs(target.x - pos.x) < 0.1 &&
        Math.abs(target.y - pos.y) < 0.1;

      if (settled) {
        radius = 0;
        wrap.style.setProperty("--lr", "0px");
        raf = 0;
        last = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = wrap.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;

      // Pierwszy ruch: kropla pojawia się pod wskaźnikiem, nie przylatuje.
      if (!seen) {
        seen = true;
        pos.x = target.x;
        pos.y = target.y;
      }

      const el = e.target instanceof Element ? e.target : null;
      const inside = zone.contains(el);
      const overControl = !!el?.closest(INTERACTIVE);
      targetRadius = inside && !overControl ? baseRadius() : 0;
      wake();
    };

    const onLeave = () => {
      targetRadius = 0;
      wake();
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    zone.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      document.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  return (
    <div
      ref={wrapRef}
      className={`hero-lens ${className}`}
      data-lens={enabled ? "" : undefined}
      style={{ ...style, "--lens-zoom": ZOOM } as React.CSSProperties}
    >
      <h1 className={headingClassName}>{text}</h1>

      {enabled && (
        <>
          <div
            className={`hero-lens__clone ${headingClassName}`}
            style={{ filter: `url(#${filterId})` }}
            aria-hidden="true"
          >
            {text}
          </div>
          <div className="hero-lens__drop" aria-hidden="true" />

          {/* Filtr tafli: JEDNA oktawa szumu o bardzo niskiej
              częstotliwości — długie, gładkie fale zamiast ziarna.
              Wysoka częstotliwość i kilka oktaw dają „włochatą" krawędź
              liter (efekt mchu), więc tego unikamy. Aberracja to tylko
              przesunięty o 2px kanał zielony — cienka poświata w kolorze
              marki na krawędziach (czerwony wyglądał jak błąd renderu). */}
          <svg className="hero-lens__defs" aria-hidden="true" focusable="false">
            <filter
              id={filterId}
              x="-5%"
              y="-5%"
              width="110%"
              height="110%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                ref={turbRef}
                type="fractalNoise"
                baseFrequency="0.0035 0.009"
                numOctaves={1}
                seed={4}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={16}
                xChannelSelector="R"
                yChannelSelector="G"
                result="wave"
              />
              <feOffset in="wave" dx={2} dy={0} result="shifted" />
              <feColorMatrix
                in="shifted"
                type="matrix"
                values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 0.45 0"
                result="fringe"
              />
              <feMerge>
                <feMergeNode in="fringe" />
                <feMergeNode in="wave" />
              </feMerge>
            </filter>
          </svg>
        </>
      )}
    </div>
  );
}

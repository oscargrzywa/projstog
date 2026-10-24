"use client";

/**
 * Nagłówek hero z soczewką „pod wodą".
 *
 * Kursor w hero zamienia się w kroplę: pod nią nagłówek jest powiększony
 * i załamany jak przez taflę wody (SVG feTurbulence + feDisplacementMap,
 * z lekkim rozszczepieniem kanałów). Kropla idzie za wskaźnikiem z oporem
 * cieczy i rozciąga się w kierunku ruchu.
 *
 * Wydajność: filtr SVG liczy się tylko w małym, kwadratowym oknie wokół
 * kropli (nie na całym powiększonym nagłówku), kropla porusza się samym
 * transformem, a pętla staje, gdy kropla stoi — nieruchomy kursor nic
 * nie kosztuje. W trybie lite (lib/perf) soczewki nie ma.
 *
 * SEO: prawdziwy <h1> renderuje się serwerowo zawsze. Soczewka to osobna,
 * aria-hidden kopia tekstu (div, nie drugi h1), dokładana dopiero na
 * urządzeniach z myszą i bez prefers-reduced-motion.
 */

import { useEffect, useId, useRef, useSyncExternalStore } from "react";

import { isLite, isLiteServer, subscribePerf } from "@/lib/perf";

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

// Zapas okna soczewki poza krawędzią kropli — falowanie zaciąga piksele
// z sąsiedztwa i bez marginesu przy brzegu koła pojawiałyby się dziury.
const WINDOW_PAD = 24;

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
  const capable = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const lite = useSyncExternalStore(subscribePerf, isLite, isLiteServer);
  const enabled = capable && !lite;
  const filterId = `water-${useId().replace(/:/g, "")}`;

  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!enabled || !wrap) return;

    // Kropla żyje w całej sekcji hero, nie tylko nad samym nagłówkiem.
    const zone = wrap.closest("section") ?? wrap;
    const set = (name: string, value: string) => wrap.style.setProperty(name, value);

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let base = 0;
    let radius = 0;
    let targetRadius = 0;
    let seen = false;
    let jump = false;
    let active = false;
    let raf = 0;
    let last = 0;

    // Promień kropli, okno soczewki i szerokość kopii (łamanie wierszy
    // musi być identyczne jak w h1) — przeliczane tylko przy zmianie rozmiaru.
    const measure = () => {
      base = Math.min(150, Math.max(90, window.innerWidth * 0.085));
      set("--lb", `${base}px`);
      set("--lw", `${base + WINDOW_PAD}px`);
      set("--lens-w", `${wrap.offsetWidth}px`);
      if (targetRadius) targetRadius = base;
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 100) : FRAME_MS;
      last = now;
      const f = dt / FRAME_MS;

      // Jeden odczyt układu na klatkę, przed zapisami — bez wymuszonych
      // przeliczeń stylów w środku pętli.
      const r = wrap.getBoundingClientRect();
      target.x = pointer.x - r.left;
      target.y = pointer.y - r.top;
      // Pierwszy ruch: kropla pojawia się pod wskaźnikiem, nie przylatuje.
      if (jump) {
        jump = false;
        pos.x = target.x;
        pos.y = target.y;
      }

      const kPos = 1 - Math.pow(1 - FOLLOW, f);
      const kGrow = 1 - Math.pow(1 - GROW, f);
      const vx = (target.x - pos.x) * kPos;
      const vy = (target.y - pos.y) * kPos;
      pos.x += vx;
      pos.y += vy;
      radius += (targetRadius - radius) * kGrow;

      const settled =
        Math.abs(target.x - pos.x) < 0.1 &&
        Math.abs(target.y - pos.y) < 0.1 &&
        Math.abs(targetRadius - radius) < 0.5;
      if (settled) {
        pos.x = target.x;
        pos.y = target.y;
        radius = targetRadius;
      }

      // Rozciągnięcie kropli wzdłuż ruchu — jak kropla ciągnięta w wodzie.
      const speed = settled ? 0 : Math.hypot(vx, vy) / f;
      const stretch = 1 + Math.min(speed / 60, 0.28);

      // Schowana kropla: okno i maska h1 znikają całkiem (zero filtra).
      const nowActive = radius > 0.5;
      if (nowActive !== active) {
        active = nowActive;
        wrap.toggleAttribute("data-active", active);
      }
      if (active) {
        set("--lx", `${pos.x}px`);
        set("--ly", `${pos.y}px`);
        set("--lr", `${radius}px`);
        set("--lk", `${radius / base}`);
        set("--ls", `${stretch}`);
        set("--la", `${Math.atan2(vy, vx)}rad`);
      }

      if (settled) {
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
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!seen) {
        seen = true;
        jump = true;
      }

      const el = e.target instanceof Element ? e.target : null;
      const inside = zone.contains(el);
      const overControl = !!el?.closest(INTERACTIVE);
      targetRadius = inside && !overControl ? base : 0;
      wake();
    };

    const onLeave = () => {
      targetRadius = 0;
      wake();
    };

    const ro = new ResizeObserver(() => {
      measure();
      wake();
    });
    measure();
    ro.observe(wrap);

    document.addEventListener("pointermove", onMove, { passive: true });
    zone.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      document.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      ro.disconnect();
      cancelAnimationFrame(raf);
      wrap.removeAttribute("data-active");
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
          {/* Okno soczewki: mały kwadrat jadący za kroplą, przycięty do
              koła. Filtr wisi na nim, nie na kopii — liczy się więc tylko
              ten kwadrat, a nie cały powiększony nagłówek. */}
          <div
            className="hero-lens__window"
            style={{ filter: `url(#${filterId})` }}
            aria-hidden="true"
          >
            <div className={`hero-lens__clone ${headingClassName}`}>{text}</div>
          </div>
          <div className="hero-lens__drop" aria-hidden="true" />

          {/* Filtr tafli: JEDNA oktawa szumu o bardzo niskiej
              częstotliwości — długie, gładkie fale zamiast ziarna.
              Wysoka częstotliwość i kilka oktaw dają „włochatą" krawędź
              liter (efekt mchu), więc tego unikamy. Aberracja to tylko
              przesunięty kanał zielony — cienka poświata w kolorze marki
              na krawędziach (czerwony wyglądał jak błąd renderu).
              Wartości w pikselach ekranu (filtr leży na nieskalowanym
              oknie): fala i przesunięcie ×1.45 względem kopii. */}
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
                type="fractalNoise"
                baseFrequency="0.0024 0.0062"
                numOctaves={1}
                seed={4}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={23}
                xChannelSelector="R"
                yChannelSelector="G"
                result="wave"
              />
              <feOffset in="wave" dx={3} dy={0} result="shifted" />
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

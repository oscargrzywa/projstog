"use client";

/**
 * Etapy współpracy z makietą, która pokazuje każdy z nich.
 *
 * Cała treść etapów (nazwa, opis, „od Ciebie") jest w HTML-u i widoczna
 * zawsze — makieta tylko podkreśla jeden etap. Gdy sekcja jest w widoku,
 * etapy przełączają się same (pasek czasu pod aktywnym); kliknięcie
 * w etap wyłącza autoodtwarzanie na dobre. Kursor albo fokus w sekcji
 * wstrzymuje zegar — czytasz w swoim tempie.
 *
 * Zegar: pasek `.step__timer` to animacja CSS; `animationend` przełącza
 * etap. Pauza = `animation-play-state: paused` na pasku (pseudoelement
 * dziedziczy ją jawnie).
 * Reduced-motion: bez autoodtwarzania, bez paska.
 */

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";

import "./offer.css";

type Step = { name: string; description: string; need: string };
type Visual = {
  draftUrl: string;
  liveUrl: string;
  online: string;
  backup: string;
  ssl: string;
  updates: string;
};

const STEP_MS = 4600;
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getReduced = () => window.matchMedia(REDUCED_QUERY).matches;
/* Serwer: bez autoodtwarzania (jak przy reduced-motion). */
const getReducedServer = () => true;

export function ProcessSteps({ steps, visual }: { steps: Step[]; visual: Visual }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const [held, setHeld] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, getReducedServer);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const autoplay = auto && !reduced;
  const running = autoplay && inView && !held;

  const pick = (index: number) => {
    setAuto(false);
    setActive(index);
  };

  return (
    <div
      ref={rootRef}
      className="steps"
      data-ready=""
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false);
      }}
    >
      <div className="steps__visual">
        <StageMock step={active} visual={visual} />
      </div>

      <ol style={{ "--step-dur": `${STEP_MS}ms` } as CSSProperties}>
        {steps.map((step, index) => {
          const isActive = index === active;
          return (
            <li key={step.name} className="step" data-active={isActive ? "" : undefined}>
              <h3 className="text-2xl">
                <button
                  type="button"
                  className="step__button"
                  aria-pressed={isActive}
                  onClick={() => pick(index)}
                >
                  <span className="step__num">{String(index + 1).padStart(2, "0")}</span>
                  {step.name}
                </button>
              </h3>
              <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-bone-70">
                {step.description}
              </p>
              <p className="mt-2 max-w-[54ch] text-sm leading-relaxed text-lichen">
                {step.need}
              </p>

              {isActive && autoplay && (
                <span
                  key={active}
                  className="step__timer"
                  aria-hidden="true"
                  style={{ animationPlayState: running ? "running" : "paused" }}
                  onAnimationEnd={() => setActive((a) => (a + 1) % steps.length)}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Makieta — jedno okno, pięć stanów. Dekoracja. */
function StageMock({ step, visual }: { step: number; visual: Visual }) {
  const live = step >= 3;
  return (
    <div className="pv browser" data-step={step} aria-hidden="true">
      <div className="browser__bar">
        <span className="browser__dots">
          <span />
          <span />
          <span />
        </span>
        <span className="browser__url pv__url">
          <svg className="pv__lock" viewBox="0 0 12 12">
            <rect x="2.5" y="5.5" width="7" height="5" rx="1" />
            <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" />
          </svg>
          {live ? visual.liveUrl : visual.draftUrl}
        </span>
        <span className="pv__status">
          <span className="live-dot" />
          {visual.online}
        </span>
      </div>

      <div className="browser__viewport">
        <div className="pv__layer pv__brief">
          <span className="pv__line" style={{ width: "55%" }} />
          <span className="pv__line" style={{ width: "90%" }} />
          {[0, 1, 2].map((n) => (
            <span key={n} className="pv__todo">
              <i style={{ "--n": n } as CSSProperties} />
              <span className="pv__line" style={{ width: `${70 - n * 12}%` }} />
            </span>
          ))}
        </div>

        <div className="pv__layer pv__site">
          <div className="pv__nav">
            <span className="pv__logo" />
            <span className="pv__links">
              <span />
              <span />
              <span />
            </span>
          </div>
          <div className="pv__hero">
            <div className="pv__copy">
              <span className="pv__title" />
              <span className="pv__title" />
              <span className="pv__cta" />
            </div>
            <span className="pv__img" />
          </div>
          <div className="pv__cols">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="pv__phone">
          <span />
        </div>

        <div className="pv__serp">
          <span className="pv__serp-url">{visual.liveUrl}</span>
          <b />
          <span className="pv__line" style={{ width: "92%" }} />
          <span className="pv__line" style={{ width: "74%" }} />
        </div>

        <div className="pv__care">
          <div className="pv__uptime">
            {Array.from({ length: 30 }, (_, i) => (
              <span key={i} />
            ))}
          </div>
          <div className="pv__checks">
            <span>{visual.backup}</span>
            <span>{visual.ssl}</span>
            <span>{visual.updates}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

/**
 * „Film" procesu na stronie głównej: od briefu do klienta na stronie.
 *
 * Treść merytoryczna (tytuły i opisy rozdziałów) przychodzi w propsach
 * z Server Componentu i renderuje się serwerowo jako zwykła lista <ol> —
 * Googlebot widzi ją w HTML-u bez uruchamiania JS. Makieta przeglądarki
 * jest dekoracją (aria-hidden).
 *
 * Zegar filmu to animacja CSS paska postępu aktywnego rozdziału:
 * `animationend` przełącza na następny rozdział. Dzięki temu pauza
 * (przycisk, sekcja poza widokiem, ukryta karta) to jedno
 * `animation-play-state: paused` — bez setTimeoutów do synchronizowania.
 *
 * Sceny nie mają osobnych timeline'ów w JS. Rozdział ustawia na makiecie
 * zestaw flag (`data-site`, `data-chat`…), a CSS odgrywa wejścia warstw.
 * Stan końcowy każdego elementu jest stanem domyślnym — animacja startuje
 * tylko z `from`, więc bez JS i przy reduced-motion widać gotowe klatki.
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type AnimationEvent,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

import type { Dictionary } from "@/content/dictionary";

import "./process-film.css";

type ProcessCopy = Dictionary["home"]["process"];

/** Czas trwania rozdziałów (ms) — sceny z dłuższą choreografią dostają więcej. */
const DURATIONS = [5200, 5000, 5400, 6200, 5200, 6800, 6200, 6400];

/* --- zewnętrzne źródła stanu -------------------------------------------- */

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getReduced = () => window.matchMedia(REDUCED_QUERY).matches;
/* Na serwerze zakładamy brak ruchu: SSR renderuje gotową klatkę 1. */
const getReducedServer = () => true;

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}
const getVisible = () => document.visibilityState === "visible";
const getVisibleServer = () => true;

/* --- flagi scen ----------------------------------------------------------- */

function sceneFlags(ch: number) {
  const on = (v: boolean) => (v ? "" : undefined);
  return {
    "data-brief": on(ch === 0),
    "data-site": on(ch >= 1 && ch <= 6),
    "data-wf": on(ch === 1),
    "data-ds": on(ch >= 2 && ch <= 6),
    "data-design": on(ch === 2),
    "data-code": on(ch === 3),
    "data-live": on(ch >= 4 && ch <= 6),
    "data-speed": on(ch === 4),
    "data-chat": on(ch === 5),
    "data-flow": on(ch === 6),
    "data-serp": on(ch === 7),
  };
}

/* Kod w scenie 4 — tokeny z klasą koloru składni. */
const CODE: [string, string][][] = [
  [["export default ", "k"], ["function ", "k"], ["Hero", "f"], ["() {", ""]],
  [["  return (", ""]],
  [["    <", ""], ["section", "t"], [" className", "a"], ["=", ""], ['"hero"', "s"], [">", ""]],
  [["      <", ""], ["h1", "t"], [">", ""], ["{t.title}", "v"], ["</", ""], ["h1", "t"], [">", ""]],
  [["      <", ""], ["p", "t"], [">", ""], ["{t.lead}", "v"], ["</", ""], ["p", "t"], [">", ""]],
  [["      <", ""], ["Button", "f"], [" href", "a"], ["=", ""], ['"#pomiar"', "s"], [">", ""]],
  [["        ", ""], ["{t.cta}", "v"]],
  [["      </", ""], ["Button", "f"], [">", ""]],
  [["    </", ""], ["section", "t"], [">", ""]],
  [["  );", ""]],
  [["}", ""]],
];

const pad = (n: number) => String(n).padStart(2, "0");

export function ProcessFilm({
  copy,
}: {
  copy: Pick<ProcessCopy, "chapters" | "controls" | "demo">;
}) {
  const { chapters, controls, demo } = copy;
  const count = chapters.length;

  const reduced = useSyncExternalStore(subscribeReduced, getReduced, getReducedServer);
  const tabVisible = useSyncExternalStore(subscribeVisibility, getVisible, getVisibleServer);
  const animated = !reduced;

  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [inView, setInView] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  /* Przed pierwszym wejściem w widok makieta jest pusta (-1), żeby scena 1
     zagrała od początku, a nie pokazała się już gotowa. */
  const scene = animated && !started ? -1 : index;
  const running = animated && started && inView && tabVisible && !userPaused;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !animated) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.35 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [animated]);

  /* Oś rozdziałów na mobile przewija się poziomo — trzymamy aktywny
     rozdział w kadrze. Przewijamy WYŁĄCZNIE kontener listy (scrollTo),
     nigdy stronę — scrollIntoView potrafiłby szarpnąć całym dokumentem. */
  useEffect(() => {
    const list = listRef.current;
    if (!list || list.scrollWidth <= list.clientWidth + 1) return;
    const item = list.children[index] as HTMLElement | undefined;
    if (!item) return;
    const inset = parseFloat(getComputedStyle(list).paddingLeft) || 0;
    const left =
      list.scrollLeft +
      item.getBoundingClientRect().left -
      list.getBoundingClientRect().left -
      inset;
    list.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
  }, [index, reduced]);

  const go = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
      setStarted(true);
    },
    [count],
  );

  const onProgressEnd = (event: AnimationEvent<HTMLSpanElement>) => {
    if (event.target !== event.currentTarget || !animated) return;
    go(index + 1);
  };

  const onListKey = (event: KeyboardEvent<HTMLOListElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    const buttons = [
      ...(listRef.current?.querySelectorAll<HTMLButtonElement>(".pf-ch__btn") ?? []),
    ];
    const focused = buttons.indexOf(event.target as HTMLButtonElement);
    const from = focused >= 0 ? focused : index;
    let next: number | undefined;
    if (event.key in keys) next = from + keys[event.key];
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    if (next === undefined) return;
    event.preventDefault();
    const target = ((next % count) + count) % count;
    go(target);
    buttons[target]?.focus({ preventScroll: true });
  };

  const togglePause = () => setUserPaused((p) => !p);
  const playing = running || (animated && !userPaused && !started);

  const flags = sceneFlags(scene);

  return (
    <div
      ref={rootRef}
      className="pf"
      data-animated={animated ? "" : undefined}
      data-paused={animated && !running ? "" : undefined}
    >
      {/* ============================================================ scena */}
      <div className="pf-stage">
        <div
          className="pf-browser browser"
          aria-hidden="true"
          data-cursor={animated ? "view" : undefined}
          data-cursor-label={playing ? controls.cursorPause : controls.cursorPlay}
          onClick={animated ? togglePause : undefined}
          {...flags}
        >
          <div className="browser__bar">
            <span className="browser__dots">
              <span />
              <span />
              <span />
            </span>
            <span className="browser__url pf-url">
              <span className="pf-url__lock" />
              <span key={scene} className="pf-url__text">
                {demo.urls[scene] ?? ""}
              </span>
            </span>
            <span className="pf-live">
              <span className="pf-live__dot" />
              live
            </span>
          </div>

          <div className="browser__viewport pf-view">
            {/* ---------------------------------------------- 01 brief */}
            <div className="pf-brief">
              <div className="pf-brief__card">
                <div className="pf-brief__call">
                  <span className="pf-wave">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span key={i} style={{ "--w": i } as CSSProperties} />
                    ))}
                  </span>
                  {demo.brief.call}
                </div>
                <div className="pf-brief__title">{demo.brief.title}</div>
                <ul className="pf-brief__rows">
                  {demo.brief.rows.map(([label, value], i) => (
                    <li key={label} style={{ "--i": i } as CSSProperties}>
                      <span className="pf-brief__label">{label}</span>
                      <span className="pf-brief__value">{value}</span>
                      <span className="pf-check" />
                    </li>
                  ))}
                </ul>
                <div className="pf-brief__stamp">
                  <span className="pf-check pf-check--on" />
                  {demo.brief.stamp}
                </div>
              </div>
            </div>

            {/* ---------------------------------------- 02–07 strona */}
            <div className="pf-site">
              <div className="pf-hmr" />

              <div className="pf-el pf-el--nav" style={{ "--i": 0 } as CSSProperties}>
                <div className="pf-wf pf-wf--nav">
                  <span className="pf-bar pf-bar--logo" />
                  <span className="pf-wf__links">
                    <span className="pf-bar" />
                    <span className="pf-bar" />
                    <span className="pf-bar" />
                  </span>
                </div>
                <div className="pf-ds pf-ds--nav">
                  <span className="pf-brand">
                    <span className="pf-brand__mark" />
                    {demo.brand}
                  </span>
                  <span className="pf-nav__links">
                    {demo.nav.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                    <span className="pf-nav__cta">{demo.navCta}</span>
                  </span>
                </div>
              </div>

              <div className="pf-el pf-el--h1" style={{ "--i": 1 } as CSSProperties}>
                <div className="pf-wf pf-wf--bars">
                  <span className="pf-bar pf-bar--xl" style={{ width: "96%" }} />
                  <span className="pf-bar pf-bar--xl" style={{ width: "82%" }} />
                  <span className="pf-bar pf-bar--xl" style={{ width: "58%" }} />
                </div>
                <div className="pf-ds pf-ds--h1">{demo.heroTitle}</div>
              </div>

              <div className="pf-el pf-el--lead" style={{ "--i": 2 } as CSSProperties}>
                <div className="pf-wf pf-wf--bars">
                  <span className="pf-bar" style={{ width: "92%" }} />
                  <span className="pf-bar" style={{ width: "64%" }} />
                </div>
                <div className="pf-ds pf-ds--lead">{demo.heroLead}</div>
              </div>

              <div className="pf-el pf-el--cta" style={{ "--i": 3 } as CSSProperties}>
                <div className="pf-wf pf-wf--pill" />
                <div className="pf-ds pf-ds--cta">{demo.cta}</div>
              </div>

              <div className="pf-el pf-el--img" style={{ "--i": 2 } as CSSProperties}>
                <div className="pf-wf pf-wf--img" />
                <div className="pf-ds pf-ds--img">
                  <span className="pf-img__tag">{demo.imageTag}</span>
                </div>
              </div>

              {demo.cards.map((card, i) => (
                <div
                  key={card}
                  className="pf-el pf-el--card"
                  style={{ "--i": 4 + i, "--c": i } as CSSProperties}
                >
                  <div className="pf-wf pf-wf--card">
                    <span className="pf-bar" style={{ width: "46%" }} />
                    <span className="pf-bar" style={{ width: "70%" }} />
                  </div>
                  <div className="pf-ds pf-ds--card">
                    <span className="pf-card__dot" />
                    {card}
                  </div>
                </div>
              ))}

              <div className="pf-inspect" />

              {/* Karta stylu — tylko w scenie „Projekt". */}
              <div className="pf-tile">
                <span className="pf-tile__type">Aa</span>
                <span className="pf-tile__swatches">
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            </div>

            {/* ---------------------------------------------- 04 kod */}
            <div className="pf-code">
              <div className="pf-code__tab">{demo.code.file}</div>
              <ol className="pf-code__lines">
                {CODE.map((line, i) => (
                  <li key={i} style={{ "--i": i } as CSSProperties}>
                    <span className="pf-code__text">
                      {line.map(([text, kind], j) => (
                        <span key={j} className={kind ? `pf-tk-${kind}` : undefined}>
                          {text}
                        </span>
                      ))}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <span className="pf-preview-tag">{demo.code.preview}</span>

            {/* ------------------------------------------ 05 PageSpeed */}
            <div className="pf-speed">
              <svg className="pf-speed__ring" viewBox="0 0 36 36">
                <circle className="pf-speed__track" cx="18" cy="18" r="15.915" />
                <circle className="pf-speed__arc" cx="18" cy="18" r="15.915" />
              </svg>
              <span className="pf-speed__num" />
              <span className="pf-speed__label">{demo.speed.label}</span>
              <span className="pf-speed__note">{demo.speed.note}</span>
            </div>
            <div className="pf-sweep" />

            {/* ---------------------------------------------- 06 czat */}
            <div className="pf-chat">
              <div className="pf-chat__head">
                <span className="pf-chat__avatar" />
                <span className="pf-chat__who">
                  {demo.chat.name}
                  <span className="pf-chat__status">{demo.chat.status}</span>
                </span>
              </div>
              <div className="pf-chat__body">
                <div className="pf-msg pf-msg--user">{demo.chat.question}</div>
                {/* Wskaźnik „pisze…" i odpowiedź dzielą jedną komórkę siatki —
                    odpowiedź zajmuje miejsce kropek, bez skoku układu. */}
                <div className="pf-chat__reply">
                  <div className="pf-msg pf-msg--typing">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="pf-msg pf-msg--bot">{demo.chat.answer}</div>
                </div>
                <div className="pf-chat__chip">{demo.chat.chip}</div>
              </div>
              <div className="pf-chat__input">{demo.chat.input}</div>
            </div>

            {/* ---------------------------------------- 07 automatyzacja */}
            <div className="pf-flow">
              <div className="pf-flow__label">{demo.flow.label}</div>
              <div className="pf-flow__row">
                {demo.flow.nodes.map(([title, sub], i) => (
                  <div key={title} className="pf-flow__cell" style={{ "--i": i } as CSSProperties}>
                    {i > 0 && (
                      <span className="pf-link">
                        <span className="pf-link__fill" />
                      </span>
                    )}
                    <div className="pf-node">
                      <span className="pf-node__icon">{pad(i + 1)}</span>
                      <span className="pf-node__title">{title}</span>
                      <span className="pf-node__sub">{sub}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pf-toast">
                <span className="pf-toast__icon" />
                <span>
                  <span className="pf-toast__title">{demo.flow.toastTitle}</span>
                  <span className="pf-toast__body">{demo.flow.toastBody}</span>
                </span>
              </div>
            </div>

            {/* ---------------------------------------------- 08 Google */}
            <div className="pf-serp">
              <div className="pf-serp__search">
                <span className="pf-serp__glass" />
                <span className="pf-serp__query">{demo.serp.query}</span>
              </div>
              <span className="pf-serp__note">{demo.serp.note}</span>
              <div className="pf-serp__results">
                <div className="pf-res pf-res--ours">
                  <span className="pf-res__domain">
                    <span className="pf-res__fav" />
                    {demo.serp.domain}
                  </span>
                  <span className="pf-res__title">{demo.serp.title}</span>
                  <span className="pf-res__desc">{demo.serp.desc}</span>
                </div>
                {[1, 2, 3, 4].map((pos) => (
                  <div
                    key={pos}
                    className={`pf-res pf-res--ghost${pos >= 3 ? " pf-res--early" : ""}`}
                    style={{ "--pos": pos } as CSSProperties}
                  >
                    <span className="pf-bar" style={{ width: "24%" }} />
                    <span className="pf-bar pf-bar--title" style={{ width: `${70 - pos * 6}%` }} />
                    <span className="pf-bar" style={{ width: "88%" }} />
                  </div>
                ))}
              </div>
              <div className="pf-panel">
                <div className="pf-panel__map" />
                <span className="pf-panel__title">{demo.brand}</span>
                <span className="pf-panel__type">{demo.serp.panelType}</span>
                <span className="pf-panel__hours">{demo.serp.panelHours}</span>
                <span className="pf-panel__actions">
                  {demo.serp.panelActions.map((action) => (
                    <span key={action}>{action}</span>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================= rozdziały */}
      <div className="pf-side">
        <div className="pf-controls">
          <span className="pf-counter tabular">
            {controls.chapter}{" "}
            <span className="pf-counter__now">{pad(index + 1)}</span>
            <span className="pf-counter__all"> / {pad(count)}</span>
          </span>
          {animated && (
            <button
              type="button"
              className="pf-toggle"
              onClick={togglePause}
              aria-pressed={userPaused}
              aria-label={userPaused ? controls.play : controls.pause}
            >
              <span className={userPaused ? "pf-icon-play" : "pf-icon-pause"} aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Numeracja uzasadniona — to faktyczna kolejność etapów. */}
        <ol ref={listRef} className="pf-chapters" onKeyDown={onListKey}>
          {chapters.map((chapter, i) => {
            const active = i === index;
            return (
              <li
                key={chapter.title}
                className="pf-ch"
                data-active={active ? "" : undefined}
                style={{ "--dur": `${DURATIONS[i] ?? 5500}ms` } as CSSProperties}
              >
                <span className="pf-ch__num tabular" aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <h3 className="pf-ch__title">
                  <button
                    type="button"
                    className="pf-ch__btn"
                    aria-current={active ? "step" : undefined}
                    onClick={() => go(i)}
                  >
                    {chapter.title}
                  </button>
                </h3>
                <div className="pf-ch__body">
                  <p>{chapter.body}</p>
                </div>
                <span className="pf-ch__track" aria-hidden="true">
                  {active && animated && started && (
                    <span className="pf-ch__fill" onAnimationEnd={onProgressEnd} />
                  )}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

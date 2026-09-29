"use client";

/**
 * Makieta „strony budują się same — i są responsywne".
 *
 * W pętli powstaje kolejno pięć różnych projektów (domki na wynajem,
 * sklep, panel sklepu, strona firmowa, kawiarnia). Każdy przechodzi tę samą
 * drogę: siatka → bloki → teksty → kolor i marka → zdjęcia i detale →
 * okno zwęża się (desktop → tablet → telefon) i wraca → strona żyje
 * (kursor klika, stan się zmienia, potwierdzenie) → pauza → następny.
 * W DOM-ie jest zawsze tylko jeden projekt.
 *
 * Responsywność jest prawdziwa: okno animuje szerokość, a strona w środku
 * przelewa się przez container queries (progi w em = `--pf-u`).
 * Wskaźnik szerokości liczy ResizeObserver i pisze wprost do DOM-u.
 *
 * Nagłówek, lead i CTA sekcji renderuje Server Component (page.tsx);
 * cała makieta jest dekoracją (aria-hidden).
 *
 * Zegar: niewidoczny element z animacją CSS o długości bieżącej fazy;
 * `animationend` przełącza fazę. Pauza (przycisk, klik w makietę, sekcja
 * poza widokiem, ukryta karta) to jedno `animation-play-state: paused`.
 * Bez JS i przy reduced-motion widać gotowy pierwszy projekt (HOLD).
 */

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type AnimationEvent,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";

import type { Dictionary } from "@/content/dictionary";

import "./process-film.css";

type ProcessCopy = Dictionary["home"]["process"];
type Demo = ProcessCopy["demo"];

const PROJECTS = ["cabins", "shop", "admin", "company", "cafe"] as const;
type ProjectKey = (typeof PROJECTS)[number];

/* Fazy jednego projektu (ms). Indeksy odpowiadają `demo.status`. */
const PHASES = [
  1000, // 0 siatka
  1200, // 1 bloki
  2300, // 2 teksty
  1800, // 3 kolor i marka
  2000, // 4 zdjęcia i detale
  2800, // 5 tablet
  4200, // 6 telefon
  1800, // 7 powrót na desktop
  4200, // 8 strona żyje
  1600, // 9 pauza na gotowej stronie
  900, //  10 wygaszenie → następny projekt
];
const LIVE = 8;
const HOLD = 9;
const LAST = PHASES.length - 1;

/* Szerokość „prawdziwego" ekranu dla wskaźnika. */
const DESKTOP_PX = 1440;

/* --- zewnętrzne źródła stanu -------------------------------------------- */

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getReduced = () => window.matchMedia(REDUCED_QUERY).matches;
/* Serwer renderuje gotową stronę (jak przy reduced-motion). */
const getReducedServer = () => true;

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}
const getVisible = () => document.visibilityState === "visible";
const getVisibleServer = () => true;

/* --- flagi --------------------------------------------------------------- */

function phaseFlags(p: number) {
  const on = (v: boolean) => (v ? "" : undefined);
  return {
    "data-grid": on(p >= 0 && p <= 2),
    "data-blocks": on(p >= 1),
    "data-type": on(p >= 2),
    "data-color": on(p >= 3),
    "data-media": on(p >= 4),
    "data-bp": p === 5 ? "tablet" : p === 6 ? "phone" : "desktop",
    "data-resize": on(p >= 5 && p <= 7),
    "data-live": on(p >= LIVE),
    "data-reset": on(p === LAST),
  };
}

/* --- drobne elementy ----------------------------------------------------- */

const css = (vars: Record<string, string | number>) => vars as CSSProperties;

/** Tekst: najpierw szary prostokąt, potem się „wpisuje". */
function T({ t, className, children }: { t: number; className?: string; children: ReactNode }) {
  return (
    <span className={className ? `pf-t ${className}` : "pf-t"} style={css({ "--t": t })}>
      <span className="pf-t__x">{children}</span>
    </span>
  );
}

/** Blok: najpierw szary prostokąt, który „wskakuje" w fazie bloków. */
function B({
  b,
  className,
  children,
  style,
  hit,
}: {
  b: number;
  className: string;
  children?: ReactNode;
  style?: CSSProperties;
  hit?: string;
}) {
  return (
    <div className={`pf-blk ${className}`} style={{ ...css({ "--b": b }), ...style }} data-hit={hit}>
      {children}
    </div>
  );
}

function Media({ art, className, children }: { art: string; className?: string; children?: ReactNode }) {
  return (
    <div className={className ? `pf-media ${className}` : "pf-media"}>
      <div className="pf-media__img">
        <div className={`pf-art pf-art--${art}`}>{children}</div>
      </div>
    </div>
  );
}

function Nav({
  brand,
  links,
  right,
}: {
  brand: string;
  links: readonly string[];
  right?: ReactNode;
}) {
  return (
    <B b={0} className="pf-nav">
      <span className="pf-logo">
        <span className="pf-logo__mark" />
        <T t={0}>{brand}</T>
      </span>
      <span className="pf-nav__links">
        {links.map((item, i) => (
          <T key={item} t={1 + i}>
            {item}
          </T>
        ))}
      </span>
      {right}
      <span className="pf-burger">
        <span />
        <span />
        <span />
      </span>
    </B>
  );
}

const Icon = {
  sauna: (
    <svg viewBox="0 0 24 24">
      <path d="M4 20h16M6 20V9l6-5 6 5v11M9 13c1-1 1-2 0-3M12 13c1-1 1-2 0-3M15 13c1-1 1-2 0-3" />
    </svg>
  ),
  fire: (
    <svg viewBox="0 0 24 24">
      <path d="M12 3c3 4 6 6 6 10a6 6 0 0 1-12 0c0-2 1-4 3-5 0 2 1 3 2 3 0-3-1-5 1-8Z" />
    </svg>
  ),
  wifi: (
    <svg viewBox="0 0 24 24">
      <path d="M3.5 9.5a12 12 0 0 1 17 0M6.5 12.5a8 8 0 0 1 11 0M9.5 15.5a4 4 0 0 1 5 0M12 19h.01" />
    </svg>
  ),
  grill: (
    <svg viewBox="0 0 24 24">
      <path d="M4 10h16a8 8 0 0 1-16 0ZM8 18l-2 3M16 18l2 3M9 6c1-1 1-2 0-3M12 6c1-1 1-2 0-3M15 6c1-1 1-2 0-3" />
    </svg>
  ),
  kitchen: (
    <svg viewBox="0 0 24 24">
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <circle cx="9" cy="12" r="2.4" />
      <circle cx="15.5" cy="12" r="2.4" />
    </svg>
  ),
  wardrobe: (
    <svg viewBox="0 0 24 24">
      <rect x="5" y="3.5" width="14" height="17" rx="1.6" />
      <path d="M12 3.5v17M10 11v2M14 11v2" />
    </svg>
  ),
  drop: (
    <svg viewBox="0 0 24 24">
      <path d="M12 3.8c3.4 4.3 5.6 7.4 5.6 10.1a5.6 5.6 0 0 1-11.2 0c0-2.7 2.2-5.8 5.6-10.1Z" />
    </svg>
  ),
  bag: (
    <svg viewBox="0 0 24 24">
      <path d="M5 8h14l-1 12H6L5 8ZM9 8a3 3 0 0 1 6 0" />
    </svg>
  ),
};

/* ========================================================================
   Projekty
   ======================================================================== */

/* Październik 2026 zaczyna się w czwartek; weekendy zajęte. */
const OCT_OFFSET = 3;
const BOOKED = new Set([3, 4, 10, 11, 17, 18, 24, 25, 31]);

function Cabins({ c }: { c: Demo["cabins"] }) {
  const amenityIcons = [Icon.sauna, Icon.fire, Icon.wifi, Icon.grill];
  return (
    <>
      <Nav
        brand={c.brand}
        links={c.nav}
        right={
          <span className="pf-btn pf-btn--ghost pf-nav__cta">
            <T t={4}>{c.cta}</T>
          </span>
        }
      />
      <section className="pf-cb-hero">
        <B b={1} className="pf-cb-text">
          <T t={5} className="pf-eyebrow">
            {c.eyebrow}
          </T>
          <div className="pf-h1">
            {c.title.map((line, i) => (
              <T key={line} t={6 + i} className={i === c.title.length - 1 ? "pf-accent" : undefined}>
                {line}
              </T>
            ))}
          </div>
          <T t={9} className="pf-lead">
            {c.lead}
          </T>
          <T t={10} className="pf-cb-price">
            {c.price}
          </T>
        </B>
        <B b={2} className="pf-cb-gallery">
          <Media art="cabin" className="pf-cb-main">
            <span className="pf-forest" />
            <span className="pf-cabin" />
            <span className="pf-cabin__window" />
          </Media>
          <Media art="interior" className="pf-cb-thumb" />
          <Media art="sauna" className="pf-cb-thumb" />
        </B>
      </section>

      <section className="pf-cb-lower">
        <B b={3} className="pf-cb-amen">
          <T t={11} className="pf-kicker">
            {c.amenitiesTitle}
          </T>
          <div className="pf-cb-amen__grid">
            {c.amenities.map((item, i) => (
              <span key={item} className="pf-cb-amen__item" style={css({ "--k": i })}>
                <span className="pf-icon">{amenityIcons[i]}</span>
                <T t={12 + i}>{item}</T>
              </span>
            ))}
          </div>
        </B>
        <B b={4} className="pf-cb-cal">
          <div className="pf-cb-cal__head">
            <T t={16}>{c.month}</T>
            <span className="pf-cb-cal__nav">
              <span />
              <span />
            </span>
          </div>
          <div className="pf-cb-cal__grid">
            {c.weekdays.map((d) => (
              <span key={d} className="pf-cb-wd">
                {d}
              </span>
            ))}
            {Array.from({ length: OCT_OFFSET }, (_, i) => (
              <span key={`e${i}`} />
            ))}
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              let cls = "pf-cb-day";
              let hit: string | undefined;
              if (BOOKED.has(day)) cls += " is-booked";
              if (day === 12) {
                cls += " is-start";
                hit = "1";
              }
              if (day === 13) cls += " is-range";
              if (day === 14) {
                cls += " is-end";
                hit = "2";
              }
              return (
                <span key={day} className={cls} data-hit={hit} style={css({ "--d": i })}>
                  {day}
                </span>
              );
            })}
          </div>
          <span className="pf-btn pf-btn--primary pf-cb-book" data-hit="3">
            <T t={17}>{c.book}</T>
          </span>
        </B>
      </section>
    </>
  );
}

function Shop({ s }: { s: Demo["shop"] }) {
  return (
    <>
      <Nav
        brand={s.brand}
        links={s.nav}
        right={
          <span className="pf-sh-cart" data-hit="3">
            {Icon.bag}
            <span className="pf-sh-badge">
              <span className="pf-sh-badge__n1">1</span>
              <span className="pf-sh-badge__n2">2</span>
            </span>
          </span>
        }
      />
      <section className="pf-sh-hero">
        <B b={1} className="pf-sh-hero__text">
          <div className="pf-h1">
            {s.title.map((line, i) => (
              <T key={line} t={5 + i} className={i === s.title.length - 1 ? "pf-accent" : undefined}>
                {line}
              </T>
            ))}
          </div>
          <T t={7} className="pf-lead">
            {s.lead}
          </T>
          <span className="pf-btn pf-btn--primary">
            <T t={8}>{s.cta}</T>
            <span className="pf-arrow" />
          </span>
        </B>
        <B b={2} className="pf-sh-hero__img">
          <Media art="vase">
            <span className="pf-obj pf-obj--vase" />
          </Media>
        </B>
      </section>
      <section className="pf-sh-grid">
        {s.products.map(([name, price], i) => (
          <B key={name} b={3 + i} className="pf-sh-card" style={css({ "--k": i })}>
            <Media art={`p${i}`} className="pf-sh-card__img">
              <span className={`pf-obj pf-obj--p${i}`} />
            </Media>
            <div className="pf-sh-card__row">
              <T t={9 + i * 2}>{name}</T>
              <T t={10 + i * 2} className="pf-sh-price">
                {price}
              </T>
            </div>
            <span
              className={`pf-btn pf-btn--ghost pf-sh-add${i === 1 || i === 2 ? ` pf-sh-add--${i}` : ""}`}
              data-hit={i === 1 ? "1" : i === 2 ? "2" : undefined}
            >
              <T t={17}>{s.add}</T>
              <span className="pf-sh-add__done">{s.added}</span>
            </span>
          </B>
        ))}
      </section>
    </>
  );
}

function Admin({ a }: { a: Demo["admin"] }) {
  const bars = [38, 52, 44, 70, 58, 86, 74];
  return (
    <div className="pf-ad">
      <B b={0} className="pf-ad-side">
        <span className="pf-logo">
          <span className="pf-logo__mark" />
          <T t={0}>{a.brand}</T>
        </span>
        <span className="pf-ad-menu">
          {a.menu.map((item, i) => (
            <span key={item} className={i === 0 ? "pf-ad-item is-active" : "pf-ad-item"}>
              <span className="pf-ad-item__ico" />
              <T t={1 + i}>{item}</T>
            </span>
          ))}
        </span>
      </B>

      <div className="pf-ad-main">
        <B b={1} className="pf-ad-top">
          <span className="pf-burger">
            <span />
            <span />
            <span />
          </span>
          <T t={5} className="pf-ad-title">
            {a.heading}
          </T>
          <span className="pf-ad-sample pf-fade" style={css({ "--t": 6 })}>
            {a.sample}
          </span>
          <span className="pf-btn pf-btn--primary pf-ad-add">
            <T t={6}>{`+ ${a.add}`}</T>
          </span>
        </B>

        <div className="pf-ad-kpis">
          {a.kpis.map(([label, value], i) => (
            <B key={label} b={2 + i} className="pf-ad-kpi">
              <T t={7 + i} className="pf-ad-kpi__l">
                {label}
              </T>
              <T t={8 + i} className="pf-ad-kpi__v">
                {value}
              </T>
            </B>
          ))}
          <B b={5} className="pf-ad-chart">
            <T t={10} className="pf-ad-kpi__l">
              {a.chart}
            </T>
            <span className="pf-ad-bars">
              {bars.map((h, i) => (
                <span key={i} style={css({ "--h": `${h}%`, "--k": i })} />
              ))}
            </span>
          </B>
        </div>

        <B b={6} className="pf-ad-table">
          <div className="pf-ad-row pf-ad-row--head">
            {a.cols.map((col, i) => (
              <span key={col} className="pf-fade" style={css({ "--t": 11 + i * 0.5 })}>
                {col}
              </span>
            ))}
          </div>
          {a.rows.map(([name, price, stock], i) => (
            <div key={name} className="pf-ad-row">
              <span className="pf-ad-prod">
                <span className={`pf-ad-thumb pf-art--p${i}`} />
                <T t={12 + i}>{name}</T>
              </span>
              {i === 1 ? (
                <span className="pf-ad-price pf-ad-price--edit" data-hit="1">
                  <span className="pf-ad-old">{price}</span>
                  <span className="pf-ad-new">{a.newPrice}</span>
                  <span className="pf-ad-save" data-hit="2">
                    {a.save}
                  </span>
                </span>
              ) : (
                <span className="pf-ad-price pf-fade" style={css({ "--t": 12 + i })}>
                  {price}
                </span>
              )}
              <span className="pf-ad-stock pf-fade" style={css({ "--t": 12 + i })}>
                {stock}
              </span>
              <span className="pf-ad-status pf-fade" style={css({ "--t": 12 + i })}>
                {a.active}
              </span>
            </div>
          ))}
        </B>

        <B b={7} className="pf-ad-orders">
          <T t={16} className="pf-kicker">
            {a.ordersTitle}
          </T>
          <span className="pf-ad-orders__list">
            {a.orders.map(([no, who, sum], i) => (
              <span key={no} className="pf-ad-order pf-fade" style={css({ "--t": 16 + i * 0.5 })}>
                <span className="pf-ad-order__no tabular">{no}</span>
                <span className="pf-ad-order__who">{who}</span>
                <span className="pf-ad-order__sum tabular">{sum}</span>
                <span className="pf-ad-status">{a.orderNew}</span>
              </span>
            ))}
          </span>
        </B>
      </div>

      <div className="pf-ad-preview" data-hit="3">
        <span className="pf-ad-preview__label">{a.preview}</span>
        <span className="pf-ad-preview__body">
          <span className="pf-ad-thumb pf-art--p1" />
          <span>
            <span className="pf-ad-preview__name">{a.rows[1][0]}</span>
            <span className="pf-ad-preview__price">
              <s>{a.rows[1][1]}</s> {a.newPrice}
            </span>
          </span>
        </span>
      </div>
    </div>
  );
}

function Company({ c }: { c: Demo["company"] }) {
  const icons = [Icon.kitchen, Icon.wardrobe, Icon.drop];
  return (
    <>
      <Nav
        brand={c.brand}
        links={c.nav}
        right={
          <span className="pf-btn pf-btn--ghost pf-nav__cta">
            <T t={4}>{c.navCta}</T>
          </span>
        }
      />
      <section className="pf-hero">
        <B b={1} className="pf-hero__text">
          <T t={5} className="pf-eyebrow">
            {c.eyebrow}
          </T>
          <div className="pf-h1">
            {c.title.map((line, i) => (
              <T key={line} t={6 + i} className={i === c.title.length - 1 ? "pf-accent" : undefined}>
                {line}
              </T>
            ))}
          </div>
          <T t={9} className="pf-lead">
            {c.lead}
          </T>
          <div className="pf-actions">
            <span className="pf-btn pf-btn--primary pf-co-cta" data-hit="1">
              <T t={10}>{c.cta}</T>
              <span className="pf-arrow" />
            </span>
            <span className="pf-btn pf-btn--ghost">
              <T t={11}>{c.ctaSecondary}</T>
            </span>
          </div>
        </B>
        <B b={2} className="pf-hero__media">
          <Media art="kitchen">
            <span className="pf-art__window" />
            <span className="pf-art__cabinets" />
            <span className="pf-art__lamp" />
            <span className="pf-art__lamp pf-art__lamp--2" />
            <span className="pf-art__counter" />
          </Media>
          <span className="pf-media__tag">{c.imageTag}</span>
        </B>
      </section>
      <section className="pf-cards">
        {c.cards.map(([title, sub], i) => (
          <B key={title} b={3 + i} className="pf-card" style={css({ "--k": i })}>
            <span className="pf-icon">{icons[i]}</span>
            <T t={12 + i * 2} className="pf-card__title">
              {title}
            </T>
            <T t={13 + i * 2} className="pf-card__sub">
              {sub}
            </T>
          </B>
        ))}
      </section>
      <B b={6} className="pf-quote">
        <span className="pf-avatar" />
        <span className="pf-quote__body">
          <T t={18} className="pf-quote__text">
            {c.quote}
          </T>
          <T t={19} className="pf-quote__author">
            {c.quoteAuthor}
          </T>
        </span>
      </B>
      <B b={7} className="pf-foot">
        <T t={20}>{c.brand}</T>
        <T t={21}>{c.email}</T>
      </B>
    </>
  );
}

function Cafe({ c }: { c: Demo["cafe"] }) {
  return (
    <>
      <Nav brand={c.brand} links={c.nav} />
      <section className="pf-cf-hero">
        <B b={1} className="pf-cf-band">
          <Media art="coffee">
            <span className="pf-cup" />
          </Media>
          <div className="pf-cf-text">
            <div className="pf-h1">
              {c.title.map((line, i) => (
                <T key={line} t={4 + i} className={i === c.title.length - 1 ? "pf-accent" : undefined}>
                  {line}
                </T>
              ))}
            </div>
            <T t={6} className="pf-lead">
              {c.lead}
            </T>
          </div>
        </B>
        <B b={2} className="pf-cf-form">
          <T t={7} className="pf-cf-form__title">
            {c.formTitle}
          </T>
          <span className="pf-cf-chips">
            {c.people.map((p, i) => (
              <span
                key={p}
                className={`pf-chip pf-fade${i === 1 ? " pf-chip--pick1" : ""}`}
                style={css({ "--t": 8 + i * 0.4 })}
                data-hit={i === 1 ? "1" : undefined}
              >
                {p}
              </span>
            ))}
          </span>
          <span className="pf-cf-chips">
            {c.times.map((p, i) => (
              <span
                key={p}
                className={`pf-chip pf-fade${i === 1 ? " pf-chip--pick2" : ""}`}
                style={css({ "--t": 9 + i * 0.4 })}
                data-hit={i === 1 ? "2" : undefined}
              >
                {p}
              </span>
            ))}
          </span>
          <span className="pf-btn pf-btn--primary pf-cf-book" data-hit="3">
            <T t={10}>{c.book}</T>
          </span>
        </B>
      </section>
      <B b={3} className="pf-cf-menu">
        <T t={11} className="pf-kicker">
          {c.menuTitle}
        </T>
        <span className="pf-cf-list">
          {c.menu.map(([name, price], i) => (
            <span key={name} className="pf-cf-item">
              <T t={12 + i}>{name}</T>
              <span className="pf-cf-dots" />
              <T t={12 + i}>{price}</T>
            </span>
          ))}
        </span>
      </B>
    </>
  );
}

function Screen({
  project,
  demo,
  screenRef,
  cursorRef,
}: {
  project: ProjectKey;
  demo: Demo;
  screenRef: RefObject<HTMLDivElement | null>;
  cursorRef: RefObject<HTMLSpanElement | null>;
}) {
  const content = demo[project];
  let body: ReactNode;
  switch (project) {
    case "cabins":
      body = <Cabins c={demo.cabins} />;
      break;
    case "shop":
      body = <Shop s={demo.shop} />;
      break;
    case "admin":
      body = <Admin a={demo.admin} />;
      break;
    case "company":
      body = <Company c={demo.company} />;
      break;
    default:
      body = <Cafe c={demo.cafe} />;
  }

  return (
    <div ref={screenRef} className={`pf-screen pf-proj pf-proj--${project}`}>
      <div className="pf-flood" />
      <div className="pf-page">
        <div className="pf-cols">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} style={css({ "--c": i })} />
          ))}
        </div>
        {body}
      </div>

      <div className="pf-toast">
        <span className="pf-toast__icon" />
        <span>
          <span className="pf-toast__title">{content.toastTitle}</span>
          <span className="pf-toast__body">{content.toastBody}</span>
        </span>
      </div>

      <span ref={cursorRef} className="pf-cursor">
        <svg viewBox="0 0 16 20">
          <path d="M1.5 1.5v15.2l4.1-3.9 2.7 5.9 2.6-1.2-2.7-5.8h5.6Z" />
        </svg>
        <span className="pf-cursor__ring" />
      </span>
    </div>
  );
}

/* ========================================================================
   Komponent
   ======================================================================== */

/** Pozycja środka elementu względem przodka — w układzie, bez transformacji
    (makieta jest przechylona w 3D, więc getBoundingClientRect by kłamał). */
function centerIn(el: HTMLElement, root: HTMLElement) {
  let x = el.offsetWidth / 2;
  let y = el.offsetHeight / 2;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

export function ProcessFilm({ copy }: { copy: Pick<ProcessCopy, "controls" | "demo"> }) {
  const { controls, demo } = copy;

  const reduced = useSyncExternalStore(subscribeReduced, getReduced, getReducedServer);
  const tabVisible = useSyncExternalStore(subscribeVisibility, getVisible, getVisibleServer);
  const animated = !reduced;

  const [step, setStep] = useState({ project: 0, phase: 0 });
  const [started, setStarted] = useState(false);
  const [inView, setInView] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef<HTMLSpanElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  /* Bez ruchu: gotowy pierwszy projekt. Z ruchem, przed wejściem w widok:
     pusty ekran, żeby budowa zaczęła się od zera na oczach widza. */
  const scene = !animated ? HOLD : started ? step.phase : -1;
  const project = PROJECTS[animated ? step.project : 0];
  const running = animated && started && inView && tabVisible && !userPaused;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !animated) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [animated]);

  /* Wskaźnik szerokości okna: szerokość okna względem pełnej szerokości
     sceny, przeliczona na piksele ekranu 1440 px. */
  useEffect(() => {
    const browser = browserRef.current;
    const label = widthRef.current;
    const frame = browser?.parentElement;
    if (!browser || !label || !frame) return;
    const ro = new ResizeObserver(() => {
      const ratio = browser.offsetWidth / frame.clientWidth;
      label.textContent = `${Math.round((DESKTOP_PX * ratio) / 2) * 2} px`;
    });
    ro.observe(browser);
    ro.observe(frame);
    return () => ro.disconnect();
  }, []);

  /* Trasa kursora w fazie „strona żyje": środki elementów data-hit="1..3"
     mierzone na gotowym układzie desktopowym i podane do CSS jako zmienne. */
  useLayoutEffect(() => {
    if (scene !== LIVE) return;
    const screen = screenRef.current;
    const cursor = cursorRef.current;
    if (!screen || !cursor) return;
    let last = { x: screen.offsetWidth * 0.9, y: screen.offsetHeight * 1.08 };
    cursor.style.setProperty("--x0", `${last.x}px`);
    cursor.style.setProperty("--y0", `${last.y}px`);
    for (const n of [1, 2, 3]) {
      const el = screen.querySelector<HTMLElement>(`[data-hit="${n}"]`);
      if (el) last = centerIn(el, screen);
      cursor.style.setProperty(`--x${n}`, `${last.x}px`);
      cursor.style.setProperty(`--y${n}`, `${last.y}px`);
    }
  }, [scene, project]);

  const onClockEnd = (event: AnimationEvent<HTMLSpanElement>) => {
    if (event.target !== event.currentTarget || !animated) return;
    setStep((s) =>
      s.phase === LAST
        ? { project: (s.project + 1) % PROJECTS.length, phase: 0 }
        : { project: s.project, phase: s.phase + 1 },
    );
  };

  const togglePause = () => setUserPaused((p) => !p);
  const showPlaying = animated && !userPaused;
  const live = scene >= LIVE;
  const status = demo.status[scene] ?? "";

  return (
    <div
      ref={rootRef}
      className="pf"
      data-animated={animated ? "" : undefined}
      data-paused={animated && !running ? "" : undefined}
      {...phaseFlags(scene)}
    >
      {animated && started && (
        <span
          key={`${step.project}-${step.phase}`}
          className="pf-clock"
          style={css({ "--dur": `${PHASES[step.phase]}ms` })}
          onAnimationEnd={onClockEnd}
          aria-hidden="true"
        />
      )}

      <div
        className="pf-stage"
        aria-hidden="true"
        data-cursor={animated ? "view" : undefined}
        data-cursor-label={showPlaying ? controls.cursorPause : controls.cursorPlay}
        onClick={animated ? togglePause : undefined}
      >
        <div className="pf-scene">
          <div ref={browserRef} className="pf-browser browser">
            <span className="pf-width">
              <span className="pf-width__line" />
              <span ref={widthRef} className="pf-width__label tabular">
                {DESKTOP_PX} px
              </span>
              <span className="pf-width__line" />
            </span>

            <div className="browser__bar">
              <span className="browser__dots">
                <span />
                <span />
                <span />
              </span>
              <span className="browser__url pf-url">
                <span className="pf-url__lock" />
                <span key={project} className="pf-url__text">
                  {demo[project].domain}
                </span>
              </span>
              <span className="pf-status" data-on={live ? "" : undefined}>
                <span className="pf-status__dot" />
                <span key={scene} className="pf-status__text">
                  {status}
                </span>
              </span>
            </div>

            <div className="pf-view">
              <Screen
                key={project}
                project={project}
                demo={demo}
                screenRef={screenRef}
                cursorRef={cursorRef}
              />
            </div>
          </div>
        </div>
      </div>

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
  );
}

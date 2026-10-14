/**
 * Żywe sceny na kartach obszarów usług (strona główna) — Server Component,
 * zero JS. Każda pokazuje w pętli to, co klient dostaje w danym obszarze:
 * strona, która sprzedaje; automatyzacja, która sama przenosi dane; firma,
 * która wspina się w wynikach Google; strona pod stałym nadzorem.
 *
 * Wyłącznie CSS (transform/opacity w pętlach). Poza ekranem sceny się nie
 * rysują (`content-visibility: auto`). Stan bazowy bez animacji to gotowa
 * scena, więc przy reduced-motion widać ją nieruchomą. Całość aria-hidden.
 */

import type { CSSProperties, ReactNode } from "react";

import type { Dictionary } from "@/content/dictionary";
import type { ServiceCategorySlug } from "@/lib/cms";

import "./service-scenes.css";

type Scenes = Dictionary["home"]["services"]["scenes"];

const css = (vars: Record<string, string | number>) => vars as CSSProperties;

const CHECK = "M5 12.5l4.2 4.2L19 7";

function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d={d} />
    </svg>
  );
}

/* --- Strony i sklepy: strona składa się, klient klika, wpada zamówienie -- */

function WebScene({ s }: { s: Scenes["web"] }) {
  return (
    <div className="sc-web">
      <div className="sc-web__browser">
        <div className="sc-web__bar">
          <i />
          <i />
          <i />
          <span />
        </div>
        <div className="sc-web__page">
          <span className="sc-web__piece sc-web__h" style={css({ "--i": 0 })} />
          <span className="sc-web__piece sc-web__p" style={css({ "--i": 1 })} />
          <span className="sc-web__piece sc-web__btn" style={css({ "--i": 2 })} />
          <span className="sc-web__grid">
            {[3, 4, 5].map((i) => (
              <span key={i} className="sc-web__piece sc-web__card" style={css({ "--i": i })} />
            ))}
          </span>
        </div>
        <svg className="sc-web__cursor" viewBox="0 0 16 20">
          <path d="M1.5 1.5v15.2l4.1-3.9 2.7 5.9 2.6-1.2-2.7-5.8h5.6Z" />
        </svg>
      </div>

      <div className="sc-web__toast">
        <span className="sc-check">
          <Icon d={CHECK} />
        </span>
        <span className="sc-web__toast-text">
          <b>{s.toast}</b>
          <small>{s.amount}</small>
        </span>
      </div>
    </div>
  );
}

/* --- AI i automatyzacje: dane same płyną z poczty przez AI do CRM ------- */

const MAIL = "M3.5 6.5h17v11h-17zM3.5 7l8.5 6.5L20.5 7";
const SPARK =
  "M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9zM18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z";
const TABLE = "M3.5 5h17v14h-17zM3.5 10h17M3.5 14.5h17M9.5 10v9";

function AiNode({ d, label, hub }: { d: string; label: string; hub?: boolean }) {
  return (
    <span className={`sc-ai__node${hub ? " sc-ai__node--hub" : ""}`}>
      <span className="sc-ai__icon">
        <Icon d={d} />
      </span>
      <span className="sc-ai__label">{label}</span>
    </span>
  );
}

function AiScene({ s }: { s: Scenes["ai"] }) {
  /* Pierwszy wpis powtórzony na końcu — taśma wraca do zera bez skoku. */
  const log = [...s.log, s.log[0]];
  return (
    <div className="sc-ai">
      <div className="sc-ai__flow">
        <AiNode d={MAIL} label={s.from} />
        <span className="sc-ai__wire" style={css({ "--w": 0 })}>
          <i />
        </span>
        <AiNode d={SPARK} label={s.mid} hub />
        <span className="sc-ai__wire" style={css({ "--w": 1 })}>
          <i />
        </span>
        <AiNode d={TABLE} label={s.to} />
      </div>

      <div className="sc-ai__log">
        <span className="sc-ai__tape">
          {log.map((line, i) => (
            <span key={i} className="sc-ai__line">
              <span className="sc-check">
                <Icon d={CHECK} />
              </span>
              {line}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

/* --- Marketing i widoczność: pinezka na mapie, awans na pierwsze miejsce -- */

const PIN =
  "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21zM12 12.2a2.2 2.2 0 1 0 0-4.4a2.2 2.2 0 1 0 0 4.4z";
const SEARCH = "M10.5 17a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13zM15.5 15.5L20 20";

function SeoScene({ s }: { s: Scenes["seo"] }) {
  return (
    <div className="sc-seo">
      <div className="sc-seo__map">
        <span className="sc-seo__ring" style={css({ "--r": 0 })} />
        <span className="sc-seo__ring" style={css({ "--r": 1 })} />
        <span className="sc-seo__pin">
          <Icon d={PIN} />
        </span>
      </div>

      <div className="sc-seo__serp">
        <span className="sc-seo__search">
          <Icon d={SEARCH} />
          <span className="sc-seo__query">{s.query}</span>
        </span>
        <span className="sc-seo__results">
          <span className="sc-seo__row sc-seo__row--a">
            <i />
            <i />
          </span>
          <span className="sc-seo__row sc-seo__row--b">
            <i />
            <i />
          </span>
          <span className="sc-seo__row sc-seo__row--you">
            <b>{s.you}</b>
            <span className="sc-seo__rank">#1</span>
          </span>
        </span>
      </div>
    </div>
  );
}

/* --- Opieka i wsparcie: monitoring, puls strony, kopie ------------------ */

/* Cztery okresy pulsu w polu 800 × 60; okno pokazuje dwa, więc przesunięcie
   o połowę szerokości zapętla linię bez szwu. */
const ECG = Array.from(
  { length: 4 },
  (_, k) =>
    `${k === 0 ? "M" : "L"}${k * 200} 34H${k * 200 + 70}l6-14 8 28 8-38 8 42 8-18H${k * 200 + 200}`,
).join("");

function CareScene({ s }: { s: Scenes["care"] }) {
  return (
    <div className="sc-care">
      <div className="sc-care__head">
        <span className="sc-care__status">
          <i />
          {s.status}
        </span>
        <span className="sc-care__ssl">{s.ssl}</span>
      </div>

      <div className="sc-care__pulse">
        <svg viewBox="0 0 800 60" preserveAspectRatio="none">
          <path d={ECG} />
        </svg>
      </div>

      <div className="sc-care__bars">
        {Array.from({ length: 28 }, (_, i) => (
          <i key={i} style={css({ "--i": i })} />
        ))}
      </div>

      <span className="sc-care__backup">
        <span className="sc-check">
          <Icon d={CHECK} />
        </span>
        {s.backup}
      </span>
    </div>
  );
}

const SCENES: Record<ServiceCategorySlug, (s: Scenes) => ReactNode> = {
  "strony-i-sklepy": (s) => <WebScene s={s.web} />,
  "sztuczna-inteligencja": (s) => <AiScene s={s.ai} />,
  "marketing-i-widocznosc": (s) => <SeoScene s={s.seo} />,
  "opieka-i-wsparcie": (s) => <CareScene s={s.care} />,
};

export function ServiceScene({
  slug,
  scenes,
}: {
  slug: ServiceCategorySlug;
  scenes: Scenes;
}) {
  return (
    <div className="sc" aria-hidden="true">
      {SCENES[slug](scenes)}
    </div>
  );
}

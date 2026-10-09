/**
 * „Dokument zakresu" Profit Site — dekoracja w nagłówku /oferta.
 *
 * Trzy filary (zakres, termin, cena) jako kartka, która odhacza się przy
 * wejściu i kończy parafą. Server Component, ruch w czystym CSS.
 * aria-hidden: te same filary są niżej na stronie jako zwykły tekst.
 */

import type { CSSProperties } from "react";

import "./offer.css";

export function ProfitSpec({
  name,
  caption,
  sign,
  pillars,
}: {
  name: string;
  caption: string;
  sign: string;
  pillars: { label: string; value: string }[];
}) {
  return (
    <div className="spec" aria-hidden="true">
      <div className="spec__sheet">
        <div className="spec__head">
          <span className="spec__name">{name}</span>
          <span className="spec__caption">{caption}</span>
        </div>

        {pillars.map((pillar, index) => (
          <div key={pillar.label} className="spec__row">
            <span className="spec__box" style={{ "--n": index } as CSSProperties}>
              <svg viewBox="0 0 16 16">
                <path d="M3.5 8.5l3 3 6-7" />
              </svg>
            </span>
            <span className="spec__label">{pillar.label}</span>
            <span className="spec__value">{pillar.value}</span>
          </div>
        ))}

        <div className="spec__sign">
          <span>{sign}</span>
          <svg viewBox="0 0 120 40">
            <path d="M4 28c8-14 14-20 18-16s-6 18-2 18 12-22 18-20-4 16 2 16 10-12 16-12 4 8 10 8 12-10 20-10 10 4 24 2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/**
 * Stóg zrzutów — sygnatura nagłówka listy realizacji. Server Component.
 *
 * PROJSTOG to stóg, a znak to rosnące słupki: kilka prawdziwych stron
 * klientów leży na sobie i rośnie schodkami w prawo, jak słupki w logo.
 * Po najechaniu stos rozchodzi się w wachlarz, a karta pod kursorem
 * podnosi się i przewija własny zrzut. Czysty CSS, zero JS.
 *
 * Dekoracja (aria-hidden) — te same realizacje są niżej na liście
 * jako prawdziwe linki z tekstem.
 */

import Image from "next/image";
import type { CSSProperties } from "react";

import type { CaseStudySummary } from "@/lib/cms/types";

import "./work.css";

/** Ile kart w stosie. Na telefonie CSS chowa ostatnią. */
const CARDS = 4;

export function WorkStack({ studies }: { studies: CaseStudySummary[] }) {
  const cards = studies.filter((study) => study.cover).slice(0, CARDS);
  if (cards.length === 0) return null;

  return (
    <div className="work-stack" aria-hidden="true">
      {cards.map((study, index) => {
        const cover = study.cover!;
        return (
          <div
            key={study.slug}
            className="work-stack__card"
            style={{ "--n": index } as CSSProperties}
          >
            <div className="work-stack__bar">
              <span />
              <span />
              <span />
            </div>
            <div className="work-stack__shot">
              {/* Lazy (domyślnie) — ukryta na telefonie karta nie pobiera się wcale. */}
              <Image
                src={cover.src}
                alt=""
                width={cover.width ?? 1440}
                height={cover.height ?? 900}
                sizes="(min-width: 1024px) 17rem, 13rem"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

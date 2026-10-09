/**
 * Nagłówek podstrony — Server Component.
 *
 * Ten sam język wejścia co hero głównej: okruszki z diodą → H1 (wynurza się,
 * bez opacity 0, bo to kandydat LCP) → lead → akcje, krok 80ms.
 * Sekcja wchodzi pod przezroczysty pasek nawigacji (`data-nav-overlay`).
 *
 * W tle stóg ze znaku PROJSTOG, który wyrasta przy wejściu. Strona może
 * zamiast niego podać własny obiekt w `aside` — wtedy siatka ma dwie
 * kolumny, a stóg znika (dwa wizualne akcenty w jednym kadrze to za dużo).
 */

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import "./page-kit.css";

export type Crumb = { label: string; href?: string };

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export function PageHero({
  crumbs,
  crumbsLabel,
  title,
  lead,
  actions,
  aside,
  titleClassName = "max-w-[14ch]",
}: {
  crumbs: Crumb[];
  /** Etykieta dostępności nawigacji okruszków. */
  crumbsLabel: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Przyciski / linki pod leadem. */
  actions?: ReactNode;
  /** Obiekt wizualny po prawej (od lg). Zastępuje stóg w tle. */
  aside?: ReactNode;
  titleClassName?: string;
}) {
  return (
    <section data-nav-overlay className="page-hero">
      <div className="aurora" aria-hidden="true" />
      {!aside && (
        <div className="hero-stack" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}

      <div
        className={`mx-auto grid w-full max-w-6xl gap-x-16 gap-y-14 px-5 ${
          aside ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:items-center" : ""
        }`}
      >
        <div>
          <nav aria-label={crumbsLabel} className="enter" style={step(0)}>
            <ol className="page-crumbs">
              <li aria-hidden="true" className="live-dot" />
              {crumbs.map((crumb, index) => {
                const last = index === crumbs.length - 1;
                return (
                  <li key={crumb.label} className="flex items-center gap-2.5">
                    {crumb.href && !last ? (
                      <Link href={crumb.href} className="hit">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current={last ? "page" : undefined} className="text-bone-70">
                        {crumb.label}
                      </span>
                    )}
                    {!last && (
                      <span aria-hidden="true" className="page-crumbs__sep">
                        /
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <h1 className={`enter-emerge page-title mt-9 ${titleClassName}`} style={step(1)}>
            {title}
          </h1>

          {lead && (
            <div
              className="enter lead mt-9 max-w-[56ch] text-lg leading-[1.55] text-bone-70"
              style={step(2)}
            >
              {lead}
            </div>
          )}

          {actions && (
            <div
              className="enter mt-10 flex flex-wrap items-center gap-x-4 gap-y-3"
              style={step(3)}
            >
              {actions}
            </div>
          )}
        </div>

        {aside && (
          <div className="enter" style={step(3)}>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}

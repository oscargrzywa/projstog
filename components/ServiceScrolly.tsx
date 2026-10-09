"use client";

/**
 * Scrollytelling listy usług — mała wyspa kliencka.
 *
 * Opisy usług (`children`) i makieta (`stage`) przychodzą z serwera jako
 * gotowy HTML; wyspa dokłada tylko jedną informację: która usługa jest
 * teraz w kadrze. Wyznacza ją IntersectionObserver z wąskim pasem na
 * wysokości ~45% ekranu. Zero nasłuchiwania scrolla i kółka — przewijanie
 * zostaje w pełni natywne (i dalej obsługuje je Lenis).
 *
 * Wynik trafia do DOM-u jako atrybuty, resztę robi CSS:
 * - `data-active` na korzeniu → podświetlenie opisu i znacznika na szynie,
 * - `data-s` na hoście makiety → widoczna warstwa (service-stage.css).
 *
 * Bez JS i przed hydratacją: makieta pokazuje pierwszą usługę, a opisy nie
 * są przygaszone (`data-ready` pojawia się dopiero po hydratacji).
 */

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";

/* Hydratacja jako zewnętrzne źródło: serwer → false, klient → true. */
const subscribeNoop = () => () => {};
const getHydrated = () => true;
const getHydratedServer = () => false;

export function ServiceScrolly({
  items,
  indexLabel,
  stage,
  children,
}: {
  /** Usługi w kolejności listy — do spisu przy makiecie (kotwice `#slug`). */
  items: { slug: string; title: string }[];
  indexLabel: string;
  stage: ReactNode;
  children: ReactNode;
}) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const hydrated = useSyncExternalStore(subscribeNoop, getHydrated, getHydratedServer);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    /* Pas 45–50% wysokości okna: aktywna jest usługa, która go przecina.
       Kroki listy stykają się (padding, nie margines), więc w obrębie
       sekcji pas zawsze trafia w któryś. Poza sekcją zostaje ostatni stan
       — makieta i tak jest wtedy poza kadrem. */
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const step = Number((entry.target as HTMLElement).dataset.step);
          if (Number.isInteger(step)) setActive(step);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    list.querySelectorAll<HTMLElement>("[data-step]").forEach((step) => io.observe(step));
    return () => io.disconnect();
  }, []);

  return (
    <div
      className="svc"
      data-active={active}
      data-ready={hydrated ? "" : undefined}
      style={{ "--p": (active + 1) / Math.max(items.length, 1) } as CSSProperties}
    >
      <div ref={listRef} className="svc__list">
        {children}
      </div>

      <div className="svc__aside">
        <div className="svc__sticky">
          <div className="svc__stage" aria-hidden="true" data-s={active}>
            {stage}
          </div>

          {/* Spis usług — prawdziwe linki do kotwic, więc makieta ma też
              klawiaturową drogę: Tab → Enter przenosi do opisu usługi. */}
          <nav aria-label={indexLabel} className="svc-index">
            <ol>
              {items.map((item, index) => (
                <li key={item.slug}>
                  <a
                    href={`#${item.slug}`}
                    aria-current={index === active ? "true" : undefined}
                    className="svc-index__link"
                  >
                    <span className="svc-index__mark" aria-hidden="true" />
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
}

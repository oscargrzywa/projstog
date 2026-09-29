"use client";

/**
 * Menu mobilne — pełnoekranowa nakładka.
 *
 * Wyspa trzyma wyłącznie stan otwarcia. Zawartość nakładki (linki, kontakt)
 * przychodzi jako `children` z Server Componentu, więc jest w HTML-u od
 * pierwszego renderu.
 *
 * Zachowanie:
 * - Escape zamyka i oddaje fokus przyciskowi,
 * - kliknięcie dowolnego linku w nakładce zamyka ją (także link do bieżącej
 *   strony, przy którym route się nie zmienia),
 * - zmiana route'a (np. wstecz w przeglądarce) zamyka,
 * - fokus wychodzący poza nagłówek (Tab za ostatni link) zamyka — bez
 *   pułapki fokusu, ale też bez chodzenia po niewidocznej treści pod spodem,
 * - przejście do szerokości desktopowej zamyka i zdejmuje blokadę scrolla,
 * - tło nie przewija się (overflow na <html>), a nakładka ma
 *   `data-lenis-prevent`, więc Lenis nie przechwytuje w niej kółka.
 */

import { useEffect, useRef, useState } from "react";
import { useSelectedLayoutSegments } from "next/navigation";

const MENU_ID = "menu-mobilne";

export function MobileMenu({
  openLabel,
  closeLabel,
  children,
}: {
  openLabel: string;
  closeLabel: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Zamknięcie przy zmianie route'a — korekta stanu w trakcie renderu
  // zamiast efektu (bez dodatkowego przebiegu renderowania).
  const routeKey = useSelectedLayoutSegments().join("/");
  const [lastRoute, setLastRoute] = useState(routeKey);
  if (routeKey !== lastRoute) {
    setLastRoute(routeKey);
    setOpen(false);
  }

  useEffect(() => {
    const header = buttonRef.current?.closest("header");
    if (!header) return;

    header.dataset.menuOpen = String(open);
    if (!open) return;

    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };

    const onFocusOut = (e: FocusEvent) => {
      const next = e.relatedTarget;
      if (next instanceof Node && !header.contains(next)) setOpen(false);
    };

    const desktop = window.matchMedia("(min-width: 48rem)");
    const onDesktop = () => {
      if (desktop.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    header.addEventListener("focusout", onFocusOut);
    desktop.addEventListener("change", onDesktop);

    return () => {
      html.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      header.removeEventListener("focusout", onFocusOut);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="burger"
        aria-expanded={open}
        aria-controls={MENU_ID}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="burger__line" aria-hidden="true" />
        <span className="burger__line" aria-hidden="true" />
      </button>

      <div
        id={MENU_ID}
        className="menu"
        data-open={open}
        data-lenis-prevent
        onClick={(e) => {
          if (e.target instanceof Element && e.target.closest("a")) setOpen(false);
        }}
      >
        {children}
      </div>
    </>
  );
}

"use client";

/**
 * Stan przewinięcia nagłówka — ustawia `data-scrolled` na <header>.
 *
 * Renderuje tylko pusty, ukryty znacznik, z którego sięga do najbliższego
 * <header>. Cała reszta nawigacji zostaje Server Componentem, a wygląd
 * obu stanów żyje w CSS (components/nav.css).
 *
 * Listener pasywny + jeden odczyt na klatkę (rAF). Lenis przewija przez
 * natywny scroll okna, więc zdarzenie `scroll` przychodzi normalnie.
 */

import { useEffect, useRef } from "react";

// Po tylu pikselach pasek zamienia się w kapsułę.
const THRESHOLD = 32;

export function NavScroll() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const header = ref.current?.closest("header");
    if (!header) return;

    let frame = 0;
    let last: boolean | null = null;

    const update = () => {
      frame = 0;
      const scrolled = window.scrollY > THRESHOLD;
      if (scrolled === last) return;
      last = scrolled;
      header.dataset.scrolled = String(scrolled);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Odświeżenie w połowie strony — stan od razu właściwy, a przejścia
    // (CSS: `.site-nav[data-ready]`) włączamy dopiero po wymuszonym
    // przeliczeniu stylów — pasek nie animuje się do kapsuły przy ładowaniu.
    update();
    void header.offsetHeight;
    header.dataset.ready = "";
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <span ref={ref} hidden />;
}

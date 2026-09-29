"use client";

/* Inercyjne przewijanie strony (Lenis) — efekt „przesuwania w wodzie".
   Świadome ograniczenia:
   - tylko kółko myszy; dotyk zostaje natywny (syncTouch: false), bo
     telefon ma własną, lepszą inercję i emulacja zawsze jest gorsza,
   - klawiatura, skip-link i kotwice działają natywnie — Lenis ich nie
     przechwytuje, a po natywnym skoku sam synchronizuje pozycję,
   - elementy z własnym overflow i otwarte <details> przewijają się
     normalnie (allowNestedScroll + prevent + data-lenis-prevent),
   - prefers-reduced-motion: reduce → instancja w ogóle nie powstaje. */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const firstPath = useRef(true);
  // Nawigacja wstecz/naprzód — Next przywraca wtedy pozycję sam.
  const fromHistory = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const loop = (time: number) => {
      lenisRef.current?.raf(time);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (lenisRef.current) return;
      lenisRef.current = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        anchors: false,
        allowNestedScroll: true,
        // Otwarte menu mobilne (<details>) przewija się natywnie.
        prevent: (node) => node instanceof HTMLDetailsElement && node.open,
      });
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };

    const sync = () => (media.matches ? stop() : start());
    const onPopState = () => {
      fromHistory.current = true;
    };

    sync();
    media.addEventListener("change", sync);
    window.addEventListener("popstate", onPopState);

    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("popstate", onPopState);
      stop();
    };
  }, []);

  // Zmiana strony: zatrzymaj rozpęd i wróć na górę natychmiast — inaczej
  // nowa strona dociągałaby do celu przewijania z poprzedniej.
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    const lenis = lenisRef.current;
    const history = fromHistory.current;
    fromHistory.current = false;
    if (!lenis) return;

    // Wstecz/naprzód albo link z kotwicą: pozycję ustala przeglądarka/Next,
    // wystarczy zsynchronizować Lenisa z rzeczywistym scrollem.
    if (history || window.location.hash) {
      lenis.resize();
      return;
    }
    lenis.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}

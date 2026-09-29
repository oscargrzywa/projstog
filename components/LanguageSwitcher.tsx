"use client";

/**
 * Przełącznik języka.
 *
 * ⚠ Celowo NIE używa `usePathname()`. Strona działa na przepisaniu (rewrite)
 * w `proxy.ts`, więc adres publiczny (`/oferta`) różni się od wewnętrznego
 * (`/pl/oferta`). `usePathname` potrafi zwrócić różne wartości podczas
 * renderowania serwerowego i po hydratacji, co kończy się rozjazdem.
 *
 * `useSelectedLayoutSegments()` czyta segmenty z drzewa routera — czyli
 * nazwy folderów (segmenty WEWNĘTRZNE) i wartości segmentów dynamicznych.
 * To ta sama wartość na serwerze i na kliencie, niezależnie od przepisania.
 *
 * Płynne przejście: zmiana języka podmienia cały layout `[lang]` (razem
 * z <html lang>), więc React-owe <ViewTransition> jej nie animuje — żadna
 * granica nie przetrwa nawigacji. Dlatego przejście uruchamiamy sami:
 * migawka starej strony → nawigacja Next → czekamy, aż <html lang> zmieni
 * się na nowy język → przeglądarka płynnie przechodzi (CSS: `lang-switch`
 * w globals.css). Bez View Transitions API zostaje zwykły link.
 */

import Link from "next/link";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";

import { LOCALES, publicPath, type Locale } from "@/lib/routes";

// Bezpiecznik: jeśli render nowej wersji się przeciągnie, nie trzymamy
// zamrożonej migawki dłużej niż tyle.
const MAX_WAIT_MS = 2500;

function waitForLang(lang: string) {
  return new Promise<void>((resolve) => {
    const html = document.documentElement;
    if (html.lang === lang) return resolve();
    const done = () => {
      observer.disconnect();
      clearTimeout(timer);
      resolve();
    };
    const observer = new MutationObserver(() => {
      if (html.lang === lang) done();
    });
    observer.observe(html, { attributes: true, attributeFilter: ["lang"] });
    const timer = setTimeout(done, MAX_WAIT_MS);
  });
}

export function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const router = useRouter();
  const segments = useSelectedLayoutSegments();
  const other = LOCALES.find((l) => l !== locale) ?? locale;
  const href = publicPath(other, segments);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Nowa karta, ctrl/cmd-klik itp. — zwykłe zachowanie linku.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (
      typeof document.startViewTransition !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    e.preventDefault();
    // Typ przejścia zamiast klasy na <html> — React przerenderowuje <html>
    // w trakcie nawigacji i klasa mogłaby zniknąć w połowie animacji.
    const start = document.startViewTransition as unknown as (options: {
      update: () => Promise<void>;
      types: string[];
    }) => ViewTransition;
    start.call(document, {
      update: () => {
        router.push(href);
        return waitForLang(other);
      },
      types: ["lang-switch"],
    });
  };

  return (
    <Link
      href={href}
      hrefLang={other}
      aria-label={label}
      onClick={onClick}
      // Wygląd w components/nav.css — przełącznik żyje tylko w nagłówku.
      className="lang-switch"
    >
      {other.toUpperCase()}
    </Link>
  );
}

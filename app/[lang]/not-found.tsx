import type { Metadata } from "next";
import Link from "next/link";

import { DEFAULT_LOCALE, publicPath } from "@/lib/routes";
import { getDictionary } from "@/content/dictionary";

/**
 * Strona 404.
 *
 * ⚠ `not-found.tsx` renderuje się bez parametrów trasy, więc nie da się tu
 * odczytać `lang`. Używamy języka domyślnego (polski) — to język rynku
 * docelowego, a strona i tak służy głównie do zawrócenia użytkownika.
 */

export const metadata: Metadata = {
  title: "404 — nie znaleziono strony | PROJSTOG",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const t = getDictionary(DEFAULT_LOCALE);

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-5 py-24 lg:py-32">
      <p className="font-display text-7xl text-signal">404</p>

      <h1 className="mt-6 max-w-[18ch] text-5xl">
        Tej strony tu nie ma.
      </h1>
      <p className="mt-5 max-w-[50ch] leading-relaxed text-lichen">
        Adres mógł się zmienić albo zawiera literówkę. Poniżej najkrótsza
        droga do tego, czego prawdopodobnie szukasz.
      </p>

      <div className="mt-9 flex flex-wrap gap-3">
        <Link
          href={publicPath(DEFAULT_LOCALE)}
          className="rounded-md bg-signal px-5 py-3 text-sm font-medium text-bone transition-colors hover:bg-voltage hover:text-obsydian"
        >
          {t.common.backToHome}
        </Link>
        <Link
          href={publicPath(DEFAULT_LOCALE, ["oferta"])}
          className="rounded-md border border-hairline px-5 py-3 text-sm font-medium text-bone transition-colors hover:border-signal"
        >
          {t.nav.offer}
        </Link>
        <Link
          href={publicPath(DEFAULT_LOCALE, ["kontakt"])}
          className="rounded-md border border-hairline px-5 py-3 text-sm font-medium text-bone transition-colors hover:border-signal"
        >
          {t.nav.contact}
        </Link>
      </div>
    </div>
  );
}

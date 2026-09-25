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
 */

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

import { LOCALES, publicPath, type Locale } from "@/lib/routes";

export function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const segments = useSelectedLayoutSegments();
  const other = LOCALES.find((l) => l !== locale) ?? locale;

  return (
    <Link
      href={publicPath(other, segments)}
      hrefLang={other}
      aria-label={label}
      className="rounded-sm px-1 text-xs font-medium tracking-wide text-lichen transition-colors hover:text-bone"
    >
      {other.toUpperCase()}
    </Link>
  );
}

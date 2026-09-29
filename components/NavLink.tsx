"use client";

/**
 * Link nawigacji z efektem „roll" i oznaczeniem aktywnej podstrony.
 *
 * Wyspa kliencka tylko dlatego, że aktywny stan wymaga odczytu route'a.
 * Link i tak renderuje się serwerowo — w HTML-u jest od pierwszego bajtu.
 *
 * Aktywny segment czytamy przez `useSelectedLayoutSegment()` (nazwa folderu
 * pod `app/[lang]/`), a NIE przez `usePathname()` — adres publiczny różni się
 * od wewnętrznego przez rewrite w `proxy.ts` (patrz LanguageSwitcher).
 *
 * Kopia tekstu do efektu „roll" to pseudoelement z `attr(data-label)`
 * i pustym tekstem alternatywnym — nie trafia do drzewa dostępności
 * ani do treści strony, więc nazwa linku nie dubluje się ani dla czytnika,
 * ani dla Googlebota.
 */

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export function NavLink({
  href,
  label,
  segment,
  variant = "bar",
  index,
}: {
  href: string;
  label: string;
  /** Wewnętrzny segment (nazwa folderu), np. "oferta". */
  segment: string;
  variant?: "bar" | "overlay";
  /** Numer porządkowy — tylko w nakładce mobilnej. */
  index?: number;
}) {
  const active = useSelectedLayoutSegment() === segment;

  if (variant === "overlay") {
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className="menu-link"
      >
        {index !== undefined && (
          <span className="menu-link__index" aria-hidden="true">
            {String(index).padStart(2, "0")}
          </span>
        )}
        <span className="menu-link__label">{label}</span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="nav-link"
    >
      <span className="nav-link__roll">
        <span className="nav-link__inner" data-label={label}>
          {label}
        </span>
      </span>
    </Link>
  );
}

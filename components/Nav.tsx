/**
 * Nawigacja główna — Server Component.
 *
 * Bez „use client": wszystkie linki są w HTML-u od razu, bez czekania
 * na hydratację. Menu mobilne to natywny <details>, więc działa
 * bez JavaScriptu i jest obsługiwane z klawiatury out of the box.
 * Jedyną wyspą kliencką jest przełącznik języka.
 */

import Link from "next/link";

import { LogoMark, Wordmark } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { getDictionary } from "@/content/dictionary";
import { SITE } from "@/content/site";
import { publicPath, type Locale } from "@/lib/routes";

export function Nav({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const links = [
    { label: t.nav.offer, segments: ["oferta"] },
    { label: t.nav.work, segments: ["realizacje"] },
    { label: t.nav.blog, segments: ["blog"] },
    { label: t.nav.about, segments: ["o-mnie"] },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-obsydian/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5">
        <Link
          href={publicPath(locale)}
          className="flex items-center gap-2.5 rounded-md"
        >
          <LogoMark className="h-6 w-6" />
          <Wordmark />
        </Link>

        <nav
          aria-label={t.a11y.mainNav}
          className="ml-auto hidden items-center gap-7 md:flex"
        >
          {links.map((link) => (
            <Link
              key={link.segments.join("/")}
              href={publicPath(locale, link.segments)}
              className="text-sm text-lichen transition-colors hover:text-bone"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4 md:ml-0">
          <LanguageSwitcher locale={locale} label={t.a11y.switchLanguage} />

          <a
            href={`tel:${SITE.phoneRaw}`}
            className="hidden text-sm text-lichen transition-colors hover:text-bone lg:block"
          >
            {SITE.phone}
          </a>

          <Link
            href={publicPath(locale, ["kontakt"])}
            className="hidden rounded-md bg-signal px-4 py-2 text-sm font-medium text-bone transition-colors hover:bg-voltage hover:text-obsydian sm:block"
          >
            {t.nav.cta}
          </Link>

          {/* Menu mobilne bez JavaScriptu. */}
          <details className="group relative md:hidden">
            <summary
              className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-md border border-hairline"
              aria-label={t.a11y.openMenu}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 stroke-bone"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>

            <nav
              aria-label={t.a11y.mainNav}
              className="absolute right-0 top-11 w-56 rounded-lg border border-hairline bg-basalt p-2 shadow-[var(--shadow-glow)]"
            >
              {[...links, { label: t.nav.contact, segments: ["kontakt"] }].map(
                (link) => (
                  <Link
                    key={link.segments.join("/")}
                    href={publicPath(locale, link.segments)}
                    className="block rounded-md px-3 py-2.5 text-sm text-bone transition-colors hover:bg-slate-moss"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="block rounded-md px-3 py-2.5 text-sm text-lichen transition-colors hover:bg-slate-moss"
              >
                {SITE.phone}
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

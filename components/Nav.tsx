/**
 * Nawigacja główna — Server Component.
 *
 * Wszystkie linki są w HTML-u od razu, bez czekania na hydratację.
 * Wyspy klienckie są małe i robią po jednej rzeczy:
 * - NavScroll — `data-scrolled` na <header> (pasek → kapsuła),
 * - NavLink — oznaczenie aktywnej podstrony,
 * - MobileMenu — stan otwarcia nakładki mobilnej,
 * - LanguageSwitcher — link do drugiej wersji językowej.
 *
 * Nagłówek jest `position: fixed` (kapsuła musi móc odsunąć się od krawędzi
 * i zmienić wysokość bez przesuwania treści), więc za nim stoi odstęp
 * o wysokości starego paska (4rem) — treść podstron nie wjeżdża pod spód,
 * a hero na głównej (`100svh - 4rem`) zachowuje swoje proporcje.
 */

import Link from "next/link";

import "./nav.css";

import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";
import { NavScroll } from "./NavScroll";
import { getDictionary } from "@/content/dictionary";
import { SITE } from "@/content/site";
import { publicPath, type Locale } from "@/lib/routes";

export function Nav({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const links = [
    { label: t.nav.offer, segment: "oferta" },
    { label: t.nav.work, segment: "realizacje" },
    { label: t.nav.blog, segment: "blog" },
    { label: t.nav.about, segment: "o-mnie" },
  ];

  const contactHref = publicPath(locale, ["kontakt"]);

  return (
    <>
      <header className="site-nav" data-scrolled="false" data-menu-open="false">
        <NavScroll />

        <div className="site-nav__bar">
          <div className="site-nav__brand">
            <Link
              href={publicPath(locale)}
              className="site-nav__logo"
              aria-label="PROJSTOG"
            >
              <Logo className="site-nav__logo-svg" />
            </Link>

            {/* Status przy znaku, nie przy CTA — prawa kolumna musi być
                wąska, żeby linki mogły stać na środku paska. */}
            <a href={`tel:${SITE.phoneRaw}`} className="site-nav__phone">
              <PhoneIcon />
              {SITE.phone}
            </a>
          </div>

          <nav aria-label={t.a11y.mainNav} className="site-nav__links">
            <ul>
              {links.map((link) => (
                <li key={link.segment}>
                  <NavLink
                    href={publicPath(locale, [link.segment])}
                    label={link.label}
                    segment={link.segment}
                  />
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-nav__actions">
            <LanguageSwitcher locale={locale} label={t.a11y.switchLanguage} />

            <Link href={contactHref} className="nav-cta" data-magnetic>
              <span className="nav-cta__label">{t.nav.cta}</span>
              <svg
                viewBox="0 0 16 16"
                className="nav-cta__arrow"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
              </svg>
            </Link>

            <MobileMenu openLabel={t.a11y.openMenu} closeLabel={t.a11y.closeMenu}>
              <div className="menu__inner">
                <nav aria-label={t.a11y.mainNav}>
                  <ul className="menu__list">
                    {[...links, { label: t.nav.contact, segment: "kontakt" }].map(
                      (link, i) => (
                        <li
                          key={link.segment}
                          className="menu__item"
                          style={{ "--i": i } as React.CSSProperties}
                        >
                          <NavLink
                            href={publicPath(locale, [link.segment])}
                            label={link.label}
                            segment={link.segment}
                            variant="overlay"
                            index={i + 1}
                          />
                        </li>
                      )
                    )}
                  </ul>
                </nav>

                <div className="menu__footer">
                  <a href={`tel:${SITE.phoneRaw}`} className="menu__contact">
                    <PhoneIcon />
                    {SITE.phone}
                  </a>
                  <a href={`mailto:${SITE.email}`} className="menu__contact">
                    {SITE.email}
                  </a>
                  <Link href={contactHref} className="nav-cta nav-cta--block">
                    <span className="nav-cta__label">{t.nav.cta}</span>
                    <svg
                      viewBox="0 0 16 16"
                      className="nav-cta__arrow"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </MobileMenu>
          </div>
        </div>
      </header>

      {/* Odstęp za nagłówkiem fixed — tyle, ile zajmował stary pasek.
          Znika, gdy strona ma sekcję z `data-nav-overlay` (hero, które
          ma leżeć pod przezroczystym paskiem) — patrz nav.css. */}
      <div className="site-nav-spacer" aria-hidden="true" />
    </>
  );
}

/* Słuchawka (obrys, 24×24) — kolor bierze z `currentColor` przez klasę. */
function PhoneIcon() {
  return (
    <svg
      className="phone-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

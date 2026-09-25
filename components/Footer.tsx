/**
 * Stopka — Server Component.
 *
 * ⚠ Celowo NIE zawiera listy wszystkich miast. Powtórzony na każdej
 * podstronie blok „Obsługujemy także: Mielec, Dębica, Ropczyce…" to
 * dokładnie ten wzorzec, który Google wymienia w polityce keyword
 * stuffing („blocks of text listing cities and regions a web page is
 * trying to rank for"). Zamiast tego jedno łącze do huba obszaru działania.
 */

import Link from "next/link";

import { LogoMark, Wordmark } from "./Logo";
import { getDictionary } from "@/content/dictionary";
import { SITE } from "@/content/site";
import { BASE_CITY } from "@/content/cities";
import { listServiceCategories } from "@/lib/cms";
import { publicPath, type Locale } from "@/lib/routes";

export async function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const categories = await listServiceCategories(locale);

  const company = [
    { label: t.nav.work, segments: ["realizacje"] },
    { label: t.nav.blog, segments: ["blog"] },
    { label: t.nav.about, segments: ["o-mnie"] },
    { label: t.nav.contact, segments: ["kontakt"] },
  ];

  return (
    <footer className="mt-24 border-t border-hairline">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-6 w-6" />
              <Wordmark />
            </div>
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-lichen">
              {t.footer.tagline}
            </p>
          </div>

          <nav aria-label={t.footer.columnOffer}>
            <h2 className="text-sm font-medium text-bone">
              {t.footer.columnOffer}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={publicPath(locale, ["oferta", category.slug])}
                    className="text-sm text-lichen transition-colors hover:text-bone"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.columnCompany}>
            <h2 className="text-sm font-medium text-bone">
              {t.footer.columnCompany}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {company.map((link) => (
                <li key={link.segments.join("/")}>
                  <Link
                    href={publicPath(locale, link.segments)}
                    className="text-sm text-lichen transition-colors hover:text-bone"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={publicPath(locale, ["strony-internetowe"])}
                  className="text-sm text-lichen transition-colors hover:text-bone"
                >
                  {t.footer.moreCities}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-medium text-bone">
              {t.footer.columnContact}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-lichen">
              <li>
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="transition-colors hover:text-bone"
                >
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors hover:text-bone"
                >
                  {SITE.email}
                </a>
              </li>
              {/* Adres spójny z wizytówką Google Moja Firma. */}
              <li className="pt-1">
                {BASE_CITY.name}, {SITE.address.postalCode}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 text-xs text-lichen sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. {t.footer.rights}
          </p>
          <Link
            href={publicPath(locale, ["polityka-prywatnosci"])}
            className="transition-colors hover:text-bone"
          >
            {t.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}

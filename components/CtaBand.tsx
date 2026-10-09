/**
 * Pas CTA zamykający podstronę — Server Component.
 *
 * Ten sam układ co sekcja kontaktu na głównej: nagłówek spod maski,
 * magnetyczne przyciski, numer telefonu jako druga droga. Poświata idzie
 * od dołu — strona kończy się światłem, tak jak hero się nim zaczyna.
 */

import Link from "next/link";

import { SITE } from "@/content/site";

import "./page-kit.css";

export function CtaBand({
  heading,
  lead,
  primary,
  secondary,
}: {
  heading: string;
  lead?: string;
  primary: { label: string; href: string };
  /** Druga akcja. Gdy brak — numer telefonu. */
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="cta-band">
      <div className="aurora" aria-hidden="true" />
      <div className="mx-auto max-w-3xl px-5 py-28 text-center">
        <h2 className="mask-reveal mx-auto max-w-[18ch] text-6xl">
          <span className="mask-reveal__inner">{heading}</span>
        </h2>
        {lead && (
          <p className="reveal mx-auto mt-6 max-w-[54ch] leading-relaxed text-lichen">
            {lead}
          </p>
        )}

        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={primary.href}
            data-magnetic
            className="btn-fill rounded-full bg-signal px-7 py-3.5 text-sm font-medium text-bone"
          >
            {primary.label}
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              data-magnetic
              className="rounded-full border border-bone-12 px-7 py-3.5 text-sm font-medium text-bone transition-colors duration-250 hover:border-signal"
            >
              {secondary.label}
            </Link>
          ) : (
            <a
              href={`tel:${SITE.phoneRaw}`}
              data-magnetic
              className="rounded-full border border-bone-12 px-7 py-3.5 text-sm font-medium text-bone transition-colors duration-250 hover:border-signal"
            >
              {SITE.phone}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

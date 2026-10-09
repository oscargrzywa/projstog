/**
 * Wiersz listy realizacji — Server Component.
 *
 * Duży, naprzemienny układ: zrzut całej strony klienta w ramce przeglądarki
 * po jednej stronie, nazwa, branża, efekt i stack po drugiej. Cały wiersz
 * jest jednym linkiem, więc najechanie gdziekolwiek przewija zrzut
 * (SiteShot `hover`) i włącza etykietę kursora.
 *
 * Ruch przy przewijaniu: ramka otwiera się z wnętrza (clip-path) i płynie
 * lekko wolniej niż tekst — oś `--work-feature` przypięta do <li>,
 * nie do ramki, która sama się przesuwa (style w work.css).
 */

import Link from "next/link";

import { SiteShot } from "@/components/SiteShot";
import type { CaseStudySummary } from "@/lib/cms/types";

import "./work.css";

export function WorkArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WorkFeature({
  study,
  href,
  cursorLabel,
  moreLabel,
}: {
  study: CaseStudySummary;
  href: string;
  cursorLabel: string;
  moreLabel: string;
}) {
  return (
    <li className="work-feature">
      <Link
        href={href}
        data-cursor="view"
        data-cursor-label={cursorLabel}
        className={`work-row work-feature__link group ${
          study.cover ? "" : "work-feature__link--text"
        }`}
      >
        {study.cover && (
          <div className="work-feature__shot">
            {/* Kolumna 7/12 kontenera 72rem od lg, pełna szerokość niżej. */}
            <SiteShot
              image={study.cover}
              domain={study.domain}
              mode="hover"
              sizes="(min-width: 1024px) 40rem, calc(100vw - 2.5rem)"
            />
          </div>
        )}

        <div className="reveal-stagger">
          <p className="text-sm text-lichen">{study.industry}</p>
          <h2 className="work-row__name mt-4 text-4xl group-hover:text-voltage">
            {study.name}
          </h2>
          <p className="mt-6 max-w-[48ch] leading-relaxed text-bone-70">
            {study.outcome}
          </p>
          {study.tech.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {study.tech.map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-9 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-hairline pt-5">
            <span className="flex items-center gap-2.5 font-display text-sm text-bone">
              <span className="live-dot" aria-hidden="true" />
              {study.domain}
            </span>
            <span className="work-more">
              {moreLabel}
              <WorkArrow className="work-more__arrow" />
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

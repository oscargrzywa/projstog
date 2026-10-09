/**
 * Klocki podstrony realizacji — Server Components.
 *
 * - `CaseStage`  — scena pod nagłówkiem: zrzut całej strony klienta jedzie
 *                  sam w dół i wraca (SiteShot `auto`), ramka nachodzi na
 *                  dolną krawędź hero i dorasta przy przewijaniu,
 * - `CaseFacts`  — branża, stack i adres; od lg przyklejone obok treści,
 * - `CaseProse`  — treść RichText, każdy blok wchodzi osobno przy przewijaniu,
 * - `NextStudy`  — zaproszenie do kolejnej realizacji z podglądem zrzutu.
 *
 * Style w work.css. Tekst zawsze w HTML-u z serwera — ruch to wyłącznie CSS.
 */

import Link from "next/link";
import type { ReactNode } from "react";

import { RichText } from "@/components/RichText";
import { SiteShot } from "@/components/SiteShot";
import { WorkArrow } from "@/components/WorkFeature";
import type { CaseStudySummary, ImageRef, RichText as Blocks } from "@/lib/cms/types";

import "./work.css";

export function CaseStage({ image, domain }: { image: ImageRef; domain: string }) {
  return (
    <div className="case-stage mx-auto max-w-6xl px-5">
      <div className="case-stage__frame">
        {/* Jedyny obraz z `priority` na stronie — kandydat LCP. */}
        <SiteShot
          image={image}
          domain={domain}
          mode="auto"
          priority
          sizes="(min-width: 1152px) 70rem, calc(100vw - 2.5rem)"
        />
      </div>
    </div>
  );
}

export function CaseFacts({
  items,
}: {
  items: { label: string; value: ReactNode }[];
}) {
  return (
    <dl className="case-facts reveal-stagger">
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CaseProse({ blocks }: { blocks: Blocks }) {
  return (
    <div className="case-prose">
      <RichText blocks={blocks} />
    </div>
  );
}

export function NextStudy({
  study,
  href,
  heading,
  allLabel,
  allHref,
  moreLabel,
  cursorLabel,
}: {
  study: CaseStudySummary;
  href: string;
  heading: string;
  allLabel: string;
  allHref: string;
  moreLabel: string;
  cursorLabel: string;
}) {
  return (
    <section className="case-next">
      <div className="mx-auto max-w-6xl px-5 pt-24 lg:pt-28">
        <div className="section-head">
          <h2 className="mask-reveal text-5xl">
            <span className="mask-reveal__inner">{heading}</span>
          </h2>
          <Link
            href={allHref}
            className="hit reveal text-sm font-medium text-voltage underline-offset-4 hover:underline"
          >
            {allLabel}
          </Link>
        </div>

        <Link
          href={href}
          data-cursor="view"
          data-cursor-label={cursorLabel}
          className="work-row next-card group"
        >
          <div className="reveal-stagger next-card__text">
            <p className="text-sm text-lichen">{study.industry}</p>
            {/* text-4xl, nie większy: najdłuższe słowo w nazwach
                („Ubezpieczenia") musi zmieścić się w kolumnie 5/12. */}
            <h3 className="work-row__name mt-5 text-4xl group-hover:text-voltage">
              {study.name}
            </h3>
            <p className="mt-6 max-w-[46ch] leading-relaxed text-bone-70">
              {study.outcome}
            </p>
            <span className="next-card__go mt-10">
              <span className="next-card__circle" aria-hidden="true">
                <WorkArrow />
              </span>
              {moreLabel}
            </span>
          </div>

          {study.cover && (
            <div className="next-card__shot">
              <SiteShot
                image={study.cover}
                domain={study.domain}
                mode="hover"
                sizes="(min-width: 1024px) 40rem, calc(100vw - 2.5rem)"
              />
            </div>
          )}
        </Link>
      </div>
    </section>
  );
}

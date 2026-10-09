import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { LocalMap } from "@/components/LocalMap";
import { LogoMark } from "@/components/Logo";
import { PageHero } from "@/components/PageHero";
import { ABOUT_PAGE, OWNER_PHOTO } from "@/content/pages/about";
import { getDictionary } from "@/content/dictionary";
import { SITE } from "@/content/site";
import { listServiceCategories } from "@/lib/cms";
import { breadcrumbSchema, personSchema } from "@/lib/schema";
import { isLocale, metadataAlternates, publicPath } from "@/lib/routes";

import "@/components/about.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const copy = ABOUT_PAGE[lang];
  return {
    title: copy.seo.title,
    description: copy.seo.description,
    alternates: metadataAlternates(lang, ["o-mnie"]),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const copy = ABOUT_PAGE[lang];
  const t = getDictionary(lang);
  const categories = await listServiceCategories(lang);

  return (
    <>
      <JsonLd data={personSchema(lang)} />
      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: copy.breadcrumbHome, segments: [] },
          { name: t.nav.about, segments: ["o-mnie"] },
        ])}
      />

      {/* ============================================================ nagłówek */}
      <PageHero
        crumbs={[
          { label: copy.breadcrumbHome, href: publicPath(lang, []) },
          { label: t.nav.about },
        ]}
        crumbsLabel={copy.crumbsLabel}
        title={copy.h1}
        lead={
          <>
            <p className="font-display text-2xl leading-[1.15] text-bone sm:text-3xl">
              {copy.kicker}
            </p>
            <p className="mt-6">{copy.lead}</p>
          </>
        }
        actions={
          <>
            <Link
              href={publicPath(lang, ["kontakt"])}
              data-magnetic
              className="btn-fill rounded-full bg-signal px-7 py-3.5 text-sm font-medium text-bone"
            >
              {copy.ctaButton}
            </Link>
            <span className="text-sm text-bone-45">
              {t.home.orCall}{" "}
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="hit text-bone transition-colors hover:text-voltage"
              >
                {SITE.phone}
              </a>
            </span>
          </>
        }
        aside={
          /* Kadr jak w znaku PROJSTOG: narożniki-celownik po przekątnej.
             Zdjęcie płynie wolniej niż strona (parallax CSS), narożniki
             w przeciwną stronę — głębia bez JS. */
          <figure className="about-portrait">
            <span aria-hidden="true" className="about-portrait__corner about-portrait__corner--tl" />
            <span aria-hidden="true" className="about-portrait__corner about-portrait__corner--br" />
            <div className="about-portrait__frame">
              <Image
                src={OWNER_PHOTO.src}
                alt={copy.photoAlt}
                width={OWNER_PHOTO.width}
                height={OWNER_PHOTO.height}
                preload
                sizes="(max-width: 1024px) 24rem, 27rem"
                className="about-portrait__img"
              />
            </div>
            <figcaption className="about-portrait__caption">
              <span aria-hidden="true" className="live-dot" />
              {copy.photoCaption}
            </figcaption>
          </figure>
        }
      />

      {/* ===================================================== przewaga lokalna */}
      {/* Najmocniejszy argument strony, więc stoi zaraz pod nagłówkiem.
          Sygnatura sekcji: mapa z prawdziwych współrzędnych. */}
      <section className="overflow-x-clip">
        <div className="mx-auto max-w-6xl px-5 py-24 lg:py-32">
          <h2 className="mask-reveal max-w-[18ch] text-5xl">
            <span className="mask-reveal__inner">{copy.localHeading}</span>
          </h2>

          <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-start lg:gap-20">
            <div>
              <p className="reveal max-w-[54ch] text-lg leading-relaxed text-bone-70">
                {copy.localLead}
              </p>
              <p className="reveal mt-10 max-w-[26ch] font-display text-3xl text-voltage">
                {copy.localPunchline}
              </p>
              <p className="reveal mt-10 max-w-[56ch] leading-relaxed text-lichen">
                {copy.localDetail}
              </p>
            </div>

            <LocalMap distance={copy.mapDistance} caption={copy.mapCaption} />
          </div>
        </div>
      </section>

      {/* ========================================================= współpraca */}
      {/* Zasady, nie kroki — bez numeracji. Lewa kolumna stoi (sticky),
          prawa przewija się, a stóg ze znaku rośnie o jeden słupek
          z każdą zasadą (CSS: timeline-scope, zero JS). */}
      <section className="about-approach border-y border-hairline bg-basalt">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16 lg:py-32">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="mask-reveal max-w-[12ch] text-5xl">
              <span className="mask-reveal__inner">{copy.approachHeading}</span>
            </h2>
            <p className="reveal mt-6 max-w-[34ch] leading-relaxed text-lichen">
              {copy.approachLead}
            </p>
            <div aria-hidden="true" className="about-stack">
              {copy.approachPoints.map((point) => (
                <span key={point.title} />
              ))}
            </div>
          </div>

          <ul className="about-principles">
            {copy.approachPoints.map((point) => (
              <li key={point.title} className="about-principle">
                <h3 className="text-3xl">{point.title}</h3>
                <p className="mt-4 max-w-[52ch] leading-relaxed text-bone-70">
                  {point.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================== w czym pomogę + skrót */}
      <section className="mx-auto grid max-w-6xl gap-16 px-5 py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:gap-20 lg:py-32">
        <div>
          <h2 className="mask-reveal max-w-[16ch] text-5xl">
            <span className="mask-reveal__inner">{copy.workHeading}</span>
          </h2>
          <p className="reveal mt-8 max-w-[44ch] text-xl leading-[1.55] text-bone-70">
            {copy.workBody}
          </p>

          {/* Kategorie oferty jako linki — z tej strony prosto do usługi. */}
          <ul className="reveal-stagger mt-10 flex flex-wrap gap-2.5">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={publicPath(lang, ["oferta", category.slug])}
                  className="about-pill"
                >
                  {category.title}
                  <span aria-hidden="true" className="about-pill__arrow">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={publicPath(lang, ["realizacje"])}
            className="hit reveal mt-8 inline-block text-sm font-medium text-voltage underline-offset-4 hover:underline"
          >
            {t.nav.work} →
          </Link>
        </div>

        {/* Wizytówka „w skrócie" — dane z content/site.ts, te same co
            w JSON-LD (NIP, miasta, telefon). */}
        <aside className="about-facts reveal" aria-labelledby="about-facts-heading">
          <LogoMark className="about-facts__mark" />
          <h2 id="about-facts-heading" className="text-2xl">
            {copy.factsHeading}
          </h2>

          <dl className="about-facts__grid">
            <div className="about-facts__cell about-facts__cell--wide">
              <dt>{copy.factsLabels.base}</dt>
              <dd className="flex items-center gap-3 font-display text-3xl text-bone">
                <span aria-hidden="true" className="live-dot" />
                {SITE.citiesLabel}
              </dd>
            </div>
            <div className="about-facts__cell about-facts__cell--wide">
              <dt>{copy.factsLabels.reach}</dt>
              <dd className="text-lg text-bone">{copy.reachValue}</dd>
            </div>
            <div className="about-facts__cell">
              <dt>{copy.factsLabels.nip}</dt>
              <dd className="font-mono text-bone tabular">{SITE.nip}</dd>
            </div>
            <div className="about-facts__cell">
              <dt>{copy.factsLabels.contact}</dt>
              <dd>
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="hit whitespace-nowrap text-bone transition-colors hover:text-voltage"
                >
                  {SITE.phone}
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      <CtaBand
        heading={copy.ctaHeading}
        lead={copy.ctaBody}
        primary={{ label: copy.ctaButton, href: publicPath(lang, ["kontakt"]) }}
        secondary={{ label: copy.ctaSecondary, href: publicPath(lang, ["oferta"]) }}
      />
    </>
  );
}

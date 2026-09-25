import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { ABOUT_PAGE, OWNER_PHOTO } from "@/content/pages/about";
import { getDictionary } from "@/content/dictionary";
import { SITE } from "@/content/site";
import { BASE_CITY } from "@/content/cities";
import { breadcrumbSchema, personSchema } from "@/lib/schema";
import { isLocale, metadataAlternates, publicPath } from "@/lib/routes";

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

  return (
    <>
      <JsonLd data={personSchema(lang)} />
      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: copy.breadcrumbHome, segments: [] },
          { name: t.nav.about, segments: ["o-mnie"] },
        ])}
      />

      <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
          <div>
            <p className="text-sm text-lichen">{copy.kicker}</p>
            <h1 className="mt-3 max-w-[15ch] text-6xl">{copy.h1}</h1>
            <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-lichen">
              {copy.lead}
            </p>
          </div>

          <figure className="m-0">
            <Image
              src={OWNER_PHOTO.src}
              alt={copy.photoAlt}
              width={OWNER_PHOTO.width}
              height={OWNER_PHOTO.height}
              priority
              className="h-auto w-full rounded-lg border border-hairline object-cover"
              sizes="(max-width: 1024px) 100vw, 20rem"
            />
            <figcaption className="mt-3 text-sm text-lichen">
              {copy.photoCaption}
            </figcaption>
          </figure>
        </div>

        {/* Przewaga lokalna — najmocniejszy argument, więc stoi wysoko,
            nie schowany w stopce. */}
        <section className="mt-20 rounded-lg border border-hairline bg-basalt p-8 sm:p-10">
          <h2 className="max-w-[20ch] text-4xl">{copy.localHeading}</h2>
          <p className="mt-5 max-w-[60ch] leading-relaxed text-lichen">
            {copy.localLead}
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            {copy.competitorOrigins.map((origin) => (
              <li key={origin.city} className="border-l border-hairline pl-4">
                <span className="block font-display text-lg text-bone">
                  {origin.city}
                </span>
                <span className="text-sm text-lichen">{origin.distance}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-[52ch] font-display text-2xl text-voltage">
            {copy.localPunchline}
          </p>
          <p className="mt-4 max-w-[60ch] leading-relaxed text-lichen">
            {copy.localDetail}
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-4xl">{copy.approachHeading}</h2>
          <div className="mt-10 grid gap-x-12 gap-y-9 sm:grid-cols-2">
            {copy.approachPoints.map((point) => (
              <div
                key={point.title}
                className="border-t border-hairline pt-5"
              >
                <h3 className="text-xl">{point.title}</h3>
                <p className="mt-3 max-w-[50ch] text-sm leading-relaxed text-lichen">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl">{copy.workHeading}</h2>
            <p className="mt-5 max-w-[54ch] leading-relaxed text-lichen">
              {copy.workBody}
            </p>
            <Link
              href={publicPath(lang, ["realizacje"])}
              className="mt-6 inline-block text-sm font-medium text-voltage underline-offset-4 hover:underline"
            >
              {t.nav.work}
            </Link>
          </div>

          <div>
            <h2 className="text-3xl">{copy.factsHeading}</h2>
            <dl className="mt-5 divide-y divide-hairline border-y border-hairline text-sm">
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-lichen">{copy.factsLabels.base}</dt>
                <dd className="text-right text-bone">
                  {BASE_CITY.name}, {SITE.address.postalCode}
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-lichen">{copy.factsLabels.since}</dt>
                <dd className="text-right text-bone">{SITE.foundedYear}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-lichen">{copy.factsLabels.reach}</dt>
                <dd className="text-right text-bone">{copy.reachValue}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-lichen">{copy.factsLabels.contact}</dt>
                <dd className="text-right">
                  <a
                    href={`tel:${SITE.phoneRaw}`}
                    className="text-bone transition-colors hover:text-voltage"
                  >
                    {SITE.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="mt-20 border-t border-hairline pt-12">
          <h2 className="max-w-[18ch] text-5xl">{copy.ctaHeading}</h2>
          <p className="mt-5 max-w-[52ch] leading-relaxed text-lichen">
            {copy.ctaBody}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={publicPath(lang, ["kontakt"])}
              className="rounded-md bg-signal px-5 py-3 text-sm font-medium text-bone transition-colors hover:bg-voltage hover:text-obsydian"
            >
              {copy.ctaButton}
            </Link>
            <Link
              href={publicPath(lang, ["oferta"])}
              className="rounded-md border border-hairline px-5 py-3 text-sm font-medium text-bone transition-colors hover:border-signal"
            >
              {copy.ctaSecondary}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

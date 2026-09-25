import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { RichText } from "@/components/RichText";
import { SITE } from "@/content/site";
import { TODO_MARKER, getPageCopy } from "@/content/pages/blog-page";
import { getCaseStudy, listCaseStudies } from "@/lib/cms";
import { breadcrumbSchema } from "@/lib/schema";
import {
  LOCALES,
  isLocale,
  metadataAlternates,
  publicPath,
  type Locale,
} from "@/lib/routes";

/* Realizacje to zamknięta lista znana w czasie builda. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const byLocale = await Promise.all(
    LOCALES.map(async (lang) => {
      const studies = await listCaseStudies(lang);
      return studies.map((study) => ({ lang, slug: study.slug }));
    })
  );

  return byLocale.flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};

  const study = await getCaseStudy(lang, slug);
  if (!study) return {};

  return {
    title: study.seo.title,
    description: study.seo.description,
    alternates: metadataAlternates(lang, ["realizacje", slug]),
    ...(study.seo.noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "article",
      title: study.seo.title,
      description: study.seo.description,
      url: publicPath(lang, ["realizacje", slug]),
      locale: lang,
      ...(study.seo.ogImage ? { images: [study.seo.ogImage] } : {}),
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const locale: Locale = lang;
  const study = await getCaseStudy(locale, slug);
  if (!study) notFound();

  const copy = getPageCopy(locale);

  /* Znacznik zostaje na widoku celowo — luka w treści ma być widoczna
     dla właściciela strony, a nie cicho zamieciona pod dywan. */
  const needsCopy =
    study.outcome.includes(TODO_MARKER) ||
    study.body.some(
      (block) =>
        ("text" in block && block.text.includes(TODO_MARKER)) ||
        ("items" in block && block.items.some((i) => i.includes(TODO_MARKER)))
    );

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: SITE.name, segments: [] },
          { name: copy.work.title, segments: ["realizacje"] },
          { name: study.name, segments: ["realizacje", study.slug] },
        ])}
      />

      <article>
        {/* --------------------------------------------------------- nagłówek */}
        <header className="mx-auto max-w-6xl px-5 pt-12 pb-10 lg:pt-16">
          <Link
            href={publicPath(locale, ["realizacje"])}
            className="text-sm text-lichen underline-offset-4 transition-colors hover:text-voltage hover:underline"
          >
            {copy.work.backToList}
          </Link>

          <h1 className="mt-6 max-w-[18ch] text-5xl">{study.name}</h1>

          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-lichen">
            {study.outcome}
          </p>

          {needsCopy && (
            <p className="mt-5 max-w-[58ch] rounded-md border border-dashed border-hairline px-4 py-2.5 text-xs text-lichen">
              {copy.work.todoNotice}
            </p>
          )}

          <a
            href={study.url}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex items-center gap-2 rounded-md border border-hairline px-5 py-3 text-sm font-medium text-bone transition-colors hover:border-signal hover:text-voltage"
          >
            {copy.work.visitSite}
            <span className="font-mono text-xs text-lichen">{study.domain}</span>
          </a>

          <dl className="mt-10 grid gap-x-10 gap-y-5 border-t border-hairline pt-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-lichen">
                {copy.work.industry}
              </dt>
              <dd className="mt-1 text-bone">{study.industry}</dd>
            </div>

            {study.tech.length > 0 && (
              <div>
                <dt className="text-xs uppercase tracking-wide text-lichen">
                  {copy.work.tech}
                </dt>
                <dd className="mt-2">
                  <ul className="flex flex-wrap gap-2">
                    {study.tech.map((item) => (
                      <li
                        key={item}
                        className="rounded-sm border border-hairline px-2 py-0.5 text-xs text-lichen"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        </header>

        {/* ------------------------------------------------------------ treść */}
        <div className="border-t border-hairline">
          <div className="mx-auto max-w-6xl px-5 py-12">
            <RichText blocks={study.body} />
          </div>
        </div>
      </article>

      {/* ---------------------------------------------------------- kontakt */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="max-w-[20ch] text-4xl">{copy.work.cta.heading}</h2>
          <p className="mt-5 max-w-[52ch] leading-relaxed text-lichen">
            {copy.work.cta.body}
          </p>
          <Link
            href={publicPath(locale, ["kontakt"])}
            className="mt-8 inline-block rounded-md bg-signal px-5 py-3 text-sm font-medium text-bone transition-colors hover:bg-voltage hover:text-obsydian"
          >
            {copy.work.cta.button}
          </Link>
        </div>
      </section>
    </>
  );
}
